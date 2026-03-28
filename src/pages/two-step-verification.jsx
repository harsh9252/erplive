import React from 'react';

export default function TwoStepVerification() {
  return (
    <div className="main-wrapper auth-bg">
      <div className="container-fuild">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
            <div className="col-lg-4 mx-auto">
              <form
                onSubmit={(e) => { e.preventDefault(); }}
                className="digit-group d-flex justify-content-center align-items-center"
              >
                <div className="d-flex flex-column justify-content-lg-center p-4 p-lg-0 pb-0 flex-fill">
                  <div className=" mx-auto mb-5 text-center">
                    <img src="/assets/img/logo.svg" class="img-fluid" alt="Logo" />
                  </div>
                  <div className="card border-0 p-lg-3 shadow-lg rounded-2">
                    <div className="card-body">
                      <div className="mb-3 text-center">
                        <span>
                          <i className="isax isax-tick-circle5 text-success fs-48"></i>
                        </span>
                      </div>
                      <div className="text-center mb-3">
                        <h5 className="mb-2">Reset Password</h5>
                        <p className="mb-0">We sent a code to </p>
                      </div>
                      <div className="text-center otp-input">
                        <div className="d-flex align-items-center justify-content-center mb-3">
                          <input
                            type="text"
                            className=" rounded text-center fs-26 fw-bold me-3"
                            id="digit-1"
                            name="digit-1"
                            data-next="digit-2"
                            maxlength="1"
                          />
                          <input
                            type="text"
                            className=" rounded text-center fs-26 fw-bold me-3"
                            id="digit-2"
                            name="digit-2"
                            data-next="digit-3"
                            data-previous="digit-1"
                            maxlength="1"
                          />
                          <input
                            type="text"
                            className=" rounded text-center fs-26 fw-bold me-3"
                            id="digit-3"
                            name="digit-3"
                            data-next="digit-4"
                            data-previous="digit-2"
                            maxlength="1"
                          />
                          <input
                            type="text"
                            className=" rounded text-center fs-26 fw-bold"
                            id="digit-4"
                            name="digit-4"
                            data-next="digit-5"
                            data-previous="digit-3"
                            maxlength="1"
                          />
                        </div>
                        <div className="d-flex justify-content-center">
                          <div className="mb-3 d-flex align-items-center ">
                            <p className="text-gray-9 me-4 mb-0">
                              Didn't receive code.{' '}
                              <Link href="#" className="text-primary">
                                Resend Code
                              </Link>
                            </p>
                            <span className="text-danger">00:45</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button type="submit" className="btn bg-primary-gradient text-white w-100">
                          Reset Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
