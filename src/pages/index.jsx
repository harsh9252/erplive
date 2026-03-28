import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <>
      {/* Start Breadcrumb */}
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Dashboard</h6>
        </div>
        <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
          <div id="reportrange" className="reportrange-picker d-flex align-items-center">
            <i className="isax isax-calendar text-gray-5 fs-14 me-1"></i>
            <span className="reportrange-picker-field">16 Apr 25 - 16 Apr 25</span>
          </div>
          <div className="dropdown">
            <Link
              className="btn btn-primary d-flex align-items-center justify-content-center dropdown-toggle"
              data-bs-toggle="dropdown"
              href="javascript:void(0);"
              role="button"
            >
              Create New
            </Link>
            <ul className="dropdown-menu dropdown-menu-start">
              <li>
                <Link to="/add-invoice" className="dropdown-item d-flex align-items-center">
                  <i className="isax isax-document-text-1 me-2"></i>Invoice
                </Link>
              </li>
              <li>
                <Link to="/expenses" className="dropdown-item d-flex align-items-center">
                  <i className="isax isax-money-send me-2"></i>Expense
                </Link>
              </li>
              <li>
                <Link to="/add-credit-notes" className="dropdown-item d-flex align-items-center">
                  <i className="isax isax-money-add me-2"></i>Credit Notes
                </Link>
              </li>
              <li>
                <Link to="/add-debit-notes" className="dropdown-item d-flex align-items-center">
                  <i className="isax isax-money-recive me-2"></i>Debit Notes
                </Link>
              </li>
              <li>
                <Link
                  to="/add-purchases-orders"
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className="isax isax-document me-2"></i>Purchase Order
                </Link>
              </li>
              <li>
                <Link to="/add-quotation" className="dropdown-item d-flex align-items-center">
                  <i className="isax isax-document-download me-2"></i>Quotation
                </Link>
              </li>
              <li>
                <Link
                  to="/add-delivery-challan"
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className="isax isax-document-forward me-2"></i>Delivery Challan
                </Link>
              </li>
              <li>
                <Link to="/e-invoices" className="dropdown-item d-flex align-items-center">
                  <i className="isax isax-receipt-text-1 me-2"></i>E-Invoice
                </Link>
              </li>
              <li>
                <Link to="/add-eway-bill" className="dropdown-item d-flex align-items-center">
                  <i className="isax isax-truck me-2"></i>E-Way Bill
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <Link href="javascript: void(0);"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="javascript:void(0);">
                  Download as PDF
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="javascript:void(0);">
                  Download as Excel
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* End Breadcrumb */}

      <div className="bg-primary rounded welcome-wrap position-relative mb-3">
        {/* start row */}
        <div className="row">
          <div className="col-lg-8 col-md-9 col-sm-7">
            <div>
              <h5 className="text-white mb-1">Good Morning, Jafna Cremson</h5>
              <p className="text-white mb-3">
                You have 15+ invoices saved to draft that has to send to customers
              </p>
              <div className="d-flex align-items-center flex-wrap gap-3">
                <p className="d-flex align-items-center fs-13 text-white mb-0">
                  <i className="isax isax-calendar5 me-1"></i>Friday, 24 Mar 2025
                </p>
                <p className="d-flex align-items-center fs-13 text-white mb-0">
                  <i className="isax isax-clock5 me-1"></i>11:24 AM
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* end row */}

        <div className="position-absolute end-0 top-50 translate-middle-y p-2 d-none d-sm-block">
          <img src="/assets/img/icons/dashboard.svg" alt="img" />
        </div>
      </div>

      {/* start row */}
      <div className="row">
        <div className="col-md-4 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="mb-3">
                <h6 className="d-flex align-items-center mb-1">
                  <i className="isax isax-category5 text-default me-2"></i>Overview
                </h6>
              </div>
              <div className="row g-4">
                <div className="col-xl-6">
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-44 avatar-rounded bg-primary-subtle text-primary flex-shrink-0 me-2">
                      <i className="isax isax-document-text-1 fs-20"></i>
                    </span>
                    <div>
                      <p className="mb-1 text-truncate">Invoices</p>
                      <h6 className="fs-16 fw-semibold mb-0 text-truncate">1,041</h6>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="d-flex align-items-center me-2">
                    <span className="avatar avatar-44 avatar-rounded bg-success-subtle text-success-emphasis flex-shrink-0 me-2">
                      <i className="isax isax-profile-2user fs-20"></i>
                    </span>
                    <div>
                      <p className="mb-1 text-truncate">Customers</p>
                      <h6 className="fs-16 fw-semibold mb-0 text-truncate">3,462</h6>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-44 avatar-rounded bg-warning-subtle text-warning-emphasis flex-shrink-0 me-2">
                      <i className="isax isax-dcube fs-20"></i>
                    </span>
                    <div>
                      <p className="mb-1 text-truncate">Amount Due</p>
                      <h6 className="fs-16 fw-semibold mb-0 text-truncate">$1,642</h6>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="d-flex align-items-center me-2">
                    <span className="avatar avatar-44 avatar-rounded bg-info-subtle text-info-emphasis flex-shrink-0 me-2">
                      <i className="isax isax-document-text fs-20"></i>
                    </span>
                    <div>
                      <p className="mb-1 text-truncate">Quotations</p>
                      <h6 className="fs-16 fw-semibold mb-0 text-truncate">2,150</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="mb-3">
                <h6 className="d-flex align-items-center mb-1">
                  <i className="isax isax-chart-215 text-default me-2"></i>Sales Analytics
                </h6>
              </div>
              <div className="row g-4">
                <div className="col-xl-6">
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-44 avatar-rounded bg-primary-subtle text-primary flex-shrink-0 me-2">
                      <i className="isax isax-document-forward fs-20"></i>
                    </span>
                    <div>
                      <p className="mb-1 text-truncate">Total Sales</p>
                      <h6 className="fs-16 fw-semibold mb-0">$40,569</h6>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="d-flex align-items-center me-2">
                    <span className="avatar avatar-44 avatar-rounded bg-success-subtle text-success-emphasis flex-shrink-0 me-2">
                      <i className="isax isax-programming-arrow fs-20"></i>
                    </span>
                    <div>
                      <p className="mb-1 text-truncate">Purchase</p>
                      <h6 className="fs-16 fw-semibold mb-0 text-truncate">$1,54,220</h6>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-44 avatar-rounded bg-warning-subtle text-warning-emphasis flex-shrink-0 me-2">
                      <i className="isax isax-dollar-circle fs-20"></i>
                    </span>
                    <div>
                      <p className="mb-1 mb-0">Expenses</p>
                      <h6 className="fs-16 fw-semibold text-truncate">$10,041</h6>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="d-flex align-items-center me-2">
                    <span className="avatar avatar-44 avatar-rounded bg-info-subtle text-info-emphasis flex-shrink-0 me-2">
                      <i className="isax isax-flag fs-20"></i>
                    </span>
                    <div>
                      <p className="mb-1 text-truncate">Credits</p>
                      <h6 className="fs-16 fw-semibold mb-0 text-truncate">$12,150</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="mb-3">
                <h6 className="d-flex align-items-center mb-1">
                  <i className="isax isax-chart-success5 text-default me-2"></i>Invoice Statistics
                </h6>
              </div>
              <div className="row g-4">
                <div className="col-xl-6">
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-44 avatar-rounded bg-primary-subtle text-primary flex-shrink-0 me-2">
                      <i className="isax isax-document fs-20"></i>
                    </span>
                    <div>
                      <p className="mb-1 text-truncate">Invoiced</p>
                      <h6 className="fs-16 fw-semibold mb-0">$21,132</h6>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="d-flex align-items-center me-2">
                    <span className="avatar avatar-44 avatar-rounded bg-success-subtle text-success-emphasis flex-shrink-0 me-2">
                      <i className="isax isax-document-forward fs-20"></i>
                    </span>
                    <div>
                      <p className="mb-1 text-truncate">Received</p>
                      <h6 className="fs-16 fw-semibold mb-0 text-truncate">$10,763</h6>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-44 avatar-rounded bg-warning-subtle text-warning-emphasis flex-shrink-0 me-2">
                      <i className="isax isax-document-previous fs-20"></i>
                    </span>
                    <div>
                      <p className="mb-1 text-truncate">Outstanding</p>
                      <h6 className="fs-16 fw-semibold mb-0 text-truncate">$8041</h6>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="d-flex align-items-center me-2">
                    <span className="avatar avatar-44 avatar-rounded bg-info-subtle text-info-emphasis flex-shrink-0 me-2">
                      <i className="isax isax-dislike fs-20"></i>
                    </span>
                    <div>
                      <p className="mb-1 text-truncate">Overdue</p>
                      <h6 className="fs-16 fw-semibold text-truncate mb-0">$41,811.2</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end row */}

      {/* start row */}
      <div className="row">
        <div className="col-md-4 d-flex flex-column">
          <div className="card overflow-hidden z-1 flex-fill">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
                <div>
                  <p className="mb-1">Total Products</p>
                  <div className="d-flex align-items-center">
                    <h6 className="fs-16 fw-semibold me-2">897</h6>
                    <span className="badge badge-sm badge-soft-success">
                      +45<i className="isax isax-arrow-up-15 ms-1"></i>
                    </span>
                  </div>
                </div>
                <span className="avatar avatar-lg bg-light text-dark avatar-rounded">
                  <i className="isax isax-document-text fs-16"></i>
                </span>
              </div>
              <Link to="/inventory" className="fw-medium text-decoration-underline">
                View Inventory
              </Link>
            </div>
            <div className="position-absolute end-0 bottom-0 z-n1">
              <img src="/assets/img/bg/card-bg-01.svg" alt="img" />
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column">
          <div className="card overflow-hidden z-1 flex-fill">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
                <div>
                  <p className="mb-1">Total Sales</p>
                  <div className="d-flex align-items-center">
                    <h6 className="fs-16 fw-semibold me-2">645</h6>
                    <span className="badge badge-sm badge-soft-success">
                      +45<i className="isax isax-arrow-up-15 ms-1"></i>
                    </span>
                  </div>
                </div>
                <span className="avatar avatar-lg bg-light text-dark avatar-rounded">
                  <i className="isax isax-document-text fs-16"></i>
                </span>
              </div>
              <Link to="/invoices" className="fw-medium text-decoration-underline">
                View Invoices
              </Link>
            </div>
            <div className="position-absolute end-0 bottom-0 z-n1">
              <img src="/assets/img/bg/card-bg-02.svg" alt="img" />
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column">
          <div className="card overflow-hidden z-1 flex-fill">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
                <div>
                  <p className="mb-1">Total Quotations</p>
                  <div className="d-flex align-items-center">
                    <h6 className="fs-16 fw-semibold me-2">128</h6>
                    <span className="badge badge-sm badge-soft-success">
                      +45<i className="isax isax-arrow-up-15 ms-1"></i>
                    </span>
                  </div>
                </div>
                <span className="avatar avatar-lg bg-light text-dark avatar-rounded">
                  <i className="isax isax-document-text fs-16"></i>
                </span>
              </div>
              <Link to="/quotations" className="fw-medium text-decoration-underline">
                View All
              </Link>
            </div>
            <div className="position-absolute end-0 bottom-0 z-n1">
              <img src="/assets/img/bg/card-bg-03.svg" alt="img" />
            </div>
          </div>
        </div>
      </div>
      {/* end row */}

      {/* start row */}
      <div className="row">
        <div className="col-xl-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body pb-0">
              <div className="mb-3">
                <h6 className="mb-1">Revenue</h6>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div>
                  <p className="mb-1">Total Revenue</p>
                  <div className="d-flex align-items-center">
                    <h6 className="fs-16 fw-semibold me-2">897</h6>
                    <span className="badge badge-sm badge-soft-success">
                      +45<i className="isax isax-arrow-up-15 ms-1"></i>
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <p className="fs-13 text-dark d-flex align-items-center mb-0">
                    <i className="fa-solid fa-circle text-primary-transparent fs-12 me-1"></i>
                    Received
                  </p>
                  <p className="fs-13 text-dark d-flex align-items-center mb-0">
                    <i className="fa-solid fa-circle text-primary fs-12 me-1"></i>Outstanding
                  </p>
                </div>
              </div>
              <div id="revenue_chart"></div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="mb-3">
                <h6 className="mb-1">Customers</h6>
              </div>
              <div className="table-responsive">
                <table className="table table-nowrap table-borderless custom-table">
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to="/customer-details"
                            className="avatar avatar-lg rounded-circle me-2 flex-shrink-0"
                          >
                            <img
                              src="/assets/img/users/user-06.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 fw-medium mb-1">
                              <Link to="/customer-details">Emily Clark</Link>
                            </h6>
                            <p className="fs-13">No of Invoices : 45</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="mb-1">Outstanding </p>
                        <h6 className="fs-14 fw-semibold">$3589</h6>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <Link
                            to="/add-invoice"
                            className="btn btn-icon btn-sm btn-light"
                            data-bs-toggle="tooltip"
                            title="New Invoice"
                          >
                            <i className="isax isax-add-circle"></i>
                          </Link>
                          <div data-bs-toggle="tooltip" title="Add Ledger">
                            <Link href="#"
                              className="btn btn-icon btn-sm btn-light"
                              data-bs-toggle="modal"
                              data-bs-target="#add_ledger"
                            >
                              <i className="isax isax-document-text-1"></i>
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to="/customer-details"
                            className="avatar avatar-lg rounded-circle me-2 flex-shrink-0"
                          >
                            <img
                              src="/assets/img/users/user-01.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 fw-medium mb-1">
                              <Link to="/customer-details">John Smith</Link>
                            </h6>
                            <p className="fs-13">No of Invoices : 16</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="mb-1">Outstanding </p>
                        <h6 className="fs-14 fw-semibold">$5426</h6>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <Link
                            to="/add-invoice"
                            className="btn btn-icon btn-sm btn-light"
                            data-bs-toggle="tooltip"
                            title="New Invoice"
                          >
                            <i className="isax isax-add-circle"></i>
                          </Link>
                          <div data-bs-toggle="tooltip" title="Add Ledger">
                            <Link href="#"
                              className="btn btn-icon btn-sm btn-light"
                              data-bs-toggle="modal"
                              data-bs-target="#add_ledger"
                            >
                              <i className="isax isax-document-text-1"></i>
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to="/customer-details"
                            className="avatar avatar-lg rounded-circle me-2 flex-shrink-0"
                          >
                            <img
                              src="/assets/img/users/user-38.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 fw-medium mb-1">
                              <Link to="/customer-details">Olivia Harris</Link>
                            </h6>
                            <p className="fs-13">No of Invoices : 23</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="mb-1">Outstanding </p>
                        <h6 className="fs-14 fw-semibold">$1493</h6>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <Link
                            to="/add-invoice"
                            className="btn btn-icon btn-sm btn-light"
                            data-bs-toggle="tooltip"
                            title="New Invoice"
                          >
                            <i className="isax isax-add-circle"></i>
                          </Link>
                          <div data-bs-toggle="tooltip" title="Add Ledger">
                            <Link href="#"
                              className="btn btn-icon btn-sm btn-light"
                              data-bs-toggle="modal"
                              data-bs-target="#add_ledger"
                            >
                              <i className="isax isax-document-text-1"></i>
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to="/customer-details"
                            className="avatar avatar-lg rounded-circle me-2 flex-shrink-0"
                          >
                            <img
                              src="/assets/img/users/user-12.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 fw-medium mb-1">
                              <Link to="/customer-details">William Parker</Link>
                            </h6>
                            <p className="fs-13">No of Invoices : 58</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="mb-1">Outstanding </p>
                        <h6 className="fs-14 fw-semibold">$7854</h6>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <Link
                            to="/add-invoice"
                            className="btn btn-icon btn-sm btn-light"
                            data-bs-toggle="tooltip"
                            title="New Invoice"
                          >
                            <i className="isax isax-add-circle"></i>
                          </Link>
                          <div data-bs-toggle="tooltip" title="Add Ledger">
                            <Link href="#"
                              className="btn btn-icon btn-sm btn-light"
                              data-bs-toggle="modal"
                              data-bs-target="#add_ledger"
                            >
                              <i className="isax isax-document-text-1"></i>
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to="/customer-details"
                            className="avatar avatar-lg rounded-circle me-2 flex-shrink-0"
                          >
                            <img
                              src="/assets/img/users/user-02.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 fw-medium mb-1">
                              <Link to="/customer-details">Charlotte Brown</Link>
                            </h6>
                            <p className="fs-13">No of Invoices : 09</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="mb-1">Outstanding </p>
                        <h6 className="fs-14 fw-semibold">$4989</h6>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          <Link
                            to="/add-invoice"
                            className="btn btn-icon btn-sm btn-light"
                            data-bs-toggle="tooltip"
                            title="New Invoice"
                          >
                            <i className="isax isax-add-circle"></i>
                          </Link>
                          <div data-bs-toggle="tooltip" title="Add Ledger">
                            <Link href="#"
                              className="btn btn-icon btn-sm btn-light"
                              data-bs-toggle="modal"
                              data-bs-target="#add_ledger"
                            >
                              <i className="isax isax-document-text-1"></i>
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Link
                to="/customers"
                className="btn btn-light btn-lg w-100 text-decoration-underline mt-3"
              >
                All Customers
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* end row */}

      {/* start row */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                <h6 className="mb-1">Invoices</h6>
                <Link to="/invoices" className="btn btn-primary mb-1">
                  View all Invoices
                </Link>
              </div>
              <div className="table-responsive no-filter no-pagination">
                <table className="table table-nowrap border mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Created On</th>
                      <th>Amount</th>
                      <th>Paid</th>
                      <th>Payment Mode</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link to="/invoice-details" className="link-default">
                          INV00025
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to="/customer-details"
                            className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          >
                            <img
                              src="/assets/img/users/user-22.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 fw-medium mb-0">
                              <Link to="/customer-details">Emily Clark</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>22 Feb 2025</td>
                      <td className="text-dark">$10,000</td>
                      <td>$5,000</td>
                      <td className="text-dark">Cash</td>
                      <td>04 Mar 2025</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="/invoice-details" className="link-default">
                          INV00024
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to="/customer-details"
                            className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          >
                            <img
                              src="/assets/img/users/user-07.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 fw-medium mb-0">
                              <Link to="/customer-details">John Carter</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>07 Feb 2025</td>
                      <td className="text-dark">$25,750</td>
                      <td>$5,000</td>
                      <td className="text-dark">Check</td>
                      <td>20 Feb 2025</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="/invoice-details" className="link-default">
                          INV00023
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to="/customer-details"
                            className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          >
                            <img
                              src="/assets/img/users/user-16.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 fw-medium mb-0">
                              <Link to="/customer-details">Sophia White</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>09 Dec 2024</td>
                      <td className="text-dark">$1,20,500</td>
                      <td>$60,000</td>
                      <td className="text-dark">Check</td>
                      <td>12 Nov 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="/invoice-details" className="link-default">
                          INV00022
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to="/customer-details"
                            className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          >
                            <img
                              src="/assets/img/users/user-08.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 fw-medium mb-0">
                              <Link to="/customer-details">Michael Johnson</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>30 Nov 2024</td>
                      <td className="text-dark">$7,50,300</td>
                      <td>$60,000</td>
                      <td className="text-dark">Check</td>
                      <td>25 Oct 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="/invoice-details" className="link-default">
                          INV00016
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to="/customer-details"
                            className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          >
                            <img
                              src="/assets/img/users/user-15.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 fw-medium mb-0">
                              <Link to="/customer-details">Daniel Martinez</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>12 Oct 2024</td>
                      <td className="text-dark">$9,99,999</td>
                      <td>$4,00,000</td>
                      <td className="text-dark">Cash</td>
                      <td>18 Oct 2024</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to="/invoice-details" className="link-default">
                          INV00015
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to="/customer-details"
                            className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          >
                            <img
                              src="/assets/img/users/user-27.jpg"
                              className="rounded-circle"
                              alt="img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-14 fw-medium mb-0">
                              <Link to="/customer-details">Ava Taylor</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>25 Sep 2024</td>
                      <td className="text-dark">$3,50,000</td>
                      <td>$1,50,000</td>
                      <td className="text-dark">Bank Transfer</td>
                      <td>10 Oct 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end row */}
    </>
  );
};

export default Index;
