import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getBOMs = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/manufacturing/bom',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

export const getBOM = async (id) =>
  apiRequest({
    url: `/api/manufacturing/bom/${id}`,
    method: 'GET',
  });

export const createBOM = async (payload) =>
  apiRequest({
    url: '/api/manufacturing/bom',
    method: 'POST',
    data: payload,
  });

export const updateBOM = async (id, payload) =>
  apiRequest({
    url: `/api/manufacturing/bom/${id}`,
    method: 'PUT',
    data: payload,
  });

export const explodeBOM = async (id, qty) =>
  apiRequest({
    url: `/api/manufacturing/bom/${id}/explode`,
    method: 'GET',
    params: { qty },
  });

const bomService = {
  getBOMs,
  getBOM,
  createBOM,
  updateBOM,
  explodeBOM,
};

export default bomService;
