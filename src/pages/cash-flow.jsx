import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialData = [
  { id: 1, date: '22 Feb 2025', bankNo: 'GTB - 3298784309485', description: 'Sale of laptops', credit: '15,000', debit: '5,000', accountBalance: '10,000', totalBalance: '10,000', paymentMode: 'Cash' },
  { id: 2, date: '07 Feb 2025', bankNo: 'PNB - 5475878970090', description: 'Customer Refund', credit: '22,500', debit: '7,500', accountBalance: '15,000', totalBalance: '25,750', paymentMode: 'Cheque' },
  { id: 3, date: '30 Jan 2025', bankNo: 'SFB - 3255465758698', description: 'Office Supplies Bought', credit: '30,000', debit: '10,000', accountBalance: '20,000', totalBalance: '50,125', paymentMode: 'Cash' },
  { id: 4, date: '17 Jan 2025', bankNo: 'HSB - 4353689870544', description: 'Salary Received', credit: '12,000', debit: '3,000', accountBalance: '9,000', totalBalance: '75,900', paymentMode: 'Cheque' },
  { id: 5, date: '04 Jan 2025', bankNo: 'ETB - 4324356677889', description: 'Electricity Bill Paid', credit: '18,000', debit: '6,000', accountBalance: '12,000', totalBalance: '99,999', paymentMode: 'Cash' },
  { id: 6, date: '09 Dec 2024', bankNo: 'NPB - 2343547586900', description: 'Service Fee Collected', credit: '25,000', debit: '8,000', accountBalance: '17,000', totalBalance: '1,20,500', paymentMode: 'Cheque' },
  { id: 7, date: '02 Dec 2024', bankNo: 'SDB - 3354456565687', description: 'Customer Refund', credit: '35,000', debit: '12,000', accountBalance: '23,000', totalBalance: '2,50,000', paymentMode: 'Cash' },
  { id: 8, date: '15 Nov 2024', bankNo: 'FEB - 3453647664889', description: 'Equipment Purchase', credit: '40,000', debit: '15,000', accountBalance: '25,000', totalBalance: '5,00,750', paymentMode: 'Cheque' },
  { id: 9, date: '30 Nov 2024', bankNo: 'CCB - 9876543210123', description: 'Freelance Payment', credit: '27,500', debit: '15,000', accountBalance: '18,000', totalBalance: '7,50,300', paymentMode: 'Cash' },
  { id: 10, date: '12 Oct 2024', bankNo: 'PWB - 4567891234567', description: 'Office Rent Paid', credit: '20,000', debit: '9,500', accountBalance: '13,000', totalBalance: '9,99,999', paymentMode: 'Cheque' },
  { id: 11, date: '05 Oct 2024', bankNo: 'ICB - 6543217896543', description: 'Subscription Sale', credit: '45,000', debit: '7,000', accountBalance: '27,000', totalBalance: '87,650', paymentMode: 'Cash' },
  { id: 12, date: '09 Sep 2024', bankNo: 'ECB - 3692581473692', description: 'Refund Issued', credit: '37,500', debit: '18,000', accountBalance: '23,500', totalBalance: '69,420', paymentMode: 'Cheque' },
  { id: 13, date: '02 Sep 2024', bankNo: 'RFB - 3214569873214', description: 'Inventory Restock', credit: '38,000', debit: '14,000', accountBalance: '24,000', totalBalance: '33,210', paymentMode: 'Cash' },
];

