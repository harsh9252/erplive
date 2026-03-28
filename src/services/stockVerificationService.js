import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const listVerification = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/stock-verification',
      method: 'GET',
      params: cleanParams(params),
    })
  );

export const createVerification = async (payload) =>
  apiRequest({
    url: '/api/stock-verification',
    method: 'POST',
    data: payload,
  });

export const getVerification = async (id) =>
  apiRequest({
    url: `/api/stock-verification/${id}`,
    method: 'GET',
  });

export const submitCounts = async (id, counts) =>
  apiRequest({
    url: `/api/stock-verification/${id}/count`,
    method: 'POST',
    data: { counts },
  });

export const getVariance = async (id) =>
  normalizeListResponse(
    await apiRequest({
      url: `/api/stock-verification/${id}/variance`,
      method: 'GET',
    })
  );

export const postAdjustments = async (id) =>
  apiRequest({
    url: `/api/stock-verification/${id}/post`,
    method: 'POST',
  });

export const stockVerificationService = {
  listVerification,
  createVerification,
  getVerification,
  submitCounts,
  getVariance,
  postAdjustments,
};

export default stockVerificationService;
