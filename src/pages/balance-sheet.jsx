import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBalanceSheetReport } from '../services/reportService';

const initialData = [
  { id: 1, accountName: 'Emily Clark', avatar: 'avatar-28.jpg', bankNo: 'GTB - 3298784309485', credit: 15000, debit: 5000, balance: 10000 },
  { id: 2, accountName: 'John Carter', avatar: 'avatar-29.jpg', bankNo: 'PNB - 5475878970090', credit: 22500, debit: 7500, balance: 15000 },
  { id: 3, accountName: 'Sophia White', avatar: 'avatar-12.jpg', bankNo: 'SFB - 3255465758698', credit: 30000, debit: 10000, balance: 20000 },
  { id: 4, accountName: 'Michael Johnson', avatar: 'avatar-06.jpg', bankNo: 'HSB - 4353689870544', credit: 12000, debit: 3000, balance: 9000 },
  { id: 5, accountName: 'Olivia Harris', avatar: 'avatar-30.jpg', bankNo: 'ETB - 4324356677889', credit: 18000, debit: 6000, balance: 12000 },
  { id: 6, accountName: 'David Anderson', avatar: 'avatar-16.jpg', bankNo: 'NPB - 2343547586900', credit: 25000, debit: 8000, balance: 17000 },
  { id: 7, accountName: 'Emma Lewis', avatar: 'avatar-17.jpg', bankNo: 'SDB - 3354456565687', credit: 35000, debit: 12000, balance: 23000 },
  { id: 8, accountName: 'Robert Thomas', avatar: 'avatar-23.jpg', bankNo: 'FEB - 3453647664889', credit: 40000, debit: 15000, balance: 25000 },
  { id: 9, accountName: 'Isabella Scott', avatar: 'avatar-23.jpg', bankNo: 'CCB - 9876543210123', credit: 27500, debit: 9500, balance: 18000 },
  { id: 10, accountName: 'Daniel Martinez', avatar: 'avatar-07.jpg', bankNo: 'CCB - 9876543210123', credit: 20000, debit: 7000, balance: 13000 },
  { id: 11, accountName: 'Charlotte Brown', avatar: 'avatar-41.jpg', bankNo: 'ICB - 6543217896543', credit: 45000, debit: 18000, balance: 27000 },
  { id: 12, accountName: 'William Parker', avatar: 'avatar-42.jpg', bankNo: 'ECB - 3692581473692', credit: 37500, debit: 14000, balance: 23500 },
  { id: 13, accountName: 'Mia Thompson', avatar: 'avatar-43.jpg', bankNo: 'RFB - 3214569873214', credit: 38000, debit: 14000, balance: 24000 },
  { id: 14, accountName: 'Amelia Robinson', avatar: 'avatar-44.jpg', bankNo: 'MFB - 1597534682597', credit: 60000, debit: 25000, balance: 35000 }
];

