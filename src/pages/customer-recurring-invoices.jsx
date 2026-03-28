import React from 'react';
import { Link } from 'react-router-dom';

const CustomerRecurringInvoices = () => {
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
        </div>
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                <div>
                  <p className="mb-1">Total Revenue</p>
                  <h6 className="fs-16 fw-semibold">$30,000,000</h6>
                </div>
                <div>
                  <span className="avatar bg-primary-subtle rounded-circle">
                    <i className="isax isax-maximize-circle text-primary fs-16"></i>
                  </span>
                </div>
              </div>
              <div
                className="progress mb-2"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: '100%;height: 5px;' }}
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
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                <div>
                  <p className="mb-1">Total Expenses</p>
                  <h6 className="fs-16 fw-semibold">$9,000,000</h6>
                </div>
                <div>
                  <span className="avatar bg-success-subtle rounded-circle">
                    <i className="isax isax-tick-circle text-success fs-16"></i>
                  </span>
                </div>
              </div>
              <div
                className="progress mb-2"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: '100%;height: 5px;' }}
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
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                <div>
                  <p className="mb-1">Net Profit</p>
                  <h6 className="fs-16 fw-semibold">$21,000,000</h6>
                </div>
                <div>
                  <span className="avatar bg-warning-subtle rounded-circle">
                    <i className="isax isax-info-circle text-warning fs-16"></i>
                  </span>
                </div>
              </div>
              <div
                className="progress mb-2"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: '100%;height: 5px;' }}
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
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                <div>
                  <p className="mb-1">Profit Margin</p>
                  <h6 className="fs-16 fw-semibold">75%</h6>
                </div>
                <div>
                  <span className="avatar bg-danger-subtle rounded-circle">
                    <i className="isax isax-dollar-circle text-danger fs-16"></i>
                  </span>
                </div>
              </div>
              <div
                className="progress mb-2"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: '100%;height: 5px;' }}
              >
                <div className="progress-bar bg-danger" style={{ width: '80%' }}></div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
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
          <div className="d-flex align-items-center gap-2">
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
                    <span>Paid($)</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Due Amount($)</span>
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
              5
            </span>
            $10,000 - $25,500
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
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
              <th>Recurring Cycle</th>
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
                <Link href="#" className="link-default">
                  INV00025
                </Link>
              </td>
              <td>22 Feb 2025</td>
              <td className="text-dark">6 Months</td>
              <td>25 Feb 2025</td>
              <td>04 Mar 2025</td>
              <td>$5,000</td>
              <td className="text-dark">$10,000</td>
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
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00024
                </Link>
              </td>
              <td>07 Feb 2025</td>
              <td className="text-dark">1 Year</td>
              <td>10 Feb 2025</td>
              <td>20 Feb 2025</td>
              <td>$10,750</td>
              <td className="text-dark">$25,750</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Unpaid <i className="isax isax-slash ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00023
                </Link>
              </td>
              <td>30 Jan 2025</td>
              <td className="text-dark">9 Months</td>
              <td>03 Feb 2025</td>
              <td>13 Feb 2025</td>
              <td>$20,000</td>
              <td className="text-dark">$50,125</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00022
                </Link>
              </td>
              <td>17 Jan 2025</td>
              <td className="text-dark">2 Years</td>
              <td>20 Jan 2025</td>
              <td>30 Jan 2025</td>
              <td>$50,000</td>
              <td className="text-dark">$75,900</td>
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Partially Paid
                  <i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00021
                </Link>
              </td>
              <td>04 Jan 2025</td>
              <td className="text-dark">3 Months</td>
              <td>07 Jan 2025</td>
              <td>17 Jan 2025</td>
              <td>$80,000</td>
              <td className="text-dark">$99,999</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Overdue
                  <i className="isax isax-danger ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00020
                </Link>
              </td>
              <td>09 Dec 2024</td>
              <td className="text-dark">3 Years</td>
              <td>12 Dec 2024</td>
              <td>22 Dec 2024</td>
              <td>$60,000</td>
              <td className="text-dark">$1,20,500</td>
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
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00019
                </Link>
              </td>
              <td>02 Dec 2024</td>
              <td className="text-dark">6 Months</td>
              <td>05 Dec 2024</td>
              <td>15 Dec 2024</td>
              <td>$1,25,000</td>
              <td className="text-dark">$2,50,000</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Unpaid <i className="isax isax-slash ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00018
                </Link>
              </td>
              <td>15 Nov 2024</td>
              <td className="text-dark">1 Year</td>
              <td>18 Nov 2024</td>
              <td>28 Nov 2024</td>
              <td>$5,00,000</td>
              <td className="text-dark">$5,00,750</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00017
                </Link>
              </td>
              <td>30 Nov 2024</td>
              <td className="text-dark">2 Years</td>
              <td>02 Nov 2024</td>
              <td>12 Nov 20244</td>
              <td>$2,50,500</td>
              <td className="text-dark">$7,50,300</td>
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Partially Paid
                  <i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00016
                </Link>
              </td>
              <td>12 Oct 2024</td>
              <td className="text-dark">6 Months</td>
              <td>15 Oct 2024</td>
              <td>25 Oct 2024</td>
              <td>$4,00,000</td>
              <td className="text-dark">$9,99,999</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Overdue
                  <i className="isax isax-danger ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00015
                </Link>
              </td>
              <td>05 Oct 2024</td>
              <td className="text-dark">3 Years</td>
              <td>08 Oct 2024</td>
              <td>18 Oct 2024</td>
              <td>$40,000</td>
              <td className="text-dark">$87,650</td>
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
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00014
                </Link>
              </td>
              <td>09 Sep 2024</td>
              <td className="text-dark">1 Year</td>
              <td>12 Sep 2024</td>
              <td>22 Sep 2024</td>
              <td>$30,000</td>
              <td className="text-dark">$69,420</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Unpaid <i className="isax isax-slash ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00013
                </Link>
              </td>
              <td>02 Sep 2024</td>
              <td className="text-dark">2 Years</td>
              <td>05 Sep 2024</td>
              <td>15 Sep 2024</td>
              <td>$15,000</td>
              <td className="text-dark">$33,210</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link href="#" className="link-default">
                  INV00012
                </Link>
              </td>
              <td>07 Aug 2024</td>
              <td className="text-dark">6 Months</td>
              <td>10 Aug 2024</td>
              <td>20 Aug 2024</td>
              <td>$1,50,000</td>
              <td className="text-dark">$2,10,000</td>
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Partially Paid
                  <i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <Link
                  href="#"
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
                      Range : <span className="text-gray-9">Range : $200 - $5695</span>
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
              <h6 className="mb-1">Delete Recurring Invoices</h6>
              <p className="mb-3">Are you sure, you want to delete recurring invoices?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/customer-recurring-invoices" className="btn btn-primary">
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

export default CustomerRecurringInvoices;
