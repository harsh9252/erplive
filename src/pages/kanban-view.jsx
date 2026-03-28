import React from 'react';
import { Link } from 'react-router-dom';

const KanbanView = () => {
  return (
    <>
      <div className="d-flex my-xl-auto right-content justify-content-end align-items-center flex-wrap table-header">
        <div className="me-2 mb-3">
          <div className="dropdown">
            <Link href="#"
              className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="ti ti-file-export me-1"></i>Export
            </Link>
            <ul className="dropdown-menu  dropdown-menu-end p-3">
              <li>
                <Link href="#" className="dropdown-item rounded-1">
                  <i className="ti ti-file-type-pdf me-1"></i>Export as PDF
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item rounded-1">
                  <i className="ti ti-file-type-xls me-1"></i>Export as Excel{' '}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card shadow-none">
        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h6 className="mb-0">Kanban View</h6>
          <div className="d-flex align-items-center flex-wrap row-gap-3">
            <div className="avatar-list-stacked avatar-group-sm me-3">
              <span className="avatar avatar-rounded">
                <img
                  className="border border-white"
                  src="/assets/img/profiles/avatar-19.jpg"
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
                  src="/assets/img/profiles/avatar-16.jpg"
                  alt="img"
                />
              </span>
              <span className="avatar avatar-rounded bg-primary fs-12"></span>
              1+
            </div>
            <div className="d-flex align-items-center me-3">
              <p className="mb-0 me-3 pe-3 border-end fs-14">
                Total Task : <span className="text-dark"> 55 </span>
              </p>
              <p className="mb-0 me-3 pe-3 border-end fs-14">
                Pending : <span className="text-dark"> 15 </span>
              </p>
              <p className="mb-0 fs-14">
                Completed : <span className="text-dark"> 40 </span>
              </p>
            </div>
            <div className="input-icon-start position-relative">
              <span className="input-icon-addon">
                <i className="ti ti-search"></i>
              </span>
              <input
                type="text"
                className="form-control h-auto py-1"
                placeholder="Search Project"
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4">
              <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                <h6 className="me-2 fs-14">Priority</h6>
                <ul
                  className="nav nav-pills border d-inline-flex p-1 rounded bg-light todo-tabs"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item me-1" role="presentation">
                    <button
                      className="nav-link btn btn-sm btn-icon p-2 d-flex align-items-center justify-content-center w-auto active"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-selected="true"
                    >
                      All
                    </button>
                  </li>
                  <li className="nav-item me-1" role="presentation">
                    <button
                      className="nav-link btn btn-sm btn-icon p-2 d-flex align-items-center justify-content-center w-auto"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      High
                    </button>
                  </li>
                  <li className="nav-item me-1" role="presentation">
                    <button
                      className="nav-link btn btn-sm btn-icon p-2 d-flex align-items-center justify-content-center w-auto"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-medium"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Medium
                    </button>
                  </li>
                  <li className="nav-item me-1" role="presentation">
                    <button
                      className="nav-link btn btn-sm btn-icon p-2 d-flex align-items-center justify-content-center w-auto"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-low"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Low
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="d-flex align-items-center justify-content-lg-end flex-wrap row-gap-3 mb-3 table-header">
                <div className="dropdown me-2">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Clients
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Clients
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Sophie
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Cameron
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Doris
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown me-2">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Select Status
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Inprogress
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        On-hold
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Completed
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="d-flex align-items-center border p-2 h-auto py-1 rounded fw-medium text-gray-9">
                  <span className="d-inline-flex me-2">Sort By : </span>
                  <div className="dropdown">
                    <Link
                      href="#"
                      className="dropdown-toggle pe-4 btn btn-outline-white d-inline-flex align-items-center border-0 bg-transparent p-0 text-dark"
                      data-bs-toggle="dropdown"
                    >
                      Created Date
                    </Link>
                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Created Date
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Last 7 Days
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Due Date
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel">
              <div className="d-flex align-items-start overflow-auto project-status">
                <div className="p-3 rounded bg-light border w-100 me-3">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-warning p-1 d-flex rounded-circle me-2">
                          <span className="bg-warning rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">New</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">02</span>
                      </div>
                      <div className="dropdown">
                        <Link
                          href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-success badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Low
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Doccure</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-danger badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>High
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link
                                href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Dreams Tour</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
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
                                  src="/assets/img/profiles/avatar-09.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light border w-100 me-3">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-primary p-1 d-flex rounded-circle me-2">
                          <span className="bg-primary rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">Inprogress</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">13</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-danger badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>High
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Dreams Gigs</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
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
                                  src="/assets/img/profiles/avatar-04.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-warning badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Medium
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link
                                href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Dreams Rent</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
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
                                  src="/assets/img/profiles/avatar-05.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light border w-100 me-3">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-danger p-1 d-flex rounded-circle me-2">
                          <span className="bg-danger rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">On-hold</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">04</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-success badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Low
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Dreams Sports</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
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
                                  src="/assets/img/profiles/avatar-03.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-success badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Low
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link
                                href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Dreams Estate</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
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
                                  src="/assets/img/profiles/avatar-04.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light border w-100">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-success p-1 d-flex rounded-circle me-2">
                          <span className="bg-success rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">Completed</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">10</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-warning badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Medium
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Dreams Rent</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
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
                                  src="/assets/img/profiles/avatar-04.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="pills-contact" role="tabpanel">
              <div className="d-flex align-items-start overflow-auto project-status pb-3">
                <div className="p-3 rounded bg-light border w-100 me-3">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-warning p-1 d-flex rounded-circle me-2">
                          <span className="bg-warning rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">New</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">02</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-danger badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>High
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Dreams LMS</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
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
                                  src="/assets/img/profiles/avatar-04.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-danger badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>High
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link
                                href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Truelysell</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
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
                                  src="/assets/img/profiles/avatar-05.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light border w-100 me-3">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-skyblue p-1 d-flex rounded-circle me-2">
                          <span className="bg-skyblue rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">Inprogress</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">13</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-danger badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>High
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Dreams POS</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
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
                                  src="/assets/img/profiles/avatar-07.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-danger badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>High
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link
                                href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">PreSkool</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
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
                                  src="/assets/img/profiles/avatar-05.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light border w-100 me-3">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-danger p-1 d-flex rounded-circle me-2">
                          <span className="bg-danger rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">On-hold</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">04</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-danger badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>High
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Kanakku</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-11.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-12.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light border w-100">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-success p-1 d-flex rounded-circle me-2">
                          <span className="bg-success rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">Completed</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">10</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-danger badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>High
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">SmartHR</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="pills-medium" role="tabpanel">
              <div className="d-flex align-items-start overflow-auto project-status pb-3">
                <div className="p-3 rounded bg-light border w-100 me-3">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-warning p-1 d-flex rounded-circle me-2">
                          <span className="bg-warning rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">New</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">02</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-warning badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Medium
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">CRMS</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-warning badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Medium
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link
                                href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Doccure</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light border w-100 me-3">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-skyblue p-1 d-flex rounded-circle me-2">
                          <span className="bg-skyblue rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">Inprogress</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">13</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-warning badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Medium
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Dreams Rent</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-warning badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Medium
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link
                                href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Dreams POS</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light border w-100 me-3">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-danger p-1 d-flex rounded-circle me-2">
                          <span className="bg-danger rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">On-hold</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">04</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-warning badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Medium
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Dreams LMS</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-27.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-16.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light border w-100">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-success p-1 d-flex rounded-circle me-2">
                          <span className="bg-success rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">Completed</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">10</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-warning badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Medium
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Doccure</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="pills-low" role="tabpanel">
              <div className="d-flex align-items-start overflow-auto project-status pb-3">
                <div className="p-3 rounded bg-light border w-100 me-3">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-warning p-1 d-flex rounded-circle me-2">
                          <span className="bg-warning rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">New</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">02</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-success badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Low
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Project Title</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-27.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-success badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Low
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link
                                href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Project Title</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light border w-100 me-3">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-skyblue p-1 d-flex rounded-circle me-2">
                          <span className="bg-skyblue rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">Inprogress</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">13</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-success badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Low
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Project Title</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-success badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Low
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link
                                href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Project Title</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light border w-100 me-3">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-danger p-1 d-flex rounded-circle me-2">
                          <span className="bg-danger rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">On-hold</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">04</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-success badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Low
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Project Title</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
                <div className="p-3 rounded bg-light border w-100">
                  <div className="bg-white border p-2 rounded mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <span className="bg-soft-success p-1 d-flex rounded-circle me-2">
                          <span className="bg-success rounded-circle d-block p-1"></span>
                        </span>
                        <h6 className="me-2 mb-0">Completed</h6>
                        <span className="badge badge-soft-light  text-dark rounded-pill">10</span>
                      </div>
                      <div className="dropdown">
                        <Link href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="dropdown-item rounded-1"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <i className="ti ti-trash me-2"></i>Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="kanban-drag-wrap">
                    <div>
                      <div className="card kanban-card mb-2">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <span className="badge bg-success badge-xs d-flex align-items-center justify-content-center">
                                <i className="fas fa-circle fs-6 me-1"></i>Low
                              </span>
                            </div>
                            <div className="dropdown">
                              <Link href="#"
                                className="d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="ti ti-dots-vertical"></i>
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end p-3">
                                <li>
                                  <Link href="#" className="dropdown-item rounded-1">
                                    <i className="ti ti-edit me-2"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#"
                                    className="dropdown-item rounded-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_modal"
                                  >
                                    <i className="ti ti-trash me-2"></i>Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                              <img
                                src="/assets/img/icons/kanban-arrow.svg"
                                className="w-auto h-auto"
                                alt="Img"
                              />
                            </span>
                            <h6 className="d-flex align-items-center mb-0">Project Title</h6>
                          </div>
                          <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Budget</span>
                              <p className="fs-12 text-dark">$24,000</p>
                            </div>
                            <div className="me-3 pe-3 border-end">
                              <span className="fw-medium fs-12 d-block mb-1">Tasks</span>
                              <p className="fs-12 text-dark">12/15</p>
                            </div>
                            <div className="">
                              <span className="fw-medium fs-12 d-block mb-1">Due on</span>
                              <p className="fs-12 text-dark">15 Apr</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="avatar-list-stacked avatar-group-sm me-3">
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-19.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-16.jpg"
                                  alt="img"
                                />
                              </span>
                              <span className="avatar avatar-rounded">
                                <img
                                  className="border border-white"
                                  src="/assets/img/profiles/avatar-01.jpg"
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
                              <Link href="#"
                                className="avatar avatar-rounded bg-primary fs-12 text-white"
                              >
                                1+
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="d-flex align-items-center text-dark me-2">
                                <i className="ti ti-message-circle text-gray me-1"></i>
                              </Link>
                              <Link href="#" className="d-flex align-items-center text-dark">
                                <i className="ti ti-paperclip text-gray me-1"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="#"
                      className="btn btn-outline-white border border-dashed d-flex align-items-center justify-content-center"
                    >
                      <i className="ti ti-plus me-2"></i> New Project
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
              <h6 className="mb-1">Delete kanban</h6>
              <p className="mb-3">Are you sure, you want to delete Kanban?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/kanban-view" className="btn btn-primary">
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

export default KanbanView;
