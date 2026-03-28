import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse, buildUnsupportedOperationError, getPaginationParams } from './apiUtils';

const getUsers = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/users',
      method: 'GET',
      params: cleanParams({
        ...getPaginationParams(params.page, params.limit),
        ...params,
      }),
    }),
  );

const getUser = async (id) =>
  apiRequest({
    url: `/api/users/${id}`,
    method: 'GET',
  });

const createUser = async (userData) =>
  apiRequest({
    url: '/api/users',
    method: 'POST',
    data: userData,
  });

const updateUser = async (id, userData) =>
  apiRequest({
    url: `/api/users/${id}`,
    method: 'PUT',
    data: userData,
  });

const deleteUser = async () => {
  throw buildUnsupportedOperationError(
    'The current backend API does not expose user deletion. Use status toggling or add a backend delete route first.',
  );
};

const resetPassword = async (id, newPassword) =>
  apiRequest({
    url: `/api/users/${id}/reset-password`,
    method: 'POST',
    data: { new_password: newPassword },
  });

const toggleStatus = async (id) =>
  apiRequest({
    url: `/api/users/${id}/toggle-status`,
    method: 'POST',
  });

const assignRoles = async (id, roleIds) =>
  apiRequest({
    url: `/api/users/${id}/roles`,
    method: 'PUT',
    data: { role_ids: roleIds },
  });

const getCompanies = async () => {
  throw buildUnsupportedOperationError(
    'Public company lookup is not exposed by the backend. Use owner onboarding first, then create sub-users from the authenticated Users API.',
  );
};

const getBranches = async () => {
  throw buildUnsupportedOperationError(
    'Branch lookup is not exposed by the current backend API.',
  );
};

const getRoles = async () =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/roles',
      method: 'GET',
    }),
  );

export const userService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  resetPassword,
  toggleStatus,
  assignRoles,
  getCompanies,
  getBranches,
  getRoles,
};

export default userService;

