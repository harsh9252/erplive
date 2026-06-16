import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

/**
 * Fetches the interest report for receivables (customers).
 * @param {Object} params - { rate, as_of_date, from_date, to_date, customer_id }
 */
let fetchReceivablesInProgress = new Map();

const getReceivablesInterest = async (params = {}) => {
  const paramKey = JSON.stringify(params);
  if (fetchReceivablesInProgress.has(paramKey)) {
    return fetchReceivablesInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      const response = await apiRequest({
        url: '/api/interest/receivables',
        method: 'GET',
        params: cleanParams(params),
      });
      return response;
    } finally {
      fetchReceivablesInProgress.delete(paramKey);
    }
  })();

  fetchReceivablesInProgress.set(paramKey, promise);
  return promise;
};

let fetchPayablesInProgress = new Map();

const getPayablesInterest = async (params = {}) => {
  const paramKey = JSON.stringify(params);
  if (fetchPayablesInProgress.has(paramKey)) {
    return fetchPayablesInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      const response = await apiRequest({
        url: '/api/interest/payables',
        method: 'GET',
        params: cleanParams(params),
      });
      // The API returns { data: { summary: {}, details: [] } }
      // We pass it directly so the component can use response.data.details or response.data.summary
      return response;
    } finally {
      fetchPayablesInProgress.delete(paramKey);
    }
  })();

  fetchPayablesInProgress.set(paramKey, promise);
  return promise;
};

export const interestService = {
  getReceivablesInterest,
  getPayablesInterest,
};

export default interestService;
