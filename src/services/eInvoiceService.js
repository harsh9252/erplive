import { API_BASE_URL } from '../config/apiConfig';

// Mock QR code generator (in production, use a library like qrcode.react)
const generateMockQRCode = (invoiceData) => {
  const qrData = JSON.stringify({
    irn: invoiceData.irn,
    ack_no: invoiceData.ack_no,
    invoice_no: invoiceData.invoiceNumber,
    date: invoiceData.invoiceDate,
  });

  // Return a simple base64 encoded placeholder
  // In production, use qrcode library to generate actual QR
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
};

// Generate mock IRN (64-char hash)
const generateMockIRN = (invoiceData) => {
  const data = `${invoiceData.invoiceNumber}${invoiceData.invoiceDate}${invoiceData.customerId}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(64, '0').substring(0, 64);
};

// Generate mock acknowledgement number
const generateMockAckNo = () => {
  return Math.random().toString(36).substring(2, 15).toUpperCase();
};

export const eInvoiceService = {
  // Generate E-Invoice
  generateEInvoice: async (invoiceId) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Get invoice from localStorage
      const invoices = JSON.parse(localStorage.getItem('salesInvoices') || '[]');
      const invoice = invoices.find(inv => inv.id === invoiceId);

      if (!invoice) {
        throw new Error('Invoice not found');
      }

      // Check if already generated
      if (invoice.eInvoice && invoice.eInvoice.status === 'GENERATED') {
        throw new Error('E-Invoice already generated for this invoice');
      }

      // Generate E-Invoice data
      const irn = generateMockIRN(invoice);
      const ackNo = generateMockAckNo();
      const ackDate = new Date().toISOString().split('T')[0];
      const qrCode = generateMockQRCode({
        irn,
        ack_no: ackNo,
        invoiceNumber: invoice.invoiceNumber,
        invoiceDate: invoice.invoiceDate,
      });

      const eInvoiceData = {
        irn,
        ack_no: ackNo,
        ack_date: ackDate,
        qr_code: qrCode,
        signed_invoice: JSON.stringify(invoice),
        status: 'GENERATED',
        generated_at: new Date().toISOString(),
      };

      // Update invoice with E-Invoice data
      const updatedInvoice = {
        ...invoice,
        eInvoice: eInvoiceData,
      };

      // Save to localStorage
      const updatedInvoices = invoices.map(inv =>
        inv.id === invoiceId ? updatedInvoice : inv
      );
      localStorage.setItem('salesInvoices', JSON.stringify(updatedInvoices));

      return {
        success: true,
        data: eInvoiceData,
        message: 'E-Invoice generated successfully',
      };
    } catch (error) {
      console.error('Error generating E-Invoice:', error);
      return {
        success: false,
        message: error.message || 'Failed to generate E-Invoice',
      };
    }
  },

  // Cancel E-Invoice (within 24 hours)
  cancelEInvoice: async (invoiceId) => {
    try {
      const invoices = JSON.parse(localStorage.getItem('salesInvoices') || '[]');
      const invoice = invoices.find(inv => inv.id === invoiceId);

      if (!invoice || !invoice.eInvoice) {
        throw new Error('E-Invoice not found');
      }

      // Check if within 24 hours
      const generatedTime = new Date(invoice.eInvoice.generated_at);
      const currentTime = new Date();
      const hoursDiff = (currentTime - generatedTime) / (1000 * 60 * 60);

      if (hoursDiff > 24) {
        throw new Error('E-Invoice can only be cancelled within 24 hours of generation');
      }

      // Update status to CANCELLED
      const updatedInvoice = {
        ...invoice,
        eInvoice: {
          ...invoice.eInvoice,
          status: 'CANCELLED',
          cancelled_at: new Date().toISOString(),
        },
      };

      const updatedInvoices = invoices.map(inv =>
        inv.id === invoiceId ? updatedInvoice : inv
      );
      localStorage.setItem('salesInvoices', JSON.stringify(updatedInvoices));

      return {
        success: true,
        message: 'E-Invoice cancelled successfully',
      };
    } catch (error) {
      console.error('Error cancelling E-Invoice:', error);
      return {
        success: false,
        message: error.message || 'Failed to cancel E-Invoice',
      };
    }
  },

  // Get E-Invoice details
  getEInvoice: async (invoiceId) => {
    try {
      const invoices = JSON.parse(localStorage.getItem('salesInvoices') || '[]');
      const invoice = invoices.find(inv => inv.id === invoiceId);

      if (!invoice || !invoice.eInvoice) {
        return {
          success: false,
          message: 'E-Invoice not found',
        };
      }

      return {
        success: true,
        data: invoice.eInvoice,
      };
    } catch (error) {
      console.error('Error fetching E-Invoice:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch E-Invoice',
      };
    }
  },

  // Download E-Invoice as JSON
  downloadEInvoice: (invoiceId, invoiceNumber) => {
    try {
      const invoices = JSON.parse(localStorage.getItem('salesInvoices') || '[]');
      const invoice = invoices.find(inv => inv.id === invoiceId);

      if (!invoice || !invoice.eInvoice) {
        throw new Error('E-Invoice not found');
      }

      const dataStr = JSON.stringify(invoice.eInvoice, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `E-Invoice-${invoiceNumber}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return { success: true, message: 'E-Invoice downloaded successfully' };
    } catch (error) {
      console.error('Error downloading E-Invoice:', error);
      return { success: false, message: error.message };
    }
  },

  // Get E-Invoice status
  getEInvoiceStatus: async (invoiceId) => {
    try {
      const invoices = JSON.parse(localStorage.getItem('salesInvoices') || '[]');
      const invoice = invoices.find(inv => inv.id === invoiceId);

      if (!invoice) {
        return { success: false, status: 'NOT_FOUND' };
      }

      if (!invoice.eInvoice) {
        return { success: true, status: 'PENDING' };
      }

      return { success: true, status: invoice.eInvoice.status };
    } catch (error) {
      console.error('Error fetching E-Invoice status:', error);
      return { success: false, status: 'ERROR' };
    }
  },
};
