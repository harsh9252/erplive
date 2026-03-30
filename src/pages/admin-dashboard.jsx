import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dashboardService from '../services/dashboardService';
import financialYearService from '../services/financialYearService';
import { toast } from 'react-toastify';
import { hasPermission } from '../services/authService';

const QUICK_ACTIONS = [
  {
    label: 'Invoice',
    route: '/invoicing/sales/add',
    icon: 'isax-document-text-1',
    module: 'sales_invoice',
    action: 'create'
  },
  {
    label: 'Purchase',
    route: '/invoicing/purchases/add',
    icon: 'isax-document',
    module: 'purchase_invoice',
    action: 'create'
  },
  // {
  //   label: 'Expense',
  //   route: '/expenses',
  //   icon: 'isax-money-send',
  //   module: 'accounting',
  //   action: 'create'
  // },
  {
    label: 'Credit Note',
    route: '/invoicing/credit-notes/add',
    icon: 'isax-money-add',
    module: 'sales_invoice',
    action: 'create'
  },
  {
    label: 'Debit Note',
    route: '/invoicing/debit-notes/add',
    icon: 'isax-money-recive',
    module: 'purchase_invoice',
    action: 'create'
  },
  // {
  //   label: 'Quotation',
  //   route: '/add-quotation',
  //   icon: 'isax-document-download',
  //   module: 'sales_invoice',
  //   action: 'create'
  // },
  {
    label: 'Sales Order',
    route: '/invoicing/sales-orders/add',
    icon: 'isax-note-text-1',
    module: 'sales_invoice',
    action: 'create'
  },
  {
    label: 'Purchase Order',
    route: '/invoicing/purchase-orders/add',
    icon: 'isax-document-copy',
    module: 'purchase_invoice',
    action: 'create'
  },
  // {
  //   label: 'Delivery Challan',
  //   route: '/add-delivery-challan',
  //   icon: 'isax-document-forward',
  //   module: 'sales_invoice',
  //   action: 'create'
  // },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [activeFY, setActiveFY] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Financial Years to get active one
      const fyResponse = await financialYearService.getFinancialYears();
      const fyList = fyResponse.data || fyResponse || [];
      const active = fyList.find(y => y.is_active) || fyList[0];
      setActiveFY(active);

      const fyStart = active?.start_date;
      const fyEnd = active?.end_date;

      // Add a slight stagger before the parallel requests to reduce pressure on the backend
      await new Promise(resolve => setTimeout(resolve, 300));

      // 2. Fetch Dashboard APIs in parallel
      const [summaryRes, chartRes, customersRes] = await Promise.all([
        dashboardService.getDashboardSummary(),
        dashboardService.getSalesChart(6),
        dashboardService.getTopCustomers(5, fyStart, fyEnd)
      ]);

      setSummary(summaryRes.data || summaryRes);
      setChartData(chartRes.data || chartRes || []);
      setTopCustomers(customersRes.data || customersRes || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && chartData.length > 0 && window.ApexCharts) {
      const options = {
        series: [
          {
            name: 'Sales',
            type: 'column',
            data: chartData.map(item => item.sales || 0)
          },
          {
            name: 'Purchases',
            type: 'line',
            data: chartData.map(item => item.purchases || 0)
          }
        ],
        chart: {
          height: 350,
          type: 'line',
          toolbar: { show: false }
        },
        stroke: {
          width: [0, 4],
          curve: 'smooth'
        },
        colors: ['#3B82F6', '#10B981'],
        labels: chartData.map(item => {
          const [year, month] = item.month.split('-');
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          return `${monthNames[parseInt(month) - 1]} ${year}`;
        }),
        xaxis: { type: 'category' },
        yaxis: [
          {
            title: { text: 'Amount' },
            labels: {
              formatter: (val) => formatCurrency(val)
            }
          }
        ],
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: (val) => formatCurrency(val)
          }
        },
        legend: { position: 'top' }
      };

      const chart = new window.ApexCharts(document.querySelector("#sales_analytics"), options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [loading, chartData]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const financials = summary?.financials || {};
  const alerts = summary?.alerts || {};
  const recentInvoices = summary?.recent_invoices || [];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Dashboard</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="dropdown">
            <button
              className="btn btn-primary d-flex align-items-center justify-content-center dropdown-toggle"
              data-bs-toggle="dropdown"
              type="button"
            >
              Create New
            </button>
            <ul className="dropdown-menu dropdown-menu-start">
              {QUICK_ACTIONS.filter(item => hasPermission(item.module, item.action)).map((item, idx) => (
                <li key={idx}>
                  <Link to={item.route} className="dropdown-item">
                    <i className={`isax ${item.icon} me-2`}></i>
                    {item.label}
                  </Link>
                </li>
              ))}
              {QUICK_ACTIONS.filter(item => hasPermission(item.module, item.action)).length === 0 && (
                <li><span className="dropdown-item disabled text-muted">No actions available</span></li>
              )}
            </ul>
          </div>
          <div className="reportrange-picker d-flex align-items-center bg-white border px-3 py-1 rounded">
            <i className="isax isax-calendar text-gray-5 fs-14 me-1"></i>
            <span className="fs-13">{activeFY ? `${activeFY.start_date} to ${activeFY.end_date}` : 'Loading FY...'}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row">
        {/* Total Receivables */}
        <div className="col-sm-6 col-xl-3 d-flex mb-4">
          <Link to="/outstanding-reports" className="card overflow-hidden z-1 flex-fill mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
                <div>
                  <p className="mb-1 text-muted">Total Receivables</p>
                  <h6 className="fs-16 fw-bold">{formatCurrency(financials.total_receivables)}</h6>
                </div>
                <span className="avatar avatar-lg bg-primary text-white avatar-rounded">
                  <i className="isax isax-receipt-item fs-16"></i>
                </span>
              </div>
              <p className="fs-12 mb-0 text-primary">Outstanding Receivables report</p>
            </div>
          </Link>
        </div>

        {/* Total Payables */}
        <div className="col-sm-6 col-xl-3 d-flex mb-4">
          <Link to="/outstanding-reports" className="card overflow-hidden z-1 flex-fill mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
                <div>
                  <p className="mb-1 text-muted">Total Payables</p>
                  <h6 className="fs-16 fw-bold">{formatCurrency(financials.total_payables)}</h6>
                </div>
                <span className="avatar avatar-lg bg-success text-white avatar-rounded">
                  <i className="isax isax-tick-circle fs-16"></i>
                </span>
              </div>
              <p className="fs-12 mb-0 text-success">Outstanding Payables report</p>
            </div>
          </Link>
        </div>

        {/* Net Position */}
        <div className="col-sm-6 col-xl-3 d-flex mb-4">
          <div className="card overflow-hidden z-1 flex-fill mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
                <div>
                  <p className="mb-1 text-muted">Net Position</p>
                  <h6 className="fs-16 fw-bold">{formatCurrency(financials.net_position)}</h6>
                </div>
                <span className="avatar avatar-lg bg-warning text-white avatar-rounded">
                  <i className="isax isax-timer fs-16"></i>
                </span>
              </div>
              <p className="fs-12 mb-0 text-warning">Current Business Status</p>
            </div>
          </div>
        </div>

        {/* Month Sales */}
        <div className="col-sm-6 col-xl-3 d-flex mb-4">
          <Link to="/sales-report" className="card overflow-hidden z-1 flex-fill mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
                <div>
                  <p className="mb-1 text-muted">Month Sales</p>
                  <h6 className="fs-16 fw-bold">{formatCurrency(financials.month_sales)}</h6>
                </div>
                <span className="avatar avatar-lg bg-danger text-white avatar-rounded">
                  <i className="isax isax-send fs-16"></i>
                </span>
              </div>
              <p className="fs-12 mb-0 text-danger">Sales Analysis</p>
            </div>
          </Link>
        </div>

        {/* Month Purchases */}
        <div className="col-sm-6 col-xl-3 d-flex mb-4">
          <Link to="/purchases-report" className="card overflow-hidden z-1 flex-fill mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
                <div>
                  <p className="mb-1 text-muted">Month Purchases</p>
                  <h6 className="fs-16 fw-bold">{formatCurrency(financials.month_purchases)}</h6>
                </div>
                <span className="avatar avatar-lg bg-info text-white avatar-rounded">
                  <i className="isax isax-receipt-item fs-16"></i>
                </span>
              </div>
              <p className="fs-12 mb-0 text-info">Purchase Analysis</p>
            </div>
          </Link>
        </div>

        {/* Low Stock Alerts */}
        <div className="col-sm-6 col-xl-3 d-flex mb-4">
          <Link to="/stock-alerts" className="card overflow-hidden z-1 flex-fill mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
                <div>
                  <p className="mb-1 text-muted">Low Stock Alerts</p>
                  <h6 className="fs-16 fw-bold">{alerts.low_stock_items || 0}</h6>
                </div>
                <span className="avatar avatar-lg bg-secondary text-white avatar-rounded">
                  <i className="isax isax-box fs-16"></i>
                </span>
              </div>
              <p className="fs-12 mb-0 text-secondary">Stock Verification</p>
            </div>
          </Link>
        </div>

        {/* Pending Cheques */}
        <div className="col-sm-6 col-xl-3 d-flex mb-4">
          <Link to="/banking/cheques" className="card overflow-hidden z-1 flex-fill mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-2">
                <div>
                  <p className="mb-1 text-muted">Pending Cheques</p>
                  <h6 className="fs-16 fw-bold">{alerts.pending_cheques || 0}</h6>
                </div>
                <span className="avatar avatar-lg bg-dark text-white avatar-rounded">
                  <i className="isax isax-wallet fs-16"></i>
                </span>
              </div>
              <p className="fs-12 mb-0 text-dark">Post-Dated Cheques</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row">
        {/* Sales vs Purchase Chart */}
        <div className="col-xl-8 d-flex mb-4">
          <div className="card flex-fill mb-0">
            <div className="card-body">
              <div className="mb-3 d-flex align-items-center justify-content-between">
                <h6 className="mb-0">Sales vs Purchase Analytics</h6>
              </div>
              <div className="d-flex align-items-center flex-wrap gap-4 mb-4">
                <div>
                  <p className="fs-13 mb-1 text-muted">Month Sales</p>
                  <h6 className="fs-16 fw-bold text-primary">{formatCurrency(financials.month_sales)}</h6>
                </div>
                <div>
                  <p className="fs-13 mb-1 text-muted">Month Purchases</p>
                  <h6 className="fs-16 fw-bold text-success">{formatCurrency(financials.month_purchases)}</h6>
                </div>
                <div>
                  <p className="fs-13 mb-1 text-muted">Net Position</p>
                  <h6 className="fs-16 fw-bold">{formatCurrency(financials.net_position)}</h6>
                </div>
              </div>
              <div id="sales_analytics" style={{ minHeight: '350px' }}></div>
            </div>
          </div>
        </div>

        {/* Summary Card (Right) */}
        <div className="col-xl-4 d-flex mb-4">
          <div className="card flex-fill mb-0">
            <div className="card-header border-0 pb-0">
              <h6 className="mb-0">Financial Summary</h6>
            </div>
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <div className="mb-4">
                <h4 className="text-primary mb-1">{formatCurrency(financials.total_receivables)}</h4>
                <p className="text-muted">Total Receivables</p>
              </div>
              <hr />
              <div className="mt-4">
                <h4 className="text-success mb-1">{formatCurrency(financials.total_payables)}</h4>
                <p className="text-muted">Total Payables</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="row">
        {/* Recent Invoices */}
        <div className="col-lg-6 mb-4">
          <div className="card mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                <h6 className="mb-0">Recent Invoices</h6>
                <Link to="/invoices" className="btn btn-sm btn-outline-dark">View All</Link>
              </div>
              <div className="table-responsive">
                <table className="table table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Invoice No</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th className="text-end">Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInvoices.map((inv, idx) => (
                      <tr key={idx}>
                        <td className="text-primary fw-medium">{inv.invoice_no}</td>
                        <td>{inv.date}</td>
                        <td>{inv.customer_name}</td>
                        <td className="text-end fw-semibold">{formatCurrency(inv.amount)}</td>
                        <td>
                          <span className={`badge badge-soft-${inv.payment_status === 'Paid' ? 'success' : 'warning'}`}>
                            {inv.payment_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {recentInvoices.length === 0 && (
                      <tr><td colSpan="5" className="text-center py-4 text-muted">No recent invoices found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Top Customers */}
        <div className="col-lg-6 mb-4">
          <div className="card mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                <h6 className="mb-0">Top Customers</h6>
                <Link to="/customers-report" className="btn btn-sm btn-outline-dark">Analytics</Link>
              </div>
              <div className="table-responsive">
                <table className="table table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Customer Name</th>
                      <th className="text-end">Total Sales</th>
                      <th className="text-center">Invoices</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomers.map((cust, idx) => (
                      <tr key={idx}>
                        <td className="fw-medium">{cust.customer_name}</td>
                        <td className="text-end fw-semibold text-dark">{formatCurrency(cust.total_sales)}</td>
                        <td className="text-center"><span className="badge bg-light text-dark">{cust.invoice_count}</span></td>
                      </tr>
                    ))}
                    {topCustomers.length === 0 && (
                      <tr><td colSpan="3" className="text-center py-4 text-muted">No data available for the period</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
