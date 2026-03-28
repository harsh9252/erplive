import React from 'react';
import { Link } from 'react-router-dom';

const CoffeeShopInvoice = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="mb-3">
            <h6>
              <Link to="/invoice-templates">
                <i className="isax isax-arrow-left me-1"></i>Back
              </Link>
            </h6>
          </div>
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-end">
              <div className="d-flex align-items-center">
                <Link href="#" className="btn btn-outline-white me-2 d-inline-flex align-items-center">
                  <i className="isax isax-document-like me-1"></i>Download PDF
                </Link>
                <Link href="#" className="btn btn-outline-white me-2 d-inline-flex align-items-center">
                  <i className="isax isax-message-notif me-1"></i>Send Email
                </Link>
                <Link href="#" className="btn btn-outline-white d-inline-flex align-items-center">
                  <i className="isax isax-printer me-1"></i>Print
                </Link>
              </div>
            </div>
          </div>
          <div className="pb-3 mb-3 border-bottom border-3 border-dark">
            <div className="d-flex align-items-center justify-content-between bg-light flex-wrap gap-2 p-3 rounded">
              <div>
                <img src="/assets/img/invoice-logo.svg" className="mb-2" alt="User Img" />
                <p className="mb-1">
                  Date : <span className="text-dark">05/12/2024</span>
                </p>
                <div className="inv-details">
                  <div className="inv-date-no">
                    <p className="text-start text-white fs-14">
                      Invoice No: <span>INV 000500</span>
                    </p>
                  </div>
                  <div className="triangle-right"></div>
                </div>
              </div>
              <div className="text-end">
                <p className="mb-1">Original For Recipient</p>
                <h6 className="mb-2">TAX INVOICE</h6>
                <div>
                  <h6 className="mb-1">Dreams Cineplex</h6>
                  <div>
                    <p className="mb-1">
                      Address :{' '}
                      <span className="text-dark">
                        15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <p className="mb-1">Customer Info :</p>
              <h6 className="mb-1 fs-16">John Williams</h6>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-primary">
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>Rate/Item</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="text-dark mb-1">Colombia Dark Roast</span>
                          <span>22 July 2024 at 2.30pm</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-dark">$350</span>
                      </td>
                      <td>
                        <span className="text-dark">1</span>
                      </td>
                      <td>
                        <span className="text-dark">$350</span>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="text-dark mb-1">Coffee Mug</span>
                          <span>22 July 2024 at 2.30pm</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-dark">$600</span>
                      </td>
                      <td>
                        <span className="text-dark">1</span>
                      </td>
                      <td>
                        <span className="text-dark">$600</span>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="text-dark mb-1">Medium Cafe Mocha</span>
                          <span>22 July 2024 at 2.30pm</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-dark">$200</span>
                      </td>
                      <td>
                        <span className="text-dark">2</span>
                      </td>
                      <td>
                        <span className="text-dark">$400</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row mb-2 ">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-between ">
                <div className="d-flex flex-column">
                  <span className="text-dark text-end fw-semibold mb-1">Taxable Amount</span>
                  <span className="text-dark text-end fw-semibold">IGST 18.0%</span>
                </div>
                <div className="d-flex flex-column text-end">
                  <span className="text-dark fw-semibold mb-1">$1650.00</span>
                  <span className="text-dark fw-semibold">$165.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row border-top border-bottom border-3 border-dark p-2">
            <div className="col-md-8">
              <span className="text-dark">Total Items / Qty : 3 / 3.00</span>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-between ">
                <div className=" text-end">
                  <span className="fw-bold fs-18 text-end text-dark">Total</span>
                </div>
                <div className="text-end">
                  <span className="fw-bold fs-18 text-dark">$1,815.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row py-3 border-bottom  border-bottom border-3 border-dark mb-3 d-flex align-items-center">
            <div className="col-lg-12">
              <div className="d-flex align-items-center justify-content-end">
                <p className="text-dark">
                  Total amount ( in words): One Thousand Eight Hundred Fifteen Dollars Only.
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between flex-wrap border-bottom mb-3">
            <div className="mb-3">
              <h6 className="mb-2">Payment Info:</h6>
              <div>
                <p className="mb-1">
                  Debit Card : <span className="text-dark">465 *************645</span>
                </p>
                <p className="mb-1">
                  Amount : <span className="text-dark">$1,815</span>
                </p>
              </div>
            </div>
            <div className="mb-3">
              <h6 className="mb-2">Terms & Conditions : </h6>
              <p className="mb-1">1. Goods Once sold cannot be taken back or exchanged.</p>
              <p>
                2. We are not the manufactures, company will stand for warrenty as per their terms
                and conditions.
              </p>
            </div>
          </div>
          <div className="border-bottom text-center text-white bg-primary p-2">
            <p>Thanks for your Business</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoffeeShopInvoice;
