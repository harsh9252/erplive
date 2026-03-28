import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getCreditNotes, cancelCreditNote } from '../services/creditNoteService';
import customerService from '../services/customerService';
import { toast } from 'react-toastify';

const CreditNotes = () => {
  const [creditNotes, setCreditNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    customer_id: '',
    from_date: '',
    to_date: ''
  });
  const [totalCN, setTotalCN] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchCreditNotes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCreditNotes(
        currentPage, 
        itemsPerPage, 
        filters.search, 
        filters.status
      );
      
      const cnData = Array.isArray(response.data) ? response.data : (response.data?.rows || []);
      setCreditNotes(cnData);
      setTotalCN(response.total || response.data?.total || cnData.length || 0);
    } catch (error) {
      console.error('Error fetching credit notes:', error);
      toast.error('Failed to fetch credit notes');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, filters.search, filters.status]);

  const fetchCustomers = async () => {
    try {
      const res = await customerService.getCustomers(1, 1000);
      setCustomers(Array.isArray(res.data) ? res.data : (res.data?.rows || []));
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCreditNotes();
  }, [fetchCreditNotes]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      status: 'All',
      customer_id: '',
      from_date: '',
      to_date: ''
    });
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      DRAFT: 'badge-soft-secondary',
      POSTED: 'badge-soft-success',
      CANCELLED: 'badge-soft-danger',
    };
    return statusClasses[status] || 'badge-soft-secondary';
  };

  const handleCancelClick = async (id) => {
    if (window.confirm('Are you sure you want to cancel this credit note?')) {
      try {
        await cancelCreditNote(id);
        toast.success('Credit note cancelled successfully');
        fetchCreditNotes();
      } catch (error) {
        toast.error(error.message || 'Failed to cancel credit note');
      }
    }
  };

  const totalPages = Math.ceil(totalCN / itemsPerPage);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Credit Notes (Sales Returns)</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item">Sales</li>
              <li className="breadcrumb-item active">Credit Notes</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          <Link to="/invoicing/credit-notes/add" className="btn btn-primary rounded-pill px-4 shadow-none">
            <i className="isax isax-add me-2"></i>Create Return
          </Link>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-2">
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="isax isax-search-normal text-muted"></i>
                </span>
                <input
                  type="text"
                  name="search"
                  className="form-control border-start-0 ps-0 shadow-none border"
                  placeholder="Search Return No..."
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="col-md-2">
              <select
                name="status"
                className="form-select shadow-none border"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="All">All Status</option>
                <option value="DRAFT">DRAFT</option>
                <option value="POSTED">POSTED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
            <div className="col-md-2">
              <select
                name="customer_id"
                className="form-select shadow-none border"
                value={filters.customer_id}
                onChange={handleFilterChange}
              >
                <option value="">All Customers</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center gap-2">
                <input 
                  type="date" 
                  name="from_date" 
                  className="form-control shadow-none border" 
                  value={filters.from_date} 
                  onChange={handleFilterChange} 
                />
                <span className="text-muted">to</span>
                <input 
                  type="date" 
                  name="to_date" 
                  className="form-control shadow-none border" 
                  value={filters.to_date} 
                  onChange={handleFilterChange} 
                />
              </div>
            </div>
            <div className="col-md-1 text-end">
              <button className="btn btn-light w-100 border shadow-none" onClick={resetFilters}>
                <i className="isax isax-refresh"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">No.</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Linked Invoice</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                      <span className="text-muted">Loading credit notes...</span>
                    </td>
                  </tr>
                ) : creditNotes.length > 0 ? (
                  creditNotes.map((cn) => (
                    <tr key={cn.id}>
                      <td className="ps-4">
                        <Link to={`/invoicing/credit-notes/${cn.id}`} className="fw-bold text-dark text-nowrap">
                          {cn.credit_number || cn.invoice_number || `CN-${cn.id}`}
                        </Link>
                      </td>
                      <td>{cn.credit_date || cn.date}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="fw-semibold text-dark">{cn.customer?.name}</span>
                        </div>
                      </td>
                      <td>
                        {cn.original_invoice_id ? (
                          <Link to={`/invoicing/sales/${cn.original_invoice_id}`} className="text-primary fs-12 fw-medium bg-soft-primary px-2 py-1 rounded">
                            {cn.original_invoice_number || `INV-${cn.original_invoice_id}`}
                          </Link>
                        ) : (
                          <span className="text-muted fs-12">Direct Return</span>
                        )}
                      </td>
                      <td className="fw-bold text-dark">₹{Number(cn.net_amount || 0).toLocaleString()}</td>
                      <td>
                        <span className={`badge badge-sm rounded-pill ${getStatusBadge(cn.status)}`}>
                          {cn.status}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="dropdown">
                          <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown">
                            <i className="isax isax-more fs-18"></i>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm rounded-12">
                            <li>
                              <Link className="dropdown-item py-2" to={`/invoicing/credit-notes/${cn.id}`}>
                                <i className="isax isax-eye me-2 text-primary"></i>View Details
                              </Link>
                            </li>
                            {cn.status === 'DRAFT' && (
                              <li>
                                <Link className="dropdown-item py-2" to={`/invoicing/credit-notes/edit/${cn.id}`}>
                                  <i className="isax isax-edit-2 me-2 text-warning"></i>Edit Draft
                                </Link>
                              </li>
                            )}
                            {(cn.status === 'DRAFT' || cn.status === 'POSTED') && (
                              <li>
                                <button className="dropdown-item py-2 text-danger" onClick={() => handleCancelClick(cn.id)}>
                                  <i className="isax isax-trash me-2"></i>Cancel Return
                                </button>
                              </li>
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="py-4">
                        <i className="isax isax-receipt-item fs-40 text-muted mb-3"></i>
                        <p className="text-muted mb-0">No credit notes found matching your filters.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {totalCN > itemsPerPage && (
          <div className="card-footer bg-white py-3">
            <div className="d-flex align-items-center justify-content-between">
              <span className="text-muted fs-13">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalCN)} of {totalCN} entries
              </span>
              <nav>
                <ul className="pagination pagination-rounded mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                      <i className="isax isax-arrow-left-2"></i>
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                    </li>
                  )).slice(0, 5)}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                      <i className="isax isax-arrow-right-3"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditNotes;
