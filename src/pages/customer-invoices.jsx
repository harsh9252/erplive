import React from 'react';
import { Link } from 'react-router-dom';

const CustomerInvoices = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Invoices</h6>
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
        </div>
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                <div>
                  <p className="mb-1">Total Invoices</p>
                  <h6 className="fs-16 fw-semibold">$25,000</h6>
                </div>
                <div>
                  <span className="avatar bg-primary rounded-circle">
                    <i className="isax isax-receipt-item"></i>
                  </span>
                </div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>5.62%
                </span>{' '}
                from last month
              </p>
              <span className="position-absolute end-0 bottom-0">
                <img src="/assets/img/bg/card-overlay-01.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                <div>
                  <p className="mb-1">Paid Invoices</p>
                  <h6 className="fs-16 fw-semibold">$18,500</h6>
                </div>
                <div>
                  <span className="avatar bg-success rounded-circle">
                    <i className="isax isax-tick-circle"></i>
                  </span>
                </div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>11.4%
                </span>{' '}
                from last month
              </p>
              <span className="position-absolute end-0 bottom-0">
                <img src="/assets/img/bg/card-overlay-02.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                <div>
                  <p className="mb-1">Pending Invoices</p>
                  <h6 className="fs-16 fw-semibold">$6,500</h6>
                </div>
                <div>
                  <span className="avatar bg-warning rounded-circle">
                    <i className="isax isax-timer"></i>
                  </span>
                </div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>8.52%
                </span>{' '}
                from last month
              </p>
              <span className="position-absolute end-0 bottom-0">
                <img src="/assets/img/bg/card-overlay-03.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                <div>
                  <p className="mb-1">Overdue Invoices</p>
                  <h6 className="fs-16 fw-semibold">$2,000</h6>
                </div>
                <div>
                  <span className="avatar bg-danger rounded-circle">
                    <i className="isax isax-information"></i>
                  </span>
                </div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-danger">
                  <i className="isax isax-received text-danger me-1"></i>7.45%
                </span>{' '}
                from last month
              </p>
              <span className="position-absolute end-0 bottom-0">
                <img src="/assets/img/bg/card-overlay-04.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <ul className="nav nav-tabs nav-tabs-bottom border-bottom mb-3">
        <li className="nav-item">
          <Link className="nav-link active" href="#">
            All
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            Paid
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            Overdue
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            Upcoming
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            Cancelled
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            Partially Paid
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            Unpaid
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            Refunded
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#">
            Draft
          </Link>
        </li>
      </ul>
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
            <div className="dropdown">
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
              <Link
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                <i className="isax isax-grid-3 me-1"></i>Column
              </Link>
              <ul className="dropdown-menu  dropdown-menu-lg">
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
                    <span>Created On</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Amount</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Paid</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Status</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" />
                    <span>Payment Mode</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" />
                    <span>Due Date</span>
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
              1
            </span>
            $10,000 - $25,500
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
              <th>Created On</th>
              <th>Amount</th>
              <th>Paid</th>
              <th className="no-sort">Status</th>
              <th className="no-sort">Payment Mode</th>
              <th>Due Date</th>
              <th className="no-sort"></th>
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00025
                </Link>
              </td>
              <td>22 Feb 2025</td>
              <td className="text-dark">$10,000</td>
              <td>$5,000</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Cash</td>
              <td>04 Mar 2025</td>
              <td>
                <button type="button" className="btn btn-light btn-sm" disabled>
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00024
                </Link>
              </td>
              <td>07 Feb 2025</td>
              <td className="text-dark">$25,750</td>
              <td>$10,750</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Unpaid<i className="isax isax-slash ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Check</td>
              <td>20 Feb 2025</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas2"
                >
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00023
                </Link>
              </td>
              <td>30 Jan 2025</td>
              <td className="text-dark">$50,125</td>
              <td>$20,000</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled<i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Cash</td>
              <td>13 Feb 2025</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas2"
                >
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00022
                </Link>
              </td>
              <td>17 Jan 2025</td>
              <td className="text-dark">$75,900</td>
              <td>$50,000</td>
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Partially Paid
                  <i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Check</td>
              <td>30 Jan 2025</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas2"
                >
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00021
                </Link>
              </td>
              <td>04 Jan 2025</td>
              <td className="text-dark">$99,999</td>
              <td>$80,000</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Overdue
                  <i className="isax isax-danger ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Check</td>
              <td>17 Jan 2025</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas2"
                >
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00020
                </Link>
              </td>
              <td>09 Dec 2024</td>
              <td className="text-dark">$1,20,500</td>
              <td>$60,000</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Cash</td>
              <td>22 Dec 2024</td>
              <td>
                <button type="button" className="btn btn-light btn-sm" disabled>
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00019
                </Link>
              </td>
              <td>02 Dec 2024</td>
              <td className="text-dark">$2,50,000</td>
              <td>$1,25,000</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Unpaid
                  <i className="isax isax-slash ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Cash</td>
              <td>15 Dec 2024</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas2"
                >
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00018
                </Link>
              </td>
              <td>15 Nov 2024</td>
              <td className="text-dark">$5,00,750</td>
              <td>$5,00,000</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled
                  <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Check</td>
              <td>28 Nov 2024</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas2"
                >
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00017
                </Link>
              </td>
              <td>30 Nov 2024</td>
              <td className="text-dark">$7,50,300</td>
              <td>$2,50,500</td>
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Partially Paid
                  <i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Check</td>
              <td>12 Nov 2024</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas2"
                >
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00016
                </Link>
              </td>
              <td>12 Oct 2024</td>
              <td className="text-dark">$9,99,999</td>
              <td>$4,00,000</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Overdue
                  <i className="isax isax-danger ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Cash</td>
              <td>25 Oct 2024</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas2"
                >
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00015
                </Link>
              </td>
              <td>05 Oct 2024</td>
              <td className="text-dark">$87,650</td>
              <td>$40,000</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Check</td>
              <td>18 Oct 2024</td>
              <td>
                <button type="button" className="btn btn-light btn-sm" disabled>
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00014
                </Link>
              </td>
              <td>05 Oct 2024</td>
              <td className="text-dark">$87,650</td>
              <td>$40,000</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Unpaid
                  <i className="isax isax-slash ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Cash</td>
              <td>18 Oct 2024</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas2"
                >
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00013
                </Link>
              </td>
              <td>02 Sep 2024</td>
              <td className="text-dark">$33,210</td>
              <td>$15,000</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled
                  <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Check</td>
              <td>15 Sep 2024</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas2"
                >
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
                <Link to="/customer-invoice-details" className="link-default">
                  INV00012
                </Link>
              </td>
              <td>07 Aug 2024</td>
              <td className="text-dark">$2,10,000</td>
              <td>$1,50,000</td>
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Partially Paid
                  <i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td className="text-dark">Check</td>
              <td>20 Aug 2024</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas2"
                >
                  Pay Now
                </button>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/customer-invoice-details"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="isax isax-eye me-2"></i>View
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
                      <i className="isax isax-document-download me-2"></i>Download Invoices as PDF
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
              <label htmlFor="dateRangePicker" className="form-label">
                Date Range
              </label>
              <div className="input-group position-relative">
                <input type="text" className="form-control date-range bookingrange rounded-end" />
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
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> $10,000
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> $25,750
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> $50,125
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> $75,900
                      </label>
                    </li>
                  </ul>
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
                  <ul className="mb-3">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-success me-1"></i>Paid
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-warning me-1"></i>Unpaid
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
                        <i className="fa-solid fa-circle fs-6 text-orange me-1"></i>Overdue
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <label className="form-label">Payment Mode</label>
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
                  <ul className="mb-3">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Cash
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Check
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Bank
                        Transfer
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Paypal
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Stripe
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
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Invoice</h6>
              <p className="mb-3">Are you sure, you want to delete Invoice?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/customer-invoices" className="btn btn-primary">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas2">
        <div className="offcanvas-header d-block pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
            <h6 className="offcanvas-title">Pay Invoice</h6>
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
            <div className="activity-feed bg-light rounded d-flex align-items-center justify-content-between mb-3">
              <div>
                <p className="text-primary fw-semibold mb-1">#INV00001</p>
                <p className="fs-13">
                  Due Date : <span className="text-dark">03 Jun 2025</span>
                </p>
              </div>
              <div>
                <p className="text-dark fw-semibold mb-1">Invoice Total</p>
                <p className="fs-13">$2560.25</p>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Amount to be Paid <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="fs-16">Select a Payment Method</h6>
                <span
                  className="d-flex align-items-center text-dark"
                  data-bs-dismiss="offcanvas"
                  data-bs-toggle="modal"
                  data-bs-target="#add_card"
                >
                  <i className="isax isax-add-circle5 text-primary me-1"></i>Add
                </span>
              </div>
              <div className="border rounded px-3 py-2 mb-2">
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input mt-0"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <div className="ms-2">
                    <label
                      className="form-check-label fw-semibold text-dark"
                      htmlFor="flexRadioDefault1"
                    >
                      Visa *******5658
                    </label>
                    <P className="fs-13 text-gray-5 fw-normal mb-0">Expires on: 12/26</P>
                  </div>
                </div>
              </div>
              <div className="border rounded px-3 py-2 mb-2">
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input mt-0"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <div className="ms-2">
                    <label
                      className="form-check-label fw-semibold text-dark"
                      htmlFor="flexRadioDefault2"
                    >
                      Visa *******5258
                    </label>
                    <P className="fs-13 text-gray-5 fw-normal mb-0">Expires on: 10/26</P>
                  </div>
                </div>
              </div>
              <div className="border rounded px-3 py-2 mb-2 d-flex align-items-center h-60">
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input mt-0"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                  />
                  <div className="ms-2">
                    <label
                      className="form-check-label fw-semibold text-dark"
                      htmlFor="flexRadioDefault3"
                    >
                      Stripe
                    </label>
                  </div>
                </div>
              </div>
              <div className="border rounded px-3 py-2 mb-2 d-flex align-items-center h-60 mb-3">
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input mt-0"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault4"
                  />
                  <div className="ms-2">
                    <label
                      className="form-check-label fw-semibold text-dark"
                      htmlFor="flexRadioDefault4"
                    >
                      Paypal
                    </label>
                  </div>
                </div>
              </div>
              <div className="border-bottom mb-3">
                <h6 className="fs-16 mb-2">Summary</h6>
                <div className=" mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <p className="mb-0">Payment</p>
                    <p>$565</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">Platform Fees</p>
                    <p>$18</p>
                  </div>
                </div>
              </div>
              <div className="mb-3 d-flex align-items-center justify-content-between">
                <h6>Total (USD)</h6>
                <h6>$596</h6>
              </div>
            </div>
            <div className="bg-success-100 p-2 d-flex align-items-center justify-content-center mb-3">
              <i className="isax isax-security-safe5 text-success fs-40 me-2"></i>
              <div>
                <p className="text-dark fw-semibold mb-0">100% Cashback Guarantee</p>
                <p className="fs-13">We Protect Your Money</p>
              </div>
            </div>
            <div className="mb-2">
              <Link href="#"
                className="btn btn-primary w-100 "
                data-bs-toggle="modal"
                data-bs-target="#success_modal"
              >
                Pay Now $596
              </Link>
            </div>
            <div className="offcanvas-footer">
              <button data-bs-dismiss="offcanvas" className="btn btn-outline-white w-100">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal fade" id="add_card">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Card</h5>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => { e.preventDefault(); }}>
                <div className="mb-3">
                  <label className="form-label">
                    Card Number <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Name on Card <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      Expiry Date <span className="text-danger">*</span>
                    </label>
                    <div className="input-group position-relative mb-3">
                      <input type="text" className="form-control datetimepicker rounded-end" />
                      <span className="input-icon-addon fs-16 text-gray-9">
                        <i className="isax isax-calendar-2"></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Security Number <span className="text-danger">*</span>
                    </label>
                    <div className="input-group position-relative mb-3">
                      <input type="text" className="form-control rounded-end" />
                      <span className="input-icon-addon fs-16 text-gray-9">
                        <i className="isax isax-lock-1"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade custom-modal" id="success_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <i className="isax isax-tick-circle5 fs-48 text-success"></i>
              </div>
              <h6 className="mb-1">Payment Successful</h6>
              <p className="mb-3 text-center">
                Your invoice payment has been successfully completed! Reference Number: #INV54896
              </p>
              <div className="d-flex justify-content-center">
                <Link to="/customer-invoices" className="btn btn-outline-white me-3">
                  Back to Invoices
                </Link>
                <Link href="#"
                  className="btn btn-primary close-modal"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#customcanvas3"
                  onClick="if (!window.__cfRLUnblockHandlers) return false; closeModal()"
                  data-cf-modified-5c80105f0255affb2c78f2f0-=""
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas3">
        <div className="offcanvas-header d-block pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
            <h6 className="offcanvas-title">Details</h6>
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
                  <ul className="mb-3">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-success me-1"></i>Paid
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-warning me-1"></i>Unpaid
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
                        <i className="fa-solid fa-circle fs-6 text-orange me-1"></i>Overdue
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h6 className="fs-16 fw-semibold mb-2">Payment Details</h6>
              <div className="border-bottom mb-3 pb-3">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <h6 className="fs-14 fw-semibold mb-1">PayPal</h6>
                      <p>examplepaypal.com</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <h6 className="fs-14 fw-semibold mb-1">Account </h6>
                      <p>examplepaypal.com</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <h6 className="fs-14 fw-semibold mb-1">Payment Term</h6>
                      <p className="d-flex align-items-center">
                        15 Days <span className="badge bg-danger ms-2">Due in 8 days</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h6 className="fs-16 mb-2">Invoice History</h6>
              <ul className="activity-feed bg-light rounded">
                <li className="feed-item timeline-item">
                  <p className="mb-1">
                    Status Changed to <span className="text-dark fw-semibold">Partially Paid</span>
                  </p>
                  <div className="invoice-date">
                    <span>
                      <i className="isax isax-calendar me-1"></i>17 Jan 2025
                    </span>
                  </div>
                </li>
                <li className="feed-item timeline-item">
                  <p className="mb-1">
                    <span className="text-dark fw-semibold">$300 </span> Partial Amount Paid on{' '}
                    <span className="text-dark fw-semibold">Paypal</span>
                  </p>
                  <div className="invoice-date">
                    <span>
                      <i className="isax isax-calendar me-1"></i>16 Jan 2025
                    </span>
                  </div>
                </li>
                <li className="feed-item timeline-item">
                  <p className="mb-1">
                    <span className="text-dark fw-semibold">John Smith </span> Created{' '}
                    <span className="text-dark fw-semibold">Invoice</span>
                    <Link href="#" className="text-primary">
                      #INV1254
                    </Link>
                  </p>
                  <div className="invoice-date">
                    <span>
                      <i className="isax isax-calendar me-1"></i>16 Jan 2025
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerInvoices;
