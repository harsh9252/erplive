import React from 'react';

export default function Reports() {
  return (
    <div className="main-wrapper auth-bg">
      <div className="container-fluid">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
            <div className="col-lg-6">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="text-center">
                  <h1 className="display-1 fw-bold">404</h1>
                  <p className="fs-3">
                    <span className="text-danger">Oops!</span> Page not found.
                  </p>
                  <p className="lead">The requested URL was not found on this server.</p>
                  <Link href="/" className="btn btn-primary">
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
