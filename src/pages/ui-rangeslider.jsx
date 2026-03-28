import React from 'react';

const UiRangeslider = () => {
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Range Slider</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Default</h5>
            </div>
            <div className="card-body">
              <input type="text" id="range_01" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Min-Max</h5>
            </div>
            <div className="card-body">
              <input type="text" id="range_02" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Prefix</h5>
            </div>
            <div className="card-body">
              <input type="text" id="range_03" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Range</h5>
            </div>
            <div className="card-body">
              <input type="text" id="range_04" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Step</h5>
            </div>
            <div className="card-body">
              <input type="text" id="range_05" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Custom Values</h5>
            </div>
            <div className="card-body">
              <input type="text" id="range_06" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Modern skin</h5>
            </div>
            <div className="card-body">
              <input type="text" id="range_13" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Sharp Skin</h5>
            </div>
            <div className="card-body">
              <input type="text" id="range_14" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Round skin</h5>
            </div>
            <div className="card-body">
              <input type="text" id="range_15" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Square Skin</h5>
            </div>
            <div className="card-body">
              <input type="text" id="range_16" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UiRangeslider;
