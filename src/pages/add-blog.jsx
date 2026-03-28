import React from 'react';
import { Link } from 'react-router-dom';

const AddBlog = () => {
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
                <h5 className="mb-3">Add Blog</h5>
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
                        <input type="text" className="form-control" />
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
                          <option>Accounting</option>
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
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">
                          Content<span className="text-danger ms-1">*</span>
                        </label>
                        <div className="editor"></div>
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
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <button type="button" className="btn btn-outline-white">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Create New
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

export default AddBlog;
