import FileAttachments from '../components/FileAttachments';

const AttachmentsDemo = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>File Attachments Demo</h6>
          <p className="text-muted fs-13">Upload and manage file attachments for invoices, vouchers, and other documents</p>
        </div>
      </div>

      <div className="row">
        {/* Sales Invoice Attachments */}
        <div className="col-lg-6">
          <div className="mb-4">
            <h6 className="mb-3">Sales Invoice #INV-001</h6>
            <FileAttachments entity="sales_invoice" entityId={1} />
          </div>
        </div>

        {/* Voucher Attachments */}
        <div className="col-lg-6">
          <div className="mb-4">
            <h6 className="mb-3">Voucher #VOU-001</h6>
            <FileAttachments entity="voucher" entityId={1} />
          </div>
        </div>

        {/* Purchase Order Attachments */}
        <div className="col-lg-6">
          <div className="mb-4">
            <h6 className="mb-3">Purchase Order #PO-001</h6>
            <FileAttachments entity="purchase_order" entityId={1} />
          </div>
        </div>

        {/* Delivery Challan Attachments */}
        <div className="col-lg-6">
          <div className="mb-4">
            <h6 className="mb-3">Delivery Challan #DC-001</h6>
            <FileAttachments entity="delivery_challan" entityId={1} />
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="card mt-4">
        <div className="card-body">
          <h6 className="card-title mb-3">Usage Instructions</h6>
          <div className="row">
            <div className="col-md-6">
              <h6 className="fw-medium mb-2">Supported File Types:</h6>
              <ul className="fs-13 mb-3">
                <li>PDF (.pdf)</li>
                <li>Images (.jpg, .jpeg, .png)</li>
                <li>Excel (.xlsx)</li>
                <li>CSV (.csv)</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6 className="fw-medium mb-2">Constraints:</h6>
              <ul className="fs-13">
                <li>Maximum file size: 10MB</li>
                <li>Multiple files can be uploaded at once</li>
                <li>Files are stored in browser localStorage</li>
                <li>Each entity can have multiple attachments</li>
              </ul>
            </div>
          </div>

          <h6 className="fw-medium mt-3 mb-2">How to Use in Your Forms:</h6>
          <pre className="bg-light p-3 rounded fs-12"><code>{`import FileAttachments from '../components/FileAttachments';

// In your form component:
<FileAttachments 
  entity="sales_invoice"  // Entity type
  entityId={invoiceId}    // Unique ID of the entity
/>

// Supported entities:
// - sales_invoice
// - purchase_order
// - voucher
// - delivery_challan
// - credit_note
// - debit_note
// - quotation
// - expense
// - etc.`}</code></pre>
        </div>
      </div>
    </>
  );
};

export default AttachmentsDemo;
