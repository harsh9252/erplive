import { apiRequest } from './apiClient';
import { cleanParams } from './apiUtils';

export const getTrialBalanceReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/trial-balance',
    method: 'GET',
    params: cleanParams(params),
  });

export const getProfitLossReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/profit-loss',
    method: 'GET',
    params: cleanParams(params),
  });

export const getBalanceSheetReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/balance-sheet',
    method: 'GET',
    params: cleanParams(params),
  });

export const getOutstandingReceivablesReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/outstanding-receivables',
    method: 'GET',
    params: cleanParams(params),
  });

export const getOutstandingPayablesReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/outstanding-payables',
    method: 'GET',
    params: cleanParams(params),
  });

export const getStockSummaryReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/stock-summary',
    method: 'GET',
    params: cleanParams(params),
  });

export const getGstSummaryReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/gst-summary',
    method: 'GET',
    params: cleanParams(params),
  });

export const getSalesAnalysisReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/sales-analysis',
    method: 'GET',
    params: cleanParams(params),
  });

export const getPurchaseAnalysisReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/purchase-analysis',
    method: 'GET',
    params: cleanParams(params),
  });

export const getCashFlowReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/cash-flow',
    method: 'GET',
    params: cleanParams(params),
  });

export const getFundFlowReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/fund-flow',
    method: 'GET',
    params: cleanParams(params),
  });

export const getCashBankBookReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/cash-bank-book',
    method: 'GET',
    params: cleanParams(params),
  });

export const getDayBookReport = async (params = {}) =>
  apiRequest({
    url: '/api/reports/day-book',
    method: 'GET',
    params: cleanParams(params),
  });

const reportService = {
  getTrialBalanceReport,
  getProfitLossReport,
  getBalanceSheetReport,
  getOutstandingReceivablesReport,
  getOutstandingPayablesReport,
  getStockSummaryReport,
  getGstSummaryReport,
  getSalesAnalysisReport,
  getPurchaseAnalysisReport,
  getCashFlowReport,
  getFundFlowReport,
  getCashBankBookReport,
  getDayBookReport,
};

export default reportService;

