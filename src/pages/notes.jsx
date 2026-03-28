import React from 'react';
import { Link } from 'react-router-dom';

const Notes = () => {
  return (
    <>
      <div className="mb-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h4 className="mb-1 fw-bold">Notes</h4>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap table-header">
          <div className="me-2 mb-2">
            <div className="dropdown">
              <Link href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="ti ti-file-export me-2"></i>Export
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
          <div className="mb-2">
            <Link
              href="#"
              className="btn btn-primary btn-md d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_note"
            >
              <i className="ti ti-circle-plus me-2"></i>Add Notes
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-3 col-md-12 sidebars-righ section-bulk-widget">
          <div className="border rounded-3 bg-white p-3 mb-3">
            <div className="mb-3 pb-3 border-bottom">
              <h6 className="d-flex align-items-center mb-0">
                <i className="ti ti-file-text me-2"></i>Notes List
              </h6>
            </div>
            <div className="border-bottom pb-3 ">
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className="d-flex text-start align-items-center fw-medium fs-15 nav-link active mb-1"
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="true"
                >
                  <i className="ti ti-inbox me-2"></i>All Notes<span className="ms-2">1</span>
                </button>
                <button
                  className="d-flex text-start align-items-center fw-medium fs-15 nav-link mb-1"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  <i className="ti ti-star me-2"></i>Important
                </button>
                <button
                  className="d-flex text-start align-items-center fw-medium fs-15 nav-link mb-0"
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings"
                  aria-selected="false"
                >
                  <i className="ti ti-trash me-2"></i>Trash
                </button>
              </div>
            </div>
            <div className="mt-3">
              <div className="border-bottom px-2 pb-3 mb-3">
                <h6 className="mb-2">Tags</h6>
                <div className="d-flex flex-column mt-2">
                  <Link href="#" className="text-info mb-2">
                    <span className="text-info me-2">
                      <i className="fas fa-square square-rotate fs-10"></i>
                    </span>
                    Pending
                  </Link>
                  <Link href="#" className="text-danger mb-2">
                    <span className="text-danger me-2">
                      <i className="fas fa-square square-rotate fs-10"></i>
                    </span>
                    Onhold
                  </Link>
                  <Link href="#" className="text-warning mb-2">
                    <span className="text-warning me-2">
                      <i className="fas fa-square square-rotate fs-10"></i>
                    </span>
                    Inprogress
                  </Link>
                  <Link href="#" className="text-success">
                    <span className="text-success me-2">
                      <i className="fas fa-square square-rotate fs-10"></i>
                    </span>
                    Done
                  </Link>
                </div>
              </div>
              <div className="px-2">
                <h6 className="mb-2">Priority</h6>
                <div className="d-flex flex-column mt-2">
                  <Link href="#" className="text-warning mb-2">
                    <span className="text-warning me-2">
                      <i className="fas fa-square square-rotate fs-10"></i>
                    </span>
                    Medium
                  </Link>
                  <Link href="#" className="text-success mb-2">
                    <span className="text-success me-2">
                      <i className="fas fa-square square-rotate fs-10"></i>
                    </span>
                    High
                  </Link>
                  <Link href="#" className="text-danger">
                    <span className="text-danger me-2">
                      <i className="fas fa-square square-rotate fs-10"></i>
                    </span>
                    Low
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 budget-role-notes">
          <div className="bg-white border rounded-3 d-flex align-items-center justify-content-between flex-wrap mb-3 p-3 pb-0">
            <div className="d-flex align-items-center mb-3">
              <div className="me-3">
                <select className="select">
                  <option>Bulk Actions</option>
                  <option>Delete Marked</option>
                  <option>Unmark All</option>
                  <option>Mark All</option>
                </select>
              </div>
              <Link href="#" className="btn btn-light">
                Apply
              </Link>
            </div>
            <div className="form-sort mb-3 position-relative">
              <i className="ti ti-filter feather-filter info-img"></i>
              <select className="select">
                <option>Recent</option>
                <option>Last Modified</option>
                <option>Last Modified by me</option>
              </select>
            </div>
          </div>
          <div className="tab-content" id="v-pills-tabContent2">
            <div
              className="tab-pane fade active show"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <div className="border-bottom mb-3 pb-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                      <div className="d-flex align-items-center mb-3">
                        <h4 className="mb-0">Important Notes </h4>
                        <div className="owl-nav slide-nav5 text-end nav-control ms-3"></div>
                      </div>
                      <div className="notes-close mb-3">
                        <Link href="#" className="text-danger fs-15">
                          <i className="fas fa-times me-1"></i> Close{' '}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="notes-slider owl-carousel">
                      <div className="card rounded-3 mb-0">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="badge badge-outline-warning d-inline-flex align-items-center">
                              <i className="fas fa-circle fs-6 me-1"></i>Medium
                            </span>
                            <div>
                              <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-ellipsis-v"></i>
                              </Link>
                              <div className="dropdown-menu notes-menu dropdown-menu-end">
                                <Link
                                  href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-note-units"
                                >
                                  <span>
                                    <i data-feather="edit"></i>
                                  </span>
                                  Edit
                                </Link>
                                <Link href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <span>
                                    <i data-feather="trash-2"></i>
                                  </span>
                                  Delete
                                </Link>
                                <Link href="#" className="dropdown-item">
                                  <span>
                                    <i data-feather="star"></i>
                                  </span>
                                  Not Important
                                </Link>
                                <Link
                                  href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view-note-units"
                                >
                                  <span>
                                    <i data-feather="eye"></i>
                                  </span>
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="my-3">
                            <h6 className="text-truncate mb-1">
                              <Link href="#">Plan a trip to another country</Link>
                            </h6>
                            <p className="mb-3 d-flex align-items-center text-dark">
                              <i className="ti ti-calendar me-1"></i>20 Jan 2024
                            </p>
                            <p className="text-truncate line-clamb-2 text-wrap">
                              Space, the final frontier. These are the voyages of the Starship
                              Enterprise.
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex align-items-center">
                              <Link href="#" className="avatar avatar-md me-2">
                                <img
                                  src="/assets/img/profiles/avatar-01.jpg"
                                  alt="Profile"
                                  className="img-fluid rounded-circle"
                                />
                              </Link>
                              <span className="text-info d-flex align-items-center">
                                <i className="fas fa-square square-rotate fs-10 me-1"></i>Personal
                              </span>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="me-2">
                                <span>
                                  <i className="fas fa-star text-warning"></i>
                                </span>
                              </Link>
                              <Link href="#">
                                <span>
                                  <i className="ti ti-trash text-danger"></i>
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card rounded-3 mb-0">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="badge badge-outline-danger d-inline-flex align-items-center">
                              <i className="fas fa-circle fs-6 me-1"></i>Low
                            </span>
                            <div>
                              <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-ellipsis-v"></i>
                              </Link>
                              <div className="dropdown-menu notes-menu dropdown-menu-end">
                                <Link
                                  href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-note-units"
                                >
                                  <span>
                                    <i data-feather="edit"></i>
                                  </span>
                                  Edit
                                </Link>
                                <Link href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <span>
                                    <i data-feather="trash-2"></i>
                                  </span>
                                  Delete
                                </Link>
                                <Link href="#" className="dropdown-item">
                                  <span>
                                    <i data-feather="star"></i>
                                  </span>
                                  Not Important
                                </Link>
                                <Link
                                  href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view-note-units"
                                >
                                  <span>
                                    <i data-feather="eye"></i>
                                  </span>
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="my-3">
                            <h6 className="text-truncate mb-1">
                              <Link href="#">Improve touch typing</Link>
                            </h6>
                            <p className="mb-3 d-flex align-items-center text-dark">
                              <i className="ti ti-calendar me-1"></i>22 Jan 2024
                            </p>
                            <p className="text-truncate line-clamb-2 text-wrap">
                              Well, the way they make shows is, they make one show.
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex align-items-center">
                              <Link href="#" className="avatar avatar-md me-2">
                                <img
                                  src="/assets/img/profiles/avatar-02.jpg"
                                  alt="Profile"
                                  className="img-fluid rounded-circle"
                                />
                              </Link>
                              <span className="text-success d-flex align-items-center">
                                <i className="fas fa-square square-rotate fs-10 me-1"></i>Work
                              </span>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="me-2">
                                <span>
                                  <i className="fas fa-star text-warning"></i>
                                </span>
                              </Link>
                              <Link href="#">
                                <span>
                                  <i className="ti ti-trash text-danger"></i>
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card rounded-3 mb-0">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="badge badge-outline-danger d-inline-flex align-items-center">
                              <i className="fas fa-circle fs-6 me-1"></i>Low
                            </span>
                            <div>
                              <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-ellipsis-v"></i>
                              </Link>
                              <div className="dropdown-menu notes-menu dropdown-menu-end">
                                <Link
                                  href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-note-units"
                                >
                                  <span>
                                    <i data-feather="edit"></i>
                                  </span>
                                  Edit
                                </Link>
                                <Link href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <span>
                                    <i data-feather="trash-2"></i>
                                  </span>
                                  Delete
                                </Link>
                                <Link href="#" className="dropdown-item">
                                  <span>
                                    <i data-feather="star"></i>
                                  </span>
                                  Not Important
                                </Link>
                                <Link
                                  href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view-note-units"
                                >
                                  <span>
                                    <i data-feather="eye"></i>
                                  </span>
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="my-3">
                            <h6 className="text-truncate mb-1">
                              <Link href="#">Learn calligraphy</Link>
                            </h6>
                            <p className="mb-3 d-flex align-items-center text-dark">
                              <i className="ti ti-calendar me-1"></i>24 Jan 2024
                            </p>
                            <p className="text-truncate line-clamb-2 text-wrap">
                              Calligraphy, the art of beautiful handwriting. The term may derive
                              from the Greek words.{' '}
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex align-items-center">
                              <Link href="#" className="avatar avatar-md me-2">
                                <img
                                  src="/assets/img/profiles/avatar-03.jpg"
                                  alt="Profile"
                                  className="img-fluid rounded-circle"
                                />
                              </Link>
                              <span className="text-info d-flex align-items-center">
                                <i className="fas fa-square square-rotate fs-10 me-1"></i>Social
                              </span>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="me-2">
                                <span>
                                  <i className="fas fa-star text-warning"></i>
                                </span>
                              </Link>
                              <Link href="#">
                                <span>
                                  <i className="ti ti-trash text-danger"></i>
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card rounded-3 mb-0">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="badge badge-outline-warning d-inline-flex align-items-center">
                              <i className="fas fa-circle fs-6 me-1"></i>Medium
                            </span>
                            <div>
                              <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-ellipsis-v"></i>
                              </Link>
                              <div className="dropdown-menu notes-menu dropdown-menu-end">
                                <Link
                                  href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-note-units"
                                >
                                  <span>
                                    <i data-feather="edit"></i>
                                  </span>
                                  Edit
                                </Link>
                                <Link href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <span>
                                    <i data-feather="trash-2"></i>
                                  </span>
                                  Delete
                                </Link>
                                <Link href="#" className="dropdown-item">
                                  <span>
                                    <i data-feather="star"></i>
                                  </span>
                                  Not Important
                                </Link>
                                <Link
                                  href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view-note-units"
                                >
                                  <span>
                                    <i data-feather="eye"></i>
                                  </span>
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="my-3">
                            <h6 className="text-truncate mb-1">
                              <Link href="#">Plan a trip to another country</Link>
                            </h6>
                            <p className="mb-3 d-flex align-items-center text-dark">
                              <i className="ti ti-calendar me-1"></i>25 Jan 2024
                            </p>
                            <p className="text-truncate line-clamb-2 text-wrap">
                              Space, the final frontier. These are the voyages of the Starship
                              Enterprise.
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex align-items-center">
                              <Link href="#" className="avatar avatar-md me-2">
                                <img
                                  src="/assets/img/profiles/avatar-01.jpg"
                                  alt="Profile"
                                  className="img-fluid rounded-circle"
                                />
                              </Link>
                              <span className="text-info d-flex align-items-center">
                                <i className="fas fa-square square-rotate fs-10 me-1"></i>Personal
                              </span>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="me-2">
                                <span>
                                  <i className="fas fa-star text-warning"></i>
                                </span>
                              </Link>
                              <Link href="#">
                                <span>
                                  <i className="ti ti-trash text-danger"></i>
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card rounded-3 mb-0">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="badge badge-outline-danger d-inline-flex align-items-center">
                              <i className="fas fa-circle fs-6 me-1"></i>Low
                            </span>
                            <div>
                              <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-ellipsis-v"></i>
                              </Link>
                              <div className="dropdown-menu notes-menu dropdown-menu-end">
                                <Link
                                  href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-note-units"
                                >
                                  <span>
                                    <i data-feather="edit"></i>
                                  </span>
                                  Edit
                                </Link>
                                <Link href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                >
                                  <span>
                                    <i data-feather="trash-2"></i>
                                  </span>
                                  Delete
                                </Link>
                                <Link href="#" className="dropdown-item">
                                  <span>
                                    <i data-feather="star"></i>
                                  </span>
                                  Not Important
                                </Link>
                                <Link
                                  href="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#view-note-units"
                                >
                                  <span>
                                    <i data-feather="eye"></i>
                                  </span>
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="my-3">
                            <h6 className="text-truncate mb-1">
                              <Link href="#">Improve touch typing</Link>
                            </h6>
                            <p className="mb-3 d-flex align-items-center text-dark">
                              <i className="ti ti-calendar me-1"></i>26 Jan 2024
                            </p>
                            <p className="text-truncate line-clamb-2 text-wrap">
                              Well, the way they make shows is, they make one show.
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-top pt-3">
                            <div className="d-flex align-items-center">
                              <Link href="#" className="avatar avatar-md me-2">
                                <img
                                  src="/assets/img/profiles/avatar-02.jpg"
                                  alt="Profile"
                                  className="img-fluid rounded-circle"
                                />
                              </Link>
                              <span className="text-success d-flex align-items-center">
                                <i className="fas fa-square square-rotate fs-10 me-1"></i>Work
                              </span>
                            </div>
                            <div className="d-flex align-items-center">
                              <Link href="#" className="me-2">
                                <span>
                                  <i className="fas fa-star text-warning"></i>
                                </span>
                              </Link>
                              <Link href="#">
                                <span>
                                  <i className="ti ti-trash text-danger"></i>
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-success d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>High
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Backup Files EOD</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>20 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Project files should be took backup before end of the day.
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-05.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-info d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Personal
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-danger d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>Low
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Download Server Logs</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>25 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Server log is a text document that contains a record of all activity.
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-06.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-success d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Work
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-warning d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>Medium
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Team meet at Starbucks</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>26 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Meeting all teamets at Starbucks for identifying them all.
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-warning d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Social
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-success d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>High
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Create a compost pile</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>27 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Compost pile refers to fruit and vegetable scraps, used tea, coffee
                          grounds etc..
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-warning d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Social
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-danger d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>Low
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Take a hike at a local park</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>28 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Hiking involves a long energetic walk in a natural environment.
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-09.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-info d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Personal
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-info d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>medium
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Research a topic interested</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>28 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Research a topic interested by listen actively and attentively.
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-success d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Work
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-messages"
              role="tabpanel"
              aria-labelledby="v-pills-messages-tab"
            >
              <div className="row">
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-success d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>High
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Backup Files EOD</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>20 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Project files should be took backup before end of the day.
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-05.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-info d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Personal
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-danger d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>Low
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Download Server Logs</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>25 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Server log is a text document that contains a record of all activity.
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-06.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-success d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Work
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-warning d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>Medium
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Team meet at Starbucks</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>26 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Meeting all teamets at Starbucks for identifying them all.
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-07.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-warning d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Social
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-success d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>High
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Create a compost pile</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>27 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Compost pile refers to fruit and vegetable scraps, used tea, coffee
                          grounds etc..
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-warning d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Social
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-danger d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>Low
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Take a hike at a local park</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>28 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Hiking involves a long energetic walk in a natural environment.
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-09.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-info d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Personal
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-info d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>medium
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Research a topic interested</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>28 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Research a topic interested by listen actively and attentively.
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-success d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Work
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-settings"
              role="tabpanel"
              aria-labelledby="v-pills-settings-tab"
            >
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-end">
                  <Link href="#" className="btn btn-danger mb-3">
                    <span>
                      <i className="ti ti-trash f-20 me-2"></i>
                    </span>{' '}
                    Restore all
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-success d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>High
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Create a compost pile</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>27 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Compost pile refers to fruit and vegetable scraps, used tea, coffee
                          grounds etc..
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-08.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-warning d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Social
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-danger d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>Low
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Take a hike at a local park</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>28 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Hiking involves a long energetic walk in a natural environment.
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-09.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-info d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Personal
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card rounded-3 mb-3 flex-fill">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge badge-outline-info d-inline-flex align-items-center">
                          <i className="fas fa-circle fs-6 me-1"></i>medium
                        </span>
                        <div>
                          <Link href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                          <div className="dropdown-menu notes-menu dropdown-menu-end">
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-note-units"
                            >
                              <span>
                                <i data-feather="edit"></i>
                              </span>
                              Edit
                            </Link>
                            <Link href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_modal"
                            >
                              <span>
                                <i data-feather="trash-2"></i>
                              </span>
                              Delete
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <span>
                                <i data-feather="star"></i>
                              </span>
                              Not Important
                            </Link>
                            <Link
                              href="#"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#view-note-units"
                            >
                              <span>
                                <i data-feather="eye"></i>
                              </span>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h6 className="text-truncate mb-1">
                          <Link href="#">Research a topic interested</Link>
                        </h6>
                        <p className="mb-3 d-flex align-items-center text-dark">
                          <i className="ti ti-calendar me-1"></i>28 Jan 2024
                        </p>
                        <p className="text-truncate line-clamb-2 text-wrap">
                          Research a topic interested by listen actively and attentively.
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <Link href="#" className="avatar avatar-md me-2">
                            <img
                              src="/assets/img/profiles/avatar-10.jpg"
                              alt="Profile"
                              className="img-fluid rounded-circle"
                            />
                          </Link>
                          <span className="text-success d-flex align-items-center">
                            <i className="fas fa-square square-rotate fs-10 me-1"></i>Work
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link href="#" className="me-2">
                            <span>
                              <i className="fas fa-star text-warning"></i>
                            </span>
                          </Link>
                          <Link href="#">
                            <span>
                              <i className="ti ti-trash text-danger"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="add_note">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Notes</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Note Title</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Assignee</label>
                      <select className="select">
                        <option>Choose</option>
                        <option>Kathleen</option>
                        <option>Gifford</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Tag</label>
                      <input
                        className="input-tags form-control"
                        placeholder="Add new"
                        type="text"
                        data-role="tagsinput"
                        name="Label"
                        value="Pending,Done"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="todo-calendar">
                      <label className="form-label">Due Date</label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="25 Mar 2025"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-0 summer-description-box">
                      <label className="form-label">Descriptions</label>
                      <div className="quill-editor"></div>
                      <small>Maximum 60 Characters</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="edit-note-units">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Notes</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Note Title</label>
                      <input type="text" className="form-control" value="Team meet at Starbucks" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Assignee</label>
                      <select className="select">
                        <option>Choose</option>
                        <option selected>Kathleen</option>
                        <option>Gifford</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Tag</label>
                      <input
                        className="input-tags form-control"
                        placeholder="Add new"
                        type="text"
                        data-role="tagsinput"
                        name="Label"
                        value="Pending,Done"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <select className="select">
                        <option>Select</option>
                        <option selected>Medium</option>
                        <option>High</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="todo-calendar">
                      <label className="form-label">Due Date</label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="25 Mar 2025"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="select">
                        <option>Select</option>
                        <option selected>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-0 summer-description-box">
                      <label className="form-label">Descriptions</label>
                      <div className="quill-editor mb-2"></div>
                      <small>Maximum 60 Characters</small>
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
              <h6 className="mb-1">Delete Notes</h6>
              <p className="mb-3">Are you sure, you want to delete Notes?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/notes" className="btn btn-primary">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="view-note-units">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header">
                  <div className="d-flex align-items-center">
                    <h4 className="modal-title me-3">Notes</h4>
                    <p className="text-info">Personal</p>
                  </div>
                  <button
                    type="button"
                    className="btn-close btn-close-modal custom-btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="ti ti-x"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-12">
                      <div>
                        <h4 className="mb-2">Meet Lisa to discuss project details</h4>
                        <p>
                          Hiking is a long, vigorous walk, usually on trails or footpaths in the
                          countryside. Walking for pleasure developed in Europe during the
                          eighteenth century. Religious pilgrimages have existed much longer but
                          they involve walking long distances for a spiritual purpose associated
                          with specific religions and also we achieve inner peace while we hike at a
                          local park.
                        </p>
                        <p className="badge badge-outline-danger d-inline-flex align-items-center mb-0">
                          <i className="fas fa-circle fs-6 me-1"></i> High
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Link href="#" className="btn btn-danger" data-bs-dismiss="modal">
                    Close
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

export default Notes;
