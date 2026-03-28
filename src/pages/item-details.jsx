import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getItemById, getItemStockSummary } from '../services/itemService';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItemData = useCallback(async () => {
    setLoading(true);
    try {
      const [itemRes, stockRes] = await Promise.all([
        getItemById(id),
        getItemStockSummary(id)
      ]);
      setItem(itemRes.data || itemRes);
      setStock(stockRes.data || []);
    } catch (error) {
      console.error('Error fetching item details:', error);
      toast.error('Failed to load item stock details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchItemData();
  }, [fetchItemData]);

  if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;
  if (!item) return <div className="p-5 text-center text-muted">Item not found</div>;

  const totalStockCount = stock.reduce((acc, curr) => acc + (curr.available_qty || 0), 0);

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Item Stock Details</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/inventory/items">Inventory</Link></li>
              <li className="breadcrumb-item active">{item.name}</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          <Link to={`/inventory/items/edit/${item.id}`} className="btn btn-outline-white border rounded-pill px-4">
            <i className="isax isax-edit me-1"></i>Edit Item
          </Link>
          <button className="btn btn-primary rounded-pill px-4" onClick={() => window.print()}>
            <i className="isax isax-printer me-1"></i>Print Report
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-xl-4 col-lg-5">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="avatar avatar-xl bg-soft-primary text-primary mx-auto mb-3 rounded-circle">
                  <i className="isax isax-box fs-40"></i>
                </div>
                <h5 className="fw-bold mb-1">{item.name}</h5>
                <span className="badge bg-soft-info text-info border-info px-3 py-2 rounded-pill fs-12 uppercase">{item.unit}</span>
              </div>
              
              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2 fs-13">
                  <span className="text-muted text-uppercase">SKU / Code</span>
                  <span className="fw-bold text-dark">{item.sku || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-13">
                  <span className="text-muted text-uppercase">Category</span>
                  <span className="fw-bold text-dark">{item.category || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-13">
                  <span className="text-muted text-uppercase">HSN/SAC Code</span>
                  <span className="fw-bold text-dark">{item.hsn_code || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-13">
                  <span className="text-muted text-uppercase">GST Rate</span>
                  <span className="fw-bold text-success">{item.gst_rate || item.tax_rate}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4 bg-primary text-white">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="opacity-75 mb-1 fs-12 uppercase tracking-wide">Total Available Stock</h6>
                  <h2 className="fw-bold mb-0">{totalStockCount || item.current_stock || 0} <small className="fs-13 fw-normal opacity-75">{item.unit}</small></h2>
                </div>
                <i className="isax isax-box-1 fs-40 opacity-25"></i>
              </div>
            </div>
          </div>
          
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-3 border-bottom pb-2">Technical Details</h6>
              <div className="d-flex justify-content-between mb-2 fs-13 text-muted">
                <span>Sale Price</span>
                <span className="fw-bold text-dark">₹{item.sale_price?.toLocaleString() || item.selling_price?.toLocaleString() || '0'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 fs-13 text-muted">
                <span>Purchase Price</span>
                <span className="fw-bold text-dark">₹{item.purchase_price?.toLocaleString() || '0'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 fs-13 text-muted">
                <span>Reorder Level</span>
                <span className="fw-bold text-danger text-nowrap">{item.reorder_level || 0} {item.unit}</span>
              </div>
              <div className="d-flex justify-content-between mt-3 pt-2 border-top">
                <span className="text-muted fs-13">Tracking Status</span>
                <span className={`badge ${item.track_inventory !== false ? 'bg-soft-success text-success' : 'bg-soft-secondary text-secondary'} rounded-pill px-2`}>
                  {item.track_inventory !== false ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-8 col-lg-7">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold">Stock Distribution by Warehouse</h6>
              <button className="btn btn-soft-primary btn-sm rounded-pill px-3 fs-12" onClick={fetchItemData}>
                <i className="isax isax-refresh me-1"></i>Sync Stock
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="bg-light fs-11 uppercase text-muted">
                    <tr>
                      <th className="ps-4">Warehouse Name</th>
                      <th>Location</th>
                      <th className="text-center">Min Stock</th>
                      <th className="text-center">Current Available</th>
                      <th className="text-end pe-4">Physical Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stock.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-muted">No stock distribution data available.</td>
                      </tr>
                    ) : (
                      stock.map((s, idx) => (
                        <tr key={idx}>
                          <td className="ps-4 fw-bold">{s.warehouse?.name || 'Main Warehouse'}</td>
                          <td className="fs-13">{s.warehouse?.address || 'Primary Location'}</td>
                          <td className="text-center fs-13">{item.reorder_level || 0}</td>
                          <td className="text-center">
                            <span className={`fw-bold h5 mb-0 ${s.available_qty <= (item.reorder_level || 0) ? 'text-danger' : 'text-primary'}`}>
                              {s.available_qty}
                            </span>
                          </td>
                          <td className="text-end pe-4">
                            <span className={`badge rounded-pill px-2 py-1 fs-10 ${s.available_qty > 0 ? 'bg-soft-success text-success border-success' : 'bg-soft-danger text-danger border-danger'}`}>
                              {s.available_qty > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3 border-0">
              <h6 className="mb-0 fw-bold">Item Description & Specification</h6>
            </div>
            <div className="card-body">
              <p className="text-muted fs-14 pb-1 border-bottom border-light">{item.description || 'No detailed description provided for this item.'}</p>
              <div className="row mt-3 fs-13 g-3">
                <div className="col-sm-6 border-end border-light">
                  <span className="d-block text-muted text-uppercase fs-10 fw-bold mb-1">Internal Reference</span>
                  <div className="fw-semibold">{item.sku || 'N/A'}</div>
                </div>
                <div className="col-sm-6">
                  <span className="d-block text-muted text-uppercase fs-10 fw-bold mb-1">Taxation Compliance</span>
                  <div className="fw-semibold">GST {item.gst_rate || item.tax_rate}% (HSN: {item.hsn_code || 'None'})</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
