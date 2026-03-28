import { apiRequest } from './apiClient';
import { buildUnsupportedOperationError, cleanParams, normalizeListResponse } from './apiUtils';

const getLedgers = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/ledgers',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

const getGroupLedger = async () =>
apiRequest({
  url: `/api/ledger-groups/`,
  method: 'GET',
});

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

export const ledgerService = {
  getLedgers,
  getLedger,
  createLedger,
  updateLedger,
  deleteLedger,
  getLedgerBalance,
  getGroupLedger,
  createGroupLedger,
};

export default ledgerService;

