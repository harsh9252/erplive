# E-Invoice Fields Implementation

## Overview
E-Invoice generation system that auto-populates from Sales Invoices without requiring backend integration.

## E-Invoice Fields

| Field | Description | Implementation |
|-------|-------------|-----------------|
| `irn` | Invoice Reference Number (64-char hash) | Generated using invoice data hash + timestamp |
| `ack_no` | Acknowledgement number from IRP | Generated as ACK + timestamp (10 digits) |
| `ack_date` | Date of acknowledgement | Current date in YYYY-MM-DD format |
| `qr_code` | Base64 QR code image | Generated using qrcode library from IRN + ack_no |
| `signed_invoice` | Digitally signed JSON from IRP | JSON stringified invoice data with timestamp |
| `status` | PENDING, GENERATED, CANCELLED | Set to GENERATED on creation, can be CANCELLED |

## Data Flow

### 1. Sales Invoice (Source)
```
salesInvoices (localStorage)
├── id
├── invoiceNumber
├── customer
├── invoiceDate
├── netTotal
├── status
└── eInvoice (reference to generated e-invoice)
```

### 2. E-Invoice Generation Process
1. User selects a sales invoice from "Generate New" tab
2. Clicks "Generate" button → navigates to `/e-invoice-generate/:invoiceId`
3. Page loads invoice details and displays them
4. User clicks "Generate E-Invoice" button
5. System generates:
   - **IRN**: 64-character hash from invoice data
   - **Ack No**: Unique acknowledgement number
   - **Ack Date**: Current date
   - **QR Code**: Base64 encoded QR code containing IRN + ack_no
   - **Signed Invoice**: JSON with invoice details + timestamp
6. E-Invoice saved to localStorage
7. Sales Invoice updated with eInvoice reference

### 3. E-Invoice Storage
```
eInvoices (localStorage)
├── id (EINV-{timestamp})
├── invoiceId (reference to sales invoice)
├── invoiceNumber
├── customer
├── netTotal
├── irn (64-char hash)
├── ack_no (ACK{timestamp})
├── ack_date (YYYY-MM-DD)
├── qr_code (base64 data URL)
├── signed_invoice (JSON string)
├── status (GENERATED/CANCELLED)
└── created_at (ISO timestamp)
```

## Pages

### 1. E-Invoices List (`/e-invoices`)
- **Tab 1: Generated E-Invoices**
  - Shows all generated e-invoices
  - Displays: Invoice No, Customer, Amount, IRN (truncated), Ack No, Status
  - Action: View button → `/e-invoice-details/:eInvoiceId`

- **Tab 2: Generate New**
  - Shows sales invoices without e-invoices
  - Displays: Invoice No, Customer, Date, Amount, Status
  - Action: Generate button → `/e-invoice-generate/:invoiceId`

### 2. Generate E-Invoice (`/e-invoice-generate/:invoiceId`)
- Displays source invoice details
- Shows generation form
- On submit:
  - Generates IRN, Ack No, Ack Date
  - Creates QR code
  - Saves to localStorage
  - Shows success message
  - Displays generated e-invoice details

### 3. E-Invoice Details (`/e-invoice-details/:eInvoiceId`)
- Displays complete e-invoice information
- Shows QR code
- Actions:
  - Print (browser print dialog)
  - Download JSON (signed invoice)
  - Download QR Code (PNG)
  - Cancel E-Invoice (changes status to CANCELLED)

## IRN Generation Algorithm

```javascript
// Combine invoice data
const data = `${invoiceNumber}${customer}${invoiceDate}${netTotal}`;

// Generate hash
let hash = 0;
for (let i = 0; i < data.length; i++) {
  const char = data.charCodeAt(i);
  hash = ((hash << 5) - hash) + char;
  hash = hash & hash;
}

// Create 64-char IRN
const hashStr = Math.abs(hash).toString(16);
const irn = (hashStr + Date.now().toString(16))
  .substring(0, 64)
  .padEnd(64, '0');
```

## QR Code Content

The QR code is generated using the QR Server API (no external dependencies needed).

The QR code encodes the following JSON:
```json
{
  "irn": "64-character-hash",
  "ack_no": "ACK1234567890",
  "invoice_number": "INV-001",
  "amount": 15000
}
```

API Used: `https://api.qrserver.com/v1/create-qr-code/`

## localStorage Keys

- `salesInvoices`: Array of sales invoices
- `eInvoices`: Array of generated e-invoices

## Features

✅ Auto-populate from sales invoices
✅ Generate unique IRN for each e-invoice
✅ Generate acknowledgement numbers
✅ Create QR codes with invoice data
✅ Store digitally signed invoice JSON
✅ Track e-invoice status (GENERATED/CANCELLED)
✅ Download e-invoice as JSON
✅ Download QR code as PNG
✅ Print e-invoice details
✅ Cancel e-invoices
✅ No backend required (localStorage only)

## Dependencies

- `react-router-dom`: For navigation
- `react`: For UI components
- QR Server API: For QR code generation (no npm package needed)

## Usage

1. Navigate to Dashboard → Create New → E-Invoice
2. Or go to Sidebar → GST → E-Invoice
3. Click "Generate New" tab
4. Select an invoice and click "Generate"
5. Review generated e-invoice details
6. Download, print, or view QR code as needed
