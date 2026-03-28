# Sales Invoice - E-Invoice Integration Guide

## Quick Integration Steps

### Step 1: Update Sales Invoice Details Page
**File**: `frontend/src/pages/sales-invoice-details.jsx`

Add these imports at the top:
```jsx
import EInvoiceModal from '../components/EInvoiceModal';
import EInvoiceStatusBadge from '../components/EInvoiceStatusBadge';
```

Add state for modal:
```jsx
const [showEInvoiceModal, setShowEInvoiceModal] = useState(false);
```

Add E-Invoice status display in the invoice header:
```jsx
<div className="row mb-3">
  <div className="col-md-6">
    {/* existing fields */}
  </div>
  <div className="col-md-6">
    <div className="mb-2">
      <strong>E-Invoice Status:</strong>
      <br />
      <EInvoiceStatusBadge status={invoice.eInvoice?.status} />
    </div>
  </div>
</div>
```

Add E-Invoice button in actions:
```jsx
<div className="action-buttons">
  {invoice.status === 'POSTED' && !invoice.eInvoice && (
    <button
      className="btn btn-primary me-2"
      onClick={() => setShowEInvoiceModal(true)}
    >
      <i className="fa fa-file-invoice me-2"></i>
      Generate E-Invoice
    </button>
  )}
  
  {invoice.eInvoice && (
    <Link
      to={`/e-invoice-details/${invoice.id}`}
      className="btn btn-info me-2"
    >
      <i className="fa fa-file-invoice me-2"></i>
      View E-Invoice
    </Link>
  )}
  
  {/* existing buttons */}
</div>
```

Add modal component at the end:
```jsx
<EInvoiceModal
  invoiceId={invoice.id}
  invoiceNumber={invoice.invoiceNumber}
  onSuccess={() => {
    setShowEInvoiceModal(false);
    loadInvoiceDetails();
  }}
  onClose={() => setShowEInvoiceModal(false)}
/>
```

---

### Step 2: Update Sales Invoices List Page
**File**: `frontend/src/pages/sales-invoices.jsx`

Add import:
```jsx
import EInvoiceStatusBadge from '../components/EInvoiceStatusBadge';
```

Add E-Invoice Status column to table header:
```jsx
<thead>
  <tr>
    {/* existing columns */}
    <th>E-Invoice Status</th>
    <th>Actions</th>
  </tr>
</thead>
```

Add E-Invoice Status column to table body:
```jsx
<tbody>
  {paginatedInvoices.map((invoice) => (
    <tr key={invoice.id}>
      {/* existing cells */}
      <td>
        <EInvoiceStatusBadge status={invoice.eInvoice?.status} />
      </td>
      <td>
        <div className="action-table-data">
          <Link to={`/sales-invoice-details/${invoice.id}`} className="me-2">
            <i className="fa fa-eye"></i>
          </Link>
          {invoice.eInvoice && (
            <Link
              to={`/e-invoice-details/${invoice.id}`}
              className="me-2"
              title="View E-Invoice"
            >
              <i className="fa fa-file-invoice"></i>
            </Link>
          )}
          {/* existing actions */}
        </div>
      </td>
    </tr>
  ))}
</tbody>
```

---

### Step 3: Update App Routes
**File**: `frontend/src/App.jsx`

Add route imports:
```jsx
import EInvoices from './pages/e-invoices';
import EInvoiceDetails from './pages/e-invoice-details';
```

Add routes in your router configuration:
```jsx
<Route path="/e-invoices" element={<EInvoices />} />
<Route path="/e-invoice-details/:invoiceId" element={<EInvoiceDetails />} />
```

---

### Step 4: Update Navigation Menu
**File**: `frontend/src/components/Sidebar.jsx` or your navigation component

Add E-Invoice menu item under GST section:
```jsx
<li className="submenu">
  <Link href="#" className="subdrop">
    <i className="fa fa-file-invoice me-2"></i>
    <span>GST</span>
  </Link>
  <ul>
    <li>
      <Link to="/sales-invoices">Sales Invoices</Link>
    </li>
    <li>
      <Link to="/e-invoices">E-Invoices</Link>
    </li>
    {/* other GST items */}
  </ul>
</li>
```

