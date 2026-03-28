import React from 'react';
import { Link } from 'react-router-dom';

const LanguageSetting3 = () => {
  return (
    <>
      {/* start row */}
      <div className="row justify-content-center">
        <div className="col-xl-12">
          {/* start row */}
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
                                <Link href="javascript: void(0);">
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
                                <Link href="javascript: void(0);" className="active subdrop">
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
                                <Link href="javascript: void(0);">
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
                                <Link href="javascript: void(0);">
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
                                <Link href="javascript: void(0);">
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
                                <Link href="javascript: void(0);">
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
                {/* end card body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}

            <div className="col-xl-9 col-lg-8">
              <div className="mb-3 pb-3 border-bottom flex-wrap gap-3 d-flex align-items-center justify-content-between">
                <h6 className="fw-bold mb-0">Language</h6>
                <div className="d-flex align-items-center">
                  <div className="dropdown me-2">
                    <Link href="javascript: void(0);"
                      className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                    >
                      <i className="isax isax-language-square me-1"></i>Language
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
                  <Link href="javascript: void(0);"
                    className="btn btn-primary d-inline-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#add_language"
                  >
                    <i className="isax isax-add-circle5 me-1"></i>New Language
                  </Link>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                <div className="top-search me-2">
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
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <Link to="/language-settings"
                    className="btn btn-outline-white d-inline-flex align-items-center me-2 fw-normal"
                  >
                    <i className="isax isax-arrow-left me-1"></i>Back to Translations
                  </Link>
                  <Link href="javascript: void(0);"
                    className="btn btn-sm btn-outline-white me-2 fw-normal d-inline-flex align-items-center"
                  >
                    <img
                      src="assets/img/flags/ae.svg"
                      alt="img"
                      className="avatar avatar-xs rounded-circle me-1"
                    />{' '}
                    Arabic
                  </Link>
                  <div className="progress-percent">
                    <span className="text-gray-9 fs-10">Progress</span>
                    <div className="d-flex align-items-center">
                      <div className="progress progress-xs" style={{ width: '120px' }}>
                        <div
                          className="progress-bar bg-pink rounded"
                          role="progressbar"
                          style={{ width: '70%' }}
                          aria-valuenow={100}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                      <span className="d-inline-flex fs-12 ms-2">70%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Data Table */}
              <div className="custom-datatable-filter table-responsive border rounded mb-3">
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>English</th>
                      <th>Arabic</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-gray-9">Invoices</td>
                      <td>
                        <input
                          type="text"
                          dir="rtl"
                          className="form-control text-end"
                          value="الفواتير"
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-9">Recurring Invoices</td>
                      <td>
                        <input
                          type="text"
                          dir="rtl"
                          className="form-control text-end"
                          value="الفواتير المتكررة"
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-9">Credit Notes</td>
                      <td>
                        <input
                          type="text"
                          dir="rtl"
                          className="form-control text-end"
                          value="ملاحظات الائتمان"
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-9">Quotations</td>
                      <td>
                        <input
                          type="text"
                          dir="rtl"
                          className="form-control text-end"
                          value="الاقتباسات"
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-9">Delivery Challans</td>
                      <td>
                        <input
                          type="text"
                          dir="rtl"
                          className="form-control text-end"
                          value="تسليم تشالان"
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-9">Customers</td>
                      <td>
                        <input
                          type="text"
                          dir="rtl"
                          className="form-control text-end"
                          value="عملاء"
                          readOnly
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Custom Data Table */}
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end col */}
      </div>
      {/* end row */}
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
                          id="Radio-sm-3"
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
    </>
  );
};

export default LanguageSetting3;
