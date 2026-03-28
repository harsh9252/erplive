import React from 'react';
import { Link } from 'react-router-dom';

export default function TrainTicketInvoice() {
  return (
    <div className="main-wrapper">
      <div className="invoice-wrapper">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="mb-3">
              <h6>
                <Link to="/invoice-templates">
                  <i className="isax isax-arrow-left me-1"></i>Back
                </Link>
              </h6>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between bg-primary flex-wrap p-3 rounded">
                <div>
                  <p className="text-white mb-2">Original For Recipient</p>
                  <h6 className="mb-0 text-white">Tax Invoice</h6>
                </div>
                <div>
                  <img src="/assets/img/logo-white.svg" alt="User Img" />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h6 className="mb-1 fs-16">Dreams Railways</h6>
                <p>299 Star Trek Drive, Panama City, Florida, 32405, USA</p>
              </div>
              <div className="text-end">
                <h6 className="mb-1 fs-18 fw-medium">Info:</h6>
                <p className="invoice-info">
                  Seating is on a first come, first served basis unless you have purchased ticket
                  for a Reserved Seating performance. Please arrive early for best seat section.
                </p>
              </div>
            </div>
            <div className="row mb-3 ">
              <div className="col-md-4">
                <div className="bg-light">
                  <div className="d-flex justify-content-center align-items-center p-2">
                    <span className="me-3">Date:</span>
                    <span className="text-dark fw-medium">05/12/2024</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-light">
                  <div className="d-flex justify-content-center align-items-center p-2">
                    <span className="me-3">Journy Date:</span>
                    <span className="text-dark fw-medium">05/01/2023</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-light">
                  <div className="d-flex justify-content-center align-items-center p-2">
                    <span className="me-3">Invoice No:</span>
                    <span className="text-dark fw-medium">#00001</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3 ">
              <div className="col-md-4 d-flex">
                <div className="d-flex align-items-center  bg-light px-3 py-4 flex-fill">
                  <ul className="activity-feed bg-light rounded">
                    <li className="feed-item timeline-item">
                      <p className="mb-1 text-gray-5 fw-semibold fs-16">From Station</p>
                    </li>
                    <li className="feed-item timeline-item">
                      <div>
                        <span className="text-dark fw-semibold">Acton GTR 3:00PM</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="d-flex align-items-center bg-light px-3 py-4 flex-fill">
                  <ul className="activity-feed bg-light rounded">
                    <li className="feed-item timeline-item">
                      <p className="mb-1 text-gray-5 fw-semibold fs-16">To Station</p>
                    </li>
                    <li className="feed-item timeline-item">
                      <div>
                        <span className="text-dark fw-semibold">Acton GWR 4:30PM</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="d-flex align-items-center justify-content-center bg-light px-3 py-4 flex-fill">
                  <div className="text-center">
                    <p className="mb-2 text-gray-5 fw-semibold fs-16">Seat No</p>
                    <p className="mb-0 text-primary fw-semibold fs-16">SBA1, SBA2, A30</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3 ">
              <div className="col-md-4">
                <div className="ribbon-tittle">
                  <div className="ribbon-text">
                    <span className="text-white">Passenger & Ticket Information</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3 ">
              <div className="col-md-6">
                <div className="d-flex align-items-center justify-content-between bg-light p-3">
                  <div className="d-flex flex-column">
                    <span className="mb-1">Passenger Name:</span>
                    <span className="mb-1">Email:</span>
                    <span className="mb-1">Ticket Numbe:</span>
                    <span className="mb-1">Adult:</span>
                    <span>Child:</span>
                  </div>
                  <div className="d-flex flex-column text-end">
                    <span className="text-dark mb-1">Jennifer Richards</span>
                    <span className="text-dark mb-1"></span>
                    <span className="text-dark mb-1">#SM98765</span>
                    <span className="text-dark mb-1">03</span>
                    <span className="text-dark">01</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center justify-content-between bg-light p-3">
                  <div className="d-flex flex-column">
                    <span className="mb-1">Phone:</span>
                    <span className="mb-1">Address:</span>
                    <span className="mb-1">PNR Code : Train</span>
                    <span className="mb-1">Name:</span>
                    <span>Issued Date:</span>
                  </div>
                  <div className="d-flex flex-column text-end">
                    <span className="text-dark mb-1">+91 79845 61324</span>
                    <span className="text-dark mb-1">
                      15 Hodges Mews, High Wycombe HP12 3JL United
                    </span>
                    <span className="text-dark mb-1">Kingdom</span>
                    <span className="text-dark mb-1">M6DZT</span>
                    <span className="text-dark">Dreams Railway</span>
                  </div>
                </div>
              </div>
            </div>
            <h6 className="mb-3 fs-16">Travel Information</h6>
            <div className="row mb-3">
              <div className="col-md-12">
                <table className="table table-nowrap invoice-tables">
                  <thead className="thead-light">
                    <tr>
                      <th>#</th>
                      <th>Train Details</th>
                      <th>Base Fare</th>
                      <th>Qty</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="text-dark mb-1">Dreams Railways., - Business Seat</span>
                          <span>Date: 25 Jan 2024, Sat 8:30AM</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-dark">$350</span>
                      </td>
                      <td>
                        <span className="text-dark">1</span>
                      </td>
                      <td className="text-end">
                        <span className="text-dark">$350</span>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="text-dark mb-1">Dreams Railways., - Economy Seat</span>
                          <span>Date: 25 Jan 2024, Sat 8:30AM</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-dark">$600</span>
                      </td>
                      <td>
                        <span className="text-dark">1</span>
                      </td>
                      <td className="text-end">
                        <span className="text-dark">$600</span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" className="border-0"></td>
                      <td colspan="2" className="text-dark text-end fw-medium border-0">
                        Taxable Amount
                      </td>
                      <td className="text-dark text-end fw-medium border-0">$1650.00</td>
                    </tr>
                    <tr>
                      <td colspan="2" className="border-bottom-transparent"></td>
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
                      <td colspan="2" className="text-dark border-0 bg-light">
                        Total Items / Qty : 4 / 4.00
                      </td>
                      <td colspan="2" className="text-dark bg-light border-0 text-end fw-medium">
                        <h6>Total</h6>
                      </td>
                      <td className="text-dark bg-light text-end border-0 fw-medium">
                        <h6>$1,815.00</h6>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" className="border-bottom-transparent">
                        <div className="d-flex flex-column">
                          <span>Total amount ( in words):</span>
                          <span className="text-dark mb-1">
                            One Thousand, Eight Hundred and Fifteen Dollars Only
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
                        <h6>$1,815.00</h6>
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
