import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import customerService from '../services/customerService';
import { getItems } from '../services/productService';
import { getCompanySettings } from '../services/settingsService';
import { getSalesInvoices } from '../services/salesInvoiceService';
import { createCreditNote } from '../services/creditNoteService';
import { INDIAN_STATES } from '../utils/constants';

const AddCreditNote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [customerInvoices, setCustomerInvoices] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);
  
  const [formData, setFormData] = useState({
    customer_id: '',
    credit_date: new Date().toISOString().split('T')[0],
    original_invoice_id: '',
    place_of_supply: '',
    remarks: '',
    items: [
      { 
        item_id: '', 
        description: '', 
        qty: 1, 
        rate: 0, 
        gst_rate: 18, 
        hsn_code: '' 
      }
    ]
  });

  const fetchData = useCallback(async () => {
    try {
      const [customersRes, itemsRes, settingsRes] = await Promise.all([
        customerService.getCustomers(1, 1000),
        getItems(1, 1000),
        getCompanySettings()
      ]);
      
      setCustomers(Array.isArray(customersRes.data) ? customersRes.data : (customersRes.data?.rows || []));
      setItems(Array.isArray(itemsRes.data) ? itemsRes.data : (itemsRes.data?.rows || []));
      setCompanySettings(settingsRes.data || settingsRes);
      
      if (settingsRes.data?.state_code || settingsRes.state_code) {
        setFormData(prev => ({ 
          ...prev, 
          place_of_supply: settingsRes.data?.state_code || settingsRes.state_code 
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load required data');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fetch sales invoices when customer changes
  useEffect(() => {
    if (formData.customer_id) {
      const fetchInvoices = async () => {
        try {
          const res = await getSalesInvoices(1, 1000, '', '', formData.customer_id);
          setCustomerInvoices(Array.isArray(res.data) ? res.data : (res.data?.rows || []));
        } catch (error) {
          console.error('Error fetching customer invoices:', error);
        }
      };
      fetchInvoices();
    } else {
      setCustomerInvoices([]);
    }
  }, [formData.customer_id]);

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
      original_invoice_id: '',
      place_of_supply: customer?.state_code || prev.place_of_supply
    }));
  };

  const handleInvoiceLinkChange = async (e) => {
    const invoiceId = e.target.value;
    const invoice = customerInvoices.find(inv => String(inv.id) === String(invoiceId));
    
    setFormData(prev => ({ ...prev, original_invoice_id: invoiceId }));
    
    // Auto-populate items if requested
    if (invoice && window.confirm('Populate item lines from the selected invoice?')) {
      const populatedItems = (invoice.items || []).map(item => ({
        item_id: item.item_id,
        description: item.description || item.item?.name,
        qty: item.qty,
        rate: item.rate,
        gst_rate: item.gst_rate || 18,
        hsn_code: item.hsn_code || item.item?.hsn_code || ''
      }));
      
      setFormData(prev => ({ ...prev, items: populatedItems }));
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
        newItems[index].gst_rate = selectedItem.gst_rate || 18;
        newItems[index].hsn_code = selectedItem.hsn_code || '';
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
          gst_rate: 18, 
          hsn_code: '' 
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
    const companyState = companySettings?.state_code || companySettings?.data?.state_code;
    const isInterState = formData.place_of_supply !== companyState;

    formData.items.forEach(item => {
      const amount = (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0);
      const taxRate = parseFloat(item.gst_rate) || 0;
      const taxRes = amount * taxRate / 100;

      subtotal += amount;
      totalTax += taxRes;

      if (isInterState) {
        taxBreakdown[`IGST ${taxRate}%`] = (taxBreakdown[`IGST ${taxRate}%`] || 0) + taxRes;
      } else {
        const rate = taxRate / 2;
        taxBreakdown[`CGST ${rate}%`] = (taxBreakdown[`CGST ${rate}%`] || 0) + (taxRes / 2);
        taxBreakdown[`SGST ${rate}%`] = (taxBreakdown[`SGST ${rate}%`] || 0) + (taxRes / 2);
      }
    });

    const netTotal = subtotal + totalTax;
    return { subtotal, totalTax, taxBreakdown, netTotal: Math.round(netTotal) };
  }, [formData.items, formData.place_of_supply, companySettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_id) {
      toast.error('Please select a customer');
      return;
    }
    if (formData.items.some(i => !i.item_id)) {
      toast.error('Please select items for all rows');
      return;
    }

    setLoading(true);
    try {
      await createCreditNote(formData);
      toast.success('Credit note created successfully');
      navigate('/invoicing/credit-notes');
    } catch (error) {
      console.error('Error creating credit note:', error);
      toast.error(error.message || 'Failed to create credit note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Create Credit Note (Sales Return)</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/invoicing/credit-notes">Credit Notes</Link></li>
              <li className="breadcrumb-item active">New Sales Return</li>
            </ol>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h6 className="mb-0 fw-bold"><i className="isax isax-info-circle me-2 text-primary"></i>Return Header</h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-600">Customer <span className="text-danger">*</span></label>
                <select className="form-select shadow-none" name="customer_id" value={formData.customer_id} onChange={handleCustomerChange} required>
                  <option value="">Select Customer</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name || c.display_name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label fw-600">Return Date <span className="text-danger">*</span></label>
                <input type="date" className="form-control shadow-none" name="credit_date" value={formData.credit_date} onChange={handleHeaderChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Against Sales Invoice</label>
                <select className="form-select shadow-none border" name="original_invoice_id" value={formData.original_invoice_id} onChange={handleInvoiceLinkChange} disabled={!formData.customer_id}>
                  <option value="">-- Optional Link --</option>
                  {customerInvoices.map(inv => (
                    <option key={inv.id} value={inv.id}>{inv.invoice_number} (₹{inv.net_amount})</option>
                  ))}
                </select>
                <small className="text-muted">Links this return to a specific sale.</small>
              </div>
              <div className="col-md-3">
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
            <h6 className="mb-0 fw-bold"><i className="isax isax-box me-2 text-primary"></i>Returned Items</h6>
            <button type="button" className="btn btn-primary btn-sm rounded-pill px-3" onClick={addItemRow}>
              <i className="isax isax-add me-1"></i>Add Row
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
                    <th style={{ width: '15%' }}>GST %</th>
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
                        <input type="text" className="form-control shadow-none border-0 bg-transparent fs-12 text-muted mt-n2" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Note for return..." />
                      </td>
                      <td>
                        <input type="number" className="form-control shadow-none border-0 bg-transparent text-center" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} min="0.1" step="any" required />
                      </td>
                      <td>
                        <input type="number" className="form-control shadow-none border-0 bg-transparent" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} step="any" required />
                      </td>
                      <td>
                        <select className="form-select shadow-none border-0 bg-transparent" value={item.gst_rate} onChange={(e) => handleItemChange(index, 'gst_rate', e.target.value)}>
                          {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                        </select>
                      </td>
                      <td className="fw-bold text-dark">
                        ₹{(item.qty * item.rate * (1 + item.gst_rate / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                <label className="form-label fw-600">Reason for Statement / Internal Note</label>
                <textarea className="form-control shadow-none" name="remarks" value={formData.remarks} onChange={handleHeaderChange} rows="5" placeholder="Reason for return, quality issues, or standard credit note details..."></textarea>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm bg-primary bg-opacity-10 h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Return Summary</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Taxable Amount</span>
                  <span className="fw-bold">₹{summary.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                {Object.entries(summary.taxBreakdown).map(([name, val]) => (
                  <div key={name} className="d-flex justify-content-between mb-2 small text-muted">
                    <span>{name}</span>
                    <span>₹{val.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
                <hr className="my-3 border-primary opacity-20" />
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="h5 fw-bold mb-0">Credit Amount</span>
                  <span className="h4 fw-bold mb-0 text-primary">₹{summary.netTotal.toLocaleString()}</span>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <button type="button" className="btn btn-outline-white w-100 rounded-pill border py-2 shadow-none" onClick={() => navigate('/invoicing/credit-notes')}>Cancel</button>
                  </div>
                  <div className="col-6">
                    <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 shadow-none" disabled={loading}>
                      {loading ? 'Saving...' : 'Save Draft'}
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

export default AddCreditNote;
