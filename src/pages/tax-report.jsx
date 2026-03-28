import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getGstSummaryReport } from '../services/reportService';

const initialTaxData = [
  { id: 1, ref: 'CN0014', customer: 'Emily Clark', avatar: '/assets/img/profiles/avatar-28.jpg', date: '22 Feb 2025', category: 'Smartphones', amount: 10000, mode: 'Cash', discount: 10000, tax: 75900 },
  { id: 2, ref: 'CN0013', customer: 'John Carter', avatar: '/assets/img/profiles/avatar-29.jpg', date: '07 Feb 2025', category: 'Laptops', amount: 25750, mode: 'Cheque', discount: 25750, tax: 250000 },
  { id: 3, ref: 'CN0012', customer: 'Sophia White', avatar: '/assets/img/profiles/avatar-12.jpg', date: '30 Jan 2025', category: 'Headphones', amount: 50125, mode: 'Cash', discount: 50125, tax: 750300 },
  { id: 4, ref: 'CN0011', customer: 'Michael Johnson', avatar: '/assets/img/profiles/avatar-06.jpg', date: '17 Jan 2025', category: 'Computer Service', amount: 75900, mode: 'Cheque', discount: 75900, tax: 87650 },
  { id: 5, ref: 'CN0010', customer: 'Olivia Harris', avatar: '/assets/img/profiles/avatar-30.jpg', date: '04 Jan 2025', category: 'Footwear', amount: 99999, mode: 'Cheque', discount: 99999, tax: 10000 },
  { id: 6, ref: 'CN0009', customer: 'David Anderson', avatar: '/assets/img/profiles/avatar-16.jpg', date: '09 Dec 2024', category: 'Kitchen', amount: 120500, mode: 'Cash', discount: 120500, tax: 69420 },
  { id: 7, ref: 'CN0008', customer: 'Emma Lewis', avatar: '/assets/img/profiles/avatar-17.jpg', date: '02 Dec 2024', category: 'Cleaning', amount: 250000, mode: 'Cash', discount: 250000, tax: 33210 },
  { id: 8, ref: 'CN0007', customer: 'Robert Thomas', avatar: '/assets/img/profiles/avatar-23.jpg', date: '15 Nov 2024', category: 'Laptops', amount: 500750, mode: 'Cheque', discount: 500750, tax: 210000 },
  { id: 9, ref: 'CN0006', customer: 'Isabella Scott', avatar: '/assets/img/profiles/avatar-07.jpg', date: '30 Nov 2024', category: 'Haircare', amount: 750300, mode: 'Cheque', discount: 750300, tax: 25750 },
  { id: 10, ref: 'CN0005', customer: 'Daniel Martinez', avatar: '/assets/img/profiles/avatar-31.jpg', date: '12 Oct 2024', category: 'Headphones', amount: 999999, mode: 'Cash', discount: 999999, tax: 50125 }
];

const TaxReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
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
      setError(null);
    } catch (err) {
      console.error("Error fetching GST summary:", err);
      setError("Failed to load tax report.");
    } finally {
      setLoading(false);
    }
  };

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

  let filteredData = data.filter(item =>
    (item.customer || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (item.ref || item.reference_id || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (item.category || '').toLowerCase().includes(searchText.toLowerCase())
  );

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
          <div className="dropdown">
            <Link href="#" className="btn btn-outline-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="#">Download as PDF</Link></li>
              <li><Link className="dropdown-item" href="#">Download as Excel</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        {[
          { label: 'Total Tax Collected', amount: `$${data.reduce((sum, i) => sum + (Number(i.tax) || 0), 0).toLocaleString()}`, change: '+5.62%', icon: 'dollar-circle', color: 'primary' },
          { label: 'Taxable Amount', amount: `$${data.reduce((sum, i) => sum + (Number(i.amount) || 0), 0).toLocaleString()}`, change: '+11.4%', icon: 'money-3', color: 'success' },
          { label: 'Total Discount', amount: `$${data.reduce((sum, i) => sum + (Number(i.discount) || 0), 0).toLocaleString()}`, change: '+8.12%', icon: 'money-4', color: 'warning' },
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
                <Link href="#" className="btn-searchset"><i className="isax isax-search-normal fs-12"></i></Link>
              </div>
            </div>
            <Link className="btn btn-outline-white fw-normal d-inline-flex align-items-center" href="#" data-bs-toggle="offcanvas" data-bs-target="#customcanvas">
              <i className="isax isax-filter me-1"></i>Filter
            </Link>
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown">
              <Link href="#" className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                <i className="isax isax-grid-3 me-1"></i>Column
              </Link>
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
              <Link href="#" className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                <i className="isax isax-sort me-1"></i>Sort By : <span className="fw-normal ms-1">Latest</span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link href="#" className="dropdown-item">Latest</Link></li>
                <li><Link href="#" className="dropdown-item">Oldest</Link></li>
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
                  {columns.ref && <td><Link href="#" className="link-default">{item.ref || item.reference_id}</Link></td>}
                  {columns.customer && (
                    <td>
                      <div className="d-flex align-items-center">
                        <Link to="/customer-details" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                          <img src={item.avatar || "/assets/img/profiles/avatar-01.jpg"} className="rounded-circle" alt="img" />
                        </Link>
                        <div>
                          <h6 className="fs-14 fw-medium mb-0">
                            <Link to="/customer-details">{item.customer}</Link>
                          </h6>
                        </div>
                      </div>
                    </td>
                  )}
                  {columns.date && <td>{item.date}</td>}
                  {columns.category && <td>{item.category}</td>}
                  {columns.amount && <td className="text-dark">${(item.amount || 0).toLocaleString()}</td>}
                  {columns.mode && <td className="text-dark">{item.mode || item.payment_mode}</td>}
                  {columns.discount && <td className="text-dark">${(item.discount || 0).toLocaleString()}</td>}
                  {columns.tax && <td className="text-dark">${(item.tax || item.tax_amount || 0).toLocaleString()}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaxReport;
