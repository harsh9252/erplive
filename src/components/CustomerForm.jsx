import { useState, useEffect } from 'react';

const STATES = [
  { code: '01', name: 'Jammu and Kashmir', short: 'JK' },
  { code: '02', name: 'Himachal Pradesh', short: 'HP' },
  { code: '03', name: 'Punjab', short: 'PB' },
  { code: '04', name: 'Chandigarh', short: 'CH' },
  { code: '05', name: 'Uttarakhand', short: 'UT' },
  { code: '06', name: 'Haryana', short: 'HR' },
  { code: '07', name: 'Delhi', short: 'DL' },
  { code: '08', name: 'Rajasthan', short: 'RJ' },
  { code: '09', name: 'Uttar Pradesh', short: 'UP' },
  { code: '10', name: 'Bihar', short: 'BR' },
  { code: '11', name: 'Sikkim', short: 'SK' },
  { code: '12', name: 'Arunachal Pradesh', short: 'AR' },
  { code: '13', name: 'Nagaland', short: 'NL' },
  { code: '14', name: 'Manipur', short: 'MN' },
  { code: '15', name: 'Mizoram', short: 'MZ' },
  { code: '16', name: 'Tripura', short: 'TR' },
  { code: '17', name: 'Meghalaya', short: 'ML' },
  { code: '18', name: 'Assam', short: 'AS' },
  { code: '19', name: 'West Bengal', short: 'WB' },
  { code: '20', name: 'Jharkhand', short: 'JH' },
  { code: '21', name: 'Odisha', short: 'OR' },
  { code: '22', name: 'Chhattisgarh', short: 'CG' },
  { code: '23', name: 'Madhya Pradesh', short: 'MP' },
  { code: '24', name: 'Gujarat', short: 'GJ' },
  { code: '27', name: 'Maharashtra', short: 'MH' },
  { code: '29', name: 'Karnataka', short: 'KA' },
  { code: '30', name: 'Goa', short: 'GA' },
  { code: '31', name: 'Lakshadweep', short: 'LD' },
  { code: '32', name: 'Kerala', short: 'KL' },
  { code: '33', name: 'Tamil Nadu', short: 'TN' },
  { code: '34', name: 'Puducherry', short: 'PY' },
  { code: '35', name: 'Andaman and Nicobar Islands', short: 'AN' },
  { code: '36', name: 'Telangana', short: 'TG' },
  { code: '37', name: 'Andhra Pradesh', short: 'AP' },
  { code: '38', name: 'Ladakh', short: 'LA' },
];

