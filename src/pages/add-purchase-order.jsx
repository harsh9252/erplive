import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getVendors } from "../services/vendorService";
import { getItems } from "../services/productService";
import {
  createPurchaseOrder,
  getPurchaseOrderById,
  updatePurchaseOrder,
} from "../services/purchaseOrderService";

const AddPurchaseOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    vendor_id: "",
    order_date: new Date().toISOString().split("T")[0],
    expected_delivery: "",
    notes: "",
    remarks: "",
    items: [
      {
        item_id: "",
        description: "",
        qty: 1,
        rate: 0,
      },
    ],
  });

  const fetchData = useCallback(async () => {
    try {
      const [venRes, itemsRes] = await Promise.all([
        getVendors(1, 1000),
        getItems(1, 1000),
      ]);

      const vendorList = Array.isArray(venRes.data)
        ? venRes.data
        : venRes.data?.rows || [];
      const itemList = Array.isArray(itemsRes.data)
        ? itemsRes.data
        : itemsRes.data?.rows || [];

      setVendors(vendorList);
      setItems(itemList);

      if (isEditMode) {
        const poRes = await getPurchaseOrderById(id);
        const po = poRes.data || poRes;

        console.log("API PO Data:", po);

        // Virtual Injection: Ensure current PO's vendor and items are in the lists
        const augmentedVendors = [...vendorList];
        const poVendorId = String(po.vendor_id || po.vendor?.id || "").trim();
        if (
          po.vendor &&
          !augmentedVendors.some((v) => String(v.id).trim() === poVendorId)
        ) {
          augmentedVendors.push(po.vendor);
          setVendors(augmentedVendors);
        }

        const augmentedItems = [...itemList];
        let itemsChanged = false;
        (po.items || []).forEach((oi) => {
          const oiId = String(oi.item_id || oi.item?.id || "").trim();
          if (
            oi.item &&
            !augmentedItems.some((i) => String(i.id).trim() === oiId)
          ) {
            augmentedItems.push(oi.item);
            itemsChanged = true;
          }
        });
        if (itemsChanged) setItems(augmentedItems);

        setFormData({
          vendor_id: poVendorId,
          order_date: po.order_date,
          expected_delivery: po.expected_delivery || "",
          notes: po.notes || "",
          remarks: po.remarks || "",
          items: (po.items || []).map((item) => ({
            item_id: String(item.item_id || item.item?.id || "").trim(),
            description: item.description || item.item?.name || "",
            qty: parseFloat(item.qty || item.quantity) || 0,
            rate: parseFloat(item.rate || item.price) || 0,
          })),
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load required data");
    } finally {
      if (isEditMode) setLoading(false);
    }
  }, [id, isEditMode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === "item_id") {
      const selectedItem = items.find((i) => String(i.id) === String(value));
      if (selectedItem) {
        newItems[index].description = selectedItem.name;
        newItems[index].rate =
          selectedItem.purchase_price || selectedItem.price || 0;
      }
    }

    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItemRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { item_id: "", description: "", qty: 1, rate: 0 }],
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
    formData.items.forEach((item) => {
      subtotal += (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0);
    });
    return { subtotal, netTotal: subtotal };
  }, [formData.items]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.vendor_id) newErrors.vendor_id = "Please select a vendor";
    if (!formData.order_date) newErrors.order_date = "Order Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        total_amount: summary.netTotal,
      };

      if (isEditMode) {
        await updatePurchaseOrder(id, payload);
        toast.success("Purchase order updated successfully");
      } else {
        await createPurchaseOrder(payload);
        toast.success("Purchase order created successfully");
      }
      navigate("/invoicing/purchase-orders");
    } catch (error) {
      console.error("Error saving purchase order:", error);
      toast.error(error.message || "Failed to save purchase order");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">
            {isEditMode ? "Edit" : "Create"} Purchase Order
          </h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item">
                <Link to="/invoicing/purchase-orders">Purchase Orders</Link>
              </li>
              <li className="breadcrumb-item active">
                {isEditMode ? "Edit Order" : "New Order"}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h6 className="mb-0 fw-bold">
              <i className="isax isax-info-circle me-2 text-primary"></i>Basic
              Information
            </h6>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-600">
                  Vendor <span className="text-danger">*</span>
                </label>
                <select
                  key={`ven-${vendors.length}`}
                  className={`form-select shadow-none ${errors.vendor_id ? 'is-invalid' : ''}`}
                  name="vendor_id"
                  value={String(formData.vendor_id)}
                  onChange={handleHeaderChange}
                >
                  <option value="">Select Vendor</option>
                  {vendors.map((v) => (
                    <option key={v.id} value={String(v.id)}>
                      {v.name}
                    </option>
                  ))}
                </select>
                {errors.vendor_id && <div className="invalid-feedback">{errors.vendor_id}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">
                  Order Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control shadow-none ${errors.order_date ? 'is-invalid' : ''}`}
                  name="order_date"
                  value={formData.order_date}
                  onChange={handleHeaderChange}
                />
                {errors.order_date && <div className="invalid-feedback">{errors.order_date}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label fw-600">Expected Delivery</label>
                <input
                  type="date"
                  className="form-control shadow-none"
                  name="expected_delivery"
                  value={formData.expected_delivery}
                  onChange={handleHeaderChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold">
              <i className="isax isax-box me-2 text-primary"></i>Order Items
            </h6>
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-pill px-3"
              onClick={addItemRow}
            >
              <i className="isax isax-add me-1"></i>Add Item
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th style={{ width: "45%" }}>Item / Description</th>
                    <th style={{ width: "15%" }}>Quantity</th>
                    <th style={{ width: "20%" }}>Rate (₹)</th>
                    <th style={{ width: "15%" }}>Amount (₹)</th>
                    <th className="text-center" style={{ width: "50px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <select
                          key={`item-${index}-${items.length}`}
                          className="form-select shadow-none border-0 bg-transparent mb-1"
                          value={String(item.item_id)}
                          onChange={(e) =>
                            handleItemChange(index, "item_id", e.target.value)
                          }
                          required
                        >
                          <option value="">Select Item</option>
                          {items.map((i) => (
                            <option key={i.id} value={String(i.id)}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          className="form-control shadow-none border-0 bg-transparent fs-12 text-muted"
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="Additional description..."
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
                      <td className="fw-bold text-dark text-nowrap">
                        ₹{Math.round(item.qty * item.rate * 100) / 100}
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
                <label className="form-label fw-600">Vendor Notes</label>
                <textarea
                  className="form-control shadow-none mb-3"
                  name="notes"
                  value={formData.notes}
                  onChange={handleHeaderChange}
                  rows="3"
                  placeholder="Enter notes to vendor..."
                ></textarea>
                <label className="form-label fw-600">Internal Remarks</label>
                <textarea
                  className="form-control shadow-none"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleHeaderChange}
                  rows="2"
                  placeholder="Private notes..."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm bg-primary bg-opacity-10 h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Order Summary</h6>
                <hr className="my-3 border-primary opacity-20" />
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="h5 fw-bold mb-0">Order Total</span>
                  <span className="h4 fw-bold mb-0 text-primary">
                    ₹
                    {summary.netTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-white w-100 rounded-pill border py-2 shadow-none"
                      onClick={() => navigate("/invoicing/purchase-orders")}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 rounded-pill py-2 shadow-none"
                      disabled={saving}
                    >
                      {saving
                        ? "Saving..."
                        : isEditMode
                          ? "Update PO"
                          : "Create PO"}
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

export default AddPurchaseOrder;
