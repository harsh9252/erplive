import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCustomers } from '../services/customerService';
import { getItems } from '../services/productService';
import { getCompanySettings } from '../services/settingsService';
import { createProformaInvoice } from '../services/proformaInvoiceService';
import { INDIAN_STATES } from '../utils/constants';

const AddProformaInvoice = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);
  
  const [formData, setFormData] = useState({
    customerId: '',
    proformaDate: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    placeOfSupply: '',
    notes: '',
    remarks: '',
    termsAndConditions: '',
    items: [
      { item_id: '', description: '', qty: 1, rate: 0, discount_pct: 0, gst_rate: 18 }
    ]
  });

  const fetchData = useCallback(async () => {
    try {
      const [custRes, itemRes, settingsRes] = await Promise.all([
        getCustomers(1, 1000),
        getItems(1, 1000),
        getCompanySettings()
      ]);
      
      setCustomers(Array.isArray(custRes.data) ? custRes.data : (custRes.data?.rows || []));
      setItems(Array.isArray(itemRes.data) ? itemRes.data : (itemRes.data?.rows || []));
      setCompanySettings(settingsRes.data || settingsRes);
      
      if (settingsRes.data?.state_code || settingsRes.state_code) {
        setFormData(prev => ({ 
          ...prev, 
          placeOfSupply: settingsRes.data?.state_code || settingsRes.state_code 
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
    const isInterState = formData.placeOfSupply !== (companySettings?.state_code || companySettings?.data?.state_code);

    formData.items.forEach(item => {
      const amount = (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0);
      const discount = amount * (parseFloat(item.discount_pct) || 0) / 100;
      const taxable = amount - discount;
      const tax = taxable * (parseFloat(item.gst_rate) || 0) / 100;
      subtotal += taxable;
      totalTax += tax;
    });

    return { subtotal, totalTax, netTotal: Math.round(subtotal + totalTax) };
  }, [formData.items, formData.placeOfSupply, companySettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerId || !formData.items[0].item_id) {
      toast.error('Please select a customer and at least one item');
      return;
    }

    setLoading(true);
    try {
      await createProformaInvoice(formData);
      toast.success('Proforma invoice created successfully');
      navigate('/invoicing/proforma');
    } catch (error) {
      console.error('Error creating proforma:', error);
      toast.error(error.message || 'Failed to create proforma invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-1">New Proforma Invoice</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/invoicing/proforma">Proforma Invoices</Link></li>
              <li className="breadcrumb-item active">Add Proforma</li>
            </ol>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4 glass-card overflow-hidden">
              <div className="card-header bg-white py-3 border-0">
                <h6 className="mb-0 fw-bold d-flex align-items-center"><i className="isax isax-customer me-2 text-primary"></i>Customer Information</h6>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fs-13 fw-bold text-dark">Customer Select <span className="text-danger">*</span></label>
                    <select className="form-select form-select-lg shadow-none fs-14 transition-all focus-ring" value={formData.customerId} onChange={handleCustomerChange} required>
                      <option value="">Choose a customer...</option>
                      {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-13 fw-bold text-dark">Place of Supply <span className="text-danger">*</span></label>
                    <select className="form-select form-select-lg shadow-none fs-14 transition-all focus-ring" name="placeOfSupply" value={formData.placeOfSupply} onChange={handleHeaderChange} required>
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(state => (
                        <option key={state.code} value={state.code}>{state.name} ({state.code})</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-13 fw-bold text-dark">Proforma Date</label>
                    <input type="date" className="form-control form-control-lg shadow-none fs-14 transition-all focus-ring" name="proformaDate" value={formData.proformaDate} onChange={handleHeaderChange} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fs-13 fw-bold text-dark text-primary">Valid Until <span className="text-danger">*</span></label>
                    <input type="date" className="form-control form-control-lg shadow-none fs-14 transition-all focus-ring border-primary border-opacity-25" name="validUntil" value={formData.validUntil} onChange={handleHeaderChange} required />
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm mb-4 glass-card">
              <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                <h6 className="mb-0 fw-bold d-flex align-items-center"><i className="isax isax-box me-2 text-primary"></i>Line Items</h6>
                <button type="button" className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm border-0 transition-all hover-lift" onClick={addItemRow}>
                  <i className="isax isax-add me-1"></i>Add Row
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead className="bg-light bg-opacity-50">
                      <tr>
                        <th className="px-4" style={{ width: '40%' }}>Item / Description</th>
                        <th className="text-center">Qty</th>
                        <th className="text-center">Rate</th>
                        <th className="text-center">GST %</th>
                        <th className="text-center px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, index) => (
                        <tr key={index} className="transition-all hover-bg-light">
                          <td className="px-4">
                            <select className="form-select border-0 bg-transparent shadow-none" value={item.item_id} onChange={(e) => handleItemChange(index, 'item_id', e.target.value)} required>
                              <option value="">Select Item</option>
                              {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                            </select>
                            <input type="text" className="form-control border-0 bg-transparent shadow-none fs-12 text-muted mt-n1" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Add description..." />
                          </td>
                          <td className="text-center">
                            <input type="number" className="form-control border-0 bg-transparent shadow-none text-center" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} min="1" step="any" required />
                          </td>
                          <td className="text-center">
                            <input type="number" className="form-control border-0 bg-transparent shadow-none text-center" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} step="any" required />
                          </td>
                          <td className="text-center">
                            <select className="form-select border-0 bg-transparent shadow-none text-center" value={item.gst_rate} onChange={(e) => handleItemChange(index, 'gst_rate', e.target.value)}>
                              {[0, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                            </select>
                          </td>
                          <td className="text-center px-4">
                            <button type="button" className="btn btn-link link-danger p-0 border-0 opacity-50 hover-opacity-100" onClick={() => removeItemRow(index)}>
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

            <div className="card border-0 shadow-sm glass-card mb-4">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label fs-13 fw-bold text-dark text-primary">Proforma Notes</label>
                        <textarea className="form-control shadow-none fs-14 transition-all focus-ring p-3" rows="3" name="notes" value={formData.notes} onChange={handleHeaderChange} placeholder="Enter specific notes for this proforma (Visible to customer)..."></textarea>
                    </div>
                </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: '2rem' }}>
              <div className="card border-0 shadow-sm glass-card bg-primary bg-opacity-10 overflow-hidden mb-4">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-4 d-flex align-items-center"><i className="isax isax-calculator me-2"></i>Summary</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Sub Total</span>
                    <span className="fw-bold fs-15 text-dark">₹{totals.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-primary border-opacity-25">
                    <span className="text-muted">Total Tax</span>
                    <span className="fw-bold fs-15 text-dark">₹{totals.totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 fw-bold mb-0 text-primary">Net Amount</span>
                    <span className="h4 fw-bold mb-0 text-primary">₹{totals.netTotal.toLocaleString()}</span>
                  </div>
                </div>
                <div className="card-footer bg-white py-4 px-4 border-0">
                  <div className="row g-2">
                    <div className="col-12 mb-2">
                      <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm border-0 transition-all hover-lift d-flex align-items-center justify-content-center" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm me-2" role="status"></span>}
                        <i className="isax isax-tick-circle me-2"></i>Create Proforma
                      </button>
                    </div>
                    <div className="col-12">
                      <button type="button" className="btn btn-link link-secondary w-100 fs-14 py-2 border-0 text-decoration-none hover-text-primary" onClick={() => navigate('/invoicing/proforma')}>
                        Cancel & Go Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm glass-card">
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label fs-13 fw-bold text-dark">Remarks (Internal)</label>
                    <textarea className="form-control shadow-none fs-14 border-0 bg-light bg-opacity-50" rows="3" name="remarks" value={formData.remarks} onChange={handleHeaderChange} placeholder="Add internal follow-up notes..."></textarea>
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

export default AddProformaInvoice;
