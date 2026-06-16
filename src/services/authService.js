import apiClient, {
  apiRequest,
  clearAuthSession,
  getAccessToken,
  getStoredPermissions,
  getStoredUser,
  persistAuthSession,
} from './apiClient';
import { buildUnsupportedOperationError } from './apiUtils';

const getAuthData = (payload = {}) => payload?.data || {};

const getActiveCompanyFromList = (companies = []) =>
  companies.find((company) => company?.is_active) || null;

const persistLoginResponse = (payload, rememberMe = false) => {
  const data = getAuthData(payload);
  const accessToken = data.accessToken || data.access_token || data.token;
  const refreshToken = data.refreshToken || data.refresh_token;

  if (!accessToken) {
    throw new Error('The login response did not include an access token.');
  }

  persistAuthSession({
    accessToken,
    refreshToken,
    expiresIn: data.expiresIn || data.expires_in,
    rememberMe,
    user: data.user || getStoredUser(),
    permissions: data.permissions || data.user?.permissions || getStoredPermissions(),
    companies: Array.isArray(data.companies) ? data.companies : undefined,
    activeCompany:
      data.active_company ||
      getActiveCompanyFromList(Array.isArray(data.companies) ? data.companies : []),
  });

  return payload;
};

export const registerOwner = async (userData) =>
  apiRequest({
    url: '/api/onboarding/register-owner',
    method: 'POST',
    data: userData,
  });

export const registerCompany = async (companyData) =>
  apiRequest({
    url: '/api/onboarding/company',
    method: 'POST',
    data: companyData,
  });

export const register = async (userData) =>
  apiRequest({
    url: '/api/auth/register',
    method: 'POST',
    data: userData,
  });

export const login = async (email, password, rememberMe = false) => {
  const payload = await apiRequest({
    url: '/api/auth/login',
    method: 'POST',
    data: { email, password },
  });

  return persistLoginResponse(payload, rememberMe);
};

export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    if (refreshToken) {
      await apiRequest({
        url: '/api/auth/logout',
        method: 'POST',
        data: { refresh_token: refreshToken },
      });
    }
  } finally {
    clearAuthSession();
  }
};

export const refreshToken = async () => {
  const storedRefreshToken = localStorage.getItem('refreshToken');

  if (!storedRefreshToken) {
    throw new Error('No refresh token is available.');
  }

  const payload = await apiRequest({
    url: '/api/auth/refresh',
    method: 'POST',
    data: { refresh_token: storedRefreshToken },
  });

  return persistLoginResponse(
    {
      ...payload,
      data: {
        ...getAuthData(payload),
        user: getStoredUser(),
      },
    },
    localStorage.getItem('rememberMe') === 'true',
  );
};

export const forgotPassword = async (email) =>
  apiRequest({
    url: '/api/auth/forgot-password',
    method: 'POST',
    data: { email },
  });

export const resetPassword = async (token, newPassword) =>
  apiRequest({
    url: '/api/auth/reset-password',
    method: 'POST',
    data: {
      token,
      new_password: newPassword,
    },
  });

export const getProfile = async () => {
  const payload = await apiRequest({
    url: '/api/auth/profile',
    method: 'GET',
  });

  const profile = getAuthData(payload);

  persistAuthSession({
    accessToken: getAccessToken(),
    refreshToken: localStorage.getItem('refreshToken'),
    user: profile,
    permissions: profile?.permissions || getStoredPermissions(),
    companies: profile?.companies || undefined,
    activeCompany: profile?.company || getActiveCompanyFromList(profile?.companies || []),
    rememberMe: localStorage.getItem('rememberMe') === 'true',
  });

  return payload;
};

export const switchCompany = async (companyId) => {
  const payload = await apiRequest({
    url: '/api/auth/switch-company',
    method: 'POST',
    data: { company_id: companyId },
  });

  const data = getAuthData(payload);
  const currentUser = getStoredUser();
  const nextActiveCompany =
    data.active_company ||
    getActiveCompanyFromList(Array.isArray(data.companies) ? data.companies : []);

  persistAuthSession({
    accessToken: data.accessToken || data.access_token || data.token,
    refreshToken: localStorage.getItem('refreshToken'),
    user: currentUser
      ? {
          ...currentUser,
          company_id: nextActiveCompany?.id || companyId,
        }
      : currentUser,
    permissions: getStoredPermissions(),
    companies: Array.isArray(data.companies) ? data.companies : undefined,
    activeCompany: nextActiveCompany,
    rememberMe: localStorage.getItem('rememberMe') === 'true',
  });

  return payload;
};

export const changePassword = async () => {
  throw buildUnsupportedOperationError(
    'The current backend API does not expose a change-password route for authenticated users.',
  );
};

export const verifyToken = async () => getProfile();

export const getCurrentUser = () => getStoredUser();

export const getPermissions = () => getStoredPermissions();

export const isAuthenticated = () => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken || accessToken === 'undefined') {
      return false;
    }

    const tokenExpiry = Number(localStorage.getItem('tokenExpiry'));
    if (Number.isFinite(tokenExpiry) && tokenExpiry > 0 && Date.now() > tokenExpiry) {
      clearAuthSession();
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

export const hasPermission = (module, action) => {
  const permissions = getStoredPermissions();
  
  const user = getStoredUser() || {};
  const primaryRole = (user.role || '').toLowerCase();
  const rawRoles = user.roles || [];
  
  const roles = (Array.isArray(rawRoles) ? rawRoles : [])
    .map(r => typeof r === 'string' ? r.toLowerCase() : String(r?.name || '').toLowerCase());
  
  // If the user's role is owner, admin, or super_admin, they bypass all permission checks
  if (
    primaryRole === 'owner' ||
    primaryRole === 'admin' ||
    primaryRole === 'super_admin' ||
    primaryRole === 'super admin' ||
    roles.includes('owner') ||
    roles.includes('admin') ||
    roles.includes('super_admin') ||
    roles.includes('super admin')
  ) {
    return true;
  }

  // Fallback: If they have permissions explicitly set up for this module, return that check
  if (permissions?.[module]) {
    return permissions[module][`can_${action}`] === true;
  }

  // Fallback: If roles and permissions are empty, bypass for newly registered user
  if (roles.length === 0 && (!permissions || Object.keys(permissions).length === 0)) {
    return true;
  }

  return false;
};

export default apiClient;
