import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getVendors = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/vendors',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

export const getVendor = async (id) =>
  apiRequest({
    url: `/api/vendors/${id}`,
    method: 'GET',
  });

export const createVendor = async (vendorData) =>
  apiRequest({
    url: '/api/vendors',
    method: 'POST',
    data: vendorData,
  });

export const updateVendor = async (id, vendorData) =>
  apiRequest({
    url: `/api/vendors/${id}`,
    method: 'PUT',
    data: vendorData,
  });

export const deleteVendor = async (id) =>
  apiRequest({
    url: `/api/vendors/${id}`,
    method: 'DELETE',
  });

export const vendorService = {
  getVendors,
  getVendor,
  createVendor,
  updateVendor,
  deleteVendor,
};

export default vendorService;

