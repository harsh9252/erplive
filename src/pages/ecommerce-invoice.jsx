import React from 'react';
import { Link } from 'react-router-dom';

const EcommerceInvoice = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="mb-3">
            <h6>
              <Link to="/invoice-templates">
                <i className="isax isax-arrow-left me-1"></i>Back
              </Link>
            </h6>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 mb-3 pb-3">
              <div>
                <h5 className="mb-2">TAX INVOICE</h5>
                <div>
                  <h6 className="mb-1">Dreamstechnologies</h6>
                  <div>
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
              <div>
                <div className="mb-1">
                  <img src="/assets/img/invoice-logo.svg" alt="User Img" />
                </div>
                <p className="mb-1 text-end">Original For Recipient</p>
                <p className="mb-1 text-end">
                  Invoice No: <span className="text-dark">INV 00001</span>
                </p>
                <p className="mb-1 text-end">
                  Date: <span className="text-dark">05/12/2024</span>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h6 className="fs-16 text-gray mb-2">Customer Details :</h6>
                      <div>
                        <p className="mb-0 fs-18 text-dark">John Williams</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h6 className="fs-16 text-gray mb-2">Billing Address :</h6>
                      <div>
                        <p className="mb-0 text-dark">Walter Roberson</p>
                        <p className="mb-0 text-dark">
                          299 Star Trek Drive, Panama City
                          <br /> Florida, 32405,
                        </p>
                        <p className="mb-0 text-dark">USA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="mb-3">
                  <h6 className="fs-16 text-gray mb-2">Shipping Address :</h6>
                  <div>
                    <p className="mb-0 text-dark">Walter Roberson</p>
                    <p className="mb-0 text-dark">
                      299 Star Trek Drive, Panama City
                      <br /> Florida, 32405,
                    </p>
                    <p className="mb-0 text-dark">USA</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-nowrap table-bordered">
                <thead className="thead-primary">
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Rate/Item</th>
                    <th>Qty</th>
                    <th>Tax Value</th>
                    <th>Tax Amount</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-dark">1</td>
                    <td>
                      <div>
                        <p className="text-dark mb-0">Samsung Galaxy M32 Prime Edition...</p>
                        <span className="d-block">( Light Blue, 4GB RAM, 64GB )</span>
                      </div>
                    </td>
                    <td className="text-dark">15,677.15</td>
                    <td>1</td>
                    <td className="text-dark">15,677.15</td>
                    <td>2,821.88(18%)</td>
                    <td className="text-dark text-end">18,49.00</td>
                  </tr>
                  <tr>
                    <td className="text-dark">2</td>
                    <td>
                      <div>
                        <p className="text-dark mb-0">OPPO A74 5G...</p>
                        <span className="d-block">( Fluid Black, 6GB RAM, 128GB Storage )</span>
                      </div>
                    </td>
                    <td className="text-dark">2541.53</td>
                    <td>2</td>
                    <td className="text-dark">2541.53</td>
                    <td>457.48(18%)</td>
                    <td className="text-dark text-end">2,999.00</td>
                  </tr>
                  <tr>
                    <td colspan="5" className="border-0"></td>
                    <td className="text-dark fw-medium border-0">Taxable Amount</td>
                    <td className="text-dark text-end fw-medium border-0">$1650.00</td>
                  </tr>
                  <tr>
                    <td colspan="5" className="border-0"></td>
                    <td className="text-dark fw-medium border-0">IGST 18.0%</td>
                    <td className="text-dark text-end fw-medium border-0">$165.00</td>
                  </tr>
                  <tr>
                    <td colspan="5" className="text-dark border-0">
                      Total Items / Qty : 2 / 2.00
                    </td>
                    <td className="text-dark fw-medium border-0">
                      <h6>Total</h6>
                    </td>
                    <td className="text-dark text-end fw-medium border-0">
                      <h6>$1,815.00</h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="py-3 border-bottom mb-3 d-flex align-items-center justify-content-between">
              <p className="text-dark">
                Total amount ( in words):
                <br /> One Thousand Eight Hundred Fifteen Dollars Only.
              </p>
              <div className="d-flex align-items-center">
                <span className="border-end-0"></span>
                <span className="text-dark fw-medium border-end-0 border-start-0 text-center me-2">
                  <h6>Amount Payable</h6>
                </span>
                <span className="text-dark text-end fw-medium border-start-0">
                  <h6>$21,498.00</h6>
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between flex-wrap border-bottom mb-3">
              <div className="mb-3">
                <h6 className="mb-2">Bank Details</h6>
                <div>
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
              </div>
              <div className="text-center mb-3">
                <p className="mb-1">For Dreamstechnologies</p>
                <span>
                  <img src="/assets/img/icons/sign-01.png" alt="User Img" />
                </span>
              </div>
            </div>
            <div className="border-bottom mb-3 pb-3">
              <h6 className="mb-2">Terms & Conditions : </h6>
              <p className="mb-1">1. Goods Once sold cannot be taken back or exchanged.</p>
              <p>
                2. We are not the manufactures, company will stand for warrenty as per their terms
                and conditions.
              </p>
            </div>
            <div className="border-bottom text-center pb-3">
              <p>Thanks for your Business</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EcommerceInvoice;
