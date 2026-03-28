import React from 'react';
import { Link } from 'react-router-dom';

const UiModals = () => {
  return (
    <>
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">Modals</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link  href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link  href="javascript: void(0);">Base UI</Link>
            </li>
            <li className="breadcrumb-item active">Modals</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Bootstrap Modals</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">
                A rendered modal with header, body, and set of actions in the footer.
              </p>
              <div
                id="standard-modal"
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="standard-modalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title" id="standard-modalLabel">
                        Modal Heading
                      </h4>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <h5>Text in a modal</h5>
                      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                      <hr />
                      <h5>Overflowing text to show scroll behavior</h5>
                      <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus
                        ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur
                        ac, vestibulum at eros.
                      </p>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                        sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                      </p>
                      <p className="mb-0">
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                        magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                        ullamcorper nulla non metus auctor fringilla.
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="bs-example-modal-lg"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title" id="myLargeModalLabel">
                        Large modal
                      </h4>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body"></div>
                    ...
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="bs-example-modal-sm"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="mySmallModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-sm">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="mySmallModalLabel">
                      Small modal
                    </h4>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body"></div>
                  ...
                </div>
              </div>
            </div>
          </div>
          <div
            id="full-width-modal"
            className="modal fade"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="fullWidthModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-full-width">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="fullWidthModalLabel">
                    Modal Heading
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h5>Text in a modal</h5>
                  <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                  <hr />
                  <h5>Overflowing text to show scroll behavior</h5>
                  <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                    vestibulum at eros.
                  </p>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                  <p className="mb-0">
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
                    vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla.
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="scrollable-modal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="scrollableModalTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="scrollableModalTitle">
                    Modal title
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                    vestibulum at eros.
                  </p>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                  <p>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
                    vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla.
                  </p>
                  <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                    vestibulum at eros.
                  </p>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                  <p>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
                    vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla.
                  </p>
                  <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                    vestibulum at eros.
                  </p>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                  <p>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
                    vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla.
                  </p>
                  <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                    vestibulum at eros.
                  </p>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                  <p>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
                    vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla.
                  </p>
                  <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                    vestibulum at eros.
                  </p>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                  <p>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
                    vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla.
                  </p>
                  <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                    facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                    vestibulum at eros.
                  </p>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                  <p className="mb-0">
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
                    vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla
                    non metus auctor fringilla.
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#standard-modal"
            >
              Standard Modal
            </button>
            <button
              type="button"
              className="btn btn-info"
              data-bs-toggle="modal"
              data-bs-target="#bs-example-modal-lg"
            >
              Large Modal
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#bs-example-modal-sm"
            >
              Small Modal
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#full-width-modal"
            >
              Full Width Modal
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#scrollable-modal"
            >
              Scrollable Modal
            </button>
          </div>
        </div>
      </div>
      <div id="top-modal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-top">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="topModalLabel">
                Modal Heading
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="mt-0">Text in a modal</h5>
              <p className="mb-0">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="bottom-modal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-bottom">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="bottomModalLabel">
                Modal Heading
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="mt-0">Text in a modal</h5>
              <p className="mb-0">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="centermodal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myCenterModalLabel">
                Center Modal
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="mt-0">Overflowing text to show scroll behavior</h5>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p className="mb-0">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="signup-modal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="auth-brand text-center mt-2 mb-3 position-relative top-0">
                <Link to="/index" className="logo-dark">
                  <span>
                    <img src="/assets/img/logo-white.svg" alt="dark logo" height="33" />
                  </span>
                </Link>
                <Link to="/index" className="logo-light">
                  <span>
                    <img src="/assets/img/logo.svg" alt="logo" height="33" />
                  </span>
                </Link>
              </div>
              <form className="ps-3 pe-3" action="#">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Name
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="username"
                    required=""
                    placeholder="Michael Zenaty"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailaddress" className="form-label">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="emailaddress"
                    required=""
                    placeholder="john@deo.com"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    required=""
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input fs-15" id="customCheck1" />
                    <label className="form-check-label" htmlFor="customCheck1">
                      I accept <Link  href="#">Terms and Conditions</Link>
                    </label>
                  </div>
                </div>
                <div className="mb-3 text-center">
                  <button className="btn btn-primary" type="submit">
                    Sign Up Free
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="login-modal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="auth-brand text-center mt-2 mb-3 position-relative top-0">
                <Link to="/index" className="logo-dark">
                  <span>
                    <img src="/assets/img/logo-white.svg" alt="dark logo" height="22" />
                  </span>
                </Link>
                <Link to="/index" className="logo-light">
                  <span>
                    <img src="/assets/img/logo.svg" alt="logo" height="22" />
                  </span>
                </Link>
              </div>
              <form action="#" className="ps-3 pe-3">
                <div className="mb-3">
                  <label htmlFor="emailaddress1" className="form-label">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="emailaddress1"
                    required=""
                    placeholder="john@deo.com"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password1" className="form-label">
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    required=""
                    id="password1"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="RememberCheckBox" />
                    <label className="form-check-label" htmlFor="RememberCheckBox">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="mb-3 text-center">
                  <button className="btn rounded-pill btn-primary" type="submit">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        id="success-alert-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content modal-filled bg-success">
            <div className="modal-body p-4">
              <div className="text-center">
                <i className="ti ti-check h1"></i>
                <h4 className="mt-2">Well Done!</h4>
                <p className="mt-3">
                  Congratulations! You've achieved success! 🎉 Your hard work, dedication, and
                  perseverance have paid off. Keep up the great work and continue to strive for
                  excellence.
                </p>
                <button type="button" className="btn btn-secondary my-2" data-bs-dismiss="modal">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="info-alert-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-body p-4">
              <div className="text-center">
                <i className="ti ti-info-square-rounded h1 text-info"></i>
                <h4 className="mt-2">Heads up!</h4>
                <p className="mt-3">
                  Please be informed that our platform will undergo scheduled maintenance on 21
                  April from 10:30 PM to 11:45 PM.
                </p>
                <button type="button" className="btn btn-info my-2" data-bs-dismiss="modal">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="warning-alert-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-body p-4">
              <div className="text-center">
                <i className="ti ti-alert-circle h1 text-warning"></i>
                <h4 className="mt-2">Incorrect Information</h4>
                <p className="mt-3">
                  We have detected suspicious activity on our platform. As a precautionary measure,
                  we urge all users to refrain from logging in or providing any personal information
                  until further notice.
                </p>
                <button type="button" className="btn btn-warning my-2" data-bs-dismiss="modal">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="danger-alert-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content modal-filled bg-danger">
            <div className="modal-body p-4">
              <div className="text-center">
                <i className="ti ti-circle-x h1"></i>
                <h4 className="mt-2">Oh snap!</h4>
                <p className="mt-3">
                  A critical security breach has been identified on our platform. Your personal
                  information and sensitive data may be at risk.
                </p>
                <button type="button" className="btn btn-secondary my-2" data-bs-dismiss="modal">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="primary-header-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="primary-header-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-bg-primary border-0">
              <h4 className="modal-title" id="primary-header-modalLabel">
                Modal Heading
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="mt-0">Primary Background</h5>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p className="mb-0">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="success-header-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="success-header-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-bg-success border-0">
              <h4 className="modal-title" id="success-header-modalLabel">
                Modal Heading
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="mt-0">Success Background</h5>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p className="mb-0">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-success">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="info-header-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="info-header-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-bg-info border-0">
              <h4 className="modal-title" id="info-header-modalLabel">
                Modal Heading
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="mt-0">Info Background</h5>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p className="mb-0">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-info">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="warning-header-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="warning-header-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-bg-warning border-0">
              <h4 className="modal-title" id="warning-header-modalLabel">
                Modal Heading
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="mt-0">Warning Background</h5>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p className="mb-0">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-warning">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="danger-header-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="danger-header-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-bg-danger border-0">
              <h4 className="modal-title" id="danger-header-modalLabel">
                Modal Heading
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="mt-0">Danger Background</h5>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p className="mb-0">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-danger">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="dark-header-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="dark-header-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-bg-dark border-0">
              <h4 className="modal-title" id="dark-header-modalLabel">
                Modal Heading
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="mt-0">Dark Background</h5>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p className="mb-0">
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-dark">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="fill-primary-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="fill-primary-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-filled bg-primary">
            <div className="modal-header">
              <h4 className="modal-title" id="fill-primary-modalLabel">
                Primary Filled Modal
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-secondary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="fill-success-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="fill-success-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-filled bg-success">
            <div className="modal-header">
              <h4 className="modal-title" id="fill-success-modalLabel">
                Success Filled Modal
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-secondary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="fill-info-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="fill-info-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-filled bg-info">
            <div className="modal-header">
              <h4 className="modal-title" id="fill-info-modalLabel">
                Info Filled Modal
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-secondary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="fill-warning-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="fill-warning-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-filled bg-warning">
            <div className="modal-header">
              <h4 className="modal-title" id="fill-warning-modalLabel">
                Warning Filled Modal
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-secondary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="fill-danger-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="fill-danger-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-filled bg-danger">
            <div className="modal-header">
              <h4 className="modal-title" id="fill-danger-modalLabel">
                Danger Filled Modal
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-info" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-secondary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="fill-dark-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="fill-dark-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-filled bg-dark">
            <div className="modal-header">
              <h4 className="modal-title" id="fill-dark-modalLabel">
                Dark Filled Modal
              </h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-secondary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="multiple-one"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="multiple-oneModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="multiple-oneModalLabel">
                Modal Heading
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="mt-0">Text in a modal</h5>
              <p className="mb-0">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-target="#multiple-two"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="multiple-two"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="multiple-twoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="multiple-twoModalLabel">
                Modal Heading
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="mt-0">Text in a modal</h5>
              <p className="mb-0">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Modal 1
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            Show a second modal and hide this one with the button below.
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Open second modal
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                Modal 2
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            Hide this modal and show the first with the button below.
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Back to first
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="fullscreeexampleModal"
        tabIndex="-1"
        aria-labelledby="fullscreeexampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="fullscreeexampleModalLabel">
                Full Screen Modal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            ...
          </div>
          <div className="modal-footer">
            <Link  href="#" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </Link>
            <button type="button" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalFullscreenSm"
        tabIndex="-1"
        aria-labelledby="exampleModalFullscreenSmLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalFullscreenSmLabel">
                Full screen below sm
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            ...
          </div>
          <div className="modal-footer">
            <Link  href="#" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </Link>
            <button type="button" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalFullscreenMd"
        tabIndex="-1"
        aria-labelledby="exampleModalFullscreenMdLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-md-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalFullscreenMdLabel">
                Full screen below md
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            ...
          </div>
          <div className="modal-footer">
            <Link  href="#" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </Link>
            <button type="button" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalFullscreenLg"
        tabIndex="-1"
        aria-labelledby="exampleModalFullscreenLgLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-lg-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalFullscreenLgLabel">
                Full screen below lg
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            ...
          </div>
          <div className="modal-footer">
            <Link  href="#" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </Link>
            <button type="button" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalFullscreenXl"
        tabIndex="-1"
        aria-labelledby="exampleModalFullscreenXlLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalFullscreenXlLabel">
                Full screen below xl
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            ...
          </div>
          <div className="modal-footer">
            <Link  href="#" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </Link>
            <button type="button" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalFullscreenXxl"
        tabIndex="-1"
        aria-labelledby="exampleModalFullscreenXxlLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-xxl-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalFullscreenXxlLabel">
                Full screen below xxl
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"></div>
            ...
          </div>
          <div className="modal-footer">
            <Link  href="#" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </Link>
            <button type="button" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New message
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Recipient:
                  </label>
                  <input type="text" className="form-control" id="recipient-name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Message:
                  </label>
                  <textarea className="form-control" id="message-text"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="m-0">
                I will not close if you click outside me. Don't even try to press escape key.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalPopovers"
        tabIndex="-1"
        aria-labelledby="exampleModalPopoversLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title " id="exampleModalPopove	rsLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h2 className="fs-12">Popover in a modal</h2>
              <p>
                This
                <button
                  className="btn btn-secondary"
                  data-bs-toggle="popover"
                  title="Popover title"
                  data-bs-content="Popover body content is set in this attribute."
                >
                  button
                </button>{' '}
                triggers a popover on click.
              </p>
              <hr />
              <h2 className="fs-12">Tooltips in a modal</h2>
              <p>
                <Link  href="#" className="text-primary" data-bs-toggle="tooltip" title="Tooltip">
                  This link
                </Link>{' '}
                and{' '}
                <Link  href="#" className="text-primary" data-bs-toggle="tooltip" title="Tooltip">
                  that link
                </Link>{' '}
                have tooltips on hover.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiModals;
