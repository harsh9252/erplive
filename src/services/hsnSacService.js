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

export const hsnSacService = {
  getHsnSacCodes,
  createHsnSacCode,
  updateHsnSacCode,
  deleteHsnSacCode,
};

export default hsnSacService;
