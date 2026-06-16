import { apiRequest } from './apiClient';
import { normalizeListResponse } from './apiUtils';

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
  return apiRequest({ url, method: 'GET' });
};

/**
 * Fetch MIS Dashboard — consolidated management information
 * Includes financials, sales, purchases, stock, receivables, payables etc.
 * @param {string} fromDate - Start date (YYYY-MM-DD)
 * @param {string} toDate - End date (YYYY-MM-DD)
 */
export const getMISDashboard = async (fromDate, toDate) => {
  let url = '/api/dashboard/mis';
  const params = [];
  if (fromDate) params.push(`from_date=${fromDate}`);
  if (toDate) params.push(`to_date=${toDate}`);
  if (params.length) url += `?${params.join('&')}`;
  return apiRequest({ url, method: 'GET' });
};


/**
 * Get total invoice count — fetch full list and count the array
 */
export const getInvoiceCount = async () => {
  const raw = await apiRequest({
    url: '/api/sales-invoices',
    method: 'GET',
    params: { page: 1, limit: 100000 },
  });
  // Try pagination first, then fall back to counting the items array
  const dataBlock = raw?.data;
  const pagination = dataBlock?.pagination || dataBlock?.meta || raw?.pagination;
  const paginationTotal =
    pagination?.total ??
    pagination?.totalItems ??
    pagination?.totalRecords ??
    pagination?.totalCount ??
    pagination?.count ??
    dataBlock?.total ??
    dataBlock?.count ??
    raw?.total ??
    raw?.count ??
    null;

  if (typeof paginationTotal === 'number') return paginationTotal;

  // Fallback: count the items array directly
  const items =
    Array.isArray(dataBlock?.data) ? dataBlock.data :
    Array.isArray(dataBlock?.items) ? dataBlock.items :
    Array.isArray(dataBlock?.rows) ? dataBlock.rows :
    Array.isArray(dataBlock) ? dataBlock : [];
  return items.length;
};

/**
 * Get total customer count — fetch full list and count the array
 */
export const getCustomerCount = async () => {
  const raw = await apiRequest({
    url: '/api/customers',
    method: 'GET',
    params: { page: 1, limit: 100000 },
  });
  const dataBlock = raw?.data;
  const pagination = dataBlock?.pagination || dataBlock?.meta || raw?.pagination;
  const paginationTotal =
    pagination?.total ??
    pagination?.totalItems ??
    pagination?.totalRecords ??
    pagination?.totalCount ??
    pagination?.count ??
    dataBlock?.total ??
    dataBlock?.count ??
    raw?.total ??
    raw?.count ??
    null;

  if (typeof paginationTotal === 'number') return paginationTotal;

  const items =
    Array.isArray(dataBlock?.data) ? dataBlock.data :
    Array.isArray(dataBlock?.items) ? dataBlock.items :
    Array.isArray(dataBlock?.rows) ? dataBlock.rows :
    Array.isArray(dataBlock) ? dataBlock : [];
  return items.length;
};

/**
 * Get recent sales invoices for the dashboard table
 * @param {number} limit
 */
export const getRecentInvoices = async (limit = 5) => {
  const res = await normalizeListResponse(
    await apiRequest({
      url: '/api/sales-invoices',
      method: 'GET',
      params: { page: 1, limit, sort: 'created_at', order: 'desc' },
    })
  );
  return res.data || [];
};

export const dashboardService = {
  getDashboardSummary,
  getSalesChart,
  getTopCustomers,
  getMISDashboard,
  getInvoiceCount,
  getCustomerCount,
  getRecentInvoices,
};

export default dashboardService;
