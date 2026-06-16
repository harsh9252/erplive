import { apiRequest } from "./apiClient";
import { cleanParams } from "./apiUtils";

export const getPayslips = async (params = {}) =>
  apiRequest({
    url: "/api/payroll/payslips",
    method: "GET",
    params: cleanParams(params),
  });

export const getPayslipById = async (id) =>
  apiRequest({
    url: `/api/payroll/payslips/${id}`,
    method: "GET",
  });

export const generatePayslip = async (data) =>
  apiRequest({
    url: "/api/payroll/payslips/generate",
    method: "POST",
    data,
  });

export const approvePayslip = async (id) =>
  apiRequest({
    url: `/api/payroll/payslips/${id}/approve`,
    method: "POST",
  });

export const markPaidPayslip = async (id, data = {}) => {
  if (!data.payment_date) {
    data.payment_date = new Date().toISOString().split("T")[0];
  }
  return apiRequest({
    url: `/api/payroll/payslips/${id}/mark-paid`,
    method: "POST",
    data,
  });
};

const payslipService = {
  getPayslips,
  getPayslipById,
  generatePayslip,
  approvePayslip,
  markPaidPayslip,
};

export default payslipService;
