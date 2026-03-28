import api from './api.js';

class AttendanceApi {
  // Load attendance data - Daily basis
  async loadAttendance(params = {}) {
    try {
      const { start_date, end_date } = params;
      
      if (start_date && end_date && start_date === end_date) {
        console.log(`📅 Attendance API: Fetching daily attendance for ${start_date}`);
      } else if (start_date && end_date) {
        console.log(`📅 Attendance API: Fetching attendance from ${start_date} to ${end_date}`);
      } else {
        console.log('📅 Attendance API: Fetching attendance');
      }
      
      const result = await api.get('/attendance', params);
      console.log(`✅ Attendance API: Retrieved ${result?.length || 0} records`);
      return result;
    } catch (error) {
      console.error('❌ API: Error loading attendance:', error);
      throw error;
    }
  }

  // Save attendance record
  async saveAttendance(attendanceData) {
    try {
      console.log('AttendanceApi.saveAttendance called with:', attendanceData);
      const response = await api.post('/attendance', attendanceData);
      console.log('AttendanceApi.saveAttendance response:', response);
      return response;
    } catch (error) {
      console.error('API: Error saving attendance:', error);
      console.error('Error response data:', error.response?.data);
      throw error;
    }
  }

  // Get all attendance (admin only)
  async getAllAttendance(params = {}) {
    try {
      const { start_date, end_date } = params;
      
      if (start_date && end_date && start_date === end_date) {
        console.log(`📅 Attendance API: Fetching daily attendance for ${start_date}`);
      } else if (start_date && end_date) {
        console.log(`📅 Attendance API: Fetching attendance from ${start_date} to ${end_date}`);
      } else {
        console.log('📅 Attendance API: Fetching all attendance');
      }
      
      const result = await api.get('/attendance/all', params);
      console.log(`✅ Attendance API: Retrieved ${result?.length || 0} records`);
      return result;
    } catch (error) {
      console.error('❌ API: Error getting all attendance:', error);
      throw error;
    }
  }

  // Update attendance record
  async updateAttendanceRecord(attendanceId, attendanceData) {
    try {
      return await api.put(`/attendance/${attendanceId}`, attendanceData);
    } catch (error) {
      console.error('API: Error updating attendance:', error);
      throw error;
    }
  }

  // Delete attendance record
  async deleteAttendance(attendanceId) {
    try {
      return await api.delete(`/attendance/${attendanceId}`);
    } catch (error) {
      console.error('API: Error deleting attendance:', error);
      throw error;
    }
  }

  // Get week summary
  async getWeekSummary(weekStartDate) {
    try {
      return await api.get('/attendance/week-summary', { week_start_date: weekStartDate });
    } catch (error) {
      console.error('API: Error fetching week summary:', error);
      throw error;
    }
  }

  // Submit week
  async submitWeek(weekStartDate) {
    try {
      return await api.post('/attendance/submit-week', { week_start_date: weekStartDate });
    } catch (error) {
      console.error('API: Error submitting week:', error);
      throw error;
    }
  }

  // Get monthly report
  async getMonthlyReport(year, month) {
    try {
      return await api.get('/attendance/monthly-report', { year, month });
    } catch (error) {
      console.error('API: Error fetching monthly report:', error);
      throw error;
    }
  }

  // Get monthly report for all users (admin)
  async getMonthlyReportAllUsers(params) {
    try {
      const response = await api.get('/attendance/monthly-report-all-users', params);
      if (!response || !response.reports) {
        throw new Error('Invalid response format from server');
      }
      return response.reports;
    } catch (error) {
      console.error('API: Error getting monthly report for all users:', error);
      throw error;
    }
  }

  // Get quarterly report for all users (admin)
  async getQuarterlyReportAllUsers(params) {
    try {
      const response = await api.get('/attendance/quarterly-report-all-users', params);
      if (!response || !response.reports) {
        throw new Error('Invalid response format from server');
      }
      return response.reports;
    } catch (error) {
      console.error('API: Error getting quarterly report for all users:', error);
      throw error;
    }
  }

  // Get dashboard stats
  async getDashboardStats(userId = null) {
    try {
      const params = userId ? { user_id: userId } : {};
      return await api.get('/attendance/dashboard-stats', params);
    } catch (error) {
      console.error('API: Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // Check unlock status
  async checkUnlockStatus(userId, weekStartDate) {
    try {
      return await api.get('/attendance/unlock-status', { user_id: userId, week_start_date: weekStartDate });
    } catch (error) {
      console.error('API: Error checking unlock status:', error);
      throw error;
    }
  }
}

export default new AttendanceApi();
