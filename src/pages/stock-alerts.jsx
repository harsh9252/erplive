import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import stockAlertService from '../services/stockAlertService';
import { getItems } from '../services/itemService';
import { getWarehouses } from '../services/settingsService';
import ConfirmDialog from '../components/ConfirmDialog';

const StockAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [filterType, setFilterType] = useState('ALL');
  const [selectedAlerts, setSelectedAlerts] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null, message: '', title: '' });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [triggeredAlerts, setTriggeredAlerts] = useState([]);
  const [showTriggered, setShowTriggered] = useState(false);

  const [formData, setFormData] = useState({
    item_id: '',
    warehouse_id: '',
    alert_type: 'LOW_STOCK',
    threshold_qty: '',
    reorder_qty: '',
    email_notification: false,
    sms_notification: false,
    alert_frequency_hours: '24',
    is_active: true,
  });

  const ALERT_TYPES = [
    'LOW_STOCK',
    'OUT_OF_STOCK',
    'REORDER_LEVEL',
    'OVERSTOCK',
    'NEAR_EXPIRY',
  ];

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadWarehouses(),
        loadItems(),
        loadAlerts(),
      ]);
    } catch (error) {
      console.error('Error loading stock alert data:', error);
      toast.error('Failed to load initial data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterAndSortAlerts();
  }, [alerts, searchTerm, sortBy, filterType]);

  const loadWarehouses = async () => {
    try {
      const response = await getWarehouses();
      setWarehouses(response.data || []);
    } catch (error) {
      console.error('Error loading warehouses:', error);
    }
  };

  const loadItems = async () => {
    try {
      const response = await getItems(1, 1000);
      setItems(Array.isArray(response.data) ? response.data : (response.data?.rows || []));
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const loadAlerts = async () => {
    try {
      const response = await stockAlertService.getStockAlerts();
      setAlerts(response.data || []);
    } catch (error) {
      console.error('Error loading stock alerts:', error);
    }
  };

  const filterAndSortAlerts = () => {
    let filtered = alerts.filter(alert => {
      const item = items.find(i => i.id === parseInt(alert.item_id));
      const warehouse = warehouses.find(w => w.id === parseInt(alert.warehouse_id));
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        (item?.name || '').toLowerCase().includes(searchLower) ||
        (item?.sku || '').toLowerCase().includes(searchLower) ||
        (warehouse?.name || '').toLowerCase().includes(searchLower) ||
        alert.alert_type.toLowerCase().includes(searchLower);

      const matchesType =
        filterType === 'ALL' || alert.alert_type === filterType;

      return matchesSearch && matchesType;
    });

    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'threshold') {
      filtered.sort((a, b) => b.threshold_qty - a.threshold_qty);
    }

    setFilteredAlerts(filtered);
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
    if (!formData.alert_type) newErrors.alert_type = 'Please select an alert type';
    if (!formData.threshold_qty || parseFloat(formData.threshold_qty) < 0) newErrors.threshold_qty = 'Valid non-negative threshold quantity is required';
    if (formData.reorder_qty && parseFloat(formData.reorder_qty) < 0) newErrors.reorder_qty = 'Reorder quantity must be non-negative';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        item_id: parseInt(formData.item_id),
        warehouse_id: formData.warehouse_id ? parseInt(formData.warehouse_id) : null,
        threshold_qty: parseFloat(formData.threshold_qty),
        reorder_qty: formData.reorder_qty ? parseFloat(formData.reorder_qty) : null,
        alert_frequency_hours: parseInt(formData.alert_frequency_hours) || 24,
      };

      if (editingId) {
        await stockAlertService.updateStockAlert(editingId, payload);
        toast.success('Stock alert updated successfully!');
      } else {
        await stockAlertService.createStockAlert(payload);
        toast.success('Stock alert created successfully!');
      }
      loadAlerts();
      resetForm();
    } catch (error) {
      console.error('Error saving stock alert:', error);
      toast.error(error.message || 'Failed to save stock alert');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      item_id: '',
      warehouse_id: '',
      alert_type: 'LOW_STOCK',
      threshold_qty: '',
      reorder_qty: '',
      email_notification: false,
      sms_notification: false,
      alert_frequency_hours: '24',
      is_active: true,
    });
    setEditingId(null);
    setErrors({});
    setShowForm(false);
  };

  const handleEdit = (alert) => {
    setFormData(alert);
    setEditingId(alert.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Stock Alert',
      message: 'Are you sure you want to delete this stock alert? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await stockAlertService.deleteStockAlert(id);
          toast.success('Stock alert deleted successfully!');
          loadAlerts();
        } catch (error) {
          console.error('Error deleting stock alert:', error);
          toast.error('Failed to delete stock alert');
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      }
    });
  };

  const handleToggleActive = async (alert) => {
    try {
      await stockAlertService.updateStockAlert(alert.id, {
        ...alert,
        is_active: !alert.is_active
      });
      toast.info('Alert status updated');
      loadAlerts();
    } catch (error) {
      console.error('Error updating alert status:', error);
      toast.error('Failed to update alert status');
    }
  };

  const handleCheckAlerts = async () => {
    setLoading(true);
    try {
      const response = await stockAlertService.checkStockAlerts();
      const resData = response.data || response || {};
      
      // Safely extract the array from various possible response structures
      const alertsArray = Array.isArray(resData) ? resData : 
                          Array.isArray(resData.alerts) ? resData.alerts : 
                          Array.isArray(resData.triggeredAlerts) ? resData.triggeredAlerts : 
                          Array.isArray(resData.data) ? resData.data : [];
                          
      setTriggeredAlerts(alertsArray);
      setShowTriggered(true);
      toast.success(`${alertsArray.length} stock alerts triggered!`);
      loadAlerts();
    } catch (error) {
      console.error('Error checking stock alerts:', error);
      toast.error('Failed to trigger alert check');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAlerts(new Set(alerts.map(a => a.id)));
    } else {
      setSelectedAlerts(new Set());
    }
  };

  const handleSelectAlert = (id) => {
    const newSelected = new Set(selectedAlerts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedAlerts(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedAlerts.size === 0) {
      toast.warning('Please select alerts to delete');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Selected Alerts',
      message: `Are you sure you want to delete ${selectedAlerts.size} alert(s)?`,
      onConfirm: async () => {
        try {
          await Promise.all(
            Array.from(selectedAlerts).map(id => stockAlertService.deleteStockAlert(id))
          );
          toast.success('Selected alerts deleted successfully!');
          setSelectedAlerts(new Set());
          loadAlerts();
        } catch (error) {
          console.error('Error deleting selected alerts:', error);
          toast.error('Failed to delete some selected alerts');
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      }
    });
  };

  const getItemName = (itemId) => {
    const item = items.find(i => i.id === parseInt(itemId));
    return item ? `${item.name} (${item.sku})` : '-';
  };

  const getWarehouseName = (warehouseId) => {
    if (!warehouseId) return 'All Warehouses';
    const warehouse = warehouses.find(w => w.id === parseInt(warehouseId));
    return warehouse ? warehouse.name : '-';
  };

  const getAlertTypeBadge = (type) => {
    const colors = {
      LOW_STOCK: 'danger',
      OUT_OF_STOCK: 'danger',
      REORDER_LEVEL: 'warning',
      OVERSTOCK: 'info',
      NEAR_EXPIRY: 'secondary',
    };
    const color = colors[type] || 'secondary';
    return (
      <span className={`badge bg-soft-${color} text-${color} border-${color} px-2`}>
        {type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
      </span>
    );
  };

  const getNotificationBadges = (alert) => {
    const badges = [];
    if (alert.email_notification) {
      badges.push(
        <span key="email" className="badge bg-soft-info text-info border-info me-1 px-2">
          <i className="isax isax-sms me-1"></i>Email
        </span>
      );
    }
    if (alert.sms_notification) {
      badges.push(
        <span key="sms" className="badge bg-soft-info text-info border-info px-2">
          <i className="isax isax-call me-1"></i>SMS
        </span>
      );
    }
    return badges.length > 0 ? badges : <span className="text-muted fs-12">-</span>;
  };

  const getActiveCount = () => {
    return filteredAlerts.filter(a => a.is_active).length;
  };

  const getInactiveCount = () => {
    return filteredAlerts.filter(a => !a.is_active).length;
  };

  const getNotificationCount = () => {
    return filteredAlerts.filter(a => a.email_notification || a.sms_notification).length;
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
          <h6>Stock Alerts</h6>
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
              <li className="breadcrumb-item active">Stock Alerts</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-primary d-flex align-items-center"
            onClick={handleCheckAlerts}
            disabled={loading}
          >
            <i className="isax isax-refresh-circle me-1"></i>
            Check Stock Now
          </button>
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => setShowForm(!showForm)}
          >
            <i className="isax isax-add-circle5 me-1"></i>
            {showForm ? 'Cancel' : 'Add Alert'}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted fs-12 mb-1">Active Alerts</p>
                  <h6 className="mb-0">{getActiveCount()} alerts</h6>
                </div>
                <i className="isax isax-tick-circle fs-1 text-success"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted fs-12 mb-1">Inactive Alerts</p>
                  <h6 className="mb-0">{getInactiveCount()} alerts</h6>
                </div>
                <i className="isax isax-close-circle fs-1 text-danger"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted fs-12 mb-1">With Notifications</p>
                  <h6 className="mb-0">{getNotificationCount()} alerts</h6>
                </div>
                <i className="isax isax-notification fs-1 text-info"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTriggered && triggeredAlerts.length > 0 && (
        <div className="card border-danger shadow-sm mb-4 overflow-hidden">
          <div className="card-header bg-danger text-white py-3 d-flex align-items-center justify-content-between border-0">
            <h6 className="mb-0 fw-bold d-flex align-items-center">
              <i className="isax isax-notification-status me-2 fs-18"></i>
              Triggered Alerts (Low Stock / Out of Stock)
            </h6>
            <button className="btn btn-sm btn-light rounded-pill px-3" onClick={() => setShowTriggered(false)}>Dismiss</button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr className="fs-12 text-uppercase text-muted fw-bold">
                    <th className="ps-4">Item</th>
                    <th>Warehouse</th>
                    <th>Current Qty</th>
                    <th>Threshold</th>
                    <th className="pe-4">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {triggeredAlerts.map((trigger, idx) => (
                    <tr key={idx} className="border-bottom-light">
                      <td className="ps-4">
                        <span className="fw-bold text-dark">{trigger.item_name || getItemName(trigger.item_id)}</span>
                        <div className="fs-12 text-muted">{trigger.sku}</div>
                      </td>
                      <td>{trigger.warehouse_name || getWarehouseName(trigger.warehouse_id)}</td>
                      <td>
                        <span className="badge bg-soft-danger text-danger fw-bold">{trigger.current_qty} {trigger.uom || 'units'}</span>
                      </td>
                      <td>{trigger.threshold_qty} units</td>
                      <td className="pe-4">{getAlertTypeBadge(trigger.alert_type || 'LOW_STOCK')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showTriggered && triggeredAlerts.length === 0 && (
        <div className="alert alert-success border-0 shadow-sm d-flex align-items-center mb-4 rounded-4 py-3">
          <i className="isax isax-tick-circle me-3 fs-24"></i>
          <div>
            <h6 className="mb-1 fw-bold">Stock check complete!</h6>
            <p className="mb-0 fs-13">All items are currently above their minimum threshold. No alerts triggered.</p>
          </div>
          <button className="btn-close ms-auto" onClick={() => setShowTriggered(false)}></button>
        </div>
      )}

      {items.length === 0 && (
        <div className="alert alert-info mb-3">
          <i className="isax isax-info-circle me-2"></i>
          No items available. Please create items first.
        </div>
      )}

      {showForm && (
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="mb-3">{editingId ? 'Edit Stock Alert' : 'Add New Stock Alert'}</h6>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Item *</label>
                    <select
                      className={`form-control bg-light border-0 ${errors.item_id ? 'is-invalid' : ''}`}
                      name="item_id"
                      value={formData.item_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Item</option>
                      {items.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name} ({item.sku})
                        </option>
                      ))}
                    </select>
                    {errors.item_id && <div className="invalid-feedback">{errors.item_id}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Warehouse (Optional - null = all)</label>
                    <select
                      className={`form-control bg-light border-0 ${errors.warehouse_id ? 'is-invalid' : ''}`}
                      name="warehouse_id"
                      value={formData.warehouse_id}
                      onChange={handleInputChange}
                    >
                      <option value="">All Warehouses</option>
                      {warehouses.map(warehouse => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name} ({warehouse.code})
                        </option>
                      ))}
                    </select>
                    {errors.warehouse_id && <div className="invalid-feedback">{errors.warehouse_id}</div>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Alert Type *</label>
                    <select
                      className={`form-control bg-light border-0 ${errors.alert_type ? 'is-invalid' : ''}`}
                      name="alert_type"
                      value={formData.alert_type}
                      onChange={handleInputChange}
                    >
                      {ALERT_TYPES.map(type => (
                        <option key={type} value={type}>
                          {type.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                    {errors.alert_type && <div className="invalid-feedback">{errors.alert_type}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Threshold Qty *</label>
                    <input
                      type="number"
                      className={`form-control bg-light border-0 ${errors.threshold_qty ? 'is-invalid' : ''}`}
                      name="threshold_qty"
                      value={formData.threshold_qty}
                      onChange={handleInputChange}
                      placeholder="e.g., 10"
                      min="0"
                      step="0.01"
                    />
                    {errors.threshold_qty && <div className="invalid-feedback">{errors.threshold_qty}</div>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Reorder Qty (Optional)</label>
                    <input
                      type="number"
                      className={`form-control bg-light border-0 ${errors.reorder_qty ? 'is-invalid' : ''}`}
                      name="reorder_qty"
                      value={formData.reorder_qty}
                      onChange={handleInputChange}
                      placeholder="e.g., 50"
                      min="0"
                      step="0.01"
                    />
                    {errors.reorder_qty && <div className="invalid-feedback">{errors.reorder_qty}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Alert Frequency (hours)</label>
                    <input
                      type="number"
                      className={`form-control bg-light border-0 ${errors.alert_frequency_hours ? 'is-invalid' : ''}`}
                      name="alert_frequency_hours"
                      value={formData.alert_frequency_hours}
                      onChange={handleInputChange}
                      placeholder="24"
                      min="1"
                      step="1"
                    />
                    {errors.alert_frequency_hours && <div className="invalid-feedback">{errors.alert_frequency_hours}</div>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="email_notification"
                        id="email_notification"
                        checked={formData.email_notification}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="email_notification">
                        <i className="isax isax-sms me-2"></i>Send Email Notification
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="sms_notification"
                        id="sms_notification"
                        checked={formData.sms_notification}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="sms_notification">
                        <i className="isax isax-call me-2"></i>Send SMS Notification
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="is_active"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="is_active">
                        <i className="isax isax-tick-circle me-2"></i>Active
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    editingId ? 'Update Alert' : 'Add Alert'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by item, warehouse, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ background: 'transparent', outline: 'none' }}
                />
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="d-flex gap-2">
            <div className="dropdown">
              <Link
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="isax isax-filter me-1"></i>Type :{' '}
                <span className="fw-normal ms-1">{filterType}</span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end p-0">
                <li className="w-100">
                  <Link href="#" className="dropdown-item px-3 py-2 w-100 d-block" style={{ textAlign: 'left' }} onClick={() => setFilterType('ALL')}>
                    All
                  </Link>
                </li>
                {ALERT_TYPES.map(type => (
                  <li key={type} className="w-100">
                    <Link href="#" className="dropdown-item px-3 py-2 w-100 d-block" style={{ textAlign: 'left' }} onClick={() => setFilterType(type)}>
                      {type.replace(/_/g, ' ')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="isax isax-notification fs-1 text-muted mb-3 d-block"></i>
            <h6 className="mb-2">No Stock Alerts Found</h6>
            <p className="text-muted mb-3">
              {alerts.length === 0
                ? 'Start by adding your first stock alert'
                : 'No alerts match your search'}
            </p>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-nowrap">
            <thead className="thead-light">
              <tr>
                <th>Item</th>
                <th>Warehouse</th>
                <th>Alert Type</th>
                <th>Threshold</th>
                <th>Reorder Qty</th>
                <th>Notifications</th>
                <th>Frequency</th>
                <th>Status</th>
                <th className="no-sort">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-2">Loading stock alerts...</p>
                  </td>
                </tr>
              ) : filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-5">
                    <i className="isax isax-notification fs-1 text-muted mb-3 d-block"></i>
                    <h6 className="mb-2">No Stock Alerts Found</h6>
                    <p className="text-muted mb-0">
                      {alerts.length === 0
                        ? 'Start by adding your first stock alert'
                        : 'No alerts match your search'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => (
                  <tr key={alert.id}>
                    <td>
                      <h6 className="fs-14 fw-medium mb-0">{alert.item?.name || getItemName(alert.item_id)}</h6>
                      <small className="text-muted">{alert.item?.sku || ''}</small>
                    </td>
                    <td>
                      <span className="badge bg-soft-secondary text-secondary border-secondary px-2">
                        {alert.warehouse?.name || getWarehouseName(alert.warehouse_id)}
                      </span>
                    </td>
                    <td>
                      {getAlertTypeBadge(alert.alert_type)}
                    </td>
                    <td>
                      <span className="badge bg-soft-warning text-warning border-warning px-2">
                        {alert.threshold_qty || alert.threshold} units
                      </span>
                    </td>
                    <td>
                      <p className="text-muted fs-12 mb-0">{alert.reorder_qty || '-'}</p>
                    </td>
                    <td>
                      {getNotificationBadges(alert)}
                    </td>
                    <td>
                      <p className="text-muted fs-12 mb-0">{alert.alert_frequency_hours}h</p>
                    </td>
                    <td>
                      <span className={`badge bg-soft-${alert.is_active ? 'success' : 'danger'} text-${alert.is_active ? 'success' : 'danger'} border-${alert.is_active ? 'success' : 'danger'} px-2`}>
                        {alert.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <div className="d-flex justify-content-end align-items-center gap-2">
                        <button
                          className={`btn btn-sm btn-soft-${alert.is_active ? 'warning' : 'success'} border-0`}
                          onClick={() => handleToggleActive(alert)}
                          title={alert.is_active ? 'Deactivate' : 'Activate'}
                        >
                          <i className={`isax isax-${alert.is_active ? 'close' : 'tick'}-circle fs-16`}></i>
                        </button>
                        <button
                          className="btn btn-sm btn-soft-info border-0"
                          onClick={() => handleEdit(alert)}
                          title="Edit"
                        >
                          <i className="isax isax-edit-2 fs-16"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-soft-danger border-0"
                          onClick={() => handleDelete(alert.id)}
                          title="Delete"
                        >
                          <i className="isax isax-trash fs-16"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-3 text-muted fs-12">
        Showing {filteredAlerts.length} of {alerts.length} stock alerts
      </div>

      <style>{`
        .bg-soft-success { background-color: rgba(25, 135, 84, 0.1); border: 1px solid rgba(25, 135, 84, 0.2); }
        .bg-soft-danger { background-color: rgba(220, 53, 69, 0.1); border: 1px solid rgba(220, 53, 69, 0.2); }
        .bg-soft-info { background-color: rgba(13, 202, 240, 0.1); border: 1px solid rgba(13, 202, 240, 0.2); }
        .bg-soft-warning { background-color: rgba(255, 193, 7, 0.1); border: 1px solid rgba(255, 193, 7, 0.2); }
        .bg-soft-secondary { background-color: rgba(108, 117, 125, 0.1); border: 1px solid rgba(108, 117, 125, 0.2); }
      `}</style>
    </>
  );
};

export default StockAlerts;
