import React from 'react';

const FormValidation = () => {
  return (
    <>
      {/* Header */}
      <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 pb-3">
        <div className="flex-grow-1">
          <h4 className="fs-18 fw-semibold mb-0">Form Validation</h4>
        </div>
        <div className="text-end">
          <ol className="breadcrumb m-0 py-0">
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="javascript: void(0);">Forms</Link>
            </li>
            <li className="breadcrumb-item active">Form Validation</li>
          </ol>
        </div>
      </div>

      {/* Custom Bootstrap Form Validation */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Custom Bootstrap Form Validation</h5>
            </div>
            <div className="card-body">
              <p>
                For custom Bootstrap form validation messages, you'll need to add the{' '}
                <code>novalidate</code> boolean attribute to your form. For server side validation{' '}
                <Link
                  href="https://getbootstrap.com/docs/4.1/components/forms/#server-side"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary"
                >
                  read full documentation
                </Link>
                .
              </p>
              <div className="row">
                <div className="col-sm">
                  <form className="needs-validation" noValidate>
                    <div className="form-row row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label" htmlFor="validationCustom01">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          placeholder="First name"
                          defaultValue="Mark"
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label" htmlFor="validationCustom02">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom02"
                          placeholder="Last name"
                          defaultValue="Otto"
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label" htmlFor="validationCustomUsername">
                          Username
                        </label>
                        <div className="input-group">
                          <span className="input-group-text" id="inputGroupPrepend">
                            @
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustomUsername"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            required
                          />
                          <div className="invalid-feedback">Please choose a username.</div>
                        </div>
                      </div>
                    </div>
                    <div className="form-row row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label" htmlFor="validationCustom03">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom03"
                          placeholder="City"
                          required
                        />
                        <div className="invalid-feedback">Please provide a valid city.</div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label" htmlFor="validationCustom04">
                          State
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom04"
                          placeholder="State"
                          required
                        />
                        <div className="invalid-feedback">Please provide a valid state.</div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label" htmlFor="validationCustom05">
                          Zip
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationCustom05"
                          placeholder="Zip"
                          required
                        />
                        <div className="invalid-feedback">Please provide a valid zip.</div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck"
                          required
                        />
                        <label className="form-check-label" htmlFor="invalidCheck">
                          Agree to terms and conditions
                        </label>
                        <div className="invalid-feedback">You must agree before submitting.</div>
                      </div>
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Submit form
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Browser defaults */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Browser defaults</h5>
            </div>
            <div className="card-body">
              <p>
                Not interested in custom validation feedback messages or writing JavaScript to
                change form behaviors? All good, you can use the browser defaults. Try submitting
                the form below.
              </p>
              <div className="row">
                <div className="col-sm">
                  <form>
                    <div className="form-row row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label" htmlFor="validationDefault01">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationDefault01"
                          placeholder="First name"
                          defaultValue="Mark"
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label" htmlFor="validationDefault02">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationDefault02"
                          placeholder="Last name"
                          defaultValue="Otto"
                          required
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label" htmlFor="validationDefaultUsername">
                          Username
                        </label>
                        <div className="input-group">
                          <span className="input-group-text" id="inputGroupPrepend2">
                            @
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="validationDefaultUsername"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend2"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-row row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label" htmlFor="validationDefault03">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationDefault03"
                          placeholder="City"
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label" htmlFor="validationDefault04">
                          State
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationDefault04"
                          placeholder="State"
                          required
                        />
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label" htmlFor="validationDefault05">
                          Zip
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationDefault05"
                          placeholder="Zip"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck2"
                          required
                        />
                        <label className="form-check-label" htmlFor="invalidCheck2">
                          Agree to terms and conditions
                        </label>
                      </div>
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Submit form
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Server side validation */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Server side</h5>
            </div>
            <div className="card-body">
              <p>
                We recommend using client side validation, but in case you require server side, you
                can indicate invalid and valid form fields with <code>.is-invalid</code> and{' '}
                <code>.is-valid</code>. Note that <code>.invalid-feedback</code> is also supported
                with these classes.
              </p>
              <form>
                <div className="form-row row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="validationServer01">
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control is-valid"
                      id="validationServer01"
                      placeholder="First name"
                      defaultValue="Mark"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="validationServer02">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control is-valid"
                      id="validationServer02"
                      placeholder="Last name"
                      defaultValue="Otto"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="validationServerUsername">
                      Username
                    </label>
                    <div className="input-group input-grp">
                      <span className="input-group-text" id="inputGroupPrepend3">
                        @
                      </span>
                      <input
                        type="text"
                        className="form-control is-invalid"
                        id="validationServerUsername"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend3"
                        required
                      />
                      <div className="invalid-feedback">Please choose a username.</div>
                    </div>
                  </div>
                </div>
                <div className="form-row row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="validationServer03">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control is-invalid"
                      id="validationServer03"
                      placeholder="City"
                      required
                    />
                    <div className="invalid-feedback">Please provide a valid city.</div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label" htmlFor="validationServer04">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control is-invalid"
                      id="validationServer04"
                      placeholder="State"
                      required
                    />
                    <div className="invalid-feedback">Please provide a valid state.</div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label" htmlFor="validationServer05">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control is-invalid"
                      id="validationServer05"
                      placeholder="Zip"
                      required
                    />
                    <div className="invalid-feedback">Please provide a valid zip.</div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input is-invalid"
                      type="checkbox"
                      value=""
                      id="invalidCheck3"
                      required
                    />
                    <label className="form-check-label" htmlFor="invalidCheck3">
                      Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">You must agree before submitting.</div>
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">
                  Submit form
                </button>
              </form>
            </div>
          </div>

          {/* Supported elements */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Supported elements</h5>
            </div>
            <div className="card-body pb-1">
              <p>Form validation styles are also available for bootstrap custom form controls.</p>
              <div className="row">
                <div className="col-sm">
                  <form className="was-validated">
                    <div className="mb-3">
                      <label htmlFor="validationTextarea" className="form-label">
                        Textarea
                      </label>
                      <textarea
                        className="form-control is-invalid"
                        id="validationTextarea"
                        placeholder="Required example textarea"
                        required
                      ></textarea>
                      <div className="invalid-feedback">
                        Please enter a message in the textarea.
                      </div>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="validationFormCheck1"
                        required
                      />
                      <label className="form-check-label" htmlFor="validationFormCheck1">
                        Check this checkbox
                      </label>
                      <div className="invalid-feedback">Example invalid feedback text</div>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="validationFormCheck2"
                        name="radio-stacked"
                        required
                      />
                      <label className="form-check-label" htmlFor="validationFormCheck2">
                        Toggle this radio
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="validationFormCheck3"
                        name="radio-stacked"
                        required
                      />
                      <label className="form-check-label" htmlFor="validationFormCheck3">
                        Or toggle this other radio
                      </label>
                      <div className="invalid-feedback">More example invalid feedback text</div>
                    </div>
                    <div className="mb-3">
                      <select className="form-select" required aria-label="select example">
                        <option value="">Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <div className="invalid-feedback">Example invalid select feedback</div>
                    </div>
                    <div className="mb-3">
                      <input
                        type="file"
                        className="form-control"
                        aria-label="file example"
                        required
                      />
                      <div className="invalid-feedback">Example invalid form file feedback</div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Tooltips */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Tooltips</h5>
            </div>
            <div className="card-body">
              <p>
                You can swap the <code>.valid-feedback</code> and <code>.invalid-feedback</code>{' '}
                classes for <code>.valid-tooltip</code> and <code>.invalid-tooltip</code> classes to
                display validation feedback in a styled tooltip.
              </p>
              <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-4 position-relative">
                  <label htmlFor="validationTooltip01" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationTooltip01"
                    defaultValue="Mark"
                    required
                  />
                  <div className="valid-tooltip">Looks good!</div>
                </div>
                <div className="col-md-4 position-relative">
                  <label htmlFor="validationTooltip02" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationTooltip02"
                    defaultValue="Otto"
                    required
                  />
                  <div className="valid-tooltip">Looks good!</div>
                </div>
                <div className="col-md-4 position-relative">
                  <label htmlFor="validationTooltipUsername" className="form-label">
                    Username
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text" id="validationTooltipUsernamePrepend">
                      @
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="validationTooltipUsername"
                      aria-describedby="validationTooltipUsernamePrepend"
                      required
                    />
                    <div className="invalid-tooltip">
                      Please choose a unique and valid username.
                    </div>
                  </div>
                </div>
                <div className="col-md-6 position-relative">
                  <label htmlFor="validationTooltip03" className="form-label">
                    City
                  </label>
                  <input type="text" className="form-control" id="validationTooltip03" required />
                  <div className="invalid-tooltip">Please provide a valid city.</div>
                </div>
                <div className="col-md-3 position-relative">
                  <label htmlFor="validationTooltip04" className="form-label">
                    State
                  </label>
                  <select className="form-select" id="validationTooltip04" required>
                    <option value="">Choose...</option>
                    <option>...</option>
                  </select>
                  <div className="invalid-tooltip">Please select a valid state.</div>
                </div>
                <div className="col-md-3 position-relative">
                  <label htmlFor="validationTooltip05" className="form-label">
                    Zip
                  </label>
                  <input type="text" className="form-control" id="validationTooltip05" required />
                  <div className="invalid-tooltip">Please provide a valid zip.</div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    Submit form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormValidation;
