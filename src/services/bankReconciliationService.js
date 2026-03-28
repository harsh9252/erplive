import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

/**
 * Fetches the list of bank reconciliations with optional filters.
 * @param {Object} params - { bank_account_id, status, limit, page }
 */
const getReconciliations = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/bank-reconciliations',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

/**
 * Creates a new bank reconciliation record.
 * @param {Object} data - { bank_account_id, statement_date, statement_balance, transactions: [] }
 */
const createReconciliation = async (data) =>
  apiRequest({
    url: '/api/bank-reconciliations',
    method: 'POST',
    data,
  });

/**
 * Fetches unmatched transactions for a specific reconciliation.
 * @param {number|string} id - The reconciliation ID.
 */
const getUnmatchedTransactions = async (id) =>
  apiRequest({
    url: `/api/bank-reconciliations/${id}/unmatched`,
    method: 'GET',
  });

/**
 * Fetches matched transaction pairs for a specific reconciliation.
 * @param {number|string} id - The reconciliation ID.
 */
const getMatchedTransactions = async (id) =>
  apiRequest({
    url: `/api/bank-reconciliations/${id}/matched`,
    method: 'GET',
  });

/**
 * Fetches the summary details of a specific reconciliation.
 * @param {number|string} id - The reconciliation ID.
 */
const getReconciliationSummary = async (id) =>
  apiRequest({
    url: `/api/bank-reconciliations/${id}`,
    method: 'GET',
  });

/**
 * Matches a bank statement transaction to an ERP voucher.
 * @param {Object} data - { reconciliation_id, bank_transaction_id, voucher_id }
 */
const matchTransaction = async (data) =>
  apiRequest({
    url: '/api/bank-reconciliations/match-transaction',
    method: 'POST',
    data,
  });

/**
 * Unmatches a previously matched bank statement transaction.
 * @param {Object} data - { reconciliation_id, bank_transaction_id }
 */
const unmatchTransaction = async (data) =>
  apiRequest({
    url: '/api/bank-reconciliations/unmatch-transaction',
    method: 'POST',
    data,
  });

/**
 * Finalizes and locks a reconciliation record.
 * @param {number|string} id - The reconciliation ID.
 */
const finalizeReconciliation = async (id) =>
  apiRequest({
    url: `/api/bank-reconciliations/${id}/finalize`,
    method: 'POST',
  });

/**
 * Fetches the overall reconciliation summary for a specific bank account.
 * @param {number|string} bankAccountId - The bank account ledger ID.
 */
const getAccountSummary = async (bankAccountId) =>
  apiRequest({
    url: `/api/bank-reconciliations/account/${bankAccountId}/summary`,
    method: 'GET',
  });

export const bankReconciliationService = {
  getReconciliations,
  createReconciliation,
  getUnmatchedTransactions,
  getMatchedTransactions,
  getReconciliationSummary,
  matchTransaction,
  unmatchTransaction,
  finalizeReconciliation,
  getAccountSummary,
};

export default bankReconciliationService;
