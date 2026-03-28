import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const BatchTracking = () => {
  const [batches, setBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedBatches, setSelectedBatches] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
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
  });

  useEffect(() => {
    loadWarehouses();
    loadItems();
    loadBatches();
  }, []);

  useEffect(() => {
    filterAndSortBatches();
  }, [batches, searchTerm, sortBy]);

  const loadWarehouses = () => {
    const storedWarehouses = JSON.parse(localStorage.getItem('warehouses') || '[]');
    setWarehouses(storedWarehouses);
  };

  const loadItems = () => {
    const storedItems = JSON.parse(localStorage.getItem('items') || '[]');
    setItems(storedItems);
  };

  const loadBatches = () => {
    const storedBatches = JSON.parse(localStorage.getItem('batches') || '[]');
    setBatches(storedBatches);
  };

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
    if (batch.qty <= 0) return 'EXHAUSTED';

    const expiryStatus = calculateExpiryStatus(batch.expiry_date);
    if (expiryStatus && expiryStatus.days < 0) return 'EXPIRED';

    return 'ACTIVE';
  };

  const filterAndSortBatches = () => {
    let filtered = batches.filter(batch => {
      const item = items.find(i => i.id === parseInt(batch.item_id));
      const warehouse = warehouses.find(w => w.id === parseInt(batch.warehouse_id));
      const searchLower = searchTerm.toLowerCase();
      return (
        (item?.name || '').toLowerCase().includes(searchLower) ||
        (item?.sku || '').toLowerCase().includes(searchLower) ||
        batch.batch_number.toLowerCase().includes(searchLower) ||
        (warehouse?.name || '').toLowerCase().includes(searchLower)
      );
    });

    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.item_id || !formData.warehouse_id || !formData.batch_number || !formData.qty) {
      toast.error('Please fill all required fields');
      return;
    }

    // Check for duplicate batch number per item
    const isDuplicate = batches.some(
      b => b.batch_number === formData.batch_number &&
        b.item_id === formData.item_id &&
        b.id !== editingId
    );

    if (isDuplicate) {
      toast.error('Batch number already exists for this item');
      return;
    }

    if (editingId) {
      const updatedBatches = batches.map(b =>
        b.id === editingId
          ? { ...formData, id: editingId, updatedAt: new Date().toISOString() }
          : b
      );
      localStorage.setItem('batches', JSON.stringify(updatedBatches));
      setBatches(updatedBatches);
      toast.success('Batch updated successfully!');
    } else {
      const newBatch = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      const updatedBatches = [...batches, newBatch];
      localStorage.setItem('batches', JSON.stringify(updatedBatches));
      setBatches(updatedBatches);
      toast.success('Batch created successfully!');
    }

    resetForm();
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
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (batch) => {
    setFormData(batch);
    setEditingId(batch.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Batch',
      message: 'Are you sure you want to delete this batch? This action cannot be undone.',
      onConfirm: () => {
        const updatedBatches = batches.filter(b => b.id !== id);
        localStorage.setItem('batches', JSON.stringify(updatedBatches));
        setBatches(updatedBatches);
        toast.success('Batch deleted successfully!');
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBatches(new Set(batches.map(b => b.id)));
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
      onConfirm: () => {
        const updatedBatches = batches.filter(b => !selectedBatches.has(b.id));
        localStorage.setItem('batches', JSON.stringify(updatedBatches));
        setBatches(updatedBatches);
        setSelectedBatches(new Set());
        toast.success('Selected batches deleted successfully!');
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      }
    });
  };

  const getItemName = (itemId) => {
    const item = items.find(i => i.id === parseInt(itemId));
    return item ? `${item.name} (${item.sku})` : '-';
  };

  const getWarehouseName = (warehouseId) => {
    const warehouse = warehouses.find(w => w.id === parseInt(warehouseId));
    return warehouse ? warehouse.name : '-';
  };

  const getExpiryBadge = (batch) => {
    const expiryStatus = calculateExpiryStatus(batch.expiry_date);
    if (!expiryStatus) return null;

    return (
      <span className={`badge bg-light-${expiryStatus.color}`}>
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
    return (
      <span className={`badge bg-light-${colors[status]}`}>
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
          <h6>Batch Tracking</h6>
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
          className="btn btn-primary d-flex align-items-center"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="isax isax-add-circle5 me-1"></i>
          {showForm ? 'Cancel' : 'Add Batch'}
        </button>
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
            <h6 className="mb-3">{editingId ? 'Edit Batch' : 'Add New Batch'}</h6>
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
                    <label className="form-label">Warehouse *</label>
                    <select
                      className="form-control"
                      name="warehouse_id"
                      value={formData.warehouse_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Warehouse</option>
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
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Batch No. *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="batch_number"
                      value={formData.batch_number}
                      onChange={handleInputChange}
                      placeholder="e.g., BATCH001"
                      required
                    />
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
                      className="form-control"
                      name="qty"
                      value={formData.qty}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      required
                    />
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
                <div className="col-md-12">
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
                  {editingId ? 'Update Batch' : 'Add Batch'}
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
                  placeholder="Search by item, batch, or warehouse..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {selectedBatches.size > 0 && (
              <button
                className="btn btn-outline-danger d-inline-flex align-items-center"
                onClick={handleDeleteSelected}
              >
                <i className="isax isax-trash me-1"></i>Delete ({selectedBatches.size})
              </button>
            )}
          </div>
          <div className="dropdown">
            <Link
              href="#"
              className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-sort me-1"></i>Sort By :{' '}
              <span className="fw-normal ms-1">
                {sortBy === 'latest' ? 'Latest' : sortBy === 'oldest' ? 'Oldest' : 'Expiry'}
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
                <Link href="#" className="dropdown-item" onClick={() => setSortBy('expiry')}>
                  Expiry Date
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {filteredBatches.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="isax isax-box-tick fs-1 text-muted mb-3 d-block"></i>
            <h6 className="mb-2">No Batches Found</h6>
            <p className="text-muted mb-3">
              {batches.length === 0
                ? 'Start by adding your first batch'
                : 'No batches match your search'}
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
                      checked={selectedBatches.size === filteredBatches.length && filteredBatches.length > 0}
                    />
                  </div>
                </th>
                <th>Item</th>
                <th>Batch No.</th>
                <th>Warehouse</th>
                <th>Qty</th>
                <th>Mfg. Date</th>
                <th>Expiry Date</th>
                <th>Expiry Status</th>
                <th>Status</th>
                <th className="no-sort">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.map((batch) => (
                <tr key={batch.id}>
                  <td>
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedBatches.has(batch.id)}
                        onChange={() => handleSelectBatch(batch.id)}
                      />
                    </div>
                  </td>
                  <td>
                    <h6 className="fs-14 fw-medium mb-0">{getItemName(batch.item_id)}</h6>
                  </td>
                  <td>
                    <span className="badge bg-light-primary">{batch.batch_number}</span>
                  </td>
                  <td>{getWarehouseName(batch.warehouse_id)}</td>
                  <td>
                    <span className="badge bg-light-info">{batch.qty} units</span>
                  </td>
                  <td>
                    <p className="text-muted fs-12 mb-0">
                      {batch.mfg_date ? new Date(batch.mfg_date).toLocaleDateString() : '-'}
                    </p>
                  </td>
                  <td>
                    <p className="text-muted fs-12 mb-0">
                      {batch.expiry_date ? new Date(batch.expiry_date).toLocaleDateString() : '-'}
                    </p>
                  </td>
                  <td>
                    {getExpiryBadge(batch) || <span className="text-muted fs-12">-</span>}
                  </td>
                  <td>
                    {getStatusBadge(batch)}
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleEdit(batch)}
                        title="Edit"
                      >
                        <i className="isax isax-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(batch.id)}
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
        Showing {filteredBatches.length} of {batches.length} batches
      </div>
    </>
  );
};

export default BatchTracking;
