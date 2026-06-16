import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import companyService from '../services/companyService';
import { toast } from 'react-toastify';

const stateCodeMap = {
  'Jammu & Kashmir': '01',
  'Jammu and Kashmir': '01',
  'Himachal Pradesh': '02',
  'Punjab': '03',
  'Chandigarh': '04',
  'Uttarakhand': '05',
  'Haryana': '06',
  'Delhi': '07',
  'Rajasthan': '08',
  'Uttar Pradesh': '09',
  'Bihar': '10',
  'Sikkim': '11',
  'Arunachal Pradesh': '12',
  'Nagaland': '13',
  'Manipur': '14',
  'Mizoram': '15',
  'Tripura': '16',
  'Meghalaya': '17',
  'Assam': '18',
  'West Bengal': '19',
  'Jharkhand': '20',
  'Odisha': '21',
  'Chhattisgarh': '22',
  'Madhya Pradesh': '23',
  'Gujarat': '24',
  'Dadra & Nagar Haveli and Daman & Diu': '26',
  'Dadra and Nagar Haveli and Daman and Diu': '26',
  'Maharashtra': '27',
  'Andhra Pradesh': '28',
  'Karnataka': '29',
  'Goa': '30',
  'Lakshadweep': '31',
  'Kerala': '32',
  'Tamil Nadu': '33',
  'Puducherry': '34',
  'Andaman & Nicobar': '35',
  'Andaman and Nicobar Islands': '35',
  'Telangana': '36',
  'Ladakh': '38',
  'Other Territory': '96',
};

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
    tan: '',
    cin: '',
    address: '',
    city: '',
    state: '',
    state_code: '',
    pincode: '',
    phone: '',
    email: '',
    business_nature_id: '',
    // currency: '',
    // country: '',
    // timezone: '',
    status: ''
  });
  const [errors, setErrors] = useState({});

  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [selectedCountryIso, setSelectedCountryIso] = useState('IN');
  const [selectedStateIso, setSelectedStateIso] = useState('');
  const [editingStateName, setEditingStateName] = useState('');
  const [businessTypes, setBusinessTypes] = useState([]);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  useEffect(() => {
    const fetchBusinessNatures = async () => {
      try {
        const response = await companyService.getBusinessNatures();
        const data = response?.data?.data || response?.data || response || [];
        setBusinessTypes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching business natures:', error);
      }
    };
    fetchBusinessNatures();
  }, []);

  const fetchCompanyData = async () => {
    if (!activeCompany) {
      setLoading(false);
      return;
    }
    
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
        tan: data.tan || '',
        cin: data.cin || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        state_code: data.state_code || '',
        pincode: data.pincode || '',
        phone: data.phone || '',
        email: data.email || '',
        business_nature_id: data.business_nature_id || '',
        // currency: data.currency || '',
        // country: data.country || '',
        // timezone: data.timezone || '',
        status: data.status || ''
      });
      setEditingStateName(data.state || '');
    } catch (error) {
      console.error('Error fetching company:', error);
      toast.error('Failed to load company profile');
    } finally {
      setLoading(false);
    }
  };

  // Fetch states from API
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);
        const response = await fetch(
          `https://api.countrystatecity.in/v1/countries/${selectedCountryIso}/states`,
          {
            headers: {
              'X-CSCAPI-KEY': '61d4bc66877c1ade986501c8148bb445b21eb89022f55e49b94504e5a8e51f65',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch states');
        }

        const data = await response.json();
        const statesData = data.map((state) => ({
          name: state.name,
          iso2: state.iso2,
          stateCode: stateCodeMap[state.name] || '',
        }));

        setStates(statesData);
      } catch (error) {
        console.error('Error fetching states:', error);
        const fallbackStates = Object.keys(stateCodeMap).map((stateName) => ({
          name: stateName,
          iso2: '',
          stateCode: stateCodeMap[stateName],
        }));
        setStates(fallbackStates);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, [selectedCountryIso]);

  // Effect to find and set state ISO when editing and states are loaded
  useEffect(() => {
    if (editingStateName && states.length > 0) {
      const state = states.find(s => s.name === editingStateName);
      if (state && state.iso2) {
        setSelectedStateIso(state.iso2);
        setEditingStateName(''); // Clear so it doesn't trigger again
      }
    }
  }, [states, editingStateName]);

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedStateIso) {
        setCities([]);
        return;
      }

      try {
        setLoadingCities(true);
        const response = await fetch(
          `https://api.countrystatecity.in/v1/countries/${selectedCountryIso}/states/${selectedStateIso}/cities`,
          {
            headers: {
              'X-CSCAPI-KEY': '61d4bc66877c1ade986501c8148bb445b21eb89022f55e49b94504e5a8e51f65',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }

        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [selectedStateIso]);

  // Validation functions
  const validateGSTIN = (gstin) => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  };

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validateTAN = (tan) => {
    // TAN format: AAAA99999A (4 uppercase letters + 5 digits + 1 uppercase letter)
    const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;
    return tanRegex.test(tan);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePincode = (pincode) => {
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(pincode);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Company name is required';
    } else if (formData.name.length > 200) {
      newErrors.name = 'Company name must be max 200 characters';
    }

    if (!formData.legal_name || !formData.legal_name.trim()) {
      newErrors.legal_name = 'Legal name is required';
    }

    if (formData.gstin && formData.gstin.trim() && !validateGSTIN(formData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format (e.g., 22AAAAA0000A1Z5)';
    }

    if (formData.pan && formData.pan.trim() && !validatePAN(formData.pan)) {
      newErrors.pan = 'Invalid PAN format (e.g., AAAAA0000A)';
    }

    if (formData.tan && formData.tan.trim() && !validateTAN(formData.tan)) {
      newErrors.tan = 'Invalid TAN format (e.g., AAAA99999A — 4 letters, 5 digits, 1 letter)';
    }

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must be a valid 10-digit mobile number starting with 6, 7, 8, or 9';
    }

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.address || !formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city || !formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state || !formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.pincode || !formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!validatePincode(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    if (formData.state_code && formData.state_code.trim() && !/^[0-9]{2}$/.test(formData.state_code)) {
      newErrors.state_code = 'State code must be 2 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === 'email') {
      value = value.replace(/[^a-zA-Z0-9@.]/g, '');
    }
    if (name === 'phone' || name === 'pincode') {
      value = value.replace(/\D/g, '');
    }

    // Auto-fill state code when state changes — merge into single setFormData call
    if (name === 'state') {
      const selectedState = states.find((s) => s.name === value);
      setFormData((prev) => ({
        ...prev,
        state: value,
        state_code: selectedState?.stateCode || selectedState?.iso2 || '',
        city: '',
      }));
      setSelectedStateIso(selectedState?.iso2 || '');
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Bug 1.6 fix: guard against missing company.id
    if (!company?.id) {
      toast.error('Cannot update: Company ID is missing. Please reload the page.');
      return;
    }

    try {
      setSaving(true);
      
      const payload = {
        ...formData,
        business_nature_id: formData.business_nature_id ? Number(formData.business_nature_id) : null,
        business_nature: formData.business_nature_id ? businessTypes.find(t => String(t.id) === String(formData.business_nature_id))?.name : null
      };
      
      await companyService.updateCompanyProfile(company.id, payload);
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

  // Bug 1.3 fix: Cancel restores original saved data
  const handleCancel = () => {
    setIsEdit(false);
    setErrors({});
    if (company) {
      setFormData({
        name: company.name || '',
        legal_name: company.legal_name || '',
        gstin: company.gstin || '',
        pan: company.pan || '',
        tan: company.tan || '',
        cin: company.cin || '',
        address: company.address || '',
        city: company.city || '',
        state: company.state || '',
        state_code: company.state_code || '',
        pincode: company.pincode || '',
        phone: company.phone || '',
        email: company.email || '',
        business_nature_id: company.business_nature_id || '',
        // currency: company.currency || '',
        // country: company.country || '',
        // timezone: company.timezone || '',
        status: company.status || ''
      });
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

  if (!activeCompany) {
    return (
      <div className="content container-fluid pb-5">
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
          <div className="text-center">
            <div className="avatar avatar-xxl bg-soft-primary text-primary rounded-circle mb-4 mx-auto d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
              <i className="isax isax-building fs-40"></i>
            </div>
            <h3 className="fw-bold mb-2">No Active Company</h3>
            <p className="text-muted mb-4">Please create and select a company to view its profile.</p>
            <Link to="/add-company" className="btn btn-primary px-4 py-2 rounded-3">
              <i className="isax isax-add-circle5 me-2"></i>Create Company
            </Link>
          </div>
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
          {!company?.id ? (
            <Link to="/add-company" className="btn btn-primary">
              <i className="isax isax-add-circle me-2"></i>Create Company
            </Link>
          ) : !isEdit ? (
            <button className="btn btn-primary" onClick={() => setIsEdit(true)}>
              <i className="isax isax-edit me-2"></i>Edit Profile
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          {!company?.id && !isEdit ? (
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="isax isax-buildings text-muted" style={{ fontSize: '64px' }}></i>
              </div>
              <h5 className="fw-bold">No Company Profile Found</h5>
              <p className="text-muted mb-4">You haven't set up your company profile yet. Create one to get started with your business management.</p>
              <Link to="/add-company" className="btn btn-primary px-4">
                <i className="isax isax-add-circle me-2"></i>Create Company Now
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} autoComplete="off">
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
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    ) : <p className="form-control-plaintext fw-semibold">{formData.name || 'N/A'}</p>}
                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                  </div>
                </div>

                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">Legal Name <span className="text-danger">*</span></label>
                    {isEdit ? (
                      <input
                        type="text"
                        name="legal_name"
                        value={formData.legal_name}
                        onChange={handleInputChange}
                        className={`form-control ${errors.legal_name ? 'is-invalid' : ''}`}
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    ) : <p className="form-control-plaintext">{formData.legal_name || 'N/A'}</p>}
                    {errors.legal_name && <div className="invalid-feedback d-block">{errors.legal_name}</div>}
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
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    ) : <p className="form-control-plaintext text-uppercase">{formData.gstin || 'N/A'}</p>}
                    {errors.gstin && <div className="invalid-feedback d-block">{errors.gstin}</div>}
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
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    ) : <p className="form-control-plaintext text-uppercase">{formData.pan || 'N/A'}</p>}
                    {errors.pan && <div className="invalid-feedback d-block">{errors.pan}</div>}
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">TAN</label>
                    {isEdit ? (
                      <input
                        type="text"
                        name="tan"
                        value={formData.tan}
                        onChange={handleInputChange}
                        className={`form-control ${errors.tan ? 'is-invalid' : ''}`}
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    ) : <p className="form-control-plaintext text-uppercase">{formData.tan || 'N/A'}</p>}
                    {errors.tan && <div className="invalid-feedback d-block">{errors.tan}</div>}
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">CIN</label>
                    {isEdit ? (
                      <input
                        type="text"
                        name="cin"
                        value={formData.cin}
                        onChange={handleInputChange}
                        className={`form-control ${errors.cin ? 'is-invalid' : ''}`}
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    ) : <p className="form-control-plaintext text-uppercase">{formData.cin || 'N/A'}</p>}
                    {errors.cin && <div className="invalid-feedback d-block">{errors.cin}</div>}
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">Phone <span className="text-danger">*</span></label>
                    {isEdit ? (
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    ) : <p className="form-control-plaintext">{formData.phone || 'N/A'}</p>}
                    {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">Email <span className="text-danger">*</span></label>
                    {isEdit ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    ) : <p className="form-control-plaintext">{formData.email || 'N/A'}</p>}
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">Business Nature</label>
                    {isEdit ? (
                      <select
                        name="business_nature_id"
                        value={formData.business_nature_id || ''}
                        onChange={handleInputChange}
                        className={`form-select ${errors.business_nature_id ? 'is-invalid' : ''}`}
                      >
                        <option value="">Select Business Nature</option>
                        {businessTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="form-control-plaintext">
                        {businessTypes.find(t => t.id === Number(formData.business_nature_id))?.name || 'N/A'}
                      </p>
                    )}
                    {errors.business_nature_id && <div className="invalid-feedback d-block">{errors.business_nature_id}</div>}
                  </div>
                </div>


                <div className="col-12 mt-3 mb-2">
                  <h5 className="border-bottom pb-2">Address Details</h5>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label className="form-label">Address <span className="text-danger">*</span></label>
                    {isEdit ? (
                      <textarea
                        name="address"
                        rows="2"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      ></textarea>
                    ) : <p className="form-control-plaintext">{formData.address || 'N/A'}</p>}
                    {errors.address && <div className="invalid-feedback d-block">{errors.address}</div>}
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">State <span className="text-danger">*</span></label>
                    {isEdit ? (
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                        disabled={loadingStates}
                      >
                        <option value="">
                          {loadingStates ? 'Loading states...' : 'Select state'}
                        </option>
                        {states.map((st) => (
                          <option key={st.name} value={st.name}>
                            {st.name}
                          </option>
                        ))}
                      </select>
                    ) : <p className="form-control-plaintext">{formData.state || 'N/A'}</p>}
                    {errors.state && <div className="invalid-feedback d-block">{errors.state}</div>}
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">City <span className="text-danger">*</span></label>
                    {isEdit ? (
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`form-select ${errors.city ? 'is-invalid' : ''}`}
                        disabled={!formData.state || loadingCities}
                      >
                        <option value="">
                          {!formData.state
                            ? 'Select state first'
                            : loadingCities
                              ? 'Loading cities...'
                              : 'Select city'}
                        </option>
                        {cities.map((ct) => (
                          <option key={ct.id || ct.name} value={ct.name}>
                            {ct.name}
                          </option>
                        ))}
                      </select>
                    ) : <p className="form-control-plaintext">{formData.city || 'N/A'}</p>}
                    {errors.city && <div className="invalid-feedback d-block">{errors.city}</div>}
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">State Code</label>
                    {isEdit ? (
                      // Bug 1.5 fix: state_code is auto-derived from state selection, should be read-only
                      <input
                        type="text"
                        name="state_code"
                        value={formData.state_code}
                        readOnly
                        className="form-control bg-light text-muted"
                        title="Auto-filled based on selected state"
                      />
                    ) : <p className="form-control-plaintext">{formData.state_code || 'N/A'}</p>}
                    {errors.state_code && <div className="invalid-feedback d-block">{errors.state_code}</div>}
                    {isEdit && <small className="text-muted">Auto-filled based on selected state</small>}
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">Pincode <span className="text-danger">*</span></label>
                    {isEdit ? (
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                        maxLength="6"
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    ) : <p className="form-control-plaintext">{formData.pincode || 'N/A'}</p>}
                    {errors.pincode && <div className="invalid-feedback d-block">{errors.pincode}</div>}
                  </div>
                </div>

                {/* <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">Country</label>
                    {isEdit ? (
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    ) : <p className="form-control-plaintext">{formData.country || 'N/A'}</p>}
                    {errors.country && <div className="invalid-feedback d-block">{errors.country}</div>}
                  </div>
                </div> */}
                {/* <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">Currency</label>
                    {isEdit ? (
                      <input
                        type="text"
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className={`form-control ${errors.currency ? 'is-invalid' : ''}`}
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    ) : <p className="form-control-plaintext">{formData.currency || 'N/A'}</p>}
                    {errors.currency && <div className="invalid-feedback d-block">{errors.currency}</div>}
                  </div>
                </div> */}
                {/* <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group mb-3">
                    <label className="form-label">Timezone</label>
                    {isEdit ? (
                      <input
                        type="text"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className={`form-control ${errors.timezone ? 'is-invalid' : ''}`}
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    ) : <p className="form-control-plaintext">{formData.timezone || 'N/A'}</p>}
                    {errors.timezone && <div className="invalid-feedback d-block">{errors.timezone}</div>}
                  </div>
                </div> */}

                {isEdit && (
                  <div className="col-12 mt-4 text-end">
                    <button type="submit" className="btn btn-primary me-2" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
