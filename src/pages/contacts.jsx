import React from 'react';
import { Link } from 'react-router-dom';

const Contacts = () => {
  return (
    <>
      <div className="mb-3">
        <h4>Contacts</h4>
      </div>
      <div className=" d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <div className="search-set mb-0">
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex table-dropdown mb-3 pb-1 right-content align-items-center flex-wrap row-gap-3">
          <div className="dropdown me-2">
            <Link
              href="#"
              className="dropdown-toggle btn btn-outline-white btn-md d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              Status
            </Link>
            <ul className="dropdown-menu  dropdown-menu-end p-3">
              <li>
                <Link href="#" className="dropdown-item rounded-1">
                  Active
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item rounded-1">
                  Inactive
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <Link
              href="#"
              className="dropdown-toggle btn btn-outline-white btn-md d-inline-flex align-items-center fw-medium"
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
          <Link
            href="#"
            className="btn btn-primary text-white ms-2"
            data-bs-toggle="modal"
            data-bs-target="#add-contact"
          >
            <i className="ti ti-circle-plus me-1"></i>Add Contact
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
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
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
                  <Link href="#" className="avatar avatar-sm me-2">
                    <img
                      src="/assets/img/users/user-33.jpg"
                      alt="product"
                      className="rounded-circle"
                    />
                  </Link>
                  <Link href="#">Carl Evans</Link>
                </div>
              </td>
              <td></td>
              <td>+12163547758</td>
              <td>Admin</td>
              <td>
                <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 badge badge-soft-success text-success fs-10">
                  <i className="ti ti-point-filled me-1 fs-11"></i>Active
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-contact"
                    >
                      <i className="isax isax-eye me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
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
                  <Link href="#" className="avatar avatar-sm me-2">
                    <img
                      src="/assets/img/users/user-02.jpg"
                      alt="product"
                      className="rounded-circle"
                    />
                  </Link>
                  <Link href="#">Minerva Rameriz</Link>
                </div>
              </td>
              <td></td>
              <td>+11367529510 </td>
              <td>Manager</td>
              <td>
                <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 badge badge-soft-success text-success fs-10">
                  <i className="ti ti-point-filled me-1 fs-11"></i>Active
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-contact"
                    >
                      <i className="isax isax-eye me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
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
                  <Link href="#" className="avatar avatar-sm me-2">
                    <img
                      src="/assets/img/users/user-34.jpg"
                      alt="product"
                      className="rounded-circle"
                    />
                  </Link>
                  <Link href="#">Robert Lamon</Link>
                </div>
              </td>
              <td></td>
              <td>+15362789414</td>
              <td>Salesman</td>
              <td>
                <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 badge badge-soft-success text-success fs-10">
                  <i className="ti ti-point-filled me-1 fs-11"></i>Active
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-contact"
                    >
                      <i className="isax isax-eye me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
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
                  <Link href="#" className="avatar avatar-sm me-2">
                    <img
                      src="/assets/img/users/user-35.jpg"
                      alt="product"
                      className="rounded-circle"
                    />
                  </Link>
                  <Link href="#">Patricia Lewis</Link>
                </div>
              </td>
              <td></td>
              <td>+18513094627</td>
              <td>Supervisor</td>
              <td>
                <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 badge badge-soft-success text-success fs-10">
                  <i className="ti ti-point-filled me-1 fs-11"></i>Active
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-contact"
                    >
                      <i className="isax isax-eye me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
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
                  <Link href="#" className="avatar avatar-sm  me-2">
                    <img
                      src="/assets/img/users/user-36.jpg"
                      alt="product"
                      className="rounded-circle"
                    />
                  </Link>
                  <Link href="#">Mark Joslyn</Link>
                </div>
              </td>
              <td></td>
              <td>+14678219025</td>
              <td>Store Keeper</td>
              <td>
                <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 badge badge-soft-success text-success fs-10">
                  <i className="ti ti-point-filled me-1 fs-11"></i>Active
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-contact"
                    >
                      <i className="isax isax-eye me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
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
                  <Link href="#" className="avatar avatar-sm me-2">
                    <img
                      src="/assets/img/users/user-37.jpg"
                      alt="product"
                      className="rounded-circle"
                    />
                  </Link>
                  <Link href="#">Marsha Betts</Link>
                </div>
              </td>
              <td></td>
              <td>+10913278319</td>
              <td>Purchase</td>
              <td>
                <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 badge badge-soft-success text-success fs-10">
                  <i className="ti ti-point-filled me-1 fs-11"></i>Active
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-contact"
                    >
                      <i className="isax isax-eye me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
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
                  <Link href="#" className="avatar avatar-sm me-2">
                    <img
                      src="/assets/img/users/user-28.jpg"
                      alt="product"
                      className="rounded-circle"
                    />
                  </Link>
                  <Link href="#">Daniel Jude</Link>
                </div>
              </td>
              <td></td>
              <td>+19125852947</td>
              <td>Delivery Biker</td>
              <td>
                <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 badge badge-soft-success text-success fs-10">
                  <i className="ti ti-point-filled me-1 fs-11"></i>Active
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-contact"
                    >
                      <i className="isax isax-eye me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
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
                  <Link href="#" className="avatar avatar-sm me-2">
                    <img
                      src="/assets/img/users/user-38.jpg"
                      alt="product"
                      className="rounded-circle"
                    />
                  </Link>
                  <Link href="#">Emma Bates</Link>
                </div>
              </td>
              <td></td>
              <td>+13671835209</td>
              <td>Maintenance</td>
              <td>
                <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 badge badge-soft-success text-success fs-10">
                  <i className="ti ti-point-filled me-1 fs-11"></i>Active
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-contact"
                    >
                      <i className="isax isax-eye me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
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
                  <Link href="#" className="avatar avatar-sm me-2">
                    <img
                      src="/assets/img/users/user-39.jpg"
                      alt="product"
                      className="rounded-circle"
                    />
                  </Link>
                  <Link href="#">Richard Fralick</Link>
                </div>
              </td>
              <td></td>
              <td>+19756194733</td>
              <td>Quality Analyst</td>
              <td>
                <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 badge badge-soft-success text-success fs-10">
                  <i className="ti ti-point-filled me-1 fs-11"></i>Active
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-contact"
                    >
                      <i className="isax isax-eye me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
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
                  <Link href="#" className="avatar avatar-sm me-2">
                    <img
                      src="/assets/img/users/user-03.jpg"
                      alt="product"
                      className="rounded-circle"
                    />
                  </Link>
                  <Link href="#">Michelle Robison</Link>
                </div>
              </td>
              <td></td>
              <td>+19167850925</td>
              <td>Accountant</td>
              <td>
                <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 badge badge-soft-success text-success fs-10">
                  <i className="ti ti-point-filled me-1 fs-11"></i>Active
                </span>
              </td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-contact"
                    >
                      <i className="isax isax-eye me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <Link href="#"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_modal"
                    >
                      <i className="isax isax-trash me-2"></i>Delete
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="modal fade" id="add-contact">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="page-title">
                <h5>Add Contact</h5>
              </div>
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
                <div className="new-employee-field">
                  <div className="profile-pic-upload bg-light">
                    <div className="profile-pic">
                      <span>
                        <i data-feather="plus-circle" className="plus-down-add"></i> Add Image
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="image-upload mb-0">
                        <input type="file" />
                        <div className="image-uploads">
                          <h4>Upload Image</h4>
                        </div>
                      </div>
                      <p className="mt-2">JPEG, PNG up to 2 MB</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">
                      First Name<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">
                      Last Name<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <label className="form-label">
                      Email<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <label className="form-label">
                      Phone<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="tel" className="form-control" />
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-0">
                      <label className="form-label">
                        Contact Type <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Admin</option>
                        <option>Salesman</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn me-2 btn-light fs-13 fw-medium p-2 px-3 shadow-none"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary fs-13 fw-medium p-2 px-3">
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="edit-contact">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="page-title">
                <h5>Edit Contact</h5>
              </div>
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
                <div className="new-employee-field">
                  <div className="profile-pic-upload image-field">
                    <div className="avatar avatar-xxl border border-dashed bg-light me-3 flex-shrink-0">
                      <div className="position-relative d-flex align-items-center">
                        <img
                          src="/assets/img/users/user-01.jpg"
                          className="avatar avatar-xl "
                          alt="User Img"
                        />
                        <Link href="#"
                          className="rounded-trash trash-top d-flex align-items-center justify-content-center"
                        >
                          <i className="isax isax-trash"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="image-upload mb-0">
                        <input type="file" />
                        <div className="image-uploads">
                          <h4>Change Image</h4>
                        </div>
                      </div>
                      <p className="mt-2">JPEG, PNG up to 2 MB</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">
                      First Name<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" value="Carl" />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">
                      Last Name<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" value="Evans" />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <label className="form-label">
                      Email<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="email" className="form-control" value="carlevans@example.com" />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <label className="form-label">
                      Phone<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="tel" className="form-control" value="+12163547758 " />
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-0">
                      <label className="form-label">
                        Contact Type <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option selected>Admin</option>
                        <option>Salesman</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn me-2 btn-light fs-13 fw-medium p-2 px-3 shadow-none"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary fs-13 fw-medium p-2 px-3">
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
              <h6 className="mb-1">Delete Contact</h6>
              <p className="mb-3">Are you sure, you want to delete ontact?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/contacts" className="btn btn-primary">
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

export default Contacts;
