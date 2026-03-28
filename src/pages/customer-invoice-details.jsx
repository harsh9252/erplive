import React from 'react';
import { Link } from 'react-router-dom';

const CustomerInvoiceDetails = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div>
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3">
              <h6>
                <Link to="/customer-invoices">
                  <i className="isax isax-arrow-left me-2"></i>Invoice (Customer)
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
                  <i className="isax isax-money-send5 me-1"></i>Pay Invoice
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="bg-light p-4 rounded position-relative mb-3">
                  <div className="position-absolute top-0 end-0">
                    <img src="/assets/img/bg/card-bg.png" alt="User Img" />
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap mb-3 pb-2">
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
                            alt="User Img"
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
                  <div className="row gy-3">
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
                          <span className="badge bg-danger">Due in 8 days</span>
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
                          <p className="mb-1">GST : 243E45767889</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <h6 className="mb-2 fs-16 fw-semibold">Billing To</h6>
                        <div className="bg-white rounded p-3">
                          <div className="d-flex align-items-center mb-1">
                            <span className="avatar avatar-md border border-gray-100 border-2 me-2">
                              <img src="/assets/img/invoice/timesquare.png" alt="User Img" />
                            </span>
                            <p className="text-dark fw-semibold">Timesquare Tech</p>
                          </div>
                          <p className="mb-1">299 Star Trek Drive, Florida, 3240, USA</p>
                          <p className="mb-1">Phone : +1 54664 75945</p>
                          <p className="mb-1">Email : </p>
                          <p className="mb-1">GST : 243E45767889</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h6 className="mb-3">Product / Service Items</h6>
                  <div className="table-responsive rounded border-bottom-0 border">
                    <table className="table table-nowrap add-table">
                      <thead className="thead-dark">
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
                      <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                        <div className="me-3">
                          <p className="mb-2">Scan to the pay</p>
                          <span>
                            <img src="/assets/img/icons/qr.png" alt="User Img" />
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
                      <div className="mb-3">
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
                          <h6>$1811.12</h6>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">Total In Words</h6>
                          <p>One thousand eight hundred &amp; eleven dollars &amp; twelve cents.</p>
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
            <h6 className="offcanvas-title">Pay Invoice</h6>
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
            <div className="activity-feed bg-light rounded d-flex align-items-center justify-content-between mb-3">
              <div>
                <p className="text-primary fw-semibold mb-1">#INV00001</p>
                <p className="fs-13">
                  Due Date : <span className="text-dark">03 Jun 2025</span>
                </p>
              </div>
              <div>
                <p className="text-dark fw-semibold mb-1">Invoice Total</p>
                <p className="fs-13">$2560.25</p>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Amount to be Paid <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="fs-16">Select a Payment Method</h6>
                <span
                  className="d-flex align-items-center text-dark"
                  data-bs-dismiss="offcanvas"
                  data-bs-toggle="modal"
                  data-bs-target="#add_card"
                >
                  <i className="isax isax-add-circle5 text-primary me-1"></i>Add
                </span>
              </div>
              <div className="border rounded px-3 py-2 mb-2">
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input mt-0"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <div className="ms-2">
                    <label
                      className="form-check-label fw-semibold text-dark"
                      htmlFor="flexRadioDefault1"
                    >
                      Visa *******5658
                    </label>
                    <p className="fs-13 text-gray-5 fw-normal mb-0">Expires on: 12/26</p>
                  </div>
                </div>
              </div>
              <div className="border rounded px-3 py-2 mb-2">
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input mt-0"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <div className="ms-2">
                    <label
                      className="form-check-label fw-semibold text-dark"
                      htmlFor="flexRadioDefault2"
                    >
                      Visa *******5258
                    </label>
                    <p className="fs-13 text-gray-5 fw-normal mb-0">Expires on: 10/26</p>
                  </div>
                </div>
              </div>
              <div className="border rounded px-3 py-2 mb-2 d-flex align-items-center h-60">
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input mt-0"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                  />
                  <div className="ms-2">
                    <label
                      className="form-check-label fw-semibold text-dark"
                      htmlFor="flexRadioDefault3"
                    >
                      Stripe
                    </label>
                  </div>
                </div>
              </div>
              <div className="border rounded px-3 py-2 mb-2 d-flex align-items-center h-60 mb-3">
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input mt-0"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault4"
                  />
                  <div className="ms-2">
                    <label
                      className="form-check-label fw-semibold text-dark"
                      htmlFor="flexRadioDefault4"
                    >
                      Paypal
                    </label>
                  </div>
                </div>
              </div>
              <div className="border-bottom mb-3">
                <h6 className="fs-16 mb-2">Summary</h6>
                <div className=" mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <p className="mb-0">Payment</p>
                    <p>$565</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">Platform Fees</p>
                    <p>$18</p>
                  </div>
                </div>
              </div>
              <div className="mb-3 d-flex align-items-center justify-content-between">
                <h6>Total (USD)</h6>
                <h6>$596</h6>
              </div>
            </div>
            <div className="bg-success-100 p-2 d-flex align-items-center justify-content-center mb-3">
              <i className="isax isax-security-safe5 text-success fs-40 me-2"></i>
              <div>
                <p className="text-dark fw-semibold mb-0">100% Cashback Guarantee</p>
                <p className="fs-13">We Protect Your Money</p>
              </div>
            </div>
            <div className="mb-2">
              <Link href="#"
                className="btn btn-primary w-100 "
                data-bs-toggle="modal"
                data-bs-target="#success_modal"
              >
                Pay Now $596
              </Link>
            </div>
            <div className="offcanvas-footer">
              <button data-bs-dismiss="offcanvas" className="btn btn-outline-white w-100">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal fade" id="add_card">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Card</h5>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => { e.preventDefault(); }}>
                <div className="mb-3">
                  <label className="form-label">
                    Card Number <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Name on Card <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      Expiry Date <span className="text-danger">*</span>
                    </label>
                    <div className="input-group position-relative mb-3">
                      <input type="text" className="form-control datetimepicker rounded-end" />
                      <span className="input-icon-addon fs-16 text-gray-9">
                        <i className="isax isax-calendar-2"></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Security Number <span className="text-danger">*</span>
                    </label>
                    <div className="input-group position-relative mb-3">
                      <input type="text" className="form-control rounded-end" />
                      <span className="input-icon-addon fs-16 text-gray-9">
                        <i className="isax isax-lock-1"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade custom-modal" id="success_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <i className="isax isax-tick-circle5 fs-48 text-success"></i>
              </div>
              <h6 className="mb-1">Payment Successful</h6>
              <p className="mb-3 text-center">
                Your invoice payment has been successfully completed! Reference Number: #INV54896
              </p>
              <div className="d-flex justify-content-center">
                <Link to="/customer-invoices" className="btn btn-outline-white me-3">
                  Back to Invoices
                </Link>
                <Link href="#"
                  className="btn btn-primary close-modal"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas3"
                  onClick="if (!window.__cfRLUnblockHandlers) return false; closeModal()"
                  data-cf-modified-603f446b0167b566e87fbab3-=""
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas3">
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
              <div className="border-bottom mb-3 pb-3">
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
                        15 Days <span className="badge bg-danger ms-2">Due in 8 days</span>
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
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerInvoiceDetails;
