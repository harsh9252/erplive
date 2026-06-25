import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDialog from '../components/ConfirmDialog';
import { getPurchaseInvoices, cancelPurchaseInvoice } from '../services/purchaseInvoiceService';

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null, message: '' });
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    date: true,
    vendor: true,
    amount: true,
    paymentMode: true,
    status: true,
  });

  const fetchPurchases = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPurchaseInvoices(currentPage, itemsPerPage, searchTerm, statusFilter);
      
      // Resilient handling for different API response structures
      let purchasesData = [];
      if (Array.isArray(data)) {
        purchasesData = data;
        setTotalInvoices(data.length);
      } else if (data && data.data) {
        if (Array.isArray(data.data)) {
          purchasesData = data.data;
          setTotalInvoices(data.total || data.data.length);
        } else if (data.data.rows) {
          purchasesData = data.data.rows;
          setTotalInvoices(data.data.total || data.data.rows.length);
        }
      }

      const mappedPurchases = purchasesData.map(p => ({
        apiId: p.id,
        id: p.purchase_number || p.invoice_number || `PUR-${p.id}`,
        date: p.purchase_date || p.date || p.createdAt,
        vendor: p.vendor?.name || p.vendor_name || 'N/A',
        vendorId: p.vendor?.id || p.vendor_id,
        amount: p.total_amount || p.amount || 0,
        paymentMode: p.payment_method || p.paymentMode || 'N/A',
        status: p.status || 'Pending',
        avatar: p.vendor?.image || '/assets/img/profiles/avatar-01.jpg'
      }));

      setPurchases(mappedPurchases);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      toast.error('Failed to load purchase invoices');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm, statusFilter]);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  const handleDelete = (apiId) => {
    setConfirmDialog({
      isOpen: true,
      message: 'Are you sure you want to cancel this purchase invoice?',
      onConfirm: async () => {
        try {
          await cancelPurchaseInvoice(apiId);
          toast.success('Purchase invoice cancelled successfully!');
          fetchPurchases();
        } catch (error) {
          console.error("Error cancelling purchase:", error);
          toast.error(error.message || 'Failed to cancel purchase invoice');
        } finally {
          setConfirmDialog({ ...confirmDialog, isOpen: false });
        }
      }
    });
  };

  const toggleColumn = (column) => {
    setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid': return 'badge-soft-success';
      case 'Pending': return 'badge-soft-warning';
      case 'Cancelled': return 'badge-soft-danger';
      default: return 'badge-soft-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return 'isax-tick-circle4';
      case 'Pending': return 'isax-timer';
      case 'Cancelled': return 'isax-close-circle';
      default: return '';
    }
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        message={confirmDialog.message}
      />

      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Purchase Invoice</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
          <div>
            <Link to="/add-purchases" className="btn btn-primary d-flex align-items-center">
              <i className="isax isax-add-circle5 me-1"></i>New Purchase
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search ID or Vendor"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Link
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              to="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </Link>
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown">
              <Link to="#" className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                <i className="isax isax-sort me-1"></i>Sort By :{' '}
                <span className="fw-normal ms-1">{sortBy}</span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item" onClick={() => setSortBy('Latest')}>Latest</button></li>
                <li><button className="dropdown-item" onClick={() => setSortBy('Oldest')}>Oldest</button></li>
              </ul>
            </div>
            <div className="dropdown">
              <Link to="#" className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                <i className="isax isax-grid-3 me-1"></i>Column
              </Link>
              <ul className="dropdown-menu">
                {Object.keys(visibleColumns).map(col => (
                  <li key={col}>
                    <label className="dropdown-item d-flex align-items-center form-switch">
                      <input
                        className="form-check-input m-0 me-2"
                        type="checkbox"
                        checked={visibleColumns[col]}
                        onChange={() => toggleColumn(col)}
                      />
                      <span>{col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead>
            <tr>
              <th className="no-sort">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" id="select-all" />
                </div>
              </th>
              {visibleColumns.id && <th className="no-sort">ID</th>}
              {visibleColumns.date && <th>Date</th>}
              {visibleColumns.vendor && <th>Vendor</th>}
              {visibleColumns.amount && <th>Amount</th>}
              {visibleColumns.paymentMode && <th className="no-sort">Payment Mode</th>}
              {visibleColumns.status && <th>Status</th>}
              <th className="no-sort">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : purchases.length > 0 ? (
              purchases.map((p) => (
                <tr key={p.apiId}>
                  <td>
                    <div className="form-check form-check-md">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  {visibleColumns.id && (
                    <td>
                      <Link to={`/purchase-invoice-details/${p.apiId}`} className="link-default">
                        {p.id}
                      </Link>
                    </td>
                  )}
                  {visibleColumns.date && <td>{new Date(p.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>}
                  {visibleColumns.vendor && (
                    <td>
                      <div className="d-flex align-items-center">
                        <Link to={`/vendor-details/${p.vendorId}`} className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                          <img src={p.avatar} className="rounded-circle" alt="img" />
                        </Link>
                        <div>
                          <h6 className="fs-14 fw-medium mb-0">
                            <Link to={`/vendor-details/${p.vendorId}`}>{p.vendor}</Link>
                          </h6>
                        </div>
                      </div>
                    </td>
                  )}
                  {visibleColumns.amount && <td className="text-dark">₹{p.amount}</td>}
                  {visibleColumns.paymentMode && <td className="text-dark">{p.paymentMode}</td>}
                  {visibleColumns.status && (
                    <td>
                      <div className="d-flex align-items-center">
                        <span className={`badge ${getStatusBadge(p.status)} badge-sm d-inline-flex align-items-center`}>
                          {p.status} <i className={`isax ${getStatusIcon(p.status)} ms-1`}></i>
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="action-item">
                    <div className="d-flex align-items-center gap-2">
                      <Link to={`/purchase-invoice-details/${p.apiId}`} className="btn btn-sm btn-outline-primary" title="View">
                        <i className="isax isax-eye"></i>
                      </Link>
                      <Link to={`/edit-purchases/${p.apiId}`} className="btn btn-sm btn-outline-warning" title="Edit">
                        <i className="isax isax-edit"></i>
                      </Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.apiId)} title="Cancel">
                        <i className="isax isax-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No purchase invoices found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalInvoices > 0 && (
        <div className="d-flex align-items-center justify-content-between mt-3">
          <div>
            <p className="mb-0 fs-13">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalInvoices)} of {totalInvoices} entries
            </p>
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: Math.ceil(totalInvoices / itemsPerPage) }, (_, i) => (
                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              )).slice(0, 5)} {/* Limit to 5 pages for brevity */}
              <li className={`page-item ${currentPage === Math.ceil(totalInvoices / itemsPerPage) ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === Math.ceil(totalInvoices / itemsPerPage)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Filter Offcanvas */}
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas">
        <div className="offcanvas-header d-block pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
            <h6 className="offcanvas-title">Filter</h6>
            <button type="button" className="btn-close btn-close-modal custom-btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
        <div className="offcanvas-body pt-3">
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="offcanvas-footer mt-4">
            <div className="row g-2">
              <div className="col-6">
                <button className="btn btn-outline-white w-100" onClick={() => setStatusFilter('All')}>Reset</button>
              </div>
              <div className="col-6">
                <button className="btn btn-primary w-100" data-bs-dismiss="offcanvas">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Purchases;
