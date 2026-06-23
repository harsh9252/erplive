import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

export const getUoms = async (page = 1, limit = 100, filters = {}) => {
  const response = normalizeListResponse(
    await apiRequest({
      url: '/api/uom',
      method: 'GET',
      params: cleanParams({ page, limit, ...filters }),
    }),
  );
  
  if (response && Array.isArray(response.data)) {
    response.data = response.data.filter(u => u.company_id);
  }
  
  return response;
};

export const getUomById = async (id) =>
  apiRequest({
    url: `/api/uom/${id}`,
    method: 'GET',
  });

export const createUom = async (data) =>
  apiRequest({
    url: '/api/uom',
    method: 'POST',
    data: cleanParams({
      name: data.name,
      symbol: data.symbol,
      uom_type: data.uom_type,
      base_uom_id: data.base_uom_id || null,
      conversion_factor: data.conversion_factor || null,
    }),
  });

export const updateUom = async (id, data) =>
  apiRequest({
    url: `/api/uom/${id}`,
    method: 'PUT',
    data: cleanParams({
      name: data.name,
      symbol: data.symbol,
      uom_type: data.uom_type,
      base_uom_id: data.base_uom_id || null,
      conversion_factor: data.conversion_factor || null,
    }),
  });

export const deleteUom = async (id) =>
  apiRequest({
    url: `/api/uom/${id}`,
    method: 'DELETE',
  });

const uomService = {
  getUoms,
  getUomById,
  createUom,
  updateUom,
  deleteUom,
};

export default uomService;
