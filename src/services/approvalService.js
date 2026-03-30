import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getApprovals = async (params = {}) => {
  const { page = 1, limit = 20, status = 'PENDING', entity_type = '' } = params;
  return normalizeListResponse(
    await apiRequest({
      url: '/api/approvals',
      method: 'GET',
      params: cleanParams({ 
        page, 
        limit, 
        status: status === 'All' ? '' : status,
        entity_type: entity_type === 'All' ? '' : entity_type
      }),
    }),
  );
};

export const getPendingApprovals = async () =>
  apiRequest({
    url: '/api/approvals/pending',
    method: 'GET',
  });

export const submitForApproval = async (data) =>
  apiRequest({
    url: '/api/approvals',
    method: 'POST',
    data: {
      entity_type: data.entity_type,
      entity_id: data.entity_id,
      remarks: data.remarks || '',
    },
  });

export const approveRequest = async (id, remarks = '') =>
  apiRequest({
    url: `/api/approvals/${id}/approve`,
    method: 'POST',
    data: { remarks },
  });

export const rejectRequest = async (id, reason = '') =>
  apiRequest({
    url: `/api/approvals/${id}/reject`,
    method: 'POST',
    data: { reason },
  });

const approvalService = {
  getApprovals,
  getPendingApprovals,
  submitForApproval,
  approveRequest,
  rejectRequest,
};

export default approvalService;
