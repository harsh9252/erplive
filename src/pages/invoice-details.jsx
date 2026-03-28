import React from 'react';
import { Link } from 'react-router-dom';

const InvoiceDetails = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div>
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3">
              <h6>
                <Link to="/invoice">
                  <i className="isax isax-arrow-left me-2"></i>Invoice (Admin)
                </Link>
              </h6>
              <div className="d-flex align-items-center flex-wrap row-gap-3">
                <Link href="#" className="btn btn-outline-white d-inline-flex align-items-center me-3">
                  <i className="isax isax-document-like me-1"></i>Download PDF
                </Link>
                <Link href="#" className="btn btn-outline-white d-inline-flex align-items-center me-3">
                  <i className="isax isax-message-notif me-1"></i>Send Email
                </Link>
                <Link href="#" className="btn btn-outline-white d-inline-flex align-items-center me-3">
                  <i className="isax isax-printer me-1"></i>Print
                </Link>
                <Link
                  href="#"
                  className="btn btn-primary d-inline-flex align-items-center"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas"
                >
                  <i className="isax isax-eye me-1"></i>View Details
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="bg-light p-4 rounded position-relative mb-3">
                  <div className="position-absolute top-0 end-0 z-0">
                    <img src="/assets/img/bg/card-bg.png" alt="img" />
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap mb-3 pb-2 position-relative z-1">
                    <div className="mb-3">
                      <h4 className="mb-1">Invoice</h4>
                      <div className="d-flex align-items-center flex-wrap row-gap-3">
                        <div className="me-4">
                          <h6 className="fs-14 fw-semibold mb-1">Dreams Technologies Pvt Ltd.,</h6>
                          <p>15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom</p>
                        </div>
                        <span>
                          <img
                            src="/assets/img/icons/not-paid.png"
                            alt="img"
                            width="48"
                            height="48"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <img
                        src="/assets/img/invoice-logo.svg"
                        className="invoice-logo-dark"
                        alt="img"
                      />
                      <img
                        src="/assets/img/invoice-logo-white-2.svg"
                        className="invoice-logo-white"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className="row gy-3 position-relative z-1">
                    <div className="col-lg-4">
                      <div>
                        <h6 className="mb-2 fs-16 fw-semibold">Invoice Details</h6>
                        <div>
                          <p className="mb-1">
                            Invoice Number : <span className="text-dark">INV215654</span>
                          </p>
                          <p className="mb-1">
                            Issued On : <span className="text-dark">25 Jan 2025</span>
                          </p>
                          <p className="mb-1">
                            Due Date : <span className="text-dark">31 Jan 2025</span>
                          </p>
                          <p className="mb-1">
                            Recurring Invoice : <span className="text-dark">Monthly</span>
                          </p>
                          <span className="badge bg-danger badge-sm">Due in 8 days</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <h6 className="mb-2 fs-16 fw-semibold">Billing From</h6>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">Kanakku Invoice Management</h6>
                          <p className="mb-1">15 Hodges Mews, HP12 3JL, United Kingdom</p>
                          <p className="mb-1">Phone : +1 54664 75945</p>
                          <p className="mb-1">Email : </p>
                          <p className="mb-0">GST : 243E45767889</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <h6 className="mb-2 fs-16 fw-semibold">Billing To</h6>
                        <div className="bg-white rounded p-3">
                          <div className="d-flex align-items-center mb-1">
                            <img
                              src="/assets/img/icons/billing-to-image.svg"
                              alt="img"
                              className="avatar avatar-lg me-2"
                            />
                            <div>
                              <h6 className="fs-14 fw-semibold">Timesquare Tech</h6>
                            </div>
                          </div>
                          <p className="mb-1">299 Star Trek Drive, Florida, 3240, USA</p>
                          <p className="mb-1">Phone : +1 54664 75945</p>
                          <p className="mb-1">Email : </p>
                          <p className="mb-0">GST : 243E45767889</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h6 className="mb-3">Product / Service Items</h6>
                  <div className="table-responsive rounded border-bottom-0 border table-nowrap">
                    <table className="table m-0">
                      <thead className="table-dark">
                        <tr>
                          <th>#</th>
                          <th>Product/Service</th>
                          <th>Quantity</th>
                          <th>Unit</th>
                          <th>Rate</th>
                          <th>Discount</th>
                          <th>Tax (%)</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td className="text-dark">T-Shirt</td>
                          <td>2</td>
                          <td>Pcs</td>
                          <td>$200.00</td>
                          <td>10%</td>
                          <td>$36.00</td>
                          <td>$396.00</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td className="text-dark">Office Chair</td>
                          <td>1</td>
                          <td>Pcs</td>
                          <td>$350.00</td>
                          <td>5%</td>
                          <td>$33.25</td>
                          <td>$365.75</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td className="text-dark">LED Monitor</td>
                          <td>1</td>
                          <td>Pcs</td>
                          <td>$399.00</td>
                          <td>2%</td>
                          <td>$39.10</td>
                          <td>$398.90</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td className="text-dark">Smartphone</td>
                          <td>4</td>
                          <td>Pcs</td>
                          <td>$100.00</td>
                          <td>10%</td>
                          <td>$36.00</td>
                          <td>$396.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="border-bottom mb-3">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="d-flex align-items-center p-4 mb-3">
                        <div className="me-3">
                          <p className="mb-2">Scan to the pay</p>
                          <span>
                            <img src="/assets/img/icons/qr.png" alt="QR" />
                          </span>
                        </div>
                        <div>
                          <h6 className="mb-2">Bank Details</h6>
                          <div>
                            <p className="mb-1">
                              Bank Name : <span className="text-dark">ABC Bank</span>
                            </p>
                            <p className="mb-1">
                              Account Number : <span className="text-dark">782459739212</span>
                            </p>
                            <p className="mb-1">
                              IFSC Code : <span className="text-dark">ABC0001345</span>
                            </p>
                            <p className="mb-0">
                              Payment Reference :{' '}
                              <span className="text-dark">INV-20250220-001</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3 p-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 fw-semibold">Amount</h6>
                          <h6 className="fs-14 fw-semibold">$1,793.12</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 fw-semibold">CGST (9%)</h6>
                          <h6 className="fs-14 fw-semibold">$18</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 fw-semibold">SGST (9%)</h6>
                          <h6 className="fs-14 fw-semibold">$18</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                          <h6 className="fs-14 fw-semibold">Discount</h6>
                          <h6 className="fs-14 fw-semibold text-danger">$18</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                          <h6>Total (USD)</h6>
                          <h6>$1,972.43</h6>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">Total In Words</h6>
                          <p>Five Hundred &amp; Ninety Six Dollars</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="mb-3">
                      <div className="mb-3">
                        <h6 className="fs-14 fw-semibold mb-1">Terms and Conditions</h6>
                        <p>The Payment must be returned in the same condition.</p>
                      </div>
                      <div>
                        <h6 className="fs-14 fw-semibold mb-1">Notes</h6>
                        <p>
                          All charges are final and include applicable taxes, fees, and additional
                          costs
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="text-lg-end mb-3">
                      <span>
                        <img src="/assets/img/icons/sign.png" className="sign-dark" alt="img" />
                      </span>
                      <h6 className="fs-14 fw-semibold mb-1">Ted M. Davis</h6>
                      <p>Manager</p>
                    </div>
                  </div>
                </div>
                <div className="bg-light d-flex align-items-center justify-content-between p-4 rounded card-bg">
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">Dreams Technologies Pvt Ltd.,</h6>
                    <p>15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom</p>
                  </div>
                  <div>
                    <img
                      src="/assets/img/invoice-logo.svg"
                      className="invoice-logo-dark"
                      alt="img"
                    />
                    <img
                      src="/assets/img/invoice-logo-white-2.svg"
                      className="invoice-logo-white"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas">
        <div className="offcanvas-header d-block pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
            <h6 className="offcanvas-title">Details</h6>
            <button
              type="button"
              className="btn-close btn-close-modal custom-btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
        <div className="offcanvas-body pt-3">
          <form action="#">
            <div className="mb-3">
              <label className="form-label">Status</label>
              <div className="dropdown">
                <Link href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <ul className="mb-3">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-success me-1"></i>Paid
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-warning me-1"></i>Unpaid
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-danger me-1"></i>Cancelled
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-purple me-1"></i>Partially Paid
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-orange me-1"></i>Uncollectable
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h6 className="fs-16 fw-semibold mb-2">Payment Details</h6>
              <div className="border-bottom mb-3 pb-0">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <h6 className="fs-14 fw-semibold mb-1">PayPal</h6>
                      <p>examplepaypal.com</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <h6 className="fs-14 fw-semibold mb-1">Account </h6>
                      <p>examplepaypal.com</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <h6 className="fs-14 fw-semibold mb-1">Payment Term</h6>
                      <p className="d-flex align-items-center">
                        Days <span className="badge bg-danger ms-2">Due in 8 days</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h6 className="fs-16 mb-2">Invoice History</h6>
              <ul className="activity-feed bg-light rounded">
                <li className="feed-item timeline-item">
                  <p className="mb-1">
                    Status Changed to <span className="text-dark fw-semibold">Partially Paid</span>
                  </p>
                  <div className="invoice-date">
                    <span>
                      <i className="isax isax-calendar me-1"></i>17 Jan 2025
                    </span>
                  </div>
                </li>
                <li className="feed-item timeline-item">
                  <p className="mb-1">
                    <span className="text-dark fw-semibold">$300 </span> Partial Amount Paid on{' '}
                    <span className="text-dark fw-semibold">Paypal</span>
                  </p>
                  <div className="invoice-date">
                    <span>
                      <i className="isax isax-calendar me-1"></i>16 Jan 2025
                    </span>
                  </div>
                </li>
                <li className="feed-item timeline-item">
                  <p className="mb-1">
                    <span className="text-dark fw-semibold">John Smith </span> Created{' '}
                    <span className="text-dark fw-semibold">Invoice</span>
                    <Link href="#" className="text-primary">
                      #INV1254
                    </Link>
                  </p>
                  <div className="invoice-date">
                    <span>
                      <i className="isax isax-calendar me-1"></i>16 Jan 2025
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="offcanvas-footer">
              <div className="row g-2">
                <div className="col-6">
                  <Link href="#" className="btn btn-outline-white w-100">
                    Reset
                  </Link>
                </div>
                <div className="col-6">
                  <button
                    data-bs-dismiss="offcanvas"
                    className="btn btn-primary w-100"
                    id="filter-submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetails;
