# E-Invoice Setup Guide

## Installation

The qrcode package has been added to `package.json`. Install dependencies:

```bash
cd frontend
npm install
```

## Features Implemented

### 1. E-Invoice Generation
- **Auto-populate from Sales Invoices**: All invoice data is automatically pulled from existing sales invoices
- **Unique IRN Generation**: Each e-invoice gets a 64-character unique IRN hash
- **Acknowledgement Numbers**: Auto-generated ACK numbers with timestamps
- **QR Code Generation**: Base64 encoded QR codes containing invoice verification data
- **Digital Signature**: JSON representation of the invoice with timestamp

### 2. E-Invoice Fields

| Field | Value | Example |
|-------|-------|---------|
| `irn` | 64-char hash | `a1b2c3d4e5f6...` (64 chars) |
| `ack_no` | ACK + timestamp | `ACK1234567890` |
| `ack_date` | Current date | `2025-02-27` |
| `qr_code` | Base64 image | `data:image/png;base64,...` |
| `signed_invoice` | JSON string | `{"invoice_number":"INV-001",...}` |
| `status` | GENERATED/CANCELLED | `GENERATED` |

### 3. Pages & Routes

#### `/e-invoices` - E-Invoice Management
- **Tab 1: Generated E-Invoices**
  - View all generated e-invoices
  - See IRN, Ack No, Status
  - Click "View" to see full details

- **Tab 2: Generate New**
  - List of invoices without e-invoices
  - Click "Generate" to create new e-invoice

#### `/e-invoice-generate/:invoiceId` - Generate E-Invoice
- Shows source invoice details
- Displays form to generate e-invoice
- Shows generated IRN, Ack No, QR code
- Options to view or cancel

#### `/e-invoice-details/:eInvoiceId` - View E-Invoice
- Complete e-invoice information
- QR code display
- Download options:
  - Download JSON (signed invoice)
  - Download QR Code (PNG)
- Print functionality
- Cancel option

#### `/eway-bills` - E-Way Bills
- List of generated e-way bills
- Create new e-way bill button

#### `/add-eway-bill` - Create E-Way Bill
- Form to create new e-way bill
- Auto-save to localStorage

## Data Storage (localStorage)

### salesInvoices
```javascript
{
  id: "INV-001",
  invoiceNumber: "INV-001",
  customer: "Emily Clark",
  invoiceDate: "2025-02-20",
  netTotal: 15000,
  status: "Paid",
  eInvoice: "EINV-1234567890" // Reference to generated e-invoice
}
```

### eInvoices
```javascript
{
  id: "EINV-1234567890",
  invoiceId: "INV-001",
  invoiceNumber: "INV-001",
  customer: "Emily Clark",
  netTotal: 15000,
  irn: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2",
  ack_no: "ACK1234567890",
  ack_date: "2025-02-27",
  qr_code: "data:image/png;base64,...",
  signed_invoice: "{\"invoice_number\":\"INV-001\",...}",
  status: "GENERATED",
  created_at: "2025-02-27T10:30:00.000Z"
}
```

### eWayBills
```javascript
{
  id: "EWB-001",
  from_gstin: "27AABCT1234H1Z0",
  to_gstin: "29AABCT5678H1Z0",
  distance_km: 1400,
  from_state: "Maharashtra",
  to_state: "Delhi",
  status: "DRAFT",
  created_at: "2025-02-27T10:30:00.000Z"
}
```

## Navigation

### From Dashboard
1. Click "Create New" dropdown
2. Select "E-Invoice" → Goes to `/e-invoices`
3. Or select "E-Way Bill" → Goes to `/add-eway-bill`

### From Sidebar
1. Click "GST" menu
2. Select "E-Invoice" → Goes to `/e-invoices`
3. Or select "E-Way Bill" → Goes to `/eway-bills`

## Workflow

### Generate E-Invoice
1. Go to `/e-invoices`
2. Click "Generate New" tab
3. Select an invoice from the list
4. Click "Generate" button
5. Review generated e-invoice details
6. Download QR code or JSON if needed
7. Click "View All E-Invoices" to go back

### View Generated E-Invoice
1. Go to `/e-invoices`
2. Click "Generated E-Invoices" tab
3. Click "View" button on any e-invoice
4. See full details including QR code
5. Download or print as needed

### Create E-Way Bill
1. Go to `/eway-bills`
2. Click "Create" button
3. Fill in the form:
   - From GSTIN
   - To GSTIN
   - From State
   - To State
   - Distance (KM)
4. Click "Create" button
5. E-Way Bill saved to localStorage

## Sample Data

The app initializes with sample data:

### Sample Sales Invoices (5)
- INV-001: Emily Clark - ₹15,000
- INV-002: John Carter - ₹25,750
- INV-003: Sophia White - ₹120,500
- INV-004: Michael Johnson - ₹750,300
- INV-005: Daniel Martinez - ₹999,999

### Sample E-Way Bills (2)
- EWB-001: Maharashtra to Delhi - 1400 KM
- EWB-002: Maharashtra to Karnataka - 1200 KM

## No Backend Required

All operations are performed client-side using localStorage:
- ✅ Generate IRN
- ✅ Generate Ack Numbers
- ✅ Create QR Codes
- ✅ Store e-invoices
- ✅ Download files
- ✅ Print documents

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ❌ Not supported (uses modern JavaScript)

## Troubleshooting

### QR Code not showing
- Check browser console for errors
- Ensure qrcode package is installed: `npm install qrcode`

### Data not persisting
- Check browser localStorage is enabled
- Clear cache and reload if needed

### Download not working
- Check browser download settings
- Ensure pop-ups are not blocked

## Future Enhancements

- Backend integration for real IRN generation
- Digital signature with certificates
- GSTR-1 filing integration
- E-way bill API integration
- Batch e-invoice generation
- Email delivery of e-invoices
