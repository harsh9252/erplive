# Sales Invoices (GST) - Frontend Implementation

## Overview
Complete frontend implementation for Sales Invoices with GST calculations as per specification.

## Files Created

### 1. **sales-invoices.jsx** - List/Dashboard Page
**Route**: `/sales-invoices`

#### Features:
- **Invoice Statistics Cards**
  - Total Invoices
  - Posted Invoices
  - Paid Invoices
  - Pending Invoices

- **Search & Filter**
  - Search by invoice number or customer name
  - Filter by status (All, Draft, Posted, Paid, Partially Paid, Cancelled)

- **Invoice Table**
  - Invoice Number (clickable to view details)
  - Customer Name with Avatar
  - Invoice Date
  - Due Date
  - Amount (Taxable)
  - GST Amount
  - Net Total
  - Invoice Type (B2B, B2C, EXPORT, SEZ)
  - Status Badge with color coding

- **Action Buttons**
  - View Invoice
  - Edit Invoice
  - Send Invoice (Email)
  - Delete Invoice

- **Pagination**
  - 10 items per page
  - Previous/Next navigation
  - Page number buttons

---

### 2. **add-sales-invoice.jsx** - Create Invoice Form
**Route**: `/add-sales-invoice`

#### Header Fields (13.1 Specification):
| Field | Type | Required | Features |
|-------|------|----------|----------|
| Customer | Select+Search | ✅ | Auto-fills due date based on credit days |
| Invoice No. | Text | ✅ | Auto-generated, editable |
| Invoice Date | Date | ✅ | Auto-calculates due date |
| Due Date | Date | ❌ | Auto = invoice_date + credit_days |
| Invoice Type | Select | ✅ | B2B, B2C, EXPORT, SEZ |
| Place of Supply | Select | ✅ | State codes (MH, GJ, KA, TN, UP, DL) |
| Against Order | Select | ❌ | References sales order |
| Reverse Charge | Checkbox | ❌ | For RCM transactions |

#### Line Items (13.2 Specification):
| Field | Type | Required | Features |
|-------|------|----------|----------|
| Item / Service | Select+Search | ✅ | Auto-fills description & HSN code |
| Description | Text | ❌ | Auto-filled from item selection |
| HSN/SAC Code | Text | ✅ | Required for GST |
| Quantity | Number | ✅ | 3 decimal places |
| Unit (UOM) | Select | ✅ | PCS, KG, LTR, MTR, BOX, SET, PAIR |
| Rate | Number | ✅ | Price per unit |
| Discount % | Number | ❌ | Percentage discount |
| Taxable Amount | Number | Auto | (Qty × Rate) - Discount |
| GST Rate % | Select | ✅ | 0, 3, 5, 12, 18, 28 |
| IGST | Number | Auto | If inter-state |
| CGST | Number | Auto | If intra-state (50% of GST) |
| SGST | Number | Auto | If intra-state (50% of GST) |
| CESS | Number | Auto | If applicable |
| Total Amount | Number | Auto | Taxable + All Taxes |

#### GST Calculation Logic:
```javascript
// Determine inter-state vs intra-state
const isInterState = companyState !== placeOfSupply;

if (isInterState) {
  IGST = Taxable × (GST Rate / 100)
  CGST = 0
  SGST = 0
} else {
  IGST = 0
  CGST = Taxable × (GST Rate / 2 / 100)
  SGST = Taxable × (GST Rate / 2 / 100)
}

// Recalculates automatically when:
// - Place of Supply changes
// - Quantity changes
// - Rate changes
// - Discount changes
// - GST Rate changes
```

#### Invoice Summary (13.3 Specification):
- **Sub-total**: Sum of (Qty × Rate) for all items
- **Total Discount**: Sum of all line discounts
- **Taxable Amount**: Sub-total - Total Discount
- **IGST**: Sum of all IGST amounts
- **CGST**: Sum of all CGST amounts
- **SGST**: Sum of all SGST amounts
- **CESS**: Sum of all CESS amounts
- **Round Off**: Nearest rupee rounding (+/- 0.99)
- **Net Total**: Taxable Amount + All Taxes + Round Off

#### Additional Fields:
- **Remarks**: Textarea for additional notes
- **Terms & Conditions**: Textarea for T&C

#### Actions:
- Add Item (dynamic line items)
- Remove Item (if more than 1 item)
- Create Invoice (submit form)
- Cancel (go back to list)

---

### 3. **edit-sales-invoice.jsx** - Edit Invoice Form
**Route**: `/edit-sales-invoice/:id`

