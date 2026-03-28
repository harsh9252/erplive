import React from 'react';
import { Link } from 'react-router-dom';

const RecurringInvoices = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Recurring Invoices</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="dropdown">
            <Link href="#"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="#">
                  Download as PDF
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  Download as Excel
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link to="/add-invoice" className="btn btn-primary d-flex align-items-center">
              <i className="isax isax-add-circle5 me-1"></i>New Invoice
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2">
                <div className="text-truncate">
                  <p className="mb-1 text-truncate">Total Recurring Invoices</p>
                  <h6 className="fs-16 fw-semibold">950</h6>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-primary-subtle rounded-circle">
                    <i className="isax isax-maximize-circle fs-24 text-primary"></i>
                  </span>
                </div>
              </div>
              <div
                className="progress progress-xs mb-2 progress-animate"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="progress-bar bg-primary" style={{ width: '80%' }}></div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>5.62%
                </span>{' '}
                from last month
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2">
                <div>
                  <p className="mb-1">Paid Invoices</p>
                  <h6 className="fs-16 fw-semibold">800</h6>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-success-subtle rounded-circle">
                    <i className="isax isax-tick-circle fs-24 text-success"></i>
                  </span>
                </div>
              </div>
              <div
                className="progress progress-xs mb-2 progress-animate"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="progress-bar bg-success" style={{ width: '80%' }}></div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>11.4%
                </span>{' '}
                from last month
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2">
                <div>
                  <p className="mb-1">Expired Invoices</p>
                  <h6 className="fs-16 fw-semibold">150</h6>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-warning-subtle rounded-circle">
                    <i className="isax isax-info-circle fs-24 text-warning"></i>
                  </span>
                </div>
              </div>
              <div
                className="progress progress-xs mb-2 progress-animate"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="progress-bar bg-warning" style={{ width: '80%' }}></div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>8.52%
                </span>{' '}
                from last month
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2">
                <div>
                  <p className="mb-1">Total Revenue</p>
                  <h6 className="fs-16 fw-semibold">₹500,000</h6>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-danger-subtle rounded-circle">
                    <i className="isax isax-dollar-circle fs-24 text-danger"></i>
                  </span>
                </div>
              </div>
              <div
                className="progress progress-xs mb-2 progress-animate"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="progress-bar bg-danger" style={{ width: '30%' }}></div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-danger">
                  <i className="isax isax-received text-danger me-1"></i>7.45%
                </span>{' '}
                from last month
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
            <Link
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </Link>
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown me-2">
              <Link href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="isax isax-sort me-1"></i>Sort By :{' '}
                <span className="fw-normal ms-1">Latest</span>
              </Link>
              <ul className="dropdown-menu  dropdown-menu-end">
                <li>
                  <Link href="#" className="dropdown-item">
                    Latest
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item">
                    Oldest
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <Link href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                <i className="isax isax-grid-3 me-1"></i>Column
              </Link>
              <ul className="dropdown-menu  dropdown-menu">
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>ID</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Customer</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Created On</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" />
                    <span>Recurring Cycle</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" />
                    <span>Issue Date</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" />
                    <span>Due Date</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Paid ($)</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Due Amount ($)</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Status</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="align-items-center gap-2 flex-wrap filter-info mt-3">
          <h6 className="fs-13 fw-semibold">Filters</h6>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            Customers Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              2
            </span>
            Status Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <Link href="#" className="link-danger fw-medium text-decoration-underline ms-md-1">
            Clear All
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead className="thead-light">
            <tr>
              <th className="no-sort">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" id="select-all" />
                </div>
              </th>
              <th className="no-sort">ID</th>
              <th>Customer</th>
              <th>Created On</th>
              <th className="no-sort">Recurring Cycle</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Paid</th>
              <th>Due Amount</th>
              <th className="no-sort">Status</th>
              <th className="no-sort"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00025
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-28.jpg"
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
              <td className="text-gray-9">6 Months</td>
              <td>25 Feb 2025</td>
              <td>04 Mar 2025</td>
              <td>$5,000</td>
              <td className="text-gray-9">$10,000</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00024
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-29.jpg"
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
              <td className="text-gray-9">1 Year</td>
              <td>10 Feb 2025</td>
              <td>20 Feb 2025</td>
              <td>$10,750</td>
              <td className="text-gray-9">$25,750</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Unpaid<i className="isax isax-slash ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00023
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-12.jpg"
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
              <td>30 Jan 2025</td>
              <td className="text-gray-9">9 Months</td>
              <td>03 Feb 2025</td>
              <td>13 Feb 2025</td>
              <td>$20,000</td>
              <td className="text-gray-9">$50,125</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled<i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00022
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-06.jpg"
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
              <td>17 Jan 2025</td>
              <td className="text-gray-9">2 Years</td>
              <td>20 Jan 2025</td>
              <td>30 Jan 2025</td>
              <td>$50,000</td>
              <td className="text-gray-9">$75,900</td>
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Partially Paid<i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00021
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-30.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Olivia Harris</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>04 Jan 2025</td>
              <td className="text-gray-9">3 Months</td>
              <td>07 Jan 2025</td>
              <td>17 Jan 2025</td>
              <td>$80,000</td>
              <td className="text-gray-9">$99,999</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Uncollectable <i className="isax isax-danger ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00020
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-16.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">David Anderson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>09 Dec 2024</td>
              <td className="text-gray-9">3 Years</td>
              <td>12 Dec 2024</td>
              <td>22 Dec 2024</td>
              <td>$60,000</td>
              <td className="text-gray-9">$1,20,500</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00019
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-17.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Emma Lewis</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>02 Dec 2024</td>
              <td className="text-gray-9">6 Months</td>
              <td>05 Dec 2024</td>
              <td>15 Dec 2024</td>
              <td>$1,25,000</td>
              <td className="text-gray-9">$2,50,000</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Unpaid<i className="isax isax-slash ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00018
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-23.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Robert Thomas</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>15 Nov 2024</td>
              <td className="text-gray-9">1 Year</td>
              <td>18 Nov 2024</td>
              <td>28 Nov 2024</td>
              <td>$5,00,000</td>
              <td className="text-gray-9">$5,00,750</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled<i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00017
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-07.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Isabella Scott</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>30 Nov 2024</td>
              <td className="text-gray-9">2 Years</td>
              <td>02 Nov 2024</td>
              <td>12 Nov 2024</td>
              <td>$2,50,500</td>
              <td className="text-gray-9">$7,50,300</td>
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Partially Paid<i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00016
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-31.jpg"
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
              <td className="text-gray-9">6 Months</td>
              <td>15 Oct 2024</td>
              <td>25 Oct 2024</td>
              <td>$4,00,000</td>
              <td className="text-gray-9">$9,99,999</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Uncollectable <i className="isax isax-danger ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00015
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-41.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Charlotte Brown</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>05 Oct 2024</td>
              <td className="text-gray-9">3 Years</td>
              <td>08 Oct 2024</td>
              <td>18 Oct 2024</td>
              <td>$40,000</td>
              <td className="text-gray-9">$87,650</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00014
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-42.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">William Parker</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>09 Sep 2024</td>
              <td className="text-gray-9">1 Year</td>
              <td>12 Sep 2024</td>
              <td>22 Sep 2024</td>
              <td>$30,000</td>
              <td className="text-gray-9">$69,420</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Unpaid<i className="isax isax-slash ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00013
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-43.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Mia Thompson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>02 Sep 2024</td>
              <td className="text-gray-9">2 Years</td>
              <td>05 Sep 2024</td>
              <td>15 Sep 2024</td>
              <td>$15,000</td>
              <td className="text-gray-9">$33,210</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled<i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#"
                  className="link-default"
                  data-bs-toggle="modal"
                  data-bs-target="#view_invoice"
                >
                  INV00012
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-44.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Amelia Robinson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>07 Aug 2024</td>
              <td className="text-gray-9">6 Months</td>
              <td>10 Aug 2024</td>
              <td>20 Aug 2024</td>
              <td>$1,50,000</td>
              <td className="text-gray-9">$2,10,000</td>
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Partially Paid<i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-invoice" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-send-2 me-2"></i>Send
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-stop-circle me-2"></i>Stop Recurring
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas">
        <div className="offcanvas-header d-block pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
            <h6 className="offcanvas-title">Filter</h6>
            <button
              type="button"
              className="btn-close btn-close-modal custom-btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
        <div className="offcanvas-body pt-3">
          <form action="#">
            <div className="mb-3">
              <label className="form-label">Customers</label>
              <div className="dropdown">
                <Link href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <div className="mb-3">
                    <div className="input-icon-start position-relative">
                      <span className="input-icon-addon fs-12">
                        <i className="isax isax-search-normal"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <ul className="mb-3">
                    <li className="d-flex align-items-center justify-content-between mb-3">
                      <label className="d-inline-flex align-items-center text-gray-9">
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />
                        Select All
                      </label>
                      <Link href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-28.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Emily Clark
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-29.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        John Carter
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-12.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Sophia White
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-06.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Sophia White
                      </label>
                    </li>
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <Link href="#" className="btn btn-outline-white w-100 close-filter">
                        Cancel
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link href="#" className="btn btn-primary w-100">
                        Select
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Date Range</label>
              <div className="input-group position-relative">
                <input
                  type="text"
                  className="form-control date-range bookingrange rounded-end"
                  value="dd/mm/yyyy - dd/mm/yyyy"
                />
                <span className="input-icon-addon fs-16 text-gray-9">
                  <i className="isax isax-calendar-2"></i>
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <div className="dropdown">
                <Link href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <div className="filter-range">
                    <input type="text" id="range_03" />
                    <p>
                      Range : <span className="text-gray-9">$200 - $5695</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <div className="dropdown">
                <Link href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <ul className="mb-0">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-success me-1"></i>Paid
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-warning me-1"></i>Pending
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-danger me-1"></i>Cancelled
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-purple me-1"></i>Partially Paid
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-orange me-1"></i>Uncollectable
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="offcanvas-footer">
              <div className="row g-2">
                <div className="col-6">
                  <Link href="#" className="btn btn-outline-white w-100">
                    Reset
                  </Link>
                </div>
                <div className="col-6">
                  <button
                    data-bs-dismiss="offcanvas"
                    className="btn btn-primary w-100"
                    id="filter-submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="modal fade" id="view_invoice">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-flex mb-3 pb-3 align-items-center justify-content-between border-bottom">
                <h5 className="mb-0">Preview</h5>
                <button
                  type="button"
                  className="text-danger bg-transparent border-0 outline-0 p-0 lh-sm"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="isax isax-close-circle5 fs-16"></i>
                </button>
              </div>
              <div>
                <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-3 mb-3">
                  <div className="d-flex align-items-center flex-wrap row-gap-3">
                    <Link href="#"
                      className="btn btn-outline-white d-inline-flex align-items-center me-3"
                    >
                      <i className="isax isax-document-like me-1"></i>Download PDF
                    </Link>
                    <Link href="#"
                      className="btn btn-outline-white d-inline-flex align-items-center me-3"
                    >
                      <i className="isax isax-message-notif me-1"></i>Send Email
                    </Link>
                    <Link href="#"
                      className="btn btn-outline-white d-inline-flex align-items-center me-3"
                    >
                      <i className="isax isax-printer me-1"></i>Print
                    </Link>
                  </div>
                </div>
                <div className="bg-light p-4 rounded position-relative mb-3">
                  <div className="position-absolute top-0 end-0">
                    <img src="/assets/img/bg/card-bg.png" alt="User Img" />
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap mb-3 pb-2 position-relative z-1">
                    <div className="mb-3">
                      <h4 className="mb-1">Invoice</h4>
                      <div className="d-flex align-items-center flex-wrap row-gap-3">
                        <div className="me-4">
                          <h6 className="fs-14 fw-semibold mb-1">Dreams Technologies Pvt Ltd.,</h6>
                          <p>15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom</p>
                        </div>
                        <span>
                          <img
                            src="/assets/img/icons/not-paid.png"
                            alt="User Img"
                            width="48"
                            height="48"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <img
                        src="/assets/img/invoice-logo.svg"
                        className="invoice-logo-dark"
                        alt="img"
                      />
                      <img
                        src="/assets/img/invoice-logo-white-2.svg"
                        className="invoice-logo-white"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className="row gy-3 position-relative z-1">
                    <div className="col-lg-4">
                      <div>
                        <h6 className="mb-2 fs-16 fw-semibold">Invoice Details</h6>
                        <div>
                          <p className="mb-1">
                            Invoice Number : <span className="text-dark">INV215654</span>
                          </p>
                          <p className="mb-1">
                            Issued On : <span className="text-dark">25 Jan 2025</span>
                          </p>
                          <p className="mb-1">
                            Due Date : <span className="text-dark">31 Jan 2025</span>
                          </p>
                          <p className="mb-1">
                            Recurring Invoice : <span className="text-dark">Monthly</span>
                          </p>
                          <span className="badge bg-danger">Due in 8 days</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <h6 className="mb-2 fs-16 fw-semibold">Billing From</h6>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">Kanakku Invoice Management</h6>
                          <p className="mb-1">15 Hodges Mews, HP12 3JL, United Kingdom</p>
                          <p className="mb-1">Phone : +1 54664 75945</p>
                          <p className="mb-1">Email : </p>
                          <p className="mb-1">GST : 243E45767889</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div>
                        <h6 className="mb-2 fs-16 fw-semibold">Billing To</h6>
                        <div className="bg-white rounded p-3">
                          <div className="d-flex align-items-center mb-1">
                            <div className="me-2">
                              <span>
                                <img
                                  src="/assets/img/icons/timesquare-icon.svg"
                                  alt="image"
                                  className="img-fluid rounded"
                                />
                              </span>
                            </div>
                            <h6 className="fs-14 fw-semibold">Timesquare Tech</h6>
                          </div>
                          <p className="mb-1">299 Star Trek Drive, Florida, 3240, USA</p>
                          <p className="mb-1">Phone : +1 54664 75945</p>
                          <p className="mb-1">Email : </p>
                          <p className="mb-0">GST : 243E45767889</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h6 className="mb-3">Product / Service Items</h6>
                  <div className="table-responsive rounded border-bottom-0 border">
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th>#</th>
                          <th>Product/Service</th>
                          <th>Quantity</th>
                          <th>Unit</th>
                          <th>Rate</th>
                          <th>Discount</th>
                          <th>Tax (%)</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td className="text-dark">T-Shirt</td>
                          <td>2</td>
                          <td>Pcs</td>
                          <td>$200.00</td>
                          <td>10%</td>
                          <td>$36.00</td>
                          <td>$396.00</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td className="text-dark">Office Chair</td>
                          <td>1</td>
                          <td>Pcs</td>
                          <td>$350.00</td>
                          <td>5%</td>
                          <td>$33.25</td>
                          <td>$365.75</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td className="text-dark">LED Monitor</td>
                          <td>1</td>
                          <td>Pcs</td>
                          <td>$399.00</td>
                          <td>2%</td>
                          <td>$39.10</td>
                          <td>$398.90</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td className="text-dark">Smartphone</td>
                          <td>4</td>
                          <td>Pcs</td>
                          <td>$100.00</td>
                          <td>10%</td>
                          <td>$36.00</td>
                          <td>$396.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="border-bottom mb-3">
                  <div className="row">
                    <div className="col-xl-8 col-lg-6">
                      <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                        <div className="me-3">
                          <p className="mb-2">Scan to the pay</p>
                          <span>
                            <img src="/assets/img/icons/qr.png" alt="User Img" />
                          </span>
                        </div>
                        <div>
                          <h6 className="mb-2">Bank Details</h6>
                          <div>
                            <p className="mb-1">
                              Bank Name : <span className="text-dark">ABC Bank</span>
                            </p>
                            <p className="mb-1">
                              Account Number : <span className="text-dark">782459739212</span>
                            </p>
                            <p className="mb-1">
                              IFSC Code : <span className="text-dark">ABC0001345</span>
                            </p>
                            <p className="mb-0">
                              Payment Reference :{' '}
                              <span className="text-dark">INV-20250220-001</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 fw-semibold">Amount</h6>
                          <h6 className="fs-14 fw-semibold">$1,793.12</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 fw-semibold">CGST (9%)</h6>
                          <h6 className="fs-14 fw-semibold">$18</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-14 fw-semibold">SGST (9%)</h6>
                          <h6 className="fs-14 fw-semibold">$18</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                          <h6 className="fs-14 fw-semibold">Discount</h6>
                          <h6 className="fs-14 fw-semibold text-danger">$18</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                          <h6>Total (USD)</h6>
                          <h6>$596</h6>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">Total In Words</h6>
                          <p>Five Hundred &amp; Ninety Six Dollars</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="mb-3">
                      <div className="mb-3">
                        <h6 className="fs-14 fw-semibold mb-1">Terms and Conditions</h6>
                        <p>The Payment must be returned in the same condition.</p>
                      </div>
                      <div>
                        <h6 className="fs-14 fw-semibold mb-1">Notes</h6>
                        <p>
                          All charges are final and include applicable taxes, fees, and additional
                          costs
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="text-lg-end mb-3">
                      <span>
                        <img src="/assets/img/icons/sign.png" className="sign-dark" alt="img" />
                      </span>
                      <h6 className="fs-14 fw-semibold mb-1">Ted M. Davis</h6>
                      <p>Manager</p>
                    </div>
                  </div>
                </div>
                <div className="bg-light d-flex align-items-center justify-content-between p-4 rounded card-bg flex-wrap gap-2">
                  <div>
                    <h6 className="fs-14 fw-semibold mb-1">Dreams Technologies Pvt Ltd.,</h6>
                    <p>15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom</p>
                  </div>
                  <div>
                    <img
                      src="/assets/img/invoice-logo.svg"
                      className="invoice-logo-dark"
                      alt="img"
                    />
                    <img
                      src="/assets/img/invoice-logo-white-2.svg"
                      className="invoice-logo-white"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Invoice</h6>
              <p className="mb-3">Are you sure, you want to delete invoice?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/recurring-invoices" className="btn btn-primary">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecurringInvoices;
