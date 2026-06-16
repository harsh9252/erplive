import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

const normalizeVendorPayload = (data = {}) => {
  return {
    name: data.name,
    gstin: data.gstin?.toUpperCase() || "",
    pan: data.pan?.toUpperCase() || data.pan_no?.toUpperCase() || "",
    phone: data.phone || "",
    email: data.email?.toLowerCase() || "",
    contact_person: data.contact_person || "",
    address: data.address || "",
    city: data.city || "",
    state: data.state || "",
    state_code: data.state_code || "",
    pincode: data.pincode || "",
    opening_balance: data.opening_balance ? Number.parseFloat(data.opening_balance) : 0,
    balance_type: data.balance_type || 'CR',
    payment_terms: data.payment_terms || 'net30',
    credit_limit: data.credit_limit ? Number.parseFloat(data.credit_limit) : 0,
    credit_days: data.credit_days ? Number.parseInt(data.credit_days) : 0,
    gst_registration_type: data.gst_registration_type || "Regular",
    liable_to_tds: data.liable_to_tds ? 1 : 0,
  };
};

export const getVendors = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/vendors',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

export const searchVendors = async (q = '', limit = 10) =>
  apiRequest({
    url: '/api/vendors/search',
    method: 'GET',
    params: { q, limit },
  });

export const getVendor = async (id) =>
  apiRequest({
    url: `/api/vendors/${id}`,
    method: 'GET',
  });

export const createVendor = async (vendorData) =>
  apiRequest({
    url: '/api/vendors',
    method: 'POST',
    data: normalizeVendorPayload(vendorData),
  });

export const updateVendor = async (id, vendorData) =>
  apiRequest({
    url: `/api/vendors/${id}`,
    method: 'PUT',
    data: normalizeVendorPayload(vendorData),
  });

export const deleteVendor = async (id) =>
  apiRequest({
    url: `/api/vendors/${id}`,
    method: 'DELETE',
  });

export const vendorService = {
  getVendors,
  searchVendors,
  getVendor,
  createVendor,
  updateVendor,
  deleteVendor,
};

export default vendorService;


