import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getWastages = async (params = {}) => {
  const defaultParams = { page: 1, limit: 20, status: 'PENDING' };
  const mergedParams = { ...defaultParams, ...params };
  
  return normalizeListResponse(
    await apiRequest({
      url: '/api/wastage',
      method: 'GET',
      params: cleanParams(mergedParams),
    })
  );
};

export const createWastage = async (payload) =>
  apiRequest({
    url: '/api/wastage',
    method: 'POST',
    data: payload,
  });

export const approveWastage = async (id, remarks = 'Verified') =>
  apiRequest({
    url: `/api/wastage/${id}/approve`,
    method: 'POST',
    data: { remarks },
  });

export const rejectWastage = async (id, remarks = 'Not proven') =>
  apiRequest({
    url: `/api/wastage/${id}/reject`,
    method: 'POST',
    data: { remarks },
  });

export const wastageService = {
  getWastages,
  createWastage,
  approveWastage,
  rejectWastage,
};

export default wastageService;
