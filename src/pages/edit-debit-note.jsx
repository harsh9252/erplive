import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import vendorService from '../services/vendorService';
import { getItems, searchItems } from '../services/itemService';
import AsyncSearchableSelect from '../components/AsyncSearchableSelect';
import { getCompanySettings } from '../services/settingsService';
import { getPurchaseInvoices } from '../services/purchaseInvoiceService';
import { getDebitNoteById, updateDebitNote } from '../services/debitNoteService';
import { getUoms } from '../services/uomService';
import { INDIAN_STATES } from '../utils/constants';
import { useAuth } from '../components/AuthContext';

const EditDebitNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeCompany } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [uoms, setUoms] = useState([]);
  const [vendorInvoices, setVendorInvoices] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    vendor_id: '',
    debit_date: '',
    original_invoice_id: '',
    reason: '',
    place_of_supply: '',
    remarks: '',
    invoice_layout: '',
    items: []
  });

  const isServiceOnly = useMemo(() => {
    return localStorage.getItem('businessNature') === 'SERVICES' ||
      companySettings?.business_nature?.toUpperCase() === 'SERVICES' ||
      activeCompany?.business_nature?.toUpperCase() === 'SERVICES';
  }, [companySettings, activeCompany]);

  const fetchData = useCallback(async () => {
    try {
      const [vendorsRes, itemsRes, settingsRes, uomsRes, dnRes] = await Promise.all([
        vendorService.getVendors({ page: 1, limit: 1000 }),
        getItems(1, 1000),
        getCompanySettings(),
        getUoms(1, 1000),
        getDebitNoteById(id)
      ]);
      setUoms(Array.isArray(uomsRes.data) ? uomsRes.data : (uomsRes.data?.rows || []));

      const dnData = dnRes.data || dnRes;
      setVendors(Array.isArray(vendorsRes.data) ? vendorsRes.data : (vendorsRes.data?.rows || []));
      const itemsList = Array.isArray(itemsRes.data) ? itemsRes.data : (itemsRes.data?.rows || []);
      const augmentedItems = [...itemsList];
      (dnData.items || []).forEach(oi => {
        const oiId = String(oi.item_id || oi.itemId || '').trim();
        if (oi.item && !augmentedItems.some(i => String(i.id).trim() === oiId)) {
          augmentedItems.push(oi.item);
        }
      });
      setItems(augmentedItems);
      setCompanySettings(settingsRes.data || settingsRes);

      const isServiceOnlyLocal = localStorage.getItem('businessNature') === 'SERVICES' ||
        (settingsRes.data || settingsRes)?.business_nature?.toUpperCase() === 'SERVICES' ||
        activeCompany?.business_nature?.toUpperCase() === 'SERVICES';

      setFormData({
        vendor_id: dnData.vendor_id,
        debit_date: (dnData.debit_note_date || dnData.debit_date || dnData.date || '').split('T')[0],
        original_invoice_id: dnData.purchase_invoice_id ? String(dnData.purchase_invoice_id).trim() : String(dnData.original_invoice_id || '').trim(),
        reason: dnData.reason || '',
        place_of_supply: String(dnData.place_of_supply || '').trim(),
        remarks: dnData.remarks || '',
        invoice_layout: isServiceOnlyLocal ? 'SERVICES' : (dnData.invoice_type === 'SERVICE' ? 'SERVICES' : dnData.invoice_type === 'ECOMMERCE' ? 'ECOMMERCE' : (dnData.invoice_layout || 'PRODUCTS')),
        ecommerce_operator_gstin: dnData.ecommerce_gstin || '',
        items: (dnData.items || []).map(i => {
          const itemId = String(i.item_id || i.itemId || '').trim();
          const fetchedItem = itemsList.find(it => String(it.id) === itemId);
          return {
            item_id: itemId,
            description: i.description || i.item?.name || '',
            qty: !isNaN(parseFloat(i.qty)) ? parseFloat(i.qty) : 1,
            rate: parseFloat(i.rate) || 0,
            gst_rate: parseFloat(i.gst_rate) || 18,
            hsn_code: i.hsn_code || i.item?.hsn_code || (fetchedItem && fetchedItem.hsn_code) || '',
            discount_pct: parseFloat(i.discount_pct || i.discount_percent || i.discount || 0),
            tax_type: i.tax_type || i.taxType || 'TAXABLE'
          };
        })
      });

      if (dnData.vendor_id) {
        const invRes = await getPurchaseInvoices(1, 1000, '', '', dnData.vendor_id);
        setVendorInvoices(Array.isArray(invRes.data) ? invRes.data : (invRes.data?.rows || []));
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

  useEffect(() => {
    if (isServiceOnly) {
      setFormData(prev => ({ ...prev, invoice_layout: 'SERVICES' }));
    }
  }, [isServiceOnly]);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVendorChange = async (e) => {
    const vendorId = e.target.value;
    setErrors(prev => {
      const newErr = { ...prev };
      if (newErr.vendor_id) newErr.vendor_id = null;
      if (newErr.place_of_supply) newErr.place_of_supply = null;
      return newErr;
    });
    const vendor = vendors.find(v => String(v.id) === String(vendorId));
    setFormData(prev => ({
      ...prev,
      vendor_id: vendorId,
      original_invoice_id: '',
      place_of_supply: vendor?.state_code || companySettings?.state_code || companySettings?.data?.state_code || ''
    }));

    if (vendorId) {
      try {
        const res = await getPurchaseInvoices(1, 1000, '', '', vendorId);
        setVendorInvoices(Array.isArray(res.data) ? res.data : (res.data?.rows || []));
      } catch (error) {
        console.error('Error fetching vendor invoices:', error);
      }
    } else {
      setVendorInvoices([]);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === 'item_id') {
      const isObject = typeof value === 'object' && value !== null;
      const selectedItem = isObject ? value : items.find(i => String(i.id) === String(value));

      if (isObject) {
        newItems[index][field] = value.id || '';
      }

      if (selectedItem) {
        newItems[index].description = selectedItem.name || '';
        newItems[index].rate = selectedItem.price || 0;
        newItems[index].gst_rate = selectedItem.gst_rate || 18;
        newItems[index].uom_id = selectedItem.uom_id || '';
        newItems[index].hsn_code = selectedItem.hsn_code || '';
        newItems[index].discount_pct = 0;
        newItems[index].tax_type = 'TAXABLE';
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
          hsn_code: '',
          discount_pct: 0,
          tax_type: 'TAXABLE'
        }
      ]
    }));
  };

  const searchItemsFiltered = useCallback(async (query) => {
    const isServices = formData.invoice_layout === 'SERVICES';
    const res = await searchItems(query, 20, isServices ? { inventory_type: 'Service' } : {});
    const results = Array.isArray(res.data) ? res.data : (res?.data?.rows || res?.data?.items || []);
    if (isServices) {
      return { data: results.filter(i => String(i.inventory_type).toLowerCase() === 'service') };
    }
    return { data: results };
  }, [formData.invoice_layout]);

  const removeItemRow = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, items: newItems }));
    }
  };

  const getLineTotals = (item) => {
    const isServices = formData.invoice_layout === 'SERVICES';
    const qty = isServices ? 1 : (parseFloat(item.qty) || 0);
    const rate = parseFloat(item.rate) || 0;
    const discountPct = isServices ? 0 : (parseFloat(item.discount_pct || item.discount) || 0);
    const amount = qty * rate;
    const discount = amount * (discountPct / 100);
    const totalNet = amount - discount;
    const gstRate = parseFloat(item.gst_rate) || 0;

    let taxable = totalNet;
    let taxRes = 0;

    if (item.tax_type === 'INCLUSIVE') {
      taxable = totalNet / (1 + gstRate / 100);
      taxRes = totalNet - taxable;
    } else if (item.tax_type === 'EXEMPT' || item.tax_type === 'NIL_RATED' || item.tax_type === 'NON_GST') {
      taxable = totalNet;
      taxRes = 0;
    } else {
      taxable = totalNet;
      taxRes = taxable * gstRate / 100;
    }

    const lineTotal = taxable + taxRes;

    return {
      taxable,
      taxRes,
      lineTotal
    };
  };

  const summary = useMemo(() => {
    let subtotal = 0;
    let totalTax = 0;
    const taxBreakdown = {};
    const companyState = companySettings?.state_code || companySettings?.data?.state_code;
    const isInterState = formData.place_of_supply !== companyState;

    formData.items.forEach(item => {
      const line = getLineTotals(item);
      subtotal += line.taxable;
      totalTax += line.taxRes;

      if (isInterState) {
        taxBreakdown[`IGST ${item.gst_rate}%`] = (taxBreakdown[`IGST ${item.gst_rate}%`] || 0) + line.taxRes;
      } else {
        const rate = (parseFloat(item.gst_rate) || 0) / 2;
        taxBreakdown[`CGST ${rate}%`] = (taxBreakdown[`CGST ${rate}%`] || 0) + (line.taxRes / 2);
        taxBreakdown[`SGST ${rate}%`] = (taxBreakdown[`SGST ${rate}%`] || 0) + (line.taxRes / 2);
      }
    });

    return { subtotal, totalTax, taxBreakdown, netTotal: Math.round(subtotal + totalTax) };
  }, [formData.items, formData.place_of_supply, companySettings, formData.invoice_layout]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.vendor_id) newErrors.vendor_id = 'Please select a vendor';
    if (!formData.debit_date) newErrors.debit_date = 'Return Date is required';
    if (!formData.original_invoice_id) newErrors.original_invoice_id = 'Please select a purchase invoice';
    if (!formData.reason) newErrors.reason = 'Reason for Return is required';
    if (!formData.place_of_supply) newErrors.place_of_supply = 'Place of Supply is required';

    if (formData.invoice_layout === 'ECOMMERCE') {
      if (!formData.ecommerce_operator_gstin || formData.ecommerce_operator_gstin.trim() === '') {
        newErrors.ecommerce_operator_gstin = 'E-Commerce GSTIN is required';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      const isServices = formData.invoice_layout === 'SERVICES';
      const payload = {
        ...formData,
        purchase_invoice_id: formData.original_invoice_id || null,
        debit_note_date: formData.debit_date,
        invoice_type: formData.invoice_layout === 'PRODUCTS' ? 'PRODUCT' : formData.invoice_layout === 'SERVICES' ? 'SERVICE' : 'ECOMMERCE',
        ecommerce_gstin: formData.invoice_layout === 'ECOMMERCE' ? (formData.ecommerce_operator_gstin || null) : null,
        items: formData.items.map(item => ({
          ...item,
          qty: isServices ? 1 : parseFloat(item.qty || 0),
          uom_id: isServices ? null : item.uom_id || null,
          discount: isServices ? 0 : parseFloat(item.discount_pct || item.discount || 0),
          discount_percent: isServices ? 0 : parseFloat(item.discount_pct || item.discount || 0),
          discount_pct: isServices ? 0 : parseFloat(item.discount_pct || item.discount || 0),
          amount: (isServices ? 1 : parseFloat(item.qty || 0)) * parseFloat(item.rate || 0)
        }))
      };
      await updateDebitNote(id, payload);
      toast.success('Debit note updated successfully');
      navigate('/invoicing/debit-notes');
    } catch (error) {
      console.error('Error updating debit note:', error);
      toast.error(error.message || 'Failed to update debit note');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Edit Debit Note</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/invoicing/debit-notes">Debit Notes</Link></li>
              <li className="breadcrumb-item active">Edit Draft</li>
            </ol>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {(() => {
          if (isServiceOnly) return null;
          return (
            <div className="card border-0 bg-light p-3 mb-4 rounded-3 text-center">
              <h6 className="fw-bold mb-2">Select Return Layout</h6>
              <div className="d-flex justify-content-center gap-3">
                <button
                  type="button"
                  className={`btn px-4 py-2 ${formData.invoice_layout === 'PRODUCTS' ? 'btn-primary' : 'btn-outline-primary bg-white'}`}
                  onClick={() => setFormData(prev => ({ ...prev, invoice_layout: 'PRODUCTS' }))}
                >
                  <i className="isax isax-box me-2"></i>Product-Based
                </button>
                <button
                  type="button"
                  className={`btn px-4 py-2 ${formData.invoice_layout === 'SERVICES' ? 'btn-primary' : 'btn-outline-primary bg-white'}`}
                  onClick={() => setFormData(prev => ({ ...prev, invoice_layout: 'SERVICES' }))}
                >
                  <i className="isax isax-activity me-2"></i>Service-Based
                </button>
                <button
                  type="button"
                  className={`btn px-4 py-2 ${formData.invoice_layout === 'ECOMMERCE' ? 'btn-primary' : 'btn-outline-primary bg-white'}`}
                  onClick={() => setFormData(prev => ({ ...prev, invoice_layout: 'ECOMMERCE' }))}
                >
                  <i className="isax isax-shopping-bag me-2"></i>E-Commerce Operator
                </button>
              </div>
            </div>
          );
        })()}

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-600">Vendor <span className="text-danger">*</span></label>
                <select className={`form-select shadow-none ${errors.vendor_id ? 'is-invalid' : ''}`} name="vendor_id" value={formData.vendor_id} onChange={handleVendorChange}>
                  <option value="">Select Vendor</option>
                  {vendors.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
                {errors.vendor_id && <div className="invalid-feedback">{errors.vendor_id}</div>}
              </div>
              <div className="col-md-2">
                <label className="form-label fw-600">Return Date <span className="text-danger">*</span></label>
                <input type="date" className={`form-control shadow-none ${errors.debit_date ? 'is-invalid' : ''}`} name="debit_date" value={formData.debit_date} onChange={handleHeaderChange} />
                {errors.debit_date && <div className="invalid-feedback">{errors.debit_date}</div>}
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Against Purchase Invoice <span className="text-danger">*</span></label>
                <select className={`form-select shadow-none border ${errors.original_invoice_id ? 'is-invalid' : ''}`} name="original_invoice_id" value={formData.original_invoice_id} onChange={handleHeaderChange} disabled={!formData.vendor_id}>
                  <option value="">Select Invoice</option>
                  {vendorInvoices.map(inv => (
                    <option key={inv.id} value={inv.id}>{inv.invoice_number}</option>
                  ))}
                </select>
                {errors.original_invoice_id && <div className="invalid-feedback">{errors.original_invoice_id}</div>}
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">Reason <span className="text-danger">*</span></label>
                <select
                  className={`form-select shadow-none ${errors.reason ? 'is-invalid' : ''}`}
                  name="reason"
                  value={formData.reason || ""}
                  onChange={handleHeaderChange}
                >
                  <option value="">Select Reason</option>
                  <option value="PURCHASE_RETURN">Goods returned to vendor</option>
                  <option value="PRICE_DIFFERENCE">Price difference</option>
                  <option value="QUANTITY_SHORTAGE">Quantity shortage</option>
                  <option value="QUALITY_ISSUE">Quality issue</option>
                  <option value="OTHERS">Others</option>
                </select>
                {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
              </div>
              <div className="col-md-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label fw-600 mb-0">Place of Supply <span className="text-danger">*</span></label>
                  <span className={`badge ${String(formData.place_of_supply).trim() !== String(companySettings?.state_code || companySettings?.data?.state_code || '27').trim() ? 'bg-info' : 'bg-success'} px-2 py-1`}>
                    {String(formData.place_of_supply).trim() !== String(companySettings?.state_code || companySettings?.data?.state_code || '27').trim() ? 'INTER-STATE (IGST)' : 'INTRA-STATE (CGST+SGST)'}
                  </span>
                </div>
                <select className={`form-select shadow-none ${errors.place_of_supply ? 'is-invalid' : ''}`} name="place_of_supply" value={formData.place_of_supply} onChange={handleHeaderChange}>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state.code} value={state.code}>{state.name} ({state.code})</option>
                  ))}
                </select>
                {errors.place_of_supply && <div className="invalid-feedback">{errors.place_of_supply}</div>}
              </div>

              {formData.invoice_layout === 'ECOMMERCE' && (
                <div className="col-md-3">
                  <label className="form-label fw-600">E-Commerce Operator GSTIN <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control shadow-none ${errors.ecommerce_operator_gstin ? 'is-invalid' : ''}`}
                    name="ecommerce_operator_gstin"
                    value={formData.ecommerce_operator_gstin || ''}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, ecommerce_operator_gstin: e.target.value.toUpperCase() }));
                    }}
                    placeholder="Enter Operator's GSTIN"
                  />
                  {errors.ecommerce_operator_gstin && <div className="invalid-feedback">{errors.ecommerce_operator_gstin}</div>}
                </div>
              )}
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
            <div className="table-responsive-none">
              <table className="table table-nowrap align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th style={{ width: formData.invoice_layout === "SERVICES" ? "35%" : "25%" }}>
                      {formData.invoice_layout === "SERVICES" ? "Service / Description" : "Item / Description"}
                    </th>
                    {formData.invoice_layout !== "SERVICES" && <th style={{ width: "8%" }}>Qty</th>}
                    <th style={{ width: "10%" }}>Rate</th>
                    <th style={{ width: "10%" }}>Tax Type</th>
                    {formData.invoice_layout !== "SERVICES" && <th style={{ width: "8%" }}>Disc %</th>}
                    <th style={{ width: "8%" }}>GST %</th>
                    {String(formData.place_of_supply).trim() !== String(companySettings?.state_code || companySettings?.data?.state_code || '27').trim() ? (
                      <th style={{ width: "10%" }}>IGST</th>
                    ) : (
                      <>
                        <th style={{ width: "10%" }}>CGST</th>
                        <th style={{ width: "10%" }}>SGST</th>
                      </>
                    )}
                    <th style={{ width: "12%" }}>Total</th>
                    <th className="text-center" style={{ width: "50px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => {
                    const line = getLineTotals(item);
                    return (
                      <tr key={index}>
                        <td>
                          <div className="mb-1">
                            <AsyncSearchableSelect
                              key={`item-select-${formData.invoice_layout}-${index}`}
                              searchFn={searchItemsFiltered}
                              onSelect={(selectedItem) =>
                                handleItemChange(index, "item_id", selectedItem)
                              }
                              placeholder={formData.invoice_layout === "SERVICES" ? "Search service..." : "Search item..."}
                              defaultValue={item.item_id ? { id: item.item_id, name: items.find(i => String(i.id) === String(item.item_id))?.name || item.description || 'Selected Item' } : null}
                              displayKey="name"
                            />
                          </div>
                          {item.hsn_code && (
                            <div className="fs-10 text-primary fw-bold mb-1">
                              {formData.invoice_layout === "SERVICES" ? "SAC" : "HSN"}: {item.hsn_code}
                            </div>
                          )}
                          <input
                            type="text"
                            className="form-control shadow-none border-0 bg-transparent fs-12 text-muted mt-n2"
                            value={item.description}
                            onChange={(e) =>
                              handleItemChange(index, "description", e.target.value)
                            }
                            placeholder="Note for return..."
                          />
                        </td>
                        {formData.invoice_layout !== "SERVICES" && (
                          <td>
                            <input
                              type="number"
                              className="form-control shadow-none border-0 bg-transparent text-center"
                              value={item.qty}
                              onChange={(e) =>
                                handleItemChange(index, "qty", e.target.value)
                              }
                              min="0.1"
                              step="any"
                              required
                            />
                          </td>
                        )}
                        <td>
                          <input
                            type="number"
                            className="form-control shadow-none border-0 bg-transparent"
                            value={item.rate}
                            onChange={(e) =>
                              handleItemChange(index, "rate", e.target.value)
                            }
                            step="any"
                            required
                          />
                        </td>
                        <td>
                          <select
                            className="form-select shadow-none border-0 bg-transparent"
                            value={item.tax_type || "TAXABLE"}
                            onChange={(e) =>
                              handleItemChange(index, "tax_type", e.target.value)
                            }
                          >
                            <option value="TAXABLE">Taxable</option>
                            <option value="INCLUSIVE">Inclusive</option>
                            <option value="EXEMPT">Exempt</option>
                            <option value="NIL_RATED">Nil Rated</option>
                            <option value="NON_GST">Non GST</option>
                          </select>
                        </td>
                        {formData.invoice_layout !== "SERVICES" && (
                          <td>
                            <input
                              type="number"
                              className="form-control shadow-none border-0 bg-transparent"
                              value={item.discount_pct || 0}
                              onChange={(e) =>
                                handleItemChange(index, "discount_pct", e.target.value)
                              }
                              step="any"
                            />
                          </td>
                        )}
                        <td>
                          <select
                            className="form-select shadow-none border-0 bg-transparent"
                            value={item.gst_rate}
                            onChange={(e) =>
                              handleItemChange(index, "gst_rate", e.target.value)
                            }
                          >
                            {[0, 5, 12, 18, 28].map((r) => (
                              <option key={r} value={r}>
                                {r}%
                              </option>
                            ))}
                          </select>
                        </td>
                        {String(formData.place_of_supply).trim() !== String(companySettings?.state_code || companySettings?.data?.state_code || '27').trim() ? (
                          <td className="text-end fs-12 text-muted">
                            ₹{line.taxRes.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                        ) : (
                          <>
                            <td className="text-end fs-12 text-muted">
                              ₹{(line.taxRes / 2).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                            <td className="text-end fs-12 text-muted">
                              ₹{(line.taxRes / 2).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </td>
                          </>
                        )}
                        <td className="fw-bold text-dark text-end fs-12">
                          ₹{line.lineTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-icon-sm text-danger border-0 h-100"
                            onClick={() => removeItemRow(index)}
                          >
                            <i className="isax isax-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
                  <span className="h5 fw-bold mb-0">Total Debit</span>
                  <span className="h4 fw-bold mb-0 text-primary">₹{summary.netTotal.toLocaleString()}</span>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <button type="button" className="btn btn-outline-white w-100 rounded-pill border py-2 shadow-none" onClick={() => navigate('/invoicing/debit-notes')}>Discard</button>
                  </div>
                  <div className="col-6">
                    <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 shadow-none" disabled={saving}>
                      {saving ? 'Updating...' : 'Update DN'}
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

export default EditDebitNote;