const CashFlow = () => {
  const [data] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [columns, setColumns] = useState({
    date: true,
    bankNo: true,
    description: true,
    credit: true,
    debit: true,
    accountBalance: true,
    totalBalance: true,
    paymentMode: true
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
    item.description.toLowerCase().includes(searchText.toLowerCase()) ||
    item.bankNo.toLowerCase().includes(searchText.toLowerCase()) ||
    item.paymentMode.toLowerCase().includes(searchText.toLowerCase())
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
          <h6 className="mb-0">Cash Flow Report</h6>
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
            <div className="card shadow-lg position-relative border-0 border-start border-3 border-primary">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="mb-0 me-2">
                    <h6 className="fs-16 fw-semibold me-2 mb-1">$5,000,000</h6>
                    <p className="mb-1 text-truncate">Opening Cash Balance</p>
                    <p className="fs-13 mb-0 text-truncate">
                      <span className="text-success">
                        <i className="isax isax-send text-success me-1"></i>5.62%
                      </span>{' '}
                      from last month
                    </p>
                  </div>
                  <span className="p-2 bg-primary d-flex align-items-center justify-content-center rounded text-white">
                    <i className="isax isax-dollar-circle fs-24"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card shadow-lg position-relative border-0 border-start border-3 border-success">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="mb-0 me-2">
                    <h6 className="fs-16 fw-semibold mb-1">$7,500,000</h6>
                    <p className="mb-1 text-truncate">Closing Cash Balance</p>
                    <p className="fs-13 mb-0 text-truncate">
                      <span className="text-success">
                        <i className="isax isax-send text-success me-1"></i>11.42%
                      </span>{' '}
                      from last month
                    </p>
                  </div>
                  <span className="p-2 bg-success d-flex align-items-center justify-content-center rounded text-white">
                    <i className="isax isax-money-2 fs-24"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card shadow-lg position-relative border-0 border-start border-3 border-warning">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="mb-0 me-2">
                    <h6 className="fs-16 fw-semibold mb-1">+$2,500,000</h6>
                    <p className="mb-1 text-truncate"> Net Cash Flow</p>
                    <p className="fs-13 mb-0 text-truncate">
                      <span className="text-success">
                        <i className="isax isax-send text-success me-1"></i>8.12%
                      </span>{' '}
                      from last month
                    </p>
                  </div>
                  <span className="p-2 bg-warning d-flex align-items-center justify-content-center rounded text-white">
                    <i className="isax isax-wallet-3 fs-24"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="card shadow-lg position-relative border-0 border-start border-3 border-danger">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="mb-0 me-2">
                    <h6 className="fs-16 fw-semibold me-2 mb-1">60%</h6>
                    <p className="mb-1 text-truncate">Cash Inflows</p>
                    <p className="fs-13 mb-0 text-truncate">
                      <span className="text-success">
                        <i className="isax isax-send text-success me-1"></i>7.45%
                      </span>{' '}
                      from last month
                    </p>
                  </div>
                  <span className="p-2 bg-danger d-flex align-items-center justify-content-center rounded text-white">
                    <i className="isax isax-wallet-money fs-24"></i>
                  </span>
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
              <ul className="dropdown-menu  dropdown-menu">
                {Object.keys(columns).map((key) => {
                  const labelMap = {
                    date: "Date",
                    bankNo: "Bank & Account No",
                    description: "Description",
                    credit: "Credit",
                    debit: "Debit",
                    accountBalance: "Account Balance",
                    totalBalance: "Total Balance",
                    paymentMode: "Payment Mode"
                  };
                  return (
                    <li key={key}>
                      <label className="dropdown-item d-flex align-items-center form-switch">
                        <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                          checked={columns[key]}
                          onChange={() => handleColumnToggle(key)}
                        />
                        <span>{labelMap[key]}</span>
                      </label>
                    </li>
                  );
                })}
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
              {columns.date && <th onClick={() => requestSort('date')} style={{ cursor: 'pointer' }}>Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>}
              {columns.bankNo && <th onClick={() => requestSort('bankNo')} style={{ cursor: 'pointer' }}>Bank & Account No {sortConfig.key === 'bankNo' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>}
              {columns.description && <th onClick={() => requestSort('description')} style={{ cursor: 'pointer' }}>Description {sortConfig.key === 'description' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>}
              {columns.credit && <th onClick={() => requestSort('credit')} style={{ cursor: 'pointer' }}>Credit {sortConfig.key === 'credit' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>}
              {columns.debit && <th onClick={() => requestSort('debit')} style={{ cursor: 'pointer' }}>Debit {sortConfig.key === 'debit' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>}
              {columns.accountBalance && (
                <th onClick={() => requestSort('accountBalance')} style={{ cursor: 'pointer' }}>
                  <span className="d-flex align-items-center">
                    Account Balance {sortConfig.key === 'accountBalance' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}<i className="isax isax-info-circle5 ms-1"></i>
                  </span>
                </th>
              )}
              {columns.totalBalance && (
                <th onClick={() => requestSort('totalBalance')} style={{ cursor: 'pointer' }}>
                  <span className="d-flex align-items-center">
                    Total Balance {sortConfig.key === 'totalBalance' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}<i className="isax isax-info-circle5 ms-1"></i>
                  </span>
                </th>
              )}
              {columns.paymentMode && <th onClick={() => requestSort('paymentMode')} style={{ cursor: 'pointer' }}>Payment Mode {sortConfig.key === 'paymentMode' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="form-check form-check-md">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </td>
                {columns.date && <td>{item.date}</td>}
                {columns.bankNo && <td>{item.bankNo}</td>}
                {columns.description && <td>{item.description}</td>}
                {columns.credit && <td>${item.credit}</td>}
                {columns.debit && <td>${item.debit}</td>}
                {columns.accountBalance && <td>${item.accountBalance}</td>}
                {columns.totalBalance && <td>${item.totalBalance}</td>}
                {columns.paymentMode && <td>{item.paymentMode}</td>}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4">No matching records found.</td>
              </tr>
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
              <label className="form-label">Date Range</label>
              <div className="input-group position-relative">
                <input
                  type="text"
                  className="form-control date-range bookingrange rounded-end h-auto py-1 bg-white"
                />
                <span className="input-icon-addon fs-16 text-gray-9">
                  <i className="isax isax-calendar-2"></i>
                </span>
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
            <div className="mb-3">
              <label className="form-label">Payment Mode</label>
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
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Cash
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Check
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Bank
                        Transfer
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Paypal
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" /> Stripe
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

export default CashFlow;
