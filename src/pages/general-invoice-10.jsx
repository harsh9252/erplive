import React from 'react';
import { Link } from 'react-router-dom';

const GeneralInvoice10 = () => {
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
          <div className="mb-3 p-2 bg-light">
            <div className="d-flex align-items-center justify-content-between flex-wrap p-3 rounded">
              <div className="">
                <img src="/assets/img/invoice-logo.svg" className="mb-2" alt="User Img" />
              </div>
              <div className="text-end">
                <h6 className="mb-2 text-primary">INVOICE</h6>
              </div>
            </div>
          </div>
          <div className="invoice-five-details d-flex">
            <div className="gradient-block me-4"></div>
            <div className="d-flex align-items-center gap-2">
              <div className="text-dark fs-13 me-4">
                Invoice No :<span>#005</span>
              </div>
              <div className="text-dark fs-13">
                Invoice Date :<span> 07-10-2023</span>
              </div>
            </div>
          </div>
          <div className="row bg-light p-2 mb-3">
            <div className="col-lg-7">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <h6 className="fs-16 text-gray mb-2">Invoice To:</h6>
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
                <div className="col-md-6">
                  <div className="mb-3">
                    <h6 className="fs-16 text-gray mb-2">Pay To:</h6>
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
            </div>
            <div className="col-lg-5">
              <div className="mb-3">
                <div>
                  <p className="mb-3 text-dark">
                    Date <br />
                    <span className="badge bg-orange-transparent text-orange">07/19/2023</span>
                  </p>
                  <p className="text-dark">
                    Payment Status <br />
                    <span className="text-info">Not Paid</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 mb-3 pb-3">
            <div>
              <h5 className="mb-2">Customer Details :</h5>
              <div>
                <h6 className="mb-1">John Williams</h6>
                <div className="mb-2">
                  <p>
                    GSTIN : <span className="text-dark">ACWR000054321</span>
                  </p>
                </div>
                <h6 className="mb-1 fw-semibold text-gray mb-2">Payment Status</h6>
                <h6 className="mb-1 text-success">PAID</h6>
              </div>
            </div>
            <div>
              <h6 className="mb-2 text-end">Dreamstechnologies</h6>
              <p className="mb-1 text-end">
                GST IN : <span className="text-dark">22AABCU9603R1ZX</span>
              </p>
              <p className="mb-1 text-end">
                Address :{' '}
                <span className="text-dark">
                  15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom.
                </span>
              </p>
              <p className="mb-1 text-end">
                Mobile : <span className="text-dark"> +91 98765 43210</span>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
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
            </div>
            <div className="col-md-6 text-end">
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
          <div className="py-3 border-top-0 border-bottom d-flex align-items-center justify-content-between">
            <p className="text-dark mb-0">
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
          <div className="d-flex align-items-center py-3 justify-content-between flex-wrap border-bottom mb-3">
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
          <div className="d-flex align-items-center flex-wrap border-bottom mb-3">
            <div className="mb-3">
              <p className="mb-2 fs-13 text-gray">Terms & Conditions : </p>
              <p className="mb-1 text-dark">
                1. Goods Once sold cannot be taken back or exchanged.
              </p>
              <p className="text-dark">
                2. We are not the manufactures, company will stand for warrenty as per their terms
                and conditions.
              </p>
            </div>
          </div>
          <div className="border-bottom pb-3">
            <p>Thanks for your Business</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInvoice10;
