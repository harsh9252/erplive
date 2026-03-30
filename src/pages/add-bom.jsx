import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBOM, updateBOM, getBOM, getBOMs } from '../services/bomService';
import { getItems } from '../services/itemService';
import SearchableSelect from '../components/SearchableSelect';

const AddBOM = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState([]);
  const [availableBoms, setAvailableBoms] = useState([]);

  const [formData, setFormData] = useState({
    finished_item_id: '',
    version: '1.0',
    qty_produced: 1,
    status: 'ACTIVE',
    items: [{ item_id: '', qty: 1, wastage_pct: 0, sub_bom_id: '' }]
  });

  const fetchData = useCallback(async () => {
    try {
      const [itemsRes, bomsRes] = await Promise.all([
        getItems(1, 1000), // Get all items for selection
        getBOMs({ status: 'ACTIVE' }) // Get active BOMs for sub-BOM selection
      ]);
      setItems(itemsRes.data || itemsRes || []);
      setAvailableBoms(bomsRes.data || bomsRes || []);

      if (isEditMode) {
        const bomRes = await getBOM(id);
        const bomData = bomRes.data || bomRes;
        setFormData({
          finished_item_id: bomData.finished_item_id,
          version: bomData.version,
          qty_produced: bomData.qty_produced,
          status: bomData.status,
          items: bomData.items.map(item => ({
            item_id: item.item_id,
            qty: item.qty,
            wastage_pct: item.wastage_pct || 0,
            sub_bom_id: item.sub_bom_id || ''
          }))
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load required data');
    } finally {
      setLoading(false);
    }
  }, [id, isEditMode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addRow = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { item_id: '', qty: 1, wastage_pct: 0, sub_bom_id: '' }]
    }));
  };

  const removeRow = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.finished_item_id) {
      toast.error('Please select a finished item');
      return;
    }
    
    // Validate items
    const invalidItem = formData.items.find(item => !item.item_id || item.qty <= 0);
    if (invalidItem) {
      toast.error('Please ensure all raw materials are selected and have a quantity greater than 0');
      return;
    }

    setSaving(true);
    try {
      if (isEditMode) {
        await updateBOM(id, formData);
        toast.success('Bill of Materials updated successfully');
      } else {
        await createBOM(formData);
        toast.success('Bill of Materials created successfully');
      }
      navigate('/manufacturing/bom');
    } catch (error) {
      console.error('Error saving BOM:', error);
      toast.error(error.message || 'Failed to save BOM');
    } finally {
      setSaving(false);
    }
  };

  const itemOptions = items.map(item => ({
    value: item.id,
    label: `${item.name} (${item.sku || 'No SKU'})`
  }));

  const bomOptions = availableBoms.map(bom => ({
    value: bom.id,
    label: `${bom.finished_item?.name || 'Unknown'} - v${bom.version}`
  }));

  if (loading) {
    return (
      <div className="p-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2 text-muted">Loading BOM details...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">{isEditMode ? 'Edit' : 'Create'} Bill of Materials</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item"><Link to="/manufacturing/bom">BOM</Link></li>
              <li className="breadcrumb-item active">{isEditMode ? 'Edit' : 'New'} BOM</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card border-0 shadow-sm border-top border-4 border-primary">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4 mb-5">
              <div className="col-md-6">
                <label className="form-label fw-bold small text-uppercase">Finished Item <span className="text-danger">*</span></label>
                <SearchableSelect
                  options={itemOptions}
                  value={formData.finished_item_id}
                  onChange={(val) => setFormData(prev => ({ ...prev, finished_item_id: val }))}
                  placeholder="Select Finished Product"
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-bold small text-uppercase">Version <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="version"
                  value={formData.version}
                  onChange={handleInputChange}
                  placeholder="e.g. 1.0"
                  required
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-bold small text-uppercase">Qty produced/batch <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control"
                  name="qty_produced"
                  value={formData.qty_produced}
                  onChange={handleInputChange}
                  min="0.0001"
                  step="any"
                  required
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-bold small text-uppercase">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="DRAFT">Draft</option>
                  <option value="OBSOLETE">Obsolete</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="fw-bold mb-0">Raw Materials / Components</h6>
                <button type="button" className="btn btn-sm btn-soft-primary" onClick={addRow}>
                  <i className="isax isax-add me-1"></i>Add Material
                </button>
              </div>
              
              <div className="table-responsive">
                <table className="table border rounded overflow-hidden">
                  <thead className="bg-light">
                    <tr>
                      <th style={{ minWidth: '300px' }}>Raw Material Item <span className="text-danger">*</span></th>
                      <th style={{ width: '120px' }}>Qty Required</th>
                      <th style={{ width: '120px' }}>Wastage %</th>
                      <th style={{ minWidth: '200px' }}>Sub-BOM (Optional)</th>
                      <th style={{ width: '50px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <SearchableSelect
                            options={itemOptions}
                            value={row.item_id}
                            onChange={(val) => handleItemChange(index, 'item_id', val)}
                            placeholder="Select Material"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={row.qty}
                            onChange={(e) => handleItemChange(index, 'qty', parseFloat(e.target.value) || 0)}
                            min="0.0001"
                            step="any"
                            required
                          />
                        </td>
                        <td>
                          <div className="input-group">
                            <input
                              type="number"
                              className="form-control"
                              value={row.wastage_pct}
                              onChange={(e) => handleItemChange(index, 'wastage_pct', parseFloat(e.target.value) || 0)}
                              min="0"
                              max="100"
                              step="any"
                            />
                            <span className="input-group-text bg-light border-start-0">%</span>
                          </div>
                        </td>
                        <td>
                          <select
                            className="form-select"
                            value={row.sub_bom_id}
                            onChange={(e) => handleItemChange(index, 'sub_bom_id', e.target.value)}
                          >
                            <option value="">No Sub-BOM</option>
                            {availableBoms
                              .filter(b => b.finished_item_id === row.item_id)
                              .map(b => (
                                <option key={b.id} value={b.id}>
                                  v{b.version} ({b.status})
                                </option>
                              ))
                            }
                          </select>
                        </td>
                        <td>
                          {formData.items.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-sm btn-icon btn-soft-danger"
                              onClick={() => removeRow(index)}
                            >
                              <i className="isax isax-trash"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-5">
              <Link to="/manufacturing/bom" className="btn btn-light px-4 shadow-none">Cancel</Link>
              <button type="submit" className="btn btn-primary px-5 shadow-none" disabled={saving}>
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  <>{isEditMode ? 'Update' : 'Create'} BOM</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBOM;
