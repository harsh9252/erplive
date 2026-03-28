import { useState, useEffect } from 'react';

const CustomerForm = ({ initialData = null, onSubmit, isLoading = false, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    display_name: '',
    company_name: '',
    customer_type: 'INDIVIDUAL',
    gstin: '',
    pan: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    state_code: '',
    pincode: '',
    credit_limit: '',
    credit_days: '',
    opening_balance: '',
    balance_type: 'DR',
    bank_account: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        company_name: initialData.company || initialData.company_name || '',
      }));
    } else {
      setFormData({
        name: '',
        display_name: '',
        company_name: '',
        customer_type: 'INDIVIDUAL',
        gstin: '',
        pan: '',
        email: '',
        phone: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        state_code: '',
        pincode: '',
        credit_limit: '',
        credit_days: '',
        opening_balance: '',
        balance_type: 'DR',
        bank_account: '',
      });
      setErrors({});
    }
  }, [initialData]);

  const states = [
    { code: '01', name: 'Jammu and Kashmir' },
    { code: '02', name: 'Himachal Pradesh' },
    { code: '03', name: 'Punjab' },
    { code: '04', name: 'Chandigarh' },
    { code: '05', name: 'Uttarakhand' },
    { code: '06', name: 'Haryana' },
    { code: '07', name: 'Delhi' },
    { code: '08', name: 'Rajasthan' },
    { code: '09', name: 'Uttar Pradesh' },
    { code: '10', name: 'Bihar' },
    { code: '11', name: 'Sikkim' },
    { code: '12', name: 'Arunachal Pradesh' },
    { code: '13', name: 'Nagaland' },
    { code: '14', name: 'Manipur' },
    { code: '15', name: 'Mizoram' },
    { code: '16', name: 'Tripura' },
    { code: '17', name: 'Meghalaya' },
    { code: '18', name: 'Assam' },
    { code: '19', name: 'West Bengal' },
    { code: '20', name: 'Jharkhand' },
    { code: '21', name: 'Odisha' },
    { code: '22', name: 'Chhattisgarh' },
    { code: '23', name: 'Madhya Pradesh' },
    { code: '24', name: 'Gujarat' },
    { code: '25', name: 'Daman and Diu' },
    { code: '26', name: 'Dadra and Nagar Haveli' },
    { code: '27', name: 'Maharashtra' },
    { code: '29', name: 'Karnataka' },
    { code: '30', name: 'Goa' },
    { code: '31', name: 'Lakshadweep' },
    { code: '32', name: 'Kerala' },
    { code: '33', name: 'Tamil Nadu' },
    { code: '34', name: 'Puducherry' },
    { code: '35', name: 'Andaman and Nicobar Islands' },
    { code: '36', name: 'Telangana' },
    { code: '37', name: 'Andhra Pradesh' },
    { code: '38', name: 'Ladakh' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Customer Name is required';
    }

    if (!formData.customer_type) {
      newErrors.customer_type = 'Customer Type is required';
    }

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Phone must be at least 10 digits';
    }

    if (formData.gstin && !/^[0-9A-Z]{15}$/.test(formData.gstin)) {
      newErrors.gstin = 'GSTIN must be 15 characters (alphanumeric)';
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    if (formData.state && !formData.state_code) {
      const selectedState = states.find((s) => s.name === formData.state);
      if (selectedState) {
        formData.state_code = selectedState.code;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto-fill state code when state is selected
      if (name === 'state') {
        const selectedState = states.find((s) => s.name === value);
        if (selectedState) {
          updated.state_code = selectedState.code;
        }
      }

      return updated;
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Construct payload with ONLY allowed fields based on backend validation
      const submissionData = {
        name: formData.name,
        gstin: formData.gstin,
        pan: formData.pan,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state_code: formData.state_code,
        pincode: formData.pincode,
        credit_limit: parseFloat(formData.credit_limit) || 0
      };

      onSubmit(submissionData);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Customer Name and Display Name */}
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Customer Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter customer name"
                />
                {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Display Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="display_name"
                  value={formData.display_name}
                  onChange={handleInputChange}
                  placeholder="Short name for listings"
                />
              </div>
            </div>
          </div>

          {/* Company and Customer Type */}
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Company / Firm</label>
                <input
                  type="text"
                  className="form-control"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  placeholder="Business name"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Type <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-control ${errors.customer_type ? 'is-invalid' : ''}`}
                  name="customer_type"
                  value={formData.customer_type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Type</option>
                  <option value="INDIVIDUAL">Individual</option>
                  <option value="BUSINESS">Business</option>
                  <option value="GOVERNMENT">Government</option>
                </select>
                {errors.customer_type && (
                  <div className="invalid-feedback d-block">{errors.customer_type}</div>
                )}
              </div>
            </div>
          </div>

          {/* GSTIN and PAN */}
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">GSTIN</label>
                <input
                  type="text"
                  className={`form-control ${errors.gstin ? 'is-invalid' : ''}`}
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleInputChange}
                  placeholder="15-character GSTIN"
                />
                {errors.gstin && <div className="invalid-feedback d-block">{errors.gstin}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">PAN</label>
                <input
                  type="text"
                  className="form-control"
                  name="pan"
                  value={formData.pan}
                  onChange={handleInputChange}
                  placeholder="PAN number"
                />
              </div>
            </div>
          </div>

          {/* Email and Phone */}
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="customer@example.com"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit phone number"
                />
                {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Mobile</label>
                <input
                  type="tel"
                  className="form-control"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Mobile number"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              placeholder="Street address"
            ></textarea>
          </div>

          {/* City, State, Pincode */}
          <div className="row">
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">State</label>
                <select
                  className="form-control"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">Pincode</label>
                <input
                  type="text"
                  className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="6-digit pincode"
                />
                {errors.pincode && <div className="invalid-feedback d-block">{errors.pincode}</div>}
              </div>
            </div>
          </div>

          {/* State Code (hidden, auto-filled) */}
          <input type="hidden" name="state_code" value={formData.state_code} />

          {/* Credit Limit and Credit Days */}
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Credit Limit (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  name="credit_limit"
                  value={formData.credit_limit}
                  onChange={handleInputChange}
                  placeholder="0 = unlimited"
                  min="0"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Credit Days</label>
                <input
                  type="number"
                  className="form-control"
                  name="credit_days"
                  value={formData.credit_days}
                  onChange={handleInputChange}
                  placeholder="Payment due days"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Opening Balance */}
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Opening Balance</label>
                <input
                  type="number"
                  className="form-control"
                  name="opening_balance"
                  value={formData.opening_balance}
                  onChange={handleInputChange}
                  placeholder="Opening balance amount"
                  step="0.01"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Balance Type</label>
                <div className="d-flex gap-3 mt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="balance_type"
                      id="balance_dr"
                      value="DR"
                      checked={formData.balance_type === 'DR'}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="balance_dr">
                      DR (Debit)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="balance_type"
                      id="balance_cr"
                      value="CR"
                      checked={formData.balance_type === 'CR'}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="balance_cr">
                      CR (Credit)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Account */}
          <div className="mb-3">
            <label className="form-label">Bank Account</label>
            <input
              type="text"
              className="form-control"
              name="bank_account"
              value={formData.bank_account}
              onChange={handleInputChange}
              placeholder="Bank account for payment reference"
            />
          </div>

          {/* Form Actions */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                'Save Customer'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
