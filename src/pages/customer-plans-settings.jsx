import React from 'react';
import { Link } from 'react-router-dom';

const CustomerPlansSettings = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-11">
          <div className="row settings-wrapper d-flex">
            <div className="col-xxl-3 col-lg-4">
              <div className="card settings-card">
                <div className="card-header">
                  <h6 className="mb-0">Settings</h6>
                </div>
                <div className="card-body">
                  <div className="sidebars settings-sidebar">
                    <div className="sidebar-inner">
                      <div className="sidebar-menu p-0">
                        <ul>
                          <li>
                            <Link to="/customer-account-settings"
                              className="fs-14 fw-medium d-flex align-items-center"
                            >
                              <i className="isax isax-user-octagon fs-18 me-1"></i>Account Settings
                            </Link>
                          </li>
                          <li>
                            <Link to="/customer-security-settings"
                              className="fs-14 fw-medium d-flex align-items-center"
                            >
                              <i className="isax isax-security-safe fs-18 me-1"></i>Security
                            </Link>
                          </li>
                          <li>
                            <Link to="/customer-plans-settings"
                              className="active fs-14 fw-medium d-flex align-items-center"
                            >
                              <i className="isax isax-transaction-minus fs-18 me-1"></i>Plans &
                              Billings
                            </Link>
                          </li>
                          <li>
                            <Link to="/customer-notification-settings"
                              className="fs-14 fw-medium d-flex align-items-center"
                            >
                              <i className="isax isax-notification fs-18 me-1"></i>Notifications
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-9 col-lg-8">
              <div className="mb-3">
                <div className="pb-3 border-bottom mb-3">
                  <h6 className="mb-0">Plans & Billings</h6>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                    <i className="isax isax-info-circle fs-14"></i>
                  </span>
                  <h6 className="fs-16 fw-semibold">Current Plan Information</h6>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                  <div className="mb-3">
                    <div className="card shadow-none">
                      <div className="card-body">
                        <div className="mb-0">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h6 className="fw-bold mb-2">Basic Plan</h6>
                              <div className="progress-container">
                                <svg className="progress-circle me-2" viewBox="0 0 36 36">
                                  <circle className="progress-bar" cx="18" cy="18" r="16"></circle>
                                  <circle
                                    className="progress-bar-fill"
                                    cx="18"
                                    cy="18"
                                    r="16"
                                  ></circle>
                                </svg>
                                <span>20 Days Left</span>
                              </div>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="btn btn-primary btn-md"
                                data-bs-toggle="modal"
                                data-bs-target="#upgrade"
                              >
                                <i className="ti ti-crown me-1"></i> Upgrade
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-3">
                      <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                        <i className="isax isax-card fs-14"></i>
                      </span>
                      <h6 className="fs-16 fw-semibold">Saved Cards</h6>
                    </div>
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="card shadow-none">
                          <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                              <Link href="#">
                                <img
                                  src="/assets/img/settings/payment-icon-01.svg"
                                  className="img-fluid me-2"
                                  alt="clock"
                                />
                              </Link>
                              <div>
                                <span className="fs-12">James Peterson</span>
                                <h6 className="fs-14 fw-medium mb-1">Visa •••• 1568</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <Link href="#" className="badge bg-success">
                                Default
                              </Link>
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="avatar bg-light text-dark avatar-md border rounded-circle me-2"
                                >
                                  <i className="isax isax-edit text-gray"></i>
                                </Link>
                                <Link href="#"
                                  className="avatar bg-light text-dark avatar-md border rounded-circle"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_card"
                                >
                                  <i className="isax isax-trash text-gray"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="card shadow-none">
                          <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                              <Link href="#">
                                <img
                                  src="/assets/img/settings/payment-icon-02.svg"
                                  className="img-fluid me-2"
                                  alt="clock"
                                />
                              </Link>
                              <div>
                                <span className="fs-12">Raymond Rowley</span>
                                <h6 className="fs-14 fw-medium mb-1">Mastercard •••• 1279</h6>
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <Link href="#" className="text-primary text-decoration-underline">
                                Set as Default
                              </Link>
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="avatar bg-light text-dark avatar-md border rounded-circle me-2"
                                >
                                  <i className="isax isax-edit text-gray"></i>
                                </Link>
                                <Link href="#"
                                  className="avatar bg-light text-dark avatar-md border rounded-circle"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_card"
                                >
                                  <i className="isax isax-trash text-gray"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-3">
                      <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                        <i className="isax isax-transaction-minus fs-14"></i>
                      </span>
                      <h6 className="fs-16 fw-semibold">Transactions</h6>
                    </div>
                    <div className="row">
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
                                className="btn btn-outline-white d-inline-flex align-items-center"
                                data-bs-toggle="dropdown"
                              >
                                <i className="isax isax-export-1 me-1"></i>Export
                              </Link>
                              <ul className="dropdown-menu">
                                <li>
                                  <Link className="dropdown-item" href="#">
                                    Download as PDF
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" href="#">
                                    Download as Excel
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive no-pagination">
                        <table className="table table-nowrap datatable">
                          <thead className="thead-light">
                            <tr>
                              <th>Plan Name</th>
                              <th>Amount</th>
                              <th>Purchased Date</th>
                              <th>End Date</th>
                              <th>Status</th>
                              <th className="no-sort"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <p className="text-dark">Basic</p>
                              </td>
                              <td>$99</td>
                              <td>22 Feb 2025</td>
                              <td>22 Mar 2025</td>
                              <td>
                                <span className="badge badge-soft-success d-inline-flex align-items-center">
                                  Completed
                                  <i className="isax isax-tick-circle ms-1"></i>
                                </span>
                              </td>
                              <td className="action-item">
                                <Link href="#" data-bs-toggle="dropdown">
                                  <i className="isax isax-more"></i>
                                </Link>
                                <ul className="dropdown-menu">
                                  <li>
                                    <Link href="#" className="dropdown-item d-flex align-items-center">
                                      <i className="isax isax-edit me-2"></i>Edit
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="#"
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
                                <p className="text-dark">Premium</p>
                              </td>
                              <td>$199</td>
                              <td>22 Jan 2025</td>
                              <td>22 Feb 2025</td>
                              <td>
                                <span className="badge badge-soft-success d-inline-flex align-items-center">
                                  Completed
                                  <i className="isax isax-tick-circle ms-1"></i>
                                </span>
                              </td>
                              <td className="action-item">
                                <Link href="#" data-bs-toggle="dropdown">
                                  <i className="isax isax-more"></i>
                                </Link>
                                <ul className="dropdown-menu">
                                  <li>
                                    <Link href="#" className="dropdown-item d-flex align-items-center">
                                      <i className="isax isax-edit me-2"></i>Edit
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="#"
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
                                <p className="text-dark">Enterprise</p>
                              </td>
                              <td>$299</td>
                              <td>22 Dec 2025</td>
                              <td>22 Jan 2025</td>
                              <td>
                                <span className="badge badge-soft-success d-inline-flex align-items-center">
                                  Completed
                                  <i className="isax isax-tick-circle ms-1"></i>
                                </span>
                              </td>
                              <td className="action-item">
                                <Link href="#" data-bs-toggle="dropdown">
                                  <i className="isax isax-more"></i>
                                </Link>
                                <ul className="dropdown-menu">
                                  <li>
                                    <Link href="#" className="dropdown-item d-flex align-items-center">
                                      <i className="isax isax-edit me-2"></i>Edit
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="#"
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
                                <p className="text-dark">Premium</p>
                              </td>
                              <td>$199</td>
                              <td>22 Nov 2025</td>
                              <td>22 Dec 2025</td>
                              <td>
                                <span className="badge badge-soft-success d-inline-flex align-items-center">
                                  Completed
                                  <i className="isax isax-tick-circle ms-1"></i>
                                </span>
                              </td>
                              <td className="action-item">
                                <Link href="#" data-bs-toggle="dropdown">
                                  <i className="isax isax-more"></i>
                                </Link>
                                <ul className="dropdown-menu">
                                  <li>
                                    <Link href="#" className="dropdown-item d-flex align-items-center">
                                      <i className="isax isax-edit me-2"></i>Edit
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="#"
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
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <button type="button" className="btn btn-outline-white">
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
        </div>
      </div>
      <div className="modal fade" id="upgrade">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body pb-0">
              <div>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <p className="mb-0 me-2">Monthly</p>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                  </div>
                  <p>Yearly</p>
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="card border rounded mb-3">
                      <div className="card-body">
                        <div className="pricing-content mb-3">
                          <div className="mb-3">
                            <h6 className="fs-14">Basic</h6>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <h3>
                              $99<span className="fs-14 fw-normal text-gray me-2">/month</span>
                            </h3>
                            <span className="badge badge-sm bg-info text-white p-1 border rounded text-truncate">
                              Only 10 Users
                            </span>
                          </div>
                          <p className="mb-2 text-truncate line-clamb-2">
                            Best for Freelancers & small businesses needs simple invoicing.
                          </p>
                          <Link href="#"
                            className="d-flex align-items-center justify-content-center btn border taxt-gray-100 rounded w-100 mb-3"
                            data-bs-toggle="modal"
                            data-bs-target="#checkout"
                          >
                            <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                          </Link>
                          <div className="price-hdr">
                            <h6 className="fs-14 fw-medium text-gray me-2 ms-2">Features</h6>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>1 Business
                              Account + 1 User
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              14+ Invoice templates
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Collect Online Payments
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              40+ Reports & Insights
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Variants
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Add custom fields & charges
                            </span>
                            <span className="text-dark d-flex align-items-center mb-0">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Convert documents
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="card border rounded mb-3">
                      <div className="card-body">
                        <div className="pricing-content mb-3">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h6 className="fs-14">Standard</h6>
                            <span className="badge bg-primary text-white">Most Popular</span>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <h3>
                              $199<span className="fs-14 fw-normal text-gray me-2">/month</span>
                            </h3>
                            <span className="badge badge-sm bg-info text-white p-1 border rounded text-truncate">
                              Only 50 Users
                            </span>
                          </div>
                          <p className="mb-2 text-truncate line-clamb-2">
                            Growing businesses managing recurring invoices & reports.
                          </p>
                          <Link href="#"
                            className="d-flex align-items-center justify-content-center btn bg-primary border text-white rounded w-100 mb-3"
                          >
                            <i className="isax isax-bill me-1"></i> Current Plan
                          </Link>
                          <div className="price-hdr">
                            <h6 className="fs-14 fw-medium text-gray me-2 ms-2">Features</h6>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>1 Business
                              Account + 1 User
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Bulk downloads
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Multiple Price lists
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              User Activity
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Bulk edits
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Multiple Warehouses
                            </span>
                            <span className="text-dark d-flex align-items-center mb-0">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Online Store
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="card border rounded mb-3">
                      <div className="card-body">
                        <div className="pricing-content mb-3">
                          <div className="mb-3">
                            <h6 className="fs-14">Business</h6>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <h3>
                              $299<span className="fs-14 fw-normal text-gray me-2">/month</span>
                            </h3>
                            <span className="badge badge-sm bg-info text-white p-1 border rounded text-truncate">
                              Only 75 Users
                            </span>
                          </div>
                          <p className="mb-2 text-truncate line-clamb-2">
                            Best for Large sales teams requiring automation & integrations.
                          </p>
                          <Link href="#"
                            className="d-flex align-items-center justify-content-center btn border taxt-gray-100 rounded w-100 mb-3"
                            data-bs-toggle="modal"
                            data-bs-target="#checkout"
                          >
                            <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                          </Link>
                          <div className="price-hdr">
                            <h6 className="fs-14 fw-medium text-gray me-2 ms-2">Features</h6>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              POS Billing
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Batch & Expiry
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Serial Number/ IMEI Tracking
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Subscription/ Recurring
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Product Grouping
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Additional CESS
                            </span>
                            <span className="text-dark d-flex align-items-center mb-0">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Bank Reconciliation
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="card border rounded mb-3">
                      <div className="card-body">
                        <div className="pricing-content mb-3">
                          <div className="mb-3">
                            <h6 className="fs-14">Enterprice</h6>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <h3>
                              $399<span className="fs-14 fw-normal text-gray me-2">/month</span>
                            </h3>
                            <span className="badge badge-sm bg-info text-white p-1 border rounded text-truncate">
                              Unlimited
                            </span>
                          </div>
                          <p className="mb-2 text-truncate line-clamb-2">
                            Enterprises with AI insights & advanced workflows.
                          </p>
                          <Link href="#"
                            className="d-flex align-items-center justify-content-center btn border taxt-gray-100 rounded w-100 mb-3"
                            data-bs-toggle="modal"
                            data-bs-target="#checkout"
                          >
                            <i className="isax isax-shopping-cart me-1"></i> Buy Plan
                          </Link>
                          <div className="price-hdr">
                            <h6 className="fs-14 fw-medium text-gray me-2 ms-2">Features</h6>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Add Custom Features
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Custom Column Linking
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Multi Businesses / Branches
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Online Store
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Shiprocket Integration
                            </span>
                            <span className="text-dark d-flex align-items-center mb-2">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Multiple Users
                            </span>
                            <span className="text-dark d-flex align-items-center mb-0">
                              <i className="isax isax-tick-circle5 text-success me-2"></i>
                              Multiple Warehouses
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="checkout">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Checkout</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <div className="d-flex align-items-center mb-3">
                  <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                    <i className="isax isax-info-circle fs-14"></i>
                  </span>
                  <h6 className="fs-16 fw-semibold">General Information</h6>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="border-bottom mb-3">
                      <div className="row gx-3">
                        <div className="col-lg-6 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              First Name<span className="text-danger ms-1">*</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Last Name<span className="text-danger ms-1">*</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Email<span className="text-danger ms-1">*</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Mobile Number<span className="text-danger ms-1">*</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-bottom mb-3">
                      <div className="d-flex align-items-center mb-3">
                        <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                          <i className="isax isax-info-circle fs-14"></i>
                        </span>
                        <h6 className="fs-16 fw-semibold">Address Information</h6>
                      </div>
                      <div className="row gx-3">
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">County</label>
                            <select className="select">
                              <option>Select</option>
                              <option>United States of America</option>
                              <option>Canada</option>
                              <option>Germany</option>
                              <option>France</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">State</label>
                            <select className="select">
                              <option>Select</option>
                              <option>California</option>
                              <option>New York</option>
                              <option>Texas</option>
                              <option>Florida</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">City</label>
                            <select className="select">
                              <option>Select</option>
                              <option>Los Angeles</option>
                              <option>New York</option>
                              <option>Fresno</option>
                              <option>San Francisco</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Postal Code</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="d-flex flex-column justify-content-between flex-fill">
                      <div className="card shadow-none mb-0">
                        <div className="card-header">
                          <h6 className="fw-bold">Subscription Details</h6>
                        </div>
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span>Plan Name:</span>
                            <h6 className="fw-medium">Basic</h6>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span>Plan Amount:</span>
                            <h6 className="fw-medium">$99.00</h6>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span>Tax:</span>
                            <h6 className="fw-medium">$0.00</h6>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <span>Total:</span>
                            <h6 className="fw-medium">$99.00</h6>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="bg-success-100 p-2 d-flex align-items-center justify-content-center mb-3">
                          <i className="isax isax-security-safe5 text-success fs-40 me-2"></i>
                          <div>
                            <p className="text-dark fw-semibold mb-0">100% Cashback Guarantee</p>
                            <p className="fs-13">We Protect Your Money</p>
                          </div>
                        </div>
                        <Link href="#"
                          className="btn btn-primary w-100 mb-3"
                          data-bs-toggle="modal"
                          data-bs-target="#success_modal"
                        >
                          Pay $99.00
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="success_modal" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center p-3">
                <span className="avatar avatar-lg avatar-rounded bg-success mb-3">
                  <i className="isax isax-tick-circle fs-24"></i>
                </span>
                <h5 className="mb-2 fw-bold">Payment Successfully</h5>
                <p className="mb-3">
                  Your purchase of the Basic Plan has been completed with Reference Number{' '}
                  <Link href="#">#12559845</Link>
                </p>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Link to="/customer-plans-settings" className="btn btn-md btn-white">
                    Back to Plan
                  </Link>
                  <Link href="#"
                    className="btn btn-md btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#purchase-details"
                  >
                    Purchase Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="purchase-details" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Preview</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form action="#">
              <div className="modal-body">
                <div className="row">
                  <div className="mx-auto">
                    <div>
                      <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-3 mb-3">
                        <div className="d-flex align-items-center flex-wrap row-gap-3">
                          <Link href="#"
                            className="btn btn-outline-white d-inline-flex align-items-center me-3"
                          >
                            <i className="isax isax-document-like me-1"></i>Download PDF
                          </Link>
                          <Link href="#"
                            className="btn btn-outline-white d-inline-flex align-items-center me-3"
                          >
                            <i className="isax isax-message-notif me-1"></i>Send Email
                          </Link>
                          <Link href="#"
                            className="btn btn-outline-white d-inline-flex align-items-center me-3"
                          >
                            <i className="isax isax-printer me-1"></i>Print
                          </Link>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-body">
                          <div className="bg-light p-4 rounded position-relative mb-3">
                            <div className="position-absolute top-0 end-0">
                              <img src="/assets/img/bg/card-bg.png" alt="User Img" />
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap mb-3 pb-2">
                              <div className="mb-3">
                                <h4 className="mb-1">Invoice</h4>
                                <div className="d-flex align-items-center flex-wrap row-gap-3">
                                  <div className="me-4">
                                    <h6 className="fs-14 fw-semibold mb-1">
                                      Dreams Technologies Pvt Ltd.,
                                    </h6>
                                    <p>15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom</p>
                                  </div>
                                  <span>
                                    <img
                                      src="/assets/img/icons/not-paid.png"
                                      alt="User Img"
                                      width="48"
                                      height="48"
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className="mb-3">
                                <img
                                  src="/assets/img/invoice-logo.svg"
                                  className="invoice-logo-dark"
                                  alt="img"
                                />
                                <img
                                  src="/assets/img/invoice-logo-white-2.svg"
                                  className="invoice-logo-white"
                                  alt="img"
                                />
                              </div>
                            </div>
                            <div className="row gy-3">
                              <div className="col-lg-4">
                                <div>
                                  <h6 className="mb-2 fs-16 fw-semibold">Invoice Details</h6>
                                  <div>
                                    <p className="mb-1">
                                      Invoice Number : <span className="text-dark">INV215654</span>
                                    </p>
                                    <p className="mb-1">
                                      Issued On : <span className="text-dark">25 Jan 2025</span>
                                    </p>
                                    <p className="mb-1">
                                      Due Date : <span className="text-dark">31 Jan 2025</span>
                                    </p>
                                    <p className="mb-1">
                                      Recurring Invoice : <span className="text-dark">Monthly</span>
                                    </p>
                                    <span className="badge bg-danger">Due in 8 days</span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div>
                                  <h6 className="mb-2 fs-16 fw-semibold">Billing From</h6>
                                  <div>
                                    <h6 className="fs-14 fw-semibold mb-1">
                                      Kanakku Invoice Management
                                    </h6>
                                    <p className="mb-1">15 Hodges Mews, HP12 3JL, United Kingdom</p>
                                    <p className="mb-1">Phone : +1 54664 75945</p>
                                    <p className="mb-1">Email : </p>
                                    <p className="mb-1">GST : 243E45767889</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div>
                                  <h6 className="mb-2 fs-16 fw-semibold">Billing To</h6>
                                  <div className="bg-white rounded p-3">
                                    <div className="d-flex align-items-center mb-1">
                                      <div>
                                        <span className="avatar avatar-lg flex-shrink-0 me-2">
                                          <img src="/assets/img/billing-icon.jpg" alt="User Img" />
                                        </span>
                                      </div>
                                      <p className="fs-14 fw-semibold text-dark">Timesquare Tech</p>
                                    </div>
                                    <p className="mb-1">299 Star Trek Drive, Florida, 3240, USA</p>
                                    <p className="mb-1">Phone : +1 54664 75945</p>
                                    <p className="mb-1">Email : </p>
                                    <p className="mb-1">GST : 243E45767889</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <h6 className="mb-3">Product / Service Items</h6>
                            <div className="table-responsive rounded border-bottom-0 border">
                              <table className="table">
                                <thead className="thead-dark">
                                  <tr>
                                    <th>#</th>
                                    <th>Plan Name</th>
                                    <th>Rate</th>
                                    <th>Discount</th>
                                    <th>Tax</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td className="text-dark">Basic</td>
                                    <td>$99.00</td>
                                    <td>0%</td>
                                    <td>$0.00</td>
                                    <td>$99.00</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="border-bottom mb-3">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                                  <div className="me-3">
                                    <p className="mb-2">Scan to the pay</p>
                                    <span>
                                      <img src="/assets/img/icons/qr.png" alt="User Img" />
                                    </span>
                                  </div>
                                  <div>
                                    <h6 className="mb-2">Bank Details</h6>
                                    <div>
                                      <p className="mb-1">
                                        Bank Name : <span className="text-dark">ABC Bank</span>
                                      </p>
                                      <p className="mb-1">
                                        Account Number :{' '}
                                        <span className="text-dark">782459739212</span>
                                      </p>
                                      <p className="mb-1">
                                        IFSC Code : <span className="text-dark">ABC0001345</span>
                                      </p>
                                      <p className="mb-0">
                                        Payment Reference :{' '}
                                        <span className="text-dark">INV-20250220-001</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h6 className="fs-14 fw-semibold">Amount</h6>
                                    <h6 className="fs-14 fw-semibold">$99.00</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h6 className="fs-14 fw-semibold">CGST (0%)</h6>
                                    <h6 className="fs-14 fw-semibold">$0.00</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h6 className="fs-14 fw-semibold">SGST (0%)</h6>
                                    <h6 className="fs-14 fw-semibold">$0.00</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                                    <h6 className="fs-14 fw-semibold">Discount (0%)</h6>
                                    <h6 className="fs-14 fw-semibold text-danger">- $0</h6>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                                    <h6>Total (USD)</h6>
                                    <h6>$99.00</h6>
                                  </div>
                                  <div>
                                    <h6 className="fs-14 fw-semibold mb-1">Total In Words</h6>
                                    <p>Ninety Nine Dollars</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-light d-flex align-items-center justify-content-between p-4 rounded card-bg">
                            <div>
                              <h6 className="fs-14 fw-semibold mb-1">
                                Dreams Technologies Pvt Ltd.,
                              </h6>
                              <p>15 Hodges Mews, High Wycombe HP12 3JL, United Kingdom</p>
                            </div>
                            <div>
                              <img
                                src="/assets/img/invoice-logo.svg"
                                className="invoice-logo-dark"
                                alt="img"
                              />
                              <img
                                src="/assets/img/invoice-logo-white-2.svg"
                                className="invoice-logo-white"
                                alt="img"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
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
              <h6 className="mb-1">Delete Plan</h6>
              <p className="mb-3">Are you sure, you want to delete Plan?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/customer-plans-settings" className="btn btn-primary">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="delete_card">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Cards</h6>
              <p className="mb-3">Are you sure, you want to delete Card?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/customer-plans-settings" className="btn btn-primary">
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

export default CustomerPlansSettings;
