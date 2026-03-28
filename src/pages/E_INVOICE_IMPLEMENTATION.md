# GST E-Invoice Implementation Guide

## Overview
Complete E-Invoice feature for GST compliance. E-Invoicing is mandatory for businesses with turnover > ₹10 Crore.

## Files Created

### 1. **eInvoiceService.js** - Service Layer
**Location**: `frontend/src/services/eInvoiceService.js`

#### Methods:

##### `generateEInvoice(invoiceId)`
- Generates E-Invoice for a sales invoice
- Creates IRN (64-char hash)
- Generates QR code (base64)
- Returns acknowledgement number and date
- Stores data in localStorage
- **Returns**: `{ success, data: eInvoiceData, message }`

##### `cancelEInvoice(invoiceId)`
- Cancels E-Invoice within 24 hours
- Validates time constraint
- Updates status to CANCELLED
- **Returns**: `{ success, message }`

##### `getEInvoice(invoiceId)`
- Retrieves E-Invoice details
- **Returns**: `{ success, data: eInvoiceData }`

##### `getEInvoiceStatus(invoiceId)`
- Gets current E-Invoice status
- Returns: PENDING, GENERATED, CANCELLED, NOT_FOUND
- **Returns**: `{ success, status }`

##### `downloadEInvoice(invoiceId, invoiceNumber)`
- Downloads E-Invoice as JSON file
- Filename: `E-Invoice-{invoiceNumber}.json`
- **Returns**: `{ success, message }`

---

### 2. **e-invoices.jsx** - E-Invoice List Page
**Route**: `/e-invoices`

#### Features:
- **Statistics Cards**
  - Total E-Invoices
  - Generated count
  - Pending count
  - Cancelled count

- **Search & Filter**
  - Search by Invoice No, Customer, or IRN
  - Filter by Status (All, Pending, Generated, Cancelled)

- **E-Invoice Table**
  - Invoice Number (clickable to details)
  - Customer Name
  - Invoice Date
  - IRN (truncated with full value in tooltip)
  - Acknowledgement Number
  - Acknowledgement Date
  - Amount
  - Status Badge
  - Actions (View, Download, Cancel)

- **Pagination**
  - 10 items per page
  - Previous/Next navigation
  - Page number buttons

#### Data Structure:
```javascript
{
  id: string,
  invoiceNumber: string,
  customer: string,
  invoiceDate: date,
  irn: string (64-char hash),
  ackNo: string,
  ackDate: date,
  status: enum (PENDING, GENERATED, CANCELLED),
  generatedAt: timestamp,
  netTotal: number
}
```

---

### 3. **e-invoice-details.jsx** - E-Invoice Details Page
**Route**: `/e-invoice-details/:invoiceId`

#### Sections:

##### E-Invoice Status Card
- Current status badge
- IRN (full value, copyable)
- Acknowledgement number
- Acknowledgement date
- Generation timestamp
- Hours remaining for cancellation (if GENERATED)
- QR Code display (200px × 200px)

##### Invoice Information
- Invoice number
- Invoice date
- Due date
- Invoice type
- Customer name
- Place of supply
- Invoice status

##### Line Items Table
- Item description
- HSN code
- Quantity
- Rate
- Taxable amount
- GST rate
- IGST, CGST, SGST amounts
- Total amount

##### Invoice Summary
- Subtotal
- Total discount
- Taxable amount
- IGST, CGST, SGST, CESS
- Net total

#### Actions:
- Print (with print-friendly styles)
- Download as JSON
- Cancel E-Invoice (if within 24 hours)
- Back to E-Invoices list

---

### 4. **EInvoiceModal.jsx** - Generation Modal Component
**Location**: `frontend/src/components/EInvoiceModal.jsx`

#### Features:
- Modal dialog for E-Invoice generation
- Shows invoice number
- Displays information about E-Invoicing
- Shows generated E-Invoice details on success
- Displays QR code
- Error handling with user-friendly messages

#### Props:
```javascript
{
  invoiceId: string,           // Required
  invoiceNumber: string,       // Required
  onSuccess: function,         // Callback on success
  onClose: function           // Callback on close
}
```

#### Usage:
```jsx
import EInvoiceModal from '../components/EInvoiceModal';

// In component
<EInvoiceModal
  invoiceId={invoiceId}
  invoiceNumber={invoiceNumber}
  onSuccess={(data) => console.log('E-Invoice generated:', data)}
  onClose={() => setShowModal(false)}
/>
```

---

### 5. **EInvoiceStatusBadge.jsx** - Status Badge Component
**Location**: `frontend/src/components/EInvoiceStatusBadge.jsx`

#### Features:
- Displays E-Invoice status with icon and color
- Shows "Not Generated" if no E-Invoice exists
- Tooltip with description

#### Props:
```javascript
{
  status: string  // PENDING, GENERATED, CANCELLED, or null
}
```

#### Usage:
```jsx
import EInvoiceStatusBadge from '../components/EInvoiceStatusBadge';

<EInvoiceStatusBadge status={invoice.eInvoice?.status} />
```

---

## Integration with Sales Invoices

### 1. Add E-Invoice Button to Sales Invoice Details
```jsx
import EInvoiceModal from '../components/EInvoiceModal';

// In sales-invoice-details.jsx
const [showEInvoiceModal, setShowEInvoiceModal] = useState(false);

// In JSX
<button
  className="btn btn-primary"
  onClick={() => setShowEInvoiceModal(true)}
  disabled={invoice.status !== 'POSTED'}
>
  <i className="fa fa-file-invoice me-2"></i>
  Generate E-Invoice
</button>

<EInvoiceModal
  invoiceId={invoiceId}
  invoiceNumber={invoice.invoiceNumber}
  onSuccess={() => {
    setShowEInvoiceModal(false);
    loadInvoiceDetails();
  }}
  onClose={() => setShowEInvoiceModal(false)}
/>
```

