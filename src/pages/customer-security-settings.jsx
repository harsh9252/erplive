import React from 'react';

const CustomerSecuritySettings = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-11">
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
                              className="fs-14 fw-medium d-flex align-items-center active"
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
                              href="/customer-notification-settings"
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
            <div className="col-xl-9 col-lg-8">
              <div className="mb-3">
                <div className="pb-3 border-bottom mb-3">
                  <h6 className="mb-0">Security</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="p-1 bg-dark rounded text-white d-inline-flex align-items-center justify-content-center me-2">
                        <i className="isax isax-eye fs-16"></i>
                      </span>
                      <h5 className="fs-16 fw-semibold">Password</h5>
                    </div>
                    <p className="fs-14">Set a unique password to secure the account</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge badge-md badge-soft-danger me-3">
                      Last Changed, Jan 16, 2025
                    </span>
                    <Link href="#" data-bs-toggle="modal" data-bs-target="#change_password">
                      <span className="badge badge-soft-light text-dark d-inline-flex align-items-center">
                        <i className="isax isax-edit"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="p-1 bg-dark rounded text-white d-inline-flex align-items-center justify-content-center me-2">
                        <i className="isax isax-security-safe fs-16"></i>
                      </span>
                      <h5 className="fs-16 fw-semibold">Two Factor Authentication</h5>
                    </div>
                    <p className="fs-14">Use your mobile phone to receive security PIN.</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge badge-md badge-soft-danger">Enabled, Jan 16, 2025</span>
                    <label className="d-flex align-items-center form-switch ps-3">
                      <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    </label>
                    <Link href="#">
                      <span
                        className="badge badge-soft-light text-dark d-inline-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#two-factor"
                      >
                        <i className="isax isax-setting-2"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="p-1 bg-dark rounded text-white d-inline-flex align-items-center justify-content-center me-2">
                        <i className="isax isax-lock fs-16"></i>
                      </span>
                      <h5 className="fs-16 fw-semibold mb-1">Google Authentication</h5>
                    </div>
                    <p className="fs-14">Connect to Google</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge badge-outline-light text-dark border d-flex align-items-center">
                      <i className="fa fa-circle text-success fs-8 me-1"></i>Connected
                    </span>
                    <label className="d-flex align-items-center form-switch ps-3">
                      <input className="form-check-input m-0 me-2" type="checkbox" checked />
                    </label>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="p-1 bg-dark rounded text-white d-inline-flex align-items-center justify-content-center me-2">
                        <i className="isax isax-call fs-16"></i>
                      </span>
                      <h5 className="fs-16 fw-semibold">Phone Number Verification</h5>
                    </div>
                    <p className="fs-14">Phone Number associated with the account</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge badge-md badge-soft-success me-3">
                      Verified<i className="isax isax-tick-circle ms-1"></i>
                    </span>
                    <Link
                      href="#"
                      className="me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#phone_verification"
                    >
                      <span className="badge badge-soft-light text-dark d-inline-flex align-items-center">
                        <i className="isax isax-edit"></i>
                      </span>
                    </Link>
                    <Link href="#">
                      <span className="badge badge-soft-light text-dark d-inline-flex align-items-center">
                        <i className="isax isax-trash"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="p-1 bg-dark rounded text-white d-inline-flex align-items-center justify-content-center me-2">
                        <i className="isax isax-sms-tracking fs-16"></i>
                      </span>
                      <h5 className="fs-16 fw-semibold">Email Verification</h5>
                    </div>
                    <p className="fs-14">Email Address associated with the account</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge badge-md badge-soft-success me-3">
                      Verified<i className="isax isax-tick-circle ms-1"></i>
                    </span>
                    <Link
                      href="#"
                      className="me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#email_verification"
                    >
                      <span className="badge badge-soft-light text-dark d-inline-flex align-items-center">
                        <i className="isax isax-edit"></i>
                      </span>
                    </Link>
                    <Link href="#">
                      <span className="badge badge-soft-light text-dark d-inline-flex align-items-center">
                        <i className="isax isax-trash"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="p-1 bg-dark rounded text-white d-inline-flex align-items-center justify-content-center me-2">
                        <i className="isax isax-device-message fs-16"></i>
                      </span>
                      <h5 className="fs-16 fw-semibold">Browsers & Devices</h5>
                    </div>
                    <p className="fs-14">The browsers & devices associated with the account</p>
                  </div>
                  <Link href="#" data-bs-toggle="modal" data-bs-target="#view_device">
                    <span className="badge badge-soft-light text-dark d-inline-flex align-items-center">
                      <i className="isax isax-eye"></i>
                    </span>
                  </Link>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 border-bottom mb-3 pb-3">
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="p-1 bg-dark rounded text-white d-inline-flex align-items-center justify-content-center me-2">
                        <i className="isax isax-close-circle fs-16"></i>
                      </span>
                      <h5 className="fs-16 fw-semibold">Deactivate Account</h5>
                    </div>
                    <p className="fs-14">
                      This will shutdown your account. Your account will be reactive when you sign
                      in again
                    </p>
                  </div>
                  <Link href="#">
                    <span className="badge badge-soft-light text-dark d-inline-flex align-items-center">
                      <i className="isax isax-slash"></i>
                    </span>
                  </Link>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <span className="p-1 bg-dark rounded text-white d-inline-flex align-items-center justify-content-center me-2">
                        <i className="isax isax-info-circle fs-16"></i>
                      </span>
                      <h5 className="fs-16 fw-semibold">Delete Account</h5>
                    </div>
                    <p className="fs-14">Your account will be permanently deleted</p>
                  </div>
                  <Link href="#" data-bs-toggle="modal" data-bs-target="#delete_modal">
                    <span className="badge badge-soft-light text-dark d-inline-flex align-items-center">
                      <i className="isax isax-trash"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="change_password" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Change Password</h4>
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
                <div className="mb-3">
                  <label className="form-label">
                    Current Password<span className="text-danger ms-1">*</span>
                  </label>
                  <div className="pass-group input-group">
                    <span className="input-group-text border-end-0">
                      <i className="isax isax-lock"></i>
                    </span>
                    <span className="isax toggle-password isax-eye-slash"></span>
                    <input
                      type="password"
                      className="pass-input form-control border-start-0 ps-0"
                      placeholder="****************"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    New Password<span className="text-danger ms-1">*</span>
                  </label>
                  <div className="pass-group input-group mb-3">
                    <span className="input-group-text border-end-0">
                      <i className="isax isax-lock"></i>
                    </span>
                    <span className="isax toggle-passwords isax-eye-slash"></span>
                    <input
                      type="password"
                      className="pass-inputs form-control border-start-0 ps-0"
                      placeholder="****************"
                    />
                  </div>
                  <div className="password-strength d-flex" id="passwordStrength">
                    <span id="poor"></span>
                    <span id="weak"></span>
                    <span id="strong"></span>
                    <span id="heavy"></span>
                  </div>
                  <div id="passwordInfo" className="mb-2"></div>
                  <p className="text-gray-5">
                    Use 8 or more characters with a mix of letters, numbers & symbols.
                  </p>
                </div>
                <div>
                  <label className="form-label">
                    Confirm Password<span className="text-danger ms-1">*</span>
                  </label>
                  <div className="pass-group input-group">
                    <span className="input-group-text border-end-0">
                      <i className="isax isax-lock"></i>
                    </span>
                    <span className="isax toggle-passworda isax-eye-slash"></span>
                    <input
                      type="password"
                      className="pass-inputa form-control border-start-0 ps-0"
                      placeholder="****************"
                    />
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
      <div id="phone_verification" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Change Phone Number</h4>
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
                <div className="mb-3">
                  <label className="form-label">
                    Current Phone Number<span className="text-danger ms-1">*</span>
                  </label>
                  <input type="text" className="form-control" id="phone" />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    New Phone Number<span className="text-danger ms-1">*</span>
                  </label>
                  <input type="text" className="form-control" id="phone2" />
                  <p className="mt-2 d-inline-flex align-items-center">
                    <i className="isax isax-info-circle me-1"></i>New phone number only updated once
                    you verified{' '}
                  </p>
                </div>
                <div>
                  <label className="form-label">
                    Current Password<span className="text-danger ms-1">*</span>
                  </label>
                  <div className="pass-group input-group">
                    <span className="input-group-text border-end-0">
                      <i className="isax isax-lock"></i>
                    </span>
                    <span className="isax toggle-password isax-eye-slash"></span>
                    <input
                      type="password"
                      className="pass-input form-control border-start-0 ps-0"
                      placeholder="****************"
                    />
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
      <div id="email_verification" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Change Email Address</h4>
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
                <div className="mb-3">
                  <label className="form-label">
                    Current Email Address<span className="text-danger ms-1">*</span>
                  </label>
                  <input type="email" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    New Email Address<span className="text-danger ms-1">*</span>
                  </label>
                  <input type="email" className="form-control" />
                  <p className="mt-2 d-inline-flex align-items-center">
                    <i className="isax isax-info-circle me-1"></i>New email address only updated
                    once you verified{' '}
                  </p>
                </div>
                <div>
                  <label className="form-label">
                    Current Password<span className="text-danger ms-1">*</span>
                  </label>
                  <div className="pass-group input-group">
                    <span className="input-group-text border-end-0">
                      <i className="isax isax-lock"></i>
                    </span>
                    <span className="isax toggle-password isax-eye-slash"></span>
                    <input
                      type="password"
                      className="pass-input form-control border-start-0 ps-0"
                      placeholder="****************"
                    />
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
      <div id="two-factor" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">SMS Two Factor Authentication</h4>
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
                <div className="mb-3">
                  <label className="form-label">
                    Phone Number<span className="text-danger ms-1">*</span>
                  </label>
                  <input type="text" className="form-control" id="phone3" />
                </div>
                <p className="fs-13 mb-0">
                  By providing your phone number, you agree to receive text messages from Figma to
                  enable two-factor authentication when you log in.{' '}
                </p>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="view_device" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Browsers & Devices</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="table-responsive border border-bottom-0">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>Device</th>
                      <th>Date</th>
                      <th>IP Address</th>
                      <th>Location</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-dark">Chrome - Windows</td>
                      <td>24 Jan 2025, 10:00 AM</td>
                      <td>232.222.12.72</td>
                      <td>Newyork / USA</td>
                      <td>
                        <Link href="#">
                          <span className="badge badge-soft-light text-dark d-inline-flex align-items-center">
                            <i className="isax isax-logout"></i>
                          </span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-dark">Safari Macos</td>
                      <td>19 Dec 2024, 09:30 AM</td>
                      <td>224.111.12.75</td>
                      <td>Newyork / USA</td>
                      <td>
                        <Link href="#">
                          <span className="badge badge-soft-light text-dark d-inline-flex align-items-center">
                            <i className="isax isax-logout"></i>
                          </span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-dark">Firefox Windows</td>
                      <td>11 Dec 2024, 05:20 PM</td>
                      <td>111.222.13.28</td>
                      <td>Newyork / USA</td>
                      <td>
                        <Link href="#">
                          <span className="badge badge-soft-light text-dark d-inline-flex align-items-center">
                            <i className="isax isax-logout"></i>
                          </span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-dark">Safari Macos</td>
                      <td>29 Nov 2024, 04:45 PM</td>
                      <td>333.555.10.54</td>
                      <td>Newyork / USA</td>
                      <td>
                        <Link href="#">
                          <span className="badge badge-soft-light text-dark d-inline-flex align-items-center">
                            <i className="isax isax-logout"></i>
                          </span>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="delete_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Delete Account</h4>
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
                <div className="mb-3">
                  <p className="text-dark fw-semibold mb-0">Why Are You Deleting Your Account?</p>
                  <p className="fs-13">
                    We're sorry to see you go! To help us improve, please let us know your reason
                    for deleting your account
                  </p>
                </div>
                <div>
                  <div className="form-check mb-3 d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Radio-2"
                      id="Radio-sm-1"
                    />
                    <div className="ms-2">
                      <p className="text-dark fw-semibold mb-0">No longer using the service</p>
                      <label className="form-check-label fs-13" htmlFor="Radio-sm-1">
                        I no longer need this service and won’t be using it in the future.
                      </label>
                    </div>
                  </div>
                  <div className="form-check mb-3 d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Radio-2"
                      id="Radio-sm-2"
                    />
                    <div className="ms-2">
                      <p className="text-dark fw-semibold mb-0">Privacy concerns</p>
                      <label className="form-check-label fs-13" htmlFor="Radio-sm-2">
                        I am concerned about how my data is handled and want to remove
                      </label>
                    </div>
                  </div>
                  <div className="form-check mb-3 d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Radio-2"
                      id="Radio-sm-3"
                    />
                    <div className="ms-2">
                      <p className="text-dark fw-semibold mb-0">Too many notifications/emails</p>
                      <label className="form-check-label fs-13" htmlFor="Radio-sm-3">
                        I’m overwhelmed by the volume of notifications or emails
                      </label>
                    </div>
                  </div>
                  <div className="form-check mb-3 d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Radio-2"
                      id="Radio-sm-4"
                    />
                    <div className="ms-2">
                      <p className="text-dark fw-semibold mb-0">Poor user experience</p>
                      <label className="form-check-label fs-13" htmlFor="Radio-sm-4">
                        I’ve had difficulty using the platform, and it didn’t meet my expectations
                      </label>
                    </div>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Radio-2"
                      id="Radio-sm-5"
                      checked
                    />
                    <label className="form-check-label text-dark fw-semibold" htmlFor="Radio-sm-5">
                      Other (Please specify)
                    </label>
                  </div>
                </div>
                <div>
                  <label className="form-label">
                    Reason<span className="text-danger ms-1">*</span>
                  </label>
                  <textarea className="form-control" rows="3"></textarea>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm & Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerSecuritySettings;
