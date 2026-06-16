import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPurchaseInvoiceById, postPurchaseInvoice, cancelPurchaseInvoice, recordPurchasePayment } from '../services/purchaseInvoiceService';
import { getCompanySettings } from '../services/settingsService';
import { getCurrentCompany } from '../services/companyService';
import approvalService from '../services/approvalService';
import { useAuth } from '../components/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import CollectPaymentModal from '../components/CollectPaymentModal';

const PurchaseInvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeCompany } = useAuth();
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
          getCurrentCompany()
        ]);
        
        let inv = invoiceRes.data || invoiceRes;
        
        try {
          const charges = typeof inv.additional_charges === 'string' ? JSON.parse(inv.additional_charges || '[]') : (inv.additional_charges || []);
          let chargesTotal = 0;
          let chargesTax = 0;
          charges.forEach(c => {
             chargesTotal += parseFloat(c.amount) || 0;
             chargesTax += ((parseFloat(c.amount) || 0) * (parseFloat(c.gstRate || c.gst_rate) || 0)) / 100;
          });
          
          let baseSubtotal = parseFloat(inv.taxable_amount) || 0;
          let baseTax = (parseFloat(inv.igst) || 0) + (parseFloat(inv.cgst) || 0) + (parseFloat(inv.sgst) || 0) + (parseFloat(inv.cess) || 0);
          
          const currentNetTotal = parseFloat(inv.net_total || inv.net_amount) || 0;
          const netWithoutCharges = Math.round(baseSubtotal + baseTax);
          
          if (Math.abs(currentNetTotal - netWithoutCharges) <= 1 && chargesTotal > 0) {
             const beforeRoundOff = baseSubtotal + baseTax + chargesTotal + chargesTax;
             inv.net_total = Math.round(beforeRoundOff);
             inv.net_amount = inv.net_total;
             inv.round_off = inv.net_total - beforeRoundOff;
             inv.additional_charges_total = chargesTotal;
             inv.additional_charges_tax = chargesTax;
             inv.parsed_charges = charges;
          } else {
             inv.parsed_charges = charges;
             inv.additional_charges_total = chargesTotal;
          }
        } catch(e) {}

        setInvoice(inv);
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
    const { isConfirmed } = await Swal.fire({
      title: 'Post Invoice?',
      text: "Are you sure you want to post this invoice? This will receive stock into the warehouses.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Post It',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#0066cc',
      customClass: {
        popup: 'rounded-16 shadow-lg border-0',
        confirmButton: 'btn btn-primary px-4 rounded-pill',
        cancelButton: 'btn btn-light px-4 rounded-pill ms-2'
      },
      buttonsStyling: false
    });

    if (!isConfirmed) return;

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
  };

  const handleCancel = async () => {
    const { value: reason } = await Swal.fire({
      title: 'Cancel Invoice',
      input: 'textarea',
      inputLabel: 'Reason for cancellation',
      inputPlaceholder: 'Enter reason here...',
      showCancelButton: true,
      confirmButtonText: 'Confirm Cancel',
      confirmButtonColor: '#dc3545',
      customClass: {
        popup: 'rounded-16 shadow-lg border-0',
        confirmButton: 'btn btn-danger px-4 rounded-pill',
        cancelButton: 'btn btn-light px-4 rounded-pill ms-2'
      },
      buttonsStyling: false
    });

    if (!reason) return;

    setProcessing(true);
    try {
      await cancelPurchaseInvoice(id, reason);
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
    const { value: remarks } = await Swal.fire({
      title: 'Submit for Approval',
      input: 'textarea',
      inputLabel: 'Remarks (Mandatory)',
      inputPlaceholder: 'Enter any remarks for the approver...',
      showCancelButton: true,
      confirmButtonText: 'Submit Now',
      confirmButtonColor: '#0066cc',
      customClass: {
        popup: 'rounded-16 shadow-lg border-0 b-0',
        confirmButton: 'btn btn-primary px-4 rounded-pill',
        cancelButton: 'btn btn-light px-4 rounded-pill ms-2'
      },
      buttonsStyling: false,
      inputValidator: (value) => {
        if (!value || !value.trim()) {
          return 'You must enter remarks to submit for approval!';
        }
      }
    });

    if (remarks === undefined) return;

    setProcessing(true);
    try {
      await approvalService.submitForApproval({
        entity_type: 'PURCHASE_INVOICE',
        entity_id: id,
        remarks: remarks || "",
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
          {invoice.status === 'CANCELLED' && (invoice.cancellation_reason || invoice.cancel_reason || invoice.reason) && (
            <div className="alert alert-soft-danger mb-4 d-flex align-items-center border-0 rounded-12">
              <i className="isax isax-info-circle me-2 fs-20"></i>
              <div>
                <strong>Cancellation Reason:</strong> {invoice.cancellation_reason || invoice.cancel_reason || invoice.reason}
              </div>
            </div>
          )}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between flex-wrap gap-4 mb-5">
                <div>
                  <h6 className="text-uppercase text-muted fs-12 fw-bold mb-3">Bill To (Company)</h6>
                  <h5 className="fw-bold mb-1">{activeCompany?.name || companySettings?.company_name || 'Your Company'}</h5>
                  <p className="text-muted mb-0 fs-13" style={{ maxWidth: '250px' }}>
                    {activeCompany?.address || companySettings?.address}<br />
                    GSTIN: {activeCompany?.gstin || activeCompany?.gst_number || companySettings?.gstin}
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
                  <span className="fw-bold text-primary h5 mb-0">₹{(invoice.net_total || invoice.net_amount || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table border-top">
                  <thead>
                    <tr className="bg-light bg-opacity-50">
                      <th className="ps-0" style={{ width: '35%' }}>Item Description</th>
                      <th>HSN</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Tax %</th>
                      <th className="text-end pe-0">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(invoice.items || []).map((item, idx) => (
                      <tr key={idx}>
                        <td className="ps-0">
                          <span className="fw-bold text-dark">{item.item?.name || item.name || 'Unknown Item'}</span>
                          {item.description && item.description !== (item.item?.name || item.name) && (
                            <span className="d-block fs-12 text-muted mt-1">{item.description}</span>
                          )}
                        </td>
                        <td>{item.hsn_code || item.item?.hsn_code || '-'}</td>
                        <td>{item.qty}</td>
                        <td>₹{item.rate?.toLocaleString()}</td>
                        <td>{item.gst_rate}%</td>
                        <td className="text-end pe-0 fw-bold text-dark">₹{Number(item.total_amount || item.net_amount || 0).toLocaleString()}</td>
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
                        <span className="fw-bold">₹{Number(invoice.igst || invoice.tax_amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                    ) : (
                      <>
                        <div className="d-flex justify-content-between mb-2 fs-13">
                          <span className="text-muted">CGST Total</span>
                          <span className="fw-bold">₹{Number(invoice.cgst || (invoice.tax_amount / 2) || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 fs-13">
                          <span className="text-muted">SGST Total</span>
                          <span className="fw-bold">₹{Number(invoice.sgst || (invoice.tax_amount / 2) || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                      </>
                    )}
                    {invoice.additional_charges_total > 0 && (
                      <div className="d-flex justify-content-between mb-2 fs-13">
                        <span className="text-muted">Additional Charges</span>
                        <span className="fw-bold">₹{Number(invoice.additional_charges_total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}
                    {Number(invoice.round_off) !== 0 && (
                      <div className="d-flex justify-content-between mb-2 fs-13">
                        <span className="text-muted">Round Off</span>
                        <span className="fw-bold">{Number(invoice.round_off) > 0 ? '+' : ''}{Number(invoice.round_off).toFixed(2)}</span>
                      </div>
                    )}
                    <hr className="my-2 opacity-10" />
                    <div className="d-flex justify-content-between align-items-center h6 mb-0">
                      <span className="fw-bold">Net Total</span>
                      <span className="fw-bold text-primary">₹{(invoice.net_total || invoice.net_amount || 0).toLocaleString()}</span>
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
                <h3 className="fw-bold text-primary mb-1">₹{(invoice.balance_amount || (parseFloat(invoice.net_total || 0) - parseFloat(invoice.paid_amount || 0)) || 0).toLocaleString()}</h3>
                <p className="text-muted fs-13 mb-0">Balance Due</p>
                <div className="mt-3">
                  <span className={`badge rounded-pill px-3 py-2 ${invoice.payment_status === 'PAID' ? 'bg-success' : 'bg-warning'}`}>
                    {invoice.payment_status || 'UNPAID'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {invoice.payments && invoice.payments.length > 0 && (
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
                      {invoice.payments.map((p, i) => (
                        <tr key={i}>
                          <td className="ps-3">{p.payment_date}</td>
                          <td>{p.payment_mode}</td>
                          <td className="text-end pe-3 fw-bold text-dark">₹{p.amount?.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <CollectPaymentModal 
        invoice={invoice} 
        onSuccess={handlePaymentSuccess} 
      />
    </div>
  );
};

export default PurchaseInvoiceDetails;
