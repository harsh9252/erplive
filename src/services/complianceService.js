import apiClient from './apiClient';

const complianceService = {
  // TDS Master
  getTDSRules: async (params = {}) => {
    const response = await apiClient.get('/api/compliance/tds-master', { params });
    return response.data;
  },

  createTDSRule: async (data) => {
    const response = await apiClient.post('/api/compliance/tds-master', data);
    return response.data;
  },

  updateTDSRule: async (id, data) => {
    const response = await apiClient.put(`/api/compliance/tds-master/${id}`, data);
    return response.data;
  },

  deleteTDSRule: async (id) => {
    const response = await apiClient.delete(`/api/compliance/tds-master/${id}`);
    return response.data;
  },

  // TCS Master
  getTCSRules: async (params = {}) => {
    const response = await apiClient.get('/api/compliance/tcs-master', { params });
    return response.data;
  },

  createTCSRule: async (data) => {
    const response = await apiClient.post('/api/compliance/tcs-master', data);
    return response.data;
  },

  updateTCSRule: async (id, data) => {
    const response = await apiClient.put(`/api/compliance/tcs-master/${id}`, data);
    return response.data;
  },

  deleteTCSRule: async (id) => {
    const response = await apiClient.delete(`/api/compliance/tcs-master/${id}`);
    return response.data;
  },

  // Tax Rate History (TDS/TCS)
  getTaxRateHistory: async (type, id) => {
    const response = await apiClient.get(`/api/compliance/${type.toLowerCase()}-master/${id}/rates`);
    return response.data;
  },

  createTaxRateHistory: async (type, id, data) => {
    const response = await apiClient.post(`/api/compliance/${type.toLowerCase()}-master/${id}/rates`, data);
    return response.data;
  },
};

export default complianceService;
