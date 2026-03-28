import React from 'react';

const UiAlerts = () => {
  return (
    <>
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">Alerts</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Base UI</Link>
            </li>
            <li className="breadcrumb-item active">Alerts</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Default Alert</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                For proper styling, use one of the eight
                <strong>required</strong> contextual classes (e.g.,
                <code>.alert-success</code>). For background color use class
                <code>.bg-* </code>, <code>.text-white </code>
              </p>
              <div className="alert alert-primary" role="alert">
                <strong>Primary - </strong> A simple primary alert—check it out!
              </div>
              <div className="alert alert-secondary" role="alert">
                <strong>Secondary - </strong> A simple secondary alert—check it out!
              </div>
              <div className="alert alert-success" role="alert">
                <strong>Success - </strong> A simple success alert—check it out!
              </div>
              <div className="alert alert-danger" role="alert">
                <strong>Danger - </strong> A simple danger alert—check it out!
              </div>
              <div className="alert alert-warning" role="alert">
                <strong>Warning - </strong> A simple warning alert—check it out!
              </div>
              <div className="alert alert-info" role="alert">
                <strong>Info - </strong> A simple info alert—check it out!
              </div>
              <div className="alert alert-light" role="alert">
                <strong>Light - </strong> A simple light alert—check it out!
              </div>
              <div className="alert alert-dark mb-0" role="alert">
                <strong>Dark - </strong> A simple dark alert—check it out!
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Dismissing Alert</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Add a dismiss button and the <code>.alert-dismissible</code> class, which adds extra
                padding to the right of the alert and positions the <code>.btn-close</code> button.
              </p>
              <div className="alert alert-primary text-bg-primary alert-dismissible" role="alert">
                <strong>Primary - </strong> A simple primary alert — check
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
              <div
                className="alert alert-secondary text-bg-secondary alert-dismissible"
                role="alert"
              >
                <strong>Secondary - </strong> A simple secondary alert — check
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
              <div className="alert alert-success text-bg-success alert-dismissible" role="alert">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
                <strong>Success - </strong> A simple success alert — check
              </div>
              <div className="alert alert-danger text-bg-danger alert-dismissible" role="alert">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
                <strong>Error - </strong> A simple danger alert — check it
              </div>
              <div className="alert alert-warning text-bg-warning alert-dismissible" role="alert">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
                <strong>Warning - </strong> A simple warning alert—check
              </div>
              <div className="alert alert-info text-bg-info alert-dismissible" role="alert">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
                <strong>Info - </strong> A simple info alert—check it out!
              </div>
              <div className="alert alert-light text-bg-light alert-dismissible" role="alert">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
                <strong>Light - </strong> A simple light alert—check it
              </div>
              <div className="alert alert-dark text-bg-dark alert-dismissible mb-0" role="alert">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
                <strong>Dark - </strong> A simple dark alert—check it out!
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Link Color</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                Use the <code>.alert-link</code> utility class to quickly provide matching colored
                links within any alert.
              </p>
              <div className="alert alert-primary" role="alert"></div>A simple primary alert with{' '}
              <Link href="#" className="alert-link">
                an example link
              </Link>
              . Give it a click if you like.
            </div>
            <div className="alert alert-secondary" role="alert"></div>A simple secondary alert with{' '}
            <Link href="#" className="alert-link">
              an example link
            </Link>
            . Give it a click if you like.
          </div>
          <div className="alert alert-success" role="alert"></div>A simple success alert with{' '}
          <Link href="#" className="alert-link">
            an example link
          </Link>
          . Give it a click if you like.
        </div>
        <div className="alert alert-danger" role="alert"></div>A simple danger alert with{' '}
        <Link href="#" className="alert-link">
          an example link
        </Link>
        . Give it a click if you like.
      </div>
      <div className="alert alert-warning" role="alert"></div>A simple warning alert with{' '}
      <Link href="#" className="alert-link">
        an example link
      </Link>
      . Give it a click if you like.
    </>
  );
};

export default UiAlerts;
