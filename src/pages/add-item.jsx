import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getItemById, createItem, updateItem, getHsnSacItems } from '../services/itemService';
import { getCategories } from '../services/categoryService';
import { getWarehouses } from '../services/settingsService';
import uomService from '../services/uomService';

const AddItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [hsnResults, setHsnResults] = useState([]);
  const [showHsnDropdown, setShowHsnDropdown] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [categoryResults, setCategoryResults] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [uoms, setUoms] = useState([]);
  const [fetchingUoms, setFetchingUoms] = useState(false);
  const [warehouses, setWarehouses] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    unit: 'PCS',
    uom_id: '',
    category_id: '',
    sale_price: 0,
    purchase_price: 0,
    taxability_type: 'Taxable',
    gst_rate: 18,
    hsn_code: '',
    opening_stock: 0,
    opening_rate: 0,
    opening_value: 0,
    warehouse_id: '',
    reorder_level: 0,
    track_inventory: true,
    track_batch: false,
    track_serial: false,
    inventory_type: 'Stock',
    stock_type: 'Raw Material',
    track_expiry: false,
    expiry_warning_days: 0,
    manufacture_date: ''
  });

  const fetchData = useCallback(async () => {
    if (isEditMode) {
      try {
        const response = await getItemById(id);
        const item = response.data || response;
        const revTaxMap = {
          'TAXABLE': 'Taxable',
          'EXEMPT': 'Exempt',
          'NIL_RATED': 'Nil Rated',
          'NON_GST': 'Non-GST'
        };

        const revStockMap = {
          'RAW_MATERIAL': 'Raw Material',
          'FINISHED_GOOD': 'Finished Good',
          'SEMI_FINISHED': 'Semi-Finished / WIP',
          'TRADING': 'Trading Good',
          'CONSUMABLE': 'Consumable'
        };
        
        const fetchedTax = revTaxMap[item.taxability_type] || item.taxability_type || 'Taxable';
        const fetchedStock = revStockMap[item.stock_type] || item.stock_type || 'Raw Material';

        setFormData({
          name: item.name,
          sku: item.sku || '',
          description: item.description || '',
          uom_id: item.uom_id || item.unit?.id || '',
          unit: typeof item.unit === 'string' ? item.unit : (item.unit?.symbol || 'PCS'),
          category_id: item.category_id || item.category?.id || '',
          sale_price: item.sale_price || item.selling_price || 0,
          purchase_price: item.purchase_price || 0,
          taxability_type: fetchedTax,
          gst_rate: parseInt(item.gst_rate ?? item.tax_rate ?? 18),
          hsn_code: item.hsn_code || '',
          opening_stock: item.opening_stock || 0,
          opening_rate: item.opening_stock_rate || item.opening_rate || item.opening_price || 0,
          opening_value: item.opening_stock_value || item.opening_value || item.opening_amount || ((item.opening_stock || 0) * (item.opening_stock_rate || item.opening_rate || item.opening_price || 0)),
          warehouse_id: item.warehouse_id || '',
          reorder_level: item.reorder_level || 0,
          track_inventory: item.track_inventory !== undefined ? item.track_inventory : true,
          track_batch: Boolean(item.track_batch),
          track_serial: Boolean(item.track_serial),
          inventory_type: item.inventory_type || 'Stock',
          stock_type: fetchedStock,
          track_expiry: Boolean(item.track_expiry),
          expiry_warning_days: item.expiry_warning_days || 0,
          manufacture_date: item.manufacture_date || ''
        });
        if (item.category?.name || item.category_name) {
          setCategorySearch(item.category?.name || item.category_name);
        }
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

  // Click outside listener for HSN dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showHsnDropdown && !event.target.closest('.hsn-dropdown-container')) {
        setShowHsnDropdown(false);
      }
      if (showCategoryDropdown && !event.target.closest('.category-dropdown-container')) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showHsnDropdown, showCategoryDropdown]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'uom_id') {
      const selectedUom = uoms.find(u => u.id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        uom_id: value,
        unit: selectedUom ? selectedUom.symbol : prev.unit
      }));
    } else if (name === 'taxability_type') {
      setFormData(prev => ({
        ...prev,
        taxability_type: value,
        gst_rate: value === 'Taxable' ? prev.gst_rate : 0
      }));
    } else if (name === 'opening_stock' || name === 'opening_rate') {
      const stock = name === 'opening_stock' ? parseFloat(value) || 0 : parseFloat(formData.opening_stock) || 0;
      const rate = name === 'opening_rate' ? parseFloat(value) || 0 : parseFloat(formData.opening_rate) || 0;
      setFormData(prev => ({
        ...prev,
        [name]: value,
        opening_value: stock * rate
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    if (name === 'hsn_code') {
      searchHsn(value);
    }
    if (name === 'category_search') {
      setCategorySearch(value);
      searchCategories(value);
      if (!value) {
        setFormData(prev => ({ ...prev, category_id: '' }));
      }
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const fetchUoms = async () => {
    setFetchingUoms(true);
    try {
      const response = await uomService.getUoms(1, 200);
      setUoms(response.data || []);
    } catch (error) {
      console.error('Error fetching UOMs:', error);
    } finally {
      setFetchingUoms(false);
    }
  };

  useEffect(() => {
    fetchUoms();
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const res = await getWarehouses();
      setWarehouses(res.data || res || []);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const searchHsn = async (query) => {
    try {
      const response = await getHsnSacItems(query);
      // The API returns { data: { items: [] } } or { data: [] } depending on normalization
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
      gst_rate: hsn.gst_rate !== undefined ? Number(hsn.gst_rate) : prev.gst_rate
    }));
    setShowHsnDropdown(false);
    if (errors.gst_rate) {
      setErrors(prev => ({ ...prev, gst_rate: null }));
    }
    toast.info(`HSN ${hsn.code} selected. GST rate updated to ${hsn.gst_rate}%`);
  };

  const searchCategories = async (query) => {
    try {
      const response = await getCategories({ search: query, limit: 10 });
      const items = response.data || [];
      setCategoryResults(items);
      setShowCategoryDropdown(true);
    } catch (error) {
      console.error('Category search error:', error);
    }
  };

  const selectCategory = (category) => {
    setFormData(prev => ({ ...prev, category_id: category.id }));
    setCategorySearch(category.name);
    setShowCategoryDropdown(false);
    if (errors.category_id) {
      setErrors(prev => ({ ...prev, category_id: null }));
    }
    if (errors.category_search) {
      setErrors(prev => ({ ...prev, category_search: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }
    if (!formData.category_id) {
      newErrors.category_search = 'Stock Group is required. Please select a valid group from the dropdown.';
    }
    if (formData.sale_price === '' || formData.sale_price === null) {
      newErrors.sale_price = 'Sale Price is required';
    }
    if (formData.gst_rate === '' || formData.gst_rate === null) {
      newErrors.gst_rate = 'GST Rate is required';
    }
    if (!formData.uom_id) {
      newErrors.uom_id = 'Primary Unit is required';
    }
    if (formData.track_expiry && (formData.expiry_warning_days === '' || formData.expiry_warning_days === null || Number(formData.expiry_warning_days) < 0)) {
      newErrors.expiry_warning_days = 'Expiry Warning (Days) is required and must be a valid number when Track Expiry is enabled';
    }
    if (formData.track_inventory && formData.opening_stock < 0) {
      newErrors.opening_stock = 'Opening stock cannot be negative';
    }
    if (formData.track_inventory && formData.opening_stock > 0 && !formData.warehouse_id) {
      newErrors.warehouse_id = 'Please select a warehouse for the opening stock';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
      const errorData = error.response?.data;
      const errorMessage = errorData?.message || errorData?.error || error.message || 'Failed to save item';

      if (errorData?.errors) {
        let fieldErrors = '';
        if (Array.isArray(errorData.errors)) {
          fieldErrors = errorData.errors.map(err => err.msg || err.message || JSON.stringify(err)).join(', ');
        } else if (typeof errorData.errors === 'object') {
          const values = Object.values(errorData.errors).flat();
          fieldErrors = values.map(err => typeof err === 'string' ? err : (err.msg || err.message || JSON.stringify(err))).join(', ');
        } else {
          fieldErrors = String(errorData.errors);
        }
        toast.error(fieldErrors ? `${errorMessage}: ${fieldErrors}` : errorMessage);
      } else {
        toast.error(errorMessage);
      }
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

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white py-3">
                <h6 className="mb-0 fw-bold"><i className="isax isax-info-circle me-2 text-primary"></i>Basic Information</h6>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <label className="form-label fw-600">Item Name <span className="text-danger">*</span></label>
                  <input type="text" className={`form-control shadow-none py-2 ${errors.name ? 'is-invalid' : ''}`} name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Laptop HP 15" />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-600">Inventory Type</label>
                    <select className="form-select shadow-none" name="inventory_type" value={formData.inventory_type} onChange={handleInputChange}>
                      <option value="Stock">Stock</option>
                      <option value="Non-Stock">Non-Stock</option>
                      <option value="Service">Service</option>
                      <option value="Consumable">Consumable</option>
                      <option value="Fixed Asset">Fixed Asset</option>
                      {/* <option value="Raw Material">Raw Material</option> */}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-600">SKU / Code</label>
                    <input type="text" className="form-control shadow-none" name="sku" value={formData.sku} onChange={handleInputChange} placeholder="Unique identifier" />
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-600">Stock Type <span className="text-danger">*</span></label>
                    <select className="form-select shadow-none" name="stock_type" value={formData.stock_type} onChange={handleInputChange}>
                      <option value="Raw Material">Raw Material</option>
                      <option value="Finished Good">Finished Good</option>
                      <option value="Semi-Finished / WIP">Semi-Finished / WIP</option>
                      <option value="Trading Good">Trading Good</option>
                      <option value="Consumable">Consumable</option>
                    </select>
                    <div className="fs-11 text-muted mt-1">
                      <i className="isax isax-info-circle me-1"></i>
                      Used for Balance Sheet inventory bifurcation
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-start pt-2">
                    <div className={`alert mb-0 py-2 px-3 fs-12 border-0 w-100 ${formData.stock_type === 'Raw Material' ? 'alert-warning' :
                        formData.stock_type === 'Finished Good' ? 'alert-success' :
                          formData.stock_type === 'Semi-Finished / WIP' ? 'alert-info' :
                            formData.stock_type === 'Trading Good' ? 'alert-primary' : 'alert-secondary'
                      }`}>
                      {formData.stock_type === 'Raw Material' && <><i className="isax isax-box-1 me-2"></i>Used in production. Shown under <b>Raw Materials</b> in Balance Sheet.</>}
                      {formData.stock_type === 'Finished Good' && <><i className="isax isax-box-tick me-2"></i>Ready for sale. Shown under <b>Finished Goods</b> in Balance Sheet.</>}
                      {formData.stock_type === 'Semi-Finished / WIP' && <><i className="isax isax-arrange-circle me-2"></i>Work in progress. Shown under <b>WIP</b> in Balance Sheet.</>}
                      {formData.stock_type === 'Trading Good' && <><i className="isax isax-shop me-2"></i>Bought & sold as-is. Shown under <b>Trading Goods</b> in Balance Sheet.</>}
                      {formData.stock_type === 'Consumable' && <><i className="isax isax-lamp-charge me-2"></i>Used internally. <b>Not tracked</b> in Balance Sheet inventory.</>}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 position-relative category-dropdown-container">
                  <label className="form-label fw-600">Stock Group <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control shadow-none ${errors.category_search ? 'is-invalid' : ''}`}
                    name="category_search"
                    value={categorySearch}
                    onChange={handleInputChange}
                    onFocus={() => searchCategories(categorySearch)}
                    placeholder="e.g. Electronics"
                    autoComplete="off"
                  />
                  {errors.category_search && <div className="invalid-feedback">{errors.category_search}</div>}
                  {showCategoryDropdown && categoryResults.length > 0 && (
                    <div className="position-absolute w-100 shadow-sm bg-white border rounded-3 mt-1" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                      {categoryResults.map(cat => (
                        <div
                          key={cat.id}
                          className="p-2 border-bottom hover-bg-light cursor-pointer fs-13"
                          onClick={() => selectCategory(cat)}
                        >
                          <strong>{cat.name}</strong>
                        </div>
                      ))}
                    </div>
                  )}
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
                      <span className={`input-group-text bg-light ${errors.sale_price ? 'border-danger' : 'border-0'}`}>₹</span>
                      <input type="number" className={`form-control shadow-none bg-light ${errors.sale_price ? 'is-invalid' : 'border-0'}`} name="sale_price" value={formData.sale_price} onChange={handleInputChange} step="any" />
                      {errors.sale_price && <div className="invalid-feedback">{errors.sale_price}</div>}
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
                  <div className="col-md-4">
                    <label className="form-label fw-600">Taxability Type <span className="text-danger">*</span></label>
                    <select className="form-select shadow-none" name="taxability_type" value={formData.taxability_type} onChange={handleInputChange}>
                      <option value="Taxable">Taxable</option>
                      <option value="Exempt">Exempt</option>
                      <option value="Nil Rated">Nil Rated</option>
                      <option value="Non-GST">Non-GST</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-600">GST Rate % <span className="text-danger">*</span></label>
                    <select 
                      className={`form-select shadow-none ${errors.gst_rate ? 'is-invalid' : ''}`} 
                      name="gst_rate" 
                      value={formData.gst_rate} 
                      onChange={handleInputChange}
                      disabled={formData.taxability_type !== 'Taxable'}
                    >
                      {[0, 3, 5, 12, 18, 28].map(r => (
                        <option key={r} value={r}>{r}%</option>
                      ))}
                    </select>
                    {errors.gst_rate && <div className="invalid-feedback">{errors.gst_rate}</div>}
                    {formData.taxability_type !== 'Taxable' && (
                      <div className="fs-11 text-muted mt-1"><i className="isax isax-info-circle me-1"></i>0% applied for {formData.taxability_type}</div>
                    )}
                  </div>
                  <div className="col-md-4 position-relative hsn-dropdown-container">
                    <label className="form-label fw-600">HSN/SAC Code</label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      name="hsn_code"
                      value={formData.hsn_code}
                      onChange={handleInputChange}
                      onFocus={() => searchHsn(formData.hsn_code)}
                      placeholder="Lookup or enter code"
                      autoComplete="off"
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
                  <div className="position-relative">
                    <select
                      className={`form-select shadow-none ${errors.uom_id ? 'is-invalid' : ''}`}
                      name="uom_id"
                      value={formData.uom_id}
                      onChange={handleInputChange}
                      disabled={fetchingUoms}
                    >
                      <option value="">Select Unit</option>
                      {uoms.map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                      ))}
                    </select>
                    {errors.uom_id && <div className="invalid-feedback">{errors.uom_id}</div>}
                    {fetchingUoms && (
                      <div className="position-absolute end-0 top-50 translate-middle-y me-5">
                        <span className="spinner-border spinner-border-sm text-primary"></span>
                      </div>
                    )}
                  </div>
                  {!fetchingUoms && uoms.length === 0 && (
                    <div className="mt-1 fs-12 text-muted">
                      <i className="isax isax-info-circle me-1"></i>
                      No units found. <Link to="/inventory/uom" className="text-primary text-decoration-none">Add Units</Link>
                    </div>
                  )}
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-12">
                    <label className="form-label fw-600">Opening Stock Details</label>
                    <div className="row g-2">
                      <div className="col-md-3">
                        <label className="fs-12 text-muted mb-1">Quantity</label>
                        <input type="number" className={`form-control shadow-none ${errors.opening_stock ? 'is-invalid' : ''}`} name="opening_stock" value={formData.opening_stock} onChange={handleInputChange} step="any" placeholder="Qty" />
                        {errors.opening_stock && <div className="invalid-feedback">{errors.opening_stock}</div>}
                      </div>
                      <div className="col-md-3">
                        <label className="fs-12 text-muted mb-1">Rate (Price)</label>
                        <input type="number" className="form-control shadow-none" name="opening_rate" value={formData.opening_rate} onChange={handleInputChange} step="any" placeholder="Rate" />
                      </div>
                      <div className="col-md-3">
                        <label className="fs-12 text-muted mb-1">Value (₹)</label>
                        <input type="number" className="form-control shadow-none bg-light" name="opening_value" value={formData.opening_value} readOnly placeholder="Value" />
                      </div>
                      <div className="col-md-3">
                        <label className="fs-12 text-muted mb-1">Warehouse</label>
                        <select
                          className={`form-select shadow-none ${errors.warehouse_id ? 'is-invalid' : ''}`}
                          name="warehouse_id"
                          value={formData.warehouse_id}
                          onChange={handleInputChange}
                          disabled={Number(formData.opening_stock) <= 0}
                        >
                          <option value="">Select Warehouse</option>
                          {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                        </select>
                        {errors.warehouse_id && <div className="invalid-feedback">{errors.warehouse_id}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 mt-3">
                    <label className="form-label fw-600">Reorder Level</label>
                    <input type="number" className="form-control shadow-none" name="reorder_level" value={formData.reorder_level} onChange={handleInputChange} step="any" />
                  </div>
                </div>

                <div className="alert alert-soft-info border-0 mb-4 fs-12">
                  <i className="isax isax-info-circle me-1"></i>
                  <b>Note:</b> Opening stock can only be set during item creation to maintain ledger accuracy.
                </div>

                <div className="p-3 bg-light rounded-3">
                  <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <div>
                      <h6 className="mb-0 fs-14 fw-bold">Batch Tracking</h6>
                      <small className="text-muted">Track items by manufacturing batches</small>
                    </div>
                    <div className="form-check form-switch fs-20">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="track_batch"
                        checked={formData.track_batch}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <div>
                      <h6 className="mb-0 fs-14 fw-bold">Serial Tracking</h6>
                      <small className="text-muted">Track each unit by unique serial number</small>
                    </div>
                    <div className="form-check form-switch fs-20">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="track_serial"
                        checked={formData.track_serial}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <h6 className="mb-0 fs-14 fw-bold">Track Expiry</h6>
                      <small className="text-muted">For perishables/chemicals</small>
                    </div>
                    <div className="form-check form-switch fs-20">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="track_expiry"
                        checked={formData.track_expiry}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {formData.track_expiry && (
                    <div className="row g-2">
                      <div className="col-12 mb-2">
                        <label className="form-label fs-12 fw-bold mb-1">Expiry Warning (Days) <span className="text-danger">*</span></label>
                        <input
                          type="number"
                          className={`form-control form-control-sm ${errors.expiry_warning_days ? 'is-invalid' : ''}`}
                          name="expiry_warning_days"
                          value={formData.expiry_warning_days}
                          onChange={handleInputChange}
                        />
                        {errors.expiry_warning_days && <div className="invalid-feedback">{errors.expiry_warning_days}</div>}
                      </div>
                      <div className="col-12">
                        <label className="form-label fs-12 fw-bold mb-1">Manufacture Date</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          name="manufacture_date"
                          value={formData.manufacture_date}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
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
