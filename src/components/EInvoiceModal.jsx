import { useState } from 'react';
import { eInvoiceService } from '../services/eInvoiceService';

const EInvoiceModal = ({ invoiceId, invoiceNumber, onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [eInvoiceData, setEInvoiceData] = useState(null);

  const handleGenerateEInvoice = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await eInvoiceService.generateEInvoice(invoiceId);

    if (result.success) {
      setEInvoiceData(result.data);
      setSuccess(true);
      if (onSuccess) {
        onSuccess(result.data);
      }
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div
      className="modal fade"
      id="eInvoiceModal"
      tabIndex="-1"
      aria-labelledby="eInvoiceModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="eInvoiceModalLabel">
              Generate E-Invoice
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="fa fa-exclamation-circle me-2"></i>
                {error}
              </div>
            )}

            {success && eInvoiceData && (
              <div className="alert alert-success" role="alert">
                <i className="fa fa-check-circle me-2"></i>
                E-Invoice generated successfully!
              </div>
            )}

            {!success ? (
              <div>
                <p className="mb-3">
                  <strong>Invoice Number:</strong> {invoiceNumber}
                </p>
                <p className="text-muted mb-4">
                  Click the button below to generate an E-Invoice for this sales
                  invoice. The system will create an IRN (Invoice Reference
                  Number) and QR code that can be printed on the invoice.
                </p>
                <div className="alert alert-info">
                  <i className="fa fa-info-circle me-2"></i>
                  <strong>Note:</strong> E-Invoicing is mandatory for businesses
                  with turnover &gt; ₹10 Crore. The generated E-Invoice can be
                  cancelled within 24 hours if needed.
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <h6 className="mb-2">E-Invoice Details</h6>
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td>
                            <strong>IRN:</strong>
                          </td>
                          <td>
                            <code className="text-break">{eInvoiceData.irn}</code>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Ack No:</strong>
                          </td>
                          <td>{eInvoiceData.ack_no}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Ack Date:</strong>
                          </td>
                          <td>{eInvoiceData.ack_date}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Status:</strong>
                          </td>
                          <td>
                            <span className="badge bg-success">
                              {eInvoiceData.status}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="mb-2">QR Code</h6>
                  <div className="text-center p-3 border rounded">
                    <img
                      src={eInvoiceData.qr_code}
                      alt="E-Invoice QR Code"
                      className="img-fluid"
                      style={{ maxWidth: '150px' }}
                    />
                    <p className="text-muted mt-2 small">
                      Print this QR code on your invoice
                    </p>
                  </div>
                </div>

                <div className="alert alert-info">
                  <i className="fa fa-info-circle me-2"></i>
                  <strong>Next Steps:</strong>
                  <ul className="mb-0 mt-2">
                    <li>Print the invoice with the QR code</li>
                    <li>Send the invoice to the customer</li>
                    <li>
                      You can cancel this E-Invoice within 24 hours if needed
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            {!success ? (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleGenerateEInvoice}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-file-invoice me-2"></i>
                      Generate E-Invoice
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EInvoiceModal;
