import React from 'react';

const ChartC3 = () => {
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">C3 Chart</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Bar Chart</div>
            </div>
            <div className="card-body">
              <div id="chart-bar-stacked"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Multiple Bar Chart</div>
            </div>
            <div className="card-body">
              <div id="chart-bar"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Horizontal Bar Chart</div>
            </div>
            <div className="card-body">
              <div id="chart-bar-rotated"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Line Chart</div>
            </div>
            <div className="card-body">
              <div id="chart-sracked"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Line Chart</div>
            </div>
            <div className="card-body">
              <div id="chart-spline-rotated"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Line Chart</div>
            </div>
            <div className="card-body">
              <div id="chart-area-spline-sracked"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Pie Chart</div>
            </div>
            <div className="card-body">
              <div id="chart-pie"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Donut Chart</div>
            </div>
            <div className="card-body">
              <div id="chart-donut"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartC3;
