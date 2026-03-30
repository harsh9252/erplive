import { apiRequest } from './apiClient';
import { cleanParams } from './apiUtils';

export const getEmployeeAttendance = async (employeeId, month, year) =>
  apiRequest({
    url: `/api/payroll/attendance`,
    method: 'GET',
    params: cleanParams({ employee_id: employeeId, month, year }),
  });

export const markAttendance = async (data) =>
  apiRequest({
    url: '/api/payroll/attendance',
    method: 'POST',
    data,
  });

export const markBulkAttendance = async (data) =>
  apiRequest({
    url: '/api/payroll/attendance/bulk',
    method: 'POST',
    data,
  });

export const getAllAttendance = async (params) =>
  apiRequest({
    url: '/api/payroll/attendance',
    method: 'GET',
    params: cleanParams(params),
  });

export const attendanceService = {
  getEmployeeAttendance,
  getAllAttendance,
  markAttendance,
  markBulkAttendance,
};

export default attendanceService;
