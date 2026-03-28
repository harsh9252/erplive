import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getSalesInvoiceById,
  postSalesInvoice,
  cancelSalesInvoice,
  collectPayment,
} from "../services/salesInvoiceService";
import { getCompanySettings } from "../services/settingsService";
import { toast } from "react-toastify";
import CollectPaymentModal from "../components/CollectPaymentModal";
/* Using global bootstrap from window */

const SalesInvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const paymentModalRef = useRef(null);
  const bootstrapModal = useRef(null);

  const fetchInvoice = async () => {
    try {
      const [invoiceRes, companyRes] = await Promise.all([
        getSalesInvoiceById(id),
        getCompanySettings(),
      ]);
      setInvoice(invoiceRes.data);
      setCompany(companyRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load details");
      navigate("/sales-invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const handlePost = async () => {
    if (
      !window.confirm(
        "Are you sure you want to post this invoice? Once posted, it cannot be edited.",
      )
    )
      return;

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
    const reason = window.prompt("Please enter a reason for cancellation:");
    if (reason === null) return;

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
            to="/sales-invoices"
            className="btn btn-soft-secondary btn-sm px-3"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-16 overflow-hidden mb-4 print-content">
        <div className="card-body p-4 p-md-5">
          {/* Status Banner */}
          <div className="d-flex justify-content-between align-items-center mb-5 pb-4 border-bottom">
            <div className="d-flex gap-3">
              <span
                className={`badge ${getStatusBadge(invoice.status)} px-3 py-2 rounded-pill fs-12 uppercase`}
              >
                {invoice.status}
              </span>
              <span
                className={`badge ${getPaymentStatusBadge(invoice.payment_status)} px-3 py-2 rounded-pill fs-12 uppercase`}
              >
                {invoice.payment_status || "UNPAID"}
              </span>
            </div>
            <div className="text-end">
              <h4 className="fw-bold text-primary mb-0 uppercase">
                Tax Invoice
              </h4>
              <p className="text-muted fs-12 mb-0 mt-1">
                # {invoice.invoice_number}
              </p>
            </div>
          </div>

          {/* Parties Header */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <p className="text-muted fs-11 fw-bold uppercase mb-2">From</p>
              <h6 className="fw-bold mb-1">
                {company?.company_name || "My ERP Company"}
              </h6>
              <p
                className="text-dark fs-13 lh-base mb-1"
                style={{ maxWidth: "280px" }}
              >
                {company?.address || "Street Address, City, State, ZIP"}
              </p>
              <p className="text-muted fs-13 mb-0">
                GSTIN:{" "}
                <span className="text-dark fw-semibold">
                  {company?.gst_number || "N/A"}
                </span>
              </p>
              <p className="text-muted fs-13">
                PAN:{" "}
                <span className="text-dark fw-semibold">
                  {company?.pan_number || "N/A"}
                </span>
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="text-muted fs-11 fw-bold uppercase mb-2">Bill To</p>
              <h6 className="fw-bold mb-1">{invoice.customer_name}</h6>
              <p className="text-dark fs-13 mb-1">
                {invoice.customer_email || "No email provided"}
              </p>
              <p className="text-muted fs-13">
                Place of Supply:{" "}
                <span className="text-dark fw-semibold">
                  {invoice.place_of_supply}
                </span>
              </p>
            </div>
          </div>

          {/* Summary Info */}
          <div className="row g-3 mb-5 p-4 bg-light rounded-16 border border-white">
            <div className="col-6 col-md-3">
              <p className="text-muted fs-11 uppercase mb-1">Invoice Date</p>
              <p className="fw-bold mb-0 text-dark">{invoice.invoice_date}</p>
            </div>
            <div className="col-6 col-md-3">
              <p className="text-muted fs-11 uppercase mb-1">Due Date</p>
              <p className="fw-bold mb-0 text-dark">
                {invoice.due_date || "Due on Receipt"}
              </p>
            </div>
            <div className="col-6 col-md-3">
              <p className="text-muted fs-11 uppercase mb-1">Total Amount</p>
              <p className="fw-bold mb-0 text-primary h6">
                ₹{Number(invoice.net_amount || 0).toLocaleString()}
              </p>
            </div>
            <div className="col-6 col-md-3 text-md-end">
              <p className="text-muted fs-11 uppercase mb-1">
                Outstanding Balance
              </p>
              <p className="fw-bold mb-0 text-danger h6">
                ₹
                {Number(
                  invoice.balance_amount || invoice.net_amount || 0,
                ).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="table-responsive mb-5">
            <table className="table align-middle">
              <thead>
                <tr className="fs-12 fw-bold text-muted uppercase">
                  <th>#</th>
                  <th>Item / Service Description</th>
                  <th>HSN/SAC</th>
                  <th className="text-center">Qty / UOM</th>
                  <th className="text-end">Rate</th>
                  <th className="text-end">Discount</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {(invoice.items || []).map((item, idx) => (
                  <tr key={idx}>
                    <td className="text-muted fs-12">{idx + 1}</td>
                    <td>
                      <p className="fw-semibold mb-0 text-dark">
                        {item.name || item.product_name || "Product/Service"}
                      </p>
                      <small className="text-muted">{item.description}</small>
                    </td>
                    <td className="text-muted fs-13">{item.hsn_code}</td>
                    <td className="text-center text-dark fs-13">
                      {item.qty} {item.uom_id}
                    </td>
                    <td className="text-end text-dark fs-13">
                      ₹{Number(item.rate || 0).toFixed(2)}
                    </td>
                    <td className="text-end text-muted fs-13">
                      - ₹{Number(item.discount_amount || 0).toFixed(2)} (
                      {item.discount_pct}%)
                    </td>
                    <td className="text-end fw-bold text-dark fs-13">
                      ₹{Number(item.total_amount || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Breakdown */}
          <div className="row g-4 pt-4 border-top">
            <div className="col-md-7">
              {invoice.remarks && (
                <div className="mb-4">
                  <p className="text-muted fs-11 uppercase fw-bold mb-2">
                    Remarks / Notes
                  </p>
                  <div className="p-3 bg-light rounded-12 fs-13 text-dark lh-base border border-dashed">
                    {invoice.remarks}
                  </div>
                </div>
              )}
              {invoice.terms_and_conditions && (
                <div>
                  <p className="text-muted fs-11 uppercase fw-bold mb-2">
                    Terms & Conditions
                  </p>
                  <p className="fs-12 text-muted lh-base">
                    {invoice.terms_and_conditions}
                  </p>
                </div>
              )}
            </div>
            <div className="col-md-5">
              <div className="summary-list bg-light p-4 rounded-20">
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted fs-13">Subtotal</span>
                  <span className="fw-bold text-dark">
                    ₹{Number(invoice.amount_before_tax || 0).toLocaleString()}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted fs-13">Taxable Total</span>
                  <span className="fw-bold text-dark">
                    ₹{Number(invoice.taxable_amount || 0).toLocaleString()}
                  </span>
                </div>

                {Number(invoice.igst_total) > 0 && (
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted fs-13">IGST Total</span>
                    <span className="fw-bold text-dark">
                      ₹{Number(invoice.igst_total || 0).toLocaleString()}
                    </span>
                  </div>
                )}

                {Number(invoice.cgst_total) > 0 && (
                  <>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted fs-13">CGST Total</span>
                      <span className="fw-bold text-dark">
                        ₹{Number(invoice.cgst_total || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted fs-13">SGST Total</span>
                      <span className="fw-bold text-dark">
                        ₹{Number(invoice.sgst_total || 0).toLocaleString()}
                      </span>
                    </div>
                  </>
                )}

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted fs-13">Round Off</span>
                  <span className="fw-bold text-dark">
                    {Number(invoice.round_off) >= 0 ? "+" : ""}₹
                    {Number(invoice.round_off || 0).toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4 bg-primary p-3 rounded-12 text-white">
                  <span className="fw-bold fs-14 uppercase">Net Payable</span>
                  <span className="h4 fw-bold mb-0">
                    ₹{Number(invoice.net_amount || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
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
