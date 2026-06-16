import { apiRequest } from './apiClient';
import { cleanParams } from './apiUtils';

export const getMaterialMovement = async (params = {}) =>
  apiRequest({
    url: '/api/manufacturing/material-movement',
    method: 'GET',
    params: cleanParams(params),
  });

const materialMovementService = {
  getMaterialMovement,
};

export default materialMovementService;
