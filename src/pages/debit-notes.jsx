import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDebitNotes, cancelDebitNote } from '../services/debitNoteService';
import vendorService from '../services/vendorService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const DebitNotes = () => {
  const navigate = useNavigate();
  const [debitNotes, setDebitNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    vendor_id: '',
    from_date: '',
    to_date: ''
  });
  const [totalDN, setTotalDN] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const fetchDebitNotes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getDebitNotes(
        currentPage,
        itemsPerPage,
        filters.search,
        filters.status,
        filters.vendor_id,
        filters.from_date,
        filters.to_date
      );

      const dnData = Array.isArray(response.data) ? response.data : (response.data?.rows || []);
      setDebitNotes(dnData);
      setTotalDN(response.total || response.data?.total || dnData.length || 0);
    } catch (error) {
      console.error('Error fetching debit notes:', error);
      toast.error('Failed to fetch debit notes');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, filters.search, filters.status, filters.vendor_id, filters.from_date, filters.to_date]);

  const fetchVendors = async () => {
    try {
      const res = await vendorService.getVendors({ page: 1, limit: 1000 });
      setVendors(Array.isArray(res.data) ? res.data : (res.data?.rows || []));
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast.error('Failed to load vendors');
    }
  };

  useEffect(() => {
    fetchDebitNotes();
  }, [fetchDebitNotes]);

  useEffect(() => {
    fetchVendors();
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
      vendor_id: '',
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
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this debit note?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
      try {
        await cancelDebitNote(id);
        toast.success('Debit note cancelled successfully');
        fetchDebitNotes();
      } catch (error) {
        toast.error(error.message || 'Failed to cancel debit note');
      }
    }
  };

  const totalPages = Math.ceil(totalDN / itemsPerPage);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Debit Notes (Purchase Returns)</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>

              <li className="breadcrumb-item active">Debit Notes</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          <Link to="/invoicing/debit-notes/add" className="btn btn-primary rounded-pill px-4 shadow-none">
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
                name="vendor_id"
                className="form-select shadow-none border"
                value={filters.vendor_id}
                onChange={handleFilterChange}
              >
                <option value="">All Vendors</option>
                {vendors.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
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
                  <th>Vendor</th>
                  <th>Linked Purchase</th>
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
                      <span className="text-muted">Loading debit notes...</span>
                    </td>
                  </tr>
                ) : debitNotes.length > 0 ? (
                  debitNotes.map((dn) => (
                    <tr key={dn.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/invoicing/debit-notes/${dn.id}`)}>
                      <td className="ps-4">
                        <Link to={`/invoicing/debit-notes/${dn.id}`} className="fw-bold text-dark text-nowrap">
                          {dn.debit_number || dn.invoice_number || `DN-${dn.id}`}
                        </Link>
                      </td>
                      <td>{dn.debit_note_date || dn.debit_date || dn.date}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="fw-semibold text-dark">{dn.vendor?.name}</span>
                        </div>
                      </td>
                      <td>
                        {dn.original_invoice_id || dn.purchase_invoice_id ? (
                          <Link to={`/invoicing/purchases/${dn.original_invoice_id || dn.purchase_invoice_id}`} className="text-primary fs-12 fw-medium bg-soft-primary px-2 py-1 rounded">
                            {dn.original_invoice_number || `INV-${dn.original_invoice_id || dn.purchase_invoice_id}`}
                          </Link>
                        ) : (
                          <span className="text-muted fs-12">Direct Return</span>
                        )}
                      </td>
                      <td className="fw-bold text-dark">₹{Number(dn.net_total || dn.net_amount || 0).toLocaleString()}</td>
                      <td>
                        <span className={`badge badge-sm rounded-pill ${getStatusBadge(dn.status)}`}>
                          {dn.status}
                        </span>
                      </td>
                      <td className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                        <div className="d-flex justify-content-end align-items-center gap-2">
                          <Link
                            className="btn btn-sm btn-soft-primary border-0"
                            to={`/invoicing/debit-notes/${dn.id}`}
                            title="View Details"
                          >
                            <i className="isax isax-eye fs-16"></i>
                          </Link>
                          {dn.status === 'DRAFT' && (
                            <Link
                              className="btn btn-sm btn-soft-warning border-0"
                              to={`/invoicing/debit-notes/edit/${dn.id}`}
                              title="Edit Draft"
                            >
                              <i className="isax isax-edit-2 fs-16"></i>
                            </Link>
                          )}
                          {(dn.status === 'DRAFT' || dn.status === 'POSTED') && (
                            <button
                              className="btn btn-sm btn-soft-danger border-0"
                              onClick={() => handleCancelClick(dn.id)}
                              title="Cancel Return"
                            >
                              <i className="isax isax-trash fs-16"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="py-4">
                        <i className="isax isax-receipt-item fs-40 text-muted mb-3"></i>
                        <p className="text-muted mb-0">No debit notes found matching your filters.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {totalDN > itemsPerPage && (
          <div className="card-footer bg-white py-3">
            <div className="d-flex align-items-center justify-content-between">
              <span className="text-muted fs-13">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalDN)} of {totalDN} entries
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

export default DebitNotes;
