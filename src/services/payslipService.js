import { apiRequest } from './apiClient';
import { cleanParams } from './apiUtils';

export const getPayslips = async (params = {}) =>
  apiRequest({
    url: '/api/payroll/payslips',
    method: 'GET',
    params: cleanParams(params),
  });

export const generatePayslip = async (data) =>
  apiRequest({
    url: '/api/payroll/payslips/generate',
    method: 'POST',
    data,
  });

export const approvePayslip = async (id) =>
  apiRequest({
    url: `/api/payroll/payslips/${id}/approve`,
    method: 'POST',
  });

export const markPaidPayslip = async (id) =>
  apiRequest({
    url: `/api/payroll/payslips/${id}/mark-paid`,
    method: 'POST',
  });

const payslipService = {
  getPayslips,
  generatePayslip,
  approvePayslip,
  markPaidPayslip,
};

export default payslipService;
