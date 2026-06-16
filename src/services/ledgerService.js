import { apiRequest } from './apiClient';
import { buildUnsupportedOperationError, cleanParams, normalizeListResponse } from './apiUtils';

let fetchInProgress = new Map();

const getLedgers = async (params = {}) => {
  const paramKey = JSON.stringify(params);
  if (fetchInProgress.has(paramKey)) {
    return fetchInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/ledgers',
          method: 'GET',
          params: cleanParams(params),
        })
      );
    } finally {
      fetchInProgress.delete(paramKey);
    }
  })();

  fetchInProgress.set(paramKey, promise);
  return promise;
};

let fetchGroupLedgerInProgress = null;

const getGroupLedger = async () => {
  if (fetchGroupLedgerInProgress) return fetchGroupLedgerInProgress;
  
  fetchGroupLedgerInProgress = (async () => {
    try {
      return await apiRequest({
        url: `/api/ledger-groups/`,
        method: 'GET',
      });
    } finally {
      fetchGroupLedgerInProgress = null;
    }
  })();
  
  return fetchGroupLedgerInProgress;
};

const getLedger = async (id) =>
  apiRequest({
    url: `/api/ledgers/${id}`,
    method: 'GET',
  }); 
const createLedger = async (ledgerData) =>
  apiRequest({
    url: '/api/ledgers',
    method: 'POST',
    data: ledgerData,
  });
const createGroupLedger = async (ledgerData) =>
  apiRequest({
    url: '/api/ledger-groups',
    method: 'POST',
    data: ledgerData,
  });

const updateLedger = async (id, ledgerData) =>
  apiRequest({
    url: `/api/ledgers/${id}`,
    method: 'PUT',
    data: ledgerData,
  });

const deleteLedger = async (id) =>
  apiRequest({
    url: `/api/ledgers/${id}`,
    method: 'DELETE',
  });

const getLedgerBalance = async () => {
  throw buildUnsupportedOperationError(
    'Ledger balance is not exposed by a dedicated backend route. Use the trial balance or ledger report APIs instead.',
  );
};

let fetchLedgersByTypeInProgress = new Map();

const getLedgersByType = async (type = 'all') => {
  if (fetchLedgersByTypeInProgress.has(type)) {
    return fetchLedgersByTypeInProgress.get(type);
  }

  const promise = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/ledgers/by-type',
          method: 'GET',
          params: { type },
        })
      );
    } finally {
      fetchLedgersByTypeInProgress.delete(type);
    }
  })();

  fetchLedgersByTypeInProgress.set(type, promise);
  return promise;
};

const getLedgerStatement = async (id, params = {}) =>
  apiRequest({
    url: `/api/reports/ledger/${id}`,
    method: 'GET',
    params: cleanParams(params),
  });

const checkNameExists = async (name) => {
  if (!name) return false;
  try {
    const response = await getLedgers({ search: name.trim(), limit: 50 });
    const items = response.data || [];
    // Perform exact case-insensitive match
    return items.some(
      (ledger) => ledger.name?.trim().toLowerCase() === name.trim().toLowerCase(),
    );
  } catch (error) {
    console.error('Error checking ledger existence:', error);
    return false;
  }
};

export const ledgerService = {
  getLedgers,
  getLedger,
  createLedger,
  updateLedger,
  deleteLedger,
  getLedgerBalance,
  getGroupLedger,
  createGroupLedger,
  getLedgersByType,
  getLedgerStatement,
  checkNameExists,
};

export default ledgerService;

