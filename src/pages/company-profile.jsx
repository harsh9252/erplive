import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import companyService from '../services/companyService';
import { toast } from 'react-toastify';

const CompanyProfile = () => {
  const { activeCompany, switchCompany } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [company, setCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    legal_name: '',
    gstin: '',
    pan: '',
    address: '',
    city: '',
    state: '',
    state_code: '',
    pincode: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      const response = await companyService.getCompanyProfile();
      const data = response.data || response;
      setCompany(data);
      setFormData({
        name: data.name || '',
        legal_name: data.legal_name || '',
        gstin: data.gstin || '',
        pan: data.pan || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        state_code: data.state_code || '',
        pincode: data.pincode || '',
        phone: data.phone || '',
        email: data.email || ''
      });
    } catch (error) {
      console.error('Error fetching company:', error);
      toast.error('Failed to load company profile');
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Company name must be at least 2 characters';
    }
    
    if (formData.gstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(formData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format';
    }

    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) {
      newErrors.pan = 'Invalid PAN format';
    }

    if (formData.state_code && !/^[0-9]{2}$/.test(formData.state_code)) {
      newErrors.state_code = 'State code must be 2 digits';
    }

    if (formData.pincode && !/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      await companyService.updateCompanyProfile(company.id, formData);
      toast.success('Company profile updated successfully');
      setIsEdit(false);
      fetchCompanyData();
    } catch (error) {
      console.error('Error updating company:', error);
      toast.error('Failed to update company profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header">
        <div className="add-item d-flex">
          <div className="page-title">
            <h4>Company Profile</h4>
            <h6>View or update your company information</h6>
          </div>
        </div>
        <div className="page-btn">
          {!isEdit ? (
            <button className="btn btn-primary" onClick={() => setIsEdit(true)}>
              <i className="isax isax-edit me-2"></i>Edit Profile
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={() => { setIsEdit(false); setErrors({}); }}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="form-group mb-3">
                  <label className="form-label">Company Name <span className="text-danger">*</span></label>
                  {isEdit ? (
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    />
                  ) : <p className="form-control-plaintext fw-semibold">{formData.name}</p>}
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="form-group mb-3">
                  <label className="form-label">Legal Name</label>
                  {isEdit ? (
                    <input 
                      type="text" 
                      name="legal_name" 
                      value={formData.legal_name} 
                      onChange={handleInputChange} 
                      className="form-control"
                    />
                  ) : <p className="form-control-plaintext">{formData.legal_name || 'N/A'}</p>}
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="form-group mb-3">
                  <label className="form-label">GSTIN</label>
                  {isEdit ? (
                    <input 
                      type="text" 
                      name="gstin" 
                      value={formData.gstin} 
                      onChange={handleInputChange} 
                      className={`form-control ${errors.gstin ? 'is-invalid' : ''}`}
                    />
                  ) : <p className="form-control-plaintext text-uppercase">{formData.gstin || 'N/A'}</p>}
                  {errors.gstin && <div className="invalid-feedback">{errors.gstin}</div>}
                </div>
              </div>

              <div className="col-lg-4 col-sm-6 col-12">
                <div className="form-group mb-3">
                  <label className="form-label">PAN</label>
                  {isEdit ? (
                    <input 
                      type="text" 
                      name="pan" 
                      value={formData.pan} 
                      onChange={handleInputChange} 
                      className={`form-control ${errors.pan ? 'is-invalid' : ''}`}
                    />
                  ) : <p className="form-control-plaintext text-uppercase">{formData.pan || 'N/A'}</p>}
                  {errors.pan && <div className="invalid-feedback">{errors.pan}</div>}
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="form-group mb-3">
                  <label className="form-label">Phone</label>
                  {isEdit ? (
                    <input 
                      type="text" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      className="form-control"
                    />
                  ) : <p className="form-control-plaintext">{formData.phone || 'N/A'}</p>}
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="form-group mb-3">
                  <label className="form-label">Email</label>
                  {isEdit ? (
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className="form-control"
                    />
                  ) : <p className="form-control-plaintext">{formData.email || 'N/A'}</p>}
                </div>
              </div>

              <div className="col-12 mt-3 mb-2">
                <h5 className="border-bottom pb-2">Address Details</h5>
              </div>

              <div className="col-lg-12">
                <div className="form-group mb-3">
                  <label className="form-label">Address</label>
                  {isEdit ? (
                    <textarea 
                      name="address" 
                      rows="2" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                      className="form-control"
                    ></textarea>
                  ) : <p className="form-control-plaintext">{formData.address || 'N/A'}</p>}
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group mb-3">
                  <label className="form-label">City</label>
                  {isEdit ? (
                    <input 
                      type="text" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleInputChange} 
                      className="form-control"
                    />
                  ) : <p className="form-control-plaintext">{formData.city || 'N/A'}</p>}
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group mb-3">
                  <label className="form-label">State</label>
                  {isEdit ? (
                    <input 
                      type="text" 
                      name="state" 
                      value={formData.state} 
                      onChange={handleInputChange} 
                      className="form-control"
                    />
                  ) : <p className="form-control-plaintext">{formData.state || 'N/A'}</p>}
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group mb-3">
                  <label className="form-label">State Code</label>
                  {isEdit ? (
                    <input 
                      type="text" 
                      name="state_code" 
                      value={formData.state_code} 
                      onChange={handleInputChange} 
                      className={`form-control ${errors.state_code ? 'is-invalid' : ''}`}
                      maxLength="2"
                    />
                  ) : <p className="form-control-plaintext">{formData.state_code || 'N/A'}</p>}
                  {errors.state_code && <div className="invalid-feedback">{errors.state_code}</div>}
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group mb-3">
                  <label className="form-label">Pincode</label>
                  {isEdit ? (
                    <input 
                      type="text" 
                      name="pincode" 
                      value={formData.pincode} 
                      onChange={handleInputChange} 
                      className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                      maxLength="6"
                    />
                  ) : <p className="form-control-plaintext">{formData.pincode || 'N/A'}</p>}
                  {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
                </div>
              </div>

              {isEdit && (
                <div className="col-12 mt-4 text-end">
                  <button type="submit" className="btn btn-primary me-2" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
