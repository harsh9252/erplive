import React from 'react'; 
import { Link, useLocation } from 'react-router-dom';

const TaxRates = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-12">
          <div className=" row settings-wrapper d-flex">
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
                                <Link  href="#">
                                  <i className="isax isax-setting-2 fs-18"></i>
                                  <span className="fs-14 fw-medium ms-2">General Settings</span>
                                  <span className="isax isax-arrow-down-1 arrow-menu ms-auto"></span>
                                </Link >
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
                                <Link  href="#">
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
                                    <Link to="/language-settings">Language</Link>
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
                                <Link  href="#">
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
                                <Link  href="#" className="active subdrop">
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
                                    <Link to="/tax-rates" className="active">
                                      Tax Rates
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/currencies">Currencies</Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="submenu">
                                <Link  href="#">
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
                                <Link  href="#">
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
              <div className="mb-3">
                <div className="pb-3 border-bottom mb-3">
                  <h6 className="mb-0">Tax Rates</h6>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <h6 className="fs-16 fw-semibold mb-0">Tax Rates</h6>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                      <div className="d-flex align-items-center flex-wrap gap-2">
                        <div className="input-icon-start position-relative">
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
                        <Link  href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add_tax_rates"
                          className="btn btn-primary d-flex align-items-center"
                        >
                          <i className="isax isax-add-circle5 me-2"></i>New Tax Rate
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive table-nowrap pb-3 border-bottom">
                    <table className="table border mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="no-sort">Name</th>
                          <th>Tax Rate</th>
                          <th>Created On</th>
                          <th>Status</th>
                          <th className="no-sort text-end pe-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Link  href="#" className="text-dark">
                              VAT
                            </Link>
                          </td>
                          <td>10%</td>
                          <td>22 Feb 2025</td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked=""
                              />
                            </div>
                          </td>
                          <td className="text-end pe-4">
                            <div className="dropdown">
                              <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                                <i className="isax isax-more fs-18"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                                <li>
                                  <Link 
                                    href="#"
                                    className="dropdown-item py-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit_tax_rates"
                                  >
                                    <i className="isax isax-edit-2 me-2 text-warning"></i>Edit Tax Rate
                                  </Link>
                                </li>
                                <li>
                                  <Link  href="#"
                                    className="dropdown-item py-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_tax_rates"
                                  >
                                    <i className="isax isax-trash me-2 text-danger"></i>Delete Tax Rate
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link  href="#" className="text-dark">
                              CGST
                            </Link>
                          </td>
                          <td>08%</td>
                          <td>07 Feb 2025</td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked=""
                              />
                            </div>
                          </td>
                          <td className="text-end pe-4">
                            <div className="dropdown">
                              <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                                <i className="isax isax-more fs-18"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                                <li>
                                  <Link 
                                    href="#"
                                    className="dropdown-item py-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit_tax_rates"
                                  >
                                    <i className="isax isax-edit-2 me-2 text-warning"></i>Edit Tax Rate
                                  </Link>
                                </li>
                                <li>
                                  <Link  href="#"
                                    className="dropdown-item py-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_tax_rates"
                                  >
                                    <i className="isax isax-trash me-2 text-danger"></i>Delete Tax Rate
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Link  href="#" className="text-dark">
                              SGST
                            </Link>
                          </td>
                          <td>10%</td>
                          <td>17 Jan 2025</td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked=""
                              />
                            </div>
                          </td>
                          <td className="text-end pe-4">
                            <div className="dropdown">
                              <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                                <i className="isax isax-more fs-18"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                                <li>
                                  <Link 
                                    href="#"
                                    className="dropdown-item py-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit_tax_rates"
                                  >
                                    <i className="isax isax-edit-2 me-2 text-warning"></i>Edit Tax Rate
                                  </Link>
                                </li>
                                <li>
                                  <Link  href="#"
                                    className="dropdown-item py-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_tax_rates"
                                  >
                                    <i className="isax isax-trash me-2 text-danger"></i>Delete Tax Rate
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex align-items-center mb-3 mt-4">
                    <h6 className="fs-16 fw-semibold mb-0">Tax Group</h6>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                      <div className="d-flex align-items-center flex-wrap gap-2">
                        <div className="input-icon-start position-relative">
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
                        <Link  href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add_tax_group"
                          className="btn btn-primary d-flex align-items-center"
                        >
                          <i className="isax isax-add-circle5 me-2"></i>New Tax Group
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive table-nowrap">
                    <table className="table border mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="no-sort">Name</th>
                          <th>Tax Rate</th>
                          <th>Created On</th>
                          <th>Status</th>
                          <th className="no-sort text-end pe-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Link  href="#" className="text-dark">
                              GST
                            </Link>
                          </td>
                          <td>18%</td>
                          <td>19 Feb 2025</td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked=""
                              />
                            </div>
                          </td>
                          <td className="text-end pe-4">
                            <div className="dropdown">
                              <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                                <i className="isax isax-more fs-18"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                                <li>
                                  <Link 
                                    href="#"
                                    className="dropdown-item py-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit_tax_group"
                                  >
                                    <i className="isax isax-edit-2 me-2 text-warning"></i>Edit Tax Group
                                  </Link>
                                </li>
                                <li>
                                  <Link  href="#"
                                    className="dropdown-item py-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_tax_group"
                                  >
                                    <i className="isax isax-trash me-2 text-danger"></i>Delete Tax Group
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="add_tax_rates" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Tax Rate</h4>
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
                <div className="mb-3">
                  <label className="form-label">
                    Tax Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-0">
                  <label className="form-label">
                    Tax Rate (%) <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add New
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="edit_tax_rates" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Tax Rate</h4>
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
                <div className="mb-3">
                  <label className="form-label">
                    Tax Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" value="VAT" />
                </div>
                <div className="mb-0">
                  <label className="form-label">
                    Tax Rate (%) <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" value="10" />
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
      <div id="add_tax_group" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Tax Group</h4>
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
                <div className="mb-3">
                  <label className="form-label">
                    Tax Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-0">
                  <label className="form-label">
                    Sub Taxes <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" /> Enter value separated by comma
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add New
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="edit_tax_group" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Tax Group</h4>
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
                <div className="mb-3">
                  <label className="form-label">
                    Tax Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" value="GST" />
                </div>
                <div className="mb-0">
                  <label className="form-label">
                    Sub Taxes <span className="text-danger">*</span>
                  </label>
                  <input
                    className="input-tags form-control"
                    id="inputBox"
                    type="text"
                    data-role="tagsinput"
                    name="specialist"
                    value="CGST,SGST"
                  />
                  <p className="mb-0 mt-1">Enter value separated by comma</p>
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
      <div className="modal fade" id="delete_tax_rates">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Tax Rate</h6>
              <p className="mb-3">Are you sure, you want to delete tax rate?</p>
              <div className="d-flex justify-content-center">
                <Link  href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/tax-rates" className="btn btn-primary">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="delete_tax_group">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Tax Group</h6>
              <p className="mb-3">Are you sure, you want to delete tax group?</p>
              <div className="d-flex justify-content-center">
                <Link  href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/tax-rates" className="btn btn-primary">
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

export default TaxRates;
