import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { createItem } from '../services/productService';
import { getHsnSacItems } from '../services/itemService';
import { getStockCategories } from '../services/categoryService';
import { getUoms } from '../services/uomService';

const ProductFormModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    unit: 'PCS',
    sale_price: '',
    purchase_price: '',
    gst_rate: '18',
    hsn_code: '',
    category_id: '',
    opening_stock: '0',
    reorder_level: '0',
    status: 'Active',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hsnResults, setHsnResults] = useState([]);
  const [showHsnDropdown, setShowHsnDropdown] = useState(false);
  const [categoryResults, setCategoryResults] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [uoms, setUoms] = useState([]);

  const categoryRef = useRef(null);
  const hsnRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (hsnRef.current && !hsnRef.current.contains(event.target)) {
        setShowHsnDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
        fetchUoms();
    }
  }, [isOpen]);

  const fetchUoms = async () => {
    try {
        const res = await getUoms(1, 100);
        setUoms(res.data || []);
    } catch (e) {
        console.error("Failed to fetch UOMs", e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'hsn_code') {
      searchHsn(value);
    }
  };

  const searchHsn = async (query) => {
    if (!query) {
        setHsnResults([]);
        setShowHsnDropdown(false);
        return;
    }
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
      gst_rate: hsn.gst_rate ? String(hsn.gst_rate) : prev.gst_rate
    }));
    setShowHsnDropdown(false);
  };

  const searchCategories = async (query) => {
    try {
      const response = await getStockCategories({ search: query, limit: 10 });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.sku.trim() || !formData.sale_price) {
      toast.error('Name, SKU and Sale Price are required!');
      return;
    }

    setIsSubmitting(true);
    try {
      const itemData = {
        name: formData.name,
        sku: formData.sku,
        description: formData.description,
        unit: formData.unit,
        sale_price: parseFloat(formData.sale_price) || 0,
        purchase_price: parseFloat(formData.purchase_price) || 0,
        gst_rate: parseFloat(formData.gst_rate) || 0,
        hsn_code: formData.hsn_code,
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
        opening_stock: parseFloat(formData.opening_stock) || 0,
        reorder_level: parseFloat(formData.reorder_level) || 0,
      };

      const res = await createItem(itemData);
      toast.success('Product created successfully!');
      if (onSuccess) onSuccess(res.data);
      onClose();
      // Reset form
      setFormData({
        name: '', sku: '', description: '', unit: 'PCS',
        sale_price: '', purchase_price: '', gst_rate: '18',
        hsn_code: '', category_id: '', opening_stock: '0',
        reorder_level: '0', status: 'Active'
      });
      setCategorySearch('');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(error?.message || 'Failed to create product!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1060 }}></div>
      <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1065 }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4">
            <div className="modal-header border-bottom py-3 px-4">
              <h6 className="modal-title fw-bold">Quick Add Product</h6>
              <button type="button" className="btn-close shadow-none" onClick={onClose}></button>
            </div>
            <div className="modal-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fs-13 fw-600">Product Name *</label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Product Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 position-relative" ref={categoryRef}>
                    <label className="form-label fs-13 fw-600">Category</label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      value={categorySearch}
                      onChange={(e) => {
                          setCategorySearch(e.target.value);
                          searchCategories(e.target.value);
                      }}
                      onFocus={() => searchCategories(categorySearch)}
                      placeholder="e.g. Electronics"
                      autoComplete="off"
                    />
                    {showCategoryDropdown && categoryResults.length > 0 && (
                      <div className="position-absolute w-100 shadow bg-white border rounded-3 mt-1" style={{ zIndex: 1000, maxHeight: '150px', overflowY: 'auto' }}>
                        {categoryResults.map(cat => (
                          <div
                            key={cat.id}
                            className="p-2 border-bottom hover-bg-light cursor-pointer fs-12"
                            onClick={() => selectCategory(cat)}
                          >
                            {cat.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-13 fw-600">SKU *</label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      placeholder="Unique ID"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-13 fw-600">Unit</label>
                    <select
                      className="form-select shadow-none"
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                    >
                      {uoms.length > 0 ? (
                        uoms.map(u => <option key={u.id} value={u.symbol}>{u.name} ({u.symbol})</option>)
                      ) : (
                        <option value="PCS">PCS</option>
                      )}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-13 fw-600">Selling Price *</label>
                    <input
                      type="number"
                      className="form-control shadow-none"
                      name="sale_price"
                      value={formData.sale_price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-13 fw-600">Purchase Price</label>
                    <input
                      type="number"
                      className="form-control shadow-none"
                      name="purchase_price"
                      value={formData.purchase_price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 position-relative" ref={hsnRef}>
                    <label className="form-label fs-13 fw-600">HSN/SAC Code</label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      name="hsn_code"
                      value={formData.hsn_code}
                      onChange={handleInputChange}
                      onFocus={() => searchHsn(formData.hsn_code)}
                      placeholder="Search HSN..."
                      autoComplete="off"
                    />
                    {showHsnDropdown && hsnResults.length > 0 && (
                      <div className="position-absolute w-100 shadow bg-white border rounded-3 mt-1" style={{ zIndex: 1000, maxHeight: '150px', overflowY: 'auto' }}>
                        {hsnResults.map(h => (
                          <div 
                            key={h.id} 
                            className="p-2 border-bottom hover-bg-light cursor-pointer fs-12 d-flex justify-content-between" 
                            onClick={() => selectHsn(h)}
                          >
                            <span>{h.code} - {h.description?.substring(0, 20)}...</span>
                            <span className="badge bg-light text-primary">{h.gst_rate}%</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fs-13 fw-600">GST Rate (%)</label>
                    <select 
                      className="form-select shadow-none"
                      name="gst_rate"
                      value={formData.gst_rate}
                      onChange={handleInputChange}
                    >
                      {[0, 3, 5, 12, 18, 28].map(r => <option key={r} value={r}>{r}%</option>)}
                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                  <button type="button" className="btn btn-outline-secondary px-4 rounded-pill" onClick={onClose}>Cancel</button>
                  <button type="submit" className="btn btn-primary px-4 rounded-pill" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFormModal;