### 2. Add E-Invoice Status to Sales Invoice List
```jsx
import EInvoiceStatusBadge from '../components/EInvoiceStatusBadge';

// In sales-invoices.jsx table
<td>
  <EInvoiceStatusBadge status={invoice.eInvoice?.status} />
</td>
```

### 3. Add E-Invoice Link to Sales Invoice List
```jsx
// In sales-invoices.jsx actions
{invoice.eInvoice && (
  <Link
    to={`/e-invoice-details/${invoice.id}`}
    className="me-2"
    title="View E-Invoice"
  >
    <i className="fa fa-file-invoice"></i>
  </Link>
)}
```

---

## E-Invoice Data Structure

### Invoice Object (Extended)
```javascript
{
  // ... existing invoice fields ...
  eInvoice: {
    irn: string,                    // 64-char hash
    ack_no: string,                 // Acknowledgement number
    ack_date: date,                 // Acknowledgement date
    qr_code: string,                // Base64 encoded QR code
    signed_invoice: string,         // JSON stringified invoice
    status: enum,                   // PENDING, GENERATED, CANCELLED
    generated_at: timestamp,        // Generation timestamp
    cancelled_at: timestamp         // Cancellation timestamp (if cancelled)
  }
}
```

---

## Workflow

### Generate E-Invoice
1. User opens Sales Invoice (must be POSTED status)
2. Clicks "Generate E-Invoice" button
3. Modal opens with confirmation
4. User clicks "Generate E-Invoice"
5. System generates:
   - IRN (64-char hash based on invoice data)
   - QR Code (base64 encoded)
   - Acknowledgement number
   - Acknowledgement date
6. E-Invoice data stored in invoice object
7. User can view, print, or download

### Cancel E-Invoice
1. User opens E-Invoice details
2. Clicks "Cancel E-Invoice" button (only if within 24 hours)
3. System confirms action
4. Status changed to CANCELLED
5. Cancellation timestamp recorded

### Print Invoice with QR Code
1. User opens E-Invoice details
2. Clicks "Print" button
3. QR code displays on printed invoice
4. Print-friendly styles applied

---

## QR Code Display

### Frontend Implementation
```jsx
<img
  src={eInvoice.qr_code}
  alt="E-Invoice QR Code"
  className="img-fluid"
  style={{ maxWidth: '200px' }}
/>
```

### QR Code Data (Mock)
Currently uses placeholder base64 image. For production:

1. **Install QR Code Library**
   ```bash
   npm install qrcode.react
   ```

2. **Generate Real QR Code**
   ```jsx
   import QRCode from 'qrcode.react';

   const qrRef = useRef();

   const generateQRCode = (invoiceData) => {
     const qrData = JSON.stringify({
       irn: invoiceData.irn,
       ack_no: invoiceData.ack_no,
       invoice_no: invoiceData.invoiceNumber,
       date: invoiceData.invoiceDate,
     });

     // Convert to base64
     const canvas = qrRef.current.querySelector('canvas');
     return canvas.toDataURL('image/png');
   };

   // In JSX
   <QRCode
     ref={qrRef}
     value={qrData}
     size={200}
     level="H"
     includeMargin={true}
   />
   ```

---

## Status Badges

| Status | Color | Icon | Meaning |
|--------|-------|------|---------|
| PENDING | Warning (Yellow) | Clock | Awaiting generation |
| GENERATED | Success (Green) | Check Circle | Successfully generated |
| CANCELLED | Danger (Red) | Times Circle | Cancelled within 24 hours |
| Not Generated | Secondary (Gray) | File | No E-Invoice yet |

---

## API Integration (Future)

When backend is ready, replace mock functions in `eInvoiceService.js`:

```javascript
// Replace mock generateEInvoice with:
generateEInvoice: async (invoiceId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/e-invoices/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return { success: true, data: data.eInvoice };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
```

---

## Validation Rules

1. **E-Invoice Generation**
   - Invoice must be in POSTED status
   - Cannot generate if already GENERATED
   - Requires valid invoice data

2. **E-Invoice Cancellation**
   - Only within 24 hours of generation
   - Status must be GENERATED
   - Cannot cancel CANCELLED invoices

3. **QR Code**
   - Must be base64 encoded PNG
   - Minimum 200×200 pixels for printing
   - Contains IRN, Ack No, Invoice No, Date

---

## Error Handling

### Common Errors
- "Invoice not found" - Invoice ID doesn't exist
- "E-Invoice already generated" - Cannot regenerate
- "E-Invoice can only be cancelled within 24 hours" - Time limit exceeded
- "E-Invoice not found" - No E-Invoice for this invoice

### User Feedback
- Success messages with toast notifications
- Error alerts with clear descriptions
- Loading states during API calls
- Disabled buttons during processing

---

## Print Styles

```css
@media print {
  .page-header,
  .btn,
  .table-top-head {
    display: none !important;
  }
  .card {
    page-break-inside: avoid;
  }
  body {
    background: white;
  }
}
```

---

## localStorage Keys

- `salesInvoices` - Array of all sales invoices with eInvoice data

---

## Compliance Notes

- E-Invoicing mandatory for turnover > ₹10 Crore
- IRN is unique identifier for each invoice
- QR code must be printed on invoice
- Cancellation only within 24 hours
- All data must be retained for audit trail
