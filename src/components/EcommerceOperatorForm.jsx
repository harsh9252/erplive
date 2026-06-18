import { useState, useEffect } from 'react';
import { INDIAN_STATES } from '../utils/constants';
import { INDIAN_CITIES } from '../utils/indianCities';

const EcommerceOperatorForm = ({ initialData = null, onSubmit, isLoading = false, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    gstin: '',
    pan: '',
    phone: '',
    email: '',
    contact_person: '',
    address: '',
    city: '',
    state: '',
    state_code: '',
    pincode: '',
    is_active: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        gstin: initialData.gstin || '',
        pan: initialData.pan || '',
        phone: initialData.phone || '',
        email: initialData.email || '',
        contact_person: initialData.contact_person || '',
        address: initialData.address || '',
        city: initialData.city || '',
        state: initialData.state || '',
        state_code: initialData.state_code || '',
        pincode: initialData.pincode || '',
        is_active: initialData.is_active === 1 || initialData.is_active === '1' || initialData.is_active === true || initialData.is_active === 'true',
      });
    } else {
      setFormData({
        name: '',
        gstin: '',
        pan: '',
        phone: '',
        email: '',
        contact_person: '',
        address: '',
        city: '',
        state: '',
        state_code: '',
        pincode: '',
        is_active: true,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    let finalValue = value;

    if (name === 'phone') {
      finalValue = value.replace(/\D/g, ''); // Only numbers
    } else if (name === 'pincode') {
      finalValue = value.replace(/\D/g, ''); // Only numbers
    } else if (name === 'email') {
      finalValue = value.replace(/[^\w@.\-]/g, ''); // No special symbols
    } else if (name === 'pan' || name === 'gstin') {
      finalValue = value.toUpperCase(); // Ensure uppercase
    }

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : finalValue
      };

      if (name === 'state') {
        const selectedState = INDIAN_STATES.find(s => s.name === finalValue);
        if (selectedState) {
          updated.state_code = selectedState.code;
        } else if (!finalValue) {
          updated.state_code = '';
        }
      }

      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Operator name is required';

    if (formData.gstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(formData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format';
    }

    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = 'Invalid PAN format';
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

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
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
    <form onSubmit={handleSubmit}>
      <div className="row g-4">
        {/* Basic Information */}
        <div className="col-12 border-bottom pb-2">
          <h6 className="fw-bold text-primary mb-0">E-Commerce Operator Information</h6>
        </div>

        <div className="col-md-6">
          <label className="form-label fs-13 fw-bold">Operator Name <span className="text-danger">*</span></label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. Amazon Seller Services Pvt Ltd"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label fs-13 fw-bold">Contact Person</label>
          <input
            type="text"
            className="form-control"
            name="contact_person"
            value={formData.contact_person}
            onChange={handleInputChange}
            placeholder="Primary contact person name"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fs-13 fw-bold">GSTIN</label>
          <input
            type="text"
            className={`form-control ${errors.gstin ? 'is-invalid' : ''}`}
            name="gstin"
            value={formData.gstin}
            onChange={handleInputChange}
            placeholder="15-digit GSTIN"
            maxLength="15"
          />
          {errors.gstin && <div className="invalid-feedback">{errors.gstin}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label fs-13 fw-bold">PAN Number</label>
          <input
            type="text"
            className={`form-control ${errors.pan ? 'is-invalid' : ''}`}
            name="pan"
            value={formData.pan}
            onChange={handleInputChange}
            placeholder="e.g. ABCDE1234F"
            maxLength="10"
          />
          {errors.pan && <div className="invalid-feedback">{errors.pan}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label fs-13 fw-bold">Phone Number</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="10-digit mobile number"
            maxLength="10"
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label fs-13 fw-bold">Email Address</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="operator@example.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="col-12">
          <label className="form-label fs-13 fw-bold">Business Address</label>
          <textarea
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows="2"
            placeholder="Complete business address"
          ></textarea>
        </div>

        <div className="col-md-4">
          <label className="form-label fs-13 fw-bold">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
            list="city-options"
          />
          <datalist id="city-options">
            {formData.state && INDIAN_CITIES[formData.state] && INDIAN_CITIES[formData.state].map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>

        <div className="col-md-4">
          <label className="form-label fs-13 fw-bold">State</label>
          <select
            className="form-control"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          >
            <option value="">Select State</option>
            {INDIAN_STATES.map((state) => (
              <option key={state.code} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label fs-13 fw-bold">State Code</label>
          <input
            type="text"
            className="form-control"
            name="state_code"
            value={formData.state_code}
            onChange={handleInputChange}
            placeholder="e.g. 27"
            readOnly
          />
        </div>

        <div className="col-md-2">
          <label className="form-label fs-13 fw-bold">Pincode</label>
          <input
            type="text"
            className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            placeholder="6 digits"
            maxLength="6"
          />
          {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
        </div>

        <div className="col-md-4">
          <div className="form-check form-switch p-3 bg-light rounded-2 mt-2">
            <input
              className="form-check-input ms-0 me-3"
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
            />
            <label className="form-check-label fs-13 fw-bold" htmlFor="is_active">
              Active Operator
            </label>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-5">
        {onClose && (
          <button
            type="button"
            className="btn btn-outline-secondary px-4 py-2"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary px-5 py-2"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save E-Commerce Operator'}
        </button>
      </div>
    </form>
  );
};

export default EcommerceOperatorForm;
