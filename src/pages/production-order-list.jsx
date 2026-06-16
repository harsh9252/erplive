import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { getProductionOrders } from '../services/productionOrderService';

const ProductionOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProductionOrders({ 
        status: filterStatus,
        search: debouncedSearch,
        page,
        limit
      });
      const dataArray = Array.isArray(response.data) ? response.data : (response.data?.rows || []);
      setOrders(dataArray);
      setTotalItems(response.pagination?.total || response.total || response.data?.total || dataArray.length || 0);
    } catch (error) {
      console.error('Error fetching production orders:', error);
      toast.error('Failed to load production orders');
    } finally {
      setLoading(false);
    }
  }, [filterStatus, debouncedSearch, page, limit]);

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
          <div className="input-group" style={{ width: '250px' }}>
            <span className="input-group-text bg-white border-end-0">
              <i className="isax isax-search-normal-1 fs-18 text-muted"></i>
            </span>
            <input 
              type="text" 
              className="form-control border-start-0 shadow-none ps-0" 
              placeholder="Search Orders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="form-select border-0 shadow-sm w-auto" 
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
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
                    <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/manufacturing/production-orders/${order.id}`}>
                      <td className="ps-4">
                        <span className="fw-bold text-primary">
                          PO-{String(order.id).padStart(5, '0')}
                        </span>
                      </td>
                      <td>
                        <span className="fw-medium">{order.finishedItem?.name || order.finished_item?.name || order.finished_item_name || 'N/A'}</span>
                      </td>
                      <td>v{order.bom?.version || 'N/A'}</td>
                      <td>{order.qty_to_produce}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                        <div className="d-flex justify-content-end gap-2">
                          <Link to={`/manufacturing/production-orders/${order.id}`} className="btn btn-sm btn-icon btn-soft-primary" title="View Details">
                            <i className="isax isax-eye"></i>
                          </Link>
                          {order.status === 'DRAFT' && (
                            <button 
                              className="btn btn-sm btn-icon btn-soft-success" 
                              title="Release Order"
                              onClick={async () => {
                                const result = await Swal.fire({
                                  title: 'Release Production Order?',
                                  text: "This will commit the raw materials and move the order to the next stage.",
                                  icon: 'question',
                                  showCancelButton: true,
                                  confirmButtonColor: '#3085d6',
                                  cancelButtonColor: '#d33',
                                  confirmButtonText: 'Yes, Release it!',
                                  customClass: {
                                    confirmButton: 'rounded-pill',
                                    cancelButton: 'rounded-pill'
                                  }
                                });

                                if (result.isConfirmed) {
                                  try {
                                    const { releaseProductionOrder } = await import('../services/productionOrderService');
                                    await releaseProductionOrder(order.id);
                                    toast.success('Released successfully');
                                    fetchOrders();
                                  } catch (err) {
                                    toast.error(err.message || 'Release failed');
                                  }
                                }
                              }}
                            >
                              <i className="isax isax-play"></i>
                            </button>
                          )}
                          {(order.status === 'RELEASED' || order.status === 'IN_PROGRESS') && (
                            <button 
                              className="btn btn-sm btn-icon btn-soft-info" 
                              title="Complete Order"
                              onClick={async () => {
                                const { value: qty } = await Swal.fire({
                                  title: 'Complete Production Order',
                                  input: 'number',
                                  inputLabel: 'Enter actually produced quantity',
                                  inputValue: order.qty_to_produce,
                                  showCancelButton: true,
                                  inputValidator: (value) => {
                                    if (!value) {
                                      return 'You need to enter quantity!'
                                    }
                                  },
                                  customClass: {
                                    confirmButton: 'rounded-pill',
                                    cancelButton: 'rounded-pill'
                                  }
                                });

                                if (qty) {
                                  try {
                                    const { completeProductionOrder } = await import('../services/productionOrderService');
                                    await completeProductionOrder(order.id, parseFloat(qty));
                                    toast.success('Completed successfully');
                                    fetchOrders();
                                  } catch (err) {
                                    toast.error(err.message || 'Completion failed');
                                  }
                                }
                              }}
                            >
                              <i className="isax isax-tick-circle"></i>
                            </button>
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
        {totalItems > limit && (
          <div className="card-footer bg-white border-top-light py-3 d-flex justify-content-between align-items-center">
            <div className="fs-13 text-muted">
              Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems}
            </div>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link shadow-none" onClick={() => setPage(p => p - 1)} disabled={page === 1}>Previous</button>
                </li>
                <li className="page-item active"><span className="page-link">{page}</span></li>
                <li className={`page-item ${orders.length < limit ? 'disabled' : ''}`}>
                  <button className="page-link shadow-none" onClick={() => setPage(p => p + 1)} disabled={orders.length < limit}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductionOrderList;
