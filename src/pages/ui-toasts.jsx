import React from 'react';

const UiToasts = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h3>Toastr</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header justify-content-between">
              <div className="card-title"></div>
              Live example
            </div>
          </div>
          <div className="card-body">
            <button type="button" className="btn btn-primary btn-wave" id="liveToastBtn">
              Show live toast
            </button>
            <div className="toast-container position-fixed top-0 end-0 p-3">
              <div
                id="liveToast"
                className="toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="toast-header text-default">
                  <strong className="me-auto">Toast</strong>
                  <small>11 mins ago</small>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="toast-body"></div>
                Hello, world! This is a toast message.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header justify-content-between">
          <div className="card-title"></div>
          Color schemes
        </div>
      </div>
      <div className="card-body">
        <div
          className="toast align-items-center text-bg-primary border-0 fade show mb-3"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body"></div>
            Hello, world! This is the Primary toast message.
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
      <div
        className="toast align-items-center text-bg-secondary border-0 fade show mb-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body"></div>
          Hello, world! This is the Secondary toast.
        </div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </>
  );
};

export default UiToasts;
