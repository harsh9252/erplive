import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getOutstandingReceivablesReport, getOutstandingPayablesReport } from '../services/reportService';
import { useAuth } from '../components/AuthContext';
import branchService from '../services/branchService';
import { toast } from 'react-toastify';

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
  const { activeCompany } = useAuth();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportType, setReportType] = useState(location.state?.reportType || 'receivables'); // 'receivables' or 'payables'
  const [searchText, setSearchText] = useState("");
  const [selectedBranch, setSelectedBranch] = useState('');
  const [branches, setBranches] = useState([]);
  const [filterAccounts, setFilterAccounts] = useState([]);
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');

  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const [fromDate, setFromDate] = useState(firstDay.toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(today.toISOString().split('T')[0]);

  useEffect(() => {
    const loadBranches = async () => {
      try {
        const res = await branchService.getBranches();
        setBranches(res.data || []);
        setSelectedBranch('');
      } catch (err) {
        console.error("Failed to load branches", err);
      }
    };
    loadBranches();
  }, [activeCompany?.id]);

  useEffect(() => {
    fetchReportData({ branch_id: selectedBranch, branchId: selectedBranch, from_date: fromDate, to_date: toDate });
  }, [reportType, activeCompany?.id, selectedBranch, fromDate, toDate]);

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
      const rawData = Array.isArray(reportData) ? reportData : (reportData?.rows || reportData?.items || []);
      
      // Filter out deleted customers/vendors — backend may include them via ledger joins
      const activeData = rawData.filter(item => {
        // Exclude if explicitly marked deleted
        if (item.is_deleted === 1 || item.is_deleted === true) return false;
        // Exclude if customer_id/vendor_id is null (orphaned ledger record)
        if (reportType === 'receivables' && item.customer_id === null) return false;
        if (reportType === 'payables' && item.vendor_id === null) return false;
        return true;
      }).map(item => ({
        ...item,
        accountName: item.customer || item.vendor || item.account_name || item.accountName || 'Unknown',
        credit: reportType === 'payables' ? (item.outstanding || 0) : (item.credit || 0),
        debit: reportType === 'receivables' ? (item.outstanding || 0) : (item.debit || 0)
      }));
      
      setData(activeData);
      setError(null);
    } catch (err) {
      console.error(`Error fetching outstanding ${reportType}:`, err);
      setError(`Failed to load ${reportType} report.`);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter(item => {
    const name = item.accountName || item.account_name || "";
    const searchMatch = name.toLowerCase().includes(searchText.toLowerCase());
    
    const accountMatch = filterAccounts.length === 0 || filterAccounts.includes(name);
    
    const amountVal = Math.max(Number(item.credit) || 0, Number(item.debit) || 0);
    const minMatch = amountMin === '' || amountVal >= Number(amountMin);
    const maxMatch = amountMax === '' || amountVal <= Number(amountMax);

    return searchMatch && accountMatch && minMatch && maxMatch;
  });
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
              data-bs-display="static"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu" style={{ right: 0, left: 'auto', transform: 'translateX(-100px)' }}>
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
                        <h6 className="fs-16 fw-semibold me-2 mb-1">₹{filteredData.reduce((sum, item) => sum + (Number(item.debit) || 0), 0).toLocaleString('en-IN')}</h6>
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
                        <h6 className="fs-16 fw-semibold me-2 mb-1">₹{filteredData.reduce((sum, item) => sum + (Number(item.credit) || 0), 0).toLocaleString('en-IN')}</h6>
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
                        <h6 className="fs-16 fw-semibold me-2 mb-1">₹{Math.abs(filteredData.reduce((sum, item) => sum + (Number(item.debit) || 0) - (Number(item.credit) || 0), 0)).toLocaleString('en-IN')}</h6>
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
            <div className="branch-select me-2">
              <select 
                className="form-select form-select-sm shadow-none" 
                style={{ minWidth: '150px' }}
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="">All Branches</option>
                {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div className="d-flex align-items-center gap-2">
              <input type="date" className="form-control form-control-sm shadow-none" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              <span className="text-muted">-</span>
              <input type="date" className="form-control form-control-sm shadow-none" value={toDate} onChange={(e) => setToDate(e.target.value)} />
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
              <th>Account Name</th>
              <th>Credit</th>
              <th>Debit</th>
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
                  <td>{item.account_name || item.accountName}</td>
                  <td>₹{(item.credit || 0).toLocaleString('en-IN')}</td>
                  <td>₹{(item.debit || 0).toLocaleString('en-IN')}</td>
                  <td></td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="bg-light border-top">
              <td className="fw-semibold">Total</td>
              <td className="fw-semibold">₹{filteredData.reduce((sum, item) => sum + (item.credit || 0), 0).toLocaleString('en-IN')}</td>
              <td className="fw-semibold">₹{filteredData.reduce((sum, item) => sum + (item.debit || 0), 0).toLocaleString('en-IN')}</td>
              <td className="fw-semibold text-end"></td>
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
          <div>
            <div className="mb-3">
              <label className="form-label">Account Holder</label>
              <div className="dropdown">
                <button
                  className="dropdown-toggle btn btn-lg bg-light d-flex align-items-center justify-content-start fs-13 fw-normal border w-100"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  Select ({filterAccounts.length})
                </button>
                <div className="dropdown-menu shadow-lg w-100 dropdown-info p-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <ul className="mb-3 list-unstyled">
                    <li className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                      <label className="d-inline-flex align-items-center text-gray-9 mb-0">
                        <input 
                          className="form-check-input m-0 me-2" 
                          type="checkbox" 
                          checked={filterAccounts.length === [...new Set(data.map(d => d.accountName || d.account_name).filter(Boolean))].length && filterAccounts.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilterAccounts([...new Set(data.map(d => d.accountName || d.account_name).filter(Boolean))]);
                            } else {
                              setFilterAccounts([]);
                            }
                          }}
                        />{' '}
                        Select All
                      </label>
                      <button type="button" className="btn btn-link text-danger p-0" onClick={() => setFilterAccounts([])}>
                        Reset
                      </button>
                    </li>
                    {[...new Set(data.map(d => d.accountName || d.account_name).filter(Boolean))].sort().map(acc => (
                      <li key={acc} className="mb-2">
                        <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                          <input 
                            className="form-check-input m-0 me-2" 
                            type="checkbox" 
                            checked={filterAccounts.includes(acc)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilterAccounts([...filterAccounts, acc]);
                              } else {
                                setFilterAccounts(filterAccounts.filter(a => a !== acc));
                              }
                            }}
                          />
                          {acc}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Amount Range</label>
              <div className="d-flex align-items-center gap-2">
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Min (₹)" 
                  value={amountMin}
                  onChange={(e) => setAmountMin(e.target.value)}
                />
                <span className="text-muted">-</span>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Max (₹)" 
                  value={amountMax}
                  onChange={(e) => setAmountMax(e.target.value)}
                />
              </div>
            </div>
            <div className="offcanvas-footer mt-4">
              <div className="row g-2">
                <div className="col-6">
                  <button type="button" className="btn btn-outline-white w-100 shadow-sm" onClick={() => { setFilterAccounts([]); setAmountMin(''); setAmountMax(''); }}>
                    Reset Filters
                  </button>
                </div>
                <div className="col-6">
                  <button
                    data-bs-dismiss="offcanvas"
                    className="btn btn-primary w-100"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutstandingReports;
