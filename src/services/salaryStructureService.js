import { apiRequest } from './apiClient';
import { cleanParams } from './apiUtils';

export const getSalaryStructure = async (employeeId) =>
  apiRequest({
    url: `/api/payroll/employees/${employeeId}/salary-structure`,
    method: 'GET',
  });

export const saveSalaryStructure = async (data) =>
  apiRequest({
    url: '/api/payroll/salary-structure',
    method: 'POST',
    data,
  });

const salaryStructureService = {
  getSalaryStructure,
  saveSalaryStructure,
};

export default salaryStructureService;
