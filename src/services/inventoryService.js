import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getInventory = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/inventory',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

export const getStockSummary = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/inventory/stock-summary',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

export const getStockLedger = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/inventory',
      method: 'GET',
      params: cleanParams({ ...params, type: 'stock-ledger' }),
    }),
  );

export const getInventoryItem = async (id) =>
  apiRequest({
    url: `/api/inventory/${id}`,
    method: 'GET',
  });

export const getCurrentStock = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/inventory/current-stock',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

export const transferStock = async (payload) =>
  apiRequest({
    url: '/api/inventory/transfer-stock',
    method: 'POST',
    data: payload,
  });

const inventoryService = {
  getInventory,
  getInventoryItem,
  getStockSummary,
  getStockLedger,
  getCurrentStock,
  transferStock,
};

export default inventoryService;
