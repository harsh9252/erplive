import React from 'react';

const CustomerNotificationSettings = () => {
  return (
    <>
      <div className="row justify-content-center mb-3">
        <div className="col-lg-11">
          <div className=" row settings-wrapper d-flex">
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
                            <Link
                              href="/customer-account-settings"
                              className="fs-14 fw-medium d-flex align-items-center"
                            >
                              <i className="isax isax-user-octagon fs-18 me-1"></i>Account Settings
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/customer-security-settings"
                              className="fs-14 fw-medium d-flex align-items-center"
                            >
                              <i className="isax isax-security-safe fs-18 me-1"></i>Security
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/customer-plans-settings"
                              className="fs-14 fw-medium d-flex align-items-center"
                            >
                              <i className="isax isax-transaction-minus fs-18 me-1"></i>Plans &
                              Billings
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/customer-notifications-settings"
                              className="active fs-14 fw-medium d-flex align-items-center"
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
              <div className="mb-3 pb-3 border-bottom">
                <h6 className="fw-bold mb-0">Notifications</h6>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); }}>
                <div className="border-bottom mb-3 pb-2">
                  <div className="card-title-head d-flex align-items-center justify-content-between">
                    <h6 className="fs-16 fw-semibold mb-3 d-flex align-items-center">
                      <span className="fs-16 me-2 p-1 rounded bg-dark text-white d-inline-flex align-items-center justify-content-center">
                        <i className="isax isax-notification"></i>
                      </span>
                      General Notifications
                    </h6>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked />
                    </div>
                  </div>
                  <div className="mb-0">
                    <div className="table-responsive table-nowrap notification-table">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="fs-14">Modules </th>
                            <th className="fs-14">Email</th>
                            <th className="fs-14">SMS</th>
                            <th className="fs-14">In App</th>
                            <th className="fs-14">Whatsapp</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <h6 className="fs-13 fw-medium mb-1">System Updates</h6>
                              <p className="fs-12">
                                Get alerts for software updates and maintenance.
                              </p>
                            </td>
                            <td className="text-center">
                              <input className="form-check-input" type="checkbox" checked />
                            </td>
                            <td className="text-center">
                              <input className="form-check-input" type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input className="form-check-input" type="checkbox" />
                            </td>
                            <td className="text-center">
                              <input className="form-check-input" type="checkbox" />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h6 className="fs-13 fw-medium mb-1">Security Alerts</h6>
                              <p className="fs-12">
                                Notify about login attempts, password changes.
                              </p>
                            </td>
                            <td className="text-center">
                              <input className="form-check-input" type="checkbox" checked />
                            </td>
                            <td className="text-center">
                              <input className="form-check-input" type="checkbox" checked />
                            </td>
                            <td className="text-center">
                              <input className="form-check-input" type="checkbox" checked />
                            </td>
                            <td className="text-center">
                              <input className="form-check-input" type="checkbox" checked />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="border-bottom mb-3 pb-2">
                  <div className="card-title-head d-flex align-items-center justify-content-between">
                    <h6 className="fs-16 fw-semibold mb-3 d-flex align-items-center">
                      <span className="fs-16 me-2 p-1 rounded bg-dark text-white d-inline-flex align-items-center justify-content-center">
                        <i className="isax isax-shopping-cart"></i>
                      </span>
                      Sales Notifications
                    </h6>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked />
                    </div>
                  </div>
                  <div className="table-responsive table-nowrap mb-0 notification-table">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="fs-14">Modules </th>
                          <th className="fs-14">Email</th>
                          <th className="fs-14">SMS</th>
                          <th className="fs-14">In App</th>
                          <th className="fs-14">Whatsapp</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h6 className="fs-13 fw-medium mb-1">New Sale Recorded</h6>
                            <p className="fs-12">Get notified when a sale is made.</p>
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6 className="fs-13 fw-medium mb-1">Pending Payments</h6>
                            <p className="fs-12">Alerts for overdue invoices.</p>
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6 className="fs-13 fw-medium mb-1">Transactions</h6>
                            <p className="fs-12">Confirmation when a payment is received.</p>
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="border-bottom mb-3 pb-2">
                  <div className="card-title-head d-flex align-items-center justify-content-between">
                    <h6 className="fs-16 fw-semibold mb-3 d-flex align-items-center">
                      <span className="fs-16 me-2 p-1 rounded bg-dark text-white d-inline-flex align-items-center justify-content-center">
                        <i className="isax isax-notification-status"></i>
                      </span>
                      Invoice Notifications
                    </h6>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked />
                    </div>
                  </div>
                  <div className="table-responsive table-nowrap mb-0 notification-table">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="fs-14">Modules </th>
                          <th className="fs-14">Email</th>
                          <th className="fs-14">SMS</th>
                          <th className="fs-14">In App</th>
                          <th className="fs-14">Whatsapp</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h6 className="fs-13 fw-medium mb-1">New Invoice Created</h6>
                            <p className="fs-12">Alert when a new invoice is generated.</p>
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6 className="fs-13 fw-medium mb-1">Invoice Due Reminder</h6>
                            <p className="fs-12">Notification before the invoice due date</p>
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="border-bottom mb-3 pb-2">
                  <div className="card-title-head d-flex align-items-center justify-content-between">
                    <h6 className="fs-16 fw-semibold mb-3 d-flex align-items-center">
                      <span className="fs-16 me-2 p-1 rounded bg-dark text-white d-inline-flex align-items-center justify-content-center">
                        <i className="isax isax-user-tag"></i>
                      </span>
                      User Management
                    </h6>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked />
                    </div>
                  </div>
                  <div className="table-responsive table-nowrap mb-0 notification-table">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="fs-14">Modules </th>
                          <th className="fs-14">Email</th>
                          <th className="fs-14">SMS</th>
                          <th className="fs-14">In App</th>
                          <th className="fs-14">Whatsapp</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <h6 className="fs-13 fw-medium mb-1">New User Added</h6>
                            <p className="fs-12">Notify when a new user is registered.</p>
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6 className="fs-13 fw-medium mb-1">User Feedback</h6>
                            <p className="fs-12">Alerts for received feedback or reviews.</p>
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6 className="fs-13 fw-medium mb-1">Role & Permission Changes</h6>
                            <p className="fs-12">Notify when user roles are updated</p>
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6 className="fs-13 fw-medium mb-1">Direct Messages & Mentions</h6>
                            <p className="fs-12">Get alerts when you are tagged or messaged.</p>
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                          <td className="text-center">
                            <input className="form-check-input" type="checkbox" checked />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between settings-bottom-btn mt-0">
                  <button type="button" className="btn btn-outline-white me-2">
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
      <div className="footer d-sm-flex align-items-center justify-content-between bg-white py-2 px-4 border-top">
        <p className="text-dark mb-0">
          &copy; 2025{' '}
          <Link href="#" className="link-primary">
            Kanakku
          </Link>
          , All Rights Reserved
        </p>
        <p className="text-dark">Version : 1.3.8</p>
      </div>
    </>
  );
};

export default CustomerNotificationSettings;
