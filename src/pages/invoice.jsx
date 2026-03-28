import React from 'react';
import { Link } from 'react-router-dom';

const Invoice = () => {
  return (
    <>
      <div className="mb-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h5 className="mb-1 fw-bold">Invoices</h5>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap table-header">
          <div className="me-2 mb-2">
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
          <div className="mb-2">
            <Link to="/add-invoice" className="btn btn-md btn-primary d-flex align-items-center">
              <i className="ti ti-circle-plus me-2"></i>Add Invoices
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-3 col-sm-6">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="d-flex align-items-center overflow-hidden mb-2">
                <div>
                  <p className="mb-1 text-truncate">Total Invoice</p>
                  <h6>$3,237.94</h6>
                </div>
              </div>
              <div className="attendance-report-bar mb-2">
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Success example"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ height: '5px;' }}
                >
                  <div className="progress-bar bg-pink" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <p className="d-flex align-items-center text-truncate">
                  <span className="text-success fs-12 d-flex align-items-center me-1">
                    <i className="ti ti-arrow-wave-right-up me-1"></i>+32.40%
                  </span>
                  from last month
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="d-flex align-items-center overflow-hidden mb-2">
                <div>
                  <p className="mb-1 text-truncate">Outstanding</p>
                  <h6>$3,237.94</h6>
                </div>
              </div>
              <div className="attendance-report-bar mb-2">
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Success example"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ height: '5px;' }}
                >
                  <div className="progress-bar bg-purple" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <p className="d-flex align-items-center text-truncate">
                  <span className="text-danger fs-12 d-flex align-items-center me-1">
                    <i className="ti ti-arrow-wave-right-up me-1"></i>-4.40%
                  </span>
                  from last month
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="d-flex align-items-center overflow-hidden mb-2">
                <div>
                  <p className="mb-1 text-truncate">Draft</p>
                  <h6>$3,237.94</h6>
                </div>
              </div>
              <div className="attendance-report-bar mb-2">
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Success example"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ height: '5px;' }}
                >
                  <div className="progress-bar bg-warning" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <p className="d-flex align-items-center text-truncate">
                  <span className="text-success fs-12 d-flex align-items-center me-1">
                    <i className="ti ti-arrow-wave-right-up me-1"></i>12%
                  </span>
                  from last month
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card flex-fill">
            <div className="card-body">
              <div className="d-flex align-items-center overflow-hidden mb-2">
                <div>
                  <p className="mb-1 text-truncate">Total Overdue</p>
                  <h6>$3,237.94</h6>
                </div>
              </div>
              <div className="attendance-report-bar mb-2">
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Success example"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ height: '5px;' }}
                >
                  <div className="progress-bar bg-danger" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <p className="d-flex align-items-center text-truncate">
                  <span className="text-danger fs-12 d-flex align-items-center me-1">
                    <i className="ti ti-arrow-wave-right-up me-1"></i>-15.40%
                  </span>
                  from last month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div>
            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3">
              <h5 className="d-flex align-items-center">
                Invoices<span className="badge bg-light ms-2 text-dark fs-12">2000 Invoices</span>
              </h5>
              <div className="d-flex align-items-center flex-wrap row-gap-3 table-header">
                <div className="input-icon position-relative me-2">
                  <input
                    type="text"
                    className="form-control datetimepicker py-1 h-auto"
                    placeholder="Due Date"
                  />
                  <span className="input-icon-addon">
                    <i className="ti ti-calendar"></i>
                  </span>
                </div>
                <div className="dropdown me-2">
                  <Link href="#"
                    className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Select Status
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Paid
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Overdue
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Pending
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Draft
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <Link href="#"
                    className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center fw-medium"
                    data-bs-toggle="dropdown"
                  >
                    <span className="d-inline-flex me-1">Sort By : </span> Last 7 Days
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Last 7 Days
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Created Date
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
            <div className="card-body p-0">
              <div className="table-responsive table-nowrap">
                <table className="table mb-0 border">
                  <thead className="table-light">
                    <tr>
                      <th className="no-sort">
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" id="select-all" />
                        </div>
                      </th>
                      <th className="fw-medium fs-14">Invoice</th>
                      <th className="fw-medium fs-14">Name</th>
                      <th className="fw-medium fs-14">Created On</th>
                      <th className="fw-medium fs-14">Total</th>
                      <th className="fw-medium fs-14">Amount Due</th>
                      <th className="fw-medium fs-14">Due Date</th>
                      <th className="fw-medium fs-14">Status</th>
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
                        <Link to="/invoice-details" className="tb-data">
                          INV-1454
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/invoice-details" className="avatar avatar-lg me-2">
                            <img
                              src="/assets/img/users/user-01.jpg"
                              className="rounded-circle"
                              alt="user"
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium fs-14">
                              <Link to="/invoice-details">Anthony Lewis</Link>
                            </h6>
                            <span className="fs-12"></span>
                          </div>
                        </div>
                      </td>
                      <td>14 Jan 2024, 04:27 AM </td>
                      <td>$300</td>
                      <td>$0</td>
                      <td>14 Jan 2024, 04:27 AM</td>
                      <td>
                        <span className="badge badge-soft-success d-inline-flex align-items-center">
                          <i className="ti ti-point-filled me-1"></i>Paid
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <Link to="/invoice-details" className="me-2">
                            <i className="ti ti-eye"></i>
                          </Link>
                          <Link to="/edit-invoice" className="me-2">
                            <i className="ti ti-edit"></i>
                          </Link>
                          <Link
                            href="#delete_modal"
                            className=""
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
                        <Link to="/invoice-details" className="tb-data">
                          INV-6571
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/invoice-details" className="avatar avatar-lg me-2">
                            <img
                              src="/assets/img/users/user-09.jpg"
                              className="rounded-circle"
                              alt="user"
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium fs-14">
                              <Link to="/invoice-details">Brian Villalobos</Link>
                            </h6>
                            <span className="fs-12"></span>
                          </div>
                        </div>
                      </td>
                      <td>21 Jan 2024, 03:19 AM</td>
                      <td>$547</td>
                      <td>$200</td>
                      <td>21 Jan 2024, 03:19 AM</td>
                      <td>
                        <span className="badge badge-soft-danger d-inline-flex align-items-center">
                          <i className="ti ti-point-filled me-1"></i>Overdue
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <Link to="/invoice-details" className="me-2">
                            <i className="ti ti-eye"></i>
                          </Link>
                          <Link to="/edit-invoice" className="me-2">
                            <i className="ti ti-edit"></i>
                          </Link>
                          <Link
                            href="#delete_modal"
                            className=""
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
                        <Link to="/invoice-details" className="tb-data">
                          INV-2245
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/invoice-details" className="avatar avatar-lg me-2">
                            <img
                              src="/assets/img/users/user-01.jpg"
                              className="rounded-circle"
                              alt="user"
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium fs-14">
                              <Link to="/invoice-details">Harvey Smith</Link>
                            </h6>
                            <span className="fs-12"></span>
                          </div>
                        </div>
                      </td>
                      <td>20 Feb 2024, 12:15 PM</td>
                      <td>$325</td>
                      <td>$65</td>
                      <td>20 Feb 2024, 12:15 PM</td>
                      <td>
                        <span className="badge badge-soft-primary d-inline-flex align-items-center">
                          <i className="ti ti-point-filled me-1"></i>Pending
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <Link to="/invoice-details" className="me-2">
                            <i className="ti ti-eye"></i>
                          </Link>
                          <Link to="/edit-invoice" className="me-2">
                            <i className="ti ti-edit"></i>
                          </Link>
                          <Link
                            href="#delete_modal"
                            className=""
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
                        <Link to="/invoice-details" className="tb-data">
                          INV-1456
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/invoice-details" className="avatar avatar-lg me-2">
                            <img
                              src="/assets/img/users/user-02.jpg"
                              className="rounded-circle"
                              alt="user"
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium fs-14">
                              <Link to="/invoice-details">Stephan Peralt</Link>
                            </h6>
                            <span className="fs-12"></span>
                          </div>
                        </div>
                      </td>
                      <td>15 Mar 2024, 12:11 AM</td>
                      <td>$471</td>
                      <td>$145</td>
                      <td>15 Mar 2024, 12:11 AM</td>
                      <td>
                        <span className="badge badge-soft-primary d-inline-flex align-items-center">
                          <i className="ti ti-point-filled me-1"></i>Pending
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <Link to="/invoice-details" className="me-2">
                            <i className="ti ti-eye"></i>
                          </Link>
                          <Link to="/edit-invoice" className="me-2">
                            <i className="ti ti-edit"></i>
                          </Link>
                          <Link href="#"
                            className=""
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
                        <Link to="/invoice-details" className="tb-data">
                          INV-0045
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/invoice-details" className="avatar avatar-lg me-2">
                            <img
                              src="/assets/img/users/user-03.jpg"
                              className="rounded-circle"
                              alt="user"
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium fs-14">
                              <Link to="/invoice-details">Doglas Martini</Link>
                            </h6>
                            <span className="fs-12"></span>
                          </div>
                        </div>
                      </td>
                      <td>12 Apr 2024, 05:48 PM</td>
                      <td>$147</td>
                      <td>$32</td>
                      <td>12 Apr 2024, 05:48 PM</td>
                      <td>
                        <span className="badge badge-soft-danger d-inline-flex align-items-center">
                          <i className="ti ti-point-filled me-1"></i>Overdue
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <Link to="/invoice-details" className="me-2">
                            <i className="ti ti-eye"></i>
                          </Link>
                          <Link to="/edit-invoice" className="me-2">
                            <i className="ti ti-edit"></i>
                          </Link>
                          <Link
                            href="#delete_modal"
                            className=""
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
                        <Link to="/invoice-details" className="tb-data">
                          INV-6244
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/invoice-details" className="avatar avatar-lg me-2">
                            <img
                              src="/assets/img/users/user-02.jpg"
                              className="rounded-circle"
                              alt="user"
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium fs-14">
                              <Link to="/invoice-details">Linda Ray</Link>
                            </h6>
                            <span className="fs-12"></span>
                          </div>
                        </div>
                      </td>
                      <td>20 Apr 2024, 06:11 PM</td>
                      <td>$654</td>
                      <td>$140</td>
                      <td>20 Apr 2024, 06:11 PM</td>
                      <td>
                        <span className="badge badge-soft-warning d-inline-flex align-items-center">
                          <i className="ti ti-point-filled me-1"></i>Draft
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <Link to="/invoice-details" className="me-2">
                            <i className="ti ti-eye"></i>
                          </Link>
                          <Link to="/edit-invoice" className="me-2">
                            <i className="ti ti-edit"></i>
                          </Link>
                          <Link
                            href="#delete_modal"
                            className=""
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
                        <Link to="/invoice-details" className="tb-data">
                          INV-9565
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/invoice-details" className="avatar avatar-lg me-2">
                            <img
                              src="/assets/img/users/user-06.jpg"
                              className="rounded-circle"
                              alt="user"
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium fs-14">
                              <Link to="/invoice-details">Elliot Murray</Link>
                            </h6>
                            <span className="fs-12"></span>
                          </div>
                        </div>
                      </td>
                      <td>14 Jan 2024, 04:27 AM </td>
                      <td>$300</td>
                      <td>$0</td>
                      <td>14 Jan 2024, 04:27 AM</td>
                      <td>
                        <span className="badge badge-soft-success d-inline-flex align-items-center">
                          <i className="ti ti-point-filled me-1"></i>Paid
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <Link to="/invoice-details" className="me-2">
                            <i className="ti ti-eye"></i>
                          </Link>
                          <Link to="/edit-invoice" className="me-2">
                            <i className="ti ti-edit"></i>
                          </Link>
                          <Link
                            href="#delete_modal"
                            className=""
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
                        <Link to="/invoice-details" className="tb-data">
                          INV-6874
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/invoice-details" className="avatar avatar-lg me-2">
                            <img
                              src="/assets/img/users/user-07.jpg"
                              className="rounded-circle"
                              alt="user"
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium fs-14">
                              <Link to="/invoice-details">Rebecca Smtih</Link>
                            </h6>
                            <span className="fs-12"></span>
                          </div>
                        </div>
                      </td>
                      <td>02 Sep 2024, 09:21 PM</td>
                      <td>$654</td>
                      <td>$65</td>
                      <td>02 Sep 2024, 09:21 PM</td>
                      <td>
                        <span className="badge badge-soft-success d-inline-flex align-items-center">
                          <i className="ti ti-point-filled me-1"></i>Paid
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <Link to="/invoice-details" className="me-2">
                            <i className="ti ti-eye"></i>
                          </Link>
                          <Link to="/edit-invoice" className="me-2">
                            <i className="ti ti-edit"></i>
                          </Link>
                          <Link
                            href="#delete_modal"
                            className=""
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
                        <Link to="/invoice-details" className="tb-data">
                          INV-1454
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/invoice-details" className="avatar avatar-lg me-2">
                            <img
                              src="/assets/img/users/user-08.jpg"
                              className="rounded-circle"
                              alt="user"
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium fs-14">
                              <Link to="/invoice-details">Anthony Lewis</Link>
                            </h6>
                            <span className="fs-12"></span>
                          </div>
                        </div>
                      </td>
                      <td>14 Jan 2024, 04:27 AM </td>
                      <td>$300</td>
                      <td>$0</td>
                      <td>14 Jan 2024, 04:27 AM</td>
                      <td>
                        <span className="badge badge-soft-warning d-inline-flex align-items-center">
                          <i className="ti ti-point-filled me-1"></i>Draft
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <Link to="/invoice-details" className="me-2">
                            <i className="ti ti-eye"></i>
                          </Link>
                          <Link to="/edit-invoice" className="me-2">
                            <i className="ti ti-edit"></i>
                          </Link>
                          <Link
                            href="#delete_modal"
                            className=""
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
                        <Link to="/invoice-details" className="tb-data">
                          INV-6587
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/invoice-details" className="avatar avatar-lg me-2">
                            <img
                              src="/assets/img/users/user-09.jpg"
                              className="rounded-circle"
                              alt="user"
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium fs-14">
                              <Link to="/invoice-details">Connie Waters</Link>
                            </h6>
                            <span className="fs-12"></span>
                          </div>
                        </div>
                      </td>
                      <td>15 Nov 2024, 12:44 PM</td>
                      <td>$987</td>
                      <td>$47</td>
                      <td>15 Nov 2024, 12:44 PM</td>
                      <td>
                        <span className="badge badge-soft-primary d-inline-flex align-items-center">
                          <i className="ti ti-point-filled me-1"></i>Pending
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <Link to="/invoice-details" className="me-2">
                            <i className="ti ti-eye"></i>
                          </Link>
                          <Link to="/edit-invoice" className="me-2">
                            <i className="ti ti-edit"></i>
                          </Link>
                          <Link
                            href="#delete_modal"
                            className=""
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
                        <Link to="/invoice-details" className="tb-data">
                          INV-5879
                        </Link>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/invoice-details" className="avatar avatar-lg me-2">
                            <img
                              src="/assets/img/users/user-10.jpg"
                              className="rounded-circle"
                              alt="user"
                            />
                          </Link>
                          <div>
                            <h6 className="fw-medium fs-14">
                              <Link to="/invoice-details">Lori Broaddus</Link>
                            </h6>
                            <span className="fs-12"></span>
                          </div>
                        </div>
                      </td>
                      <td>10 Dec 2024, 11:23 PM</td>
                      <td>$365</td>
                      <td>$21</td>
                      <td>10 Dec 2024, 11:23 PM</td>
                      <td>
                        <span className="badge badge-soft-danger d-inline-flex align-items-center">
                          <i className="ti ti-point-filled me-1"></i>Overdue
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <Link to="/invoice-details" className="me-2">
                            <i className="ti ti-eye"></i>
                          </Link>
                          <Link to="/edit-invoice" className="me-2">
                            <i className="ti ti-edit"></i>
                          </Link>
                          <Link
                            href="#delete_modal"
                            className=""
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
              <h6 className="mb-1">Delete Invoice</h6>
              <p className="mb-3">Are you sure, you want to delete Invoice?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/invoice" className="btn btn-primary">
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

export default Invoice;
