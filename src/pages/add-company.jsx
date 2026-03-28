import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import companyService from '../services/companyService';
import { toast } from 'react-toastify';

const AddCompany = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    legal_name: '',
    gstin: '',
    pan: '',
    tan: '',
    cin: '',
    business_nature_id: '',
    address: '',
    city: '',
    state: '',
    state_code: '',
    pincode: '',
    country: 'India',
    phone: '',
    email: '',
    website: '',
    currency: 'INR',
    financial_year_start: '4',
    logo: null,
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

  // State codes mapping
  const stateCodeMap = {
    'Jammu & Kashmir': '01',
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
    'Maharashtra': '27',
    'Andhra Pradesh': '28',
    'Karnataka': '29',
    'Goa': '30',
    'Lakshadweep': '31',
    'Kerala': '32',
    'Tamil Nadu': '33',
    'Puducherry': '34',
    'Andaman & Nicobar': '35',
    'Telangana': '36',
    'Other Territory': '96',
  };

  const businessTypes = [
    { id: 1, name: 'Sole Proprietorship' },
    { id: 2, name: 'Partnership' },
    { id: 3, name: 'Private Limited' },
    { id: 4, name: 'Public Limited' },
    { id: 5, name: 'LLP' },
    { id: 6, name: 'HUF' },
    { id: 7, name: 'Trust' },
    { id: 8, name: 'NGO' },
  ];

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        const response = await fetch('https://api.countrystatecity.in/v1/countries', {
          headers: {
            'X-CSCAPI-KEY': '61d4bc66877c1ade986501c8148bb445b21eb89022f55e49b94504e5a8e51f65',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }

        const data = await response.json();
        setCountries(data);
        
        // Set India as default
        const india = data.find((c) => c.iso2 === 'IN');
        if (india) {
          setFormData((prev) => ({
            ...prev,
            country: india.name,
          }));
          // Set India's currency
          if (india.currency) {
            setCurrencies([{ code: india.currency, name: `${india.currency} - Indian Rupee` }]);
            setFormData((prev) => ({
              ...prev,
              currency: india.currency,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
        // Fallback to India
        setCountries([{ name: 'India', iso2: 'IN' }]);
        setFormData((prev) => ({
          ...prev,
          country: 'India',
        }));
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // Fetch states from API when country changes
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
    const phoneRegex = /^[0-9]{10}$/;
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

    if (!formData.gstin.trim()) {
      newErrors.gstin = 'GSTIN is required';
    } else if (!validateGSTIN(formData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format (e.g., 22AAAAA0000A1Z5)';
    }

    if (!formData.pan.trim()) {
      newErrors.pan = 'PAN is required';
    } else if (!validatePAN(formData.pan)) {
      newErrors.pan = 'Invalid PAN format (e.g., AAAAA0000A)';
    }

    if (formData.tan && !validateTAN(formData.tan)) {
      newErrors.tan = 'Invalid TAN format';
    }

    if (!formData.business_nature_id) newErrors.business_nature_id = 'Business type is required';

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
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.currency) newErrors.currency = 'Currency is required';

    if (!formData.financial_year_start) newErrors.financial_year_start = 'FY start month is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          logo: 'File size must be less than 2MB',
        }));
      } else if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          logo: 'Only PNG and JPG files are allowed',
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          logo: file,
        }));
        setErrors((prev) => ({
          ...prev,
          logo: '',
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await companyService.createCompany(formData);
      toast.success('Company created successfully! Default ledgers, vouchers, and warehouse have been seeded.', {
        autoClose: 5000
      });
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

      {/* Form */}
      <div className="row">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="card-title">Basic Information</h5>
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
                    />
                    {errors.legal_name && (
                      <div className="invalid-feedback d-block">{errors.legal_name}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      GSTIN <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.gstin ? 'is-invalid' : ''}`}
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleInputChange}
                      placeholder="e.g., 22AAAAA0000A1Z5"
                    />
                    {errors.gstin && <div className="invalid-feedback d-block">{errors.gstin}</div>}
                    <small className="text-muted">Format: 15-character GST number</small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      PAN Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.pan ? 'is-invalid' : ''}`}
                      name="pan"
                      value={formData.pan}
                      onChange={handleInputChange}
                      placeholder="e.g., AAAAA0000A"
                    />
                    {errors.pan && <div className="invalid-feedback d-block">{errors.pan}</div>}
                    <small className="text-muted">10-character PAN</small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">TAN Number</label>
                    <input
                      type="text"
                      className={`form-control ${errors.tan ? 'is-invalid' : ''}`}
                      name="tan"
                      value={formData.tan}
                      onChange={handleInputChange}
                      placeholder="Optional"
                    />
                    {errors.tan && <div className="invalid-feedback d-block">{errors.tan}</div>}
                    <small className="text-muted">10-character TAN (optional)</small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">CIN Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cin"
                      value={formData.cin}
                      onChange={handleInputChange}
                      placeholder="Company Identification Number"
                    />
                    <small className="text-muted">Optional</small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Business Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.business_nature_id ? 'is-invalid' : ''}`}
                      name="business_nature_id"
                      value={formData.business_nature_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Select business type</option>
                      {businessTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    {errors.business_nature_id && (
                      <div className="invalid-feedback d-block">{errors.business_nature_id}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Currency <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.currency ? 'is-invalid' : ''}`}
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      disabled={!formData.country}
                    >
                      <option value="">
                        {!formData.country ? 'Select country first' : 'Select currency'}
                      </option>
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </option>
                      ))}
                    </select>
                    {errors.currency && (
                      <div className="invalid-feedback d-block">{errors.currency}</div>
                    )}
                    <small className="text-muted">Auto-filled based on selected country</small>
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
                      rows="3"
                    ></textarea>
                    {errors.address && (
                      <div className="invalid-feedback d-block">{errors.address}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
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
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {errors.city && <div className="invalid-feedback d-block">{errors.city}</div>}
                    {loadingCities && (
                      <small className="text-muted">
                        <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                        Fetching cities from API...
                      </small>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      State <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={!formData.country || loadingStates}
                    >
                      <option value="">
                        {!formData.country
                          ? 'Select country first'
                          : loadingStates
                          ? 'Loading states...'
                          : 'Select state'}
                      </option>
                      {states.map((state) => (
                        <option key={state.name} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {errors.state && <div className="invalid-feedback d-block">{errors.state}</div>}
                    {loadingStates && (
                      <small className="text-muted">
                        <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                        Fetching states from API...
                      </small>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
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
                    />
                    <small className="text-muted">Auto-filled based on selected state</small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Pincode <span className="text-danger">*</span>
                    </label>
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
                    <label className="form-label">
                      Country <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled={loadingCountries}
                    >
                      <option value="">
                        {loadingCountries ? 'Loading countries...' : 'Select country'}
                      </option>
                      {countries.map((country) => (
                        <option key={country.iso2} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {loadingCountries && (
                      <small className="text-muted">
                        <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                        Fetching countries from API...
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="card-title">Contact Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
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
                    />
                    {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="company@example.com"
                    />
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Website</label>
                    <input
                      type="url"
                      className="form-control"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                    />
                    <small className="text-muted">Optional</small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      FY Start Month <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.financial_year_start ? 'is-invalid' : ''}`}
                      name="financial_year_start"
                      value={formData.financial_year_start}
                      onChange={handleInputChange}
                    >
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April (Default)</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                    {errors.financial_year_start && (
                      <div className="invalid-feedback d-block">{errors.financial_year_start}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="card-title">Company Logo</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Logo</label>
                  <input
                    type="file"
                    className={`form-control ${errors.logo ? 'is-invalid' : ''}`}
                    name="logo"
                    onChange={handleFileChange}
                    accept="image/png,image/jpeg"
                  />
                  {errors.logo && <div className="invalid-feedback d-block">{errors.logo}</div>}
                  <small className="text-muted">PNG or JPG, max 2MB (optional)</small>
                </div>
                {formData.logo && (
                  <div className="alert alert-info">
                    <i className="isax isax-info-circle me-2"></i>
                    File selected: {formData.logo.name}
                  </div>
                )}
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

        {/* Sidebar - Form Help */}
        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: '20px' }}>
            <div className="card-header">
              <h5 className="card-title">Form Help</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6 className="mb-2">
                  <i className="isax isax-info-circle text-info me-2"></i>GSTIN Format
                </h6>
                <p className="text-muted small mb-0">
                  15-character GST number: <code>22AAAAA0000A1Z5</code>
                </p>
              </div>

              <hr />

              <div className="mb-3">
                <h6 className="mb-2">
                  <i className="isax isax-info-circle text-info me-2"></i>PAN Format
                </h6>
                <p className="text-muted small mb-0">
                  10-character PAN: <code>AAAAA0000A</code>
                </p>
              </div>

              <hr />

              <div className="mb-3">
                <h6 className="mb-2">
                  <i className="isax isax-info-circle text-info me-2"></i>Phone Number
                </h6>
                <p className="text-muted small mb-0">
                  10-digit mobile number without country code
                </p>
              </div>

              <hr />

              <div className="mb-3">
                <h6 className="mb-2">
                  <i className="isax isax-info-circle text-info me-2"></i>Pincode
                </h6>
                <p className="text-muted small mb-0">
                  6-digit postal code
                </p>
              </div>

              <hr />

              <div className="mb-3">
                <h6 className="mb-2">
                  <i className="isax isax-info-circle text-info me-2"></i>State Code
                </h6>
                <p className="text-muted small mb-0">
                  Auto-filled based on selected state. Used in GSTIN.
                </p>
              </div>

              <hr />

              <div className="mb-3">
                <h6 className="mb-2">
                  <i className="isax isax-info-circle text-info me-2"></i>Financial Year
                </h6>
                <p className="text-muted small mb-0">
                  Default is April. This determines your FY period (e.g., April 2025 - March 2026).
                </p>
              </div>

              <hr />

              <div className="alert alert-warning" role="alert">
                <i className="isax isax-warning-2 me-2"></i>
                <strong>Required Fields</strong>
                <p className="mb-0 small mt-2">
                  All fields marked with <span className="text-danger">*</span> are mandatory.
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
