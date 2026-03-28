import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import userService from '../services/userService';

const UsersAccess = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Modal states
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [createFormData, setCreateFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role_ids: []
    });

    const [editFormData, setEditFormData] = useState({
        name: '',
        phone: '',
        role_ids: []
    });

    const [passwordData, setPasswordData] = useState({
        new_password: ''
    });

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
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
        try {
            const response = await userService.getRoles();
            setRoles(response.data || []);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            await userService.createUser(createFormData);
            toast.success('User created successfully');
            setShowAddModal(false);
            setCreateFormData({ name: '', email: '', password: '', phone: '', role_ids: [] });
            fetchUsers();
        } catch (error) {
            toast.error(error.message || 'Failed to create user');
        } finally {
            setIsSaving(false);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setEditFormData({
            name: user.name || '',
            phone: user.phone || '',
            role_ids: user.roles?.map(r => r.id) || []
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            // 1. Update basic info
            await userService.updateUser(selectedUser.id, {
                name: editFormData.name,
                phone: editFormData.phone
            });
            // 2. Update roles
            await userService.assignRoles(selectedUser.id, editFormData.role_ids);
            
            toast.success('User updated successfully');
            setShowEditModal(false);
            fetchUsers();
        } catch (error) {
            toast.error(error.message || 'Failed to update user');
        } finally {
            setIsSaving(false);
        }
    };

    const handleToggleStatus = async (user) => {
        try {
            await userService.toggleStatus(user.id);
            toast.success(`User ${user.status === 'ACTIVE' ? 'deactivated' : 'activated'} successfully`);
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            await userService.resetPassword(selectedUser.id, passwordData.new_password);
            toast.success('Password reset successfully');
            setShowPasswordModal(false);
            setPasswordData({ new_password: '' });
        } catch (error) {
            toast.error(error.message || 'Failed to reset password');
        } finally {
            setIsSaving(false);
        }
    };

    const handleRoleChange = (e, formType) => {
        const value = parseInt(e.target.value);
        const data = formType === 'create' ? createFormData : editFormData;
        const setter = formType === 'create' ? setCreateFormData : setEditFormData;
        
        const newRoles = data.role_ids.includes(value)
            ? data.role_ids.filter(id => id !== value)
            : [...data.role_ids, value];
            
        setter({ ...data, role_ids: newRoles });
    };

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
                        <h4>Users & Access</h4>
                        <h6>Manage system users and their permissions</h6>
                    </div>
                </div>
                <div className="page-btn">
                    <button className="btn btn-primary d-flex align-items-center" onClick={() => setShowAddModal(true)}>
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
                                    <th className="no-sort text-end">Action</th>
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
                                ) : users.map((user) => (
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
                                                    user.roles.map(r => (
                                                        <span key={r.id} className="badge badge-soft-info">{r.name}</span>
                                                    ))
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
                                        <td className="action-table-data text-end">
                                            <div className="dropdown dropdown-action">
                                                <button className="btn btn-sm btn-icon border-0" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                                                    <i className="isax isax-more-2 text-dark fs-18"></i>
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-end">
                                                    <li>
                                                        <button className="dropdown-item" onClick={() => handleEditClick(user)}>
                                                            <i className="isax isax-edit me-2"></i>Edit Profile
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item" onClick={() => { setSelectedUser(user); setShowPasswordModal(true); }}>
                                                            <i className="isax isax-key me-2"></i>Reset Password
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item" onClick={() => handleToggleStatus(user)}>
                                                            <i className={`isax ${user.status === 'ACTIVE' ? 'isax-user-remove' : 'isax-user-tick'} me-2`}></i>
                                                            {user.status === 'ACTIVE' ? 'Deactivate' : 'Activate'} User
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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
                            <form onSubmit={handleCreateSubmit}>
                                <div className="modal-body p-4">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Full Name <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" placeholder="Enter Full Name" required value={createFormData.name} onChange={(e) => setCreateFormData({...createFormData, name: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Email Address <span className="text-danger">*</span></label>
                                                <input type="email" className="form-control" placeholder="user@company.com" required value={createFormData.email} onChange={(e) => setCreateFormData({...createFormData, email: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Password <span className="text-danger">*</span></label>
                                                <input type="password" className="form-control" placeholder="Min 8 characters" minLength="8" required value={createFormData.password} onChange={(e) => setCreateFormData({...createFormData, password: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Phone Number</label>
                                                <input type="text" className="form-control" placeholder="e.g. 9876543210" value={createFormData.phone} onChange={(e) => setCreateFormData({...createFormData, phone: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-dark fw-medium">Assign Role(s) <span className="text-danger">*</span></label>
                                            <div className="d-flex flex-wrap gap-2 border rounded p-3 bg-light">
                                                {roles.map(role => (
                                                    <div key={role.id} className="form-check me-3">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            id={`role_${role.id}`} 
                                                            value={role.id}
                                                            checked={createFormData.role_ids.includes(role.id)}
                                                            onChange={(e) => handleRoleChange(e, 'create')}
                                                        />
                                                        <label className="form-check-label" htmlFor={`role_${role.id}`}>
                                                            {role.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-top">
                                    <button type="button" className="btn btn-cancel me-2" onClick={() => setShowAddModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={isSaving || createFormData.role_ids.length === 0}>
                                        {isSaving ? 'Creating...' : 'Create User'}
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
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-bottom">
                                <h5 className="modal-title">Edit User Profile</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                            </div>
                            <form onSubmit={handleEditSubmit}>
                                <div className="modal-body p-4">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Full Name <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" required value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mb-3">
                                                <label className="form-label text-dark fw-medium">Phone Number</label>
                                                <input type="text" className="form-control" value={editFormData.phone} onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-dark fw-medium">Assign Role(s) <span className="text-danger">*</span></label>
                                            <div className="d-flex flex-wrap gap-2 border rounded p-3 bg-light text-dark">
                                                {roles.map(role => (
                                                    <div key={role.id} className="form-check me-3">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            id={`edit_role_${role.id}`} 
                                                            value={role.id}
                                                            checked={editFormData.role_ids.includes(role.id)}
                                                            onChange={(e) => handleRoleChange(e, 'edit')}
                                                        />
                                                        <label className="form-check-label" htmlFor={`edit_role_${role.id}`}>
                                                            {role.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-top">
                                    <button type="button" className="btn btn-cancel me-2" onClick={() => setShowEditModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={isSaving || editFormData.role_ids.length === 0}>
                                        {isSaving ? 'Saving...' : 'Save Changes'}
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
                                        <input type="password" name="new_password" className="form-control" placeholder="Min 8 characters" minLength="8" required value={passwordData.new_password} onChange={(e) => setPasswordData({new_password: e.target.value})} />
                                    </div>
                                    <p className="text-muted fs-12 mb-0">Note: User will be able to login with this new password immediately.</p>
                                </div>
                                <div className="modal-footer border-top">
                                    <button type="button" className="btn btn-cancel me-2" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={isSaving || !passwordData.new_password}>
                                        {isSaving ? 'Resetting...' : 'Update Password'}
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
