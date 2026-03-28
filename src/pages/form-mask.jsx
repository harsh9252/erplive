import React from 'react';

const FormMask = () => {
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Form Mask</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Form Mask</h5>
              <p className="sub-header">
                Input masks can be used to force the user to enter data conform a specific format.
                Unlike validation, the user can't enter any other key than the ones specified by the
                mask.
              </p>
            </div>
            <div className="card-body">
              <form action="#">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="text" id="phone" className="form-control" />
                    <span className="form-text text-muted">(999) 999-9999</span>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date</label>
                    <input type="text" id="date" className="form-control" />
                    <span className="form-text text-muted">dd/mm/yyyy</span>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">SSN field 1</label>
                    <input type="text" id="ssn" className="form-control" />
                    <span className="form-text text-muted">e.g "999-99-9999"</span>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone field + ext.</label>
                    <input type="text" id="phoneExt" className="form-control" />
                    <span className="form-text text-muted">+40 999 999 999</span>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Product Key</label>
                    <input type="text" id="products" className="form-control" />
                    <span className="form-text text-muted">e.g a*-999-a999</span>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Currency</label>
                    <input type="text" id="currency" className="form-control" />
                    <span className="form-text text-muted">$ 999,999,999.99</span>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Eye Script</label>
                    <input type="text" id="eyescript" className="form-control" />
                    <span className="form-text text-muted">~9.99 ~9.99 999</span>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Percent</label>
                    <input type="text" id="pct" className="form-control" />
                    <span className="form-text text-muted">e.g "99%"</span>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Credit Card Number</label>
                    <input type="text" className="form-control" id="ccn" />
                    <span className="form-text text-muted">e.g "999.999.999.9999"</span>
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

export default FormMask;
