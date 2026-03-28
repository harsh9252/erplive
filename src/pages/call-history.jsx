import React from 'react';
import { Link } from 'react-router-dom';

const CallHistory = () => {
  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3">
          <h5>Call History List</h5>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-2 table-header">
            <div id="reportrange" className="reportrange-picker d-flex align-items-center me-2">
              <i className="isax isax-calendar text-gray-5 fs-14 me-1"></i>
              <span className="reportrange-picker-field">20 Apr 25 - 20 Apr 25</span>
            </div>
            <div className="dropdown">
              <Link href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                Sort By : Last 7 Days
              </Link>
              <ul className="dropdown-menu  dropdown-menu-end p-3">
                <li>
                  <Link href="#" className="dropdown-item rounded-1">
                    Recently Added
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item rounded-1">
                    Ascending
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item rounded-1">
                    Desending
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item rounded-1">
                    Last Month
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item rounded-1">
                    Last 7 Days
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="table-responsive border rounded">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th className="no-sort">
                  <div className="form-check form-check-md">
                    <input className="form-check-input" type="checkbox" id="select-all" />
                  </div>
                </th>
                <th className="fw-medium fs-14">Name</th>
                <th className="fw-medium fs-14">Phone</th>
                <th className="fw-medium fs-14">Call Type</th>
                <th className="fw-medium fs-14">Duration</th>
                <th className="fw-medium fs-14">Date & Time</th>
                <th></th>
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
                    <Link
                      href="#"
                      className="avatar avatar-md"
                      data-bs-toggle="modal"
                      data-bs-target="#view_details"
                    >
                      <img
                        src="/assets/img/users/user-01.jpg"
                        className="img-fluid rounded-circle"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2">
                      <p className="text-dark fw-medium mb-0">
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#view_details">
                          Anthony Lewis
                        </Link>
                      </p>
                      <span className="fs-12"></span>
                    </div>
                  </div>
                </td>
                <td>(123) 4567 890</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <i className="ti ti-phone-incoming text-success me-2"></i>Incoming
                  </div>
                </td>
                <td>00.25</td>
                <td>14 Jan 2024, 04:27 AM </td>
                <td>
                  <div className="action-icon d-inline-flex align-items-center">
                    <Link
                      href="#"
                      className="me-2 p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#call_history"
                    >
                      <i className="ti ti-eye"></i>
                    </Link>
                    <Link href="#"
                      className="p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="ti ti-trash"></i>
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
                  <div className="d-flex align-items-center">
                    <Link href="#"
                      className="avatar avatar-md"
                      data-bs-toggle="modal"
                      data-bs-target="#view_details"
                    >
                      <img
                        src="/assets/img/users/user-09.jpg"
                        className="img-fluid rounded-circle"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2">
                      <p className="text-dark fw-medium mb-0">
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#view_details">
                          Brian Villalobos
                        </Link>
                      </p>
                      <span className="fs-12"></span>
                    </div>
                  </div>
                </td>
                <td>(179) 7382 829</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <i className="ti ti-phone-outgoing text-success me-2"></i>Outgoing
                  </div>
                </td>
                <td>00.10</td>
                <td>21 Jan 2024, 03:19 AM</td>
                <td>
                  <div className="action-icon d-inline-flex align-items-center">
                    <Link
                      href="#"
                      className="me-2 p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#call_history"
                    >
                      <i className="ti ti-eye"></i>
                    </Link>
                    <Link href="#"
                      className="p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="ti ti-trash"></i>
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
                  <div className="d-flex align-items-center">
                    <Link href="#"
                      className="avatar avatar-md"
                      data-bs-toggle="modal"
                      data-bs-target="#view_details"
                    >
                      <img
                        src="/assets/img/users/user-02.jpg"
                        className="img-fluid rounded-circle"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2">
                      <p className="text-dark fw-medium mb-0">
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#view_details">
                          Harvey Smith
                        </Link>
                      </p>
                      <span className="fs-12"></span>
                    </div>
                  </div>
                </td>
                <td>(184) 2719 738</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <i className="ti ti-video text-success me-2"></i>Incoming
                  </div>
                </td>
                <td>00.40</td>
                <td>20 Feb 2024, 12:15 PM</td>
                <td>
                  <div className="action-icon d-inline-flex align-items-center">
                    <Link
                      href="#"
                      className="me-2 p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#call_history"
                    >
                      <i className="ti ti-eye"></i>
                    </Link>
                    <Link href="#"
                      className="p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="ti ti-trash"></i>
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
                  <div className="d-flex align-items-center">
                    <Link href="#"
                      className="avatar avatar-md"
                      data-bs-toggle="modal"
                      data-bs-target="#view_details"
                    >
                      <img
                        src="/assets/img/users/user-03.jpg"
                        className="img-fluid rounded-circle"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2">
                      <p className="text-dark fw-medium mb-0">
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#view_details">
                          <span
                            className="__cf_email__"
                            data-cfemail="ea9a8f988b86aa8f928b879a868fc4898587"
                          >
                            [email&#160;protected]
                          </span>
                        </Link>
                      </p>
                      <span className="fs-12"></span>
                    </div>
                  </div>
                </td>
                <td>(193) 7839 748</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <i className="ti ti-phone-x text-danger me-2"></i>Missed Call
                  </div>
                </td>
                <td>00.00</td>
                <td>15 Mar 2024, 12:11 AM</td>
                <td>
                  <div className="action-icon d-inline-flex align-items-center">
                    <Link
                      href="#"
                      className="me-2 p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#call_history"
                    >
                      <i className="ti ti-eye"></i>
                    </Link>
                    <Link href="#"
                      className="p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="ti ti-trash"></i>
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
                  <div className="d-flex align-items-center">
                    <Link href="#"
                      className="avatar avatar-md"
                      data-bs-toggle="modal"
                      data-bs-target="#view_details"
                    >
                      <img
                        src="/assets/img/users/user-10.jpg"
                        className="img-fluid rounded-circle"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2">
                      <p className="text-dark fw-medium mb-0">
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#view_details">
                          Doglas Martini
                        </Link>
                      </p>
                      <span className="fs-12"></span>
                    </div>
                  </div>
                </td>
                <td>(183) 9302 890</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <i className="ti ti-video text-success me-2"></i>Outgoing
                  </div>
                </td>
                <td>00.35</td>
                <td>12 Apr 2024, 05:48 PM</td>
                <td>
                  <div className="action-icon d-inline-flex align-items-center">
                    <Link
                      href="#"
                      className="me-2 p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#call_history"
                    >
                      <i className="ti ti-eye"></i>
                    </Link>
                    <Link href="#"
                      className="p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="ti ti-trash"></i>
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
                  <div className="d-flex align-items-center">
                    <Link href="#"
                      className="avatar avatar-md"
                      data-bs-toggle="modal"
                      data-bs-target="#view_details"
                    >
                      <img
                        src="/assets/img/users/user-04.jpg"
                        className="img-fluid rounded-circle"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2">
                      <p className="text-dark fw-medium mb-0">
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#view_details">
                          Linda Ray
                        </Link>
                      </p>
                      <span className="fs-12"></span>
                    </div>
                  </div>
                </td>
                <td>(120) 3728 039</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <i className="ti ti-phone-incoming text-success me-2"></i>Incomiing
                  </div>
                </td>
                <td>01.40</td>
                <td>20 Apr 2024, 06:11 PM</td>
                <td>
                  <div className="action-icon d-inline-flex align-items-center">
                    <Link
                      href="#"
                      className="me-2 p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#call_history"
                    >
                      <i className="ti ti-eye"></i>
                    </Link>
                    <Link href="#"
                      className="p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="ti ti-trash"></i>
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
                  <div className="d-flex align-items-center">
                    <Link href="#"
                      className="avatar avatar-md"
                      data-bs-toggle="modal"
                      data-bs-target="#view_details"
                    >
                      <img
                        src="/assets/img/users/user-05.jpg"
                        className="img-fluid rounded-circle"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2">
                      <p className="text-dark fw-medium mb-0">
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#view_details">
                          Elliot Murray
                        </Link>
                      </p>
                      <span className="fs-12"></span>
                    </div>
                  </div>
                </td>
                <td>(102) 8480 832</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <i className="ti ti-video text-danger me-2"></i>Missed call
                  </div>
                </td>
                <td>00.00</td>
                <td>06 Jul 2024, 07:15 PM</td>
                <td>
                  <div className="action-icon d-inline-flex align-items-center">
                    <Link
                      href="#"
                      className="me-2 p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#call_history"
                    >
                      <i className="ti ti-eye"></i>
                    </Link>
                    <Link href="#"
                      className="p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="ti ti-trash"></i>
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
                  <div className="d-flex align-items-center">
                    <Link href="#"
                      className="avatar avatar-md"
                      data-bs-toggle="modal"
                      data-bs-target="#view_details"
                    >
                      <img
                        src="/assets/img/users/user-06.jpg"
                        className="img-fluid rounded-circle"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2">
                      <p className="text-dark fw-medium mb-0">
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#view_details">
                          Rebecca Smtih
                        </Link>
                      </p>
                      <span className="fs-12"></span>
                    </div>
                  </div>
                </td>
                <td>(162) 8920 713</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <i className="ti ti-phone-outgoing text-success me-2"></i>Outgoing
                  </div>
                </td>
                <td>00.45</td>
                <td>02 Sep 2024, 09:21 PM</td>
                <td>
                  <div className="action-icon d-inline-flex align-items-center">
                    <Link
                      href="#"
                      className="me-2 p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#call_history"
                    >
                      <i className="ti ti-eye"></i>
                    </Link>
                    <Link href="#"
                      className="p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="ti ti-trash"></i>
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
                  <div className="d-flex align-items-center">
                    <Link href="#"
                      className="avatar avatar-md"
                      data-bs-toggle="modal"
                      data-bs-target="#view_details"
                    >
                      <img
                        src="/assets/img/users/user-07.jpg"
                        className="img-fluid rounded-circle"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2">
                      <p className="text-dark fw-medium mb-0">
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#view_details">
                          Connie Waters
                        </Link>
                      </p>
                      <span className="fs-12"></span>
                    </div>
                  </div>
                </td>
                <td>(189) 0920 723</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <i className="ti ti-phone-incoming text-success me-2"></i>Incoming
                  </div>
                </td>
                <td>00.50</td>
                <td>15 Nov 2024, 12:44 PM</td>
                <td>
                  <div className="action-icon d-inline-flex align-items-center">
                    <Link
                      href="#"
                      className="me-2 p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#call_history"
                    >
                      <i className="ti ti-eye"></i>
                    </Link>
                    <Link href="#"
                      className="p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="ti ti-trash"></i>
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
                  <div className="d-flex align-items-center">
                    <Link href="#"
                      className="avatar avatar-md"
                      data-bs-toggle="modal"
                      data-bs-target="#view_details"
                    >
                      <img
                        src="/assets/img/users/user-08.jpg"
                        className="img-fluid rounded-circle"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2">
                      <p className="text-dark fw-medium mb-0">
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#view_details">
                          Lori Broaddus
                        </Link>
                      </p>
                      <span className="fs-12"></span>
                    </div>
                  </div>
                </td>
                <td>(168) 8392 823</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <i className="ti ti-phone-x text-danger me-2"></i>Missed call
                  </div>
                </td>
                <td>00.00</td>
                <td>10 Dec 2024, 11:23 PM</td>
                <td>
                  <div className="action-icon d-inline-flex align-items-center">
                    <Link
                      href="#"
                      className="me-2 p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#call_history"
                    >
                      <i className="ti ti-eye"></i>
                    </Link>
                    <Link href="#"
                      className="p-1 rounded-circle d-flex"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="ti ti-trash"></i>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal fade" id="call_history">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex align-items-center">
                <h4 className="modal-title">Caller Details</h4>
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
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body">
                <div className="card bg-light-500 shadow-none">
                  <div className="card-body">
                    <div className="text-center">
                      <div className="avatar avatar-xxxl mb-3">
                        <img
                          src="/assets/img/users/user-01.jpg"
                          alt="img"
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link to="/video-call"
                        className="btn btn-light call-item p-0 d-flex align-items-center justify-content-center me-3"
                      >
                        <i className="ti ti-video fs-13"></i>
                      </Link>
                      <Link to="/chat"
                        className="btn btn-light call-item p-0 d-flex align-items-center justify-content-center me-3"
                      >
                        <i className="ti ti-message fs-13"></i>
                      </Link>
                      <Link to="/voice-call"
                        className="btn btn-light call-item p-0 d-flex align-items-center justify-content-center"
                      >
                        <i className="ti ti-phone fs-13"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div>
                      <p className="mb-1 fs-13">Name</p>
                      <h6 className="fw-medium fs-14">Anthony Lewis</h6>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <p className="mb-1 fs-13">Total Calls</p>
                      <h6 className="fw-medium fs-14">20</h6>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <p className="mb-1 fs-13">Phone</p>
                      <h6 className="fw-medium fs-14">(123) 4567 890</h6>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <p className="mb-1 fs-13">Average Call Timing</p>
                      <h6 className="fw-medium fs-14">00:30</h6>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <p className="mb-1 fs-13">Email</p>
                      <h6 className="fw-medium fs-14"></h6>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <p className="mb-1 fs-13">Average Waiting Time</p>
                      <h6 className="fw-medium fs-14">00:05</h6>
                    </div>
                  </div>
                </div>
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
              <h6 className="mb-1">Delete Call History</h6>
              <p className="mb-3">Are you sure, you want to delete call history?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/call-history" className="btn btn-primary">
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

export default CallHistory;
