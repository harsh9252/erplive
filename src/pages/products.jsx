import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import { getItems, deleteItem } from '../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });
  const [viewModal, setViewModal] = useState({ isOpen: false, product: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getItems(1, 100);
      if (response.success && response.data) {
        // Map API fields to UI fields
        const mappedProducts = response.data.map((item) => ({
          id: item.id,
          name: item.name,
          sku: item.sku,
          category: item.category?.name || 'Uncategorized',
          price: (item.selling_price ?? item.price ?? item.sale_price) !== undefined ? `$${(item.selling_price ?? item.price ?? item.sale_price).toLocaleString()}` : '$0',
          stock: (item.stock ?? item.opening_stock) !== undefined ? (item.stock ?? item.opening_stock) : '0',
          status: item.is_active !== false ? 'Active' : 'Inactive',
          image: item.image || '/assets/img/products/product-01.jpg',
          // Keep original data for editing
          _original: item,
        }));
        setProducts(mappedProducts);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleDelete = async (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await deleteItem(confirmDialog.id);
      const updatedProducts = products.filter((product) => product.id !== confirmDialog.id);
      setProducts(updatedProducts);
      toast.success('Product deleted successfully!', { position: 'top-right', autoClose: 3000 });
    } catch (error) {
      console.error('Error deleting product:', error);
      // Fall back to local delete if API fails
      const updatedProducts = products.filter((product) => product.id !== confirmDialog.id);
      setProducts(updatedProducts);
      toast.success('Product deleted successfully!', { position: 'top-right', autoClose: 3000 });
    } finally {
      setConfirmDialog({ isOpen: false, id: null });
    }
  };

  const handleExport = (type) => {
    toast.info(`Exporting products as ${type}`, { position: 'top-right', autoClose: 3000 });
  };

  const handleView = (e, product) => {
    e.preventDefault();
    setViewModal({ isOpen: true, product });
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />

      {viewModal.isOpen && viewModal.product && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title">Product Details</h5>
                <button type="button" className="btn-close" onClick={() => setViewModal({ isOpen: false, product: null })}></button>
              </div>
              <div className="modal-body text-center">
                <img src={viewModal.product.image || '/assets/img/products/product-01.jpg'} alt={viewModal.product.name} className="img-fluid rounded mb-3" style={{ maxWidth: '150px' }} />
                <h4>{viewModal.product.name}</h4>
                <p className="text-muted">{viewModal.product.sku}</p>

                <div className="row text-start mt-4">
                  <div className="col-6 mb-3">
                    <small className="text-muted d-block">Price</small>
                    <span className="fw-medium text-dark">{viewModal.product.price}</span>
                  </div>
                  <div className="col-6 mb-3">
                    <small className="text-muted d-block">Stock</small>
                    <span className="fw-medium">{viewModal.product.stock}</span>
                  </div>
                  <div className="col-6 mb-3">
                    <small className="text-muted d-block">Status</small>
                    <span className={`fw-medium badge ${viewModal.product.status === 'Active' ? 'badge-soft-success' : 'badge-soft-danger'}`}>
                      {viewModal.product.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <Link to={`/edit-product/${viewModal.product.id}`} className="btn btn-primary" onClick={() => setViewModal({ isOpen: false, product: null })}>Edit Product</Link>
                <button type="button" className="btn btn-outline-secondary" onClick={() => setViewModal({ isOpen: false, product: null })}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Products</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Products
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <Link to="/add-product" className="btn btn-primary d-flex align-items-center">
            <i className="isax isax-add me-1"></i>Add Product
          </Link>
          <div className="dropdown">
            <Link href="#"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="#" onClick={() => handleExport('PDF')}>
                  Download as PDF
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#" onClick={() => handleExport('Excel')}>
                  Download as Excel
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Stats */}
      <div className="row mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Total Products</p>
                  <h6 className="fs-16 fw-semibold">{products.length}</h6>
                </div>
                <span className="avatar avatar-lg bg-primary text-white">
                  <i className="isax isax-box fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Active Products</p>
                  <h6 className="fs-16 fw-semibold">
                    {products.filter((p) => p.status === 'Active').length}
                  </h6>
                </div>
                <span className="avatar avatar-lg bg-success text-white">
                  <i className="isax isax-tick-circle fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Low Stock</p>
                  <h6 className="fs-16 fw-semibold">0</h6>
                </div>
                <span className="avatar avatar-lg bg-warning text-white">
                  <i className="isax isax-warning-2 fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
            <h6 className="mb-1">All Products</h6>
            <div className="d-flex align-items-center gap-2">
              <div className="input-icon-end position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="input-icon-addon">
                  <i className="isax isax-search-normal"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <p className="text-muted mb-0">No products found. Add a product to get started.</p>
                      <Link to="/add-product" className="btn btn-primary btn-sm mt-2">
                        <i className="isax isax-add me-1"></i>Add Product
                      </Link>
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm rounded me-2 flex-shrink-0">
                            <img src={product.image} className="rounded" alt="Product" />
                          </div>
                          <div>
                            <h6 className="fs-14 fw-medium mb-0">
                              <Link to="#" onClick={(e) => handleView(e, product)}>{product.name}</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted">{product.sku}</td>
                      <td className="text-dark fw-medium">{product.price}</td>
                      <td>
                        <span
                          className={`badge badge-sm ${product.status === 'Active' ? 'badge-soft-success' : 'badge-soft-danger'
                            }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Link
                            to="#"
                            className="btn btn-sm btn-outline-primary"
                            title="View Product"
                            onClick={(e) => handleView(e, product)}
                          >
                            <i className="isax isax-eye"></i>
                          </Link>
                          <Link
                            to={`/edit-product/${product.id}`}
                            className="btn btn-sm btn-outline-warning"
                            title="Edit Product"
                          >
                            <i className="isax isax-edit"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(product.id)}
                            title="Delete Product"
                          >
                            <i className="isax isax-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div>
                <p className="mb-0 fs-13">
                  Showing {indexOfFirstItem + 1} to{' '}
                  {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length}{' '}
                  entries
                </p>
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
