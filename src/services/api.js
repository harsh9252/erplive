import apiClient, { apiRequest } from './apiClient';

/**
 * api.js - Central API Service Hub
 * This file acts as a legacy wrapper and a service hub for common API calls.
 * It satisfies both axios-style calls (e.g., api.get()) and high-level service calls.
 */

export const apiService = {
  // --- Attendance & Leaves ---
  
  /**
   * Get dashboard statistics for attendance
   */
  getDashboardStats: (userId = null) => 
    apiRequest({ 
      url: '/attendance/dashboard-stats', 
      method: 'GET', 
      params: userId ? { user_id: userId } : {} 
    }),

  /**
   * Get leave balance for a specific user
   */
  getLeaveBalance: (userId) => 
    apiRequest({ 
      url: `/attendance/leave-balance/${userId}`, 
      method: 'GET' 
    }),

  /**
   * Get list of users who are on leave today
   */
  getOnLeave: () => 
    apiRequest({ 
      url: '/attendance/on-leave', 
      method: 'GET' 
    }),

  /**
   * Get list of upcoming holidays
   */
  getUpcomingHolidays: (limit = 5) => 
    apiRequest({ 
      url: '/attendance/upcoming-holidays', 
      method: 'GET', 
      params: { limit } 
    }),

  /**
   * Get all leave requests (for admin)
   */
  getAllLeaves: () => 
    apiRequest({ 
      url: '/attendance/all-leaves', 
      method: 'GET' 
    }),

  // --- Users & Birthdays ---

  /**
   * Get upcoming birthdays
   */
  getUpcomingBirthdays: (limit = 30) => 
    apiRequest({ 
      url: '/users/upcoming-birthdays', 
      method: 'GET', 
      params: { limit } 
    }),

  /**
   * Get users directory (used for lookups)
   */
  getUsersDirectory: () => 
    apiRequest({ 
      url: '/users/directory', 
      method: 'GET' 
    }),

  // --- Employees ---

  /**
   * Create a new employee
   */
  createEmployee: (data) => 
    apiRequest({ 
      url: '/employees', 
      method: 'POST',
      data
    }),

  /**
   * Update an existing employee
   */
  updateEmployee: (id, data) => 
    apiRequest({ 
      url: `/employees/${id}`, 
      method: 'PUT',
      data
    }),

  /**
   * Delete an employee
   */
  deleteEmployee: (id) => 
    apiRequest({ 
      url: `/api/payroll/employees/${id}`, 
      method: 'DELETE' 
    }),

  // --- Axios Wrapper Methods ---
  // These satisfy files that use 'api.get', 'api.post', etc.
  
  get: (url, params, config = {}) => apiClient.get(url, { ...config, params }),
  post: (url, data, config = {}) => apiClient.post(url, data, config),
  put: (url, data, config = {}) => apiClient.put(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),
  patch: (url, data, config = {}) => apiClient.patch(url, data, config),
};

export default apiService;
