import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import companyService from '../services/companyService';
import { registerCompany } from '../services/authService';
import businessNatureService from '../services/businessNatureService';
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';
import branchService from '../services/branchService';
import settingsService from '../services/settingsService';

const AddCompany = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshProfile } = useAuth();
  const queryParams = new URLSearchParams(location.search);
  const isOnboarding = queryParams.get('onboarding') === 'true';

  const [formData, setFormData] = useState({
    name: '',
    legal_name: '',
    business_nature: '',
    cin: '',
    gstin: '',
    pan: '',
    tan: '',
    address: '',
    city: '',
    state: '',
    state_code: '',
    pincode: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCountryIso, setSelectedCountryIso] = useState('IN');
  const [selectedStateIso, setSelectedStateIso] = useState('');
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loadingBusinessTypes, setLoadingBusinessTypes] = useState(false);

  // State codes mapping
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

  // Fetch business natures
  useEffect(() => {
    const fetchBusinessNatures = async () => {
      try {
        setLoadingBusinessTypes(true);
        const response = await businessNatureService.getBusinessNatures();
        const data = response.data || response || [];
        setBusinessTypes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching business natures:', error);
        setBusinessTypes([]);
      } finally {
        setLoadingBusinessTypes(false);
      }
    };

    fetchBusinessNatures();
  }, []);

  // Fetch states from API
  useEffect(() => {
    const fetchStates = async () => {
      if (!selectedCountryIso) {
        setStates([]);
        return;
      }

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
        
        // Map API response to our format
        const statesData = data.map((state) => ({
          name: state.name,
          iso2: state.iso2,
          stateCode: stateCodeMap[state.name] || '',
        }));

        setStates(statesData);
      } catch (error) {
        console.error('Error fetching states:', error);
        // Fallback to hardcoded states if API fails
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

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedStateIso) {
        setCities([]);
        return;
      }

      try {
        setLoadingCities(true);
        const response = await fetch(
          `https://api.countrystatecity.in/v1/countries/IN/states/${selectedStateIso}/cities`,
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Company name is required';
    if (formData.name.length > 200) newErrors.name = 'Company name must be max 200 characters';

    if (!formData.legal_name.trim()) newErrors.legal_name = 'Legal name is required';

    if (formData.gstin.trim() && !validateGSTIN(formData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format (e.g., 22AAAAA0000A1Z5)';
    }

    if (formData.pan.trim() && !validatePAN(formData.pan)) {
      newErrors.pan = 'Invalid PAN format (e.g., AAAAA0000A)';
    }

    if (formData.tan.trim() && !validateTAN(formData.tan)) {
      newErrors.tan = 'Invalid TAN format (e.g., AAAA00000A)';
    }

    if (formData.cin.trim() && formData.cin.trim().length !== 21) {
      newErrors.cin = 'CIN must be 21 characters long';
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required';

    if (!formData.city.trim()) newErrors.city = 'City is required';

    if (!formData.state) newErrors.state = 'State is required';

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!validatePincode(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must be a valid 10-digit mobile number starting with 6, 7, 8, or 9';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-fill country code and reset state/city when country changes
    if (name === 'country') {
      const selectedCountry = countries.find((c) => c.name === value);
      setSelectedCountryIso(selectedCountry?.iso2 || '');
      
      // Update currency based on selected country
      if (selectedCountry?.currency) {
        const currencyList = [
          { code: selectedCountry.currency, name: `${selectedCountry.currency} - ${selectedCountry.name}` }
        ];
        setCurrencies(currencyList);
        setFormData((prev) => ({
          ...prev,
          state: '',
          state_code: '',
          city: '',
          currency: selectedCountry.currency,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          state: '',
          state_code: '',
          city: '',
        }));
      }
      setSelectedStateIso('');
    }

    // Auto-fill state code when state changes
    if (name === 'state') {
      const selectedState = states.find((s) => s.name === value);
      setFormData((prev) => ({
        ...prev,
        state_code: selectedState?.stateCode || selectedState?.iso2 || '',
        city: '', // Reset city when state changes
      }));
      setSelectedStateIso(selectedState?.iso2 || '');
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // handleFileChange removed as per simplification

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const submitData = {
        ...formData,
        business_nature_id: businessTypes.find(t => t.name === formData.business_nature)?.id || null
      };
      
      let newCompanyId = null;
      if (isOnboarding) {
        const response = await registerCompany(submitData);
        newCompanyId = response?.data?.active_company?.id || response?.data?.companies?.[0]?.id || response?.data?.company?.id || response?.data?.id || response?.active_company?.id || response?.companies?.[0]?.id || response?.company?.id || response?.id;
      } else {
        const response = await companyService.createCompany(submitData);
        newCompanyId = response?.data?.id || response?.id || response?.data?.company?.id || response?.company?.id || response?.data?.newCompany?.id || response?.newCompany?.id;
      }

      if (!newCompanyId) {
        try {
          const companiesResp = await companyService.getCompanies();
          const companiesList = companiesResp?.data?.data || companiesResp?.data || companiesResp || [];
          if (Array.isArray(companiesList) && companiesList.length > 0) {
            const sorted = [...companiesList].sort((a, b) => b.id - a.id);
            newCompanyId = sorted[0].id;
          }
        } catch (fallbackError) {
          console.error('Error fetching companies for fallback ID:', fallbackError);
        }
      }

      // Create default Branch (Head Office) and Warehouse
      try {
        const headers = newCompanyId ? {
          'x-company-id': String(newCompanyId),
          'x-business-id': String(newCompanyId)
        } : {};

        const uniqueBranchCode = `HO-${Math.floor(1000 + Math.random() * 9000)}`;
        const uniqueWarehouseCode = `WH-${Math.floor(1000 + Math.random() * 9000)}`;

        await branchService.createBranch({
          company_id: newCompanyId,
          name: formData.name,
          code: uniqueBranchCode,
          is_head_office: true,
          address: formData.address,
          city: formData.city,
          state_code: formData.state_code,
          pincode: formData.pincode,
          phone: formData.phone,
          email: formData.email,
          gstin: formData.gstin,
        }, headers);

        await settingsService.createWarehouse({
          company_id: newCompanyId,
          name: formData.name,
          code: uniqueWarehouseCode,
          location: `${formData.address}, ${formData.city}`,
        }, headers);
      } catch (defaultEntityError) {
        console.error('Error creating default branch or warehouse:', defaultEntityError);
      }

      toast.success('Company created successfully!', {
        autoClose: 5000
      });
      await refreshProfile();
      window.dispatchEvent(new Event('COMPANY_CREATED'));
      navigate('/companies');
    } catch (error) {
      console.error('Error creating company:', error);
      toast.error(error.message || 'Error creating company. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/companies');
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Add Company</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/companies">Companies</Link>
              </li>
              <li className="breadcrumb-item active">Add Company</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Form Section */}
      <div className="row">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} autoComplete="off">
            {/* Business Information */}
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="card-title">Business Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Company Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter company name"
                      autoComplete="one-time-code"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Legal Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.legal_name ? 'is-invalid' : ''}`}
                      name="legal_name"
                      value={formData.legal_name}
                      onChange={handleInputChange}
                      placeholder="As per GST registration"
                      autoComplete="one-time-code"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                    {errors.legal_name && (
                      <div className="invalid-feedback d-block">{errors.legal_name}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      GSTIN
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.gstin ? 'is-invalid' : ''}`}
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleInputChange}
                      placeholder="e.g., 29AAPFY0939E1ZV"
                      autoComplete="one-time-code"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                    {errors.gstin && <div className="invalid-feedback d-block">{errors.gstin}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.pan ? 'is-invalid' : ''}`}
                      name="pan"
                      value={formData.pan}
                      onChange={handleInputChange}
                      placeholder="e.g., AAPFY0939E"
                      autoComplete="one-time-code"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                    {errors.pan && <div className="invalid-feedback d-block">{errors.pan}</div>}
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
                      placeholder="10-digit mobile number"
                      autoComplete="one-time-code"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                    {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Email address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="company@example.com"
                      autoComplete="one-time-code"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">
                      Business Nature
                    </label>
                    <select
                      className={`form-select ${errors.business_nature ? 'is-invalid' : ''}`}
                      name="business_nature"
                      value={formData.business_nature}
                      onChange={handleInputChange}
                      disabled={loadingBusinessTypes}
                    >
                      <option value="">
                        {loadingBusinessTypes ? 'Loading...' : 'Select business nature'}
                      </option>
                      {businessTypes.map((type) => (
                        <option key={type.id || type.name} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    {errors.business_nature && <div className="invalid-feedback d-block">{errors.business_nature}</div>}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">
                      CIN No.
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.cin ? 'is-invalid' : ''}`}
                      name="cin"
                      value={formData.cin}
                      onChange={handleInputChange}
                      placeholder="e.g., L12345AA1234AAA123456"
                      autoComplete="one-time-code"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                    {errors.cin && <div className="invalid-feedback d-block">{errors.cin}</div>}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">
                      TAN No.
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.tan ? 'is-invalid' : ''}`}
                      name="tan"
                      value={formData.tan}
                      onChange={handleInputChange}
                      placeholder="e.g., AAAA00000A"
                      autoComplete="one-time-code"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                    {errors.tan && <div className="invalid-feedback d-block">{errors.tan}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="card-title">Address Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 mb-3">
                    <label className="form-label">
                      Address <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Full registered address"
                      rows="2"
                      autoComplete="one-time-code"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    ></textarea>
                    {errors.address && (
                      <div className="invalid-feedback d-block">{errors.address}</div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">
                      State <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={loadingStates}
                    >
                      <option value="">
                        {loadingStates ? 'Loading states...' : 'Select state'}
                      </option>
                      {states.map((state) => (
                        <option key={state.name} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {errors.state && <div className="invalid-feedback d-block">{errors.state}</div>}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.city ? 'is-invalid' : ''}`}
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!formData.state || loadingCities}
                    >
                      <option value="">
                        {!formData.state
                          ? 'Select state first'
                          : loadingCities
                          ? 'Loading cities...'
                          : 'Select city'}
                      </option>
                      {cities.map((city) => (
                        <option key={city.id || city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {errors.city && <div className="invalid-feedback d-block">{errors.city}</div>}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">
                      Pincode <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="Pincode"
                      autoComplete="one-time-code"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                    {errors.pincode && (
                      <div className="invalid-feedback d-block">{errors.pincode}</div>
                    )}
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">
                      State Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="state_code"
                      value={formData.state_code}
                      readOnly
                      placeholder="Auto-filled from state"
                      autoComplete="one-time-code"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                    />
                    <small className="text-muted">Auto-filled based on selected state</small>
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
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <i className="isax isax-save me-2"></i>Create Company
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                <i className="isax isax-close-circle me-2"></i>Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Help */}
        <div className="col-lg-4">
          <div className="card " >
            <div className="card-header">
              <h5 className="card-title">Quick Help</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6 className="mb-2">GSTIN & PAN</h6>
                <p className="text-muted small mb-0">
                  Ensure your GSTIN and PAN match your legal documents. State code is derived automatically.
                </p>
              </div>
              <hr />
              <div className="alert alert-warning mb-0" role="alert">
                <i className="isax isax-warning-2 me-2"></i>
                <strong>Required Fields</strong>
                <p className="mb-0 small mt-2">
                  All fields marked with <span className="text-danger">*</span> are mandatory for legal compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCompany;
