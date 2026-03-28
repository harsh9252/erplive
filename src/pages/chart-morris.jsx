import React, { useEffect } from 'react';

const ChartMorris = () => {
  useEffect(() => {
    // Initialize Morris charts after component mounts
    if (window.Morris) {
      const chartInstances = [];

      // Bar Chart 1
      if (document.getElementById('morrisBar1')) {
        const chart1 = window.Morris.Bar({
          element: 'morrisBar1',
          data: [
            { y: 'Jan', a: 100, b: 90 },
            { y: 'Feb', a: 75, b: 65 },
            { y: 'Mar', a: 50, b: 40 },
            { y: 'Apr', a: 75, b: 65 },
            { y: 'May', a: 50, b: 40 },
            { y: 'Jun', a: 75, b: 65 }
          ],
          xkey: 'y',
          ykeys: ['a', 'b'],
          labels: ['Series A', 'Series B'],
          colors: ['#7638ff', '#fda600'],
          resize: true
        });
        chartInstances.push(chart1);
      }

      // Stacked Bar Chart
      if (document.getElementById('morrisBar3')) {
        const chart3 = window.Morris.Bar({
          element: 'morrisBar3',
          data: [
            { y: 'Jan', a: 100, b: 90 },
            { y: 'Feb', a: 75, b: 65 },
            { y: 'Mar', a: 50, b: 40 },
            { y: 'Apr', a: 75, b: 65 }
          ],
          xkey: 'y',
          ykeys: ['a', 'b'],
          labels: ['Series A', 'Series B'],
          stacked: true,
          colors: ['#7638ff', '#fda600'],
          resize: true
        });
        chartInstances.push(chart3);
      }

      // Line Chart 1
      if (document.getElementById('morrisLine1')) {
        const chartLine1 = window.Morris.Line({
          element: 'morrisLine1',
          data: [
            { x: '2025-01-01', y: 100 },
            { x: '2025-01-02', y: 75 },
            { x: '2025-01-03', y: 50 },
            { x: '2025-01-04', y: 75 },
            { x: '2025-01-05', y: 100 }
          ],
          xkey: 'x',
          ykeys: ['y'],
          labels: ['Value'],
          lineColors: ['#7638ff'],
          resize: true
        });
        chartInstances.push(chartLine1);
      }

      // Area Chart
      if (document.getElementById('morrisArea1')) {
        const chartArea1 = window.Morris.Area({
          element: 'morrisArea1',
          data: [
            { x: '2025-01-01', y: 100 },
            { x: '2025-01-02', y: 75 },
            { x: '2025-01-03', y: 50 },
            { x: '2025-01-04', y: 75 },
            { x: '2025-01-05', y: 100 }
          ],
          xkey: 'x',
          ykeys: ['y'],
          labels: ['Value'],
          lineColors: ['#7638ff'],
          resize: true
        });
        chartInstances.push(chartArea1);
      }

      // Bar Chart 6
      if (document.getElementById('morrisBar6')) {
        const chart6 = window.Morris.Bar({
          element: 'morrisBar6',
          data: [
            { y: 'Jan', a: 50 },
            { y: 'Feb', a: 75 },
            { y: 'Mar', a: 100 },
            { y: 'Apr', a: 75 },
            { y: 'May', a: 50 }
          ],
          xkey: 'y',
          ykeys: ['a'],
          labels: ['Sales'],
          colors: ['#7638ff'],
          resize: true
        });
        chartInstances.push(chart6);
      }

      // Bar Chart 7
      if (document.getElementById('morrisBar7')) {
        const chart7 = window.Morris.Bar({
          element: 'morrisBar7',
          data: [
            { y: 'Jan', a: 60 },
            { y: 'Feb', a: 80 },
            { y: 'Mar', a: 90 },
            { y: 'Apr', a: 70 },
            { y: 'May', a: 60 }
          ],
          xkey: 'y',
          ykeys: ['a'],
          labels: ['Revenue'],
          colors: ['#fda600'],
          resize: true
        });
        chartInstances.push(chart7);
      }

      // Donut Chart
      if (document.getElementById('morrisDonut1')) {
        const chartDonut = window.Morris.Donut({
          element: 'morrisDonut1',
          data: [
            { label: 'Series A', value: 30 },
            { label: 'Series B', value: 25 },
            { label: 'Series C', value: 20 },
            { label: 'Series D', value: 25 }
          ],
          colors: ['#7638ff', '#fda600', '#00d4ff', '#ff6b6b'],
          resize: true
        });
        chartInstances.push(chartDonut);
      }

      // Line Chart (morrisline)
      if (document.getElementById('morrisline')) {
        const chartLine = window.Morris.Line({
          element: 'morrisline',
          data: [
            { x: '2025-01-01', y: 50 },
            { x: '2025-01-02', y: 60 },
            { x: '2025-01-03', y: 70 },
            { x: '2025-01-04', y: 80 },
            { x: '2025-01-05', y: 90 }
          ],
          xkey: 'x',
          ykeys: ['y'],
          labels: ['Trend'],
          lineColors: ['#00d4ff'],
          resize: true
        });
        chartInstances.push(chartLine);
      }

      return () => {
        // Cleanup on unmount
        chartInstances.forEach(chart => {
          if (chart && chart.remove) {
            chart.remove();
          }
        });
      };
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Bar Chart</div>
            </div>
            <div className="card-body">
              <div id="morrisBar1" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Stacked Bar Chart </div>
            </div>
            <div className="card-body">
              <div id="morrisBar3" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Line Chart</div>
            </div>
            <div className="card-body">
              <div id="morrisLine1" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <div className="card-title">Area Chart</div>
            </div>
            <div className="card-body">
              <div id="morrisArea1" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <div className="card-title">Line Chart</div>
            </div>
            <div className="card-body">
              <div id="morrisBar6" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <div className="card-title">Line Chart</div>
            </div>
            <div className="card-body">
              <div id="morrisBar7" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <div className="card-title">Donut Chart</div>
            </div>
            <div className="card-body">
              <div id="morrisDonut1" className="chart-set"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <div className="card-title">Line Chart</div>
            </div>
            <div className="card-body">
              <div id="morrisline" className="chart-set"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartMorris;
