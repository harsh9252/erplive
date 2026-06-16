import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApexCharts from 'apexcharts';
import dashboardService from '../services/dashboardService';
import { getCustomers } from '../services/customerService';
import financialYearService from '../services/financialYearService';
import investmentService from '../services/investmentService';
import { useAuth } from '../components/AuthContext';
import { toast } from 'react-toastify';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [activeFY, setActiveFY] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [investmentSummary, setInvestmentSummary] = useState({ total_invested: 0, current_value: 0 });

  useEffect(() => {
    fetchDashboardData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Financial Year
      const fyResponse = await financialYearService.getFinancialYears();
      const fyList = fyResponse.data || fyResponse || [];
      const active = fyList.find(y => y.is_active) || fyList[0];
      setActiveFY(active);

      const fyStart = active?.start_date;
      const fyEnd = active?.end_date;

      // 2. Fetch all dashboard data in parallel
      const [summaryRes, chartRes, invCount, custCount, recentInv, topCust, investRes] = await Promise.allSettled([
        dashboardService.getDashboardSummary(),
        dashboardService.getSalesChart(6),
        dashboardService.getInvoiceCount(),
        dashboardService.getCustomerCount(),
        dashboardService.getRecentInvoices(5),
        getCustomers(1, 5),  // fetch top 5 customers from /api/customers
        investmentService.getHoldingsSummary()
      ]);

      if (summaryRes.status === 'fulfilled') {
        const data = summaryRes.value?.data || summaryRes.value;
        setSummary(data);
      }

      const chartValues = chartRes.status === 'fulfilled' ? (chartRes.value?.data || chartRes.value || []) : [];
      if (chartRes.status === 'fulfilled') {
        setChartData(chartValues);
      }

      // Calculate dynamic month totals from chart data if summary is 0
      if (chartValues.length > 0) {
        const currentMonthStr = new Date().toISOString().substring(0, 7); // "YYYY-MM"
        const currentMonthData = chartValues.find(m => m.month === currentMonthStr) || chartValues[chartValues.length - 1];

        setSummary(prev => {
          const newSummary = { ...prev };
          newSummary.financials = { ...newSummary.financials };

          if (!newSummary.financials.month_sales && currentMonthData?.sales) {
            newSummary.financials.month_sales = currentMonthData.sales;
          }
          if (!newSummary.financials.month_purchases && currentMonthData?.purchases) {
            newSummary.financials.month_purchases = currentMonthData.purchases;
          }
          // Dynamic Net Position if missing
          if (!newSummary.financials.net_position) {
            const rec = parseFloat(newSummary.financials.total_receivables) || 0;
            const pay = parseFloat(newSummary.financials.total_payables) || 0;
            newSummary.financials.net_position = rec - pay;
          }
          return newSummary;
        });
      }

      if (invCount.status === 'fulfilled') {
        console.log('[Dashboard] Invoice count raw:', invCount.value);
        setInvoiceCount(invCount.value || 0);
      }
      if (custCount.status === 'fulfilled') {
        console.log('[Dashboard] Customer count raw:', custCount.value);
        setCustomerCount(custCount.value || 0);
      }
      if (recentInv.status === 'fulfilled') {
        setRecentInvoices(recentInv.value || []);
      }
      if (topCust.status === 'fulfilled') {
        console.log('[Dashboard] Top customers raw:', topCust.value);
        // getCustomers returns { data: [...], pagination: {...} }
        const custData = topCust.value?.data || topCust.value || [];
        setTopCustomers(Array.isArray(custData) ? custData : []);
      }

      if (investRes.status === 'fulfilled') {
        const iData = investRes.value?.data || investRes.value || {};
        setInvestmentSummary({
          total_invested: iData.total_invested || iData.total_cost || 0,
          current_value: iData.current_value || 0
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let chart = null;
    if (!loading && chartData.length > 0) {
      const options = {
        series: [{
          name: 'Sales',
          data: chartData.map(item => parseFloat(item.sales) || 0)
        }, {
          name: 'Purchase',
          data: chartData.map(item => parseFloat(item.purchases) || 0)
        }],
        chart: {
          height: 273,
          type: 'area',
          toolbar: { show: false },
          zoom: { enabled: false }
        },
        colors: ['#3B82F6', '#10B981'],
        dataLabels: { enabled: false },
        fill: {
          type: 'gradient',
          gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 }
        },
        stroke: { curve: 'smooth', width: 3 },
        xaxis: {
          categories: chartData.map(item => {
            const [year, month] = item.month.split('-');
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return months[parseInt(month) - 1];
          }),
        },
        yaxis: {
          labels: {
            formatter: (val) => formatCurrencyShort(val)
          }
        },
        tooltip: {
          y: {
            formatter: (val) => formatCurrency(val)
          }
        },
        legend: { position: 'top', horizontalAlign: 'right' }
      };

      const el = document.querySelector('#revenue_chart');
      if (el) {
        chart = new ApexCharts(el, options);
        chart.render();
      }
    }
    return () => { if (chart) chart.destroy(); };
  }, [loading, chartData]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  const formatCurrencyShort = (value) => {
    const v = parseFloat(value) || 0;
    if (v >= 10000000) return '₹' + (v / 10000000).toFixed(1) + ' Cr';
    if (v >= 100000) return '₹' + (v / 100000).toFixed(1) + ' L';
    if (v >= 1000) return '₹' + (v / 1000).toFixed(1) + 'K';
    return '₹' + v.toFixed(0);
  };

  const getPaymentStatusBadge = (status) => {
    switch ((status || '').toUpperCase()) {
      case 'PAID': return 'success';
      case 'PARTIAL': return 'info';
      case 'UNPAID': return 'warning';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const financials = summary?.financials || {};
  const alerts = summary?.alerts || {};

  return (
    <>
      {/* Breadcrumb Bar */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="fw-bold mb-0">Dashboard</h6>
        </div>
        <div className="d-flex align-items-center flex-wrap gap-2">
          <div className="reportrange-picker d-flex align-items-center bg-white border px-3 py-1 rounded">
            <i className="isax isax-calendar text-gray-5 fs-14 me-1"></i>
            <span className="fs-13">
              {activeFY
                ? `${new Date(activeFY.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })} - ${new Date(activeFY.end_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}`
                : 'Loading...'}
            </span>
          </div>
          <button className="btn btn-sm btn-outline-secondary" onClick={fetchDashboardData} title="Refresh">
            <i className="isax isax-refresh fs-14"></i>
          </button>
          <div className="dropdown">
            <button className="btn btn-primary d-flex align-items-center gap-2 dropdown-toggle" data-bs-toggle="dropdown">
              <i className="isax isax-add-circle"></i> Create New
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0">
              <li><Link to="/invoicing/sales/add" className="dropdown-item"><i className="isax isax-document-text-1 me-2"></i>Invoice</Link></li>
              <li><Link to="/invoicing/sales-orders/add" className="dropdown-item"><i className="isax isax-note-text me-2"></i>Sales Order</Link></li>
              <li><Link to="/invoicing/purchase-orders/add" className="dropdown-item"><i className="isax isax-document-copy me-2"></i>Purchase Order</Link></li>
              <li><Link to="/invoicing/credit-notes/add" className="dropdown-item"><i className="isax isax-money-add me-2"></i>Credit Note</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="rounded position-relative mb-4 p-4 text-white overflow-hidden" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' }}>
        <div className="row align-items-center">
          <div className="col-lg-8">
            <h4 className="fw-bold mb-1">Good Day, {user?.name || 'User'}</h4>
            <p className="mb-3 opacity-90 mb-2">
              {alerts.low_stock_items > 0 || alerts.pending_cheques > 0
                ? `You have ${alerts.low_stock_items || 0} low stock alert${alerts.low_stock_items !== 1 ? 's' : ''} and ${alerts.pending_cheques || 0} pending cheque${alerts.pending_cheques !== 1 ? 's' : ''}.`
                : 'Everything looks great! Here is your business overview.'}
            </p>

          </div>
        </div>

      </div>

      {/* Stats Cards Row */}
      <div className="row g-3 mb-4">
        {/* Total Invoices */}
        <div className="col-6 col-xl-3">
          <Link to="/invoicing/sales" className="card border-0 shadow-sm h-100 mb-0 text-decoration-none">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="avatar avatar-44 bg-primary-subtle text-primary rounded-circle">
                  <i className="isax isax-document-text-1 fs-20"></i>
                </span>
                <span className="badge badge-soft-primary fs-11">Invoices</span>
              </div>
              <h4 className="fw-bold mb-0">{invoiceCount.toLocaleString('en-IN')}</h4>
              <p className="text-muted fs-13 mb-0 mt-1">Total Sales Invoices</p>
            </div>
          </Link>
        </div>

        {/* Total Customers */}
        <div className="col-6 col-xl-3">
          <Link to="/customers" className="card border-0 shadow-sm h-100 mb-0 text-decoration-none">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="avatar avatar-44 bg-success-subtle text-success rounded-circle">
                  <i className="isax isax-profile-2user fs-20"></i>
                </span>
                <span className="badge badge-soft-success fs-11">Customers</span>
              </div>
              <h4 className="fw-bold mb-0">{customerCount.toLocaleString('en-IN')}</h4>
              <p className="text-muted fs-13 mb-0 mt-1">Total Customers</p>
            </div>
          </Link>
        </div>

        {/* Total Receivables */}
        <div className="col-6 col-xl-3">
          <Link to="/reports/outstanding-reports" state={{ reportType: 'receivables' }} className="card border-0 shadow-sm h-100 mb-0 text-decoration-none">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="avatar avatar-44 bg-warning-subtle text-warning rounded-circle">
                  <i className="isax isax-receipt-item fs-20"></i>
                </span>
                <span className="badge badge-soft-warning fs-11">Receivable</span>
              </div>
              <h4 className="fw-bold mb-0">{formatCurrencyShort(financials.total_receivables)}</h4>
              <p className="text-muted fs-13 mb-0 mt-1">Outstanding Receivables</p>
            </div>
          </Link>
        </div>

        {/* Total Payables */}
        <div className="col-6 col-xl-3">
          <Link to="/reports/outstanding-reports" state={{ reportType: 'payables' }} className="card border-0 shadow-sm h-100 mb-0 text-decoration-none">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="avatar avatar-44 bg-danger-subtle text-danger rounded-circle">
                  <i className="isax isax-money fs-20"></i>
                </span>
                <span className="badge badge-soft-danger fs-11">Payable</span>
              </div>
              <h4 className="fw-bold mb-0">{formatCurrencyShort(financials.total_payables)}</h4>
              <p className="text-muted fs-13 mb-0 mt-1">Outstanding Payables</p>
            </div>
          </Link>
        </div>

        {/* Total Investments - New Card */}
        <div className="col-6 col-xl-3">
          <Link to="/master/investments" className="card border-0 shadow-sm h-100 mb-0 text-decoration-none">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="avatar avatar-44 bg-info-subtle text-info rounded-circle">
                  <i className="isax isax-chart-success fs-20"></i>
                </span>
                <span className="badge badge-soft-info fs-11">Investments</span>
              </div>
              <h4 className="fw-bold mb-0">{formatCurrencyShort(investmentSummary.total_invested)}</h4>
              <p className="text-muted fs-13 mb-0 mt-1">Total Investments</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Charts + Tables Row */}
      <div className="row g-3">
        {/* Left Column */}
        <div className="col-xl-8">
          {/* Revenue Chart */}
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="fw-bold mb-0">Revenue Analytics</h6>

              </div>
              {chartData.length > 0
                ? <div id="revenue_chart"></div>
                : <div className="text-center py-5 text-muted fs-13"><i className="isax isax-chart-21 fs-32 d-block mb-2 opacity-25"></i>No chart data available</div>
              }
            </div>
          </div>

          {/* Recent Invoices Table */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="fw-bold mb-0">Recent Invoices</h6>
                <Link to="/invoicing/sales" className="btn btn-sm btn-soft-primary fs-12">View All</Link>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light fs-12 text-muted">
                    <tr>
                      <th>Invoice No</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th className="text-end">Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInvoices.map((inv, idx) => (
                      <tr key={inv.id || idx}>
                        <td>
                          <Link to={`/invoicing/sales/${inv.id}`} className="fw-medium text-primary text-decoration-none">
                            {inv.invoice_number || inv.invoice_no || `#${inv.id}`}
                          </Link>
                        </td>
                        <td className="fs-13">{inv.customer?.name || inv.customer_name || '—'}</td>
                        <td className="fs-12 text-muted">{inv.invoice_date || inv.date || '—'}</td>
                        <td className="text-end fw-bold">{formatCurrency(inv.net_total || inv.amount)}</td>
                        <td>
                          <span className={`badge badge-soft-${getPaymentStatusBadge(inv.payment_status || inv.status)} rounded-pill fs-11`}>
                            {inv.payment_status || inv.status || 'DRAFT'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {recentInvoices.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted fs-13">
                          <i className="isax isax-document-text-1 d-block fs-28 mb-2 opacity-25"></i>
                          No invoices found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-xl-4">
          {/* Financial Summary Card */}
          <div className="card border-0 shadow-sm mb-3 text-white" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' }}>
            <div className="card-body">
              <p className="fs-13 mb-3 opacity-75 fw-medium">Financial Summary</p>

              <div className="mb-3">
                <p className="fs-12 mb-1 opacity-75">Net Position</p>
                <h3 className="fw-bold mb-0">{formatCurrency(financials.net_position)}</h3>
              </div>

              <hr className="border-white opacity-25" />

              <div className="row g-2 mt-1">
                <div className="col-6">
                  <Link to="/sales-report" className="text-white text-decoration-none d-block custom-card-hover">
                    <p className="fs-12 mb-1 opacity-75">Month Sales</p>
                    <p className="fw-bold mb-0">{formatCurrencyShort(financials.month_sales)}</p>
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="/purchases-report" className="text-white text-decoration-none d-block custom-card-hover">
                    <p className="fs-12 mb-1 opacity-75">Month Purchase</p>
                    <p className="fw-bold mb-0">{formatCurrencyShort(financials.month_purchases)}</p>
                  </Link>
                </div>
              </div>

              <hr className="border-white opacity-25" />

              <div className="row g-2">
                <div className="col-6">
                  <Link to="/stock-alerts" className="text-white text-decoration-none d-block custom-card-hover">
                    <p className="fs-12 mb-1 opacity-75">Low Stock</p>
                    <p className="fw-bold mb-0">{alerts.low_stock_items ?? '0'} items</p>
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="/banking/cheques" className="text-white text-decoration-none d-block custom-card-hover">
                    <p className="fs-12 mb-1 opacity-75">Pending Cheques</p>
                    <p className="fw-bold mb-0">{alerts.pending_cheques ?? '0'}</p>
                  </Link>
                </div>
              </div>

              <hr className="border-white opacity-25" />
              
              <div className="row g-2">
                <div className="col-12">
                  <Link to="/master/investments" className="text-white text-decoration-none d-block custom-card-hover">
                    <p className="fs-12 mb-1 opacity-75">Portfolio Value</p>
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="fw-bold mb-0">{formatCurrencyShort(investmentSummary.current_value || investmentSummary.total_invested)}</p>
                      <span className="badge bg-white text-primary fs-10">Live Tracker</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Top Customers */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="fw-bold mb-0">Top Customers</h6>
                <Link to="/customers" className="btn btn-sm btn-soft-primary fs-12">View All</Link>
              </div>
              <div className="d-grid gap-3">
                {topCustomers.map((cust, idx) => (
                  <div key={cust.id || idx} className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold fs-12"
                        style={{ width: 36, height: 36, background: `hsl(${(idx * 60) % 360}, 60%, 55%)`, flexShrink: 0 }}
                      >
                        {(cust.name || cust.customer_name || '?').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="fw-medium fs-13 mb-0">{cust.name || cust.customer_name || '—'}</p>
                        <p className="fs-11 text-muted mb-0">
                          {cust.city ? cust.city : cust.gstin ? cust.gstin : cust.email || 'Customer'}
                        </p>
                      </div>
                    </div>
                    <span className="badge badge-soft-success fs-11">Active</span>
                  </div>
                ))}
                {topCustomers.length === 0 && (
                  <div className="text-center py-4 text-muted fs-13">
                    <i className="isax isax-profile-2user d-block fs-28 mb-2 opacity-25"></i>
                    No customer data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
