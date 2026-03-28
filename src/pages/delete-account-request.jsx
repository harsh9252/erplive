import React from 'react';
import { Link } from 'react-router-dom';

const DeleteAccountRequest = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Delete Account Request</h6>
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
              <Link
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
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
        <div className="align-items-center gap-2 flex-wrap filter-info mt-3">
          <h6 className="fs-13 fw-semibold">Filters</h6>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            Users Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            Status Selected
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
              <th>User</th>
              <th>Delete Request Date</th>
              <th className="no-sort"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-16.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Sarah Michelle</h6>
                  </div>
                </div>
              </td>
              <td>04 Mar 2025</td>
              <td>
                <Link
                  href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-26.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Daniel Patrick</h6>
                  </div>
                </div>
              </td>
              <td>20 Feb 2025</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-27.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Emily Lauren</h6>
                  </div>
                </div>
              </td>
              <td>13 Feb 2025</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-28.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Braun Kelton</h6>
                  </div>
                </div>
              </td>
              <td>30 Jan 2025</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-29.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Jessica Renee</h6>
                  </div>
                </div>
              </td>
              <td>17 Jan 2025</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-30.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Ryan Christopher</h6>
                  </div>
                </div>
              </td>
              <td>22 Dec 2024</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-24.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Abigail Harper</h6>
                  </div>
                </div>
              </td>
              <td>15 Dec 2024</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-31.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Michael Johnson</h6>
                  </div>
                </div>
              </td>
              <td>28 Nov 2024</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-32.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Madison Brooke</h6>
                  </div>
                </div>
              </td>
              <td>12 Nov 2024</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-33.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">William Andrew</h6>
                  </div>
                </div>
              </td>
              <td>25 Oct 2024</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-34.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Victoria Celeste</h6>
                  </div>
                </div>
              </td>
              <td>18 Oct 2024</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-35.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Nathaniel Blake</h6>
                  </div>
                </div>
              </td>
              <td>22 Sep 2024</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-36.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Natalie Paige</h6>
                  </div>
                </div>
              </td>
              <td>15 Sep 2024</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-37.jpg"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">Isabella Claire</h6>
                  </div>
                </div>
              </td>
              <td>20 Aug 2024</td>
              <td>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#cancel_modal"
                >
                  <i className="isax isax-close-circle me-1"></i> Cancel
                </Link>
                <Link href="#"
                  className="btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i className="isax isax-tick-circle me-1"></i> Confirm
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="modal fade" id="confirm_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Confirm Request</h6>
              <p className="mb-3">Are you sure, you want to confirm request?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/delete-account-request" className="btn btn-primary">
                  Yes, Confirm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="cancel_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/cancel.svg" alt="img" />
              </div>
              <h6 className="mb-1">Cancel Request</h6>
              <p className="mb-3">Are you sure, you want to cancel request?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/delete-account-request" className="btn btn-primary">
                  Yes, Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccountRequest;
