import React from 'react';
import { Link } from 'react-router-dom';

const GeneralInvoice6 = () => {
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
            <div className="border-bottom mb-3">
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <div className="mb-3">
                    <h5 className="text-primary mb-3">Invoice</h5>
                    <div className="p-4 invoice-design-6">
                      <p className="fw-semibold text-dark mb-1">Dreams Technologies Pvt Ltd</p>
                      <p className="text-dark">
                        Address : 15 Hodges Mews, <br /> High Wycombe HP12 3JL, United Kingdom.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="text-lg-end mb-2">
                    <div className="mb-1">
                      <img src="/assets/img/invoice-logo.svg" alt="User Img" />
                    </div>
                    <p className="mb-1">
                      Invoice No : <span className="text-dark">#005</span>
                    </p>
                    <p className="mb-1">
                      Invoice Date : <span className="text-dark">05/10/2024</span>
                    </p>
                    <p className="mb-1">
                      Due Date : <span className="text-dark">05/12/2024</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-light p-2 mb-3">
              <p>Customer Information</p>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="mb-3">
                  <h6 className="fs-16 text-gray-5 mb-2">Customer Details :</h6>
                  <div>
                    <h6 className="mb-1">John Williams</h6>
                    <p className="mb-0">GSTIN : ACWR000054321</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
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
              <div className="col-lg-4">
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
            <div className="mb-3">
              <h6 className="fs-16 text-gray-5 mb-3">Payment Status</h6>
              <span className="text-success fs-18 fw-semibold">PAID</span>
            </div>
            <div className="table-responsive mb-3">
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
                  <tr>
                    <td colspan="4" className="text-dark"></td>
                    <td className="text-dark fw-medium">
                      <h6>Total</h6>
                    </td>
                    <td className="text-dark text-end fw-medium">
                      <h6>$1,815.00</h6>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6" className="text-end">
                      Total amount ( in words): One Thousand Eight Hundred Fifteen Dollars Only.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex align-items-center justify-content-between flex-wrap border-bottom">
              <div className="d-flex align-items-start mb-3">
                <div className="me-4">
                  <span className="d-block mb-2">
                    <img src="/assets/img/icons/qr.png" alt="User Img" />
                  </span>
                  <p className="text-dark">Scan to View Receipt</p>
                </div>
                <div>
                  <h6 className="mb-2">Payment Info :</h6>
                  <div>
                    <p className="mb-1">
                      Debit Card : <span className="text-dark">465 *************645</span>
                    </p>
                    <p className="mb-1">
                      Amount : <span className="text-dark">$1,815</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <p className="mb-2">Terms & Conditions : </p>
                <p className="mb-1 text-dark">
                  1. Goods Once sold cannot be taken back or exchanged.
                </p>
                <p className="text-dark">
                  2. We are not the manufactures, company will stand for warrenty as per their terms
                  and conditions.
                </p>
              </div>
            </div>
            <div className="border-bottom py-3 bg-light text-center">
              <p>Thanks for your Business</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInvoice6;
