import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCustomer, updateCustomer, getCustomerById } from '../services/customerService';
import { ledgerService } from '../services/ledgerService';
import { toast } from 'react-toastify';

const AddCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    gstin: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    state_code: '',
    opening_balance: '',
    balance_type: 'DR',
    credit_limit: '',
    payment_terms: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [ledgerId, setLedgerId] = useState(null);

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
      fetchCustomerData();
    }
  }, [isEditMode, id]);

  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      console.log('Fetching customer data for id:', id);
      const response = await getCustomerById(id);
      if (response.success && response.data) {
        const data = response.data;
        console.log('Fetched data:', data);
        setLedgerId(data.ledger_id);
        setFormData({
          name: data.name || '',
          gstin: data.gstin || '',
          phone: data.phone || '',
          email: data.email || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          state_code: data.state_code || '',
          opening_balance: data.ledger?.opening_balance || data.opening_balance || '',
          balance_type: data.ledger?.balance_type || data.opening_balance_type || 'DR',
          credit_limit: data.credit_limit || '',
          payment_terms: data.credit_days || '',
        });
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      toast.error('Failed to load customer data');
    } finally {
      setLoading(false);
    }
  };

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

    if (formData.phone && formData.phone.trim()) {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        newErrors.phone = 'Phone must be 10 digits';
      }
    }

    // Optional field validations
    if (formData.gstin && !/^[0-9A-Z]{15}$/.test(formData.gstin)) {
      newErrors.gstin = 'GSTIN must be 15 characters (alphanumeric)';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.warning('Please check the form for errors');
      return;
    }

    setLoading(true);
    try {
      console.log('Submitting customer data:', formData);
      let response;
      
      const payload = {
        ...formData,
        opening_balance: parseFloat(formData.opening_balance) || 0,
        credit_limit: parseFloat(formData.credit_limit) || 0,
      };

      if (isEditMode) {
        // Exclude fields not allowed on update
        const { opening_balance, balance_type, payment_terms, opening_balance_type, credit_days, ...updateData } = payload;
        console.log('Filtered update payload:', updateData);
        response = await updateCustomer(id, updateData);

        // Update the linked ledger separately for balance-related fields
        if (response.success && ledgerId) {
          try {
            await ledgerService.updateLedger(ledgerId, {
              name: formData.name + ' (Customer)',
              opening_balance: parseFloat(formData.opening_balance) || 0,
              opening_balance_type: formData.balance_type
            });
          } catch (ledgerErr) {
            console.error('Error updating linked ledger:', ledgerErr);
            // We don't block the UI if only the ledger fails, but we log it
          }
        }
      } else {
        // Exclude fields not allowed on create
        const { balance_type, payment_terms, opening_balance_type, credit_days, ...createData } = payload;
        console.log('Filtered create payload:', createData);
        response = await createCustomer(createData);
      }

      if (response && response.success) {
        toast.success(isEditMode ? 'Customer updated successfully' : 'Customer created successfully');
        setTimeout(() => {
          navigate('/master/customers');
        }, 1500);
      } else {
        const errorMsg = response?.message || 'Action failed';
        setErrors({ submit: errorMsg });
        toast.error(errorMsg);
      }
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
    navigate('/master/customers');
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
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-dark">Phone</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                    />
                    {errors.phone && (
                      <div className="invalid-feedback d-block">{errors.phone}</div>
                    )}
                  </div>

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
                </div>
              </div>

              {/* Address Information */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Address & Location</h6>

                <div className="mb-3">
                  <label className="form-label text-dark">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter full address"
                    rows="2"
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label text-dark">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
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

                  <div className="col-md-4 mb-3">
                    <label className="form-label text-dark">State Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state_code"
                      value={formData.state_code}
                      onChange={handleInputChange}
                      placeholder="State Code"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Financial Information</h6>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label text-dark">Opening Balance</label>
                    <input
                      type="number"
                      className="form-control"
                      name="opening_balance"
                      value={formData.opening_balance}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label text-dark">Balance Type</label>
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
                          DR
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
                          CR
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label text-dark">Credit Limit</label>
                    <input
                      type="number"
                      className="form-control"
                      name="credit_limit"
                      value={formData.credit_limit}
                      onChange={handleInputChange}
                      placeholder="Limit amount"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label text-dark">Payment Terms (Days)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="payment_terms"
                      value={formData.payment_terms}
                      onChange={handleInputChange}
                      placeholder="Days"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="d-flex gap-2 pt-3 border-top">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
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
                  className="btn btn-outline-secondary px-4"
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
