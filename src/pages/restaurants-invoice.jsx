import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantsInvoice = () => {
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
          <div className="pb-3 mb-3 border-bottom border-3 border-primary">
            <div className="d-flex align-items-center justify-content-between bg-light flex-wrap p-3 rounded">
              <div>
                <img src="/assets/img/invoice-logo.svg" className="mb-2" alt="User Img" />
                <p className="mb-1">
                  Date : <span className="text-dark">05/12/2024</span>
                </p>
                <div className="inv-details">
                  <div className="inv-date-rest">
                    <p className="text-start text-white">
                      Invoice No: <span>INV 000500</span>
                    </p>
                  </div>
                  <div className="triangle-right"></div>
                </div>
              </div>
              <div className="text-end">
                <p className="mb-1">Original For Recipient</p>
                <h6 className="text-primary mb-2">TAX INVOICE</h6>
                <div>
                  <h6 className="mb-1">Dreamguys Restaurent</h6>
                  <div>
                    <p className="mb-1">
                      Address : <span>15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom.</span>
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
              <table className="table">
                <thead className="thead border-top border-start-0 border-end-0 border-bottom border-3 border-dark p-2">
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Rate/Item</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-dark">
                    <td>1</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark mb-1">Finest Ramen</span>
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
                  <tr className="border-dark">
                    <td>2</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark mb-1">Sushi tray</span>
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
                  <tr className="border-dark">
                    <td>3</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark mb-1">Extra Condiments</span>
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
          <div className="row border-top border-bottom border-3 border-dark p-3 align-items-center">
            <div className="col-md-8">
              <span className="text-dark">Total Items / Qty : 3 / 3.00</span>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-between">
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
            <div className="col-md-12">
              <div className="d-flex align-items-center justify-content-end">
                <p className="text-gary">
                  Total amount ( in words):
                  <span className="text-dark">
                    {' '}
                    One Thousand Eight Hundred Fifteen Dollars Only.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="row d-flex align-items-center flex-wrap border-bottom mb-3">
            <div className="col-md-4">
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
            </div>
            <div className="col-md-8">
              <div className="mb-3">
                <h6 className="mb-2">Terms & Conditions : </h6>
                <p className="mb-1">1. Goods Once sold cannot be taken back or exchanged.</p>
                <p>
                  2. We are not the manufactures, company will stand for warrenty as per their terms
                  and conditions.
                </p>
              </div>
            </div>
          </div>
          <div className="row border border-start-0 border-end-0 border-dark text-center text-white bg-light p-2">
            <div className="col-md-12">
              <p className="text-gray">Thanks for your Business</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantsInvoice;
