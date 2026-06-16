import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';
import approvalService from '../services/approvalService';

const Approvals = () => {
  const { user, hasPermission, refreshPermissions } = useAuth();
  const canApprove = hasPermission('approvals', 'can_update');
  const [activeTab, setActiveTab] = useState('pending'); // 'all' or 'pending'
  const [approvals, setApprovals] = useState([]);
  const [entityDetailsMap, setEntityDetailsMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [filters, setFilters] = useState({ status: 'All', entity_type: 'All' });

  // Modal State
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState('approve'); // 'approve' or 'reject'
  const [remarks, setRemarks] = useState('');

  // Details Modal State
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsRequest, setDetailsRequest] = useState(null);

  const fetchApprovals = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (activeTab === 'pending') {
        res = await approvalService.getPendingApprovals();
      } else {
        res = await approvalService.getApprovals({ status: filters.status, entity_type: filters.entity_type });
      }
      const data = res.data || res || [];
      setApprovals(data);

      // Fetch details for each entity
      data.forEach(async (req) => {
        const id = req.entity_id || req.entity_ref;
        const type = req.entity_type?.toUpperCase();
        const key = `${type}_${id}`;

        if (!entityDetailsMap[key]) {
            try {
                let details = null;
                if (type === 'VOUCHER') {
                    const vRes = await import('../services/voucherService').then(m => m.default.getVoucher(id));
                    details = vRes.data || vRes;
                } else if (type === 'SALES_INVOICE') {
                    const sRes = await import('../services/salesInvoiceService').then(m => m.getSalesInvoiceById(id));
                    details = sRes.data || sRes;
                }
                
                if (details) {
                    setEntityDetailsMap(prev => ({ ...prev, [key]: details }));
                }
            } catch (err) {
                console.error(`Error fetching details for ${key}:`, err);
            }
        }
      });
    } catch (error) {
      console.error('Error fetching approvals:', error);
      toast.error('Failed to load approval requests');
    } finally {
      setLoading(false);
    }
  }, [activeTab, filters]);

  useEffect(() => {
    // Refresh permissions when this page loads
    refreshPermissions();
    fetchApprovals();
  }, [fetchApprovals, refreshPermissions, filters]);

  const handleActionClick = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setRemarks('');
    setShowActionModal(true);
  };

  const handleActionSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    setProcessing(true);
    try {
      if (actionType === 'approve') {
        await approvalService.approveRequest(selectedRequest.id, remarks);
        
        // Automatically post the voucher so it hits the ledger
        if (selectedRequest.entity_type?.toUpperCase() === 'VOUCHER') {
          const voucherId = selectedRequest.entity_id || selectedRequest.entity_ref;
          if (voucherId) {
            try {
              const { voucherService } = await import('../services/voucherService');
              await voucherService.postVoucher(voucherId);
            } catch (err) {
              console.error('Failed to post voucher after approval', err);
            }
          }
        }
        
        toast.success('Request approved successfully');
      } else {
        await approvalService.rejectRequest(selectedRequest.id, remarks);
        
        // Automatically cancel the voucher so it doesn't hit the ledger but stays in history
        if (selectedRequest.entity_type?.toUpperCase() === 'VOUCHER') {
          const voucherId = selectedRequest.entity_id || selectedRequest.entity_ref;
          if (voucherId) {
            try {
              const { voucherService } = await import('../services/voucherService');
              await voucherService.cancelVoucher(voucherId, remarks || 'Rejected in approval workflow');
            } catch (err) {
              console.error('Failed to cancel voucher after rejection', err);
            }
          }
        }

        toast.success('Request rejected successfully');
      }
      setShowActionModal(false);
      fetchApprovals();
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('You cannot approve a request you submitted.');
      } else {
        toast.error(error.response?.data?.message || `Failed to ${actionType} request`);
      }
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING': return 'badge-soft-warning';
      case 'APPROVED': return 'badge-soft-success';
      case 'REJECTED': return 'badge-soft-danger';
      default: return 'badge-soft-secondary';
    }
  };

  const getEntityTypeLabel = (type) => {
    return type?.replace('_', ' ') || 'Unknown';
  };

  const handleViewDetails = (req) => {
    setDetailsRequest(req);
    setShowDetailsModal(true);
  };

  const getEntityReferenceNumber = (req) => {
    const ent = req.entity || req.entity_data || entityDetailsMap[`${req.entity_type?.toUpperCase()}_${req.entity_id || req.entity_ref}`] || {};
    if (ent.voucher_number) return ent.voucher_number;
    if (ent.invoice_number) return ent.invoice_number;
    
    if (req.voucher_number) return req.voucher_number;
    if (req.invoice_number) return req.invoice_number;
    if (req.reference_number) return req.reference_number;

    return `#${req.entity_id || req.entity_ref || 'N/A'}`;
  };

  const getEntityDetails = (req) => {
    // If the backend already provided a summary, use it
    if (req.entity_summary) return req.entity_summary;
    if (req.entity_details) return req.entity_details;

    const details = [];
    
    // Check for flattened fields that might be returned by the approval API
    if (req.voucher_type_name) details.push(req.voucher_type_name);
    if (req.customer_name || req.party_name || req.vendor_name) {
        details.push(req.customer_name || req.party_name || req.vendor_name);
    }
    if (req.amount || req.net_total || req.total_amount) {
        const val = req.amount || req.net_total || req.total_amount;
        details.push(`₹${parseFloat(val).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
    }

    const ent = req.entity || req.entity_data || entityDetailsMap[`${req.entity_type?.toUpperCase()}_${req.entity_id || req.entity_ref}`] || {};
    if (details.length === 0) {
        if (ent.voucher_type?.name) details.push(ent.voucher_type.name);
        if (ent.customer?.name) details.push(ent.customer.name);
        if (ent.vendor?.name) details.push(ent.vendor.name);
        if (ent.ledger?.name) details.push(ent.ledger.name);
        
        const amount = ent.net_total || ent.amount || ent.total_amount || ent.total;
        if (amount) {
            details.push(`₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
        }
    }

    return details.length > 0 ? details.join(' | ') : (req.description || 'No additional details');
  };

  const getEntityPartyName = (req) => {
    if (req.customer_name || req.party_name || req.vendor_name) {
        return req.customer_name || req.party_name || req.vendor_name;
    }
    const ent = req.entity || req.entity_data || entityDetailsMap[`${req.entity_type?.toUpperCase()}_${req.entity_id || req.entity_ref}`] || {};
    if (ent.customer?.name) return ent.customer.name;
    if (ent.vendor?.name) return ent.vendor.name;
    if (ent.ledger?.name) return ent.ledger.name;
    
    // For Vouchers, extract from entries
    if (ent.entries && ent.entries.length > 0) {
        const mainEntry = ent.entries.find(e => e.ledger?.name) || ent.entries[0];
        if (mainEntry?.ledger?.name) return mainEntry.ledger.name;
    }
    return 'N/A';
  };

  const getEntityAmount = (req) => {
    let amount = req.amount || req.net_total || req.total_amount;
    if (!amount) {
        const ent = req.entity || req.entity_data || entityDetailsMap[`${req.entity_type?.toUpperCase()}_${req.entity_id || req.entity_ref}`] || {};
        amount = ent.net_total || ent.amount || ent.total_amount || ent.total;
        
        // For Vouchers, sum DR entries
        if (!amount && ent.entries && ent.entries.length > 0) {
            amount = ent.entries.filter(e => e.dr_cr === 'DR').reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
        }
    }
    return amount ? `₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : 'N/A';
  };

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Approval Workflow</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
              <li className="breadcrumb-item active">Approvals</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Tabs */}
      <div className="card border-0 shadow-sm rounded-16 mb-4">
        <div className="card-header bg-transparent border-0 p-0">
          <ul className="nav nav-tabs nav-tabs-solid px-3 pt-3">
            <li className="nav-item">
              <button 
                className={`nav-link rounded-pill px-4 ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                My Pending
                {activeTab === 'pending' && approvals.length > 0 && (
                  <span className="badge bg-danger ms-2">{approvals.length}</span>
                )}
              </button>
            </li>
            <li className="nav-item ms-2">
              <button 
                className={`nav-link rounded-pill px-4 ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Requests
              </button>
            </li>
          </ul>
        </div>
        {activeTab === 'all' && (
          <div className="bg-light bg-opacity-50 p-3 border-bottom d-flex gap-3 align-items-center">
            <span className="text-muted fs-13 fw-bold uppercase">Filters:</span>
            <select className="form-select form-select-sm w-auto shadow-none" value={filters.status} onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}>
              <option value="All">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <select className="form-select form-select-sm w-auto shadow-none" value={filters.entity_type} onChange={e => setFilters(prev => ({ ...prev, entity_type: e.target.value }))}>
              <option value="All">All Types</option>
              <option value="VOUCHER">Voucher</option>
              <option value="SALES_INVOICE">Sales Invoice</option>
              <option value="PURCHASE_INVOICE">Purchase Invoice</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>
        )}
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle table-hover mb-0">
              <thead className="bg-light bg-opacity-50">
                <tr className="text-muted fs-12 fw-bold text-uppercase">
                  <th className="ps-4">Entity Type</th>
                  <th>Reference & Details</th>
                  <th>Requested By</th>
                  <th>Date Submitted</th>
                  <th>Remarks</th>
                  <th>Status</th>
                  <th className="text-center pe-4">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status"></div>
                      <p className="mt-2 text-muted mb-0">Fetching requests...</p>
                    </td>
                  </tr>
                ) : approvals.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="mb-3">
                        <i className="isax isax-receipt-search fs-48 text-muted opacity-25"></i>
                      </div>
                      <p className="text-muted mb-0">No approval requests found.</p>
                    </td>
                  </tr>
                ) : (
                  approvals.map((req) => (
                    <tr key={req.id}>
                      <td className="ps-4">
                        <span className="fw-bold text-dark text-uppercase fs-12">
                          {getEntityTypeLabel(req.entity_type)}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <button type="button" className="btn btn-link p-0 fw-semibold text-primary hover-underline text-start" onClick={() => handleViewDetails(req)}>
                            {getEntityReferenceNumber(req)} <i className="isax isax-eye fs-14 ms-1"></i>
                          </button>
                          <div className="fs-11 text-muted mt-1 text-truncate" style={{ maxWidth: '200px' }} title={getEntityDetails(req)}>
                            {getEntityDetails(req)}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-xs bg-soft-primary text-primary rounded-circle me-2 fs-10 fw-bold">
                            {req.requester?.name?.charAt(0) || req.requester?.email?.charAt(0) || 'U'}
                          </div>
                          <div className="fs-13">
                            <div className="fw-semibold text-dark">{req.requester?.name || 'System User'}</div>
                            <div className="text-muted fs-11">{req.requester?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="fs-13 text-dark">
                          {req.createdAt ? new Date(req.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                        </div>
                        <div className="fs-11 text-muted">
                          {req.createdAt ? new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </div>
                      </td>
                      <td>
                        <div 
                          className="text-muted fs-12 text-truncate" 
                          style={{ maxWidth: '200px' }}
                          title={req.remarks}
                        >
                          {req.remarks || '-'}
                        </div>
                      </td>
                      <td>
                        <span className={`badge px-2 py-1 rounded-pill fs-11 uppercase ${getStatusBadge(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="text-center pe-4">
                        {req.status?.toUpperCase() === 'PENDING' ? (
                          canApprove ? (
                            <div className="d-flex justify-content-center gap-2">
                              <button 
                                className="btn btn-soft-success btn-sm px-3 rounded-pill"
                                onClick={() => handleActionClick(req, 'approve')}
                                title="Approve"
                              >
                                Approve
                              </button>
                              <button 
                                className="btn btn-soft-danger btn-sm px-3 rounded-pill"
                                onClick={() => handleActionClick(req, 'reject')}
                                title="Reject"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="badge badge-soft-warning fs-11 px-2 py-1">
                              <i className="isax isax-lock me-1"></i>No Permission
                            </span>
                          )
                        ) : (
                          <span className="text-muted fs-11">No actions available</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className={`modal-content border-0 shadow-lg rounded-20 overflow-hidden`}>
              <div className={`modal-header border-0 py-3 bg-${actionType === 'approve' ? 'success' : 'danger'} text-white`}>
                <h5 className="modal-title fw-bold">
                  {actionType === 'approve' ? 'Approve Request' : 'Reject Request'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowActionModal(false)}
                ></button>
              </div>
              <form onSubmit={handleActionSubmit}>
                <div className="modal-body p-4">
                  <div className="mb-4 text-center">
                    <div className={`avatar avatar-xl bg-soft-${actionType === 'approve' ? 'success' : 'danger'} text-${actionType === 'approve' ? 'success' : 'danger'} rounded-circle mb-3 mx-auto`}>
                      <i className={`isax isax-${actionType === 'approve' ? 'tick-circle' : 'close-circle'} fs-40`}></i>
                    </div>
                    <h6 className="fw-bold mb-1">
                      Are you sure you want to {actionType} this {getEntityTypeLabel(selectedRequest?.entity_type)}?
                    </h6>
                    <p className="text-muted fs-13 mb-0">Ref: #{selectedRequest?.entity_id}</p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">
                      {actionType === 'approve' ? 'Approval Remarks' : 'Reason for Rejection'}
                    </label>
                    <textarea 
                      className="form-control rounded-12" 
                      rows="3" 
                      placeholder={`Enter ${actionType === 'approve' ? 'remarks' : 'reason'}...`}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      required={true}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-0 p-4 pt-0">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowActionModal(false)}>Cancel</button>
                  <button 
                    type="submit" 
                    className={`btn btn-${actionType === 'approve' ? 'success' : 'danger'} rounded-pill px-4 shadow-sm`}
                    disabled={processing}
                  >
                    {processing ? 'Processing...' : `Confirm ${actionType?.charAt(0).toUpperCase() + actionType?.slice(1)}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && detailsRequest && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-20 overflow-hidden">
              <div className="modal-header border-bottom py-3 bg-light">
                <h5 className="modal-title fw-bold">
                  {getEntityTypeLabel(detailsRequest.entity_type)} Details
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDetailsModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-4">
                    <div className="col-md-6">
                        <label className="text-muted fs-12 text-uppercase fw-bold mb-1">Reference ID</label>
                        <div className="fw-semibold fs-15 text-primary">{getEntityReferenceNumber(detailsRequest)}</div>
                    </div>
                    <div className="col-md-6">
                        <label className="text-muted fs-12 text-uppercase fw-bold mb-1">Created By / Requested By</label>
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-xs bg-soft-primary text-primary rounded-circle me-2 fs-10 fw-bold">
                            {detailsRequest.requester?.name?.charAt(0) || detailsRequest.requester?.email?.charAt(0) || 'U'}
                          </div>
                          <div className="fw-semibold fs-15">{detailsRequest.requester?.name || 'System User'} <span className="text-muted fs-13 fw-normal">({detailsRequest.requester?.email})</span></div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="text-muted fs-12 text-uppercase fw-bold mb-1">Submission Date</label>
                        <div className="fw-semibold fs-14">
                          {detailsRequest.createdAt ? new Date(detailsRequest.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="text-muted fs-12 text-uppercase fw-bold mb-1">Current Status</label>
                        <div>
                          <span className={`badge px-3 py-1 rounded-pill fs-12 uppercase ${getStatusBadge(detailsRequest.status)}`}>
                            {detailsRequest.status}
                          </span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="text-muted fs-12 text-uppercase fw-bold mb-1">Amount</label>
                        <div className="fw-semibold fs-15 text-success">
                            {getEntityAmount(detailsRequest)}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="text-muted fs-12 text-uppercase fw-bold mb-1">Party Name</label>
                        <div className="fw-semibold fs-15 text-dark">
                            {getEntityPartyName(detailsRequest)}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label className="text-muted fs-12 text-uppercase fw-bold mb-1"><i className="isax isax-document-text me-1"></i> Summary / Details</label>
                        <div className="bg-light rounded-3 p-3 fs-14 border border-light shadow-sm">
                            {getEntityDetails(detailsRequest)}
                        </div>
                    </div>
                </div>
              </div>
              <div className="modal-footer border-top p-3 bg-light">
                <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowDetailsModal(false)}>Close Window</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .rounded-16 { border-radius: 16px !important; }
        .rounded-20 { border-radius: 20px !important; }
        .btn-soft-success {
          background-color: rgba(3, 216, 114, 0.1);
          color: #03d872;
          border: none;
        }
        .btn-soft-success:hover:not(:disabled) {
          background-color: #03d872;
          color: #fff;
        }
        .btn-soft-danger {
          background-color: rgba(255, 62, 62, 0.1);
          color: #ff3e3e;
          border: none;
        }
        .btn-soft-danger:hover {
          background-color: #ff3e3e;
          color: #fff;
        }
        .avatar-xl { width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; }
        .nav-tabs-solid .nav-link { border: none; font-weight: 600; font-size: 14px; transition: all 0.2s; }
        .nav-tabs-solid .nav-link.active { background-color: #3e79f7 !important; color: #fff !important; }
        .nav-tabs-solid .nav-link:not(.active) { color: #555; }
        .nav-tabs-solid .nav-link:not(.active):hover { background-color: rgba(0,0,0,0.05); }
      `}</style>
    </div>
  );
};

export default Approvals;
