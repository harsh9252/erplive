import { apiRequest } from './apiClient';
import { cleanParams } from './apiUtils';

export const getRcmTransactions = async (params = {}) =>
  apiRequest({
    url: '/api/rcm/transactions',
    method: 'GET',
    params: cleanParams(params),
  });

export const getRcmLiabilitySummary = async (params = {}) =>
  apiRequest({
    url: '/api/rcm/liability',
    method: 'GET',
    params: cleanParams(params),
  });

const rcmService = {
  getRcmTransactions,
  getRcmLiabilitySummary,
};

export default rcmService;
