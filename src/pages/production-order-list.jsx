import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductionOrders } from '../services/productionOrderService';

const ProductionOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('DRAFT');

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProductionOrders({ status: filterStatus });
      setOrders(response.data || response || []);
    } catch (error) {
      console.error('Error fetching production orders:', error);
      toast.error('Failed to load production orders');
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'DRAFT':
        return <span className="badge badge-soft-info">Draft</span>;
      case 'RELEASED':
        return <span className="badge badge-soft-primary">Released</span>;
      case 'IN_PROGRESS':
        return <span className="badge badge-soft-warning">In Progress</span>;
      case 'COMPLETED':
        return <span className="badge badge-soft-success">Completed</span>;
      case 'CANCELLED':
        return <span className="badge badge-soft-danger">Cancelled</span>;
      default:
        return <span className="badge badge-soft-secondary">{status}</span>;
    }
  };

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Production Orders</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item active">Production Orders</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-2">
          <select 
            className="form-select border-0 shadow-sm w-auto" 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="RELEASED">Released</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <Link to="/manufacturing/production-orders/add" className="btn btn-primary shadow-none">
            <i className="isax isax-add me-2"></i>New Production Order
          </Link>
        </div>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Order ID</th>
                  <th>Finished Item</th>
                  <th>BOM Version</th>
                  <th>Qty to Produce</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <div className="spinner-border text-primary spinner-border-sm me-2"></div>
                      Loading Production Orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">No Production Orders found.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td className="ps-4">
                        <Link to={`/manufacturing/production-orders/${order.id}`} className="fw-bold text-primary text-decoration-none">
                          PO-{String(order.id).padStart(5, '0')}
                        </Link>
                      </td>
                      <td>
                        <span className="fw-medium">{order.finished_item?.name || order.finished_item_name || 'N/A'}</span>
                      </td>
                      <td>v{order.bom?.version || 'N/A'}</td>
                      <td>{order.qty_to_produce}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end gap-2">
                          <Link to={`/manufacturing/production-orders/${order.id}`} className="btn btn-sm btn-icon btn-soft-primary">
                            <i className="isax isax-eye"></i>
                          </Link>
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

export default ProductionOrderList;
