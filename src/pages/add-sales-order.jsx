import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import customerService from '../services/customerService';
import { getItems } from '../services/productService';
import { getCompanySettings, getWarehouses } from '../services/settingsService';
import { createSalesOrder, getSalesOrderById, updateSalesOrder } from '../services/salesOrderService';
import { getProformaInvoices, getProformaInvoiceById } from '../services/proformaInvoiceService';
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
  const [proformaInvoices, setProformaInvoices] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    customer_id: '',
    order_date: new Date().toISOString().split('T')[0],
    expected_delivery: '',
    place_of_supply: '',
    reference: '',
    proforma_invoice_id: '',
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
      const [custRes, itemsRes, settingsRes, whRes, proformaRes] = await Promise.all([
        customerService.getCustomers(1, 1000),
        getItems(1, 1000),
        getCompanySettings(),
        getWarehouses(),
        getProformaInvoices()
      ]);

      const customerList = Array.isArray(custRes.data) ? custRes.data : (custRes.data?.rows || []);
      const itemList = Array.isArray(itemsRes.data) ? itemsRes.data : (itemsRes.data?.rows || []);
      const settings = settingsRes.data || settingsRes;
      const warehouseList = whRes.data || whRes || [];
      const proformaList = Array.isArray(proformaRes.data) ? proformaRes.data : (proformaRes.data?.rows || proformaRes?.items || []);

      setCustomers(customerList);
      setItems(itemList);
      setCompanySettings(settings);
      setWarehouses(warehouseList);
      setProformaInvoices(proformaList);

      if (!isEditMode) {
        const defaultState = settings.state_code;
        if (defaultState) {
          setFormData(prev => ({ ...prev, place_of_supply: String(defaultState) }));
        }
      } else {
        const orderRes = await getSalesOrderById(id);
        const order = orderRes.data || orderRes;

        console.log('API Order Data:', order);

        // Virtual Injection: If the customer or items are missing from the global lists, 
        // inject them from the order's nested metadata to ensure they show up in dropdowns.
        const augmentedCustomers = [...customerList];
        const orderCustId = String(order.customer_id || order.customer?.id || '').trim();
        if (order.customer && !augmentedCustomers.some(c => String(c.id).trim() === orderCustId)) {
          augmentedCustomers.push(order.customer);
          setCustomers(augmentedCustomers);
        }

        const augmentedItems = [...itemList];
        let itemsChanged = false;
        (order.items || []).forEach(oi => {
          const oiId = String(oi.item_id || oi.item?.id || '').trim();
          if (oi.item && !augmentedItems.some(i => String(i.id).trim() === oiId)) {
            augmentedItems.push(oi.item);
            itemsChanged = true;
          }
        });
        if (itemsChanged) setItems(augmentedItems);

        setFormData({
          customer_id: orderCustId,
          order_date: order.order_date,
          expected_delivery: order.expected_delivery || order.delivery_date || '',
          place_of_supply: String(order.place_of_supply || order.customer?.state_code || '').trim(),
          reference: order.reference || '',
          warehouse_id: String(order.warehouse_id || '').trim(),
          remarks: order.remarks || '',
          items: (order.items || []).map(item => ({
            item_id: String(item.item_id || item.item?.id || '').trim(),
            description: item.description || item.item?.name || '',
            qty: parseFloat(item.qty || item.quantity) || 0,
            rate: parseFloat(item.rate || item.price) || 0,
            discount_pct: parseFloat(item.discount_pct) || 0,
            warehouse_id: String(item.warehouse_id || order.warehouse_id || '').trim()
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
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    setErrors(prev => {
      const newErr = { ...prev };
      if (newErr.customer_id) newErr.customer_id = null;
      if (newErr.place_of_supply) newErr.place_of_supply = null;
      return newErr;
    });
    const customer = customers.find(c => String(c.id) === String(customerId));
    setFormData(prev => ({
      ...prev,
      customer_id: customerId,
      place_of_supply: customer?.state_code || companySettings?.state_code || companySettings?.data?.state_code || ''
    }));
  };

  const handleProformaChange = async (e) => {
    const pId = e.target.value;
    setFormData(prev => ({ ...prev, proforma_invoice_id: pId }));

    if (pId) {
      try {
        setLoading(true);
        const res = await getProformaInvoiceById(pId);
        const pi = res.data || res;

        setFormData(prev => ({
          ...prev,
          customer_id: String(pi.customer_id || prev.customer_id),
          remarks: prev.remarks || pi.remarks || '',
          items: (pi.items || []).map(item => ({
            item_id: String(item.item_id || item.item?.id || ''),
            description: item.description || item.item?.name || '',
            qty: parseFloat(item.qty || item.quantity) || 1,
            rate: parseFloat(item.rate || item.price) || 0,
            discount_pct: parseFloat(item.discount_pct || 0),
            warehouse_id: prev.warehouse_id || ''
          }))
        }));
      } catch (err) {
        toast.error('Failed to load Proforma details');
      } finally {
        setLoading(false);
      }
    }
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

    const newErrors = {};
    if (!formData.customer_id) newErrors.customer_id = 'Please select a customer';
    if (!formData.order_date) newErrors.order_date = 'Order Date is required';
    if (!formData.place_of_supply) newErrors.place_of_supply = 'Place of Supply is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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

      <form onSubmit={handleSubmit} noValidate>
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h6 className="mb-0 fw-bold"><i className="isax isax-info-circle me-2 text-primary"></i>Order Information</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-600">Customer <span className="text-danger">*</span></label>
                <select key={`cust-${customers.length}`} className={`form-select shadow-none ${errors.customer_id ? 'is-invalid' : ''}`} name="customer_id" value={String(formData.customer_id)} onChange={handleCustomerChange}>
                  <option value="">Select Customer</option>
                  {customers.map(c => (
                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                  ))}
                </select>
                {errors.customer_id && <div className="invalid-feedback">{errors.customer_id}</div>}
              </div>
              <div className="col-md-2">
                <label className="form-label fw-600">Order Date <span className="text-danger">*</span></label>
                <input type="date" className={`form-control shadow-none ${errors.order_date ? 'is-invalid' : ''}`} name="order_date" value={formData.order_date} onChange={handleHeaderChange} />
                {errors.order_date && <div className="invalid-feedback">{errors.order_date}</div>}
              </div>
              <div className="col-md-2">
                <label className="form-label fw-600">Expected Delivery</label>
                <input type="date" className="form-control shadow-none" name="expected_delivery" value={formData.expected_delivery} onChange={handleHeaderChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Place of Supply <span className="text-danger">*</span></label>
                <select className={`form-select shadow-none ${errors.place_of_supply ? 'is-invalid' : ''}`} name="place_of_supply" value={String(formData.place_of_supply)} onChange={handleHeaderChange}>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state.code} value={String(state.code)}>{state.name} ({state.code})</option>
                  ))}
                </select>
                {errors.place_of_supply && <div className="invalid-feedback">{errors.place_of_supply}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Warehouse</label>
                <select key={`wh-${warehouses.length}`} className="form-select shadow-none" name="warehouse_id" value={String(formData.warehouse_id)} onChange={handleHeaderChange}>
                  <option value="">Default Warehouse</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={String(w.id)}>{w.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Reference / PO No.</label>
                <input type="text" className="form-control shadow-none" name="reference" value={formData.reference} onChange={handleHeaderChange} placeholder="Enter PO reference..." />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Against Proforma</label>
                <select className="form-select shadow-none" name="proforma_invoice_id" value={String(formData.proforma_invoice_id)} onChange={handleProformaChange}>
                  <option value="">None</option>
                  {proformaInvoices.map(p => (
                    <option key={p.id} value={String(p.id)}>{p.proforma_number || `PI-${p.id}`} - {p.customer?.name}</option>
                  ))}
                </select>
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
                        <select key={`item-${index}-${items.length}`} className="form-select shadow-none border-0 bg-transparent" value={String(item.item_id)} onChange={(e) => handleItemChange(index, 'item_id', e.target.value)} required>
                          <option value="">Select Item</option>
                          {items.map(i => (
                            <option key={i.id} value={String(i.id)}>{i.name}</option>
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
