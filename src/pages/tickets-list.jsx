import React from 'react';
import { Link } from 'react-router-dom';

const TicketsList = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Tickets List</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="d-flex align-items-center">
            <Link to="/tickets-list"
              className="btn btn-primary p-2 d-inline-flex align-items-center justify-content-center me-2"
            >
              <i className="isax isax-menu-1"></i>
            </Link>
            <Link to="/tickets"
              className="btn btn-outline-white p-2 d-inline-flex align-items-center justify-content-center me-2"
            >
              <i className="isax isax-grid-25"></i>
            </Link>
            <Link to="/ticket-kanban"
              className="btn btn-outline-white p-2 d-inline-flex align-items-center justify-content-center me-1"
            >
              <i className="isax isax-kanban"></i>
            </Link>
          </div>
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
              <i className="isax isax-add-circle5 me-1"></i>New Tickets
            </Link >
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <Link  href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link >
              </div>
            </div>
            <Link 
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </Link >
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown">
              <Link  href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center fw-medium"
                data-bs-toggle="dropdown"
              >
                <i className="isax isax-sort me-1"></i>Sort By :{' '}
                <span className="fw-normal ms-1">Latest</span>
              </Link >
              <ul className="dropdown-menu  dropdown-menu-end">
                <li>
                  <Link  href="#" className="dropdown-item">
                    Latest
                  </Link >
                </li>
                <li>
                  <Link  href="#" className="dropdown-item">
                    Oldest
                  </Link >
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
              </Link >
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
              <th className="no-sort">Ticket ID</th>
              <th className="">Subject</th>
              <th className="">Assigned</th>
              <th className="">Assigned Date</th>
              <th className="no-sort">Priority</th>
              <th className="">Created On</th>
              <th className="">Assignee</th>
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
                <Link to="/ticket-details">TK00025</Link>
              </td>
              <td>Support for theme</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-28.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Emily Clark</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>22 Feb 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-warning"></span>
                  Medium
                </div>
              </td>
              <td>04 Mar 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-16.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Sarah Michelle</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-success"></span>
                  Resolved<i className="isax isax-tick-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
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
                <Link to="/ticket-details">TK00024</Link>
              </td>
              <td>Verify your email</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-01.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">John Carter</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>07 Feb 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-info"></span>
                  Low
                </div>
              </td>
              <td>20 Feb 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-26.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Daniel Patrick</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-warning"></span>
                  Pending<i className="isax isax-slash ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
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
                <Link to="/ticket-details">TK00023</Link>
              </td>
              <td>Calling for help</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-16.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Sophia White</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>30 Jan 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-danger"></span>
                  High
                </div>
              </td>
              <td>13 Feb 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-27.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Emily Lauren</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-danger"></span>
                  Closed<i className="isax isax-close-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
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
                <Link to="/ticket-details">TK00022</Link>
              </td>
              <td>Management</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-08.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Michael Johnson</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>17 Jan 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-warning"></span>
                  Medium
                </div>
              </td>
              <td>30 Jan 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-28.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Braun Kelton</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-info"></span>
                  Open<i className="isax isax-timer ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
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
                <Link to="/ticket-details">TK00021</Link>
              </td>
              <td>Invoice not generating</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-30.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">David Anderson</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>09 Dec 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-danger"></span>
                  High
                </div>
              </td>
              <td>22 Jan 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-18.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Ryan Christopher</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-success"></span>
                  Resolved<i className="isax isax-tick-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
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
                <Link to="/ticket-details">TK00020</Link>
              </td>
              <td>Unable to log in</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-22.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Olivia Harris</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>04 Jan 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-info"></span>
                  Low
                </div>
              </td>
              <td>17 Jan 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-29.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Jessica Renee</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-warning"></span>
                  Pending<i className="isax isax-slash ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
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
                <Link to="/ticket-details">TK00019</Link>
              </td>
              <td>Payment gateway issue</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-25.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Emma Lewis</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>02 Dec 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-warning"></span>
                  Medium
                </div>
              </td>
              <td>15 Jan 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-27.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Abigail Harper</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-danger"></span>
                  closed<i className="isax isax-close-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
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
                <Link to="/ticket-details">TK00019</Link>
              </td>
              <td>Support for theme</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-21.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Robert Thomas</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>15 Nov 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-info"></span>
                  low
                </div>
              </td>
              <td>28 Jan 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-31.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Michael Johnson</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-info"></span>
                  open<i className="isax isax-timer ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
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
                <Link to="/ticket-details">TK00017</Link>
              </td>
              <td>Verify your email</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-24.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Isabella Scott</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>30 Nov 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-danger"></span>
                  High
                </div>
              </td>
              <td>12 Nov 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-06.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Madison Brooke</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-success"></span>
                  Resolved<i className="isax isax-tick-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
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
                <Link to="/ticket-details">TK00016</Link>
              </td>
              <td>Calling for help</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-15.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Daniel Martinez</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>12 Oct 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-warning"></span>
                  Medium
                </div>
              </td>
              <td>25 Oct 2025</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-33.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">William Andrew</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-warning"></span>
                  Pending<i className="isax isax-slash ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
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
                <Link to="/ticket-details">TK00015</Link>
              </td>
              <td>Management</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-02.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Charlotte Brown</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>05 Oct 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-info"></span>
                  Low
                </div>
              </td>
              <td>18 Oct 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-34.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Victoria Celeste</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-danger"></span>
                  closed<i className="isax isax-close-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
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
                <Link to="/ticket-details">TK00014</Link>
              </td>
              <td>Invoice not generating</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-23.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">William Parker</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>09 Sep 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-danger"></span>
                  High
                </div>
              </td>
              <td>22 Sep 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-10.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Nathaniel Blake</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-info"></span>
                  open<i className="isax isax-tick-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
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
                <Link to="/ticket-details">TK00013</Link>
              </td>
              <td>Payment gateway issue</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-24.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Mia Thompson</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>02 Sep 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-warning"></span>
                  Medium
                </div>
              </td>
              <td>15 Sep 2024</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link  href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-29.jpg" className="rounded-circle" alt="img" />
                  </Link >
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link  href="#">Natalie Paige</Link >
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="badge badge-sm badge-soft-success"></span>
                  Resolved<i className="isax isax-tick-circle ms-1"></i>
                </div>
              </td>
              <td className="action-item">
                <Link  href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link >
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/ticket-details" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-eye me-2"></i>View
                    </Link>
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
                    </Link >
                  </li>
                  <li>
                    <Link  href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification me-2"></i>Activate
                    </Link >
                  </li>
                  <li>
                    <Link  href="#" className="dropdown-item d-flex align-items-center">
                      <i className="isax isax-notification-bing me-2"></i>Deactivate
                    </Link >
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
              <label className="form-label">Assigned</label>
              <div className="dropdown">
                <Link  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link >
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
                      <Link  href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link >
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
                            src="/assets/img/profiles/avatar-01.jpg"
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
                            src="/assets/img/profiles/avatar-16.jpg"
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
                            src="/assets/img/profiles/avatar-15.jpg"
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
                            src="/assets/img/profiles/avatar-14.jpg"
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
                            src="/assets/img/profiles/avatar-01.jpg"
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
                      <Link  href="#" className="btn btn-outline-white w-100">
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
              <label className="form-label">Priority</label>
              <div className="dropdown">
                <Link  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link >
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
                      <Link  href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link >
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="badge-dot bg-warning me-2"></span>Medium
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="badge-dot bg-info me-2"></span>Low
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="badge-dot bg-danger me-2"></span>High
                      </label>
                    </li>
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <Link  href="#" className="btn btn-outline-white w-100">
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
              <label className="form-label">Assignee</label>
              <div className="dropdown">
                <Link  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link >
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
                      <Link  href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link >
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
                        Sarah Michelle
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-02.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Daniel Patrick
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-22.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Emily Lauren
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-04.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Braun Kelton
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-05.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Jessica Renee
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-09.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Ryan Christopher
                      </label>
                    </li>
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <Link  href="#" className="btn btn-outline-white w-100">
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
              <label className="form-label">Status</label>
              <div className="dropdown">
                <Link  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link >
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
                      <Link  href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link >
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="badge-dot bg-success me-2"></span>Resolved
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="badge-dot bg-danger me-2"></span>Closed
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="badge-dot bg-info me-2"></span>Open
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="badge-dot bg-warning me-2"></span>Pending
                      </label>
                    </li>
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <Link  href="#" className="btn btn-outline-white w-100">
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
          </form>
        </div>
      </div>
      <div id="add_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Ticket</h4>
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
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Subject<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Assigned Name<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label id="dateRangePicker" className="form-label">
                        Assigned Date<span className="text-danger ms-1">*</span>
                      </label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="dd/mm/yyyy"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label id="dateRangePicker" className="form-label">
                        Created Date<span className="text-danger ms-1">*</span>
                      </label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="dd/mm/yyyy"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label id="dateRangePicker" className="form-label">
                        Due Date<span className="text-danger ms-1">*</span>
                      </label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="dd/mm/yyyy"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Assignee Name<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Medium</option>
                        <option>Low</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Resolved</option>
                        <option>Closed</option>
                        <option>Open</option>
                        <option>Pending</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div>
                    <label className="form-label">
                      Content<span className="text-danger ms-1">*</span>
                    </label>
                    <textarea className="form-control"></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="edit_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Ticket</h4>
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
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Subject<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" value="Management" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Assigned Name<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" value="Joh Carter" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label id="dateRangePicker" className="form-label">
                        Assigned Date<span className="text-danger ms-1">*</span>
                      </label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="dd/mm/yyyy"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label id="dateRangePicker" className="form-label">
                        Created Date<span className="text-danger ms-1">*</span>
                      </label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="dd/mm/yyyy"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label id="dateRangePicker" className="form-label">
                        Due Date<span className="text-danger ms-1">*</span>
                      </label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="dd/mm/yyyy"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Assignee Name<span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" value="Emma Lewis" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Medium</option>
                        <option>Low</option>
                        <option selected>High</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Resolved</option>
                        <option>Closed</option>
                        <option selected>Open</option>
                        <option>Pending</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div>
                    <label className="form-label">
                      Content<span className="text-danger ms-1">*</span>
                    </label>
                    <textarea className="form-control">
                      Need help? Submit a support ticket, and our team will assist you quickly.
                      Provide your name, email, issue category, and a detailed description of the
                      problem. Choose a priority level and attach relevant files if needed.
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
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
              <h6 className="mb-1">Delete Ticket</h6>
              <p className="mb-3">Are you sure, you want to delete Ticket?</p>
              <div className="d-flex justify-content-center">
                <Link  href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link >
                <Link to="/tickets" className="btn btn-primary">
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

export default TicketsList;