#### Features:
- Same as Add Invoice form
- Pre-filled with existing invoice data
- All calculations work the same way
- Update Invoice button instead of Create

---

### 4. **sales-invoice-details.jsx** - View Invoice
**Route**: `/sales-invoice-details/:id`

#### Display Sections:
1. **Company Information**
   - Company name, address, GSTIN

2. **Bill To (Customer)**
   - Customer name, address, email, phone, GSTIN

3. **Invoice Metadata**
   - Invoice Number
   - Invoice Date
   - Due Date
   - Status (with badge)
   - Invoice Type
   - Place of Supply
   - Reverse Charge (Yes/No)

4. **Line Items Table**
   - All item details in read-only format
   - Complete GST breakdown

5. **Invoice Summary**
   - All calculated totals
   - Read-only display

6. **Remarks & Terms**
   - Display remarks
   - Display terms & conditions

#### Action Buttons:
- Print Invoice
- Send Email
- Edit Invoice
- Back to List

---

## Key Features Implemented

### ✅ Auto-Calculations
- Taxable amount = (Qty × Rate) - Discount
- GST calculations based on inter-state/intra-state
- Line totals with all taxes
- Invoice summary with round-off

### ✅ Smart Defaults
- Invoice date defaults to today
- Due date auto-calculated from customer credit days
- Item selection auto-fills description and HSN code
- Place of supply defaults to company state

### ✅ Dynamic Line Items
- Add unlimited items
- Remove items (minimum 1 required)
- Real-time calculations

### ✅ GST Compliance
- Supports all GST rates (0%, 3%, 5%, 12%, 18%, 28%)
- Inter-state (IGST) vs Intra-state (CGST+SGST) logic
- CESS support
- Round-off to nearest rupee

### ✅ Invoice Status Flow
- DRAFT → POSTED → PAID / PARTIALLY_PAID / CANCELLED

### ✅ Responsive Design
- Mobile-friendly
- Horizontal scroll for large tables
- Bootstrap grid system

---

## Data Structure

### Invoice Object
```javascript
{
  customerId: string,
  invoiceNumber: string,
  invoiceDate: date,
  dueDate: date,
  financialYearId: string,
  salesOrderId: string,
  invoiceType: enum (B2B, B2C, EXPORT, SEZ),
  placeOfSupply: string (state code),
  reverseCharge: boolean,
  remarks: string,
  termsAndConditions: string,
  items: [LineItem],
  summary: InvoiceSummary
}
```

### LineItem Object
```javascript
{
  itemId: string,
  description: string,
  hsnCode: string,
  qty: number,
  uomId: string,
  rate: number,
  discountPct: number,
  discountAmount: number,
  taxableAmount: number,
  gstRate: number,
  igstAmount: number,
  cgstAmount: number,
  sgstAmount: number,
  cessAmount: number,
  totalAmount: number,
  warehouseId: string,
  batchId: string,
  serialNumbers: array
}
```

### InvoiceSummary Object
```javascript
{
  subtotal: number,
  totalDiscount: number,
  taxableAmount: number,
  igst: number,
  cgst: number,
  sgst: number,
  cess: number,
  roundOff: number,
  netTotal: number
}
```

---

## Sample Data Included

### Customers
- Acme Corporation
- Tech Solutions Ltd
- Global Exports Inc
- Local Retail Store

### Items/Services
- Premium Software License (HSN: 9983)
- Technical Support Services (HSN: 9983)
- Consulting Services (HSN: 9983)

### States
- Maharashtra (MH)
- Gujarat (GJ)
- Karnataka (KA)
- Tamil Nadu (TN)
- Uttar Pradesh (UP)
- Delhi (DL)

### UOMs
- PCS (Pieces)
- KG (Kilogram)
- LTR (Liter)
- MTR (Meter)
- BOX
- SET
- PAIR

### Warehouses
- WH-001
- WH-002
- WH-003

---

## Styling & UI

- **Bootstrap 5** for responsive grid
- **Isax Icons** for action buttons
- **Color-coded Status Badges**
  - Draft: Secondary (Gray)
  - Posted: Info (Blue)
  - Paid: Success (Green)
  - Partially Paid: Warning (Orange)
  - Cancelled: Danger (Red)

---

## Browser Compatibility
- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

---

## Notes
- All calculations are real-time
- No backend calls in current implementation
- Ready for API integration
- Form validation included
- Responsive tables with horizontal scroll
- Print-friendly invoice view
