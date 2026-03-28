import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createItem } from '../services/productService';

const AddProduct = () => {
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
    opening_stock: '',
    reorder_level: '',
    status: 'Active',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.sku.trim() || !formData.sale_price.trim()) {
      toast.error('Name, SKU and Sale Price are required!', { position: 'top-right', autoClose: 3000 });
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
        opening_stock: parseFloat(formData.opening_stock) || 0,
        reorder_level: parseFloat(formData.reorder_level) || 0,
      };

      await createItem(itemData);
      toast.success('Product created successfully!', { position: 'top-right', autoClose: 3000 });
      navigate('/products');
    } catch (error) {
      console.error('Error creating product:', error);
      if (error.details && Array.isArray(error.details)) {
        error.details.forEach((err) => {
          toast.error(err.message || 'Validation error', { position: 'top-right', autoClose: 3000 });
        });
      } else {
        toast.error(error?.message || 'Failed to create product!', { position: 'top-right', autoClose: 3000 });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Add Product</h6>
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
              <li className="breadcrumb-item active">Add Product</li>
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
                      <label className="form-label">SKU *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="e.g. HP-LAP-001"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Unit</label>
                      <select
                        className="form-control"
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                      >
                        <option value="PCS">PCS</option>
                        <option value="KG">KG</option>
                        <option value="MTR">MTR</option>
                        <option value="LTR">LTR</option>
                        <option value="BOX">BOX</option>
                        <option value="PACK">PACK</option>
                      </select>
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
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">HSN Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hsn_code"
                        value={formData.hsn_code}
                        onChange={handleInputChange}
                        placeholder="e.g. 8471"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Opening Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        name="opening_stock"
                        value={formData.opening_stock}
                        onChange={handleInputChange}
                        placeholder="e.g. 10"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
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
                    {isSubmitting ? 'Creating...' : 'Add Product'}
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
                  <li className="mb-1">• Use unique SKU for each product</li>
                  <li className="mb-1">• Add detailed description for better sales</li>
                  <li className="mb-1">• Set appropriate GST rate for tax calculation</li>
                  <li className="mb-1">• Enter HSN code for GST compliance</li>
                  <li>• Set reorder level for inventory alerts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
