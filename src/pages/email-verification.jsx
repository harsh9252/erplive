import React from 'react';

export default function EmailVerification() {
  return (
    <div className="main-wrapper auth-bg">
      <div className="container-fuild">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
            <div className="col-lg-4 mx-auto">
              <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-lg-center p-4 p-lg-0 pb-0 flex-fill">
                  <div className=" mx-auto mb-5 text-center">
                    <img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />
                  </div>
                  <div className="card border-0 p-lg-3 shadow-lg rounded-2">
                    <div className="card-body">
                      <div className="mb-3 text-center">
                        <span>
                          <i className="isax isax-tick-circle5 text-success fs-48"></i>
                        </span>
                      </div>
                      <div className="text-center mb-3">
                        <h5 className="mb-2">Email Sent!</h5>
                        <p className="mb-0">Check your email & change your password</p>
                      </div>
                      <div>
                        <Link
                          href="/two-step-verification"
                          className="btn bg-primary-gradient text-white w-100"
                        >
                          Reset Password
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
