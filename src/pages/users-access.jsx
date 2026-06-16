import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import userService from '../services/userService';
import companyService from '../services/companyService';
import { toNumberOrValue } from '../services/apiUtils';
import { useAuth } from '../components/AuthContext';

const UsersAccess = () => {
    const { activeCompany } = useAuth();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Modal states
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showAccessModal, setShowAccessModal] = useState(false);
    const [companies, setCompanies] = useState([]);
    // Bug 4.4 fix: add user search filter
    const [userSearch, setUserSearch] = useState('');
    // Bug 4.6 fix: separate isSaving flags per modal
    const [isSavingCreate, setIsSavingCreate] = useState(false);
    const [isSavingEdit, setIsSavingEdit] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [isSavingAccess, setIsSavingAccess] = useState(false);
    const [accessFormData, setAccessFormData] = useState({
        company_id: '',
        role_id: ''
    });

    const [createFormData, setCreateFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role_ids: []
    });

    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role_ids: []
    });

    const [passwordData, setPasswordData] = useState({
        new_password: ''
    });

    const [errors, setErrors] = useState({});


    const [showCreatePassword, setShowCreatePassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    useEffect(() => {
        if (activeCompany) {
            fetchUsers();
            fetchRoles();
        }
        fetchCompanies();
    }, [activeCompany?.id]);

    const fetchCompanies = async () => {
        try {
            const response = await companyService.getCompanies();
            setCompanies(response.data || []);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const fetchUsers = async () => {
        if (!activeCompany) return;
        try {
            setLoading(true);
            const response = await userService.getUsers();
            setUsers(response.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        if (!activeCompany) return;
        try {
            const response = await userService.getRoles();
            setRoles(response.data || []);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleCreateInputChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;
        if (name === 'phone') {
            sanitizedValue = value.replace(/\D/g, ''); // Only digits
        } else if (name === 'email') {
            sanitizedValue = value.replace(/[^a-zA-Z0-9@._-]/g, ''); // No special chars
        }
        setCreateFormData(prev => ({ ...prev, [name]: sanitizedValue }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSavingCreate(true);
            const payload = { ...createFormData, role_ids: createFormData.role_ids.map(id => Number(id)) };
            let newErrors = {};

            if (!payload.name?.trim()) newErrors.name = 'Full Name is required';
            if (!payload.email?.trim()) newErrors.email = 'Email Address is required';
            if (!payload.password?.trim()) newErrors.password = 'Password is required';
            if (payload.role_ids.length === 0) newErrors.role_ids = 'At least one role must be assigned';

            if (!payload.phone || payload.phone.trim() === '') {
                delete payload.phone;
            } else {
                const phoneRegex = /^[6-9]\d{9}$/;
                if (!phoneRegex.test(payload.phone.trim())) {
                    newErrors.phone = 'Phone number must be a valid 10-digit mobile number starting with 6, 7, 8, or 9';
                }
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                setIsSavingCreate(false);
                return;
            }

            await userService.createUser(payload);
            toast.success('User created successfully');
            setShowAddModal(false);
            setCreateFormData({ name: '', email: '', password: '', phone: '', role_ids: [] });
            fetchUsers();
        } catch (error) {
            let errorMsg = error.message || 'Failed to create user';
            let handled = false;
            let newErrors = {};

            if (errorMsg.toLowerCase().includes('"name"') || errorMsg.toLowerCase().includes('name length')) {
                newErrors.name = errorMsg.replace(/"name"/gi, 'Full Name');
                handled = true;
            } else if (errorMsg.toLowerCase().includes('"email"') || errorMsg.toLowerCase().includes('email')) {
                newErrors.email = errorMsg.replace(/"email"/gi, 'Email Address');
                handled = true;
            } else if (errorMsg.toLowerCase().includes('"phone"') || errorMsg.toLowerCase().includes('phone')) {
                newErrors.phone = errorMsg.replace(/"phone"/gi, 'Phone Number');
                handled = true;
            } else if (errorMsg.toLowerCase().includes('"password"') || errorMsg.toLowerCase().includes('password')) {
                newErrors.password = errorMsg.replace(/"password"/gi, 'Password');
                handled = true;
            }

            if (handled) {
                setErrors(prev => ({ ...prev, ...newErrors }));
            } else {
                toast.error(errorMsg);
            }
        } finally {
            setIsSavingCreate(false);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        // De-duplicate resolved roles to avoid duplicate IDs in active selections
        const resolvedRoleIds = Array.from(new Set((user.roles || []).map(userRole => {
            const currentId = userRole.id || userRole;
            // Find the corresponding role in the master roles list
            const roleMatch = roles.find(r => 
                String(r.id) === String(currentId) || 
                String(r.slug) === String(currentId) || 
                String(r.name) === String(currentId)
            );
            // Always prefer the master role ID (usually numeric) over slugs
            return roleMatch ? roleMatch.id : currentId;
        })));

        setEditFormData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            role_ids: resolvedRoleIds.map(id => String(id))
        });
        setErrors({});
        setShowEditModal(true);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;
        if (name === 'phone') {
            sanitizedValue = value.replace(/\D/g, '');
        } else if (name === 'email') {
            sanitizedValue = value.replace(/[^a-zA-Z0-9@._-]/g, '');
        }
        setEditFormData(prev => ({ ...prev, [name]: sanitizedValue }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSavingEdit(true);
            const payload = { name: editFormData.name, phone: editFormData.phone };
            let newErrors = {};

            if (!payload.name?.trim()) newErrors.name = 'Full Name is required';
            if (editFormData.role_ids.length === 0) newErrors.role_ids = 'At least one role must be assigned';

            if (!payload.phone || payload.phone.trim() === '') {
                delete payload.phone;
            } else {
                const phoneRegex = /^[6-9]\d{9}$/;
                if (!phoneRegex.test(payload.phone.trim())) {
                    newErrors.phone = 'Phone number must be a valid 10-digit mobile number starting with 6, 7, 8, or 9';
                }
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                setIsSavingEdit(false);
                return;
            }

            await userService.updateUser(selectedUser.id, payload);
            
            // Only send valid numeric role IDs that belong to the current company.
            // Special roles (like super_admin) or roles from other companies are preserved silently by the backend.
            const validRoleIds = editFormData.role_ids
                .filter(id => id && !isNaN(Number(id)) && roles.some(r => String(r.id) === String(id)))
                .map(id => Number(id));
                
            await userService.assignRoles(selectedUser.id, validRoleIds);
            
            toast.success('User updated successfully');
            setShowEditModal(false);
            fetchUsers();
        } catch (error) {
            let errorMsg = error.message || 'Failed to update user';
            let handled = false;
            let newErrors = {};

            if (errorMsg.toLowerCase().includes('"name"') || errorMsg.toLowerCase().includes('name length')) {
                newErrors.name = errorMsg.replace(/"name"/gi, 'Full Name');
                handled = true;
            } else if (errorMsg.toLowerCase().includes('"email"') || errorMsg.toLowerCase().includes('email')) {
                newErrors.email = errorMsg.replace(/"email"/gi, 'Email Address');
                handled = true;
            } else if (errorMsg.toLowerCase().includes('"phone"') || errorMsg.toLowerCase().includes('phone')) {
                newErrors.phone = errorMsg.replace(/"phone"/gi, 'Phone Number');
                handled = true;
            }

            if (handled) {
                setErrors(prev => ({ ...prev, ...newErrors }));
            } else {
                toast.error(errorMsg);
            }
        } finally {
            setIsSavingEdit(false);
        }
    };

    // Bug 4.2 fix: confirm before toggling user status
    const handleToggleStatus = async (user) => {
        const action = user.status === 'ACTIVE' ? 'deactivate' : 'activate';
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to ${action} user "${user.name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${action} it!`
        });
        
        if (!result.isConfirmed) return;
        
        try {
            await userService.toggleStatus(user.id);
            toast.success(`User ${user.status === 'ACTIVE' ? 'deactivated' : 'activated'} successfully`);
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleGrantAccess = async (e) => {
        e.preventDefault();
        try {
            setIsSavingAccess(true);
            const selectedRole = roles.find(r => String(r.id) === String(accessFormData.role_id));
            // Reverted Bug 4.5: The backend API /api/users/grant-company-access explicitly requires 'email' as a string, not an ID
            await userService.grantCompanyAccess(
                selectedUser.email,
                accessFormData.company_id, 
                selectedRole?.slug || selectedRole?.name || accessFormData.role_id
            );
            toast.success('Access granted successfully');
            setShowAccessModal(false);
            setAccessFormData({ company_id: '', role_id: '' });
        } catch (error) {
            toast.error(error.message || 'Failed to grant access');
        } finally {
            setIsSavingAccess(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            setIsSavingPassword(true);
            await userService.resetPassword(selectedUser.id, passwordData.new_password);
            toast.success('Password reset successfully');
            setShowPasswordModal(false);
            setPasswordData({ new_password: '' });
        } catch (error) {
            toast.error(error.message || 'Failed to reset password');
        } finally {
            setIsSavingPassword(false);
        }
    };

    const handleRoleChange = (e, formType) => {
        const value = toNumberOrValue(e.target.value);
        const data = formType === 'create' ? createFormData : editFormData;
        const setter = formType === 'create' ? setCreateFormData : setEditFormData;
        
        const isIncluded = data.role_ids.some(id => String(id) === String(value));
        const newRoles = isIncluded
            ? data.role_ids.filter(id => String(id) !== String(value))
            : [...data.role_ids, value];
            
        setter({ ...data, role_ids: newRoles });
        if (errors.role_ids && newRoles.length > 0) {
            setErrors(prev => ({ ...prev, role_ids: '' }));
        }
    };

    if (!activeCompany) {
        return (
            <div className="content container-fluid pb-5">
                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
                    <div className="text-center">
                        <div className="avatar avatar-xxl bg-soft-primary text-primary rounded-circle mb-4 mx-auto d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                            <i className="isax isax-building fs-40"></i>
                        </div>
                        <h3 className="fw-bold mb-2">No Active Company</h3>
                        <p className="text-muted mb-4">Please create and select a company to manage users.</p>
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
            <style>
                {`
                    .table-responsive {
                        overflow: visible !important;
                    }
                    @media (max-width: 991.98px) {
                        .table-responsive {
                            overflow-x: auto !important;
                        }
                    }
                `}
            </style>
            <div className="page-header">
                <div className="add-item d-flex">
                    <div className="page-title">
                        <h4>Users &amp; Access</h4>
                        <h6>Manage system users and their permissions</h6>
                    </div>
                </div>
                <div className="page-btn d-flex align-items-center gap-2">
                    {/* Bug 4.4 fix: search filter for users */}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search users..."
                        style={{ width: '200px' }}
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                    />
                    <button className="btn btn-primary d-flex align-items-center" onClick={() => { setShowAddModal(true); setErrors({}); }}>
                        <i className="isax isax-add-circle me-2"></i>Add User
                    </button>
                </div>
            </div>

            <div className="card table-list-card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table datanew">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Phone</th>
                                    <th>Role(s)</th>
                                    <th>Status</th>
                                    <th className="no-sort text-end pe-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : users
                                    .filter(u =>
                                        !userSearch ||
                                        u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
                                        u.email?.toLowerCase().includes(userSearch.toLowerCase())
                                    )
                                    .map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="avatar avatar-sm rounded-circle me-2 bg-soft-primary text-primary d-flex align-items-center justify-content-center fw-bold">
                                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <h6 className="fs-14 fw-medium mb-0">{user.name}</h6>
                                                    <span className="fs-12 text-muted">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.phone || 'N/A'}</td>
                                        <td>
                                            <div className="d-flex flex-wrap gap-1">
                                                {user.roles && user.roles.length > 0 ? (
                                                    (() => {
                                                        const seen = new Set();
                                                        return user.roles.filter(r => {
                                                            if (!r || !r.name) return false;
                                                            const key = r.name.trim().toLowerCase();
                                                            if (seen.has(key)) return false;
                                                            seen.add(key);
                                                            return true;
                                                        }).map(r => (
                                                            <span key={r.id} className="badge badge-soft-info">{r.name}</span>
                                                        ));
                                                    })()
                                                ) : (
                                                    <span className="text-muted">No roles assigned</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge ${user.status === 'ACTIVE' ? 'badge-soft-success' : 'badge-soft-danger'} d-inline-flex align-items-center`}>
                                                <i className={`isax ${user.status === 'ACTIVE' ? 'isax-tick-circle' : 'isax-close-circle'} me-1`}></i>
                                                {user.status}
                                            </span>
                                        </td>
                                         <td className="action-table-data text-end pe-4">
                                            <div className="d-flex justify-content-end align-items-center gap-2">
                                                <button 
                                                    className="btn btn-sm btn-soft-warning border-0" 
                                                    onClick={() => handleEditClick(user)}
                                                    title="Edit Profile"
                                                >
                                                    <i className="isax isax-edit fs-16"></i>
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-soft-info border-0" 
                                                    onClick={() => { setSelectedUser(user); setShowPasswordModal(true); }}
                                                    title="Reset Password"
                                                >
                                                    <i className="isax isax-key fs-16"></i>
                                                </button>
                                                <button 
                                                    className={`btn btn-sm ${user.status === 'ACTIVE' ? 'btn-soft-secondary' : 'btn-soft-success'} border-0`} 
                                                    onClick={() => handleToggleStatus(user)}
                                                    title={user.status === 'ACTIVE' ? 'Deactivate User' : 'Activate User'}
                                                >
                                                    <i className={`isax ${user.status === 'ACTIVE' ? 'isax-user-remove' : 'isax-user-tick'} fs-16`}></i>
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-soft-primary border-0" 
                                                    onClick={() => { setSelectedUser(user); setShowAccessModal(true); }}
                                                    title="Grant Company Access"
                                                >
                                                    <i className="isax isax-hierarchy fs-16"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-bottom">
                                <h5 className="modal-title">Add New User</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <form onSubmit={handleCreateSubmit} autoComplete="off" noValidate>
                                <div className="modal-body p-4">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Full Name <span className="text-danger">*</span></label>
                                                <input type="text" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Enter Full Name" value={createFormData.name} onChange={handleCreateInputChange} autoComplete="one-time-code" maxLength="100" />
                                                {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Email Address <span className="text-danger">*</span></label>
                                                <input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="user@company.com" value={createFormData.email} onChange={handleCreateInputChange} autoComplete="one-time-code" maxLength="100" />
                                                {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Password <span className="text-danger">*</span></label>
                                                <div className="pass-group input-group">
                                                    <input 
                                                        type={showCreatePassword ? "text" : "password"} 
                                                        name="password"
                                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                                        placeholder="Min 8 characters" 
                                                        minLength="8" 
                                                        value={createFormData.password} 
                                                        onChange={(e) => {
                                                            setCreateFormData({...createFormData, password: e.target.value});
                                                            if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                                                        }} 
                                                        autoComplete="new-password" 
                                                    />
                                                    <span 
                                                        className={`isax toggle-password ${showCreatePassword ? 'isax-eye' : 'isax-eye-slash'}`} 
                                                        onClick={() => setShowCreatePassword(!showCreatePassword)} 
                                                        style={{ cursor: 'pointer' }}
                                                    ></span>
                                                </div>
                                                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Phone Number</label>
                                                <input type="text" name="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} placeholder="e.g. 9876543210" value={createFormData.phone} onChange={handleCreateInputChange} autoComplete="one-time-code" maxLength={10} />
                                                {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-dark fw-medium">Assign Role(s) <span className="text-danger">*</span></label>
                                            <div className={`d-flex flex-wrap gap-2 border rounded p-3 bg-light ${errors.role_ids ? 'border-danger' : ''}`}>
                                                {roles.map(role => (
                                                    <div key={role.id} className="form-check me-3">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            id={`role_${role.id}`} 
                                                            value={role.id}
                                                            checked={createFormData.role_ids.some(id => String(id) === String(role.id))}
                                                            onChange={(e) => handleRoleChange(e, 'create')}
                                                        />
                                                        <label className="form-check-label" htmlFor={`role_${role.id}`}>
                                                            {role.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                            {errors.role_ids && <div className="invalid-feedback d-block">{errors.role_ids}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-top">
                                    <button type="button" className="btn btn-cancel me-2" onClick={() => setShowAddModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={isSavingCreate || createFormData.role_ids.length === 0}>
                                        {isSavingCreate ? 'Creating...' : 'Create User'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-bottom">
                                <h5 className="modal-title">Edit User Profile</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <form onSubmit={handleEditSubmit} autoComplete="off" noValidate>
                                <div className="modal-body p-4">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Full Name <span className="text-danger">*</span></label>
                                                <input type="text" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Enter Full Name" value={editFormData.name} onChange={handleEditInputChange} autoComplete="one-time-code" maxLength="100" />
                                                {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Email Address</label>
                                                <input type="email" name="email" className="form-control bg-light" value={editFormData.email} readOnly autoComplete="one-time-code" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Phone Number</label>
                                                <input type="text" name="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} placeholder="e.g. 9876543210" value={editFormData.phone} onChange={handleEditInputChange} autoComplete="one-time-code" maxLength={10} />
                                                {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-dark fw-medium">Assign Role(s) <span className="text-danger">*</span></label>
                                            <div className={`d-flex flex-wrap gap-2 border rounded p-3 bg-light text-dark ${errors.role_ids ? 'border-danger' : ''}`}>
                                                {roles.map(role => (
                                                    <div key={role.id} className="form-check me-3">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            id={`edit_role_${role.id}`} 
                                                            value={role.id}
                                                            checked={editFormData.role_ids.some(id => String(id) === String(role.id))}
                                                            onChange={(e) => handleRoleChange(e, 'edit')}
                                                        />
                                                        <label className="form-check-label" htmlFor={`edit_role_${role.id}`}>
                                                            {role.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                            {errors.role_ids && <div className="invalid-feedback d-block">{errors.role_ids}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-top">
                                    <button type="button" className="btn btn-cancel me-2" onClick={() => setShowEditModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={isSavingEdit || editFormData.role_ids.length === 0}>
                                        {isSavingEdit ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {showPasswordModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-bottom text-dark">
                                <h5 className="modal-title">Reset Password for {selectedUser?.name}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowPasswordModal(false)}></button>
                            </div>
                            <form onSubmit={handlePasswordReset}>
                                <div className="modal-body p-4 text-dark">
                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-medium text-dark">New Password <span className="text-danger">*</span></label>
                                        <div className="pass-group input-group">
                                            <input 
                                                type={showResetPassword ? "text" : "password"} 
                                                name="new_password" 
                                                className="form-control" 
                                                placeholder="Min 8 characters" 
                                                minLength="8" 
                                                required 
                                                value={passwordData.new_password} 
                                                onChange={(e) => setPasswordData({new_password: e.target.value})} 
                                                autoComplete="new-password" 
                                            />
                                            <span 
                                                className={`isax toggle-password ${showResetPassword ? 'isax-eye' : 'isax-eye-slash'}`} 
                                                onClick={() => setShowResetPassword(!showResetPassword)} 
                                                style={{ cursor: 'pointer' }}
                                            ></span>
                                        </div>
                                    </div>
                                    <p className="text-muted fs-12 mb-0">Note: User will be able to login with this new password immediately.</p>
                                </div>
                                <div className="modal-footer border-top">
                                    <button type="button" className="btn btn-cancel me-2" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={isSavingPassword || !passwordData.new_password}>
                                        {isSavingPassword ? 'Resetting...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* Grant Company Access Modal */}
            {showAccessModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg">
                            <div className="modal-header bg-soft-primary border-bottom">
                                <h5 className="modal-title fw-bold">Grant Company Access</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAccessModal(false)}></button>
                            </div>
                            <form onSubmit={handleGrantAccess}>
                                <div className="modal-body p-4">
                                    <div className="alert alert-info border-0 mb-4 fs-12">
                                        Grant <strong>{selectedUser?.name}</strong> permission to access another company in your group.
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-medium">Select Company <span className="text-danger">*</span></label>
                                        <select 
                                            className="form-select shadow-none" 
                                            required 
                                            value={accessFormData.company_id}
                                            onChange={(e) => setAccessFormData({...accessFormData, company_id: e.target.value})}
                                        >
                                            <option value="">Choose Company...</option>
                                            {companies.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-medium">Select Role <span className="text-danger">*</span></label>
                                        <select 
                                            className="form-select shadow-none" 
                                            required 
                                            value={accessFormData.role_id}
                                            onChange={(e) => setAccessFormData({...accessFormData, role_id: e.target.value})}
                                        >
                                            <option value="">Choose Role...</option>
                                            {roles.map(r => (
                                                <option key={r.id} value={r.id}>{r.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer border-top bg-light">
                                    <button type="button" className="btn btn-cancel me-2" onClick={() => setShowAccessModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary px-4" disabled={isSavingAccess || !accessFormData.company_id || !accessFormData.role_id}>
                                        {isSavingAccess ? 'Granting...' : 'Grant Access'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersAccess;
