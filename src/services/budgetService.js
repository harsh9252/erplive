import { apiRequest } from "./apiClient";
import {
  buildUnsupportedOperationError,
  cleanParams,
  normalizeListResponse,
} from "./apiUtils";

const getBudgets = async (params = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: "/api/budgets",
      method: "GET",
      params: cleanParams(params),
    }),
  );

const getBudget = async (id) =>
  apiRequest({
    url: `/api/budgets/${id}`,
    method: "GET",
  });

const createBudget = async (budgetData) =>
  apiRequest({
    url: "/api/budgets",
    method: "POST",
    data: budgetData,
  });

const updateBudget = async (id, budgetData) =>
  apiRequest({
    url: `/api/budgets/${id}`,
    method: "PUT",
    data: budgetData,
  });

const deleteBudget = async (id) =>
  apiRequest({
    url: `/api/budgets/${id}`,
    method: "DELETE",
  });

const getBudgetVariance = async (id) =>
  apiRequest({
    url: `/api/budgets/${id}/variance`,
    method: "GET",
  });

export const budgetService = {
  getBudgets,
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgetVariance,
};

export default budgetService;
