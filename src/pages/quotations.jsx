import React from 'react';
import { Link } from 'react-router-dom';

const Quotations = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Quotations</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
          <div>
            <Link to="/add-quotation" className="btn btn-primary d-flex align-items-center">
              <i className="isax isax-add-circle5 me-1"></i>New Quotations
            </Link>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2 flex-wrap flex-lg-nowrap flex-md-nowrap">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
            <div id="reportrange" className="reportrange-picker d-flex align-items-center">
              <i className="isax isax-calendar text-gray-5 fs-14 me-1"></i>
              <span className="reportrange-picker-field">21 Apr 25 - 21 Apr 25</span>
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
                    <span>Account Holder Name</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Bank & Account No</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Credit</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" />
                    <span>Debit</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    <span>Balance</span>
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
              6
            </span>
            Account Holders Selected
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
              <th className="no-sort">Quotation ID</th>
              <th>Customer</th>
              <th>Created On</th>
              <th className="no-sort">Status</th>
              <th className="no-sort text-end pe-4">Action</th>
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
                  QU0014
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
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Accepted <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
                  QU0013
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
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Declined<i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <button 
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </button>
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
                  QU0012
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
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Sent<i className="isax isax-arrow-right-2 ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
                  QU0011
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
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Expired
                  <i className="isax isax-timer-pause ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
                  QU0010
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
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Accepted <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
                  QU0009
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
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Declined<i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
                  QU0008
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
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Sent<i className="isax isax-arrow-right-2 ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
                  QU0007
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
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Expired
                  <i className="isax isax-timer-pause ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
                  QU0006
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
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Accepted <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
                  QU0005
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
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Declined<i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
                  QU0004
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-32.jpg"
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
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Sent<i className="isax isax-arrow-right-2 ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
                  QU0003
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-33.jpg"
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
              <td>09 Oct 2024</td>
              <td>
                <span className="badge badge-soft-info d-inline-flex align-items-center">
                  Expired
                  <i className="isax isax-timer-pause ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
                  QU0002
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-34.jpg"
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
              <td>
                <span className="badge badge-soft-success d-inline-flex align-items-center">
                  Accepted <i className="isax isax-tick-circle ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
                  QU0001
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-35.jpg"
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
              <td>
                <span className="badge badge-soft-danger d-inline-flex align-items-center">
                  Declined<i className="isax isax-close-circle ms-1"></i>
                </span>
              </td>
               <td className="text-end pe-4">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-primary border-0"
                    title="View"
                  >
                    <i className="isax isax-eye fs-16"></i>
                  </Link>
                  <Link 
                    to="/edit-quotation" 
                    className="btn btn-sm btn-soft-warning border-0"
                    title="Edit"
                  >
                    <i className="isax isax-edit-2 fs-16"></i>
                  </Link>
                  <Link 
                    href="#"
                    className="btn btn-sm btn-soft-danger border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                    title="Delete"
                  >
                    <i className="isax isax-trash fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-info border-0"
                    title="Convert to Invoice"
                  >
                    <i className="isax isax-document-text-1 fs-16"></i>
                  </Link>
                  <Link 
                    href="#" 
                    className="btn btn-sm btn-soft-success border-0"
                    title="Send"
                  >
                    <i className="isax isax-send-2 fs-16"></i>
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
              <label className="form-label">Quotation Id</label>
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
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        QU0014
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        QU0013
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        QU0012
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        QU0011
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
                        <i className="fa-solid fa-circle fs-6 text-success me-1"></i>Accepted
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-danger me-1"></i>Declined
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-info me-1"></i>Sent
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-dark me-1"></i>Expired
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
              <div className="d-flex align-items-center justify-content-between">
                <span className="fw-semibold text-gray-5">Selected 1 Record</span>
                <div className="d-flex align-items-center justify-content-center">
                  <Link to="/quotations" className="btn btn-danger me-2">
                    Yes, Delete
                  </Link>
                  <Link href="#" className="me-3" data-bs-dismiss="modal">
                    <i className="isax isax-close-circle5 fs-36"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quotations;
