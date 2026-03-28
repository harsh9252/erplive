import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCustomers } from '../services/customerService';
import { getItems } from '../services/productService';
import { getSalesOrders } from '../services/salesOrderService';
import { getSalesInvoiceById, updateSalesInvoice } from '../services/salesInvoiceService';
import { getWarehouses, getCompanySettings } from '../services/settingsService';
import { toast } from 'react-toastify';
import { INDIAN_STATES } from '../utils/constants';

const EditSalesInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Master data
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const states = INDIAN_STATES;

  const uoms = ['PCS', 'KG', 'LTR', 'MTR', 'BOX', 'SET', 'PAIR', 'NOS'];
  const gstRates = [0, 5, 12, 18, 28];

  const [formData, setFormData] = useState({
    customerId: '',
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    financialYearId: '',
    salesOrderId: '',
    invoiceType: 'B2B',
    placeOfSupply: '27',
    reverseCharge: false,
    remarks: '',
    termsAndConditions: '',
    items: [
      {
        itemId: '',
        description: '',
        hsnCode: '',
        qty: 1,
        uomId: 'PCS',
        rate: 0,
        discountPct: 0,
        discountAmount: 0,
        taxableAmount: 0,
        gstRate: 18,
        igstAmount: 0,
        cgstAmount: 0,
        sgstAmount: 0,
        cessAmount: 0,
        totalAmount: 0,
        warehouseId: '',
      },
    ],
    summary: {
      subtotal: 0,
      totalDiscount: 0,
      taxableAmount: 0,
      igst: 0,
      cgst: 0,
      sgst: 0,
      cess: 0,
      roundOff: 0,
      netTotal: 0,
    },
  });

  // Load data on mount
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const [custRes, itemRes, orderRes, whRes, companyRes, invoiceRes] = await Promise.all([
          getCustomers(1, 1000),
          getItems(1, 1000),
          getSalesOrders(1, 1000),
          getWarehouses(),
          getCompanySettings(),
          getSalesInvoiceById(id)
        ]);

        setCustomers(custRes.data?.rows || custRes.data || []);
        setItems(itemRes.data?.rows || itemRes.data || []);
        setSalesOrders(orderRes.data?.rows || orderRes.data || []);
        setWarehouses(whRes.data || []);
        setCompany(companyRes.data);

        const inv = invoiceRes.data;
        if (inv) {
          setFormData({
            customerId: inv.customer_id,
            invoiceNumber: inv.invoice_number,
            invoiceDate: inv.invoice_date,
            dueDate: inv.due_date,
            financialYearId: inv.financial_year_id || '',
            salesOrderId: inv.sales_order_id || '',
            invoiceType: inv.invoice_type || 'B2B',
            placeOfSupply: inv.place_of_supply || '27',
            reverseCharge: inv.reverse_charge || false,
            remarks: inv.remarks || '',
            termsAndConditions: inv.terms_and_conditions || '',
            items: (inv.items || []).map(item => ({
              itemId: item.item_id,
              description: item.description || '',
              hsnCode: item.hsn_code || '',
              qty: item.qty || 1,
              uomId: item.uom_id || 'PCS',
              rate: item.rate || 0,
              discountPct: item.discount_pct || 0,
              discountAmount: item.discount_amount || 0,
              taxableAmount: item.taxable_amount || 0,
              gstRate: item.gst_rate || 18,
              igstAmount: item.igst_amount || 0,
              cgstAmount: item.cgst_amount || 0,
              sgstAmount: item.sgst_amount || 0,
              cessAmount: item.cess_amount || 0,
              totalAmount: item.total_amount || 0,
              warehouseId: item.warehouse_id || '',
            })),
            summary: {
              subtotal: inv.amount_before_tax || 0,
              totalDiscount: inv.total_discount || 0,
              taxableAmount: inv.taxable_amount || 0,
              igst: inv.igst_total || 0,
              cgst: inv.cgst_total || 0,
              sgst: inv.sgst_total || 0,
              cess: inv.cess_total || 0,
              roundOff: inv.round_off || 0,
              netTotal: inv.net_amount || 0,
            }
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load invoice data');
        navigate('/sales-invoices');
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const calculateLineGST = (item, companyState, placeOfSupply) => {
    const taxable = item.taxableAmount;
    const isInterState = companyState !== placeOfSupply;

    let igst = 0, cgst = 0, sgst = 0, cess = 0;

    if (isInterState) {
      igst = (taxable * item.gstRate) / 100;
    } else {
      cgst = (taxable * item.gstRate) / 2 / 100;
      sgst = (taxable * item.gstRate) / 2 / 100;
    }

    return { igst, cgst, sgst, cess };
  };

  const calculateSummary = (items, placeOfSupply) => {
    const companyState = company?.state_code || '27';
    const subtotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const totalDiscount = items.reduce((sum, item) => sum + item.discountAmount, 0);
    const taxableAmount = items.reduce((sum, item) => sum + item.taxableAmount, 0);
    
    let totalIgst = 0, totalCgst = 0, totalSgst = 0, totalCess = 0;
    
    items.forEach(item => {
      const gst = calculateLineGST(item, companyState, placeOfSupply);
      totalIgst += gst.igst;
      totalCgst += gst.cgst;
      totalSgst += gst.sgst;
      totalCess += gst.cess;
    });

    const beforeRoundOff = taxableAmount + totalIgst + totalCgst + totalSgst + totalCess;
    const netTotal = Math.round(beforeRoundOff);
    const roundOff = netTotal - beforeRoundOff;

    setFormData(prev => ({
      ...prev,
      summary: {
        subtotal,
        totalDiscount,
        taxableAmount,
        igst: totalIgst,
        cgst: totalCgst,
        sgst: totalSgst,
        cess: totalCess,
        roundOff,
        netTotal
      }
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => {
      const updated = { ...prev, [name]: newValue };
      if (name === 'placeOfSupply') {
        calculateSummary(prev.items, newValue);
      }
      return updated;
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === 'qty' || field === 'rate' || field === 'discountPct' || field === 'gstRate') {
      const lineTotal = newItems[index].qty * newItems[index].rate;
      const discAmt = (lineTotal * (newItems[index].discountPct || 0)) / 100;
      newItems[index].discountAmount = discAmt;
      newItems[index].taxableAmount = lineTotal - discAmt;

      const gst = calculateLineGST(newItems[index], company?.state_code || '27', formData.placeOfSupply);
      newItems[index].igstAmount = gst.igst;
      newItems[index].cgstAmount = gst.cgst;
      newItems[index].sgstAmount = gst.sgst;
      newItems[index].cessAmount = gst.cess;
      newItems[index].totalAmount = newItems[index].taxableAmount + gst.igst + gst.cgst + gst.sgst + gst.cess;
    }

    setFormData(prev => ({ ...prev, items: newItems }));
    calculateSummary(newItems, formData.placeOfSupply);
  };

  const handleItemSelect = (index, itemId) => {
    const selectedItem = items.find(i => String(i.id) === String(itemId));
    if (selectedItem) {
      const newItems = [...formData.items];
      newItems[index] = {
        ...newItems[index],
        itemId,
        description: selectedItem.name,
        hsnCode: selectedItem.hsn_code || '',
        uomId: selectedItem.uom_id || 'PCS',
        rate: selectedItem.sales_price || selectedItem.base_price || 0,
        gstRate: selectedItem.tax_rate || 18,
      };
      
      const lineTotal = newItems[index].qty * newItems[index].rate;
      const discAmt = (lineTotal * (newItems[index].discountPct || 0)) / 100;
      newItems[index].discountAmount = discAmt;
      newItems[index].taxableAmount = lineTotal - discAmt;

      const gst = calculateLineGST(newItems[index], company?.state_code || '27', formData.placeOfSupply);
      newItems[index].igstAmount = gst.igst;
      newItems[index].cgstAmount = gst.cgst;
      newItems[index].sgstAmount = gst.sgst;
      newItems[index].totalAmount = newItems[index].taxableAmount + gst.igst + gst.cgst + gst.sgst;

      setFormData(prev => ({ ...prev, items: newItems }));
      calculateSummary(newItems, formData.placeOfSupply);
    }
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        itemId: '',
        description: '',
        hsnCode: '',
        qty: 1,
        uomId: 'PCS',
        rate: 0,
        discountPct: 0,
        discountAmount: 0,
        taxableAmount: 0,
        gstRate: 18,
        igstAmount: 0,
        cgstAmount: 0,
        sgstAmount: 0,
        cessAmount: 0,
        totalAmount: 0,
        warehouseId: warehouses[0]?.id || '',
      }]
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: newItems }));
    calculateSummary(newItems, formData.placeOfSupply);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerId) return toast.error('Please select a customer');
    if (formData.items.some(item => !item.itemId)) return toast.error('Please select items');

    setLoading(true);
    try {
      await updateSalesInvoice(id, formData);
      toast.success('Invoice updated successfully!');
      navigate('/sales-invoices');
    } catch (error) {
      toast.error(error.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="fw-bold mb-1">Edit Sales Invoice</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/sales-invoices">Sales Invoices</Link></li>
              <li className="breadcrumb-item active">Edit #{formData.invoiceNumber}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-16">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <label className="form-label fs-13 text-muted">Customer *</label>
                <select className="form-select fs-14" value={formData.customerId} onChange={(e) => {
                  const cust = customers.find(c => String(c.id) === e.target.value);
                  setFormData(prev => ({
                    ...prev,
                    customerId: e.target.value,
                    placeOfSupply: cust?.state_code || prev.placeOfSupply
                  }));
                }} required>
                  <option value="">Select Customer</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fs-13 text-muted">Invoice Date *</label>
                <input type="date" className="form-control fs-14" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label fs-13 text-muted">Place of Supply *</label>
                <select className="form-select fs-14" name="placeOfSupply" value={formData.placeOfSupply} onChange={handleInputChange} required>
                  {states.map(s => <option key={s.code} value={s.code}>{s.name} ({s.code})</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fs-13 text-muted">Invoice Type</label>
                <select className="form-select fs-14" name="invoiceType" value={formData.invoiceType} onChange={handleInputChange}>
                  <option value="B2B">B2B</option>
                  <option value="B2C">B2C</option>
                  <option value="EXPORT">EXPORT</option>
                </select>
              </div>
            </div>

            <div className="table-responsive border rounded-12 mb-4">
              <table className="table align-middle table-nowrap mb-0">
                <thead className="bg-light fs-12 text-muted fw-bold uppercase">
                  <tr>
                    <th width="25%">Item</th>
                    <th width="15%">Warehouse</th>
                    <th width="10%">Qty</th>
                    <th width="12%">Rate</th>
                    <th width="8%">GST %</th>
                    <th width="12%" className="text-end">Total</th>
                    <th width="50"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <select className="form-select form-select-sm" value={item.itemId} onChange={(e) => handleItemSelect(index, e.target.value)} required>
                          <option value="">Select Item</option>
                          {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                        </select>
                        <small className="text-muted fs-11 mt-1 d-block">HSN: {item.hsnCode || 'N/A'}</small>
                      </td>
                      <td>
                        <select className="form-select form-select-sm" value={item.warehouseId} onChange={(e) => handleItemChange(index, 'warehouseId', e.target.value)}>
                          {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                        </select>
                      </td>
                      <td>
                        <input type="number" className="form-control form-control-sm" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', parseFloat(e.target.value) || 0)} min="0" step="any" />
                      </td>
                      <td>
                        <input type="number" className="form-control form-control-sm" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)} min="0" />
                      </td>
                      <td>
                        <select className="form-select form-select-sm" value={item.gstRate} onChange={(e) => handleItemChange(index, 'gstRate', parseInt(e.target.value))}>
                          {gstRates.map(r => <option key={r} value={r}>{r}%</option>)}
                        </select>
                      </td>
                      <td className="text-end fw-bold">₹{Number(item.totalAmount || 0).toFixed(2)}</td>
                      <td>
                        <button type="button" className="btn btn-link link-danger p-0" onClick={() => removeItem(index)} disabled={formData.items.length === 1}>
                          <i className="isax isax-trash fs-16"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-3 border-top">
                <button type="button" className="btn btn-soft-primary btn-sm" onClick={addItem}>
                  <i className="isax isax-add me-1"></i>Add Row
                </button>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-md-7">
                <label className="form-label fs-13 text-muted">Remarks</label>
                <textarea className="form-control fs-14" rows="3" name="remarks" value={formData.remarks} onChange={handleInputChange} placeholder="Internal notes..."></textarea>
              </div>
              <div className="col-md-5">
                <div className="bg-light p-4 rounded-16">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted fs-13">Subtotal</span>
                    <span className="fw-semibold">₹{Number(formData.summary.subtotal).toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted fs-13">Taxable Amount</span>
                    <span className="fw-semibold">₹{Number(formData.summary.taxableAmount).toLocaleString()}</span>
                  </div>
                  {formData.summary.igst > 0 && (
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted fs-13">IGST Total</span>
                      <span className="fw-semibold">₹{Number(formData.summary.igst).toLocaleString()}</span>
                    </div>
                  )}
                  {formData.summary.cgst > 0 && (
                    <>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted fs-13">CGST Total</span>
                        <span className="fw-semibold">₹{Number(formData.summary.cgst).toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted fs-13">SGST Total</span>
                        <span className="fw-semibold">₹{Number(formData.summary.sgst).toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted fs-13">Round Off</span>
                    <span className="fw-semibold">{formData.summary.roundOff >= 0 ? '+' : ''}₹{Number(formData.summary.roundOff).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold fs-14">Net Total</span>
                    <span className="h5 fw-bold text-primary mb-0">₹{Number(formData.summary.netTotal).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4 pt-4 border-top">
              <Link to="/sales-invoices" className="btn btn-soft-secondary px-4">Cancel</Link>
              <button type="submit" className="btn btn-primary px-5" disabled={loading}>
                {loading ? 'Updating...' : 'Update Invoice'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditSalesInvoice;
