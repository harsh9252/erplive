import React from 'react';

const TicketDetails = () => {
  return (
    <>
      <div className="mb-3">
        <h6>Ticket Overview</h6>
      </div>
      <div className="card mb-3">
        <div className="card-header border-0 bg-light">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div className="d-flex align-items-center">
              <span className="p-2 bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2">
                <i className="isax isax-ticket"></i>
              </span>
              <h6 className="fs-16">
                #TK001 - <span className="text-gray-5">New Support Ticket</span>
              </h6>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge badge-soft-danger me-3">Medium</span>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  <i className="isax isax-shield me-1 text-gray-9"></i> Resolved
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <ul className="mb-3">
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center">Open</label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center">
                        On Hold
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center">
                        Reopened
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center">
                        Resolved
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <h6 className="mb-2">Description</h6>
            <p>
              Need help? Submit a support ticket, and our team will assist you quickly. Provide your
              name, email, issue category, and a detailed description of the problem. Choose a
              priority level and attach relevant files if needed. Our support team will review your
              request and respond as soon as possible. Stay updated on your ticket status and get
              the assistance you need efficiently!
            </p>
            <p>
              {' '}
              Provide your name, email, issue category, and a detailed description of the problem.
              Choose a priority level and attach relevant files if needed.
            </p>
          </div>
          <div className="row mb-3 mx-1">
            <div className="col-lg-4 p-0 d-flex">
              <div className="p-3 border flex-fill rounded-left border-end-0">
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/users/user-08.jpg"
                    className="avatar avatar-lg rounded-circle me-2"
                    alt="img"
                  />
                  <div>
                    <h6 className="fs-14 mb-1">Created By</h6>
                    <p className="fs-13">Michael Carter</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 p-0 d-flex">
              <div className="p-3 border flex-fill rounded-0 border-end-0">
                <div className="">
                  <h6 className="fs-14 mb-1">Subject</h6>
                  <p className="fs-13">Support Ticket</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 p-0 d-flex">
              <div className="p-3 border flex-fill rounded-right">
                <div className="">
                  <h6 className="fs-14 mb-1">Subject</h6>
                  <p className="fs-13">Support Ticket</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <div className="border-bottom mb-3">
                    <h6 className="mb-2">Attachments</h6>
                  </div>
                  <div className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column mb-3">
                    <span className="upload-img d-block mb-2">
                      <i className="isax isax-image text-primary"></i>
                    </span>
                    <p className="mb-0 text-gray-9 fw-normal">
                      Drop your files here or
                      <Link href="#" className="text-primary text-decoration-underline">
                        browse
                      </Link>
                    </p>
                    <input type="file" accept="video/image" />
                    <p>Maximum size : 50 MB</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border rounded p-2 mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        src="/assets/img/icons/pdf.svg"
                        alt="img"
                        className="avatar avatar-lg me-2"
                      />
                      <div>
                        <Link href="#" className="fs-13">
                          Report1.pdf
                        </Link>
                        <span className="d-block fs-12">45 KB</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="btn btn-primary btn-md rounded-circle me-2 p-2">
                        <i className="isax isax-document-download"></i>
                      </Link>
                      <Link href="#" className="btn btn-light btn-md rounded-circle p-2">
                        <i className="isax isax-more"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border rounded p-2">
                    <div className="d-flex align-items-center">
                      <img
                        src="/assets/img/products/product-01.jpg"
                        alt="img"
                        className="avatar avatar-lg me-2"
                      />
                      <div>
                        <Link href="#" className="fs-13">
                          Image2.jpg
                        </Link>
                        <span className="d-block fs-12">38 KB</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="btn btn-primary btn-md rounded-circle me-2 p-2">
                        <i className="isax isax-document-download"></i>
                      </Link>
                      <Link href="#" className="btn btn-light btn-md rounded-circle p-2">
                        <i className="isax isax-more"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card mb-0">
                <div className="card-body">
                  <h5 className="fw-bold border-bottom pb-2 mb-3">History</h5>
                  <ul className="activity-feed">
                    <li className="feed-item timeline-item">
                      <p className="mb-1">
                        <span className="text-dark fw-semibold">John Smith</span> Got it now, and I
                        can log in.
                      </p>
                      <div className="invoice-date">
                        <span>
                          <i className="isax isax-calendar5 me-1"></i>17 Jan 2025
                        </span>
                      </div>
                    </li>
                    <li className="feed-item timeline-item">
                      <p className="mb-1">
                        <span className="text-dark fw-semibold">Forest Kroch </span> Check your spam
                        folder
                      </p>
                      <div className="invoice-date">
                        <span>
                          <i className="isax isax-calendar5 me-1"></i>17 Jan 2025
                        </span>
                      </div>
                    </li>
                    <li className="feed-item timeline-item">
                      <p className="mb-1">
                        <span className="text-dark fw-semibold">Townsend Seary </span> I’m not
                        receiving the email confirmation.
                      </p>
                      <div className="invoice-date">
                        <span>
                          <i className="isax isax-calendar5 me-1"></i>17 Jan 2025
                        </span>
                      </div>
                    </li>
                    <li className="feed-item timeline-item">
                      <p className="mb-1">
                        <span className="text-dark fw-semibold">Margaretta Worvell </span> Please
                        try resetting your password
                      </p>
                      <div className="invoice-date">
                        <span>
                          <i className="isax isax-calendar5 me-1"></i>17 Jan 2025
                        </span>
                      </div>
                    </li>
                    <li className="feed-item timeline-item">
                      <p className="mb-1">
                        <span className="text-dark fw-semibold">Michael Carter </span> I can’t log
                        in; it says incorrect password.
                      </p>
                      <div className="invoice-date">
                        <span>
                          <i className="isax isax-calendar5 me-1"></i>17 Jan 2025
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div className="d-flex align-items-center mt-4">
                    <button className="btn btn-light border d-flex align-items-center justify-content-center w-100">
                      View All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <h6>Comments</h6>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <Link href="#">
                <img
                  src="/assets/img/users/user-03.jpg"
                  className="avatar avatar-lg rounded-circle me-2"
                  alt="img"
                />
              </Link>
              <div>
                <h6 className="fs-14 mb-1">
                  <Link href="#">John Carter</Link>
                </h6>
                <p className="fs-13">2 weeks ago</p>
              </div>
            </div>
            <Link href="#" className="btn btn-light btn-sm text-gray-9">
              <i className="isax isax-repeat me-1"></i> Reply
            </Link>
          </div>
          <p>
            "This platform has made invoicing and expense tracking so much easier for my business.
            The automation features save me a lot of time, and the reports are very insightful.
            Highly recommend it to anyone looking for a reliable accounting solution. Great job,
            team!
          </p>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <Link href="#">
                <img
                  src="/assets/img/users/user-05.jpg"
                  className="avatar avatar-lg rounded-circle me-2"
                  alt="img"
                />
              </Link>
              <div>
                <h6 className="fs-14 mb-1">
                  <Link href="#">Braun Tucker</Link>
                </h6>
                <p className="fs-13">3 weeks ago</p>
              </div>
            </div>
            <Link href="#" className="btn btn-light btn-sm text-gray-9">
              <i className="isax isax-repeat me-1"></i> Reply
            </Link>
          </div>
          <p>
            "This platform has made invoicing and expense tracking so much easier for my business.
            The automation features save me a lot of time, and the reports are very insightful.
            Highly recommend it to anyone looking for a reliable accounting solution. Great job,
            team!
          </p>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Leave a Comment</label>
        <textarea className="form-control"></textarea>
      </div>
      <div className="d-flex align-items-center justify-content-end mb-3">
        <Link href="#" className="btn btn-primary">
          Post a Comment
        </Link>
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

export default TicketDetails;
