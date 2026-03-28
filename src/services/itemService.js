import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

const normalizeItemPayload = (data = {}) => ({
  name: data.name,
  sku: data.sku || null,
  description: data.description || '',
  unit: data.unit,
  category: data.category || '',
  sale_price: Number.parseFloat(data.sale_price || 0),
  purchase_price: Number.parseFloat(data.purchase_price || 0),
  gst_rate: Number.parseInt(data.gst_rate || 0),
  hsn_code: data.hsn_code || '',
  opening_stock: Number.parseFloat(data.opening_stock || 0),
  reorder_level: Number.parseFloat(data.reorder_level || 0),
  track_inventory: data.track_inventory !== undefined ? data.track_inventory : true,
});

export const getItems = async (page = 1, limit = 20, filters = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/items',
      method: 'GET',
      params: cleanParams({ page, limit, ...filters }),
    }),
  );

export const getItemById = async (id) =>
  apiRequest({
    url: `/api/items/${id}`,
    method: 'GET',
  });

export const createItem = async (data) =>
  apiRequest({
    url: '/api/items',
    method: 'POST',
    data: normalizeItemPayload(data),
  });

export const updateItem = async (id, data) =>
  apiRequest({
    url: `/api/items/${id}`,
    method: 'PUT',
    data: normalizeItemPayload(data),
  });

export const deleteItem = async (id) =>
  apiRequest({
    url: `/api/items/${id}`,
    method: 'DELETE',
  });

export const getItemStockSummary = async (id) =>
  apiRequest({
    url: `/api/items/${id}/stock`,
    method: 'GET',
  });

export const getHsnSacItems = async (search = '') =>
  apiRequest({
    url: '/api/hsn-sac',
    method: 'GET',
    params: { search },
  });

const itemService = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemStockSummary,
  getHsnSacItems,
};

export default itemService;
