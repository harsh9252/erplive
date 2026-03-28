import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const StockTransfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [filteredTransfers, setFilteredTransfers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedTransfers, setSelectedTransfers] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null, message: '', title: '' });

  const [formData, setFormData] = useState({
    from_warehouse_id: '',
    to_warehouse_id: '',
    transfer_date: new Date().toISOString().split('T')[0],
    items: [{ item_id: '', qty: '', batch_id: '' }],
    remarks: '',
  });

  useEffect(() => {
    loadWarehouses();
    loadItems();
    loadTransfers();
  }, []);

  useEffect(() => {
    filterAndSortTransfers();
  }, [transfers, searchTerm, sortBy]);

  const loadWarehouses = () => {
    const storedWarehouses = JSON.parse(localStorage.getItem('warehouses') || '[]');
    setWarehouses(storedWarehouses);
  };

  const loadItems = () => {
    const storedItems = JSON.parse(localStorage.getItem('items') || '[]');
    setItems(storedItems);
  };

  const loadTransfers = () => {
    const storedTransfers = JSON.parse(localStorage.getItem('stockTransfers') || '[]');
    setTransfers(storedTransfers);
  };

  const filterAndSortTransfers = () => {
    let filtered = transfers.filter(transfer => {
      const fromWarehouse = warehouses.find(w => w.id === parseInt(transfer.from_warehouse_id));
      const toWarehouse = warehouses.find(w => w.id === parseInt(transfer.to_warehouse_id));
      const searchLower = searchTerm.toLowerCase();
      return (
        (fromWarehouse?.name || '').toLowerCase().includes(searchLower) ||
        (toWarehouse?.name || '').toLowerCase().includes(searchLower) ||
        transfer.transfer_date.includes(searchTerm)
      );
    });

    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.transfer_date) - new Date(a.transfer_date));
    }

    setFilteredTransfers(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setFormData(prev => ({
      ...prev,
      items: newItems,
    }));
  };

  const addItemRow = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { item_id: '', qty: '', batch_id: '' }],
    }));
  };

  const removeItemRow = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.from_warehouse_id || !formData.to_warehouse_id) {
      toast.error('Please select both From and To warehouses');
      return;
    }

    if (formData.from_warehouse_id === formData.to_warehouse_id) {
      toast.error('From and To warehouses cannot be the same');
      return;
    }

    if (!formData.transfer_date) {
      toast.error('Please select a transfer date');
      return;
    }

    if (formData.items.length === 0 || formData.items.some(item => !item.item_id || !item.qty)) {
      toast.error('Please add at least one item with quantity');
      return;
    }

    if (editingId) {
      const updatedTransfers = transfers.map(t =>
        t.id === editingId
          ? { ...formData, id: editingId, updatedAt: new Date().toISOString() }
          : t
      );
      localStorage.setItem('stockTransfers', JSON.stringify(updatedTransfers));
      setTransfers(updatedTransfers);
      toast.success('Stock transfer updated successfully!');
    } else {
      const newTransfer = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      const updatedTransfers = [...transfers, newTransfer];
      localStorage.setItem('stockTransfers', JSON.stringify(updatedTransfers));
      setTransfers(updatedTransfers);
      toast.success('Stock transfer created successfully!');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      from_warehouse_id: '',
      to_warehouse_id: '',
      transfer_date: new Date().toISOString().split('T')[0],
      items: [{ item_id: '', qty: '', batch_id: '' }],
      remarks: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (transfer) => {
    setFormData(transfer);
    setEditingId(transfer.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Stock Transfer',
      message: 'Are you sure you want to delete this stock transfer? This action cannot be undone.',
      onConfirm: () => {
        const updatedTransfers = transfers.filter(t => t.id !== id);
        localStorage.setItem('stockTransfers', JSON.stringify(updatedTransfers));
        setTransfers(updatedTransfers);
        toast.success('Stock transfer deleted successfully!');
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTransfers(new Set(transfers.map(t => t.id)));
    } else {
      setSelectedTransfers(new Set());
    }
  };

  const handleSelectTransfer = (id) => {
    const newSelected = new Set(selectedTransfers);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTransfers(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedTransfers.size === 0) {
      toast.warning('Please select transfers to delete');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Selected Transfers',
      message: `Are you sure you want to delete ${selectedTransfers.size} transfer(s)?`,
      onConfirm: () => {
        const updatedTransfers = transfers.filter(t => !selectedTransfers.has(t.id));
        localStorage.setItem('stockTransfers', JSON.stringify(updatedTransfers));
        setTransfers(updatedTransfers);
        setSelectedTransfers(new Set());
        toast.success('Selected transfers deleted successfully!');
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      }
    });
  };

  const getWarehouseName = (warehouseId) => {
    const warehouse = warehouses.find(w => w.id === parseInt(warehouseId));
    return warehouse ? warehouse.name : '-';
  };

  const getItemName = (itemId) => {
    const item = items.find(i => i.id === parseInt(itemId));
    return item ? item.name : '-';
  };

  const getTotalItems = (transferItems) => {
    return transferItems.reduce((sum, item) => sum + (parseInt(item.qty) || 0), 0);
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
          <h6>Stock Transfers</h6>
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
              <li className="breadcrumb-item active">Stock Transfers</li>
            </ol>
          </nav>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="isax isax-add-circle5 me-1"></i>
          {showForm ? 'Cancel' : 'New Transfer'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="mb-3">{editingId ? 'Edit Stock Transfer' : 'Create New Stock Transfer'}</h6>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">From Warehouse *</label>
                    <select
                      className="form-control"
                      name="from_warehouse_id"
                      value={formData.from_warehouse_id}
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
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">To Warehouse *</label>
                    <select
                      className="form-control"
                      name="to_warehouse_id"
                      value={formData.to_warehouse_id}
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
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Transfer Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      name="transfer_date"
                      value={formData.transfer_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-3">
                <label className="form-label">Items to Transfer *</label>
                <div className="table-responsive">
                  <table className="table table-sm table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Batch</th>
                        <th style={{ width: '50px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <select
                              className="form-control form-control-sm"
                              value={item.item_id}
                              onChange={(e) => handleItemChange(index, 'item_id', e.target.value)}
                              required
                            >
                              <option value="">Select Item</option>
                              {items.map(i => (
                                <option key={i.id} value={i.id}>
                                  {i.name} ({i.sku})
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={item.qty}
                              onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                              placeholder="Qty"
                              min="1"
                              required
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={item.batch_id}
                              onChange={(e) => handleItemChange(index, 'batch_id', e.target.value)}
                              placeholder="Batch ID"
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeItemRow(index)}
                              disabled={formData.items.length === 1}
                            >
                              <i className="isax isax-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={addItemRow}
                >
                  <i className="isax isax-add-circle5 me-1"></i>Add Item
                </button>
              </div>

              <div className="mb-3">
                <label className="form-label">Remarks</label>
                <textarea
                  className="form-control"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  placeholder="Enter any remarks or notes"
                  rows="3"
                ></textarea>
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
                  {editingId ? 'Update Transfer' : 'Create Transfer'}
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
                  placeholder="Search by warehouse or date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {selectedTransfers.size > 0 && (
              <button
                className="btn btn-outline-danger d-inline-flex align-items-center"
                onClick={handleDeleteSelected}
              >
                <i className="isax isax-trash me-1"></i>Delete ({selectedTransfers.size})
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
                {sortBy === 'latest' ? 'Latest' : sortBy === 'oldest' ? 'Oldest' : 'Date'}
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
                <Link href="#" className="dropdown-item" onClick={() => setSortBy('date')}>
                  Transfer Date
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {filteredTransfers.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="isax isax-arrow-swap-horizontal fs-1 text-muted mb-3 d-block"></i>
            <h6 className="mb-2">No Stock Transfers Found</h6>
            <p className="text-muted mb-3">
              {transfers.length === 0
                ? 'Start by creating your first stock transfer'
                : 'No transfers match your search'}
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
                      checked={selectedTransfers.size === filteredTransfers.length && filteredTransfers.length > 0}
                    />
                  </div>
                </th>
                <th>Transfer Date</th>
                <th>From Warehouse</th>
                <th>To Warehouse</th>
                <th>Items</th>
                <th>Total Qty</th>
                <th>Remarks</th>
                <th className="no-sort">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransfers.map((transfer) => (
                <tr key={transfer.id}>
                  <td>
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedTransfers.has(transfer.id)}
                        onChange={() => handleSelectTransfer(transfer.id)}
                      />
                    </div>
                  </td>
                  <td>
                    <h6 className="fs-14 fw-medium mb-0">
                      {new Date(transfer.transfer_date).toLocaleDateString()}
                    </h6>
                  </td>
                  <td>
                    <span className="badge bg-light-info">
                      {getWarehouseName(transfer.from_warehouse_id)}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-light-success">
                      {getWarehouseName(transfer.to_warehouse_id)}
                    </span>
                  </td>
                  <td>
                    <p className="text-muted fs-12 mb-0">
                      {transfer.items.length} item(s)
                    </p>
                  </td>
                  <td>
                    <span className="badge bg-light-primary">
                      {getTotalItems(transfer.items)} units
                    </span>
                  </td>
                  <td>
                    <p className="text-muted fs-12 mb-0">
                      {transfer.remarks ? transfer.remarks.substring(0, 30) + '...' : '-'}
                    </p>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleEdit(transfer)}
                        title="Edit"
                      >
                        <i className="isax isax-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(transfer.id)}
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
        Showing {filteredTransfers.length} of {transfers.length} stock transfers
      </div>
    </>
  );
};

export default StockTransfers;
