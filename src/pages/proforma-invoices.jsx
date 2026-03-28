import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getProformaInvoices } from '../services/proformaInvoiceService';
import { getCustomers } from '../services/customerService';
import { toast } from 'react-toastify';

const ProformaInvoices = () => {
  const [proformas, setProformas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    from_date: '',
    to_date: '',
    customer_id: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [proformaRes, customerRes] = await Promise.all([
        getProformaInvoices({
          page: currentPage,
          limit: itemsPerPage,
          ...filters
        }),
        getCustomers(1, 1000)
      ]);
      
      const proformaList = Array.isArray(proformaRes.data) ? proformaRes.data : (proformaRes.data?.rows || []);
      setProformas(proformaList);
      setTotalItems(proformaRes.total || proformaRes.data?.total || proformaList.length || 0);
      setCustomers(Array.isArray(customerRes.data) ? customerRes.data : (customerRes.data?.rows || []));
    } catch (error) {
      console.error('Error fetching proforma data:', error);
      toast.error('Failed to load proforma invoices');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

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
          <h4 className="fw-bold mb-1">Proforma Invoices</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item active">Proforma Invoices</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Link to="/invoicing/proforma/add" className="btn btn-primary d-flex align-items-center rounded-pill px-3 shadow-sm border-0 transition-all hover-lift">
            <i className="isax isax-add me-2"></i>New Proforma
          </Link>
        </div>
      </div>

      <div className="card border-0 shadow-sm glass-card overflow-hidden">
        <div className="card-header bg-white bg-opacity-50 py-3">
          <div className="row g-2 align-items-center">
            <div className="col-md-3">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0"><i className="isax isax-search-normal-1 text-muted"></i></span>
                <input type="text" className="form-control border-start-0 shadow-none ps-0" name="search" placeholder="Search proforma..." value={filters.search} onChange={handleFilterChange} />
              </div>
            </div>
            <div className="col-md-2">
              <select className="form-select form-select-sm shadow-none" name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="All">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="SENT">Sent</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
                <option value="CONVERTED">Converted</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select form-select-sm shadow-none" name="customer_id" value={filters.customer_id} onChange={handleFilterChange}>
                <option value="">All Customers</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <input type="date" className="form-control form-control-sm shadow-none" name="from_date" value={filters.from_date} onChange={handleFilterChange} placeholder="From Date" />
            </div>
            <div className="col-md-2">
              <input type="date" className="form-control form-control-sm shadow-none" name="to_date" value={filters.to_date} onChange={handleFilterChange} placeholder="To Date" />
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3">Proforma #</th>
                  <th className="py-3">Customer</th>
                  <th className="py-3 text-center">Date</th>
                  <th className="py-3 text-center">Valid Until</th>
                  <th className="py-3 text-end">Amount</th>
                  <th className="py-3 text-center">Status</th>
                  <th className="py-3 text-center px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border text-primary spinner-border-sm me-2" role="status"></div>
                      <span className="text-muted fs-14">Loading proformas...</span>
                    </td>
                  </tr>
                ) : proformas.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="mb-3"><i className="isax isax-document-text fs-40 text-muted opacity-25"></i></div>
                      <span className="text-muted fs-14">No proforma invoices found.</span>
                    </td>
                  </tr>
                ) : proformas.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4">
                      <Link to={`/invoicing/proforma/${p.id}`} className="fw-bold text-dark text-decoration-none">
                        {p.proforma_number || p.proformaNumber || `#PRO-${p.id}`}
                      </Link>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm bg-primary bg-opacity-10 text-primary rounded-circle me-2">
                          <span className="fs-12 fw-bold">{(p.customer_name || 'C').charAt(0)}</span>
                        </div>
                        <span className="fs-14 fw-medium text-dark">{p.customer_name || 'Unknown Customer'}</span>
                      </div>
                    </td>
                    <td className="text-center fs-13 text-muted">{p.proforma_date || p.proformaDate}</td>
                    <td className="text-center fs-13 text-muted">{p.valid_until || p.validUntil || 'N/A'}</td>
                    <td className="text-end fw-bold text-dark">₹{(p.net_total || p.netTotal || 0).toLocaleString()}</td>
                    <td className="text-center">
                      <span className={`badge ${getStatusBadge(p.status)} rounded-pill px-3`}>{p.status}</span>
                    </td>
                    <td className="text-center px-4">
                      <div className="dropdown">
                        <button className="btn btn-icon btn-sm rounded-circle border-0 shadow-none hover-lift" data-bs-toggle="dropdown">
                          <i className="isax isax-more text-muted fs-18"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end border-0 shadow">
                          <li>
                            <Link className="dropdown-item d-flex align-items-center px-3 py-2 fs-13" to={`/invoicing/proforma/${p.id}`}>
                              <i className="isax isax-eye me-2 text-primary"></i>View Details
                            </Link>
                          </li>
                          {p.status === 'DRAFT' && (
                            <li>
                              <Link className="dropdown-item d-flex align-items-center px-3 py-2 fs-13" to={`/invoicing/proforma/edit/${p.id}`}>
                                <i className="isax isax-edit me-2 text-warning"></i>Edit Draft
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {totalItems > itemsPerPage && (
          <div className="card-footer bg-white py-3 border-0 d-flex align-items-center justify-content-between">
            <span className="text-muted fs-13">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}</span>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link border-0 shadow-none px-3" onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
                </li>
                <li className={`page-item ${currentPage * itemsPerPage >= totalItems ? 'disabled' : ''}`}>
                  <button className="page-link border-0 shadow-none px-3" onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProformaInvoices;
