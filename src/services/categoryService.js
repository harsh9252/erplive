import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

/**
 * Normalizes the stock category payload for the API.
 */
const normalizeStockCategoryPayload = (data = {}) => ({
  name: data.name,
  parent_category_id: data.parent_category_id || null,
});

/**
 * Fetches all stock categories from the API.
 * @param {Object} params - Query parameters (limit, offset, parent_category_id, search).
 */
export const getStockCategories = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/stock-categories',
      method: 'GET',
      params: cleanParams(params),
    })
  );

/**
 * Fetches top-level stock categories (Stock Groups).
 * Those with parent_category_id as null are considered Stock Groups.
 */
export const getStockGroups = async (params = {}) =>
  getStockCategories({ ...params, parent_category_id: 'null' });

/**
 * Fetches a single stock category by ID.
 */
export const getStockCategoryById = async (id) =>
  apiRequest({
    url: `/api/stock-categories/${id}`,
    method: 'GET',
  });

/**
 * Creates a new stock category or group.
 */
export const createStockCategory = async (data) =>
  apiRequest({
    url: '/api/stock-categories',
    method: 'POST',
    data: normalizeStockCategoryPayload(data),
  });

/**
 * Updates an existing stock category.
 */
export const updateStockCategory = async (id, data) =>
  apiRequest({
    url: `/api/stock-categories/${id}`,
    method: 'PUT',
    data: normalizeStockCategoryPayload(data),
  });

/**
 * Deletes a stock category by ID.
 */
export const deleteStockCategory = async (id) =>
  apiRequest({
    url: `/api/stock-categories/${id}`,
    method: 'DELETE',
  });

/**
 * Helper to build a tree structure for hierarchical display.
 */
export const toCategoryTree = (categories = []) => {
  const categoryMap = {};
  const roots = [];

  // Create map entries first
  categories.forEach((cat) => {
    categoryMap[cat.id] = { ...cat, children: [] };
  });

  // Assign children to parents or to roots
  categories.forEach((cat) => {
    const node = categoryMap[cat.id];
    if (cat.parent_category_id && categoryMap[cat.parent_category_id]) {
      categoryMap[cat.parent_category_id].children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
};

// Aliases for compatibility with generic category requests
export const getCategories = getStockCategories;
export const getCategoryById = getStockCategoryById;
export const createCategory = createStockCategory;
export const updateCategory = updateStockCategory;
export const deleteCategory = deleteStockCategory;

const categoryService = {
  getStockCategories,
  getStockGroups,
  getStockCategoryById,
  createStockCategory,
  updateStockCategory,
  deleteStockCategory,
  toCategoryTree,
  // Compatibility Aliases
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
