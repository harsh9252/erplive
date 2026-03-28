import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getRoles = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/roles',
      method: 'GET',
      params: cleanParams(params),
    }),
  );

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
