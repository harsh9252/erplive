import React from 'react';
import { Link } from 'react-router-dom';

const InvoiceTemplates = () => {
  return (
    <>
      <div className="mb-3">
        <div className="pb-3 border-bottom mb-3">
          <h6 className="mb-0">Invoice Templates</h6>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <ul className="nav nav-tabs nav-bordered mb-3">
            <li className="nav-item">
              <Link
                id="invoice-tab"
                data-bs-toggle="tab"
                data-bs-target="#invoice_tab"
                type="button"
                role="tab"
                aria-controls="invoice_tab"
                aria-selected="true"
                href="#"
                className="nav-link active"
              >
                Invoice
              </Link>
            </li>
            <li className="nav-item">
              <Link
                id="purchases-tab"
                data-bs-toggle="tab"
                data-bs-target="#purchases_tab"
                type="button"
                role="tab"
                aria-controls="purchases_tab"
                aria-selected="true"
                className="nav-link"
                href="#"
              >
                Purchases
              </Link>
            </li>
            <li className="nav-item">
              <Link
                id="receipt-tab"
                data-bs-toggle="tab"
                data-bs-target="#receipt_tab"
                type="button"
                role="tab"
                aria-controls="receipt_tab"
                aria-selected="true"
                className="nav-link"
                href="#"
              >
                Receipt
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane active"
              id="invoice_tab"
              role="tabpanel"
              aria-labelledby="invoice-tab"
              tabIndex="0"
            >
              <div className="row gx-3">
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-31.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link
                          href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_1"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/general-invoice-1">General Invoice 1</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-32.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_2"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/general-invoice-2">General Invoice 2</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-33.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_3"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/general-invoice-3">General Invoice 3</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-34.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_4"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/general-invoice-4">General Invoice 4</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-35.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_5"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/general-invoice-5">General Invoice 5</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-36.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_6"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/general-invoice-6">General Invoice 6</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-37.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_7"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/general-invoice-7">General Invoice 7</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-38.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_8"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/general-invoice-8">General Invoice 8</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-39.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_9"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/general-invoice-9">General Invoice 9</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-40.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_10"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/general-invoice-10">General Invoice 10</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane"
              id="purchases_tab"
              role="tabpanel"
              aria-labelledby="purchases-tab"
              tabIndex="0"
            >
              <div className="row gx-3">
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-41.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view11"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/bus-booking-invoice">Bus Booking</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-42.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_12"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/car-booking-invoice">Car Booking</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-43.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_13"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/coffee-shop-invoice">Coffee Shop</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-44.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_14"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/domain-hosting-invoice">Domain & Hosting</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-45.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_15"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/ecommerce-invoice">Ecommerce</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-46.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_16"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/fitness-center-invoice">Fitness</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-47.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_17"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/flight-booking-invoice">Dream Flights</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-48.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_18"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/hotel-booking-invoice">Hotel Booking</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-49.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_19"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/internet-billing-invoice">Internet Billing</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-50.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_20"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/invoice-medical">Medical</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-51.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_21"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/money-exchange-invoice">Money Exchange</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-52.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_22"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/movie-ticket-booking-invoice">Movie Ticket</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-53.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_23"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/restaurants-invoice">Restaurant</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-54.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_24"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/student-billing-invoice">Student Billing</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-55.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_25"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/train-ticket-invoice">Train Ticket</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane"
              id="receipt_tab"
              role="tabpanel"
              aria-labelledby="receipt-tab"
              tabIndex="0"
            >
              <div className="row gx-3">
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-56.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_26"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/receipt-invoice-1">Receipt Invoice 1</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-57.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_27"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/receipt-invoice-2">Receipt Invoice 2</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-58.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_28"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/receipt-invoice-3">Receipt Invoice 3</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card invoice-template">
                    <div className="card-body p-2">
                      <div className="invoice-img">
                        <Link href="#">
                          <img
                            className="w-100"
                            src="/assets/img/invoice/general-invoice-59.svg"
                            alt="invoice"
                          />
                        </Link>
                        <Link href="#"
                          className="invoice-view-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view_29"
                        >
                          <i className="isax isax-eye"></i>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link to="/receipt-invoice-4">Receipt Invoice 4</Link>
                        <Link href="#"
                          className="invoice-star d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-star"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="modal fade addmodal" id="invoice_view_1">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">General Invoice 1</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-61.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_2">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">General Invoice 2</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-62.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_3">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">General Invoice 3</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-63.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_4">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">General Invoice 4</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-64.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_5">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">General Invoice 5</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="bg-dark">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-65.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_6">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">General Invoice 6</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-66.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_7">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">General Invoice 7</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-67.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_8">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">General Invoice 8</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-68.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_9">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">General Invoice 9</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-69.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_10">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">General Invoice 10</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-70.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_11">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Bus Booking</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-71.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_12">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Car Booking</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-72.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_13">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Coffee Shop</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-73.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_14">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Domain & Hosting</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-74.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_15">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Ecommerce</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-75.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_16">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Fitness</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-76.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_17">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Dream Flights</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-77.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_18">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Hotel Booking</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-78.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_19">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Internet Billing</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-79.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_20">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Medical</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-80.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_21">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Money Exchange</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-81.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_22">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Movie Ticket</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-82.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_23">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Restaurant</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-83.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_24">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Student Billing</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-84.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_25">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Train Ticket</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-85.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_26">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Receipt Invoice 1</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-86.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_27">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Receipt Invoice 2</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-87.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_28">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Receipt Invoice 3</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-88.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade addmodal" id="invoice_view_29">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0">Receipt Invoice 4</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="w-100 invoice-template-img"
                  src="/assets/img/invoice/general-invoice-89.svg"
                  alt="User Img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplates;
