import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

const normalizeItemPayload = (data = {}, isUpdate = false) => {
  const taxMap = {
    'Taxable': 'TAXABLE',
    'Exempt': 'EXEMPT',
    'Nil Rated': 'NIL_RATED',
    'Non-GST': 'NON_GST'
  };

  const stockMap = {
    'Raw Material': 'RAW_MATERIAL',
    'Finished Good': 'FINISHED_GOOD',
    'Semi-Finished / WIP': 'SEMI_FINISHED',
    'Trading Good': 'TRADING',
    'Consumable': 'CONSUMABLE'
  };

  const payload = {
    name: data.name,
    description: data.description || '',
    sale_price: Number.parseFloat(data.sale_price !== undefined ? data.sale_price : (data.selling_price || 0)),
    purchase_price: Number.parseFloat(data.purchase_price || 0),
    gst_rate: Number.parseInt(data.gst_rate !== undefined ? data.gst_rate : (data.tax_rate || 0)),
    hsn_code: data.hsn_code || '',
    category_id: data.category_id ? Number.parseInt(data.category_id) : null,
    uom_id: data.uom_id ? Number.parseInt(data.uom_id) : null,
    reorder_level: Number.parseFloat(data.reorder_level || 0),
    reorder_qty: Number.parseFloat(data.reorder_qty || 0),
    inventory_type: data.inventory_type || 'Stock',
    stock_type: stockMap[data.stock_type] || 'RAW_MATERIAL',
    taxability_type: taxMap[data.taxability_type] || 'TAXABLE',
    track_expiry: Boolean(data.track_expiry),
    track_batch: Boolean(data.track_batch),
    track_serial: Boolean(data.track_serial),
    unit: data.unit || null,
  };

  if (payload.track_expiry) {
    payload.expiry_warning_days = Number.parseInt(data.expiry_warning_days || 0);
    payload.manufacture_date = data.manufacture_date || null;
  }

  if (data.warehouse_id) {
    payload.warehouse_id = Number.parseInt(data.warehouse_id);
  }

  if (!isUpdate) {
    payload.sku = data.sku || '';
    payload.opening_stock = Number.parseFloat(data.opening_stock || 0);
    payload.opening_stock_rate = Number.parseFloat(data.opening_rate || data.opening_stock_rate || 0);
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

export const searchItems = async (q = '', limit = 10) =>
  apiRequest({
    url: '/api/items/search',
    method: 'GET',
    params: { q, limit },
  });

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

export const getHsnSacItems = async (search = '') =>
  apiRequest({
    url: '/api/hsn-sac',
    method: 'GET',
    params: { search },
  });

export const getStockAgeingReport = async (filters = {}) =>
  apiRequest({
    url: '/api/items/reports/stock-ageing',
    method: 'GET',
    params: cleanParams(filters),
  });

export const getExpiryReport = async (filters = {}) =>
  apiRequest({
    url: '/api/items/reports/expiry',
    method: 'GET',
    params: cleanParams(filters),
  });

const itemService = {
  getItems,
  searchItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemStockSummary,
  getHsnSacItems,
  getStockAgeingReport,
  getExpiryReport,
};

export default itemService;
