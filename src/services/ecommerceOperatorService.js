import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

const normalizeEcommerceOperatorPayload = (data = {}) => {
  return {
    name: data.name?.trim() || '',
    gstin: data.gstin?.toUpperCase()?.trim() || '',
    pan: data.pan?.toUpperCase()?.trim() || '',
    phone: data.phone?.trim() || '',
    email: data.email?.toLowerCase()?.trim() || '',
    contact_person: data.contact_person?.trim() || '',
    address: data.address?.trim() || '',
    city: data.city?.trim() || '',
    state: data.state?.trim() || '',
    state_code: data.state_code?.trim() || '',
    pincode: data.pincode?.trim() || '',
    is_active: data.is_active !== undefined ? (data.is_active ? 1 : 0) : 1,
  };
};

export const getEcommerceOperators = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/ecommerce-operators',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

export const searchEcommerceOperators = async (q = '', limit = 10) =>
  apiRequest({
    url: '/api/ecommerce-operators/search',
    method: 'GET',
    params: { q, limit },
  });

export const getEcommerceOperator = async (id) =>
  apiRequest({
    url: `/api/ecommerce-operators/${id}`,
    method: 'GET',
  });

export const createEcommerceOperator = async (operatorData) =>
  apiRequest({
    url: '/api/ecommerce-operators',
    method: 'POST',
    data: normalizeEcommerceOperatorPayload(operatorData),
  });

export const updateEcommerceOperator = async (id, operatorData) =>
  apiRequest({
    url: `/api/ecommerce-operators/${id}`,
    method: 'PUT',
    data: normalizeEcommerceOperatorPayload(operatorData),
  });

export const deleteEcommerceOperator = async (id) =>
  apiRequest({
    url: `/api/ecommerce-operators/${id}`,
    method: 'DELETE',
  });

export const ecommerceOperatorService = {
  getEcommerceOperators,
  searchEcommerceOperators,
  getEcommerceOperator,
  createEcommerceOperator,
  updateEcommerceOperator,
  deleteEcommerceOperator,
};

export default ecommerceOperatorService;
