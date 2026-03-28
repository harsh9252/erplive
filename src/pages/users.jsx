import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

import { userService } from '../services/userService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [columns, setColumns] = useState({
    user: true,
    phone: true,
    role: true,
    activity: true,
    created: true,
    status: true
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, name: '' });

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    password: '',
    role_ids: [],
    status: 'ACTIVE',
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    if (window.$) {
      setTimeout(() => {
        $('.select2').select2({
          width: '100%',
          allowClear: true,
          placeholder: 'Select roles'
        });
      }, 100);
    }
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getUsers();
      setUsers(response.data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await userService.getRoles();
      setRoles(response.data || []);
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  };

  const handleColumnToggle = (column) => {
    setColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await userService.createUser(formData);
      toast.success('User created successfully!');
      fetchUsers();
      setShowAddModal(false);
    } catch (err) {
      console.error('Error creating user:', err);
      toast.error(err.message || 'Failed to create user');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email || '',
      phone: user.phone || '',
      role_ids: user.roles?.map(r => r.id) || [],
      status: user.status,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const { id, ...updateData } = formData;
      // roles are updated via assignRoles API if needed, or included in update if backend supports it
      // Based on userService.js, assignRoles is a separate call.
      // But updateUser might also accept it. Let's try updateUser first.
      await userService.updateUser(id, updateData);
      
      // If roles changed, assign them
      if (formData.role_ids.length > 0) {
        await userService.assignRoles(id, formData.role_ids);
      }

      toast.success('User updated successfully!');
      fetchUsers();
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error(err.message || 'Failed to update user');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await userService.toggleStatus(id);
      toast.success('Status updated!');
      fetchUsers();
    } catch (err) {
      console.error('Error toggling status:', err);
      toast.error('Failed to toggle status');
    }
  };

  const handleDeleteClick = (id, name) => {
    setDeleteConfirm({ isOpen: true, id, name });
  };

  const confirmDelete = () => {
    toast.warning('The current backend API does not expose user deletion. Use status toggling instead.');
    setDeleteConfirm({ isOpen: false, id: null, name: '' });
  };

  let filteredData = users.filter(item =>
    item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.phone?.toLowerCase().includes(searchText.toLowerCase())
  );

  if (sortConfig.key) {
    filteredData.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return (
    <>
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, name: '' })}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete user "${deleteConfirm.name}"? This action cannot be undone.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />

      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Users</h6>
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
                <Link className="dropdown-item" href="#">Download as PDF</Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">Download as Excel</Link>
              </li>
            </ul>
          </div>
          <div>
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => {
                setFormData({ id: null, name: '', phone: '', role: 'Customer', status: 'Active', img: '/assets/img/users/user-01.jpg' });
                setShowAddModal(true);
              }}
            >
              <i className="isax isax-add-circle5 me-1"></i>New User
            </button>
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
                  placeholder="Search Users, Phone..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ background: 'transparent', outline: 'auto' }}
                />
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
            <Link
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </Link>
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown">
              <Link
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                <i className="isax isax-grid-3 me-1"></i>Column
              </Link>
              <ul className="dropdown-menu  dropdown-menu">
                {Object.keys(columns).map(col => (
                  <li key={col}>
                    <label className="dropdown-item d-flex align-items-center form-switch">
                      <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                      <input className="form-check-input m-0 me-2" type="checkbox" checked={columns[col]} onChange={() => handleColumnToggle(col)} />
                      <span>{col.charAt(0).toUpperCase() + col.slice(1)}</span>
                    </label>
                  </li>
                ))}
              </ul>
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
              {columns.user && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('name')}>User {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.phone && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('phone')}>Phone {sortConfig.key === 'phone' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.role && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('role')}>Role {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.activity && <th className="no-sort">Last Activity</th>}
              {columns.created && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('createdAt')}>Created On {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.status && <th className="no-sort" style={{ cursor: 'pointer' }} onClick={() => requestSort('status')}>Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              <th className="no-sort"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : filteredData.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="form-check form-check-md">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </td>
                {columns.user && (
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-sm rounded-circle me-2 flex-shrink-0 bg-soft-primary text-primary d-flex align-items-center justify-content-center fw-semibold">
                        {item.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <h6 className="fs-14 fw-medium mb-0">
                          {item.name}
                        </h6>
                        <small className="text-muted">{item.email}</small>
                      </div>
                    </div>
                  </td>
                )}
                {columns.phone && <td>{item.phone || '-'}</td>}
                {columns.role && (
                  <td className="text-dark">
                    {item.roles?.map(r => r.name).join(', ') || 'No Role'}
                  </td>
                )}
                {columns.activity && <td className="text-dark">{item.last_login_at ? new Date(item.last_login_at).toLocaleString() : 'Never'}</td>}
                {columns.created && <td>{new Date(item.createdAt).toLocaleDateString()}</td>}
                {columns.status && (
                  <td>
                    <div className="dropdown" style={{ position: "relative" }}>
                      <Link
                        href="#"
                        className={`badge badge-soft-${item.status === 'ACTIVE' ? 'success' : 'danger'} d-inline-flex align-items-center dropdown-toggle`}
                        data-bs-toggle="dropdown" data-bs-auto-close="outside"
                        role="button"
                        aria-expanded="false"
                      >
                        {item.status}
                        <i className={`isax isax-${item.status === 'ACTIVE' ? 'tick' : 'close'}-circle ms-1`}></i>
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-end" style={{ zIndex: 1000 }}>
                        <li>
                          <button 
                            className="dropdown-item d-flex align-items-center" 
                            onClick={() => handleToggleStatus(item.id)}
                            disabled={item.status === 'ACTIVE'}
                          >
                            <i className="isax isax-tick-circle text-success me-2"></i>
                            Activate
                          </button>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item d-flex align-items-center" 
                            onClick={() => handleToggleStatus(item.id)}
                            disabled={item.status === 'INACTIVE'}
                          >
                            <i className="isax isax-close-circle text-danger me-2"></i>
                            Deactivate
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                )}
                <td className="action-item">
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(item)}
                      title="Edit"
                    >
                      <i className="isax isax-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteClick(item.id, item.name)}
                      title="Delete"
                    >
                      <i className="isax isax-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && filteredData.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered shadow-lg">
            <div className="modal-content border-0">
              <div className="modal-header">
                <h4 className="modal-title">Add New User</h4>
                <button type="button" className="btn-close custom-btn-close" onClick={() => setShowAddModal(false)}>
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
              <form onSubmit={handleCreate}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-dark fw-medium">Full Name</label>
                      <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="Enter user name" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-dark fw-medium">Email</label>
                      <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder="user@example.com" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-dark fw-medium">Phone</label>
                      <input type="text" className="form-control" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 XXXX XXXX" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-dark fw-medium">Password</label>
                      <input type="password" name="password" className="form-control" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required placeholder="Enter password" />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label text-dark fw-medium">Roles</label>
                      <select 
                        className="form-select" 
                        multiple 
                        value={formData.role_ids} 
                        onChange={(e) => {
                          const values = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                          setFormData({ ...formData, role_ids: values });
                        }}
                      >
                        {roles.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                      <small className="text-muted">Hold Ctrl to select multiple</small>
                    </div>
                  </div>
                </div>
                <div className="modal-footer d-flex align-items-center justify-content-between gap-1 p-3">
                  <button type="button" className="btn btn-outline-white px-4" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary px-4" disabled={isSaving}>
                    {isSaving ? 'Creating...' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered shadow-lg">
            <div className="modal-content border-0">
              <div className="modal-header">
                <h4 className="modal-title">Edit User</h4>
                <button type="button" className="btn-close custom-btn-close" onClick={() => setShowEditModal(false)}>
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-dark fw-medium">Full Name</label>
                      <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-dark fw-medium">Email</label>
                      <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-dark fw-medium">Phone</label>
                      <input type="text" className="form-control" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label text-dark fw-medium">Roles</label>
                      <select 
                        className="form-select" 
                        multiple 
                        value={formData.role_ids} 
                        onChange={(e) => {
                          const values = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                          setFormData({ ...formData, role_ids: values });
                        }}
                      >
                        {roles.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                      <small className="text-muted">Hold Ctrl to select multiple</small>
                    </div>
                  </div>
                </div>
                <div className="modal-footer d-flex align-items-center justify-content-between gap-1 p-3">
                  <button type="button" className="btn btn-outline-white px-4" onClick={() => setShowEditModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary px-4" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
