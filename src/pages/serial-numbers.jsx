import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import serialService from '../services/serialService';
import itemService from '../services/itemService';
import settingsService from '../services/settingsService';
import batchService from '../services/batchService';

const SerialNumbers = () => {
  const [serials, setSerials] = useState([]);
  const [filteredSerials, setFilteredSerials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedSerials, setSelectedSerials] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  const [batches, setBatches] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null, message: '', title: '' });

  const [formData, setFormData] = useState({
    item_id: '',
    warehouse_id: '',
    serial_number: '',
    imei_number: '',
    batch_id: '',
    purchase_invoice_id: '',
    warranty_period_months: '',
    warranty_start_date: '',
    warranty_end_date: '',
    status: 'IN_STOCK',
    remarks: '',
  });

  const STATUS_OPTIONS = [
    'IN_STOCK',
    'SOLD',
    'IN_TRANSIT',
    'DAMAGED',
    'SCRAPPED',
    'WARRANTY_CLAIM',
  ];

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const [serialsRes, itemsRes, warehousesRes, batchesRes] = await Promise.all([
        serialService.getSerials(1, 100),
        itemService.getItems(1, 100, { track_serial: true }),
        settingsService.getWarehouses(),
        batchService.getBatches(1, 100)
      ]);

      setSerials(serialsRes.data || []);
      setItems(itemsRes.data || []);
      setWarehouses(warehousesRes.data || []);
      setBatches(batchesRes.data || []);
    } catch (error) {
      console.error('Error loading initial data:', error);
      toast.error('Failed to load data from server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    filterAndSortSerials();
  }, [serials, searchTerm, sortBy]);

  const filterAndSortSerials = () => {
    let filtered = [...serials].filter(serial => {
      const item = items.find(i => String(i.id) === String(serial.item_id));
      const warehouse = warehouses.find(w => String(w.id) === String(serial.warehouse_id));
      const searchLower = searchTerm.toLowerCase();

      const itemName = item?.name || serial.item?.name || '';
      const itemSku = item?.sku || serial.item?.sku || '';
      const warehouseName = warehouse?.name || serial.warehouse?.name || '';
      const serialNum = serial.serial_number || '';
      const imeiNum = serial.imei_number || '';
      const status = serial.status || '';

      return (
        itemName.toLowerCase().includes(searchLower) ||
        itemSku.toLowerCase().includes(searchLower) ||
        serialNum.toLowerCase().includes(searchLower) ||
        imeiNum.toLowerCase().includes(searchLower) ||
        warehouseName.toLowerCase().includes(searchLower) ||
        status.toLowerCase().includes(searchLower)
      );
    });

    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.created_at || a.createdAt) - new Date(b.created_at || b.createdAt));
    } else if (sortBy === 'warranty') {
      filtered.sort((a, b) => {
        const dateA = a.warranty_end_date ? new Date(a.warranty_end_date) : new Date('9999-12-31');
        const dateB = b.warranty_end_date ? new Date(b.warranty_end_date) : new Date('9999-12-31');
        return dateA - dateB;
      });
    }

    setFilteredSerials(filtered);
  };

  const calculateWarrantyEndDate = (startDate, months) => {
    if (!startDate || !months) return '';
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + parseInt(months));
    return date.toISOString().split('T')[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    // Auto-calculate warranty end date
    if (name === 'warranty_start_date' || name === 'warranty_period_months') {
      const startDate = name === 'warranty_start_date' ? value : formData.warranty_start_date;
      const months = name === 'warranty_period_months' ? value : formData.warranty_period_months;
      updatedData.warranty_end_date = calculateWarrantyEndDate(startDate, months);
    }

    setFormData(updatedData);
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.item_id) newErrors.item_id = 'Please select an item';
    if (!formData.warehouse_id) newErrors.warehouse_id = 'Please select a warehouse';
    if (!formData.serial_number?.trim()) newErrors.serial_number = 'Serial number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        await serialService.updateSerial(editingId, formData);
        toast.success('Serial number updated successfully!');
      } else {
        await serialService.createSerial(formData);
        toast.success('Serial number registered successfully!');
      }
      loadInitialData();
      resetForm();
    } catch (error) {
      console.error('Error saving serial number:', error);
      toast.error(error.message || 'Failed to save serial number');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      item_id: '',
      warehouse_id: '',
      serial_number: '',
      imei_number: '',
      batch_id: '',
      purchase_invoice_id: '',
      warranty_period_months: '',
      warranty_start_date: '',
      warranty_end_date: '',
      status: 'IN_STOCK',
      remarks: '',
    });
    setEditingId(null);
    setErrors({});
    setShowForm(false);
  };

  const handleEdit = (serial) => {
    // Format dates for HTML input
    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      return new Date(dateStr).toISOString().split('T')[0];
    };

    setFormData({
      ...serial,
      item_id: serial.item_id ? serial.item_id.toString() : '',
      warehouse_id: serial.warehouse_id ? serial.warehouse_id.toString() : '',
      batch_id: serial.batch_id ? serial.batch_id.toString() : '',
      warranty_start_date: formatDate(serial.warranty_start_date),
      warranty_end_date: formatDate(serial.warranty_end_date),
      remarks: serial.remarks || '',
    });
    setEditingId(serial.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Serial Number',
      message: 'Are you sure you want to delete this serial number record? This action cannot be undone.',
      onConfirm: async () => {
        try {
          const response = await serialService.deleteSerial(id);
          if (response && response.success !== false) {
            toast.success('Serial number deleted successfully!');
            loadInitialData();
          } else {
            toast.error(response?.message || 'Failed to delete record');
          }
        } catch (error) {
          toast.error(error.message || 'Failed to delete record');
        } finally {
          setConfirmDialog({ ...confirmDialog, isOpen: false });
        }
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSerials(new Set(filteredSerials.map(s => s.id)));
    } else {
      setSelectedSerials(new Set());
    }
  };

  const handleSelectSerial = (id) => {
    const newSelected = new Set(selectedSerials);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedSerials(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedSerials.size === 0) {
      toast.warning('Please select serial numbers to delete');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Selected Records',
      message: `Are you sure you want to delete ${selectedSerials.size} record(s)?`,
      onConfirm: async () => {
        try {
          await Promise.all(Array.from(selectedSerials).map(id => serialService.deleteSerial(id)));
          toast.success('Selected records deleted successfully!');
          setSelectedSerials(new Set());
          loadInitialData();
        } catch (error) {
          toast.error('Failed to delete some records');
        } finally {
          setConfirmDialog({ ...confirmDialog, isOpen: false });
        }
      }
    });
  };

  const getItemName = (serial) => {
    const item = items.find(i => String(i.id) === String(serial.item_id));
    return item ? `${item.name} (${item.sku})` : (serial.item?.name || '-');
  };

  const getWarehouseName = (serial) => {
    const warehouse = warehouses.find(w => String(w.id) === String(serial.warehouse_id));
    return warehouse ? warehouse.name : (serial.warehouse?.name || '-');
  };

  const getBatchNumber = (serial) => {
    if (!serial.batch_id && !serial.batch) return '-';
    const batch = batches.find(b => String(b.id) === String(serial.batch_id));
    return batch ? batch.batch_number : (serial.batch?.batch_number || '-');
  };

  const getWarrantyStatus = (serial) => {
    if (!serial.warranty_end_date) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const warrantyEnd = new Date(serial.warranty_end_date);
    warrantyEnd.setHours(0, 0, 0, 0);

    const daysLeft = Math.floor((warrantyEnd - today) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
      return { status: 'Expired', color: 'danger' };
    } else if (daysLeft <= 30) {
      return { status: `Expiring in ${daysLeft} days`, color: 'warning' };
    } else if (daysLeft <= 90) {
      return { status: `Valid (${daysLeft} days)`, color: 'info' };
    }
    return { status: 'Valid', color: 'success' };
  };

  const getStatusBadge = (status) => {
    const colors = {
      IN_STOCK: 'success',
      SOLD: 'primary',
      IN_TRANSIT: 'info',
      DAMAGED: 'warning',
      SCRAPPED: 'danger',
      WARRANTY_CLAIM: 'secondary',
    };
    const color = colors[status] || 'secondary';
    return (
      <span className={`badge bg-soft-${color} text-${color} border-${color} px-2`}>
        {status.replace(/_/g, ' ')}
      </span>
    );
  };

  return (
    <div className="container-fluid p-0">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        message={confirmDialog.message}
        title={confirmDialog.title}
      />

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Serial Number Tracking</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-muted">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/inventory/items" className="text-muted">Inventory</Link>
              </li>
              <li className="breadcrumb-item active text-primary">Serial Numbers</li>
            </ol>
          </nav>
        </div>
        <button
          className={`btn ${showForm ? 'btn-outline-danger' : 'btn-primary'} d-flex align-items-center shadow-sm px-4 rounded-pill transition-all`}
          onClick={() => setShowForm(!showForm)}
        >
          <i className={`isax ${showForm ? 'isax-close-circle' : 'isax-add-circle'} me-2 fs-18`}></i>
          {showForm ? 'Cancel' : 'Register Serial Number'}
        </button>
      </div>

      {showForm && (
        <div className="card border-0 shadow-sm mb-4 animate__animated animate__fadeInDown">
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-4">
              <div className={`icon-box bg-soft-${editingId ? 'warning' : 'primary'} text-${editingId ? 'warning' : 'primary'} rounded-circle me-3`}>
                <i className={`isax isax-${editingId ? 'edit-2' : 'add-circle'} fs-22`}></i>
              </div>
              <h5 className="card-title mb-0">{editingId ? 'Edit Serial Number Details' : 'Register New Serial Number'}</h5>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-medium">Item *</label>
                    <select
                      className={`form-control bg-light border-0 ${errors.item_id ? 'is-invalid' : ''}`}
                      name="item_id"
                      value={formData.item_id}
                      onChange={handleInputChange}
                      disabled={!!editingId}
                    >
                      <option value="">Select Item (Serial Tracked)</option>
                      {items.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name} ({item.sku})
                        </option>
                      ))}
                    </select>
                    {errors.item_id && <div className="invalid-feedback">{errors.item_id}</div>}
                    {editingId && !errors.item_id && <small className="text-muted fs-11 ms-1">Item cannot be changed for existing records</small>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-medium">Warehouse *</label>
                    <select
                      className={`form-control bg-light border-0 ${errors.warehouse_id ? 'is-invalid' : ''}`}
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
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-medium">Serial No. *</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><i className="isax isax-barcode text-muted"></i></span>
                        <input
                          type="text"
                          className={`form-control bg-light border-0 ${errors.serial_number ? 'is-invalid' : ''}`}
                          name="serial_number"
                          value={formData.serial_number}
                          onChange={handleInputChange}
                          placeholder="e.g., SN-001-2024"
                          disabled={!!editingId}
                        />
                        {errors.serial_number && <div className="invalid-feedback">{errors.serial_number}</div>}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-medium">IMEI / ID Number</label>
                    <input
                      type="text"
                      className="form-control bg-light border-0"
                      name="imei_number"
                      value={formData.imei_number}
                      onChange={handleInputChange}
                      placeholder="e.g., 123456789012345"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-medium">Batch Association</label>
                    <select
                      className="form-control bg-light border-0"
                      name="batch_id"
                      value={formData.batch_id}
                      onChange={handleInputChange}
                    >
                      <option value="">No Batch Association</option>
                      {batches.filter(b => String(b.item_id) === String(formData.item_id)).map(batch => (
                        <option key={batch.id} value={batch.id}>
                          {batch.batch_number} (Qty: {batch.qty})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-medium">Status</label>
                    <select
                      className="form-control bg-light border-0"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>
                          {status.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label fw-medium">Warranty (months)</label>
                    <input
                      type="number"
                      className="form-control bg-light border-0"
                      name="warranty_period_months"
                      value={formData.warranty_period_months}
                      onChange={handleInputChange}
                      placeholder="e.g., 12"
                      min="0"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label fw-medium">Warranty Start</label>
                    <input
                      type="date"
                      className="form-control bg-light border-0"
                      name="warranty_start_date"
                      value={formData.warranty_start_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label fw-medium">Warranty End</label>
                    <input
                      type="date"
                      className="form-control bg-light border-0"
                      name="warranty_end_date"
                      value={formData.warranty_end_date}
                      onChange={handleInputChange}
                      disabled
                      title="Auto-calculated"
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label fw-medium">Remarks</label>
                    <textarea
                      className="form-control bg-light border-0"
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                      placeholder="Add any internal notes..."
                      rows="2"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-light px-4 rounded-pill"
                  onClick={resetForm}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4 rounded-pill shadow-sm" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    editingId ? 'Update Record' : 'Register Serial'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-header bg-white py-3 border-0">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center flex-wrap gap-2">
              <div className="input-group" style={{ maxWidth: '350px' }}>
                <span className="input-group-text bg-light border-0"><i className="isax isax-search-normal text-muted fs-14"></i></span>
                <input
                  type="text"
                  className="form-control bg-light border-0 shadow-none"
                  placeholder="Search serial, IMEI, item, warehouse..."
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
              <thead className="bg-light text-muted fs-11 text-uppercase tracking-wider">
                <tr>
                  <th className="ps-4">Item Details</th>
                  <th>Serial / IMEI</th>
                  <th>Warehouse</th>
                  <th>Batch</th>
                  <th>Status</th>
                  <th>Warranty</th>
                  <th className="text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status"></div>
                      <p className="text-muted mt-2 mb-0">Loading tracked units...</p>
                    </td>
                  </tr>
                ) : filteredSerials.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <i className="isax isax-barcode fs-1 text-muted mb-3 d-block"></i>
                      <h6 className="mb-2">No Tracked Units Found</h6>
                      <p className="text-muted mb-0">
                        {serials.length === 0
                          ? 'Start by registering your first serial number'
                          : 'No tracked units match your search'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredSerials.map((serial) => {
                    const warrantyStatus = getWarrantyStatus(serial);
                    return (
                      <tr key={serial.id}>
                        <td className="ps-4">
                          <div className="fw-semibold text-dark">{getItemName(serial)}</div>

                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="badge bg-soft-primary text-primary border-primary px-2 mb-1 w-fit">{serial.serial_number}</span>
                            <small className="text-muted">{serial.imei_number || 'No IMEI'}</small>
                          </div>
                        </td>
                        <td>
                          <span className="text-dark fw-medium">{getWarehouseName(serial)}</span>
                        </td>
                        <td>
                          <span className="badge bg-soft-secondary text-secondary border-secondary px-2">{getBatchNumber(serial)}</span>
                        </td>
                        <td>
                          {getStatusBadge(serial.status)}
                        </td>
                        <td>
                          {warrantyStatus ? (
                            <div className="d-flex flex-column">
                              <span className={`badge bg-soft-${warrantyStatus.color} text-${warrantyStatus.color} border-${warrantyStatus.color} px-2 mb-1`}>
                                {warrantyStatus.status}
                              </span>
                              <small className="text-muted fs-11">Ends: {new Date(serial.warranty_end_date).toLocaleDateString()}</small>
                            </div>
                          ) : (
                            <span className="text-muted fs-12">-</span>
                          )}
                        </td>
                        <td className="text-end pe-4">
                          <div className="d-flex align-items-center justify-content-end gap-2">
                            <button
                              className="btn btn-icon-sm btn-outline-warning border-0 shadow-none"
                              onClick={() => handleEdit(serial)}
                              title="Edit"
                            >
                              <i className="isax isax-edit-2 fs-18"></i>
                            </button>
                            <button
                              className="btn btn-icon-sm btn-outline-danger border-0 shadow-none"
                              onClick={() => handleDelete(serial.id)}
                              title="Delete"
                            >
                              <i className="isax isax-trash fs-18"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {!loading && filteredSerials.length > 0 && (
        <div className="mt-3 text-muted fs-13 d-flex align-items-center">
          <i className="isax isax-info-circle me-1"></i>
          Showing {filteredSerials.length} of {serials.length} tracked units
        </div>
      )}
    </div>
  );
};

export default SerialNumbers;
