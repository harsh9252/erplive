import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSalesInvoices, cancelSalesInvoice, collectPayment } from '../services/salesInvoiceService';
import { getCustomers } from '../services/customerService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import CollectPaymentModal from '../components/CollectPaymentModal';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
/* Using global bootstrap from window */

const SalesInvoices = () => {
  const navigate = useNavigate();
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
  const [itemsPerPage] = useState(20);
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
      toast.error('Failed to load customers');
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
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this sales invoice?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
      try {
        await cancelSalesInvoice(id);
        toast.success('Invoice cancelled successfully');
        fetchInvoices();
      } catch (error) {
        console.error('Error cancelling invoice:', error);
        toast.error(error.message || 'Failed to cancel invoice');
      }
    }
  };

  const handleCollectPayment = (invoice) => {
    setSelectedInvoice(invoice);
    const modalEl = document.getElementById('collectPaymentModal');
    if (modalEl) {
      modalRef.current = window.bootstrap.Modal.getOrCreateInstance(modalEl);
      modalRef.current.show();
    }
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
    if (!invoices || invoices.length === 0) {
      toast.warning('No data to export');
      return;
    }

    if (type === 'Excel') {
      const exportData = invoices.map(inv => ({
        'Invoice No': inv.invoice_number || `INV-${inv.id}`,
        'Date': (inv.invoice_date || inv.invoiceDate || '').split('T')[0],
        'Customer': inv.customer_name || inv.customer?.name || 'Unknown',
        'Net Total': inv.net_total || inv.netTotal || 0,
        'Status': inv.status || 'DRAFT',
        'Payment Status': inv.payment_status || inv.paymentStatus || 'UNPAID'
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Invoices");
      XLSX.writeFile(workbook, `sales_invoices_${new Date().toISOString().slice(0,10)}.xlsx`);
      toast.success('Excel file downloaded successfully');
    } else if (type === 'PDF') {
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text('Sales Invoices Report', 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

      const tableColumn = ["Invoice No", "Date", "Customer", "Net Total", "Status", "Payment Status"];
      const tableRows = [];

      invoices.forEach(inv => {
        const invoiceData = [
          inv.invoice_number || `INV-${inv.id}`,
          (inv.invoice_date || inv.invoiceDate || '').split('T')[0],
          inv.customer_name || inv.customer?.name || 'Unknown',
          `Rs. ${Number(inv.net_total || inv.netTotal || 0).toFixed(2)}`,
          inv.status || 'DRAFT',
          inv.payment_status || inv.paymentStatus || 'UNPAID'
        ];
        tableRows.push(invoiceData);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: 'striped',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [65, 84, 241] }
      });

      doc.save(`sales_invoices_${new Date().toISOString().slice(0,10)}.pdf`);
      toast.success('PDF file downloaded successfully');
    }
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
              <li className="breadcrumb-item active" aria-current="page">
                Sales Invoices
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <button
              className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2"
              onClick={() => handleExport('PDF')}
            >
              <i className="isax isax-document-download me-2"></i>PDF
            </button>
            <button
              className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none"
              onClick={() => handleExport('Excel')}
            >
              <i className="isax isax-export-1 me-2"></i>Excel
            </button>
          <Link to="/invoicing/sales/add" className="btn btn-primary d-flex align-items-center rounded-pill px-3">
            <i className="isax isax-add-circle me-1"></i>Create Invoice
          </Link>

        </div>
      </div>

      {/* Advanced Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-2">
            <div className="col">
              <div className="input-group input-group-sm">
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
            <div className="col">
              <select
                name="customer_id"
                className="form-select form-select-sm shadow-none border"
                value={filters.customer_id}
                onChange={handleFilterChange}
              >
                <option value="">All Customers</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <select
                name="status"
                className="form-select form-select-sm shadow-none border"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="All">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="POSTED">Posted</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div className="col">
              <select
                name="payment_status"
                className="form-select form-select-sm shadow-none border"
                value={filters.payment_status}
                onChange={handleFilterChange}
              >
                <option value="All">All Payment Status</option>
                <option value="PAID">Paid</option>
                <option value="PARTIAL">Partial</option>
                <option value="UNPAID">Unpaid</option>
              </select>
            </div>
            <div className="col-auto">
              <div className="d-flex align-items-center gap-1">
                <input
                  type="date"
                  name="from_date"
                  className="form-control form-control-sm"
                  style={{ maxWidth: '120px' }}
                  value={filters.from_date}
                  onChange={handleFilterChange}
                />
                <span className="text-muted fs-13">to</span>
                <input
                  type="date"
                  name="to_date"
                  className="form-control form-control-sm"
                  style={{ maxWidth: '120px' }}
                  value={filters.to_date}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="col-auto text-end d-flex">
              <button className="btn btn-light border shadow-none px-3 d-flex align-items-center justify-content-center" onClick={resetFilters}>
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
                    <tr key={invoice.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/invoicing/sales/${invoice.id}`)}>
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
                        <h6 className="fs-13 fw-semibold mb-0 text-truncate" style={{ maxWidth: '180px' }}>
                          {invoice.customer?.name || 'N/A'}
                        </h6>
                      </td>
                      <td className="fw-bold text-dark text-nowrap">₹{(invoice.net_total || 0).toLocaleString()}</td>
                      <td>
                        <span className={`badge badge-sm rounded-pill ${getStatusBadge(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-sm rounded-pill ${getPaymentStatusBadge(invoice.payment_status)}`}>
                          {invoice.payment_status || 'UNPAID'}
                        </span>
                      </td>                      <td className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                        <div className="d-flex justify-content-end align-items-center gap-2">
                          <Link
                            className="btn btn-sm btn-soft-primary border-0"
                            to={`/invoicing/sales/${invoice.id}`}
                            title="View Details"
                          >
                            <i className="isax isax-eye fs-16"></i>
                          </Link>
                          {invoice.status === 'POSTED' && invoice.payment_status !== 'PAID' && (
                            <button
                              className="btn btn-sm btn-soft-success border-0"
                              onClick={() => handleCollectPayment(invoice)}
                              title="Collect Payment"
                            >
                              <i className="isax isax-card fs-16"></i>
                            </button>
                          )}
                          {invoice.status === 'DRAFT' && (
                            <Link
                              className="btn btn-sm btn-soft-warning border-0"
                              to={`/invoicing/sales/edit/${invoice.id}`}
                              title="Edit Invoice"
                            >
                              <i className="isax isax-edit-2 fs-16"></i>
                            </Link>
                          )}
                          {invoice.status !== 'CANCELLED' && (
                            <button
                              className="btn btn-sm btn-soft-danger border-0"
                              onClick={() => handleCancelClick(invoice.id)}
                              title="Cancel Invoice"
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
                      {/* <img src="/assets/img/no-data.svg" alt="No data" className="mb-3" style={{width: '60px'}} /> */}
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
        onSuccess={onSavePayment}
      />
    </>
  );
};

export default SalesInvoices;
