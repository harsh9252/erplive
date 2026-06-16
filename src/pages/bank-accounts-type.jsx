import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDialog from '../components/ConfirmDialog';

const initialTypes = [
  { id: 1, type: 'Salary Account', createdOn: '07 Feb 2025', status: 'Active' },
  { id: 2, type: 'Current Account', createdOn: '30 Jan 2025', status: 'Active' },
  { id: 3, type: 'Savings Account', createdOn: '04 Jan 2025', status: 'Active' }
];

const BankAccountsType = () => {
  const [types, setTypes] = useState(initialTypes);
  const [currentType, setCurrentType] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, item: null });
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("Latest");
  const [columns, setColumns] = useState({
    type: true,
    createdOn: true,
    status: true
  });

  const handleColumnToggle = (column) => {
    setColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const newType = {
      id: types.length ? Math.max(...types.map(t => t.id)) + 1 : 1,
      type: form.elements[0].value || 'New Account Type',
      createdOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Active'
    };
    setTypes([...types, newType]);
    toast.success("Account type added successfully!");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (currentType) {
      const form = e.target;
      const updatedType = {
        ...currentType,
        type: form.elements[0].value,
        status: form.elements[1].value,
      };
      setTypes(types.map(t => t.id === updatedType.id ? updatedType : t));
    }
    toast.success("Account type updated successfully!");
  };

  const handleDelete = () => {
    if (confirmDialog.item) {
      setTypes(types.filter(t => t.id !== confirmDialog.item.id));
      toast.success("Account type deleted successfully!");
      setConfirmDialog({ isOpen: false, item: null });
    }
  };

  const handleExportPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');
      const doc = new jsPDF();
      doc.text("Bank Account Types", 14, 15);
      autoTable(doc, {
        head: [["Account Type", "Created On", "Status"]],
        body: filteredTypes.map(item => [item.type, item.createdOn, item.status]),
        startY: 20,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [41, 128, 185] }
      });
      doc.save("Bank_Account_Types.pdf");
      toast.success("PDF exported successfully");
    } catch (error) {
      console.error("PDF Export error:", error);
      toast.error("Failed to export PDF");
    }
  };

  const handleExportExcel = async () => {
    try {
      const XLSX = await import('xlsx');
      const tableData = filteredTypes.map(item => ({
        "Account Type": item.type,
        "Created On": item.createdOn,
        "Status": item.status
      }));
      const ws = XLSX.utils.json_to_sheet(tableData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Account Types");
      XLSX.writeFile(wb, "Bank_Account_Types.xlsx");
      toast.success("Excel exported successfully");
    } catch (error) {
      console.error("Excel Export error:", error);
      toast.error("Failed to export Excel");
    }
  };

  let filteredTypes = types.filter(item =>
    item.type.toLowerCase().includes(searchText.toLowerCase()) ||
    item.createdOn.toLowerCase().includes(searchText.toLowerCase())
  );

  if (sortOrder === "Latest") {
    filteredTypes = [...filteredTypes].sort((a, b) => b.id - a.id);
  } else if (sortOrder === "Oldest") {
    filteredTypes = [...filteredTypes].sort((a, b) => a.id - b.id);
  }

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, item: null })}
        onConfirm={handleDelete}
        title="Delete Account Type"
        message={`Are you sure you want to delete ${confirmDialog.item?.type}? This action cannot be undone.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="d-flex align-items-center">
            <Link to="/bank-accounts">
              <i className="isax isax-arrow-left me-2 fs-14"></i>Bank Accounts
            </Link>
          </h6>
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
                <button className="dropdown-item" onClick={handleExportPDF}>Download as PDF</button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleExportExcel}>Download as Excel</button>
              </li>
            </ul>
          </div>
          <Link href="#"
            className="btn btn-primary d-flex align-items-center justify-content-center"
            data-bs-toggle="modal"
            data-bs-target="#add_modal"
          >
            <i className="isax isax-add-circle5 me-1"></i>New Account Type
          </Link>
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
              {columns.type && <th className="no-sort">Account Type</th>}
              {columns.createdOn && <th>Created On</th>}
              {columns.status && <th className="no-sort">Status</th>}
              <th className="no-sort"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTypes.map(item => (
              <tr key={item.id}>
                {columns.type && <td>{item.type}</td>}
                {columns.createdOn && <td>{item.createdOn}</td>}
                {columns.status && (
                  <td>
                    <div className="d-flex align-items-center">
                      {item.status === 'Active' ? (
                        <span className="badge badge-soft-success badge-sm d-inline-flex align-items-center">
                          Active <i className="isax isax-tick-circle4 ms-1"></i>
                        </span>
                      ) : (
                        <span className="badge badge-soft-danger badge-sm d-inline-flex align-items-center">
                          Inactive <i className="fa-solid fa-xmark ms-1"></i>
                        </span>
                      )}
                    </div>
                  </td>
                )}
                <td className="action-item">
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                      onClick={() => setCurrentType(item)}
                    >
                      <i className="isax isax-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setConfirmDialog({ isOpen: true, item })}
                    >
                      <i className="isax isax-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredTypes.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">No account types found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div id="add_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Account Type</h4>
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
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Account Type<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="edit_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Account Type</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={handleEdit} key={currentType ? currentType.id : 'empty'}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Account Type<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" defaultValue={currentType?.type} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <label className="form-label">
                        Status<span className="text-danger ms-1">*</span>
                      </label>
                      <select className="select" defaultValue={currentType?.status || "Active"}>
                        <option>Select</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
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

export default BankAccountsType;
