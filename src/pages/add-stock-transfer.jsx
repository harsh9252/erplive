import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { transferStock } from '../services/inventoryService';
import { getWarehouses } from '../services/settingsService';
import { getItems } from '../services/itemService';
import { getStockSummaryReport } from '../services/reportService';
import SearchableSelect from '../components/SearchableSelect';

const AddStockTransfer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  const [stockSummary, setStockSummary] = useState([]);

  const [formData, setFormData] = useState({
    from_warehouse_id: '',
    to_warehouse_id: '',
    transfer_date: new Date().toISOString().split('T')[0],
    item_id: '',
    qty: '',
    remarks: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [warehouseRes, itemsRes, stockRes] = await Promise.all([
          getWarehouses(),
          getItems(1, 1000), // Fetch all items for the dropdown
          getStockSummaryReport()
        ]);
        
        setWarehouses(warehouseRes.data || warehouseRes || []);
        setItems(itemsRes.data || itemsRes || []);
        setStockSummary(stockRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load warehouses or items');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (itemId) => {
    setFormData(prev => ({ ...prev, item_id: itemId }));
  };

  const availableStock = (() => {
    if (!formData.item_id || !formData.from_warehouse_id) return null;
    const selectedWarehouse = warehouses.find(w => String(w.id) === String(formData.from_warehouse_id));
    if (!selectedWarehouse) return 0;
    
    const stockItem = stockSummary.find(s => 
      String(s.id) === String(formData.item_id) && 
      s.warehouse === selectedWarehouse.name
    );
    
    return stockItem ? Number(stockItem.current_stock) : 0;
  })();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.item_id) {
      toast.error('Please select an item');
      return;
    }

    if (formData.from_warehouse_id === formData.to_warehouse_id) {
      toast.error('Source and destination warehouses cannot be the same');
      return;
    }

    if (availableStock !== null && Number(formData.qty) > availableStock) {
      toast.error(`Insufficient stock in source warehouse. Available: ${availableStock}`);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        item_id: Number(formData.item_id),
        from_warehouse_id: Number(formData.from_warehouse_id),
        to_warehouse_id: Number(formData.to_warehouse_id),
        qty: Number(formData.qty)
      };
      
      await transferStock(payload);
      toast.success('Stock transfer completed successfully');
      navigate('/inventory/stock-summary');
    } catch (error) {
      console.error('Error transferring stock:', error);
      toast.error(error.message || 'Failed to complete stock transfer');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Stock Transfer</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/inventory/stock-summary">Inventory</Link></li>
              <li className="breadcrumb-item active text-muted">New Transfer</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit}>
            <div className="card border-0 shadow-sm overflow-hidden rounded-4">
              <div className="card-header bg-white py-3 border-bottom-light">
                <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
                  <i className="isax isax-arrow-swap-horizontal me-2 text-primary fs-18"></i>
                  Transfer Details
                </h6>
              </div>
              <div className="card-body p-4">
                <div className="row g-4">
                  {/* Warehouses */}
                  <div className="col-md-6">
                    <label className="form-label fw-600 text-dark">From Warehouse <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <i className="isax isax-box-send fs-16"></i>
                      </span>
                      <select 
                        className="form-select shadow-none border-0 bg-light" 
                        name="from_warehouse_id" 
                        value={formData.from_warehouse_id} 
                        onChange={handleInputChange} 
                        required
                      >
                        <option value="">Select Warehouse</option>
                        {warehouses.map(w => (
                          <option key={w.id} value={w.id}>{w.name} ({w.code})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-600 text-dark">To Warehouse <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <i className="isax isax-box-receive fs-16"></i>
                      </span>
                      <select 
                        className="form-select shadow-none border-0 bg-light" 
                        name="to_warehouse_id" 
                        value={formData.to_warehouse_id} 
                        onChange={handleInputChange} 
                        required
                      >
                        <option value="">Select Warehouse</option>
                        {warehouses.map(w => (
                          <option key={w.id} value={w.id}>{w.name} ({w.code})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date and Item */}
                  <div className="col-md-6">
                    <label className="form-label fw-600 text-dark">Transfer Date <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <i className="isax isax-calendar-1 fs-16"></i>
                      </span>
                      <input 
                        type="date" 
                        className="form-control shadow-none border-0 bg-light" 
                        name="transfer_date" 
                        value={formData.transfer_date} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-600 text-dark">Item <span className="text-danger">*</span></label>
                    <SearchableSelect 
                      options={items.map(i => ({ value: i.id, label: `${i.name} (${i.sku || 'No SKU'})` }))}
                      value={formData.item_id}
                      onChange={handleItemChange}
                      placeholder="Search and select item"
                      className="bg-light border-0 rounded"
                    />
                  </div>

                  {/* Quantity */}
                  <div className="col-md-6">
                    <label className="form-label fw-600 text-dark d-flex align-items-center">
                      Quantity <span className="text-danger ms-1">*</span>
                      {availableStock !== null && (
                        <span className={`ms-auto badge ${availableStock > 0 ? 'bg-success' : 'bg-danger'}`}>
                          Available: {availableStock}
                        </span>
                      )}
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <i className="isax isax-hierarchy fs-16"></i>
                      </span>
                      <input 
                        type="number" 
                        className="form-control shadow-none border-0 bg-light" 
                        name="qty" 
                        value={formData.qty} 
                        onChange={handleInputChange} 
                        min="1"
                        placeholder="0.00"
                        required 
                      />
                    </div>
                  </div>

                  {/* Remarks */}
                  <div className="col-12">
                    <label className="form-label fw-600 text-dark">Remarks</label>
                    <textarea 
                      className="form-control shadow-none bg-light border-0" 
                      name="remarks" 
                      value={formData.remarks} 
                      onChange={handleInputChange} 
                      rows="3" 
                      placeholder="Add any internal notes..."
                    ></textarea>
                  </div>
                </div>

                <div className="mt-5 d-flex gap-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary px-5 py-2 rounded-pill shadow-sm d-flex align-items-center"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="isax isax-tick-circle me-2 fs-18"></i>
                        Confirm Transfer
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-white border px-5 py-2 rounded-pill"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStockTransfer;
