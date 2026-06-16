import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createJobWorkEntry,
  getJobWorkEntry,
  updateJobWorkEntry,
} from "../services/jobWorkService";
import { getVendors } from "../services/vendorService";
import { getItems } from "../services/itemService";
import { getWarehouses } from "../services/settingsService";
import SearchableSelect from "../components/SearchableSelect";

const AddJobWork = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    type: "OUT",
    vendor_id: "",
    items: [{ item_id: "", qty: 1 }],
    warehouse_id: "",
    job_work_date: new Date().toISOString().split("T")[0],
    expected_return_date: "",
    charges: 0,
    notes: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const [vendorsRes, itemsRes, warehousesRes] = await Promise.all([
        getVendors(),
        getItems(1, 1000),
        getWarehouses(),
      ]);
      const vendorList = Array.isArray(vendorsRes.data) ? vendorsRes.data : (vendorsRes.data?.rows || vendorsRes || []);
      const itemList = Array.isArray(itemsRes.data) ? itemsRes.data : (itemsRes.data?.rows || itemsRes || []);
      const warehouseList = Array.isArray(warehousesRes.data) ? warehousesRes.data : (warehousesRes.data?.rows || warehousesRes || []);
      setVendors(vendorList);
      setItems(itemList);
      setWarehouses(warehouseList);

      if (id) {
        const entryRes = await getJobWorkEntry(id);
        const entry = entryRes.data || entryRes;

        setFormData({
          type: entry.type || "OUT",
          vendor_id: entry.vendor_id || "",
          items: entry.items && entry.items.length > 0 
            ? entry.items.map(i => ({ item_id: i.item_id || i.id, qty: i.qty || 0 }))
            : [{ item_id: entry.item_id || "", qty: entry.qty || 0 }],
          warehouse_id: entry.warehouse_id || "",
          job_work_date: (
            entry.job_work_date ||
            entry.sent_date ||
            entry.date ||
            ""
          ).split("T")[0],
          expected_return_date: (
            entry.expected_return_date ||
            entry.expected_return ||
            ""
          ).split("T")[0],
          charges: entry.charges || entry.job_charges || 0,
          notes: entry.notes || "",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load required data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const addItemRow = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { item_id: "", qty: 1 }]
    }));
  };

  const removeItemRow = (index) => {
    if (formData.items.length <= 1) {
      toast.warning("At least one item is required");
      return;
    }
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData(prev => ({ ...prev, items: newItems }));
    
    // Clear item-specific error
    if (errors[`item_${index}_${field}`] || errors.items) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[`item_${index}_${field}`];
        delete next.items;
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};

    if (!formData.vendor_id) {
      newErrors.vendor_id = "Please select a vendor";
    }
    
    // Validate items
    let hasValidItem = false;
    formData.items.forEach((item, idx) => {
      if (!item.item_id) {
        newErrors[`item_${idx}_item_id`] = "Item is required";
      }
      if (!item.qty || item.qty <= 0) {
        newErrors[`item_${idx}_qty`] = "Valid quantity is required";
      }
      if (item.item_id && item.qty > 0) {
        hasValidItem = true;
      }
    });

    if (!hasValidItem && formData.items.length === 0) {
      newErrors.items = "Please add at least one item";
    }

    if (!formData.job_work_date) {
      newErrors.job_work_date = "Job work date is required";
    }
    if (!formData.warehouse_id) {
      newErrors.warehouse_id = "Please select a warehouse";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const validItems = formData.items.filter(i => i.item_id && i.qty > 0);

    setSaving(true);
    try {
      if (id) {
        // Edit mode: Standard single-record update
        const payload = {
          ...formData,
          item_id: validItems[0].item_id,
          qty: validItems[0].qty,
        };
        delete payload.items; // Clean up payload for backend

        await updateJobWorkEntry(id, payload);
        toast.success("Job Work record updated successfully");
      } else {
        // Create mode: Batch creation
        const totalItems = validItems.length;
        
        for (let i = 0; i < totalItems; i++) {
          const item = validItems[i];
          const payload = {
            ...formData,
            item_id: item.item_id,
            qty: item.qty,
          };
          delete payload.items;

          // Update toast/UI to show progress for batching
          if (totalItems > 1) {
            console.log(`Saving item ${i + 1} of ${totalItems}...`);
          }

          await createJobWorkEntry(payload);
        }
        
        toast.success(totalItems > 1 
          ? `Successfully created ${totalItems} Job Work records.`
          : "Job Work record created successfully"
        );
      }
      navigate("/manufacturing/job-work");
    } catch (error) {
      console.error("Error saving job work:", error);
      toast.error(error.message || "Failed to save job work record");
    } finally {
      setSaving(false);
    }
  };

  const vendorOptions = vendors.map((v) => ({
    value: v.id,
    label: v.name,
  }));

  const itemOptions = items.map((i) => ({
    value: i.id,
    label: `${i.name} (${i.sku || "No SKU"})`,
  }));

  const warehouseOptions = warehouses.map((w) => ({
    value: w.id,
    label: w.name,
  }));

  if (loading) {
    return (
      <div className="p-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2 text-muted">Loading required data...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">
            {id ? "Edit Job Work" : "Create Job Work"}
          </h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/manufacturing/job-work">Job Work</Link>
              </li>
              <li className="breadcrumb-item active">
                {id ? "Edit Record" : "New Record"}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="form-label fw-bold small text-uppercase d-block">
                Type <span className="text-danger">*</span>
              </label>
              <div className="d-flex gap-4 mt-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="typeOut"
                    value="OUT"
                    checked={formData.type === "OUT"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="typeOut">
                    OUT (Sent to Vendor)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="typeIn"
                    value="IN"
                    checked={formData.type === "IN"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="typeIn">
                    IN (Received from Vendor)
                  </label>
                </div>
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-12">
                <label className="form-label fw-bold small text-uppercase">
                  Vendor <span className="text-danger">*</span>
                </label>
                <div className={errors.vendor_id ? "is-invalid rounded" : ""}>
                  <SearchableSelect
                    options={vendorOptions}
                    value={formData.vendor_id}
                    onChange={(val) => handleSelectChange("vendor_id", val)}
                    placeholder="Search and select vendor"
                  />
                </div>
                {errors.vendor_id && <div className="invalid-feedback d-block">{errors.vendor_id}</div>}
              </div>
            </div>

            {/* Items Section */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="form-label fw-bold small text-uppercase mb-0">
                  Items <span className="text-danger">*</span>
                </label>
                <button type="button" className="btn btn-sm btn-soft-primary border-0 px-3" onClick={addItemRow}>
                  <i className="isax isax-add me-1"></i>Add Item
                </button>
              </div>
              {errors.items && <div className="text-danger small fw-medium mb-3">{errors.items}</div>}

              {/* Header Row */}
              <div className="row g-0 px-3 py-2 bg-light border rounded-top fs-11 fw-bold text-uppercase text-muted d-none d-md-flex">
                <div className="col-md-1 text-center">#</div>
                <div className="col-md-7">Item</div>
                <div className="col-md-3">Quantity</div>
                <div className="col-md-1 text-center">Del</div>
              </div>

              {/* Item Rows */}
              <div className="border border-top-0 rounded-bottom">
                {formData.items.map((row, index) => (
                  <div
                    key={index}
                    className={`row g-2 align-items-center px-3 py-2 ${
                      index !== formData.items.length - 1 ? 'border-bottom' : ''
                    }`}
                  >
                    {/* Row number */}
                    <div className="col-md-1 col-2 text-center">
                      <span className="badge bg-light text-muted fw-bold" style={{ fontSize: '12px' }}>
                        {index + 1}
                      </span>
                    </div>

                    {/* Item Select */}
                    <div className="col-md-7 col-10">
                      <label className="d-md-none fs-11 text-muted text-uppercase fw-bold mb-1">Item</label>
                      <select
                        className={`form-select shadow-none ${errors[`item_${index}_item_id`] ? 'is-invalid' : ''}`}
                        value={String(row.item_id || '')}
                        onChange={(e) => handleItemChange(index, 'item_id', e.target.value)}
                      >
                        <option value="">— Select Item —</option>
                        {items.map((i) => (
                          <option key={i.id} value={String(i.id)}>
                            {i.name}{i.sku ? ` (${i.sku})` : ''}
                          </option>
                        ))}
                      </select>
                      {errors[`item_${index}_item_id`] && <div className="invalid-feedback">{errors[`item_${index}_item_id`]}</div>}
                    </div>

                    {/* Quantity */}
                    <div className="col-md-3 col-9">
                      <label className="d-md-none fs-11 text-muted text-uppercase fw-bold mb-1">Quantity</label>
                      <input
                        type="number"
                        className={`form-control shadow-none ${errors[`item_${index}_qty`] ? 'is-invalid' : ''}`}
                        value={row.qty}
                        onChange={(e) => handleItemChange(index, 'qty', parseFloat(e.target.value) || 0)}
                        min="0.001"
                        step="any"
                        placeholder="0"
                      />
                      {errors[`item_${index}_qty`] && <div className="invalid-feedback">{errors[`item_${index}_qty`]}</div>}
                    </div>

                    {/* Delete */}
                    <div className="col-md-1 col-3 text-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-soft-danger border-0 px-2"
                        onClick={() => removeItemRow(index)}
                        title="Remove row"
                      >
                        <i className="isax isax-trash fs-16"></i>
                      </button>
                    </div>
                  </div>
                ))}

                {formData.items.length === 0 && (
                  <div className="text-center py-4 text-muted">
                    <i className="isax isax-box-add fs-30 d-block mb-2"></i>
                    No items added. Click "Add Item" to start.
                  </div>
                )}
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">
                  Warehouse <span className="text-danger">*</span>
                </label>
                <div className={errors.warehouse_id ? "is-invalid rounded" : ""}>
                  <SearchableSelect
                    options={warehouseOptions}
                    value={formData.warehouse_id}
                    onChange={(val) => handleSelectChange("warehouse_id", val)}
                    placeholder="Select warehouse"
                  />
                </div>
                {errors.warehouse_id && <div className="invalid-feedback d-block">{errors.warehouse_id}</div>}
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">
                  Job Work Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control ${errors.job_work_date ? 'is-invalid' : ''}`}
                  name="job_work_date"
                  value={formData.job_work_date}
                  onChange={handleInputChange}
                />
                {errors.job_work_date && <div className="invalid-feedback">{errors.job_work_date}</div>}
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">
                  Expected Return Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="expected_return_date"
                  value={formData.expected_return_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">
                  Charges
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">
                    ₹
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    name="charges"
                    value={formData.charges}
                    onChange={handleInputChange}
                    min="0"
                    step="any"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small text-uppercase">
                Notes
              </label>
              <textarea
                className="form-control"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="4"
                placeholder="Additional instructions or job work details..."
              ></textarea>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-5">
              <Link
                to="/manufacturing/job-work"
                className="btn btn-light px-4 shadow-none"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary px-5 shadow-none"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    {id ? "Update Job Work Record" : "Create Job Work Record"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobWork;
