import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getItemById, updateItem, getHsnSacItems } from '../services/itemService';
import { getCategories } from '../services/categoryService';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    unit: 'PCS',
    sale_price: '',
    purchase_price: '',
    gst_rate: '',
    hsn_code: '',
    category_id: '',
    reorder_level: '',
    status: 'Active',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hsnResults, setHsnResults] = useState([]);
  const [showHsnDropdown, setShowHsnDropdown] = useState(false);
  const [categoryResults, setCategoryResults] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [units, setUnits] = useState([]);

  // Load units from localStorage (central registry)
  useEffect(() => {
    const storedUnits = localStorage.getItem('units');
    if (storedUnits) {
      setUnits(JSON.parse(storedUnits));
    }
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        navigate('/products');
        return;
      }

      try {
        const response = await getItemById(id);
        if (response.success && response.data) {
          const item = response.data || response;
          setFormData({
            name: item.name || '',
            sku: item.sku || '',
            description: item.description || '',
            unit: item.unit || 'PCS',
            sale_price: (item.sale_price || item.selling_price || 0).toString(),
            purchase_price: (item.purchase_price || 0).toString(),
            gst_rate: parseInt(item.gst_rate ?? item.tax_rate ?? 0).toString(),
            hsn_code: item.hsn_code || '',
            category_id: item.category_id || item.category?.id || '',
            reorder_level: (item.reorder_level || 0).toString(),
            status: item.is_active !== false ? 'Active' : 'Inactive',
          });
          if (item.category?.name || item.category_name) {
            setCategorySearch(item.category?.name || item.category_name);
          }
        } else {
          toast.error('Product not found!', { position: 'top-right', autoClose: 3000 });
          navigate('/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product!', { position: 'top-right', autoClose: 3000 });
        navigate('/products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

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
      gst_rate: hsn.gst_rate ? hsn.gst_rate.toString() : prev.gst_rate 
    }));
    setShowHsnDropdown(false);
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
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
  };
   
  // Click outside listener for dropdowns
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.sku.trim() || !formData.sale_price.trim()) {
      toast.error('Name, SKU and Sale Price are required!', { position: 'top-right', autoClose: 3000 });
      return;
    }

    setIsSubmitting(true);
    try {
      await updateItem(id, formData);
      toast.success('Product updated successfully!', { position: 'top-right', autoClose: 3000 });
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.details && Array.isArray(error.details)) {
        error.details.forEach((err) => {
          toast.error(err.message || 'Validation error', { position: 'top-right', autoClose: 3000 });
        });
      } else {
        toast.error(error?.message || 'Failed to update product!', { position: 'top-right', autoClose: 3000 });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Edit Product</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/products">Products</Link>
              </li>
              <li className="breadcrumb-item active">Edit Product</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Product Name"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">SKU</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="e.g. HP-LAP-001"
                        disabled
                      />
                      <small className="text-muted">SKU cannot be changed after creation.</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Unit</label>
                      <select
                        className="form-control bg-light"
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        disabled
                      >
                         <option value="">Select Unit</option>
                        {units.length > 0 ? (
                          units.filter(u => u.active).map(u => (
                            <option key={u.id} value={u.shortName}>{u.name} ({u.shortName})</option>
                          ))
                        ) : (
                          <>
                            <option value="PCS">PCS</option>
                            <option value="KG">KG</option>
                            <option value="MTR">MTR</option>
                            <option value="LTR">LTR</option>
                            <option value="BOX">BOX</option>
                            <option value="PACK">PACK</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 hsn-dropdown-container category-dropdown-container position-relative">
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="category_search" 
                        value={categorySearch} 
                        onChange={handleInputChange} 
                        onFocus={() => searchCategories(categorySearch)}
                        placeholder="e.g. Electronics" 
                        autoComplete="off"
                      />
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
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows="3"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Selling Price *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="sale_price"
                        value={formData.sale_price}
                        onChange={handleInputChange}
                        placeholder="e.g. 55000"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Purchase Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="purchase_price"
                        value={formData.purchase_price}
                        onChange={handleInputChange}
                        placeholder="e.g. 45000"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">GST Rate (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="gst_rate"
                        value={formData.gst_rate}
                        onChange={handleInputChange}
                        placeholder="e.g. 18"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 hsn-dropdown-container position-relative">
                    <div className="mb-3">
                      <label className="form-label">HSN Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hsn_code"
                        value={formData.hsn_code}
                        onChange={handleInputChange}
                        onFocus={() => {
                          searchHsn(formData.hsn_code);
                        }}
                        placeholder="Lookup or enter code"
                        autoComplete="off"
                      />
                      {showHsnDropdown && hsnResults.length > 0 && (
                        <div className="position-absolute w-100 shadow-sm bg-white border rounded-3 mt-1" style={{ zIndex: 1000, maxHeight: '250px', overflowY: 'auto' }}>
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

                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Reorder Level</label>
                      <input
                        type="number"
                        className="form-control"
                        name="reorder_level"
                        value={formData.reorder_level}
                        onChange={handleInputChange}
                        placeholder="e.g. 2"
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Link to="/products" className="btn btn-outline-secondary">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Product Settings</h6>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="border rounded p-3 bg-light mt-4">
                <h6 className="fs-14 mb-2">Quick Tips</h6>
                <ul className="list-unstyled fs-13 mb-0">
                  <li className="mb-1">• Maintain consistency across product SKUs</li>
                  <li className="mb-1">• Stock count controls visibility on some pages</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
