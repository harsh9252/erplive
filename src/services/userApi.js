class UserApi {
  constructor() {
    this.apiBase = '/api/users'; // This should match the backend route
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('token');
  }

  // Get headers with auth token
  getHeaders() {
    const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Load users
  async loadUsers() {
    try {
      const response = await fetch(`${this.apiBase}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API: Error loading users:', error);
      throw error;
    }
  }

  // Create user
  async createUser(userData) {
    try {
      const response = await fetch(`${this.apiBase}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.error || 'Failed to create user');
        error.response = { status: response.status, data };
        throw error;
      }
      return data;
    } catch (error) {
      console.error('API: Error creating user:', error);
      throw error;
    }
  }

  // Update user
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${this.apiBase}/${userId}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.error || 'Failed to update user');
        error.response = { status: response.status, data };
        throw error;
      }
      return data;
    } catch (error) {
      console.error('API: Error updating user:', error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      const response = await fetch(`${this.apiBase}/${userId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.error || 'Failed to delete user');
        error.response = { status: response.status, data };
        throw error;
      }
      return data;
    } catch (error) {
      console.error('API: Error deleting user:', error);
      throw error;
    }
  }

  // Get user by ID
  async getUserById(userId) {
    try {
      const response = await fetch(`${this.apiBase}/${userId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API: Error getting user by ID:', error);
      throw error;
    }
  }

  // Get users directory
  async getUsersDirectory() {
    try {
      const response = await fetch(`${this.apiBase}/directory`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API: Error getting users directory:', error);
      throw error;
    }
  }
}

export default new UserApi();