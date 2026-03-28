import React from 'react';

const ExpenseReport = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Expense Report</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="dropdown">
            <Link
              href="#"
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
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <p className="mb-1">Total Expense</p>
                  <h6 className="fs-16 fw-semibold mb-0">$750,000</h6>
                </div>
                <div>
                  <div className="chart-set" id="radial-chart10"></div>
                </div>
              </div>
              <div className="bg-light py-2 px-3 rounded">
                <p className="fs-13 mb-0">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>5.62%
                  </span>{' '}
                  from last month
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <p className="mb-1">Approved Expense</p>
                  <h6 className="fs-16 fw-semibold mb-0">$550,000</h6>
                </div>
                <div>
                  <div className="chart-set" id="radial-chart7"></div>
                </div>
              </div>
              <div className="bg-light py-2 px-3 rounded">
                <p className="fs-13 mb-0">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>11.4%
                  </span>{' '}
                  from last month
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <p className="mb-1">Pending Expense</p>
                  <h6 className="fs-16 fw-semibold mb-0">$150,000</h6>
                </div>
                <div>
                  <div className="chart-set" id="radial-chart8"></div>
                </div>
              </div>
              <div className="bg-light py-2 px-3 rounded">
                <p className="fs-13 mb-0">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>8.12%
                  </span>{' '}
                  from last month
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <p className="mb-1">Rejected Expense</p>
                  <h6 className="fs-16 fw-semibold mb-0">$50,000</h6>
                </div>
                <div>
                  <div className="chart-set" id="radial-chart9"></div>
                </div>
              </div>
              <div className="bg-light py-2 px-3 rounded">
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
              <Link
                href="#"
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
                    <span>Date</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Reference Number</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Description</span>
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
              <th>Date</th>
              <th className="no-sort">Reference Number</th>
              <th className="no-sort">Description</th>
              <th className="no-sort">Attachment</th>
              <th>Amount</th>
              <th className="no-sort">Payment Mode</th>
              <th className="no-sort">Status</th>
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
                  EXP00025
                </Link>
              </td>
              <td>22 Feb 2025</td>
              <td>PO-202402-012</td>
              <td>Payment for raw materials</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$10,000</td>
              <td className="text-dark">Cash</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
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
                  EXP00024
                </Link>
              </td>
              <td>07 Feb 2025</td>
              <td>INV00025</td>
              <td>Purchase of packaging materials</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$25,750</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Pending <i className="isax isax-timer ms-1"></i>
                </span>
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
                  EXP00023
                </Link>
              </td>
              <td>30 Jan 2025</td>
              <td>PO-202401-011</td>
              <td>Payment for electronic components</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$50,125</td>
              <td className="text-dark">Cash</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled <i className="isax isax-close-circle ms-1"></i>
                </span>
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
                  EXP00022
                </Link>
              </td>
              <td>17 Jan 2025</td>
              <td>REF12345</td>
              <td>Social media ad campaign</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$75,900</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
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
                  EXP00021
                </Link>
              </td>
              <td>04 Jan 2025</td>
              <td>REF18294</td>
              <td>Business trip for sales meeting</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$99,999</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Pending <i className="isax isax-timer ms-1"></i>
                </span>
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
                  EXP00020
                </Link>
              </td>
              <td>09 Dec 2025</td>
              <td>PO-202412-010</td>
              <td>Wholesale purchase of inventory</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$1,20,500</td>
              <td className="text-dark">Cash</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled <i className="isax isax-close-circle ms-1"></i>
                </span>
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
                  EXP00019
                </Link>
              </td>
              <td>02 Dec 2024</td>
              <td>UTI20241219</td>
              <td>Electricity bill</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$2,50,000</td>
              <td className="text-dark">Cash</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
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
                  EXP00018
                </Link>
              </td>
              <td>15 Nov 2024</td>
              <td>PO-202411-008</td>
              <td>Purchase of office furniture</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$5,00,750</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Pending <i className="isax isax-timer ms-1"></i>
                </span>
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
                  EXP00017
                </Link>
              </td>
              <td>30 Nov 2024</td>
              <td>PO-202411-007</td>
              <td>Purchase of manufacturing tools</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$7,50,300</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled <i className="isax isax-close-circle ms-1"></i>
                </span>
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
                  EXP00016
                </Link>
              </td>
              <td>12 Oct 2024</td>
              <td>REF17420</td>
              <td>Server maintenance costs</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$9,99,999</td>
              <td className="text-dark">cash</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
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
                  EXP00015
                </Link>
              </td>
              <td>05 Oct 2024</td>
              <td>REF16302</td>
              <td>Digital marketing campaign</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$87,650</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Pending <i className="isax isax-timer ms-1"></i>
                </span>
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
                  EXP00014
                </Link>
              </td>
              <td>09 Sep 2024</td>
              <td>REF15035</td>
              <td>Equipment repairs and servicing</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$69,420</td>
              <td className="text-dark">Cash</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Cancelled <i className="isax isax-close-circle ms-1"></i>
                </span>
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
                  EXP00013
                </Link>
              </td>
              <td>02 Sep 2024</td>
              <td>REF14710</td>
              <td>Renovation of office workspace</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$33,210</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Paid <i className="isax isax-tick-circle ms-1"></i>
                </span>
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
                  EXP00012
                </Link>
              </td>
              <td>07 Aug 2024</td>
              <td>INV00020</td>
              <td>Bulk order freight costs</td>
              <td>
                <span className="badge badge-soft-light d-inline-flex align-items-center text-dark">
                  <i className="isax isax-document-text5"></i>
                </span>
              </td>
              <td className="text-dark">$2,10,000</td>
              <td className="text-dark fw-medium">Cheque</td>
              <td>
                <span className="badge badge-soft-warning d-inline-flex align-items-center">
                  Pending <i className="isax isax-timer ms-1"></i>
                </span>
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
                      Range : <span className="text-gray-9">$200 - $5695</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Payment Mode</label>
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
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Cash
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Cheque
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
            <div className="mb-3">
              <label className="form-label">Status</label>
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
    </>
  );
};

export default ExpenseReport;
