import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { vendorService } from '../services/vendorService';

const EditVendor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const states = [
    { code: 'MH', name: 'Maharashtra' },
    { code: 'GJ', name: 'Gujarat' },
    { code: 'KA', name: 'Karnataka' },
    { code: 'TN', name: 'Tamil Nadu' },
    { code: 'UP', name: 'Uttar Pradesh' },
    { code: 'DL', name: 'Delhi' },
    { code: 'WB', name: 'West Bengal' },
    { code: 'RJ', name: 'Rajasthan' },
  ];

  const vendorTypes = [
    { value: 'MANUFACTURER', label: 'Manufacturer' },
    { value: 'DISTRIBUTOR', label: 'Distributor' },
    { value: 'TRADER', label: 'Trader' },
    { value: 'SERVICE_PROVIDER', label: 'Service Provider' },
  ];

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Load vendor data on mount
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        setLoading(true);
        const response = await vendorService.getVendor(id);
        
        // Robust data extraction
        let vendor = null;
        if (response.data && !Array.isArray(response.data)) {
          vendor = response.data;
        } else if (response.data && Array.isArray(response.data.items) && response.data.items.length > 0) {
          vendor = response.data.items[0];
        } else if (Array.isArray(response.data) && response.data.length > 0) {
          vendor = response.data[0];
        } else if (response && !response.data && response.id) {
          vendor = response;
        }
        
        if (vendor) {
          // Map state_code back to state for the form
          setFormData({
            ...vendor,
            state: vendor.state_code || vendor.state || '',
          });
        } else {
          toast.error('Vendor not found');
          navigate('/vendors');
        }
      } catch (err) {
        console.error('Error fetching vendor:', err);
        toast.error('Failed to load vendor details');
        navigate('/vendors');
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id, navigate]);

  // Validate GSTIN format (basic validation)
  const validateGSTIN = (gstin) => {
    if (!gstin) return true;
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin);
  };

  // Validate PAN format (basic validation)
  const validatePAN = (pan) => {
    if (!pan) return true;
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  // Validate IFSC format
  const validateIFSC = (ifsc) => {
    if (!ifsc) return true;
    return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vendor name is required';
    }

    if (!formData.vendor_type) {
      newErrors.vendor_type = 'Vendor type is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (formData.gstin && !validateGSTIN(formData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format';
    }

    if (formData.pan && !validatePAN(formData.pan)) {
      newErrors.pan = 'Invalid PAN format';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.ifsc_code && !validateIFSC(formData.ifsc_code)) {
      newErrors.ifsc_code = 'Invalid IFSC code format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (!formData) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      // Map frontend fields to API fields
      const vendorData = {
        ...formData,
        state_code: formData.state,
      };

      await vendorService.updateVendor(id, vendorData);
      toast.success('Vendor updated successfully!');
      navigate('/vendors');
    } catch (err) {
      console.error('Error updating vendor:', err);
      const errorMessage = err.message || 'Failed to update vendor. Please try again.';
      toast.error(errorMessage);
      
      if (err.details) {
        const fieldErrors = {};
        err.details.forEach(detail => {
          fieldErrors[detail.path] = detail.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Edit Vendor</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/vendors">Vendors</Link>
              </li>
              <li className="breadcrumb-item active">Edit Vendor</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="mb-4">
              <h6 className="mb-3">Basic Information</h6>
              <div className="row">
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
                  />
                  {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Company / Firm</label>
                  <input
                    type="text"
                    className="form-control"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Vendor Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${errors.vendor_type ? 'is-invalid' : ''}`}
                    name="vendor_type"
                    value={formData.vendor_type}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Type</option>
                    {vendorTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.vendor_type && (
                    <div className="invalid-feedback d-block">{errors.vendor_type}</div>
                  )}
                </div>
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
                  />
                  {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                </div>
              </div>
            </div>

            {/* Tax & Compliance */}
            <div className="mb-4">
              <h6 className="mb-3">Tax & Compliance</h6>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">GSTIN</label>
                  <input
                    type="text"
                    className={`form-control ${errors.gstin ? 'is-invalid' : ''}`}
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleInputChange}
                    placeholder="Enter GSTIN"
                  />
                  {errors.gstin && <div className="invalid-feedback d-block">{errors.gstin}</div>}
                  <small className="text-muted">Format: 27AABCT1234H1Z0</small>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">PAN</label>
                  <input
                    type="text"
                    className={`form-control ${errors.pan ? 'is-invalid' : ''}`}
                    name="pan"
                    value={formData.pan}
                    onChange={handleInputChange}
                    placeholder="Enter PAN"
                  />
                  {errors.pan && <div className="invalid-feedback d-block">{errors.pan}</div>}
                  <small className="text-muted">Format: AABCT1234H</small>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-4">
              <h6 className="mb-3">Contact Information</h6>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                  {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">State</label>
                  <select
                    className="form-control"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name} ({state.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                  />
                </div>
              </div>
            </div>

            {/* Payment & Banking */}
            <div className="mb-4">
              <h6 className="mb-3">Payment & Banking</h6>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Payment Terms</label>
                  <input
                    type="text"
                    className="form-control"
                    name="payment_terms"
                    value={formData.payment_terms}
                    onChange={handleInputChange}
                    placeholder="e.g., Net 30, Net 45"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Bank Account No.</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bank_account"
                    value={formData.bank_account}
                    onChange={handleInputChange}
                    placeholder="Enter bank account number"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">IFSC Code</label>
                  <input
                    type="text"
                    className={`form-control ${errors.ifsc_code ? 'is-invalid' : ''}`}
                    name="ifsc_code"
                    value={formData.ifsc_code}
                    onChange={handleInputChange}
                    placeholder="Enter IFSC code"
                  />
                  {errors.ifsc_code && (
                    <div className="invalid-feedback d-block">{errors.ifsc_code}</div>
                  )}
                  <small className="text-muted">Format: HDFC0001234</small>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Link to="/vendors" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Updating...
                  </>
                ) : (
                  'Update Vendor'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditVendor;
