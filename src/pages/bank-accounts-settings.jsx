import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { toast } from 'react-toastify';

const BankAccountsSettings = () => {
  useEffect(() => {
    console.log('BankAccountsSettings component mounted');
    return () => console.log('BankAccountsSettings component unmounted');
  }, []);

  const [accounts, setAccounts] = useState([
    { id: 1, bankName: 'HDFC Bank', accountNumber: '****1234', accountType: 'Savings', branch: 'Mumbai', ifsc: 'HDFC0001234', isDefault: true },
    { id: 2, bankName: 'ICICI Bank', accountNumber: '****5678', accountType: 'Current', branch: 'Delhi', ifsc: 'ICIC0005678', isDefault: false },
    { id: 3, bankName: 'SBI', accountNumber: '****9012', accountType: 'Savings', branch: 'Bangalore', ifsc: 'SBIN0009012', isDefault: false }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountType: 'Savings',
    branch: '',
    ifsc: '',
    isDefault: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (account) => {
    setEditingId(account.id);
    setFormData({
      bankName: account.bankName,
      accountNumber: account.accountNumber.replace('****', ''),
      accountType: account.accountType,
      branch: account.branch,
      ifsc: account.ifsc,
      isDefault: account.isDefault
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing account
      setAccounts(accounts.map(a => 
        a.id === editingId ? { 
          ...a, 
          ...formData,
          accountNumber: '****' + formData.accountNumber.slice(-4)
        } : a
      ));
      toast.success('Bank account updated successfully!');
    } else {
      // Add new account
      const newAccount = {
        id: accounts.length + 1,
        ...formData,
        accountNumber: '****' + formData.accountNumber.slice(-4)
      };
      setAccounts([...accounts, newAccount]);
      toast.success('Bank account added successfully!');
    }
    setFormData({ bankName: '', accountNumber: '', accountType: 'Savings', branch: '', ifsc: '', isDefault: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setFormData({ bankName: '', accountNumber: '', accountType: 'Savings', branch: '', ifsc: '', isDefault: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this bank account?')) {
      setAccounts(accounts.filter(a => a.id !== id));
      toast.success('Bank account deleted successfully!');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/bank-accounts-settings" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3 d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Bank Accounts</h6>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? 'Cancel' : 'Add Bank Account'}
                </button>
              </div>

              {showForm && (
                <div className="card mb-3">
                  <div className="card-body">
                    <h6 className="mb-3">{editingId ? 'Edit Bank Account' : 'Add New Bank Account'}</h6>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Bank Name <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleInputChange}
                            placeholder="e.g., HDFC Bank"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Account Number <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            placeholder="Enter account number"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Account Type <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="accountType"
                            value={formData.accountType}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="Savings">Savings</option>
                            <option value="Current">Current</option>
                            <option value="Fixed Deposit">Fixed Deposit</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Branch <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="branch"
                            value={formData.branch}
                            onChange={handleInputChange}
                            placeholder="e.g., Mumbai"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">IFSC Code <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="ifsc"
                            value={formData.ifsc}
                            onChange={handleInputChange}
                            placeholder="e.g., HDFC0001234"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label d-block">Set as Default</label>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="isDefault"
                              checked={formData.isDefault}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Default Account</label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {editingId ? 'Update Account' : 'Add Account'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {!showForm && (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Bank Name</th>
                        <th>Account Number</th>
                        <th>Account Type</th>
                        <th>Default</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map(account => (
                        <tr key={account.id}>
                          <td>{account.bankName}</td>
                          <td>{account.accountNumber}</td>
                          <td>{account.accountType}</td>
                          <td>
                            {account.isDefault && <span className="badge bg-success">Default</span>}
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm btn-primary me-2"
                              onClick={() => handleEdit(account)}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(account.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccountsSettings;
