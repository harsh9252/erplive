import { useState } from 'react';
import { Link } from 'react-router-dom';

const Accounting = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const pageWrapperStyle = {
    maxWidth: 'none',
    width: '100%',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  };

  const contentStyle = {
    maxWidth: 'none',
    width: '100%',
    padding: '24px 32px',
    margin: 0,
  };

  const accountingModules = [
    {
      id: 1,
      title: 'Vouchers',
      description: 'Create and manage accounting vouchers',
      icon: 'isax-document',
      link: '/vouchers',
      count: 12,
      color: 'primary',
    },
    {
      id: 2,
      title: 'Ledgers',
      description: 'Manage chart of accounts and ledgers',
      icon: 'isax-book',
      link: '/ledgers',
      count: 45,
      color: 'success',
    },
    {
      id: 3,
      title: 'Groups',
      description: 'Manage groups under Chart of Accounts',
      icon: 'isax-folder-2',
      link: '/ledger-groups',
      count: 8,
      color: 'info',
    },
    {
      id: 4,
      title: 'Trial Balance',
      description: 'View trial balance report',
      icon: 'isax-document-text',
      link: '/trial-balance',
      count: 1,
      color: 'warning',
    },
    {
      id: 5,
      title: 'Balance Sheet',
      description: 'Generate balance sheet report',
      icon: 'isax-chart-2',
      link: '/balance-sheet',
      count: 1,
      color: 'danger',
    },
    {
      id: 6,
      title: 'Profit & Loss',
      description: 'View profit and loss statement',
      icon: 'isax-chart-1',
      link: '/profit-loss-report',
      count: 1,
      color: 'secondary',
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'Voucher',
      description: 'PMT-001 - Rent payment for February',
      amount: 50000,
      date: '15 Feb 2025',
      status: 'Posted',
    },
    {
      id: 2,
      type: 'Voucher',
      description: 'RCT-001 - Payment received from customer ABC',
      amount: 75000,
      date: '14 Feb 2025',
      status: 'Posted',
    },
    {
      id: 3,
      type: 'Voucher',
      description: 'JNL-001 - Depreciation adjustment',
      amount: 5000,
      date: '13 Feb 2025',
      status: 'Draft',
    },
    {
      id: 4,
      type: 'Voucher',
      description: 'CTR-001 - Cash to bank transfer',
      amount: 100000,
      date: '12 Feb 2025',
      status: 'Posted',
    },
  ];

  const accountingSummary = [
    {
      title: 'Total Vouchers',
      value: 156,
      change: '+12.5%',
      icon: 'isax-document',
      color: 'primary',
    },
    {
      title: 'Total Ledgers',
      value: 45,
      change: '+5.2%',
      icon: 'isax-book',
      color: 'success',
    },
    {
      title: 'Total Debit',
      value: '₹7,50,000',
      change: '+8.3%',
      icon: 'isax-arrow-down-1',
      color: 'info',
    },
    {
      title: 'Total Credit',
      value: '₹5,50,000',
      change: '+3.1%',
      icon: 'isax-arrow-up-1',
      color: 'warning',
    },
  ];

  return (
    <div className="page-wrapper" style={pageWrapperStyle}>
      <div className="content" style={contentStyle}>
        {/* Page Header */}
        <div className="page-header" style={{ marginBottom: '24px' }}>
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Accounting</h4>
              <h6>Manage all accounting operations</h6>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="row g-3" style={{ marginBottom: '24px' }}>
          {accountingSummary.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-12">
              <div className="card bg-light border-0 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-1">{item.title}</h6>
                      <h4 className="mb-0">{item.value}</h4>
                      <small className="text-success">{item.change}</small>
                    </div>
                    <div className={`text-${item.color}`} style={{ fontSize: '2rem' }}>
                      <i className={`isax ${item.icon}`}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-header">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('overview');
                  }}
                >
                  <i className="isax isax-home-2 me-2"></i>Overview
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('transactions');
                  }}
                >
                  <i className="isax isax-document me-2"></i>Recent Transactions
                </Link>
              </li>
            </ul>
          </div>
          <div className="card-body">
            {activeTab === 'overview' && (
              <div>
                <h6 className="mb-3">Accounting Modules</h6>
                <div className="row g-3">
                  {accountingModules.map((module) => (
                    <div key={module.id} className="col-lg-4 col-md-6 col-12">
                      <Link
                        to={module.link}
                        className="card border-0 shadow-sm h-100 text-decoration-none"
                        style={{ transition: 'all 0.3s ease' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                        }}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h6 className="card-title mb-1">{module.title}</h6>
                              <p className="text-muted small mb-0">{module.description}</p>
                            </div>
                            <span className={`badge bg-${module.color}`}>{module.count}</span>
                          </div>
                          <div className={`text-${module.color}`} style={{ fontSize: '2rem' }}>
                            <i className={`isax ${module.icon}`}></i>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div>
                <h6 className="mb-3">Recent Transactions</h6>
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ minWidth: '150px' }}>Type</th>
                        <th style={{ minWidth: '300px' }}>Description</th>
                        <th style={{ minWidth: '120px', textAlign: 'right' }}>Amount</th>
                        <th style={{ minWidth: '120px' }}>Date</th>
                        <th style={{ minWidth: '100px', textAlign: 'center' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td>
                            <span className="badge bg-light text-dark">{transaction.type}</span>
                          </td>
                          <td>{transaction.description}</td>
                          <td style={{ textAlign: 'right', fontWeight: 500 }}>
                            ₹{transaction.amount.toLocaleString('en-IN')}
                          </td>
                          <td>{transaction.date}</td>
                          <td style={{ textAlign: 'center' }}>
                            <span
                              className={`badge ${transaction.status === 'Posted'
                                  ? 'badge-success'
                                  : 'badge-warning'
                                }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h6 className="card-title">Quick Actions</h6>
          </div>
          <div className="card-body">
            <div className="row g-2">
              <div className="col-lg-3 col-md-6 col-12">
                <Link to="/add-voucher" className="btn btn-primary w-100">
                  <i className="isax isax-plus me-2"></i>Create Voucher
                </Link>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <Link to="/add-ledger" className="btn btn-success w-100">
                  <i className="isax isax-plus me-2"></i>Add Ledger
                </Link>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <Link to="/trial-balance" className="btn btn-info w-100">
                  <i className="isax isax-document-text me-2"></i>Trial Balance
                </Link>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <Link to="/balance-sheet" className="btn btn-warning w-100">
                  <i className="isax isax-chart-2 me-2"></i>Balance Sheet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounting;
