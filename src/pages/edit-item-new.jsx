import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getHsnSacItems } from '../services/itemService';

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    barcode: '',
    category_id: '',
    uom_id: '',
    item_type: 'PRODUCT',
    hsn_code: '',
    description: '',
    purchase_rate: '',
    sale_rate: '',
    mrp: '',
    gst_rate: '0',
    cess_rate: '0',
    track_batch: false,
    track_serial: false,
    reorder_level: '',
    reorder_qty: '',
    min_stock: '',
    max_stock: '',
    is_active: true,
  });
  const [loading, setLoading] = useState(true);
  const [originalSku, setOriginalSku] = useState('');
  const [hsnResults, setHsnResults] = useState([]);
  const [showHsnDropdown, setShowHsnDropdown] = useState(false);

  // Click outside listener for HSN dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showHsnDropdown && !event.target.closest('.hsn-dropdown-container')) {
        setShowHsnDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showHsnDropdown]);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = () => {
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    const item = items.find(i => i.id === parseInt(id));
    
    if (item) {
      setFormData(item);
      setOriginalSku(item.sku);
      setLoading(false);
    } else {
      alert('Item not found');
      navigate('/items');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'hsn_code') {
      searchHsn(value);
    }
  };

  const searchHsn = async (query) => {
    try {
      const response = await getHsnSacItems(query);
      const items = response.data?.items || response.data || [];
      setHsnResults(items);
      setShowHsnDropdown(true);
    } catch (error) {
      console.error('HSN search error:', error);
    }
  };

  const selectHsn = (hsn) => {
    setFormData(prev => ({
      ...prev,
      hsn_code: hsn.code,
      gst_rate: hsn.gst_rate ? String(parseInt(hsn.gst_rate)) : prev.gst_rate
    }));
    setShowHsnDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sku || !formData.category_id || !formData.uom_id || !formData.hsn_code) {
      alert('Please fill all required fields');
      return;
    }

    const items = JSON.parse(localStorage.getItem('items') || '[]');
    
    // Check for duplicate SKU (excluding current item)
    if (formData.sku !== originalSku && items.some(item => item.sku === formData.sku)) {
      alert('SKU already exists. Please use a unique SKU.');
      return;
    }

    const updatedItems = items.map(item =>
      item.id === parseInt(id) ? { ...formData, id: parseInt(id) } : item
    );

    localStorage.setItem('items', JSON.stringify(updatedItems));
    alert('Item updated successfully!');
    navigate('/items');
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Edit Item</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/items">Items</Link>
              </li>
              <li className="breadcrumb-item active">Edit Item</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <h6 className="mb-3">Basic Information</h6>

                <div className="mb-3">
                  <label className="form-label">Item Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">SKU / Item Code *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="Unique per company"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Barcode</label>
                      <input
                        type="text"
                        className="form-control"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleInputChange}
                        placeholder="EAN/UPC"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Category *</label>
                      <select
                        className="form-control"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="1">Electronics</option>
                        <option value="2">Clothing</option>
                        <option value="3">Food & Beverages</option>
                        <option value="4">Services</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Primary UOM *</label>
                      <select
                        className="form-control"
                        name="uom_id"
                        value={formData.uom_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select UOM</option>
                        <option value="1">Pieces</option>
                        <option value="2">Kilograms</option>
                        <option value="3">Liters</option>
                        <option value="4">Meters</option>
                      </select>
                      <div className="fs-11 text-muted mt-1">
                        <i className="isax isax-info-circle me-1"></i>
                        Ensure UOM matches the GST-approved unit for that product category.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Item Type *</label>
                      <select
                        className="form-control"
                        name="item_type"
                        value={formData.item_type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="PRODUCT">Product</option>
                        <option value="SERVICE">Service</option>
                        <option value="ASSET">Asset</option>
                        <option value="RAW_MATERIAL">Raw Material</option>
                        <option value="FINISHED_GOOD">Finished Good</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 hsn-dropdown-container position-relative">
                    <div className="mb-3">
                      <label className="form-label">HSN/SAC Code *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hsn_code"
                        value={formData.hsn_code}
                        onChange={handleInputChange}
                        onFocus={() => searchHsn(formData.hsn_code)}
                        placeholder="For GST"
                        autoComplete="off"
                        required
                      />
                      {showHsnDropdown && hsnResults.length > 0 && (
                        <div className="position-absolute w-100 shadow-sm bg-white border rounded-3 mt-1" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                          {hsnResults.map(h => (
                            <div 
                              key={h.id} 
                              className="p-2 border-bottom hover-bg-light cursor-pointer fs-13 d-flex justify-content-between align-items-center" 
                              onClick={() => selectHsn(h)}
                            >
                              <div>
                                  <strong className="text-primary">{h.code}</strong>
                                  <div className="text-muted text-truncate" style={{ maxWidth: '200px' }}>{h.description}</div>
                              </div>
                              <span className="badge bg-soft-info text-info border border-info border-opacity-25">{h.gst_rate}%</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                  ></textarea>
                </div>

                {/* Pricing Information */}
                <hr className="my-4" />
                <h6 className="mb-3">Pricing Information</h6>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Purchase Rate (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="purchase_rate"
                        value={formData.purchase_rate}
                        onChange={handleInputChange}
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Sale Rate (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="sale_rate"
                        value={formData.sale_rate}
                        onChange={handleInputChange}
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">MRP (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="mrp"
                        value={formData.mrp}
                        onChange={handleInputChange}
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Tax Information */}
                <hr className="my-4" />
                <h6 className="mb-3">Tax Information</h6>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">GST Rate % *</label>
                      <select
                        className="form-control"
                        name="gst_rate"
                        value={formData.gst_rate}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="0">0%</option>
                        <option value="3">3%</option>
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">CESS Rate %</label>
                      <input
                        type="number"
                        className="form-control"
                        name="cess_rate"
                        value={formData.cess_rate}
                        onChange={handleInputChange}
                        step="0.01"
                        placeholder="Default 0"
                      />
                    </div>
                  </div>
                </div>

                {/* Tracking Options */}
                <hr className="my-4" />
                <h6 className="mb-3">Tracking Options</h6>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="track_batch"
                          checked={formData.track_batch}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label">Track Batch</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="track_serial"
                          checked={formData.track_serial}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label">Track Serial No.</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stock Information */}
                <hr className="my-4" />
                <h6 className="mb-3">Stock Information</h6>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Reorder Level</label>
                      <input
                        type="number"
                        className="form-control"
                        name="reorder_level"
                        value={formData.reorder_level}
                        onChange={handleInputChange}
                        placeholder="Min stock before alert"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Reorder Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        name="reorder_qty"
                        value={formData.reorder_qty}
                        onChange={handleInputChange}
                        placeholder="Quantity to reorder"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Minimum Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        name="min_stock"
                        value={formData.min_stock}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Maximum Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        name="max_stock"
                        value={formData.max_stock}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Link to="/items" className="btn btn-outline-secondary">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Update Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Item Settings</h6>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">Active</label>
                </div>
              </div>

              <div className="border rounded p-3 bg-light">
                <h6 className="fs-14 mb-2">Quick Tips</h6>
                <ul className="list-unstyled fs-13 mb-0">
                  <li className="mb-1">• Use unique SKU for each item</li>
                  <li className="mb-1">• Add HSN/SAC code for GST compliance</li>
                  <li className="mb-1">• Set appropriate reorder levels</li>
                  <li className="mb-1">• Enable batch/serial tracking if needed</li>
                  <li>• Verify pricing before saving</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditItem;
