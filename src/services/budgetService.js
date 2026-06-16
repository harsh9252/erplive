import { apiRequest } from "./apiClient";
import {
  buildUnsupportedOperationError,
  cleanParams,
  normalizeListResponse,
} from "./apiUtils";

let fetchBudgetsInProgress = new Map();

const getBudgets = async (params = {}) => {
  const paramKey = JSON.stringify(params);
  if (fetchBudgetsInProgress.has(paramKey)) {
    return fetchBudgetsInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: "/api/budgets",
          method: "GET",
          params: cleanParams(params),
        })
      );
    } finally {
      fetchBudgetsInProgress.delete(paramKey);
    }
  })();

  fetchBudgetsInProgress.set(paramKey, promise);
  return promise;
};

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
