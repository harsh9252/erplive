import React from 'react';
import { Link } from 'react-router-dom';

const Packages = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Packages</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="me-2">
            <div className="d-flex align-items-center">
              <Link to="/packages"
                className="btn btn-icon btn-sm active border rounded bg-primary text-white me-1"
              >
                <i className="isax isax-menu-1"></i>
              </Link>
              <Link to="/packages-grid" className="btn btn-icon border rounded btn-sm">
                <i className="isax isax-grid-2"></i>
              </Link>
            </div>
          </div>
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
          <div>
            <Link href="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_plans"
            >
              <i className="isax isax-add-circle5 me-1"></i>New Plan
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center overflow-hidden">
                <div>
                  <p className="fs-14 mb-1 text-truncate">Total Plans</p>
                  <h4 className="fs-16 fw-semibold">08</h4>
                </div>
              </div>
              <div>
                <span className="avatar avatar-lg bg-warning flex-shrink-0">
                  <i className="isax isax-box5 fs-32"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center overflow-hidden">
                <div>
                  <p className="fs-14 mb-1 text-truncate">Active Plans</p>
                  <h4 className="fs-16 fw-semibold">07</h4>
                </div>
              </div>
              <div>
                <span className="avatar avatar-lg bg-success flex-shrink-0">
                  <i className="isax isax-box-tick5 fs-32"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center overflow-hidden">
                <div>
                  <p className="fs-14 mb-1 text-truncate">Inactive Plans</p>
                  <h4 className="fs-16 fw-semibold">0</h4>
                </div>
              </div>
              <div>
                <span className="avatar avatar-lg bg-danger flex-shrink-0">
                  <i className="isax isax-box-remove5 fs-32"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center overflow-hidden">
                <div>
                  <p className="fs-14 mb-1 text-truncate">No Of Plan Types</p>
                  <h4 className="fs-16 fw-semibold">04</h4>
                </div>
              </div>
              <div>
                <span className="avatar avatar-lg bg-info flex-shrink-0">
                  <i className="isax isax-box-25 fs-32"></i>
                </span>
              </div>
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
          </div>
        </div>
      </div>
      <div className="table-responsive no-pagination">
        <table className="table table-nowrap datatable">
          <thead className="thead-light">
            <tr>
              <th>Plan</th>
              <th>Plan Type</th>
              <th>Total Subscribers</th>
              <th>Amount</th>
              <th>Created On</th>
              <th>Status</th>
              <th className="no-sort"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link href="#" className="text-dark">
                  Basic
                </Link>
              </td>
              <td></td>
              Monthly
              <td>56</td>
              <td>$50</td>
              <td>22 Feb 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_plans"
                    >
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
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="#" className="text-dark">
                  Advance
                </Link>
              </td>
              <td></td>
              Monthly
              <td>99</td>
              <td>$200</td>
              <td>07 Feb 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_plans"
                    >
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
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="#" className="text-dark">
                  Premium
                </Link>
              </td>
              <td></td>
              Monthly
              <td>58</td>
              <td>$300</td>
              <td>30 Jan 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_plans"
                    >
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
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="#" className="text-dark">
                  Enterprise
                </Link>
              </td>
              <td></td>
              Monthly
              <td>67</td>
              <td>$400</td>
              <td>17 Jan 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_plans"
                    >
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
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="#" className="text-dark">
                  Basic
                </Link>
              </td>
              <td></td>
              Yearly
              <td>78</td>
              <td>$600</td>
              <td>04 Jan 2025</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_plans"
                    >
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
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="#" className="text-dark">
                  Advance
                </Link>
              </td>
              <td></td>
              Yearly
              <td>52</td>
              <td>$2400</td>
              <td>09 Dec 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_plans"
                    >
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
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="#" className="text-dark">
                  Premium
                </Link>
              </td>
              <td></td>
              Yearly
              <td>60</td>
              <td>$3600</td>
              <td>02 Dec 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_plans"
                    >
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
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <Link href="#" className="text-dark">
                  Enterprise
                </Link>
              </td>
              <td></td>
              Yearly
              <td>45</td>
              <td>$4800</td>
              <td>07 Aug 2024</td>
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Active
                  <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_plans"
                    >
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
              <label className="form-label">Companies</label>
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
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Select All
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
                        <i className="fa-solid fa-circle fs-6 text-success me-1"></i>Approved
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
                        <i className="fa-solid fa-circle fs-6 text-danger me-1"></i>Rejected
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
      <div className="modal fade" id="add_plans">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Plan</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa fa-x"></i>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <span className="text-gray-9 fw-bold mb-2 d-flex">Image</span>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-xxl border border-dashed bg-light me-3 flex-shrink-0">
                          <i className="isax isax-image text-primary fs-24"></i>
                        </div>
                        <div className="d-inline-flex flex-column align-items-start">
                          <div className="drag-upload-btn btn btn-sm btn-primary position-relative mb-2">
                            <i className="isax isax-image me-1"></i>Upload Image
                            <input type="file" className="form-control image-sign" multiple="" />
                          </div>
                          <span className="text-gray-9">JPG or PNG format, not exceeding 5MB.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Name<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Advanced</option>
                        <option>Basic</option>
                        <option>Enterprise</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Type<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Position<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Currency<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>USD</option>
                        <option>EURO</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label className="form-label">
                          Plan Currency<span className="text-danger"> *</span>
                        </label>
                        <span className="text-primary">
                          <i className="fa-solid fa-circle-exclamation me-2"></i>Set 0 for free
                        </span>
                      </div>
                      <select className="select">
                        <option>Select</option>
                        <option>Fixed</option>
                        <option>Percentage</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Discount Type<span className="text-danger"> *</span>
                      </label>
                      <div className="pass-group">
                        <select className="select">
                          <option>Select</option>
                          <option>Fixed</option>
                          <option>Percentage</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Discount<span className="text-danger"> *</span>
                      </label>
                      <div className="pass-group">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Limitations Invoices</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Max Customers</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Product</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Supplier</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6>Plan Modules</h6>
                      <div className="form-check d-flex align-items-center">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" id="select-all" />{' '}
                          Select All
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Employees
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Invoices
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Reports
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Contacts
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Clients
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Estimates
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Goals
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Deals
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Projects
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Payments
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Assets
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Leads
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Tickets
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Taxes
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Activities
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Pipelines
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-3">
                        <div className="form-check form-switch me-2">
                          <input className="form-check-input me-2" type="checkbox" role="switch" />
                        </div>
                        <label className="form-check-label mt-0 me-2 text-dark fw-semibold fs-16">
                          Access Trial
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center gx-3">
                    <div className="col-md-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-fill">
                          <label className="form-label">Trial Days</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-block align-items-center ms-3">
                        <label className="form-check-label mt-0 me-2 text-dark">
                          Is Recommended
                        </label>
                        <div className="form-check form-switch me-2">
                          <input className="form-check-input me-2" type="checkbox" role="switch" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Status<span className="text-danger"> *</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="edit_plans">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Plan</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <span className="text-gray-9 fw-bold mb-2 d-flex">Image</span>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-xxl border border-dashed bg-light me-3 flex-shrink-0">
                          <i className="isax isax-image text-primary fs-24"></i>
                        </div>
                        <div className="d-inline-flex flex-column align-items-start">
                          <div className="drag-upload-btn btn btn-sm btn-primary position-relative mb-2">
                            <i className="isax isax-image me-1"></i>Upload Image
                            <input type="file" className="form-control image-sign" multiple="" />
                          </div>
                          <span className="text-gray-9">JPG or PNG format, not exceeding 5MB.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Name<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Advanced</option>
                        <option>Basic</option>
                        <option>Enterprise</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Type<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Position<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Currency<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>USD</option>
                        <option>EURO</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label className="form-label">
                          Plan Currency<span className="text-danger"> *</span>
                        </label>
                        <span className="text-primary">
                          <i className="fa-solid fa-circle-exclamation me-2"></i>Set 0 for free
                        </span>
                      </div>
                      <select className="select">
                        <option>Select</option>
                        <option>Fixed</option>
                        <option>Percentage</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Discount Type<span className="text-danger"> *</span>
                      </label>
                      <div className="pass-group">
                        <select className="select">
                          <option>Select</option>
                          <option>Fixed</option>
                          <option>Percentage</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Discount<span className="text-danger"> *</span>
                      </label>
                      <div className="pass-group">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Limitations Invoices</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Max Customers</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Product</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Supplier</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6>Plan Modules</h6>
                      <div className="form-check d-flex align-items-center">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" id="select-all2" />{' '}
                          Select All
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Employees
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Invoices
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Reports
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Contacts
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Clients
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Estimates
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Goals
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Deals
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Projects
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Payments
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Assets
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Leads
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Tickets
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Taxes
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Activities
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check form-check-md d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Pipelines
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-3">
                        <div className="form-check form-switch me-2">
                          <input className="form-check-input me-2" type="checkbox" role="switch" />
                        </div>
                        <label className="form-check-label mt-0 text-dark fw-semibold fs-16">
                          Access Trial
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center gx-3">
                    <div className="col-md-9">
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-fill">
                          <label className="form-label">Trial Days</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex align-items-start flex-column ms-2">
                        <div className="form-check form-switch mb-1">
                          <input className="form-check-input me-2" type="checkbox" role="switch" />
                        </div>
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          Is Recommended
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control"></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Account Url</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
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
              <h6 className="mb-1">Delete Purchase Package</h6>
              <p className="mb-3">Are you sure, you want to delete purchase Package?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/packages" className="btn btn-primary">
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

export default Packages;
