import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import branchService from '../services/branchService';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

import { useAuth } from '../components/AuthContext';

const Branches = () => {
  const { activeCompany } = useAuth();
  const [branches, setBranches] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null, type: 'delete', newStatus: null });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [branchData, setBranchData] = useState({
    company_id: '',
    name: '',
    code: '',
    address: '',
    city: '',
    state: '',
    state_code: '',
    phone: '',
    email: '',
    gstin: '',
    is_head_office: false,
    pincode: '',
  });

  const [branchesLoading, setBranchesLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [selectedStateIso, setSelectedStateIso] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch branches from API
  const fetchBranches = async () => {
    try {
      setBranchesLoading(true);
      const response = await branchService.getBranches();
      setBranches(response.data || []);
    } catch (error) {
      console.error('Error fetching branches:', error);
      toast.error('Failed to load branches');
    } finally {
      setBranchesLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

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

  const stateNameMap = Object.fromEntries(
    Object.entries(stateCodeMap).map(([name, code]) => [code, name])
  );

  // Fetch states from API when component mounts
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);
        const response = await fetch(
          'https://api.countrystatecity.in/v1/countries/IN/states',
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
  }, []);

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

  // Effect to sync selected state ISO for city fetching, especially during edit
  useEffect(() => {
    if (branchData.state && states.length > 0) {
      const state = states.find(s => s.stateCode === branchData.state);
      if (state && state.iso2 !== selectedStateIso) {
        setSelectedStateIso(state.iso2);
      }
    } else if (!branchData.state && selectedStateIso !== '') {
      setSelectedStateIso('');
    }
  }, [branchData.state, states]);

  // Validation functions
  const validateGSTIN = (gstin) => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePincode = (pincode) => {
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(pincode);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = type === 'checkbox' ? checked : value;

    if (name === 'phone' || name === 'pincode') {
      finalValue = value.replace(/\D/g, '');
    }

    if (name === 'email') {
      finalValue = value.replace(/[^a-zA-Z0-9@.]/g, '');
    }

    if (name === 'state') {
      // Find the selected state by its state code
      const selectedState = states.find(s => s.stateCode === value);
      if (selectedState) {
        setBranchData(prev => ({
          ...prev,
          state: selectedState.stateCode,
          state_code: selectedState.stateCode,
          city: '' // Reset city when state changes
        }));
      } else {
        setBranchData(prev => ({
          ...prev,
          state: '',
          state_code: '',
          city: ''
        }));
      }
    } else {
      setBranchData(prev => ({
        ...prev,
        [name]: finalValue
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!branchData.name?.trim()) newErrors.name = 'Branch name is required';
    if (!branchData.code?.trim()) {
      newErrors.code = 'Branch code is required';
    } else {
      const isDuplicateCode = branches.some(
        (b) => 
          (b.branch_code?.toLowerCase() === branchData.code.trim().toLowerCase() || b.code?.toLowerCase() === branchData.code.trim().toLowerCase()) && 
          b.id !== editingId
      );
      if (isDuplicateCode) {
        newErrors.code = 'Branch code must be unique';
      }
    }
    if (!branchData.address?.trim()) newErrors.address = 'Address is required';
    if (!branchData.city) newErrors.city = 'City is required';
    if (!branchData.state) newErrors.state = 'State is required';
    
    if (!branchData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(branchData.phone)) {
      newErrors.phone = 'Phone number must be a valid 10-digit mobile number starting with 6, 7, 8, or 9';
    }

    if (!branchData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(branchData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!branchData.pincode?.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!validatePincode(branchData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    if (branchData.gstin && branchData.gstin.trim()) {
      if (!validateGSTIN(branchData.gstin)) {
        newErrors.gstin = 'Invalid GSTIN format (e.g., 22AAAAA0000A1Z5)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!activeCompany) {
      toast.error('Please create or select a company first');
      return;
    }

    setLoading(true);

    try {
      if (isEditMode) {
        await branchService.updateBranch(editingId, branchData);
        toast.success('Branch updated successfully!');
      } else {
        await branchService.createBranch(branchData);
        toast.success('Branch created successfully!');
      }

      setBranchData({
        company_id: '',
        name: '',
        code: '',
        address: '',
        city: '',
        state: '',
        state_code: '',
        phone: '',
        email: '',
        gstin: '',
        is_head_office: false,
        pincode: '',
      });

      setIsEditMode(false);
      setEditingId(null);
      fetchBranches();
      window.dispatchEvent(new Event('BRANCHES_MODIFIED'));

      const modalElement = document.getElementById('add_branch');
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    } catch (error) {
      console.error('Error saving branch:', error);
      toast.error(error.message || 'Error saving branch. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (branch) => {
    setBranchData({
      company_id: branch.company_id || '',
      name: branch.name,
      code: branch.branch_code || branch.code,
      address: branch.address || '',
      city: branch.city,
      state: branch.state_code || branch.state,
      state_code: branch.state_code || '',
      phone: branch.phone,
      email: branch.email,
      gstin: branch.gstin || '',
      is_head_office: branch.is_head_office || branch.isHeadOffice,
      pincode: branch.pincode || '',
    });
    setIsEditMode(true);
    setEditingId(branch.id);

    // Open modal
    const modalElement = document.getElementById('add_branch');
    const modal = new window.bootstrap.Modal(modalElement);
    modal.show();
  };

  const handleModalClose = () => {
    setBranchData({
      company_id: '',
      name: '',
      code: '',
      address: '',
      city: '',
      state: '',
      state_code: '',
      phone: '',
      email: '',
      gstin: '',
      is_head_office: false,
      pincode: '',
    });
    setIsEditMode(false);
    setEditingId(null);
    setErrors({});
  };

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id, type: 'delete', newStatus: null });
  };

  const handleStatusChange = (id, newStatus) => {
    setConfirmDialog({ isOpen: true, id, type: 'status', newStatus });
  };

  const confirmAction = async () => {
    try {
      if (confirmDialog.type === 'delete') {
        await branchService.deleteBranch(confirmDialog.id);
        toast.success('Branch deleted successfully!');
        fetchBranches();
        window.dispatchEvent(new Event('BRANCHES_MODIFIED'));
      } else if (confirmDialog.type === 'status') {
        await branchService.updateBranch(confirmDialog.id, {
          is_active: confirmDialog.newStatus === 'Active'
        });
        toast.success(`Branch status updated to ${confirmDialog.newStatus}!`);
        fetchBranches();
        window.dispatchEvent(new Event('BRANCHES_MODIFIED'));
      }
    } catch (error) {
      console.error('Error in confirm action:', error);
      toast.error(error.message || 'Action failed. Please try again.');
    } finally {
      setConfirmDialog({ isOpen: false, id: null, type: 'delete', newStatus: null });
    }
  };

  const filteredBranches = branches.filter(branch => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (branch.name || '').toLowerCase().includes(searchLower) ||
      (branch.branch_code || branch.code || '').toLowerCase().includes(searchLower) ||
      (branch.city || '').toLowerCase().includes(searchLower) ||
      (branch.state || '').toLowerCase().includes(searchLower) ||
      (branch.email || '').toLowerCase().includes(searchLower) ||
      (branch.phone || '').toLowerCase().includes(searchLower)
    );
  });

  const exportToPDF = () => {
    try {
      const doc = new jsPDF('landscape');
      
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      doc.text("Branches / Units Report", 14, 15);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);
      
      if (searchTerm) {
        doc.text(`Filter applied: "${searchTerm}"`, 14, 28);
      }

      const tableColumn = [
        "Branch Name", "Branch Code", "GSTIN", "City", "State", "Phone", "Email", "Head Office", "Status"
      ];
      const tableRows = [];

      filteredBranches.forEach(branch => {
        const branchData = [
          branch.name || '-',
          branch.branch_code || branch.code || '-',
          branch.gstin || '-',
          branch.city || '-',
          branch.state_code ? `${branch.state_code}-${stateNameMap[branch.state_code] || branch.state}` : (branch.state || '-'),
          branch.phone || '-',
          branch.email || '-',
          branch.is_head_office ? 'Yes' : 'No',
          branch.is_active === false ? 'Inactive' : 'Active'
        ];
        tableRows.push(branchData);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: searchTerm ? 34 : 28,
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [63, 81, 181], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 247, 250] },
      });
      doc.save("branches_report.pdf");
      toast.success("PDF exported successfully");
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.error("Failed to export PDF");
    }
  };

  const exportToExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(filteredBranches.map(branch => ({
        "Branch Name": branch.name || '-',
        "Branch Code": branch.branch_code || branch.code || '-',
        "GSTIN": branch.gstin || '-',
        "Address": branch.address || '-',
        "City": branch.city || '-',
        "State": branch.state_code ? `${branch.state_code}-${stateNameMap[branch.state_code] || branch.state}` : (branch.state || '-'),
        "Pincode": branch.pincode || '-',
        "Phone": branch.phone || '-',
        "Email": branch.email || '-',
        "Head Office": branch.is_head_office ? 'Yes' : 'No',
        "Status": branch.is_active === false ? 'Inactive' : 'Active'
      })));
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Branches");
      XLSX.writeFile(workbook, "branches_report.xlsx");
      toast.success("Excel exported successfully");
    } catch (error) {
      console.error("Excel Export Error:", error);
      toast.error("Failed to export Excel");
    }
  };

  const getStats = () => {
    const total = branches.length;
    const active = branches.filter(b => b.is_active !== false).length;
    const inactive = branches.filter(b => b.is_active === false).length;
    const headOffice = branches.filter(b => b.is_head_office).length;
    return { total, active, inactive, headOffice };
  };

  const stats = getStats();

  if (!activeCompany) {
    return (
      <div className="content container-fluid pb-5">
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
          <div className="text-center">
            <div className="avatar avatar-xxl bg-soft-primary text-primary rounded-circle mb-4 mx-auto d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
              <i className="isax isax-building fs-40"></i>
            </div>
            <h3 className="fw-bold mb-2">No Active Company</h3>
            <p className="text-muted mb-4">Please create and select a company to manage branches.</p>
            <Link to="/add-company" className="btn btn-primary px-4 py-2 rounded-3">
              <i className="isax isax-add-circle5 me-2"></i>Create Company
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid p-0">
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog({ isOpen: false, id: null, type: 'delete', newStatus: null })}
          onConfirm={confirmAction}
          title={confirmDialog.type === 'delete' ? 'Delete Branch' : 'Update Status'}
          message={
            confirmDialog.type === 'delete'
              ? 'Are you sure you want to delete this branch? This action cannot be undone.'
              : `Are you sure you want to change the status to ${confirmDialog.newStatus}?`
          }
          confirmText={confirmDialog.type === 'delete' ? 'Yes, Delete' : 'Yes, Update'}
          cancelText="Cancel"
          type={confirmDialog.type === 'delete' ? 'danger' : 'warning'}
        />

        {/* Header section with Breadcrumbs */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
          <div>
            <h4 className="fw-bold mb-1">Branches / Units</h4>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-divide mb-0">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-muted"><i className="isax isax-home-2 me-1"></i>Home</Link>
                </li>

                <li className="breadcrumb-item active text-primary">Branches / Units</li>
              </ol>
            </nav>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                          <i className="isax isax-document-download me-2"></i>PDF
                        </button>
                        <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                          <i className="isax isax-export-1 me-2"></i>Excel
                        </button>
            <Link
              href="#"
              className="btn btn-primary d-flex align-items-center shadow-sm px-4 rounded-pill transition-all"
              data-bs-toggle="modal"
              data-bs-target="#add_branch"
            >
              <i className="isax isax-add-circle me-2 fs-18"></i>New Unit / Branch
            </Link>

          </div>
        </div>

        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="card position-relative">
              <div className="card-body">
                <div className="d-flex align-items-center pb-0">
                  <div className="me-2">
                    <span className="avatar avatar-lg bg-soft-info">
                      <i className="isax isax-buildings-25 text-info fs-28"></i>
                    </span>
                  </div>
                  <div>
                    <p className="mb-1">Total Branches</p>
                    <h6 className="fs-16 fw-semibold">{stats.total}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="card position-relative">
              <div className="card-body">
                <div className="d-flex align-items-center pb-0">
                  <div className="me-2">
                    <span className="avatar avatar-lg bg-primary-subtle">
                      <i className="isax isax-building5 text-primary fs-28"></i>
                    </span>
                  </div>
                  <div>
                    <p className="mb-1">Head Office</p>
                    <h6 className="fs-16 fw-semibold">{stats.headOffice}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4 mt-4">
          <div className="card-header bg-white py-3 border-0">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <h6 className="mb-0 fw-bold">Branch Locations</h6>
              <div className="input-group" style={{ maxWidth: '300px' }}>
                <span className="input-group-text bg-light border-0"><i className="isax isax-search-normal text-muted fs-14"></i></span>
                <input
                  type="text"
                  className="form-control bg-light border-0 shadow-none ps-0"
                  placeholder="Search branches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-muted fs-11 text-uppercase tracking-wider">
                  <tr>
                    <th className="ps-4">Branch Name</th>
                    <th>Branch Code</th>
                    <th>GSTIN</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Head Office</th>
                    <th className="text-end pe-4">Action</th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  {branchesLoading ? (
                    <tr>
                      <td colSpan="9" className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                      </td>
                    </tr>
                  ) : filteredBranches.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-5 text-muted">No branches found matching your search.</td>
                    </tr>
                  ) : (
                    filteredBranches.map((branch) => (
                      <tr key={branch.id}>
                        <td className="ps-4">
                          <h6 className="fs-14 fw-medium mb-0">
                            <Link to="#" onClick={(e) => { e.preventDefault(); handleEdit(branch); }}>{branch.name}</Link>
                          </h6>
                        </td>
                        <td>{branch.branch_code || branch.code}</td>
                        <td>{branch.gstin || '-'}</td>
                        <td>{branch.city || '-'}</td>
                        <td>{branch.state_code ? `${branch.state_code}-${stateNameMap[branch.state_code] || branch.state}` : (branch.state || '-')}</td>
                        <td>{branch.phone || '-'}</td>
                        <td>{branch.email || '-'}</td>
                        <td>
                          {branch.is_head_office ? (
                            <span className="badge badge-soft-success">
                              <i className="isax isax-tick-circle me-1"></i>Yes
                            </span>
                          ) : (
                            <span className="badge badge-soft-secondary">
                              <i className="isax isax-close-circle me-1"></i>No
                            </span>
                          )}
                        </td>
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end align-items-center gap-2">
                            <button
                              className="btn btn-sm btn-soft-warning border-0"
                              title="Edit"
                              onClick={() => handleEdit(branch)}
                            >
                              <i className="isax isax-edit-2 fs-16"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-soft-danger border-0"
                              title="Delete"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(branch.id);
                              }}
                            >
                              <i className="isax isax-trash fs-16"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Branch Modal */}
      <div className="modal fade" id="add_branch">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title">{isEditMode ? 'Edit Unit / Branch' : 'Add Unit / Branch'}</h5>
              <button
                type="button"
                className="btn btn-light d-flex align-items-center justify-content-center ms-auto"
                data-bs-dismiss="modal"
                style={{ width: '32px', height: '32px', padding: '0', border: 'none' }}
                onClick={handleModalClose}
              >
                <span className="d-inline-flex align-items-center justify-content-center bg-danger text-white rounded-circle" style={{ width: '24px', height: '24px', fontSize: '14px' }}>
                  ✕
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Branch Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={branchData.name}
                      onChange={handleInputChange}
                      placeholder="Enter branch name"
                    />
                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Branch Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                      name="code"
                      value={branchData.code}
                      onChange={handleInputChange}
                      placeholder="e.g., BR-001"
                    />
                    {errors.code && <div className="invalid-feedback d-block">{errors.code}</div>}
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Address <span className="text-danger">*</span></label>
                    <textarea
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      name="address"
                      value={branchData.address}
                      onChange={handleInputChange}
                      placeholder="Enter branch address"
                      rows="3"
                    ></textarea>
                    {errors.address && <div className="invalid-feedback d-block">{errors.address}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">City <span className="text-danger">*</span></label>
                    <select
                      className={`form-select ${errors.city ? 'is-invalid' : ''}`}
                      name="city"
                      value={branchData.city}
                      onChange={handleInputChange}
                      disabled={loadingCities || !branchData.state}
                    >
                      <option value="">
                        {loadingCities ? 'Loading cities...' : 'Select city'}
                      </option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {errors.city && <div className="invalid-feedback d-block">{errors.city}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">State <span className="text-danger">*</span></label>
                    <select
                      className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                      name="state"
                      value={branchData.state}
                      onChange={handleInputChange}
                      disabled={loadingStates}
                    >
                      <option value="">
                        {loadingStates ? 'Loading states...' : 'Select state'}
                      </option>
                      {states.map((state) => (
                        <option key={state.iso2 || state.name} value={state.stateCode}>
                          {state.stateCode}-{state.name}
                        </option>
                      ))}
                    </select>
                    {errors.state && <div className="invalid-feedback d-block">{errors.state}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      name="phone"
                      value={branchData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email <span className="text-danger">*</span></label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={branchData.email}
                      onChange={handleInputChange}
                      placeholder="branch@example.com"
                    />
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pincode <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                      name="pincode"
                      value={branchData.pincode}
                      onChange={handleInputChange}
                      placeholder="Enter pincode"
                    />
                    {errors.pincode && <div className="invalid-feedback d-block">{errors.pincode}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Branch GSTIN</label>
                    <input
                      type="text"
                      className={`form-control ${errors.gstin ? 'is-invalid' : ''}`}
                      name="gstin"
                      value={branchData.gstin}
                      onChange={handleInputChange}
                      placeholder="e.g., 22AAAAA0000A1Z5"
                    />
                    {errors.gstin ? (
                      <div className="invalid-feedback d-block">{errors.gstin}</div>
                    ) : (
                      <small className="text-muted">Optional</small>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="form-check mt-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="is_head_office"
                        checked={branchData.is_head_office}
                        onChange={handleInputChange}
                        id="is_head_office"
                      />
                      <label className="form-check-label" htmlFor="is_head_office">
                        Mark as Head Office
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
                onClick={handleModalClose}
              >
                <span className="d-inline-flex align-items-center justify-content-center bg-danger text-white rounded-circle me-2" style={{ width: '20px', height: '20px', fontSize: '12px' }}>
                  ✕
                </span>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditMode ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className="isax isax-save me-2"></i>
                    {isEditMode ? 'Update Branch' : 'Create Branch'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Branches;
