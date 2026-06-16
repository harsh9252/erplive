import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

let fetchInProgress = new Map();

export const getRoles = async (params = {}) => {
  const paramKey = JSON.stringify(params);
  if (fetchInProgress.has(paramKey)) {
    return fetchInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/roles',
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

export const getRoleById = async (id) =>
  apiRequest({
    url: `/api/roles/${id}`,
    method: 'GET',
  });

export const createRole = async (payload) =>
  apiRequest({
    url: '/api/roles',
    method: 'POST',
    data: payload,
  });

export const updateRole = async (id, payload) =>
  apiRequest({
    url: `/api/roles/${id}`,
    method: 'PUT',
    data: payload,
  });

export const deleteRole = async (id) =>
  apiRequest({
    url: `/api/roles/${id}`,
    method: 'DELETE',
  });

export const updateRolePermissions = async (id, permissions) =>
  apiRequest({
    url: `/api/roles/${id}/permissions`,
    method: 'PUT',
    data: { permissions },
  });

const roleService = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  updateRolePermissions,
};

export default roleService;
