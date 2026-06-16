import { apiRequest } from './apiClient';
import { API_BASE_URL } from '../config/apiConfig';

let fetchInProgress = new Map();

const getBackups = async (params = {}) => {
  const paramKey = JSON.stringify(params);
  if (fetchInProgress.has(paramKey)) {
    return fetchInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      return await apiRequest({
        url: '/api/settings/backups',
        method: 'GET',
        params
      });
    } finally {
      fetchInProgress.delete(paramKey);
    }
  })();

  fetchInProgress.set(paramKey, promise);
  return promise;
};

const createBackup = async (data) =>
  apiRequest({
    url: '/api/settings/backups',
    method: 'POST',
    data
  });

const deleteBackup = async (id) =>
  apiRequest({
    url: `/api/settings/backups/${id}`,
    method: 'DELETE',
  });

const restoreBackup = async (id) =>
  apiRequest({
    url: `/api/settings/backups/${id}/restore`,
    method: 'POST',
  });

const getDownloadUrl = (id) => {
  return `${API_BASE_URL}/api/settings/backups/${id}/download`;
};

const backupService = {
  getBackups,
  createBackup,
  deleteBackup,
  restoreBackup,
  getDownloadUrl,
};

export default backupService;

// ─── Standalone /api/backups endpoints (Postman: 💾 DATA BACKUP) ───

export const getStandaloneBackups = async (params = {}) =>
  apiRequest({
    url: '/api/backups',
    method: 'GET',
    params,
  });

export const createStandaloneBackup = async (data) =>
  apiRequest({
    url: '/api/backups',
    method: 'POST',
    data,
  });

export const getStandaloneBackupDownloadUrl = (filename) =>
  `${API_BASE_URL}/api/backups/${encodeURIComponent(filename)}/download`;

export const deleteStandaloneBackup = async (filename) =>
  apiRequest({
    url: `/api/backups/${encodeURIComponent(filename)}`,
    method: 'DELETE',
  });
