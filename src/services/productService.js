import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

const normalizeItemPayload = (itemData = {}) => ({
  ...itemData,
  selling_price:
    itemData.selling_price ??
    (itemData.sale_price !== undefined ? itemData.sale_price : undefined),
  tax_rate:
    itemData.tax_rate ?? (itemData.gst_rate !== undefined ? itemData.gst_rate : undefined),
  track_batch:
    itemData.track_batch ??
    (itemData.batch_tracking !== undefined ? itemData.batch_tracking : undefined),
  track_serial:
    itemData.track_serial ??
    (itemData.serial_tracking !== undefined ? itemData.serial_tracking : undefined),
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

export const createItem = async (itemData) =>
  apiRequest({
    url: '/api/items',
    method: 'POST',
    data: normalizeItemPayload(itemData),
  });

export const updateItem = async (id, itemData) =>
  apiRequest({
    url: `/api/items/${id}`,
    method: 'PUT',
    data: normalizeItemPayload(itemData),
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

