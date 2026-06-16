import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTdsSummaryReport } from '../services/reportService';

const TdsReport = () => {
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
    party: true,
    date: true,
    section: true,
    base_amount: true,
    rate: true,
    tds_amount: true
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
      const response = await getTdsSummaryReport(finalParams);
      const reportData = response.data || response;
      const items = Array.isArray(reportData) ? reportData : (reportData?.detail || reportData?.rows || reportData?.items || []);
      
      const mappedItems = items.map(item => ({
        ...item,
        ref: item.document || item.ref || item.reference_id || item.voucher_no || '-',
        party: item.party || item.party_name || item.ledger_name || '-',
        section: item.section || item.tds_section || '-',
        base_amount: item.base_amount || item.taxable_amount || 0,
        rate: item.rate || item.tds_rate || 0,
        tds_amount: item.tds_amount || item.tax_amount || 0
      }));
      
      setData(mappedItems);
      setTotalItems(response.pagination?.total || response.total || response.data?.total || mappedItems.length || 0);
      setError(null);
    } catch (err) {
      console.error("Error fetching TDS summary:", err);
      setError("Failed to load TDS report.");
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
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">TDS Report</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item">Tax & Compliances</li>
              <li className="breadcrumb-item active">TDS Report</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-2">
        </div>
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: 'Total TDS Deducted', amount: `₹${data.reduce((sum, i) => sum + (Number(i.tds_amount) || 0), 0).toLocaleString()}`, icon: 'wallet-money', color: 'primary' },
          { label: 'Total Base Amount', amount: `₹${data.reduce((sum, i) => sum + (Number(i.base_amount) || 0), 0).toLocaleString()}`, icon: 'money-3', color: 'success' },
          { label: 'Average TDS Rate', amount: `${data.length ? (data.reduce((sum, i) => sum + (Number(i.rate) || 0), 0) / data.length).toFixed(2) : 0}%`, icon: 'percentage', color: 'warning' },
          { label: 'Total Transactions', amount: data.length, icon: 'receipt-2', color: 'info' }
        ].map((card, idx) => (
          <div className="col-xl-3 col-md-6" key={idx}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className={`avatar avatar-md bg-soft-${card.color} text-${card.color} rounded-circle`}>
                    <i className={`isax isax-${card.icon} fs-20`}></i>
                  </div>
                </div>
                <div>
                  <p className="text-muted mb-1 fs-13">{card.label}</p>
                  <h4 className="fw-bold mb-0">{card.amount}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-header bg-white border-bottom-0 py-3">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-2">
              <div className="input-group search-input shadow-none border rounded-pill overflow-hidden" style={{ maxWidth: '300px' }}>
                <span className="input-group-text bg-white border-0 ps-3">
                  <i className="isax isax-search-normal fs-14 text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 shadow-none ps-0"
                  placeholder="Search Party, Section..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  {columns.ref && <th className="cursor-pointer" onClick={() => requestSort('ref')}>Ref ID {sortConfig.key === 'ref' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
                  {columns.party && <th className="cursor-pointer" onClick={() => requestSort('party')}>Party {sortConfig.key === 'party' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
                  {columns.date && <th className="cursor-pointer" onClick={() => requestSort('date')}>Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
                  {columns.section && <th className="cursor-pointer" onClick={() => requestSort('section')}>Section {sortConfig.key === 'section' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
                  {columns.base_amount && <th className="cursor-pointer text-end" onClick={() => requestSort('base_amount')}>Base Amount {sortConfig.key === 'base_amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
                  {columns.rate && <th className="cursor-pointer text-center" onClick={() => requestSort('rate')}>Rate % {sortConfig.key === 'rate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
                  {columns.tds_amount && <th className="cursor-pointer text-end pe-4" onClick={() => requestSort('tds_amount')}>TDS Amount {sortConfig.key === 'tds_amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                      <span className="text-muted">Loading TDS report...</span>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5 text-danger">{error}</td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5 text-muted">No matching records found</td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr key={item.id || index}>
                      {columns.ref && <td><span className="fw-medium text-dark">{item.ref}</span></td>}
                      {columns.party && (
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="fw-semibold text-dark">{item.party}</span>
                          </div>
                        </td>
                      )}
                      {columns.date && <td>{item.date}</td>}
                      {columns.section && <td><span className="badge badge-soft-info">{item.section}</span></td>}
                      {columns.base_amount && <td className="text-end">₹{(item.base_amount || 0).toLocaleString()}</td>}
                      {columns.rate && <td className="text-center">{item.rate}%</td>}
                      {columns.tds_amount && <td className="text-end fw-bold text-dark pe-4">₹{(item.tds_amount || 0).toLocaleString()}</td>}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
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
    </div>
  );
};

export default TdsReport;
