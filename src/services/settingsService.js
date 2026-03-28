import { apiRequest } from './apiClient';
import { normalizeListResponse } from './apiUtils';

export const getSystemSettings = async () =>
  apiRequest({
    url: '/api/settings/system',
    method: 'GET',
  });

export const getCompanySettings = async () =>
  apiRequest({
    url: '/api/settings/company',
    method: 'GET',
  });

export const updateCompanySettings = async (payload) =>
  apiRequest({
    url: '/api/settings/company',
    method: 'PUT',
    data: payload,
  });

export const getSettingsFinancialYears = async () =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/settings/financial-years',
      method: 'GET',
    }),
  );

export const createSettingsFinancialYear = async (payload) =>
  apiRequest({
    url: '/api/settings/financial-years',
    method: 'POST',
    data: payload,
  });

export const getVoucherTypes = async () =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/settings/voucher-types',
      method: 'GET',
    }),
  );

export const getWarehouses = async () =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/settings/warehouses',
      method: 'GET',
    }),
  );

export const createWarehouse = async (payload) =>
  apiRequest({
    url: '/api/settings/warehouses',
    method: 'POST',
    data: payload,
  });

export const updateWarehouse = async (id, payload) =>
  apiRequest({
    url: `/api/settings/warehouses/${id}`,
    method: 'PUT',
    data: payload,
  });

export const settingsService = {
  getSystemSettings,
  getCompanySettings,
  updateCompanySettings,
  getSettingsFinancialYears,
  createSettingsFinancialYear,
  getVoucherTypes,
  getWarehouses,
  createWarehouse,
  updateWarehouse,
};

export default settingsService;
