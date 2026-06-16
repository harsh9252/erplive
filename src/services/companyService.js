import apiClient, { apiRequest } from './apiClient';

/**
 * Fetch current active company profile
 */
export const getCompanyProfile = async () => {
  return apiRequest({ method: 'get', url: '/api/company' });
};

// Alias for getCompanyProfile to support existing company-settings.jsx
export const getCurrentCompany = getCompanyProfile;

/**
 * Update company profile
 * @param {string|number} id Company ID
 * @param {Object} data Profile data
 */
export const updateCompanyProfile = async (id, data) => {
  return apiRequest({ method: 'put', url: `/api/company/${id}`, data });
};

// Alias for updateCompanyProfile to support existing companies.jsx
export const updateCompany = updateCompanyProfile;

/**
 * Get all companies accessible by the user
 */
export const getAccessibleCompanies = async () => {
  return apiRequest({ method: 'get', url: '/api/company/my-companies' });
};

// Alias for getAccessibleCompanies to support existing companies.jsx
export const getCompanies = getAccessibleCompanies;

/**
 * Switch the active company context
 * @param {string|number} companyId Target Company ID
 */
export const switchCompany = async (companyId) => {
  return apiRequest({ method: 'post', url: '/api/auth/switch-company', data: { company_id: companyId } });
};

/**
 * Create a new company (seeds default accounting data)
 * @param {Object} data Company creation data
 */
export const createCompany = async (data) => {
  return apiRequest({ method: 'post', url: '/api/company', data });
};

export const getCompanyById = async (id) => {
  return apiRequest({
    method: 'get',
    url: '/api/company',
    headers: {
      'x-company-id': String(id),
      'x-business-id': String(id)
    }
  });
};

export const updateCompanyStatus = async (id, isActive) => {
  return apiRequest({
    method: 'put',
    url: `/api/company/${id}`,
    headers: {
      'x-company-id': String(id),
      'x-business-id': String(id)
    },
    data: {
      is_active: isActive
    }
  });
};

export const getBusinessNatures = async () => {
  return apiRequest({ method: 'get', url: '/api/settings/business-natures' });
};

// Default export for backward compatibility with new pages
const companyService = {
  getCompanyProfile,
  getCurrentCompany,
  updateCompanyProfile,
  updateCompany,
  getAccessibleCompanies,
  getCompanies,
  switchCompany,
  createCompany,
  getCompanyById,
  updateCompanyStatus,
  getBusinessNatures
};

export default companyService;
