import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSalesOrders } from '../services/salesOrderService';

const SalesOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [totalOrders, setTotalOrders] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getSalesOrders(currentPage, itemsPerPage, { search: debouncedSearch });
      const ordersData = Array.isArray(response.data) ? response.data : (response.data?.rows || []);
      setOrders(ordersData);
      setTotalOrders(response.total || response.data?.total || ordersData.length || 0);
    } catch (error) {
      console.error('Error fetching sales orders:', error);
      toast.error('Failed to load sales orders');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusBadge = (status) => {
    const s = status?.toUpperCase() || 'DRAFT';
    switch (s) {
      case 'OPEN': return <span className="badge bg-soft-primary text-primary px-2 border-primary">Open</span>;
      case 'CONFIRMED': return <span className="badge bg-soft-success text-success px-2 border-success">Confirmed</span>;
      case 'SHIPPED': return <span className="badge bg-soft-info text-info px-2 border-info">Shipped</span>;
      case 'CLOSED': return <span className="badge bg-soft-secondary text-secondary px-2 border-secondary">Closed</span>;
      case 'CANCELLED': return <span className="badge bg-soft-danger text-danger px-2 border-danger">Cancelled</span>;
      case 'PROCESSING': return <span className="badge bg-soft-warning text-warning px-2 border-warning">Processing</span>;
      default: return <span className="badge bg-soft-secondary text-secondary px-2 border-secondary">{s}</span>;
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Sales Orders</h4>
          <p className="text-muted mb-0 fs-13">Manage customer orders and track fulfillment.</p>
        </div>
        <Link to="/invoicing/sales-orders/add" className="btn btn-primary rounded-pill px-4">
          <i className="isax isax-add me-2"></i>New Sales Order
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
                  placeholder="Search by Order ID or Customer..."
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
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  {/* <th>Delivery By</th> */}
                  <th className="text-end">Amount</th>
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
                    <td colSpan="7" className="text-center py-5 text-muted">No sales orders found.</td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/invoicing/sales-orders/${order.id}`)}>
                      <td className="ps-4 fw-bold text-primary">{order.order_number || `SO-${order.id}`}</td>
                      <td>{order.order_date}</td>
                      <td>
                        <div className="fw-semibold text-dark">{order.customer?.name}</div>
                        <small className="text-muted">{order.place_of_supply_name || 'Domestic'}</small>
                      </td>
                      {/* <td>{order.expected_delivery || order.delivery_date || '-'}</td> */}
                      <td className="text-end fw-bold text-dark">₹{order.net_amount?.toLocaleString() || order.total_amount?.toLocaleString() || '0'}</td>
                      <td className="text-center">{getStatusBadge(order.status)}</td>
                      <td className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                        <div className="d-flex justify-content-end align-items-center gap-2">
                          <Link 
                            className="btn btn-sm btn-soft-primary border-0" 
                            to={`/invoicing/sales-orders/${order.id}`}
                            title="View Details"
                          >
                            <i className="isax isax-eye fs-16"></i>
                          </Link>
                          {(order.status === 'OPEN' || order.status === 'DRAFT' || order.status === 'CONFIRMED') && (
                            <Link 
                              className="btn btn-sm btn-soft-warning border-0" 
                              to={`/invoicing/sales-orders/edit/${order.id}`}
                              title="Edit Order"
                            >
                              <i className="isax isax-edit-2 fs-16"></i>
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {totalOrders > itemsPerPage && (
          <div className="card-footer bg-white py-3">
            <div className="d-flex align-items-center justify-content-between">
              <span className="text-muted fs-13">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalOrders)} of {totalOrders} entries
              </span>
              <nav>
                <ul className="pagination pagination-rounded mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                      <i className="isax isax-arrow-left-2"></i>
                    </button>
                  </li>
                  {[...Array(Math.ceil(totalOrders / itemsPerPage))].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                    </li>
                  )).slice(Math.max(0, currentPage - 3), Math.min(Math.ceil(totalOrders / itemsPerPage), currentPage + 2))}
                  <li className={`page-item ${currentPage === Math.ceil(totalOrders / itemsPerPage) ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(totalOrders / itemsPerPage)}>
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

export default SalesOrders;