---

## Data Flow Diagram

```
Sales Invoice (POSTED)
        ↓
    [Generate E-Invoice Button]
        ↓
    EInvoiceModal Opens
        ↓
    User Confirms
        ↓
    eInvoiceService.generateEInvoice()
        ↓
    Generate IRN + QR Code
        ↓
    Store in localStorage
        ↓
    Update Invoice Object
        ↓
    Display Success Message
        ↓
    User can:
    - View E-Invoice Details
    - Print with QR Code
    - Download JSON
    - Cancel (within 24 hours)
```

---

## Sample Invoice Object with E-Invoice

```javascript
{
  id: 'SI-001',
  invoiceNumber: 'INV-2025-001',
  customer: 'Acme Corporation',
  invoiceDate: '2025-02-20',
  dueDate: '2025-03-04',
  status: 'POSTED',
  invoiceType: 'B2B',
  placeOfSupply: 'MH',
  items: [
    {
      itemId: '1',
      description: 'Premium Software License',
      hsnCode: '9983',
      qty: 1,
      rate: 50000,
      taxableAmount: 50000,
      gstRate: 18,
      igstAmount: 0,
      cgstAmount: 4500,
      sgstAmount: 4500,
      totalAmount: 59000
    }
  ],
  summary: {
    subtotal: 50000,
    totalDiscount: 0,
    taxableAmount: 50000,
    igst: 0,
    cgst: 4500,
    sgst: 4500,
    cess: 0,
    roundOff: 0,
    netTotal: 59000
  },
  eInvoice: {
    irn: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
    ack_no: 'ACK123456789',
    ack_date: '2025-02-20',
    qr_code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    signed_invoice: '{"invoiceNumber":"INV-2025-001",...}',
    status: 'GENERATED',
    generated_at: '2025-02-20T10:30:00Z'
  }
}
```

---

## Testing Checklist

- [ ] Generate E-Invoice for POSTED invoice
- [ ] View E-Invoice details page
- [ ] QR code displays correctly
- [ ] Download E-Invoice as JSON
- [ ] Cancel E-Invoice within 24 hours
- [ ] Cannot cancel after 24 hours
- [ ] E-Invoice status shows in sales invoice list
- [ ] E-Invoice status shows in sales invoice details
- [ ] Print invoice with QR code
- [ ] Search E-Invoices by invoice number
- [ ] Search E-Invoices by customer name
- [ ] Search E-Invoices by IRN
- [ ] Filter E-Invoices by status
- [ ] Pagination works correctly
- [ ] Error messages display properly

---

## Troubleshooting

### E-Invoice button not showing
- Check if invoice status is POSTED
- Check if eInvoice component is imported
- Verify button condition: `invoice.status === 'POSTED' && !invoice.eInvoice`

### QR code not displaying
- Check if qr_code is valid base64 string
- Verify image format is PNG
- Check browser console for errors

### Cannot cancel E-Invoice
- Check if within 24 hours of generation
- Verify status is GENERATED (not CANCELLED)
- Check browser console for error messages

### Data not persisting
- Verify localStorage is enabled
- Check if salesInvoices key exists in localStorage
- Verify invoice object structure matches expected format

---

## Future Enhancements

1. **Real QR Code Generation**
   - Install `qrcode.react` library
   - Generate actual QR codes instead of placeholders

2. **Backend Integration**
   - Replace mock functions with API calls
   - Integrate with NIC IRP API
   - Store E-Invoice data in database

3. **Email Integration**
   - Send E-Invoice via email
   - Include QR code in email

4. **Bulk Operations**
   - Generate E-Invoices for multiple invoices
   - Bulk cancel E-Invoices

5. **Audit Trail**
   - Log all E-Invoice operations
   - Track who generated/cancelled E-Invoices

6. **Compliance Reports**
   - E-Invoice generation report
   - Cancellation report
   - Compliance audit trail
