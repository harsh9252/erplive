import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductionOrder, releaseProductionOrder, completeProductionOrder } from '../services/productionOrderService';
import ConfirmDialog from '../components/ConfirmDialog';

const ProductionOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ 
    isOpen: false, 
    onConfirm: null, 
    message: '', 
    title: '' 
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProductionOrder(id);
      setOrder(res.data || res || null);
    } catch (error) {
      console.error('Error fetching production order:', error);
      toast.error('Failed to load production order details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRelease = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Release Production Order',
      message: 'This will release the order and consume raw materials from stock. Are you sure?',
      onConfirm: async () => {
        setActionLoading(true);
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        try {
          await releaseProductionOrder(id);
          toast.success('Production Order released successfully');
          fetchData();
        } catch (error) {
          console.error('Error releasing order:', error);
          toast.error(error.message || 'Failed to release production order');
        } finally {
          setActionLoading(false);
        }
      }
    });
  };

  const handleComplete = async () => {
    const qty = prompt('Enter actually produced quantity:', order.qty_to_produce);
    if (qty === null || qty === '') return;
    
    if (isNaN(parseFloat(qty))) {
      toast.error('Please enter a valid numeric quantity');
      return;
    }

    setActionLoading(true);
    try {
      await completeProductionOrder(id, parseFloat(qty));
      toast.success('Production Order completed successfully');
      fetchData();
    } catch (error) {
      console.error('Error completing order:', error);
      toast.error(error.message || 'Failed to complete production order');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'DRAFT':
        return <span className="badge badge-soft-info px-3 py-2 fs-12">Draft</span>;
      case 'RELEASED':
        return <span className="badge badge-soft-primary px-3 py-2 fs-12">Released</span>;
      case 'IN_PROGRESS':
        return <span className="badge badge-soft-warning px-3 py-2 fs-12">In Progress</span>;
      case 'COMPLETED':
        return <span className="badge badge-soft-success px-3 py-2 fs-12">Completed</span>;
      case 'CANCELLED':
        return <span className="badge badge-soft-danger px-3 py-2 fs-12">Cancelled</span>;
      default:
        return <span className="badge badge-soft-secondary px-3 py-2 fs-12">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="p-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2 text-muted">Loading production order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-5 text-center text-muted">Production Order not found.</div>
    );
  }

  return (
    <div className="container-fluid py-4 text-dark">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        message={confirmDialog.message}
        title={confirmDialog.title}
      />

      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Production Order: PO-{String(order.id).padStart(5, '0')}</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item"><Link to="/manufacturing/production-orders">Production Orders</Link></li>
              <li className="breadcrumb-item active">Details</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          {order.status === 'DRAFT' && (
            <button 
              className="btn btn-primary shadow-none px-4" 
              onClick={handleRelease}
              disabled={actionLoading}
            >
              <i className="isax isax-play me-2"></i>Release Order
            </button>
          )}
          {(order.status === 'RELEASED' || order.status === 'IN_PROGRESS') && (
            <button 
              className="btn btn-success shadow-none px-4 text-white" 
              onClick={handleComplete}
              disabled={actionLoading}
            >
              <i className="isax isax-tick-circle me-2"></i>Complete Order
            </button>
          )}
        </div>
      </div>

      <div className="row g-4">
        {/* Main Info */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3 border-0">
              <h6 className="fw-bold mb-0">Order Information</h6>
            </div>
            <div className="card-body pt-0">
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold d-block mb-1">Finished Item</label>
                  <h5 className="fw-bold text-primary mb-0">{order.finished_item?.name || order.finished_item_name || 'N/A'}</h5>
                  <small className="text-muted">{order.finished_item?.sku || ''}</small>
                </div>
                <div className="col-md-6 text-md-end">
                    <label className="text-muted small text-uppercase fw-bold d-block mb-1">Status</label>
                    {getStatusBadge(order.status)}
                </div>
                
                <div className="col-md-4">
                  <label className="text-muted small text-uppercase fw-bold d-block mb-1">BOM Version</label>
                  <Link to={`/manufacturing/bom/${order.bom_id}`} className="fw-bold">
                    v{order.bom?.version || 'Unknown'}
                  </Link>
                </div>
                <div className="col-md-4 text-center">
                  <label className="text-muted small text-uppercase fw-bold d-block mb-1">Qty to Produce</label>
                  <h6 className="fw-bold">{order.qty_to_produce} {order.finished_item?.unit || ''}</h6>
                </div>
                <div className="col-md-4 text-md-end">
                  <label className="text-muted small text-uppercase fw-bold d-block mb-1">Output Warehouse</label>
                  <h6 className="fw-bold text-dark">{order.warehouse?.name || 'N/A'}</h6>
                </div>

                <div className="col-md-6 border-top pt-3">
                  <label className="text-muted small text-uppercase fw-bold d-block mb-1">Planned Start Date</label>
                  <h6>{order.planned_start ? new Date(order.planned_start).toLocaleDateString() : 'N/A'}</h6>
                </div>
                <div className="col-md-6 border-top pt-3 text-md-end">
                  <label className="text-muted small text-uppercase fw-bold d-block mb-1">Planned End Date</label>
                  <h6>{order.planned_end ? new Date(order.planned_end).toLocaleDateString() : 'N/A'}</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3 border-0">
              <h6 className="fw-bold mb-0">Production Notes</h6>
            </div>
            <div className="card-body pt-0">
              <p className="border rounded p-3 bg-light fs-14 text-muted min-vh-10">
                {order.notes || 'No notes provided.'}
              </p>
            </div>
          </div>
        </div>

        {/* Audit/History or Components Sidebar */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3 border-0">
              <h6 className="fw-bold mb-0">Order Summary</h6>
            </div>
            <div className="card-body pt-0 pt-3">
               <div className="d-flex justify-content-between mb-2">
                 <span className="text-muted">Actual Produced:</span>
                 <span className="fw-bold">{order.qty_produced || 0}</span>
               </div>
               <div className="d-flex justify-content-between mb-2">
                 <span className="text-muted">Target Quantity:</span>
                 <span className="fw-bold">{order.qty_to_produce}</span>
               </div>
               <hr />
               <div className="d-flex justify-content-between">
                 <span className="text-muted">Created:</span>
                 <span className="fs-13">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</span>
               </div>
               <div className="d-flex justify-content-between mt-2">
                 <span className="text-muted">Last Updated:</span>
                 <span className="fs-13">{order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : 'N/A'}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionOrderDetails;
