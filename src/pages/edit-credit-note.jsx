import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import customerService from '../services/customerService';
import { getItems } from '../services/productService';
import { getCompanySettings } from '../services/settingsService';
import { getSalesInvoices } from '../services/salesInvoiceService';
import { getCreditNoteById, updateCreditNote } from '../services/creditNoteService';
import { getUoms } from '../services/uomService';
import { INDIAN_STATES, CREDIT_NOTE_REASONS } from '../utils/constants';

const EditCreditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [uoms, setUoms] = useState([]);
  const [customerInvoices, setCustomerInvoices] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    customer_id: '',
    credit_date: '',
    original_invoice_id: '',
    reason: 'SALES_RETURN',
    place_of_supply: '',
    remarks: '',
    items: []
  });

  const fetchData = useCallback(async () => {
    try {
      const [customersRes, itemsRes, settingsRes, uomsRes, cnRes] = await Promise.all([
        customerService.getCustomers(1, 1000),
        getItems(1, 1000),
        getCompanySettings(),
        getUoms(1, 1000),
        getCreditNoteById(id)
      ]);
      setUoms(Array.isArray(uomsRes.data) ? uomsRes.data : (uomsRes.data?.rows || []));
      
      const cnData = cnRes.data || cnRes;
      const customerList = Array.isArray(customersRes.data) ? customersRes.data : (customersRes.data?.rows || []);
      const itemList = Array.isArray(itemsRes.data) ? itemsRes.data : (itemsRes.data?.rows || []);
      setCompanySettings(settingsRes.data || settingsRes);
      
      // Virtual Injection
      const augmentedCustomers = [...customerList];
      const invCustId = String(cnData.customer_id || cnData.customerId || '').trim();
      if (cnData.customer && !augmentedCustomers.some(c => String(c.id).trim() === invCustId)) {
        augmentedCustomers.push(cnData.customer);
      }
      setCustomers(augmentedCustomers);

      const augmentedItems = [...itemList];
      (cnData.items || []).forEach(oi => {
        const oiId = String(oi.item_id || oi.itemId || '').trim();
        if (oi.item && !augmentedItems.some(i => String(i.id).trim() === oiId)) {
          augmentedItems.push(oi.item);
        }
      });
      setItems(augmentedItems);

      setFormData({
        customer_id: invCustId,
        credit_date: (cnData.credit_note_date || cnData.credit_date || cnData.date || '').split('T')[0],
        original_invoice_id: cnData.sales_invoice_id ? String(cnData.sales_invoice_id).trim() : String(cnData.original_invoice_id || '').trim(),
        reason: cnData.reason || 'SALES_RETURN',
        place_of_supply: String(cnData.place_of_supply || cnData.customer?.state_code || '').trim(),
        remarks: cnData.remarks || '',
        items: (cnData.items || []).map(i => {
          const itemId = String(i.item_id || i.itemId || '').trim();
          const fetchedItem = itemList.find(it => String(it.id) === itemId);
          let itemUomId = i.uom_id || i.item?.uom_id || i.item?.unit_id;
          if (!itemUomId && fetchedItem) {
            itemUomId = fetchedItem.uom_id || fetchedItem.unit_id;
          }
          return {
            item_id: itemId,
            description: i.description || i.item?.name || '',
            qty: !isNaN(parseFloat(i.qty)) ? parseFloat(i.qty) : 1,
            rate: parseFloat(i.rate) || 0,
            gst_rate: parseFloat(i.gst_rate) || 18,
            uom_id: String(itemUomId || '').trim(),
            hsn_code: i.hsn_code || i.item?.hsn_code || (fetchedItem && fetchedItem.hsn_code) || ''
          };
        })
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
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomerChange = async (e) => {
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
      original_invoice_id: '',
      place_of_supply: customer?.state_code || companySettings?.state_code || companySettings?.data?.state_code || ''
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
        newItems[index].uom_id = selectedItem.uom_id || '';
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
          uom_id: '',
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

    const newErrors = {};
    if (!formData.customer_id) newErrors.customer_id = 'Please select a customer';
    if (!formData.credit_date) newErrors.credit_date = 'Return Date is required';
    if (!formData.original_invoice_id) newErrors.original_invoice_id = 'Please select a sales invoice';
    if (!formData.reason) newErrors.reason = 'Reason for Return is required';
    if (!formData.place_of_supply) newErrors.place_of_supply = 'Place of Supply is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        sales_invoice_id: formData.original_invoice_id || null,
        credit_note_date: formData.credit_date,
        items: formData.items.map(item => ({
          ...item,
          amount: parseFloat(item.qty || 0) * parseFloat(item.rate || 0)
        }))
      };
      await updateCreditNote(id, payload);
      toast.success('Credit note updated successfully');
      navigate('/invoicing/credit-notes');
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

      <form onSubmit={handleSubmit} noValidate>
        <div className="card border-0 shadow-sm mb-4">
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
                <label className="form-label fw-600">Return Date <span className="text-danger">*</span></label>
                <input type="date" className={`form-control shadow-none ${errors.credit_date ? 'is-invalid' : ''}`} name="credit_date" value={formData.credit_date} onChange={handleHeaderChange} />
                {errors.credit_date && <div className="invalid-feedback">{errors.credit_date}</div>}
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Against Sales Invoice <span className="text-danger">*</span></label>
                <select className={`form-select shadow-none border ${errors.original_invoice_id ? 'is-invalid' : ''}`} name="original_invoice_id" value={String(formData.original_invoice_id)} onChange={handleHeaderChange} disabled={!formData.customer_id}>
                  <option value="">Select Invoice</option>
                  {customerInvoices.map(inv => (
                    <option key={inv.id} value={String(inv.id)}>{inv.invoice_number}</option>
                  ))}
                </select>
                {errors.original_invoice_id && <div className="invalid-feedback">{errors.original_invoice_id}</div>}
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Reason for Return <span className="text-danger">*</span></label>
                <select className={`form-select shadow-none ${errors.reason ? 'is-invalid' : ''}`} name="reason" value={formData.reason} onChange={handleHeaderChange}>
                  {CREDIT_NOTE_REASONS.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
                {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Place of Supply <span className="text-danger">*</span></label>
                <select className={`form-select shadow-none ${errors.place_of_supply ? 'is-invalid' : ''}`} name="place_of_supply" value={String(formData.place_of_supply)} onChange={handleHeaderChange}>
                   <option value="">Select State</option>
                   {INDIAN_STATES.map(state => (
                     <option key={state.code} value={String(state.code)}>{state.name} ({state.code})</option>
                   ))}
                </select>
                {errors.place_of_supply && <div className="invalid-feedback">{errors.place_of_supply}</div>}
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
                    <th style={{ width: '30%' }}>Item / Description</th>
                    <th style={{ width: '8%' }}>Qty</th>
                    <th style={{ width: '10%' }}>Rate</th>
                    <th style={{ width: '8%' }}>GST %</th>
                    {String(formData.place_of_supply).trim() !== String(companySettings?.state_code || companySettings?.data?.state_code || '27').trim() ? (
                      <th style={{ width: '10%' }}>IGST</th>
                    ) : (
                      <>
                        <th style={{ width: '10%' }}>CGST</th>
                        <th style={{ width: '10%' }}>SGST</th>
                      </>
                    )}
                    <th style={{ width: '12%' }}>Total</th>
                    <th className="text-center" style={{ width: '50px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <select key={`item-${index}-${items.length}`} className="form-select shadow-none border-0 bg-transparent mb-1" value={String(item.item_id)} onChange={(e) => handleItemChange(index, 'item_id', e.target.value)} required>
                          <option value="">Select Item</option>
                          {items.map(i => (
                            <option key={i.id} value={String(i.id)}>{i.name}</option>
                          ))}
                        </select>
                        {item.hsn_code && (
                          <div className="fs-10 text-primary fw-bold ms-2 mb-1">
                            HSN: {item.hsn_code}
                          </div>
                        )}
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
                      {String(formData.place_of_supply).trim() !== String(companySettings?.state_code || companySettings?.data?.state_code || '27').trim() ? (
                        <td className="text-end fs-12 text-muted">
                          ₹{((item.qty || 0) * (item.rate || 0) * (item.gst_rate || 0) / 100).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                      ) : (
                        <>
                          <td className="text-end fs-12 text-muted">
                            ₹{((item.qty || 0) * (item.rate || 0) * (item.gst_rate || 0) / 200).toLocaleString(undefined, {minimumFractionDigits: 2})}
                          </td>
                          <td className="text-end fs-12 text-muted">
                            ₹{((item.qty || 0) * (item.rate || 0) * (item.gst_rate || 0) / 200).toLocaleString(undefined, {minimumFractionDigits: 2})}
                          </td>
                        </>
                      )}
                      <td className="fw-bold text-dark text-end fs-12">
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
