import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBOMs } from '../services/bomService';

const BOMList = () => {
  const [boms, setBoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ACTIVE');

  const fetchBOMs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBOMs({ status: filterStatus });
      setBoms(response.data || response || []);
    } catch (error) {
      console.error('Error fetching BOMs:', error);
      toast.error('Failed to load Bill of Materials');
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchBOMs();
  }, [fetchBOMs]);

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
          <select 
            className="form-select border-0 shadow-sm w-auto" 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
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
                    <tr key={bom.id}>
                      <td className="ps-4">
                        <Link to={`/manufacturing/bom/${bom.id}`} className="fw-bold text-dark text-decoration-none">
                          {bom.finished_item?.name || bom.finished_item_name || 'Unknown Item'}
                        </Link>
                      </td>
                      <td>{bom.version}</td>
                      <td>{bom.qty_produced}</td>
                      <td>{getStatusBadge(bom.status)}</td>
                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end gap-2">
                          <Link to={`/manufacturing/bom/${bom.id}`} className="btn btn-sm btn-icon btn-soft-primary">
                            <i className="isax isax-eye"></i>
                          </Link>
                          <Link to={`/manufacturing/bom/edit/${bom.id}`} className="btn btn-sm btn-icon btn-soft-info">
                            <i className="isax isax-edit"></i>
                          </Link>
                        </div>
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

export default BOMList;
