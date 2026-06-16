import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import { settingsService } from '../services/settingsService';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null, message: '', title: '' });
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });

  useEffect(() => {
    loadWarehouses();
  }, []);

  useEffect(() => {
    filterAndSortWarehouses();
  }, [warehouses, searchTerm, sortBy]);

  const loadWarehouses = async () => {
    setLoading(true);
    try {
      const response = await settingsService.getWarehouses();
      if (response.success && response.data) {
        setWarehouses(response.data);
      } else {
        setWarehouses([]);
      }
    } catch (error) {
      console.error('Error loading warehouses:', error);
      toast.error('Failed to load warehouses');
      setWarehouses([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortWarehouses = () => {
    let filtered = Array.isArray(warehouses) ? [...warehouses] : [];
    
    if (searchTerm) {
      filtered = filtered.filter(warehouse =>
        warehouse.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'latest') {
      filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => (a.id || 0) - (b.id || 0));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    setFilteredWarehouses(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrors({ name: 'Warehouse Name is required' });
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        const response = await settingsService.updateWarehouse(editingId, formData);
        if (response.success) {
          toast.success('Warehouse updated successfully!');
          await loadWarehouses();
          resetForm();
        } else {
          toast.error(response.message || 'Failed to update warehouse');
        }
      } else {
        const response = await settingsService.createWarehouse(formData);
        if (response.success) {
          toast.success('Warehouse created successfully!');
          await loadWarehouses();
          resetForm();
        } else {
          toast.error(response.message || 'Failed to create warehouse');
        }
      }
    } catch (error) {
      console.error('Error saving warehouse:', error);
      toast.error('An error occurred while saving');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
    });
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (warehouse) => {
    setFormData({
      name: warehouse.name || '',
      location: warehouse.location || '',
    });
    setErrors({});
    setEditingId(warehouse.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    toast.info('Delete functionality is not yet supported by the backend');
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        message={confirmDialog.message}
        title={confirmDialog.title}
      />
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Warehouses</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item active">Warehouses</li>
            </ol>
          </nav>
        </div>
        {!showForm && (
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => setShowForm(true)}
          >
            <i className="isax isax-add-circle5 me-1"></i>
            Add Warehouse
          </button>
        )}
      </div>

      {showForm && (
        <div className="card mb-3 shadow-sm border-0">
          <div className="card-body">
            <h6 className="mb-3 fw-bold">{editingId ? 'Edit Warehouse' : 'Add New Warehouse'}</h6>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-dark">Warehouse Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Main Warehouse"
                      required
                    />
                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-dark">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Downtown"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    editingId ? 'Update Warehouse' : 'Add Warehouse'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow-sm border-0 mb-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center flex-wrap gap-2">
              <div className="table-search d-flex align-items-center mb-0">
                <div className="search-input position-relative">
                  <i className="isax isax-search-normal fs-14 position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Search warehouses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="dropdown">
              <button
                className="dropdown-toggle btn btn-outline-light d-inline-flex align-items-center text-dark"
                data-bs-toggle="dropdown"
              >
                <i className="isax isax-sort me-1"></i>Sort By :{' '}
                <span className="fw-medium ms-1">
                  {sortBy === 'latest' ? 'Latest' : sortBy === 'oldest' ? 'Oldest' : 'Name'}
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={() => setSortBy('latest')}>
                    Latest
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => setSortBy('oldest')}>
                    Oldest
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => setSortBy('name')}>
                    Name
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : filteredWarehouses.length === 0 ? (
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">
            <i className="isax isax-truck fs-1 text-muted mb-3 d-block"></i>
            <h6 className="mb-2">No Warehouses Found</h6>
            <p className="text-muted mb-0">
              {warehouses.length === 0
                ? 'Start by adding your first warehouse'
                : 'No warehouses match your search'}
            </p>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover table-nowrap align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Warehouse Name</th>
                  <th>Location</th>
                  <th>Created At</th>
                  <th className="text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredWarehouses.map((warehouse) => (
                  <tr key={warehouse.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm bg-light-primary rounded-circle me-2 d-flex align-items-center justify-content-center">
                          <i className="isax isax-box-1 text-primary"></i>
                        </div>
                        <h6 className="fs-14 fw-medium mb-0">{warehouse.name}</h6>
                      </div>
                    </td>
                    <td>
                      <span className="text-muted">{warehouse.location || 'N/A'}</span>
                    </td>
                    <td>
                      <span className="fs-13 text-muted">
                        {warehouse.createdAt ? new Date(warehouse.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end align-items-center gap-2">
                        <button 
                          className="btn btn-sm btn-soft-warning border-0" 
                          onClick={() => handleEdit(warehouse)}
                          title="Edit Warehouse"
                        >
                          <i className="isax isax-edit-2 fs-16"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-soft-danger border-0" 
                          onClick={() => handleDelete(warehouse.id)}
                          title="Delete Warehouse"
                        >
                          <i className="isax isax-trash fs-16"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-3 text-muted fs-12 ms-2">
        Showing {filteredWarehouses.length} of {warehouses.length} warehouses
      </div>
    </>
  );
};

export default Warehouses;
