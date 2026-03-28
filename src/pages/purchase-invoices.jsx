import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getPurchaseInvoices, cancelPurchaseInvoice, recordPurchasePayment } from '../services/purchaseInvoiceService';
import vendorService from '../services/vendorService';
import { toast } from 'react-toastify';
import CollectPaymentModal from '../components/CollectPaymentModal';

const PurchaseInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    vendor_id: '',
    from_date: '',
    to_date: ''
  });
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  
  const modalRef = useRef(null);

  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPurchaseInvoices(
        currentPage, 
        itemsPerPage, 
        filters.search, 
        filters.status
      );
      
      const invoicesData = Array.isArray(response.data) ? response.data : (response.data?.rows || []);
      setInvoices(invoicesData);
      setTotalInvoices(response.total || response.data?.total || invoicesData.length || 0);
    } catch (error) {
      console.error('Error fetching purchase invoices:', error);
      toast.error('Failed to fetch purchase invoices');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, filters.search, filters.status]);

  const fetchVendors = async () => {
    try {
      const res = await vendorService.getVendors(1, 1000);
      setVendors(Array.isArray(res.data) ? res.data : (res.data?.rows || []));
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

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
      POSTED: 'badge-soft-info',
      PAID: 'badge-soft-success',
      PARTIALLY_PAID: 'badge-soft-warning',
      CANCELLED: 'badge-soft-danger',
    };
    return statusClasses[status] || 'badge-soft-secondary';
  };

  const handleCancelClick = async (id) => {
    if (window.confirm('Are you sure you want to cancel this purchase invoice?')) {
      try {
        await cancelPurchaseInvoice(id);
        toast.success('Invoice cancelled successfully');
        fetchInvoices();
      } catch (error) {
        toast.error(error.message || 'Failed to cancel invoice');
      }
    }
  };

  const handleRecordPayment = (invoice) => {
    setSelectedInvoice(invoice);
    if (!modalRef.current) {
      modalRef.current = new window.bootstrap.Modal(document.getElementById('collectPaymentModal'));
    }
    modalRef.current.show();
  };

  const onSavePayment = async (paymentData) => {
    try {
      await recordPurchasePayment(selectedInvoice.id, paymentData);
      toast.success('Payment recorded successfully');
      modalRef.current.hide();
      fetchInvoices();
    } catch (error) {
      console.error('Error recording payment:', error);
      toast.error('Failed to record payment');
    }
  };

  const totalPages = Math.ceil(totalInvoices / itemsPerPage);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Purchase Invoices</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item">Purchases</li>
              <li className="breadcrumb-item active">Purchase Invoices</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          <Link to="/invoicing/purchases/add" className="btn btn-primary rounded-pill px-4 shadow-none">
            <i className="isax isax-add me-2"></i>New Purchase
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
                  placeholder="Search Invoice No..."
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
                <option value="PAID">PAID</option>
                <option value="PARTIALLY_PAID">PARTIALLY PAID</option>
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
                  <th>Net Amount</th>
                  <th>Status</th>
                  <th>Payment Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                      <span className="text-muted">Loading purchase invoices...</span>
                    </td>
                  </tr>
                ) : invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="ps-4">
                        <Link to={`/invoicing/purchases/${invoice.id}`} className="fw-bold text-dark text-nowrap">
                          {invoice.invoice_number}
                        </Link>
                      </td>
                      <td>{invoice.invoice_date}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="fw-semibold text-dark">{invoice.vendor?.name}</span>
                        </div>
                      </td>
                      <td className="fw-bold text-dark">₹{Number(invoice.net_amount || 0).toLocaleString()}</td>
                      <td>
                        <span className={`badge badge-sm rounded-pill ${getStatusBadge(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-sm rounded-pill ${invoice.payment_status === 'PAID' ? 'badge-soft-success' : 'badge-soft-warning'}`}>
                          {invoice.payment_status || 'UNPAID'}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="dropdown">
                          <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown">
                            <i className="isax isax-more fs-18"></i>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm rounded-12">
                            <li>
                              <Link className="dropdown-item py-2" to={`/invoicing/purchases/${invoice.id}`}>
                                <i className="isax isax-eye me-2 text-primary"></i>View Details
                              </Link>
                            </li>
                            {invoice.status === 'DRAFT' && (
                              <li>
                                <Link className="dropdown-item py-2" to={`/invoicing/purchases/edit/${invoice.id}`}>
                                  <i className="isax isax-edit-2 me-2 text-warning"></i>Edit Invoice
                                </Link>
                              </li>
                            )}
                            {invoice.status === 'POSTED' && invoice.payment_status !== 'PAID' && (
                              <li>
                                <button className="dropdown-item py-2" onClick={() => handleRecordPayment(invoice)}>
                                  <i className="isax isax-wallet me-2 text-success"></i>Record Payment
                                </button>
                              </li>
                            )}
                            {(invoice.status === 'DRAFT' || invoice.status === 'POSTED') && (
                              <li>
                                <button className="dropdown-item py-2 text-danger" onClick={() => handleCancelClick(invoice.id)}>
                                  <i className="isax isax-trash me-2"></i>Cancel Invoice
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
                        <i className="isax isax-document-text fs-40 text-muted mb-3"></i>
                        <p className="text-muted mb-0">No purchase invoices found matching your filters.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {totalInvoices > itemsPerPage && (
          <div className="card-footer bg-white py-3">
            <div className="d-flex align-items-center justify-content-between">
              <span className="text-muted fs-13">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalInvoices)} of {totalInvoices} entries
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

      <CollectPaymentModal 
        invoice={selectedInvoice} 
        onSave={onSavePayment} 
      />
    </div>
  );
};

export default PurchaseInvoices;
