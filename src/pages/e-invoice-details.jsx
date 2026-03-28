import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EInvoiceDetails() {
  const { eInvoiceId } = useParams();
  const navigate = useNavigate();
  const [eInvoice, setEInvoice] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eInvoices = JSON.parse(localStorage.getItem('eInvoices') || '[]');
    const found = eInvoices.find(e => e.id === eInvoiceId);
    
    if (found) {
      setEInvoice(found);
      generateQRCode(found);
    }
    setLoading(false);
  }, [eInvoiceId]);

  const generateQRCode = async (eInvData) => {
    try {
      const qrData = JSON.stringify({
        irn: eInvData.irn,
        ack_no: eInvData.ack_no,
        invoice_number: eInvData.invoiceNumber,
        amount: eInvData.netTotal,
      });
      // Use QR code API
      const encodedData = encodeURIComponent(qrData);
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedData}`;
      setQrCodeUrl(qrUrl);
    } catch (err) {
      console.error('QR Code generation failed:', err);
    }
  };

  const handleCancel = () => {
    const eInvoices = JSON.parse(localStorage.getItem('eInvoices') || '[]');
    const updated = eInvoices.map(e =>
      e.id === eInvoiceId ? { ...e, status: 'CANCELLED' } : e
    );
    localStorage.setItem('eInvoices', JSON.stringify(updated));
    navigate('/e-invoices');
  };

  if (loading) {
    return <div className="alert alert-info">Loading...</div>;
  }

  if (!eInvoice) {
    return (
      <div className="alert alert-warning">
        E-Invoice not found.
      </div>
    );
  }

  const signedData = JSON.parse(eInvoice.signed_invoice);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>E-Invoice Details</h6>
        </div>
        <div>
          <button onClick={() => window.print()} className="btn btn-outline-primary btn-sm me-2">
            <i className="isax isax-printer me-1"></i>Print
          </button>
          <button onClick={() => navigate('/e-invoices')} className="btn btn-secondary btn-sm">
            Back
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {/* Invoice Header */}
          <div className="card mb-3">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">E-Invoice</h6>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <p className="text-muted small mb-1">Invoice Number</p>
                  <h5 className="mb-0">{eInvoice.invoiceNumber}</h5>
                </div>
                <div className="col-md-6 text-md-end">
                  <p className="text-muted small mb-1">Status</p>
                  <span className={`badge ${eInvoice.status === 'GENERATED' ? 'bg-success' : eInvoice.status === 'CANCELLED' ? 'bg-danger' : 'bg-warning'}`}>
                    {eInvoice.status}
                  </span>
                </div>
              </div>

              <hr />

              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="text-muted small mb-1">Customer Name</p>
                  <p className="mb-3">{eInvoice.customer}</p>
                </div>
                <div className="col-md-6">
                  <p className="text-muted small mb-1">Invoice Amount</p>
                  <p className="mb-3">₹{eInvoice.netTotal}</p>
                </div>
              </div>

              <hr />

              {/* E-Invoice Specific Fields */}
              <div className="row mb-3">
                <div className="col-12">
                  <p className="text-muted small mb-2">IRN (Invoice Reference Number)</p>
                  <div className="bg-light p-3 rounded mb-3">
                    <p className="font-monospace mb-0 small">{eInvoice.irn}</p>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="text-muted small mb-1">Acknowledgement Number</p>
                  <p className="font-monospace">{eInvoice.ack_no}</p>
                </div>
                <div className="col-md-6">
                  <p className="text-muted small mb-1">Acknowledgement Date</p>
                  <p>{eInvoice.ack_date}</p>
                </div>
              </div>

              <hr />

              {/* Signed Invoice */}
              <div className="row">
                <div className="col-12">
                  <p className="text-muted small mb-2">Digitally Signed Invoice (JSON)</p>
                  <div className="bg-light p-3 rounded" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <pre className="mb-0 small font-monospace">{JSON.stringify(signedData, null, 2)}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* QR Code */}
          {qrCodeUrl && (
            <div className="card mb-3">
              <div className="card-header">
                <h6 className="mb-0">QR Code</h6>
              </div>
              <div className="card-body text-center">
                <img src={qrCodeUrl} alt="E-Invoice QR Code" className="img-fluid" style={{ maxWidth: '100%' }} />
                <p className="text-muted small mt-3">Scan this QR code to verify the e-invoice authenticity</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">Actions</h6>
            </div>
            <div className="card-body">
              <button
                onClick={() => {
                  const element = document.createElement('a');
                  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(eInvoice.signed_invoice));
                  element.setAttribute('download', `${eInvoice.invoiceNumber}_signed.json`);
                  element.style.display = 'none';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="btn btn-outline-primary w-100 mb-2"
              >
                <i className="isax isax-download me-1"></i>Download JSON
              </button>

              {qrCodeUrl && (
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = qrCodeUrl;
                    link.download = `${eInvoice.invoiceNumber}_qr.png`;
                    link.click();
                  }}
                  className="btn btn-outline-primary w-100 mb-2"
                >
                  <i className="isax isax-download me-1"></i>Download QR Code
                </button>
              )}

              {eInvoice.status !== 'CANCELLED' && (
                <button
                  onClick={handleCancel}
                  className="btn btn-outline-danger w-100"
                >
                  <i className="isax isax-close-circle me-1"></i>Cancel E-Invoice
                </button>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="card mt-3">
            <div className="card-body">
              <p className="text-muted small mb-0">
                <i className="isax isax-info-circle me-2"></i>
                This e-invoice has been generated with a unique IRN and acknowledgement number. The QR code contains all necessary information for verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
