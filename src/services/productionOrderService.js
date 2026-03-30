import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getProductionOrders = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/manufacturing/production-orders',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

export const getProductionOrder = async (id) =>
  apiRequest({
    url: `/api/manufacturing/production-orders/${id}`,
    method: 'GET',
  });

export const createProductionOrder = async (payload) =>
  apiRequest({
    url: '/api/manufacturing/production-orders',
    method: 'POST',
    data: payload,
  });

export const releaseProductionOrder = async (id) =>
  apiRequest({
    url: `/api/manufacturing/production-orders/${id}/release`,
    method: 'POST',
  });

export const completeProductionOrder = async (id, qtyProduced) =>
  apiRequest({
    url: `/api/manufacturing/production-orders/${id}/complete`,
    method: 'POST',
    data: { qty_produced: qtyProduced },
  });

const productionOrderService = {
  getProductionOrders,
  getProductionOrder,
  createProductionOrder,
  releaseProductionOrder,
  completeProductionOrder,
};

export default productionOrderService;
