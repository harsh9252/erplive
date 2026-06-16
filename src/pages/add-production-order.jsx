import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProductionOrder } from '../services/productionOrderService';
import { getBOMs } from '../services/bomService';
import { getWarehouses } from '../services/settingsService';
import { getItems } from '../services/itemService';
import SearchableSelect from '../components/SearchableSelect';

const AddProductionOrder = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [boms, setBoms] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [avgPrices, setAvgPrices] = useState({}); // itemId -> avg cost
  const [selectedBomDetails, setSelectedBomDetails] = useState(null); // bom with items
  
  const [selectedBomLabel, setSelectedBomLabel] = useState('');
  const [finishedItemLabel, setFinishedItemLabel] = useState('');
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    bom_id: '',
    finished_item_id: '',
    qty_to_produce: 0,
    warehouse_id: '',
    planned_start: '',
    planned_end: '',
    notes: ''
  });

  const fetchData = useCallback(async () => {
    try {
      const [bomsRes, warehousesRes, itemsRes] = await Promise.all([
        getBOMs({ status: 'ACTIVE' }),
        getWarehouses(),
        getItems(1, 5000)
      ]);
      setBoms(bomsRes.data || bomsRes || []);
      setWarehouses(warehousesRes.data || warehousesRes || []);

      // Build avg price map
      const itemsList = Array.isArray(itemsRes?.data) ? itemsRes.data : (itemsRes?.data?.rows || []);
      const priceMap = {};
      itemsList.forEach(item => {
        priceMap[String(item.id)] = Number(
          item.avg_cost || item.average_cost || item.weighted_avg_price ||
          item.purchase_price || item.cost_price || item.price || 0
        );
      });
      setAvgPrices(priceMap);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load required data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBomChange = (bomId) => {
    const bom = boms.find(b => b.id === bomId);
    if (bom) {
      setFormData(prev => ({ 
        ...prev, 
        bom_id: bomId, 
        finished_item_id: bom.finished_item_id || bom.finished_item?.id 
      }));
      setFinishedItemLabel(bom.finishedItem?.name || bom.finished_item?.name || bom.finished_item_name || 'N/A');
      setSelectedBomDetails(bom);
    } else {
      setFormData(prev => ({ ...prev, bom_id: '', finished_item_id: '' }));
      setFinishedItemLabel('');
      setSelectedBomDetails(null);
    }
    
    // Clear bom error if any
    if (errors.bom_id) {
      setErrors(prev => ({ ...prev, bom_id: null }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields inline
    const newErrors = {};
    if (!formData.bom_id) {
      newErrors.bom_id = 'Please select a Bill of Materials';
    }
    if (formData.qty_to_produce <= 0 || isNaN(formData.qty_to_produce)) {
      newErrors.qty_to_produce = 'Value must be greater than or equal to 0.0001';
    }
    if (!formData.warehouse_id) {
      newErrors.warehouse_id = 'Please select an output warehouse';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      const payload = { 
        ...formData,
        warehouse_id: formData.warehouse_id ? parseInt(formData.warehouse_id, 10) : null,
        bom_id: formData.bom_id ? parseInt(formData.bom_id, 10) : null,
        qty_to_produce: parseFloat(formData.qty_to_produce)
      };
      if (!payload.batch_number) delete payload.batch_number;
      if (!payload.mfg_date) delete payload.mfg_date;
      if (!payload.expiry_date) delete payload.expiry_date;

      console.log('Sending Production Order Payload:', payload);
      await createProductionOrder(payload);
      toast.success('Production Order created successfully');
      navigate('/manufacturing/production-orders');
    } catch (error) {
      console.error('Error creating production order:', error);
      toast.error(error.message || 'Failed to create production order');
    } finally {
      setSaving(false);
    }
  };

  const bomOptions = boms.map(bom => ({
    value: bom.id,
    label: `${bom.finishedItem?.name || bom.finished_item?.name || bom.finished_item_name || 'Item'} - v${bom.version} (${bom.qty_produced} per batch)`
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
          <h4 className="fw-bold mb-1">Create Production Order</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item"><Link to="/manufacturing/production-orders">Production Orders</Link></li>
              <li className="breadcrumb-item active">New Order</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold small text-uppercase">Select BOM <span className="text-danger">*</span></label>
                <div className={errors.bom_id ? "is-invalid rounded" : ""}>
                  <SearchableSelect
                    options={bomOptions}
                    value={formData.bom_id}
                    onChange={handleBomChange}
                    placeholder="Select approved BOM"
                  />
                </div>
                {errors.bom_id && <div className="invalid-feedback d-block">{errors.bom_id}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold small text-uppercase">Finished Item (Auto-filled)</label>
                <input
                  type="text"
                  className="form-control bg-light"
                  value={finishedItemLabel}
                  readOnly
                  placeholder="Select a BOM first"
                />
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">Qty to Produce <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className={`form-control ${errors.qty_to_produce ? 'is-invalid' : ''}`}
                  name="qty_to_produce"
                  value={formData.qty_to_produce}
                  onChange={handleInputChange}
                  min="0.0001"
                  step="any"
                />
                {errors.qty_to_produce && <div className="invalid-feedback">{errors.qty_to_produce}</div>}
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">Output Warehouse <span className="text-danger">*</span></label>
                <select
                  className={`form-select ${errors.warehouse_id ? 'is-invalid' : ''}`}
                  name="warehouse_id"
                  value={formData.warehouse_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Warehouse</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
                {errors.warehouse_id && <div className="invalid-feedback">{errors.warehouse_id}</div>}
              </div>
            </div>
            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">Planned Start</label>
                <input
                  type="date"
                  className="form-control"
                  name="planned_start"
                  value={formData.planned_start}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">Planned End</label>
                <input
                  type="date"
                  className="form-control"
                  name="planned_end"
                  value={formData.planned_end}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-bold small text-uppercase">Batch/Lot No.</label>
                <input
                  type="text"
                  className="form-control text-uppercase"
                  name="batch_number"
                  value={formData.batch_number}
                  onChange={handleInputChange}
                  placeholder="Auto-generated if empty"
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-bold small text-uppercase">Mfg Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="mfg_date"
                  value={formData.mfg_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-bold small text-uppercase">Expiry Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small text-uppercase">Notes</label>
              <textarea
                className="form-control"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Production instructions or notes..."
              ></textarea>
            </div>

            {/* Avg Price Breakdown */}
            {selectedBomDetails?.items?.length > 0 && (
              <div className="card border-0 bg-light rounded-3 mb-4">
                <div className="card-body p-3">
                  <h6 className="fw-bold mb-3">
                    <i className="isax isax-chart me-2 text-primary"></i>
                    Raw Material Cost Breakdown (Avg Price — Weighted Average)
                  </h6>
                  <div className="table-responsive">
                    <table className="table table-sm mb-0">
                      <thead className="bg-white text-uppercase fs-11 text-muted">
                        <tr>
                          <th>Material</th>
                          <th className="text-end">Qty/Batch</th>
                          <th className="text-end">Wastage</th>
                          <th className="text-end">Effective Qty</th>
                          <th className="text-end">Avg Price/Unit</th>
                          <th className="text-end">Line Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedBomDetails.items.map((bomItem, i) => {
                          const scale = formData.qty_to_produce > 0
                            ? formData.qty_to_produce / (selectedBomDetails.qty_produced || 1)
                            : 1;
                          const baseQty = (bomItem.qty || 0) * scale;
                          const effectiveQty = baseQty * (1 + (bomItem.wastage_pct || 0) / 100);
                          const avgP = avgPrices[String(bomItem.item_id)] || 0;
                          const lineCost = effectiveQty * avgP;
                          const itemName = bomItem.item?.name || bomItem.item_name || `Item #${bomItem.item_id}`;
                          return (
                            <tr key={i}>
                              <td className="fw-semibold">{itemName}</td>
                              <td className="text-end">{(bomItem.qty * scale).toFixed(3)}</td>
                              <td className="text-end text-muted">{bomItem.wastage_pct || 0}%</td>
                              <td className="text-end">{effectiveQty.toFixed(3)}</td>
                              <td className="text-end text-primary fw-semibold">
                                {avgP > 0 ? `₹${avgP.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : <span className="text-muted fs-11">No avg price</span>}
                              </td>
                              <td className="text-end fw-bold">
                                {lineCost > 0 ? `₹${lineCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '—'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="border-top">
                        <tr>
                          <td colSpan="5" className="text-end fw-bold text-uppercase fs-12">Total Estimated Cost</td>
                          <td className="text-end fw-bold text-dark fs-15">
                            ₹{selectedBomDetails.items.reduce((sum, bomItem) => {
                              const scale = formData.qty_to_produce > 0
                                ? formData.qty_to_produce / (selectedBomDetails.qty_produced || 1)
                                : 1;
                              const effectiveQty = (bomItem.qty || 0) * scale * (1 + (bomItem.wastage_pct || 0) / 100);
                              return sum + (effectiveQty * (avgPrices[String(bomItem.item_id)] || 0));
                            }, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-end gap-2 mt-5">
              <Link to="/manufacturing/production-orders" className="btn btn-light px-4 shadow-none">Cancel</Link>
              <button type="submit" className="btn btn-primary px-5 shadow-none" disabled={saving}>
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Creating...
                  </>
                ) : (
                  <>Create Production Order</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductionOrder;
