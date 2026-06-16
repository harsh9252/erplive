import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

/**
 * Fetches audit logs with filtering and pagination.
 * @param {Object} params - Query parameters (page, limit, module, action, user_id, start_date, end_date).
 */
let fetchInProgress = new Map();

export const getAuditLogs = async (params = {}) => {
  const { page = 1, limit = 20, ...rest } = params;
  const offset = (page - 1) * limit;

  const finalParams = cleanParams({
    ...rest,
    limit,
    offset,
  });
  const paramKey = JSON.stringify(finalParams);

  if (fetchInProgress.has(paramKey)) {
    return fetchInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/audit-logs',
          method: 'GET',
          params: finalParams,
        })
      );
    } finally {
      fetchInProgress.delete(paramKey);
    }
  })();

  fetchInProgress.set(paramKey, promise);
  return promise;
};

/**
 * Fetches full details for a single audit log entry.
 * @param {string|number} id - The audit log ID.
 */
export const getAuditLogById = async (id) =>
  apiRequest({
    url: `/api/audit-logs/${id}`,
    method: 'GET',
  });

/**
 * Fetches an audit summary for a specific module.
 * @param {string} module - The module name.
 */
export const getModuleSummary = async (module) =>
  apiRequest({
    url: `/api/audit-logs/summary/${module}`,
    method: 'GET',
  });

const auditLogService = {
  getAuditLogs,
  getAuditLogById,
  getModuleSummary,
};

export default auditLogService;
