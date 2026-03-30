import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiRequest } from '../services/apiClient';

const JobWorkDetails = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest({
        url: `/api/manufacturing/job-work/${id}`,
        method: 'GET',
      });
      setEntry(res.data || res || null);
    } catch (error) {
      console.error('Error fetching job work details:', error);
      toast.error('Failed to load job work details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="p-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2 text-muted">Loading job work details...</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="p-5 text-center text-muted">Job Work record not found.</div>
    );
  }

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Job Work Details</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item"><Link to="/manufacturing/job-work">Job Work</Link></li>
              <li className="breadcrumb-item active">Details</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-md-3">
              <label className="text-muted small text-uppercase fw-bold d-block mb-1">Type</label>
              <span className={`badge badge-soft-${entry.type === 'OUT' ? 'warning' : 'info'} fs-13`}>
                {entry.type === 'OUT' ? 'Outbound (to Vendor)' : 'Inbound (from Vendor)'}
              </span>
            </div>
            <div className="col-md-3">
              <label className="text-muted small text-uppercase fw-bold d-block mb-1">Quantity</label>
              <h6 className="fw-bold mb-0">{entry.qty || entry.qty_sent || 0}</h6>
            </div>
            <div className="col-md-3">
              <label className="text-muted small text-uppercase fw-bold d-block mb-1">Sent Date</label>
              <h6 className="fw-bold mb-0">{entry.sent_date ? new Date(entry.sent_date).toLocaleDateString() : 'N/A'}</h6>
            </div>
            <div className="col-md-3">
              <label className="text-muted small text-uppercase fw-bold d-block mb-1">Expected Return</label>
              <h6 className="fw-bold mb-0">{entry.expected_return ? new Date(entry.expected_return).toLocaleDateString() : 'N/A'}</h6>
            </div>

            <div className="col-md-6 border-top pt-3">
              <label className="text-muted small text-uppercase fw-bold d-block mb-1">Vendor</label>
              <h6 className="fw-bold mb-0 text-primary">{entry.vendor?.name || entry.vendor_name || 'N/A'}</h6>
            </div>
            <div className="col-md-6 border-top pt-3">
              <label className="text-muted small text-uppercase fw-bold d-block mb-1">Item</label>
              <h6 className="fw-bold mb-0 text-primary">{entry.item?.name || entry.item_name || 'N/A'}</h6>
            </div>

            <div className="col-md-12 border-top pt-3">
              <label className="text-muted small text-uppercase fw-bold d-block mb-1">Notes</label>
              <p className="border rounded p-3 bg-light fs-14 text-muted min-vh-10">
                {entry.notes || 'No notes provided.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobWorkDetails;
