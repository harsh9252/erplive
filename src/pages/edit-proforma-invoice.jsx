import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCustomers } from '../services/customerService';
import { getItems } from '../services/productService';
import { getCompanySettings } from '../services/settingsService';
import { getProformaInvoiceById, updateProformaInvoice } from '../services/proformaInvoiceService';
import { INDIAN_STATES } from '../utils/constants';

const EditProformaInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);
  
  const [formData, setFormData] = useState({
    customerId: '',
    proformaDate: '',
    validUntil: '',
    placeOfSupply: '',
    notes: '',
    remarks: '',
    termsAndConditions: '',
    items: []
  });

  const fetchData = useCallback(async () => {
    setFetching(true);
    try {
      const [custRes, itemRes, settingsRes, proformaRes] = await Promise.all([
        getCustomers(1, 1000),
        getItems(1, 1000),
        getCompanySettings(),
        getProformaInvoiceById(id)
      ]);
      
      setCustomers(Array.isArray(custRes.data) ? custRes.data : (custRes.data?.rows || []));
      setItems(Array.isArray(itemRes.data) ? itemRes.data : (itemRes.data?.rows || []));
      setCompanySettings(settingsRes.data || settingsRes);
      
      const p = proformaRes.data || proformaRes;
      
      if (p.status !== 'DRAFT') {
        toast.warning('Only DRAFT proforma invoices can be edited');
        navigate(`/invoicing/proforma/${id}`);
        return;
      }

      setFormData({
        customerId: p.customer_id || p.customerId,
        proformaDate: (p.proforma_date || p.proformaDate || '').split('T')[0],
        validUntil: (p.valid_until || p.validUntil || '').split('T')[0],
        placeOfSupply: p.place_of_supply || p.placeOfSupply,
        notes: p.notes || '',
        remarks: p.remarks || '',
        termsAndConditions: p.terms_and_conditions || p.termsAndConditions || '',
        items: (p.items || []).map(i => ({
          item_id: i.item_id || i.itemId,
          description: i.description || '',
          qty: i.qty || 1,
          rate: i.rate || 0,
          discount_pct: i.discount_pct || i.discountPct || 0,
          gst_rate: i.gst_rate || i.gstRate || 0
        }))
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load proforma data');
      navigate('/invoicing/proforma');
    } finally {
      setFetching(false);
    }
  }, [id, navigate]);

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
      customerId,
      placeOfSupply: customer?.state_code || prev.placeOfSupply
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
        newItems[index].gst_rate = selectedItem.gst_rate || 18;
      }
    }

    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItemRow = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { item_id: '', description: '', qty: 1, rate: 0, discount_pct: 0, gst_rate: 18 }]
    }));
  };

  const removeItemRow = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, items: newItems }));
    }
  };

  const totals = useMemo(() => {
    let subtotal = 0;
    let totalTax = 0;
    formData.items.forEach(item => {
      const amount = (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0);
      const discount = amount * (parseFloat(item.discount_pct) || 0) / 100;
      const taxable = amount - discount;
      const tax = taxable * (parseFloat(item.gst_rate) || 0) / 100;
      subtotal += taxable;
      totalTax += tax;
    });
    return { subtotal, totalTax, netTotal: Math.round(subtotal + totalTax) };
  }, [formData.items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProformaInvoice(id, formData);
      toast.success('Proforma invoice updated successfully');
      navigate(`/invoicing/proforma/${id}`);
    } catch (error) {
      console.error('Error updating proforma:', error);
      toast.error(error.message || 'Failed to update proforma invoice');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-bold mb-0">Edit Proforma Invoice</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4 border-0 glass-card">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fs-13 fw-bold">Customer Select *</label>
                    <select className="form-select fs-14 transition-all" value={formData.customerId} onChange={handleCustomerChange} required>
                      <option value="">Choose a customer...</option>
                      {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-13 fw-bold">Place of Supply *</label>
                    <select className="form-select fs-14 transition-all" name="placeOfSupply" value={formData.placeOfSupply} onChange={handleHeaderChange} required>
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(state => (
                        <option key={state.code} value={state.code}>{state.name} ({state.code})</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-13 fw-bold">Proforma Date</label>
                    <input type="date" className="form-control fs-14" name="proformaDate" value={formData.proformaDate} onChange={handleHeaderChange} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-13 fw-bold text-primary">Valid Until *</label>
                    <input type="date" className="form-control fs-14 border-primary border-opacity-25" name="validUntil" value={formData.validUntil} onChange={handleHeaderChange} required />
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm mb-4 border-0 glass-card">
              <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
                <h6 className="mb-0 fw-bold">Line Items</h6>
                <button type="button" className="btn btn-primary btn-sm rounded-pill" onClick={addItemRow}>Add Row</button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="px-4">Item / Description</th>
                        <th className="text-center" style={{ width: '80px' }}>Qty</th>
                        <th className="text-center">Rate</th>
                        <th className="text-center">GST %</th>
                        <th className="text-center px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4">
                            <select className="form-select border-0 shadow-none fs-14" value={item.item_id} onChange={(e) => handleItemChange(index, 'item_id', e.target.value)} required>
                              <option value="">Select Item</option>
                              {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                            </select>
                            <input type="text" className="form-control border-0 shadow-none fs-12 text-muted" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} />
                          </td>
                          <td>
                            <input type="number" className="form-control border-0 shadow-none text-center" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} required />
                          </td>
                          <td>
                            <input type="number" className="form-control border-0 shadow-none text-center" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} required />
                          </td>
                          <td>
                            <select className="form-select border-0 shadow-none text-center" value={item.gst_rate} onChange={(e) => handleItemChange(index, 'gst_rate', e.target.value)}>
                              {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                            </select>
                          </td>
                          <td className="text-center px-4">
                            <button type="button" className="btn btn-link link-danger" onClick={() => removeItemRow(index)}>
                              <i className="isax isax-trash fs-18"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0 glass-card">
              <div className="card-body">
                <label className="form-label fs-13 fw-bold text-primary">Proforma Notes</label>
                <textarea className="form-control fs-14 transition-all" rows="3" name="notes" value={formData.notes} onChange={handleHeaderChange} placeholder="Enter specific notes for this proforma..."></textarea>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm border-0 glass-card bg-primary bg-opacity-10 mb-4 p-4">
              <h6 className="fw-bold mb-4">Summary</h6>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted fs-14">Sub Total</span>
                <span className="fw-bold">₹{totals.subtotal.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-primary border-opacity-25">
                <span className="text-muted fs-14">Total Tax</span>
                <span className="fw-bold">₹{totals.totalTax.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="h5 fw-bold mb-0 text-primary">Net Total</span>
                <span className="h4 fw-bold mb-0 text-primary">₹{totals.netTotal.toLocaleString()}</span>
              </div>
              <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold mt-4 transition-all hover-lift" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm me-2"></span>}
                Update Proforma
              </button>
              <button type="button" className="btn btn-link link-secondary w-100 mt-2 text-decoration-none" onClick={() => navigate('/invoicing/proforma')}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProformaInvoice;
