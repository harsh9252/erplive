import { apiRequest } from './apiClient';
import { API_BASE_URL } from '../config/apiConfig';

const getBackups = async () =>
  apiRequest({
    url: '/api/backups',
    method: 'GET',
  });

const createBackup = async () =>
  apiRequest({
    url: '/api/backups',
    method: 'POST',
  });

const deleteBackup = async (filename) =>
  apiRequest({
    url: `/api/backups/${filename}`,
    method: 'DELETE',
  });

const getDownloadUrl = (filename) => {
  return `${API_BASE_URL}/api/backups/${filename}/download`;
};

const backupService = {
  getBackups,
  createBackup,
  deleteBackup,
  getDownloadUrl,
};

export default backupService;
