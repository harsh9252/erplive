import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { voucherService } from '../services/voucherService';

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [fromDate, setFromDate] = useState('2025-04-01');
  const [toDate, setToDate] = useState('2026-03-31');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [pagination, setPagination] = useState({ total_count: 0, total_pages: 0 });

  // Fetch Voucher Types
  useEffect(() => {
    const fetchVoucherTypes = async () => {
      try {
        const response = await voucherService.getVoucherTypes();
        if (response && response.data) {
          setVoucherTypes(response.data);
        }
      } catch (error) {
        console.error('Error fetching voucher types:', error);
      }
    };
    fetchVoucherTypes();
  }, []);

  // Fetch Vouchers
  const fetchVouchers = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm,
        voucher_type_id: typeFilter === 'All' ? undefined : typeFilter,
        status: statusFilter === 'All' ? undefined : statusFilter,
        from_date: fromDate,
        to_date: toDate,
        page: currentPage,
        limit: itemsPerPage,
      };
      
      const response = await voucherService.getVouchers(params);
      console.log('Fetched vouchers:', response);
      if (response && response.data) {
        setVouchers(response.data);
        setPagination(response.pagination || { 
          total_count: response.data.length, 
          total_pages: Math.ceil(response.data.length / itemsPerPage) 
        });
      }
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      Swal.fire('Error', 'Failed to load vouchers', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, typeFilter, statusFilter, fromDate, toDate, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchVouchers();
  }, [fetchVouchers]);

  const handleCancel = async (id) => {
    const { value: reason } = await Swal.fire({
      title: 'Cancel Voucher',
      text: 'Are you sure you want to cancel this voucher? This action cannot be undone.',
      input: 'textarea',
      inputPlaceholder: 'Enter reason for cancellation...',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to provide a reason!';
        }
      }
    });

    if (reason) {
      try {
        await voucherService.cancelVoucher(id, reason);
        Swal.fire('Cancelled', 'Voucher has been cancelled.', 'success');
        fetchVouchers();
      } catch (error) {
        Swal.fire('Error', error.message || 'Failed to cancel voucher', 'error');
      }
    }
  };

  const handlePost = async (id) => {
    const result = await Swal.fire({
      title: 'Post Voucher',
      text: 'Are you sure you want to post this voucher into the general ledger?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, post it!'
    });

    if (result.isConfirmed) {
      try {
        await voucherService.postVoucher(id);
        Swal.fire('Posted', 'Voucher has been successfully posted.', 'success');
        fetchVouchers();
      } catch (error) {
        Swal.fire('Error', error.message || 'Failed to post voucher', 'error');
      }
    }
  };

  const getStatusBadge = (status) => {
    let color = 'warning';
    if (status === 'Posted') color = 'success';
    if (status === 'Cancelled') color = 'danger';
    return <span className={`badge badge-soft-${color} text-${color}`}>{status}</span>;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination.total_pages || 1)) {
      setCurrentPage(newPage);
    }
  };

  const hasFilters = Boolean(
    searchTerm ||
    typeFilter !== 'All' ||
    statusFilter !== 'All' ||
    fromDate !== '2025-04-01' ||
    toDate !== '2026-03-31'
  );

  const emptyVoucherMessage = hasFilters
    ? 'No vouchers match your current filter criteria. Try clearing the filters or changing the date range.'
    : 'No vouchers have been created yet. Click Add New Voucher to create your first voucher.';

  const getTypeLabel = (code) => {
    return voucherTypes.find((t) => t.id.toString() === code?.toString())?.name || code;
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header d-flex align-items-center justify-content-between mb-4">
        <div className="page-title">
          <h4>Voucher Entry</h4>
          <p className="text-muted mb-0">Manage and track your account vouchers</p>
        </div>
        <div className="page-header-right">
          <Link to="/add-voucher" className="btn btn-primary d-flex align-items-center">
            <i className="isax isax-plus me-2"></i>Add New Voucher
          </Link>
        </div>
      </div>

      {/* Filters Card */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-600">Search</label>
              <div className="input-icon-end position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search No, Ref, Narration..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <span className="input-icon-addon">
                  <i className="isax isax-search-normal"></i>
                </span>
              </div>
            </div>

            <div className="col-lg-2 col-md-3">
              <label className="form-label fw-600">Type</label>
              <select
                className="form-select"
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Types</option>
                {voucherTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-lg-2 col-md-3">
              <label className="form-label fw-600">Status</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Status</option>
                <option value="Draft">Draft</option>
                <option value="Posted">Posted</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="col-lg-2 col-md-6">
              <label className="form-label fw-600">From Date</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="col-lg-2 col-md-6">
              <label className="form-label fw-600">To Date</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="col-lg-1 col-md-12 d-flex align-items-end">
              <button
                className="btn btn-light w-100"
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('All');
                  setStatusFilter('All');
                  setFromDate('2025-04-01');
                  setToDate('2026-03-31');
                  setCurrentPage(1);
                }}
                title="Reset Filters"
              >
                <i className="isax isax-refresh"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card table-list-card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light text-nowrap">
                <tr>
                  <th>Voucher No.</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th className="d-none d-md-table-cell">Reference</th>
                  <th className="d-none d-lg-table-cell" style={{ minWidth: '200px' }}>Narration</th>
                  <th className="text-end">Dr Amount</th>
                  <th className="text-end">Cr Amount</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : vouchers.length > 0 ? (
                  vouchers.map((voucher) => (
                    <tr key={voucher.id}>
                      <td>
                        <Link to={`/edit-voucher/${voucher.id}`} className="fw-600 text-primary">
                          {voucher.voucher_number || voucher.voucherNumber}
                        </Link>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark">
                          {getTypeLabel(voucher.voucher_type_id || voucher.voucherType)}
                        </span>
                      </td>
                      <td className="text-nowrap">{voucher.voucher_date || voucher.voucherDate}</td>
                      <td className="d-none d-md-table-cell text-muted">
                        {voucher.reference_number || voucher.referenceNumber || '-'}
                      </td>
                      <td className="d-none d-lg-table-cell text-truncate" style={{ maxWidth: '250px' }}>
                        <span title={voucher.narration}>{voucher.narration || '-'}</span>
                      </td>
                      <td className="text-end fw-500">
                        {parseFloat(voucher.total_dr || voucher.totalAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="text-end fw-500 text-secondary">
                        {parseFloat(voucher.total_cr || voucher.totalAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="text-center">
                        {getStatusBadge(voucher.status)}
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          {voucher.status === 'Draft' && (
                            <>
                              <Link
                                to={`/edit-voucher/${voucher.id}`}
                                className="btn btn-sm btn-icon btn-soft-primary"
                                title="Edit"
                              >
                                <i className="isax isax-edit-2"></i>
                              </Link>
                              <button
                                type="button"
                                className="btn btn-sm btn-icon btn-soft-success"
                                title="Post Voucher"
                                onClick={() => handlePost(voucher.id)}
                              >
                                <i className="isax isax-tick-circle"></i>
                              </button>
                            </>
                          )}
                          {voucher.status !== 'Cancelled' && (
                            <button
                              type="button"
                              className="btn btn-sm btn-icon btn-soft-danger"
                              title="Cancel Voucher"
                              onClick={() => handleCancel(voucher.id)}
                            >
                              <i className="isax isax-close-circle"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-5">
                      <div className="empty-state">
                        <i className="isax isax-document-text text-muted" style={{ fontSize: '3rem' }}></i>
                        <p className="mt-3 fs-16 text-muted">{emptyVoucherMessage}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Standard Footer */}
          <div className="pagination-wrapper mt-4 px-2">
            <div className="row align-items-center">
              <div className="col-md-6 col-sm-12 text-center text-md-start mb-3 mb-md-0">
                <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                  <span className="me-2 text-muted">Show</span>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="ms-2 text-muted">
                    Showing {pagination.total_count > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                    {Math.min(currentPage * itemsPerPage, pagination.total_count || 0)} of{' '}
                    {pagination.total_count || 0} entries
                  </span>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <nav aria-label="Page navigation">
                  <ul className="pagination pagination-sm justify-content-center justify-content-md-end mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        type="button"
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <i className="isax isax-arrow-left-2"></i>
                      </button>
                    </li>
                    {[...Array(pagination.total_pages || 1)].map((_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button
                          type="button"
                          className="page-link"
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === (pagination.total_pages || 1) ? 'disabled' : ''}`}>
                      <button
                        type="button"
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <i className="isax isax-arrow-right-2"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vouchers;
