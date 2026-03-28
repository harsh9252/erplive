import { apiRequest } from './apiClient';

/**
 * Fetch dashboard summary data
 * Includes financials, alerts, and recent invoices
 */
export const getDashboardSummary = async () => {
  return apiRequest({
    url: '/api/dashboard/summary',
    method: 'GET',
  });
};

/**
 * Fetch sales vs purchase chart data
 * @param {number} months - Number of months to fetch history for (default: 6)
 */
export const getSalesChart = async (months = 6) => {
  return apiRequest({
    url: `/api/dashboard/sales-chart?months=${months}`,
    method: 'GET',
  });
};

/**
 * Fetch top customers for a specific date range
 * @param {number} limit - Number of customers to fetch (default: 5)
 * @param {string} fromDate - Start date (YYYY-MM-DD)
 * @param {string} toDate - End date (YYYY-MM-DD)
 */
export const getTopCustomers = async (limit = 5, fromDate, toDate) => {
  let url = `/api/dashboard/top-customers?limit=${limit}`;
  if (fromDate) url += `&from_date=${fromDate}`;
  if (toDate) url += `&to_date=${toDate}`;
  
  return apiRequest({
    url,
    method: 'GET',
  });
};

export const dashboardService = {
  getDashboardSummary,
  getSalesChart,
  getTopCustomers,
};

export default dashboardService;
