import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getJobWorkEntries } from '../services/jobWorkService';

const JobWorkList = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getJobWorkEntries({ type: filterType });
      setEntries(response.data || response || []);
    } catch (error) {
      console.error('Error fetching job work entries:', error);
      toast.error('Failed to load job work entries');
    } finally {
      setLoading(false);
    }
  }, [filterType]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <div className="container-fluid py-4 text-dark">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Job Work</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item active">Job Work</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-2">
          <select 
            className="form-select border-0 shadow-sm w-auto" 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="OUT">Outbound (to Vendor)</option>
            <option value="IN">Inbound (from Vendor)</option>
          </select>
          <Link to="/manufacturing/job-work/add" className="btn btn-primary shadow-none">
            <i className="isax isax-add me-2"></i>New Job Work
          </Link>
        </div>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Date</th>
                  <th>Type</th>
                  <th>Vendor</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Job Charges</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border text-primary spinner-border-sm me-2"></div>
                      Loading Job Work entries...
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">No Job Work entries found.</td>
                  </tr>
                ) : (
                  entries.map((entry) => (
                    <tr key={entry.id}>
                      <td className="ps-4">
                        <span className="fs-13 text-muted">
                          {entry.sent_date || entry.date || (entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'N/A')}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-soft-${entry.type === 'OUT' ? 'warning' : 'info'}`}>
                          {entry.type === 'OUT' ? 'Outbound' : 'Inbound'}
                        </span>
                      </td>
                      <td>
                        <span className="fw-medium">{entry.vendor?.name || entry.vendor_name || 'N/A'}</span>
                      </td>
                      <td>
                        <span className="fw-medium">{entry.item?.name || entry.item_name || 'N/A'}</span>
                      </td>
                      <td>{entry.qty || entry.qty_sent || 0}</td>
                      <td>₹{entry.job_charges || 0}</td>
                      <td className="text-end pe-4">
                        {/* Actions available once backend routes are implemented */}
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

export default JobWorkList;
