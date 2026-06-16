import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import roleService from '../services/roleService';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

// Master list of modules synchronized with the backend
const MODULES = [
  { id: 'accounting', name: 'Accounting' },
  { id: 'sales_invoice', name: 'Sales Invoices' },
  { id: 'purchase_invoice', name: 'Purchase Invoices' },
  { id: 'customers', name: 'Customers' },
  { id: 'vendors', name: 'Vendors' },
  { id: 'inventory', name: 'Inventory Management' },
  { id: 'payroll', name: 'Payroll & HR' },
  { id: 'reports', name: 'Financial Reports' },
  { id: 'settings', name: 'System Settings' },
  { id: 'banking', name: 'Banking & Cash' },
  { id: 'manufacturing', name: 'Manufacturing' },
  { id: 'approvals', name: 'Workflow Approvals' },
];

const RolesPermissions = () => {
  const { hasPermission } = useAuth();
  const canManageRoles = hasPermission('users', 'can_update');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const selectedRoleRef = React.useRef(selectedRole);

  React.useEffect(() => {
    selectedRoleRef.current = selectedRole;
  }, [selectedRole]);
  const [editedPermissions, setEditedPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Modals
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [isEditingRoleInfo, setIsEditingRoleInfo] = useState(false);
  const [roleFormData, setRoleFormData] = useState({ name: '', description: '' });

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await roleService.getRoles();
      const rolesData = response.data || [];
      setRoles(rolesData);
    } catch (err) {
      console.error('Error fetching roles:', err);
      toast.error('Failed to load roles from server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    if (roles.length > 0) {
      if (!selectedRoleRef.current) {
        handleRoleSelect(roles[0]);
      } else {
        // Update selection if it exists in the new roles list (to sync fresh data)
        const current = roles.find(r => r.id === selectedRoleRef.current.id);
        if (current) {
          handleRoleSelect(current);
        }
      }
    }
  }, [roles]); // Only re-run when roles list changes (e.g. after fetch)

  // Bug 5.1 fix: memoize handleRoleSelect with useCallback
  const handleRoleSelect = useCallback((role) => {
    setSelectedRole(role);
    const permissions = Array.isArray(role.permissions) ? role.permissions : [];
    const normalized = MODULES.map(module => {
      const existing = permissions.find(p => p.module === module.id);
      return {
        module: module.id,
        can_read: existing ? !!existing.can_read : false,
        can_create: existing ? !!existing.can_create : false,
        can_update: existing ? !!existing.can_update : false,
        can_delete: existing ? !!existing.can_delete : false
      };
    });
    setEditedPermissions(normalized);
    setHasUnsavedChanges(false);
  }, []);

  const handlePermissionToggle = (moduleName, type) => {
    setEditedPermissions(prev => prev.map(p => {
      if (p.module === moduleName) return { ...p, [type]: !p[type] };
      return p;
    }));
    setHasUnsavedChanges(true);
  };

  const handleToggleAllModule = (moduleName, check) => {
    setEditedPermissions(prev => prev.map(p => {
      if (p.module === moduleName) {
        return { ...p, can_create: check, can_read: check, can_update: check, can_delete: check };
      }
      return p;
    }));
    setHasUnsavedChanges(true);
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) return;
    try {
      setIsSaving(true);
      await roleService.updateRolePermissions(selectedRole.id, editedPermissions);
      toast.success(`Permissions for ${selectedRole.name} updated!`);
      setHasUnsavedChanges(false);
      // Bug 5.3 fix: re-fetch to ensure local state matches backend
      fetchRoles();
    } catch (err) {
      console.error('Error saving permissions:', err);
      toast.error('Failed to update permissions');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRoleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!roleFormData.name.trim()) {
      toast.error('Role name is required');
      return;
    }

    try {
      setIsSaving(true);
      if (isEditingRoleInfo) {
        await roleService.updateRole(selectedRole.id, roleFormData);
        toast.success('Role updated successfully');
      } else {
        await roleService.createRole(roleFormData);
        toast.success('New role created successfully');
      }
      setShowRoleModal(false);
      fetchRoles();
    } catch (err) {
      console.error('Error saving role:', err);
      const errorData = err.response?.data;
      const errorMessage = errorData?.message || errorData?.error || err.message || 'Failed to save role';
      
      if (errorData?.errors) {
        const fieldErrors = Object.values(errorData.errors).flat().join(', ');
        toast.error(`${errorMessage}: ${fieldErrors}`);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const openAddRole = () => {
    setIsEditingRoleInfo(false);
    setRoleFormData({ name: '', description: '' });
    setShowRoleModal(true);
  };

  const openEditRole = () => {
    if (!selectedRole) return;
    // Bug 5.2 fix: system roles cannot be renamed/edited
    if (selectedRole.is_system) {
      toast.warning('System roles cannot be renamed or modified');
      return;
    }
    setIsEditingRoleInfo(true);
    setRoleFormData({ name: selectedRole.name, description: selectedRole.description || '' });
    setShowRoleModal(true);
  };

  const handleDeleteRole = async () => {
    if (!selectedRole || selectedRole.is_system) {
      toast.warning('System roles cannot be deleted');
      return;
    }

    Swal.fire({
      title: 'Delete Role?',
      text: `Are you sure you want to delete the "${selectedRole.name}" role?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await roleService.deleteRole(selectedRole.id);
          toast.success('Role deleted successfully');
          setSelectedRole(null);
          fetchRoles();
        } catch (err) {
          toast.error('Cannot delete role if assigned to users');
        }
      }
    });
  };

  const filteredRoles = roles.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && roles.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
        <div className="text-center">
          <div className="spinner-grow text-primary mb-3" role="status"></div>
          <h5 className="text-muted fw-normal">Securing your workspace...</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header mb-4">
        <div className="page-title">
          <h4 className="fw-bold">Security & Roles</h4>
          <h6 className="text-muted">Configure access control levels for your team</h6>
        </div>
        <div className="page-btn">
          <button className="btn btn-primary d-flex align-items-center shadow-sm px-4 rounded-pill" onClick={openAddRole} disabled={!canManageRoles}>
            <i className="isax isax-add-circle me-2"></i>Add Role
          </button>
        </div>
      </div>

      <div className="row g-4 h-100">
        {/* Sidebar: Roles List */}
        <div className="col-lg-4 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
            <div className="card-header bg-white py-3 border-0">
              <div className="input-group bg-light rounded-pill px-3 py-1">
                <span className="input-group-text bg-transparent border-0 p-0 me-2"><i className="isax isax-search-normal text-muted"></i></span>
                <input
                  type="text"
                  className="form-control bg-transparent border-0 shadow-none ps-0"
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="card-body p-0 roles-scroll-area" style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className={`p-3 border-bottom cursor-pointer transition-all role-item ${selectedRole?.id === role.id ? 'bg-soft-primary border-start border-4 border-primary' : ''
                    }`}
                  onClick={() => {
                    // Bug 5.4 fix: warn about unsaved changes before switching
                    if (hasUnsavedChanges && selectedRole?.id !== role.id) {
                      if (!window.confirm('You have unsaved permission changes. Discard and switch role?')) return;
                    }
                    handleRoleSelect(role);
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="overflow-hidden">
                      <h6 className={`fs-14 fw-bold mb-1 truncate-text ${selectedRole?.id === role.id ? 'text-primary' : 'text-dark'}`}>
                        {role.name}
                        {role.is_system && <span className="badge bg-soft-info text-info ms-2 fs-10">SYSTEM</span>}
                      </h6>
                      <p className="fs-12 text-muted mb-0 truncate-text">
                        {role.description || 'Custom management level'}
                      </p>
                    </div>
                    {selectedRole?.id === role.id && <i className="isax isax-tick-circle text-primary fs-18"></i>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions Table: Two-pane layout */}
        <div className="col-lg-8 col-xl-9">
          {selectedRole ? (
            <div className="card border-0 shadow-sm rounded-4 h-100 animate__animated animate__fadeIn">
              <div className="card-header bg-white py-4 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center">
                  <div className="avatar avatar-lg bg-soft-primary text-primary rounded-pill me-3">
                    <i className="isax isax-security-user fs-24"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-dark">Permissions: {selectedRole.name}</h5>
                    <p className="text-muted fs-12 mb-0">{selectedRole.description || 'Defined module-level access for this role group.'}</p>
                  </div>
                </div>
                <div className="d-flex gap-2 ms-auto align-items-center">
                  <button 
                    className="btn btn-sm btn-soft-warning border-0" 
                    onClick={openEditRole}
                    title="Edit Role Info"
                    disabled={!canManageRoles}
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </button>
                  {!selectedRole.is_system && (
                    <button 
                      className="btn btn-sm btn-soft-danger border-0" 
                      onClick={handleDeleteRole}
                      title="Delete Role"
                      disabled={!canManageRoles}
                    >
                      <i className="isax isax-trash fs-16"></i>
                    </button>
                  )}
                  <div className="vr mx-1"></div>
                  <button className="btn btn-primary d-flex align-items-center px-4 rounded-pill shadow-primary" onClick={handleSavePermissions} disabled={isSaving || !canManageRoles}>
                    {isSaving ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="isax isax-save-2 me-2"></i>}
                    Save Changes
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light text-muted uppercase fs-11 tracking-wider">
                      <tr>
                        <th className="ps-4 py-3" style={{ width: '280px' }}>System Modules</th>
                        <th className="text-center">Read</th>
                        <th className="text-center">Create</th>
                        <th className="text-center">Update</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center pe-4" style={{ width: '120px' }}>Full Control</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editedPermissions.map((perm) => {
                        const isFullControl = perm.can_read && perm.can_create && perm.can_update && perm.can_delete;
                        return (
                          <tr key={perm.module}>
                            <td className="ps-4">
                              <span className="fw-semibold text-dark fs-14">
                                {MODULES.find(m => m.id === perm.module)?.name || perm.module}
                              </span>
                            </td>
                            <td className="text-center">
                              <div className="form-check form-check-md d-flex justify-content-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={perm.can_read}
                                  onChange={() => handlePermissionToggle(perm.module, 'can_read')}
                                  disabled={!canManageRoles}
                                />
                              </div>
                            </td>
                            <td className="text-center">
                              <div className="form-check form-check-md d-flex justify-content-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={perm.can_create}
                                  onChange={() => handlePermissionToggle(perm.module, 'can_create')}
                                  disabled={!canManageRoles}
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
                                  disabled={!canManageRoles}
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
                                  disabled={!canManageRoles}
                                />
                              </div>
                            </td>
                            <td className="text-center pe-4">
                              <div className="form-switch d-flex justify-content-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={isFullControl}
                                  onChange={(e) => handleToggleAllModule(perm.module, e.target.checked)}
                                  disabled={!canManageRoles}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="card h-100 border-0 shadow-sm rounded-4 d-flex align-items-center justify-content-center">
              <div className="text-center p-5 animate__animated animate__pulse animate__infinite animate__slow">
                <div className="icon-box bg-soft-secondary mx-auto mb-4 rounded-circle" style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="isax isax-security-safe fs-48 text-muted opacity-50"></i>
                </div>
                <h5 className="text-muted fw-bold">Select a Role</h5>
                <p className="text-muted fs-14">Choose a role from the sidebar to verify and modify access levels.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Role Add/Edit Modal */}
      {showRoleModal && (
        <div className="modal fade show d-block shadow-lg" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow">
              <div className="modal-header border-0 pb-0 pt-4 px-4">
                <h5 className="fw-bold text-dark">{isEditingRoleInfo ? 'Update Role' : 'Create Custom Role'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowRoleModal(false)}></button>
              </div>
              <form onSubmit={handleRoleFormSubmit}>
                <div className="modal-body p-4">
                  <div className="form-group mb-3">
                    <label className="form-label text-dark fw-semibold">Role Identity <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      placeholder="e.g. Senior Accountant"
                      required
                      value={roleFormData.name}
                      onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-dark fw-semibold">Purpose / Description</label>
                    <textarea
                      className="form-control bg-light border-0 py-2"
                      rows="3"
                      placeholder="What are the responsibilities of this role?"
                      value={roleFormData.description}
                      onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-0 p-4 pt-0">
                  <button type="button" className="btn btn-light px-4 rounded-pill" onClick={() => setShowRoleModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary px-4 rounded-pill shadow-primary" disabled={isSaving}>
                    {isSaving ? 'Processing...' : (isEditingRoleInfo ? 'Update Role' : 'Launch Role')}
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

export default RolesPermissions;
