import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getJobWorkEntries = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/manufacturing/job-work',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

export const createJobWorkEntry = async (payload) =>
  apiRequest({
    url: '/api/manufacturing/job-work',
    method: 'POST',
    data: payload,
  });

const jobWorkService = {
  getJobWorkEntries,
  createJobWorkEntry,
};

export default jobWorkService;
