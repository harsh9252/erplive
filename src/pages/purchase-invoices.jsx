import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPurchaseInvoices, cancelPurchaseInvoice, recordPurchasePayment } from '../services/purchaseInvoiceService';
import vendorService from '../services/vendorService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import CollectPaymentModal from '../components/CollectPaymentModal';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const PurchaseInvoices = () => {
  const navigate = useNavigate();
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
  const [itemsPerPage] = useState(20);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  
  const modalRef = useRef(null);

  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPurchaseInvoices(
        currentPage, 
        itemsPerPage, 
        filters.search, 
        filters.status,
        filters.vendor_id,
        filters.from_date,
        filters.to_date
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
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this purchase invoice?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
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
    const modalEl = document.getElementById('collectPaymentModal');
    if (modalEl) {
      modalRef.current = window.bootstrap.Modal.getOrCreateInstance(modalEl);
      modalRef.current.show();
    }
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

  const handleExport = (type) => {
    if (!invoices || invoices.length === 0) {
      toast.warning('No data to export');
      return;
    }

    if (type === 'Excel') {
      const exportData = invoices.map(inv => ({
        'Invoice No': inv.invoice_number || `PINV-${inv.id}`,
        'Date': (inv.invoice_date || inv.invoiceDate || '').split('T')[0],
        'Vendor': inv.vendor_name || inv.vendor?.name || 'Unknown',
        'Net Total': inv.net_total || inv.net_amount || 0,
        'Status': inv.status || 'DRAFT',
        'Payment Status': inv.payment_status || inv.paymentStatus || 'UNPAID'
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Invoices");
      XLSX.writeFile(workbook, `purchase_invoices_${new Date().toISOString().slice(0,10)}.xlsx`);
      toast.success('Excel file downloaded successfully');
    } else if (type === 'PDF') {
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text('Purchase Invoices Report', 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

      const tableColumn = ["Invoice No", "Date", "Vendor", "Net Total", "Status", "Payment Status"];
      const tableRows = [];

      invoices.forEach(inv => {
        const invoiceData = [
          inv.invoice_number || `PINV-${inv.id}`,
          (inv.invoice_date || inv.invoiceDate || '').split('T')[0],
          inv.vendor_name || inv.vendor?.name || 'Unknown',
          `Rs. ${Number(inv.net_total || inv.net_amount || 0).toFixed(2)}`,
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

      doc.save(`purchase_invoices_${new Date().toISOString().slice(0,10)}.pdf`);
      toast.success('PDF file downloaded successfully');
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
          <Link to="/invoicing/purchases/add" className="btn btn-primary d-flex align-items-center rounded-pill px-3 shadow-none">
            <i className="isax isax-add-circle me-1"></i>New Purchase
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
                    <tr key={invoice.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/invoicing/purchases/${invoice.id}`)}>
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
                      <td className="fw-bold text-dark">₹{Number(invoice.net_total || invoice.net_amount || 0).toLocaleString()}</td>
                      <td>
                        <span className={`badge badge-sm rounded-pill ${getStatusBadge(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-sm rounded-pill ${invoice.payment_status === 'PAID' ? 'badge-soft-success' : 'badge-soft-warning'}`}>
                          {invoice.payment_status || 'UNPAID'}
                        </span>
                      </td>                      <td className="text-end pe-4" onClick={(e) => e.stopPropagation()}>
                        <div className="d-flex justify-content-end align-items-center gap-2">
                          <Link 
                            className="btn btn-sm btn-soft-primary border-0" 
                            to={`/invoicing/purchases/${invoice.id}`}
                            title="View Details"
                          >
                            <i className="isax isax-eye fs-16"></i>
                          </Link>
                          {invoice.status === 'POSTED' && invoice.payment_status !== 'PAID' && (
                            <button 
                              className="btn btn-sm btn-soft-success border-0" 
                              onClick={() => handleRecordPayment(invoice)}
                              title="Record Payment"
                            >
                              <i className="isax isax-wallet fs-16"></i>
                            </button>
                          )}
                          {invoice.status === 'DRAFT' && (
                            <Link 
                              className="btn btn-sm btn-soft-warning border-0" 
                              to={`/invoicing/purchases/edit/${invoice.id}`}
                              title="Edit Invoice"
                            >
                              <i className="isax isax-edit-2 fs-16"></i>
                            </Link>
                          )}
                          {(invoice.status === 'DRAFT' || invoice.status === 'POSTED') && (
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
        onSuccess={onSavePayment} 
      />
    </div>
  );
};

export default PurchaseInvoices;
