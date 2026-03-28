import React from 'react';

const IncomingCall = () => {
  return (
    <div className="row">
      <div className="col-xxl-12">
        <div className="card incoming-call mb-0 shadow-none">
          <div className="card-body text-center d-flex flex-column justify-content-center">
            {/* Caller Image */}
            <div className="voice-call-img mb-3">
              <img
                src="/assets/img/users/user-01.jpg"
                className="img-fluid rounded-circle"
                alt="Anthony Lewis"
              />
            </div>

            {/* Caller Name */}
            <h5>Anthony Lewis</h5>
            <p>Calling...</p>

            {/* Call Actions */}
            <div className="d-flex align-items-center justify-content-center">
              <Link
                href="#"
                className="btn btn-success call-item p-0 d-flex align-items-center justify-content-center me-3"
                title="Accept Call"
              >
                <i className="ti ti-phone fs-20"></i>
              </Link>
              <Link
                href="#"
                className="btn btn-danger call-item p-0 d-flex align-items-center justify-content-center"
                title="Reject Call"
              >
                <i className="ti ti-phone-off fs-20"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
