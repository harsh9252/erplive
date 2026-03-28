import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getSalesInvoices, cancelSalesInvoice, collectPayment } from '../services/salesInvoiceService';
import { getCustomers } from '../services/customerService';
import { toast } from 'react-toastify';
import CollectPaymentModal from '../components/CollectPaymentModal';
/* Using global bootstrap from window */

const SalesInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    payment_status: 'All',
    from_date: '',
    to_date: '',
    customer_id: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const modalRef = useRef(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getSalesInvoices({
        page: currentPage,
        limit: itemsPerPage,
        ...filters
      });
      const invoicesData = Array.isArray(response.data) ? response.data : (response.data?.rows || []);
      setInvoices(invoicesData);
      setTotalInvoices(response.total || response.data?.total || invoicesData.length || 0);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Failed to fetch sales invoices');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, filters]);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers(1, 1000);
      setCustomers(Array.isArray(res.data) ? res.data : (res.data?.rows || []));
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

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
      payment_status: 'All',
      from_date: '',
      to_date: '',
      customer_id: ''
    });
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      DRAFT: 'badge-soft-secondary',
      POSTED: 'badge-soft-info',
      PAID: 'badge-soft-success',
      PARTIALLY_PAID: 'badge-soft-warning',
      CANCELLED: 'badge-soft-danger',
    };
    return statusClasses[status] || 'badge-soft-secondary';
  };

  const getPaymentStatusBadge = (status) => {
    const statusClasses = {
      PAID: 'badge-soft-success',
      PARTIAL: 'badge-soft-warning',
      UNPAID: 'badge-soft-danger',
    };
    return statusClasses[status] || 'badge-soft-secondary';
  };

  const handleCancelClick = async (id) => {
    if (window.confirm('Are you sure you want to cancel this invoice?')) {
      try {
        await cancelSalesInvoice(id);
        toast.success('Invoice cancelled successfully');
        fetchInvoices();
      } catch (error) {
        console.error('Error cancelling invoice:', error);
        toast.error('Failed to cancel invoice');
      }
    }
  };

  const handleCollectPayment = (invoice) => {
    setSelectedInvoice(invoice);
    if (!modalRef.current) {
      modalRef.current = new window.bootstrap.Modal(document.getElementById('collectPaymentModal'));
    }
    modalRef.current.show();
  };

  const onSavePayment = async (paymentData) => {
    try {
      await collectPayment(selectedInvoice.id, paymentData);
      toast.success('Payment recorded successfully');
      modalRef.current.hide();
      fetchInvoices();
    } catch (error) {
      console.error('Error recording payment:', error);
      toast.error('Failed to record payment');
    }
  };

  const handleExport = (type) => {
    // Basic export logic
    toast.info(`Exporting to ${type}...`);
  };

  const totalPages = Math.ceil(totalInvoices / itemsPerPage);

  return (
    <>
      {/* Breadcrumb */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Sales Invoices</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">Sales</li>
              <li className="breadcrumb-item active" aria-current="page">
                Sales Invoices
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <Link to="/invoicing/sales/add" className="btn btn-primary d-flex align-items-center rounded-pill px-3">
            <i className="isax isax-add-circle me-1"></i>Create Invoice
          </Link>
          <div className="dropdown">
            <button
              className="btn btn-outline-white d-inline-flex align-items-center rounded-pill px-3 shadow-none border"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </button>
            <ul className="dropdown-menu border-0 shadow-sm rounded-12">
              <li>
                <button className="dropdown-item py-2" onClick={() => handleExport('PDF')}>
                  <i className="isax isax-document-text me-2 text-danger"></i>Download as PDF
                </button>
              </li>
              <li>
                <button className="dropdown-item py-2" onClick={() => handleExport('Excel')}>
                  <i className="isax isax-document-code me-2 text-success"></i>Download as Excel
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
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
                  placeholder="Search Invoice No..."
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
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
            <div className="col-md-2">
              <select
                name="status"
                className="form-select shadow-none border"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="All">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="POSTED">Posted</option>
                <option value="PAID">Paid</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div className="col-md-2">
              <select
                name="payment_status"
                className="form-select shadow-none border"
                value={filters.payment_status}
                onChange={handleFilterChange}
              >
                <option value="All">All Payment Status</option>
                <option value="PAID">Paid</option>
                <option value="PARTIAL">Partial</option>
                <option value="UNPAID">Unpaid</option>
              </select>
            </div>
            <div className="col-md-2">
              <div className="d-flex align-items-center gap-2">
                <input 
                  type="date" 
                  name="from_date" 
                  className="form-control form-control-sm" 
                  value={filters.from_date} 
                  onChange={handleFilterChange} 
                />
                <span className="text-muted">to</span>
                <input 
                  type="date" 
                  name="to_date" 
                  className="form-control form-control-sm" 
                  value={filters.to_date} 
                  onChange={handleFilterChange} 
                />
              </div>
            </div>
            <div className="col-md-1">
              <button className="btn btn-outline-danger w-100" onClick={resetFilters}>
                <i className="isax isax-refresh"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light bg-opacity-50">
                <tr>
                  <th className="ps-4">Invoice No.</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Net Total</th>
                  <th>Status</th>
                  <th>Payment Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                      <span className="text-muted">Loading invoices...</span>
                    </td>
                  </tr>
                ) : invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="ps-4">
                        <Link
                          to={`/invoicing/sales/${invoice.id}`}
                          className="fw-bold text-dark text-nowrap"
                        >
                          {invoice.invoice_number}
                        </Link>
                      </td>
                      <td>{invoice.invoice_date || '-'}</td>
                      <td>
                        <h6 className="fs-13 fw-semibold mb-0 text-truncate" style={{maxWidth: '180px'}}>
                          {invoice.customer?.name || 'N/A'}
                        </h6>
                      </td>
                      <td className="fw-bold text-dark text-nowrap">₹{(invoice.net_amount || 0).toLocaleString()}</td>
                      <td>
                        <span className={`badge badge-sm rounded-pill ${getStatusBadge(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-sm rounded-pill ${getPaymentStatusBadge(invoice.payment_status)}`}>
                          {invoice.payment_status || 'UNPAID'}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="dropdown">
                          <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown">
                            <i className="isax isax-more fs-18"></i>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                            <li>
                              <Link className="dropdown-item py-2" to={`/invoicing/sales/${invoice.id}`}>
                                <i className="isax isax-eye me-2 text-primary"></i>View Details
                              </Link>
                            </li>
                            {invoice.status === 'POSTED' && invoice.payment_status !== 'PAID' && (
                              <li>
                                <button className="dropdown-item py-2" onClick={() => handleCollectPayment(invoice)}>
                                  <i className="isax isax-card me-2 text-success"></i>Collect Payment
                                </button>
                              </li>
                            )}
                            {invoice.status === 'DRAFT' && (
                              <li>
                                <Link className="dropdown-item py-2" to={`/invoicing/sales/edit/${invoice.id}`}>
                                  <i className="isax isax-edit-2 me-2 text-warning"></i>Edit Invoice
                                </Link>
                              </li>
                            )}
                            {invoice.status !== 'CANCELLED' && (
                              <li>
                                <button className="dropdown-item py-2" onClick={() => handleCancelClick(invoice.id)}>
                                  <i className="isax isax-trash me-2 text-danger"></i>Cancel Invoice
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
                      <img src="/assets/img/no-data.svg" alt="No data" className="mb-3" style={{width: '60px'}} />
                      <p className="text-muted mb-0">No invoices found matching your criteria.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex align-items-center justify-content-between p-4 border-top">
              <span className="text-muted fs-13">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, totalInvoices)} of {totalInvoices} entries
              </span>
              <nav>
                <ul className="pagination pagination-rounded mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="isax isax-arrow-left-2"></i>
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <i className="isax isax-arrow-right-3"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      <CollectPaymentModal 
        invoice={selectedInvoice} 
        onSave={onSavePayment} 
      />
    </>
  );
};

export default SalesInvoices;
