import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { vendorService } from '../services/vendorService';
import { getItems } from '../services/productService';
import { createPurchaseInvoice } from '../services/purchaseInvoiceService';

const AddPurchases = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    purchase_number: `PUR-${Math.floor(100000 + Math.random() * 900000)}`,
    reference_number: '',
    purchase_date: new Date().toISOString().split('T')[0],
    due_date: '',
    vendor_id: '',
    status: 'Pending',
    currency: '₹',
    items: [{ product_id: '', quantity: 1, rate: 0, discount: 0, tax_rate: 18, amount: 0 }],
    notes: '',
    terms: '',
    signature_name: 'Adrian'
  });

  const fetchMasterData = useCallback(async () => {
    try {
      const [vendorsRes, itemsRes] = await Promise.all([
        vendorService.getVendors(1, 1000),
        getItems(1, 1000)
      ]);
      
      setVendors(vendorsRes.data || vendorsRes || []);
      setProducts(itemsRes.data?.rows || itemsRes.data || itemsRes || []);
    } catch (error) {
      console.error("Error fetching master data:", error);
      toast.error("Failed to load vendors or products");
    }
  }, []);

  useEffect(() => {
    fetchMasterData();
  }, [fetchMasterData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    
    // Calculate amount for this item
    if (field === 'product_id') {
      const product = products.find(p => String(p.id) === String(value));
      if (product) {
        newItems[index].rate = product.purchase_price || product.price || 0;
        newItems[index].name = product.name;
      }
    }
    
    const { quantity, rate, discount, tax_rate } = newItems[index];
    const subtotal = quantity * rate;
    const discountAmt = (subtotal * discount) / 100;
    const taxableAmt = subtotal - discountAmt;
    const taxAmt = (taxableAmt * tax_rate) / 100;
    newItems[index].amount = taxableAmt + taxAmt;
    
    setForm(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setForm(prev => ({
      ...prev,
      items: [...prev.items, { product_id: '', quantity: 1, rate: 0, discount: 0, tax_rate: 18, amount: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (form.items.length === 1) return;
    const newItems = form.items.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, items: newItems }));
  };

  const calculateTotal = () => {
    return form.items.reduce((acc, item) => acc + item.amount, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.vendor_id) {
      toast.warning("Please select a vendor");
      return;
    }
    if (form.items.some(item => !item.product_id)) {
      toast.warning("Please select products for all items");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        total_amount: calculateTotal(),
        items: form.items.map(item => ({
          ...item,
          product_id: parseInt(item.product_id)
        }))
      };
      await createPurchaseInvoice(payload);
      toast.success("Purchase invoice created successfully!");
      navigate('/purchases');
    } catch (error) {
      console.error("Error creating purchase invoice:", error);
      toast.error(error.message || "Failed to create purchase invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-11 mx-auto">
          <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
            <div>
              <h6>
                <Link to="/purchases" className="d-flex align-items-center ">
                  <i className="isax isax-arrow-left me-2"></i>Purchase
                </Link>
              </h6>
            </div>
          </div>
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="top-content">
                  <div className="purchase-header mb-3">
                    <h6>Purchase Details</h6>
                  </div>
                  <div className="row justify-content-between">
                    <div className="col-xl-5">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Purchase Id</label>
                          <input type="text" className="form-control" name="purchase_number" value={form.purchase_number} readOnly />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Reference Number</label>
                          <input type="text" className="form-control" name="reference_number" value={form.reference_number} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Purchase Date</label>
                          <input type="date" className="form-control" name="purchase_date" value={form.purchase_date} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Due Date</label>
                          <input type="date" className="form-control" name="due_date" value={form.due_date} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Status</label>
                          <select className="form-select" name="status" value={form.status} onChange={handleInputChange}>
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Currency</label>
                          <select className="form-select" name="currency" value={form.currency} onChange={handleInputChange}>
                            <option value="₹">₹ (INR)</option>
                            <option value="$">$ (USD)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bill-content mt-4">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card shadow-none border">
                        <div className="card-header bg-light">
                          <h6 className="mb-0">Bill From</h6>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <label className="form-label">Vendor Name</label>
                            <select 
                              className="form-select" 
                              name="vendor_id" 
                              value={form.vendor_id} 
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select Vendor</option>
                              {vendors.map(v => (
                                <option key={v.id} value={v.id}>{v.name || v.display_name || v.company_name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="items-details mt-4">
                  <div className="purchase-header mb-3">
                    <h6>Items & Details</h6>
                  </div>
                  <div className="table-responsive rounded border mb-3">
                    <table className="table table-nowrap add-table mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th className="w-30" style={{ width: '30%' }}>Product/Service</th>
                          <th>Quantity</th>
                          <th>Rate</th>
                          <th>Discount (%)</th>
                          <th>Tax (%)</th>
                          <th>Amount</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {form.items.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <select 
                                className="form-select" 
                                value={item.product_id} 
                                onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                                required
                              >
                                <option value="">Select Product</option>
                                {products.map(p => (
                                  <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input 
                                type="number" 
                                className="form-control" 
                                value={item.quantity} 
                                onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                                min="1"
                              />
                            </td>
                            <td>
                              <input 
                                type="number" 
                                className="form-control" 
                                value={item.rate} 
                                onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                              />
                            </td>
                            <td>
                              <input 
                                type="number" 
                                className="form-control" 
                                value={item.discount} 
                                onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value) || 0)}
                              />
                            </td>
                            <td>
                              <input 
                                type="number" 
                                className="form-control" 
                                value={item.tax_rate} 
                                onChange={(e) => handleItemChange(index, 'tax_rate', parseFloat(e.target.value) || 0)}
                              />
                            </td>
                            <td className="align-middle fw-medium">
                              {form.currency} {Number(item.amount || 0).toFixed(2)}
                            </td>
                            <td className="text-center align-middle">
                              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeItem(index)}>
                                <i className="isax isax-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={addItem}>
                    <i className="isax isax-add-circle5 me-1"></i>Add Item
                  </button>
                </div>

                <div className="extra-info mt-4">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="mb-3">
                        <label className="form-label">Additional Notes</label>
                        <textarea className="form-control" name="notes" value={form.notes} onChange={handleInputChange} rows="3"></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Terms & Conditions</label>
                        <textarea className="form-control" name="terms" value={form.terms} onChange={handleInputChange} rows="3"></textarea>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="card bg-light">
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span>{form.currency} {Number(form.items.reduce((acc, i) => acc + (i.quantity * i.rate), 0)).toFixed(2)}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2 text-danger">
                            <span>Total Discount</span>
                            <span>- {form.currency} {Number(form.items.reduce((acc, i) => acc + (i.quantity * i.rate * i.discount / 100), 0)).toFixed(2)}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2 text-success">
                            <span>Total Tax</span>
                            <span>+ {form.currency} {Number(form.items.reduce((acc, i) => acc + ((i.quantity * i.rate * (1 - i.discount / 100)) * i.tax_rate / 100), 0)).toFixed(2)}</span>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <h5 className="mb-0">Total Amount</h5>
                            <h5 className="mb-0 text-primary">{form.currency} {Number(calculateTotal() || 0).toFixed(2)}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between bg-white border-top">
                <Link to="/purchases" className="btn btn-outline-white">Cancel</Link>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : 'Save Purchase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPurchases;
