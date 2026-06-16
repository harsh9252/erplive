import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getJobWorkEntry, deleteJobWorkEntry } from '../services/jobWorkService';

const JobWorkDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getJobWorkEntry(id);
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

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job work record?')) return;
    try {
      await deleteJobWorkEntry(id);
      toast.success('Job Work record deleted successfully');
      navigate('/manufacturing/job-work');
    } catch (error) {
      console.error('Error deleting job work:', error);
      toast.error(error.message || 'Failed to delete record');
    }
  };

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
        <div className="d-flex gap-2">
          <Link to={`/manufacturing/job-work/edit/${id}`} className="btn btn-soft-info border-0 shadow-none">
            <i className="isax isax-edit me-2"></i>Edit Record
          </Link>
          <button 
            type="button" 
            className="btn btn-soft-danger border-0 shadow-none"
            onClick={handleDelete}
          >
            <i className="isax isax-trash me-2"></i>Delete Record
          </button>
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
            <div className="col-md-12 border-top pt-3">
              <label className="text-muted small text-uppercase fw-bold d-block mb-3">Items Summary</label>
              <div className="table-responsive border rounded">
                <table className="table align-middle mb-0">
                  <thead className="bg-light fs-11 text-uppercase fw-bold">
                    <tr>
                      <th className="ps-3">Item Name</th>
                      <th>SKU</th>
                      <th className="text-end pe-3">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.items && entry.items.length > 0 ? (
                      entry.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="ps-3 fw-bold text-primary">{item.item?.name || item.item_name || 'N/A'}</td>
                          <td>{item.item?.sku || item.sku || 'N/A'}</td>
                          <td className="text-end pe-3 fw-bold">{item.qty || 0}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="ps-3 fw-bold text-primary">{entry.item?.name || entry.item_name || 'N/A'}</td>
                        <td>{entry.item?.sku || entry.sku || 'N/A'}</td>
                        <td className="text-end pe-3 fw-bold">{entry.qty || 0}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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
