import React from 'react';

const FormWizard = () => {
  return (
    <>
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">Form Wizard</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Forms</Link>
            </li>
            <li className="breadcrumb-item active">Form Wizard</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header border-bottom d-flex align-items-center">
              <h4 className="header-title">A Basic Wizard</h4>
            </div>
            <div className="card-body">
              <form>
                <div id="basicwizard">
                  <ul className="nav nav-pills nav-justified form-wizard-header mb-3">
                    <li className="nav-item">
                      <Link
                        href="#basictab1"
                        data-bs-toggle="tab"
                        data-toggle="tab"
                        className="nav-link rounded-0 py-2"
                      >
                        <i className="bi bi-person-circle fs-18 align-middle me-1"></i>
                        <span className="d-none d-sm-inline">Account</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#basictab2"
                        data-bs-toggle="tab"
                        data-toggle="tab"
                        className="nav-link rounded-0 py-2"
                      >
                        <i className="bi bi-emoji-smile fs-18 align-middle me-1"></i>
                        <span className="d-none d-sm-inline">Profile</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#basictab3"
                        data-bs-toggle="tab"
                        data-toggle="tab"
                        className="nav-link rounded-0 py-2"
                      >
                        <i className="bi bi-check2-circle fs-18 align-middle me-1"></i>
                        <span className="d-none d-sm-inline">Finish</span>
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content b-0 mb-0">
                    <div className="tab-pane" id="basictab1">
                      <div className="row">
                        <div className="col-12">
                          <div className="row mb-3">
                            <label className="col-md-3 col-form-label" htmlFor="userName">
                              User name
                            </label>
                            <div className="col-md-9">
                              <input
                                type="text"
                                className="form-control"
                                id="userName"
                                name="userName"
                                value="johne"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-md-3 col-form-label" htmlFor="password">
                              {' '}
                              Password
                            </label>
                            <div className="col-md-9">
                              <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value="123456789"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-md-3 col-form-label" htmlFor="confirm">
                              Re Password
                            </label>
                            <div className="col-md-9">
                              <input
                                type="password"
                                id="confirm"
                                name="confirm"
                                className="form-control"
                                value="123456789"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="basictab2">
                      <div className="row">
                        <div className="col-12">
                          <div className="row mb-3">
                            <label className="col-md-3 col-form-label" htmlFor="name">
                              {' '}
                              First name
                            </label>
                            <div className="col-md-9">
                              <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value="Francis"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-md-3 col-form-label" htmlFor="surname">
                              {' '}
                              Last name
                            </label>
                            <div className="col-md-9">
                              <input
                                type="text"
                                id="surname"
                                name="surname"
                                className="form-control"
                                value="Brinkman"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-md-3 col-form-label" htmlFor="email">
                              Email
                            </label>
                            <div className="col-md-9">
                              <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value="cory1979@hotmail.com"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="basictab3">
                      <div className="row">
                        <div className="col-12">
                          <div className="text-center">
                            <h2 className="mt-0">
                              <i className="bi bi-check2-all"></i>
                            </h2>
                            <h3 className="mt-0">Thank you !</h3>
                            <p className="w-75 mb-2 mx-auto">
                              Quisque nec turpis at urna dictum luctus. Suspendisse convallis
                              dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis
                              dictum aliquet.
                            </p>
                            <div className="mb-3">
                              <div className="form-check d-inline-block">
                                <input
                                  type="checkbox"
                                  className="form-check-input fs-15"
                                  id="customCheck1"
                                />
                                <label className="form-check-label" htmlFor="customCheck1">
                                  I agree with the Terms and Conditions
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex wizard justify-content-between flex-wrap gap-2 mt-3">
                      <div className="first">
                        <Link href="#" className="btn btn-primary">
                          First
                        </Link>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <div className="previous">
                          <Link href="#" className="btn btn-primary">
                            <i className="bx bx-left-arrow-alt me-2"></i>Back To Previous
                          </Link>
                        </div>
                        <div className="next">
                          <Link href="#" className="btn btn-primary mt-3 mt-md-0">
                            Next Step<i className="bx bx-right-arrow-alt ms-2"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="last">
                        <Link href="#" className="btn btn-primary mt-3 mt-md-0">
                          Finish
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header border-bottom d-flex align-items-center">
              <h4 className="header-title">Wizard With Progress Bar</h4>
            </div>
            <div className="card-body">
              <form>
                <div id="progressbarwizard">
                  <ul className="nav nav-pills nav-justified form-wizard-header mb-3">
                    <li className="nav-item">
                      <Link
                        href="#account-2"
                        data-bs-toggle="tab"
                        data-toggle="tab"
                        className="nav-link rounded-0 py-2"
                      >
                        <i className="bi bi-person-circle fs-18 align-middle me-1"></i>
                        <span className="d-none d-sm-inline">Account</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#profile-tab-2"
                        data-bs-toggle="tab"
                        data-toggle="tab"
                        className="nav-link rounded-0 py-2"
                      >
                        <i className="bi bi-emoji-smile fs-18 align-middle me-1"></i>
                        <span className="d-none d-sm-inline">Profile</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="#finish-2"
                        data-bs-toggle="tab"
                        data-toggle="tab"
                        className="nav-link rounded-0 py-2"
                      >
                        <i className="bi bi-check2-circle fs-18 align-middle me-1"></i>
                        <span className="d-none d-sm-inline">Finish</span>
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content b-0 mb-0">
                    <div id="bar" className="progress mb-3" style={{ height: '7px' }}>
                      <div className="bar progress-bar progress-bar-striped progress-bar-animated bg-success"></div>
                    </div>
                    <div className="tab-pane" id="account-2">
                      <div className="row">
                        <div className="col-12">
                          <div className="row mb-3">
                            <label className="col-md-3 col-form-label" htmlFor="userName1">
                              User name
                            </label>
                            <div className="col-md-9">
                              <input
                                type="text"
                                className="form-control"
                                id="userName1"
                                name="userName1"
                                value="johne"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-md-3 col-form-label" htmlFor="password1">
                              {' '}
                              Password
                            </label>
                            <div className="col-md-9">
                              <input
                                type="password"
                                id="password1"
                                name="password1"
                                className="form-control"
                                value="123456789"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-md-3 col-form-label" htmlFor="confirm1">
                              Re Password
                            </label>
                            <div className="col-md-9">
                              <input
                                type="password"
                                id="confirm1"
                                name="confirm1"
                                className="form-control"
                                value="123456789"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="profile-tab-2">
                      <div className="row">
                        <div className="col-12">
                          <div className="row mb-3">
                            <label className="col-md-3 col-form-label" htmlFor="name1">
                              {' '}
                              First name
                            </label>
                            <div className="col-md-9">
                              <input
                                type="text"
                                id="name1"
                                name="name1"
                                className="form-control"
                                value="Francis"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-md-3 col-form-label" htmlFor="surname1">
                              {' '}
                              Last name
                            </label>
                            <div className="col-md-9">
                              <input
                                type="text"
                                id="surname1"
                                name="surname1"
                                className="form-control"
                                value="Brinkman"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-md-3 col-form-label" htmlFor="email1">
                              Email
                            </label>
                            <div className="col-md-9">
                              <input
                                type="email"
                                id="email1"
                                name="email1"
                                className="form-control"
                                value="cory1979@hotmail.com"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="finish-2">
                      <div className="row">
                        <div className="col-12">
                          <div className="text-center">
                            <h2 className="mt-0">
                              <i className="bi bi-check2-all"></i>
                            </h2>
                            <h3 className="mt-0">Thank you !</h3>
                            <p className="w-75 mb-2 mx-auto">
                              Quisque nec turpis at urna dictum luctus. Suspendisse convallis
                              dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis
                              dictum aliquet.
                            </p>
                            <div className="mb-3">
                              <div className="form-check d-inline-block">
                                <input
                                  type="checkbox"
                                  className="form-check-input fs-15"
                                  id="customCheck3"
                                />
                                <label className="form-check-label" htmlFor="customCheck3">
                                  I agree with the Terms and Conditions
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex wizard justify-content-between flex-wrap gap-2 mt-3">
                      <div className="first">
                        <Link href="#" className="btn btn-primary">
                          First
                        </Link>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <div className="previous">
                          <Link href="#" className="btn btn-primary">
                            <i className="bx bx-left-arrow-alt me-2"></i>Back To Previous
                          </Link>
                        </div>
                        <div className="next">
                          <Link href="#" className="btn btn-primary mt-3 mt-md-0">
                            Next Step<i className="bx bx-right-arrow-alt ms-2"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="last">
                        <Link href="#" className="btn btn-primary mt-3 mt-md-0">
                          Finish
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header border-bottom d-flex align-items-center">
              <h4 className="header-title">Wizard With Form Validation</h4>
            </div>
            <div className="card-body">
              <form>
                <div id="validation-wizard">
                  <ul className="nav nav-pills nav-justified form-wizard-header mb-3">
                    <li className="nav-item" data-target-form="#accountForm">
                      <Link
                        href="#first"
                        data-bs-toggle="tab"
                        data-toggle="tab"
                        className="nav-link rounded-0 py-2"
                      >
                        <i className="bi bi-person-circle fs-18 align-middle me-1"></i>
                        <span className="d-none d-sm-inline">Account</span>
                      </Link>
                    </li>
                    <li className="nav-item" data-target-form="#profileForm">
                      <Link
                        href="#second"
                        data-bs-toggle="tab"
                        data-toggle="tab"
                        className="nav-link rounded-0 py-2"
                      >
                        <i className="bi bi-emoji-smile fs-18 align-middle me-1"></i>
                        <span className="d-none d-sm-inline">Profile</span>
                      </Link>
                    </li>
                    <li className="nav-item" data-target-form="#otherForm">
                      <Link
                        href="#third"
                        data-bs-toggle="tab"
                        data-toggle="tab"
                        className="nav-link rounded-0 py-2"
                      >
                        <i className="bi bi-check2-circle fs-18 align-middle me-1"></i>
                        <span className="d-none d-sm-inline">Finish</span>
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane" id="first">
                      <form id="accountForm" method="post" action="#" className="form-horizontal">
                        <div className="row">
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="userName3">
                                User name
                              </label>
                              <div className="col-md-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="userName3"
                                  name="userName3"
                                  required
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="password3">
                                {' '}
                                Password
                              </label>
                              <div className="col-md-9">
                                <input
                                  type="password"
                                  id="password3"
                                  name="password3"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="confirm3">
                                Re Password
                              </label>
                              <div className="col-md-9">
                                <input
                                  type="password"
                                  id="confirm3"
                                  name="confirm3"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="tab-pane fade" id="second">
                      <form id="profileForm" method="post" action="#" className="form-horizontal">
                        <div className="row">
                          <div className="col-12">
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="name3">
                                {' '}
                                First name
                              </label>
                              <div className="col-md-9">
                                <input
                                  type="text"
                                  id="name3"
                                  name="name3"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="surname3">
                                {' '}
                                Last name
                              </label>
                              <div className="col-md-9">
                                <input
                                  type="text"
                                  id="surname3"
                                  name="surname3"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label className="col-md-3 col-form-label" htmlFor="email3">
                                Email
                              </label>
                              <div className="col-md-9">
                                <input
                                  type="email"
                                  id="email3"
                                  name="email3"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="tab-pane fade" id="third">
                      <form id="otherForm" method="post" action="#" className="form-horizontal">
                        <div className="row">
                          <div className="col-12">
                            <div className="text-center">
                              <h2 className="mt-0">
                                <i className="bi bi-check2-all"></i>
                              </h2>
                              <h3 className="mt-0">Thank you !</h3>
                              <p className="w-75 mb-2 mx-auto">
                                Quisque nec turpis at urna dictum luctus. Suspendisse convallis
                                dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis
                                dictum aliquet.
                              </p>
                              <div className="mb-3">
                                <div className="form-check d-inline-block">
                                  <input
                                    type="checkbox"
                                    className="form-check-input fs-15"
                                    id="customCheck4"
                                    required
                                  />
                                  <label className="form-check-label" htmlFor="customCheck4">
                                    I agree with the Terms and Conditions
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="d-flex wizard justify-content-between flex-wrap gap-2 mt-3">
                      <div className="first">
                        <Link href="#" className="btn btn-primary">
                          First
                        </Link>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <div className="previous">
                          <Link href="#" className="btn btn-primary">
                            <i className="bx bx-left-arrow-alt me-2"></i>Back To Previous
                          </Link>
                        </div>
                        <div className="next">
                          <Link href="#" className="btn btn-primary mt-3 mt-md-0">
                            Next Step<i className="bx bx-right-arrow-alt ms-2"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="last">
                        <Link href="#" className="btn btn-primary mt-3 mt-md-0">
                          Finish
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormWizard;
