import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getItems, deleteItem } from '../services/itemService';

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const navigate = useNavigate();

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getItems(1, 1000, { search: searchTerm, category: categoryFilter });
      setItems(Array.isArray(response.data) ? response.data : (response.data?.rows || []));
    } catch (error) {
      console.error('Error fetching stock items:', error);
      toast.error('Failed to load stock items');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, categoryFilter]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item? This action is permanent.')) return;
    
    try {
      await deleteItem(id);
      toast.success('Item deleted successfully');
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error(error.message || 'Failed to delete item');
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
                {/* Dynamically extract categories if possible, or static list for now */}
                {Array.from(new Set(items.map(i => i.category).filter(Boolean))).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
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
                  <th className="text-end pe-4" style={{ minWidth: '120px' }}>Actions</th>
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
                        <small className="text-muted">HSN: {item.hsn_code || 'N/A'}</small>
                      </td>
                      <td>{item.category || '-'}</td>
                      <td className="text-center"><span className="badge bg-soft-info text-info border-info px-2">{item.unit}</span></td>
                      <td className="text-end">₹{item.sale_price?.toLocaleString() || item.selling_price?.toLocaleString() || '0'}</td>
                      <td className="text-end">₹{item.purchase_price?.toLocaleString() || '0'}</td>
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
                        <div className="dropdown">
                          <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-display="static">
                            <i className="isax isax-more fs-18 text-primary"></i>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                            <li><Link className="dropdown-item py-2" to={`/inventory/items/${item.id}`}><i className="isax isax-eye me-2 text-primary"></i>View Stock</Link></li>
                            <li><Link className="dropdown-item py-2" to={`/inventory/items/edit/${item.id}`}><i className="isax isax-edit-2 me-2 text-warning"></i>Edit Item</Link></li>
                            <li className="dropdown-divider"></li>
                            <li><button className="dropdown-item py-2 text-danger" onClick={() => handleDeleteItem(item.id)}><i className="isax isax-trash me-2"></i>Delete Item</button></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
