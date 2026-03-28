import React from 'react';

const OutgoingCall = () => {
  return (
    <div className="row">
      <div className="col-xxl-12">
        <div className="card incoming-call mb-0 shadow-none">
          <div className="card-body text-center d-flex flex-column justify-content-center">
            {/* Recipient Image */}
            <div className="voice-call-img mb-3">
              <img
                src="/assets/img/users/user-01.jpg"
                className="img-fluid rounded-circle"
                alt="Anthony Lewis"
              />
            </div>

            {/* Recipient Name */}
            <h5>Anthony Lewis</h5>
            <p>Calling...</p>

            {/* Call Controls */}
            <div className="d-flex align-items-center justify-content-center">
              <Link
                href="#"
                className="btn btn-light call-item p-0 d-flex align-items-center justify-content-center me-3"
                title="Video Call"
              >
                <i className="ti ti-video fs-20"></i>
              </Link>
              <Link
                href="#"
                className="btn btn-light call-item p-0 d-flex align-items-center justify-content-center me-3"
                title="Microphone"
              >
                <i className="ti ti-microphone fs-20"></i>
              </Link>
              <Link
                href="#"
                className="btn btn-danger call-item p-0 d-flex align-items-center justify-content-center me-3"
                title="End Call"
              >
                <i className="ti ti-phone-off fs-20"></i>
              </Link>
              <Link
                href="#"
                className="btn btn-light call-item p-0 d-flex align-items-center justify-content-center me-3"
                title="Add User"
              >
                <i className="ti ti-user-plus fs-20"></i>
              </Link>
              <Link
                href="#"
                className="btn btn-light call-item p-0 d-flex align-items-center justify-content-center"
                title="Volume"
              >
                <i className="ti ti-volume fs-20"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutgoingCall;
