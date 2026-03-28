import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const costCategoryService = {
  /**
   * Fetches all cost categories.
   * @param {Object} params - Query parameters.
   */
  getCategories: async (params = {}) =>
    normalizeListResponse(
      await apiRequest({
        url: '/api/cost-centres/categories',
        method: 'GET',
        params: cleanParams(params),
      }),
    ),

  /**
   * Fetches a single cost category by ID.
   * @param {number|string} id - The ID of the category.
   */
  getCategory: async (id) =>
    await apiRequest({
      url: `/api/cost-centres/categories/${id}`,
      method: 'GET',
    }),

  /**
   * Creates a new cost category.
   * @param {Object} data - The category data.
   */
  createCategory: async (data) =>
    await apiRequest({
      url: '/api/cost-centres/categories',
      method: 'POST',
      data,
    }),

  /**
   * Updates an existing cost category.
   * @param {number|string} id - The ID of the category.
   * @param {Object} data - The updated category data.
   */
  updateCategory: async (id, data) =>
    await apiRequest({
      url: `/api/cost-centres/categories/${id}`,
      method: 'PUT',
      data,
    }),

  /**
   * Deletes a cost category by ID.
   * @param {number|string} id - The ID of the category.
   */
  deleteCategory: async (id) =>
    await apiRequest({
      url: `/api/cost-centres/categories/${id}`,
      method: 'DELETE',
    }),
};

export default costCategoryService;
