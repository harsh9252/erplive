import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  getProformaInvoiceById, 
  sendProforma, 
  acceptProforma, 
  rejectProforma, 
  convertToInvoice 
} from '../services/proformaInvoiceService';

const ProformaInvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proforma, setProforma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProformaInvoiceById(id);
      setProforma(res.data || res);
    } catch (error) {
      console.error('Error fetching proforma:', error);
      toast.error('Failed to load proforma details');
      navigate('/invoicing/proforma');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAction = async (actionFn, successMsg, ...args) => {
    setActionLoading(true);
    try {
      const res = await actionFn(id, ...args);
      toast.success(successMsg);
      if (successMsg.includes('Converted')) {
        const salesInvoiceId = res.data?.sales_invoice_id || res.sales_invoice_id;
        if (salesInvoiceId) {
          navigate(`/invoicing/sales/${salesInvoiceId}`);
          return;
        }
      }
      fetchData();
    } catch (error) {
      console.error('Action error:', error);
      toast.error(error.message || 'Action failed');
    } finally {
      setActionLoading(false);
      setShowRejectModal(false);
      setRejectReason('');
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (!proforma) return <div className="text-center py-5">Proforma not found</div>;

  const getStatusBadge = (status) => {
    const statusClasses = {
      DRAFT: 'badge-soft-secondary',
      SENT: 'badge-soft-info',
      ACCEPTED: 'badge-soft-success',
      REJECTED: 'badge-soft-danger',
      CONVERTED: 'badge-soft-primary',
    };
    return statusClasses[status] || 'badge-soft-secondary';
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-1">Proforma Details</h4>
          <span className={`badge ${getStatusBadge(proforma.status)} rounded-pill px-3 fs-12 uppercase tracking-wider`}>
            {proforma.status}
          </span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-white d-flex align-items-center border-0 shadow-sm transition-all hover-lift px-3 py-2 fs-13" onClick={() => window.print()}>
            <i className="isax isax-printer me-2"></i>Print / PDF
          </button>
          
          <div className="h-divider mx-2 bg-light bg-opacity-50"></div>

          {proforma.status === 'DRAFT' && (
            <>
              <Link to={`/invoicing/proforma/edit/${id}`} className="btn btn-outline-warning border-0 px-3 py-2 fs-13 transition-all hover-lift">
                <i className="isax isax-edit me-2"></i>Edit Draft
              </Link>
              <button className="btn btn-primary px-4 py-2 fs-13 transition-all rounded-pill shadow-sm border-0 hover-lift d-flex align-items-center" onClick={() => handleAction(sendProforma, 'Proforma sent to customer')} disabled={actionLoading}>
                {actionLoading && <span className="spinner-border spinner-border-sm me-2"></span>}
                <i className="isax isax-send-1 me-2"></i>Send Proforma
              </button>
            </>
          )}

          {proforma.status === 'SENT' && (
            <>
              <button className="btn btn-danger px-4 py-2 fs-13 transition-all rounded-pill shadow-sm border-0 hover-lift" onClick={() => setShowRejectModal(true)} disabled={actionLoading}>
                <i className="isax isax-close-circle me-2"></i>Reject
              </button>
              <button className="btn btn-success px-4 py-2 fs-13 transition-all rounded-pill shadow-sm border-0 hover-lift d-flex align-items-center" onClick={() => handleAction(acceptProforma, 'Proforma accepted by customer')} disabled={actionLoading}>
                {actionLoading && <span className="spinner-border spinner-border-sm me-2"></span>}
                <i className="isax isax-tick-circle me-2"></i>Accept
              </button>
            </>
          )}

          {proforma.status === 'ACCEPTED' && (
            <button className="btn btn-primary px-4 py-2 fs-13 transition-all rounded-pill shadow-sm border-0 hover-lift d-flex align-items-center" onClick={() => handleAction(convertToInvoice, 'Converted to Sales Invoice successfully')} disabled={actionLoading}>
              {actionLoading && <span className="spinner-border spinner-border-sm me-2"></span>}
              <i className="isax isax-refresh-circle me-2"></i>Convert to Invoice
            </button>
          )}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
            <div className="card border-0 shadow-sm glass-card overflow-hidden mb-4">
                <div className="card-body p-5">
                    <div className="row mb-5 pb-5 border-bottom border-light">
                        <div className="col-md-6 mb-3">
                            <h2 className="fw-bold text-primary mb-1">PROFORMA INVOICE</h2>
                            <p className="text-muted fs-14 mb-0">{proforma.proforma_number || proforma.proformaNumber || `#PRO-${proforma.id}`}</p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <h5 className="fw-bold mb-1">{proforma.customer_name || 'Customer Name'}</h5>
                            <p className="text-muted fs-13 mb-1">{proforma.customer_email || 'customer@example.com'}</p>
                            <p className="text-muted fs-13 mb-0">{proforma.customer_address || 'No address provided'}</p>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-4">
                            <p className="fs-12 fw-bold text-muted mb-1 text-uppercase">Proforma Date</p>
                            <h6 className="fw-bold">{proforma.proforma_date || proforma.proformaDate}</h6>
                        </div>
                        <div className="col-4">
                            <p className="fs-12 fw-bold text-muted mb-1 text-uppercase text-primary">Valid Until</p>
                            <h6 className="fw-bold text-primary">{proforma.valid_until || proforma.validUntil || 'N/A'}</h6>
                        </div>
                        <div className="col-4 text-end">
                            <p className="fs-12 fw-bold text-muted mb-1 text-uppercase">Place of Supply</p>
                            <h6 className="fw-bold">{proforma.place_of_supply || proforma.placeOfSupply}</h6>
                        </div>
                    </div>

                    <div className="table-responsive mb-5">
                        <table className="table border-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="px-3 py-3 border-0">Description</th>
                                    <th className="text-center py-3 border-0">Qty</th>
                                    <th className="text-end py-3 border-0">Rate</th>
                                    <th className="text-end py-3 border-0 px-3">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(proforma.items || []).map((item, i) => (
                                    <tr key={i} className="border-bottom border-light border-opacity-50">
                                        <td className="px-3 py-4">
                                            <h6 className="fw-bold mb-1 fs-14 text-dark">{item.item_name || item.name}</h6>
                                            <p className="text-muted fs-12 mb-0">{item.description}</p>
                                        </td>
                                        <td className="text-center py-4 fs-14">{item.qty} {item.uom}</td>
                                        <td className="text-end py-4 fs-14">₹{(item.rate || 0).toLocaleString()}</td>
                                        <td className="text-end py-4 px-3 fs-14 fw-bold text-dark">₹{((item.qty || 0) * (item.rate || 0)).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="row justify-content-end mb-4">
                        <div className="col-md-5">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted fs-14">Sub Total</span>
                                <span className="fw-bold fs-14">₹{(proforma.sub_total || proforma.subTotal || 0).toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                                <span className="text-muted fs-14">Total GST</span>
                                <span className="fw-bold fs-14">₹{(proforma.total_gst || proforma.totalGst || 0).toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="h5 fw-bold mb-0 text-primary">Net Total</span>
                                <span className="h4 fw-bold mb-0 text-primary">₹{(proforma.net_total || proforma.netTotal || 0).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {proforma.notes && (
                      <div className="bg-primary bg-opacity-10 p-4 rounded-4 mb-4 border border-primary border-opacity-10">
                        <p className="fs-12 fw-bold text-primary mb-2 text-uppercase d-flex align-items-center">
                          <i className="isax isax-document-text me-2 fs-16"></i>Proforma Notes
                        </p>
                        <p className="fs-13 text-dark mb-0 whitespace-pre-wrap">{proforma.notes}</p>
                      </div>
                    )}

                    {proforma.remarks && (
                      <div className="bg-light p-4 rounded-4 border-0">
                        <p className="fs-12 fw-bold text-muted mb-2 text-uppercase d-flex align-items-center">
                          <i className="isax isax-message-text me-2 fs-16"></i>Internal Remarks
                        </p>
                        <p className="fs-13 text-muted mb-0 italic">{proforma.remarks}</p>
                      </div>
                    )}
                </div>
            </div>
        </div>
        <div className="col-lg-4">
            <div className="card border-0 shadow-sm glass-card overflow-hidden">
                <div className="card-header bg-white py-3 border-0">
                    <h6 className="mb-0 fw-bold d-flex align-items-center"><i className="isax isax-activity me-2 text-primary"></i>Audit Trail</h6>
                </div>
                <div className="card-body py-4 px-4 fs-13">
                  <div className="timeline">
                    <div className="timeline-item d-flex gap-3 mb-4">
                      <div className="timeline-icon bg-info rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: 28, height: 28}}>
                        <i className="isax isax-add fs-12 text-white"></i>
                      </div>
                      <div>
                        <p className="fw-bold mb-1">Created</p>
                        <p className="text-muted mb-0 fs-12">{proforma.created_at || 'Recently'}</p>
                      </div>
                    </div>
                    {proforma.sent_at && (
                      <div className="timeline-item d-flex gap-3 mb-4">
                        <div className="timeline-icon bg-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: 28, height: 28}}>
                          <i className="isax isax-send-1 fs-12 text-white"></i>
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Sent to Customer</p>
                          <p className="text-muted mb-0 fs-12">{proforma.sent_at}</p>
                        </div>
                      </div>
                    )}
                    {proforma.status === 'REJECTED' && (
                      <div className="timeline-item d-flex gap-3">
                        <div className="timeline-icon bg-danger rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: 28, height: 28}}>
                          <i className="isax isax-close-circle fs-12 text-white"></i>
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Rejected</p>
                          <p className="text-danger mb-0 fs-12">{proforma.rejection_reason || 'No reason specified'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
            </div>
        </div>
      </div>

      {showRejectModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow glass-modal overflow-hidden">
              <div className="modal-header border-0 pb-0">
                <h6 className="fw-bold mb-0">Reject Proforma Invoice</h6>
                <button type="button" className="btn-close shadow-none" onClick={() => setShowRejectModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <label className="form-label fs-13 fw-bold">Reason for Rejection <span className="text-danger">*</span></label>
                <textarea className="form-control shadow-none fs-14 transition-all" rows="4" value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Enter the reason for rejection..." required></textarea>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="button" className="btn btn-link link-secondary text-decoration-none fs-14" onClick={() => setShowRejectModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger rounded-pill px-4 fs-14" onClick={() => handleAction(rejectProforma, 'Proforma rejected successfully', rejectReason)} disabled={!rejectReason || actionLoading}>
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProformaInvoiceDetails;
