import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EInvoiceGenerate() {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [eInvoice, setEInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  useEffect(() => {
    // Load invoice from localStorage
    const invoices = JSON.parse(localStorage.getItem('salesInvoices') || '[]');
    const foundInvoice = invoices.find(inv => inv.id === invoiceId);
    
    if (foundInvoice) {
      setInvoice(foundInvoice);
      
      // Check if e-invoice already exists
      const eInvoices = JSON.parse(localStorage.getItem('eInvoices') || '[]');
      const existingEInvoice = eInvoices.find(e => e.invoiceId === invoiceId);
      if (existingEInvoice) {
        setEInvoice(existingEInvoice);
        generateQRCode(existingEInvoice);
      }
    }
  }, [invoiceId]);

  // Generate IRN (Invoice Reference Number) - 64 char hash
  const generateIRN = () => {
    const data = `${invoice.invoiceNumber}${invoice.customer}${invoice.invoiceDate}${invoice.netTotal}`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    const hashStr = Math.abs(hash).toString(16);
    return (hashStr + Date.now().toString(16)).substring(0, 64).padEnd(64, '0');
  };

  // Generate Acknowledgement Number
  const generateAckNo = () => {
    return 'ACK' + Date.now().toString().slice(-10);
  };

  // Generate QR Code using API (no external dependency)
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

  const handleGenerateEInvoice = async () => {
    setLoading(true);
    try {
      const irn = generateIRN();
      const ackNo = generateAckNo();
      const ackDate = new Date().toISOString().split('T')[0];

      const newEInvoice = {
        id: 'EINV-' + Date.now(),
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        customer: invoice.customer,
        netTotal: invoice.netTotal,
        irn: irn,
        ack_no: ackNo,
        ack_date: ackDate,
        qr_code: null, // Will be set after QR generation
        signed_invoice: JSON.stringify({
          invoice_number: invoice.invoiceNumber,
          customer: invoice.customer,
          date: invoice.invoiceDate,
          amount: invoice.netTotal,
          irn: irn,
          timestamp: new Date().toISOString(),
        }),
        status: 'GENERATED',
        created_at: new Date().toISOString(),
      };

      // Generate QR code
      await generateQRCode(newEInvoice);

      // Save to localStorage
      const eInvoices = JSON.parse(localStorage.getItem('eInvoices') || '[]');
      eInvoices.push(newEInvoice);
      localStorage.setItem('eInvoices', JSON.stringify(eInvoices));

      // Update sales invoice with e-invoice reference
      const invoices = JSON.parse(localStorage.getItem('salesInvoices') || '[]');
      const updatedInvoices = invoices.map(inv =>
        inv.id === invoice.id ? { ...inv, eInvoice: newEInvoice.id } : inv
      );
      localStorage.setItem('salesInvoices', JSON.stringify(updatedInvoices));

      setEInvoice(newEInvoice);
    } catch (err) {
      console.error('Error generating e-invoice:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/e-invoices');
  };

  if (!invoice) {
    return (
      <div className="alert alert-warning">
        Invoice not found. Please select a valid invoice.
      </div>
    );
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Generate E-Invoice</h6>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="mb-0">Invoice Details</h6>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Invoice Number</p>
                  <h6>{invoice.invoiceNumber}</h6>
                </div>
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Customer</p>
                  <h6>{invoice.customer}</h6>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Invoice Date</p>
                  <h6>{invoice.invoiceDate}</h6>
                </div>
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Amount</p>
                  <h6>₹{invoice.netTotal}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Status</p>
                  <span className="badge bg-primary">{invoice.status}</span>
                </div>
              </div>
            </div>
          </div>

          {eInvoice && (
            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">E-Invoice Details</h6>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p className="mb-1 text-muted">IRN (Invoice Reference Number)</p>
                    <p className="font-monospace small">{eInvoice.irn}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-1 text-muted">Acknowledgement Number</p>
                    <p className="font-monospace">{eInvoice.ack_no}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p className="mb-1 text-muted">Acknowledgement Date</p>
                    <p>{eInvoice.ack_date}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-1 text-muted">Status</p>
                    <span className="badge bg-success">{eInvoice.status}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <p className="mb-1 text-muted">Signed Invoice (JSON)</p>
                    <div className="bg-light p-2 rounded small font-monospace" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      {eInvoice.signed_invoice}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-lg-4">
          {qrCodeUrl && (
            <div className="card mb-3">
              <div className="card-header">
                <h6 className="mb-0">QR Code</h6>
              </div>
              <div className="card-body text-center">
                <img src={qrCodeUrl} alt="E-Invoice QR Code" className="img-fluid" style={{ maxWidth: '250px' }} />
                <p className="text-muted small mt-2">Scan this QR code to verify the e-invoice</p>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-body">
              {!eInvoice ? (
                <>
                  <p className="text-muted small mb-3">Click the button below to generate the e-invoice with IRN and acknowledgement details.</p>
                  <button
                    onClick={handleGenerateEInvoice}
                    disabled={loading}
                    className="btn btn-primary w-100 mb-2"
                  >
                    {loading ? 'Generating...' : 'Generate E-Invoice'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-secondary w-100"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div className="alert alert-success mb-3">
                    <i className="isax isax-tick-circle me-2"></i>
                    E-Invoice generated successfully
                  </div>
                  <button
                    onClick={() => navigate('/e-invoices')}
                    className="btn btn-primary w-100 mb-2"
                  >
                    View All E-Invoices
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="btn btn-outline-primary w-100"
                  >
                    Print
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
