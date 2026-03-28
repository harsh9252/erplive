import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProfitLossReport } from '../services/reportService';

const initialData = [
  { id: 1, type: "header", name: "Income" },
  { id: 2, type: "data", name: "Stripe Sales", jan: "25,750", feb: "25,750", mar: "25,750", apr: "25,750", may: "25,750", total: "25,750" },
  { id: 3, type: "data", name: "Service", jan: "50,125", feb: "50,125", mar: "50,125", apr: "50,125", may: "50,125", total: "50,125" },
  { id: 4, type: "data", name: "Purchase Return", jan: "75,900", feb: "75,900", mar: "75,900", apr: "75,900", may: "75,900", total: "75,900" },
  { id: 5, type: "summary", name: "Gross Profit", jan: "151,775", feb: "151,775", mar: "151,775", apr: "151,775", may: "151,775", total: "151,775" },
  { id: 6, type: "header", name: "Expense" },
  { id: 7, type: "data", name: "Exchange Gain or Losse", jan: "25,750", feb: "25,750", mar: "25,750", apr: "25,750", may: "25,750", total: "25,750" },
  { id: 8, type: "data", name: "Stripe Fees", jan: "50,125", feb: "50,125", mar: "50,125", apr: "50,125", may: "50,125", total: "50,125" },
  { id: 9, type: "data", name: "Purchase Return", jan: "75,900", feb: "75,900", mar: "75,900", apr: "75,900", may: "75,900", total: "75,900" },
  { id: 10, type: "summary", name: "Total Expense", jan: "99,999", feb: "99,999", mar: "99,999", apr: "99,999", may: "99,999", total: "99,999" },
  { id: 11, type: "summary", name: "Net Income", jan: "2,69,276", feb: "2,75,638", mar: "2,51,629", apr: "7,96,543", may: "2,69,276", total: "2,75,638" },
];

const ProfitLossReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async (params = {}) => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const firstDayOfYear = `${new Date().getFullYear()}-04-01`; // Financial year start
      const finalParams = {
        from_date: firstDayOfYear,
        to_date: today,
        ...params
      };
      const response = await getProfitLossReport(finalParams);
      // Ensure we get an array even if backend returns nested rows/items
      const reportData = response.data || response;
      setData(Array.isArray(reportData) ? reportData : (reportData?.rows || reportData?.items || []));
      setError(null);
    } catch (err) {
      console.error("Error fetching profit & loss:", err);
      setError("Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = searchText
    ? data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) && item.type !== 'header')
    : data;

  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Profit & Loss Report</h6>
        </div>
        <div className="my-xl-auto">
          <div className="dropdown">
            <Link
              href="#"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="#">
                  Download as PDF
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  Download as Excel
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-bottom mb-3">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="d-flex bg-body-tertiary p-2 rounded-2 align-items-center justify-content-between mb-2">
                  <div>
                    <p className="mb-1">Total Revenue</p>
                    <h6 className="fs-16 fw-semibold mb-0">${(data.find(i => i.name === 'Income')?.total || data.find(i => i.name === 'Gross Profit')?.total || 0).toLocaleString()}</h6>
                  </div>
                  <div>
                    <span className="badge badge-outline-primary p-2 rounded-circle">
                      <i className="isax isax-dollar-circle fs-16"></i>
                    </span>
                  </div>
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
                <div className="d-flex bg-body-tertiary p-2 rounded-2 align-items-center justify-content-between mb-2">
                  <div>
                    <p className="mb-1">Total Expenses</p>
                    <h6 className="fs-16 fw-semibold mb-0">${(data.find(i => i.name === 'Expense')?.total || data.find(i => i.name === 'Total Expense')?.total || 0).toLocaleString()}</h6>
                  </div>
                  <div>
                    <span className="badge badge-outline-success p-2 rounded-circle">
                      <i className="isax isax-bag-2 fs-16"></i>
                    </span>
                  </div>
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
                <div className="d-flex bg-body-tertiary p-2 rounded-2 align-items-center justify-content-between mb-2">
                  <div>
                    <p className="mb-1">Net Profit</p>
                    <h6 className="fs-16 fw-semibold mb-0">${(data.find(i => i.name === 'Net Income')?.total || 0).toLocaleString()}</h6>
                  </div>
                  <div>
                    <span className="badge badge-outline-warning rounded-circle p-2">
                      <i className="isax isax-wallet-3 fs-16"></i>
                    </span>
                  </div>
                </div>
                <p className="fs-13 mb-0">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>8.12%
                  </span>{' '}
                  from last month
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="d-flex bg-body-tertiary p-2 rounded-2 align-items-center justify-content-between mb-2">
                  <div>
                    <p className="mb-1">Profit Margin</p>
                    <h6 className="fs-16 fw-semibold mb-0">
                      {(() => {
                        const revenue = parseFloat(data.find(i => i.name === 'Income')?.total || data.find(i => i.name === 'Gross Profit')?.total || 0);
                        const netProfit = parseFloat(data.find(i => i.name === 'Net Income')?.total || 0);
                        return revenue > 0 ? ((netProfit / revenue) * 100).toFixed(2) : 0;
                      })()}%
                    </h6>
                  </div>
                  <div>
                    <span className="badge badge-outline-danger p-2 rounded-circle">
                      <i className="isax isax-wallet-money fs-16"></i>
                    </span>
                  </div>
                </div>
                <p className="fs-13 mb-0">
                  <span className="text-success">
                    <i className="isax isax-send text-success me-1"></i>7.45%
                  </span>{' '}
                  from last month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="input-icon-start position-relative">
            <span className="input-icon-addon">
              <i className="isax isax-search-normal"></i>
            </span>
            <input
              type="text"
              className="form-control form-control-sm bg-white"
              placeholder="Search by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div id="reportrange" className="reportrange-picker d-flex align-items-center">
            <i className="isax isax-calendar text-gray-5 fs-14 me-1"></i>
            <span className="reportrange-picker-field">19 Apr 25 - 19 Apr 25</span>
          </div>
        </div>
      </div>
      <div className="table-responsive table-nowrap">
        <table className="table border mb-0">
          <thead className="table-light">
            <tr>
              <th className="no-sort"></th>
              <th className="no-sort">Jan 2025</th>
              <th className="no-sort">Feb 2025</th>
              <th className="no-sort">Mar 2025</th>
              <th className="no-sort">Apr 2025</th>
              <th className="no-sort">May 2025</th>
              <th className="no-sort">Total</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="text-center py-5 text-danger">{error}</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">No records found matching your search.</td>
              </tr>
            ) : (
              filteredData.map((item, index) => {
                if (item.type === "header") {
                  return (
                    <tr key={item.id || index}>
                      <td className="border-end">
                        <p className="text-dark fw-semibold">{item.name}</p>
                      </td>
                      <td></td><td></td><td></td><td></td><td></td><td></td>
                    </tr>
                  );
                }

                if (item.type === "summary") {
                  return (
                    <tr key={item.id || index}>
                      <td className="bg-light border-end">
                        <p className="text-dark fw-semibold">{item.name}</p>
                      </td>
                      <td className="bg-light"><p className="text-dark fw-semibold">${item.jan || item.january || 0}</p></td>
                      <td className="bg-light"><p className="text-dark fw-semibold">${item.feb || item.february || 0}</p></td>
                      <td className="bg-light"><p className="text-dark fw-semibold">${item.mar || item.march || 0}</p></td>
                      <td className="bg-light"><p className="text-dark fw-semibold">${item.apr || item.april || 0}</p></td>
                      <td className="bg-light"><p className="text-dark fw-semibold">${item.may || item.may || 0}</p></td>
                      <td className="bg-light"><p className="text-dark fw-semibold">${item.total || 0}</p></td>
                    </tr>
                  );
                }

                return (
                  <tr key={item.id || index}>
                    <td className="border-end">{item.name}</td>
                    <td>${item.jan || item.january || 0}</td>
                    <td>${item.feb || item.february || 0}</td>
                    <td>${item.mar || item.march || 0}</td>
                    <td>${item.apr || item.april || 0}</td>
                    <td>${item.may || item.may || 0}</td>
                    <td>${item.total || 0}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfitLossReport;
