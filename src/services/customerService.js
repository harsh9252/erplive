import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getCustomers = async (page = 1, limit = 20, filters = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/customers',
      method: 'GET',
      params: cleanParams({ page, limit, ...filters }),
    }),
  );

export const getCustomerById = async (id) =>
  apiRequest({
    url: `/api/customers/${id}`,
    method: 'GET',
  });

export const createCustomer = async (customerData) =>
  apiRequest({
    url: '/api/customers',
    method: 'POST',
    data: customerData,
  });

export const updateCustomer = async (id, customerData) =>
  apiRequest({
    url: `/api/customers/${id}`,
    method: 'PUT',
    data: customerData,
  });

export const deleteCustomer = async (id) =>
  apiRequest({
    url: `/api/customers/${id}`,
    method: 'DELETE',
  });

export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

