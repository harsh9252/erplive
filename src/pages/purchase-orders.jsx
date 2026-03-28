import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPurchaseOrders } from '../services/purchaseOrderService';

const PurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getPurchaseOrders(1, 1000, { search: searchTerm });
      setOrders(Array.isArray(response.data) ? response.data : (response.data?.rows || []));
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
      toast.error('Failed to load purchase orders');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusBadge = (status) => {
    const s = status?.toUpperCase() || 'DRAFT';
    switch (s) {
      case 'DRAFT': return <span className="badge bg-soft-secondary text-secondary px-2 border-secondary">Draft</span>;
      case 'CONFIRMED': return <span className="badge bg-soft-success text-success px-2 border-success">Confirmed</span>;
      case 'CANCELLED': return <span className="badge bg-soft-danger text-danger px-2 border-danger">Cancelled</span>;
      default: return <span className="badge bg-soft-info text-info px-2 border-info">{s}</span>;
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Purchase Orders</h4>
          <p className="text-muted mb-0 fs-13">Send and track orders to your vendors.</p>
        </div>
        <Link to="/invoicing/purchase-orders/add" className="btn btn-primary rounded-pill px-4">
          <i className="isax isax-add me-2"></i>New Purchase Order
        </Link>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3 border-0">
          <div className="row align-items-center g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="isax isax-search-normal-1"></i></span>
                <input 
                  type="text" 
                  className="form-control bg-light border-0 shadow-none" 
                  placeholder="Search by PO Number or Vendor..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light text-dark fw-bold">
                <tr>
                  <th className="ps-4">PO Number</th>
                  <th>Date</th>
                  <th>Vendor</th>
                  <th>Delivery By</th>
                  <th className="text-end">Total Amount</th>
                  <th className="text-center">Status</th>
                  <th className="text-end pe-4" style={{ minWidth: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status"></div>
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">No purchase orders found.</td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/invoicing/purchase-orders/${order.id}`)}>
                      <td className="ps-4 fw-bold text-primary">{order.po_number || `PO-${order.id}`}</td>
                      <td>{order.order_date}</td>
                      <td>
                        <div className="fw-semibold text-dark">{order.vendor?.name}</div>
                        <small className="text-muted">ID: {order.vendor?.id}</small>
                      </td>
                      <td>{order.expected_delivery || '-'}</td>
                      <td className="text-end fw-bold text-dark">₹{order.total_amount?.toLocaleString() || '0'}</td>
                      <td className="text-center">{getStatusBadge(order.status)}</td>
                      <td className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                        <div className="dropdown">
                          <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-display="static">
                            <i className="isax isax-more fs-18"></i>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                            <li><Link className="dropdown-item py-2" to={`/invoicing/purchase-orders/${order.id}`}><i className="isax isax-eye me-2 text-primary"></i>View Details</Link></li>
                            {order.status === 'DRAFT' && (
                              <li><Link className="dropdown-item py-2 text-warning" to={`/invoicing/purchase-orders/edit/${order.id}`}><i className="isax isax-edit-2 me-2"></i>Edit Order</Link></li>
                            )}
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

export default PurchaseOrders;
