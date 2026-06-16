import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getHsnSacCodes = async (params = {}) => {
  const defaultParams = { page: 1, limit: 50 };
  const mergedParams = { ...defaultParams, ...params };
  
  return normalizeListResponse(
    await apiRequest({
      url: '/api/hsn-sac',
      method: 'GET',
      params: cleanParams(mergedParams),
    })
  );
};

export const createHsnSacCode = async (payload) =>
  apiRequest({
    url: '/api/hsn-sac',
    method: 'POST',
    data: payload,
  });

export const updateHsnSacCode = async (id, payload) =>
  apiRequest({
    url: `/api/hsn-sac/${id}`,
    method: 'PUT',
    data: payload,
  });

export const deleteHsnSacCode = async (id) =>
  apiRequest({
    url: `/api/hsn-sac/${id}`,
    method: 'DELETE',
  });

export const getRateAtDate = async (id, date) =>
  apiRequest({
    url: `/api/hsn-sac/${id}/rate`,
    method: 'GET',
    params: { date },
  });

export const getRateHistory = async (id) =>
  normalizeListResponse(
    await apiRequest({
      url: `/api/hsn-sac/${id}/rates`,
      method: 'GET',
    }),
  );

export const createRateHistory = async (id, payload) =>
  apiRequest({
    url: `/api/hsn-sac/${id}/rates`,
    method: 'POST',
    data: payload,
  });

export const hsnSacService = {
  getHsnSacCodes,
  createHsnSacCode,
  updateHsnSacCode,
  deleteHsnSacCode,
  getRateAtDate,
  getRateHistory,
  createRateHistory,
};

export default hsnSacService;
