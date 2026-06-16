import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import batchService from '../services/batchService';
import itemService from '../services/itemService';
import settingsService from '../services/settingsService';

const BatchTracking = () => {
  const [batches, setBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedBatches, setSelectedBatches] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null, message: '', title: '' });

  const [formData, setFormData] = useState({
    item_id: '',
    warehouse_id: '',
    batch_number: '',
    mfg_date: '',
    expiry_date: '',
    qty: '',
    purchase_rate: '',
    sale_rate: '',
    mrp: '',
    status: 'ACTIVE',
    remarks: '',
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadWarehouses(),
        loadItems(),
        loadBatches(),
      ]);
    } catch (error) {
      console.error('Error loading initial data:', error);
      toast.error('Failed to load initial data');
    } finally {
      setLoading(false);
    }
  };

  const loadWarehouses = async () => {
    try {
      const response = await settingsService.getWarehouses();
      setWarehouses(response.data || []);
    } catch (error) {
      console.error('Error loading warehouses:', error);
    }
  };

  const loadItems = async () => {
    try {
      const response = await itemService.getItems(1, 1000);
      setItems(response.data || []);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const loadBatches = async () => {
    try {
      const response = await batchService.getBatches();
      setBatches(response.data || []);
    } catch (error) {
      console.error('Error loading batches:', error);
      throw error;
    }
  };

  useEffect(() => {
    filterAndSortBatches();
  }, [batches, searchTerm, sortBy, items, warehouses]);

  const calculateExpiryStatus = (expiryDate) => {
    if (!expiryDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);

    const daysToExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysToExpiry < 0) {
      return { status: 'Expired', color: 'danger', days: daysToExpiry };
    } else if (daysToExpiry <= 30) {
      return { status: 'Expiring Soon', color: 'warning', days: daysToExpiry };
    } else if (daysToExpiry <= 90) {
      return { status: `Expiry in ${daysToExpiry} days`, color: 'info', days: daysToExpiry };
    }
    return null;
  };

  const getStatus = (batch) => {
    if (batch.status === 'EXPIRED') return 'EXPIRED';
    if (batch.status === 'EXHAUSTED') return 'EXHAUSTED';
    if (parseFloat(batch.qty) <= 0) return 'EXHAUSTED';

    const expiryStatus = calculateExpiryStatus(batch.expiry_date);
    if (expiryStatus && expiryStatus.days < 0) return 'EXPIRED';

    return 'ACTIVE';
  };

  const filterAndSortBatches = () => {
    let filtered = batches.filter(batch => {
      const item = items.find(i => String(i.id) === String(batch.item_id));
      const warehouse = warehouses.find(w => String(w.id) === String(batch.warehouse_id));
      const searchLower = searchTerm.toLowerCase();
      return (
        (item?.name || '').toLowerCase().includes(searchLower) ||
        (item?.sku || '').toLowerCase().includes(searchLower) ||
        (batch.batch_number || '').toLowerCase().includes(searchLower) ||
        (warehouse?.name || '').toLowerCase().includes(searchLower)
      );
    });

    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt || a.created_at) - new Date(b.createdAt || b.created_at));
    } else if (sortBy === 'expiry') {
      filtered.sort((a, b) => {
        const dateA = a.expiry_date ? new Date(a.expiry_date) : new Date('9999-12-31');
        const dateB = b.expiry_date ? new Date(b.expiry_date) : new Date('9999-12-31');
        return dateA - dateB;
      });
    }

    setFilteredBatches(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.item_id) newErrors.item_id = 'Please select an item';
    if (!formData.warehouse_id) newErrors.warehouse_id = 'Please select a warehouse';
    if (!formData.batch_number?.trim()) newErrors.batch_number = 'Batch number is required';
    if (!formData.qty || isNaN(formData.qty) || Number(formData.qty) < 0) newErrors.qty = 'Valid quantity is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        await batchService.updateBatch(editingId, formData);
        toast.success('Batch updated successfully!');
      } else {
        await batchService.createBatch(formData);
        toast.success('Batch created successfully!');
      }
      loadBatches();
      resetForm();
    } catch (error) {
      console.error('Error saving batch:', error);
      toast.error(error.message || 'Failed to save batch');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      item_id: '',
      warehouse_id: '',
      batch_number: '',
      mfg_date: '',
      expiry_date: '',
      qty: '',
      purchase_rate: '',
      sale_rate: '',
      mrp: '',
      status: 'ACTIVE',
      remarks: '',
    });
    setEditingId(null);
    setErrors({});
    setShowForm(false);
  };

  const handleEdit = (batch) => {
    // Format dates for HTML input yyyy-mm-dd
    const formatDate = (dateString) => {
      if (!dateString) return '';
      return new Date(dateString).toISOString().split('T')[0];
    };

    setFormData({
      ...batch,
      item_id: batch.item_id ? batch.item_id.toString() : '',
      warehouse_id: batch.warehouse_id ? batch.warehouse_id.toString() : '',
      mfg_date: formatDate(batch.mfg_date),
      expiry_date: formatDate(batch.expiry_date),
      qty: batch.qty || '0',
      purchase_rate: batch.purchase_rate || '0',
      sale_rate: batch.sale_rate || '0',
      mrp: batch.mrp || '0',
      remarks: batch.remarks || '',
    });
    setEditingId(batch.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Batch',
      message: 'Are you sure you want to delete this batch? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await batchService.deleteBatch(id);
          toast.success('Batch deleted successfully!');
          loadBatches();
        } catch (error) {
          console.error('Error deleting batch:', error);
          toast.error(error.message || 'Failed to delete batch');
        }
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBatches(new Set(filteredBatches.map(b => b.id)));
    } else {
      setSelectedBatches(new Set());
    }
  };

  const handleSelectBatch = (id) => {
    const newSelected = new Set(selectedBatches);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedBatches(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedBatches.size === 0) {
      toast.warning('Please select batches to delete');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Selected Batches',
      message: `Are you sure you want to delete ${selectedBatches.size} batch(es)?`,
      onConfirm: async () => {
        try {
          const deletePromises = Array.from(selectedBatches).map(id => batchService.deleteBatch(id));
          await Promise.all(deletePromises);
          toast.success('Selected batches deleted successfully!');
          loadBatches();
          setSelectedBatches(new Set());
        } catch (error) {
          console.error('Error deleting batches:', error);
          toast.error('Failed to delete some batches');
        }
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const getItemName = (itemId) => {
    const item = items.find(i => String(i.id) === String(itemId));
    return item ? `${item.name} (${item.sku})` : '-';
  };

  const getWarehouseName = (warehouseId) => {
    const warehouse = warehouses.find(w => String(w.id) === String(warehouseId));
    return warehouse ? warehouse.name : '-';
  };

  const getExpiryBadge = (batch) => {
    const expiryStatus = calculateExpiryStatus(batch.expiry_date);
    if (!expiryStatus) return null;

    return (
      <span className={`badge bg-soft-${expiryStatus.color} text-${expiryStatus.color} border-${expiryStatus.color} px-2`}>
        {expiryStatus.status}
      </span>
    );
  };

  const getStatusBadge = (batch) => {
    const status = getStatus(batch);
    const colors = {
      ACTIVE: 'success',
      EXPIRED: 'danger',
      EXHAUSTED: 'secondary',
    };
    const color = colors[status] || 'secondary';
    return (
      <span className={`badge bg-soft-${color} text-${color} border-${color} px-2`}>
        {status}
      </span>
    );
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
          <h4 className="fw-bold mb-1">Batch Tracking</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/inventory">Inventory</Link>
              </li>
              <li className="breadcrumb-item active">Batch Tracking</li>
            </ol>
          </nav>
        </div>
        <button
          className={`btn ${showForm ? 'btn-outline-danger' : 'btn-primary'} d-flex align-items-center shadow-sm border-0`}
          onClick={() => setShowForm(!showForm)}
        >
          <i className={`isax isax-${showForm ? 'close-circle' : 'add-circle'} me-1`}></i>
          {showForm ? 'Cancel' : 'Add Batch'}
        </button>
      </div>

      {items.length === 0 && !loading && (
        <div className="alert alert-info mb-3">
          <i className="isax isax-info-circle me-2"></i>
          No items available. Please create items first.
        </div>
      )}

      {showForm && (
        <div className="card mb-3 border-0 shadow-sm animate__animated animate__fadeInDown">
          <div className="card-body">
            <h6 className="mb-3 fw-bold">{editingId ? 'Edit Batch' : 'Add New Batch'}</h6>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Item *</label>
                    <select
                      className={`form-control ${errors.item_id ? 'is-invalid' : ''}`}
                      name="item_id"
                      value={formData.item_id}
                      onChange={handleInputChange}
                      disabled={!!editingId}
                    >
                      <option value="">Select Item</option>
                      {items.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name} ({item.sku})
                        </option>
                      ))}
                    </select>
                    {errors.item_id && <div className="invalid-feedback">{errors.item_id}</div>}
                    {editingId && !errors.item_id && <small className="text-muted fs-11">Item cannot be changed for an existing batch</small>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Warehouse *</label>
                    <select
                      className={`form-control ${errors.warehouse_id ? 'is-invalid' : ''}`}
                      name="warehouse_id"
                      value={formData.warehouse_id}
                      onChange={handleInputChange}
                      disabled={!!editingId}
                    >
                      <option value="">Select Warehouse</option>
                      {warehouses.map(warehouse => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name} ({warehouse.code})
                        </option>
                      ))}
                    </select>
                    {errors.warehouse_id && <div className="invalid-feedback">{errors.warehouse_id}</div>}
                    {editingId && !errors.warehouse_id && <small className="text-muted fs-11">Warehouse cannot be changed for an existing batch</small>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Batch No. *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.batch_number ? 'is-invalid' : ''}`}
                      name="batch_number"
                      value={formData.batch_number}
                      onChange={handleInputChange}
                      placeholder="e.g., BATCH001"
                      disabled={!!editingId}
                    />
                    {errors.batch_number && <div className="invalid-feedback">{errors.batch_number}</div>}
                    {editingId && !errors.batch_number && <small className="text-muted fs-11">Batch number is an immutable identifier</small>}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Mfg. Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="mfg_date"
                      value={formData.mfg_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="expiry_date"
                      value={formData.expiry_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">Quantity *</label>
                    <input
                      type="number"
                      className={`form-control ${errors.qty ? 'is-invalid' : ''}`}
                      name="qty"
                      value={formData.qty}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                    />
                    {errors.qty && <div className="invalid-feedback">{errors.qty}</div>}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">Purchase Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      name="purchase_rate"
                      value={formData.purchase_rate}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">Sale Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      name="sale_rate"
                      value={formData.sale_rate}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">MRP</label>
                    <input
                      type="number"
                      className="form-control"
                      name="mrp"
                      value={formData.mrp}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-control"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="EXPIRED">Expired</option>
                      <option value="EXHAUSTED">Exhausted</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Remarks</label>
                    <textarea
                      className="form-control"
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                      placeholder="Add any notes..."
                      rows="1"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 rounded-pill"
                  onClick={resetForm}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4 rounded-pill" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    editingId ? 'Update Batch' : 'Add Batch'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-header bg-white py-3">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center flex-wrap gap-2">
              <div className="input-group" style={{ maxWidth: '300px' }}>
                <span className="input-group-text bg-light border-0"><i className="isax isax-search-normal text-muted fs-14"></i></span>
                <input
                  type="text"
                  className="form-control bg-light border-0 shadow-none"
                  placeholder="Search batches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light text-muted uppercase fs-11 tracking-wider">
                <tr>
                  <th className="ps-4">Item</th>
                  <th>Batch No.</th>
                  <th>Warehouse</th>
                  <th className="text-center">Qty</th>
                  <th>Mfg. / Expiry</th>
                  <th>Expiry Status</th>
                  <th className="text-center">Status</th>
                  <th className="text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status"></div>
                      <p className="text-muted mt-2 mb-0">Fetching batches...</p>
                    </td>
                  </tr>
                ) : filteredBatches.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5 py-md-5">
                      <i className="isax isax-box-tick fs-1 text-muted mb-3 d-block"></i>
                      <h6 className="mb-2">No Batches Found</h6>
                      <p className="text-muted mb-0">
                        {batches.length === 0
                          ? 'Start by adding your first batch'
                          : 'No batches match your search'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredBatches.map((batch) => (
                    <tr key={batch.id}>
                      <td className="ps-4">
                        <div className="fw-semibold text-dark">{batch.item?.name || getItemName(batch.item_id)}</div>
                        <small className="text-muted">{batch.item?.sku || ''}</small>
                      </td>
                      <td>
                        <span className="badge bg-soft-primary text-primary border-primary px-2">{batch.batch_number}</span>
                      </td>
                      <td>
                        <span className="badge bg-soft-secondary text-secondary border-secondary px-2">
                          {batch.warehouse?.name || getWarehouseName(batch.warehouse_id)}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="fw-bold">{batch.qty}</span>
                        <small className="text-muted ms-1">{batch.item?.unit || 'units'}</small>
                      </td>
                      <td>
                        <div className="fs-12">
                          <div className="text-dark">M: {batch.mfg_date ? new Date(batch.mfg_date).toLocaleDateString() : '-'}</div>
                          <div className="text-danger">E: {batch.expiry_date ? new Date(batch.expiry_date).toLocaleDateString() : '-'}</div>
                        </div>
                      </td>
                      <td>
                        {getExpiryBadge(batch) || <span className="text-muted fs-12">-</span>}
                      </td>
                      <td className="text-center">
                        {getStatusBadge(batch)}
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <button
                            className="btn btn-icon-sm btn-outline-warning border-0 shadow-none"
                            onClick={() => handleEdit(batch)}
                            title="Edit"
                          >
                            <i className="isax isax-edit-2 fs-18"></i>
                          </button>
                          <button
                            className="btn btn-icon-sm btn-outline-danger border-0 shadow-none"
                            onClick={() => handleDelete(batch.id)}
                            title="Delete"
                          >
                            <i className="isax isax-trash fs-18"></i>
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

      <div className="mt-3 text-muted fs-12 text-center pb-4">
        Showing {filteredBatches.length} of {batches.length} batches
      </div>

      <style>{`
        .bg-soft-success { background-color: rgba(25, 135, 84, 0.1); border: 1px solid rgba(25, 135, 84, 0.2); }
        .bg-soft-danger { background-color: rgba(220, 53, 69, 0.1); border: 1px solid rgba(220, 53, 69, 0.2); }
        .bg-soft-info { background-color: rgba(13, 202, 240, 0.1); border: 1px solid rgba(13, 202, 240, 0.2); }
        .bg-soft-warning { background-color: rgba(255, 193, 7, 0.1); border: 1px solid rgba(255, 193, 7, 0.2); }
        .bg-soft-primary { background-color: rgba(13, 110, 253, 0.1); border: 1px solid rgba(13, 110, 253, 0.2); }
        .bg-soft-secondary { background-color: rgba(108, 117, 125, 0.1); border: 1px solid rgba(108, 117, 125, 0.2); }
        .btn-icon-sm { width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; border-radius: 8px; }
      `}</style>
    </>
  );
};

export default BatchTracking;
