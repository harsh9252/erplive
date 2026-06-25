import React from 'react';
import { Link } from 'react-router-dom';

const ContactMessages = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Contact Messages</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
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
            <Link
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </Link>
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown">
              <Link href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center fw-medium"
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
      </div>
      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead className="thead-light">
            <tr>
              <th className="no-sort">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" id="select-all3" />
                </div>
              </th>
              <th className="no-sort">Name</th>
              <th className="no-sort">Email</th>
              <th className="no-sort">Phone</th>
              <th className="no-sort">Message</th>
              <th className="no-sort">Created On</th>
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-28.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Emily Clark</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 202-555-0198</td>
              <td>Unable to log into my account. Can you assist?</td>
              <td>22 Feb 2025</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-29.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">John Carter</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 305-456-7821</td>
              <td>My invoices are not being sent to clients. Please help!</td>
              <td>07 Feb 2025</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-12.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Sophia White</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 415-678-1234</td>
              <td>How do I integrate payment gateways for faster transactions?</td>
              <td>30 Jan 2025</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-27.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Michael Johnson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 718-987-6543</td>
              <td>I need help generating financial reports for my business.</td>
              <td>17 Jan 2025</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-30.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Olivia Harris</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 909-234-5678</td>
              <td>Can I upgrade my plan without losing my existing data?</td>
              <td>04 Jan 2025</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-16.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">David Anderson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 602-789-3456</td>
              <td>How does the system calculate taxes automatically?</td>
              <td>09 Dec 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-17.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Emma Lewis</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 812-456-9087</td>
              <td>The mobile app crashes frequently when generating invoices.</td>
              <td>02 Dec 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-23.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Robert Thomas</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 214-123-4567</td>
              <td>How do I categorize expenses for better tracking?</td>
              <td>15 Nov 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-07.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Isabella Scott</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 646-789-1230</td>
              <td>Can I customize invoice templates with my company branding?</td>
              <td>30 Nov 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-31.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Daniel Martinez</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 901-678-4321</td>
              <td>How can I add team members with different permission levels?</td>
              <td>12 Oct 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-02.jpg" className="rounded-circle" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Charlotte Brown</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 503-987-2105</td>
              <td>Is there an option to export my reports to Excel or PDF?</td>
              <td>05 Oct 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-35.jpg" className="rounded-circle" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">William Parker</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 320-345-6789</td>
              <td>How do I set up automatic reminders for overdue invoices?</td>
              <td>09 Sep 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img src="/assets/img/users/user-22.jpg" className="rounded-circle" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Mia Thompson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 720-654-7890</td>
              <td>Does your platform support two-factor authentication for security?</td>
              <td>02 Sep 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
                  <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                    <img
                      src="/assets/img/profiles/avatar-22.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link href="#">Amelia Robinson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>+1 919-321-9876</td>
              <td>Can I integrate the platform with my existing CRM software?</td>
              <td>07 Aug 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-ellipsis"></i>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/contact-message"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_modal"
                    >
                      <i className="isax isax-edit me-2"></i>Edit
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
              <label className="form-label">Name</label>
              <div className="dropdown">
                <Link href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
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
                      <Link href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link>
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
                            src="/assets/img/profiles/avatar-29.jpg"
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
                            src="/assets/img/profiles/avatar-12.jpg"
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
                            src="/assets/img/profiles/avatar-27.jpg"
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
                            src="/assets/img/profiles/avatar-30.jpg"
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
                            src="/assets/img/profiles/avatar-16.jpg"
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
                      <Link href="#" className="btn btn-outline-white w-100" id="close-filter">
                        Cancel
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link href="#" className="btn btn-primary w-100">
                        Select
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="form-label">Date Range</label>
              <div className="input-group position-relative">
                <input type="text" className="form-control date-range bookingrange rounded-end" />
                <span className="input-icon-addon fs-16 text-gray-9">
                  <i className="isax isax-calendar-2"></i>
                </span>
              </div>
            </div>
            <div className="offcanvas-footer">
              <div className="row g-2">
                <div className="col-6">
                  <Link href="#" className="btn btn-outline-white w-100">
                    Reset
                  </Link>
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
      <div id="edit_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg edit-contact-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Contact Message </h4>
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
                        Name<span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="John Carter" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Email<span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label d-block">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" id="phone" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Date</label>
                      <div className="input-group position-relative">
                        <input
                          type="text"
                          className="form-control date-range bookingrange rounded-end"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Content<span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="How do I integrate payment gateways for faster transactions?"
                    ></textarea>
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
              <h6 className="mb-1">Delete Messages</h6>
              <p className="mb-3">Are you sure, you want to delete contact message?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/contact-message" className="btn btn-primary">
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

export default ContactMessages;
