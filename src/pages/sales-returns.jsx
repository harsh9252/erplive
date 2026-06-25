import React from 'react';

const SalesReturns = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Sales Return Report</h6>
        </div>
        <div className="my-xl-auto">
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
        </div>
      </div>
      <div className="border-bottom mb-3">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative">
              <div className="card-body">
                <div>
                  <p className="mb-2">Total Returns</p>
                  <div className="d-flex align-items-end justify-content-between  mt-1">
                    <div>
                      <h6 className="fs-16 fw-semibold mb-1">
                        $50,000{' '}
                        <span className="text-success fw-normal fs-13 ms-2">
                          <i className="isax isax-send fs-10"></i>5.62%
                        </span>
                      </h6>
                      <p className="fs-13 text-truncate">Compare to last month</p>
                    </div>
                    <div id="report_chart"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative">
              <div className="card-body">
                <div>
                  <p className="mb-2">Returned Invoices</p>
                  <div className="d-flex align-items-end justify-content-between  mt-1">
                    <div>
                      <h6 className="fs-16 fw-semibold mb-1">
                        154
                        <span className="text-success fw-normal fs-13 ms-2">
                          <i className="isax isax-send fs-10"></i>11.4%
                        </span>
                      </h6>
                      <p className="fs-13 text-truncate">Compare to last month</p>
                    </div>
                    <div id="report_chart_2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative">
              <div className="card-body">
                <div>
                  <p className="mb-2 text-truncate">Total Sales Loss Due to Returns</p>
                  <div className="d-flex align-items-end justify-content-between  mt-1">
                    <div>
                      <h6 className="fs-16 fw-semibold mb-1 d-flex flex-wrap">
                        $25,000
                        <span className="text-success fw-normal fs-13 ms-2">
                          <i className="isax isax-send fs-10"></i>8.52%
                        </span>
                      </h6>
                      <p className="fs-13 text-truncate">Compare to last month</p>
                    </div>
                    <div id="report_chart_3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative">
              <div className="card-body">
                <div>
                  <p className="mb-2">Total Returns</p>
                  <div className="d-flex align-items-end justify-content-between  mt-1">
                    <div>
                      <h6 className="fs-16 fw-semibold mb-1">
                        $50,000{' '}
                        <span className="text-success fw-normal fs-13 ms-2">
                          <i className="isax isax-send fs-10"></i>5.62%
                        </span>
                      </h6>
                      <p className="fs-13 text-truncate">Compare to last month</p>
                    </div>
                    <div id="report_chart_4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
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
                    <span>Quotation ID</span>
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
                    <span>Status</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Created On</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead>
            <tr>
              <th className="no-sort">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" id="select-all" />
                </div>
              </th>
              <th className="no-sort">Credit Note ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th className="no-sort">Related To</th>
              <th className="no-sort">Payment Mode</th>
              <th>Created On</th>
              <th>Status</th>
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
                  CN0014
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-28.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Emily Clark</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark"></td>
              $10,000
              <td>
                <Link href="#" className="link-default">
                  INV00025
                </Link>
              </td>
              <td className="text-dark"></td>
              Cash
              <td></td>
              22 Feb 2025
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-success badge-sm d-inline-flex align-items-center"
                  >
                    Paid <i className="isax isax-tick-circle4 ms-1"></i>
                  </Link>
                </div>
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
                  CN0013
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-29.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">John Carter</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$25,750</td>
              <td>
                <Link href="#" className="link-default">
                  INV00024
                </Link>
              </td>
              <td className="text-dark">Cheque</td>
              <td>07 Feb 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-warning badge-sm d-inline-flex align-items-center"
                  >
                    Pending <i className="isax isax-timer ms-1"></i>
                  </Link>
                </div>
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
                  CN0012
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-12.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Sophia White</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$50,125</td>
              <td>
                <Link href="#" className="link-default">
                  INV00023
                </Link>
              </td>
              <td className="text-dark">Cash</td>
              <td>30 Jan 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-danger badge-sm d-inline-flex align-items-center"
                  >
                    Cancelled <i className="isax isax-close-circle4 ms-1"></i>
                  </Link>
                </div>
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
                  CN0011
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-06.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Michael Johnson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$75,900</td>
              <td>
                <Link href="#" className="link-default">
                  INV00022
                </Link>
              </td>
              <td className="text-dark">Cheque</td>
              <td>17 Jan 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-success badge-sm d-inline-flex align-items-center"
                  >
                    Paid <i className="isax isax-tick-circle4 ms-1"></i>
                  </Link>
                </div>
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
                  CN0010
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-30.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Olivia Harris</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$99,999</td>
              <td>
                <Link href="#" className="link-default">
                  INV00021
                </Link>
              </td>
              <td className="text-dark">Cheque</td>
              <td>04 Jan 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-warning badge-sm d-inline-flex align-items-center"
                  >
                    Pending <i className="isax isax-timer ms-1"></i>
                  </Link>
                </div>
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
                  CN0009
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-16.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">David Anderson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$1,20,500</td>
              <td>
                <Link href="#" className="link-default">
                  INV00020{' '}
                </Link>
              </td>
              <td className="text-dark">Cash</td>
              <td>09 Dec 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-danger badge-sm d-inline-flex align-items-center"
                  >
                    Cancelled <i className="isax isax-close-circle4 ms-1"></i>
                  </Link>
                </div>
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
                  CN0008
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-16.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Emma Lewis</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$2,50,000</td>
              <td>
                <Link href="#" className="link-default">
                  INV00019
                </Link>
              </td>
              <td className="text-dark">Cash</td>
              <td>02 Dec 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-success badge-sm d-inline-flex align-items-center"
                  >
                    Paid <i className="isax isax-tick-circle4 ms-1"></i>
                  </Link>
                </div>
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
                  CN0007
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-23.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Robert Thomas</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$5,00,750</td>
              <td>
                <Link href="#" className="link-default">
                  INV00018
                </Link>
              </td>
              <td className="text-dark">Cheque</td>
              <td>15 Nov 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-warning badge-sm d-inline-flex align-items-center"
                  >
                    Pending <i className="isax isax-timer ms-1"></i>
                  </Link>
                </div>
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
                  CN0006
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-07.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Isabella Scott</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$7,50,300</td>
              <td>
                <Link href="#" className="link-default">
                  INV00017
                </Link>
              </td>
              <td className="text-dark">Cheque</td>
              <td>30 Nov 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-danger badge-sm d-inline-flex align-items-center"
                  >
                    Cancelled <i className="isax isax-close-circle4 ms-1"></i>
                  </Link>
                </div>
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
                  CN0005
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-31.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Daniel Martinez</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$9,99,999</td>
              <td>
                <Link href="#" className="link-default">
                  INV00016
                </Link>
              </td>
              <td className="text-dark">Cash</td>
              <td>12 Oct 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-success badge-sm d-inline-flex align-items-center"
                  >
                    Paid <i className="isax isax-tick-circle4 ms-1"></i>
                  </Link>
                </div>
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
                  CN0004
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-37.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Charlotte Brown</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$87,650</td>
              <td>
                <Link href="#" className="link-default">
                  INV00015
                </Link>
              </td>
              <td className="text-dark">Cheque</td>
              <td>05 Oct 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-warning badge-sm d-inline-flex align-items-center"
                  >
                    Pending <i className="isax isax-timer ms-1"></i>
                  </Link>
                </div>
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
                  CN0003
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-21.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">William Parker</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$69,420</td>
              <td>
                <Link href="#" className="link-default">
                  INV00014
                </Link>
              </td>
              <td className="text-dark">Cash</td>
              <td>09 Sep 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-danger badge-sm d-inline-flex align-items-center"
                  >
                    Cancelled <i className="isax isax-close-circle4 ms-1"></i>
                  </Link>
                </div>
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
                  CN0002
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-17.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Mia Thompson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$33,210</td>
              <td>
                <Link href="#" className="link-default">
                  INV00013
                </Link>
              </td>
              <td className="text-dark">Cheque</td>
              <td>02 Sep 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="btn btn-sm btn-success-light d-inline-flex align-items-center me-1"
                  >
                    Paid <i className="isax isax-tick-circle4 ms-1"></i>
                  </Link>
                </div>
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
                  CN0001
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-07.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Amelia Robinson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td className="text-dark">$2,10,000</td>
              <td>
                <Link href="#" className="link-default">
                  INV00012
                </Link>
              </td>
              <td className="text-dark">Cheque</td>
              <td>07 Aug 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link
                    href="#"
                    className="badge badge-soft-warning badge-sm d-inline-flex align-items-center"
                  >
                    Pending <i className="isax isax-timer ms-1"></i>
                  </Link>
                </div>
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
              <label className="form-label">Customer</label>
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
                            src="/assets/img/profiles/avatar-18.jpg"
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
                  <ul className="mb-0">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Cash
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Check
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Bank Transfer
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Paypal
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        Stripe
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Date Range</label>
              <div className="input-group position-relative">
                <input type="text" className="form-control date-range bookingrange rounded-end" />
                <span className="input-icon-addon fs-16 text-gray-9">
                  <i className="isax isax-calendar-2"></i>
                </span>
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

export default SalesReturns;
