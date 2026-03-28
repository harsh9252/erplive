import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCustomers } from '../services/customerService';
import { getItems } from '../services/productService';
import { getSalesOrders } from '../services/salesOrderService';
import { createSalesInvoice } from '../services/salesInvoiceService';
import { getWarehouses, getCompanySettings } from '../services/settingsService';
import { toast } from 'react-toastify';
import { INDIAN_STATES } from '../utils/constants';

const AddSalesInvoice = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);

  const states = INDIAN_STATES;

  const uoms = ['PCS', 'KGS', 'MTR', 'BOX', 'NOS', 'SET'];
  const gstRates = [0, 5, 12, 18, 28];

  // Fetch master data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, itemRes, orderRes, warehouseRes, companyRes] = await Promise.all([
          getCustomers(1, 1000),
          getItems(1, 1000),
          getSalesOrders(1, 1000),
          getWarehouses(),
          getCompanySettings()
        ]);
        setCustomers(Array.isArray(custRes.data) ? custRes.data : (custRes.data?.rows || []));
        setItems(Array.isArray(itemRes.data) ? itemRes.data : (itemRes.data?.rows || []));
        setSalesOrders(Array.isArray(orderRes.data) ? orderRes.data : (orderRes.data?.rows || []));
        setWarehouses(Array.isArray(warehouseRes.data) ? warehouseRes.data : (warehouseRes.data?.rows || []));
        setCompany(companyRes.data);
      } catch (error) {
        console.error('Error fetching master data:', error);
        toast.error('Failed to load master data');
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    customerId: '',
    invoiceNumber: '', // Backend should generate, but keeping editable for now
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    financialYearId: '',
    salesOrderId: '',
    invoiceType: 'B2B',
    placeOfSupply: '27', // Default to Maharashtra or company state
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

  // Update default place of supply when company is loaded
  useEffect(() => {
    if (company?.state_code) {
      setFormData(prev => ({ ...prev, placeOfSupply: company.state_code }));
    }
  }, [company]);

  // Calculate GST for a line item
  const calculateLineGST = (item, placeOfSupply) => {
    const taxable = item.taxableAmount || 0;
    const companyState = company?.state_code || '27';
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

  // Handle customer selection and auto-fill details
  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    const selectedCustomer = customers.find((c) => String(c.id) === String(customerId));

    setFormData((prev) => {
      const updated = { ...prev, customerId };

      if (selectedCustomer) {
        // Auto-calculate due date based on credit days
        if (prev.invoiceDate) {
          const creditDays = parseInt(selectedCustomer.credit_limit_days || selectedCustomer.credit_days) || 0;
          const dueDate = new Date(prev.invoiceDate);
          dueDate.setDate(dueDate.getDate() + creditDays);
          updated.dueDate = dueDate.toISOString().split('T')[0];
        }
        
        // Auto-update place of supply
        if (selectedCustomer.state_code) {
          updated.placeOfSupply = selectedCustomer.state_code;
        }
      }

      return updated;
    });
  };

  const handleItemSelect = (index, itemId) => {
    const selectedItem = items.find((i) => String(i.id) === String(itemId));
    if (selectedItem) {
      const newItems = [...formData.items];
      newItems[index] = {
        ...newItems[index],
        itemId,
        description: selectedItem.name || '',
        hsnCode: selectedItem.hsn_code || '',
        uomId: selectedItem.uom_id || 'PCS',
        rate: selectedItem.selling_price || selectedItem.base_price || 0,
        gstRate: selectedItem.gst_rate || 18,
        warehouseId: warehouses[0]?.id || ''
      };
      
      // Trigger recalculation
      updateLineCalculations(newItems, index, formData.placeOfSupply);
    }
  };

  const updateLineCalculations = (itemsList, index, placeOfSupply) => {
    const item = itemsList[index];
    const lineTotal = (item.qty || 0) * (item.rate || 0);
    
    // Calculate Discount Amount if Pct is given, or vice versa
    // Here we'll prioritize Pct
    const discountAmount = (lineTotal * (item.discountPct || 0)) / 100;
    item.discountAmount = discountAmount;
    item.taxableAmount = lineTotal - discountAmount;

    // Calculate GST
    const gst = calculateLineGST(item, placeOfSupply);
    item.igstAmount = gst.igst;
    item.cgstAmount = gst.cgst;
    item.sgstAmount = gst.sgst;
    item.cessAmount = gst.cess;
    item.totalAmount = item.taxableAmount + gst.igst + gst.cgst + gst.sgst + gst.cess;

    setFormData((prev) => ({ ...prev, items: itemsList }));
    calculateSummary(itemsList);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    updateLineCalculations(newItems, index, formData.placeOfSupply);
  };

  const calculateSummary = (itemsList) => {
    const subtotal = itemsList.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const totalDiscount = itemsList.reduce((sum, item) => sum + (item.discountAmount || 0), 0);
    const taxableAmount = itemsList.reduce((sum, item) => sum + (item.taxableAmount || 0), 0);
    const igst = itemsList.reduce((sum, item) => sum + (item.igstAmount || 0), 0);
    const cgst = itemsList.reduce((sum, item) => sum + (item.cgstAmount || 0), 0);
    const sgst = itemsList.reduce((sum, item) => sum + (item.sgstAmount || 0), 0);
    const cess = itemsList.reduce((sum, item) => sum + (item.cessAmount || 0), 0);

    const beforeRoundOff = taxableAmount + igst + cgst + sgst + cess;
    const netTotal = Math.round(beforeRoundOff);
    const roundOff = netTotal - beforeRoundOff;

    setFormData((prev) => ({
      ...prev,
      summary: {
        subtotal,
        totalDiscount,
        taxableAmount,
        igst,
        cgst,
        sgst,
        cess,
        roundOff,
        netTotal,
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };

      if (name === 'invoiceDate' && prev.customerId) {
        const selectedCustomer = customers.find((c) => String(c.id) === String(prev.customerId));
        if (selectedCustomer) {
          const creditDays = parseInt(selectedCustomer.credit_limit_days || selectedCustomer.credit_days) || 0;
          const dueDate = new Date(newValue);
          dueDate.setDate(dueDate.getDate() + creditDays);
          updated.dueDate = dueDate.toISOString().split('T')[0];
        }
      }

      if (name === 'placeOfSupply') {
        const newItems = prev.items.map((item) => {
          const gst = calculateLineGST(item, newValue);
          return {
            ...item,
            igstAmount: gst.igst,
            cgstAmount: gst.cgst,
            sgstAmount: gst.sgst,
            totalAmount: item.taxableAmount + gst.igst + gst.cgst + gst.sgst + gst.cess,
          };
        });
        updated.items = newItems;
        calculateSummary(newItems);
      }

      return updated;
    });
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
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
          warehouseId: warehouses[0]?.id || '',
        },
      ],
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: newItems }));
    calculateSummary(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerId) return toast.error('Please select a customer');
    if (formData.items.some((item) => !item.itemId)) return toast.error('Please select an item for all lines');

    setLoading(true);
    try {
      const payload = {
        customer_id: formData.customerId,
        invoice_number: formData.invoiceNumber,
        invoice_date: formData.invoiceDate,
        due_date: formData.dueDate,
        financial_year_id: formData.financialYearId || undefined,
        sales_order_id: formData.salesOrderId || null,
        invoice_type: formData.invoiceType,
        place_of_supply: formData.placeOfSupply,
        reverse_charge: formData.reverseCharge,
        remarks: formData.remarks,
        terms_and_conditions: formData.termsAndConditions,
        items: formData.items.map(item => ({
          item_id: item.itemId,
          description: item.description,
          hsn_code: item.hsnCode,
          qty: parseFloat(item.qty),
          uom_id: item.uomId,
          rate: parseFloat(item.rate),
          discount_pct: parseFloat(item.discountPct),
          gst_rate: parseFloat(item.gstRate),
          warehouse_id: item.warehouseId || null,
        }))
      };

      await createSalesInvoice(payload);
      toast.success('Invoice created successfully!');
      navigate('/sales-invoices');
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error(error.message || 'Failed to create invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Create Sales Invoice</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/sales-invoices">Sales Invoices</Link>
              </li>
              <li className="breadcrumb-item active">Create Invoice</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Header Section */}
            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <label className="form-label fw-600">Customer <span className="text-danger">*</span></label>
                <select
                  className="form-select shadow-none border"
                  value={formData.customerId}
                  onChange={handleCustomerChange}
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map((cust) => (
                    <option key={cust.id} value={cust.id}>{cust.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Invoice No.</label>
                <input
                  type="text"
                  className="form-control shadow-none border"
                  placeholder="Auto-generated if empty"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Invoice Date <span className="text-danger">*</span></label>
                <input
                  type="date"
                  className="form-control shadow-none border"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Due Date</label>
                <input
                  type="date"
                  className="form-control shadow-none border"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row g-3 mb-4 p-3 bg-light rounded-12">
              <div className="col-md-3">
                <label className="form-label fw-600">Invoice Type</label>
                <select
                  className="form-select shadow-none border"
                  name="invoiceType"
                  value={formData.invoiceType}
                  onChange={handleInputChange}
                >
                  <option value="B2B">B2B (Registered)</option>
                  <option value="B2C">B2C (Unregistered)</option>
                  <option value="EXPORT">EXPORT</option>
                  <option value="SEZ">SEZ</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Place of Supply <span className="text-danger">*</span></label>
                <select
                  className="form-select shadow-none border"
                  name="placeOfSupply"
                  value={formData.placeOfSupply}
                  onChange={handleInputChange}
                  required
                >
                  {states.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.code} - {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Against Sales Order</label>
                <select
                  className="form-select shadow-none border"
                  name="salesOrderId"
                  value={formData.salesOrderId}
                  onChange={handleInputChange}
                >
                  <option value="">None</option>
                  {salesOrders.map((so) => (
                    <option key={so.id} value={so.id}>{so.order_number}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <div className="form-check form-switch mb-2">
                  <input
                    className="form-check-input shadow-none"
                    type="checkbox"
                    name="reverseCharge"
                    id="reverseCharge"
                    checked={formData.reverseCharge}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label fw-600" htmlFor="reverseCharge">Reverse Charge (RCM)</label>
                </div>
              </div>
            </div>

            {/* Line Items Section */}
            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="fw-bold mb-0">Invoice Items</h6>
                <button type="button" className="btn btn-sm btn-soft-primary px-3 rounded-pill" onClick={addItem}>
                  <i className="isax isax-add-circle me-1"></i>Add Row
                </button>
              </div>
              
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="bg-light">
                    <tr className="fs-12 fw-bold text-muted text-uppercase">
                      <th style={{minWidth: '200px'}}>Item Details</th>
                      <th style={{minWidth: '150px'}}>Warehouse</th>
                      <th width="100">Qty</th>
                      <th width="100">Rate</th>
                      <th width="100">Disc %</th>
                      <th width="120">Taxable</th>
                      <th width="100">GST %</th>
                      <th width="150">Total</th>
                      <th width="50"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <select
                            className="form-select form-select-sm shadow-none border-0 bg-transparent mb-1"
                            value={item.itemId}
                            onChange={(e) => handleItemSelect(index, e.target.value)}
                            required
                          >
                            <option value="">Select Item</option>
                            {items.map((itm) => (
                              <option key={itm.id} value={itm.id}>{itm.name}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            className="form-control form-control-sm shadow-none border-0 bg-transparent fs-11 text-muted"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            placeholder="Add description..."
                          />
                        </td>
                        <td>
                          <select
                            className="form-select form-select-sm shadow-none border-0 bg-transparent"
                            value={item.warehouseId}
                            onChange={(e) => handleItemChange(index, 'warehouseId', e.target.value)}
                            required
                          >
                            <option value="">Select</option>
                            {warehouses.map((w) => (
                              <option key={w.id} value={w.id}>{w.name}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm shadow-none border-0 bg-transparent text-center"
                            value={item.qty}
                            onChange={(e) => handleItemChange(index, 'qty', parseFloat(e.target.value) || 0)}
                            min="0.001"
                            step="any"
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm shadow-none border-0 bg-transparent text-end"
                            value={item.rate}
                            onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm shadow-none border-0 bg-transparent text-end"
                            value={item.discountPct}
                            onChange={(e) => handleItemChange(index, 'discountPct', parseFloat(e.target.value) || 0)}
                            min="0"
                            max="100"
                          />
                        </td>
                        <td className="text-end fw-semibold fs-13">
                          ₹{(item.taxableAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td>
                          <select
                            className="form-select form-select-sm shadow-none border-0 bg-transparent"
                            value={item.gstRate}
                            onChange={(e) => handleItemChange(index, 'gstRate', parseFloat(e.target.value) || 0)}
                          >
                            {gstRates.map((rate) => (
                              <option key={rate} value={rate}>{rate}%</option>
                            ))}
                          </select>
                        </td>
                        <td className="text-end fw-bold text-dark fs-13">
                          ₹{(item.totalAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="text-center">
                          {formData.items.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-link link-danger p-0 shadow-none border-0"
                              onClick={() => removeItem(index)}
                            >
                              <i className="isax isax-trash fs-18"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-md-7">
                <div className="mb-3">
                  <label className="form-label fw-600 text-muted fs-12 uppercase">Remarks</label>
                  <textarea
                    className="form-control shadow-none border border-dashed p-3"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Brief description or internal notes..."
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-600 text-muted fs-12 uppercase">Terms & Conditions</label>
                  <textarea
                    className="form-control shadow-none border border-dashed p-3"
                    name="termsAndConditions"
                    value={formData.termsAndConditions}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Standard payment terms, warranty info, etc."
                  ></textarea>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card bg-light border-0 rounded-16 p-2">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Sub Total</span>
                      <span className="fw-semibold text-dark">₹{formData.summary.subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Line Discount</span>
                      <span className="fw-semibold text-danger">- ₹{formData.summary.totalDiscount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Taxable Amount</span>
                      <span className="fw-semibold text-dark">₹{formData.summary.taxableAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <hr className="my-3 border-secondary border-opacity-10" />
                    
                    {formData.summary.igst > 0 && (
                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">IGST Total</span>
                        <span className="fw-semibold text-dark">₹{formData.summary.igst.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                      </div>
                    )}
                    {formData.summary.cgst > 0 && (
                      <>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="text-muted">CGST Total</span>
                          <span className="fw-semibold text-dark">₹{formData.summary.cgst.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="text-muted">SGST Total</span>
                          <span className="fw-semibold text-dark">₹{formData.summary.sgst.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Round Off</span>
                      <span className="fw-semibold text-dark">{formData.summary.roundOff >= 0 ? '+' : ''}₹{formData.summary.roundOff.toFixed(2)}</span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center mt-4 bg-primary bg-opacity-10 p-3 rounded-12">
                      <span className="h6 mb-0 fw-bold text-primary">NET TOTAL</span>
                      <span className="h5 mb-0 fw-bold text-primary">₹{formData.summary.netTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 mt-5">
              <Link to="/sales-invoices" className="btn btn-outline-secondary px-5 rounded-pill shadow-none border">
                Discard Changes
              </Link>
              <button type="submit" className="btn btn-primary px-5 rounded-pill shadow-none border-0" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Processing...
                  </>
                ) : (
                  'Generate Invoice'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSalesInvoice;
