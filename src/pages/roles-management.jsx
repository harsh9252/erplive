import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import roleService from '../services/roleService';

const MODULES = [
    { id: 'accounting', name: 'Accounting' },
    { id: 'sales_invoice', name: 'Sales Invoice' },
    { id: 'purchase_invoice', name: 'Purchase Invoice' },
    { id: 'customers', name: 'Customers' },
    { id: 'vendors', name: 'Vendors' },
    { id: 'inventory', name: 'Inventory' },
    { id: 'payroll', name: 'Payroll' },
    { id: 'reports', name: 'Reports' },
    { id: 'settings', name: 'Settings' },
    { id: 'banking', name: 'Banking' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'approvals', name: 'Approvals' }
];

const RolesManagement = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Modal states
    const [selectedRole, setSelectedRole] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showPermissionsModal, setShowPermissionsModal] = useState(false);

    const [newRoleData, setNewRoleData] = useState({
        name: '',
        description: ''
    });

    const [editedPermissions, setEditedPermissions] = useState([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const response = await roleService.getRoles();
            setRoles(response.data || []);
        } catch (error) {
            console.error('Error fetching roles:', error);
            toast.error('Failed to load roles');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateRole = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            await roleService.createRole(newRoleData);
            toast.success('Role created successfully');
            setShowAddModal(false);
            setNewRoleData({ name: '', description: '' });
            fetchRoles();
        } catch (error) {
            toast.error(error.message || 'Failed to create role');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteRole = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await roleService.deleteRole(id);
                    Swal.fire(
                        'Deleted!',
                        'The role has been deleted.',
                        'success'
                    );
                    fetchRoles();
                } catch (error) {
                    toast.error('Failed to delete role');
                }
            }
        });
    };

    const openPermissions = (role) => {
        setSelectedRole(role);
        
        // Initialize permissions grid
        const currentPerms = Array.isArray(role.permissions) ? role.permissions : [];
        
        const matrix = MODULES.map(module => {
            const existing = currentPerms.find(p => p.module === module.id);
            return {
                module: module.id,
                can_create: existing ? !!existing.can_create : false,
                can_read: existing ? !!existing.can_read : false,
                can_update: existing ? !!existing.can_update : false,
                can_delete: existing ? !!existing.can_delete : false
            };
        });
        
        setEditedPermissions(matrix);
        setShowPermissionsModal(true);
    };

    const handlePermissionToggle = (moduleName, type) => {
        setEditedPermissions(prev => prev.map(p => {
            if (p.module === moduleName) {
                return { ...p, [type]: !p[type] };
            }
            return p;
        }));
    };

    const savePermissions = async () => {
        try {
            setIsSaving(true);
            await roleService.updateRolePermissions(selectedRole.id, editedPermissions);
            toast.success('Permissions updated successfully');
            setShowPermissionsModal(false);
            fetchRoles();
        } catch (error) {
            toast.error('Failed to update permissions');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="content">
            <div className="page-header">
                <div className="add-item d-flex">
                    <div className="page-title">
                        <h4>Roles & Permissions</h4>
                        <h6>Manage accessibility and user modules</h6>
                    </div>
                </div>
                <div className="page-btn">
                    <button className="btn btn-primary d-flex align-items-center" onClick={() => setShowAddModal(true)}>
                        <i className="isax isax-add-circle me-2"></i>Add New Role
                    </button>
                </div>
            </div>

            <div className="card table-list-card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table datanew">
                            <thead>
                                <tr>
                                    <th>Role Name</th>
                                    <th>Description</th>
                                    <th className="no-sort text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : roles.map((role) => (
                                    <tr key={role.id}>
                                        <td className="fw-semibold text-dark">{role.name}</td>
                                        <td className="text-muted">{role.description || 'System generated role'}</td>
                                        <td className="action-table-data text-end">
                                            <div className="edit-delete-action">
                                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openPermissions(role)} title="Edit Permissions">
                                                    <i className="isax isax-mask-square me-1"></i>Permissions
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteRole(role.id)} title="Delete Role">
                                                    <i className="isax isax-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Role Modal */}
            {showAddModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-bottom">
                                <h5 className="modal-title">Create New Role</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <form onSubmit={handleCreateRole}>
                                <div className="modal-body p-4">
                                    <div className="form-group mb-3">
                                        <label className="form-label text-dark fw-medium">Role Name <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" placeholder="e.g. Sales Manager" required value={newRoleData.name} onChange={(e) => setNewRoleData({...newRoleData, name: e.target.value})} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label text-dark fw-medium">Description</label>
                                        <textarea className="form-control" rows="3" placeholder="Brief role description..." value={newRoleData.description} onChange={(e) => setNewRoleData({...newRoleData, description: e.target.value})}></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer border-top">
                                    <button type="button" className="btn btn-cancel me-2" onClick={() => setShowAddModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={isSaving}>
                                        {isSaving ? 'Creating...' : 'Create Role'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Permission Matrix Modal */}
            {showPermissionsModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header border-bottom bg-light">
                                <div>
                                    <h5 className="modal-title mb-0">Permissions for {selectedRole?.name}</h5>
                                    <p className="text-muted fs-12 mb-0 mt-1">Manage access control for system modules</p>
                                </div>
                                <button type="button" className="btn-close" onClick={() => setShowPermissionsModal(false)}></button>
                            </div>
                            <div className="modal-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="thead-light">
                                            <tr>
                                                <th style={{ width: '250px' }}>Module Name</th>
                                                <th className="text-center">Create</th>
                                                <th className="text-center">Read</th>
                                                <th className="text-center">Update</th>
                                                <th className="text-center">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {editedPermissions.map((perm) => (
                                                <tr key={perm.module}>
                                                    <td className="fw-medium text-dark">
                                                        {MODULES.find(m => m.id === perm.module)?.name || perm.module}
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="form-check form-check-md d-flex justify-content-center">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={perm.can_create}
                                                                onChange={() => handlePermissionToggle(perm.module, 'can_create')}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="form-check form-check-md d-flex justify-content-center">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={perm.can_read}
                                                                onChange={() => handlePermissionToggle(perm.module, 'can_read')}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="form-check form-check-md d-flex justify-content-center">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={perm.can_update}
                                                                onChange={() => handlePermissionToggle(perm.module, 'can_update')}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="form-check form-check-md d-flex justify-content-center">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={perm.can_delete}
                                                                onChange={() => handlePermissionToggle(perm.module, 'can_delete')}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer border-top">
                                <button type="button" className="btn btn-cancel me-2" onClick={() => setShowPermissionsModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={savePermissions} disabled={isSaving}>
                                    {isSaving ? 'Saving...' : 'Save Permissions'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RolesManagement;
