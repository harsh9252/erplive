import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSalesOrderById, cancelSalesOrder } from '../services/salesOrderService';

const SalesOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getSalesOrderById(id);
      setOrder(response.data || response);
    } catch (error) {
      console.error('Error fetching sales order:', error);
      toast.error('Failed to load sales order details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this Sales Order?')) return;
    
    setCancelling(true);
    try {
      await cancelSalesOrder(id);
      toast.success('Sales order cancelled successfully');
      fetchOrder();
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error(error.message || 'Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toUpperCase() || 'DRAFT';
    switch (s) {
      case 'OPEN': return <span className="badge bg-soft-primary text-primary px-3 py-2 border-primary">Open Order</span>;
      case 'CLOSED': return <span className="badge bg-soft-success text-success px-3 py-2 border-success">Order Closed</span>;
      case 'CANCELLED': return <span className="badge bg-soft-danger text-danger px-3 py-2 border-danger">Order Cancelled</span>;
      case 'PROCESSING': return <span className="badge bg-soft-warning text-warning px-3 py-2 border-warning">Processing</span>;
      default: return <span className="badge bg-soft-secondary text-secondary px-3 py-2 border-secondary">{s}</span>;
    }
  };

  if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;
  if (!order) return <div className="p-5 text-center text-muted">Order not found</div>;

  const totalAmount = order.net_amount || order.total_amount || 0;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Sales Order Details</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/invoicing/sales-orders">Sales Orders</Link></li>
              <li className="breadcrumb-item active">{order.order_number || `SO-${order.id}`}</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          {order.status === 'OPEN' && (
            <>
              <button 
                className="btn btn-soft-danger rounded-pill px-4" 
                onClick={handleCancelOrder} 
                disabled={cancelling}
              >
                {cancelling ? 'Cancelling...' : <><i className="isax isax-close-circle me-1"></i>Cancel Order</>}
              </button>
              <Link to={`/invoicing/sales-orders/edit/${order.id}`} className="btn btn-outline-white border rounded-pill px-4">
                <i className="isax isax-edit me-1"></i>Edit Order
              </Link>
            </>
          )}
          <button className="btn btn-primary rounded-pill px-4" onClick={() => window.print()}>
            <i className="isax isax-printer me-1"></i>Print Order
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-xl-9">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold">Order Breakdown</h6>
              {getStatusBadge(order.status)}
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-nowrap align-middle mb-0">
                  <thead className="bg-light text-dark fw-bold">
                    <tr>
                      <th className="ps-4">Item & Description</th>
                      <th className="text-center">Qty</th>
                      <th className="text-end">Rate</th>
                      <th className="text-end">Discount</th>
                      <th className="text-end pe-4">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(order.items || []).map((item, idx) => {
                      const amount = (item.qty * item.rate) * (1 - (item.discount_pct || 0) / 100);
                      return (
                        <tr key={idx}>
                          <td className="ps-4 py-3">
                            <div className="fw-semibold text-dark">{item.item?.name || item.name || 'Product'}</div>
                            <small className="text-muted">{item.description || 'No description provided.'}</small>
                          </td>
                          <td className="text-center">{item.qty} {item.unit || item.uom_id || 'Units'}</td>
                          <td className="text-end">₹{item.rate.toLocaleString()}</td>
                          <td className="text-end text-danger">- {item.discount_pct || 0}%</td>
                          <td className="text-end pe-4 fw-bold text-dark">₹{amount.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-3 border-bottom pb-2">Internal Notes & Remarks</h6>
              <p className="text-muted">{order.remarks || 'No internal notes were recorded for this order.'}</p>
            </div>
          </div>
        </div>

        <div className="col-xl-3">
          <div className="card border-0 shadow-sm mb-4 bg-primary text-white">
            <div className="card-body text-center py-4">
              <p className="mb-1 opacity-75">Order Total Value</p>
              <h3 className="fw-bold mb-0">₹{totalAmount.toLocaleString()}</h3>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Order Summary</h6>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Order Date</span>
                <span className="fw-semibold">{order.order_date}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Expected Delivery</span>
                <span className="fw-semibold text-primary">{order.expected_delivery || order.delivery_date || 'N/A'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Place of Supply</span>
                <span className="fw-semibold">{order.place_of_supply_name || order.place_of_supply || 'N/A'}</span>
              </div>
              <div className="d-flex justify-content-between mb-0">
                <span className="text-muted">PO Reference</span>
                <span className="fw-semibold">{order.reference || 'None'}</span>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm border-start border-primary border-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Customer Information</h6>
              <div className="d-flex align-items-center mb-3">
                <div className="avatar avatar-sm bg-soft-primary text-primary rounded-circle me-2">
                  <i className="isax isax-user fs-14"></i>
                </div>
                <div>
                  <div className="fw-bold text-dark">{order.customer?.name}</div>
                  <small className="text-muted">ID: {order.customer?.id}</small>
                </div>
              </div>
              <div className="fs-13">
                <div className="mb-1"><i className="isax isax-direct-send me-2 text-primary"></i>{order.customer?.email || 'No email available'}</div>
                <div><i className="isax isax-call me-2 text-primary"></i>{order.customer?.phone || 'No phone recorded'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOrderDetails;
