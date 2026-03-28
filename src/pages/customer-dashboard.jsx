import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const [customerStats, setCustomerStats] = useState({
    totalInvoices: 25,
    paidInvoices: 18,
    pendingInvoices: 5,
    overdueInvoices: 2,
    totalAmount: '$45,250',
    paidAmount: '$32,180',
    pendingAmount: '$8,570',
    overdueAmount: '$4,500',
  });

  const [recentInvoices, setRecentInvoices] = useState([]);

  useEffect(() => {
    const invoices = [
      {
        id: 'INV-001',
        amount: '$2,500',
        dueDate: '2025-03-15',
        status: 'Paid',
        createdDate: '2025-02-15',
      },
      {
        id: 'INV-002',
        amount: '$1,800',
        dueDate: '2025-03-20',
        status: 'Pending',
        createdDate: '2025-02-20',
      },
      {
        id: 'INV-003',
        amount: '$3,200',
        dueDate: '2025-02-28',
        status: 'Overdue',
        createdDate: '2025-01-28',
      },
    ];
    setRecentInvoices(invoices);
  }, []);

  const getStatusBadge = (status) => {
    const statusClasses = {
      Paid: 'badge-soft-success',
      Pending: 'badge-soft-warning',
      Overdue: 'badge-soft-danger',
    };
    return statusClasses[status] || 'badge-soft-secondary';
  };

  return (
    <>
      {/* Welcome Section */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4>Welcome back, John!</h4>
          <p className="text-muted mb-0">Here's what's happening with your account today.</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Link to="/customer-invoices" className="btn btn-primary">
            <i className="isax isax-receipt-item me-1"></i>View All Invoices
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="row mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 opacity-75">Total Invoices</p>
                  <h4 className="mb-0">{customerStats.totalInvoices}</h4>
                </div>
                <i className="isax isax-receipt-item fs-24"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 opacity-75">Paid</p>
                  <h4 className="mb-0">{customerStats.paidInvoices}</h4>
                </div>
                <i className="isax isax-tick-circle fs-24"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 opacity-75">Pending</p>
                  <h4 className="mb-0">{customerStats.pendingInvoices}</h4>
                </div>
                <i className="isax isax-timer fs-24"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 opacity-75">Overdue</p>
                  <h4 className="mb-0">{customerStats.overdueInvoices}</h4>
                </div>
                <i className="isax isax-close-circle fs-24"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amount Overview */}
      <div className="row mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Total Amount</p>
                  <h6 className="fs-16 fw-semibold">{customerStats.totalAmount}</h6>
                </div>
                <span className="avatar avatar-lg bg-primary text-white">
                  <i className="isax isax-money-4 fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Paid Amount</p>
                  <h6 className="fs-16 fw-semibold text-success">{customerStats.paidAmount}</h6>
                </div>
                <span className="avatar avatar-lg bg-success text-white">
                  <i className="isax isax-money-recive fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Pending Amount</p>
                  <h6 className="fs-16 fw-semibold text-warning">{customerStats.pendingAmount}</h6>
                </div>
                <span className="avatar avatar-lg bg-warning text-white">
                  <i className="isax isax-timer fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Overdue Amount</p>
                  <h6 className="fs-16 fw-semibold text-danger">{customerStats.overdueAmount}</h6>
                </div>
                <span className="avatar avatar-lg bg-danger text-white">
                  <i className="isax isax-close-circle fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Invoices */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="mb-0">Recent Invoices</h6>
                <Link to="/customer-invoices" className="btn btn-sm btn-outline-primary">
                  View All
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Invoice ID</th>
                      <th>Amount</th>
                      <th>Created Date</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>
                          <Link
                            to={`/customer-invoice-details/${invoice.id}`}
                            className="fw-medium text-primary"
                          >
                            {invoice.id}
                          </Link>
                        </td>
                        <td className="fw-medium">{invoice.amount}</td>
                        <td>{invoice.createdDate}</td>
                        <td>{invoice.dueDate}</td>
                        <td>
                          <span className={`badge badge-sm ${getStatusBadge(invoice.status)}`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <Link
                              to={`/customer-invoice-details/${invoice.id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              <i className="isax isax-eye"></i>
                            </Link>
                            {invoice.status === 'Pending' && (
                              <button className="btn btn-sm btn-outline-success">
                                <i className="isax isax-money-send"></i>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Quick Actions</h6>
              <div className="d-grid gap-2">
                <Link to="/customer-invoices" className="btn btn-outline-primary">
                  <i className="isax isax-receipt-item me-2"></i>View All Invoices
                </Link>
                <Link to="/customer-payment-summary" className="btn btn-outline-success">
                  <i className="isax isax-money-recive me-2"></i>Payment History
                </Link>
                <Link to="/customer-account-settings" className="btn btn-outline-info">
                  <i className="isax isax-setting me-2"></i>Account Settings
                </Link>
                <Link to="/customer-transactions" className="btn btn-outline-warning">
                  <i className="isax isax-moneys me-2"></i>Transactions
                </Link>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="card mt-3">
            <div className="card-body">
              <h6 className="mb-3">Account Information</h6>
              <div className="mb-2">
                <small className="text-muted">Customer ID</small>
                <p className="mb-0 fw-medium">CUST-001</p>
              </div>
              <div className="mb-2">
                <small className="text-muted">Member Since</small>
                <p className="mb-0 fw-medium">January 2024</p>
              </div>
              <div className="mb-2">
                <small className="text-muted">Account Status</small>
                <p className="mb-0">
                  <span className="badge badge-soft-success">Active</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
