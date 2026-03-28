import React from 'react';

const SearchList = () => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <form onSubmit={(e) => { e.preventDefault(); }}>
            <div className="d-flex align-items-center">
              <input type="text" className="form-control flex-fill me-3" value="Kanakku" />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h6 className="mb-3 text-capitalize">Search result for "Kanakku"</h6>
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-none">
                <div className="card-body">
                  <Link href="#" className="text-info text-truncate mb-2 text-wrap">
                    https://themeforest.net/search/kanakku
                  </Link>
                  <p className="text-truncate line-clamb-2 mb-2">
                    Kanakku - Html, Vue 3, Angular 17+, React & Node HR Project Management & CRM
                    Admin Dashboard Template
                  </p>
                  <div className="d-flex align-items-center flex-wrap row-gap-2">
                    <span className="text-gray-9 me-3 pe-3 border-end">1.7K Sales</span>
                    <div className="text-gray-9 d-flex align-items-center me-3 pe-3 border-end">
                      <i className="ti ti-star-filled text-warning me-1"></i>
                      <i className="ti ti-star-filled text-warning me-1"></i>
                      <i className="ti ti-star-filled text-warning me-1"></i>
                      <i className="ti ti-star-filled text-warning me-1"></i>
                      <i className="ti ti-star-filled text-gray-2 me-1"></i>
                      (45)
                    </div>
                    <span className="text-gray-9">$35</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h6 className="mb-3">Images</h6>
          <div className="row g-3">
            <div className="col-xl-2 col-md-4 col-6">
              <Link
                href="assets/img/media/media-15.jpg"
                data-fancybox="gallery"
                className="gallery-item"
              >
                <img src="/assets/img/media/media-15.jpg" className="rounded" alt="img" />
              </Link>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link
                href="assets/img/media/media-16.jpg"
                data-fancybox="gallery"
                className="gallery-item"
              >
                <img src="/assets/img/media/media-16.jpg" className="rounded" alt="img" />
              </Link>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link
                href="assets/img/media/media-17.jpg"
                data-fancybox="gallery"
                className="gallery-item"
              >
                <img src="/assets/img/media/media-17.jpg" className="rounded" alt="img" />
              </Link>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link
                href="assets/img/media/media-18.jpg"
                data-fancybox="gallery"
                className="gallery-item"
              >
                <img src="/assets/img/media/media-18.jpg" className="rounded" alt="img" />
              </Link>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link
                href="assets/img/media/media-19.jpg"
                data-fancybox="gallery"
                className="gallery-item"
              >
                <img src="/assets/img/media/media-19.jpg" className="rounded" alt="img" />
              </Link>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link
                href="assets/img/media/media-20.jpg"
                data-fancybox="gallery"
                className="gallery-item"
              >
                <img src="/assets/img/media/media-20.jpg" className="rounded" alt="img" />
              </Link>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link
                href="assets/img/media/media-21.jpg"
                data-fancybox="gallery"
                className="gallery-item"
              >
                <img src="/assets/img/media/media-21.jpg" className="rounded" alt="img" />
              </Link>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link
                href="assets/img/media/media-22.jpg"
                data-fancybox="gallery"
                className="gallery-item"
              >
                <img src="/assets/img/media/media-22.jpg" className="rounded" alt="img" />
              </Link>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link
                href="assets/img/media/media-23.jpg"
                data-fancybox="gallery"
                className="gallery-item"
              >
                <img src="/assets/img/media/media-23.jpg" className="rounded" alt="img" />
              </Link>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link
                href="assets/img/media/media-24.jpg"
                data-fancybox="gallery"
                className="gallery-item"
              >
                <img src="/assets/img/media/media-24.jpg" className="rounded" alt="img" />
              </Link>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link
                href="assets/img/media/media-25.jpg"
                data-fancybox="gallery"
                className="gallery-item"
              >
                <img src="/assets/img/media/media-25.jpg" className="rounded" alt="img" />
              </Link>
            </div>
            <div className="col-xl-2 col-md-4 col-6">
              <Link
                href="assets/img/media/media-26.jpg"
                data-fancybox="gallery"
                className="gallery-item"
              >
                <img src="/assets/img/media/media-26.jpg" className="rounded" alt="img" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="add-contact">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="page-title">
                <h5>Add Contact</h5>
              </div>
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
                <div className="new-employee-field">
                  <div className="profile-pic-upload">
                    <div className="profile-pic">
                      <span>
                        <i data-feather="plus-circle" className="plus-down-add"></i> Add Image
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="image-upload mb-0">
                        <input type="file" />
                        <div className="image-uploads">
                          <h4>Upload Image</h4>
                        </div>
                      </div>
                      <p className="mt-2">JPEG, PNG up to 2 MB</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">
                      First Name<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">
                      Last Name<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <label className="form-label">
                      Email<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <label className="form-label">
                      Phone<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="tel" className="form-control" />
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Contact Type <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option>Admin</option>
                        <option>Salesman</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                      <span className="status-label">Status</span>
                      <input type="checkbox" id="user2" className="check" checked="" />
                      <label htmlFor="user2" className="checktoggle"></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn me-2 btn-light fs-13 fw-medium p-2 px-3 shadow-none"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary fs-13 fw-medium p-2 px-3">
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="edit-contact">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="page-title">
                <h5>Edit Contact</h5>
              </div>
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
                <div className="new-employee-field">
                  <div className="profile-pic-upload image-field">
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
                    <div className="mb-3">
                      <div className="image-upload mb-0">
                        <input type="file" />
                        <div className="image-uploads">
                          <h4>Change Image</h4>
                        </div>
                      </div>
                      <p className="mt-2">JPEG, PNG up to 2 MB</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">
                      First Name<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" value="Carl" />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">
                      Last Name<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" value="Evans" />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <label className="form-label">
                      Email<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="email" className="form-control" value="carlevans@example.com" />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <label className="form-label">
                      Phone<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="tel" className="form-control" value="+12163547758 " />
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-0">
                      <label className="form-label">
                        Contact Type <span className="text-danger">*</span>
                      </label>
                      <select className="select">
                        <option>Select</option>
                        <option selected>Admin</option>
                        <option>Salesman</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn me-2 btn-light fs-13 fw-medium p-2 px-3 shadow-none"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary fs-13 fw-medium p-2 px-3">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-subtle mb-2">
                  <i className="ti ti-trash fs-24 text-danger"></i>
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">Delete Contact</h4>
                <p className="mb-0 fs-16">Are you sure you want to delete contact?</p>
                <div className="modal-footer-btn mt-3 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn me-2 btn-light fs-13 fw-medium p-2 px-3 shadow-none"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary fs-13 fw-medium p-2 px-3">
                    Yes Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchList;
