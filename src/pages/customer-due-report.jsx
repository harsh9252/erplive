import React from 'react';
import { Link } from 'react-router-dom';

const CustomerDueReport = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Customer Due Report</h6>
        </div>
        <div className="my-xl-auto">
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
      <div className="border-bottom mb-3">
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="card shadow-lg position-relative border-0 border-bottom border-3 border-primary custom-border">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div className="me-2">
                    <span className="avatar bg-primary rounded-circle border border-primary text-white">
                      <i className="isax isax-profile-2user fs-16"></i>
                    </span>
                  </div>
                  <div>
                    <p className="mb-1 text-truncate">Total Customers</p>
                    <h6 className="fs-16 fw-semibold mb-0">320</h6>
                  </div>
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
          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="card shadow-lg position-relative border-0 border-bottom border-3 border-success custom-border">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div className="me-2">
                    <span className="avatar bg-success rounded-circle border border-success text-white">
                      <i className="isax isax-profile-2user fs-16"></i>
                    </span>
                  </div>
                  <div>
                    <p className="mb-1 text-truncate">Outstanding Amount</p>
                    <h6 className="fs-16 fw-semibold mb-0">$3,500,000</h6>
                  </div>
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
          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="card shadow-lg position-relative border-0 border-bottom border-3 border-warning custom-border">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div className="me-2">
                    <span className="avatar bg-warning rounded-circle border border-warning text-white">
                      <i className="isax isax-dollar-circle fs-16"></i>
                    </span>
                  </div>
                  <div>
                    <p className="mb-1 text-truncate">Overdue Payments</p>
                    <h6 className="fs-16 fw-semibold mb-0">$1,200,000</h6>
                  </div>
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
          <div className="col-xl-3 col-lg-6 col-md-6">
            <div className="card shadow-lg position-relative border-0 border-bottom border-3 border-danger custom-border">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div className="me-2">
                    <span className="avatar bg-danger rounded-circle border border-danger text-white">
                      <i className="isax isax-dollar-circle fs-16"></i>
                    </span>
                  </div>
                  <div>
                    <p className="mb-1 text-truncate">Margin</p>
                    <h6 className="fs-16 fw-semibold mb-0">65%</h6>
                  </div>
                </div>
                <p className="fs-13 mb-0">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>7.45%
                  </span>{' '}
                  from last month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
            <div id="reportrange" className="reportrange-picker d-flex align-items-center">
              <i className="isax isax-calendar text-gray-5 fs-14 me-1"></i>
              <span className="reportrange-picker-field">16 Apr 25 - 16 Apr 25</span>
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
                    <span>Date</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Vendor</span>
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
                    <input className="form-check-input m-0 me-2" type="checkbox" />
                    <span>Payment Mode</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" />
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
            Vendors Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              1
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
              <th>ID</th>
              <th>Customer</th>
              <th>Total Amount</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Due</th>
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
                <Link href="#">INV00025</Link>
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
              <td>$10,000</td>
              <td>$5,000</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td>$50</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00024</Link>
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
              <td>$15,000</td>
              <td>$10,750</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Pending <i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td>$100</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00023</Link>
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
              <td>$20,000</td>
              <td>$20,000</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td>$200</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00022</Link>
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
              <td>$9,000</td>
              <td>$50,000</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td>$500</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00021</Link>
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
              <td>$12,000</td>
              <td>$80,000</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Pending <i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td>$800</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00020</Link>
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
              <td>$17,000</td>
              <td>$60,000</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td>$600</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00019</Link>
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
              <td>$23,000</td>
              <td>$1,25,000</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td>$125</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00018</Link>
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
              <td>$25,000</td>
              <td>$5,00,000</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Pending <i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td>$50000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00017</Link>
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
                      <Link to="/customer-details">Isabella Scott</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$18,000</td>
              <td>$2,50,500</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td>$25000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00016</Link>
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
                      <Link to="/customer-details">Daniel Martinez</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$13,000</td>
              <td>$4,00,000</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td>$40000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00015</Link>
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
              <td>$27,000</td>
              <td>$40,000</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Pending <i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td>$40,000</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00014</Link>
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
              <td>$23,500</td>
              <td>$30,000</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td>$3355</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00013</Link>
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
              <td>$24,000</td>
              <td>$15,000</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td>$1500</td>
            </tr>
            <tr>
              <td>
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </td>
              <td>
                <Link href="#">INV00012</Link>
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
              <td>$35,000</td>
              <td>$1,50,000</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Pending <i className="isax isax-timer ms-1"></i>
                </span>
              </td>
              <td>$1450</td>
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
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />{' '}
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
                        Michael Johnson
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-30.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Olivia Harris
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-16.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        David Anderson
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
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />{' '}
                        Select All
                      </label>
                      <Link href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="badge-dot bg-success me-1"></span>Paid
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="badge-dot bg-warning me-1"></span>Pending
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="badge-dot bg-danger me-1"></span>Cancelled
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
    </>
  );
};

export default CustomerDueReport;
