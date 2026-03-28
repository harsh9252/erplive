import React from 'react';

export default function LockScreen() {
  return (
    <div className="main-wrapper auth-bg">
      <div className="container-fuild">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
            <div className="col-lg-4 mx-auto">
              <form
                onSubmit={(e) => { e.preventDefault(); }}
                className="d-flex justify-content-center align-items-center"
              >
                <div className="d-flex flex-column justify-content-lg-center p-4 p-lg-0 pb-0 flex-fill">
                  <div className=" mx-auto mb-5 text-center">
                    <img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />
                  </div>
                  <div className="card border-0 p-lg-3 shadow-lg rounded-2">
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <h5 className="mb-2">Welcome Back!</h5>
                      </div>
                      <div className="text-center mb-3">
                        <span className="avatar avatar-xl rounded-circle flex-shrink-0">
                          <img
                            src="/assets/img/users/user-01.jpg"
                            className="rounded-circle"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="pass-group input-group">
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
                      </div>
                      <div className="mb-0">
                        <button type="submit" className="btn bg-primary-gradient text-white w-100">
                          Login
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
