import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const SerialNumbers = () => {
  const [serials, setSerials] = useState([]);
  const [filteredSerials, setFilteredSerials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedSerials, setSelectedSerials] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
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
  });

  const STATUS_OPTIONS = [
    'IN_STOCK',
    'SOLD',
    'IN_TRANSIT',
    'DAMAGED',
    'SCRAPPED',
    'WARRANTY_CLAIM',
  ];

  useEffect(() => {
    loadWarehouses();
    loadItems();
    loadBatches();
    loadPurchases();
    loadSerials();
  }, []);

  useEffect(() => {
    filterAndSortSerials();
  }, [serials, searchTerm, sortBy]);

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

  const loadPurchases = () => {
    const storedPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    setPurchases(storedPurchases);
  };

  const loadSerials = () => {
    const storedSerials = JSON.parse(localStorage.getItem('serial_numbers') || '[]');
    setSerials(storedSerials);
  };

  const filterAndSortSerials = () => {
    let filtered = serials.filter(serial => {
      const item = items.find(i => i.id === parseInt(serial.item_id));
      const warehouse = warehouses.find(w => w.id === parseInt(serial.warehouse_id));
      const searchLower = searchTerm.toLowerCase();
      return (
        (item?.name || '').toLowerCase().includes(searchLower) ||
        (item?.sku || '').toLowerCase().includes(searchLower) ||
        serial.serial_number.toLowerCase().includes(searchLower) ||
        (serial.imei_number || '').toLowerCase().includes(searchLower) ||
        (warehouse?.name || '').toLowerCase().includes(searchLower) ||
        serial.status.toLowerCase().includes(searchLower)
      );
    });

    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.item_id || !formData.warehouse_id || !formData.serial_number) {
      toast.error('Please fill all required fields');
      return;
    }

    // Check for duplicate serial number
    const isDuplicate = serials.some(
      s => s.serial_number === formData.serial_number && s.id !== editingId
    );

    if (isDuplicate) {
      toast.error('Serial number already exists');
      return;
    }

    if (editingId) {
      const updatedSerials = serials.map(s =>
        s.id === editingId
          ? { ...formData, id: editingId, updatedAt: new Date().toISOString() }
          : s
      );
      localStorage.setItem('serial_numbers', JSON.stringify(updatedSerials));
      setSerials(updatedSerials);
      toast.success('Serial number updated successfully!');
    } else {
      const newSerial = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      const updatedSerials = [...serials, newSerial];
      localStorage.setItem('serial_numbers', JSON.stringify(updatedSerials));
      setSerials(updatedSerials);
      toast.success('Serial number created successfully!');
    }

    resetForm();
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
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (serial) => {
    setFormData(serial);
    setEditingId(serial.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Serial Number',
      message: 'Are you sure you want to delete this serial number? This action cannot be undone.',
      onConfirm: () => {
        const updatedSerials = serials.filter(s => s.id !== id);
        localStorage.setItem('serial_numbers', JSON.stringify(updatedSerials));
        setSerials(updatedSerials);
        toast.success('Serial number deleted successfully!');
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSerials(new Set(serials.map(s => s.id)));
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
      title: 'Delete Selected Serial Numbers',
      message: `Are you sure you want to delete ${selectedSerials.size} serial number(s)?`,
      onConfirm: () => {
        const updatedSerials = serials.filter(s => !selectedSerials.has(s.id));
        localStorage.setItem('serial_numbers', JSON.stringify(updatedSerials));
        setSerials(updatedSerials);
        setSelectedSerials(new Set());
        toast.success('Selected serial numbers deleted successfully!');
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

  const getBatchNumber = (batchId) => {
    if (!batchId) return '-';
    const batch = batches.find(b => b.id === parseInt(batchId));
    return batch ? batch.batch_number : '-';
  };

  const getPurchaseInvoiceNo = (purchaseId) => {
    if (!purchaseId) return '-';
    const purchase = purchases.find(p => p.id === parseInt(purchaseId));
    return purchase ? purchase.invoice_no : '-';
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
    return (
      <span className={`badge bg-light-${colors[status] || 'secondary'}`}>
        {status.replace(/_/g, ' ')}
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
          <h6>Serial Numbers</h6>
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
              <li className="breadcrumb-item active">Serial Numbers</li>
            </ol>
          </nav>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="isax isax-add-circle5 me-1"></i>
          {showForm ? 'Cancel' : 'Add Serial Number'}
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
            <h6 className="mb-3">{editingId ? 'Edit Serial Number' : 'Add New Serial Number'}</h6>
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
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Serial No. *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="serial_number"
                      value={formData.serial_number}
                      onChange={handleInputChange}
                      placeholder="e.g., SN-001-2024"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">IMEI (Electronics)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="imei_number"
                      value={formData.imei_number}
                      onChange={handleInputChange}
                      placeholder="e.g., 123456789012345"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Batch</label>
                    <select
                      className="form-control"
                      name="batch_id"
                      value={formData.batch_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Batch (Optional)</option>
                      {batches.map(batch => (
                        <option key={batch.id} value={batch.id}>
                          {batch.batch_number}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Purchase Invoice</label>
                    <select
                      className="form-control"
                      name="purchase_invoice_id"
                      value={formData.purchase_invoice_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Purchase Invoice (Optional)</option>
                      {purchases.map(purchase => (
                        <option key={purchase.id} value={purchase.id}>
                          {purchase.invoice_no}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Warranty Period (months)</label>
                    <input
                      type="number"
                      className="form-control"
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
                    <label className="form-label">Warranty Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="warranty_start_date"
                      value={formData.warranty_start_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Warranty End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="warranty_end_date"
                      value={formData.warranty_end_date}
                      onChange={handleInputChange}
                      disabled
                      title="Auto-calculated from start date and period"
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
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>
                          {status.replace(/_/g, ' ')}
                        </option>
                      ))}
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
                  {editingId ? 'Update Serial Number' : 'Add Serial Number'}
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
                  placeholder="Search by serial, IMEI, item, or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {selectedSerials.size > 0 && (
              <button
                className="btn btn-outline-danger d-inline-flex align-items-center"
                onClick={handleDeleteSelected}
              >
                <i className="isax isax-trash me-1"></i>Delete ({selectedSerials.size})
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
                {sortBy === 'latest' ? 'Latest' : sortBy === 'oldest' ? 'Oldest' : 'Warranty'}
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
                <Link href="#" className="dropdown-item" onClick={() => setSortBy('warranty')}>
                  Warranty End Date
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {filteredSerials.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="isax isax-box-tick fs-1 text-muted mb-3 d-block"></i>
            <h6 className="mb-2">No Serial Numbers Found</h6>
            <p className="text-muted mb-3">
              {serials.length === 0
                ? 'Start by adding your first serial number'
                : 'No serial numbers match your search'}
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
                      checked={selectedSerials.size === filteredSerials.length && filteredSerials.length > 0}
                    />
                  </div>
                </th>
                <th>Item</th>
                <th>Serial No.</th>
                <th>IMEI</th>
                <th>Warehouse</th>
                <th>Batch</th>
                <th>Status</th>
                <th>Warranty</th>
                <th className="no-sort">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSerials.map((serial) => {
                const warrantyStatus = getWarrantyStatus(serial);
                return (
                  <tr key={serial.id}>
                    <td>
                      <div className="form-check form-check-md">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedSerials.has(serial.id)}
                          onChange={() => handleSelectSerial(serial.id)}
                        />
                      </div>
                    </td>
                    <td>
                      <h6 className="fs-14 fw-medium mb-0">{getItemName(serial.item_id)}</h6>
                    </td>
                    <td>
                      <span className="badge bg-light-primary">{serial.serial_number}</span>
                    </td>
                    <td>
                      <p className="text-muted fs-12 mb-0">{serial.imei_number || '-'}</p>
                    </td>
                    <td>{getWarehouseName(serial.warehouse_id)}</td>
                    <td>
                      <span className="badge bg-light-secondary">{getBatchNumber(serial.batch_id)}</span>
                    </td>
                    <td>
                      {getStatusBadge(serial.status)}
                    </td>
                    <td>
                      {warrantyStatus ? (
                        <span className={`badge bg-light-${warrantyStatus.color}`}>
                          {warrantyStatus.status}
                        </span>
                      ) : (
                        <span className="text-muted fs-12">-</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => handleEdit(serial)}
                          title="Edit"
                        >
                          <i className="isax isax-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(serial.id)}
                          title="Delete"
                        >
                          <i className="isax isax-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-3 text-muted fs-12">
        Showing {filteredSerials.length} of {serials.length} serial numbers
      </div>
    </>
  );
};

export default SerialNumbers;
