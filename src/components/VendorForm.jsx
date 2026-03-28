import { useState, useEffect } from 'react';

const VendorForm = ({ initialData = null, onSubmit, isLoading = false, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    vendor_type: 'MANUFACTURER',
    gstin: '',
    pan: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    payment_terms: '',
    bank_account: '',
    ifsc_code: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
    { code: 'OD', name: 'Odisha' },
    { code: 'PB', name: 'Punjab' },
    { code: 'RJ', name: 'Rajasthan' },
    { code: 'SK', name: 'Sikkim' },
    { code: 'TN', name: 'Tamil Nadu' },
    { code: 'TG', name: 'Telangana' },
    { code: 'TR', name: 'Tripura' },
    { code: 'UP', name: 'Uttar Pradesh' },
    { code: 'UT', name: 'Uttarakhand' },
    { code: 'WB', name: 'West Bengal' },
  ];

  const vendorTypes = [
    { value: 'MANUFACTURER', label: 'Manufacturer' },
    { value: 'DISTRIBUTOR', label: 'Distributor' },
    { value: 'TRADER', label: 'Trader' },
    { value: 'SERVICE_PROVIDER', label: 'Service Provider' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vendor Name is required';
    }

    if (!formData.vendor_type) {
      newErrors.vendor_type = 'Vendor Type is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (formData.gstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.ifsc_code && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc_code)) {
      newErrors.ifsc_code = 'Invalid IFSC Code format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {/* Vendor Name */}
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Vendor Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter vendor name"
            disabled={isLoading}
          />
          {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
        </div>

        {/* Company / Firm */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Company / Firm</label>
          <input
            type="text"
            className="form-control"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            placeholder="Enter company name"
            disabled={isLoading}
          />
        </div>

        {/* Vendor Type */}
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Type <span className="text-danger">*</span>
          </label>
          <select
            className={`form-control ${errors.vendor_type ? 'is-invalid' : ''}`}
            name="vendor_type"
            value={formData.vendor_type}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            {vendorTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.vendor_type && <div className="invalid-feedback d-block">{errors.vendor_type}</div>}
        </div>

        {/* Phone */}
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Phone <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            disabled={isLoading}
          />
          {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
        </div>

        {/* GSTIN */}
        <div className="col-md-6 mb-3">
          <label className="form-label">GSTIN</label>
          <input
            type="text"
            className={`form-control ${errors.gstin ? 'is-invalid' : ''}`}
            name="gstin"
            value={formData.gstin}
            onChange={handleInputChange}
            placeholder="Enter GSTIN"
            disabled={isLoading}
          />
          {errors.gstin && <div className="invalid-feedback d-block">{errors.gstin}</div>}
        </div>

        {/* PAN */}
        <div className="col-md-6 mb-3">
          <label className="form-label">PAN</label>
          <input
            type="text"
            className="form-control"
            name="pan"
            value={formData.pan}
            onChange={handleInputChange}
            placeholder="Enter PAN"
            disabled={isLoading}
          />
        </div>

        {/* Email */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            disabled={isLoading}
          />
          {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
        </div>

        {/* Address */}
        <div className="col-12 mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            rows="3"
            disabled={isLoading}
          ></textarea>
        </div>

        {/* City */}
        <div className="col-md-6 mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter city"
            disabled={isLoading}
          />
        </div>

        {/* State */}
        <div className="col-md-6 mb-3">
          <label className="form-label">State</label>
          <select
            className="form-control"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Terms */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Payment Terms</label>
          <input
            type="text"
            className="form-control"
            name="payment_terms"
            value={formData.payment_terms}
            onChange={handleInputChange}
            placeholder="e.g., Net 30, COD"
            disabled={isLoading}
          />
        </div>

        {/* Bank Account No. */}
        <div className="col-md-6 mb-3">
          <label className="form-label">Bank Account No.</label>
          <input
            type="text"
            className="form-control"
            name="bank_account"
            value={formData.bank_account}
            onChange={handleInputChange}
            placeholder="Enter bank account number"
            disabled={isLoading}
          />
        </div>

        {/* IFSC Code */}
        <div className="col-md-6 mb-3">
          <label className="form-label">IFSC Code</label>
          <input
            type="text"
            className={`form-control ${errors.ifsc_code ? 'is-invalid' : ''}`}
            name="ifsc_code"
            value={formData.ifsc_code}
            onChange={handleInputChange}
            placeholder="Enter IFSC Code"
            disabled={isLoading}
          />
          {errors.ifsc_code && <div className="invalid-feedback d-block">{errors.ifsc_code}</div>}
        </div>
      </div>

      {/* Form Actions */}
      <div className="d-flex gap-2 mt-4">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            'Save Vendor'
          )}
        </button>
        {onClose && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default VendorForm;
