import { apiRequest } from './apiClient';

export const getBusinessNatures = async () =>
  apiRequest({
    url: '/api/settings/business-natures',
    method: 'GET',
  });

export const createBusinessNature = async (data) =>
  apiRequest({
    url: '/api/settings/business-natures',
    method: 'POST',
    data,
  });

export const updateBusinessNature = async (id, data) =>
  apiRequest({
    url: `/api/settings/business-natures/${id}`,
    method: 'PUT',
    data,
  });

export const deleteBusinessNature = async (id) =>
  apiRequest({
    url: `/api/settings/business-natures/${id}`,
    method: 'DELETE',
  });

const businessNatureService = {
  getBusinessNatures,
  createBusinessNature,
  updateBusinessNature,
  deleteBusinessNature,
};

export default businessNatureService;
