import React from 'react';

const CustomerAccountSettings = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-11">
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
                              className="active fs-14 fw-medium d-flex align-items-center"
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
            <div className="col-xxl-9 col-lg-8">
              <div className="mb-3">
                <div className="pb-3 border-bottom mb-3">
                  <h6>Account Settings</h6>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                    <i className="isax isax-info-circle fs-14"></i>
                  </span>
                  <h6 className="fs-16 fw-semibold">General Information</h6>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                  <div className="mb-3">
                    <span className="text-gray-9 fw-bold mb-2 d-flex">
                      Project Image<span className="text-danger ms-1">*</span>
                    </span>
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xxl border border-dashed bg-light me-3 flex-shrink-0">
                        <div className="position-relative d-flex align-items-center">
                          <img
                            src="/assets/img/users/user-01.jpg"
                            className="avatar avatar-xl "
                            alt="User Img"
                          />
                          <Link
                            href="#"
                            className="rounded-trash trash-top d-flex align-items-center justify-content-center"
                          >
                            <i className="isax isax-trash"></i>
                          </Link>
                        </div>
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
                  <div className="border-bottom mb-3">
                    <div className="row gx-3">
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Name<span className="text-danger ms-1">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Email<span className="text-danger ms-1">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Mobile Number<span className="text-danger ms-1">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Gender</label>
                          <select className="select">
                            <option>Select</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">DOB</label>
                          <div className="input-group position-relative mb-3">
                            <input
                              type="text"
                              className="form-control datetimepicker rounded-end"
                              placeholder="25 Mar 2025"
                            />
                            <span className="input-icon-addon fs-16 text-gray-9">
                              <i className="isax isax-calendar-2"></i>
                            </span>
                          </div>
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
                          <label className="form-label">Country</label>
                          <select className="select">
                            <option>Select</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>UK</option>
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
                            <option>Ontario</option>
                            <option>Bavaria</option>
                            <option>Wellington</option>
                            <option>Le-de-France</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            City<span className="text-danger ms-1">*</span>
                          </label>
                          <select className="select">
                            <option>Select</option>
                            <option>Los Angeles</option>
                            <option>Toronto</option>
                            <option>London</option>
                            <option>Munich</option>
                            <option>Sydney</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Postal Code<span className="text-danger ms-1">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
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
    </>
  );
};

export default CustomerAccountSettings;
