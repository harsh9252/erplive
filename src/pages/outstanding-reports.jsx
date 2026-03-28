import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getOutstandingReceivablesReport, getOutstandingPayablesReport } from '../services/reportService';

const initialData = [
  { id: 1, accountName: 'PNB - 5475878970090', credit: 22500, debit: 7500 },
  { id: 2, accountName: 'SFB - 3255465758698', credit: 30000, debit: 10000 },
  { id: 3, accountName: 'HSB - 4353689870544', credit: 12000, debit: 3000 },
  { id: 4, accountName: 'ETB - 4324356677889', credit: 18000, debit: 6000 },
  { id: 5, accountName: 'NPB - 2343547586900', credit: 25000, debit: 8000 },
  { id: 6, accountName: 'SDB - 3354456565687', credit: 35000, debit: 12000 },
  { id: 7, accountName: 'FEB - 3453647664889', credit: 40000, debit: 15000 },
  { id: 8, accountName: 'CCB - 9876543210123', credit: 27500, debit: 9500 },
  { id: 9, accountName: 'CCB - 9876543210123', credit: 20000, debit: 7000 },
  { id: 10, accountName: 'ICB - 6543217896543', credit: 45000, debit: 18000 }
];

const OutstandingReports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportType, setReportType] = useState('receivables'); // 'receivables' or 'payables'
  const [searchText, setSearchText] = useState("");
  const [columns, setColumns] = useState({
    accountName: true,
    credit: true,
    debit: true,
  });

  useEffect(() => {
    fetchReportData();
  }, [reportType]);

  const fetchReportData = async (params = {}) => {
    try {
      setLoading(true);
      let response;
      if (reportType === 'receivables') {
        response = await getOutstandingReceivablesReport(params);
      } else {
        response = await getOutstandingPayablesReport(params);
      }
      const reportData = response.data || response;
      setData(Array.isArray(reportData) ? reportData : (reportData?.rows || reportData?.items || []));
      setError(null);
    } catch (err) {
      console.error(`Error fetching outstanding ${reportType}:`, err);
      setError(`Failed to load ${reportType} report.`);
    } finally {
      setLoading(false);
    }
  };

  const handleColumnToggle = (col) => {
    setColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const filteredData = data.filter(item =>
    item.accountName.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div className="d-flex align-items-center gap-2">
          <h6 className="mb-0">Outstanding Reports</h6>
          <div className="btn-group btn-group-sm ms-3">
            <button 
              className={`btn ${reportType === 'receivables' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setReportType('receivables')}
            >
              Receivables
            </button>
            <button 
              className={`btn ${reportType === 'payables' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setReportType('payables')}
            >
              Payables
            </button>
          </div>
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
                <div className="mb-1">
                  <span className="p-2 badge badge-soft-primary d-inline-flex align-items-center justify-content-center rounded border border-primary">
                    <i className="isax isax-dollar-circle fs-16"></i>
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="mb-0">
                      <p className="mb-1 text-truncate">Total Debits</p>
                      <div>
                        <h6 className="fs-16 fw-semibold me-2 mb-1">${filteredData.reduce((sum, item) => sum + (Number(item.debit) || 0), 0).toLocaleString()}</h6>
                        <span className="badge badge-soft-success">
                          +5.62%<i className="isax isax-arrow-up-15"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="chart-set" id="radial-chart3"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="mb-1">
                  <span className="p-2 badge badge-soft-success d-inline-flex align-items-center justify-content-center rounded border border-success">
                    <i className="isax isax-money-2 fs-16"></i>
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="mb-0">
                      <p className="mb-1 text-truncate">Total Credits</p>
                      <div>
                        <h6 className="fs-16 fw-semibold me-2 mb-1">${filteredData.reduce((sum, item) => sum + (Number(item.credit) || 0), 0).toLocaleString()}</h6>
                        <span className="badge badge-soft-success">
                          +11.4%<i className="isax isax-arrow-up-15"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="chart-set" id="radial-chart4"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="mb-1">
                  <span className="p-2 badge badge-soft-warning d-inline-flex align-items-center justify-content-center rounded border border-warning">
                    <i className="isax isax-wallet-3 fs-16"></i>
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="mb-0">
                      <p className="mb-1 text-truncate">Net Outstanding</p>
                      <div>
                        <h6 className="fs-16 fw-semibold me-2 mb-1">${Math.abs(filteredData.reduce((sum, item) => sum + (Number(item.debit) || 0) - (Number(item.credit) || 0), 0)).toLocaleString()}</h6>
                        <span className="badge badge-soft-success">
                          +8.12%<i className="isax isax-arrow-up-15"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="chart-set" id="radial-chart5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative shadow-lg">
              <div className="card-body">
                <div className="mb-1">
                  <span className="p-2 badge badge-soft-danger d-inline-flex align-items-center justify-content-center rounded border border-danger">
                    <i className="isax isax-dollar-circle fs-16"></i>
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="mb-0">
                      <p className="mb-1 text-truncate">Total Customers/Vendors</p>
                      <div>
                        <h6 className="fs-16 fw-semibold me-2 mb-1">{filteredData.length}</h6>
                        <span className="badge badge-soft-success">
                          7.45%<i className="isax isax-arrow-up-15"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="chart-set" id="radial-chart6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}

                />
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
            <div id="reportrange" className="reportrange-picker d-flex align-items-center">
              <i className="isax isax-calendar text-gray-5 fs-14 me-1"></i>
              <span className="reportrange-picker-field">16 Apr 25 - 16 Apr 25</span>
            </div>
            <Link
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </Link>
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown">
              <Link
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                <i className="isax isax-grid-3 me-1"></i>Column
              </Link>
              <ul className="dropdown-menu  dropdown-menu">
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.accountName} onChange={() => handleColumnToggle('accountName')} />
                    <span>Account Name</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.credit} onChange={() => handleColumnToggle('credit')} />
                    <span>Credit</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.debit} onChange={() => handleColumnToggle('debit')} />
                    <span>Debit</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="align-items-center gap-2 flex-wrap filter-info mt-3">
          <h6 className="fs-13 fw-semibold">Filters</h6>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              6
            </span>
            Account Holders Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <Link href="#" className="link-danger fw-medium text-decoration-underline ms-md-1">
            Clear All
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead className="thead-light">
            <tr>
              <th className="no-sort">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" id="select-all" />
                </div>
              </th>
              {columns.accountName && <th>Account Name</th>}
              {columns.credit && <th>Credit</th>}
              {columns.debit && <th>Debit</th>}
              <th className="no-sort"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center py-5 text-danger">{error}</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-3">No records found matching your search.</td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id || index}>
                  <td>
                    <div className="form-check form-check-md">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  {columns.accountName && <td>{item.account_name || item.accountName}</td>}
                  {columns.credit && <td>${(item.credit || 0).toLocaleString()}</td>}
                  {columns.debit && <td>${(item.debit || 0).toLocaleString()}</td>}
                  <td></td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="bg-light border-top">
              <td></td>
              {columns.accountName && <td className="fw-semibold">Total</td>}
              {columns.credit && <td className="fw-semibold">${filteredData.reduce((sum, item) => sum + item.credit, 0).toLocaleString()}.</td>}
              {columns.debit && <td className="fw-semibold">${filteredData.reduce((sum, item) => sum + item.debit, 0).toLocaleString()}.</td>}
              <td className="fw-semibold text-end">$154,000.</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas">
        <div className="offcanvas-header d-block pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
            <h6 className="offcanvas-title">Filter</h6>
            <button
              type="button"
              className="btn-close btn-close-modal custom-btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
        <div className="offcanvas-body pt-3">
          <form action="#">
            <div className="mb-3">
              <label className="form-label">Account Holder</label>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <div className="mb-3">
                    <div className="input-icon-start position-relative">
                      <span className="input-icon-addon fs-12">
                        <i className="isax isax-search-normal"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <ul className="mb-3">
                    <li className="d-flex align-items-center justify-content-between mb-3">
                      <label className="d-inline-flex align-items-center text-gray-9">
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />{' '}
                        Select All
                      </label>
                      <Link href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> ETB -
                        4324356677889
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> NPB -
                        2343547586900
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> SDB -
                        3354456565687
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> MFB -
                        1597534682597
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> ETB -
                        4324356677889
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-lg bg-light  d-flex align-items-center justify-content-start fs-13 fw-normal border"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <div className="filter-range">
                    <input type="text" id="range_03" />
                    <p>
                      Range : <span className="text-gray-9">Range : $200 - $5695</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="offcanvas-footer">
              <div className="row g-2">
                <div className="col-6">
                  <Link href="#" className="btn btn-outline-white w-100">
                    Reset
                  </Link>
                </div>
                <div className="col-6">
                  <button
                    data-bs-dismiss="offcanvas"
                    className="btn btn-primary w-100"
                    id="filter-submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OutstandingReports;
