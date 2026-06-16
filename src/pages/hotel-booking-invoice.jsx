import React from 'react';
import { Link } from 'react-router-dom';

export default function HotelBookingInvoice() {
  return (
    <div className="main-wrapper">
      <div className="invoice-wrapper">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row justify-content-between border-top border-bottom row-gap-3 flex-wrap py-4 mb-3">
              <div className="mb-3">
                <h6>
                  <Link to="/invoice-templates">
                    <i className="isax isax-arrow-left me-1"></i>Back
                  </Link>
                </h6>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4 p-0">
                <div className="invoice-logo">
                  <img src="/assets/img/invoice-logo.svg" className="mb-3 image-fluid" alt="img" />
                  <p className="mb-3">Original For Recipient</p>
                  <h3 className="text-primary">Dreams Hotel</h3>
                </div>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8 p-0">
                <div className="ribbon-hotel">
                  <span className="text-center text-white">
                    Address : 15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom.
                  </span>
                </div>
              </div>
            </div>
            <div className="row mb-3 justify-content-between row-gap-3">
              <div className="col-lg-9 d-flex ps-0">
                <div className="table-responsive px-0 d-flex flex-fill">
                  <table className="table table-nowrap invoice-table">
                    <tbody>
                      <tr>
                        <td>Arrival Date</td>
                        <td>
                          <p className="text-dark fw-medium">31-08-2024</p>
                        </td>
                        <td>Rate per Day/room</td>
                        <td>
                          <p className="text-dark fw-medium">175</p>
                        </td>
                        <td>No. of Rooms</td>
                        <td>
                          <p className="text-dark fw-medium">3</p>
                        </td>
                      </tr>
                      <tr>
                        <td>Departure Date</td>
                        <td>
                          <p className="text-dark fw-medium">05-09-2024</p>
                        </td>
                        <td>No. of Adults</td>
                        <td>
                          <p className="text-dark fw-medium">2</p>
                        </td>
                        <td>Room No.s</td>
                        <td>
                          <p className="text-dark fw-medium">181A, 182A</p>
                        </td>
                      </tr>
                      <tr>
                        <td>Total No. of days</td>
                        <td>
                          <p className="text-dark fw-medium">5</p>
                        </td>
                        <td>No.of Children</td>
                        <td>
                          <p className="text-dark fw-medium">4</p>
                        </td>
                        <td>Room No.s</td>
                        <td>
                          <p className="text-dark fw-medium">-</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-3 d-flex px-0">
                <div className="border rounded p-3 flex-fill">
                  <p className="fw-semibold fs-16 mb-2">Shipping Address :</p>
                  <p className="text-dark fs-13">
                    Walter Roberson
                    <br />
                    299 Star Trek Drive, Panama City,
                    <br />
                    Florida, 32405,
                    <br />
                    USA
                  </p>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <h6 className="mb-3">Service Details:</h6>
              <div className="table-responsive px-0">
                <table className="table table-nowrap invoice-table2">
                  <thead className="thead-2">
                    <tr>
                      <th>Date</th>
                      <th>Services</th>
                      <th>Charged Amount</th>
                      <th>Discount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody className="tbody-2">
                    <tr className="odd">
                      <td>31-08-2024</td>
                      <td>Special Menu</td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>50.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>50.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>150.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>01-09-2024</td>
                      <td>Special Menu</td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>50.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>50.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>150.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr className="odd">
                      <td>02-09-2024</td>
                      <td>Special Menu</td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>50.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>50.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>150.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>03-09-2024</td>
                      <td>Special Menu</td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>50.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>50.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>150.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <p className="fw-medium">Total Discount</p>
                      </td>
                      <td className="bg-light">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0 fw-medium">₹</p>
                          <p className="fw-medium">200.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <p className="fw-semibold fs-16">Total Amount</p>
                      </td>
                      <td className="bg-dark">
                        <div className="d-flex justify-content-between align-items-center text-white">
                          <p className="mb-0 fw-semibold">₹</p>
                          <p className="fw-semibold">600.00</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row mb-3">
              <h6 className="mb-3">Room Details:</h6>
              <div className="table-responsive px-0">
                <table className="table table-nowrap invoice-table2">
                  <thead className="thead-2">
                    <tr>
                      <th>Rate/Day</th>
                      <th>No.of.Rooms</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Discount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody className="tbody-2">
                    <tr className="odd">
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>175.00</p>
                        </div>
                      </td>
                      <td className="text-center">3</td>
                      <td>Personal</td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>525.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>25.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>500.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>155.00</p>
                        </div>
                      </td>
                      <td className="text-center">4</td>
                      <td>Trip</td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>600.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>45.00</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">₹</p>
                          <p>89,955.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <p className="fw-medium">Total Discount</p>
                      </td>
                      <td className="bg-light">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0 fw-medium">₹</p>
                          <p className="fw-medium">70.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <p className="fw-medium">Sub Total</p>
                      </td>
                      <td className="bg-light">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0 fw-medium">₹</p>
                          <p className="fw-medium">90,455.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <p className="fw-medium">Service Charges</p>
                      </td>
                      <td className="bg-light">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0 fw-medium">₹</p>
                          <p className="fw-medium">475.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <p className="fw-medium">Sales Tax</p>
                      </td>
                      <td className="bg-light">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0 fw-medium">%</p>
                          <p className="fw-medium">475.00</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <p className="fw-semibold fs-16">Total Amount</p>
                      </td>
                      <td className="bg-dark">
                        <div className="d-flex justify-content-between align-items-center text-white">
                          <p className="mb-0 fw-semibold">₹</p>
                          <p className="fw-semibold">600.00</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-3">
              <h6 className="mb-2">Terms & Conditions : </h6>
              <p className="mb-0">1. Goods Once sold cannot be taken back or exchanged.</p>
              <p>
                2. We are not the manufactures, company will stand for warrenty as per their terms
                and conditions.
              </p>
            </div>
            <div className="border-bottom">
              <div className="bg-light border border-dark border-2 p-3 text-center border-end-0 border-start-0 mb-3">
                <p>Thanks for your Business</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
