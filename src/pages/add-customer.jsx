import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCustomer } from '../services/customerService';
import { toast } from 'react-toastify';

const AddCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

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
    opening_balance_type: 'DR',
    bank_account: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const states = [
    { code: 'AN', name: 'Andaman and Nicobar Islands' },
    { code: 'AP', name: 'Andhra Pradesh' },
    { code: 'AR', name: 'Arunachal Pradesh' },
    { code: 'AS', name: 'Assam' },
    { code: 'BR', name: 'Bihar' },
    { code: 'CG', name: 'Chhattisgarh' },
    { code: 'CH', name: 'Chandigarh' },
    { code: 'DD', name: 'Daman and Diu' },
    { code: 'DL', name: 'Delhi' },
    { code: 'DN', name: 'Dadra and Nagar Haveli' },
    { code: 'GA', name: 'Goa' },
    { code: 'GJ', name: 'Gujarat' },
    { code: 'HR', name: 'Haryana' },
    { code: 'HP', name: 'Himachal Pradesh' },
    { code: 'JK', name: 'Jammu and Kashmir' },
    { code: 'JH', name: 'Jharkhand' },
    { code: 'KA', name: 'Karnataka' },
    { code: 'KL', name: 'Kerala' },
    { code: 'LA', name: 'Ladakh' },
    { code: 'LD', name: 'Lakshadweep' },
    { code: 'MP', name: 'Madhya Pradesh' },
    { code: 'MH', name: 'Maharashtra' },
    { code: 'MN', name: 'Manipur' },
    { code: 'ML', name: 'Meghalaya' },
    { code: 'MZ', name: 'Mizoram' },
    { code: 'NL', name: 'Nagaland' },
    { code: 'OR', name: 'Odisha' },
    { code: 'PB', name: 'Punjab' },
    { code: 'RJ', name: 'Rajasthan' },
    { code: 'SK', name: 'Sikkim' },
    { code: 'TN', name: 'Tamil Nadu' },
    { code: 'TG', name: 'Telangana' },
    { code: 'TR', name: 'Tripura' },
    { code: 'UP', name: 'Uttar Pradesh' },
    { code: 'UT', name: 'Uttarakhand' },
    { code: 'WB', name: 'West Bengal' }
  ];

  const customerTypes = [
    { value: 'INDIVIDUAL', label: 'Individual' },
    { value: 'BUSINESS', label: 'Business' },
    { value: 'GOVERNMENT', label: 'Government' }
  ];

  useEffect(() => {
    if (isEditMode) {
      // Load existing customer data
      const existingCustomer = {
        name: 'John Doe',
        display_name: 'JD',
        company_name: 'Doe Enterprises',
        customer_type: 'BUSINESS',
        gstin: '27AABCT1234H1Z0',
        pan: 'AABCT1234H',
        email: 'john@example.com',
        phone: '9876543210',
        mobile: '9876543210',
        address: '123 Business Street',
        city: 'Mumbai',
        state: 'MH',
        state_code: 'MH',
        pincode: '400001',
        credit_limit: '100000',
        credit_days: '30',
        opening_balance: '5000',
        opening_balance_type: 'DR',
        bank_account: 'HDFC Bank - 1234567890',
      };
      setFormData(existingCustomer);
    }
  }, [isEditMode, id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const stateObj = states.find(s => s.code === selectedState);

    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      state_code: stateObj ? stateObj.code : '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Customer Name is required';
    }

    if (!formData.customer_type) {
      newErrors.customer_type = 'Customer Type is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    // Optional field validations
    if (formData.gstin && !/^[0-9A-Z]{15}$/.test(formData.gstin)) {
      newErrors.gstin = 'GSTIN must be 15 characters (alphanumeric)';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    if (formData.mobile && !/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Mobile must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await createCustomer(formData);
      
      toast.success('Customer created successfully', {
        position: 'top-right',
        autoClose: 2000
      });

      setTimeout(() => {
        navigate('/customers');
      }, 2000);
    } catch (error) {
      console.error('Error saving customer:', error);
      const errorMessage = typeof error === 'string' ? error : (error.message || 'Failed to save customer');
      setErrors({ submit: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/customers');
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h6 className="mb-0">
              {isEditMode ? 'Edit Customer' : 'Add New Customer'}
            </h6>
          </div>

          <div className="card-body">
            {successMessage && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {successMessage}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSuccessMessage('')}
                ></button>
              </div>
            )}

            {errors.submit && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {errors.submit}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setErrors({ ...errors, submit: '' })}
                ></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Basic Information</h6>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">
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
                    {errors.name && (
                      <div className="invalid-feedback d-block">{errors.name}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">Display Name</label>
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

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">Company / Firm</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      placeholder="Business name"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">
                      Customer Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-control ${errors.customer_type ? 'is-invalid' : ''}`}
                      name="customer_type"
                      value={formData.customer_type}
                      onChange={handleInputChange}
                    >
                      {customerTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.customer_type && (
                      <div className="invalid-feedback d-block">{errors.customer_type}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Tax Information</h6>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">GSTIN</label>
                    <input
                      type="text"
                      className={`form-control ${errors.gstin ? 'is-invalid' : ''}`}
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleInputChange}
                      placeholder="15-character GSTIN"
                    />
                    {errors.gstin && (
                      <div className="invalid-feedback d-block">{errors.gstin}</div>
                    )}
                    <small className="text-gray-9">Format: 15 alphanumeric characters</small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">PAN</label>
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

              {/* Contact Information */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Contact Information</h6>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="customer@example.com"
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block">{errors.email}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">
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
                    {errors.phone && (
                      <div className="invalid-feedback d-block">{errors.phone}</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">Mobile</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                    />
                    {errors.mobile && (
                      <div className="invalid-feedback d-block">{errors.mobile}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">Bank Account</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bank_account"
                      value={formData.bank_account}
                      onChange={handleInputChange}
                      placeholder="For payment reference"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Address Information</h6>

                <div className="mb-3">
                  <label className="form-label text-dark">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter full address"
                    rows="3"
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City name"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">State</label>
                    <select
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">Pincode</label>
                    <input
                      type="text"
                      className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit pincode"
                    />
                    {errors.pincode && (
                      <div className="invalid-feedback d-block">{errors.pincode}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">State Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state_code"
                      value={formData.state_code}
                      onChange={handleInputChange}
                      placeholder="Auto-filled from state"
                      disabled
                    />
                    <small className="text-gray-9">Auto-filled based on state selection</small>
                  </div>
                </div>
              </div>

              {/* Credit Information */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Credit Information</h6>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">Credit Limit (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="credit_limit"
                      value={formData.credit_limit}
                      onChange={handleInputChange}
                      placeholder="0 = unlimited"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">Credit Days</label>
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
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Opening Balance</h6>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">Opening Balance</label>
                    <input
                      type="number"
                      className="form-control"
                      name="opening_balance"
                      value={formData.opening_balance}
                      onChange={handleInputChange}
                      placeholder="Enter opening balance"
                      step="0.01"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">Balance Type</label>
                    <div className="mt-2">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="opening_balance_type"
                          id="balance_dr"
                          value="DR"
                          checked={formData.opening_balance_type === 'DR'}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="balance_dr">
                          Debit (DR)
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="opening_balance_type"
                          id="balance_cr"
                          value="CR"
                          checked={formData.opening_balance_type === 'CR'}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="balance_cr">
                          Credit (CR)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="isax isax-save-2 me-2"></i>
                      {isEditMode ? 'Update Customer' : 'Create Customer'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
