import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddLedger = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    ledger_group_id: '',
    opening_balance: '',
    opening_balance_type: 'DR',
    gstin: '',
    pan: '',
    is_bank_account: false,
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    description: '',
  });

  const [ledgerGroups, setLedgerGroups] = useState([]);
  const [errors, setErrors] = useState({});

  // Sample ledger groups for dropdown
  useEffect(() => {
    const sampleGroups = [
      { id: 1, name: 'Fixed Assets' },
      { id: 2, name: 'Current Assets' },
      { id: 3, name: 'Loans & Advances' },
      { id: 4, name: 'Capital Account' },
      { id: 5, name: 'Current Liabilities' },
      { id: 6, name: 'Direct Income' },
      { id: 7, name: 'Indirect Income' },
      { id: 8, name: 'Direct Expenses' },
      { id: 9, name: 'Indirect Expenses' },
      { id: 10, name: 'Sundry Debtors' },
      { id: 11, name: 'Sundry Creditors' },
      { id: 12, name: 'Bank Accounts' },
      { id: 13, name: 'Cash-in-Hand' },
      { id: 14, name: 'Duties & Taxes' },
    ];
    setLedgerGroups(sampleGroups);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ledger Name is required';
    }

    if (!formData.ledger_group_id) {
      newErrors.ledger_group_id = 'Under Group is required';
    }

    if (formData.is_bank_account) {
      if (!formData.bank_name.trim()) {
        newErrors.bank_name = 'Bank Name is required for bank accounts';
      }
      if (!formData.account_number.trim()) {
        newErrors.account_number = 'Account Number is required for bank accounts';
      }
      if (!formData.ifsc_code.trim()) {
        newErrors.ifsc_code = 'IFSC Code is required for bank accounts';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare data for API
    const submitData = {
      name: formData.name.trim(),
      ledger_group_id: formData.ledger_group_id,
      opening_balance: formData.opening_balance ? parseFloat(formData.opening_balance) : 0,
      opening_balance_type: formData.opening_balance_type,
      gstin: formData.gstin.trim() || null,
      pan: formData.pan.trim() || null,
      is_bank_account: formData.is_bank_account,
      bank_name: formData.is_bank_account ? formData.bank_name.trim() : null,
      account_number: formData.is_bank_account ? formData.account_number.trim() : null,
      ifsc_code: formData.is_bank_account ? formData.ifsc_code.trim() : null,
      description: formData.description.trim() || null,
    };

    console.log('Ledger created:', submitData);
    // TODO: Call API when backend is ready
    // ledgerService.createLedger(submitData)
    //   .then(() => navigate('/ledgers'))
    //   .catch(err => console.error('Error:', err));

    navigate('/ledgers');
  };

  const handleCancel = () => {
    navigate('/ledgers');
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Add Ledger</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/accounting">Accounting</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/accounting">Chart of Accounts</Link>
              </li>
              <li className="breadcrumb-item active">Add Ledger</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="mb-4">
              <h6 className="mb-3">
                <i className="isax isax-info-circle me-2"></i>Basic Information
              </h6>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Ledger Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Cash in Hand"
                  />
                  {errors.name && (
                    <div className="invalid-feedback d-block">{errors.name}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Under Group <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.ledger_group_id ? 'is-invalid' : ''}`}
                    name="ledger_group_id"
                    value={formData.ledger_group_id}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Ledger Group</option>
                    {ledgerGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                  {errors.ledger_group_id && (
                    <div className="invalid-feedback d-block">{errors.ledger_group_id}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Opening Balance</label>
                  <input
                    type="number"
                    className="form-control"
                    name="opening_balance"
                    value={formData.opening_balance}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Balance Type</label>
                  <div className="mt-2">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="opening_balance_type"
                        id="balanceDR"
                        value="DR"
                        checked={formData.opening_balance_type === 'DR'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="balanceDR">
                        Debit (DR)
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="opening_balance_type"
                        id="balanceCR"
                        value="CR"
                        checked={formData.opening_balance_type === 'CR'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="balanceCR">
                        Credit (CR)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Party Information */}
            <div className="mb-4">
              <h6 className="mb-3">
                <i className="isax isax-profile-2user me-2"></i>Party Information (Optional)
              </h6>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">GSTIN</label>
                  <input
                    type="text"
                    className="form-control"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleInputChange}
                    placeholder="e.g., 27AABCT1234H1Z0"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">PAN</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pan"
                    value={formData.pan}
                    onChange={handleInputChange}
                    placeholder="e.g., AAAPA1234A"
                  />
                </div>
              </div>
            </div>

            {/* Bank Account Information */}
            <div className="mb-4">
              <h6 className="mb-3">
                <i className="isax isax-bank me-2"></i>Bank Account Information
              </h6>
              <div className="row mb-3">
                <div className="col-md-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_bank_account"
                      id="isBankAccount"
                      checked={formData.is_bank_account}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="isBankAccount">
                      This is a Bank Account
                    </label>
                  </div>
                </div>
              </div>

              {formData.is_bank_account && (
                <>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        Bank Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.bank_name ? 'is-invalid' : ''}`}
                        name="bank_name"
                        value={formData.bank_name}
                        onChange={handleInputChange}
                        placeholder="e.g., HDFC Bank"
                      />
                      {errors.bank_name && (
                        <div className="invalid-feedback d-block">{errors.bank_name}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">
                        Account Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.account_number ? 'is-invalid' : ''}`}
                        name="account_number"
                        value={formData.account_number}
                        onChange={handleInputChange}
                        placeholder="e.g., 1234567890"
                      />
                      {errors.account_number && (
                        <div className="invalid-feedback d-block">{errors.account_number}</div>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        IFSC Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.ifsc_code ? 'is-invalid' : ''}`}
                        name="ifsc_code"
                        value={formData.ifsc_code}
                        onChange={handleInputChange}
                        placeholder="e.g., HDFC0001234"
                      />
                      {errors.ifsc_code && (
                        <div className="invalid-feedback d-block">{errors.ifsc_code}</div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description (optional)"
                rows="3"
              ></textarea>
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="isax isax-save-2 me-2"></i>Save Ledger
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddLedger;
