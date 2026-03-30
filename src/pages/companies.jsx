import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCompanies, createCompany, updateCompany, updateCompanyStatus } from '../services/companyService';
import { switchCompany } from '../services/authService';
import { useAuth } from '../components/AuthContext';
import { toast } from 'react-toastify';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const Companies = () => {
  const { activeCompany } = useAuth();
  // State for companies list
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for search, filter, sort
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [deletingCompanyId, setDeletingCompanyId] = useState(null);
  const [statusChangeData, setStatusChangeData] = useState(null); // { id, newStatus, oldStatus }

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    company: true,
    email: true,
    url: true,
    plan: true,
    createdOn: true,
    status: true,
  });

  // State for add company modal
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

  const location = useLocation();

  // Fetch companies from API
  useEffect(() => {
    fetchCompaniesData();
  }, []);

  // Handle auto-edit from query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('edit') === 'true' && companies.length > 0 && !editingCompany) {
      handleEdit(companies[0]);

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
      }, 500);
    }
  }, [location.search, companies]);

  const fetchCompaniesData = async () => {
    try {
      setLoading(true);

      const response = await getCompanies();
      console.log('####### Get company', response);

      const companiesList = Array.isArray(response.data) ? response.data : [];

      const transformedCompanies = companiesList.map(company => ({
        id: company.id,
        name: company.name,
        email: company.email || '',
        url: company.website || '',
        plan: 'Basic (Monthly)',
        createdOn: (company.createdAt && !isNaN(new Date(company.createdAt))) ? new Date(company.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }) : 'N/A',
        status: company.is_active ? 'Active' : 'Inactive',
        logo: '/assets/img/icons/company-01.svg',
        raw: company // Store the full company object for editing
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

    if (!companyData.name.trim()) newErrors.name = 'Company name is required';
    if (companyData.name.length > 200) newErrors.name = 'Company name must be max 200 characters';

    if (!companyData.legal_name.trim()) newErrors.legal_name = 'Legal name is required';

    if (!companyData.gstin.trim()) {
      newErrors.gstin = 'GSTIN is required';
    } else if (!validateGSTIN(companyData.gstin)) {
      newErrors.gstin = 'Invalid GSTIN format (e.g., 22AAAAA0000A1Z5)';
    }

    if (!companyData.pan.trim()) {
      newErrors.pan = 'PAN is required';
    } else if (!validatePAN(companyData.pan)) {
      newErrors.pan = 'Invalid PAN format (e.g., AAAAA0000A)';
    }

    if (!companyData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!validatePincode(companyData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    if (!companyData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(companyData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
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
    const { name, value } = e.target;
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
      if (editingCompany) {
        // Update existing company
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
        };

        await updateCompany(editingCompany.id, payload);
        toast.success('Company updated successfully!');
      } else {
        // Create new company
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
        };

        await createCompany(payload);
        toast.success('Company created successfully!');
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
    });
    setEditingCompany(null);
    setErrors({});
  };

  // Handler functions for table operations
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status === filterStatus ? '' : status);
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
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    const raw = company.raw || {};
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

  const handleDelete = (id) => {
    setDeletingCompanyId(id);
  };

  const confirmDelete = () => {
    setCompanies(prev => prev.filter(c => c.id !== deletingCompanyId));
    setDeletingCompanyId(null);
    // Close modal
    const modalElement = document.getElementById('delete_modal');
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
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
        const response = await updateCompanyStatus(statusChangeData.id, isActive);
        console.log('DEBUG: Status update response from backend:', response);

        toast.success(`Company status updated to ${statusChangeData.newStatus}`);
        setStatusChangeData(null);

        // Close modal
        const modalElement = document.getElementById('status_change_modal');
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
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
  
  // Filter and sort companies
  const filteredAndSortedCompanies = companies
    .filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !filterStatus || company.status === filterStatus;
      return matchesSearch && matchesStatus;
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
        <div className="col-xl-3 col-lg-4 col-md-6">
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
        <div className="col-xl-3 col-lg-4 col-md-6">
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
        <div className="col-xl-3 col-lg-4 col-md-6">
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
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center pb-0">
                <div className="me-2">
                  <span className="avatar avatar-lg bg-primary-subtle">
                    <i className="isax isax-map5 text-primary fs-28"></i>
                  </span>
                </div>
                <div>
                  <p className="mb-1">Company Locations</p>
                  <h6 className="fs-16 fw-semibold">{companies.length}</h6>
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
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown" style={{ position: "relative" }}>
              <a
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center fw-medium"
                data-bs-toggle="dropdown" data-bs-auto-close="outside"
              >
                <i className="isax isax-sort me-1"></i>Sort By :{' '}
                <span className="fw-normal ms-1">
                  {sortBy === 'latest' ? 'Latest' : sortBy === 'oldest' ? 'Oldest' : 'Name'}
                </span>
              </a>
              <ul className="dropdown-menu  dropdown-menu-end">
                <li>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleSort('latest'); }}>
                    Latest
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleSort('oldest'); }}>
                    Oldest
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); handleSort('name'); }}>
                    Name
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown" style={{ position: "relative" }}>
              <a
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown" data-bs-auto-close="outside"
              >
                <i className="isax isax-grid-3 me-1"></i>Column
              </a>
              <ul className="dropdown-menu dropdown-menu-lg">
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input
                      className="form-check-input m-0 me-2"
                      type="checkbox"
                      checked={visibleColumns.company}
                      onChange={() => toggleColumn('company')}
                    />
                    <span>Company</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input
                      className="form-check-input m-0 me-2"
                      type="checkbox"
                      checked={visibleColumns.email}
                      onChange={() => toggleColumn('email')}
                    />
                    <span>Email</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input
                      className="form-check-input m-0 me-2"
                      type="checkbox"
                      checked={visibleColumns.url}
                      onChange={() => toggleColumn('url')}
                    />
                    <span>Domain URL</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input
                      className="form-check-input m-0 me-2"
                      type="checkbox"
                      checked={visibleColumns.plan}
                      onChange={() => toggleColumn('plan')}
                    />
                    <span>Plan</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input
                      className="form-check-input m-0 me-2"
                      type="checkbox"
                      checked={visibleColumns.createdOn}
                      onChange={() => toggleColumn('createdOn')}
                    />
                    <span>Created On</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input
                      className="form-check-input m-0 me-2"
                      type="checkbox"
                      checked={visibleColumns.status}
                      onChange={() => toggleColumn('status')}
                    />
                    <span>Status</span>
                  </label>
                </li>
              </ul>
            </div>
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
          {selectedCompanies.length > 0 && (
            <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
              <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
                {selectedCompanies.length}
              </span>
              Companies Selected
              <span className="ms-1 tag-close" onClick={() => setSelectedCompanies([])} style={{ cursor: 'pointer' }}>
                <i className="fa-solid fa-x fs-10"></i>
              </span>
            </span>
          )}
          {(searchTerm || filterStatus || selectedCompanies.length > 0) && (
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
              <th className="no-sort">
                <div className="form-check form-check-md">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="select-all"
                    checked={selectedCompanies.length === filteredAndSortedCompanies.length && filteredAndSortedCompanies.length > 0}
                    onChange={handleSelectAll}
                  />
                </div>
              </th>
              {visibleColumns.company && <th className="no-sort">Company</th>}
              {visibleColumns.email && <th className="no-sort">Email</th>}
              {visibleColumns.url && <th className="no-sort">Account URL</th>}
              {visibleColumns.plan && <th>Plan</th>}
              {visibleColumns.createdOn && <th>Created On</th>}
              {visibleColumns.status && <th className="no-sort">Status</th>}
              <th className="no-sort">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCompanies.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  <div className="d-flex flex-column align-items-center">
                    <i className="isax isax-search-normal fs-48 text-muted mb-2"></i>
                    <p className="text-muted">No companies found</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredAndSortedCompanies.map((company) => (
                <tr key={company.id}>
                  <td>
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedCompanies.includes(company.id)}
                        onChange={() => handleSelectCompany(company.id)}
                      />
                    </div>
                  </td>
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
                        <div>
                          <h6 className="fs-14 fw-medium mb-0">
                            <Link to={`/company-details/${company.id}`}>{company.name}</Link>
                          </h6>
                        </div>
                      </div>
                    </td>
                  )}
                  {visibleColumns.email && <td>{company.email}</td>}
                  {visibleColumns.url && <td>{company.url}</td>}
                  {visibleColumns.plan && (
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">{company.plan}</p>
                        <a href="#" className="ms-3" onClick={(e) => e.preventDefault()}>
                          <span className="btn btn-sm btn-light p-1 d-inline-flex align-items-center">
                            <i className="isax isax-candle"></i>
                          </span>
                        </a>
                      </div>
                    </td>
                  )}
                  {visibleColumns.createdOn && <td>{company.createdOn}</td>}
                  {visibleColumns.status && (
                    <td>
                    <div className="dropdown" style={{ position: "relative" }}>
                        <a
                          href="#"
                          className={`badge ${company.status === 'Active' ? 'badge-soft-success' : 'badge-soft-danger'} d-inline-flex align-items-center dropdown-toggle`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {company.status}
                          <i className={`isax ${company.status === 'Active' ? 'isax-tick-circle' : 'isax-close-circle'} ms-1`}></i>
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleStatusChange(company.id, company.status === 'Active' ? 'Inactive' : 'Active');
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#status_change_modal"
                            >
                              Mark as {company.status === 'Active' ? 'Inactive' : 'Active'}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  )}
                  <td className="action-item">
                    <div className="d-flex gap-2">
                       {activeCompany?.id !== company.id && (
                        <button
                          className="btn btn-sm btn-outline-info"
                          title="Switch to this company"
                          onClick={() => handleSwitchCompany(company.id)}
                        >
                          <i className="isax isax-refresh"></i>
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#add_companies"
                        title="Edit"
                        onClick={() => handleEdit(company)}
                      >
                        <i className="isax isax-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                        title="Delete"
                        onClick={() => handleDelete(company.id)}
                      >
                        <i className="isax isax-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}



          </tbody>
        </table>
      </div>
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
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </a>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <div className="mb-3">
                    <div className="input-icon-start position-relative">
                      <span className="input-icon-addon fs-12">
                        <i className="isax isax-search-normal"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <ul className="mb-3">
                    <li className="d-flex align-items-center justify-content-between mb-3">
                      <label className="d-inline-flex align-items-center text-gray-9">
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />{' '}
                        Select All
                      </label>
                      <a href="#" className="link-danger fw-medium text-decoration-underline" onClick={(e) => e.preventDefault()}>
                        Reset
                      </a>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/icons/company-01.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Trend Hive
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/icons/company-02.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Quick Cart
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/icons/company-03.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Tech Bazaar
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/icons/company-04.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Harvest Basket
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/icons/company-05.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Elite Mart
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/icons/company-06.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Prime Mart
                      </label>
                    </li>
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <a href="#" className="btn btn-outline-white w-100" id="close-filter" onClick={(e) => e.preventDefault()}>
                        Cancel
                      </a>
                    </div>
                    <div className="col-6">
                      <a href="#" className="btn btn-primary w-100" onClick={(e) => e.preventDefault()}>
                        Select
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Date Range</label>
              <div className="input-group position-relative">
                <input type="text" className="form-control date-range bookingrange rounded-end" />
                <span className="input-icon-addon fs-16 text-gray-9">
                  <i className="isax isax-calendar-2"></i>
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Plan</label>
              <div className="dropdown" style={{ position: "relative" }}>
                <a
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </a>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <div className="mb-3">
                    <div className="input-icon-start position-relative">
                      <span className="input-icon-addon fs-12">
                        <i className="isax isax-search-normal"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <ul className="mb-3">
                    <li className="d-flex align-items-center justify-content-between mb-3">
                      <label className="d-inline-flex align-items-center text-gray-9">
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />{' '}
                        Select All
                      </label>
                      <a href="#" className="link-danger fw-medium text-decoration-underline" onClick={(e) => e.preventDefault()}>
                        Reset
                      </a>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Advanced
                        (Monthly)
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Basic
                        (Yearly)
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Enterprise
                        (Monthly)
                      </label>
                    </li>
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <a href="#" className="btn btn-outline-white w-100" id="close-filter1" onClick={(e) => e.preventDefault()}>
                        Cancel
                      </a>
                    </div>
                    <div className="col-6">
                      <a href="#" className="btn btn-primary w-100" onClick={(e) => e.preventDefault()}>
                        Select
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <div className="dropdown" style={{ position: "relative" }}>
                <a
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </a>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <ul className="mb-3">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-success me-1"></i>Active
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-danger me-1"></i>Inactive
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="offcanvas-footer">
              <div className="row g-2">
                <div className="col-6">
                  <a href="#" className="btn btn-outline-white w-100" onClick={(e) => e.preventDefault()}>
                    Reset
                  </a>
                </div>
                <div className="col-6">
                  <button
                    data-bs-dismiss="offcanvas"
                    className="btn btn-primary w-100"
                    id="filter-submit"
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
              <form onSubmit={handleSubmit}>
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
                          value={companyData.gstin}
                          onChange={handleInputChange}
                          placeholder="e.g., 29AAPFY0939E1ZV"
                        />
                        {errors.gstin && <div className="invalid-feedback d-block">{errors.gstin}</div>}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          PAN Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.pan ? 'is-invalid' : ''}`}
                          name="pan"
                          value={companyData.pan}
                          onChange={handleInputChange}
                          placeholder="e.g., AAPFY0939E"
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
                          value={companyData.phone}
                          onChange={handleInputChange}
                          placeholder="10-digit mobile number"
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
                        />
                        {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                      </div>
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

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Company</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <i className="isax isax-trash text-danger" style={{ fontSize: '48px' }}></i>
                <h6 className="mt-3">Are you sure you want to delete this company?</h6>
                <p className="text-muted">This action cannot be undone.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                <i className="isax isax-trash me-2"></i>Delete
              </button>
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
