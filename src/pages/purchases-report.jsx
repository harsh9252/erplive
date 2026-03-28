import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialPurchasesData = [
  { id: 1, ref: 'PUR00025', date: '22 Feb 2025', vendor: 'Emma Rose', avatar: '/assets/img/reports/avatar-01.jpg', amount: 10000, mode: 'Cash', status: 'Paid' },
  { id: 2, ref: 'PUR00024', date: '07 Feb 2025', vendor: 'Ethan James', avatar: '/assets/img/reports/avatar-02.jpg', amount: 25750, mode: 'Cheque', status: 'Pending' },
  { id: 3, ref: 'PUR00023', date: '30 Jan 2025', vendor: 'Olivia Grace', avatar: '/assets/img/reports/avatar-03.jpg', amount: 50125, mode: 'Cash', status: 'Cancelled' },
  { id: 4, ref: 'PUR00022', date: '17 Jan 2025', vendor: 'Liam Michael', avatar: '/assets/img/reports/avatar-04.jpg', amount: 75900, mode: 'Cheque', status: 'Paid' },
  { id: 5, ref: 'PUR00021', date: '04 Jan 2025', vendor: 'Sophia Marie', avatar: '/assets/img/reports/avatar-05.jpg', amount: 99999, mode: 'Cheque', status: 'Pending' },
  { id: 6, ref: 'PUR00020', date: '09 Dec 2024', vendor: 'Noah Daniel', avatar: '/assets/img/reports/avatar-06.jpg', amount: 120500, mode: 'Cash', status: 'Cancelled' },
  { id: 7, ref: 'PUR00019', date: '15 Nov 2024', vendor: 'Isabella Faith', avatar: '/assets/img/reports/avatar-07.jpg', amount: 250000, mode: 'Cash', status: 'Paid' },
  { id: 8, ref: 'PUR00018', date: '02 Dec 2024', vendor: 'Oliver Scott', avatar: '/assets/img/reports/avatar-08.jpg', amount: 500750, mode: 'Cheque', status: 'Pending' },
  { id: 9, ref: 'PUR00017', date: '30 Nov 2024', vendor: 'Ava Louise', avatar: '/assets/img/reports/avatar-09.jpg', amount: 750300, mode: 'Cheque', status: 'Cancelled' },
  { id: 10, ref: 'PUR00016', date: '12 Oct 2024', vendor: 'James Robert', avatar: '/assets/img/reports/avatar-10.jpg', amount: 999999, mode: 'Cash', status: 'Paid' }
];

const PurchasesReport = () => {
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [columns, setColumns] = useState({
    id: true,
    date: true,
    vendor: true,
    amount: true,
    mode: true,
    status: true
  });

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

  let filteredData = initialPurchasesData.filter(item =>
    item.vendor.toLowerCase().includes(searchText.toLowerCase()) ||
    item.ref.toLowerCase().includes(searchText.toLowerCase()) ||
    item.status.toLowerCase().includes(searchText.toLowerCase())
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
        <div className="d-flex align-items-center flex-wrap gap-2">
          <h6 className="mb-0">Purchases Report</h6>
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

      <div className="border-bottom mb-3">
        <div className="row">
          {[
            { label: 'Total Purchases', amount: '$850,000', color: 'primary' },
            { label: 'Completed Orders', amount: '$720,000', color: 'success' },
            { label: 'Pending Orders', amount: '$95,000', color: 'warning' },
            { label: 'Cancelled Orders', amount: '$35,000', color: 'danger' }
          ].map((card, idx) => (
            <div className="col-xl-3 col-lg-4 col-md-6" key={idx}>
              <div className="card position-relative border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="mb-1 text-muted fs-13">{card.label}</p>
                      <h6 className="fs-18 fw-bold mb-0 text-dark">{card.amount}</h6>
                    </div>
                    <div className={`avatar avatar-md rounded-circle bg-soft-${card.color} text-${card.color}`}>
                      <i className={`isax isax-${idx === 0 ? 'shopping-bag' : idx === 1 ? 'tick-circle' : idx === 2 ? 'timer' : 'close-circle'} fs-20`}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
                  placeholder="Search Vendor, ID..."
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
                      <span>{col === 'id' ? 'ID' : col.charAt(0).toUpperCase() + col.slice(1)}</span>
                    </label>
                  </li>
                ))}
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
              {columns.id && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('ref')}>ID {sortConfig.key === 'ref' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.date && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('date')}>Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.vendor && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('vendor')}>Vendor {sortConfig.key === 'vendor' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.amount && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('amount')}>Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.mode && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('mode')}>Payment Mode {sortConfig.key === 'mode' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
              {columns.status && <th style={{ cursor: 'pointer' }} onClick={() => requestSort('status')}>Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="form-check form-check-md">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </td>
                {columns.id && <td><Link href="#" className="link-default">{item.ref}</Link></td>}
                {columns.date && <td>{item.date}</td>}
                {columns.vendor && (
                  <td>
                    <div className="d-flex align-items-center">
                      <Link href="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                        <img src={item.avatar} className="rounded-circle" alt="img" />
                      </Link>
                      <div>
                        <h6 className="fs-14 fw-medium mb-0">
                          <Link href="#">{item.vendor}</Link>
                        </h6>
                      </div>
                    </div>
                  </td>
                )}
                {columns.amount && <td className="text-dark">${item.amount.toLocaleString()}</td>}
                {columns.mode && <td className="text-dark">{item.mode}</td>}
                {columns.status && (
                  <td>
                    <span className={`badge badge-soft-${item.status === 'Paid' ? 'success' : item.status === 'Pending' ? 'warning' : 'danger'} d-inline-flex align-items-center`}>
                      {item.status}
                      <i className={`isax isax-${item.status === 'Paid' ? 'tick-circle' : item.status === 'Pending' ? 'timer' : 'close-circle'} ms-1`}></i>
                    </span>
                  </td>
                )}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr><td colSpan="7" className="text-center">No matching records found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PurchasesReport;
