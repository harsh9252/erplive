import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

/**
 * Fetches the interest report for receivables (customers).
 * @param {Object} params - { rate, as_of_date, from_date, to_date, customer_id }
 */
const getReceivablesInterest = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/interest/receivables',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

/**
 * Fetches the interest report for payables (vendors).
 * @param {Object} params - { rate, as_of_date, from_date, to_date, vendor_id }
 */
const getPayablesInterest = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/interest/payables',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

export const interestService = {
  getReceivablesInterest,
  getPayablesInterest,
};

export default interestService;
