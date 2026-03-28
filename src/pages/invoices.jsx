import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { getSalesInvoices, cancelSalesInvoice } from '../services/salesInvoiceService';
import { toast } from 'react-toastify';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });
  const [selectedViewInvoice, setSelectedViewInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalInvoices, setTotalInvoices] = useState(0);

  // Load invoice data
  useEffect(() => {
    fetchInvoices();
  }, [currentPage, statusFilter, searchTerm]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await getSalesInvoices(currentPage, itemsPerPage, searchTerm, statusFilter);
      // Resilience handling: handle direct array or { rows: [], total: 0 }
      const invoicesData = Array.isArray(response.data) ? response.data : (response.data?.rows || []);
      
      const mappedInvoices = invoicesData.map(inv => ({
        id: inv.invoice_number || `INV-${inv.id}`,
        apiId: inv.id, // For delete/view actions
        customer: inv.customer?.name || 'N/A',
        customerAvatar: inv.customer?.avatar || '/assets/img/users/user-25.jpg',
        amount: inv.total_amount_formatted || `$${(inv.total_amount || 0).toLocaleString()}`,
        dueDate: inv.due_date || 'N/A',
        status: inv.status || 'Draft',
        createdDate: inv.invoice_date || 'N/A',
        raw: inv // Keep raw for details view
      }));

      setInvoices(mappedInvoices);
      setTotalInvoices(response.total || response.data?.total || invoicesData.length || 0);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Failed to load invoices from server');
    } finally {
      setLoading(false);
    }
  };


  const filteredInvoices = invoices; // Backend handles filtering eventually, but UI filter is fine on loaded data for now

  const totalPages = Math.ceil((totalInvoices || invoices.length) / itemsPerPage);

  const getStatusBadge = (status) => {
    const statusClasses = {
      Paid: 'badge-soft-success',
      'Partially Paid': 'badge-soft-warning',
      Overdue: 'badge-soft-danger',
      Sent: 'badge-soft-info',
      Draft: 'badge-soft-secondary',
    };
    return statusClasses[status] || 'badge-soft-secondary';
  };

  const getStatusIcon = (status) => {
    const statusIcons = {
      Paid: 'isax-tick-circle',
      'Partially Paid': 'isax-slash',
      Overdue: 'isax-close-circle',
      Sent: 'isax-timer',
      Draft: 'isax-document',
    };
    return statusIcons[status] || 'isax-document';
  };

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await cancelSalesInvoice(confirmDialog.id);
      toast.success('Invoice cancelled successfully!');
      fetchInvoices();
    } catch (error) {
      console.error('Error cancelling invoice:', error);
      toast.error('Failed to cancel invoice');
    } finally {
      setConfirmDialog({ isOpen: false, id: null });
    }
  };

  const handleExport = (type) => {
    console.log(`Exporting invoices as ${type}`);
    // Handle export functionality
  };

  const handleSend = (id) => {
    toast.success(`Invoice ${id} sent via Email!`, { position: 'top-right', autoClose: 3000 });
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Invoice"
        message="Are you sure you want to delete this invoice? This action cannot be undone."
      />

      {/* Breadcrumb */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Invoices</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Invoices
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <Link to="/add-invoice" className="btn btn-primary d-flex align-items-center">
            <i className="isax isax-add me-1"></i>Create Invoice
          </Link>
          <div className="dropdown">
            <Link href="#"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="#" onClick={() => handleExport('PDF')}>
                  Download as PDF
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#" onClick={() => handleExport('Excel')}>
                  Download as Excel
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Invoice Stats */}
      <div className="row mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Total Invoices</p>
                  <h6 className="fs-16 fw-semibold">{totalInvoices}</h6>
                </div>
                <span className="avatar avatar-lg bg-primary text-white">
                  <i className="isax isax-receipt-item fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Paid</p>
                  <h6 className="fs-16 fw-semibold">
                    {invoices.filter((inv) => inv.status === 'Paid').length}
                  </h6>
                </div>
                <span className="avatar avatar-lg bg-success text-white">
                  <i className="isax isax-tick-circle fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Pending</p>
                  <h6 className="fs-16 fw-semibold">
                    {invoices.filter((inv) => inv.status === 'Sent').length}
                  </h6>
                </div>
                <span className="avatar avatar-lg bg-warning text-white">
                  <i className="isax isax-timer fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Overdue</p>
                  <h6 className="fs-16 fw-semibold">
                    {invoices.filter((inv) => inv.status === 'Overdue').length}
                  </h6>
                </div>
                <span className="avatar avatar-lg bg-danger text-white">
                  <i className="isax isax-close-circle fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
            <h6 className="mb-1">All Invoices</h6>
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Sent">Sent</option>
                <option value="Overdue">Overdue</option>
                <option value="Draft">Draft</option>
              </select>
              <div className="input-icon-end position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="input-icon-addon">
                  <i className="isax isax-search-normal"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Created Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : invoices.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">No invoices found</td>
                  </tr>
                ) : (
                  invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td>
                        <span
                          className="fw-medium text-primary"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedViewInvoice(invoice)}
                          data-bs-toggle="modal"
                          data-bs-target="#view_invoice_modal"
                        >
                          {invoice.id}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                            <img
                              src={invoice.customerAvatar}
                              className="rounded-circle"
                              alt="Customer"
                            />
                          </div>
                          <div>
                            <h6 className="fs-14 fw-medium mb-0">{invoice.customer}</h6>
                          </div>
                        </div>
                      </td>
                      <td className="text-dark fw-medium">{invoice.amount}</td>
                      <td>{invoice.createdDate}</td>
                      <td>{invoice.dueDate}</td>
                      <td>
                        <span
                          className={`badge badge-sm d-inline-flex align-items-center ${getStatusBadge(invoice.status)}`}
                        >
                          {invoice.status}
                          <i className={`${getStatusIcon(invoice.status)} ms-1`}></i>
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            title="View Invoice"
                            onClick={() => setSelectedViewInvoice(invoice)}
                            data-bs-toggle="modal"
                            data-bs-target="#view_invoice_modal"
                          >
                            <i className="isax isax-eye"></i>
                          </button>
                          <Link
                            to={`/edit-invoice/${invoice.apiId}`}
                            className="btn btn-sm btn-outline-warning"
                            title="Edit Invoice"
                          >
                            <i className="isax isax-edit"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-info"
                            title="Send Invoice"
                            onClick={() => handleSend(invoice.apiId)}
                          >
                            <i className="isax isax-send-1"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(invoice.apiId)}
                            title="Delete Invoice"
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div>
                <p className="mb-0 fs-13">
                  Showing {totalInvoices === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, totalInvoices)} of {totalInvoices}{' '}
                  entries
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
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* View Invoice Modal */}
      <div className="modal fade" id="view_invoice_modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Invoice Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4">
              {selectedViewInvoice ? (
                <div>
                  <div className="row mb-3 bg-light p-3 rounded d-flex align-items-center">
                    <div className="col-md-2 text-center mb-3 mb-md-0">
                      <img
                        src={selectedViewInvoice.customerAvatar || "/assets/img/users/user-01.jpg"}
                        alt="Customer"
                        className="rounded-circle border"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-5 mb-2">
                      <span className="text-gray-9 fw-bold d-block mb-1">Customer: </span>
                      <span className="fs-16">{selectedViewInvoice.customer}</span>
                    </div>
                    <div className="col-md-5 mb-2">
                      <span className="text-gray-9 fw-bold d-block mb-1">Invoice ID: </span>
                      <span className="badge bg-soft-primary text-primary fs-14">{selectedViewInvoice.id}</span>
                    </div>

                    <div className="col-md-4 mt-3">
                      <span className="text-gray-9 fw-bold d-block mb-1">Created Date: </span>
                      <span>{selectedViewInvoice.createdDate}</span>
                    </div>
                    <div className="col-md-4 mt-3">
                      <span className="text-gray-9 fw-bold d-block mb-1">Due Date: </span>
                      <span>{selectedViewInvoice.dueDate}</span>
                    </div>
                    <div className="col-md-4 mt-3">
                      <span className="text-gray-9 fw-bold d-block mb-1">Status: </span>
                      <span className={`badge badge-sm ${getStatusBadge(selectedViewInvoice.status)}`}>
                        {selectedViewInvoice.status}
                      </span>
                    </div>
                  </div>

                  <hr />
                  <h6 className="fw-semibold mb-3">Invoice Summary</h6>

                  <div className="row mt-4">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                      <div className="card shadow-none border">
                        <div className="card-body p-3">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-gray-9">Total Amount:</span>
                            <span className="fw-bold text-primary" style={{ fontSize: '1.2rem' }}>
                              {selectedViewInvoice.amount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">No invoice details available</div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoices;
