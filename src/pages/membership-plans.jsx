import React from 'react';

const MembershipPlans = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Membership</h6>
        </div>
      </div>
      <ul className="nav nav-tabs nav-bordered mb-3">
        <li className="nav-item">
          <Link className="nav-link active" href="/membership-plans">
            Membership Plans
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/membership-addons">
            Membership Add-ons
          </Link>
        </li>
      </ul>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h6 className="mb-1">Streamline your teamwork. Start free.</h6>
            <p>Choose the perfect plan for your business needs</p>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
            <div>
              <Link
                href="#"
                className="btn btn-primary d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#add_modal"
              >
                <i className="isax isax-add-circle5 me-1"></i>New Plan
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-0">
        <div className="d-flex align-center justify-content-center">
          <ul
            className="nav nav-tabs nav-solid-success nav-tabs-rounded mb-3 p-1 rounded-pill bg-light"
            role="tablist"
          >
            <li className="nav-item" data-bs-toggle="tooltip" data-placement="top" title="Save 20%">
              <Link className="nav-link active" href="#solid-rounded-tab1" data-bs-toggle="tab">
                Monthly
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#solid-rounded-tab2" data-bs-toggle="tab">
                Yearly
              </Link>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div className="tab-pane show active" id="solid-rounded-tab1">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                <div className="card pricing-starter flex-fill">
                  <div className="card-body">
                    <div className="border-bottom">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between position-relative">
                          <h5 className="mb-1">Free</h5>
                        </div>
                        <p>Best for personal use</p>
                      </div>
                      <div className="mb-3">
                        <h3 className="d-flex align-items-center mb-1">
                          $99<span className="fs-14 fw-normal text-gray-9 ms-1">/month</span>
                        </h3>
                        <p>For Only 1 User</p>
                      </div>
                    </div>
                    <div className="mt-3 mb-3">
                      <div className="mb-1">
                        <h6 className="fs-16 mb-2">What you get:</h6>
                      </div>
                      <div>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>1 Business Account + 1 User
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>14+ Invoice templates
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>Collect Online Payments
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>40+ Reports & Insights
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Variants
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>Add custom fields & charges
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Convert documents
                        </p>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="d-flex align-items-center justify-content-center btn border"
                    >
                      <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                <div className="card pricing-starter flex-fill">
                  <div className="card-body">
                    <div className="border-bottom">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between position-relative">
                          <h5 className="mb-1">Starter</h5>
                          <span className="badge bg-success position-absolute top-0 end-0">
                            Most Popular
                          </span>
                        </div>
                        <p>Best for personal use</p>
                      </div>
                      <div className="mb-3">
                        <h3 className="d-flex align-items-center mb-1">
                          $199<span className="fs-14 fw-normal text-gray-9 ms-1">/month</span>
                        </h3>
                        <p>Upto 10 User</p>
                      </div>
                    </div>
                    <div className="mt-3 mb-3">
                      <div className="mb-1">
                        <h6 className="fs-16 mb-2">What you get:</h6>
                      </div>
                      <div>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>1 Business Account + 2 User
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Bulk downloads
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>Multiple Price lists
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>User Activity
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Bulk edits
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>Multiple Warehouses
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Online Store
                        </p>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="d-flex align-items-center justify-content-center btn border"
                    >
                      <i className="isax isax-bill me-1"></i> Current Plan
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                <div className="card pricing-starter flex-fill">
                  <div className="card-body">
                    <div className="border-bottom">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between position-relative">
                          <h5 className="mb-1">Business</h5>
                        </div>
                        <p>Best for personal use</p>
                      </div>
                      <div className="mb-3">
                        <h3 className="d-flex align-items-center mb-1">
                          $399<span className="fs-14 fw-normal text-gray-9 ms-1">/month</span>
                        </h3>
                        <p>Upto 75 User</p>
                      </div>
                    </div>
                    <div className="mt-3 mb-3">
                      <div className="mb-1">
                        <h6 className="fs-16 mb-2">What you get:</h6>
                      </div>
                      <div>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>POS Billing
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Batch & Expiry
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>Serial Number/ IMEI Tracking
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>Subscription/ Recurring
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Product Grouping
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Additional CESS
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Bank Reconciliation
                        </p>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="d-flex align-items-center justify-content-center btn border"
                    >
                      <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                <div className="card pricing-starter flex-fill">
                  <div className="card-body">
                    <div className="border-bottom">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between position-relative">
                          <h5 className="mb-1">Enterprise</h5>
                        </div>
                        <p>Best for personal use</p>
                      </div>
                      <div className="mb-3">
                        <h3 className="d-flex align-items-center mb-1">
                          $599<span className="fs-14 fw-normal text-gray-9 ms-1">/month</span>
                        </h3>
                        <p>Unlimited Users</p>
                      </div>
                    </div>
                    <div className="mt-3 mb-3">
                      <div className="mb-1">
                        <h6 className="fs-16 mb-2">What you get:</h6>
                      </div>
                      <div>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Add Custom Features
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Custom Column Linking
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>Multiple Businesses
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Online Store
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Shiprocket Integration
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Multiple Users
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Multiple Warehouses
                        </p>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="d-flex align-items-center justify-content-center btn border"
                    >
                      <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="solid-rounded-tab2">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                <div className="card pricing-starter flex-fill">
                  <div className="card-body">
                    <div className="border-bottom">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between position-relative">
                          <h5 className="mb-1">Free</h5>
                        </div>
                        <p>Best for personal use</p>
                      </div>
                      <div className="mb-3">
                        <h3 className="d-flex align-items-center mb-1">
                          $699<span className="fs-14 fw-normal text-gray-9 ms-1">/year</span>
                        </h3>
                        <p>For Only 1 User</p>
                      </div>
                    </div>
                    <div className="mt-3 mb-3">
                      <div className="mb-1">
                        <h6 className="fs-16 mb-2">What you get:</h6>
                      </div>
                      <div>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>1 Business Account + 1 User
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>14+ Invoice templates
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>Collect Online Payments
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>40+ Reports & Insights
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Variants
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>Add custom fields & charges
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Convert documents
                        </p>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="d-flex align-items-center justify-content-center btn border"
                    >
                      <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                <div className="card pricing-starter flex-fill">
                  <div className="card-body">
                    <div className="border-bottom">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between position-relative">
                          <h5 className="mb-1">Starter</h5>
                          <span className="badge badge-success position-absolute top-0 end-0">
                            Most Popular
                          </span>
                        </div>
                        <p>Best for personal use</p>
                      </div>
                      <div className="mb-3">
                        <h3 className="d-flex align-items-center mb-1">
                          $799<span className="fs-14 fw-normal text-gray-9 ms-1">/year</span>
                        </h3>
                        <p>Upto 10 User</p>
                      </div>
                    </div>
                    <div className="mt-3 mb-3">
                      <div className="mb-1">
                        <h6 className="fs-16 mb-2">What you get:</h6>
                      </div>
                      <div>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>1 Business Account + 2 User
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Bulk downloads
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Multiple Price lists
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>User Activity
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Bulk edits
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Multiple Warehouses
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Online Store
                        </p>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="d-flex align-items-center justify-content-center btn border"
                    >
                      <i className="isax isax-bill me-1"></i> Current Plan
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                <div className="card pricing-starter flex-fill">
                  <div className="card-body">
                    <div className="border-bottom">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between position-relative">
                          <h5 className="mb-1">Business</h5>
                        </div>
                        <p>Best for personal use</p>
                      </div>
                      <div className="mb-3">
                        <h3 className="d-flex align-items-center mb-1">
                          $899<span className="fs-14 fw-normal text-gray-9 ms-1">/year</span>
                        </h3>
                        <p>Upto 75 User</p>
                      </div>
                    </div>
                    <div className="mt-3 mb-3">
                      <div className="mb-1">
                        <h6 className="fs-16 mb-2">What you get:</h6>
                      </div>
                      <div>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>POS Billing
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Batch & Expiry
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>Serial Number/ IMEI Tracking
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Subscription/ Recurring
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Product Grouping
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Additional CESS
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Bank Reconciliation
                        </p>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="d-flex align-items-center justify-content-center btn border"
                    >
                      <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                <div className="card pricing-starter flex-fill">
                  <div className="card-body">
                    <div className="border-bottom">
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between position-relative">
                          <h5 className="mb-1">Enterprise</h5>
                        </div>
                        <p>Best for personal use</p>
                      </div>
                      <div className="mb-3">
                        <h3 className="d-flex align-items-center mb-1">
                          $999<span className="fs-14 fw-normal text-gray-9 ms-1">/year</span>
                        </h3>
                        <p>Unlimited Users</p>
                      </div>
                    </div>
                    <div className="mt-3 mb-3">
                      <div className="mb-1">
                        <h6 className="fs-16 mb-2">What you get:</h6>
                      </div>
                      <div>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Add Custom Features
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Custom Column Linking
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2 text-truncate">
                          <i className="isax isax-tick-circle me-2"></i>Multiple Businesses
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Online Store
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Shiprocket Integration
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Multiple Users
                        </p>
                        <p className="text-dark d-flex align-items-center mb-2">
                          <i className="isax isax-tick-circle me-2"></i>Multiple Warehouses
                        </p>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="d-flex align-items-center justify-content-center btn border"
                    >
                      <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="add_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Plan</h4>
              <button
                type="button"
                className="btn-close custom-btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body">
                <div className="border-bottom mb-3">
                  <h5 className="form-title mb-3">Basic Details</h5>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Plan Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Monthly Price</label>
                        <input type="text" className="form-control" />
                        <span className="me-2">
                          <i className="isax isax-info-circle"></i>
                        </span>
                        <span>Set 0 for free</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Yearly Price</label>
                        <input type="text" className="form-control" />
                        <span className="me-2">
                          <i className="isax isax-info-circle"></i>
                        </span>
                        <span>Set 0 for free</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 mb-0">
                  <h5 className="form-title mb-3">Plan Settings</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Services</label>
                        <div className="align-center">
                          <input type="text" className="form-control" placeholder="1-100" />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <label className="custom_check">
                            <input type="checkbox" name="invoice" />
                            <span className="checkmark"></span>
                            <span>Unlimited</span>
                          </label>
                          <div className="form-check form-check-md form-switch mt-2">
                            <label className="form-check-label form-label m-0">
                              <input
                                className="form-check-input form-label"
                                type="checkbox"
                                role="switch"
                                checked
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Appointments</label>
                        <div className="align-center">
                          <input type="text" className="form-control" placeholder="1-100" />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <label className="custom_check">
                            <input type="checkbox" name="invoice" />
                            <span className="checkmark"></span>
                            <span>Unlimited</span>
                          </label>
                          <div className="form-check form-check-md form-switch mt-2">
                            <label className="form-check-label form-label m-0">
                              <input
                                className="form-check-input form-label"
                                type="checkbox"
                                role="switch"
                                checked
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Staffs</label>
                        <div className="align-center">
                          <input type="text" className="form-control" placeholder="1-100" />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <label className="custom_check">
                            <input type="checkbox" name="invoice" />
                            <span className="checkmark"></span>
                            <span>Unlimited</span>
                          </label>
                          <div className="form-check form-check-md form-switch mt-2">
                            <label className="form-check-label form-label m-0">
                              <input
                                className="form-check-input form-label"
                                type="checkbox"
                                role="switch"
                                checked
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Gallery</label>
                        <div className="align-center">
                          <input type="text" className="form-control" placeholder="1-100" />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <label className="custom_check">
                            <input type="checkbox" name="invoice" />
                            <span className="checkmark"></span>
                            <span>Unlimited</span>
                          </label>
                          <div className="form-check form-check-md form-switch mt-2">
                            <label className="form-check-label form-label m-0">
                              <input
                                className="form-check-input form-label"
                                type="checkbox"
                                role="switch"
                                checked
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Additional Service</label>
                        <div className="align-center">
                          <input type="text" className="form-control" placeholder="1-100" />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <label className="custom_check">
                            <input type="checkbox" name="invoice" />
                            <span className="checkmark"></span>
                            <span>Unlimited</span>
                          </label>
                          <div className="form-check form-check-md form-switch mt-2">
                            <label className="form-check-label form-label m-0">
                              <input
                                className="form-check-input form-label"
                                type="checkbox"
                                role="switch"
                                checked
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center justify-content-between mt-4">
                        <label className="form-label">Booking Option</label>
                        <div className="d-flex align-items-center">
                          <div className="form-check form-check-md form-switch mt-2">
                            <label className="form-check-label form-label m-0">
                              <input
                                className="form-check-input form-label"
                                type="checkbox"
                                role="switch"
                                checked
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembershipPlans;
