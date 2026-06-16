import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

/**
 * Fetches the list of bank accounts.
 * @param {Object} params - Optional filters (limit, page, search, etc.)
 */
export const getBankAccounts = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/bank-accounts',
      method: 'GET',
      params: cleanParams(params),
    })
  );

/**
 * Fetches a single bank account by ID.
 * @param {number|string} id - The bank account ID.
 */
export const getBankAccountById = async (id) =>
  apiRequest({
    url: `/api/bank-accounts/${id}`,
    method: 'GET',
  });

/**
 * Creates a new bank account.
 * @param {Object} data - { ledger_id, account_number, bank_name, ifsc_code }
 */
export const createBankAccount = async (data) =>
  apiRequest({
    url: '/api/bank-accounts',
    method: 'POST',
    data,
  });

/**
 * Updates an existing bank account.
 * @param {number|string} id - The bank account ID.
 * @param {Object} data - { bank_name, ifsc_code, ... }
 */
export const updateBankAccount = async (id, data) =>
  apiRequest({
    url: `/api/bank-accounts/${id}`,
    method: 'PUT',
    data,
  });

/**
 * Deletes a bank account.
 * @param {number|string} id - The bank account ID.
 */
export const deleteBankAccount = async (id) =>
  apiRequest({
    url: `/api/bank-accounts/${id}`,
    method: 'DELETE',
  });

export const bankAccountService = {
  getBankAccounts,
  getBankAccountById,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
};

export default bankAccountService;
