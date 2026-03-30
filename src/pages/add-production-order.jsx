import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProductionOrder } from '../services/productionOrderService';
import { getBOMs } from '../services/bomService';
import { getWarehouses } from '../services/settingsService';
import SearchableSelect from '../components/SearchableSelect';

const AddProductionOrder = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [boms, setBoms] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  
  const [selectedBomLabel, setSelectedBomLabel] = useState('');
  const [finishedItemLabel, setFinishedItemLabel] = useState('');

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
      const [bomsRes, warehousesRes] = await Promise.all([
        getBOMs({ status: 'ACTIVE' }),
        getWarehouses()
      ]);
      setBoms(bomsRes.data || bomsRes || []);
      setWarehouses(warehousesRes.data || warehousesRes || []);
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
      setFinishedItemLabel(bom.finished_item?.name || bom.finished_item_name || 'N/A');
    } else {
      setFormData(prev => ({ ...prev, bom_id: '', finished_item_id: '' }));
      setFinishedItemLabel('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.bom_id) {
      toast.error('Please select a Bill of Materials');
      return;
    }
    if (formData.qty_to_produce <= 0) {
      toast.error('Production quantity must be greater than 0');
      return;
    }
    if (!formData.warehouse_id) {
      toast.error('Please select an output warehouse');
      return;
    }

    setSaving(true);
    try {
      await createProductionOrder(formData);
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
    label: `${bom.finished_item?.name || bom.finished_item_name || 'Item'} - v${bom.version} (${bom.qty_produced} per batch)`
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
          <form onSubmit={handleSubmit}>
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold small text-uppercase">Select BOM <span className="text-danger">*</span></label>
                <SearchableSelect
                  options={bomOptions}
                  value={formData.bom_id}
                  onChange={handleBomChange}
                  placeholder="Select approved BOM"
                />
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
                  className="form-control"
                  name="qty_to_produce"
                  value={formData.qty_to_produce}
                  onChange={handleInputChange}
                  min="0.0001"
                  step="any"
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold small text-uppercase">Output Warehouse <span className="text-danger">*</span></label>
                <select
                  className="form-select"
                  name="warehouse_id"
                  value={formData.warehouse_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Warehouse</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>
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
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small text-uppercase">Notes</label>
              <textarea
                className="form-control"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="4"
                placeholder="Production instructions or notes..."
              ></textarea>
            </div>

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
