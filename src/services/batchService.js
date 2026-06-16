import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

const normalizeBatchPayload = (data = {}) => {
  return {
    item_id: Number.parseInt(data.item_id),
    warehouse_id: data.warehouse_id ? Number.parseInt(data.warehouse_id) : null,
    batch_number: data.batch_number,
    mfg_date: data.mfg_date || null,
    expiry_date: data.expiry_date || null,
    qty: Number.parseFloat(data.qty) || 0,
    mrp: Number.parseFloat(data.mrp) || 0,
    purchase_rate: Number.parseFloat(data.purchase_rate) || 0,
    sale_rate: Number.parseFloat(data.sale_rate) || 0,
    remarks: data.remarks || '',
    status: data.status || 'ACTIVE',
  };
};

const normalizeBatchUpdatePayload = (data = {}) => {
  const payload = {};
  if (data.mfg_date !== undefined) payload.mfg_date = data.mfg_date || null;
  if (data.expiry_date !== undefined) payload.expiry_date = data.expiry_date || null;
  if (data.qty !== undefined) payload.qty = Number.parseFloat(data.qty) || 0;
  if (data.mrp !== undefined) payload.mrp = Number.parseFloat(data.mrp) || 0;
  if (data.purchase_rate !== undefined) payload.purchase_rate = Number.parseFloat(data.purchase_rate) || 0;
  if (data.sale_rate !== undefined) payload.sale_rate = Number.parseFloat(data.sale_rate) || 0;
  if (data.remarks !== undefined) payload.remarks = data.remarks || '';
  if (data.status !== undefined) payload.status = data.status || 'ACTIVE';
  
  // Conditionally add these if the backend allows them, but they are often immutable
  // If the user says "all fields", they might mean these too. 
  // For now, let's include them but be aware they might cause issues if strict.
  if (data.item_id !== undefined) payload.item_id = Number.parseInt(data.item_id);
  if (data.warehouse_id !== undefined) payload.warehouse_id = data.warehouse_id ? Number.parseInt(data.warehouse_id) : null;
  if (data.batch_number !== undefined) payload.batch_number = data.batch_number;

  return payload;
};

export const getBatches = async (page = 1, limit = 50, filters = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/batches',
      method: 'GET',
      params: cleanParams({ page, limit, ...filters }),
    })
  );

export const getBatchById = async (id) =>
  apiRequest({
    url: `/api/batches/${id}`,
    method: 'GET',
  });

export const createBatch = async (data) =>
  apiRequest({
    url: '/api/batches',
    method: 'POST',
    data: normalizeBatchPayload(data),
  });

export const updateBatch = async (id, data) =>
  apiRequest({
    url: `/api/batches/${id}`,
    method: 'PUT',
    data: normalizeBatchUpdatePayload(data),
  });

export const deleteBatch = async (id) =>
  apiRequest({
    url: `/api/batches/${id}`,
    method: 'DELETE',
  });

export const getExpiringBatches = async (days = 30) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/batches',
      method: 'GET',
      params: { expiry_before: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    })
  );

const batchService = {
  getBatches,
  getBatchById,
  createBatch,
  updateBatch,
  deleteBatch,
  getExpiringBatches,
};

export default batchService;
