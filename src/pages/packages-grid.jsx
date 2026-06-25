import React from 'react';
import { Link } from 'react-router-dom';

const PackagesGrid = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Packages</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="me-2">
            <div className="d-flex align-items-center">
              <Link to="/packages" className="btn btn-icon btn-sm border rounded me-1">
                <i className="isax isax-menu-1"></i>
              </Link>
              <Link to="/packages-grid"
                className="btn btn-icon border rounded btn-sm active bg-primary text-white"
              >
                <i className="isax isax-grid-2"></i>
              </Link>
            </div>
          </div>
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
          <div>
            <Link href="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_plans"
            >
              <i className="isax isax-add-circle5 me-1"></i>New Plan
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center overflow-hidden">
                <div>
                  <p className="fs-12 fw-medium mb-1 text-truncate">Total Plans</p>
                  <h4>08</h4>
                </div>
              </div>
              <div>
                <span className="avatar avatar-lg bg-warning flex-shrink-0">
                  <i className="isax isax-box5 fs-32"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center overflow-hidden">
                <div>
                  <p className="fs-12 fw-medium mb-1 text-truncate">Active Plans</p>
                  <h4>07</h4>
                </div>
              </div>
              <div>
                <span className="avatar avatar-lg bg-success flex-shrink-0">
                  <i className="isax isax-box-tick5 fs-32"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center overflow-hidden">
                <div>
                  <p className="fs-12 fw-medium mb-1 text-truncate">Inactive Plans</p>
                  <h4>0</h4>
                </div>
              </div>
              <div>
                <span className="avatar avatar-lg bg-danger flex-shrink-0">
                  <i className="isax isax-box-remove5 fs-32"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center overflow-hidden">
                <div>
                  <p className="fs-12 fw-medium mb-1 text-truncate">No of Plan Types</p>
                  <h4>04</h4>
                </div>
              </div>
              <div>
                <span className="avatar avatar-lg bg-info flex-shrink-0">
                  <i className="isax isax-box-25 fs-32"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <p className="mb-0 me-2">Monthly</p>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" checked />
          </div>
          <p>Yearly</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 px-0">
            <div className="card border rounded mb-3">
              <div className="card-body">
                <div className="pricing-content mb-3">
                  <div className="mb-3">
                    <h6 className="fs-14">Basic</h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h3>
                      $99<span className="fs-14 fw-normal text-gray me-2">/month</span>
                    </h3>
                    <span className="p-1 bg-info rounded text-white">Only 10 Users</span>
                  </div>
                  <p className="mb-2">
                    Best for Freelancers & small businesses needs simple invoicing.
                  </p>
                  <Link href="#" className="btn btn-white border w-100 mb-3">
                    <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                  </Link>
                  <div className="price-hdr">
                    <h6 className="fs-14 fw-medium text-gray me-2 ms-2">FEATURES</h6>
                  </div>
                </div>
                <div className="border-bottom mt-3 mb-3">
                  <div>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>1 Business Account
                      + 1 User
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      14+ Invoice templates
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Collect Online Payments
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      40+ Reports & Insights
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Variants
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Add custom fields & charges
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Convert documents
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Link
                    href="#"
                    className="btn btn-sm btn-light d-inline-flex align-items-center justify-content-center p-1 me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_plans"
                  >
                    <i className="isax isax-edit"></i>
                  </Link>
                  <Link href="#"
                    className="btn btn-sm btn-light d-inline-flex align-items-center justify-content-center p-1"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                  >
                    <i className="isax isax-trash"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 px-1">
            <div className="card border rounded mb-3">
              <div className="card-body">
                <div className="pricing-content mb-3">
                  <div className="mb-3">
                    <h6 className="fs-14">Standard</h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h3>
                      $199<span className="fs-14 fw-normal text-gray me-2">/month</span>
                    </h3>
                    <span className="p-1 bg-info rounded text-white">Only 50 Users</span>
                  </div>
                  <p className="mb-2">Growing businesses managing recurring invoices & reports.</p>
                  <Link href="#" className="btn btn-white border w-100 mb-3">
                    <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                  </Link>
                  <div className="price-hdr">
                    <h6 className="fs-14 fw-medium text-gray me-2 ms-2">FEATURES</h6>
                  </div>
                </div>
                <div className="border-bottom mt-3 mb-3">
                  <div>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>1 Business Account
                      + 1 User
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Bulk downloads
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Multiple Price lists
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      User Activity
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Bulk edits
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Multiple Warehouses
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Online Store
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Link
                    href="#"
                    className="btn btn-sm btn-light d-inline-flex align-items-center justify-content-center p-1 me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_plans"
                  >
                    <i className="isax isax-edit"></i>
                  </Link>
                  <Link href="#"
                    className="btn btn-sm btn-light d-inline-flex align-items-center justify-content-center p-1"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                  >
                    <i className="isax isax-trash"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 px-0">
            <div className="card border rounded mb-3">
              <div className="card-body">
                <div className="pricing-content mb-3">
                  <div className="mb-3">
                    <h6 className="fs-14">Business</h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h3>
                      $299<span className="fs-14 fw-normal text-gray me-2">/month</span>
                    </h3>
                    <span className="p-1 bg-info rounded text-white">Only 75 Users</span>
                  </div>
                  <p className="mb-2">
                    Best for Large sales teams requiring automation & integrations.
                  </p>
                  <Link href="#" className="btn btn-white border w-100 mb-3">
                    <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                  </Link>
                  <div className="price-hdr">
                    <h6 className="fs-14 fw-medium text-gray me-2 ms-2">FEATURES</h6>
                  </div>
                </div>
                <div className="border-bottom mt-3 mb-3">
                  <div>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      POS Billing
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Batch & Expiry
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Serial Number/ IMEI Tracking
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Subscription/ Recurring
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Product Grouping
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Additional CESS
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Bank Reconciliation
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Link
                    href="#"
                    className="btn btn-sm btn-light d-inline-flex align-items-center justify-content-center p-1 me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_plans"
                  >
                    <i className="isax isax-edit"></i>
                  </Link>
                  <Link href="#"
                    className="btn btn-sm btn-light d-inline-flex align-items-center justify-content-center p-1"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                  >
                    <i className="isax isax-trash"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 px-1">
            <div className="card border rounded mb-3">
              <div className="card-body">
                <div className="pricing-content mb-3">
                  <div className="mb-3">
                    <h6 className="fs-14">Enterprice</h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h3>
                      $399<span className="fs-14 fw-normal text-gray me-2">/month</span>
                    </h3>
                    <span className="p-1 bg-info rounded text-white">Unlimited</span>
                  </div>
                  <p className="mb-2">Enterprises with AI insights & advanced workflows.</p>
                  <Link href="#" className="btn btn-white border w-100 mb-3">
                    <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                  </Link>
                  <div className="price-hdr">
                    <h6 className="fs-14 fw-medium text-gray me-2 ms-2">FEATURES</h6>
                  </div>
                </div>
                <div className="border-bottom mt-3 mb-3">
                  <div>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Add Custom Features
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Custom Column Linking
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Multi Businesses / Branches
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Online Store
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Shiprocket Integration
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Multiple Users
                    </span>
                    <span className="text-dark d-flex align-items-center mb-3">
                      <i className="isax isax-tick-circle text-success me-2"></i>
                      Multiple Warehouses
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Link
                    href="#"
                    className="btn btn-sm btn-light d-inline-flex align-items-center justify-content-center p-1 me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_plans"
                  >
                    <i className="isax isax-edit"></i>
                  </Link>
                  <Link href="#"
                    className="btn btn-sm btn-light d-inline-flex align-items-center justify-content-center p-1"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                  >
                    <i className="isax isax-trash"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <label className="form-label">Companies</label>
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
                            src="/assets/img/icons/company-01.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Trend Hive
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/icons/company-02.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Quick Cart
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/icons/company-03.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Tech Bazaar
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/icons/company-04.svg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Harvest Basket
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
            <div className="mb-3">
              <label id="dateRangePicker" className="form-label">
                Date Range
              </label>
              <div className="input-group position-relative">
                <input type="text" className="form-control date-range bookingrange rounded-end" />
                <span className="input-icon-addon fs-16 text-gray-9">
                  <i className="isax isax-calendar-2"></i>
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <ul className="mb-3">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-success me-1"></i>Approved
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-warning me-1"></i>Pending
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <i className="fa-solid fa-circle fs-6 text-danger me-1"></i>Rejected
                      </label>
                    </li>
                  </ul>
                </div>
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
      <div className="modal fade" id="add_plans">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Plan</h4>
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
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <span className="text-gray-9 fw-bold mb-2 d-flex">Image</span>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-xxl border border-dashed bg-light me-3 flex-shrink-0">
                          <i className="isax isax-image text-primary fs-24"></i>
                        </div>
                        <div className="d-inline-flex flex-column align-items-start">
                          <div className="drag-upload-btn btn btn-sm btn-primary position-relative mb-2">
                            <i className="isax isax-image me-1"></i>Upload Image
                            <input type="file" className="form-control image-sign" multiple="" />
                          </div>
                          <span className="text-gray-9">JPG or PNG format, not exceeding 5MB.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Name<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Advanced</option>
                        <option>Basic</option>
                        <option>Enterprise</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Type<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Position<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Currency<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>USD</option>
                        <option>EURO</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label className="form-label">
                          Plan Currency<span className="text-danger"> *</span>
                        </label>
                        <span className="text-primary">
                          <i className="fa-solid fa-circle-exclamation me-2"></i>Set 0 for free
                        </span>
                      </div>
                      <select className="select">
                        <option>Select</option>
                        <option>Fixed</option>
                        <option>Percentage</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Discount Type<span className="text-danger"> *</span>
                      </label>
                      <div className="pass-group">
                        <select className="select">
                          <option>Select</option>
                          <option>Fixed</option>
                          <option>Percentage</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Discount<span className="text-danger"> *</span>
                      </label>
                      <div className="pass-group">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Limitations Invoices</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Max Customers</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Product</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Supplier</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6>Plan Modules</h6>
                      <div className="form-check d-flex align-items-center">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Select All
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Employees
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Invoices
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Reports
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Contacts
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Clients
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Estimates
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Goals
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Deals
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Projects
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Payments
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Assets
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Leads
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Tickets
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Taxes
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Activities
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Pipelines
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 me-2 text-dark fw-medium">
                          Access Trial
                        </label>
                        <div className="form-check form-switch me-2">
                          <input className="form-check-input me-2" type="checkbox" role="switch" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center gx-3">
                    <div className="col-md-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-fill">
                          <label className="form-label">Trial Days</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-block align-items-center ms-3">
                        <label className="form-check-label mt-0 me-2 text-dark">
                          Is Recommended
                        </label>
                        <div className="form-check form-switch me-2">
                          <input className="form-check-input me-2" type="checkbox" role="switch" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Status<span className="text-danger"> *</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="edit_plans">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Plan</h4>
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
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <span className="text-gray-9 fw-bold mb-2 d-flex">Image</span>
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-xxl border border-dashed bg-light me-3 flex-shrink-0">
                          <i className="isax isax-image text-primary fs-24"></i>
                        </div>
                        <div className="d-inline-flex flex-column align-items-start">
                          <div className="drag-upload-btn btn btn-sm btn-primary position-relative mb-2">
                            <i className="isax isax-image me-1"></i>Upload Image
                            <input type="file" className="form-control image-sign" multiple="" />
                          </div>
                          <span className="text-gray-9">JPG or PNG format, not exceeding 5MB.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Name<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Advanced</option>
                        <option>Basic</option>
                        <option>Enterprise</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Type<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Position<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Currency<span className="text-danger"> *</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>USD</option>
                        <option>EURO</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label className="form-label">
                          Plan Currency<span className="text-danger"> *</span>
                        </label>
                        <span className="text-primary">
                          <i className="fa-solid fa-circle-exclamation me-2"></i>Set 0 for free
                        </span>
                      </div>
                      <select className="select">
                        <option>Select</option>
                        <option>Fixed</option>
                        <option>Percentage</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Discount Type<span className="text-danger"> *</span>
                      </label>
                      <div className="pass-group">
                        <select className="select">
                          <option>Select</option>
                          <option>Fixed</option>
                          <option>Percentage</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Discount<span className="text-danger"> *</span>
                      </label>
                      <div className="pass-group">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Limitations Invoices</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Max Customers</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Product</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Supplier</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6>Plan Modules</h6>
                      <div className="form-check d-flex align-items-center">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Select All
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Employees
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Invoices
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Reports
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Contacts
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Clients
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Estimates
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Goals
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Deals
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Projects
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Payments
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Assets
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Leads
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Tickets
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Taxes
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Activities
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" /> Pipelines
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 me-2 text-dark fw-medium">
                          Access Trial
                        </label>
                        <div className="form-check form-switch me-2">
                          <input className="form-check-input me-2" type="checkbox" role="switch" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center gx-3">
                    <div className="col-md-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-fill">
                          <label className="form-label">Trial Days</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-block align-items-center ms-3">
                        <label className="form-check-label mt-0 me-2  text-dark">
                          Is Recommended
                        </label>
                        <div className="form-check form-switch me-2">
                          <input className="form-check-input me-2" type="checkbox" role="switch" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Status<span className="text-danger"> *</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control"></textarea>
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
              <h6 className="mb-1">Delete Purchase Package</h6>
              <p className="mb-3">Are you sure, you want to delete purchase Package?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/packages-grid" className="btn btn-primary">
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

export default PackagesGrid;
