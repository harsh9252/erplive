import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

// Get all GSTR returns
export const getGSTRReturns = async (type, period, financialYear) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gstr/returns`, {
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
    const response = await axios.get(`${API_BASE_URL}/gstr/returns/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GSTR return:', error);
    throw error;
  }
};

// Create new GSTR return
export const createGSTRReturn = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gstr/returns`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating GSTR return:', error);
    throw error;
  }
};

// Update GSTR return
export const updateGSTRReturn = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/gstr/returns/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating GSTR return:', error);
    throw error;
  }
};

// Save as draft
export const saveAsDraft = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gstr/draft`, data);
    return response.data;
  } catch (error) {
    console.error('Error saving draft:', error);
    throw error;
  }
};

// Validate GSTR return
export const validateGSTRReturn = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gstr/validate`, data);
    return response.data;
  } catch (error) {
    console.error('Error validating GSTR return:', error);
    throw error;
  }
};

// File GSTR return
export const fileGSTRReturn = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gstr/file`, data);
    return response.data;
  } catch (error) {
    console.error('Error filing GSTR return:', error);
    throw error;
  }
};

// Download JSON
export const downloadJSON = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gstr/download/${id}`, {
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
    const response = await axios.get(`${API_BASE_URL}/gstr/section/${returnId}/${sectionCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching section data:', error);
    throw error;
  }
};

// Update section data
export const updateSectionData = async (returnId, sectionCode, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/gstr/section/${returnId}/${sectionCode}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating section data:', error);
    throw error;
  }
};

// Get invoices for GSTR
export const getInvoicesForGSTR = async (type, period) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gstr/invoices`, {
      params: { type, period }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};
