import React from 'react';
import { Link } from 'react-router-dom';

const EditBlog = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6>
                <Link to="/blogs">
                  <i className="isax isax-arrow-left me-2"></i>All Blogs
                </Link>
              </h6>
              <Link href="#" className="btn btn-outline-white d-inline-flex align-items-center">
                <i className="isax isax-eye me-1"></i>Preview
              </Link>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="mb-3">Edit Blog</h5>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                  <div className="mb-3">
                    <h6 className=" mb-2">Basic Details</h6>
                  </div>
                  <div className="row gx-3">
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Title<span className="text-danger ms-1">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value="Small Businesses Automate Accounting"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Category<span className="text-danger ms-1">*</span>
                        </label>
                        <select className="select">
                          <option>Select</option>
                          <option>Invoicing</option>
                          <option selected>Accounting</option>
                          <option>ExpenseManagement</option>
                          <option>BusinessFinance</option>
                          <option>Technology</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Tag<span className="text-danger ms-1">*</span>
                        </label>
                        <input
                          className="input-tags form-control"
                          id="inputBox"
                          type="text"
                          data-role="tagsinput"
                          name="specialist"
                          value="Main, Accounts"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">
                          Content<span className="text-danger ms-1">*</span>
                        </label>
                        <div className="editor">
                          Learn how automation can save time, reduce errors, and help small
                          businesses manage their finances efficiently.
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3 pb-3 border-bottom">
                        <label className="form-label">Images</label>
                        <div className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column">
                          <span className="upload-img d-block mb-2">
                            <i className="isax isax-folder-open text-primary fs-16"></i>
                          </span>
                          <p className="mb-0 text-gray-9">
                            Drop your files here or
                            <Link href="#" className="text-primary text-decoration-underline">
                              browse
                            </Link>
                          </p>
                          <input type="file" accept="video/image" />
                          <p className="fs-13">Maximum size : 50 MB</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="row mb-3 border-bottom">
                        <div className="col-lg-4">
                          <div className="card">
                            <div className="card-body">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                  <img
                                    src="/assets/img/media/img-07.png"
                                    alt="img"
                                    className="avatar avatar-lg rounded me-2"
                                  />
                                  <div>
                                    <Link href="#" className="fs-14 fw-medium d-block">
                                      Blog1.jpg
                                    </Link>
                                    <span className="fs-13">15.45 KB</span>
                                  </div>
                                </div>
                                <Link
                                  href="#"
                                  className="btn p-1 btn-light rounded-circle d-inline-flex align-items-center justify-content-center"
                                >
                                  <i className="isax isax-trash"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
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

export default EditBlog;
