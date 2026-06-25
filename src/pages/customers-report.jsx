import React from 'react';
import { Link } from 'react-router-dom';

const CustomersReport = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Customers Report</h6>
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
            <div className="card shadow-lg position-relative border-0 border-end border-bottom border-3 border-primary">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>
                    <p className="mb-1">Total Customers</p>
                    <h6 className="fs-16 fw-semibold mb-0">1,200</h6>
                  </div>
                  <div>
                    <span className="badge badge-soft-primary p-2 rounded-circle border border-primary">
                      <i className="isax isax-profile-2user fs-16"></i>
                    </span>
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
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card shadow-lg position-relative border-0 border-end border-bottom border-3 border-success">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>
                    <p className="mb-1">New Customers</p>
                    <h6 className="fs-16 fw-semibold mb-0">135</h6>
                  </div>
                  <div>
                    <span className="badge badge-soft-success p-2 rounded-circle border border-success">
                      <i className="isax isax-profile-2user fs-16"></i>
                    </span>
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
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card shadow-lg position-relative border-0 border-end border-bottom border-3 border-warning">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>
                    <p className="mb-1"> Total Revenue</p>
                    <h6 className="fs-16 fw-semibold mb-0">$250,000</h6>
                  </div>
                  <div>
                    <span className="badge badge-soft-warning p-2 rounded-circle border border-warning">
                      <i className="isax isax-dollar-circle fs-16"></i>
                    </span>
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
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card shadow-lg position-relative border-0 border-end border-bottom border-3 border-info">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div>
                    <p className="mb-1">Average Revenue</p>
                    <h6 className="fs-16 fw-semibold mb-0">$20,000</h6>
                  </div>
                  <div>
                    <span className="badge badge-soft-info p-2 rounded-circle border border-info">
                      <i className="isax isax-dollar-circle fs-16"></i>
                    </span>
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
              <th>Customer</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Balance</th>
              <th>Total Invoice</th>
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
                      <Link href="#">Emily Clark</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>+1 202-555-0198</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/us.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">USA</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$10,000</td>
              <td>12</td>
              <td>22 Feb 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active <i className="isax isax-tick-circle ms-1"></i>
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
              <td>+1 305-456-7821</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/ca.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Canada</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$15,000</td>
              <td>6</td>
              <td>07 Feb 2025</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Inactive <i className="isax isax-close-circle ms-1"></i>
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
              <td>+1 415-678-1234</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/gb.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">UK</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$20,000</td>
              <td>3</td>
              <td>30 Jan 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active <i className="isax isax-tick-circle ms-1"></i>
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
              <td>+1 718-987-6543</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/de.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Germany</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$9,000</td>
              <td>10</td>
              <td>17 Jan 2025</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Inactive <i className="isax isax-close-circle ms-1"></i>
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
              <td>+1 909-234-5678</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/fr.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">France</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$12,000</td>
              <td>9</td>
              <td>04 Jan 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active <i className="isax isax-tick-circle ms-1"></i>
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
              <td>+1 602-789-3456</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/ar.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Argentina</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$17,000</td>
              <td>5</td>
              <td>09 Dec 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active <i className="isax isax-tick-circle ms-1"></i>
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
              <td>+1 812-456-9087</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/in.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">India</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$23,000</td>
              <td>2</td>
              <td>02 Dec 2024</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Inactive <i className="isax isax-close-circle ms-1"></i>
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
              <td>+1 214-123-4567</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/it.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Italy</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$25,000</td>
              <td>13</td>
              <td>15 Nov 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active <i className="isax isax-tick-circle ms-1"></i>
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
              <td>+1 646-789-1230</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/gs.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">New Zealand</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$18,000</td>
              <td>15</td>
              <td>30 Nov 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active <i className="isax isax-tick-circle ms-1"></i>
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
              <td>+1 901-678-4321</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/au.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Australia</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$13,000</td>
              <td>16</td>
              <td>12 Oct 2024</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Inactive <i className="isax isax-close-circle ms-1"></i>
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
              <td>+1 503-987-2105</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/cn.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">China</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$27,000</td>
              <td>8</td>
              <td>05 Oct 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active <i className="isax isax-tick-circle ms-1"></i>
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
              <td>+1 320-345-6789</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/br.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Brazil</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$23,500</td>
              <td>16</td>
              <td>09 Sep 2024</td>
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Inactive <i className="isax isax-close-circle ms-1"></i>
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
              <td>+1 720-654-7890</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/tr.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Turkey</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$24,000</td>
              <td>17</td>
              <td>02 Sep 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active <i className="isax isax-tick-circle ms-1"></i>
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
              <td>+1 919-321-9876</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link href="#" className="avatar avatar-xs me-2 flex-shrink-0">
                    <img src="/assets/img/flags/ru.png" className="" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Russia</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>$35,000</td>
              <td>20</td>
              <td>07 Aug 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active <i className="isax isax-tick-circle ms-1"></i>
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
              <label className="form-label">Customers</label>
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
              <label className="form-label">Country</label>
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
                        <span className="avatar avatar-xs me-2">
                          <img src="/assets/img/flags/us.png" className="flex-shrink-0" alt="img" />
                        </span>
                        United States
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-xs me-2">
                          <img src="/assets/img/flags/ca.png" className="flex-shrink-0" alt="img" />
                        </span>
                        Canada
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-xs me-2">
                          <img src="/assets/img/flags/de.png" className="flex-shrink-0" alt="img" />
                        </span>
                        Germany
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-xs me-2">
                          <img
                            src="/assets/img/flags/gb.png"
                            className="flex-shrink-0 "
                            alt="img"
                          />
                        </span>
                        United Kingdom
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-xs me-2">
                          <img src="/assets/img/flags/fr.png" className="flex-shrink-0" alt="img" />
                        </span>
                        France
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
                  className="form-control date-range bookingrange rounded-end h-auto py-1"
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
                        <span className="badge-dot bg-success me-1"></span>Active
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="badge-dot bg-danger me-1"></span>Inactive
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

export default CustomersReport;
