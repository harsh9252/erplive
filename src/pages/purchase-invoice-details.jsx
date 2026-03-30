import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPurchaseInvoiceById, postPurchaseInvoice, cancelPurchaseInvoice, recordPurchasePayment } from '../services/purchaseInvoiceService';
import { getCompanySettings } from '../services/settingsService';
import approvalService from '../services/approvalService';
import { toast } from 'react-toastify';
import CollectPaymentModal from '../components/CollectPaymentModal';

const PurchaseInvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companySettings, setCompanySettings] = useState(null);
  const [processing, setProcessing] = useState(false);
  
  const paymentModalRef = useRef(null);
  const bootstrapModal = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invoiceRes, settingsRes] = await Promise.all([
          getPurchaseInvoiceById(id),
          getCompanySettings()
        ]);
        setInvoice(invoiceRes.data || invoiceRes);
        setCompanySettings(settingsRes.data || settingsRes);
      } catch (error) {
        console.error('Error fetching details:', error);
        toast.error('Failed to load purchase invoice details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handlePost = async () => {
    if (window.confirm('Are you sure you want to post this invoice? This will receive stock into the warehouses.')) {
      setProcessing(true);
      try {
        await postPurchaseInvoice(id);
        toast.success('Invoice posted successfully! Stock updated.');
        const updated = await getPurchaseInvoiceById(id);
        setInvoice(updated.data || updated);
      } catch (error) {
        toast.error(error.message || 'Failed to post invoice');
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleCancel = async () => {
    const reason = window.prompt('Reason for cancellation:');
    if (reason === null) return;

    setProcessing(true);
    try {
      await cancelPurchaseInvoice(id);
      toast.success('Invoice cancelled.');
      const updated = await getPurchaseInvoiceById(id);
      setInvoice(updated.data || updated);
    } catch (error) {
      toast.error(error.message || 'Failed to cancel invoice');
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmitForApproval = async () => {
    const remarks = window.prompt('Enter any remarks for approval (optional):');
    if (remarks === null) return;

    setProcessing(true);
    try {
      await approvalService.submitForApproval({
        entity_type: 'PURCHASE_INVOICE',
        entity_id: id,
        remarks: remarks,
      });
      toast.success('Submitted for approval successfully!');
      const updated = await getPurchaseInvoiceById(id);
      setInvoice(updated.data || updated);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit for approval');
    } finally {
      setProcessing(false);
    }
  };

  const openPaymentModal = () => {
    if (!bootstrapModal.current) {
      bootstrapModal.current = new window.bootstrap.Modal(document.getElementById('collectPaymentModal'));
    }
    bootstrapModal.current.show();
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      await recordPurchasePayment(id, paymentData);
      toast.success('Payment recorded.');
      bootstrapModal.current?.hide();
      const updated = await getPurchaseInvoiceById(id);
      setInvoice(updated.data || updated);
    } catch (error) {
      toast.error('Failed to record payment');
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-50">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!invoice) return <div className="p-4 text-center">Invoice not found</div>;

  const isInterState = invoice.place_of_supply !== companySettings?.state_code;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Invoice: {invoice.invoice_number}</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/invoicing/purchases">Purchases</Link></li>
              <li className="breadcrumb-item active">{invoice.invoice_number}</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          {invoice.status === 'DRAFT' && (
            <>
              <Link to={`/invoicing/purchases/edit/${id}`} className="btn btn-outline-warning rounded-pill px-3">
                <i className="isax isax-edit me-1"></i>Edit
              </Link>
              <button className="btn btn-outline-primary rounded-pill px-4" onClick={handleSubmitForApproval} disabled={processing}>
                {processing ? 'Submitting...' : 'Submit for Approval'}
              </button>
              <button className="btn btn-primary rounded-pill px-4" onClick={handlePost} disabled={processing}>
                {processing ? 'Posting...' : 'Post Invoice'}
              </button>
            </>
          )}

          {invoice.status === 'POSTED' && invoice.payment_status !== 'PAID' && (
            <button className="btn btn-success rounded-pill px-4" onClick={openPaymentModal}>
              <i className="isax isax-wallet me-1"></i>Record Payment
            </button>
          )}
          
          {(invoice.status === 'DRAFT' || invoice.status === 'POSTED') && (
            <button className="btn btn-outline-danger rounded-pill px-3" onClick={handleCancel} disabled={processing}>
              <i className="isax isax-trash me-1"></i>Cancel
            </button>
          )}
          
          <button className="btn btn-outline-dark rounded-pill px-3" onClick={() => window.print()}>
            <i className="isax isax-printer me-1"></i>Print
          </button>
        </div>
      </div>

      <div className="row g-4 print-content">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between flex-wrap gap-4 mb-5">
                <div>
                  <h6 className="text-uppercase text-muted fs-12 fw-bold mb-3">Bill To (Company)</h6>
                  <h5 className="fw-bold mb-1">{companySettings?.company_name || 'Your Company'}</h5>
                  <p className="text-muted mb-0 fs-13" style={{ maxWidth: '250px' }}>
                    {companySettings?.address}<br />
                    GSTIN: {companySettings?.gstin}
                  </p>
                </div>
                <div className="text-end">
                  <h6 className="text-uppercase text-muted fs-12 fw-bold mb-3">Bill From (Vendor)</h6>
                  <h5 className="fw-bold mb-1">{invoice.vendor?.name}</h5>
                  <p className="text-muted mb-0 fs-13" style={{ maxWidth: '250px' }}>
                    {invoice.vendor?.address}<br />
                    GSTIN: {invoice.vendor?.gstin}
                  </p>
                </div>
              </div>

              <div className="row g-3 mb-5">
                <div className="col-sm-3 col-6">
                  <span className="text-muted fs-12 d-block mb-1">Invoice Date</span>
                  <span className="fw-bold text-dark">{invoice.invoice_date}</span>
                </div>
                <div className="col-sm-3 col-6">
                  <span className="text-muted fs-12 d-block mb-1">Due Date</span>
                  <span className="fw-bold text-dark">{invoice.due_date || '-'}</span>
                </div>
                <div className="col-sm-3 col-6">
                  <span className="text-muted fs-12 d-block mb-1">Status</span>
                  <span className={`badge badge-sm rounded-pill ${invoice.status === 'PAID' ? 'bg-success' : 'bg-primary'}`}>
                    {invoice.status}
                  </span>
                </div>
                <div className="col-sm-3 col-6">
                  <span className="text-muted fs-12 d-block mb-1">Total Amount</span>
                  <span className="fw-bold text-primary h5 mb-0">₹{invoice.net_amount?.toLocaleString()}</span>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table border-top">
                  <thead>
                    <tr className="bg-light bg-opacity-50">
                      <th className="ps-0" style={{ width: '40%' }}>Item Description</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Tax %</th>
                      <th>ITC</th>
                      <th className="text-end pe-0">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(invoice.items || []).map((item, idx) => (
                      <tr key={idx}>
                        <td className="ps-0">
                          <span className="fw-bold text-dark">{item.item?.name || item.description}</span>
                          <span className="d-block fs-12 text-muted mt-1">HSN: {item.item?.hsn_code || '-'}</span>
                        </td>
                        <td>{item.qty}</td>
                        <td>₹{item.rate?.toLocaleString()}</td>
                        <td>{item.gst_rate}%</td>
                        <td><span className="badge badge-soft-primary fs-10">{item.itc_eligibility}</span></td>
                        <td className="text-end pe-0 fw-bold text-dark">₹{item.net_amount?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="row justify-content-end mt-4">
                <div className="col-md-5">
                  <div className="p-3 bg-light rounded-12">
                    <div className="d-flex justify-content-between mb-2 fs-13">
                      <span className="text-muted">Subtotal</span>
                      <span className="fw-bold">₹{invoice.taxable_amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                    {isInterState ? (
                      <div className="d-flex justify-content-between mb-2 fs-13">
                        <span className="text-muted">IGST Total</span>
                        <span className="fw-bold">₹{invoice.tax_amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                    ) : (
                      <>
                        <div className="d-flex justify-content-between mb-2 fs-13">
                          <span className="text-muted">CGST Total</span>
                          <span className="fw-bold">₹{(invoice.tax_amount / 2)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 fs-13">
                          <span className="text-muted">SGST Total</span>
                          <span className="fw-bold">₹{(invoice.tax_amount / 2)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                      </>
                    )}
                    <hr className="my-2 opacity-10" />
                    <div className="d-flex justify-content-between align-items-center h6 mb-0">
                      <span className="fw-bold">Net Total</span>
                      <span className="fw-bold text-primary">₹{invoice.net_amount?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white py-3">
              <h6 className="mb-0 fw-bold">Payment Status</h6>
            </div>
            <div className="card-body">
              <div className="text-center py-3">
                <h3 className="fw-bold text-primary mb-1">₹{invoice.balance_amount?.toLocaleString() || invoice.net_amount?.toLocaleString()}</h3>
                <p className="text-muted fs-13 mb-0">Balance Due</p>
                <div className="mt-3">
                  <span className={`badge rounded-pill px-3 py-2 ${invoice.payment_status === 'PAID' ? 'bg-success' : 'bg-warning'}`}>
                    {invoice.payment_status || 'UNPAID'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-white py-3">
              <h6 className="mb-0 fw-bold">Payment History</h6>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0 fs-13">
                  <thead className="bg-light">
                    <tr>
                      <th className="ps-3">Date</th>
                      <th>Mode</th>
                      <th className="text-end pe-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(invoice.payments || []).length > 0 ? (
                      invoice.payments.map((p, i) => (
                        <tr key={i}>
                          <td className="ps-3">{p.payment_date}</td>
                          <td>{p.payment_mode}</td>
                          <td className="text-end pe-3 fw-bold text-dark">₹{p.amount?.toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-4 text-muted">No payments recorded yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CollectPaymentModal 
        invoice={invoice} 
        onSave={handlePaymentSuccess} 
      />
    </div>
  );
};

export default PurchaseInvoiceDetails;
