import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

let fetchInProgress = new Map();

export const costCenterService = {
  /**
   * Fetches all cost centers.
   * @param {Object} params - Query parameters.
   */
  getCostCenters: async (params = {}) => {
    const paramKey = JSON.stringify(params);
    if (fetchInProgress.has(paramKey)) {
      return fetchInProgress.get(paramKey);
    }

    const promise = (async () => {
      try {
        return normalizeListResponse(
          await apiRequest({
            url: '/api/cost-centres',
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
  },

  /**
   * Fetches a single cost center by ID.
   * @param {number|string} id - The ID of the cost center.
   */
  getCostCenter: async (id) =>
    await apiRequest({
      url: `/api/cost-centres/${id}`,
      method: 'GET',
    }),

  /**
   * Creates a new cost center.
   * @param {Object} data - The cost center data.
   */
  createCostCenter: async (data) =>
    await apiRequest({
      url: '/api/cost-centres',
      method: 'POST',
      data,
    }),

  /**
   * Updates an existing cost center.
   * @param {number|string} id - The ID of the cost center.
   * @param {Object} data - The updated cost center data.
   */
  updateCostCenter: async (id, data) =>
    await apiRequest({
      url: `/api/cost-centres/${id}`,
      method: 'PUT',
      data,
    }),

  /**
   * Deletes a cost center by ID.
   * @param {number|string} id - The ID of the cost center.
   */
  deleteCostCenter: async (id) =>
    await apiRequest({
      url: `/api/cost-centres/${id}`,
      method: 'DELETE',
    }),
};

export default costCenterService;
