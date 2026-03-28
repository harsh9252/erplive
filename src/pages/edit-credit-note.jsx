import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import customerService from '../services/customerService';
import { getItems } from '../services/productService';
import { getCompanySettings } from '../services/settingsService';
import { getSalesInvoices } from '../services/salesInvoiceService';
import { getCreditNoteById, updateCreditNote } from '../services/creditNoteService';
import { INDIAN_STATES } from '../utils/constants';

const EditCreditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [customerInvoices, setCustomerInvoices] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);
  
  const [formData, setFormData] = useState({
    customer_id: '',
    credit_date: '',
    original_invoice_id: '',
    place_of_supply: '',
    remarks: '',
    items: []
  });

  const fetchData = useCallback(async () => {
    try {
      const [customersRes, itemsRes, settingsRes, cnRes] = await Promise.all([
        customerService.getCustomers(1, 1000),
        getItems(1, 1000),
        getCompanySettings(),
        getCreditNoteById(id)
      ]);
      
      const cnData = cnRes.data || cnRes;
      setCustomers(Array.isArray(customersRes.data) ? customersRes.data : (customersRes.data?.rows || []));
      setItems(Array.isArray(itemsRes.data) ? itemsRes.data : (itemsRes.data?.rows || []));
      setCompanySettings(settingsRes.data || settingsRes);
      
      setFormData({
        customer_id: cnData.customer_id,
        credit_date: cnData.credit_date || cnData.date,
        original_invoice_id: cnData.original_invoice_id || '',
        place_of_supply: cnData.place_of_supply || '',
        remarks: cnData.remarks || '',
        items: (cnData.items || []).map(i => ({
          item_id: i.item_id,
          description: i.description || i.item?.name || '',
          qty: i.qty,
          rate: i.rate,
          gst_rate: i.gst_rate || 18,
          hsn_code: i.hsn_code || i.item?.hsn_code || ''
        }))
      });

      if (cnData.customer_id) {
        const invRes = await getSalesInvoices(1, 1000, '', '', cnData.customer_id);
        setCustomerInvoices(Array.isArray(invRes.data) ? invRes.data : (invRes.data?.rows || []));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load required data');
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

  const handleCustomerChange = async (e) => {
    const customerId = e.target.value;
    const customer = customers.find(c => String(c.id) === String(customerId));
    setFormData(prev => ({ 
      ...prev, 
      customer_id: customerId,
      original_invoice_id: '',
      place_of_supply: customer?.state_code || prev.place_of_supply
    }));

    if (customerId) {
      try {
        const res = await getSalesInvoices(1, 1000, '', '', customerId);
        setCustomerInvoices(Array.isArray(res.data) ? res.data : (res.data?.rows || []));
      } catch (error) {
        console.error('Error fetching customer invoices:', error);
      }
    } else {
      setCustomerInvoices([]);
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

    return { subtotal, totalTax, taxBreakdown, netTotal: Math.round(subtotal + totalTax) };
  }, [formData.items, formData.place_of_supply, companySettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateCreditNote(id, formData);
      toast.success('Credit note updated successfully');
      navigate(`/invoicing/credit-notes/${id}`);
    } catch (error) {
      console.error('Error updating credit note:', error);
      toast.error(error.message || 'Failed to update credit note');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Edit Credit Note</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/invoicing/credit-notes">Credit Notes</Link></li>
              <li className="breadcrumb-item active">Edit Draft</li>
            </ol>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card border-0 shadow-sm mb-4">
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
                <label className="form-label fw-600">Return Date <span className="text-danger">*</span></label>
                <input type="date" className="form-control shadow-none" name="credit_date" value={formData.credit_date} onChange={handleHeaderChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Against Sales Invoice</label>
                <select className="form-select shadow-none border" name="original_invoice_id" value={formData.original_invoice_id} onChange={handleHeaderChange} disabled={!formData.customer_id}>
                  <option value="">-- Optional Link --</option>
                  {customerInvoices.map(inv => (
                    <option key={inv.id} value={inv.id}>{inv.invoice_number}</option>
                  ))}
                </select>
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
            <h6 className="mb-0 fw-bold">Itemized Returns</h6>
            <button type="button" className="btn btn-primary btn-sm rounded-pill px-3" onClick={addItemRow}>
              Add Row
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
                    <th className="text-center"></th>
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
                      </td>
                      <td>
                        <input type="number" className="form-control shadow-none border-0 bg-transparent text-center" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} min="1" required />
                      </td>
                      <td>
                        <input type="number" className="form-control shadow-none border-0 bg-transparent" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} required />
                      </td>
                      <td>
                        <select className="form-select shadow-none border-0 bg-transparent" value={item.gst_rate} onChange={(e) => handleItemChange(index, 'gst_rate', e.target.value)}>
                          {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                        </select>
                      </td>
                      <td className="fw-bold text-dark">
                        ₹{(item.qty * item.rate * (1 + item.gst_rate / 100)).toLocaleString()}
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
                <label className="form-label fw-600">Remarks</label>
                <textarea className="form-control shadow-none" name="remarks" value={formData.remarks} onChange={handleHeaderChange} rows="5"></textarea>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm bg-primary bg-opacity-10 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Sub Total</span>
                  <span className="fw-bold">₹{summary.subtotal.toLocaleString()}</span>
                </div>
                {Object.entries(summary.taxBreakdown).map(([name, val]) => (
                  <div key={name} className="d-flex justify-content-between mb-2 small text-muted">
                    <span>{name}</span>
                    <span>₹{val.toLocaleString()}</span>
                  </div>
                ))}
                <hr className="my-3 border-primary opacity-20" />
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="h5 fw-bold mb-0">Total Credit</span>
                  <span className="h4 fw-bold mb-0 text-primary">₹{summary.netTotal.toLocaleString()}</span>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <button type="button" className="btn btn-outline-white w-100 rounded-pill border py-2 shadow-none" onClick={() => navigate('/invoicing/credit-notes')}>Discard</button>
                  </div>
                  <div className="col-6">
                    <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 shadow-none" disabled={saving}>
                      {saving ? 'Updating...' : 'Update CN'}
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

export default EditCreditNote;
