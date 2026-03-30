import apiClient from './apiClient';

// Get all GSTR returns
export const getGSTRReturns = async (type, period, financialYear) => {
  try {
    const response = await apiClient.get('/api/gstr/returns', {
      params: { type, period, financialYear }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching GSTR returns:', error);
    throw error;
  }
};

// Get GSTR return by ID
export const getGSTRReturnById = async (id) => {
  try {
    const response = await apiClient.get(`/api/gstr/returns/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GSTR return:', error);
    throw error;
  }
};

// Create new GSTR return
export const createGSTRReturn = async (data) => {
  try {
    const response = await apiClient.post('/api/gstr/returns', data);
    return response.data;
  } catch (error) {
    console.error('Error creating GSTR return:', error);
    throw error;
  }
};

// Update GSTR return
export const updateGSTRReturn = async (id, data) => {
  try {
    const response = await apiClient.put(`/api/gstr/returns/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating GSTR return:', error);
    throw error;
  }
};

// Save as draft
export const saveAsDraft = async (data) => {
  try {
    const response = await apiClient.post('/api/gstr/draft', data);
    return response.data;
  } catch (error) {
    console.error('Error saving draft:', error);
    throw error;
  }
};

// Validate GSTR return
export const validateGSTRReturn = async (data) => {
  try {
    const response = await apiClient.post('/api/gstr/validate', data);
    return response.data;
  } catch (error) {
    console.error('Error validating GSTR return:', error);
    throw error;
  }
};

// File GSTR return
export const fileGSTRReturn = async (data) => {
  try {
    const response = await apiClient.post('/api/gstr/file', data);
    return response.data;
  } catch (error) {
    console.error('Error filing GSTR return:', error);
    throw error;
  }
};

// Download JSON
export const downloadJSON = async (id) => {
  try {
    const response = await apiClient.get(`/api/gstr/download/${id}`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading JSON:', error);
    throw error;
  }
};

// Get section data
export const getSectionData = async (returnId, sectionCode) => {
  try {
    const response = await apiClient.get(`/api/gstr/section/${returnId}/${sectionCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching section data:', error);
    throw error;
  }
};

// Update section data
export const updateSectionData = async (returnId, sectionCode, data) => {
  try {
    const response = await apiClient.put(`/api/gstr/section/${returnId}/${sectionCode}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating section data:', error);
    throw error;
  }
};

// Get invoices for GSTR
export const getInvoicesForGSTR = async (type, period) => {
  try {
    const response = await apiClient.get('/api/gstr/invoices', {
      params: { type, period }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};
