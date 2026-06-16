import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import vendorService from '../services/vendorService';
import { getItems } from '../services/productService';
import { getPurchaseInvoiceById, updatePurchaseInvoice } from '../services/purchaseInvoiceService';
import { getCompanySettings, getWarehouses } from '../services/settingsService';
import { getUoms } from '../services/uomService';
import branchService from '../services/branchService';
import purchaseOrderService from '../services/purchaseOrderService';
import { INDIAN_STATES } from '../utils/constants';

const EditPurchaseInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [uoms, setUoms] = useState([]);
  const [branches, setBranches] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    vendor_id: '',
    branch_id: '',
    invoice_number: '',
    invoice_date: '',
    due_date: '',
    place_of_supply: '',
    purchase_order_id: '',
    remarks: '',
    terms_and_conditions: '',
    show_discount: true,
    invoice_layout: 'PRODUCTS',
    items: [],
    additional_charges: []
  });

  const fetchData = useCallback(async () => {
    try {
      const [invoiceRes, vendorsRes, itemsRes, warehousesRes, settingsRes, uomsRes, branchRes, poRes] = await Promise.all([
        getPurchaseInvoiceById(id),
        vendorService.getVendors(1, 1000),
        getItems(1, 1000),
        getWarehouses(),
        getCompanySettings(),
        getUoms(1, 1000),
        branchService.getBranches(),
        purchaseOrderService.getPurchaseOrders(1, 1000)
      ]);

      const invoiceData = invoiceRes.data || invoiceRes;
      const vendorList = Array.isArray(vendorsRes.data) ? vendorsRes.data : (vendorsRes.data?.rows || []);
      const itemList = Array.isArray(itemsRes.data) ? itemsRes.data : (itemsRes.data?.rows || []);
      const warehouseList = warehousesRes.data || warehousesRes || [];
      const settings = settingsRes.data || settingsRes;
      const poList = Array.isArray(poRes.data) ? poRes.data : (poRes.data?.rows || []);

      setWarehouses(warehouseList);
      setCompanySettings(settings);
      setPurchaseOrders(poList);
      setUoms(Array.isArray(uomsRes.data) ? uomsRes.data : (uomsRes.data?.rows || []));
      const branchList = Array.isArray(branchRes.data) ? branchRes.data : (branchRes.data?.rows || []);
      setBranches(branchList);

      // Virtual Injection
      const augmentedVendors = [...vendorList];
      const invVendorId = String(invoiceData.vendor_id || invoiceData.vendorId || '').trim();
      if (invoiceData.vendor && !augmentedVendors.some(v => String(v.id).trim() === invVendorId)) {
        augmentedVendors.push(invoiceData.vendor);
      }
      setVendors(augmentedVendors);

      const augmentedItems = [...itemList];
      (invoiceData.items || []).forEach(oi => {
        const oiId = String(oi.item_id || oi.itemId || '').trim();
        if (oi.item && !augmentedItems.some(i => String(i.id).trim() === oiId)) {
          augmentedItems.push(oi.item);
        }
      });
      setItems(augmentedItems);

      let parsedCharges = [];
      try {
        if (invoiceData.additional_charges) {
          parsedCharges = typeof invoiceData.additional_charges === 'string' ? JSON.parse(invoiceData.additional_charges) : invoiceData.additional_charges;
          parsedCharges = parsedCharges.map(c => ({
            name: c.name || '',
            amount: parseFloat(c.amount) || 0,
            gstRate: parseFloat(c.gstRate || c.gst_rate) || 0
          }));
        }
      } catch (e) {
        console.error('Failed to parse additional charges', e);
      }

      setFormData({
        vendor_id: invVendorId,
        branch_id: invoiceData.branch_id || invoiceData.branchId || '',
        invoice_number: invoiceData.invoice_number || '',
        invoice_date: (invoiceData.invoice_date || '').split('T')[0],
        due_date: (invoiceData.due_date || '').split('T')[0],
        place_of_supply: String(invoiceData.place_of_supply || invoiceData.vendor?.state_code || '').trim(),
        purchase_order_id: invoiceData.purchase_order_id || '',
        remarks: invoiceData.remarks || '',
        terms_and_conditions: invoiceData.terms_and_conditions || '',
        show_discount: invoiceData.show_discount !== undefined ? invoiceData.show_discount : true,
        invoice_layout: invoiceData.invoice_layout || 'PRODUCTS',
        additional_charges: parsedCharges,
        items: (invoiceData.items || []).map(item => {
          const itemIdStr = String(item.item_id || item.itemId || '').trim();
          const masterItem = augmentedItems.find(i => String(i.id) === itemIdStr) || {};

          return {
            item_id: itemIdStr,
            description: item.description || item.item?.name || '',
            qty: !isNaN(parseFloat(item.qty)) ? parseFloat(item.qty) : 1,
            uom_id: item.uom_id || '',
            rate: parseFloat(item.rate) || 0,
            discount_pct: parseFloat(item.discount_percent || item.discount_pct || 0),
            discount_percent: parseFloat(item.discount_percent || item.discount_pct || 0),
            gst_rate: !isNaN(parseInt(item.gst_rate)) ? parseInt(item.gst_rate) : 18,
            tax_type: item.tax_type || item.taxType || 'TAXABLE',
            warehouse_id: String(item.warehouse_id || '').trim(),
            itc_eligibility: item.itc_eligibility || 'ELIGIBLE',
            batch_number: item.batch_number || '',
            mfg_date: item.mfg_date ? item.mfg_date.split('T')[0] : '',
            expiry_date: item.expiry_date ? item.expiry_date.split('T')[0] : '',
            track_batch: masterItem.track_batch || false,
            track_expiry: masterItem.track_expiry || false
          };
        })
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load invoice details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVendorChange = (e) => {
    const vendorId = e.target.value;
    const vendor = vendors.find(v => String(v.id) === String(vendorId));
    setFormData(prev => ({
      ...prev,
      vendor_id: vendorId,
      place_of_supply: vendor?.state_code || companySettings?.state_code || companySettings?.data?.state_code || ''
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === 'item_id') {
      const selectedItem = items.find(i => String(i.id) === String(value));
      if (selectedItem) {
        const today = new Date().toISOString().split('T')[0];
        const itemMfgDate = selectedItem.manufacture_date ? selectedItem.manufacture_date.split('T')[0] : null;
        const defaultMfgDate = itemMfgDate || (index > 0 && newItems[index - 1].mfg_date ? newItems[index - 1].mfg_date : today);
        const defaultExpiryDate = index > 0 && newItems[index - 1].expiry_date ? newItems[index - 1].expiry_date : today;
        const defaultWarehouse = index > 0 && newItems[index - 1].warehouse_id ? newItems[index - 1].warehouse_id : (newItems[index].warehouse_id || newItems[0]?.warehouse_id || '');

        newItems[index].description = selectedItem.name;
        newItems[index].rate = selectedItem.purchase_price || selectedItem.price || 0;
        newItems[index].gst_rate = selectedItem.gst_rate || 18;
        newItems[index].uom_id = selectedItem.uom_id || '';
        newItems[index].track_batch = selectedItem.track_batch || false;
        newItems[index].track_expiry = selectedItem.track_expiry || false;
        newItems[index].mfg_date = defaultMfgDate;
        newItems[index].expiry_date = defaultExpiryDate;
        newItems[index].warehouse_id = defaultWarehouse;
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
          gst_rate: 18,
          tax_type: 'TAXABLE',
          uom_id: '',
          warehouse_id: prev.items[0]?.warehouse_id || '',
          itc_eligibility: 'ELIGIBLE',
          batch_number: '',
          mfg_date: '',
          expiry_date: '',
          track_batch: false,
          track_expiry: false
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
    let totalTax = 0;
    const taxBreakdown = {};

    const isInterState = String(formData.place_of_supply).trim() !== String(companySettings?.state_code || companySettings?.data?.state_code || '27').trim();

    formData.items.forEach(item => {
      const amount = (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0);
      const discount = amount * (parseFloat(item.discount_pct) || 0) / 100;
      const taxable = amount - discount;
      const taxRes = taxable * (parseFloat(item.gst_rate) || 0) / 100;

      subtotal += taxable;
      totalTax += taxRes;

      if (isInterState) {
        const rate = item.gst_rate;
        taxBreakdown[`IGST ${rate}%`] = (taxBreakdown[`IGST ${rate}%`] || 0) + taxRes;
      } else {
        const rate = item.gst_rate / 2;
        taxBreakdown[`CGST ${rate}%`] = (taxBreakdown[`CGST ${rate}%`] || 0) + (taxRes / 2);
        taxBreakdown[`SGST ${rate}%`] = (taxBreakdown[`SGST ${rate}%`] || 0) + (taxRes / 2);
      }
    });

    const chargesTotal = (formData.additional_charges || []).reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);
    const chargesTax = (formData.additional_charges || []).reduce((sum, c) => sum + ((parseFloat(c.amount) || 0) * (parseFloat(c.gstRate) || 0)) / 100, 0);

    const netTotal = subtotal + totalTax + chargesTotal + chargesTax;
    const roundOff = Math.round(netTotal) - netTotal;

    return {
      subtotal,
      totalTax,
      taxBreakdown,
      additionalCharges: chargesTotal,
      additionalChargesTax: chargesTax,
      roundOff,
      netTotal: Math.round(netTotal)
    };
  }, [formData.items, formData.place_of_supply, formData.additional_charges, companySettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vendor_id || formData.items.length === 0) {
      toast.error('Please select a vendor and at least one item');
      return;
    }

    let hasItemErrors = false;
    const newErrors = {};
    formData.items.forEach((item, index) => {
      if (item.item_id && !item.warehouse_id) {
        newErrors[`items_${index}_warehouse_id`] = 'Warehouse is required';
        hasItemErrors = true;
      }
      
      if (item.mfg_date && item.expiry_date) {
        if (new Date(item.expiry_date) < new Date(item.mfg_date)) {
          newErrors[`items_${index}_expiry_date`] = 'Expiry cannot be earlier than Mfg Date';
          hasItemErrors = true;
        }
      }
    });

    if (formData.invoice_date && formData.due_date) {
      if (new Date(formData.due_date) < new Date(formData.invoice_date)) {
        newErrors.due_date = 'Due Date cannot be earlier than Invoice Date';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (hasItemErrors) {
        toast.error('Please fix the errors in line items');
      }
      return;
    }

    if (formData.invoice_layout === 'ECOMMERCE') {
      if (!formData.ecommerce_operator_gstin || formData.ecommerce_operator_gstin.trim() === '') {
        return toast.error('E-Commerce Operator GSTIN is required');
      }
      const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstinRegex.test(formData.ecommerce_operator_gstin.toUpperCase().trim())) {
        return toast.error('Invalid E-Commerce Operator GSTIN format');
      }
    }

    setProcessing(true);
    try {
      const payload = {
        ...formData,
        items: formData.items.map(item => {
          const itemPayload = {
            ...item,
            warehouse_id: item.warehouse_id ? parseInt(item.warehouse_id, 10) : null,
            discount: parseFloat(item.discount_pct || item.discount_percent || item.discount || 0),
            discount_percent: parseFloat(item.discount_pct || item.discount_percent || item.discount || 0),
            discount_pct: parseFloat(item.discount_pct || item.discount_percent || item.discount || 0)
          };

          if (!itemPayload.batch_number) delete itemPayload.batch_number;
          if (!itemPayload.mfg_date) delete itemPayload.mfg_date;
          if (!itemPayload.expiry_date) delete itemPayload.expiry_date;

          return itemPayload;
        }),
        additional_charges: (formData.additional_charges || [])
          .filter(c => c.name && c.amount > 0)
          .map(c => ({
            name: c.name,
            amount: parseFloat(c.amount),
            gst_rate: parseFloat(c.gstRate)
          }))
      };
      await updatePurchaseInvoice(id, payload);
      toast.success('Purchase invoice updated successfully');
      navigate('/invoicing/purchases');
    } catch (error) {
      console.error('Error updating purchase invoice:', error);
      toast.error(error.message || 'Failed to update purchase invoice');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-50">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Edit Purchase Invoice</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/invoicing/purchases">Purchases</Link></li>
              <li className="breadcrumb-item active">Edit Invoice</li>
            </ol>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card border-0 shadow-sm mb-4">

          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-600">Vendor <span className="text-danger">*</span></label>
                <select key={`ven-${vendors.length}`} className="form-select shadow-none" name="vendor_id" value={String(formData.vendor_id)} onChange={handleVendorChange} required>
                  <option value="">Select Vendor</option>
                  {vendors.map(v => (
                    <option key={v.id} value={String(v.id)}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Branch / Location <span className="text-danger">*</span></label>
                <select className="form-select shadow-none" name="branch_id" value={String(formData.branch_id)} onChange={handleHeaderChange} required>
                  <option value="">Select Branch</option>
                  {branches.map(b => (
                    <option key={b.id} value={String(b.id)}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label fw-600">Invoice Date <span className="text-danger">*</span></label>
                <input type="date" className="form-control shadow-none" name="invoice_date" value={formData.invoice_date} onChange={handleHeaderChange} required />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-600">Due Date</label>
                <input type="date" className={`form-control shadow-none ${errors.due_date ? 'is-invalid' : ''}`} name="due_date" value={formData.due_date} onChange={handleHeaderChange} />
                {errors.due_date && <div className="invalid-feedback">{errors.due_date}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Place of Supply <span className="text-danger">*</span></label>
                <select className="form-select shadow-none" name="place_of_supply" value={String(formData.place_of_supply)} onChange={handleHeaderChange} required>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state.code} value={String(state.code)}>{state.name} ({state.code})</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Against Purchase Order</label>
                <select className="form-select shadow-none" name="purchase_order_id" value={formData.purchase_order_id || ''} onChange={handleHeaderChange}>
                  <option value="">None</option>
                  {purchaseOrders.map(po => (
                    <option key={po.id} value={po.id}>{po.order_number}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Invoice Layout</label>
                <select className="form-select shadow-none" name="invoice_layout" value={formData.invoice_layout} onChange={handleHeaderChange}>
                  <option value="PRODUCTS">Products</option>
                  <option value="SERVICES">Services</option>
                  <option value="ECOMMERCE">E-Commerce</option>
                </select>
              </div>
              {formData.invoice_layout === 'ECOMMERCE' && (
                <div className="col-md-3">
                  <label className="form-label fw-600">E-Commerce Operator GSTIN <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    name="ecommerce_operator_gstin"
                    value={formData.ecommerce_operator_gstin || ''}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, ecommerce_operator_gstin: e.target.value.toUpperCase() }));
                    }}
                    placeholder="Enter Operator's GSTIN"
                  />
                </div>
              )}
              <div className="col-md-3 d-flex align-items-end mb-1">
                <div className="form-check form-switch p-2 bg-light rounded-2 w-100 ps-5">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="show_discount"
                    name="show_discount"
                    checked={formData.show_discount}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormData(p => ({
                        ...p,
                        show_discount: checked,
                        items: checked ? p.items : p.items.map(item => ({ ...item, discount_pct: 0, discount_percent: 0, discount: 0 }))
                      }));
                    }}
                  />
                  <label className="form-check-label fw-600" htmlFor="show_discount">Item Discount</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold"><i className="isax isax-box me-2 text-primary"></i>Line Items</h6>
            <button type="button" className="btn btn-primary btn-sm rounded-pill px-3" onClick={addItemRow}>
              <i className="isax isax-add me-1"></i>Add Row
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-nowrap align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th style={{ width: '25%' }}>Item / Description</th>
                    <th style={{ width: '15%' }}>Warehouse</th>
                    <th style={{ width: '10%' }}>UOM</th>
                    <th style={{ width: '10%' }}>Qty</th>
                    <th style={{ width: '10%' }}>Rate</th>
                    <th style={{ width: '10%' }}>Tax Type</th>
                    {formData.show_discount && <th style={{ width: '10%' }}>Disc %</th>}
                    <th style={{ width: '10%' }}>GST %</th>
                    <th style={{ width: '15%' }}>ITC Eligibility</th>
                    <th className="text-center" style={{ width: '50px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2" style={{ maxWidth: '300px' }}>
                        <div className="d-flex flex-column gap-1">
                          <div className="position-relative">
                            <select key={`item-${index}-${items.length}`} className="form-select shadow-none border-0 bg-transparent" value={String(item.item_id)} onChange={(e) => handleItemChange(index, 'item_id', e.target.value)} required>
                              <option value="">Select Item</option>
                              {items.map(i => (
                                <option key={i.id} value={String(i.id)}>{i.name}</option>
                              ))}
                            </select>
                            <input type="text" className="form-control shadow-none border-0 bg-transparent fs-12 text-muted mt-n2" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Description" />
                          </div>
                          {(item.track_batch || item.track_expiry) && (
                            <div className="mt-2 d-flex flex-column gap-2 bg-light p-2 rounded">
                              <div className="d-flex align-items-center gap-2">
                                <div className="flex-grow-1">
                                  <label className="fs-10 text-muted text-uppercase fw-bold mb-0">Batch No</label>
                                  <input type="text" className="form-control form-control-xs border-0 bg-white shadow-none fs-11" placeholder="Batch No" value={item.batch_number || ''} onChange={(e) => handleItemChange(index, 'batch_number', e.target.value)} />
                                </div>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <div className="w-50">
                                  <label className="fs-10 text-muted text-uppercase fw-bold mb-0">Mfg Date</label>
                                  <input type="date" className="form-control form-control-xs border-0 bg-white shadow-none fs-11 text-muted" value={item.mfg_date || ''} onChange={(e) => handleItemChange(index, 'mfg_date', e.target.value)} title="Mfg Date" />
                                </div>
                                <div className="w-50">
                                  <label className="fs-10 text-muted text-uppercase fw-bold mb-0">Expiry Date</label>
                                  <input type="date" className={`form-control form-control-xs ${errors[`items_${index}_expiry_date`] ? 'is-invalid border border-danger' : 'border-0'} bg-white shadow-none fs-11 text-muted`} value={item.expiry_date || ''} onChange={(e) => handleItemChange(index, 'expiry_date', e.target.value)} title="Expiry Date" />
                                  {errors[`items_${index}_expiry_date`] && <div className="invalid-feedback d-block fs-10 mt-1">{errors[`items_${index}_expiry_date`]}</div>}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <select key={`wh-${warehouses.length}`} className={`form-select shadow-none border-0 bg-transparent ${errors[`items_${index}_warehouse_id`] ? 'is-invalid' : ''}`} value={String(item.warehouse_id)} onChange={(e) => handleItemChange(index, 'warehouse_id', e.target.value)} required>
                          <option value="">Warehouse</option>
                          {warehouses.map(w => (
                            <option key={w.id} value={String(w.id)}>{w.name}</option>
                          ))}
                        </select>
                        {errors[`items_${index}_warehouse_id`] && <div className="invalid-feedback text-start">{errors[`items_${index}_warehouse_id`]}</div>}
                      </td>
                      <td>
                        <select className="form-select shadow-none border-0 bg-transparent" value={item.uom_id} onChange={(e) => handleItemChange(index, 'uom_id', e.target.value)} required>
                          <option value="">UOM</option>
                          {uoms.map(u => (
                            <option key={u.id} value={u.id}>{u.name}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input type="number" className="form-control shadow-none border-0 bg-transparent" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} min="1" step="any" required />
                      </td>
                      <td>
                        <input type="number" className="form-control shadow-none border-0 bg-transparent" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} step="any" required />
                      </td>
                      <td>
                        <select className="form-select shadow-none border-0 bg-transparent" value={item.tax_type || 'TAXABLE'} onChange={(e) => handleItemChange(index, 'tax_type', e.target.value)}>
                          <option value="TAXABLE">Taxable</option>
                          <option value="EXEMPT">Exempt</option>
                          <option value="NIL_RATED">Nil Rated</option>
                          <option value="NON_GST">Non GST</option>
                        </select>
                      </td>
                      {formData.show_discount && (
                        <td>
                          <input type="number" className="form-control shadow-none border-0 bg-transparent" value={item.discount_pct} onChange={(e) => handleItemChange(index, 'discount_pct', e.target.value)} step="any" />
                        </td>
                      )}
                      <td>
                        <select className="form-select shadow-none border-0 bg-transparent" value={item.gst_rate} onChange={(e) => handleItemChange(index, 'gst_rate', e.target.value)}>
                          {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                        </select>
                      </td>
                      <td>
                        <select className="form-select shadow-none border-0 bg-transparent fs-13" value={item.itc_eligibility} onChange={(e) => handleItemChange(index, 'itc_eligibility', e.target.value)}>
                          <option value="ELIGIBLE">Eligible</option>
                          <option value="INELIGIBLE">Ineligible</option>
                          <option value="PARTIALLY_ELIGIBLE">Partially Eligible</option>
                        </select>
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

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-600">Note / Remarks</label>
                  <textarea className="form-control shadow-none" name="remarks" value={formData.remarks} onChange={handleHeaderChange} rows="3" placeholder="Additional details for this purchase..."></textarea>
                </div>

                <div className="mt-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h6 className="fw-bold fs-14 mb-0">Additional Charges</h6>
                    <button
                      type="button"
                      className="btn btn-sm btn-soft-primary px-3 rounded-pill"
                      onClick={() => setFormData(p => ({ ...p, additional_charges: [...(p.additional_charges || []), { name: '', amount: 0, gstRate: 18 }] }))}
                    >
                      + Add Item
                    </button>
                  </div>
                  <div className="bg-light p-3 rounded-3">
                    {(formData.additional_charges || []).map((charge, cidx) => (
                      <div className="row g-2 mb-2 align-items-center" key={cidx}>
                        <div className="col-md-5">
                          <input type="text" className="form-control form-control-sm border-0" placeholder="e.g. Freight" value={charge.name} onChange={(e) => {
                            const newC = [...formData.additional_charges];
                            newC[cidx].name = e.target.value;
                            setFormData(p => ({ ...p, additional_charges: newC }));
                          }} />
                        </div>
                        <div className="col-md-3">
                          <input type="number" className="form-control form-control-sm border-0" placeholder="Amount" value={charge.amount} onChange={(e) => {
                            const newC = [...formData.additional_charges];
                            newC[cidx].amount = parseFloat(e.target.value) || 0;
                            setFormData(p => ({ ...p, additional_charges: newC }));
                          }} />
                        </div>
                        <div className="col-md-3">
                          <select className="form-select form-select-sm border-0" value={charge.gstRate} onChange={(e) => {
                            const newC = [...formData.additional_charges];
                            newC[cidx].gstRate = parseFloat(e.target.value);
                            setFormData(p => ({ ...p, additional_charges: newC }));
                          }}>
                            {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                          </select>
                        </div>
                        <div className="col-md-1 text-end">
                          <button type="button" className="btn btn-sm text-danger border-0 p-0" onClick={() => setFormData(p => ({ ...p, additional_charges: p.additional_charges.filter((_, i) => i !== cidx) }))}>
                            <i className="isax isax-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm bg-primary bg-opacity-10 h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Invoice Summary</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-bold">₹{summary.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                {Object.entries(summary.taxBreakdown).map(([taxName, taxValue]) => (
                  <div key={taxName} className="d-flex justify-content-between mb-2 small text-muted">
                    <span>{taxName}</span>
                    <span>₹{taxValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                ))}
                {summary.additionalCharges > 0 && (
                  <div className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Addl. Charges Header</span>
                    <span>₹{summary.additionalCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-2 small text-muted">
                  <span>Round Off</span>
                  <span>₹{summary.roundOff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <hr className="my-3 border-primary opacity-20" />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5 fw-bold mb-0">Net Total</span>
                  <span className="h4 fw-bold mb-0 text-primary">₹{summary.netTotal.toLocaleString()}</span>
                </div>
              </div>
              <div className="card-footer bg-transparent border-0 pt-0 pb-4 px-4">
                <div className="row g-2">
                  <div className="col-6">
                    <button type="button" className="btn btn-outline-white w-100 rounded-pill shadow-none border" onClick={() => navigate('/invoicing/purchases')}>Cancel</button>
                  </div>
                  <div className="col-6">
                    <button type="submit" className="btn btn-primary w-100 rounded-pill shadow-none" disabled={processing}>
                      {processing ? 'Saving...' : 'Update Invoice'}
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

export default EditPurchaseInvoice;
