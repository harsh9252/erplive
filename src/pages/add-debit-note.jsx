import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import vendorService from "../services/vendorService";
import { getItems, searchItems } from "../services/itemService";
import { getCompanySettings } from "../services/settingsService";
import { getPurchaseInvoices, getPurchaseInvoiceById } from "../services/purchaseInvoiceService";
import { createDebitNote } from "../services/debitNoteService";
import { getUoms } from "../services/uomService";
import { INDIAN_STATES } from "../utils/constants";
import AsyncSearchableSelect from "../components/AsyncSearchableSelect";
import Swal from "sweetalert2";

const AddDebitNote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [uoms, setUoms] = useState([]);
  const [vendorInvoices, setVendorInvoices] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    vendor_id: "",
    debit_date: new Date().toISOString().split("T")[0],
    original_invoice_id: "",
    reason: "",
    place_of_supply: "",
    remarks: "",
    items: [
      {
        item_id: "",
        description: "",
        qty: 1,
        rate: 0,
        gst_rate: 18,
        uom_id: "",
        hsn_code: "",
      },
    ],
  });

  const fetchData = useCallback(async () => {
    try {
      const [vendorsRes, itemsRes, settingsRes, uomsRes] = await Promise.all([
        vendorService.getVendors({ page: 1, limit: 1000 }),
        getItems(1, 1000),
        getCompanySettings(),
        getUoms(1, 1000),
      ]);
      setUoms(Array.isArray(uomsRes.data) ? uomsRes.data : uomsRes.data?.rows || []);

      setVendors(
        Array.isArray(vendorsRes.data)
          ? vendorsRes.data
          : vendorsRes.data?.rows || [],
      );
      setItems(
        Array.isArray(itemsRes.data)
          ? itemsRes.data
          : itemsRes.data?.rows || [],
      );
      setCompanySettings(settingsRes.data || settingsRes);

      if (settingsRes.data?.state_code || settingsRes.state_code) {
        setFormData((prev) => ({
          ...prev,
          place_of_supply:
            settingsRes.data?.state_code || settingsRes.state_code,
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load required data");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fetch purchase invoices when vendor changes
  useEffect(() => {
    if (formData.vendor_id) {
      const fetchInvoices = async () => {
        try {
          const res = await getPurchaseInvoices(
            1,
            1000,
            "",
            "",
            formData.vendor_id,
          );
          setVendorInvoices(
            Array.isArray(res.data) ? res.data : res.data?.rows || [],
          );
        } catch (error) {
          console.error("Error fetching vendor invoices:", error);
        }
      };
      fetchInvoices();
    } else {
      setVendorInvoices([]);
    }
  }, [formData.vendor_id]);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVendorChange = (e) => {
    const vendorId = e.target.value;
    setErrors(prev => {
      const newErr = { ...prev };
      if (newErr.vendor_id) newErr.vendor_id = null;
      if (newErr.place_of_supply) newErr.place_of_supply = null;
      return newErr;
    });
    const vendor = vendors.find((v) => String(v.id) === String(vendorId));
    setFormData((prev) => ({
      ...prev,
      vendor_id: vendorId,
      original_invoice_id: "",
      place_of_supply: vendor?.state_code || companySettings?.state_code || companySettings?.data?.state_code || '',
    }));
  };

  const handleInvoiceLinkChange = async (e) => {
    const invoiceId = e.target.value;
    if (errors.original_invoice_id) setErrors(prev => ({ ...prev, original_invoice_id: null }));
    const invoice = vendorInvoices.find(
      (inv) => String(inv.id) === String(invoiceId),
    );

    setFormData((prev) => ({ ...prev, original_invoice_id: invoiceId }));

    // Auto-populate items if requested
    if (invoice) {
      const result = await Swal.fire({
        title: 'Populate items?',
        text: 'Populate item lines from the selected invoice?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, populate it!',
        customClass: {
          confirmButton: 'rounded-pill',
          cancelButton: 'rounded-pill'
        }
      });

      if (result.isConfirmed) {
        setLoading(true);
        try {
          const res = await getPurchaseInvoiceById(invoiceId);
          const fullInvoice = res.data;
          
          const itemsToMap = fullInvoice?.items?.length ? fullInvoice.items : (invoice.items || []);
          
          if (!itemsToMap || itemsToMap.length === 0) {
            toast.warning('No items found in this invoice');
            return;
          }

          const populatedItems = itemsToMap.map((item) => ({
            item_id: item.item_id || item.itemId || "",
            description: item.description || item.item?.name || "",
            qty: parseFloat(item.qty) || 1,
            rate: parseFloat(item.rate) || 0,
            gst_rate: parseFloat(item.gst_rate || item.gstRate) || 18,
            uom_id: String(item.uom_id || item.uomId || ""),
            hsn_code: item.hsn_code || item.hsnCode || item.item?.hsn_code || "",
          }));

          setFormData((prev) => ({ ...prev, items: populatedItems }));
        } catch (error) {
          console.error("Error fetching invoice details:", error);
          toast.error("Failed to load invoice items");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];

    if (field === "item_id") {
      const selectedItem = value; // Full object from AsyncSearchableSelect
      if (selectedItem) {
        // Resolve UOM
        let resolvedUomId = "";
        const potentialUoms = [
          selectedItem.uom_id,
          selectedItem.unit_id,
          selectedItem.uom,
          selectedItem.unit,
        ];
        for (const val of potentialUoms) {
          if (!val) continue;
          const match = uoms.find(
            (u) =>
              String(u.id) === String(val) ||
              String(u.name).toLowerCase() === String(val).toLowerCase(),
          );
          if (match) {
            resolvedUomId = String(match.id);
            break;
          }
        }

        newItems[index] = {
          ...newItems[index],
          item_id: selectedItem.id,
          description: selectedItem.name,
          hsn_code: selectedItem.hsn_code || selectedItem.hsnCode || "",
          rate: selectedItem.purchase_price || selectedItem.price || 0,
          gst_rate:
            selectedItem.gst_rate !== undefined ? selectedItem.gst_rate : 18,
          uom_id: resolvedUomId || selectedItem.uom_id || "",
        };
      }
    } else {
      newItems[index][field] = value;
    }

    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItemRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          item_id: "",
          description: "",
          qty: 1,
          rate: 0,
          gst_rate: 18,
          uom_id: "",
          hsn_code: "",
        },
      ],
    }));
  };

  const removeItemRow = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, items: newItems }));
    }
  };

  const summary = useMemo(() => {
    let subtotal = 0;
    let totalTax = 0;
    const taxBreakdown = {};
    const companyState =
      companySettings?.state_code || companySettings?.data?.state_code;
    const isInterState = formData.place_of_supply !== companyState;

    formData.items.forEach((item) => {
      const amount = (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0);
      const taxRate = parseFloat(item.gst_rate) || 0;
      const taxRes = (amount * taxRate) / 100;

      subtotal += amount;
      totalTax += taxRes;

      if (isInterState) {
        taxBreakdown[`IGST ${taxRate}%`] =
          (taxBreakdown[`IGST ${taxRate}%`] || 0) + taxRes;
      } else {
        const rate = taxRate / 2;
        taxBreakdown[`CGST ${rate}%`] =
          (taxBreakdown[`CGST ${rate}%`] || 0) + taxRes / 2;
        taxBreakdown[`SGST ${rate}%`] =
          (taxBreakdown[`SGST ${rate}%`] || 0) + taxRes / 2;
      }
    });

    const netTotal = subtotal + totalTax;
    return { subtotal, totalTax, taxBreakdown, netTotal: Math.round(netTotal) };
  }, [formData.items, formData.place_of_supply, companySettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.vendor_id) newErrors.vendor_id = "Please select a vendor";
    if (!formData.debit_date) newErrors.debit_date = "Return Date is required";
    if (!formData.original_invoice_id) newErrors.original_invoice_id = "Please select a purchase invoice";
    if (!formData.reason) newErrors.reason = "Reason for Return is required";
    if (!formData.place_of_supply) newErrors.place_of_supply = "Place of Supply is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.items.some((i) => !i.item_id)) {
      toast.error("Please select items for all rows");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        debit_note_date: formData.debit_date,
        items: formData.items.map(item => ({
          ...item,
          amount: parseFloat(item.qty || 0) * parseFloat(item.rate || 0)
        }))
      };
      
      if (formData.original_invoice_id) {
        payload.purchase_invoice_id = Number(formData.original_invoice_id);
      } else {
        delete payload.purchase_invoice_id;
      }
      delete payload.original_invoice_id;
      await createDebitNote(payload);
      toast.success("Debit note created successfully");
      navigate("/invoicing/debit-notes");
    } catch (error) {
      console.error("Error creating debit note:", error);
      
      const humanizeError = (msg) => {
        if (typeof msg !== 'string') return msg;
        return msg
          .replace(/items\[(\d+)\]/g, (_, index) => `Item ${parseInt(index) + 1}`)
          .replace(/vendor_id/g, 'Vendor')
          .replace(/debit_date/g, 'Return Date')
          .replace(/place_of_supply/g, 'Place of Supply')
          .replace(/\./g, ' ')
          .replace(/"/g, '')
          .replace(/_/g, ' ');
      };

      if (error.details && Array.isArray(error.details)) {
        const detailMsgs = error.details.map((d, i) => <li key={i}>{humanizeError(d.message || d)}</li>);
        toast.error(
          <div className="text-start">
            <b>Validation Failed:</b>
            <ul className="mt-2 mb-0 ps-3">{detailMsgs}</ul>
          </div>,
          { autoClose: 5000 }
        );
      } else {
        toast.error(humanizeError(error.message) || "Failed to create debit note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="page-header d-flex align-items-center justify-content-between mb-4">
        <div className="page-title">
          <h4 className="fw-bold mb-1">Create Debit Note</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/"><i className="isax isax-home-2 me-1"></i>Home</Link></li>
              <li className="breadcrumb-item"><Link to="/invoicing/debit-notes">Debit Notes</Link></li>
              <li className="breadcrumb-item active">New Purchase Return</li>
            </ol>
          </nav>
        </div>
        <div className="page-header-right">
          <Link to="/invoicing/debit-notes" className="btn btn-outline-secondary d-flex align-items-center">
            <i className="isax isax-arrow-left-2 me-2"></i>Back to List
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h6 className="mb-0 fw-bold">
              <i className="isax isax-info-circle me-2 text-primary"></i>Return
              Header
            </h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-600">
                  Vendor <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select shadow-none ${errors.vendor_id ? 'is-invalid' : ''}`}
                  name="vendor_id"
                  value={formData.vendor_id}
                  onChange={handleVendorChange}
                >
                  <option value="">Select Vendor</option>
                  {vendors.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name || v.display_name}
                    </option>
                  ))}
                </select>
                {errors.vendor_id && <div className="invalid-feedback">{errors.vendor_id}</div>}
              </div>
              <div className="col-md-2">
                <label className="form-label fw-600">
                  Return Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control shadow-none ${errors.debit_date ? 'is-invalid' : ''}`}
                  name="debit_date"
                  value={formData.debit_date}
                  onChange={handleHeaderChange}
                />
                {errors.debit_date && <div className="invalid-feedback">{errors.debit_date}</div>}
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">
                  Against Purchase Invoice <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select shadow-none border ${errors.original_invoice_id ? 'is-invalid' : ''}`}
                  name="original_invoice_id"
                  value={formData.original_invoice_id}
                  onChange={handleInvoiceLinkChange}
                  disabled={!formData.vendor_id}
                >
                  <option value="">Select Invoice</option>
                  {vendorInvoices.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.invoice_number} (₹{inv.net_total || inv.net_amount || 0})
                    </option>
                  ))}
                </select>
                {errors.original_invoice_id ? <div className="invalid-feedback">{errors.original_invoice_id}</div> : <small className="text-muted">Links this return to a specific purchase.</small>}
              </div>
              <div className="col-md-3">
                <label className="form-label fw-600">
                  Reason <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select shadow-none ${errors.reason ? 'is-invalid' : ''}`}
                  name="reason"
                  value={formData.reason || ""}
                  onChange={handleHeaderChange}
                >
                  <option value="">Select Reason</option>
                  <option value="PURCHASE_RETURN">
                    Goods returned to vendor
                  </option>
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
                <select
                  className={`form-select shadow-none ${errors.place_of_supply ? 'is-invalid' : ''}`}
                  name="place_of_supply"
                  value={formData.place_of_supply}
                  onChange={handleHeaderChange}
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name} ({state.code})
                    </option>
                  ))}
                </select>
                {errors.place_of_supply && <div className="invalid-feedback">{errors.place_of_supply}</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold">
              <i className="isax isax-box me-2 text-primary"></i>Returned Items
            </h6>
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-pill px-3"
              onClick={addItemRow}
            >
              <i className="isax isax-add me-1"></i>Add Row
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-nowrap align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th style={{ width: "30%" }}>Item / Description</th>
                    <th style={{ width: "8%" }}>Qty</th>
                    <th style={{ width: "10%" }}>Rate</th>
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
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="mb-1">
                          <AsyncSearchableSelect
                            searchFn={searchItems}
                            onSelect={(selectedItem) =>
                              handleItemChange(index, "item_id", selectedItem)
                            }
                            placeholder="Search item..."
                            defaultValue={items.find(
                              (i) => String(i.id) === String(item.item_id),
                            )}
                            displayKey="name"
                          />
                        </div>
                        {item.hsn_code && (
                          <div className="fs-10 text-primary fw-bold mb-1">
                            HSN: {item.hsn_code}
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
                        ₹
                        {(
                          item.qty *
                          item.rate *
                          (1 + item.gst_rate / 100)
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
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
                <label className="form-label fw-600">
                  Reason for Return / Internal Note
                </label>
                <textarea
                  className="form-control shadow-none"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleHeaderChange}
                  rows="5"
                  placeholder="Reason for return, quality issues, or standard debit note details..."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm bg-primary bg-opacity-10 h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Return Summary</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Taxable Amount</span>
                  <span className="fw-bold">
                    ₹
                    {summary.subtotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                {Object.entries(summary.taxBreakdown).map(([name, val]) => (
                  <div
                    key={name}
                    className="d-flex justify-content-between mb-2 small text-muted"
                  >
                    <span>{name}</span>
                    <span>
                      ₹
                      {val.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ))}
                <hr className="my-3 border-primary opacity-20" />
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="h5 fw-bold mb-0">Total Debit</span>
                  <span className="h4 fw-bold mb-0 text-primary">
                    ₹{summary.netTotal.toLocaleString()}
                  </span>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-white w-100 rounded-pill border py-2 shadow-none"
                      onClick={() => navigate("/invoicing/debit-notes")}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 rounded-pill py-2 shadow-none"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Draft"}
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

export default AddDebitNote;
