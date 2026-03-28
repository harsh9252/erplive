import React from 'react';
import { Link } from 'react-router-dom';

const FitnessCenterInvoice = () => {
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
          <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3 pb-3">
            <div>
              <h6 className="text-dark mb-2">TAX INVOICE</h6>
              <div>
                <h6 className="mb-1">Dreamguys Internet Pvt Ltd.,</h6>
                <div>
                  <p className="mb-1">
                    GST IN : <span className="text-dark">22AABCU9603R1ZX</span>
                  </p>
                </div>
                <div>
                  <p className="mb-1">
                    Address :{' '}
                    <span className="text-dark">
                      15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom.
                    </span>
                  </p>
                </div>
                <div>
                  <p className="mb-1">
                    Mobile : <span className="text-dark">+91 98765 4321</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-1 text-end">
                <img src="/assets/img/invoice-logo.svg" alt="User Img" />
              </div>
              <div>
                <p className="mb-1 text-end">Original For Recipient</p>
              </div>
              <div>
                <p className="mb-1 text-end">
                  Date : <span className="text-dark">05/12/2024</span>
                </p>
              </div>
              <div>
                <p className="mb-1 text-end">
                  Invoice No : <span className="text-dark">INV 00001</span>
                </p>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-2">
                <div className="mb-3 align-items-center justify-content-end">
                  <p className="mb-1">Customer Info :</p>
                  <h6 className="mb-1 fs-16">John Williams</h6>
                </div>
              </div>
              <div className="col-md-2">
                <div className="d-block py-4 px-2 bg-light text-center">
                  <p className="mb-1 text-gray">Grand Total</p>
                  <h6 className="mb-1 fs-16">$270</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-6 md-12 d-flex align-items-center justify-content-between">
              <p className="mb-1">Client ID :</p>
              <span className="mb-1 fs-13 fw-noraml text-dark">AS2534568</span>
            </div>
            <div className="col-6 md-12 d-flex align-items-center justify-content-between">
              <p className="mb-1">Outstanding Balance :</p>
              <span className="mb-1 fs-13 fw-noraml text-dark">$3600</span>
            </div>
            <div className="col-6 md-12 d-flex align-items-center justify-content-between">
              <p className="mb-1">Invoice Date : </p>
              <span className="mb-1 fs-13 fw-noraml text-dark">Johan Smith</span>
            </div>
            <div className="col-6 md-12 d-flex align-items-center justify-content-between">
              <p className="mb-1">Due Date :</p>
              <span className="mb-1 fs-13 fw-noraml text-dark">Winter</span>
            </div>
            <div className="col-6 md-12 d-flex align-items-center justify-content-between">
              <p className="mb-1">Total Curent Charges :</p>
              <span className="mb-1 fs-13 fw-noraml text-dark">SI2534687</span>
            </div>
            <div className="col-6 md-12 d-flex align-items-center justify-content-between">
              <p className="mb-1">Total Balance Due :</p>
              <span className="mb-1 fs-13 fw-noraml text-dark">2024 Spring</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <table className="table">
                <thead className="thead-dark border-top border-start-0 border-end-0 border-bottom border-3 border-dark p-2">
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Hours</th>
                    <th>Total</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-gray">
                    <td className="text-dark">1</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Additional monthly usages - 125 GB</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">10</span>
                    </td>
                    <td>
                      <span className="text-dark">$350</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$350</span>
                    </td>
                  </tr>
                  <tr className="border-gray">
                    <td className="text-dark">2</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Equpment rental</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">8</span>
                    </td>
                    <td>
                      <span className="text-dark">$350</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$350</span>
                    </td>
                  </tr>
                  <tr className="border-gray">
                    <td className="text-dark">3</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Xtreme5</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">6</span>
                    </td>
                    <td>
                      <span className="text-dark">$600</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$600</span>
                    </td>
                  </tr>
                  <tr className="border-gray">
                    <td className="text-dark">4</td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="text-dark">Govement fee & taxes</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark">17</span>
                    </td>
                    <td>
                      <span className="text-dark">$400</span>
                    </td>
                    <td className="text-end">
                      <span className="text-dark">$400</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mb-2">
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
          <div className="row border-top border-bottom border-3 border-gray p-3 align-items-center">
            <div className="col-md-8">
              <span className="text-dark">Total Items / Qty : 5 / 5.00</span>
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
          <div className="row py-3 border-bottom  border-bottom border-3 border-gray mb-3 d-flex align-items-center">
            <div className="col-md-12">
              <div className="d-flex align-items-center justify-content-center">
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
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-2 p-3">
            <div className="">
              <h6 className="mb-2">Payment Info:</h6>
              <div>
                <p className="mb-1">
                  Debit Card : <span className="text-dark">465 *************645</span>
                </p>
                <p className="">
                  Amount : <span className="text-dark">$1,815</span>
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="mb-1">For Dreamguys</p>
              <span>
                <img src="/assets/img/icons/sign-01.png" alt="User Img" />
              </span>
            </div>
          </div>
          <div className="border-bottom mb-3 p-3">
            <h6 className="mb-2">Terms &amp; Conditions : </h6>
            <p className="mb-1">1. Goods Once sold cannot be taken back or exchanged.</p>
            <p>
              2. We are not the manufactures, company will stand for warrenty as per their terms and
              conditions.
            </p>
          </div>
          <div className="border-bottom text-center pb-3">
            <p>Thanks for your Business</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FitnessCenterInvoice;
