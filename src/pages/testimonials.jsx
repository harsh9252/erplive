import React from 'react';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  return (
    <>
      {/* Page Header */}
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Testimonials</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
          <div>
            <Link  href="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_modal"
            >
              <i className="isax isax-add-circle5 me-1"></i>New Testimonials
            </Link >
          </div>
        </div>
      </div>
      {/* End Page Header */}

      {/* Table Search Start */}
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <Link  href="javascript: void(0);" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link >
              </div>
            </div>
            <Link 
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              href="javascript:void(0);"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </Link>
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown">
              <Link  href="javascript: void(0);"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="isax isax-sort me-1"></i>Sort By :{' '}
                <span className="fw-normal ms-1">Latest</span>
              </Link >
              <ul className="dropdown-menu  dropdown-menu-end">
                <li>
                  <Link  href="javascript: void(0);" className="dropdown-item">
                    Latest
                  </Link >
                </li>
                <li>
                  <Link  href="javascript: void(0);" className="dropdown-item">
                    Oldest
                  </Link >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Table Search End */}

      {/* Table List Start */}
      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead className="thead-light">
            <tr>
              <th className="no-sort">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" id="select-all" />
                </div>
              </th>
              <th className="no-sort">Customer</th>
              <th className="no-sort">Rating</th>
              <th className="no-sort">Content</th>
              <th>Created On</th>
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-28.jpg"
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
              <td>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>
                Invoicing system is a game-changer! I get paid faster, and my clients love the
                automated reminders
              </td>
              <td>22 Feb 2025</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-success d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    active
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-29.jpg"
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
              <td>
                <i className="isax isax-star-15"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>
                Creating professional invoices in seconds has never been easier. Kanakku simplifies
                my billing process completely!
              </td>
              <td>07 Feb 2025</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-danger d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    Inactive
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-12.jpg"
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
              <td>
                <i className="isax isax-star-15"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>
                Recurring invoices save me so much time! I don’t have to worry about sending
                invoices every month anymore.
              </td>
              <td>30 Jan 2025</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-success d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    Active
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-06.jpg"
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
              <td>
                <i className="isax isax-star-15"></i>
                <i className="isax isax-star-15"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>
                Helps me track every rupee I spend. Now, I know exactly where my money is going.
              </td>
              <td>17 Jan 2025</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-danger d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    Inactive
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-30.jpg"
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
              <td>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>Expense categorization is effortless. It keeps my books clean and accurate.</td>
              <td>04 Jan 2025</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-success d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    Active
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-27.jpg"
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
              <td>
                <i className="isax isax-star-15"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>
                Gives me a clear picture of my cash flow, so I can plan better for my business
                growth.
              </td>
              <td>09 Dec 2024</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-danger d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    Inactive
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-22.jpg"
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
              <td>
                <i className="isax isax-star-15"></i>
                <i className="isax isax-star-15"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>
                Filing GST has never been this easy. Kanakku calculates everything automatically,
                saving me hours of work.
              </td>
              <td>02 Dec 2024</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-success d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    Active
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-23.jpg"
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
              <td>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>
                The tax reports are spot on! I no longer worry about making errors during tax
                season.
              </td>
              <td>15 Nov 2024</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-danger d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    InActive
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-07.jpg"
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
              <td>
                <i className="isax isax-star-15"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>Ensures my clients stay 100% compliant with GST and other tax regulations.</td>
              <td>30 Nov 2024</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-success d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    Active
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-41.jpg"
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
              <td>
                <i className="isax isax-star-15"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>
                Even with multiple accounts, It remains super easy to use. The UI is simple and
                intuitive.
              </td>
              <td>05 Oct 2024</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-success d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    Active
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-21.jpg"
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
              <td>
                <i className="isax isax-star-15"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>
                Invoice customization is fantastic! I can add my logo, terms, and even set up
                recurring invoices effortlessly.
              </td>
              <td>09 Sep 2024</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-danger d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    Inactive
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-26.jpg"
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
              <td>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>
                I no longer chase clients for payments! The automated invoice reminders ensure I get
                paid on time, every time.
              </td>
              <td>02 Sep 2024</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-success d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    Active
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="assets/img/profiles/avatar-30.jpg"
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
              <td>
                <i className="isax isax-star-15"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
                <i className="isax isax-star-15 text-warning"></i>
              </td>
              <td>
                Bulk invoice generation is a lifesaver! I can create and send multiple invoices in
                just a few clicks
              </td>
              <td>07 Aug 2024</td>

              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#"
                    className="badge badge-sm badge-soft-danger d-inline-flex align-items-center me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#view_history"
                  >
                    <i className="isax isax-document-sketch5 me-1"></i>
                    Inactive
                  </Link >
                </div>
              </td>
              <td className="action-item">
                <Link  href="javascript: void(0);" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/testimonials"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link  href="javascript: void(0);"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* /Table List */}

      {/* Start Filter */}
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
          <div className="mb-3">
            <label className="form-label">Ratings</label>
            <div className="dropdown">
              <Link  href="javascript: void(0);"
                className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="true"
              >
                Select
              </Link >
              <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                <ul className="mb-3">
                  <li>
                    <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                      <input className="form-check-input m-0 me-2" type="checkbox" />
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 text-warning"></i>
                    </label>
                  </li>
                  <li>
                    <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                      <input className="form-check-input m-0 me-2" type="checkbox" />
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15"></i>
                    </label>
                  </li>
                  <li>
                    <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                      <input className="form-check-input m-0 me-2" type="checkbox" />
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 me-1"></i>
                      <i className="isax isax-star-15"></i>
                    </label>
                  </li>
                  <li>
                    <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                      <input className="form-check-input m-0 me-2" type="checkbox" />
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 me-1"></i>
                      <i className="isax isax-star-15 me-1"></i>
                      <i className="isax isax-star-15"></i>
                    </label>
                  </li>
                  <li>
                    <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                      <input className="form-check-input m-0 me-2" type="checkbox" />
                      <i className="isax isax-star-15 text-warning me-1"></i>
                      <i className="isax isax-star-15 me-1"></i>
                      <i className="isax isax-star-15 me-1"></i>
                      <i className="isax isax-star-15 me-1"></i>
                      <i className="isax isax-star-15"></i>
                    </label>
                  </li>
                </ul>
                <div className="row g-2">
                  <div className="col-6">
                    <Link  href="#" className="btn btn-outline-white w-100 close-filter">
                      Cancel
                    </Link >
                  </div>
                  <div className="col-6">
                    <Link  href="#" className="btn btn-primary w-100">
                      Select
                    </Link >
                  </div>
                </div>
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
          <div className="mb-0">
            <label className="form-label">Status</label>
            <div className="dropdown">
              <Link  href="javascript: void(0);"
                className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="true"
              >
                Select
              </Link >
              <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                <ul>
                  <li>
                    <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                      <input className="form-check-input m-0 me-2" type="checkbox" />
                      <i className="fa-solid fa-circle fs-6 text-success me-1"></i>Active
                    </label>
                  </li>
                  <li>
                    <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                      <input className="form-check-input m-0 me-2" type="checkbox" />
                      <i className="fa-solid fa-circle fs-6 text-danger me-1"></i>Inactive
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="offcanvas-footer">
            <div className="row g-2">
              <div className="col-6">
                <Link  href="#" className="btn btn-outline-white w-100">
                  Reset
                </Link >
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
        </div>
      </div>
      {/* End Filter */}

      {/* Start Add Modal  */}
      <div id="add_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Testimonial</h4>
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
              <div className="modal-body">
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

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Customer<span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Date<span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Rating<span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Status <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-0">
                      <label className="form-label">
                        Content<span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* End Add Modal  */}

      {/* End Edit Modal  */}
      <div id="edit_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Testimonial</h4>
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
              <div className="modal-body">
                <div className="mb-3">
                  <span className="text-gray-9 fw-bold mb-2 d-flex">Image</span>
                  <div className="d-flex align-items-center">
                    <div className="avatar avatar-xxl border border-dashed bg-light me-3 flex-shrink-0">
                      <div className="position-relative d-flex align-items-center">
                        <img
                          src="assets/img/products/product-05.jpg"
                          className="avatar avatar-xl"
                          alt="User Img"
                        />
                        <Link  href="javascript: void(0);"
                          className="rounded-trash trash-top d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-trash"></i>
                        </Link >
                      </div>
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

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Customer<span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Date<span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Rating<span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Status <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-0">
                      <label className="form-label">
                        Content<span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* End Edit Modal  */}

      {/* Start Delete Modal  */}
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Inventory</h6>
              <p className="mb-3">Are you sure, you want to delete Inventory?</p>
              <div className="d-flex justify-content-center">
                <Link  href="javascript: void(0);"
                  className="btn btn-outline-white me-3"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link >
                <Link to="/testimonials" className="btn btn-primary">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Delete Modal  */}
    </>
  );
};

export default Testimonials;
