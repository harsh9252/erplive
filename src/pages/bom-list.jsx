import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBOMs, deleteBOM } from '../services/bomService';
import Swal from 'sweetalert2';

const BOMList = () => {
  const [boms, setBoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ACTIVE');
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

  const fetchBOMs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBOMs({ 
        status: filterStatus,
        search: debouncedSearch,
        page,
        limit
      });
      const dataArray = Array.isArray(response.data) ? response.data : (response.data?.rows || []);
      setBoms(dataArray);
      setTotalItems(response.pagination?.total || response.total || response.data?.total || dataArray.length || 0);
    } catch (error) {
      console.error('Error fetching BOMs:', error);
      toast.error('Failed to load Bill of Materials');
    } finally {
      setLoading(false);
    }
  }, [filterStatus, debouncedSearch, page, limit]);

  useEffect(() => {
    fetchBOMs();
  }, [fetchBOMs]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Bill of Materials? This action is permanent.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;
    
    try {
      await deleteBOM(id);
      toast.success('BOM deleted successfully');
      fetchBOMs();
    } catch (error) {
      console.error('Error deleting BOM:', error);
      toast.error(error.message || 'Failed to delete BOM');
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return <span className="badge badge-soft-success">Active</span>;
      case 'DRAFT':
        return <span className="badge badge-soft-info">Draft</span>;
      case 'OBSOLETE':
        return <span className="badge badge-soft-danger">Obsolete</span>;
      default:
        return <span className="badge badge-soft-secondary">{status}</span>;
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Bill of Materials (BOM)</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item active">BOM</li>
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
              placeholder="Search BOM..." 
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
            <option value="ACTIVE">Active</option>
            <option value="DRAFT">Draft</option>
            <option value="OBSOLETE">Obsolete</option>
          </select>
          <Link to="/manufacturing/bom/add" className="btn btn-primary shadow-none">
            <i className="isax isax-add me-2"></i>Create BOM
          </Link>
        </div>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Finished Item</th>
                  <th>Version</th>
                  <th>Qty per Batch</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="spinner-border text-primary spinner-border-sm me-2"></div>
                      Loading BOMs...
                    </td>
                  </tr>
                ) : boms.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">No Bill of Materials found.</td>
                  </tr>
                ) : (
                  boms.map((bom) => (
                    <tr key={bom.id} style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/manufacturing/bom/${bom.id}`}>
                      <td className="ps-4">
                        <span className="fw-bold text-dark">{bom.name || 'Unnamed BOM'}</span>
                        <div className="fs-12 text-muted">
                          {bom.finishedItem?.name || bom.finished_item?.name || bom.finished_item_name || 'Unknown Item'}
                        </div>
                      </td>
                      <td>{bom.version}</td>
                      <td>{bom.qty_produced}</td>
                      <td>{getStatusBadge(bom.status)}</td>
                      <td className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                        <div className="d-flex justify-content-end gap-2">
                          <Link to={`/manufacturing/bom/${bom.id}`} className="btn btn-sm btn-icon btn-soft-primary">
                            <i className="isax isax-eye"></i>
                          </Link>
                          <Link to={`/manufacturing/bom/edit/${bom.id}`} className="btn btn-sm btn-icon btn-soft-info">
                            <i className="isax isax-edit"></i>
                          </Link>
                          <button 
                            type="button" 
                            className="btn btn-sm btn-icon btn-soft-danger"
                            onClick={() => handleDelete(bom.id)}
                          >
                            <i className="isax isax-trash"></i>
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
                <li className={`page-item ${boms.length < limit ? 'disabled' : ''}`}>
                  <button className="page-link shadow-none" onClick={() => setPage(p => p + 1)} disabled={boms.length < limit}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default BOMList;
