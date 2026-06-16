import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse, toDecimal, toNumberOrValue } from './apiUtils';

const normalizeBOMPayload = (data = {}) => ({
  name: data.name || '',
  finished_item_id: toNumberOrValue(data.finished_item_id),
  version: data.version || '1.0',
  qty_produced: toDecimal(data.qty_produced, 1),
  status: data.status || 'ACTIVE',
  items: (data.items || []).map(item => ({
    item_id: toNumberOrValue(item.item_id),
    qty: toDecimal(item.qty),
    wastage_pct: toDecimal(item.wastage_pct || 0),
    sub_bom_id: toNumberOrValue(item.sub_bom_id) || undefined
  }))
});

export const getBOMs = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/manufacturing/bom',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

export const getBOM = async (id) =>
  apiRequest({
    url: `/api/manufacturing/bom/${id}`,
    method: 'GET',
  });

export const createBOM = async (payload) =>
  apiRequest({
    url: '/api/manufacturing/bom',
    method: 'POST',
    data: normalizeBOMPayload(payload),
  });

export const updateBOM = async (id, payload) =>
  apiRequest({
    url: `/api/manufacturing/bom/${id}`,
    method: 'PUT',
    data: normalizeBOMPayload(payload),
  });

export const deleteBOM = async (id) =>
  apiRequest({
    url: `/api/manufacturing/bom/${id}`,
    method: 'DELETE',
  });

export const explodeBOM = async (id, qty) =>
  apiRequest({
    url: `/api/manufacturing/bom/${id}/explode`,
    method: 'GET',
    params: { qty },
  });

const bomService = {
  getBOMs,
  getBOM,
  createBOM,
  updateBOM,
  deleteBOM,
  explodeBOM,
};

export default bomService;
