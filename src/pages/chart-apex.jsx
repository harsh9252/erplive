import React, { useEffect } from 'react';

const ChartApex = () => {
  useEffect(() => {
    // Trigger chart initialization after component mounts
    if (window.$ && window.ApexCharts) {
      // Re-initialize charts
      const initCharts = () => {
        // Simple Line Chart
        if (document.getElementById('s-line')) {
          const options = {
            chart: { type: 'line', height: 350, toolbar: { show: false } },
            series: [{ name: 'Sales', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] }],
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
          };
          new window.ApexCharts(document.getElementById('s-line'), options).render();
        }

        // Area Chart
        if (document.getElementById('s-line-area')) {
          const options = {
            chart: { type: 'area', height: 350, toolbar: { show: false } },
            series: [{ name: 'Revenue', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }],
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
          };
          new window.ApexCharts(document.getElementById('s-line-area'), options).render();
        }

        // Column Chart
        if (document.getElementById('s-col')) {
          const options = {
            chart: { type: 'bar', height: 350, toolbar: { show: false } },
            series: [{ name: 'Sales', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] }],
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
          };
          new window.ApexCharts(document.getElementById('s-col'), options).render();
        }

        // Stacked Column Chart
        if (document.getElementById('s-col-stacked')) {
          const options = {
            chart: { type: 'bar', height: 350, stacked: true, toolbar: { show: false } },
            series: [
              { name: 'Series 1', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] },
              { name: 'Series 2', data: [20, 30, 25, 40, 39, 50, 60, 81, 115] },
            ],
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
          };
          new window.ApexCharts(document.getElementById('s-col-stacked'), options).render();
        }

        // Bar Chart
        if (document.getElementById('s-bar')) {
          const options = {
            chart: { type: 'bar', height: 350, toolbar: { show: false } },
            plotOptions: { bar: { horizontal: true } },
            series: [{ name: 'Sales', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] }],
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
          };
          new window.ApexCharts(document.getElementById('s-bar'), options).render();
        }

        // Mixed Chart
        if (document.getElementById('mixed-chart')) {
          const options = {
            chart: { type: 'line', height: 350, toolbar: { show: false } },
            series: [
              { name: 'Line', type: 'line', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] },
              { name: 'Column', type: 'column', data: [20, 30, 25, 40, 39, 50, 60, 81, 115] },
            ],
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
          };
          new window.ApexCharts(document.getElementById('mixed-chart'), options).render();
        }

        // Donut Chart
        if (document.getElementById('donut-chart')) {
          const options = {
            chart: { type: 'donut', height: 350, toolbar: { show: false } },
            series: [44, 55, 41, 17],
            labels: ['Series A', 'Series B', 'Series C', 'Series D'],
          };
          new window.ApexCharts(document.getElementById('donut-chart'), options).render();
        }

        // Radial Chart
        if (document.getElementById('radial-chart')) {
          const options = {
            chart: { type: 'radialBar', height: 350, toolbar: { show: false } },
            series: [67, 84, 75, 59],
            labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
          };
          new window.ApexCharts(document.getElementById('radial-chart'), options).render();
        }
      };

      // Small delay to ensure DOM is ready
      setTimeout(initCharts, 100);
    }
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Charts</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Apex Simple</h5>
            </div>
            <div className="card-body">
              <div id="s-line" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Area Chart</h5>
            </div>
            <div className="card-body">
              <div id="s-line-area" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Column Chart</h5>
            </div>
            <div className="card-body">
              <div id="s-col" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Column Stacked Chart</h5>
            </div>
            <div className="card-body">
              <div id="s-col-stacked" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Bar Chart</h5>
            </div>
            <div className="card-body">
              <div id="s-bar" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Mixed Chart</h5>
            </div>
            <div className="card-body">
              <div id="mixed-chart" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card w-100">
            <div className="card-header">
              <h5 className="card-title">Donut Chart</h5>
            </div>
            <div className="card-body">
              <div id="donut-chart" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card w-100">
            <div className="card-header">
              <h5 className="card-title">Radial Chart</h5>
            </div>
            <div className="card-body">
              <div id="radial-chart" className="chart-set"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartApex;
