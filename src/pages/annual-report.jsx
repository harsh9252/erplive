import React from 'react';

const AnnualReport = () => {
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Annual Report</h6>
        </div>
        <div className="my-xl-auto">
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
        </div>
      </div>
      <div className="border-bottom mb-3">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                  <div>
                    <p className="mb-1">Total Revenue</p>
                    <h6 className="fs-16 fw-semibold mb-0">$30,000,000</h6>
                  </div>
                  <div>
                    <span className="badge badge-soft-primary p-2 rounded-circle">
                      <i className="isax isax-maximize-circle fs-24"></i>
                    </span>
                  </div>
                </div>
                <div
                  className="progress mb-2"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: '100%;height: 5px;' }}
                >
                  <div className="progress-bar bg-success" style={{ width: '80%' }}></div>
                </div>
                <p className="fs-13 mb-0">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>5.62%
                  </span>{' '}
                  from last month
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                  <div>
                    <p className="mb-1">Total Expenses</p>
                    <h6 className="fs-16 fw-semibold mb-0">$9,000,000</h6>
                  </div>
                  <div>
                    <span className="badge badge-soft-success p-2 rounded-circle">
                      <i className="isax isax-tick-circle fs-24"></i>
                    </span>
                  </div>
                </div>
                <div
                  className="progress mb-2"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: '100%;height: 5px;' }}
                >
                  <div className="progress-bar bg-success" style={{ width: '80%' }}></div>
                </div>
                <p className="fs-13 mb-0">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>11.4%
                  </span>{' '}
                  from last month
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                  <div>
                    <p className="mb-1">Net Profit</p>
                    <h6 className="fs-16 fw-semibold mb-0">$21,000,000</h6>
                  </div>
                  <div>
                    <span className="badge badge-soft-warning p-2 rounded-circle">
                      <i className="isax isax-info-circle fs-24"></i>
                    </span>
                  </div>
                </div>
                <div
                  className="progress mb-2"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: '100%;height: 5px;' }}
                >
                  <div className="progress-bar bg-success" style={{ width: '80%' }}></div>
                </div>
                <p className="fs-13 mb-0">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>8.52%
                  </span>{' '}
                  from last month
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2 pb-1">
                  <div>
                    <p className="mb-1">Profit Margin</p>
                    <h6 className="fs-16 fw-semibold mb-0">75%</h6>
                  </div>
                  <div>
                    <span className="badge badge-soft-danger p-2 rounded-circle">
                      <i className="isax isax-dollar-circle fs-24"></i>
                    </span>
                  </div>
                </div>
                <div
                  className="progress mb-2"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: '100%;height: 5px;' }}
                >
                  <div className="progress-bar bg-success" style={{ width: '80%' }}></div>
                </div>
                <p className="fs-13 mb-0">
                  <span className="text-danger">
                    <i className="isax isax-received me-1"></i>7.45%
                  </span>{' '}
                  from last month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="input-icon-start position-relative">
              <span className="input-icon-addon">
                <i className="isax isax-search-normal"></i>
              </span>
              <input
                type="text"
                className="form-control form-control-sm bg-white"
                placeholder="Search"
              />
            </div>
            <div id="reportrange" className="reportrange-picker d-flex align-items-center">
              <i className="isax isax-calendar text-gray-5 fs-14 me-1"></i>
              <span className="reportrange-picker-field">16 Apr 25 - 16 Apr 25</span>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive table-nowrap">
        <table className="table border mb-0">
          <thead className="table-light">
            <tr>
              <th className="no-sort"></th>
              <th className="no-sort">2019</th>
              <th className="no-sort">2020</th>
              <th className="no-sort">2021</th>
              <th className="no-sort">2022</th>
              <th className="no-sort">2023</th>
              <th className="no-sort">2024</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-end">January</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
            </tr>
            <tr>
              <td className="border-end">February</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
            </tr>
            <tr>
              <td className="border-end">March</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
            </tr>
            <tr>
              <td className="border-end">April</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
            </tr>
            <tr>
              <td className="border-end">May</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
            </tr>
            <tr>
              <td className="border-end">June</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
            </tr>
            <tr>
              <td className="border-end">July</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
            </tr>
            <tr>
              <td className="border-end">August</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
              <td>$25,750</td>
            </tr>
            <tr>
              <td className="border-end">September</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
            </tr>
            <tr>
              <td className="border-end">October</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
              <td>$50,125</td>
            </tr>
            <tr>
              <td className="border-end">November</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
            </tr>
            <tr>
              <td className="border-end">December</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
              <td>$75,900</td>
            </tr>
            <tr>
              <td className="bg-light border-end">
                <p className="text-dark fw-semibold">Total</p>
              </td>
              <td className="bg-light">
                <p className="text-dark fw-semibold">$8,75,900</p>
              </td>
              <td className="bg-light">
                <p className="text-dark fw-semibold">$8,29,900</p>
              </td>
              <td className="bg-light">
                <p className="text-dark fw-semibold">$79,19,912</p>
              </td>
              <td className="bg-light">
                <p className="text-dark fw-semibold">$12,75,900</p>
              </td>
              <td className="bg-light">
                <p className="text-dark fw-semibold">$2,19,900</p>
              </td>
              <td className="bg-light">
                <p className="text-dark fw-semibold">$81,97,650</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AnnualReport;
