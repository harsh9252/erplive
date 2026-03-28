import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

const normalizeSalesOrderPayload = (data = {}) => ({
  customer_id: data.customer_id,
  order_date: data.order_date,
  expected_delivery: data.expected_delivery || data.delivery_date || null,
  reference: data.reference || '',
  warehouse_id: data.warehouse_id || null,
  remarks: data.remarks || '',
  items: (data.items || []).map((item) => ({
    item_id: item.item_id,
    description: item.description || '',
    qty: Number.parseFloat(item.qty || 0),
    uom_id: item.uom_id || null,
    rate: Number.parseFloat(item.rate || 0),
    discount_pct: Number.parseFloat(item.discount_pct || 0),
    warehouse_id: item.warehouse_id || data.warehouse_id || null,
  })),
});

export const getSalesOrders = async (page = 1, limit = 20, filters = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/sales-orders',
      method: 'GET',
      params: cleanParams({ page, limit, ...filters }),
    }),
  );

export const createSalesOrder = async (data) =>
  apiRequest({
    url: '/api/sales-orders',
    method: 'POST',
    data: normalizeSalesOrderPayload(data),
  });

export const getSalesOrderById = async (id) =>
  apiRequest({
    url: `/api/sales-orders/${id}`,
    method: 'GET',
  });

export const updateSalesOrder = async (id, data) =>
  apiRequest({
    url: `/api/sales-orders/${id}`,
    method: 'PUT',
    data: {
      expected_delivery: data.expected_delivery || data.delivery_date,
      remarks: data.remarks,
      status: data.status,
    },
  });

export const cancelSalesOrder = async (id) =>
  apiRequest({
    url: `/api/sales-orders/${id}/cancel`,
    method: 'POST',
  });

const salesOrderService = {
  getSalesOrders,
  getSalesOrderById,
  createSalesOrder,
  updateSalesOrder,
  cancelSalesOrder,
};

export default salesOrderService;

