import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDialog from '../components/ConfirmDialog';

const initialAccounts = [
  { id: 1, name: 'Emily Clark', avatar: '/assets/img/profiles/avatar-28.jpg', accountNo: '3298784309485', type: 'Savings Account', notes: 'Account that allows individuals to save money', balance: 200, status: 'Active' },
  { id: 2, name: 'Michael Smith', avatar: '/assets/img/profiles/avatar-27.jpg', accountNo: '4829302839210', type: 'Current Account', notes: 'Business current account', balance: 15400, status: 'Inactive' },
  { id: 3, name: 'Sarah Johnson', avatar: '/assets/img/profiles/avatar-26.jpg', accountNo: '9843823483921', type: 'Savings Account', notes: 'Personal savings', balance: 3500, status: 'Active' },
];

const BankAccounts = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("Latest"); // Latest, Oldest
  const [columns, setColumns] = useState({
    accountHolder: true,
    accountNo: true,
    accountType: true,
    notes: true,
    openingBalance: true,
    status: true
  });
  const [currentAccount, setCurrentAccount] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, account: null });

  const handleColumnToggle = (column) => {
    setColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const newAccount = {
      id: accounts.length ? Math.max(...accounts.map(a => a.id)) + 1 : 1,
      name: form.elements[0].value || 'New Account',
      avatar: '/assets/img/profiles/avatar-28.jpg',
      accountNo: form.elements[3].value || '1234567890',
      type: form.elements[5].options[form.elements[5].selectedIndex].text,
      notes: '',
      balance: parseFloat(form.elements[6].value) || 0,
      status: 'Active'
    };
    setAccounts([...accounts, newAccount]);
    toast.success("Bank account added successfully!");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (currentAccount) {
      const form = e.target;
      const updatedAccount = {
        ...currentAccount,
        name: form.elements[0].value,
        accountNo: form.elements[3].value,
        type: form.elements[5].options[form.elements[5].selectedIndex].text,
        balance: parseFloat(form.elements[6].value) || 0,
      };
      setAccounts(accounts.map(a => a.id === updatedAccount.id ? updatedAccount : a));
    }
    toast.success("Bank account updated successfully!");
  };

  const handleDelete = () => {
    if (confirmDialog.account) {
      setAccounts(accounts.filter(a => a.id !== confirmDialog.account.id));
      toast.success("Bank account deleted successfully!");
      setConfirmDialog({ isOpen: false, account: null });
    }
  };

  let filteredAccounts = accounts.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.accountNo.includes(searchText) ||
    item.type.toLowerCase().includes(searchText.toLowerCase())
  );

  if (sortOrder === "Latest") {
    filteredAccounts = [...filteredAccounts].sort((a, b) => b.id - a.id);
  } else if (sortOrder === "Oldest") {
    filteredAccounts = [...filteredAccounts].sort((a, b) => a.id - b.id);
  }

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, account: null })}
        onConfirm={handleDelete}
        title="Delete Bank Account"
        message={`Are you sure you want to delete ${confirmDialog.account?.name}? This action cannot be undone.`}
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
                <Link className="dropdown-item" href="#">
                  Download as PDF
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  Download as Excel
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/bank-accounts-type" className="btn btn-dark d-inline-flex align-items-center">
            Account Type
          </Link>
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            data-bs-toggle="modal"
            data-bs-target="#add_modal"
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
            <Link
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </Link>
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown">
              <Link href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center fw-medium"
                data-bs-toggle="dropdown"
              >
                <i className="isax isax-sort me-1"></i>Sort By :{' '}
                <span className="fw-normal ms-1">{sortOrder}</span>
              </Link>
              <ul className="dropdown-menu  dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={() => setSortOrder("Latest")}>
                    Latest
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => setSortOrder("Oldest")}>
                    Oldest
                  </button>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <Link href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                <i className="isax isax-grid-3 me-1"></i>Column
              </Link>
              <ul className="dropdown-menu  dropdown-menu">
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.accountHolder} onChange={() => handleColumnToggle('accountHolder')} />
                    <span>Account Holder</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.accountNo} onChange={() => handleColumnToggle('accountNo')} />
                    <span>Account No</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.accountType} onChange={() => handleColumnToggle('accountType')} />
                    <span>Account Type</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.notes} onChange={() => handleColumnToggle('notes')} />
                    <span>Notes</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.openingBalance} onChange={() => handleColumnToggle('openingBalance')} />
                    <span>Opening Balance</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.status} onChange={() => handleColumnToggle('status')} />
                    <span>Status</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead className="thead-light">
            <tr>
              <th className="no-sort">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" id="select-all" />
                </div>
              </th>
              {columns.accountHolder && <th className="no-sort">Account Holder Name</th>}
              {columns.accountNo && <th className="no-sort">Account No</th>}
              {columns.accountType && <th className="no-sort">Account Type</th>}
              {columns.notes && <th className="no-sort">Notes</th>}
              {columns.openingBalance && <th>Opening Balance</th>}
              {columns.status && <th className="no-sort">Status</th>}
              <th className="no-sort"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map(account => (
              <tr key={account.id}>
                <td>
                  <div className="form-check form-check-md">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </td>
                {columns.accountHolder && (
                  <td>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                        <img
                          src={account.avatar}
                          className="rounded-circle"
                          alt="img"
                        />
                      </Link>
                      <div>
                        <h6 className="fs-14 fw-medium mb-0">
                          <Link href="#">{account.name}</Link>
                        </h6>
                      </div>
                    </div>
                  </td>
                )}
                {columns.accountNo && <td>{account.accountNo}</td>}
                {columns.accountType && <td>{account.type}</td>}
                {columns.notes && <td>{account.notes}</td>}
                {columns.openingBalance && <td className="text-dark">${account.balance}</td>}
                {columns.status && (
                  <td>
                    <div className="d-flex align-items-center">
                      {account.status === 'Active' ? (
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
                      onClick={() => setCurrentAccount(account)}
                    >
                      <i className="isax isax-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setConfirmDialog({ isOpen: true, account })}
                    >
                      <i className="isax isax-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredAccounts.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">No bank accounts found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <div id="add_modal" className="modal fade">
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
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Account Name<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="e.g., Main Business Account" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Bank Name<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="e.g., State Bank of India" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Branch</label>
                      <input type="text" className="form-control" placeholder="e.g., Mumbai Main Branch" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Account Number<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="e.g., 1234567890" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        IFSC Code<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="e.g., SBIN0001234" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Account Type<span className="text-danger ms-1">*</span>
                      </label>
                      <select className="form-select" required>
                        <option value="">Select Account Type</option>
                        <option value="SAVINGS">Savings</option>
                        <option value="CURRENT">Current</option>
                        <option value="CASH_CREDIT">Cash Credit</option>
                        <option value="OVERDRAFT">Overdraft</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Opening Balance</label>
                      <input type="number" className="form-control" placeholder="0.00" step="0.01" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Linked Ledger<span className="text-danger ms-1">*</span>
                      </label>
                      <select className="form-select" required>
                        <option value="">Select Ledger</option>
                        <option value="bank_ledger_1">Bank Account - Main</option>
                        <option value="bank_ledger_2">Bank Account - Secondary</option>
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
                  Add New
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div id="edit_modal" className="modal fade">
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
            <form onSubmit={handleEdit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Account Name<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" defaultValue={currentAccount?.name || ""} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Bank Name<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" defaultValue="Global Trust Bank" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Branch</label>
                      <input type="text" className="form-control" defaultValue="New York" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Account Number<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" defaultValue={currentAccount?.accountNo || ""} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        IFSC Code<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" defaultValue="GTBK0001234" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Account Type<span className="text-danger ms-1">*</span>
                      </label>
                      <select className="form-select" required>
                        <option value="">Select Account Type</option>
                        <option value="SAVINGS" selected>Savings</option>
                        <option value="CURRENT">Current</option>
                        <option value="CASH_CREDIT">Cash Credit</option>
                        <option value="OVERDRAFT">Overdraft</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Opening Balance</label>
                      <input type="number" className="form-control" defaultValue={currentAccount?.balance || ""} step="0.01" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Linked Ledger<span className="text-danger ms-1">*</span>
                      </label>
                      <select className="form-select" required>
                        <option value="">Select Ledger</option>
                        <option value="bank_ledger_1" selected>Bank Account - Main</option>
                        <option value="bank_ledger_2">Bank Account - Secondary</option>
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

export default BankAccounts;
