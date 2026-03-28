import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

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
    loadWarehouses();
    loadItems();
    loadAlerts();
  }, []);

  useEffect(() => {
    filterAndSortAlerts();
  }, [alerts, searchTerm, sortBy, filterType]);

  const loadWarehouses = () => {
    const storedWarehouses = JSON.parse(localStorage.getItem('warehouses') || '[]');
    setWarehouses(storedWarehouses);
  };

  const loadItems = () => {
    const storedItems = JSON.parse(localStorage.getItem('items') || '[]');
    setItems(storedItems);
  };

  const loadAlerts = () => {
    const storedAlerts = JSON.parse(localStorage.getItem('stock_alerts') || '[]');
    setAlerts(storedAlerts);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.item_id || !formData.alert_type || !formData.threshold_qty) {
      toast.error('Please fill all required fields');
      return;
    }

    if (parseFloat(formData.threshold_qty) < 0) {
      toast.error('Threshold quantity must be non-negative');
      return;
    }

    if (formData.reorder_qty && parseFloat(formData.reorder_qty) < 0) {
      toast.error('Reorder quantity must be non-negative');
      return;
    }

    // Check for duplicate alert for same item and warehouse
    const isDuplicate = alerts.some(
      a =>
        a.item_id === formData.item_id &&
        a.warehouse_id === formData.warehouse_id &&
        a.alert_type === formData.alert_type &&
        a.id !== editingId
    );

    if (isDuplicate) {
      toast.error('Alert already exists for this item, warehouse, and type');
      return;
    }

    if (editingId) {
      const updatedAlerts = alerts.map(a =>
        a.id === editingId
          ? { ...formData, id: editingId, updatedAt: new Date().toISOString() }
          : a
      );
      localStorage.setItem('stock_alerts', JSON.stringify(updatedAlerts));
      setAlerts(updatedAlerts);
      toast.success('Stock alert updated successfully!');
    } else {
      const newAlert = {
        id: Date.now(),
        ...formData,
        last_triggered: null,
        createdAt: new Date().toISOString(),
      };
      const updatedAlerts = [...alerts, newAlert];
      localStorage.setItem('stock_alerts', JSON.stringify(updatedAlerts));
      setAlerts(updatedAlerts);
      toast.success('Stock alert created successfully!');
    }

    resetForm();
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
      onConfirm: () => {
        const updatedAlerts = alerts.filter(a => a.id !== id);
        localStorage.setItem('stock_alerts', JSON.stringify(updatedAlerts));
        setAlerts(updatedAlerts);
        toast.success('Stock alert deleted successfully!');
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      }
    });
  };

  const handleToggleActive = (id) => {
    const updatedAlerts = alerts.map(a =>
      a.id === id
        ? { ...a, is_active: !a.is_active, updatedAt: new Date().toISOString() }
        : a
    );
    localStorage.setItem('stock_alerts', JSON.stringify(updatedAlerts));
    setAlerts(updatedAlerts);
    toast.info('Alert status updated');
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
      onConfirm: () => {
        const updatedAlerts = alerts.filter(a => !selectedAlerts.has(a.id));
        localStorage.setItem('stock_alerts', JSON.stringify(updatedAlerts));
        setAlerts(updatedAlerts);
        setSelectedAlerts(new Set());
        toast.success('Selected alerts deleted successfully!');
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
      LOW_STOCK: 'warning',
      OUT_OF_STOCK: 'danger',
      REORDER_LEVEL: 'info',
      OVERSTOCK: 'secondary',
      NEAR_EXPIRY: 'danger',
    };
    return (
      <span className={`badge bg-light-${colors[type] || 'secondary'}`}>
        {type.replace(/_/g, ' ')}
      </span>
    );
  };

  const getNotificationBadges = (alert) => {
    const badges = [];
    if (alert.email_notification) {
      badges.push(
        <span key="email" className="badge bg-light-primary me-1">
          <i className="isax isax-sms me-1"></i>Email
        </span>
      );
    }
    if (alert.sms_notification) {
      badges.push(
        <span key="sms" className="badge bg-light-info me-1">
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
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="isax isax-add-circle5 me-1"></i>
          {showForm ? 'Cancel' : 'Add Alert'}
        </button>
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
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Item *</label>
                    <select
                      className="form-control"
                      name="item_id"
                      value={formData.item_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Item</option>
                      {items.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name} ({item.sku})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Warehouse (Optional - null = all)</label>
                    <select
                      className="form-control"
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
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Alert Type *</label>
                    <select
                      className="form-control"
                      name="alert_type"
                      value={formData.alert_type}
                      onChange={handleInputChange}
                      required
                    >
                      {ALERT_TYPES.map(type => (
                        <option key={type} value={type}>
                          {type.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Threshold Qty *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="threshold_qty"
                      value={formData.threshold_qty}
                      onChange={handleInputChange}
                      placeholder="e.g., 10"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Reorder Qty (Optional)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="reorder_qty"
                      value={formData.reorder_qty}
                      onChange={handleInputChange}
                      placeholder="e.g., 50"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Alert Frequency (hours)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="alert_frequency_hours"
                      value={formData.alert_frequency_hours}
                      onChange={handleInputChange}
                      placeholder="24"
                      min="1"
                      step="1"
                    />
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
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Alert' : 'Add Alert'}
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
                <i className="isax isax-search-normal fs-12"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by item, warehouse, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {selectedAlerts.size > 0 && (
              <button
                className="btn btn-outline-danger d-inline-flex align-items-center"
                onClick={handleDeleteSelected}
              >
                <i className="isax isax-trash me-1"></i>Delete ({selectedAlerts.size})
              </button>
            )}
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
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link href="#" className="dropdown-item" onClick={() => setFilterType('ALL')}>
                    All
                  </Link>
                </li>
                {ALERT_TYPES.map(type => (
                  <li key={type}>
                    <Link href="#" className="dropdown-item" onClick={() => setFilterType(type)}>
                      {type.replace(/_/g, ' ')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown">
              <Link
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="isax isax-sort me-1"></i>Sort By :{' '}
                <span className="fw-normal ms-1">
                  {sortBy === 'latest' ? 'Latest' : sortBy === 'oldest' ? 'Oldest' : 'Threshold'}
                </span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link href="#" className="dropdown-item" onClick={() => setSortBy('latest')}>
                    Latest
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item" onClick={() => setSortBy('oldest')}>
                    Oldest
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item" onClick={() => setSortBy('threshold')}>
                    Threshold Qty
                  </Link>
                </li>
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
                <th className="no-sort">
                  <div className="form-check form-check-md">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedAlerts.size === filteredAlerts.length && filteredAlerts.length > 0}
                    />
                  </div>
                </th>
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
              {filteredAlerts.map((alert) => (
                <tr key={alert.id}>
                  <td>
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedAlerts.has(alert.id)}
                        onChange={() => handleSelectAlert(alert.id)}
                      />
                    </div>
                  </td>
                  <td>
                    <h6 className="fs-14 fw-medium mb-0">{getItemName(alert.item_id)}</h6>
                  </td>
                  <td>
                    <span className="badge bg-light-secondary">{getWarehouseName(alert.warehouse_id)}</span>
                  </td>
                  <td>
                    {getAlertTypeBadge(alert.alert_type)}
                  </td>
                  <td>
                    <span className="badge bg-light-warning">{alert.threshold_qty} units</span>
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
                    <span className={`badge bg-light-${alert.is_active ? 'success' : 'danger'}`}>
                      {alert.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className={`btn btn-sm btn-outline-${alert.is_active ? 'danger' : 'success'}`}
                        onClick={() => handleToggleActive(alert.id)}
                        title={alert.is_active ? 'Deactivate' : 'Activate'}
                      >
                        <i className={`isax isax-${alert.is_active ? 'close' : 'tick'}-circle`}></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleEdit(alert)}
                        title="Edit"
                      >
                        <i className="isax isax-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(alert.id)}
                        title="Delete"
                      >
                        <i className="isax isax-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-3 text-muted fs-12">
        Showing {filteredAlerts.length} of {alerts.length} stock alerts
      </div>
    </>
  );
};

export default StockAlerts;
