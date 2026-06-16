import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getItems, deleteItem } from '../services/itemService';
import Swal from 'sweetalert2';

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    // Fetch categories for the filter dropdown
    import('../services/categoryService').then(module => {
      module.getStockCategories({ limit: 100 }).then(res => {
        const catData = Array.isArray(res.data) ? res.data : (res.data?.rows || res.data?.items || Array.isArray(res) ? res : []);
        setCategories(catData);
      }).catch(err => console.error("Error fetching categories:", err));
    }).catch(err => console.error("Error loading category service:", err));
  }, []);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      // Use category_id for API filtering instead of string name
      const response = await getItems(currentPage, itemsPerPage, { search: debouncedSearch, category_id: categoryFilter });
      const itemsData = Array.isArray(response.data) ? response.data : (response.data?.rows || []);
      setItems(itemsData);
      setTotalItems(response.total || response.data?.total || itemsData.length || 0);
    } catch (error) {
      console.error('Error fetching stock items:', error);
      toast.error('Failed to load stock items');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch, categoryFilter]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDeleteItem = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this stock item? This action is permanent.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteItem(id);
        toast.success('Item deleted successfully');
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
        toast.error(error.message || 'Failed to delete item');
      }
    }
  };

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Stock Items</h4>
          <p className="text-muted mb-0 fs-13">Manage your inventory and stock levels.</p>
        </div>
        <Link to="/inventory/items/add" className="btn btn-primary rounded-pill px-4 shadow-sm border-0">
          <i className="isax isax-add me-2"></i>New Stock Item
        </Link>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-header bg-white py-3 border-0">
          <div className="row align-items-center g-3">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="isax isax-search-normal-1 text-muted"></i></span>
                <input 
                  type="text" 
                  className="form-control bg-light border-0 shadow-none" 
                  placeholder="Search by SKU or Name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select className="form-select bg-light border-0 shadow-none" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 text-md-end">
              <button className="btn btn-light rounded-pill px-3 shadow-none border-0" onClick={fetchItems}>
                <i className="isax isax-refresh me-1"></i>Refresh
              </button>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light text-muted uppercase fs-11 tracking-wider">
                <tr>
                  <th className="ps-4">SKU / Code</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th className="text-center">Unit</th>
                  <th className="text-end">Sale Price</th>
                  <th className="text-end">Purchase Price</th>
                  <th className="text-center">Current Stock</th>
                  <th className="text-center">Status</th>
                  <th className="text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status"></div>
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5 text-muted">No stock items found.</td>
                  </tr>
                ) : (
                  items.map(item => (
                    <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/inventory/items/${item.id}`)}>
                      <td className="ps-4 fw-bold text-nowrap">{item.sku || '-'}</td>
                      <td>
                        <div className="fw-semibold text-dark">{item.name}</div>
                        <small className="text-muted">HSN: {typeof item.hsn_code === 'object' && item.hsn_code !== null ? item.hsn_code.code : (item.hsn_code || 'N/A')}</small>
                      </td>
                      <td>{typeof item.category === 'object' && item.category !== null ? item.category.name : (item.category || '-')}</td>
                      <td className="text-center"><span className="badge bg-soft-info text-info border-info px-2">{typeof item.unit === 'object' && item.unit !== null ? item.unit.name || item.unit.code : (item.unit || '-')}</span></td>
                      <td className="text-end">₹{(item.sale_price || item.selling_price || 0).toLocaleString()}</td>
                      <td className="text-end">₹{(item.purchase_price || 0).toLocaleString()}</td>
                      <td className="text-center">
                        <div className={`fw-bold ${item.current_stock <= (item.reorder_level || 0) ? 'text-danger' : 'text-success'}`}>
                          {item.current_stock || 0}
                        </div>
                        {item.current_stock <= (item.reorder_level || 0) && <small className="badge bg-soft-danger text-danger border-danger fs-10 px-1">Reorder</small>}
                      </td>
                      <td className="text-center">
                        <span className={`badge ${item.is_active !== false ? 'bg-soft-success text-success border-success' : 'bg-soft-danger text-danger border-danger'} px-2`}>
                          {item.is_active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                        <div className="d-flex justify-content-end align-items-center gap-2">
                          <Link 
                            className="btn btn-sm btn-soft-primary border-0" 
                            to={`/inventory/items/${item.id}`}
                            title="View Stock"
                          >
                            <i className="isax isax-eye fs-16"></i>
                          </Link>
                          <Link 
                            className="btn btn-sm btn-soft-warning border-0" 
                            to={`/inventory/items/edit/${item.id}`}
                            title="Edit Item"
                          >
                            <i className="isax isax-edit-2 fs-16"></i>
                          </Link>
                          <button 
                            className="btn btn-sm btn-soft-danger border-0" 
                            onClick={() => handleDeleteItem(item.id)}
                            title="Delete Item"
                          >
                            <i className="isax isax-trash fs-16"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {totalItems > itemsPerPage && (
          <div className="card-footer bg-white py-3">
            <div className="d-flex align-items-center justify-content-between">
              <span className="text-muted fs-13">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
              </span>
              <nav>
                <ul className="pagination pagination-rounded mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                      <i className="isax isax-arrow-left-2"></i>
                    </button>
                  </li>
                  {[...Array(Math.ceil(totalItems / itemsPerPage))].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                    </li>
                  )).slice(Math.max(0, currentPage - 3), Math.min(Math.ceil(totalItems / itemsPerPage), currentPage + 2))}
                  <li className={`page-item ${currentPage === Math.ceil(totalItems / itemsPerPage) ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}>
                      <i className="isax isax-arrow-right-3"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
