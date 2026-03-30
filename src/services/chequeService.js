import { apiRequest } from './apiClient';
import { cleanParams } from './apiUtils';

export const getCheques = async (params = {}) =>
  apiRequest({
    url: '/api/cheques',
    method: 'GET',
    params: cleanParams(params),
  });

export const getDueSoon = async (days = 7) =>
  apiRequest({
    url: `/api/cheques/due-soon?days=${days}`,
    method: 'GET',
  });

export const createCheque = async (data) =>
  apiRequest({
    url: '/api/cheques',
    method: 'POST',
    data,
  });

export const clearCheque = async (id, data) =>
  apiRequest({
    url: `/api/cheques/${id}/clear`,
    method: 'POST',
    data,
  });

export const bounceCheque = async (id, data) =>
  apiRequest({
    url: `/api/cheques/${id}/bounce`,
    method: 'POST',
    data,
  });

export const cancelCheque = async (id) =>
  apiRequest({
    url: `/api/cheques/${id}/cancel`,
    method: 'POST',
  });

const chequeService = {
  getCheques,
  getDueSoon,
  createCheque,
  clearCheque,
  bounceCheque,
  cancelCheque,
};

export default chequeService;
