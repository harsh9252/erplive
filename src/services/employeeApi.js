import config from '../config/config.js';

class EmployeeApi {
  constructor() {
    // Use the configured backend URL
    const baseUrl = config.api.baseUrl ? `${config.api.baseUrl}/api/employees` : '/api/employees';
    this.apiBase = baseUrl;
    console.log('EmployeeApi initialized with base URL:', this.apiBase);
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Initialize new employee
  async initializeNewEmployee() {
    try {
      const response = await fetch(`${this.apiBase}/initialize`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error('API: Error initializing new employee:', error);
      throw error;
    }
  }

  // Initialize edit employee
  async initializeEditEmployee(employeeId) {
    try {
      const response = await fetch(`${this.apiBase}/${employeeId}/edit`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error('API: Error initializing edit employee:', error);
      throw error;
    }
  }

  // Submit employee
  async submitEmployee(employeeData) {
    try {
      const response = await fetch(`${this.apiBase}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(employeeData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      // Return the full response so the form can access success, data, and message
      return result;
    } catch (error) {
      console.error('API: Error submitting employee:', error);
      throw error;
    }
  }

  // Update employee
  async updateEmployee(employeeId, employeeData) {
    try {
      const response = await fetch(`${this.apiBase}/${employeeId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(employeeData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      // Return the full response so the form can access success, data, and message
      return result;
    } catch (error) {
      console.error('API: Error updating employee:', error);
      throw error;
    }
  }

  // Get employee by ID
  async getEmployeeById(employeeId) {
    try {
      const response = await fetch(`${this.apiBase}/${employeeId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error('API: Error getting employee by ID:', error);
      throw error;
    }
  }

  // Get employees directory
  async getEmployeesDirectory() {
    try {
      const response = await fetch(`${this.apiBase}/directory`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error('API: Error getting employees directory:', error);
      throw error;
    }
  }

  // Get employee options
  async getEmployeeOptions() {
    try {
      const response = await fetch(`${this.apiBase}/options`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error('API: Error getting employee options:', error);
      throw error;
    }
  }

  // Handle profile image upload
  async handleProfileImage(file) {
    try {
      const formData = new FormData();
      formData.append('profile_image', file);

      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

      const response = await fetch(`${this.apiBase}/upload-image`, {
        method: 'POST',
        headers,
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error('API: Error uploading profile image:', error);
      throw error;
    }
  }

  // Validate employee form
  async validateEmployeeForm(employeeData) {
    try {
      const response = await fetch(`${this.apiBase}/validate`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(employeeData),
      });
      return await response.json();
    } catch (error) {
      console.error('API: Error validating employee form:', error);
      throw error;
    }
  }

  // Reset employee form
  async resetEmployeeForm() {
    try {
      const response = await fetch(`${this.apiBase}/reset`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error('API: Error resetting employee form:', error);
      throw error;
    }
  }
}

export default new EmployeeApi();