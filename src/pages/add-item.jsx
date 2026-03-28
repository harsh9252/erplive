import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getItemById, createItem, updateItem, getHsnSacItems } from '../services/itemService';

const AddItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [hsnResults, setHsnResults] = useState([]);
  const [showHsnDropdown, setShowHsnDropdown] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    unit: 'PCS',
    category: '',
    sale_price: 0,
    purchase_price: 0,
    gst_rate: 18,
    hsn_code: '',
    opening_stock: 0,
    reorder_level: 0,
    track_inventory: true
  });

  const fetchData = useCallback(async () => {
    if (isEditMode) {
      try {
        const response = await getItemById(id);
        const item = response.data || response;
        setFormData({
          name: item.name,
          sku: item.sku || '',
          description: item.description || '',
          unit: item.unit || 'PCS',
          category: item.category || '',
          sale_price: item.sale_price || item.selling_price || 0,
          purchase_price: item.purchase_price || 0,
          gst_rate: item.gst_rate || item.tax_rate || 18,
          hsn_code: item.hsn_code || '',
          opening_stock: item.opening_stock || 0,
          reorder_level: item.reorder_level || 0,
          track_inventory: item.track_inventory !== undefined ? item.track_inventory : true
        });
      } catch (error) {
        console.error('Error fetching item:', error);
        toast.error('Failed to load item details');
      } finally {
        setLoading(false);
      }
    }
  }, [id, isEditMode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (name === 'hsn_code' && value.length > 2) {
      searchHsn(value);
    }
  };

  const searchHsn = async (query) => {
    try {
      const response = await getHsnSacItems(query);
      setHsnResults(response.data || []);
      setShowHsnDropdown(true);
    } catch (error) {
      console.error('HSN search error:', error);
    }
  };

  const selectHsn = (hsn) => {
    setFormData(prev => ({ ...prev, hsn_code: hsn.code }));
    setShowHsnDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditMode) {
        await updateItem(id, formData);
        toast.success('Stock item updated successfully');
      } else {
        await createItem(formData);
        toast.success('Stock item created successfully');
      }
      navigate('/inventory/items');
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error(error.message || 'Failed to save item');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">{isEditMode ? 'Edit' : 'Create'} Stock Item</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/inventory/items">Inventory</Link></li>
              <li className="breadcrumb-item active">{isEditMode ? 'Edit Item' : 'New Item'}</li>
            </ol>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white py-3">
                <h6 className="mb-0 fw-bold"><i className="isax isax-info-circle me-2 text-primary"></i>Basic Information</h6>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <label className="form-label fw-600">Item Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control shadow-none py-2" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Laptop HP 15" required />
                </div>
                
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-600">SKU / Code</label>
                    <input type="text" className="form-control shadow-none" name="sku" value={formData.sku} onChange={handleInputChange} placeholder="Unique identifier" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-600">Category</label>
                    <input type="text" className="form-control shadow-none" name="category" value={formData.category} onChange={handleInputChange} placeholder="e.g. Electronics" />
                  </div>
                </div>

                <div className="mb-0">
                  <label className="form-label fw-600">Description</label>
                  <textarea className="form-control shadow-none" name="description" value={formData.description} onChange={handleInputChange} rows="3" placeholder="Detailed product description..."></textarea>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white py-3">
                <h6 className="mb-0 fw-bold"><i className="isax isax-money me-2 text-primary"></i>Pricing & Tax</h6>
              </div>
              <div className="card-body">
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-600">Sale Price (₹) <span className="text-danger">*</span></label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">₹</span>
                      <input type="number" className="form-control shadow-none border-0 bg-light" name="sale_price" value={formData.sale_price} onChange={handleInputChange} step="any" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-600">Purchase Price (₹)</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">₹</span>
                      <input type="number" className="form-control shadow-none border-0 bg-light" name="purchase_price" value={formData.purchase_price} onChange={handleInputChange} step="any" />
                    </div>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-600">GST Rate % <span className="text-danger">*</span></label>
                    <select className="form-select shadow-none" name="gst_rate" value={formData.gst_rate} onChange={handleInputChange} required>
                      {[0, 3, 5, 12, 18, 28].map(r => (
                        <option key={r} value={r}>{r}%</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 position-relative">
                    <label className="form-label fw-600">HSN/SAC Code</label>
                    <input 
                      type="text" 
                      className="form-control shadow-none" 
                      name="hsn_code" 
                      value={formData.hsn_code} 
                      onChange={handleInputChange} 
                      placeholder="Lookup or enter code" 
                      autoComplete="off"
                    />
                    {showHsnDropdown && hsnResults.length > 0 && (
                      <div className="position-absolute w-100 shadow-sm bg-white border rounded-3 mt-1" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                        {hsnResults.map(h => (
                          <div key={h.id} className="p-2 border-bottom hover-bg-light cursor-pointer fs-13" onClick={() => selectHsn(h)}>
                            <strong>{h.code}</strong> - {h.description}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white py-3">
                <h6 className="mb-0 fw-bold"><i className="isax isax-box me-2 text-primary"></i>Inventory Control</h6>
              </div>
              <div className="card-body">
                <div className="mb-4 d-flex align-items-center justify-content-between p-3 bg-light rounded-3">
                  <div>
                    <h6 className="mb-0 fs-14 fw-bold">Track Inventory</h6>
                    <small className="text-muted">Manage stock levels automatically</small>
                  </div>
                  <div className="form-check form-switch fs-20">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="track_inventory" 
                      checked={formData.track_inventory} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-600">Primary Unit <span className="text-danger">*</span></label>
                  <select className="form-select shadow-none" name="unit" value={formData.unit} onChange={handleInputChange} required>
                    {['PCS', 'KG', 'LTR', 'MTR', 'BOX', 'SET'].map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <label className="form-label fw-600">Opening Stock</label>
                    <input type="number" className="form-control shadow-none" name="opening_stock" value={formData.opening_stock} onChange={handleInputChange} step="any" disabled={isEditMode} />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-600">Reorder Level</label>
                    <input type="number" className="form-control shadow-none" name="reorder_level" value={formData.reorder_level} onChange={handleInputChange} step="any" />
                  </div>
                </div>

                <div className="alert alert-soft-info border-0 mb-0 fs-12">
                  <i className="isax isax-info-circle me-1"></i>
                  <b>Note:</b> Opening stock can only be set during item creation to maintain ledger accuracy.
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm bg-primary bg-opacity-10">
              <div className="card-body text-center py-4">
                <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 shadow-none mb-3" disabled={saving}>
                  {saving ? 'Saving...' : (isEditMode ? 'Update Stock Item' : 'Create Stock Item')}
                </button>
                <button type="button" className="btn btn-outline-white w-100 rounded-pill border py-2 shadow-none" onClick={() => navigate('/inventory/items')}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
