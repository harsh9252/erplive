import React from 'react';
import { Link } from 'react-router-dom';

const ChartFlot = () => {
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Flot Chart</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/index">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Flot Charts</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Bar Chart</div>
            </div>
            <div className="card-body  chart-set">
              <div className="h-250" id="flotBar1"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Bar Chart</div>
            </div>
            <div className="card-body chart-set">
              <div className="h-250" id="flotBar2"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Line Chart</div>
            </div>
            <div className="card-body chart-set">
              <div className="h-250" id="flotLine1"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Line ChartPOints</div>
            </div>
            <div className="card-body chart-set">
              <div className="h-250" id="flotLine2"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Area Chart</div>
            </div>
            <div className="card-body chart-set">
              <div className="h-250" id="flotArea1"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Area Chart Points</div>
            </div>
            <div className="card-body chart-set">
              <div className="h-250" id="flotArea2"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Pie Chart</div>
            </div>
            <div className="card-body chart-set">
              <div className="h-250" id="flotPie1"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Donut Chart</div>
            </div>
            <div className="card-body chart-set">
              <div className="h-250" id="flotPie2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartFlot;
