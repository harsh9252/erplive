import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const Branches = () => {
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
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [selectedStateIso, setSelectedStateIso] = useState('');

  // Load branches from localStorage or use dummy data
  useEffect(() => {
    const loadBranches = () => {
      const stored = localStorage.getItem('branches');
      if (stored) {
        setBranches(JSON.parse(stored));
      } else {
        const dummyBranches = [
          { id: 1, name: 'Head Office', code: 'HO-001', city: 'Mumbai', state: 'Maharashtra', phone: '+91 9876543210', email: 'ho@company.com', isHeadOffice: true, status: 'Active' },
          { id: 2, name: 'Delhi Branch', code: 'BR-002', city: 'New Delhi', state: 'Delhi', phone: '+91 9876543211', email: 'delhi@company.com', isHeadOffice: false, status: 'Active' },
          { id: 3, name: 'Bangalore Branch', code: 'BR-003', city: 'Bangalore', state: 'Karnataka', phone: '+91 9876543212', email: 'bangalore@company.com', isHeadOffice: false, status: 'Active' },
          { id: 4, name: 'Chennai Branch', code: 'BR-004', city: 'Chennai', state: 'Tamil Nadu', phone: '+91 9876543213', email: 'chennai@company.com', isHeadOffice: false, status: 'Active' },
          { id: 5, name: 'Kolkata Branch', code: 'BR-005', city: 'Kolkata', state: 'West Bengal', phone: '+91 9876543214', email: 'kolkata@company.com', isHeadOffice: false, status: 'Inactive' },
          { id: 6, name: 'Hyderabad Branch', code: 'BR-006', city: 'Hyderabad', state: 'Telangana', phone: '+91 9876543215', email: 'hyderabad@company.com', isHeadOffice: false, status: 'Active' },
          { id: 7, name: 'Pune Branch', code: 'BR-007', city: 'Pune', state: 'Maharashtra', phone: '+91 9876543216', email: 'pune@company.com', isHeadOffice: false, status: 'Active' },
          { id: 8, name: 'Ahmedabad Branch', code: 'BR-008', city: 'Ahmedabad', state: 'Gujarat', phone: '+91 9876543217', email: 'ahmedabad@company.com', isHeadOffice: false, status: 'Inactive' },
        ];
        localStorage.setItem('branches', JSON.stringify(dummyBranches));
        setBranches(dummyBranches);
      }
    };
    loadBranches();
  }, []);

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

  // Validation functions
  const validateGSTIN = (gstin) => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'state') {
      // Find the selected state and get its ISO2 code and state code
      const selectedState = states.find(s => s.name === value);
      if (selectedState) {
        setSelectedStateIso(selectedState.iso2);
        setBranchData(prev => ({
          ...prev,
          state: value,
          state_code: selectedState.stateCode,
        }));
      }
    } else {
      setBranchData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
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

    if (!branchData.name.trim()) newErrors.name = 'Branch name is required';
    if (!branchData.code.trim()) newErrors.code = 'Branch code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (isEditMode) {
        // Update existing branch
        const updatedBranches = branches.map(branch =>
          branch.id === editingId
            ? {
                ...branch,
                name: branchData.name,
                code: branchData.code,
                city: branchData.city,
                state: branchData.state,
                phone: branchData.phone,
                email: branchData.email,
                isHeadOffice: branchData.is_head_office,
              }
            : branch
        );
        localStorage.setItem('branches', JSON.stringify(updatedBranches));
        setBranches(updatedBranches);
        
        toast.success('Branch updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        // Create new branch
        const newId = branches.length > 0 ? Math.max(...branches.map(b => b.id)) + 1 : 1;
        const newBranch = {
          id: newId,
          name: branchData.name,
          code: branchData.code,
          city: branchData.city,
          state: branchData.state,
          phone: branchData.phone,
          email: branchData.email,
          isHeadOffice: branchData.is_head_office,
          status: 'Active'
        };
        
        const updatedBranches = [...branches, newBranch];
        localStorage.setItem('branches', JSON.stringify(updatedBranches));
        setBranches(updatedBranches);
        
        toast.success('Branch created successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
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
      });
      
      setIsEditMode(false);
      setEditingId(null);

      const modalElement = document.getElementById('add_branch');
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    } catch (error) {
      console.error('Error saving branch:', error);
      toast.error('Error saving branch. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (branch) => {
    setBranchData({
      company_id: '',
      name: branch.name,
      code: branch.code,
      address: '',
      city: branch.city,
      state: branch.state,
      state_code: '',
      phone: branch.phone,
      email: branch.email,
      gstin: '',
      is_head_office: branch.isHeadOffice,
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

  const confirmAction = () => {
    if (confirmDialog.type === 'delete') {
      const updatedBranches = branches.filter(branch => branch.id !== confirmDialog.id);
      localStorage.setItem('branches', JSON.stringify(updatedBranches));
      setBranches(updatedBranches);
      toast.success('Branch deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else if (confirmDialog.type === 'status') {
      const updatedBranches = branches.map(branch =>
        branch.id === confirmDialog.id ? { ...branch, status: confirmDialog.newStatus } : branch
      );
      localStorage.setItem('branches', JSON.stringify(updatedBranches));
      setBranches(updatedBranches);
      toast.success(`Branch status updated to ${confirmDialog.newStatus}!`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const getStats = () => {
    const total = branches.length;
    const active = branches.filter(b => b.status === 'Active').length;
    const inactive = branches.filter(b => b.status === 'Inactive').length;
    const headOffice = branches.filter(b => b.isHeadOffice).length;
    return { total, active, inactive, headOffice };
  };

  const stats = getStats();

  return (
    <>
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
      
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Branches</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="dropdown">
            <Link
              href="#"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="#">
                  Download as PDF
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  Download as Excel
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link
              href="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_branch"
            >
              <i className="isax isax-add-circle5 me-1"></i>New Branch
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
                  <p className="mb-1">Total Branches</p>
                  <h6 className="fs-16 fw-semibold">{stats.total}</h6>
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
                    <i className="isax isax-tick-circle5 text-success fs-28"></i>
                  </span>
                </div>
                <div>
                  <p className="mb-1">Active Branches</p>
                  <h6 className="fs-16 fw-semibold">{stats.active}</h6>
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
                    <i className="isax isax-close-circle5 text-danger fs-28"></i>
                  </span>
                </div>
                <div>
                  <p className="mb-1">Inactive Branches</p>
                  <h6 className="fs-16 fw-semibold">{stats.inactive}</h6>
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

      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead className="thead-light">
            <tr>
              <th className="no-sort">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" id="select-all" />
                </div>
              </th>
              <th>Branch Name</th>
              <th>Branch Code</th>
              <th>City</th>
              <th>State</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Head Office</th>
              <th className="no-sort text-center">Status</th>
              <th className="no-sort text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id}>
                <td>
                  <div className="form-check form-check-md">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </td>
                <td>
                  <h6 className="fs-14 fw-medium mb-0">
                    <Link href="#">{branch.name}</Link>
                  </h6>
                </td>
                <td>{branch.code}</td>
                <td>{branch.city}</td>
                <td>{branch.state}</td>
                <td>{branch.phone}</td>
                <td>{branch.email}</td>
                <td>
                  {branch.isHeadOffice ? (
                    <span className="badge badge-soft-success">
                      <i className="isax isax-tick-circle me-1"></i>Yes
                    </span>
                  ) : (
                    <span className="badge badge-soft-secondary">
                      <i className="isax isax-close-circle me-1"></i>No
                    </span>
                  )}
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      className={`btn ${branch.status === 'Active' ? 'btn-soft-success' : 'btn-soft-danger'} btn-sm dropdown-toggle d-inline-flex align-items-center`}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {branch.status}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a 
                          className="dropdown-item" 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (branch.status !== 'Active') {
                              handleStatusChange(branch.id, 'Active');
                            }
                          }}
                        >
                          Active
                        </a>
                      </li>
                      <li>
                        <a 
                          className="dropdown-item" 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (branch.status !== 'Inactive') {
                              handleStatusChange(branch.id, 'Inactive');
                            }
                          }}
                        >
                          Inactive
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
                <td className="text-center">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <button 
                      className="btn btn-icon btn-soft-primary btn-sm" 
                      title="Edit"
                      onClick={() => handleEdit(branch)}
                    >
                      <i className="isax isax-edit-25"></i>
                    </button>
                    <a 
                      href="#" 
                      className="btn btn-icon btn-soft-danger btn-sm" 
                      title="Delete"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(branch.id);
                      }}
                    >
                      <i className="isax isax-trash"></i>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Branch Modal */}
      <div className="modal fade" id="add_branch">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title">{isEditMode ? 'Edit Branch' : 'Add Branch'}</h5>
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
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={branchData.address}
                      onChange={handleInputChange}
                      placeholder="Enter branch address"
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <select
                      className="form-select"
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
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">State</label>
                    <select
                      className="form-select"
                      name="state"
                      value={branchData.state}
                      onChange={handleInputChange}
                      disabled={loadingStates}
                    >
                      <option value="">
                        {loadingStates ? 'Loading states...' : 'Select state'}
                      </option>
                      {states.map((state) => (
                        <option key={state.iso2 || state.name} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={branchData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={branchData.email}
                      onChange={handleInputChange}
                      placeholder="branch@example.com"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Branch GSTIN</label>
                    <input
                      type="text"
                      className="form-control"
                      name="gstin"
                      value={branchData.gstin}
                      onChange={handleInputChange}
                      placeholder="e.g., 22AAAAA0000A1Z5"
                    />
                    <small className="text-muted">Optional</small>
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
