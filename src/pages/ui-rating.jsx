import React from 'react';

const UiRating = () => {
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Rating</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xxl-4 col-xl-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title"></div>
              Basic Rater
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <p className="fs-14 mb-0 fw-semibold">
                Show Some <span className="text-danger">&#10084;</span> with rating :
              </p>
              <div id="rater-basic"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-4 col-xl-6">
        <div className="card">
          <div className="card-header">
            <div className="card-title"></div>5 star rater with steps
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <p className="fs-14 mb-0 fw-semibold">Dont forget to rate the product :</p>
            <div id="rater-steps"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiRating;
