import React from 'react';
import { Link } from 'react-router-dom';

const LanguageSetting2 = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-12">
          <div className="row settings-wrapper d-flex">
            <div className="col-xl-3 col-lg-4">
              <div className="card settings-card">
                <div className="card-header">
                  <h6 className="mb-0">Settings</h6>
                </div>
                <div className="card-body">
                  <div className="sidebars settings-sidebar">
                    <div className="sidebar-inner">
                      <div className="sidebar-menu p-0">
                        <ul>
                          <li className="submenu-open">
                            <ul>
                              <li className="submenu">
                                <Link href="#">
                                  <i className="isax isax-setting-2 fs-18"></i>
                                  <span className="fs-14 fw-medium ms-2">General Settings</span>
                                  <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                                </Link>
                                <ul>
                                  <li>
                                    <Link to="/account-settings">Account Settings</Link>
                                  </li>
                                  <li>
                                    <Link to="/security-settings">Security</Link>
                                  </li>
                                  <li>
                                    <Link to="/plans-billings">Plans & Billing</Link>
                                  </li>
                                  <li>
                                    <Link to="/notifications-settings">Notifications</Link>
                                  </li>
                                  <li>
                                    <Link to="/integrations-settings">Integrations</Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="submenu">
                                <Link href="#" className="active subdrop">
                                  <i className="isax isax-global fs-18"></i>
                                  <span className="fs-14 fw-medium ms-2">Website Settings</span>
                                  <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                                </Link>
                                <ul>
                                  <li>
                                    <Link to="/company-settings">Company Settings</Link>
                                  </li>
                                  <li>
                                    <Link to="/localization-settings">Localization</Link>
                                  </li>
                                  <li>
                                    <Link to="/prefixes-settings">Prefixes</Link>
                                  </li>
                                  <li>
                                    <Link to="/preference-settings">Preference</Link>
                                  </li>
                                  <li>
                                    <Link to="/seo-setup">SEO Setup</Link>
                                  </li>
                                  <li>
                                    <Link to="/language-settings" className="active">
                                      Language
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/maintenance-mode">Maintenance Mode</Link>
                                  </li>
                                  <li>
                                    <Link to="/authentication-settings">Authentication</Link>
                                  </li>
                                  <li>
                                    <Link to="/ai-configuration">AI Configuration</Link>
                                  </li>
                                  <li>
                                    <Link to="/appearance-settings">Appearance</Link>
                                  </li>
                                  <li>
                                    <Link to="/plugin-manager">Plugin Manager</Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="submenu">
                                <Link href="#">
                                  <i className="isax isax-shapes fs-18"></i>
                                  <span className="fs-14 fw-medium ms-2">App Settings</span>
                                  <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                                </Link>
                                <ul>
                                  <li>
                                    <Link to="/invoice-settings">Invoice Settings</Link>
                                  </li>
                                  <li>
                                    <Link to="/invoice-templates-settings">Invoice Templates</Link>
                                  </li>
                                  <li>
                                    <Link to="/esignatures">eSignatures</Link>
                                  </li>
                                  <li>
                                    <Link to="/barcode-settings">Barcode</Link>
                                  </li>
                                  <li>
                                    <Link to="/thermal-printer">Thermal Printer</Link>
                                  </li>
                                  <li>
                                    <Link to="/custom-fields">Custom Fields</Link>
                                  </li>
                                  <li>
                                    <Link to="/sass-settings">SaaS Settings</Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="submenu">
                                <Link href="#">
                                  <i className="isax isax-money-3 fs-18"></i>
                                  <span className="fs-14 fw-medium ms-2">Finance Settings</span>
                                  <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                                </Link>
                                <ul>
                                  <li>
                                    <Link to="/payment-methods">Payment Methods</Link>
                                  </li>
                                  <li>
                                    <Link to="/bank-accounts-settings">Bank Accounts</Link>
                                  </li>
                                  <li>
                                    <Link to="/tax-rates">Tax Rates</Link>
                                  </li>
                                  <li>
                                    <Link to="/currencies">Currencies</Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="submenu">
                                <Link href="#">
                                  <i className="isax isax-more-2 fs-18"></i>
                                  <span className="fs-14 fw-medium ms-2">System Settings</span>
                                  <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                                </Link>
                                <ul>
                                  <li>
                                    <Link to="/email-settings">Email Settings</Link>
                                  </li>
                                  <li>
                                    <Link to="/email-templates">Email Templates</Link>
                                  </li>
                                  <li>
                                    <Link to="/sms-gateways">SMS Gateways</Link>
                                  </li>
                                  <li>
                                    <Link to="/gdpr-cookies">GDPR Cookies</Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="submenu">
                                <Link href="#">
                                  <i className="isax isax-document fs-18"></i>
                                  <span className="fs-14 fw-medium ms-2">Other Settings</span>
                                  <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                                </Link>
                                <ul>
                                  <li>
                                    <Link to="/custom-css">Custom CSS</Link>
                                  </li>
                                  <li>
                                    <Link to="/custom-js">Custom JS</Link>
                                  </li>
                                  <li>
                                    <Link to="/sitemap">Sitemap</Link>
                                  </li>
                                  <li>
                                    <Link to="/clear-cache">Clear Cache</Link>
                                  </li>
                                  <li>
                                    <Link to="/storage">Storage</Link>
                                  </li>
                                  <li>
                                    <Link to="/cronjob">Cronjob</Link>
                                  </li>
                                  <li>
                                    <Link to="/system-backup">System Backup</Link>
                                  </li>
                                  <li>
                                    <Link to="/database-backup">Database Backup</Link>
                                  </li>
                                  <li>
                                    <Link to="/system-update">System Update</Link>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="mb-3 pb-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-3">
                <h6 className="fw-bold mb-0">Language</h6>
                <div className="d-flex align-items-center">
                  <div className="dropdown me-2">
                    <Link href="#"
                      className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                    >
                      <i className="isax isax-language-square me-1"></i>
                      Language
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-lg p-2">
                      <li>
                        <label className="dropdown-item d-flex align-items-center rounded-1">
                          English
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item d-flex align-items-center rounded-1">
                          German
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item d-flex align-items-center rounded-1">
                          Arabic
                        </label>
                      </li>
                      <li>
                        <label className="dropdown-item d-flex align-items-center rounded-1">
                          French
                        </label>
                      </li>
                    </ul>
                  </div>
                  <Link href="#"
                    className="btn btn-primary d-inline-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#add_language"
                  >
                    <i className="isax isax-add-circle5 me-1"></i>
                    New Language
                  </Link>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between mb-3 gap-2 flex-wrap">
                <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                  <div className="input-icon-start position-relative me-2">
                    <span className="input-icon-addon">
                      <i className="isax isax-search-normal"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-sm bg-white"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <Link href="#" className="btn btn-outline-white d-inline-flex align-items-center">
                  <i className="isax isax-arrow-left me-1"></i>
                  Back to Translations
                </Link>
              </div>

              <div className="custom-datatable-filter table-responsive border rounded mb-3">
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Module</th>
                      <th>Total</th>
                      <th>Done</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link href="#">Inventory</Link>
                      </td>
                      <td>1620</td>
                      <td>1296</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/language-setting3"
                            className="btn btn-sm btn-outline-white me-2"
                          >
                            Web
                          </Link>
                          <Link to="/language-setting3"
                            className="btn btn-sm btn-outline-white me-2"
                          >
                            App
                          </Link>
                          <Link to="/language-setting3" className="btn btn-sm btn-outline-white">
                            Admin
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div className="dropdown">
                          <Link href="#"
                            className="btn btn-outline-white rounded-circle btn-sm d-inline-flex align-items-center p-1 justify-content-center"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="isax isax-more"></i>
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-2">
                            <li>
                              <Link
                                className="dropdown-item rounded-1"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_language"
                              >
                                <i className="isax isax-edit me-2"></i>
                                Edit
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item rounded-1"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>
                                Delete
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link href="#">Sales</Link>
                      </td>
                      <td>1620</td>
                      <td>972</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/language-setting3"
                            className="btn btn-sm btn-outline-white me-2"
                          >
                            Web
                          </Link>
                          <Link to="/language-setting3"
                            className="btn btn-sm btn-outline-white me-2"
                          >
                            App
                          </Link>
                          <Link to="/language-setting3" className="btn btn-sm btn-outline-white">
                            Admin
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div className="dropdown">
                          <Link href="#"
                            className="btn btn-outline-white rounded-circle btn-sm d-inline-flex align-items-center p-1 justify-content-center"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="isax isax-more"></i>
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-2">
                            <li>
                              <Link
                                className="dropdown-item rounded-1"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_language"
                              >
                                <i className="isax isax-edit me-2"></i>
                                Edit
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item rounded-1"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>
                                Delete
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link href="#">Purchases</Link>
                      </td>
                      <td>1620</td>
                      <td>810</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/language-setting3"
                            className="btn btn-sm btn-outline-white me-2"
                          >
                            Web
                          </Link>
                          <Link to="/language-setting3"
                            className="btn btn-sm btn-outline-white me-2"
                          >
                            App
                          </Link>
                          <Link to="/language-setting3" className="btn btn-sm btn-outline-white">
                            Admin
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div className="dropdown">
                          <Link href="#"
                            className="btn btn-outline-white rounded-circle btn-sm d-inline-flex align-items-center p-1 justify-content-center"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="isax isax-more"></i>
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-2">
                            <li>
                              <Link
                                className="dropdown-item rounded-1"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_language"
                              >
                                <i className="isax isax-edit me-2"></i>
                                Edit
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item rounded-1"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>
                                Delete
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Link href="#">Finance & Accounts</Link>
                      </td>
                      <td>1620</td>
                      <td>324</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to="/language-setting3"
                            className="btn btn-sm btn-outline-white me-2"
                          >
                            Web
                          </Link>
                          <Link to="/language-setting3"
                            className="btn btn-sm btn-outline-white me-2"
                          >
                            App
                          </Link>
                          <Link to="/language-setting3" className="btn btn-sm btn-outline-white">
                            Admin
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div className="dropdown">
                          <Link href="#"
                            className="btn btn-outline-white rounded-circle btn-sm d-inline-flex align-items-center p-1 justify-content-center"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="isax isax-more"></i>
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-2">
                            <li>
                              <Link
                                className="dropdown-item rounded-1"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_language"
                              >
                                <i className="isax isax-edit me-2"></i>
                                Edit
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item rounded-1"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="isax isax-trash me-2"></i>
                                Delete
                              </Link>
                            </li>
                          </ul>
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
      <div id="add_language" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Translation</h4>
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
                <div className="mb-3">
                  <label className="form-label">Language</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Code</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-0">
                  <label className="form-label">Status</label>
                  <div className="radio-wrap">
                    <div className="d-flex flex-wrap gap-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="Radio"
                          id="Radio-sm-1"
                        />
                        <label className="form-check-label" htmlFor="Radio-sm-1">
                          Active
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="Radio"
                          id="Radio-sm-2"
                        />
                        <label className="form-check-label" htmlFor="Radio-sm-2">
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="edit_language" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Translation</h4>
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
                <div className="mb-3">
                  <label className="form-label">Language</label>
                  <input type="text" className="form-control" value="English" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Code</label>
                  <input type="text" className="form-control" value="en" />
                </div>
                <div className="mb-0">
                  <label className="form-label">Status</label>
                  <div className="radio-wrap">
                    <div className="d-flex flex-wrap gap-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="Radio"
                          id="Radio-sm-3"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="Radio-sm-3">
                          Active
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="Radio"
                          id="Radio-sm-4"
                        />
                        <label className="form-check-label" htmlFor="Radio-sm-4">
                          Inactive
                        </label>
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
              <h6 className="mb-1">Delete Language</h6>
              <p className="mb-3">Are you sure, you want to delete Language?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/language-settings" className="btn btn-primary">
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

export default LanguageSetting2;
