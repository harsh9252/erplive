import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import customerService from '../services/customerService';
import { getItems } from '../services/productService';
import { getCompanySettings, getWarehouses } from '../services/settingsService';
import { createSalesOrder, getSalesOrderById, updateSalesOrder } from '../services/salesOrderService';
import { INDIAN_STATES } from '../utils/constants';

const AddSalesOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);
  
  const [formData, setFormData] = useState({
    customer_id: '',
    order_date: new Date().toISOString().split('T')[0],
    expected_delivery: '',
    place_of_supply: '',
    reference: '',
    warehouse_id: '',
    remarks: '',
    items: [
      { 
        item_id: '', 
        description: '', 
        qty: 1, 
        rate: 0, 
        discount_pct: 0,
        warehouse_id: '' 
      }
    ]
  });

  const fetchData = useCallback(async () => {
    try {
      const [custRes, itemsRes, settingsRes, whRes] = await Promise.all([
        customerService.getCustomers(1, 1000),
        getItems(1, 1000),
        getCompanySettings(),
        getWarehouses()
      ]);
      
      setCustomers(Array.isArray(custRes.data) ? custRes.data : (custRes.data?.rows || []));
      setItems(Array.isArray(itemsRes.data) ? itemsRes.data : (itemsRes.data?.rows || []));
      setCompanySettings(settingsRes.data || settingsRes);
      setWarehouses(whRes.data || whRes || []);
      
      if (!isEditMode) {
        const defaultState = settingsRes.data?.state_code || settingsRes.state_code;
        if (defaultState) {
          setFormData(prev => ({ ...prev, place_of_supply: defaultState }));
        }
      } else {
        const orderRes = await getSalesOrderById(id);
        const order = orderRes.data || orderRes;
        setFormData({
          customer_id: order.customer_id,
          order_date: order.order_date,
          expected_delivery: order.expected_delivery || order.delivery_date || '',
          place_of_supply: order.place_of_supply || '',
          reference: order.reference || '',
          warehouse_id: order.warehouse_id || '',
          remarks: order.remarks || '',
          items: (order.items || []).map(item => ({
            item_id: item.item_id,
            description: item.description,
            qty: item.qty,
            rate: item.rate,
            discount_pct: item.discount_pct || 0,
            warehouse_id: item.warehouse_id || ''
          }))
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load required data');
    } finally {
      if (isEditMode) setLoading(false);
    }
  }, [id, isEditMode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    const customer = customers.find(c => String(c.id) === String(customerId));
    setFormData(prev => ({ 
      ...prev, 
      customer_id: customerId,
      place_of_supply: customer?.state_code || prev.place_of_supply
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === 'item_id') {
      const selectedItem = items.find(i => String(i.id) === String(value));
      if (selectedItem) {
        newItems[index].description = selectedItem.name;
        newItems[index].rate = selectedItem.price || 0;
      }
    }

    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItemRow = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { 
          item_id: '', 
          description: '', 
          qty: 1, 
          rate: 0, 
          discount_pct: 0,
          warehouse_id: prev.warehouse_id || ''
        }
      ]
    }));
  };

  const removeItemRow = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, items: newItems }));
    }
  };

  const summary = useMemo(() => {
    let subtotal = 0;
    let totalDiscount = 0;
    
    formData.items.forEach(item => {
      const amount = (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0);
      const discount = amount * (parseFloat(item.discount_pct) || 0) / 100;
      subtotal += amount;
      totalDiscount += discount;
    });

    return { subtotal, totalDiscount, netTotal: Math.round(subtotal - totalDiscount) };
  }, [formData.items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_id) {
      toast.error('Please select a customer');
      return;
    }

    setSaving(true);
    try {
      if (isEditMode) {
        await updateSalesOrder(id, formData);
        toast.success('Sales order updated successfully');
      } else {
        await createSalesOrder(formData);
        toast.success('Sales order created successfully');
      }
      navigate('/invoicing/sales-orders');
    } catch (error) {
      console.error('Error saving sales order:', error);
      toast.error(error.message || 'Failed to save sales order');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">{isEditMode ? 'Edit' : 'Create'} Sales Order</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/invoicing/sales-orders">Sales Orders</Link></li>
              <li className="breadcrumb-item active">{isEditMode ? 'Edit Order' : 'New Order'}</li>
            </ol>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h6 className="mb-0 fw-bold"><i className="isax isax-info-circle me-2 text-primary"></i>Order Information</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-600">Customer <span className="text-danger">*</span></label>
                <select className="form-select shadow-none" name="customer_id" value={formData.customer_id} onChange={handleCustomerChange} required>
                  <option value="">Select Customer</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label fw-600">Order Date <span className="text-danger">*</span></label>
                <input type="date" className="form-control shadow-none" name="order_date" value={formData.order_date} onChange={handleHeaderChange} required />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-600">Expected Delivery</label>
                <input type="date" className="form-control shadow-none" name="expected_delivery" value={formData.expected_delivery} onChange={handleHeaderChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Place of Supply <span className="text-danger">*</span></label>
                <select className="form-select shadow-none" name="place_of_supply" value={formData.place_of_supply} onChange={handleHeaderChange} required>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state.code} value={state.code}>{state.name} ({state.code})</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Warehouse</label>
                <select className="form-select shadow-none" name="warehouse_id" value={formData.warehouse_id} onChange={handleHeaderChange}>
                  <option value="">Default Warehouse</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Reference / PO No.</label>
                <input type="text" className="form-control shadow-none" name="reference" value={formData.reference} onChange={handleHeaderChange} placeholder="Enter PO reference..." />
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold"><i className="isax isax-box me-2 text-primary"></i>Order Items</h6>
            <button type="button" className="btn btn-primary btn-sm rounded-pill px-3" onClick={addItemRow}>
              <i className="isax isax-add me-1"></i>Add Item
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-nowrap align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th style={{ width: '40%' }}>Item / Description</th>
                    <th style={{ width: '10%' }}>Qty</th>
                    <th style={{ width: '15%' }}>Rate</th>
                    <th style={{ width: '10%' }}>Disc %</th>
                    <th style={{ width: '15%' }}>Amount</th>
                    <th className="text-center" style={{ width: '50px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <select className="form-select shadow-none border-0 bg-transparent" value={item.item_id} onChange={(e) => handleItemChange(index, 'item_id', e.target.value)} required>
                          <option value="">Select Item</option>
                          {items.map(i => (
                            <option key={i.id} value={i.id}>{i.name}</option>
                          ))}
                        </select>
                        <input type="text" className="form-control shadow-none border-0 bg-transparent fs-12 text-muted mt-n2" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Item note..." />
                      </td>
                      <td>
                        <input type="number" className="form-control shadow-none border-0 bg-transparent text-center" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} min="0.1" step="any" required />
                      </td>
                      <td>
                        <input type="number" className="form-control shadow-none border-0 bg-transparent" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} step="any" required />
                      </td>
                      <td>
                        <input type="number" className="form-control shadow-none border-0 bg-transparent" value={item.discount_pct} onChange={(e) => handleItemChange(index, 'discount_pct', e.target.value)} step="any" />
                      </td>
                      <td className="fw-bold text-dark">
                        ₹{((item.qty * item.rate) * (1 - (item.discount_pct || 0) / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="text-center">
                        <button type="button" className="btn btn-icon-sm text-danger border-0 h-100" onClick={() => removeItemRow(index)}>
                          <i className="isax isax-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <label className="form-label fw-600">Order Remarks</label>
                <textarea className="form-control shadow-none" name="remarks" value={formData.remarks} onChange={handleHeaderChange} rows="5" placeholder="Internal notes or terms..."></textarea>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm bg-primary bg-opacity-10 h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Order Summary</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Gross Amount</span>
                  <span className="fw-bold">₹{summary.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Total Discount</span>
                  <span className="fw-bold text-danger">- ₹{summary.totalDiscount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <hr className="my-3 border-primary opacity-20" />
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="h5 fw-bold mb-0">Order Total</span>
                  <span className="h4 fw-bold mb-0 text-primary">₹{summary.netTotal.toLocaleString()}</span>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <button type="button" className="btn btn-outline-white w-100 rounded-pill border py-2 shadow-none" onClick={() => navigate('/invoicing/sales-orders')}>Cancel</button>
                  </div>
                  <div className="col-6">
                    <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 shadow-none" disabled={saving}>
                      {saving ? 'Saving...' : (isEditMode ? 'Update Order' : 'Create Order')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSalesOrder;
