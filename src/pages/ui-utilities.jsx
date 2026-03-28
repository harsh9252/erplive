import React from 'react';

const UiUtilities = () => {
  return (
    <>
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">Utilities</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Base UI</Link>
            </li>
            <li className="breadcrumb-item active">Utilities</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="header-title">Background Color</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Similar to the contextual text color classes, set the background of an element to
                any contextual class. Background utilities{' '}
                <strong>
                  do not set <code>color</code>
                </strong>
                , so in some cases you’ll want to use <code>.text-*</code>color utilities.
              </p>
              <div className="bg-primary text-white p-2 mb-2">.bg-primary</div>
              <div className="bg-secondary text-white p-2 mb-2">.bg-secondary</div>
              <div className="bg-success text-white p-2 mb-2">.bg-success</div>
              <div className="bg-danger text-white p-2 mb-2">.bg-danger</div>
              <div className="bg-warning text-dark p-2 mb-2">.bg-warning</div>
              <div className="bg-info text-dark p-2 mb-2">.bg-info</div>
              <div className="bg-light text-dark p-2 mb-2">.bg-light</div>
              <div className="bg-dark p-2 mb-2">.bg-dark</div>
              <div className="bg-body text-dark p-2 mb-2">.bg-body</div>
              <div className="bg-body-secondary text-dark p-2 mb-2">.bg-body-secondary</div>
              <div className="bg-body-tertiary text-dark p-2 mb-2">.bg-body-tertiary</div>
              <div className="bg-white p-2 mb-2">.bg-white</div>
              <div className="bg-black text-white p-2 mb-2">.bg-black</div>
              <div className="bg-transparent text-dark p-2">.bg-transparent</div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card card-h-100">
            <div className="card-header">
              <h5 className="header-title">Background Gradient Color</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                By adding a <code>.bg-gradient</code> class, a linear gradient is added as
                background image to the backgrounds. This gradient starts with a semi-transparent
                white which fades out to the bottom.
              </p>
              <div className="p-2 mb-2 bg-primary bg-gradient text-white">
                .bg-gradient.bg-primary
              </div>
              <div className="p-2 mb-2 bg-secondary bg-gradient text-white"></div>
              .bg-secondary.bg-gradient
            </div>
            <div className="p-2 mb-2 bg-success bg-gradient text-white">
              .bg-success.bg-gradient
            </div>
            <div className="p-2 mb-2 bg-danger bg-gradient text-white">.bg-danger.bg-gradient</div>
            <div className="p-2 mb-2 bg-warning bg-gradient text-dark">.bg-warning.bg-gradient</div>
            <div className="p-2 mb-2 bg-info bg-gradient text-dark">.bg-info.bg-gradient</div>
            <div className="p-2 mb-2 bg-light bg-gradient text-dark">.bg-light.bg-gradient</div>
            <div className="p-2 mb-2 bg-dark bg-gradient text-white">.bg-dark.bg-gradient</div>
            <div className="p-2 mb-2 bg-black bg-gradient text-white">.bg-black.bg-gradient</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiUtilities;
