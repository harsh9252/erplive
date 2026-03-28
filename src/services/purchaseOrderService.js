import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

const normalizePurchaseOrderPayload = (data = {}) => ({
  vendor_id: data.vendor_id,
  po_number: data.po_number,
  order_date: data.order_date,
  expected_delivery: data.expected_delivery || null,
  notes: data.notes || '',
  remarks: data.remarks || '',
  items: (data.items || []).map((item) => ({
    item_id: item.item_id,
    quantity: Number.parseFloat(item.quantity || item.qty || 0),
    rate: Number.parseFloat(item.rate || 0),
    description: item.description || '',
  })),
  total_amount: Number.parseFloat(data.total_amount || 0),
});

export const getPurchaseOrders = async (page = 1, limit = 20, filters = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/purchase-orders',
      method: 'GET',
      params: cleanParams({ page, limit, ...filters }),
    }),
  );

export const createPurchaseOrder = async (data) =>
  apiRequest({
    url: '/api/purchase-orders',
    method: 'POST',
    data: normalizePurchaseOrderPayload(data),
  });

export const getPurchaseOrderById = async (id) =>
  apiRequest({
    url: `/api/purchase-orders/${id}`,
    method: 'GET',
  });

export const updatePurchaseOrder = async (id, data) =>
  apiRequest({
    url: `/api/purchase-orders/${id}`,
    method: 'PUT',
    data: normalizePurchaseOrderPayload(data),
  });

export const confirmPurchaseOrder = async (id) =>
  apiRequest({
    url: `/api/purchase-orders/${id}/confirm`,
    method: 'POST',
  });

export const cancelPurchaseOrder = async (id) =>
  apiRequest({
    url: `/api/purchase-orders/${id}/cancel`,
    method: 'POST',
  });

const purchaseOrderService = {
  getPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrder,
  confirmPurchaseOrder,
  cancelPurchaseOrder,
};

export default purchaseOrderService;
