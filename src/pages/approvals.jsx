import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';
import approvalService from '../services/approvalService';

const Approvals = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending'); // 'all' or 'pending'
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Modal State
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState('approve'); // 'approve' or 'reject'
  const [remarks, setRemarks] = useState('');

  const fetchApprovals = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (activeTab === 'pending') {
        res = await approvalService.getPendingApprovals();
      } else {
        res = await approvalService.getApprovals({ status: 'All' });
      }
      setApprovals(res.data || res || []);
    } catch (error) {
      console.error('Error fetching approvals:', error);
      toast.error('Failed to load approval requests');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

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
        toast.success('Request approved successfully');
      } else {
        await approvalService.rejectRequest(selectedRequest.id, remarks);
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
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle table-hover mb-0">
              <thead className="bg-light bg-opacity-50">
                <tr className="text-muted fs-12 fw-bold text-uppercase">
                  <th className="ps-4">Entity Type</th>
                  <th>Entity Ref</th>
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
                        {/* Depending on entity type, we could link to detail pages */}
                        <span className="fw-semibold text-primary">
                          #{req.entity_id || req.entity_ref || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-xs bg-soft-primary text-primary rounded-circle me-2 fs-10 fw-bold">
                            {req.requested_by_name?.charAt(0) || req.requested_by_email?.charAt(0) || 'U'}
                          </div>
                          <div className="fs-13">
                            <div className="fw-semibold text-dark">{req.requested_by_name || 'System User'}</div>
                            <div className="text-muted fs-11">{req.requested_by_email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="fs-13 text-dark">{req.created_at || req.date_submitted}</div>
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
                          <div className="d-flex justify-content-center gap-2">
                             <button 
                              className="btn btn-soft-success btn-sm px-3 rounded-pill"
                              onClick={() => handleActionClick(req, 'approve')}
                              disabled={req.requested_by_id === user?.id}
                              title={req.requested_by_id === user?.id ? 'Self-approval not allowed' : 'Approve'}
                            >
                              Approve
                            </button>
                            <button 
                              className="btn btn-soft-danger btn-sm px-3 rounded-pill"
                              onClick={() => handleActionClick(req, 'reject')}
                            >
                              Reject
                            </button>
                          </div>
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
                      required={actionType === 'reject'}
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
