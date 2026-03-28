import config from '../config/config';

// API Service with centralized configuration
class ApiService {
  constructor() {
    this.timeout = config.api.timeout;
    this.requestQueue = new Map();
    this.cache = new Map();
    this.minRequestInterval = 1000; // 1 second between same endpoint calls
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
  }

  // Dynamic baseUrl method for runtime evaluation
  getBaseUrl() {
    // Use the configured backend URL directly for production
    // Falls back to /api for development (Vite proxy)
    const baseUrl = config.api.baseUrl ? `${config.api.baseUrl}/api` : '/api';
    console.log('API URL:', baseUrl);
    console.log('Frontend port:', config.app.port);
    console.log('Backend target:', config.api.baseUrl);
    return baseUrl;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Sanitize data to prevent circular references and non-serializable objects
  sanitizeData(obj, seen = new WeakSet()) {
    if (obj === null || obj === undefined) return obj;
    
    // Handle primitives
    if (typeof obj !== 'object') return obj;
    
    // Prevent circular references
    if (seen.has(obj)) {
      console.warn('Circular reference detected, skipping:', obj);
      return undefined;
    }
    
    seen.add(obj);
    
    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeData(item, seen));
    }
    
    // Handle objects
    const sanitized = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        
        // Skip DOM elements, React elements, functions, and symbols
        if (value instanceof HTMLElement || 
            value instanceof Node ||
            typeof value === 'function' ||
            typeof value === 'symbol' ||
            (value && value.$$typeof)) { // React element check
          console.warn(`Skipping non-serializable property "${key}":`, typeof value);
          continue;
        }
        
