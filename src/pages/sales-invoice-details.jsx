import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getSalesInvoiceById, postSalesInvoice, cancelSalesInvoice, collectPayment } from "../services/salesInvoiceService";
import { getCompanySettings } from "../services/settingsService";
import { getCurrentCompany } from "../services/companyService";
import { getUoms } from "../services/uomService";
import approvalService from "../services/approvalService";
import { useAuth } from "../components/AuthContext";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import CollectPaymentModal from "../components/CollectPaymentModal";
import ProductLayout from "../components/invoice-templates/ProductLayout";
import ServiceLayout from "../components/invoice-templates/ServiceLayout";
import EcommerceLayout from "../components/invoice-templates/EcommerceLayout";
/* Using global bootstrap from window */

const SalesInvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeCompany } = useAuth();
  const [invoice, setInvoice] = useState(null);
  const [company, setCompany] = useState(null);
  const [uoms, setUoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const paymentModalRef = useRef(null);
  const bootstrapModal = useRef(null);

  const fetchInvoice = async () => {
    try {
      const [invoiceRes, companyRes, uomRes] = await Promise.all([
        getSalesInvoiceById(id),
        getCurrentCompany(),
        getUoms(1, 1000)
      ]);
      
      let inv = invoiceRes.data;
      
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
      setCompany(companyRes.data);
      setUoms(uomRes.data?.rows || uomRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load details");
      navigate("/invoicing/sales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const handlePost = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Post Invoice?',
      text: "Are you sure you want to post this invoice? Once posted, it cannot be edited or deleted.",
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
      await postSalesInvoice(id);
      toast.success("Invoice posted successfully!");
      fetchInvoice();
    } catch (error) {
      toast.error(error.message || "Failed to post invoice");
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
      await cancelSalesInvoice(id, reason);
      toast.success("Invoice cancelled.");
      fetchInvoice();
    } catch (error) {
      toast.error(error.message || "Failed to cancel invoice");
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
        entity_type: "SALES_INVOICE",
        entity_id: id,
        remarks: remarks || "",
      });
      toast.success("Submitted for approval successfully!");
      fetchInvoice();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit for approval");
    } finally {
      setProcessing(false);
    }
  };

  const openPaymentModal = () => {
    if (!bootstrapModal.current) {
      bootstrapModal.current = new window.bootstrap.Modal(
        paymentModalRef.current,
      );
    }
    bootstrapModal.current.show();
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      await collectPayment(id, paymentData);
      toast.success("Payment recorded successfully!");
      bootstrapModal.current?.hide();
      fetchInvoice();
    } catch (error) {
      toast.error(error.message || "Failed to record payment");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      DRAFT: "badge-soft-secondary",
      POSTED: "badge-soft-success",
      CANCELLED: "badge-soft-danger",
    };
    return badges[status] || "badge-soft-primary";
  };

  const getPaymentStatusBadge = (status) => {
    const badges = {
      PENDING: "badge-soft-warning",
      PARTIAL: "badge-soft-info",
      PAID: "badge-soft-success",
    };
    return badges[status] || "badge-soft-secondary";
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-50">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!invoice) return null;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h5 className="fw-bold mb-1">Invoice: {invoice.invoice_number}</h5>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item">
                <Link to="/invoicing/sales">Sales Invoices</Link>
              </li>
              <li className="breadcrumb-item active">
                {invoice.invoice_number}
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          {invoice.status === "DRAFT" && (
            <>
              <Link
                to={`/invoicing/sales/edit/${id}`}
                className="btn btn-outline-warning btn-sm px-3"
              >
                <i className="isax isax-edit me-1"></i>Edit
              </Link>
              <button
                className="btn btn-outline-primary btn-sm px-4"
                onClick={handleSubmitForApproval}
                disabled={processing}
              >
                {processing ? "Submitting..." : "Submit for Approval"}
              </button>
              <button
                className="btn btn-primary btn-sm px-4"
                onClick={handlePost}
                disabled={processing}
              >
                {processing ? "Posting..." : "Post Invoice"}
              </button>
            </>
          )}

          {invoice.status === "POSTED" && (
            <>
              {invoice.payment_status !== "PAID" && (
                <button
                  className="btn btn-success btn-sm px-4"
                  onClick={openPaymentModal}
                >
                  <i className="isax isax-wallet me-1"></i>Collect Payment
                </button>
              )}
              <button
                className="btn btn-outline-danger btn-sm px-3"
                onClick={handleCancel}
                disabled={processing}
              >
                Cancel
              </button>
            </>
          )}

          <button
            className="btn btn-soft-primary btn-sm px-3"
            onClick={() => window.print()}
          >
            <i className="isax isax-printer me-1"></i>Print
          </button>
          <Link
            to="/invoicing/sales"
            className="btn btn-soft-secondary btn-sm px-3"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-16 overflow-hidden mb-4 print-content">
        <div className="card-body p-4 p-md-5">
          {/* Status Banner */}
          <div className="d-flex justify-content-between align-items-center mb-5 pb-4 border-bottom status-banner">
            <div className="d-flex gap-3">
              <span className={`badge ${getStatusBadge(invoice.status)} px-3 py-2 rounded-pill fs-12 uppercase`}>
                {invoice.status}
              </span>
              <span className={`badge ${getPaymentStatusBadge(invoice.payment_status)} px-3 py-2 rounded-pill fs-12 uppercase`}>
                {invoice.payment_status || "UNPAID"}
              </span>
            </div>
            <div className="text-end">
              <h4 className="fw-bold text-primary mb-0 uppercase">Tax Invoice</h4>
              <p className="text-muted fs-12 mb-0 mt-1"># {invoice.invoice_number}</p>
            </div>
          </div>

          {invoice.status === 'CANCELLED' && (invoice.cancellation_reason || invoice.cancel_reason || invoice.reason) && (
            <div className="alert alert-soft-danger mb-4 d-flex align-items-center border-0 rounded-12">
              <i className="isax isax-info-circle me-2 fs-20"></i>
              <div>
                <strong>Cancellation Reason:</strong> {invoice.cancellation_reason || invoice.cancel_reason || invoice.reason}
              </div>
            </div>
          )}

          {/* Invoice Template Rendering */}
          <div className="template-container">
            {invoice.invoice_layout === 'SERVICES' ? (
              <ServiceLayout invoice={invoice} company={company} activeCompany={activeCompany} uoms={uoms} />
            ) : (invoice.invoice_layout === 'ECOMMERCE' || invoice.ecommerce_operator_gstin) ? (
              <EcommerceLayout invoice={invoice} company={company} activeCompany={activeCompany} uoms={uoms} />
            ) : (
              <ProductLayout invoice={invoice} company={company} activeCompany={activeCompany} uoms={uoms} />
            )}
          </div>
        </div>
      </div>

      {invoice.payments && invoice.payments.length > 0 && (
        <div className="card border-0 shadow-sm rounded-16 mb-4">
          <div className="card-header bg-transparent border-0 pt-4 px-4">
            <h6 className="fw-bold mb-0">Payment History</h6>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="bg-light">
                  <tr className="fs-12 text-muted fw-bold uppercase">
                    <th className="px-4">Date</th>
                    <th>Payment Mode</th>
                    <th>Reference #</th>
                    <th className="text-end px-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.payments.map((p, i) => (
                    <tr key={i}>
                      <td className="px-4 fs-13">{p.payment_date}</td>
                      <td className="fs-13">
                        <span className="badge badge-soft-primary px-2">
                          {p.payment_mode}
                        </span>
                      </td>
                      <td className="fs-13 text-muted">{p.reference || "-"}</td>
                      <td className="text-end px-4 fw-bold text-success fs-13">
                        ₹{Number(p.amount || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      <CollectPaymentModal
        ref={paymentModalRef}
        invoice={invoice}
        onSuccess={handlePaymentSuccess}
      />

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-content, .print-content * { visibility: visible; }
          .print-content { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            box-shadow: none !important;
          }
          .btn, nav, .status-banner { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default SalesInvoiceDetails;
