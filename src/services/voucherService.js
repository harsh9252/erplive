import { apiRequest } from './apiClient';
import { buildUnsupportedOperationError, cleanParams, normalizeListResponse } from './apiUtils';

let fetchVouchersInProgress = new Map();

const getVouchers = async (params = {}) => {
  const paramKey = JSON.stringify(params);
  if (fetchVouchersInProgress.has(paramKey)) {
    return fetchVouchersInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/vouchers',
          method: 'GET',
          params: cleanParams(params),
        })
      );
    } finally {
      fetchVouchersInProgress.delete(paramKey);
    }
  })();

  fetchVouchersInProgress.set(paramKey, promise);
  return promise;
};

const getVoucher = async (id) =>
  apiRequest({
    url: `/api/vouchers/${id}`,
    method: 'GET',
  });

const createVoucher = async (voucherData) =>
  apiRequest({
    url: '/api/vouchers',
    method: 'POST',
    data: voucherData,
  });

const updateVoucher = async (id, voucherData) =>
  apiRequest({
    url: `/api/vouchers/${id}`,
    method: 'PUT',
    data: voucherData,
  });

const deleteVoucher = async () => {
  throw buildUnsupportedOperationError(
    'Voucher deletion is not exposed by the current backend API. Cancel the voucher instead.',
  );
};

let fetchVoucherTypesInProgress = null;

const getVoucherTypes = async () => {
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

const getNextVoucherNumber = async () => {
  throw buildUnsupportedOperationError(
    'Next voucher number generation is handled server-side during voucher creation.',
  );
};

const postVoucher = async (id) =>
  apiRequest({
    url: `/api/vouchers/${id}/post`,
    method: 'POST',
  });

const cancelVoucher = async (id, reason) =>
  apiRequest({
    url: `/api/vouchers/${id}/cancel`,
    method: 'POST',
    data: reason ? { reason } : undefined,
  });

const getVoucherEntries = async () => {
  throw buildUnsupportedOperationError(
    'Voucher entries are returned inside the voucher detail response.',
  );
};

const validateVoucherBalance = async () => {
  throw buildUnsupportedOperationError(
    'Voucher balance validation is enforced by the backend during voucher creation.',
  );
};

export const voucherService = {
  getVouchers,
  getVoucher,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  getVoucherTypes,
  getNextVoucherNumber,
  postVoucher,
  cancelVoucher,
  getVoucherEntries,
  validateVoucherBalance,
};

export default voucherService;

