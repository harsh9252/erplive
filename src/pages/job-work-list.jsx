import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getJobWorkEntries, releaseJobWork, completeJobWork } from '../services/jobWorkService';
import Swal from 'sweetalert2';

const JobWorkList = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
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

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getJobWorkEntries({ 
        type: filterType,
        search: debouncedSearch,
        page,
        limit
      });
      const dataArray = Array.isArray(response.data) ? response.data : (response.data?.rows || []);
      setEntries(dataArray);
      setTotalItems(response.pagination?.total || response.total || response.data?.total || dataArray.length || 0);
    } catch (error) {
      console.error('Error fetching job work entries:', error);
      toast.error('Failed to load job work entries');
    } finally {
      setLoading(false);
    }
  }, [filterType, debouncedSearch, page, limit]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this job work entry? This action is permanent.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;
    try {
      const { deleteJobWorkEntry } = await import('../services/jobWorkService');
      await deleteJobWorkEntry(id);
      toast.success('Job Work entry deleted successfully');
      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error(error.message || 'Failed to delete entry');
    }
  };

  const handleRelease = async (id) => {
    const result = await Swal.fire({
      title: 'Release Job Work?',
      text: 'This will mark the job work as released and update inventory if applicable.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, release it!'
    });

    if (result.isConfirmed) {
      try {
        await releaseJobWork(id);
        toast.success('Job Work released successfully');
        fetchEntries();
      } catch (error) {
        toast.error(error.message || 'Failed to release job work');
      }
    }
  };

  const handleComplete = async (id, entry) => {
    const { value: qty } = await Swal.fire({
      title: 'Complete Job Work',
      input: 'number',
      inputLabel: 'Received Quantity',
      inputValue: entry.qty || 0,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value <= 0) {
          return 'Please enter a valid quantity';
        }
      }
    });

    if (qty) {
      try {
        await completeJobWork(id, qty);
        toast.success('Job Work completed successfully');
        fetchEntries();
      } catch (error) {
        toast.error(error.message || 'Failed to complete job work');
      }
    }
  };

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
          <div className="input-group" style={{ width: '250px' }}>
            <span className="input-group-text bg-white border-end-0">
              <i className="isax isax-search-normal-1 fs-18 text-muted"></i>
            </span>
            <input 
              type="text" 
              className="form-control border-start-0 shadow-none ps-0" 
              placeholder="Search Job Work..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="form-select border-0 shadow-sm w-auto" 
            value={filterType}
            onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
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
                  <th>Job No</th>
                  <th>Type</th>
                  <th>Vendor</th>
                  <th>Item</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Status</th>
                  <th>Charges</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5">
                      <div className="spinner-border text-primary spinner-border-sm me-2"></div>
                      Loading Job Work entries...
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5 text-muted">No Job Work entries found.</td>
                  </tr>
                ) : (
                  entries.map((entry) => (
                    <tr key={entry.id} style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/manufacturing/job-work/${entry.id}`}>
                      <td className="ps-4">
                        <span className="fs-13 text-muted">
                          {entry.job_work_date || (entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'N/A')}
                        </span>
                      </td>
                      <td>
                        <span className="fw-medium text-primary">{entry.job_work_number || 'N/A'}</span>
                      </td>
                      <td>
                        <span className={`badge badge-soft-${entry.type === 'OUT' ? 'warning' : 'info'}`}>
                          {entry.type === 'OUT' ? 'Outbound' : 'Inbound'}
                        </span>
                      </td>
                      <td>
                        <div className="fw-bold text-dark">{entry.vendor?.name || entry.vendor_name || 'N/A'}</div>
                      </td>
                      <td>
                        <div className="fw-medium text-dark">{entry.item?.name || entry.item_name || 'N/A'}</div>
                        <small className="text-muted">{entry.item?.sku || entry.sku || ''}</small>
                      </td>
                      <td className="text-center">{entry.qty || 0}</td>
                      <td className="text-center">
                        <span className={`badge border ${
                          entry.status === 'SENT' ? 'bg-soft-primary text-primary border-primary' :
                          entry.status === 'RELEASED' ? 'bg-soft-info text-info border-info' :
                          entry.status === 'COMPLETED' ? 'bg-soft-success text-success border-success' :
                          'bg-soft-secondary text-secondary border-secondary'
                        } border-opacity-25`}>
                          {entry.status || 'PENDING'}
                        </span>
                      </td>
                      <td>₹{entry.charges || 0}</td>
                      <td className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                        <div className="d-flex justify-content-end align-items-center gap-2">
                          <Link to={`/manufacturing/job-work/${entry.id}`} className="btn btn-sm btn-soft-primary border-0" title="View Detail">
                            <i className="isax isax-eye fs-16"></i>
                          </Link>
                          <Link to={`/manufacturing/job-work/edit/${entry.id}`} className="btn btn-sm btn-soft-info border-0" title="Edit Entry">
                            <i className="isax isax-edit-2 fs-16"></i>
                          </Link>
                          {(entry.status === 'PENDING' || !entry.status) && (
                            <button 
                              className="btn btn-sm btn-soft-success border-0"
                              onClick={() => handleRelease(entry.id)}
                              title="Release Job Work"
                            >
                              <i className="isax isax-send-1 fs-16"></i>
                            </button>
                          )}
                          {entry.status === 'RELEASED' && (
                            <button 
                              className="btn btn-sm btn-soft-primary border-0"
                              onClick={() => handleComplete(entry.id, entry)}
                              title="Complete Job Work"
                            >
                              <i className="isax isax-tick-circle fs-16"></i>
                            </button>
                          )}
                          <button 
                            type="button" 
                            className="btn btn-sm btn-soft-danger border-0"
                            onClick={() => handleDelete(entry.id)}
                            title="Delete Entry"
                          >
                            <i className="isax isax-trash fs-16"></i>
                          </button>
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
                <li className={`page-item ${entries.length < limit ? 'disabled' : ''}`}>
                  <button className="page-link shadow-none" onClick={() => setPage(p => p + 1)} disabled={entries.length < limit}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobWorkList;
