import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMISDashboard } from '../services/dashboardService';
import financialYearService from '../services/financialYearService';
import { toast } from 'react-toastify';

const MISDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [misData, setMisData] = useState(null);
  const [activeFY, setActiveFY] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Get active financial year
      const fyResponse = await financialYearService.getFinancialYears();
      const fyList = fyResponse.data || fyResponse || [];
      const active = fyList.find((y) => y.is_active) || fyList[0];
      setActiveFY(active);

      // 2. Fetch MIS data
      const response = await getMISDashboard(
        active?.start_date,
        active?.end_date
      );
      setMisData(response.data || response || {});
    } catch (error) {
      console.error('Error fetching MIS dashboard:', error);
      toast.error('Failed to load MIS dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value || 0);

  const formatNumber = (value) =>
    new Intl.NumberFormat('en-IN').format(value || 0);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '80vh' }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading MIS Dashboard...</p>
        </div>
      </div>
    );
  }

  // Extract data based on the actual API structure
  const kpis = misData?.kpis || {};
  const counts = misData?.counts || {};
  const gst = misData?.gst || {};

  const totalSales = kpis.ytd_sales || kpis.month_sales || 0;
  const totalPurchases = kpis.ytd_purchases || kpis.month_purchases || 0;
  const totalReceivables = kpis.total_receivables || 0;
  const totalPayables = kpis.total_payables || 0;
  const netProfit = kpis.net_position || (totalSales - totalPurchases);
  
  const totalGstCollected = gst.output_tax_this_month || 0;
  // If input tax is missing, default to 0
  const totalGstPaid = gst.input_tax_this_month || 0; 
  const netGst = (totalGstCollected - totalGstPaid) || 0;
  
  // Stock value is not in this specific JSON, default to 0
  const stockValue = 0; 
  
  // Payroll info is missing from this specific JSON, default to 0
  const totalEmployees = counts.employees || 0;
  const totalPayroll = 0;

  return (
    <>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="fw-bold mb-0">MIS Dashboard</h6>
          <p className="text-muted fs-13 mb-0">
            Management Information System — Consolidated Overview
          </p>
        </div>
        <div className="d-flex align-items-center flex-wrap gap-2">
          <div className="reportrange-picker d-flex align-items-center bg-white border px-3 py-1 rounded">
            <i className="isax isax-calendar text-gray-5 fs-14 me-1"></i>
            <span className="fs-13">
              {activeFY
                ? `${new Date(activeFY.start_date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                  })} - ${new Date(activeFY.end_date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                  })}`
                : 'Loading...'}
            </span>
          </div>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={fetchData}
            title="Refresh"
          >
            <i className="isax isax-refresh fs-14"></i>
          </button>
          <Link to="/dashboard" className="btn btn-sm btn-primary">
            <i className="isax isax-arrow-left me-1"></i>Dashboard
          </Link>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm mb-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="avatar avatar-44 bg-primary-subtle text-primary rounded-circle">
                  <i className="isax isax-money-send fs-20"></i>
                </span>
                <span className="badge badge-soft-primary fs-11">Sales</span>
              </div>
              <h5 className="fw-bold mb-0">{formatCurrency(totalSales)}</h5>
              <p className="text-muted fs-12 mb-0 mt-1">Total Sales</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm mb-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="avatar avatar-44 bg-danger-subtle text-danger rounded-circle">
                  <i className="isax isax-money-recive fs-20"></i>
                </span>
                <span className="badge badge-soft-danger fs-11">Purchases</span>
              </div>
              <h5 className="fw-bold mb-0">{formatCurrency(totalPurchases)}</h5>
              <p className="text-muted fs-12 mb-0 mt-1">Total Purchases</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm mb-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="avatar avatar-44 bg-success-subtle text-success rounded-circle">
                  <i className="isax isax-chart-success fs-20"></i>
                </span>
                <span className="badge badge-soft-success fs-11">Net P&L</span>
              </div>
              <h5 className={`fw-bold mb-0 ${netProfit >= 0 ? 'text-success' : 'text-danger'}`}>
                {formatCurrency(netProfit)}
              </h5>
              <p className="text-muted fs-12 mb-0 mt-1">Net Profit / Loss</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm mb-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="avatar avatar-44 bg-warning-subtle text-warning rounded-circle">
                  <i className="isax isax-box fs-20"></i>
                </span>
                <span className="badge badge-soft-warning fs-11">Stock</span>
              </div>
              <h5 className="fw-bold mb-0">{formatCurrency(stockValue)}</h5>
              <p className="text-muted fs-12 mb-0 mt-1">Current Stock Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Outstanding & GST Row */}
      <div className="row g-3 mb-4">
        {/* Receivables */}
        <div className="col-sm-6 col-xl-3">
          <Link to="/reports/outstanding-reports" state={{ reportType: 'receivables' }} className="card border-0 shadow-sm mb-0 h-100 text-decoration-none">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="isax isax-receipt-item text-primary fs-18"></i>
                <span className="fw-semibold fs-13 text-dark">Receivables</span>
              </div>
              <h5 className="fw-bold mb-1">{formatCurrency(totalReceivables)}</h5>
              <p className="text-muted fs-12 mb-0">Outstanding from customers</p>
            </div>
          </Link>
        </div>
        {/* Payables */}
        <div className="col-sm-6 col-xl-3">
          <Link to="/reports/outstanding-reports" state={{ reportType: 'payables' }} className="card border-0 shadow-sm mb-0 h-100 text-decoration-none">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="isax isax-money text-danger fs-18"></i>
                <span className="fw-semibold fs-13 text-dark">Payables</span>
              </div>
              <h5 className="fw-bold mb-1">{formatCurrency(totalPayables)}</h5>
              <p className="text-muted fs-12 mb-0">Outstanding to vendors</p>
            </div>
          </Link>
        </div>
        {/* GST Collected */}
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm mb-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="isax isax-percentage-circle text-info fs-18"></i>
                <span className="fw-semibold fs-13">GST Collected</span>
              </div>
              <h5 className="fw-bold mb-1">{formatCurrency(totalGstCollected)}</h5>
              <p className="text-muted fs-12 mb-0">Output GST on sales</p>
            </div>
          </div>
        </div>
        {/* Net GST Liability */}
        <div className="col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm mb-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="isax isax-status-up text-secondary fs-18"></i>
                <span className="fw-semibold fs-13">Net GST Liability</span>
              </div>
              <h5 className={`fw-bold mb-1 ${netGst > 0 ? 'text-danger' : 'text-success'}`}>
                {formatCurrency(netGst)}
              </h5>
              <p className="text-muted fs-12 mb-0">
                {netGst > 0 ? 'Payable to Government' : 'ITC Balance / Refundable'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll & Detailed Sections */}
      <div className="row g-3 mb-4">
        {/* System Summary & Alerts */}
        <div className="col-xl-4">
          <div className="card border-0 shadow-sm mb-0 h-100">
            <div className="card-header bg-transparent border-0 pb-0">
              <h6 className="fw-bold mb-0">
                <i className="isax isax-data me-2 text-primary"></i>
                System Summary & Alerts
              </h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="text-muted fs-13">Total Customers</span>
                <span className="fw-bold">{formatNumber(counts.customers || 0)}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="text-muted fs-13">Total Vendors</span>
                <span className="fw-bold">{formatNumber(counts.vendors || 0)}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="text-muted fs-13">Stock Items</span>
                <span className="fw-bold">{formatNumber(counts.items || 0)}</span>
              </div>
              
              {/* Alerts Section */}
              <div className="mt-3">
                {(misData?.alerts?.low_stock_items > 0) && (
                  <Link to="/inventory/stock-alerts" className="d-flex justify-content-between align-items-center py-2 bg-danger-subtle px-3 rounded mb-2 text-decoration-none">
                    <span className="text-danger fs-13 fw-medium"><i className="isax isax-warning-2 me-2"></i>Low Stock Items</span>
                    <span className="badge bg-danger">{misData.alerts.low_stock_items}</span>
                  </Link>
                )}
                {(misData?.alerts?.pending_cheques > 0) && (
                  <Link to="/banking/cheques" className="d-flex justify-content-between align-items-center py-2 bg-warning-subtle px-3 rounded text-decoration-none">
                    <span className="text-warning-emphasis fs-13 fw-medium"><i className="isax isax-timer-1 me-2"></i>Pending Cheques</span>
                    <span className="badge bg-warning text-dark">{misData.alerts.pending_cheques}</span>
                  </Link>
                )}
                {/* Fallback if no alerts */}
                {(!misData?.alerts?.low_stock_items && !misData?.alerts?.pending_cheques) && (
                   <div className="text-center py-2 text-muted fs-13">
                      <i className="isax isax-tick-circle text-success me-1"></i> No pending alerts
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* GST Breakdown */}
        <div className="col-xl-4">
          <div className="card border-0 shadow-sm mb-0 h-100">
            <div className="card-header bg-transparent border-0 pb-0">
              <h6 className="fw-bold mb-0">
                <i className="isax isax-receipt-edit me-2 text-info"></i>
                GST Breakdown
              </h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="text-muted fs-13">Output GST (On Sales)</span>
                <span className="fw-bold text-danger">
                  {formatCurrency(totalGstCollected)}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="text-muted fs-13">Input GST (On Purchases)</span>
                <span className="fw-bold text-success">
                  {formatCurrency(totalGstPaid)}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="text-muted fs-13">Net GST Liability</span>
                <span className={`fw-bold ${netGst > 0 ? 'text-danger' : 'text-success'}`}>
                  {formatCurrency(netGst)}
                </span>
              </div>
              <div className="mt-3 text-center">
                <Link
                  to="/reports/gst-rate-wise-report"
                  className="btn btn-sm btn-soft-info"
                >
                  View GST Report
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-xl-4">
          <div className="card border-0 shadow-sm mb-0 h-100">
            <div className="card-header bg-transparent border-0 pb-0">
              <h6 className="fw-bold mb-0">
                <i className="isax isax-link me-2 text-warning"></i>
                Quick Reports
              </h6>
            </div>
            <div className="card-body d-grid gap-2">
              <Link
                to="/reports/trial-balance"
                className="btn btn-outline-secondary text-start d-flex align-items-center"
              >
                <i className="isax isax-document-text me-2"></i>Trial Balance
              </Link>
              <Link
                to="/reports/profit-loss-report"
                className="btn btn-outline-secondary text-start d-flex align-items-center"
              >
                <i className="isax isax-chart me-2"></i>Profit & Loss
              </Link>
              <Link
                to="/reports/balance-sheet"
                className="btn btn-outline-secondary text-start d-flex align-items-center"
              >
                <i className="isax isax-clipboard-text me-2"></i>Balance Sheet
              </Link>
              <Link
                to="/reports/outstanding-reports"
                className="btn btn-outline-secondary text-start d-flex align-items-center"
              >
                <i className="isax isax-receipt-item me-2"></i>Outstanding Reports
              </Link>
              <Link
                to="/reports/sales-analysis"
                className="btn btn-outline-secondary text-start d-flex align-items-center"
              >
                <i className="isax isax-graph me-2"></i>Sales Analysis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Top Customers and Items Row */}
      <div className="row g-3 mb-4">
        {/* Top Customers */}
        <div className="col-xl-6">
          <div className="card border-0 shadow-sm mb-0 h-100">
            <div className="card-header bg-transparent border-0 pb-0">
              <h6 className="fw-bold mb-0">
                <i className="isax isax-profile-2user me-2 text-primary"></i>
                Top Customers
              </h6>
            </div>
            <div className="card-body">
              {misData?.top_customers && misData.top_customers.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-borderless align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="fs-13 text-muted fw-medium rounded-start">Customer Name</th>
                        <th className="fs-13 text-muted fw-medium text-center">Invoices</th>
                        <th className="fs-13 text-muted fw-medium text-end rounded-end">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {misData.top_customers.map((cust, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-sm bg-primary-subtle text-primary rounded-circle me-2 fw-bold">
                                {cust.name ? cust.name.charAt(0).toUpperCase() : '#'}
                              </div>
                              <span className="fw-medium fs-13">{cust.name || 'Unknown'}</span>
                            </div>
                          </td>
                          <td className="text-center">
                            <span className="badge bg-secondary-subtle text-secondary">{cust.invoices}</span>
                          </td>
                          <td className="text-end fw-bold text-dark">{formatCurrency(cust.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-muted">
                  <i className="isax isax-empty-wallet fs-24 mb-2 d-block"></i>
                  <span className="fs-13">No top customer data available</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Items */}
        <div className="col-xl-6">
          <div className="card border-0 shadow-sm mb-0 h-100">
            <div className="card-header bg-transparent border-0 pb-0">
              <h6 className="fw-bold mb-0">
                <i className="isax isax-box me-2 text-warning"></i>
                Top Selling Items
              </h6>
            </div>
            <div className="card-body">
              {misData?.top_items && misData.top_items.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-borderless align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="fs-13 text-muted fw-medium rounded-start">Item Name</th>
                        <th className="fs-13 text-muted fw-medium text-center">Qty Sold</th>
                        <th className="fs-13 text-muted fw-medium text-end rounded-end">Total Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {misData.top_items.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="d-flex flex-column">
                              <span className="fw-medium fs-13 text-dark">{item.name || 'Unknown Item'}</span>
                              {item.sku && <span className="fs-11 text-muted">SKU: {item.sku}</span>}
                            </div>
                          </td>
                          <td className="text-center">
                            <span className="badge bg-success-subtle text-success">{item.qty_sold}</span>
                          </td>
                          <td className="text-end fw-bold text-dark">{formatCurrency(item.value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-muted">
                  <i className="isax isax-box-remove fs-24 mb-2 d-block"></i>
                  <span className="fs-13">No top item data available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MISDashboard;
