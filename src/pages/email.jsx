import React from 'react';
import { Link } from 'react-router-dom';

const Email = () => {
  return (
    <>
      <div className="d-md-flex">
        <div className="email-sidebar border border-end-0 bg-white w-100" data-simplebar="">
          <div className="p-3">
            <div className="border bg-white rounded p-2 mb-3">
              <div className="d-flex align-items-center">
                <Link href="#" className="avatar avatar-md flex-shrink-0 me-2">
                  <img
                    src="/assets/img/profiles/avatar-02.jpg"
                    className="rounded-circle"
                    alt="Img"
                  />
                </Link>
                <div>
                  <h6 className="mb-1 fs-16 fw-medium">
                    <Link href="#">James Hong</Link>
                  </h6>
                  <p className="fs-14 mb-0"></p>
                </div>
              </div>
            </div>
            <Link href="#" className="btn btn-primary w-100" id="compose_mail">
              <i className="ti ti-edit me-2"></i>Compose
            </Link>
            <div className="mt-4">
              <h5 className="mb-2">Emails</h5>
              <div className="d-block mb-3 pb-3 border-bottom">
                <Link to="/email"
                  className="d-flex bg-light align-items-center justify-content-between p-2 rounded active"
                >
                  <span className="d-flex align-items-center fw-medium">
                    <i className="ti ti-inbox text-gray me-2"></i>Inbox
                  </span>
                  <span className="badge bg-danger bg-danger rounded-pill badge-xs">56</span>
                </Link>
                <Link href="#"
                  className="d-flex align-items-center justify-content-between p-2 rounded"
                >
                  <span className="d-flex align-items-center fw-medium">
                    <i className="ti ti-star text-gray me-2"></i>Starred
                  </span>
                  <span className="fw-semibold fs-12 rounded-pill">46</span>
                </Link>
                <Link href="#"
                  className="d-flex align-items-center justify-content-between p-2 rounded"
                >
                  <span className="d-flex align-items-center fw-medium">
                    <i className="ti ti-rocket text-gray me-2"></i>Sent
                  </span>
                  <span className="rounded-pill">14</span>
                </Link>
                <Link href="#"
                  className="d-flex align-items-center justify-content-between p-2 rounded"
                >
                  <span className="d-flex align-items-center fw-medium">
                    <i className="ti ti-file text-gray me-2"></i>Drafts
                  </span>
                  <span className="rounded-pill">12</span>
                </Link>
                <Link href="#"
                  className="d-flex align-items-center justify-content-between p-2 rounded"
                >
                  <span className="d-flex align-items-center fw-medium">
                    <i className="ti ti-trash text-gray me-2"></i>Deleted
                  </span>
                  <span className="rounded-pill">08</span>
                </Link>
                <Link href="#"
                  className="d-flex align-items-center justify-content-between p-2 rounded"
                >
                  <span className="d-flex align-items-center fw-medium">
                    <i className="ti ti-info-octagon text-gray me-2"></i>Spam
                  </span>
                  <span className="rounded-pill">0</span>
                </Link>
                <div>
                  <div className="more-menu">
                    <Link href="#"
                      className="d-flex align-items-center justify-content-between p-2 rounded"
                    >
                      <span className="d-flex align-items-center fw-medium">
                        <i className="ti ti-location-up text-gray me-2"></i>Important
                      </span>
                      <span className="rounded-pill">12</span>
                    </Link>
                    <Link href="#"
                      className="d-flex align-items-center justify-content-between p-2 rounded"
                    >
                      <span className="d-flex align-items-center fw-medium">
                        <i className="ti ti-transition-top text-gray me-2"></i>All Emails
                      </span>
                      <span className="rounded-pill">34</span>
                    </Link>
                  </div>
                  <div className="view-all mt-2">
                    <Link href="#" className="viewall-button text-muted">
                      <span>Show More</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-bottom mb-3 pb-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="mb-0">Labels</h5>
                <Link href="#">
                  <i className="ti ti-square-rounded-plus-filled text-primary fs-16"></i>
                </Link>
              </div>
              <div>
                <Link href="#" className="fw-medium d-flex align-items-center text-dark py-1">
                  <i className="ti ti-square-rounded text-success me-2"></i> Team Events
                </Link>
                <Link href="#" className="fw-medium d-flex align-items-center text-dark py-1">
                  <i className="ti ti-square-rounded text-warning me-2"></i> Work
                </Link>
                <Link href="#" className="fw-medium d-flex align-items-center text-dark py-1">
                  <i className="ti ti-square-rounded text-danger me-2"></i> External
                </Link>
                <Link href="#" className="fw-medium d-flex align-items-center text-dark py-1">
                  <i className="ti ti-square-rounded text-skyblue me-2"></i> Projects
                </Link>
                <div>
                  <div className="more-menu-2">
                    <Link href="#" className="fw-medium d-flex align-items-center text-dark py-1">
                      <i className="ti ti-square-rounded text-purple me-2"></i> Applications
                    </Link>
                    <Link href="#" className="fw-medium d-flex align-items-center text-dark py-1">
                      <i className="ti ti-square-rounded text-info me-2"></i> Desgin
                    </Link>
                  </div>
                  <div className="view-all mt-2">
                    <Link href="#" className="viewall-button-2 text-muted">
                      <span>Show More</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="mb-0">Folders</h5>
                <Link href="#">
                  <i className="ti ti-square-rounded-plus-filled text-primary fs-16"></i>
                </Link>
              </div>
              <div>
                <Link href="#" className="fw-medium d-flex align-items-center text-dark py-1">
                  <i className="ti ti-folder-filled text-danger me-2"></i> Projects
                </Link>
                <Link href="#" className="fw-medium d-flex align-items-center text-dark py-1">
                  <i className="ti ti-folder-filled text-warning me-2"></i> Personal
                </Link>
                <Link href="#" className="fw-medium d-flex align-items-center text-dark py-1">
                  <i className="ti ti-folder-filled text-success me-2"></i> Finance
                </Link>
                <div>
                  <div className="more-menu-3">
                    <Link href="#" className="fw-medium d-flex align-items-center text-dark py-1">
                      <i className="ti ti-folder-filled text-info me-2"></i> Projects
                    </Link>
                    <Link href="#" className="fw-medium d-flex align-items-center text-dark py-1">
                      <i className="ti ti-folder-filled text-primary me-2"></i> Personal
                    </Link>
                  </div>
                  <div className="view-all mt-2">
                    <Link href="#" className="viewall-button-3 text-muted">
                      <span>Show More</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white flex-fill border mail-notifications" data-simplebar="">
          <div className="active">
            <div>
              <div className="p-3 border-bottom">
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <div>
                    <h5 className="mb-1">Inbox</h5>
                    <div className="d-flex align-items-center">
                      <span>2345 Emails</span>
                      <i className="ti ti-point-filled text-primary mx-1"></i>
                      <span>56 Unread</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="input-group input-group-sm input-group-flat me-2">
                      <span className="input-group-text">
                        <i className="ti ti-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        autocomplete="off"
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="btn btn-icon btn-sm rounded-circle">
                        <i className="ti ti-filter-edit"></i>
                      </Link>
                      <Link href="#" className="btn btn-icon btn-sm rounded-circle">
                        <i className="ti ti-settings"></i>
                      </Link>
                      <Link href="#" className="btn btn-icon btn-sm rounded-circle">
                        <i className="ti ti-refresh"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="list-group list-group-flush mails-list">
                <div className="list-group-item p-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                    <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                      <Link to="/email-reply" className="avatar bg-primary avatar-rounded me-2">
                        <span className="avatar-title">CD</span>
                      </Link>
                      <div className="flex-fill">
                        <div className="d-flex align-items-start justify-content-between">
                          <div>
                            <h6 className="fs-16 mb-1">
                              <Link to="/email-reply">Justin Lapoint</Link>
                            </h6>
                            <span className="fw-semibold">Client Dashboard</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="dropdown">
                              <button
                                className="btn btn-icon btn-sm rounded-circle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <Link className="dropdown-item rounded-1" href="/email-reply">
                                    Open Email
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply All
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward As Attachment
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mark As Unread
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move to Junk
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mute
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Delete
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Archive
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move To
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="d-inline-flex align-items-center">
                              <i className="ti ti-point-filled text-success"></i>3:13 PM
                            </span>
                          </div>
                        </div>
                        <p className="mb-0">It seems that recipients are receiving...</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="d-flex align-items-center btn btn-sm bg-soft-dark me-2">
                        <i className="ti ti-folder-open me-2"></i>3
                      </span>
                      <span className="d-flex align-items-center btn btn-sm bg-soft-dark">
                        <i className="ti ti-photo me-2"></i>+24
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span>
                        <i className="ti ti-star-filled text-warning"></i>
                      </span>
                      <span className="badge badge-soft-info mx-2 d-inline-flex align-items-center p-1">
                        <i className="ti ti-square me-1"></i>Projects
                      </span>
                      <Link href="#" className="badge bg-dark rounded-pill p-1">
                        +1
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="list-group-item p-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                    <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                      <Link to="/email-reply" className="avatar avatar-md avatar-rounded me-2">
                        <img src="/assets/img/profiles/avatar-01.jpg" alt="Img" />
                      </Link>
                      <div className="flex-fill">
                        <div className="d-flex align-items-start justify-content-between">
                          <div>
                            <h6 className="fs-16 mb-1">
                              <Link to="/email-reply">Rufana Joe</Link>
                            </h6>
                            <span className="fw-semibold">UI project</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="dropdown">
                              <button
                                className="btn btn-icon btn-sm rounded-circle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <Link className="dropdown-item rounded-1" href="/email-reply">
                                    Open Email
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply All
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward As Attachment
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mark As Unread
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move to Junk
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mute
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Delete
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Archive
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move To
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="d-inline-flex align-items-center">
                              <i className="ti ti-point-filled text-danger"></i>3:13 PM
                            </span>
                          </div>
                        </div>
                        <p className="mb-0">Regardless, you can usually expect an increase</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <Link href="#">
                      <img src="/assets/img/icons/google-meet.svg" alt="Img" />
                    </Link>
                    <div className="d-flex align-items-center">
                      <span>
                        <i className="ti ti-star-filled text-warning"></i>
                      </span>
                      <span className="badge badge-soft-primary  d-inline-flex align-items-center p-1 mx-2">
                        <i className="ti ti-square me-1"></i>Applications
                      </span>
                      <Link href="#" className="badge bg-dark rounded-pill p-1">
                        +1
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="list-group-item p-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                    <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                      <Link to="/email-reply" className="avatar avatar-md avatar-rounded me-2">
                        <img src="/assets/img/profiles/avatar-03.jpg" alt="Img" />
                      </Link>
                      <div className="flex-fill">
                        <div className="d-flex align-items-start justify-content-between">
                          <div>
                            <h6 className="fs-16 mb-1">
                              <Link to="/email-reply">Cameron Drake</Link>
                            </h6>
                            <span className="fw-semibold">You’re missing</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="dropdown">
                              <button
                                className="btn btn-icon btn-sm rounded-circle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <Link className="dropdown-item rounded-1" href="/email-reply">
                                    Open Email
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply All
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward As Attachment
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mark As Unread
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move to Junk
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mute
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Delete
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Archive
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move To
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="d-inline-flex align-items-center">
                              <i className="ti ti-point-filled text-danger"></i>3:13 PM
                            </span>
                          </div>
                        </div>
                        <p className="mb-0">Here are a few catchy email subject line examples </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="d-flex align-items-center btn btn-sm bg-soft-dark fs-14">
                        <i className="ti ti-video me-2"></i>1
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span>
                        <i className="ti ti-star-filled text-warning"></i>
                      </span>
                      <span className="badge badge-soft-danger d-inline-flex align-items-center p-1  mx-2">
                        <i className="ti ti-square me-1"></i>External
                      </span>
                      <Link href="#" className="badge bg-dark rounded-pill p-1">
                        +1
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="list-group-item p-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                    <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                      <Link to="/email-reply" className="avatar avatar-md avatar-rounded me-2">
                        <img src="/assets/img/profiles/avatar-04.jpg" alt="Img" />
                      </Link>
                      <div className="flex-fill">
                        <div className="d-flex align-items-start justify-content-between">
                          <div>
                            <h6 className="fs-16 mb-1">
                              <Link to="/email-reply">Sean Hill</Link>
                            </h6>
                            <span className="fw-semibold">How Have You Progressed</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="dropdown">
                              <button
                                className="btn btn-icon btn-sm rounded-circle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <Link className="dropdown-item rounded-1" href="/email-reply">
                                    Open Email
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply All
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward As Attachment
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mark As Unread
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move to Junk
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mute
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Delete
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Archive
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move To
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="d-inline-flex align-items-center">
                              <i className="ti ti-point-filled text-danger"></i>3:13 PM
                            </span>
                          </div>
                        </div>
                        <p className="mb-0">You can write effective retargeting subject</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="d-flex align-items-center btn btn-sm bg-soft-dark">
                        <i className="ti ti-photo me-2"></i>1
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="badge badge-soft-success d-inline-flex align-items-center p-1">
                        <i className="ti ti-square me-1"></i>Team Events
                      </span>
                    </div>
                  </div>
                </div>
                <div className="list-group-item p-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                    <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                      <Link to="/email-reply" className="avatar avatar-md avatar-rounded me-2">
                        <img src="/assets/img/profiles/avatar-05.jpg" alt="Img" />
                      </Link>
                      <div className="flex-fill">
                        <div className="d-flex align-items-start justify-content-between">
                          <div>
                            <h6 className="fs-16 mb-1">
                              <Link to="/email-reply">Kevin Alley</Link>
                            </h6>
                            <span className="fw-semibold">Flash. Sale. Alert.</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="dropdown">
                              <button
                                className="btn btn-icon btn-sm rounded-circle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <Link className="dropdown-item rounded-1" href="/email-reply">
                                    Open Email
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply All
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward As Attachment
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mark As Unread
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move to Junk
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mute
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Delete
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Archive
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move To
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="d-inline-flex align-items-center">
                              <i className="ti ti-point-filled text-danger"></i>3:13 PM
                            </span>
                          </div>
                        </div>
                        <p className="mb-0">You can also use casual language,</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="d-flex align-items-center btn btn-sm bg-soft-dark">
                        <i className="ti ti-link me-2"></i>1
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="badge badge-soft-danger me-2 d-inline-flex align-items-center p-1">
                        <i className="ti ti-square me-1"></i>External
                      </span>
                      <Link href="#" className="badge bg-dark rounded-pill p-1">
                        +1
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="list-group-item p-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                    <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                      <Link to="/email-reply" className="avatar avatar-md avatar-rounded me-2">
                        <img src="/assets/img/profiles/avatar-08.jpg" alt="Img" />
                      </Link>
                      <div className="flex-fill">
                        <div className="d-flex align-items-start justify-content-between">
                          <div>
                            <h6 className="fs-16 mb-1">
                              <Link to="/email-reply">Linda Zimmer</Link>
                            </h6>
                            <span className="fw-semibold">Products the celebs are</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="dropdown">
                              <button
                                className="btn btn-icon btn-sm rounded-circle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <Link className="dropdown-item rounded-1" href="/email-reply">
                                    Open Email
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply All
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward As Attachment
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mark As Unread
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move to Junk
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mute
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Delete
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Archive
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move To
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="d-inline-flex align-items-center">
                              <i className="ti ti-point-filled text-danger"></i>3:13 PM
                            </span>
                          </div>
                        </div>
                        <p className="mb-0">It seems that recipients are receiving...</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="d-flex align-items-center btn btn-sm bg-soft-dark">
                        <i className="ti ti-link me-2"></i>1
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="badge badge-soft-warning me-2 d-inline-flex align-items-center p-1">
                        <i className="ti ti-square me-1"></i>Work
                      </span>
                      <Link href="#" className="badge bg-dark rounded-pill p-1">
                        +1
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="list-group-item p-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                    <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                      <Link to="/email-reply" className="avatar bg-success avatar-rounded me-2">
                        <span className="avatar-title">ER</span>
                      </Link>
                      <div className="flex-fill">
                        <div className="d-flex align-items-start justify-content-between">
                          <div>
                            <h6 className="fs-16 mb-1">
                              <Link to="/email-reply">Emly Reachel</Link>
                            </h6>
                            <span className="fw-semibold">No Subject</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="dropdown">
                              <button
                                className="btn btn-icon btn-sm rounded-circle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <Link className="dropdown-item rounded-1" href="/email-reply">
                                    Open Email
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply All
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward As Attachment
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mark As Unread
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move to Junk
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mute
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Delete
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Archive
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move To
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="d-inline-flex align-items-center">
                              <i className="ti ti-point-filled text-danger"></i>3:13 PM
                            </span>
                          </div>
                        </div>
                        <p className="mb-0">Announcing Fake Name Generator Premium</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="d-flex align-items-center btn btn-sm bg-soft-dark">
                        <i className="ti ti-folder-open me-2"></i>3
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="badge badge-soft-info d-inline-flex align-items-center p-1">
                        <i className="ti ti-square me-1"></i>Projects
                      </span>
                    </div>
                  </div>
                </div>
                <div className="list-group-item p-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                    <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                      <Link to="/email-reply" className="avatar avatar-md avatar-rounded me-2">
                        <img src="/assets/img/profiles/avatar-07.jpg" alt="Img" />
                      </Link>
                      <div className="flex-fill">
                        <div className="d-flex align-items-start justify-content-between">
                          <div>
                            <h6 className="fs-16 mb-1">
                              <Link to="/email-reply">Sean Hill</Link>
                            </h6>
                            <span className="fw-semibold">You’re missing</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="dropdown">
                              <button
                                className="btn btn-icon btn-sm rounded-circle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ti ti-dots"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <Link className="dropdown-item rounded-1" href="/email-reply">
                                    Open Email
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Reply All
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Forward As Attachment
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mark As Unread
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move to Junk
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Mute
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Delete
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Archive
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item rounded-1" href="#">
                                    Move To
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <span className="d-inline-flex align-items-center">
                              <i className="ti ti-point-filled text-danger"></i>3:13 PM
                            </span>
                          </div>
                        </div>
                        <p className="mb-0">Regardless, you can usually expect an increase</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="d-flex align-items-center btn btn-sm bg-soft-dark me-2">
                        <i className="ti ti-folder-open me-2"></i>3
                      </span>
                      <span className="d-flex align-items-center btn btn-sm bg-soft-dark">
                        <i className="ti ti-photo me-2"></i>+24
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span>
                        <i className="ti ti-star-filled text-warning"></i>
                      </span>
                      <span className="badge badge-soft-info mx-2 d-inline-flex align-items-center p-1">
                        <i className="ti ti-square me-1"></i>Applications
                      </span>
                      <Link href="#" className="badge bg-dark rounded-pill p-1">
                        +1
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Email;
