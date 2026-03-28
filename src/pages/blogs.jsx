import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>All Blogs</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div>
            <Link to="/add-blog" className="btn btn-primary d-flex align-items-center">
              <i className="isax isax-add-circle5 me-1"></i>Add New Blog
            </Link>
          </div>
        </div>
      </div>
      <ul className="nav nav-tabs nav-bordered mb-3">
        <li className="nav-item">
          <Link className="nav-link active" href="#" data-bs-toggle="tab" data-bs-target="#tab1">
            Active{' '}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#tab2">
            Inactive{' '}
          </Link>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane active" id="tab1" role="tabpanel" tabIndex="0">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-06.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Invoicing
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/users/user-08.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        Gertrude Bowie
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">5 Must-Have Features in Invoicing</Link>
                    </h6>
                    <p className="">
                      Discover the key features every invoicing tool should have to simplify
                      payments and improve cash flow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-07.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Accounting
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/profiles/avatar-28.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        Emily Clark
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">Small Businesses Automate Accounting</Link>
                    </h6>
                    <p className="">
                      Learn how automation can save time, reduce errors, and help small businesses
                      manage their finances efficiently.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-08.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Expense Management
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/profiles/avatar-29.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        John Carter
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">Top Strategies for Business Expenses</Link>
                    </h6>
                    <p className="">
                      Effective ways to track expenses, cut unnecessary costs, and improve financial
                      management for growing businesses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-09.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Finance Tips
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/users/user-22.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        Olivia Harris
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">A Beginner’s Guide to Digital Invoicing</Link>
                    </h6>
                    <p className="">
                      New to digital invoicing? Here’s everything you need to know to create and
                      send invoices professionally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-10.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Business Finance
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/profiles/avatar-16.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        David Anderson
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">How to Handle Late Payments</Link>
                    </h6>
                    <p className="">
                      Dealing with overdue invoices? Learn the best strategies to follow up and get
                      paid on time eveytime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-11.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Tax & Compliance
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/profiles/avatar-17.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        Emma Lewis
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">Understanding Tax Deductions</Link>
                    </h6>
                    <p className="">
                      Maximize your savings! A guide to deductible expenses freelancers should track
                      for tax season.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-12.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Technology
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/profiles/avatar-23.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        Robert Thomas
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">Why Cloud-Based Accounting is Future</Link>
                    </h6>
                    <p className="">
                      Explore the benefits of cloud accounting software and how it helps businesses
                      stay organized from anywhere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-13.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Reporting
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/profiles/avatar-07.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        Isabella Scott
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">Best Practices for Financial Reporting</Link>
                    </h6>
                    <p className="">
                      Learn how to generate accurate financial reports to analyze business
                      performance and plan for growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-14.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Software Reviews
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/profiles/avatar-07.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        Sophia White
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">How to Choose the Right Accounting</Link>
                    </h6>
                    <p className="">
                      Confused about accounting tools? Here’s a step-by-step guide to selecting the
                      best software for your business needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="d-flex align-items-center justify-content-center">
                <Link href="#" className="btn btn-dark d-inline-flex align-items-center">
                  <i className="isax isax-rotate-right me-1"></i>Load More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane" id="tab2" role="tabpanel" tabIndex="0">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-11.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Tax & Compliance
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/profiles/avatar-17.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        Emma Lewis
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">Understanding Tax Deductions</Link>
                    </h6>
                    <p className="">
                      Maximize your savings! A guide to deductible expenses freelancers should track
                      for tax season.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-09.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Finance Tips
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/users/user-22.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        Olivia Harris
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">A Beginner’s Guide to Digital Invoicing</Link>
                    </h6>
                    <p className="">
                      New to digital invoicing? Here’s everything you need to know to create and
                      send invoices professionally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-10.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Business Finance
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/profiles/avatar-16.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        David Anderson
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">How to Handle Late Payments</Link>
                    </h6>
                    <p className="">
                      Dealing with overdue invoices? Learn the best strategies to follow up and get
                      paid on time eveytime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-14.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Software Reviews
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/profiles/avatar-07.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        Sophia White
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">How to Choose the Right Accounting</Link>
                    </h6>
                    <p className="">
                      Confused about accounting tools? Here’s a step-by-step guide to selecting the
                      best software for your business needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-12.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Technology
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/profiles/avatar-23.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        Robert Thomas
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">Why Cloud-Based Accounting is Future</Link>
                    </h6>
                    <p className="">
                      Explore the benefits of cloud accounting software and how it helps businesses
                      stay organized from anywhere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body p-0">
                  <div className="position-relative">
                    <Link to="/blog-details" className="rounded">
                      <img
                        src="/assets/img/media/img-13.png"
                        className="img-fluid rounded w-100"
                        alt="img"
                      />
                    </Link>
                    <span className="trend-tag badge bg-info badge-sm position-absolute">
                      Reporting
                    </span>
                    <div className="action-item dot-icon ">
                      <Link href="#" data-bs-toggle="dropdown" className="bg-white">
                        <i className="isax isax-more"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/edit-blog" className="dropdown-item d-flex align-items-center">
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
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center">
                        <i className="isax isax-calendar-1 me-1"></i>14 Mar 2025
                      </span>
                      <Link href="#"
                        className="fs-14 fw-normal text-truncate d-flex align-items-center"
                      >
                        <img
                          src="/assets/img/profiles/avatar-07.jpg"
                          className="avatar avatar-sm rounded-circle me-2 flex-shrink-0"
                          alt="Img"
                        />
                        Isabella Scott
                      </Link>
                    </div>
                    <h6 className="fs-16 mb-3">
                      <Link to="/blog-details">Best Practices for Financial Reporting</Link>
                    </h6>
                    <p className="">
                      Learn how to generate accurate financial reports to analyze business
                      performance and plan for growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="d-flex align-items-center justify-content-center">
                <Link href="#" className="btn btn-dark d-inline-flex align-items-center">
                  <i className="isax isax-rotate-right me-1"></i>Load More
                </Link>
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
              <h6 className="mb-1">Delete Blog</h6>
              <p className="mb-3">Are you sure, you want to delete Blog?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/blogs" className="btn btn-primary">
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

export default Blogs;
