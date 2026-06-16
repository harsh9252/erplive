import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

/**
 * Normalizes the branch payload for the API.
 */
const normalizeBranchPayload = (data = {}) => ({
  name: data.name,
  branch_code: data.code || data.branch_code,
  gstin: data.gstin || null,
  state_code: data.state_code || null,
  address: data.address || null,
  city: data.city || null,
  pincode: data.pincode || null,
  phone: data.phone || null,
  email: data.email || null,
  is_head_office: Boolean(data.is_head_office),
});

/**
 * Fetches all branches from the API.
 */
export const getBranches = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/branches',
      method: 'GET',
      params: cleanParams(params),
    })
  );

/**
 * Fetches a single branch by ID.
 */
export const getBranchById = async (id) =>
  apiRequest({
    url: `/api/branches/${id}`,
    method: 'GET',
  });

/**
 * Creates a new branch.
 */
export const createBranch = async (data, customHeaders = {}) =>
  apiRequest({
    url: '/api/branches',
    method: 'POST',
    data: normalizeBranchPayload(data),
    headers: customHeaders,
  });

/**
 * Updates an existing branch.
 */
export const updateBranch = async (id, data) =>
  apiRequest({
    url: `/api/branches/${id}`,
    method: 'PUT',
    data: normalizeBranchPayload(data),
  });

/**
 * Deletes a branch by ID.
 */
export const deleteBranch = async (id) =>
  apiRequest({
    url: `/api/branches/${id}`,
    method: 'DELETE',
  });

const branchService = {
  getBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
};

export default branchService;
