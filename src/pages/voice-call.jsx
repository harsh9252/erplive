import React from 'react';

const VoiceCall = () => {
  return (
    <div className="col-xxl-12">
      <div className="card incoming-call mb-0 shadow-none">
        {/* Card Header */}
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span className="avatar avatar-lg avatar-rounded me-2">
                <img
                  src="/assets/img/users/user-01.jpg"
                  className="img-fluid rounded-circle"
                  alt="Anthony Lewis"
                />
              </span>
              <div>
                <h6 className="mb-1">
                  <Link href="#">Anthony Lewis</Link>
                </h6>
                <span className="d-block">Online</span>
              </div>
            </div>
            <Link href="#" className="avatar avatar-md rounded-circle bg-light text-dark">
              <i className="ti ti-user-plus fs-20"></i>
            </Link>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body position-relative text-center d-flex flex-column justify-content-center">
          <div className="voice-call-img mb-3">
            <img
              src="/assets/img/users/user-01.jpg"
              className="img-fluid rounded-circle"
              alt="Anthony Lewis"
            />
          </div>
          <h5>Anthony Lewis</h5>
          <p>00:24</p>
          <Link href="#" className="avatar avatar-xl position-absolute end-0 bottom-0 m-3">
            <img src="/assets/img/users/user-05.jpg" alt="User Avatar" />
          </Link>
        </div>

        {/* Card Footer */}
        <div className="card-footer bg-white">
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
              className="btn btn-danger call-item p-0 d-flex align-items-center justify-content-center me-3"
              title="End Call"
            >
              <i className="ti ti-phone fs-20"></i>
            </Link>
            <Link
              href="#"
              className="btn btn-light call-item p-0 d-flex align-items-center justify-content-center"
              title="Microphone"
            >
              <i className="ti ti-microphone fs-20"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCall;
