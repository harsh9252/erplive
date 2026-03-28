import React from 'react';

const Timeline = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="mb-3 border-bottom pb-3">
            <h6 className="mb-0">Timeline</h6>
          </div>
          <div className="card mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <p className="text-dark me-4 mb-0 timeline-date flex-shrink-0">07 Apr 2025</p>
                <div className="border-start ps-4 py-4 border-circle position-relative">
                  <p className="text-dark fw-semibold mb-1">Invoice Marked as Paid</p>
                  <p>Status updated to Paid</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="text-dark me-4 mb-0 timeline-date flex-shrink-0">07 Apr 2025</p>
                <div className="border-start ps-4 py-4 border-circle position-relative">
                  <p className="text-dark fw-semibold mb-1">Payment Received</p>
                  <p>Payment received for Invoice #INV-1025</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="text-dark me-4 mb-0 timeline-date flex-shrink-0">03 Apr 2025</p>
                <div className="border-start ps-4 py-4 border-circle position-relative">
                  <p className="text-dark fw-semibold mb-1">Invoice Sent to Client</p>
                  <p>Invoice #INV-1025 emailed to </p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="text-dark me-4 mb-0 timeline-date flex-shrink-0">02 Apr 2025</p>
                <div className="border-start ps-4 py-4 border-circle position-relative">
                  <p className="text-dark fw-semibold mb-1">Invoice Approved</p>
                  <p>Invoice #INV-1025 approved for processing</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="text-dark me-4 mb-0 timeline-date flex-shrink-0">01 Apr 2025</p>
                <div className="border-start ps-4 py-4 border-circle position-relative">
                  <p className="text-dark fw-semibold mb-1">Invoice Created</p>
                  <p>Invoice #INV-1025 was generated for Client: ABC Corp.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;
