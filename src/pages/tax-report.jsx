import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getGstSummaryReport } from '../services/reportService';

// Removed hardcoded fake data
const TaxReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setPage(1);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchText]);
  const [columns, setColumns] = useState({
    ref: true,
    customer: true,
    date: true,
    category: true,
    amount: true,
    mode: true,
    discount: true,
    tax: true
  });

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async (params = {}) => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
      const finalParams = {
        from_date: firstDayOfMonth,
        to_date: today,
        search: debouncedSearch,
        page,
        limit,
        ...params
      };
      const response = await getGstSummaryReport(finalParams);
      const reportData = response.data || response;
      const items = Array.isArray(reportData) ? reportData : (reportData?.rows || reportData?.items || []);
      
      const mappedItems = items.map(item => ({
        ...item,
        ref: item.ref || item.reference_id || item.voucher_no,
        customer: item.customer || item.party_name || item.ledger_name,
        amount: item.amount || item.taxable_amount,
        tax: item.tax || item.tax_amount || item.total_tax
      }));
      
      setData(mappedItems);
      setTotalItems(response.pagination?.total || response.total || response.data?.total || mappedItems.length || 0);
      setError(null);
    } catch (err) {
      console.error("Error fetching GST summary:", err);
      setError("Failed to load tax report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [debouncedSearch, page, limit]);

  const handleColumnToggle = (column) => {
    setColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  let filteredData = [...data];

  if (sortConfig.key) {
    filteredData.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Tax Report</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>
        </div>
      </div>

      <div className="row">
        {[
          { label: 'Total Tax Collected', amount: `₹${data.reduce((sum, i) => sum + (Number(i.tax) || 0), 0).toLocaleString()}`, change: '+5.62%', icon: 'wallet-money', color: 'primary' },
          { label: 'Taxable Amount', amount: `₹${data.reduce((sum, i) => sum + (Number(i.amount) || 0), 0).toLocaleString()}`, change: '+11.4%', icon: 'money-3', color: 'success' },
          { label: 'Total Discount', amount: `₹${data.reduce((sum, i) => sum + (Number(i.discount) || 0), 0).toLocaleString()}`, change: '+8.12%', icon: 'money-4', color: 'warning' },
          { label: 'Total Transactions', amount: data.length, change: '+7.45%', icon: 'money', color: 'danger' }
        ].map((card, idx) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={idx}>
            <div className="card position-relative">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className={`badge badge-soft-${card.color} border border-${card.color} rounded-2 p-2 d-inline-flex align-items-center justify-content-center`}>
                    <i className={`isax isax-${card.icon} fs-16`}></i>
                  </span>
                  <p className="fs-13 mb-0">
                    <span className="badge badge-soft-success">{card.change}<i className="isax isax-arrow-up5 ms-1"></i></span>
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="mb-1 text-muted fs-13">{card.label}</p>
                    <h6 className="fs-16 fw-semibold mb-0">{card.amount}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Customer, Ref..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ background: 'transparent', outline: 'auto' }}
                />
                <button className="btn btn-primary d-inline-flex align-items-center justify-content-center shadow-none p-2 border-0 rounded-end" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}>
                  <i className="isax isax-search-normal fs-18"></i>
                </button>
              </div>
            </div>
            <button className="btn btn-outline-white fw-normal d-inline-flex align-items-center shadow-none">
              <i className="isax isax-filter me-1"></i>Filter
            </button>
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown">
              <button className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center shadow-none" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                <i className="isax isax-grid-3 me-1"></i>Column
              </button>
              <ul className="dropdown-menu dropdown-menu">
                {Object.keys(columns).map(col => (
                  <li key={col}>
                    <label className="dropdown-item d-flex align-items-center form-switch">
                      <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                      <input className="form-check-input m-0 me-2" type="checkbox" checked={columns[col]} onChange={() => handleColumnToggle(col)} />
                      <span>{col.charAt(0).toUpperCase() + col.slice(1)}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown">
              <button className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center shadow-none" data-bs-toggle="dropdown">
                <i className="isax isax-sort me-1"></i>Sort By : <span className="fw-normal ms-1">Latest</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item bg-transparent border-0">Latest</button></li>
                <li><button className="dropdown-item bg-transparent border-0">Oldest</button></li>
              </ul>
            </div>
          </div>
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
              {columns.ref && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('ref')}>Reference ID {sortConfig.key === 'ref' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.customer && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('customer')}>Customer {sortConfig.key === 'customer' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.date && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('date')}>Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.category && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('category')}>Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.amount && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('amount')}>Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.mode && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('mode')}>Payment Mode {sortConfig.key === 'mode' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.discount && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('discount')}>Discount {sortConfig.key === 'discount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.tax && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('tax')}>Tax Amount {sortConfig.key === 'tax' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="9" className="text-center py-5 text-danger">{error}</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr><td colSpan="9" className="text-center py-3">No matching records found</td></tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id || index}>
                  <td>
                    <div className="form-check form-check-md">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  {columns.ref && <td><span className="fw-medium text-primary">{item.ref || item.reference_id}</span></td>}
                  {columns.customer && (
                    <td>
                      <div className="d-flex align-items-center">
                        <Link to="/customer-details" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0 text-decoration-none">
                          <img src={item.avatar || "/assets/img/profiles/avatar-01.jpg"} className="rounded-circle" alt="img" />
                        </Link>
                        <div>
                          <h6 className="fs-14 fw-medium mb-0">
                            <Link to="/customer-details" className="text-dark text-decoration-none">{item.customer}</Link>
                          </h6>
                        </div>
                      </div>
                    </td>
                  )}
                  {columns.date && <td>{item.date}</td>}
                  {columns.category && <td>{typeof item.category === 'object' && item.category !== null ? item.category.name : (item.category || '-')}</td>}
                  {columns.amount && <td className="text-dark">₹{(item.amount || 0).toLocaleString()}</td>}
                  {columns.mode && <td className="text-dark">{item.mode || item.payment_mode}</td>}
                  {columns.discount && <td className="text-dark">₹{(item.discount || 0).toLocaleString()}</td>}
                  {columns.tax && <td className="text-dark fw-bold">₹{(item.tax || item.tax_amount || 0).toLocaleString()}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalItems > limit && (
        <div className="card-footer bg-white border-top-light py-3 d-flex justify-content-between align-items-center">
          <div className="fs-13 text-muted">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems}
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button className="page-link shadow-none" onClick={() => setPage(p => p - 1)} disabled={page === 1}>Previous</button>
              </li>
              <li className="page-item active"><span className="page-link">{page}</span></li>
              <li className={`page-item ${data.length < limit ? 'disabled' : ''}`}>
                <button className="page-link shadow-none" onClick={() => setPage(p => p + 1)} disabled={data.length < limit}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default TaxReport;
