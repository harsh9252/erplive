import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse } from './apiUtils';

const normalizeSerialPayload = (data = {}) => {
  return {
    item_id: Number(data.item_id),
    warehouse_id: data.warehouse_id ? Number(data.warehouse_id) : null,
    serial_number: data.serial_number,
    imei_number: data.imei_number || null,
    batch_id: data.batch_id ? Number(data.batch_id) : null,
    purchase_invoice_id: data.purchase_invoice_id ? Number(data.purchase_invoice_id) : null,
    warranty_period_months: data.warranty_period_months ? Number(data.warranty_period_months) : 0,
    warranty_start_date: data.warranty_start_date || null,
    warranty_end_date: data.warranty_end_date || null,
    remarks: data.remarks || '',
    status: data.status || 'IN_STOCK',
  };
};

const normalizeSerialUpdatePayload = (data = {}) => {
  const payload = {};
  if (data.status !== undefined) payload.status = data.status;
  if (data.customer_id !== undefined) payload.customer_id = data.customer_id ? Number(data.customer_id) : null;
  if (data.sales_invoice_id !== undefined) payload.sales_invoice_id = data.sales_invoice_id ? Number(data.sales_invoice_id) : null;
  if (data.sold_date !== undefined) payload.sold_date = data.sold_date || null;
  if (data.sold_rate !== undefined) payload.sold_rate = data.sold_rate ? Number(data.sold_rate) : 0;
  if (data.remarks !== undefined) payload.remarks = data.remarks || '';
  if (data.warranty_period_months !== undefined) payload.warranty_period_months = Number(data.warranty_period_months);
  if (data.warranty_start_date !== undefined) payload.warranty_start_date = data.warranty_start_date;
  if (data.warranty_end_date !== undefined) payload.warranty_end_date = data.warranty_end_date;
  
  return payload;
};

export const getSerials = async (page = 1, limit = 50, filters = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/serial-numbers',
      method: 'GET',
      params: cleanParams({ page, limit, ...filters }),
    })
  );

export const getSerialById = async (id) =>
  apiRequest({
    url: `/api/serial-numbers/${id}`,
    method: 'GET',
  });

export const lookupSerial = async (serialNumber) =>
  apiRequest({
    url: `/api/serial-numbers/lookup/${serialNumber}`,
    method: 'GET',
  });

export const createSerial = async (data) =>
  apiRequest({
    url: '/api/serial-numbers',
    method: 'POST',
    data: normalizeSerialPayload(data),
  });

export const updateSerial = async (id, data) =>
  apiRequest({
    url: `/api/serial-numbers/${id}`,
    method: 'PUT',
    data: normalizeSerialUpdatePayload(data),
  });

export const updateSerialStatus = async (id, status, remarks = '') =>
  apiRequest({
    url: `/api/serial-numbers/${id}/status`,
    method: 'PUT',
    data: { status, remarks }
  });

export const deleteSerial = async (id) =>
  apiRequest({
    url: `/api/serial-numbers/${id}`,
    method: 'DELETE',
  });

const serialService = {
  getSerials,
  getSerialById,
  lookupSerial,
  createSerial,
  updateSerial,
  updateSerialStatus,
  deleteSerial,
};

export default serialService;
