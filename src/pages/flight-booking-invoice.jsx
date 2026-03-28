import React from 'react';
import { Link } from 'react-router-dom';

export default function FlightBookingInvoice() {
  return (
    <div className="main-wrapper">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="invoice-wrapper">
            <div className="mb-3">
              <h6>
                <Link to="/invoice-templates">
                  <i className="isax isax-arrow-left me-1"></i>Back
                </Link>
              </h6>
            </div>
            <div className="pb-3 mb-3 border-bottom">
              <div className="d-flex align-items-center justify-content-between bg-light flex-wrap p-3 rounded">
                <div>
                  <h6 className="mb-2">Dreams Flights</h6>
                  <p>Original For Recipient</p>
                </div>
                <div className="text-end">
                  <img src="/assets/img/invoice-logo.svg" alt="User Img" />
                </div>
              </div>
            </div>
            <h5 className="text-primary text-center mb-3">Tax Invoice</h5>
            <div className="row mb-3 ">
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-between bg-light p-2">
                  <span>Customer ID:</span>
                  <span className="text-dark fw-medium">#326725</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-between bg-light p-2">
                  <span>Journey Date:</span>
                  <span className="text-dark fw-medium">05/01/2023</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-between bg-light p-2">
                  <span>Invoice No:</span>
                  <span className="text-dark fw-medium">#00001</span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h6 className="mb-8 text-gray-5 fs-16">Bill To :</h6>
                <p className="text-dark mb-0">Walter Roberson</p>
                <p className="text-dark mb-0">
                  299 Star Trek Drive, Panama City, Florida, 32405, USA
                </p>
                <p className="text-dark mb-0"></p>
                <p className="text-dark">+45 5421 4523</p>
              </div>
              <div>
                <h6 className="mb-8 text-gray-5 fs-16">Pay To :</h6>
                <p className="text-dark mb-0">Lowell H. Dominguez</p>
                <p className="text-dark mb-0">84 Spilman Street, London United King</p>
                <p className="text-dark mb-0"></p>
                <p className="text-dark mb-0"> +45 5421 2154</p>
              </div>
            </div>
            <div className="row mb-3 ">
              <div className="col-md-6">
                <div className="bg-light p-3">
                  <h6 className="mb-3">Passenger & Ticket Information</h6>
                  <div className="d-flex align-items-center justify-content-between ">
                    <div className="d-flex flex-column">
                      <span className="mb-1">Passenger Name</span>
                      <span className="mb-1">Ticket Number</span>
                      <span className="mb-1">Issued By Date</span>
                      <span>Booking Reference</span>
                    </div>
                    <div className="d-flex flex-column text-end">
                      <span className="text-dark mb-1">Jennifer Richards</span>
                      <span className="text-dark mb-1">#SM75692</span>
                      <span className="text-dark mb-1">05 Feb 2024</span>
                      <span className="text-dark">HC76SW</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bg-light p-3">
                  <h6 className="mb-3">Payment Information</h6>
                  <div className="d-flex align-items-center justify-content-between ">
                    <div className="d-flex flex-column">
                      <span className="mb-1">Payment Gatway</span>
                      <span className="mb-1">Date</span>
                      <span className="mb-1">Transaction ID</span>
                      <span>Total Amount</span>
                    </div>
                    <div className="d-flex flex-column text-end">
                      <span className="text-dark mb-1">American Express</span>
                      <span className="text-dark mb-1">25 Jan 2024</span>
                      <span className="text-dark mb-1">SI2534687</span>
                      <span className="text-dark">$2440</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <table className="table table-nowrap invoice-tables">
                  <thead className="thead-primary">
                    <tr>
                      <th>#</th>
                      <th>Flight Details</th>
                      <th>Class</th>
                      <th>Base Fare</th>
                      <th>Tax Amount</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="text-dark mb-1">
                            Air canada 1S-2539 Toronto- New York
                          </span>
                          <span>Date: 25 Jan 2024, Sat 8:30AM</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-dark">Business Seat</span>
                      </td>
                      <td>
                        <span className="text-dark">$200</span>
                      </td>
                      <td>
                        <span className="text-dark">$350</span>
                      </td>
                      <td className="text-end">
                        <span className="text-dark">$350</span>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="text-dark mb-1">
                            Air canada 1S-2539 Toronto- New York
                          </span>
                          <span>Date: 25 Jan 2024, Sat 8:30AM</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-dark">Economy Seat</span>
                      </td>
                      <td>
                        <span className="text-dark">$500</span>
                      </td>
                      <td>
                        <span className="text-dark">$600</span>
                      </td>
                      <td className="text-end">
                        <span className="text-dark">$350</span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3" className="border-0"></td>
                      <td colspan="2" className="text-dark text-end fw-medium border-0">
                        Taxable Amount
                      </td>
                      <td className="text-dark text-end fw-medium border-0">$1650.00</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="border-bottom-transparent"></td>
                      <td
                        colspan="2"
                        className="text-dark text-end fw-medium border-bottom-transparent"
                      >
                        IGST 18.0%
                      </td>
                      <td className="text-dark text-end fw-medium border-bottom-transparent">
                        $165.00
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-dark border-0 bg-light">
                        Total Items / Qty : 2 / 2.00
                      </td>
                      <td colspan="2" className="text-dark bg-light border-0 text-end fw-medium ">
                        <h6 className="fs-16">Total</h6>
                      </td>
                      <td className="text-dark bg-light text-end border-0 fw-medium ">
                        <h6 className="fs-16">$944.00</h6>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3" className="border-bottom-transparent">
                        <div className="d-flex flex-column">
                          <span>Total amount ( in words):</span>
                          <span className="text-dark mb-1">
                            Nine Hundred and Fourty Four Dollars Only.
                          </span>
                        </div>
                      </td>
                      <td
                        colspan="2"
                        className="text-dark text-end border-bottom-transparent fw-medium"
                      >
                        <h6>Amount Payable</h6>
                      </td>
                      <td className="text-dark border-bottom-transparent text-end fw-medium">
                        <h6>$944.00</h6>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between flex-wrap mb-3 p-3">
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
              <div className="text-center mb-3">
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
    </div>
  );
}
