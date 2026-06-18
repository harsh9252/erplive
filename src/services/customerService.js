import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

/**
 * Normalize customer payload for POST requests (Create)
 */
const normalizeCustomerCreatePayload = (data = {}) => {
  return {
    name: data.name,
    gstin: data.gstin?.toUpperCase() || "",
    pan: data.pan?.toUpperCase() || data.pan_no?.toUpperCase() || "",
    phone: data.phone || "",
    email: data.email?.toLowerCase() || "",
    address: data.address || "",
    city: data.city || "",
    state: data.state || "",
    state_code: data.state_code || "",
    pincode: data.pincode || "",
    opening_balance: data.opening_balance ? Number.parseFloat(data.opening_balance) : 0,
    balance_type: data.balance_type || 'DR',
    credit_limit: data.credit_limit ? Number.parseFloat(data.credit_limit) : 0,
    payment_terms: data.payment_terms || 'net30',
    payment_terms_days: data.payment_terms === 'custom' ? (Number.parseInt(data.payment_terms_days) || 0) : 0,
    liable_to_tds: !!data.liable_to_tds,
    liable_to_tcs: !!data.liable_to_tcs,
    gst_registration_type: data.gst_registration_type || "Regular",
  };
};

/**
 * Normalize customer payload for PUT requests (Update)
 */
const normalizeCustomerUpdatePayload = (data = {}) => {
  const payload = {
    name: data.name,
    gstin: data.gstin?.toUpperCase() || "",
    pan: data.pan?.toUpperCase() || data.pan_no?.toUpperCase() || "",
    phone: data.phone || "",
    email: data.email?.toLowerCase() || "",
    address: data.address || "",
    city: data.city || "",
    state: data.state || "",
    state_code: data.state_code || "",
    pincode: data.pincode || "",
    credit_limit: data.credit_limit ? Number.parseFloat(data.credit_limit) : 0,
    payment_terms: data.payment_terms || 'net30',
    payment_terms_days: data.payment_terms === 'custom' ? (Number.parseInt(data.payment_terms_days) || 0) : 0,
    liable_to_tds: !!data.liable_to_tds,
    liable_to_tcs: !!data.liable_to_tcs,
    gst_registration_type: data.gst_registration_type,
  };
  
  // Note: opening_balance, balance_type, payment_terms 
  // are often restricted on update via this endpoint.
  return payload;
};

export const searchCustomers = async (q = '', limit = 10) =>
  apiRequest({
    url: '/api/customers/search',
    method: 'GET',
    params: { q, limit },
  });

let fetchCustomersInProgress = new Map();

export const getCustomers = async (page = 1, limit = 20, filters = {}) => {
  const finalParams = cleanParams({ page, limit, ...filters });
  const paramKey = JSON.stringify(finalParams);

  if (fetchCustomersInProgress.has(paramKey)) {
    return fetchCustomersInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/customers',
          method: 'GET',
          params: finalParams,
        })
      );
    } finally {
      fetchCustomersInProgress.delete(paramKey);
    }
  })();

  fetchCustomersInProgress.set(paramKey, promise);
  return promise;
};

export const getCustomerById = async (id) =>
  apiRequest({
    url: `/api/customers/${id}`,
    method: 'GET',
  });

export const createCustomer = async (customerData) =>
  apiRequest({
    url: '/api/customers',
    method: 'POST',
    data: normalizeCustomerCreatePayload(customerData),
  });

export const updateCustomer = async (id, customerData) =>
  apiRequest({
    url: `/api/customers/${id}`,
    method: 'PUT',
    data: normalizeCustomerUpdatePayload(customerData),
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
  searchCustomers,
};
