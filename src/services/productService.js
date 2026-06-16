import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

const normalizeItemPayload = (data = {}, isUpdate = false) => {
  const catId = Number.parseInt(data.category_id);
  
  const payload = {
    name: data.name,
    description: data.description || '',
    sale_price: Number.parseFloat(data.sale_price !== undefined ? data.sale_price : (data.selling_price || 0)),
    purchase_price: Number.parseFloat(data.purchase_price || 0),
    gst_rate: Number.parseInt(data.gst_rate !== undefined ? data.gst_rate : (data.tax_rate || 0)),
    hsn_code: data.hsn_code || '',
    reorder_level: Number.parseFloat(data.reorder_level) || 0,
  };

  if (!isNaN(catId) && catId > 0) {
    payload.category_id = catId;
  }

  if (!isUpdate) {
    payload.sku = data.sku || null;
    payload.unit = data.unit;
    payload.opening_stock = Number.parseFloat(data.opening_stock) || 0;
  }

  return payload;
};

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

export const createItem = async (itemData) =>
  apiRequest({
    url: '/api/items',
    method: 'POST',
    data: normalizeItemPayload(itemData),
  });

export const updateItem = async (id, data) =>
  apiRequest({
    url: `/api/items/${id}`,
    method: 'PUT',
    data: normalizeItemPayload(data, true),
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

export default {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemStockSummary,
};

