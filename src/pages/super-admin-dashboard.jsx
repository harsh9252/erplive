import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SuperAdminDashboard = () => {
  const [systemStats, setSystemStats] = useState({
    totalCompanies: 125,
    activeSubscriptions: 98,
    totalRevenue: '$125,000',
    monthlyGrowth: '12.5%',
  });

  const [recentCompanies, setRecentCompanies] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    serverStatus: 'Online',
    databaseStatus: 'Healthy',
    apiStatus: 'Active',
    backupStatus: 'Completed',
  });

  useEffect(() => {
    const companies = [
      {
        id: 1,
        name: 'Tech Solutions Inc',
        plan: 'Premium',
        users: 25,
        status: 'Active',
        joinDate: '2025-02-15',
      },
      {
        id: 2,
        name: 'Digital Agency Pro',
        plan: 'Business',
        users: 15,
        status: 'Active',
        joinDate: '2025-02-10',
      },
      {
        id: 3,
        name: 'Creative Studio',
        plan: 'Starter',
        users: 8,
        status: 'Trial',
        joinDate: '2025-02-08',
      },
    ];
    setRecentCompanies(companies);
  }, []);

  const getStatusBadge = (status) => {
    const statusClasses = {
      Active: 'badge-soft-success',
      Trial: 'badge-soft-warning',
      Suspended: 'badge-soft-danger',
      Expired: 'badge-soft-secondary',
    };
    return statusClasses[status] || 'badge-soft-secondary';
  };

  const getHealthStatus = (status) => {
    const healthClasses = {
      Online: 'text-success',
      Healthy: 'text-success',
      Active: 'text-success',
      Completed: 'text-success',
      Offline: 'text-danger',
      Error: 'text-danger',
      Failed: 'text-danger',
    };
    return healthClasses[status] || 'text-warning';
  };

  return (
    <>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4>Super Admin Dashboard</h4>
          <p className="text-muted mb-0">Monitor and manage the entire system</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Link to="/system-backup" className="btn btn-outline-primary">
            <i className="isax isax-archive me-1"></i>System Backup
          </Link>
          <Link to="/system-update" className="btn btn-primary">
            <i className="isax isax-refresh me-1"></i>System Update
          </Link>
        </div>
      </div>

      {/* System Stats */}
      <div className="row mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card bg-gradient-primary text-white">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 opacity-75">Total Companies</p>
                  <h4 className="mb-0">{systemStats.totalCompanies}</h4>
                </div>
                <i className="isax isax-buildings fs-24"></i>
              </div>
              <p className="fs-13 mb-0 opacity-75">
                <i className="isax isax-arrow-up me-1"></i>+5 this month
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card bg-gradient-success text-white">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 opacity-75">Active Subscriptions</p>
                  <h4 className="mb-0">{systemStats.activeSubscriptions}</h4>
                </div>
                <i className="isax isax-tick-circle fs-24"></i>
              </div>
              <p className="fs-13 mb-0 opacity-75">
                <i className="isax isax-arrow-up me-1"></i>+8 this month
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card bg-gradient-info text-white">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 opacity-75">Total Revenue</p>
                  <h4 className="mb-0">{systemStats.totalRevenue}</h4>
                </div>
                <i className="isax isax-money-4 fs-24"></i>
              </div>
              <p className="fs-13 mb-0 opacity-75">
                <i className="isax isax-arrow-up me-1"></i>
                {systemStats.monthlyGrowth} growth
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card bg-gradient-warning text-white">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1 opacity-75">System Load</p>
                  <h4 className="mb-0">68%</h4>
                </div>
                <i className="isax isax-cpu-charge fs-24"></i>
              </div>
              <p className="fs-13 mb-0 opacity-75">
                <i className="isax isax-arrow-down me-1"></i>Normal range
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Companies */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="mb-0">Recent Companies</h6>
                <Link to="/companies" className="btn btn-sm btn-outline-primary">
                  View All
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Plan</th>
                      <th>Users</th>
                      <th>Join Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCompanies.map((company) => (
                      <tr key={company.id}>
                        <td>
                          <Link to={`/company-details/${company.id}`} className="fw-medium">
                            {company.name}
                          </Link>
                        </td>
                        <td>
                          <span className="badge badge-soft-primary">{company.plan}</span>
                        </td>
                        <td>{company.users}</td>
                        <td>{company.joinDate}</td>
                        <td>
                          <span className={`badge badge-sm ${getStatusBadge(company.status)}`}>
                            {company.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <Link
                              to={`/company-details/${company.id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              <i className="isax isax-eye"></i>
                            </Link>
                            <button className="btn btn-sm btn-outline-warning">
                              <i className="isax isax-edit"></i>
                            </button>
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

        {/* System Health & Quick Actions */}
        <div className="col-lg-4">
          {/* System Health */}
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="mb-3">System Health</h6>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span>Server Status</span>
                <span className={`fw-medium ${getHealthStatus(systemHealth.serverStatus)}`}>
                  {systemHealth.serverStatus}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span>Database</span>
                <span className={`fw-medium ${getHealthStatus(systemHealth.databaseStatus)}`}>
                  {systemHealth.databaseStatus}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span>API Status</span>
                <span className={`fw-medium ${getHealthStatus(systemHealth.apiStatus)}`}>
                  {systemHealth.apiStatus}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <span>Last Backup</span>
                <span className={`fw-medium ${getHealthStatus(systemHealth.backupStatus)}`}>
                  {systemHealth.backupStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Quick Actions</h6>
              <div className="d-grid gap-2">
                <Link to="/companies" className="btn btn-outline-primary">
                  <i className="isax isax-buildings me-2"></i>Manage Companies
                </Link>
                <Link to="/subscriptions" className="btn btn-outline-success">
                  <i className="isax isax-card-tick me-2"></i>Subscriptions
                </Link>
                <Link to="/packages" className="btn btn-outline-info">
                  <i className="isax isax-box me-2"></i>Manage Packages
                </Link>
                <Link to="/system-backup" className="btn btn-outline-warning">
                  <i className="isax isax-archive me-2"></i>System Backup
                </Link>
                <Link to="/database-backup" className="btn btn-outline-secondary">
                  <i className="isax isax-data me-2"></i>Database Backup
                </Link>
                <Link to="/system-update" className="btn btn-outline-dark">
                  <i className="isax isax-refresh me-2"></i>System Update
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminDashboard;
