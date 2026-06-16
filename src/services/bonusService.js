import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getBonuses = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/payroll/bonuses',
      method: 'GET',
      params: cleanParams(params),
    })
  );

export const getBonus = async (id) =>
  apiRequest({
    url: `/api/payroll/bonuses/${id}`,
    method: 'GET',
  });

export const createBonus = async (data) =>
  apiRequest({
    url: '/api/payroll/bonuses',
    method: 'POST',
    data,
  });

export const updateBonus = async (id, data) =>
  apiRequest({
    url: `/api/payroll/bonuses/${id}`,
    method: 'PUT',
    data,
  });

export const deleteBonus = async (id) =>
  apiRequest({
    url: `/api/payroll/bonuses/${id}`,
    method: 'DELETE',
  });

export const bonusService = {
  getBonuses,
  getBonus,
  createBonus,
  updateBonus,
  deleteBonus,
};

export default bonusService;
