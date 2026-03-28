import React from 'react';
import FileAttachments from '../components/FileAttachments';

const FileAttachmentsPage = () => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                <div>
                    <h6>File Attachments</h6>
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
        </>
    );
};

export default FileAttachmentsPage;
