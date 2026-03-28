import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPurchaseOrderById, confirmPurchaseOrder, cancelPurchaseOrder } from '../services/purchaseOrderService';

const PurchaseOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getPurchaseOrderById(id);
      setOrder(response.data || response);
    } catch (error) {
      console.error('Error fetching purchase order:', error);
      toast.error('Failed to load purchase order details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleAction = async (action) => {
    const actionName = action === 'confirm' ? 'confirm' : 'cancel';
    if (!window.confirm(`Are you sure you want to ${actionName} this Purchase Order?`)) return;
    
    setActionLoading(true);
    try {
      if (action === 'confirm') {
        await confirmPurchaseOrder(id);
        toast.success('Purchase order confirmed successfully');
      } else {
        await cancelPurchaseOrder(id);
        toast.success('Purchase order cancelled successfully');
      }
      fetchOrder();
    } catch (error) {
      console.error(`Error ${actionName}ing order:`, error);
      toast.error(error.message || `Failed to ${actionName} order`);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toUpperCase() || 'DRAFT';
    switch (s) {
      case 'DRAFT': return <span className="badge bg-soft-secondary text-secondary px-3 py-2 border-secondary">Draft Order</span>;
      case 'CONFIRMED': return <span className="badge bg-soft-success text-success px-3 py-2 border-success">Confirmed Order</span>;
      case 'CANCELLED': return <span className="badge bg-soft-danger text-danger px-3 py-2 border-danger">Cancelled Order</span>;
      default: return <span className="badge bg-soft-info text-info px-3 py-2 border-info">{s}</span>;
    }
  };

  if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;
  if (!order) return <div className="p-5 text-center text-muted">Order not found</div>;

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Purchase Order Details</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/invoicing/purchase-orders">Purchase Orders</Link></li>
              <li className="breadcrumb-item active">{order.po_number || `PO-${order.id}`}</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          {order.status === 'DRAFT' && (
            <button className="btn btn-primary rounded-pill px-4" onClick={() => handleAction('confirm')} disabled={actionLoading}>
              <i className="isax isax-tick-circle me-1"></i>Confirm Order
            </button>
          )}
          {(order.status === 'DRAFT' || order.status === 'CONFIRMED') && (
            <button className="btn btn-soft-danger rounded-pill px-4" onClick={() => handleAction('cancel')} disabled={actionLoading}>
              <i className="isax isax-close-circle me-1"></i>Cancel Order
            </button>
          )}
          <button className="btn btn-outline-white border rounded-pill px-4" onClick={() => window.print()}>
            <i className="isax isax-printer me-1"></i>Print
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
                      <th className="text-end pe-4">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(order.items || []).map((item, idx) => (
                      <tr key={idx}>
                        <td className="ps-4 py-3">
                          <div className="fw-semibold text-dark">{item.item?.name || item.name || 'Product'}</div>
                          <small className="text-muted">{item.description || 'No description provided.'}</small>
                        </td>
                        <td className="text-center">{item.quantity || item.qty} {item.unit || 'Units'}</td>
                        <td className="text-end">₹{item.rate?.toLocaleString()}</td>
                        <td className="text-end pe-4 fw-bold text-dark">₹{((item.quantity || item.qty) * item.rate)?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-3 border-bottom pb-2">Vendor Notes</h6>
              <p className="text-muted">{order.notes || 'No notes for vendor provided.'}</p>
              <h6 className="fw-bold mb-3 border-bottom pb-2 mt-4">Internal Remarks</h6>
              <p className="text-muted">{order.remarks || 'No internal remarks.'}</p>
            </div>
          </div>
        </div>

        <div className="col-xl-3">
          <div className="card border-0 shadow-sm mb-4 bg-primary text-white">
            <div className="card-body text-center py-4">
              <p className="mb-1 opacity-75">Order Total Value</p>
              <h3 className="fw-bold mb-0">₹{order.total_amount?.toLocaleString()}</h3>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Order Summary</h6>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">PO Date</span>
                <span className="fw-semibold">{order.order_date}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Expected Delivery</span>
                <span className="fw-semibold text-primary">{order.expected_delivery || 'Not Set'}</span>
              </div>
              <div className="d-flex justify-content-between mb-0">
                <span className="text-muted">Vendor ID</span>
                <span className="fw-semibold text-dark">{order.vendor_id}</span>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm border-start border-primary border-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Vendor Information</h6>
              <div className="d-flex align-items-center mb-3">
                <div className="avatar avatar-sm bg-soft-primary text-primary rounded-circle me-2">
                  <i className="isax isax-user fs-14"></i>
                </div>
                <div>
                  <div className="fw-bold text-dark">{order.vendor?.name || 'Loading...'}</div>
                  <small className="text-muted">{order.vendor?.email || 'No email'}</small>
                </div>
              </div>
              <div className="fs-13">
                <div className="mb-1"><i className="isax isax-call me-2 text-primary"></i>{order.vendor?.phone || 'No phone recorded'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetails;
