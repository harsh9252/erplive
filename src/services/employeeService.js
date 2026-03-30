import { apiRequest } from './apiClient';
import { cleanParams } from './apiUtils';

export const getEmployees = async (params = {}) =>
  apiRequest({
    url: '/api/payroll/employees',
    method: 'GET',
    params: cleanParams(params),
  });

export const getEmployee = async (id) =>
  apiRequest({
    url: `/api/payroll/employees/${id}`,
    method: 'GET',
  });

export const createEmployee = async (employeeData) =>
  apiRequest({
    url: '/api/payroll/employees',
    method: 'POST',
    data: employeeData,
  });

export const updateEmployee = async (id, employeeData) =>
  apiRequest({
    url: `/api/payroll/employees/${id}`,
    method: 'PUT',
    data: employeeData,
  });

export const deleteEmployee = async (id) =>
  apiRequest({
    url: `/api/payroll/employees/${id}`,
    method: 'DELETE',
  });

export const employeeService = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

export default employeeService;
