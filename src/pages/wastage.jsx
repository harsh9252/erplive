import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDialog from '../components/ConfirmDialog';
import SearchableSelect from '../components/SearchableSelect';
import { getWastages, createWastage, approveWastage, rejectWastage } from '../services/wastageService';
import { getWarehouses } from '../services/settingsService';
import { getItems } from '../services/itemService';

const Wastage = () => {
  const [wastages, setWastages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  
  // Filters & Pagination
  const [filterStatus, setFilterStatus] = useState('PENDING');
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  
  const [showForm, setShowForm] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ 
    isOpen: false, 
    onConfirm: null, 
    message: '', 
    title: '', 
    type: 'danger',
    showRemarks: false,
    remarksValue: ''
  });

  const [formData, setFormData] = useState({
    item_id: '',
    warehouse_id: '',
    qty: '',
    wastage_date: new Date().toISOString().split('T')[0],
    reason: '',
    remarks: '',
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getWastages({ 
        page, 
        limit, 
        status: filterStatus === 'ALL' ? undefined : filterStatus 
      });
      setWastages(response.data || []);
      setTotalItems(response.pagination?.total || response.data?.length || 0);
    } catch (error) {
      console.error('Error loading wastages:', error);
      toast.error('Failed to load wastage records');
    } finally {
      setLoading(false);
    }
  }, [page, limit, filterStatus]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [wRes, iRes] = await Promise.all([getWarehouses(), getItems(1, 1000)]);
        setWarehouses(wRes.data || wRes || []);
        setItems(iRes.data || iRes || []);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };
    fetchMetadata();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (itemId) => {
    setFormData(prev => ({ ...prev, item_id: itemId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.item_id || !formData.warehouse_id || !formData.qty || !formData.reason) {
      toast.error('Please fill all required fields');
      return;
    }

    setSaving(true);
    try {
      await createWastage({
        ...formData,
        item_id: Number(formData.item_id),
        warehouse_id: Number(formData.warehouse_id),
        qty: Number(formData.qty)
      });
      toast.success('Wastage record created successfully');
      setShowForm(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error creating wastage:', error);
      toast.error(error.message || 'Failed to create wastage record');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      item_id: '',
      warehouse_id: '',
      qty: '',
      wastage_date: new Date().toISOString().split('T')[0],
      reason: '',
      remarks: '',
    });
  };

  const handleApproveAction = (wastage) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Approve Wastage',
      message: `Are you sure you want to approve wastage for ${getItemName(wastage.item_id)}? This will create a stock OUT entry.`,
      type: 'success',
      showRemarks: true,
      remarksValue: 'Verified',
      onConfirm: async (remarks) => {
        try {
          await approveWastage(wastage.id, remarks || 'Verified');
          toast.success('Wastage approved successfully');
          loadData();
        } catch (error) {
          toast.error(error.message || 'Failed to approve wastage');
        }
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleRejectAction = (wastage) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Reject Wastage',
      message: `Are you sure you want to reject this wastage request?`,
      type: 'danger',
      showRemarks: true,
      remarksValue: 'Not proven',
      onConfirm: async (remarks) => {
        try {
          await rejectWastage(wastage.id, remarks || 'Not proven');
          toast.success('Wastage rejected');
          loadData();
        } catch (error) {
          toast.error(error.message || 'Failed to reject wastage');
        }
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const getItemName = (itemId) => {
    const item = items.find(i => i.id === Number(itemId));
    return item ? item.name : `Item #${itemId}`;
  };

  const getWarehouseName = (warehouseId) => {
    const warehouse = warehouses.find(w => w.id === Number(warehouseId));
    return warehouse ? warehouse.name : `Warehouse #${warehouseId}`;
  };

  const getStatusBadge = (status) => {
    const classes = {
      PENDING: 'bg-light-warning text-warning',
      APPROVED: 'bg-light-success text-success',
      REJECTED: 'bg-light-danger text-danger'
    };
    return <span className={`badge ${classes[status] || 'bg-light-secondary text-secondary'}`}>{status}</span>;
  };

  return (
    <div className="container-fluid py-4">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={() => confirmDialog.onConfirm(confirmDialog.remarksValue)}
        message={
          <>
            <p>{confirmDialog.message}</p>
            {confirmDialog.showRemarks && (
              <div className="mt-3">
                <label className="form-label fs-13 fw-600">Remarks</label>
                <textarea 
                  className="form-control" 
                  rows="2" 
                  value={confirmDialog.remarksValue}
                  onChange={(e) => setConfirmDialog(prev => ({ ...prev, remarksValue: e.target.value }))}
                ></textarea>
              </div>
            )}
          </>
        }
        title={confirmDialog.title}
        type={confirmDialog.type}
      />

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Wastage / Scrap Management</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/inventory/stock-summary">Inventory</Link></li>
              <li className="breadcrumb-item active text-muted">Wastage</li>
            </ol>
          </nav>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center rounded-pill px-4"
          onClick={() => setShowForm(!showForm)}
        >
          <i className={`isax ${showForm ? 'isax-close-circle' : 'isax-add-circle5'} me-2 fs-18`}></i>
          {showForm ? 'Close Form' : 'Add Wastage'}
        </button>
      </div>

      {showForm && (
        <div className="card border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
          <div className="card-header bg-white py-3 border-bottom-light">
            <h6 className="mb-0 fw-bold text-dark">Create Wastage Record</h6>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-600 text-dark">Item <span className="text-danger">*</span></label>
                  <SearchableSelect 
                    options={items.map(i => ({ value: i.id, label: `${i.name} (${i.sku || 'No SKU'})` }))}
                    value={formData.item_id}
                    onChange={handleItemChange}
                    placeholder="Search item..."
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-600 text-dark">Warehouse <span className="text-danger">*</span></label>
                  <select 
                    className="form-select shadow-none border-0 bg-light py-2" 
                    name="warehouse_id" 
                    value={formData.warehouse_id} 
                    onChange={handleInputChange} 
                    required
                  >
                    <option value="">Select Warehouse</option>
                    {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-600 text-dark">Quantity <span className="text-danger">*</span></label>
                  <input 
                    type="number" 
                    className="form-control shadow-none border-0 bg-light py-2" 
                    name="qty" 
                    value={formData.qty} 
                    onChange={handleInputChange} 
                    placeholder="0.00" 
                    required 
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-600 text-dark">Wastage Date <span className="text-danger">*</span></label>
                  <input 
                    type="date" 
                    className="form-control shadow-none border-0 bg-light py-2" 
                    name="wastage_date" 
                    value={formData.wastage_date} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-600 text-dark">Reason <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    className="form-control shadow-none border-0 bg-light py-2" 
                    name="reason" 
                    value={formData.reason} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Damaged" 
                    required 
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-600 text-dark">Remarks</label>
                  <textarea 
                    className="form-control shadow-none border-0 bg-light" 
                    name="remarks" 
                    value={formData.remarks} 
                    onChange={handleInputChange} 
                    rows="2" 
                    placeholder="Additional notes..."
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 d-flex gap-2">
                <button type="submit" className="btn btn-primary px-4 rounded-pill" disabled={saving}>
                  {saving ? 'Processing...' : 'Submit Wastage'}
                </button>
                <button type="button" className="btn btn-outline-secondary px-4 rounded-pill" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white py-3 d-flex align-items-center justify-content-between border-bottom-light">
          <h6 className="mb-0 fw-bold text-dark">Wastage Records</h6>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm shadow-none border-0 bg-light w-auto"
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-nowrap align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Date</th>
                  <th>Item</th>
                  <th>Warehouse</th>
                  <th>Qty</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" className="text-center py-5"><div className="spinner-border text-primary spinner-border-sm me-2"></div>Loading...</td></tr>
                ) : wastages.length > 0 ? (
                  wastages.map(w => (
                    <tr key={w.id}>
                      <td className="ps-4 fs-13">{new Date(w.wastage_date).toLocaleDateString()}</td>
                      <td className="fw-500 text-dark">{getItemName(w.item_id)}</td>
                      <td>{getWarehouseName(w.warehouse_id)}</td>
                      <td><span className="fw-600 text-primary">{w.qty || w.quantity}</span></td>
                      <td className="text-muted fs-13 w-25">{w.reason}</td>
                      <td>{getStatusBadge(w.status || w.approval_status)}</td>
                      <td className="text-end pe-4">
                        {(w.status === 'PENDING' || w.approval_status === 'PENDING') && (
                          <div className="d-flex justify-content-end align-items-center gap-2">
                            <button 
                              className="btn btn-sm btn-soft-success border-0" 
                              onClick={() => handleApproveAction(w)}
                              title="Approve Wastage"
                            >
                              <i className="isax isax-tick-circle fs-16"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-soft-danger border-0" 
                              onClick={() => handleRejectAction(w)}
                              title="Reject Wastage"
                            >
                              <i className="isax isax-close-circle fs-16"></i>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7" className="text-center py-5 text-muted">No records found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {totalItems > limit && (
          <div className="card-footer bg-white border-top-light py-3 d-flex justify-content-between align-items-center">
            <div className="fs-13 text-muted">Showing {wastages.length} of {totalItems}</div>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link shadow-none" onClick={() => setPage(p => p - 1)} disabled={page === 1}>Previous</button>
                </li>
                <li className="page-item active"><span className="page-link">{page}</span></li>
                <li className={`page-item ${wastages.length < limit ? 'disabled' : ''}`}>
                  <button className="page-link shadow-none" onClick={() => setPage(p => p + 1)} disabled={wastages.length < limit}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wastage;
