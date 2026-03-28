import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import vendorService from '../services/vendorService';
import { getItems } from '../services/productService';
import { getWarehouses } from '../services/settingsService';
import { createPurchaseInvoice } from '../services/purchaseInvoiceService';
import { getCompanySettings } from '../services/settingsService';
import { INDIAN_STATES } from '../utils/constants';

const AddPurchaseInvoice = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);
  
  const [formData, setFormData] = useState({
    vendor_id: '',
    invoice_number: '',
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    place_of_supply: '',
    remarks: '',
    terms_and_conditions: '',
    items: [
      { 
        item_id: '', 
        description: '', 
        qty: 1, 
        rate: 0, 
        discount_pct: 0, 
        gst_rate: 18, 
        warehouse_id: '',
        itc_eligibility: 'ELIGIBLE' 
      }
    ]
  });

  const fetchData = useCallback(async () => {
    try {
      const [vendorsRes, itemsRes, warehousesRes, settingsRes] = await Promise.all([
        vendorService.getVendors(1, 1000),
        getItems(1, 1000),
        getWarehouses(),
        getCompanySettings()
      ]);
      
      setVendors(Array.isArray(vendorsRes.data) ? vendorsRes.data : (vendorsRes.data?.rows || []));
      setItems(Array.isArray(itemsRes.data) ? itemsRes.data : (itemsRes.data?.rows || []));
      setWarehouses(warehousesRes.data || warehousesRes || []);
      setCompanySettings(settingsRes.data || settingsRes);
      
      if (settingsRes.data?.state_code || settingsRes.state_code) {
        setFormData(prev => ({ 
          ...prev, 
          place_of_supply: settingsRes.data?.state_code || settingsRes.state_code 
        }));
      }
    } catch (error) {
      console.error('Error fetching master data:', error);
      toast.error('Failed to load required data');
    }
  }, []);

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
      place_of_supply: vendor?.state_code || prev.place_of_supply
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === 'item_id') {
      const selectedItem = items.find(i => String(i.id) === String(value));
      if (selectedItem) {
        newItems[index].description = selectedItem.name;
        newItems[index].rate = selectedItem.purchase_price || selectedItem.price || 0;
        newItems[index].gst_rate = selectedItem.gst_rate || 18;
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
          warehouse_id: prev.items[0]?.warehouse_id || '',
          itc_eligibility: 'ELIGIBLE'
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
    
    const isInterState = formData.place_of_supply !== (companySettings?.state_code || companySettings?.data?.state_code);

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

    const netTotal = subtotal + totalTax;
    const roundOff = Math.round(netTotal) - netTotal;

    return {
      subtotal,
      totalTax,
      taxBreakdown,
      roundOff,
      netTotal: Math.round(netTotal)
    };
  }, [formData.items, formData.place_of_supply, companySettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vendor_id || !formData.items[0].item_id) {
      toast.error('Please select a vendor and at least one item');
      return;
    }

    setLoading(true);
    try {
      await createPurchaseInvoice(formData);
      toast.success('Purchase invoice created successfully');
      navigate('/invoicing/purchases');
    } catch (error) {
      console.error('Error creating purchase invoice:', error);
      toast.error(error.message || 'Failed to create purchase invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Create Purchase Invoice</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/invoicing/purchases">Purchases</Link></li>
              <li className="breadcrumb-item active">New Invoice</li>
            </ol>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h6 className="mb-0 fw-bold"><i className="isax isax-info-circle me-2 text-primary"></i>Invoice Header</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-600">Vendor <span className="text-danger">*</span></label>
                <select className="form-select shadow-none" name="vendor_id" value={formData.vendor_id} onChange={handleVendorChange} required>
                  <option value="">Select Vendor</option>
                  {vendors.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Vendor Invoice No.</label>
                <input type="text" className="form-control shadow-none" name="invoice_number" value={formData.invoice_number} onChange={handleHeaderChange} placeholder="Enter Vendor's Ref No." />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-600">Invoice Date <span className="text-danger">*</span></label>
                <input type="date" className="form-control shadow-none" name="invoice_date" value={formData.invoice_date} onChange={handleHeaderChange} required />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-600">Due Date</label>
                <input type="date" className="form-control shadow-none" name="due_date" value={formData.due_date} onChange={handleHeaderChange} />
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
                    <th style={{ width: '10%' }}>Qty</th>
                    <th style={{ width: '10%' }}>Rate</th>
                    <th style={{ width: '10%' }}>Disc %</th>
                    <th style={{ width: '10%' }}>GST %</th>
                    <th style={{ width: '15%' }}>ITC Eligibility</th>
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
                        <input type="text" className="form-control shadow-none border-0 bg-transparent fs-12 text-muted mt-n2" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Description" />
                      </td>
                      <td>
                        <select className="form-select shadow-none border-0 bg-transparent" value={item.warehouse_id} onChange={(e) => handleItemChange(index, 'warehouse_id', e.target.value)} required>
                          <option value="">Warehouse</option>
                          {warehouses.map(w => (
                            <option key={w.id} value={w.id}>{w.name}</option>
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
                        <input type="number" className="form-control shadow-none border-0 bg-transparent" value={item.discount_pct} onChange={(e) => handleItemChange(index, 'discount_pct', e.target.value)} step="any" />
                      </td>
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
                <div className="mb-0">
                  <label className="form-label fw-600">Terms & Conditions</label>
                  <textarea className="form-control shadow-none" name="terms_and_conditions" value={formData.terms_and_conditions} onChange={handleHeaderChange} rows="3" placeholder="Standard purchase terms..."></textarea>
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
                    <button type="submit" className="btn btn-primary w-100 rounded-pill shadow-none" disabled={loading}>
                      {loading ? 'Saving...' : 'Save Invoice'}
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

export default AddPurchaseInvoice;
