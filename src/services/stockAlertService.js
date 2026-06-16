import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getStockAlerts = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/stock-alerts',
      method: 'GET',
      params: cleanParams(params),
    })
  );

export const getStockAlertById = async (id) =>
  apiRequest({
    url: `/api/stock-alerts/${id}`,
    method: 'GET',
  });

export const createStockAlert = async (data) =>
  apiRequest({
    url: '/api/stock-alerts',
    method: 'POST',
    data,
  });

export const updateStockAlert = async (id, data) =>
  apiRequest({
    url: `/api/stock-alerts/${id}`,
    method: 'PUT',
    data,
  });

export const deleteStockAlert = async (id) =>
  apiRequest({
    url: `/api/stock-alerts/${id}`,
    method: 'DELETE',
  });

export const checkStockAlerts = async () =>
  apiRequest({
    url: '/api/stock-alerts/check',
    method: 'GET',
  });

const stockAlertService = {
  getStockAlerts,
  getStockAlertById,
  createStockAlert,
  updateStockAlert,
  deleteStockAlert,
  checkStockAlerts,
};

export default stockAlertService;
