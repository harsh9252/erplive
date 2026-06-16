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

export const updateSettingsFinancialYear = async (id, payload) =>
  apiRequest({
    url: `/api/settings/financial-years/${id}`,
    method: 'PUT',
    data: payload,
  });

export const deleteSettingsFinancialYear = async (id) =>
  apiRequest({
    url: `/api/settings/financial-years/${id}`,
    method: 'DELETE',
  });

export const switchSettingsFinancialYear = async (id) =>
  apiRequest({
    url: `/api/settings/financial-years/${id}/switch`,
    method: 'POST',
  });

export const closeSettingsFinancialYear = async (id) =>
  apiRequest({
    url: `/api/settings/financial-years/${id}/close`,
    method: 'POST',
  });

let fetchVoucherTypesInProgress = null;

export const getVoucherTypes = async () => {
  if (fetchVoucherTypesInProgress) {
    return fetchVoucherTypesInProgress;
  }

  fetchVoucherTypesInProgress = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/settings/voucher-types',
          method: 'GET',
        })
      );
    } finally {
      fetchVoucherTypesInProgress = null;
    }
  })();

  return fetchVoucherTypesInProgress;
};

export const getWarehouses = async (customHeaders = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/settings/warehouses',
      method: 'GET',
      headers: customHeaders,
    }),
  );

export const createWarehouse = async (payload, customHeaders = {}) =>
  apiRequest({
    url: '/api/settings/warehouses',
    method: 'POST',
    data: payload,
    headers: customHeaders,
  });

export const updateWarehouse = async (id, payload, customHeaders = {}) =>
  apiRequest({
    url: `/api/settings/warehouses/${id}`,
    method: 'PUT',
    data: payload,
    headers: customHeaders,
  });

export const getVoucherSeries = async () =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/settings/voucher-series',
      method: 'GET',
    }),
  );

export const createVoucherSeries = async (payload) =>
  apiRequest({
    url: '/api/settings/voucher-series',
    method: 'POST',
    data: payload,
  });

export const updateVoucherSeries = async (id, payload) =>
  apiRequest({
    url: `/api/settings/voucher-series/${id}`,
    method: 'PUT',
    data: payload,
  });

export const deleteVoucherSeries = async (id) =>
  apiRequest({
    url: `/api/settings/voucher-series/${id}`,
    method: 'DELETE',
  });

export const getPayrollSettings = async () =>
  apiRequest({
    url: '/api/settings/payroll',
    method: 'GET',
  });

export const updatePayrollSettings = async (payload) =>
  apiRequest({
    url: '/api/settings/payroll',
    method: 'PUT',
    data: payload,
  });

export const settingsService = {
  getSystemSettings,
  getCompanySettings,
  updateCompanySettings,
  getSettingsFinancialYears,
  createSettingsFinancialYear,
  updateSettingsFinancialYear,
  deleteSettingsFinancialYear,
  switchSettingsFinancialYear,
  closeSettingsFinancialYear,
  getVoucherTypes,
  getWarehouses,
  createWarehouse,
  updateWarehouse,
  getVoucherSeries,
  createVoucherSeries,
  updateVoucherSeries,
  deleteVoucherSeries,
  getPayrollSettings,
  updatePayrollSettings,
};

export default settingsService;
