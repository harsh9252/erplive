import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

/**
 * Normalizes Investment Type payload
 */
const normalizeTypePayload = (data = {}) => ({
  name: data.name,
  description: data.description || null,
  is_active: data.is_active !== undefined ? Boolean(data.is_active) : true,
});

/**
 * Normalizes Investment Master payload
 */
const normalizeMasterPayload = (data = {}) => {
  const parsedId = Number(data.investment_type_id || data.type_id || data.category_id);
  return {
    investment_type_id: parsedId,
    type_id: parsedId,
    category_id: parsedId,
    investment_category_id: parsedId,
    name: data.name,
    unit: data.unit || 'Unit',
    description: data.description || null,
  };
};

/**
 * Normalizes Investment Transaction payload
 */
const normalizeTransactionPayload = (data = {}) => ({
  investment_master_id: Number(data.investment_master_id || data.master_id),
  txn_date: data.txn_date || new Date().toISOString().split('T')[0],
  type: data.type, // BUY or SELL
  qty: Number(data.qty),
  rate: Number(data.rate),
  amount: Number(data.amount),
  narration: data.narration || null,
});

// --- Investment Types ---

let fetchTypesInProgress = new Map();

export const getInvestmentTypes = async (params = {}) => {
  const paramKey = JSON.stringify(params);
  if (fetchTypesInProgress.has(paramKey)) {
    return fetchTypesInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/investments/types',
          method: 'GET',
          params: cleanParams(params),
        })
      );
    } finally {
      fetchTypesInProgress.delete(paramKey);
    }
  })();

  fetchTypesInProgress.set(paramKey, promise);
  return promise;
};

export const createInvestmentType = async (data) =>
  apiRequest({
    url: '/api/investments/types',
    method: 'POST',
    data: normalizeTypePayload(data),
  });

export const updateInvestmentType = async (id, data) =>
  apiRequest({
    url: `/api/investments/types/${id}`,
    method: 'PUT',
    data: normalizeTypePayload(data),
  });

export const deleteInvestmentType = async (id) =>
  apiRequest({
    url: `/api/investments/types/${id}`,
    method: 'DELETE',
  });

// --- Investment Masters ---

let fetchMastersInProgress = new Map();

export const getInvestmentMasters = async (params = {}) => {
  const paramKey = JSON.stringify(params);
  if (fetchMastersInProgress.has(paramKey)) {
    return fetchMastersInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/investments/masters',
          method: 'GET',
          params: cleanParams(params),
        })
      );
    } finally {
      fetchMastersInProgress.delete(paramKey);
    }
  })();

  fetchMastersInProgress.set(paramKey, promise);
  return promise;
};

export const createInvestmentMaster = async (data) =>
  apiRequest({
    url: '/api/investments/masters',
    method: 'POST',
    data: normalizeMasterPayload(data),
  });

export const updateInvestmentMaster = async (id, data) =>
  apiRequest({
    url: `/api/investments/masters/${id}`,
    method: 'PUT',
    data: normalizeMasterPayload(data),
  });

export const deleteInvestmentMaster = async (id) =>
  apiRequest({
    url: `/api/investments/masters/${id}`,
    method: 'DELETE',
  });

// --- Investment Transactions ---

let fetchTransactionsInProgress = new Map();

export const getInvestmentTransactions = async (params = {}) => {
  const paramKey = JSON.stringify(params);
  if (fetchTransactionsInProgress.has(paramKey)) {
    return fetchTransactionsInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/investments/transactions',
          method: 'GET',
          params: cleanParams(params),
        })
      );
    } finally {
      fetchTransactionsInProgress.delete(paramKey);
    }
  })();

  fetchTransactionsInProgress.set(paramKey, promise);
  return promise;
};

export const recordTransaction = async (data) =>
  apiRequest({
    url: '/api/investments/transactions',
    method: 'POST',
    data: normalizeTransactionPayload(data),
  });

export const updateTransaction = async (id, data) =>
  apiRequest({
    url: `/api/investments/transactions/${id}`,
    method: 'PUT',
    data: normalizeTransactionPayload(data),
  });

export const deleteTransaction = async (id) =>
  apiRequest({
    url: `/api/investments/transactions/${id}`,
    method: 'DELETE',
  });

// --- Holdings Summary ---

let fetchHoldingsInProgress = null;

export const getHoldingsSummary = async () => {
  if (fetchHoldingsInProgress) {
    return fetchHoldingsInProgress;
  }

  fetchHoldingsInProgress = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/investments/holdings',
          method: 'GET',
        })
      );
    } finally {
      fetchHoldingsInProgress = null;
    }
  })();

  return fetchHoldingsInProgress;
};

const investmentService = {
  getInvestmentTypes,
  createInvestmentType,
  updateInvestmentType,
  deleteInvestmentType,
  getInvestmentMasters,
  createInvestmentMaster,
  updateInvestmentMaster,
  deleteInvestmentMaster,
  getInvestmentTransactions,
  recordTransaction,
  updateTransaction,
  deleteTransaction,
  getHoldingsSummary,
};

export default investmentService;
