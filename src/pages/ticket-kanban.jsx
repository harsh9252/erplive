import React from 'react';
import { Link } from 'react-router-dom';

const TicketKanban = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Tickets Kanban View</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="d-flex align-items-center">
            <Link to="/tickets-list"
              className="btn btn-outline-white p-2 d-inline-flex align-items-center justify-content-center me-2"
            >
              <i className="isax isax-menu-1"></i>
            </Link>
            <Link to="/tickets"
              className="btn btn-outline-white p-2 d-inline-flex align-items-center justify-content-center me-2"
            >
              <i className="isax isax-grid-25"></i>
            </Link>
            <Link to="/ticket-kanban"
              className="btn btn-primary p-2 d-inline-flex align-items-center justify-content-center me-1"
            >
              <i className="isax isax-kanban"></i>
            </Link>
          </div>
          <div className="dropdown">
            <Link  href="#"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link >
            <ul className="dropdown-menu">
              <li>
                <Link  className="dropdown-item" href="#" data-bs-toggle="tab" data-bs-target="#tab">
                  Download as PDF
                </Link>
              </li>
              <li>
                <Link  className="dropdown-item" href="#" data-bs-toggle="tab" data-bs-target="#tab">
                  Download as Excel
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link  href="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_modal"
            >
              <i className="isax isax-add-circle5 me-1"></i>New Ticket
            </Link >
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                <div>
                  <p className="mb-1">Total Tickets</p>
                  <h6 className="fs-16 fw-semibold">298</h6>
                </div>
                <div>
                  <span className="avatar bg-primary rounded-circle">
                    <i className="isax isax-receipt-item"></i>
                  </span>
                </div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>5.62%
                </span>
                from last month
              </p>
              <span className="position-absolute end-0 bottom-0">
                <img src="/assets/img/bg/card-overlay-01.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                <div>
                  <p className="mb-1">Completed Tickets</p>
                  <h6 className="fs-16 fw-semibold">185</h6>
                </div>
                <div>
                  <span className="avatar bg-success rounded-circle">
                    <i className="isax isax-tick-circle"></i>
                  </span>
                </div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>11.4%
                </span>{' '}
                from last month
              </p>
              <span className="position-absolute end-0 bottom-0">
                <img src="/assets/img/bg/card-overlay-02.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                <div>
                  <p className="mb-1">In Progress Tickets</p>
                  <h6 className="fs-16 fw-semibold">32</h6>
                </div>
                <div>
                  <span className="avatar bg-warning rounded-circle">
                    <i className="isax isax-timer"></i>
                  </span>
                </div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-success">
                  <i className="isax isax-send text-success me-1"></i>8.52%
                </span>{' '}
                from last month
              </p>
              <span className="position-absolute end-0 bottom-0">
                <img src="/assets/img/bg/card-overlay-03.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card position-relative">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                <div>
                  <p className="mb-1">Closed Tickets</p>
                  <h6 className="fs-16 fw-semibold">24</h6>
                </div>
                <div>
                  <span className="avatar bg-danger rounded-circle">
                    <i className="isax isax-information"></i>
                  </span>
                </div>
              </div>
              <p className="fs-13 mb-0">
                <span className="text-danger">
                  <i className="isax isax-received text-danger me-1"></i>7.45%
                </span>{' '}
                from last month
              </p>
              <span className="position-absolute end-0 bottom-0">
                <img src="/assets/img/bg/card-overlay-04.svg" alt="User Img" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <ul className="nav nav-tabs nav-bordered mb-3 gap-2">
        <li className="nav-item">
          <Link  className="nav-link active" href="#" data-bs-toggle="tab" data-bs-target="#All_tab">
            All
          </Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#Open_tab">
            Open
          </Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#Resolved_tab">
            Resolved
          </Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#Pending_tab">
            Pending
          </Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#Closed_tab">
            Closed
          </Link>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="All_tab" role="tabpanel">
          <div className="d-flex align-items-start overflow-auto project-status flex-wrap flex-lg-nowrap flex-md-nowrap">
            <div className="p-3 rounded bg-light w-100 me-3">
              <div className="bg-white border p-2 rounded mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="bg-soft-pink p-1 d-flex rounded-circle me-2">
                      <span className="bg-info rounded-circle d-block p-1"></span>
                    </span>
                    <h6 className="me-2 fs-16 fw-semibold">Open</h6>
                    <span className="badge bg-light rounded-circle fs-10 avatar avatar-xs text-dark">
                      5
                    </span>
                  </div>
                  <div className="dropdown">
                    <Link  href="#"
                      className="d-inline-flex align-items-center btn btn-white border-0"
                      data-bs-toggle="dropdown"
                    >
                      <i className="isax isax-more"></i>
                    </Link >
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link >
                      </li>
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-2"></i>Delete
                        </Link >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="kanban-drag-wrap">
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-light badge-sm border-info d-flex align-items-center justify-content-center text-info fs-12 fw-medium">
                            Low
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link  href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Support For Theme</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-primary fs-10 text-primary fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-primary me-1 fs-5"></i> Open
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-soft-orange badge-sm border d-flex align-items-center justify-content-center text-orange fs-12 fw-medium text-danger">
                            Medium
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link 
                            href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Verify your email</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-primary fs-10 text-primary fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-primary me-1 fs-5"></i> Open
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link 
                  href="#"
                  className="btn btn-white bg-white border d-flex align-items-center justify-content-center"
                  data-bs-toggle="modal"
                  data-bs-target="#add_modal"
                >
                  <i className="isax isax-add-circle text-gray-9 fs-13 me-1"></i> New Ticket
                </Link >
              </div>
            </div>
            <div className="p-3 rounded bg-light w-100 me-3">
              <div className="bg-white border p-2 rounded mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="bg-transparent-primary p-1 d-flex rounded-circle me-2">
                      <span className="bg-primary rounded-circle d-block p-1"></span>
                    </span>
                    <h6 className="me-2 fs-16 fw-semibold">Pending</h6>
                    <span className="badge bg-light rounded-circle fs-10 avatar avatar-xs text-dark">
                      9
                    </span>
                  </div>
                  <div className="dropdown">
                    <Link  href="#"
                      className="d-inline-flex align-items-center btn btn-white border-0"
                      data-bs-toggle="dropdown"
                    >
                      <i className="isax isax-more"></i>
                    </Link >
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link >
                      </li>
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-2"></i>Delete
                        </Link >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="kanban-drag-wrap">
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-light badge-sm border-info d-flex align-items-center justify-content-center text-info fs-12 fw-medium">
                            Low
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link  href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Support For Theme</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-warning fs-10 text-warning fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-warning me-1 fs-5"></i> Pending
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-soft-orange badge-sm border d-flex align-items-center justify-content-center text-orange fs-12 fw-medium text-danger">
                            Medium
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link 
                            href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Verify your email</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-warning fs-10 text-warning fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-warning me-1 fs-5"></i> Pending
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-light badge-sm border-info d-flex align-items-center justify-content-center text-info fs-12 fw-medium">
                            Low
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link 
                            href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Support For Theme</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-warning fs-10 text-warning fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-warning me-1 fs-5"></i> Pending
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-soft-orange badge-sm border d-flex align-items-center justify-content-center text-orange fs-12 fw-medium text-danger">
                            Medium
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link 
                            href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Verify your email</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-warning fs-10 text-warning fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-warning me-1 fs-5"></i> Pending
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link 
                  href="#"
                  className="btn btn-white bg-white border d-flex align-items-center justify-content-center"
                  data-bs-toggle="modal"
                  data-bs-target="#add_modal"
                >
                  <i className="isax isax-add-circle text-gray-9 fs-13 me-1"></i> New Ticket
                </Link >
              </div>
            </div>
            <div className="p-3 rounded bg-light w-100 me-3">
              <div className="bg-white border p-2 rounded mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="bg-soft-danger p-1 d-flex rounded-circle me-2">
                      <span className="bg-danger rounded-circle d-block p-1"></span>
                    </span>
                    <h6 className="me-2 fs-16 fw-semibold">Closed</h6>
                    <span className="badge bg-light rounded-circle fs-10 avatar avatar-xs text-dark">
                      7
                    </span>
                  </div>
                  <div className="dropdown">
                    <Link  href="#"
                      className="d-inline-flex align-items-center btn btn-white border-0"
                      data-bs-toggle="dropdown"
                    >
                      <i className="isax isax-more"></i>
                    </Link >
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link >
                      </li>
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-2"></i>Delete
                        </Link >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="kanban-drag-wrap">
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-light badge-sm border-info d-flex align-items-center justify-content-center text-info fs-12 fw-medium">
                            Low
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link  href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Support For Theme</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-primary fs-10 text-primary fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-primary me-1 fs-5"></i> Open
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-soft-orange badge-sm border d-flex align-items-center justify-content-center text-orange fs-12 fw-medium text-danger">
                            Medium
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link 
                            href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Verify your email</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-primary fs-10 text-primary fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-primary me-1 fs-5"></i> Open
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link 
                  href="#"
                  className="btn btn-white bg-white border d-flex align-items-center justify-content-center"
                  data-bs-toggle="modal"
                  data-bs-target="#add_modal"
                >
                  <i className="isax isax-add-circle text-gray-9 fs-13 me-1"></i> New Ticket
                </Link >
              </div>
            </div>
            <div className="p-3 rounded bg-light w-100">
              <div className="bg-white border p-2 rounded mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="bg-transparent-success p-1 d-flex rounded-circle me-2">
                      <span className="bg-success rounded-circle d-block p-1"></span>
                    </span>
                    <h6 className="me-2 fs-16 fw-semibold">Resolved</h6>
                    <span className="badge bg-light rounded-circle fs-10 avatar avatar-xs text-dark">
                      7
                    </span>
                  </div>
                  <div className="dropdown">
                    <Link  href="#"
                      className="d-inline-flex align-items-center btn btn-white border-0"
                      data-bs-toggle="dropdown"
                    >
                      <i className="isax isax-more"></i>
                    </Link >
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link >
                      </li>
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-2"></i>Delete
                        </Link >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="kanban-drag-wrap">
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-light badge-sm border-info d-flex align-items-center justify-content-center text-info fs-12 fw-medium">
                            Low
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link  href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Support For Theme</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-warning fs-10 text-warning fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-warning me-1 fs-5"></i> Pending
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-soft-orange badge-sm border d-flex align-items-center justify-content-center text-orange fs-12 fw-medium text-danger">
                            Medium
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link 
                            href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Verify your email</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-warning fs-10 text-warning fw-medium">
                            <i className="fa-solid fa-circle text-warning me-1 fs-6"></i> Pending
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link 
                  href="#"
                  className="btn btn-white bg-white border d-flex align-items-center justify-content-center"
                  data-bs-toggle="modal"
                  data-bs-target="#add_modal"
                >
                  <i className="isax isax-add-circle text-gray-9 fs-13 me-1"></i> New Ticket
                </Link >
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="Open_tab" role="tabpanel">
          <div className="d-flex align-items-start overflow-auto project-status flex-wrap flex-lg-nowrap flex-md-nowrap">
            <div className="p-3 rounded bg-light w-100 me-3">
              <div className="bg-white border p-2 rounded mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="bg-soft-pink p-1 d-flex rounded-circle me-2">
                      <span className="bg-info rounded-circle d-block p-1"></span>
                    </span>
                    <h6 className="me-2 fs-16 fw-semibold">Open</h6>
                    <span className="badge bg-light rounded-circle fs-10 avatar avatar-xs text-dark">
                      5
                    </span>
                  </div>
                  <div className="dropdown">
                    <Link  href="#"
                      className="d-inline-flex align-items-center btn btn-white border-0"
                      data-bs-toggle="dropdown"
                    >
                      <i className="isax isax-more"></i>
                    </Link >
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link >
                      </li>
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-2"></i>Delete
                        </Link >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="kanban-drag-wrap">
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-light badge-sm border-info d-flex align-items-center justify-content-center text-info fs-12 fw-medium">
                            Low
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link  href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Support For Theme</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-primary fs-10 text-primary fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-primary me-1 fs-5"></i> Open
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-soft-orange badge-sm border d-flex align-items-center justify-content-center text-orange fs-12 fw-medium text-danger">
                            Medium
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link 
                            href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Verify your email</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-primary fs-10 text-primary fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-primary me-1 fs-5"></i> Open
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link 
                  href="#"
                  className="btn btn-white bg-white border d-flex align-items-center justify-content-center"
                  data-bs-toggle="modal"
                  data-bs-target="#add_modal"
                >
                  <i className="isax isax-add-circle text-gray-9 fs-13 me-1"></i> New Ticket
                </Link >
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="Resolved_tab" role="tabpanel">
          <div className="d-flex align-items-start overflow-auto project-status pb-3 flex-wrap flex-lg-nowrap flex-md-nowrap">
            <div className="p-3 rounded bg-light w-100">
              <div className="bg-white border p-2 rounded mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="bg-transparent-success p-1 d-flex rounded-circle me-2">
                      <span className="bg-success rounded-circle d-block p-1"></span>
                    </span>
                    <h6 className="me-2 fs-16 fw-semibold">Resolved</h6>
                    <span className="badge bg-light rounded-circle fs-10 avatar avatar-xs text-dark">
                      7
                    </span>
                  </div>
                  <div className="dropdown">
                    <Link  href="#"
                      className="d-inline-flex align-items-center btn btn-white border-0"
                      data-bs-toggle="dropdown"
                    >
                      <i className="isax isax-more"></i>
                    </Link >
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link >
                      </li>
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-2"></i>Delete
                        </Link >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="kanban-drag-wrap">
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-light badge-sm border-info d-flex align-items-center justify-content-center text-info fs-12 fw-medium">
                            Low
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link  href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Support For Theme</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-warning fs-10 text-warning fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-warning me-1 fs-5"></i> Pending
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-soft-orange badge-sm border d-flex align-items-center justify-content-center text-orange fs-12 fw-medium text-danger">
                            Medium
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link 
                            href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Verify your email</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-warning fs-10 text-warning fw-medium">
                            <i className="fa-solid fa-circle text-warning me-1 fs-6"></i> Pending
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link 
                  href="#"
                  className="btn btn-white bg-white border d-flex align-items-center justify-content-center"
                  data-bs-toggle="modal"
                  data-bs-target="#add_modal"
                >
                  <i className="isax isax-add-circle text-gray-9 fs-13 me-1"></i> New Ticket
                </Link >
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="Pending_tab" role="tabpanel">
          <div className="d-flex align-items-start overflow-auto project-status pb-3 flex-wrap flex-lg-nowrap flex-md-nowrap">
            <div className="p-3 rounded bg-light w-100 me-3">
              <div className="bg-white border p-2 rounded mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="bg-transparent-primary p-1 d-flex rounded-circle me-2">
                      <span className="bg-primary rounded-circle d-block p-1"></span>
                    </span>
                    <h6 className="me-2 fs-16 fw-semibold">Pending</h6>
                    <span className="badge bg-light rounded-circle fs-10 avatar avatar-xs text-dark">
                      9
                    </span>
                  </div>
                  <div className="dropdown">
                    <Link  href="#"
                      className="d-inline-flex align-items-center btn btn-white border-0"
                      data-bs-toggle="dropdown"
                    >
                      <i className="isax isax-more"></i>
                    </Link >
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link >
                      </li>
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-2"></i>Delete
                        </Link >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="kanban-drag-wrap">
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-light badge-sm border-info d-flex align-items-center justify-content-center text-info fs-12 fw-medium">
                            Low
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link  href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Support For Theme</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-warning fs-10 text-warning fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-warning me-1 fs-5"></i> Pending
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-soft-orange badge-sm border d-flex align-items-center justify-content-center text-orange fs-12 fw-medium text-danger">
                            Medium
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link 
                            href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Verify your email</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-warning fs-10 text-warning fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-warning me-1 fs-5"></i> Pending
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-light badge-sm border-info d-flex align-items-center justify-content-center text-info fs-12 fw-medium">
                            Low
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link 
                            href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Support For Theme</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-warning fs-10 text-warning fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-warning me-1 fs-5"></i> Pending
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-soft-orange badge-sm border d-flex align-items-center justify-content-center text-orange fs-12 fw-medium text-danger">
                            Medium
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link 
                            href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Verify your email</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-warning fs-10 text-warning fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-warning me-1 fs-5"></i> Pending
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link 
                  href="#"
                  className="btn btn-white bg-white border d-flex align-items-center justify-content-center"
                  data-bs-toggle="modal"
                  data-bs-target="#add_modal"
                >
                  <i className="isax isax-add-circle text-gray-9 fs-13 me-1"></i> New Ticket
                </Link >
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="Closed_tab" role="tabpanel">
          <div className="d-flex align-items-start overflow-auto project-status pb-3 flex-wrap flex-lg-nowrap flex-md-nowrap">
            <div className="p-3 rounded bg-light w-100 me-3">
              <div className="bg-white border p-2 rounded mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="bg-soft-danger p-1 d-flex rounded-circle me-2">
                      <span className="bg-danger rounded-circle d-block p-1"></span>
                    </span>
                    <h6 className="me-2 fs-16 fw-semibold">Closed</h6>
                    <span className="badge bg-light rounded-circle fs-10 avatar avatar-xs text-dark">
                      7
                    </span>
                  </div>
                  <div className="dropdown">
                    <Link  href="#"
                      className="d-inline-flex align-items-center btn btn-white border-0"
                      data-bs-toggle="dropdown"
                    >
                      <i className="isax isax-more"></i>
                    </Link >
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_modal"
                        >
                          <i className="isax isax-edit me-2"></i>Edit
                        </Link >
                      </li>
                      <li>
                        <Link  href="#"
                          className="dropdown-item rounded-1"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_modal"
                        >
                          <i className="isax isax-trash me-2"></i>Delete
                        </Link >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="kanban-drag-wrap">
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-light badge-sm border-info d-flex align-items-center justify-content-center text-info fs-12 fw-medium">
                            Low
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link  href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Support For Theme</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-primary fs-10 text-primary fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-primary me-1 fs-5"></i> Open
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card kanban-card mb-2">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge bg-soft-orange badge-sm border d-flex align-items-center justify-content-center text-orange fs-12 fw-medium text-danger">
                            Medium
                          </span>
                        </div>
                        <div className="dropdown">
                          <Link 
                            href="#"
                            className="d-inline-flex align-items-center bg-white rounded-circle p-1 border justify-content-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-more d-flex align-items-center justify-content-center text-gray-5"></i>
                          </Link >
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_modal"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link >
                            </li>
                            <li>
                              <Link  href="#"
                                className="dropdown-item rounded-1"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 border-bottom border-1 border-light pb-3 mb-3 flex-column">
                        <h6 className="d-flex align-items-center mb-3">Verify your email</h6>
                        <div className="d-flex align-items-center gap-3">
                          <span className="badge badge-sm badge-soft-light border fs-10 text-dark">
                            {' '}
                            #1234
                          </span>
                          <span className="badge badge-sm badge-soft-primary fs-10 text-primary fw-medium d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-circle text-primary me-1 fs-5"></i> Open
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="avatar-list-stacked avatar-group-sm me-3">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="/assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
                          <Link  href="#" className="avatar avatar-rounded bg-primary fs-12 text-white">
                            1+
                          </Link >
                        </div>
                        <div className="d-flex align-items-center fs-12 text-gray-9">
                          <i className="isax isax-calendar-2 text-gray-5 fs-14 me-1"></i>30 Jan 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link 
                  href="#"
                  className="btn btn-white bg-white border d-flex align-items-center justify-content-center"
                  data-bs-toggle="modal"
                  data-bs-target="#add_modal"
                >
                  <i className="isax isax-add-circle text-gray-9 fs-13 me-1"></i> New Ticket
                </Link >
              </div>
            </div>
          </div>
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
              <h6 className="mb-1">Delete Tickets Kanban</h6>
              <p className="mb-3">Are you sure, you want to delete Tickets Kanban?</p>
              <div className="d-flex justify-content-center">
                <Link  href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link >
                <Link to="/ticket-kanban" className="btn btn-primary">
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

export default TicketKanban;
