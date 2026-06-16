import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDialog from '../components/ConfirmDialog';
import { bankAccountService } from '../services/bankAccountService';
import { ledgerService } from '../services/ledgerService';

const BankAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState({ page: 1, limit: 20 });
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [sortOrder, setSortOrder] = useState("Latest"); // Latest, Oldest
  const [columns, setColumns] = useState({
    bank_name: true,
    account_number: true,
    ifsc_code: true,
    ledger: true
  });
  const [currentAccount, setCurrentAccount] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, account: null });
  const [errors, setErrors] = useState({});

  const fetchBankAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await bankAccountService.getBankAccounts({
          ...filters,
          search: debouncedSearch,
          sort: sortOrder === 'Latest' ? 'desc' : 'asc',
          sortBy: 'id'
      });
      if (response.success) {
        setAccounts(response.data || []);
        setPagination({
            total: response.pagination?.totalItems || response.total || response.data?.total || (Array.isArray(response.data) ? response.data.length : 0),
            pages: response.pagination?.totalPages || 1
        });
      }
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
      toast.error("Failed to load bank accounts");
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedSearch, sortOrder]);

  useEffect(() => {
      const timer = setTimeout(() => {
          setDebouncedSearch(searchText);
          setFilters(prev => ({ ...prev, page: 1 }));
      }, 600);
      return () => clearTimeout(timer);
  }, [searchText]);

  const fetchBankLedgers = async () => {
    try {
      const response = await ledgerService.getLedgersByType('bank');
      if (response.success) {
        setLedgers(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching bank ledgers:", error);
    }
  };

  useEffect(() => {
    fetchBankAccounts();
  }, [fetchBankAccounts]);

  useEffect(() => {
    fetchBankLedgers();
  }, []);

  const handleColumnToggle = (column) => {
    setColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      bank_name: form.elements.bank_name.value.trim(),
      account_number: form.elements.account_number.value.trim(),
      ifsc_code: form.elements.ifsc_code.value.trim(),
      ledger_id: form.elements.ledger_id.value,
    };

    if (!data.bank_name || !data.account_number || !data.ifsc_code || !data.ledger_id) {
      const newErrors = {};
      if (!data.bank_name) newErrors.bank_name = 'Bank Name is required';
      if (!data.account_number) newErrors.account_number = 'Account Number is required';
      if (!data.ifsc_code) newErrors.ifsc_code = 'IFSC Code is required';
      if (!data.ledger_id) newErrors.ledger_id = 'Linked Ledger is required';
      setErrors(newErrors);
      toast.error('Please fill all required fields (Bank Name, Account No, IFSC, Linked Ledger)');
      return;
    }

    setErrors({});

    try {
      const response = await bankAccountService.createBankAccount(data);
      if (response.success) {
        toast.success("Bank account added successfully!");
        fetchBankAccounts();
        form.reset();
        window.bootstrap.Modal.getInstance(document.getElementById('add_modal'))?.hide();
      }
    } catch (error) {
      console.error("Error adding bank account:", error);
      toast.error(error.response?.data?.message || "Failed to add bank account");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!currentAccount) return;

    const form = e.target;
    const data = {
      bank_name: form.elements.bank_name.value.trim(),
      account_number: form.elements.account_number.value.trim(),
      ifsc_code: form.elements.ifsc_code.value.trim(),
      ledger_id: form.elements.ledger_id.value,
    };

    if (!data.bank_name || !data.account_number || !data.ifsc_code || !data.ledger_id) {
      const newErrors = {};
      if (!data.bank_name) newErrors.bank_name = 'Bank Name is required';
      if (!data.account_number) newErrors.account_number = 'Account Number is required';
      if (!data.ifsc_code) newErrors.ifsc_code = 'IFSC Code is required';
      if (!data.ledger_id) newErrors.ledger_id = 'Linked Ledger is required';
      setErrors(newErrors);
      toast.error('Please fill all required fields (Bank Name, Account No, IFSC, Linked Ledger)');
      return;
    }

    setErrors({});

    try {
      const response = await bankAccountService.updateBankAccount(currentAccount.id, data);
      if (response.success) {
        toast.success("Bank account updated successfully!");
        fetchBankAccounts();
        setCurrentAccount(null);
        window.bootstrap.Modal.getInstance(document.getElementById('edit_modal'))?.hide();
      }
    } catch (error) {
      console.error("Error updating bank account:", error);
      toast.error(error.response?.data?.message || "Failed to update bank account");
    }
  };

  const handleDelete = async () => {
    if (confirmDialog.account) {
      try {
        const response = await bankAccountService.deleteBankAccount(confirmDialog.account.id);
        if (response.success) {
          toast.success("Bank account deleted successfully!");
          fetchBankAccounts();
          setConfirmDialog({ isOpen: false, account: null });
        }
      } catch (error) {
        console.error("Error deleting bank account:", error);
        toast.error("Failed to delete bank account");
      }
    }
  };

  const handleExportPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');
      const doc = new jsPDF();
      
      const tableColumn = ["Bank Name", "Account No", "IFSC Code", "Linked Ledger"];
      const tableRows = accounts.map(acc => [
        acc.bank_name,
        acc.account_number,
        acc.ifsc_code,
        acc.ledger?.name || "---"
      ]);
      
      doc.text("Bank Accounts", 14, 15);
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] }
      });
      
      doc.save("Bank_Accounts.pdf");
      toast.success("PDF exported successfully");
    } catch (error) {
      console.error("PDF Export error:", error);
      toast.error("Failed to export PDF");
    }
  };

  const handleExportExcel = async () => {
    try {
      const XLSX = await import('xlsx');
      const tableData = accounts.map(acc => ({
        "Bank Name": acc.bank_name,
        "Account No": acc.account_number,
        "IFSC Code": acc.ifsc_code,
        "Linked Ledger": acc.ledger?.name || "---"
      }));
      
      const ws = XLSX.utils.json_to_sheet(tableData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Bank Accounts");
      
      XLSX.writeFile(wb, "Bank_Accounts.xlsx");
      toast.success("Excel exported successfully");
    } catch (error) {
      console.error("Excel Export error:", error);
      toast.error("Failed to export Excel");
    }
  };

  const filteredAccounts = searchText.trim()
    ? accounts.filter(acc => {
        const q = searchText.toLowerCase();
        return (
          acc.bank_name?.toLowerCase().includes(q) ||
          acc.account_number?.toLowerCase().includes(q) ||
          acc.ifsc_code?.toLowerCase().includes(q) ||
          acc.ledger?.name?.toLowerCase().includes(q)
        );
      })
    : accounts;

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, account: null })}
        onConfirm={handleDelete}
        title="Delete Bank Account"
        message={`Are you sure you want to delete account ${confirmDialog.account?.account_number}? This action cannot be undone.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Bank Accounts</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="dropdown">
            <Link href="#"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={handleExportPDF}>
                  Download as PDF
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleExportExcel}>
                  Download as Excel
                </button>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            data-bs-toggle="modal"
            data-bs-target="#add_modal"
            onClick={() => setErrors({})}
          >
            <i className="isax isax-add-circle5 me-1"></i>New Bank Account
          </button>
        </div>
      </div>

      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ background: 'transparent', outline: 'auto' }}
                />
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead className="thead-light">
            <tr>
              {columns.bank_name && <th className="no-sort">Bank Name</th>}
              {columns.account_number && <th className="no-sort">Account No</th>}
              {columns.ifsc_code && <th className="no-sort">IFSC Code</th>}
              {columns.ledger && <th className="no-sort">Linked Ledger</th>}
              <th className="no-sort"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status"></div>
                </td>
              </tr>
            ) : filteredAccounts.map(account => (
              <tr 
                key={account.id}
                onClick={() => { setCurrentAccount(account); setErrors({}); }}
                style={{ cursor: 'pointer' }}
                className="cursor-pointer"
                data-bs-toggle="modal" 
                data-bs-target="#edit_modal"
              >
                {columns.bank_name && (
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-sm rounded-circle me-2 flex-shrink-0 bg-primary-transparent text-primary">
                        <i className="isax isax-bank"></i>
                      </div>
                      <div>
                        <h6 className="fs-14 fw-medium mb-0">
                          {account.bank_name}
                        </h6>
                      </div>
                    </div>
                  </td>
                )}
                {columns.account_number && <td>{account.account_number}</td>}
                {columns.ifsc_code && <td>{account.ifsc_code}</td>}
                {columns.ledger && <td>{account.ledger?.name || "---"}</td>}
                 <td className="text-end pe-4">
                  <div className="d-flex justify-content-end align-items-center gap-2">
                    <button 
                      className="btn btn-sm btn-soft-warning border-0" 
                      data-bs-toggle="modal" 
                      data-bs-target="#edit_modal" 
                      onClick={(e) => { e.stopPropagation(); setCurrentAccount(account); setErrors({}); }}
                      title="Edit Account"
                    >
                      <i className="isax isax-edit-2 fs-16"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-soft-danger border-0" 
                      onClick={(e) => { e.stopPropagation(); setConfirmDialog({ isOpen: true, account }); }}
                      title="Delete Account"
                    >
                      <i className="isax isax-trash fs-16"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && filteredAccounts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-5 text-muted">No bank accounts found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {pagination.total > filters.limit && (
        <div className="card-footer bg-white border-top py-3 d-flex justify-content-between align-items-center">
          <div className="fs-13 text-muted">
            Showing {(filters.page - 1) * filters.limit + 1} to {Math.min(filters.page * filters.limit, pagination.total)} of {pagination.total}
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${filters.page === 1 ? 'disabled' : ''}`}>
                <button className="page-link shadow-none" onClick={() => setFilters(p => ({ ...p, page: p.page - 1 }))} disabled={filters.page === 1}>Previous</button>
              </li>
              <li className="page-item active"><span className="page-link">{filters.page}</span></li>
              <li className={`page-item ${accounts.length < filters.limit ? 'disabled' : ''}`}>
                <button className="page-link shadow-none" onClick={() => setFilters(p => ({ ...p, page: p.page + 1 }))} disabled={accounts.length < filters.limit}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Add Modal */}
      <div id="add_modal" className="modal fade" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Bank Account</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Bank Name<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" name="bank_name" className={`form-control ${errors.bank_name ? 'is-invalid' : ''}`} placeholder="e.g., HDFC Bank" />
                      {errors.bank_name && <div className="invalid-feedback">{errors.bank_name}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Account Number<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" name="account_number" className={`form-control ${errors.account_number ? 'is-invalid' : ''}`} placeholder="e.g., 1234567890" />
                      {errors.account_number && <div className="invalid-feedback">{errors.account_number}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        IFSC Code<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" name="ifsc_code" className={`form-control ${errors.ifsc_code ? 'is-invalid' : ''}`} placeholder="e.g., HDFC0001234" />
                      {errors.ifsc_code && <div className="invalid-feedback">{errors.ifsc_code}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Linked Ledger<span className="text-danger ms-1">*</span>
                      </label>
                      <select name="ledger_id" className={`form-select ${errors.ledger_id ? 'is-invalid' : ''}`}>
                        <option value="">Select Ledger</option>
                        {ledgers.map(l => (
                          <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                      </select>
                      {errors.ledger_id && <div className="invalid-feedback">{errors.ledger_id}</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div id="edit_modal" className="modal fade" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Bank Account</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={handleEdit} key={currentAccount?.id || 'new'}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Bank Name<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" name="bank_name" className={`form-control ${errors.bank_name ? 'is-invalid' : ''}`} defaultValue={currentAccount?.bank_name || ""} />
                      {errors.bank_name && <div className="invalid-feedback">{errors.bank_name}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Account Number<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" name="account_number" className={`form-control ${errors.account_number ? 'is-invalid' : ''}`} defaultValue={currentAccount?.account_number || ""} />
                      {errors.account_number && <div className="invalid-feedback">{errors.account_number}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        IFSC Code<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" name="ifsc_code" className={`form-control ${errors.ifsc_code ? 'is-invalid' : ''}`} defaultValue={currentAccount?.ifsc_code || ""} />
                      {errors.ifsc_code && <div className="invalid-feedback">{errors.ifsc_code}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Linked Ledger<span className="text-danger ms-1">*</span>
                      </label>
                      <select name="ledger_id" className={`form-select ${errors.ledger_id ? 'is-invalid' : ''}`} defaultValue={currentAccount?.ledger_id || ""}>
                        <option value="">Select Ledger</option>
                        {ledgers.map(l => (
                          <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                      </select>
                      {errors.ledger_id && <div className="invalid-feedback">{errors.ledger_id}</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankAccounts;