const CustomerForm = ({ initialData = null, onSubmit, isLoading = false, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    gstin: '',
    pan: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    state_code: '',
    pincode: '',
    opening_balance: '0',
    balance_type: 'DR',
    credit_limit: '0',
    payment_terms: 'net30',
    payment_terms_days: '0',
    liable_to_tds: false,
    liable_to_tcs: false,
    gst_registration_type: 'Regular',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        gstin: initialData.gstin || '',
        pan: initialData.pan || initialData.pan_no || '',
        phone: initialData.phone || '',
        email: initialData.email || '',
        address: initialData.address || '',
        city: initialData.city || '',
        state: initialData.state || '',
        state_code: initialData.state_code || '',
        pincode: initialData.pincode || '',
        opening_balance: String(initialData.ledger?.opening_balance || initialData.opening_balance || '0'),
        balance_type: initialData.ledger?.balance_type || initialData.balance_type || 'DR',
        credit_limit: String(initialData.credit_limit || '0'),
        payment_terms: initialData.payment_terms || 'net30',
        payment_terms_days: String(initialData.payment_terms_days || '0'),
        liable_to_tds: initialData.liable_to_tds === 1 || initialData.liable_to_tds === '1' || initialData.liable_to_tds === true || initialData.liable_to_tds === 'true',
        liable_to_tcs: initialData.liable_to_tcs === 1 || initialData.liable_to_tcs === '1' || initialData.liable_to_tcs === true || initialData.liable_to_tcs === 'true',
        gst_registration_type: initialData.gst_registration_type || 'Regular',
      });
    } else {
      setFormData({
        name: '',
        gstin: '',
        pan: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        state_code: '',
        pincode: '',
        opening_balance: '0',
        balance_type: 'DR',
        credit_limit: '0',
        payment_terms: 'net30',
        payment_terms_days: '0',
        liable_to_tds: false,
        liable_to_tcs: false,
        gst_registration_type: 'Regular',
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    let finalValue = value;

    if (name === 'phone' || name === 'pincode') {
      finalValue = value.replace(/\D/g, '');
    } else if (name === 'email') {
      finalValue = value.replace(/[^\w@.\-]/g, '');
    } else if (name === 'pan' || name === 'gstin') {
      finalValue = value.toUpperCase();
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : finalValue
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleStateChange = (e) => {
    const selectedName = e.target.value;
    const stateObj = STATES.find(s => s.name === selectedName);
    setFormData(prev => ({
      ...prev,
      state: selectedName,
      state_code: stateObj ? stateObj.code : '',
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Company Name is required';

    if (formData.gstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(formData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format';
    }

    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = 'Invalid PAN format (e.g., AABCE1234F)';
    }

    if (formData.pincode && formData.pincode.length !== 6) {
      newErrors.pincode = 'Pincode must be exactly 6 digits';
    }

    if (formData.phone) {
      if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits and cannot start with 0-5';
      }
    }

    if (formData.email) {
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-header bg-white py-3 border-bottom d-flex align-items-center">
          <div className="icon-box bg-soft-primary text-primary rounded-pill me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="isax isax-profile-2user fs-20"></i>
          </div>
          <h6 className="mb-0 fw-bold">Basic & Identity Information</h6>
        </div>
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-9">
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">Customer Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control bg-light border-0 py-2 ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Rajesh Enterprises"
                  required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">PAN Number</label>
                <input
                  type="text"
                  className={`form-control bg-light border-0 py-2 ${errors.pan ? 'is-invalid' : ''}`}
                  name="pan"
                  value={formData.pan}
                  onChange={handleInputChange}
                  placeholder="e.g., AABCE1234F"
                />
                {errors.pan && <div className="invalid-feedback">{errors.pan}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">GST Registration Type</label>
                <select
                  className="form-control bg-light border-0 py-2"
                  name="gst_registration_type"
                  value={formData.gst_registration_type}
                  onChange={handleInputChange}
                >
                  <option value="Regular">Regular</option>
                  <option value="Composition">Composition</option>
                  <option value="Unregistered">Unregistered</option>
                  <option value="Consumer">Consumer</option>
                  <option value="Overseas">Overseas</option>
                  <option value="SEZ">SEZ</option>
                  <option value="Deemed Export">Deemed Export</option>
                  <option value="Tax Deductor">Tax Deductor</option>
                  <option value="Input Service Distributor">Input Service Distributor</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 text-uppercase">
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">GSTIN</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0"><i className="isax isax-building-4"></i></span>
                  <input
                    type="text"
                    className={`form-control bg-light border-0 py-2 ps-0 ${errors.gstin ? 'is-invalid' : ''}`}
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleInputChange}
                    placeholder="15-digit GST Registration"
                  />
                </div>
                {errors.gstin && <div className="invalid-feedback d-block">{errors.gstin}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">Primary Contact (Mobile)</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0"><i className="isax isax-call"></i></span>
                  <input
                    type="tel"
                    className={`form-control bg-light border-0 py-2 ps-0 ${errors.phone ? 'is-invalid' : ''}`}
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., 9876543210"
                  />
                </div>
                {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label fw-semibold">Communication Email</label>
                <input
                  type="email"
                  className={`form-control bg-light border-0 py-2 ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g., billing@rajesh.com"
                />
                {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-header bg-white py-3 border-bottom d-flex align-items-center">
          <div className="icon-box bg-soft-info text-info rounded-pill me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="isax isax-location fs-20"></i>
          </div>
          <h6 className="mb-0 fw-bold">Address & Location</h6>
        </div>
        <div className="card-body p-4">
          <div className="mb-3">
            <label className="form-label fw-semibold">Billing Address</label>
            <textarea
              className="form-control bg-light border-0 py-2"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Factory/Office Address, Area, Landmark..."
              rows="3"
            ></textarea>
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">City</label>
                <input
                  type="text"
                  className="form-control bg-light border-0 py-2"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City Name"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">State</label>
                <select
                  className="form-control bg-light border-0 py-2"
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                >
                  <option value="">Select State</option>
                  {STATES.map((s) => (
                    <option key={s.code} value={s.name}>
                      {s.code} - {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group mb-3">
                <label className="form-label fw-semibold">Pincode</label>
                <input
                  type="text"
                  className={`form-control bg-light border-0 py-2 ${errors.pincode ? 'is-invalid' : ''}`}
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="6-digit ZIP"
                  maxLength="6"
                />
                {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-header bg-white py-3 border-bottom d-flex align-items-center">
          <div className="icon-box bg-soft-success text-success rounded-pill me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="isax isax-wallet fs-20"></i>
          </div>
          <h6 className="mb-0 fw-bold">Financials & Credit Settings</h6>
        </div>
        <div className="card-body p-4">
          <div className="row g-4 align-items-end">
            <div className="col-md-4">
              <div className="form-group mb-0">
                <label className="form-label fw-semibold">Opening Balance</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">₹</span>
                  <input
                    type="number"
                    className="form-control bg-light border-0 py-2"
                    name="opening_balance"
                    value={formData.opening_balance}
                    onChange={handleInputChange}
                    step="0.01"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex p-2 bg-light rounded-3">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="balance_type"
                    id="bal_dr"
                    value="DR"
                    checked={formData.balance_type === 'DR'}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label fw-medium" htmlFor="bal_dr">Debit (DR)</label>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form-group mb-0">
                <label className="form-label fw-semibold">Credit Limit</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0"><i className="isax isax-card-tick"></i></span>
                  <input
                    type="number"
                    className="form-control bg-light border-0 py-2"
                    name="credit_limit"
                    value={formData.credit_limit}
                    onChange={handleInputChange}
                    placeholder="Max receivable amount"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-0">
                <label className="form-label fw-semibold">Standard Payment Terms</label>
                <select
                  className="form-control bg-light border-0 py-2"
                  name="payment_terms"
                  value={formData.payment_terms}
                  onChange={handleInputChange}
                >
                  <option value="prepaid">Prepaid / Due on Receipt</option>
                  <option value="net30">Net 30 Days (Standard)</option>
                  <option value="net45">Net 45 Days</option>
                  <option value="net60">Net 60 Days</option>
                  <option value="custom">Custom Terms</option>
                </select>
              </div>
            </div>
            {formData.payment_terms === 'custom' && (
              <div className="col-md-6">
                <div className="form-group mb-0">
                  <label className="form-label fw-semibold">Payment Terms (Days)</label>
                  <input
                    type="number"
                    className="form-control bg-light border-0 py-2"
                    name="payment_terms_days"
                    value={formData.payment_terms_days}
                    onChange={handleInputChange}
                    placeholder="Enter number of days"
                    min="0"
                  />
                </div>
              </div>
            )}
            <div className="col-md-6">
              <div className="form-check form-switch p-3 bg-light rounded-3 d-flex align-items-center justify-content-between mb-0">
                <label className="form-check-label fw-semibold mb-0" htmlFor="liable_to_tds">
                  Liable to TDS (Tax Deducted at Source)
                </label>
                <input
                  className="form-check-input ms-3 me-0"
                  type="checkbox"
                  id="liable_to_tds"
                  name="liable_to_tds"
                  checked={formData.liable_to_tds}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check form-switch p-3 bg-light rounded-3 d-flex align-items-center justify-content-between mb-0">
                <label className="form-check-label fw-semibold mb-0" htmlFor="liable_to_tcs">
                  Liable to TCS (Tax Collected at Source)
                </label>
                <input
                  className="form-check-input ms-3 me-0"
                  type="checkbox"
                  id="liable_to_tcs"
                  name="liable_to_tcs"
                  checked={formData.liable_to_tcs}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-end gap-3 mb-5 mt-4">
        {onClose && (
          <button type="button" className="btn btn-light px-5 rounded-pill shadow-sm" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary px-5 rounded-pill shadow-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</>
          ) : (
            <><i className="isax isax-save-2 me-2"></i>Save Customer</>
          )}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
