import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bankReconciliationService } from '../services/bankReconciliationService';
import { bankAccountService } from '../services/bankAccountService';

const AddBankReconciliation = () => {
  const navigate = useNavigate();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    bank_account_id: '',
    statement_date: new Date().toISOString().split('T')[0],
    statement_balance: 0,
    transactions: [
      { id: Date.now(), transaction_date: new Date().toISOString().split('T')[0], cheque_no: '', description: '', debit_amount: 0, credit_amount: 0 }
    ]
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const fetchBankAccounts = async () => {
    try {
      const response = await bankAccountService.getBankAccounts();
      if (response.success) {
        setBankAccounts(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
      toast.error("Failed to load bank accounts");
    }
  };

  const addRow = () => {
    setFormData({
      ...formData,
      transactions: [
        ...formData.transactions,
        { id: Date.now(), transaction_date: new Date().toISOString().split('T')[0], cheque_no: '', description: '', debit_amount: 0, credit_amount: 0 }
      ]
    });
  };

  const removeRow = (id) => {
    if (formData.transactions.length > 1) {
      setFormData({
        ...formData,
        transactions: formData.transactions.filter(t => t.id !== id)
      });
    }
  };

  const handleTransactionChange = (id, field, value) => {
    setFormData({
      ...formData,
      transactions: formData.transactions.map(t => 
        t.id === id ? { ...t, [field]: value } : t
      )
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.bank_account_id) newErrors.bank_account_id = "Please select a bank account.";
    if (!formData.statement_date) newErrors.statement_date = "Statement date is required.";
    if (formData.statement_balance === '' || formData.statement_balance === null || formData.statement_balance === undefined) {
      newErrors.statement_balance = "Closing balance is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Clean up transactions (remove IDs used for local state)
      const dataToSubmit = {
        ...formData,
        transactions: formData.transactions.map(({ id, ...rest }) => rest)
      };
      
      await bankReconciliationService.createReconciliation(dataToSubmit);
      toast.success("Bank reconciliation created successfully!");
      navigate('/accounting/bank-reconciliation');
    } catch (error) {
      console.error('Error creating reconciliation:', error);
      toast.error(error.response?.data?.message || "Failed to create reconciliation");
    } finally {
      setLoading(false);
    }
  };

  const totalDebit = formData.transactions.reduce((sum, t) => sum + parseFloat(t.debit_amount || 0), 0);
  const totalCredit = formData.transactions.reduce((sum, t) => sum + parseFloat(t.credit_amount || 0), 0);

  return (
    <>
      <div className="page-header mb-4">
        <div className="row align-items-center">
          <div className="col">
            <h4 className="page-title">New Bank Reconciliation</h4>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/accounting/bank-reconciliation">Bank Reconciliation</Link></li>
              <li className="breadcrumb-item active">Add New</li>
            </ul>
          </div>
          <div className="col-auto">
            <Link to="/accounting/bank-reconciliation" className="btn btn-outline-secondary">
              <i className="isax isax-arrow-left-2 me-2"></i>Back to List
            </Link>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-transparent border-bottom-0 pt-4 px-4 pb-0">
            <h5 className="card-title mb-0">Reconciliation Details</h5>
          </div>
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-600">Bank Account <span className="text-danger">*</span></label>
                <select 
                  className={`form-select ${errors.bank_account_id ? 'is-invalid' : ''}`}
                  value={formData.bank_account_id}
                  onChange={(e) => handleInputChange('bank_account_id', e.target.value)}
                >
                  <option value="">Select Bank Account</option>
                  {bankAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.bank_name} - {acc.account_number}
                    </option>
                  ))}
                </select>
                {errors.bank_account_id && <div className="invalid-feedback">{errors.bank_account_id}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Statement Date <span className="text-danger">*</span></label>
                <input 
                  type="date" 
                  className={`form-control ${errors.statement_date ? 'is-invalid' : ''}`}
                  value={formData.statement_date}
                  onChange={(e) => handleInputChange('statement_date', e.target.value)}
                />
                {errors.statement_date && <div className="invalid-feedback">{errors.statement_date}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Closing Balance (as per statement) <span className="text-danger">*</span></label>
                <input 
                  type="number" 
                  step="0.01"
                  className={`form-control ${errors.statement_balance ? 'is-invalid' : ''}`}
                  value={formData.statement_balance}
                  onChange={(e) => handleInputChange('statement_balance', e.target.value)}
                  placeholder="0.00"
                />
                {errors.statement_balance && <div className="invalid-feedback">{errors.statement_balance}</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-transparent border-bottom pt-4 px-4 pb-3">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="card-title mb-0">Bank Statement Transactions</h5>
              <p className="text-muted small mb-0">Enter entries appearing in bank statement but not in ERP</p>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-nowrap mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '15%' }}>Date</th>
                    <th style={{ width: '15%' }}>Cheque/Ref No</th>
                    <th>Description</th>
                    <th style={{ width: '12%' }} className="text-end">Debit (In)</th>
                    <th style={{ width: '12%' }} className="text-end">Credit (Out)</th>
                    <th style={{ width: '5%' }} className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.transactions.map((row, index) => (
                    <tr key={row.id}>
                      <td>
                        <input 
                          type="date" 
                          className="form-control form-control-sm"
                          value={row.transaction_date}
                          onChange={(e) => handleTransactionChange(row.id, 'transaction_date', e.target.value)}
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="form-control form-control-sm"
                          value={row.cheque_no}
                          onChange={(e) => handleTransactionChange(row.id, 'cheque_no', e.target.value)}
                          placeholder="Ref #"
                        />
                      </td>
                      <td>
                        <input 
                          type="text" 
                          className="form-control form-control-sm"
                          value={row.description}
                          onChange={(e) => handleTransactionChange(row.id, 'description', e.target.value)}
                          placeholder="Transaction Description"
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          step="0.01"
                          className="form-control form-control-sm text-end"
                          value={row.debit_amount}
                          onChange={(e) => handleTransactionChange(row.id, 'debit_amount', e.target.value)}
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          step="0.01"
                          className="form-control form-control-sm text-end"
                          value={row.credit_amount}
                          onChange={(e) => handleTransactionChange(row.id, 'credit_amount', e.target.value)}
                        />
                      </td>
                      <td className="text-center">
                        <button 
                          type="button" 
                          className="btn btn-sm btn-soft-danger btn-icon"
                          onClick={() => removeRow(row.id)}
                          disabled={formData.transactions.length === 1}
                        >
                          <i className="isax isax-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light fw-600">
                  <tr>
                    <td colSpan="3" className="text-end">Total</td>
                    <td className="text-end">{totalDebit.toFixed(2)}</td>
                    <td className="text-end">{totalCredit.toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="card-footer border-top-0 bg-transparent px-4 py-3">
            <button type="button" className="btn btn-soft-primary btn-sm" onClick={addRow}>
              <i className="isax isax-add-circle me-1"></i>Add Row
            </button>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-end gap-3 mb-5">
          <Link to="/accounting/bank-reconciliation" className="btn btn-light px-4">Cancel</Link>
          <button type="submit" className="btn btn-primary px-4" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              'Save & Proceed'
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddBankReconciliation;
