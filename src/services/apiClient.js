import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

export const AUTH_STATE_CHANGED_EVENT = 'auth-state-changed';

const STORAGE_KEYS = {
  accessToken: 'accessToken',
  legacyToken: 'token',
  refreshToken: 'refreshToken',
  user: 'user',
  permissions: 'permissions',
  companies: 'companies',
  activeCompany: 'activeCompany',
  tokenExpiry: 'tokenExpiry',
  rememberMe: 'rememberMe',
};

const emitAuthStateChanged = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_STATE_CHANGED_EVENT));
  }
};

const safeStorageGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeStorageSet = (key, value) => {
  try {
    if (value === undefined || value === null || value === '') {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota / availability issues and keep the app usable.
  }
};

const safeStorageRemove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage availability issues.
  }
};

const safeJsonParse = (value, fallback = null) => {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const decodeJwtPayload = (token) => {
  if (!token || typeof token !== 'string') {
    return null;
  }

  const parts = token.split('.');
  if (parts.length < 2) {
    return null;
  }

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

const getTokenExpiryFromJwt = (token) => {
  const payload = decodeJwtPayload(token);
  return payload?.exp ? payload.exp * 1000 : null;
};

const buildNormalizedError = (error) => {
  if (error instanceof Error && !error.response && !error.data) {
    return error;
  }

  const responseData = error?.response?.data || error?.data || error;
  const message =
    responseData?.message ||
    responseData?.errors?.[0]?.message ||
    error?.message ||
    'Request failed';

  const normalizedError = new Error(message);
  normalizedError.status = error?.response?.status || error?.status || null;
  normalizedError.code = responseData?.error_code || error?.code || null;
  normalizedError.details = responseData?.errors || null;
  normalizedError.data = responseData || null;
  normalizedError.response = error?.response || null;
  return normalizedError;
};

export const getAccessToken = () =>
  safeStorageGet(STORAGE_KEYS.accessToken) || safeStorageGet(STORAGE_KEYS.legacyToken);

export const getRefreshToken = () => safeStorageGet(STORAGE_KEYS.refreshToken);

export const getStoredUser = () => safeJsonParse(safeStorageGet(STORAGE_KEYS.user), null);

export const getStoredPermissions = () =>
  safeJsonParse(safeStorageGet(STORAGE_KEYS.permissions), null);

export const getStoredCompanies = () =>
  safeJsonParse(safeStorageGet(STORAGE_KEYS.companies), []);

export const getStoredActiveCompany = () =>
  safeJsonParse(safeStorageGet(STORAGE_KEYS.activeCompany), null);

export const clearAuthSession = () => {
  Object.values(STORAGE_KEYS).forEach(safeStorageRemove);
  emitAuthStateChanged();
};

export const persistAuthSession = ({
  accessToken,
  refreshToken,
  expiresIn,
  rememberMe = false,
  user,
  permissions,
  companies,
  activeCompany,
} = {}) => {
  if (accessToken) {
    safeStorageSet(STORAGE_KEYS.accessToken, accessToken);
    safeStorageSet(STORAGE_KEYS.legacyToken, accessToken);
    const tokenExpiry = expiresIn
      ? Date.now() + Number(expiresIn) * 1000
      : getTokenExpiryFromJwt(accessToken);

    if (tokenExpiry) {
      safeStorageSet(STORAGE_KEYS.tokenExpiry, String(tokenExpiry));
    }
  }

  if (refreshToken) {
    safeStorageSet(STORAGE_KEYS.refreshToken, refreshToken);
  }

  if (user) {
    safeStorageSet(STORAGE_KEYS.user, JSON.stringify(user));
  }

  if (permissions) {
    safeStorageSet(STORAGE_KEYS.permissions, JSON.stringify(permissions));
  }

  if (Array.isArray(companies)) {
    safeStorageSet(STORAGE_KEYS.companies, JSON.stringify(companies));
  }

  if (activeCompany) {
    safeStorageSet(STORAGE_KEYS.activeCompany, JSON.stringify(activeCompany));
  }

  safeStorageSet(STORAGE_KEYS.rememberMe, String(rememberMe));
  emitAuthStateChanged();
};

let refreshRequestPromise = null;

const requestTokenRefresh = async () => {
  if (refreshRequestPromise) {
    return refreshRequestPromise;
  }

  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('Your session has expired. Please sign in again.');
  }

  refreshRequestPromise = axios
    .post(
      `${API_BASE_URL}/api/auth/refresh`,
      { refresh_token: refreshToken },
      { headers: { 'Content-Type': 'application/json' } },
    )
    .then((response) => {
      const responseData = response?.data?.data || {};
      const nextAccessToken =
        responseData.accessToken || responseData.token || responseData.access_token;

      if (!nextAccessToken) {
        throw new Error('The refresh token response did not include a new access token.');
      }

      persistAuthSession({
        accessToken: nextAccessToken,
        refreshToken: responseData.refreshToken || responseData.refresh_token || refreshToken,
        expiresIn: responseData.expiresIn || responseData.expires_in,
        user: getStoredUser(),
        permissions: getStoredPermissions(),
        companies: getStoredCompanies(),
        activeCompany: getStoredActiveCompany(),
        rememberMe: safeStorageGet(STORAGE_KEYS.rememberMe) === 'true',
      });

      return nextAccessToken;
    })
    .catch((error) => {
      clearAuthSession();
      // Redirect to login if refresh fails
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw buildNormalizedError(error);
    })
    .finally(() => {
      refreshRequestPromise = null;
    });

  return refreshRequestPromise;
};

const shouldSkipRefresh = (url = '') =>
  ['/api/auth/login', '/api/auth/refresh', '/api/auth/logout'].some((path) =>
    url.includes(path),
  );

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const nextConfig = { ...config };
  nextConfig.headers = nextConfig.headers || {};

  const accessToken = getAccessToken();
  if (accessToken && !nextConfig.headers.Authorization) {
    nextConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (
    nextConfig.data &&
    !(nextConfig.data instanceof FormData) &&
    !nextConfig.headers['Content-Type']
  ) {
    nextConfig.headers['Content-Type'] = 'application/json';
  }

  return nextConfig;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;

    if (status === 429 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      // Wait 1.5s before retrying to allow the rate limit to reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      return apiClient(originalRequest);
    }

    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !shouldSkipRefresh(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        const nextAccessToken = await requestTokenRefresh();
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(buildNormalizedError(refreshError));
      }
    }

    return Promise.reject(buildNormalizedError(error));
  },
);

export const apiRequest = async (config) => {
  const response = await apiClient(config);
  return response.data;
};

export default apiClient;