        sanitized[key] = this.sanitizeData(value, seen);
      }
    }
    
    return sanitized;
  }

  // Generic fetch method with error handling
  async request(endpoint, options = {}) {
    const url = `${this.getBaseUrl()}${endpoint}`;
    console.log('API Request URL:', url); // Debug logging

    // List of endpoints that should NOT be cached (real-time data)
    const noCacheEndpoints = [
      '/attendance',
      '/attendance/all',
      '/attendance/dashboard-stats',
      '/notifications',
      '/leave/all',
      '/leave/on-leave',
      '/users/names'
    ];

    // Check if endpoint matches any no-cache endpoint (exact or prefix match)
    const shouldCache = !noCacheEndpoints.some(ep => {
      if (endpoint === ep) return true;
      if (endpoint.startsWith(ep + '?')) return true;
      if (endpoint.startsWith(ep + '/')) return true;
      return false;
    });

    // Invalidate cache for POST/PUT/DELETE requests to attendance endpoints
    if (options.method === 'POST' || options.method === 'PUT' || options.method === 'DELETE') {
      if (endpoint === '/attendance' || endpoint.startsWith('/attendance/')) {
        console.log('Invalidating attendance cache after write operation');
        const cacheKeysToRemove = [];
        for (const key of this.cache.keys()) {
          if (key.includes('/attendance') || key.includes('/attendance/all')) {
            cacheKeysToRemove.push(key);
          }
        }
        cacheKeysToRemove.forEach(key => this.cache.delete(key));
      }
    }

    // Check cache first for GET requests (only if caching is allowed)
    if ((options.method === 'GET' || !options.method) && shouldCache) {
      const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
        console.log('Returning cached response for:', endpoint);
        return cached.data;
      }
    }

    // Implement request debouncing
    const now = Date.now();
    const lastRequest = this.requestQueue.get(endpoint);
    
    if (lastRequest && (now - lastRequest) < this.minRequestInterval) {
      console.log(`Debouncing request for: ${endpoint}, waiting ${this.minRequestInterval}ms`);
      await new Promise(resolve => setTimeout(resolve, this.minRequestInterval));
    }
    
    this.requestQueue.set(endpoint, now);

    const defaultOptions = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, defaultOptions);

      if (!response.ok) {
        // Try to get error data from response
        let errorMessage = `HTTP error! status: ${response.status}`;
        let errorData = null;

        try {
          errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          }
          // Handle validation errors with details array
          if (errorData.details && Array.isArray(errorData.details) && errorData.details.length > 0) {
            errorMessage = errorData.details.map(d => `${d.param}: ${d.msg}`).join(', ');
            console.error('Validation details:', errorData.details);
          }
          // Handle validation errors with errors array
          if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
            errorMessage = errorData.errors.join(', ');
          } 
          // Handle validation errors with errors object
          else if (errorData.errors && typeof errorData.errors === 'object') {
            errorMessage = Object.entries(errorData.errors)
              .map(([field, message]) => `${field}: ${message}`)
              .join(', ');
            console.error('Validation errors:', errorData.errors);
          } 
          else if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          // If we can't parse the error response, use status-based messages
          switch (response.status) {
            case 400:
              errorMessage = 'Invalid request. Please check your input.';
              break;
            case 401:
              errorMessage = 'Invalid credentials. Please check your username and password.';
              break;
            case 403:
              errorMessage = 'Access denied. You do not have permission to perform this action.';
              break;
            case 404:
              errorMessage = 'The requested resource was not found.';
              break;
            case 409:
              errorMessage = 'This action conflicts with existing data.';
              break;
            case 422:
              errorMessage = 'Validation failed. Please check your input.';
              break;
            case 429:
              errorMessage = 'Too many requests. Please try again later.';
              break;
            case 500:
              errorMessage = 'Server error. Please try again later.';
              break;
            default:
              errorMessage = 'An unexpected error occurred. Please try again.';
          }
        }

        // Create error with response data attached
        const error = new Error(errorMessage);
        error.response = { data: errorData, status: response.status };
        throw error;
      }

      const responseData = await response.json();
      
      // Cache GET responses (only if caching is allowed)
      if ((options.method === 'GET' || !options.method) && shouldCache) {
        const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
        this.cache.set(cacheKey, { 
          data: responseData, 
          timestamp: Date.now() 
        });
      }
      
      return responseData;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Generic HTTP methods
  async get(endpoint, params = {}) {
    const queryString = Object.keys(params).length > 0
      ? '?' + new URLSearchParams(params).toString()
      : '';
    return this.request(`${endpoint}${queryString}`, {
      method: 'GET'
    });
  }

  async post(endpoint, data = {}) {
    // Sanitize data to prevent circular references
    const sanitizedData = this.sanitizeData(data);
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(sanitizedData)
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async forgotPassword(emailData) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(emailData)
    });
  }

  async resetPassword(token, newPassword) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ 
        token: token,
        email: localStorage.getItem('reset_email') || '', // Get email from localStorage
        new_password: newPassword 
      })
    });
  }

  async changePassword(passwordData) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData)
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Task endpoints
  async getTasks(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/tasks?${queryString}` : '/tasks';
    return this.request(endpoint);
  }

  async getTaskById(id) {
    return this.request(`/tasks/${id}`);
  }

  async createTask(taskData) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData)
    });
  }

  async updateTask(id, taskData) {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData)
    });
  }

  async deleteTask(id) {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE'
    });
  }

  async getNextTaskNumber() {
    return this.request('/tasks/next-number');
  }

  // Comment endpoints
  async getCommentsByTask(taskId) {
    return this.request(`/comments/task/${taskId}`);
  }

  async createComment(commentData) {
    return this.request('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData)
    });
  }

  async updateComment(id, commentData) {
    return this.request(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(commentData)
    });
  }

  async deleteComment(id) {
    return this.request(`/comments/${id}`, {
      method: 'DELETE'
    });
  }

  // User endpoints
  async getUsers() {
    return this.request('/users');
  }

  async getEmployees() {
    return this.request('/employees');
  }

  async createEmployee(employeeData) {
    return this.request('/employees', {
      method: 'POST',
      body: JSON.stringify(employeeData)
    });
  }

  async updateEmployee(id, employeeData) {
    return this.request(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employeeData)
    });
  }

  async getPublicDirectory() {
    return this.request('/users/directory');
  }

  async getUserById(id) {
    return this.request(`/users/${id}`);
  }

  async checkUserDeletion(id) {
    return this.request(`/users/${id}/check-deletion`);
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE'
    });
  }

  // Lead endpoints
  async getLeads() {
    return this.request('/leads');
  }

  async createLead(leadData) {
    return this.request('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData)
    });
  }

  async updateLead(id, leadData) {
    return this.request(`/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(leadData)
    });
  }

  async deleteLead(id) {
    return this.request(`/leads/${id}`, {
      method: 'DELETE'
    });
  }

  // Notification endpoints
  async getNotifications() {
    return this.request('/notifications');
  }

  async getUnreadNotificationCount() {
    return this.request('/notifications/unread-count');
  }

  async markNotificationAsRead(notificationId) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT'
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/mark-all-read', {
      method: 'PUT'
    });
  }

  async deleteNotification(notificationId) {
    return this.request(`/notifications/${notificationId}`, {
      method: 'DELETE'
    });
  }

  async deleteNotificationsByRelatedId(relatedId, type) {
    return this.request(`/notifications/by-related/${relatedId}/${type}`, {
      method: 'DELETE'
    });
  }

  // Leave balance
  async getLeaveBalance(userId) {
    return this.request(`/leave/balance/${userId}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Attendance endpoints
  async markAttendance(attendanceData) {
    return this.request('/attendance', {
      method: 'POST',
      body: JSON.stringify(attendanceData)
    });
  }

  async getAttendance(params) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/attendance?${queryString}`);
  }

  async getAllAttendance(params) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/attendance/all?${queryString}`);
  }

  async getWeekSummary(params) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/attendance/week-summary?${queryString}`);
  }

  async submitWeek(data) {
    return this.request('/attendance/submit-week', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async deleteAttendance(id) {
    return this.request(`/attendance/${id}`, {
      method: 'DELETE'
    });
  }

  async getMonthlyReport(params) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/attendance/monthly-report?${queryString}`);
  }

  async getMonthlyReportAllUsers(params) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/attendance/monthly-report-all-users?${queryString}`);
  }

  async getQuarterlyReportAllUsers(params) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/attendance/quarterly-report-all-users?${queryString}`);
  }

  async getDashboardStats(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/attendance/dashboard-stats?${queryString}`);
  }



  async getUserRecentActivity() {
    return this.request('/attendance/user-recent-activity');
  }

  // Leave endpoints
  async getAllLeaves() {
    return this.request('/leave/all');
  }

  async reviewLeave(id, status, notes = '') {
    return this.request(`/leave/review/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes })
    });
  }

  // Accessories endpoints
  async createAccessory(data) {
    return this.request('/accessories', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getUserAccessories(userId) {
    return this.request(`/accessories/user/${userId}`);
  }

  async updateAccessory(id, data) {
    return this.request(`/accessories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteAccessory(id) {
    return this.request(`/accessories/${id}`, {
      method: 'DELETE'
    });
  }

  // Salary Increment endpoints
  async createSalaryIncrement(data) {
    return this.request('/salary-increment', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getSalaryIncrements(employeeId) {
    return this.request(`/salary-increment/employee/${employeeId}`);
  }

  // Promotion History endpoints
  async createPromotion(data) {
    return this.request('/promotion-history', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getPromotions(employeeId) {
    return this.request(`/promotion-history/employee/${employeeId}`);
  }

  // Project endpoints
  async getProjects() {
    return this.request('/projects');
  }

  async getProjectById(id) {
    return this.request(`/projects/${id}?t=${Date.now()}`);
  }

  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  }

  async updateProject(id, projectData) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData)
    });
  }

  async deleteProject(id) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE'
    });
  }

  async getProjectPayments(id) {
    return this.request(`/projects/${id}/payments`);
  }

  async addProjectPayment(id, paymentData) {
    return this.request(`/projects/${id}/payments`, {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  }

  async getProjectReports(id, type) {
    return this.request(`/projects/${id}/reports?type=${encodeURIComponent(type)}`);
  }

  async addWebDevReport(projectId, data) {
    return this.request(`/projects/${projectId}/web-dev-reports`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateWebDevReport(reportId, data) {
    return this.request(`/projects/web-dev-reports/${reportId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteWebDevReport(reportId) {
    return this.request(`/projects/web-dev-reports/${reportId}`, {
      method: 'DELETE'
    });
  }

  async addDMReport(projectId, data) {
    return this.request(`/projects/${projectId}/dm-reports`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateDMReport(reportId, data) {
    return this.request(`/projects/dm-reports/${reportId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // Holiday endpoints
  async getHolidays() {
    return this.request('/holidays/all');
  }

  async getUpcomingHolidays(limit = 5) {
    return this.request(`/holidays/upcoming?limit=${limit}`);
  }

  // Birthday endpoints
  async getUpcomingBirthdays(days = 30) {
    return this.request(`/users/birthdays/upcoming?days=${days}`);
  }

  async createHoliday(data) {
    return this.request('/holidays/create', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateHoliday(id, data) {
    return this.request(`/holidays/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteHoliday(id) {
    return this.request(`/holidays/${id}`, {
      method: 'DELETE'
    });
  }

  // Leave additional endpoints
  async getOnLeave() {
    return this.request('/leave/on-leave');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;