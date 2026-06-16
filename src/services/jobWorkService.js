import { apiRequest } from "./apiClient";
import { cleanParams, normalizeListResponse } from "./apiUtils";

const normalizeJobWorkPayload = (data = {}) => ({
  ...data,
});

const transformJobWorkResponse = (items = []) => items;

export const getJobWorkEntries = async (params = {}) => {
  const response = await apiRequest({
    url: "/api/manufacturing/job-work",
    method: "GET",
    params: cleanParams(params),
  });
  const normalized = normalizeListResponse(response);
  return {
    ...normalized,
    data: transformJobWorkResponse(normalized.data),
  };
};

export const createJobWorkEntry = async (payload) =>
  apiRequest({
    url: "/api/manufacturing/job-work",
    method: "POST",
    data: normalizeJobWorkPayload(payload),
  });

export const getJobWorkEntry = async (id) => {
  const response = await apiRequest({
    url: `/api/manufacturing/job-work/${id}`,
    method: "GET",
  });
  return response;
};

export const updateJobWorkEntry = async (id, payload) =>
  apiRequest({
    url: `/api/manufacturing/job-work/${id}`,
    method: "PUT",
    data: normalizeJobWorkPayload(payload),
  });

export const deleteJobWorkEntry = async (id) =>
  apiRequest({
    url: `/api/manufacturing/job-work/${id}`,
    method: "DELETE",
  });

export const releaseJobWork = async (id) =>
  apiRequest({
    url: `/api/manufacturing/job-work/${id}/release`,
    method: 'POST',
  });

export const completeJobWork = async (id, receivedQty) =>
  apiRequest({
    url: `/api/manufacturing/job-work/${id}/complete`,
    method: 'POST',
    data: { received_qty: receivedQty },
  });

const jobWorkService = {
  getJobWorkEntries,
  getJobWorkEntry,
  createJobWorkEntry,
  updateJobWorkEntry,
  deleteJobWorkEntry,
  releaseJobWork,
  completeJobWork,
};

export default jobWorkService;
