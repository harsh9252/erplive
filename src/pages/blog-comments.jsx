import React from 'react';
import { Link } from 'react-router-dom';

const BlogComments = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Blog Comments</h6>
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
              <th className="no-sort">Customer</th>
              <th className="no-sort">Email</th>
              <th className="no-sort">Content</th>
              <th>Created On</th>
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-28.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Emily Clark</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                Great insights! This article really helped me understand the topic better. Looking
                forward to more informative content from you!
              </td>
              <td>22 Feb 2025</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-21.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">John Carter</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                Excellent write-up! The examples made it easier to grasp the concept. Keep sharing
                such valuable knowledge with your readers!
              </td>
              <td>07 Feb 2025</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-12.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Sophia White</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                I never thought about it this way. Your perspective is truly eye-opening. Thanks for
                sharing such a detailed explanation!
              </td>
              <td>30 Jan 2025</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-06.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Michael Johnson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                Very informative and well-structured content. I appreciate the effort you put into
                breaking down this complex topic. Well done!
              </td>
              <td>17 Jan 2025</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-30.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Olivia Harris</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                This was exactly what I needed to read today. Your points are well-articulated and
                backed by solid reasoning. Thank you!
              </td>
              <td>04 Jan 2025</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-16.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">David Anderson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                This was exactly what I needed to read today. Your points are well-articulated and
                backed by solid reasoning. Thank you!
              </td>
              <td>04 Jan 2025</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-09.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Emma Lewis</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                Impressive analysis! You covered all the key aspects thoroughly. The writing style
                is engaging and keeps readers hooked until the end.
              </td>
              <td>02 Dec 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-23.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Robert Thomas</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                Thanks for sharing! The step-by-step approach really helps in understanding. Can you
                provide more examples on this subject?
              </td>
              <td>15 Nov 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-07.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Isabella Scott</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                Insightful read! I particularly liked the way you explained complex ideas in simple
                terms. Looking forward to your next post!
              </td>
              <td>30 Nov 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-31.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Daniel Martinez</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                Brilliant content! This was very helpful for beginners like me. Please share more
                tips on practical applications of this concept.
              </td>
              <td>12 Oct 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-31.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Daniel Martinez</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                Brilliant content! This was very helpful for beginners like me. Please share more
                tips on practical applications of this concept.
              </td>
              <td>12 Oct 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-23.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Charlotte Brown</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                Your writing always provides clarity. I appreciate how you simplify technical topics
                without losing depth. Keep up the great work!
              </td>
              <td>05 Oct 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-33.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">William Parker</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                Great points! I learned something new today. Would love to hear your thoughts on how
                this applies in real-world scenarios.
              </td>
              <td>09 Sep 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-34.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Mia Thompson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                This post stands out because of its well-researched insights. I appreciate the
                detailed breakdown. Looking forward to more content like this!
              </td>
              <td>02 Sep 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
                  <Link to="/customer-details"
                    className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                  >
                    <img
                      src="/assets/img/profiles/avatar-35.jpg"
                      className="rounded-circle"
                      alt="img"
                    />
                  </Link>
                  <div>
                    <h6 className="fs-14 fw-medium mb-0">
                      <Link to="/customer-details">Amelia Robinson</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                Fantastic article! The way you structured the information made it very digestible.
                Keep sharing such valuable knowledge with us!
              </td>
              <td>02 Sep 2024</td>
              <td className="action-item">
                <Link href="#" data-bs-toggle="dropdown">
                  <i className="isax isax-more"></i>
                </Link>
                <ul className="dropdown-menu">
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
              <label className="form-label">Customer</label>
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
                            src="/assets/img/profiles/avatar-21.jpg"
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
                            src="/assets/img/profiles/avatar-06.jpg"
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
                      <Link href="#" className="btn btn-outline-white w-100 close-filter">
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
              <label className="form-label">Date</label>
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
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Blog Comment</h6>
              <p className="mb-3">Are you sure, you want to delete Blog Comment?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/blog-comments" className="btn btn-primary">
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

export default BlogComments;
