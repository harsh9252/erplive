import React from 'react';
import { Link } from 'react-router-dom';

const Subscriptions = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Subscriptions</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                <div>
                  <p className="mb-1">Total Transactions</p>
                  <h6 className="fs-16 fw-semibold">$5,340</h6>
                </div>
                <div>
                  <p className="data-attributes">
                    <span data-peity='{ "fill": ["#7539FF", "rgba(67, 87, 133, .09)"], "innerRadius": 16, "radius": 32 }'>
                      6/7
                    </span>
                  </p>
                </div>
              </div>
              <p className="fs-13 text-center border rounded-1 p-2 bg-light mb-0">
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
                  <p className="mb-1">Total Subscribers</p>
                  <h6 className="fs-16 fw-semibold">600</h6>
                </div>
                <div>
                  <p className="data-attributes">
                    <span data-peity='{ "fill": ["#3F8BFE", "rgba(67, 87, 133, .09)"], "innerRadius": 16, "radius": 32 }'>
                      4/7
                    </span>
                  </p>
                </div>
              </div>
              <p className="fs-13 text-center border rounded-1 p-2 bg-light mb-0">
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
                  <p className="mb-1">Active Subscribers</p>
                  <h6 className="fs-16 fw-semibold">560</h6>
                </div>
                <div>
                  <p className="data-attributes">
                    <span data-peity='{ "fill": ["#27AE60", "rgba(67, 87, 133, .09)"], "innerRadius": 16, "radius": 32 }'>
                      2/7
                    </span>
                  </p>
                </div>
              </div>
              <p className="fs-13 text-center border rounded-1 p-2 bg-light mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>8.12%
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
                  <p className="mb-1">Expired Subscribers</p>
                  <h6 className="fs-16 fw-semibold">40</h6>
                </div>
                <div>
                  <p className="data-attributes">
                    <span data-peity='{ "fill": ["#EF1E1E", "rgba(67, 87, 133, .09)"], "innerRadius": 16, "radius": 32 }'>
                      1/7
                    </span>
                  </p>
                </div>
              </div>
              <p className="fs-13 text-center border rounded-1 p-2 bg-light mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>7.15%
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
            <div className="dropdown">
              <Link href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center fw-medium"
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
                    <span>Company</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Plan</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Billing Cycle</span>
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
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Amount</span>
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
                    <span>Expiring Date</span>
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
            Companies Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              2
            </span>
            Plans Selected
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
              <th className="no-sort">Company</th>
              <th>Plan</th>
              <th>Billing Cycle</th>
              <th>Payment Mode</th>
              <th>Amount</th>
              <th>Created On</th>
              <th>Expiring On</th>
              <th>Status</th>
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-01.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Trend Hive</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Advanced (Monthly)</td>
              <td>30 Days</td>
              <td>
                <p className="text-dark">Cash</p>
              </td>
              <td>
                <p className="text-dark">$200</p>
              </td>
              <td>22 Feb 2025</td>
              <td>22 Mar 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-02.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Quick Cart</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Basic (Yearly)</td>
              <td>365 Days</td>
              <td>
                <p className="text-dark">Cheque</p>
              </td>
              <td>
                <p className="text-dark">$600</p>
              </td>
              <td>07 Feb 2025</td>
              <td>07 Mar 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-03.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Tech Bazaar</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Advanced (Monthly)</td>
              <td>30 Days</td>
              <td>
                <p className="text-dark">Cash</p>
              </td>
              <td>
                <p className="text-dark">$200</p>
              </td>
              <td>30 Jan 2025</td>
              <td>30 Feb 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-04.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Harvest Basket</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Advanced (Monthly)</td>
              <td>30 Days</td>
              <td>
                <p className="text-dark">Cheque</p>
              </td>
              <td>
                <p className="text-dark">$200</p>
              </td>
              <td>17 Jan 2025</td>
              <td>17 Feb 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-05.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Elite Mart</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Enterprise (Monthly)</td>
              <td>30 Days</td>
              <td>
                <p className="text-dark">Cheque</p>
              </td>
              <td>
                <p className="text-dark">$400</p>
              </td>
              <td>04 Jan 2025</td>
              <td>04 Feb 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-06.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Prime Mart</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Advanced (Monthly)</td>
              <td>30 Days</td>
              <td>
                <p className="text-dark">Cash</p>
              </td>
              <td>
                <p className="text-dark">$200</p>
              </td>
              <td>09 Dec 2024</td>
              <td>09 Jan 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-07.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Trend Crafters</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Enterprise (Yearly)</td>
              <td>365 Days</td>
              <td>
                <p className="text-dark">Cash</p>
              </td>
              <td>
                <p className="text-dark">$4800</p>
              </td>
              <td>02 Dec 2024</td>
              <td>02 Jan 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-08.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Fresh Nest</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Basic (Monthly)</td>
              <td>30 Days</td>
              <td>
                <p className="text-dark">Cheque</p>
              </td>
              <td>
                <p className="text-dark">$50</p>
              </td>
              <td>30 Nov 2024</td>
              <td>30 Dec 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-09.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Gizmo Mart</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Basic (Yearly)</td>
              <td>365 Days</td>
              <td>
                <p className="text-dark">Cheque</p>
              </td>
              <td>
                <p className="text-dark">$600</p>
              </td>
              <td>15 Nov 2024</td>
              <td>15 Dec 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-10.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Dream Space</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Enterprise (Monthly)</td>
              <td>30 Days</td>
              <td>
                <p className="text-dark">Cash</p>
              </td>
              <td>
                <p className="text-dark">$400</p>
              </td>
              <td>12 Oct 2024</td>
              <td>12 Nov 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-11.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Mega Mart</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Advanced (Monthly)</td>
              <td>30 Days</td>
              <td>
                <p className="text-dark">Cheque</p>
              </td>
              <td>
                <p className="text-dark">$200</p>
              </td>
              <td>05 Oct 2024</td>
              <td>05 Nov 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-12.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Decor Ease</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Basic (Yearly)</td>
              <td>365 Days</td>
              <td>
                <p className="text-dark">Cash</p>
              </td>
              <td>
                <p className="text-dark">$600</p>
              </td>
              <td>09 Sep 2024</td>
              <td>09 Oct 2024</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Unpaid
                  <i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-13.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Electro World</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Advanced (Monthly)</td>
              <td>30 Days</td>
              <td>
                <p className="text-dark">Cheque</p>
              </td>
              <td>
                <p className="text-dark">$200</p>
              </td>
              <td>02 Sep 2024</td>
              <td>02 Oct 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/icons/company-14.svg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Urban Home</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>Enterprise (Monthly)</td>
              <td>30 Days</td>
              <td>
                <p className="text-dark">Cheque</p>
              </td>
              <td>
                <p className="text-dark">$400</p>
              </td>
              <td>07 Aug 2024</td>
              <td>07 Sep 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#view_invoice_modal"
                    >
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-document-download me-2"></i>Download
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
              <label className="form-label">Company</label>
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
                            src="/assets/img/icons/company-01.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Trend Hive
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/icons/company-02.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Quick Cart
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/icons/company-03.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Tech Bazaar
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/icons/company-04.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Harvest Basket
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
              <label id="dateRangePicker" className="form-label">
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
              <label className="form-label">Plan</label>
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
                  <ul className="mb-3">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Advanced
                        (Monthly)
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Basic
                        (Yearly)
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Enterprise
                        (Monthly)
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-3">
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
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Cheque
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
                        <i className="fa-solid fa-circle fs-6 text-danger me-1"></i>Unpaid
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
      <div id="view_invoice_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Preview</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form action="#">
              <div className="modal-body">
                <div className="row">
                  <div className="mx-auto">
                    <div>
                      <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-3 mb-3">
                        <div className="d-flex align-items-center flex-wrap row-gap-3">
                          <Link
                            href="#"
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
                      <div className="card">
                        <div className="card-body">
                          <div className="bg-light p-4 rounded position-relative mb-3">
                            <div className="position-absolute top-0 end-0">
                              <img src="/assets/img/bg/card-bg.png" alt="User Img" />
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap mb-3 pb-2 position-relative z-1">
                              <div className="mb-3">
                                <h4 className="mb-1">Invoice</h4>
                                <div className="d-flex align-items-center flex-wrap row-gap-3">
                                  <div className="me-4">
                                    <h6 className="fs-14 fw-semibold mb-1">
                                      Dreams Technologies Pvt Ltd.,
                                    </h6>
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
                                    <h6 className="fs-14 fw-semibold mb-1">
                                      Kanakku Invoice Management
                                    </h6>
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
                                      <div>
                                        <span className="avatar avatar-lg flex-shrink-0 me-2">
                                          <img src="/assets/img/billing-icon.jpg" alt="User Img" />
                                        </span>
                                      </div>
                                      <p className="fs-14 fw-semibold text-dark">Timesquare Tech</p>
                                    </div>
                                    <p className="mb-1">299 Star Trek Drive, Florida, 3240, USA</p>
                                    <p className="mb-1">Phone : +1 54664 75945</p>
                                    <p className="mb-1">Email : </p>
                                    <p className="mb-1">GST : 243E45767889</p>
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
                                    <th>Plan Name</th>
                                    <th>Rate</th>
                                    <th>Discount</th>
                                    <th>Tax</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td className="text-dark">Basic</td>
                                    <td>$99.00</td>
                                    <td>0%</td>
                                    <td>$0.00</td>
                                    <td>$99.00</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="border-bottom mb-3">
                            <div className="row">
                              <div className="col-lg-6">
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
                                        Account Number :{' '}
                                        <span className="text-dark">782459739212</span>
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
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h6 className="fs-14 fw-semibold">Amount</h6>
                                    <h6 className="fs-14 fw-semibold">$99.00</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h6 className="fs-14 fw-semibold">CGST (0%)</h6>
                                    <h6 className="fs-14 fw-semibold">$0.00</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h6 className="fs-14 fw-semibold">SGST (0%)</h6>
                                    <h6 className="fs-14 fw-semibold">$0.00</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                                    <h6 className="fs-14 fw-semibold">Discount (0%)</h6>
                                    <h6 className="fs-14 fw-semibold text-danger">- $0</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                                    <h6>Total (USD)</h6>
                                    <h6>$99.00</h6>
                                  </div>
                                  <div>
                                    <h6 className="fs-14 fw-semibold mb-1">Total In Words</h6>
                                    <p>Ninety Nine Dollars</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-light d-flex align-items-center justify-content-between p-4 rounded card-bg">
                            <div>
                              <h6 className="fs-14 fw-semibold mb-1">
                                Dreams Technologies Pvt Ltd.,
                              </h6>
                              <p>15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom</p>
                            </div>
                            <div>
                              <img src="/assets/img/invoice-logo.svg" alt="User Img" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
              <h6 className="mb-1">Delete Subscriptions</h6>
              <p className="mb-3">Are you sure, you want to delete subscriptions?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/subscriptions" className="btn btn-primary">
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

export default Subscriptions;
