import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <>
      <div className="row justify-content-center profile-page">
        <div className="col-12 col-md-10 col-lg-10">
          <div className="mb-3 border-bottom pb-3">
            <h6 className="mb-0">Profile</h6>
          </div>
          <div className="card mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                  <i className="isax isax-info-circle fs-14"></i>
                </span>
                <h6 className="fs-16 fw-semibold mb-0">General Information</h6>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); }}>
                <div className="mb-3">
                  <span className="text-gray-9 fw-bold mb-2 d-flex">Profile Image</span>
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
                      <span className="text-gray-9 fs-12">
                        JPG or PNG format, not exceeding 5MB.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-bottom mb-3 pb-2">
                  <div className="row gx-3">
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">
                          Name <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">
                          Mobile Number <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select className="select">
                          <option>Select</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
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
                    <h6 className="fs-16 fw-semibold mb-0">Address Information</h6>
                  </div>
                  <div className="row gx-3">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
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
                    <div className="col-12 col-md-6">
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
                    <div className="col-12 col-md-6">
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
                    <div className="col-12 col-md-6">
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
    </>
  );
};

export default Profile;
