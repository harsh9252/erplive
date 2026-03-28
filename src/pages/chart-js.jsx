import React, { useEffect } from 'react';

const ChartJs = () => {
  useEffect(() => {
    // Initialize Chart.js charts after component mounts
    if (window.Chart) {
      // Destroy existing charts to prevent duplicates
      const chartInstances = [];

      const createChart = (canvasId, type, label, data) => {
        const ctx = document.getElementById(canvasId);
        if (ctx) {
          const chart = new window.Chart(ctx, {
            type: type,
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
              datasets: [{
                label: label,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: type === 'line' || type === 'area'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: { display: true }
              }
            }
          });
          chartInstances.push(chart);
        }
      };

      // Create all charts
      createChart('chartBar1', 'bar', 'Bar Chart', [12, 19, 3, 5, 2, 3, 7, 11, 15, 9]);
      createChart('chartBar2', 'bar', 'Transparency', [30, 25, 20, 25, 30, 35, 28, 32, 25, 20]);
      createChart('chartBar3', 'bar', 'Gradient', [15, 20, 18, 22, 25, 28, 30, 32, 28, 25]);
      createChart('chartBar4', 'bar', 'Horizontal', [12, 19, 3, 5, 2]);
      createChart('chartBar5', 'bar', 'Horizontal Style2', [20, 30, 25, 40, 39]);
      createChart('chartStacked1', 'bar', 'Stacked', [30, 40, 35, 50, 49, 60, 70, 91, 125, 100]);
      createChart('chartStacked2', 'bar', 'Stacked Horizontal', [20, 30, 25, 40, 39, 50, 60, 81, 115, 90]);
      createChart('chartLine1', 'line', 'Line Chart', [12, 19, 3, 5, 2, 3, 7, 11, 15, 9]);
      createChart('chartPie', 'doughnut', 'Donut Chart', [300, 150, 100, 200, 250]);
      createChart('chartDonut', 'pie', 'Pie Chart', [200, 250, 150, 300, 100]);
      createChart('chartArea1', 'line', 'Area Chart', [10, 41, 35, 51, 49, 62, 69, 91, 148, 120]);
      createChart('chartRadar', 'radar', 'Scatter Chart', [12, 19, 3, 5, 2, 3, 7, 11, 15, 9]);

      return () => {
        // Cleanup charts on unmount
        chartInstances.forEach(chart => chart.destroy());
      };
    }
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Chartjs</h3>
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
              <div>
                <canvas id="chartBar1" className="h-300"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Transparency </div>
            </div>
            <div className="card-body">
              <div>
                <canvas id="chartBar2" className="h-300"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Gradient Bar Chart</div>
            </div>
            <div className="card-body">
              <div>
                <canvas id="chartBar3" className="h-300"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Horizontal Bar Chart</div>
            </div>
            <div className="card-body">
              <div className="chartjs-wrapper-demo">
                <canvas id="chartBar4" className="h-300"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Horizontal Bar Chart Style2</div>
            </div>
            <div className="card-body">
              <div className="chartjs-wrapper-demo">
                <canvas id="chartBar5" className="h-300"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Vertical Stacked Bar Chart</div>
            </div>
            <div className="card-body">
              <div className="chartjs-wrapper-demo">
                <canvas id="chartStacked1" className="h-300"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Horizontal Stacked Bar Chart</div>
            </div>
            <div className="card-body">
              <div className="chartjs-wrapper-demo">
                <canvas id="chartStacked2" className="h-300"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Line Chart</div>
            </div>
            <div className="card-body">
              <div className="chartjs-wrapper-demo">
                <canvas id="chartLine1" className="h-300"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Donut Chart</div>
            </div>
            <div className="card-body">
              <div className="chartjs-wrapper-demo">
                <canvas id="chartPie" className="h-300"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Pie Chart</div>
            </div>
            <div className="card-body">
              <div className="chartjs-wrapper-demo">
                <canvas id="chartDonut" className="h-300"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card w-100">
            <div className="card-header">
              <div className="card-title">Area Chart</div>
            </div>
            <div className="card-body">
              <div className="chartjs-wrapper-demo">
                <canvas id="chartArea1" className="h-300"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <div className="card-title">Scatter Chart</div>
            </div>
            <div className="card-body">
              <div className="chartjs-wrapper-demo">
                <canvas id="chartRadar" className="h-300"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartJs;
