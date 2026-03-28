import React from 'react';
import { Link } from 'react-router-dom';

const GeneralInvoice8 = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="mb-3">
            <h6>
              <Link to="/invoice-templates">
                <i className="isax isax-arrow-left me-1"></i>Back
              </Link>
            </h6>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between rounded flex-wrap row-gap-3 mb-2">
              <h5 className="text-primary">Invoice</h5>
              <div>
                <div className="mb-1">
                  <img src="/assets/img/invoice-logo.svg" alt="User Img" />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="mb-2">
                  <h6 className="fs-16 mb-1">Dreamstechnologies</h6>
                  <p className="mb-1">
                    GST IN : <span className="text-dark">22AABCU9603R1ZX</span>
                  </p>
                  <p className="mb-1">
                    Address :{' '}
                    <span className="text-dark">
                      15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom.
                    </span>
                  </p>
                  <p className="mb-1">
                    Mobile : <span className="text-dark">+91 98765 43210</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="card rounded-0 shadow-none mb-3 border-bottom">
              <div className="card-body p-0">
                <div className="row gx-0">
                  <div className="col-lg-7 d-flex">
                    <div className="p-3 border-end flex-fill">
                      <div className="mb-3">
                        <h6 className="fs-16 text-gray-5 mb-2">Billing Address :</h6>
                        <div>
                          <p className="mb-0 text-dark">Walter Roberson</p>
                          <p className="mb-0 text-dark">
                            299 Star Trek Drive, Panama City, Florida, 32405, USA.
                          </p>
                          <p className="mb-0 text-dark"></p>
                          <p className="mb-0 text-dark">+45 5421 4523</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <h6 className="fs-16 text-gray-5 mb-2">Shipping Address :</h6>
                        <div>
                          <p className="mb-0 text-dark">Walter Roberson</p>
                          <p className="mb-0 text-dark">
                            299 Star Trek Drive, Panama City, Florida, 32405, USA.
                          </p>
                          <p className="mb-0 text-dark"></p>
                          <p className="mb-0 text-dark">+45 5421 4523</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 d-flex">
                    <div className="row flex-fill gx-0 align-items-center">
                      <div className="col-md-6">
                        <div className="border-end border-bottom text-center p-3">
                          <span className="d-block mb-1">Invoice No:</span>
                          <p className="fw-semibold text-primary">#10077005</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="border-bottom text-center p-3">
                          <span className="d-block mb-1">Invoice Date:</span>
                          <p className="fw-semibold text-primary">07/12/2023</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="border-end p-3">
                          <div className="text-center">
                            <span className="d-block mb-1">Payment Status :</span>
                            <p className="fw-semibold text-primary">NOT PAID</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-3">
                          <div className="text-center">
                            <span className="d-block mb-1">Due Date:</span>
                            <p className="fw-semibold text-primary">07/31/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>#</th>
                    <th>Tax Value</th>
                    <th>Qty</th>
                    <th>Tax Value</th>
                    <th>Discount</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-dark">1</td>
                    <td>Accounting Software Maintainence</td>
                    <td className="text-dark">1</td>
                    <td>
                      <div>
                        <span className="d-block mb-1">$500</span>
                        <p className="text-primary">after disc. $450.00</p>
                      </div>
                    </td>
                    <td className="text-dark">10%</td>
                    <td className="text-dark text-end">$350</td>
                  </tr>
                  <tr>
                    <td className="text-dark">2</td>
                    <td>Man Power Support</td>
                    <td className="text-dark">1</td>
                    <td>
                      <div>
                        <span className="d-block">$100</span>
                      </div>
                    </td>
                    <td className="text-dark">10%</td>
                    <td className="text-dark text-end">$600</td>
                  </tr>
                  <tr>
                    <td className="text-dark">3</td>
                    <td>Transportation Fee</td>
                    <td className="text-dark">2</td>
                    <td>
                      <div>
                        <span className="d-block mb-1">$500</span>
                        <p className="text-primary">after disc. $450.00</p>
                      </div>
                    </td>
                    <td className="text-dark">10%</td>
                    <td className="text-dark text-end">$400</td>
                  </tr>
                  <tr>
                    <td className="text-dark">4</td>
                    <td>Spars Replacement Charges</td>
                    <td className="text-dark">3</td>
                    <td>
                      <div>
                        <span className="d-block">$100</span>
                      </div>
                    </td>
                    <td className="text-dark">10%</td>
                    <td className="text-dark text-end">$300</td>
                  </tr>
                  <tr>
                    <td className="text-dark">5</td>
                    <td>Materials Handling</td>
                    <td className="text-dark">3</td>
                    <td>
                      <div>
                        <span className="d-block mb-1">$500</span>
                        <p className="text-primary">after disc. $450.00</p>
                      </div>
                    </td>
                    <td className="text-dark">10%</td>
                    <td className="text-dark text-end">$300</td>
                  </tr>
                  <tr>
                    <td colspan="4"></td>
                    <td className="text-dark">
                      <div>
                        <h6 className="fs-14 fw-medium mb-2 pb-2">Taxable Amount</h6>
                        <h6 className="fs-14 fw-medium mb-2 pb-2">IGST 18.0%</h6>
                        <h6 className="fs-14 fw-medium mb-2 pb-2">Extra Discount Promo (5%)</h6>
                        <h6 className="fs-14 fw-medium mb-0">Round Off</h6>
                      </div>
                    </td>
                    <td className="text-dark text-end fw-medium">
                      <div>
                        <h6 className="fs-14 fw-medium mb-2 pb-2">$1650.00</h6>
                        <h6 className="fs-14 fw-medium mb-2 pb-2">$165.00</h6>
                        <h6 className="fs-14 fw-medium mb-2 pb-2">$165.00</h6>
                        <h6 className="fs-14 fw-medium mb-0">$165.00</h6>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="py-3 border-top-0 border-bottom mb-3 d-flex align-items-center justify-content-between">
              <p className="text-dark">
                Total amount ( in words): <br /> One Thousand Eight Hundred Fifteen Dollars Only.
              </p>
              <div className="d-flex align-items-center">
                <span className="border-end-0"></span>
                <span className="text-dark fw-medium border-end-0 border-start-0 text-center me-2">
                  <h6>Amount Payable</h6>
                </span>
                <span className="text-dark text-end fw-medium border-start-0">
                  <h6>$1,815.00</h6>
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between flex-wrap border-bottom mb-3">
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <h6 className="mb-2">Bank Details</h6>
                    <p className="mb-1">
                      Bank Name : <span className="text-dark">YES Bank</span>
                    </p>
                    <p className="mb-1">
                      Account # : <span className="text-dark">6677889944551</span>
                    </p>
                    <p className="mb-1">
                      IFSC : <span className="text-dark">YESBBIN4567</span>
                    </p>
                    <p className="mb-0">
                      BRANCH : <span className="text-dark">RS Puram</span>
                    </p>
                  </div>
                  <div className="me-4">
                    <span className="d-block mb-2">
                      <img src="/assets/img/icons/qr.png" alt="User Img" />
                    </span>
                    <p className="text-dark">Scan to View Receipt</p>
                  </div>
                </div>
              </div>
              <div className="text-center mb-3">
                <p className="mb-1">For Dreamstechnologies</p>
                <span>
                  <img src="/assets/img/icons/sign-01.png" alt="User Img" />
                </span>
              </div>
            </div>
            <div className="border-bottom mb-3">
              <p className="bg-primary-subtle p-2 text-dark fs-13 mb-3">
                NOTES: All accounts are to be paid within 7 days from receipt of invoice. To be paid
                by cheque or credit card or direct payment online. If account is not paid within 7
                days the credits details supplied as confirmation of work undertaken will be charged
                the agreed quoted fee noted above.
              </p>
            </div>
            <div className="border-bottom pb-3">
              <p>Thanks for your Business</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInvoice8;
