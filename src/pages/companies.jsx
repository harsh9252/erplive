import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCompanies, createCompany, updateCompany, updateCompanyStatus, getCompanyById, getBusinessNatures } from '../services/companyService';
import { switchCompany } from '../services/authService';
import { useAuth } from '../components/AuthContext';
import { toast } from 'react-toastify';
import branchService from '../services/branchService';
import settingsService from '../services/settingsService';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const Companies = () => {
  const { activeCompany, switchCompany: contextSwitchCompany } = useAuth();
  // State for companies list
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for search, filter, sort
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [filterCompanyIds, setFilterCompanyIds] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companySearch, setCompanySearch] = useState('');

  const [statusChangeData, setStatusChangeData] = useState(null); // { id, newStatus, oldStatus }

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    company: true,
    legalName: true,
    email: false,
    url: true,
    plan: true,
    createdOn: false,
    status: true,
  });

  const [companyData, setCompanyData] = useState({
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
    email: '',
    business_nature_id: '',
    tan: '',
    cin: '',
    currency: 'INR',
    country: 'India',
    timezone: 'Asia/Kolkata'
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCountryIso, setSelectedCountryIso] = useState('IN');
  const [selectedStateIso, setSelectedStateIso] = useState('');
  const [editingStateName, setEditingStateName] = useState('');
  const [editingCityName, setEditingCityName] = useState('');

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

  const [businessTypes, setBusinessTypes] = useState([
    { id: 1, name: 'Sole Proprietorship' },
    { id: 2, name: 'Partnership' },
    { id: 3, name: 'Private Limited' },
    { id: 4, name: 'Public Limited' },
    { id: 5, name: 'LLP' },
    { id: 6, name: 'HUF' },
    { id: 7, name: 'Trust' },
    { id: 8, name: 'NGO' },
  ]);

  const location = useLocation();

  // Fetch companies from API
  useEffect(() => {
    fetchCompaniesData();
  }, []);

  // Handle auto-edit from query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('edit') === 'true' && companies.length > 0 && !editingCompany) {
      const autoEdit = async () => {
        await handleEdit(companies[0]);
        // We need to wait a bit for the DOM to be ready if it's a fresh navigation
        setTimeout(() => {
          const modalElement = document.getElementById('add_companies');
          if (modalElement) {
            let modal = window.bootstrap.Modal.getInstance(modalElement);
            if (!modal) {
              modal = new window.bootstrap.Modal(modalElement);
            }
            modal.show();
          }
        }, 100);
      };
      autoEdit();
    }
  }, [location.search, companies]);

  const fetchCompaniesData = async () => {
    try {
      setLoading(true);

      const response = await getCompanies();
      console.log('####### Get company', response);

      const companiesList = Array.isArray(response.data) ? response.data : [];

      // We removed the N+1 API call fetching full details for every single company here.
      // This improves initial load performance dramatically.
      // Details are now fetched on-demand when user clicks "Edit" (inside handleEdit).

      const transformedCompanies = companiesList.map(company => ({
        id: company.id,
        name: company.name,
        legalName: company.legal_name || '-',
        email: company.email || '',
        url: company.website || company.url || '',
        plan: 'Basic (Monthly)',
        createdOn: (company.createdAt || company.created_at) && !isNaN(new Date(company.createdAt || company.created_at)) ? new Date(company.createdAt || company.created_at).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }) : 'N/A',
        status: company.is_active ? 'Active' : 'Inactive',
        logo: '/assets/img/icons/company-01.svg',
        raw: company // Store the basic company object for editing
      }));
      setCompanies(transformedCompanies);


      // } else {
      //   toast.error(response?.data?.message || 'Failed to fetch companies');
      //   setCompanies([]);
      // }

    } catch (error) {
      console.error('Error fetching companies:', error);

      if (error?.message && !error.message.includes('No company linked')) {
        toast.error(error.message || 'Failed to fetch companies');
      }

      setCompanies([]);

    } finally {
      setLoading(false);
    }
  };

  // Fetch dynamic business natures from API
  useEffect(() => {
    const fetchBusinessNatures = async () => {
      try {
        const response = await getBusinessNatures();
        if (response && response.success && Array.isArray(response.data)) {
          setBusinessTypes(response.data);
        }
      } catch (error) {
        console.error('Error fetching business natures:', error);
      }
    };
    fetchBusinessNatures();
  }, []);

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

        const india = data.find((c) => c.iso2 === 'IN');
        if (india && !editingCompany) {
          setCompanyData((prev) => ({
            ...prev,
            country: india.name,
          }));
          if (india.currency) {
            setCurrencies([{ code: india.currency, name: `${india.currency} - Indian Rupee` }]);
            setCompanyData((prev) => ({
              ...prev,
              currency: india.currency,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
        setCountries([{ name: 'India', iso2: 'IN' }]);
        setCompanyData((prev) => ({
          ...prev,
          country: 'India',
        }));
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
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
    const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/i;
    return tanRegex.test(tan);
  };

  const validateCIN = (cin) => {
    const cinRegex = /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/i;
    return cinRegex.test(cin);
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

    if (!companyData.name.trim()) newErrors.name = 'Company name is required';
    if (companyData.name.length > 200) newErrors.name = 'Company name must be max 200 characters';

    if (!companyData.legal_name.trim()) newErrors.legal_name = 'Legal name is required';

    if (companyData.gstin.trim() && !validateGSTIN(companyData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format (e.g., 22AAAAA0000A1Z5)';
    }

    if (companyData.pan.trim() && !validatePAN(companyData.pan)) {
      newErrors.pan = 'Invalid PAN format (e.g., AAAAA0000A)';
    }

    if (companyData.tan && companyData.tan.trim() && !validateTAN(companyData.tan)) {
      newErrors.tan = 'Invalid TAN format (e.g., AAAA11111A)';
    }

    if (companyData.cin && companyData.cin.trim() && !validateCIN(companyData.cin)) {
      newErrors.cin = 'Invalid CIN format (e.g., U74140DL2026PTC123456)';
    }

    if (!companyData.address.trim()) newErrors.address = 'Address is required';
    if (!companyData.city.trim()) newErrors.city = 'City is required';
    if (!companyData.state) newErrors.state = 'State is required';

    if (!companyData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!validatePincode(companyData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    if (!companyData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(companyData.phone)) {
      newErrors.phone = 'Phone number must be a valid 10-digit mobile number starting with 6, 7, 8, or 9';
    }

    if (!companyData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(companyData.email)) {
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
    if (['gstin', 'pan', 'tan', 'cin'].includes(name)) {
      value = value.toUpperCase();
    }

    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-fill country code and reset state/city when country changes
    if (name === 'country') {
      const selectedCountry = countries.find((c) => c.name === value);
      setSelectedCountryIso(selectedCountry?.iso2 || '');

      if (selectedCountry?.currency) {
        const currencyList = [
          { code: selectedCountry.currency, name: `${selectedCountry.currency} - ${selectedCountry.name}` }
        ];
        setCurrencies(currencyList);
        setCompanyData((prev) => ({
          ...prev,
          state: '',
          state_code: '',
          city: '',
          currency: selectedCountry.currency,
        }));
      } else {
        setCompanyData((prev) => ({
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
      setCompanyData((prev) => ({
        ...prev,
        state_code: selectedState?.stateCode || selectedState?.iso2 || '',
        city: '',
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
        setCompanyData((prev) => ({
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

    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        name: companyData.name,
        legal_name: companyData.legal_name,
        gstin: companyData.gstin,
        pan: companyData.pan,
        address: companyData.address,
        city: companyData.city,
        state: companyData.state,
        state_code: companyData.state_code,
        pincode: companyData.pincode,
        phone: companyData.phone,
        email: companyData.email,
        business_nature_id: companyData.business_nature_id ? Number(companyData.business_nature_id) : null,
        business_nature: companyData.business_nature_id ? businessTypes.find(t => String(t.id) === String(companyData.business_nature_id))?.name : null,
        tan: companyData.tan || null,
        cin: companyData.cin || null,
        currency: companyData.currency || 'INR',
        country: companyData.country || 'India',
        timezone: companyData.timezone || 'Asia/Kolkata'
      };

      if (editingCompany) {
        // Update existing company
        await updateCompany(editingCompany.id, payload);
        toast.success('Company updated successfully!');
      } else {
        // Create new company
        const response = await createCompany(payload);
        
        let newCompanyId = response?.data?.id || response?.id || response?.data?.company?.id || response?.company?.id || response?.data?.newCompany?.id || response?.newCompany?.id;

        if (!newCompanyId) {
          try {
            const companiesResp = await getCompanies();
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
            name: companyData.name,
            code: uniqueBranchCode,
            is_head_office: true,
            address: companyData.address,
            city: companyData.city,
            state_code: companyData.state_code,
            pincode: companyData.pincode,
            phone: companyData.phone,
            email: companyData.email,
            gstin: companyData.gstin,
          }, headers);

          // Rename the backend-seeded warehouse to the company name instead of creating a duplicate
          try {
            const warehousesResp = await settingsService.getWarehouses(headers);
            const existingWarehouses = warehousesResp?.data || warehousesResp || [];
            if (Array.isArray(existingWarehouses) && existingWarehouses.length > 0) {
              // Rename the first (auto-created) warehouse to the company name
              const autoWarehouse = existingWarehouses[0];
              await settingsService.updateWarehouse(autoWarehouse.id, {
                name: companyData.name,
                code: uniqueWarehouseCode,
                location: `${companyData.address}, ${companyData.city}`,
              }, headers);
            } else {
              // No auto-created warehouse found — create one with the company name
              await settingsService.createWarehouse({
                company_id: newCompanyId,
                name: companyData.name,
                code: uniqueWarehouseCode,
                location: `${companyData.address}, ${companyData.city}`,
              }, headers);
            }
          } catch (warehouseError) {
            console.error('Error setting up warehouse:', warehouseError);
          }
        } catch (defaultEntityError) {
          console.error('Error creating default branch or warehouse:', defaultEntityError);
        }

        toast.success('Company created successfully!');
        window.dispatchEvent(new Event('COMPANY_CREATED'));
      }

      // Refresh companies list
      await fetchCompaniesData();

      // Reset form and editing state
      resetForm();

      // Close modal
      const modalElement = document.getElementById('add_companies');
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();

    } catch (error) {
      console.error('Error saving company:', error);

      // Handle duplicate entry error specifically
      if (error.error_code === 'DUPLICATE_ENTRY') {
        toast.error(error.message || 'A company with this name already exists. Please use a different name.');
        setErrors({ name: 'Company name already exists' });
      } else if (error.response?.status === 409) {
        // Handle 409 Conflict from API
        const errorMessage = error.response?.data?.message || error.message || 'A company with this details already exists.';
        toast.error(errorMessage);
        setErrors({ name: errorMessage });
      } else {
        toast.error(error.message || 'Error saving company. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCompanyData({
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
      email: '',
      business_nature_id: '',
      tan: '',
      cin: '',
      currency: 'INR',
      country: 'India',
      timezone: 'Asia/Kolkata'
    });
    setEditingCompany(null);
    setErrors({});
  };

  // Handler functions for table operations
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status === filterStatus ? '' : status);
    setCurrentPage(1);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCompanies(filteredAndSortedCompanies.map(c => c.id));
    } else {
      setSelectedCompanies([]);
    }
  };

  const handleSelectCompany = (id) => {
    setSelectedCompanies(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('');
    setSelectedCompanies([]);
    setFilterCompanyIds([]);
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  const handleEdit = async (company) => {
    setLoading(true);
    let raw = company.raw || {};
    
    try {
      // Fetch full details on demand to avoid N+1 queries on page load
      const detailRes = await getCompanyById(company.id);
      if (detailRes && detailRes.data) {
        raw = { ...raw, ...detailRes.data };
      }
    } catch (err) {
      console.error(`Error fetching full details for company ${company.id}:`, err);
      toast.error('Failed to load full company details. Form may have incomplete data.');
    } finally {
      setLoading(false);
    }

    const updatedCompany = { ...company, raw };
    setEditingCompany(updatedCompany);
    console.log('DEBUG: handleEdit raw data:', raw);

    // Find ISO codes based on names
    const country = countries.find(c => c.name === (raw.country || 'India'));
    const countryIso = country?.iso2 || 'IN';

    // triggers state fetching. The effect above will handle setting state ISO
    // once states are loaded, which in turn triggers city fetching.
    setSelectedCountryIso(countryIso);
    setEditingStateName(raw.state || '');
    setEditingCityName(raw.city || '');

    setCompanyData({
      name: raw.name || '',
      legal_name: raw.legal_name || raw.name || '',
      gstin: raw.gstin || '',
      pan: raw.pan || '',
      address: raw.address || '',
      city: raw.city || '',
      state: raw.state || '',
      state_code: raw.state_code || '',
      pincode: raw.pincode || '',
      phone: raw.phone || '',
      email: raw.email || '',
      business_nature_id: raw.business_nature_id || '',
      tan: raw.tan || '',
      cin: raw.cin || '',
      currency: raw.currency || 'INR',
      country: raw.country || 'India',
      timezone: raw.timezone || 'Asia/Kolkata'
    });
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF('landscape');
      const tableColumn = [
        "Company Name", "Legal Name", "GSTIN", "PAN", "Email", "Phone",
        "Business Type", "Address", "City", "Created On", "Status"
      ];
      const tableRows = [];

      filteredAndSortedCompanies.forEach(company => {
        const raw = company.raw || {};
        const businessType = businessTypes.find(t => t.id === Number(raw.business_nature_id))?.name || 'N/A';
        const fullAddress = raw.address || 'N/A';

        const companyData = [
          company.name,
          raw.legal_name || 'N/A',
          raw.gstin || 'N/A',
          raw.pan || 'N/A',
          company.email,
          raw.phone || 'N/A',
          businessType,
          fullAddress,
          raw.city || 'N/A',
          company.createdOn,
          company.status,
        ];
        tableRows.push(companyData);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [63, 81, 181] },
      });
      doc.text("Detailed Companies List", 14, 15);
      doc.save("companies_detailed.pdf");
      toast.success("Detailed PDF exported successfully");
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.error("Failed to export PDF");
    }
  };

  const exportToExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(filteredAndSortedCompanies.map(c => {
        const raw = c.raw || {};
        const businessType = businessTypes.find(t => t.id === Number(raw.business_nature_id))?.name || 'N/A';
        return {
          "Company Name": c.name,
          "Legal Name": raw.legal_name || 'N/A',
          "GSTIN": raw.gstin || 'N/A',
          "PAN": raw.pan || 'N/A',
          "TAN": raw.tan || 'N/A',
          "CIN": raw.cin || 'N/A',
          "Email": c.email,
          "Phone": raw.phone || 'N/A',
          "Website": c.url,
          "Address": raw.address || 'N/A',
          "City": raw.city || 'N/A',
          "State": raw.state || 'N/A',
          "Pincode": raw.pincode || 'N/A',
          "Country": raw.country || 'N/A',
          "Business Type": businessType,
          "Currency": raw.currency || 'INR',
          "Created On": c.createdOn,
          "Status": c.status
        };
      }));
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Companies");
      XLSX.writeFile(workbook, "companies_detailed.xlsx");
      toast.success("Detailed Excel exported successfully");
    } catch (error) {
      console.error("Excel Export Error:", error);
      toast.error("Failed to export Excel");
    }
  };



  const handleStatusChange = (id, newStatus) => {
    const company = companies.find(c => c.id === id);
    if (company) {
      setStatusChangeData({
        id,
        newStatus,
        oldStatus: company.status,
        companyName: company.name
      });
    }
  };

  const confirmStatusChange = async () => {
    if (statusChangeData) {
      try {
        setLoading(true);
        const isActive = statusChangeData.newStatus === 'Active';
        console.log(`DEBUG: Initiating status change for company ${statusChangeData.id} to is_active=${isActive}`);
        
        // Close modal and cleanup backdrop BEFORE async operations that might unmount the component
        const modalElement = document.getElementById('status_change_modal');
        if (modalElement) {
          const modal = window.bootstrap.Modal.getInstance(modalElement);
          if (modal) modal.hide();
        }
        // Force cleanup of Bootstrap modal leftovers in case of rapid unmount
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        // Save reference and clear state
        const currentChangeData = statusChangeData;
        setStatusChangeData(null);

        const response = await updateCompanyStatus(currentChangeData.id, isActive);
        console.log('DEBUG: Status update response from backend:', response);

        toast.success(`Company status updated to ${currentChangeData.newStatus}`);
        
        if (isActive) {
          try {
            await contextSwitchCompany(currentChangeData.id);
            toast.success(`Switched active company to ${currentChangeData.companyName}`);
          } catch (switchErr) {
            console.error('Error auto-switching company:', switchErr);
            toast.error('Could not auto-switch to this company');
          }
        }

        // Re-fetch data to verify persistence and update UI from server state
        console.log('DEBUG: Re-fetching companies to verify persistence...');
        await fetchCompaniesData();
      } catch (error) {
        console.error('Error changing status:', error);
        toast.error(error.message || 'Failed to update company status');
      } finally {
        setLoading(false);
      }
    }
  };

  // Toggle column visibility
  const toggleColumn = (columnName) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnName]: !prev[columnName]
    }));
  };

  const handleSwitchCompany = async (companyId) => {
    try {
      setLoading(true);
      await switchCompany(companyId);
      toast.success('Switched company successfully');
      // Refresh to clear all context-specific data
      window.location.reload();
    } catch (error) {
      console.error('Error switching company:', error);
      toast.error(error.message || 'Failed to switch company');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedCompanies = companies
    .filter(company => {
      // 1. Search term filter
      const matchesSearch = !searchTerm ||
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Status filter
      const matchesStatus = !filterStatus || company.status === filterStatus;

      // 3. Company selection filter
      const matchesCompany = filterCompanyIds.length === 0 || filterCompanyIds.includes(company.id);

      // 4. Date range filter
      let matchesDate = true;
      if (startDate || endDate) {
        const createdRaw = company.raw?.createdAt || company.raw?.created_at;
        
        if (createdRaw) {
          const createdDate = new Date(createdRaw);
          if (!isNaN(createdDate.getTime())) {
            // Get local YYYY-MM-DD format
            const yyyy = createdDate.getFullYear();
            const mm = String(createdDate.getMonth() + 1).padStart(2, '0');
            const dd = String(createdDate.getDate()).padStart(2, '0');
            const companyDateStr = `${yyyy}-${mm}-${dd}`;
            
            if (startDate && companyDateStr < startDate) {
              matchesDate = false;
            }
            if (endDate && companyDateStr > endDate) {
              matchesDate = false;
            }
          } else {
            matchesDate = false;
          }
        } else {
          matchesDate = false;
        }
      }

      return matchesSearch && matchesStatus && matchesCompany && matchesDate;
    })
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.createdOn) - new Date(a.createdOn);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdOn) - new Date(b.createdOn);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = filteredAndSortedCompanies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedCompanies.length / itemsPerPage);

  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Companies</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="dropdown" style={{ position: "relative" }}>
            <a
              href="#"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown" data-bs-auto-close="outside"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); exportToPDF(); }}>
                  Download as PDF
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); exportToExcel(); }}>
                  Download as Excel
                </a>
              </li>
            </ul>
          </div>
          <div>
            <Link
              to="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_companies"
            >
              <i className="isax isax-add-circle5 me-1"></i>New Company
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center pb-0">
                <div className="me-2">
                  <span className="avatar avatar-lg bg-soft-info">
                    <i className="isax isax-buildings-25 text-info fs-28"></i>
                  </span>
                </div>
                <div>
                  <p className="mb-1">Total Companies</p>
                  <h6 className="fs-16 fw-semibold">{companies.length}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center pb-0">
                <div className="me-2">
                  <span className="avatar avatar-lg bg-success-subtle">
                    <i className="isax isax-menu-board5 text-success fs-28"></i>
                  </span>
                </div>
                <div>
                  <p className="mb-1">Active Companies</p>
                  <h6 className="fs-16 fw-semibold">{companies.filter(c => c.status === 'Active').length}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center pb-0">
                <div className="me-2">
                  <span className="avatar avatar-lg bg-danger-subtle">
                    <i className="isax isax-flash-slash5 text-danger fs-28"></i>
                  </span>
                </div>
                <div>
                  <p className="mb-1">Inactive Company</p>
                  <h6 className="fs-16 fw-semibold">{companies.filter(c => c.status === 'Inactive').length}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={handleSearch}
                  autoComplete="one-time-code"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck="false"
                />
                <span className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </span>
              </div>
            </div>
            <a
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </a>
          </div>

        </div>
        <div className="align-items-center gap-2 flex-wrap filter-info mt-3">
          <h6 className="fs-13 fw-semibold">Filters</h6>
          {searchTerm && (
            <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
              Search: "{searchTerm}"
              <span className="ms-1 tag-close" onClick={() => setSearchTerm('')} style={{ cursor: 'pointer' }}>
                <i className="fa-solid fa-x fs-10"></i>
              </span>
            </span>
          )}
          {filterStatus && (
            <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
              Status: {filterStatus}
              <span className="ms-1 tag-close" onClick={() => setFilterStatus('')} style={{ cursor: 'pointer' }}>
                <i className="fa-solid fa-x fs-10"></i>
              </span>
            </span>
          )}
          {filterCompanyIds.length > 0 && (
            <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
              <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
                {filterCompanyIds.length}
              </span>
              Companies Filtered
              <span className="ms-1 tag-close" onClick={() => setFilterCompanyIds([])} style={{ cursor: 'pointer' }}>
                <i className="fa-solid fa-x fs-10"></i>
              </span>
            </span>
          )}
          {(startDate || endDate) && (
            <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
              Date: {startDate || 'Any'} to {endDate || 'Any'}
              <span className="ms-1 tag-close" onClick={() => { setStartDate(''); setEndDate(''); }} style={{ cursor: 'pointer' }}>
                <i className="fa-solid fa-x fs-10"></i>
              </span>
            </span>
          )}
          {(searchTerm || filterStatus || filterCompanyIds.length > 0 || startDate || endDate) && (
            <Link to="#" className="link-danger fw-medium text-decoration-underline ms-md-1" onClick={(e) => { e.preventDefault(); clearFilters(); }}>
              Clear All
            </Link>
          )}
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead className="thead-light">
            <tr>
              {visibleColumns.company && <th className="no-sort">Name</th>}
              {visibleColumns.legalName && <th className="no-sort">Legal Name</th>}
              {visibleColumns.email && <th className="no-sort">Email</th>}
              {visibleColumns.createdOn && <th>Created On</th>}
              {visibleColumns.status && <th>Status</th>}
              <th className="no-sort">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCompanies.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <div className="d-flex flex-column align-items-center">
                    <i className="isax isax-search-normal fs-48 text-muted mb-2"></i>
                    <p className="text-muted">No companies found</p>
                  </div>
                </td>
              </tr>
            ) : (
              currentCompanies.map((company) => (
                <tr key={company.id}>
                  {visibleColumns.company && (
                    <td>
                      <div className="d-flex align-items-center">
                        <Link
                          to={`/company-details/${company.id}`}
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                        >
                          <img
                            src={company.logo}
                            className="rounded-circle"
                            alt="img"
                          />
                        </Link>
                        <div style={{ minWidth: '150px', maxWidth: '400px', whiteSpace: 'normal', wordBreak: 'break-all' }}>
                          <h6 className="fs-14 fw-medium mb-0" style={{ whiteSpace: 'normal', wordBreak: 'break-all' }}>
                            <Link to={`/company-details/${company.id}`} style={{ whiteSpace: 'normal', wordBreak: 'break-all' }}>{company.name}</Link>
                          </h6>
                        </div>
                      </div>
                    </td>
                  )}
                  {visibleColumns.legalName && <td style={{ wordBreak: 'break-all', whiteSpace: 'normal', minWidth: '120px', maxWidth: '300px' }}>{company.legalName}</td>}
                  {visibleColumns.email && <td style={{ wordBreak: 'break-all', whiteSpace: 'normal', minWidth: '120px', maxWidth: '300px' }}>{company.email}</td>}
                  {visibleColumns.createdOn && <td>{company.createdOn}</td>}
                  {visibleColumns.status && (
                    <td>
                      <div className="dropdown">
                        <span 
                          className={`badge ${company.status === 'Active' ? 'bg-soft-success text-success border border-success' : 'bg-soft-danger text-danger border border-danger'} px-2 py-1 dropdown-toggle`}
                          data-bs-toggle="dropdown"
                          style={{ cursor: 'pointer' }}
                        >
                          {company.status}
                        </span>
                        <ul className="dropdown-menu shadow-sm border-0 fs-13" style={{ minWidth: '120px' }}>
                          <li>
                            <button
                              className={`dropdown-item d-flex align-items-center ${company.status === 'Active' ? 'bg-light text-muted' : ''}`}
                              data-bs-toggle={company.status === 'Active' ? '' : 'modal'}
                              data-bs-target={company.status === 'Active' ? '' : '#status_change_modal'}
                              onClick={() => {
                                if (company.status !== 'Active') handleStatusChange(company.id, 'Active');
                              }}
                              disabled={company.status === 'Active'}
                            >
                              <i className="isax isax-tick-circle text-success me-2"></i> Active
                            </button>
                          </li>
                          <li>
                            <button
                              className={`dropdown-item d-flex align-items-center ${company.status === 'Inactive' ? 'bg-light text-muted' : ''}`}
                              data-bs-toggle={company.status === 'Inactive' ? '' : 'modal'}
                              data-bs-target={company.status === 'Inactive' ? '' : '#status_change_modal'}
                              onClick={() => {
                                if (company.status !== 'Inactive') handleStatusChange(company.id, 'Inactive');
                              }}
                              disabled={company.status === 'Inactive'}
                            >
                              <i className="isax isax-close-circle text-danger me-2"></i> Inactive
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  )}

                  <td>
                    <button
                      className="btn btn-icon-sm btn-outline-white border-0 shadow-none p-0"
                      data-bs-toggle="modal"
                      data-bs-target="#add_companies"
                      onClick={() => handleEdit(company)}
                      title="Edit Company"
                    >
                      <i className="isax isax-edit-2 fs-18 text-warning"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {filteredAndSortedCompanies.length > 0 && (
        <div className="row mt-3">
          <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
            <div className="dataTables_info">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredAndSortedCompanies.length)} of {filteredAndSortedCompanies.length} entries
            </div>
          </div>
          <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
            <div className="dataTables_paginate paging_simple_numbers">
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    <i className="isax isax-arrow-left-2"></i>
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    <i className="isax isax-arrow-right-3"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas">
        <div className="offcanvas-header d-block pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
            <h6 className="offcanvas-title">Filter</h6>
            <button
              type="button"
              className="btn-close btn-close-modal custom-btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
        <div className="offcanvas-body pt-3">
          <form action="#">
            <div className="mb-3">
              <label className="form-label">Company</label>
              <div className="dropdown" style={{ position: "relative" }}>
                <a
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  {filterCompanyIds.length === 0
                    ? 'Select'
                    : `${filterCompanyIds.length} Selected`}
                </a>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info p-3" style={{ minWidth: '280px' }}>
                  <div className="mb-3">
                    <div className="input-icon-start position-relative">
                      <span className="input-icon-addon fs-12">
                        <i className="isax isax-search-normal"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search company"
                        value={companySearch}
                        onChange={(e) => setCompanySearch(e.target.value)}
                        autoComplete="one-time-code"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                  <ul className="mb-3 list-unstyled p-0" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                    <li className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                      <label className="d-inline-flex align-items-center text-gray-9 mb-0 cursor-pointer">
                        <input
                          className="form-check-input select-all m-0 me-2"
                          type="checkbox"
                          checked={filterCompanyIds.length === companies.length && companies.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilterCompanyIds(companies.map(c => c.id));
                            } else {
                              setFilterCompanyIds([]);
                            }
                          }}
                        />{' '}
                        Select All
                      </label>
                      <a
                        href="#"
                        className="link-danger fw-medium text-decoration-underline fs-12"
                        onClick={(e) => {
                          e.preventDefault();
                          setFilterCompanyIds([]);
                        }}
                      >
                        Reset
                      </a>
                    </li>
                    {companies
                      .filter(c => c.name.toLowerCase().includes(companySearch.toLowerCase()))
                      .map(c => (
                        <li key={c.id} className="mb-2">
                          <label className="dropdown-item px-2 d-flex align-items-center text-dark cursor-pointer rounded mb-0">
                            <input
                              className="form-check-input m-0 me-2"
                              type="checkbox"
                              checked={filterCompanyIds.includes(c.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilterCompanyIds(prev => [...prev, c.id]);
                                } else {
                                  setFilterCompanyIds(prev => prev.filter(id => id !== c.id));
                                }
                              }}
                            />
                            <span className="avatar avatar-sm rounded-circle me-2 flex-shrink-0" style={{ width: '24px', height: '24px' }}>
                              <img
                                src={c.logo}
                                className="rounded-circle"
                                alt="img"
                                style={{ width: '24px', height: '24px' }}
                              />
                            </span>
                            <span className="fs-13 text-truncate" style={{ maxWidth: '160px' }}>{c.name}</span>
                          </label>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Date Range</label>
              <div className="row g-2">
                <div className="col-6">
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="From"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="To"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select form-select-lg bg-light fs-13"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ height: '46px' }}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="offcanvas-footer mt-4">
              <div className="row g-2">
                <div className="col-6">
                  <a href="#" className="btn btn-outline-white w-100" onClick={(e) => { e.preventDefault(); clearFilters(); }}>
                    Reset
                  </a>
                </div>
                <div className="col-6">
                  <button
                    data-bs-dismiss="offcanvas"
                    className="btn btn-primary w-100"
                    id="filter-submit"
                    type="button"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="modal fade" id="add_companies">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title">{editingCompany ? 'Edit Company' : 'Add Company'}</h5>
              <button
                type="button"
                className="btn btn-light d-flex align-items-center justify-content-center ms-auto"
                data-bs-dismiss="modal"
                onClick={resetForm}
                style={{ width: '32px', height: '32px', padding: '0', border: 'none' }}
              >
                <span
                  className="d-inline-flex align-items-center justify-content-center bg-danger text-white rounded-circle"
                  style={{ width: '24px', height: '24px', fontSize: '14px' }}
                >
                  ✕
                </span>
              </button>
            </div>
            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <form onSubmit={handleSubmit} autoComplete="off">
                {/* Business Information */}
                <div className="card mb-3 shadow-none border">
                  <div className="card-header bg-light-transparent">
                    <h5 className="card-title mb-0">Business Information</h5>
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
                          value={companyData.name}
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
                          value={companyData.legal_name}
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
                          value={companyData.gstin}
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
                          value={companyData.pan}
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
                          type="text"
                          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                          name="phone"
                          value={companyData.phone}
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
                          value={companyData.email}
                          onChange={handleInputChange}
                          placeholder="company@example.com"
                          autoComplete="one-time-code"
                          autoCorrect="off"
                          autoCapitalize="none"
                          spellCheck="false"
                        />
                        {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Business Nature</label>
                        <select
                          className="form-select"
                          name="business_nature_id"
                          value={companyData.business_nature_id}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Business Nature</option>
                          {businessTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">TAN Number</label>
                        <input
                          type="text"
                          className={`form-control ${errors.tan ? 'is-invalid' : ''}`}
                          name="tan"
                          value={companyData.tan}
                          onChange={handleInputChange}
                          placeholder="e.g., DELK12345F"
                          autoComplete="one-time-code"
                          autoCorrect="off"
                          autoCapitalize="none"
                          spellCheck="false"
                        />
                        {errors.tan && <div className="invalid-feedback d-block">{errors.tan}</div>}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">CIN Number</label>
                        <input
                          type="text"
                          className={`form-control ${errors.cin ? 'is-invalid' : ''}`}
                          name="cin"
                          value={companyData.cin}
                          onChange={handleInputChange}
                          placeholder="e.g., U74140DL2026PTC123456"
                          autoComplete="one-time-code"
                          autoCorrect="off"
                          autoCapitalize="none"
                          spellCheck="false"
                        />
                        {errors.cin && <div className="invalid-feedback d-block">{errors.cin}</div>}
                      </div>

                      {/* <div className="col-md-6 mb-3">
                        <label className="form-label">Currency</label>
                        <input
                          type="text"
                          className="form-control"
                          name="currency"
                          value={companyData.currency}
                          onChange={handleInputChange}
                          placeholder="e.g., INR"
                          autoComplete="one-time-code"
                          autoCorrect="off"
                          autoCapitalize="none"
                          spellCheck="false"
                        />
                      </div> */}

                      {/* <div className="col-md-6 mb-3">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          className="form-control bg-light"
                          name="country"
                          value={companyData.country}
                          readOnly
                          placeholder="e.g., India"
                          autoComplete="one-time-code"
                          autoCorrect="off"
                          autoCapitalize="none"
                          spellCheck="false"
                        />
                      </div> */}

                      {/* <div className="col-md-6 mb-3">
                        <label className="form-label">Timezone</label>
                        <input
                          type="text"
                          className="form-control"
                          name="timezone"
                          value={companyData.timezone}
                          onChange={handleInputChange}
                          placeholder="e.g., Asia/Kolkata"
                          autoComplete="one-time-code"
                          autoCorrect="off"
                          autoCapitalize="none"
                          spellCheck="false"
                        />
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="card mb-3 shadow-none border">
                  <div className="card-header bg-light-transparent">
                    <h5 className="card-title mb-0">Address Information</h5>
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
                          value={companyData.address}
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
                          value={companyData.state}
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
                          value={companyData.city}
                          onChange={handleInputChange}
                          disabled={!companyData.state || loadingCities}
                        >
                          <option value="">
                            {!companyData.state
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
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">
                          Pincode <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                          name="pincode"
                          value={companyData.pincode}
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
                          className="form-control bg-light"
                          name="state_code"
                          value={companyData.state_code}
                          readOnly
                          placeholder="Auto-filled from state"
                        />
                        <small className="text-muted">Auto-filled based on selected state</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer px-0 pb-0 pt-3 border-0">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Saving...
                      </>
                    ) : editingCompany ? (
                      'Update Company'
                    ) : (
                      'Create Company'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>



      {/* Status Change Confirmation Modal */}
      <div className="modal fade" id="status_change_modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Company Status</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <i className={`isax ${statusChangeData?.newStatus === 'Active' ? 'isax-tick-circle text-success' : 'isax-close-circle text-danger'}`} style={{ fontSize: '48px' }}></i>
                <h6 className="mt-3">
                  Change status of "{statusChangeData?.companyName}" to {statusChangeData?.newStatus}?
                </h6>
                <p className="text-muted">
                  Current status: <span className={`badge ${statusChangeData?.oldStatus === 'Active' ? 'badge-soft-success' : 'badge-soft-danger'}`}>
                    {statusChangeData?.oldStatus}
                  </span>
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setStatusChangeData(null)}>
                Cancel
              </button>
              <button type="button" className={`btn ${statusChangeData?.newStatus === 'Active' ? 'btn-success' : 'btn-danger'}`} onClick={confirmStatusChange}>
                <i className={`isax ${statusChangeData?.newStatus === 'Active' ? 'isax-tick-circle' : 'isax-close-circle'} me-2`}></i>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
