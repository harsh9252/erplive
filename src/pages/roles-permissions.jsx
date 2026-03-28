import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import roleService from '../services/roleService';
import { ROLE_DESCRIPTIONS } from '../constants/roles';

// Master list of modules based on erp_frontend constants and Postman
const MODULES = [
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'users', name: 'Users' },
  { id: 'roles', name: 'Roles' },
  { id: 'companies', name: 'Companies' },
  { id: 'branches', name: 'Branches' },
  { id: 'invoices', name: 'Sales Invoices' },
  { id: 'customers', name: 'Customers' },
  { id: 'products', name: 'Products' },
  { id: 'purchases', name: 'Purchases' },
  { id: 'vendors', name: 'Vendors' },
  { id: 'inventory', name: 'Inventory' },
  { id: 'accounting', name: 'Accounting' },
  { id: 'vouchers', name: 'Vouchers' },
  { id: 'gst', name: 'GST & Compliance' },
  { id: 'ewaybill', name: 'E-Way Bill' },
  { id: 'einvoice', name: 'E-Invoice' },
  { id: 'reports', name: 'Reports' },
  { id: 'settings', name: 'Settings' },
  { id: 'api_keys', name: 'API Keys' },
  { id: 'integrations', name: 'Integrations' },
];

const RolesPermissions = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editedPermissions, setEditedPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await roleService.getRoles();
      const rolesData = response.data || [];
      setRoles(rolesData);
      if (rolesData.length > 0 && !selectedRole) {
        handleRoleSelect(rolesData[0]);
      }
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError('Failed to load roles. Please try again later.');
      toast.error('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Initialize editedPermissions from role.permissions
    // If backend returns flat strings, we might need translation, but let's assume it supports the object structure if we send it
    const permissions = Array.isArray(role.permissions) ? role.permissions : [];
    
    // Normalize permissions to object structure if they are strings (view_x, manage_x)
    const normalized = MODULES.map(module => {
      // Find existing permission for this module
      const existing = permissions.find(p => p.module === module.id || p === `manage_${module.id}` || p === `view_${module.id}`);
      
      if (typeof existing === 'object') {
        return { ...existing, module: module.id };
      }
      
      // If it's a string, map it
      const hasManage = permissions.includes(`manage_${module.id}`);
      const hasView = permissions.includes(`view_${module.id}`);
      
      return {
        module: module.id,
        can_read: hasView || hasManage || false,
        can_create: hasManage || false,
        can_update: hasManage || false,
        can_delete: hasManage || false
      };
    });
    
    setEditedPermissions(normalized);
  };

  const handlePermissionToggle = (moduleName, type) => {
    setEditedPermissions(prev => prev.map(p => {
      if (p.module === moduleName) {
        return { ...p, [type]: !p[type] };
      }
      return p;
    }));
  };

  const handleSavePermissions = async () => {
    if (!selectedRole || !selectedRole.id) return;
    
    try {
      setSaving(true);
      // Filter out modules with no permissions if needed, or send all
      await roleService.updateRolePermissions(selectedRole.id, editedPermissions);
      toast.success('Permissions updated successfully');
      
      // Refresh local data
      const updatedRoles = roles.map(r => {
        if (r.id === selectedRole.id) {
          return { ...r, permissions: editedPermissions };
        }
        return r;
      });
      setRoles(updatedRoles);
      setSelectedRole({ ...selectedRole, permissions: editedPermissions });
    } catch (err) {
      console.error('Error saving permissions:', err);
      toast.error('Failed to update permissions');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRole = async (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await roleService.deleteRole(id);
        toast.success('Role deleted successfully');
        const updatedRoles = roles.filter(r => r.id !== id);
        setRoles(updatedRoles);
        if (selectedRole?.id === id) {
          const nextRole = updatedRoles[0] || null;
          setSelectedRole(nextRole);
          if (nextRole) handleRoleSelect(nextRole);
        }
      } catch (err) {
        toast.error('Failed to delete role');
      }
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <h6>Roles & Permissions</h6>
        <button className="btn btn-primary d-flex align-items-center">
          <i className="isax isax-add-circle5 me-1"></i>New Role
        </button>
      </div>

      <div className="row mt-4">
        {/* Roles List */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header border-bottom">
              <h5 className="card-title mb-0">Role Management</h5>
            </div>
            <div className="p-3 border-bottom bg-light">
              <input
                type="text"
                className="form-control"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="roles-list" style={{ maxHeight: 'calc(100vh - 350px)', overflowY: 'auto' }}>
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className={`p-3 border-bottom cursor-pointer transition-all ${
                    selectedRole?.id === role.id ? 'bg-soft-primary border-start border-4 border-primary' : ''
                  }`}
                  onClick={() => handleRoleSelect(role)}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className={`fs-14 fw-semibold mb-1 ${selectedRole?.id === role.id ? 'text-primary' : ''}`}>
                        {role.name}
                      </h6>
                      <p className="fs-12 text-muted mb-0 truncate-text" style={{ maxWidth: '200px' }}>
                        {role.description || ROLE_DESCRIPTIONS[role.name.toLowerCase()] || 'Custom company role'}
                      </p>
                    </div>
                    <i className="isax isax-arrow-right-3 fs-14 text-muted"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions Details */}
        <div className="col-lg-8">
          {selectedRole ? (
            <div className="card">
              <div className="card-header border-bottom d-flex align-items-center justify-content-between bg-white">
                <div>
                  <h5 className="card-title mb-0">Permissions for {selectedRole.name}</h5>
                  <p className="text-muted fs-12 mb-0 mt-1">Define module-level access controls</p>
                </div>
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-primary d-flex align-items-center"
                    onClick={handleSavePermissions}
                    disabled={saving}
                  >
                    {saving ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (
                      <i className="isax isax-save-2 me-1"></i>
                    )}
                    Save Permissions
                  </button>
                  <button 
                    className="btn btn-outline-danger btn-icon"
                    onClick={() => handleDeleteRole(selectedRole.id)}
                  >
                    <i className="isax isax-trash"></i>
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover table-nowrap align-middle mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th style={{ width: '250px' }}>Module</th>
                        <th className="text-center">Read</th>
                        <th className="text-center">Create</th>
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
            </div>
          ) : (
            <div className="card h-100 d-flex align-items-center justify-content-center">
              <div className="text-center p-5">
                <div className="avatar avatar-xl bg-soft-secondary mb-3">
                  <i className="isax isax-security-safe fs-48 text-muted"></i>
                </div>
                <h5 className="text-muted">Select a role to view and edit permissions</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RolesPermissions;