const BalanceSheet = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async (params = {}) => {
    try {
      setLoading(true);
      const finalParams = {
        as_on_date: new Date().toISOString().split('T')[0],
        ...params
      };
      const response = await getBalanceSheetReport(finalParams);
      const reportData = response.data || response;
      
      let flattened = [];
      if (reportData.assets?.items) {
        flattened = [...flattened, ...reportData.assets.items.map(item => ({
          ...item,
          accountName: item.ledger_name,
          bankNo: item.group_name,
          type: 'Asset',
          id: `asset-${item.ledger_id}`
        }))];
      }
      if (reportData.liabilities?.items) {
        flattened = [...flattened, ...reportData.liabilities.items.map(item => ({
          ...item,
          accountName: item.ledger_name,
          bankNo: item.group_name,
          type: 'Liability',
          id: `liability-${item.ledger_id}`
        }))];
      }
      
      setData(flattened.length > 0 ? flattened : (Array.isArray(reportData) ? reportData : []));
      setError(null);
    } catch (err) {
      console.error("Error fetching balance sheet:", err);
      setError("Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };
  const [columns, setColumns] = useState({
    accountName: true,
    bankNo: true,
    credit: true,
    debit: true,
    balance: true
  });

  const handleColumnToggle = (col) => {
    setColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  let filteredData = data.filter(item =>
    (item.accountName || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (item.bankNo || '').toLowerCase().includes(searchText.toLowerCase())
  );

  filteredData.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Balance Sheet Report</h6>
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
                <div className="d-flex align-items-center justify-content-between mb-2 pb-1 border-bottom">
                  <div>
                    <h6 className="fs-16 fw-semibold mb-1">${data.filter(i => i.type === 'Asset').reduce((sum, i) => sum + (Number(i.balance) || 0), 0).toLocaleString()}</h6>
                    <p className="mb-1">Total Assets</p>
                  </div>
                  <div>
                    <span className="badge badge-soft-primary p-2 rounded-circle">
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
                <div className="d-flex align-items-center justify-content-between mb-2 pb-1 border-bottom">
                  <div>
                    <h6 className="fs-16 fw-semibold mb-1">${Math.abs(data.filter(i => i.type === 'Liability').reduce((sum, i) => sum + (Number(i.balance) || 0), 0)).toLocaleString()}</h6>
                    <p className="mb-1">Total Liabilities</p>
                  </div>
                  <div>
                    <span className="badge badge-soft-success p-2 rounded-circle">
                      <i className="isax isax-tick-circle fs-16"></i>
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
                <div className="d-flex align-items-center justify-content-between mb-2 pb-1 border-bottom">
                  <div>
                    <h6 className="fs-16 fw-semibold mb-1">$400,000</h6>
                    <p className="mb-1">Net Worth (Equity)</p>
                  </div>
                  <div>
                    <span className="badge badge-soft-warning p-2 rounded-circle">
                      <i className="isax isax-wallet-3 fs-16"></i>
                    </span>
                  </div>
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
                <div className="d-flex align-items-center justify-content-between mb-2 pb-1 border-bottom">
                  <div>
                    <h6 className="fs-16 fw-semibold mb-1">80%</h6>
                    <p className="mb-1">Equity Ratio</p>
                  </div>
                  <div>
                    <span className="badge badge-soft-danger p-2 rounded-circle">
                      <i className="isax isax-wallet-money fs-16"></i>
                    </span>
                  </div>
                </div>
                <p className="fs-13 mb-0">
                  <span className="text-success">
                    <i className="isax isax-received text-success me-1"></i>7.45%
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
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ background: 'transparent', outline: 'auto' }}
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
              <ul className="dropdown-menu  dropdown-menu-lg">
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.accountName} onChange={() => handleColumnToggle('accountName')} />
                    <span>Account Holder Name</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.bankNo} onChange={() => handleColumnToggle('bankNo')} />
                    <span>Bank & Account No</span>
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
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.balance} onChange={() => handleColumnToggle('balance')} />
                    <span>Balance</span>
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
              {columns.accountName && (
                <th onClick={() => requestSort('accountName')} style={{ cursor: 'pointer' }}>
                  Account Holder Name {sortConfig.key === 'accountName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              )}
              {columns.bankNo && (
                <th onClick={() => requestSort('bankNo')} style={{ cursor: 'pointer' }}>
                  Bank & Account No {sortConfig.key === 'bankNo' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              )}
              {columns.credit && (
                <th onClick={() => requestSort('credit')} style={{ cursor: 'pointer' }}>
                  Credit {sortConfig.key === 'credit' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              )}
              {columns.debit && (
                <th onClick={() => requestSort('debit')} style={{ cursor: 'pointer' }}>
                  Debit {sortConfig.key === 'debit' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              )}
              {columns.balance && (
                <th onClick={() => requestSort('balance')} style={{ cursor: 'pointer' }}>
                  Balance {sortConfig.key === 'balance' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-danger">{error}</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">No records found matching your search.</td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id || index}>
                  <td>
                    <div className="form-check form-check-md">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  {columns.accountName && (
                    <td>
                      <div className="d-flex align-items-center">
                        <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                          <img
                            src={`/assets/img/profiles/${item.avatar || 'avatar-01.jpg'}`}
                            className="rounded-circle"
                            alt="img"
                          />
                        </Link>
                        <div>
                          <h6 className="fs-14 fw-medium mb-0">
                            <Link href="#">{item.account_name || item.accountName}</Link>
                          </h6>
                        </div>
                      </div>
                    </td>
                  )}
                  {columns.bankNo && <td>{item.bank_no || item.bankNo}</td>}
                  {columns.credit && <td>${(item.credit || 0).toLocaleString()}</td>}
                  {columns.debit && <td>${(item.debit || 0).toLocaleString()}</td>}
                  {columns.balance && <td>${(item.balance || 0).toLocaleString()}</td>}
                </tr>
              ))
            )}
          </tbody>
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
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-28.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Emily Clark
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-12.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Sophia White
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-06.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Michael Johnson
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-30.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Olivia Harris
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-16.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        David Anderson
                      </label>
                    </li>
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <Link href="#" className="btn btn-outline-white w-100 close-filter">
                        Cancel
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link href="#" className="btn btn-primary w-100">
                        Select
                      </Link>
                    </div>
                  </div>
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

export default BalanceSheet;
