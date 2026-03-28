import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse, toDecimal, toNumberOrValue } from './apiUtils';

const normalizeProformaPayload = (data = {}) => ({
  customer_id: toNumberOrValue(data.customer_id ?? data.customerId),
  proforma_date: data.proforma_date ?? data.proformaDate,
  valid_until: data.valid_until ?? data.validUntil ?? null,
  place_of_supply: data.place_of_supply ?? data.placeOfSupply,
  notes: data.notes || '',
  remarks: data.remarks || '',
  terms_and_conditions: data.terms_and_conditions ?? data.termsAndConditions ?? '',
  items: (data.items || []).map((item) => ({
    item_id: toNumberOrValue(item.item_id ?? item.itemId),
    description: item.description || '',
    qty: toDecimal(item.qty),
    rate: toDecimal(item.rate),
    discount_pct: toDecimal(item.discount_pct ?? item.discountPct),
    gst_rate: toDecimal(item.gst_rate ?? item.gstRate),
  })),
});

export const getProformaInvoices = async (params = {}) => {
  return normalizeListResponse(
    await apiRequest({
      url: '/api/proforma-invoices',
      method: 'GET',
      params: cleanParams(params),
    }),
  );
};

export const getProformaInvoiceById = async (id) =>
  apiRequest({
    url: `/api/proforma-invoices/${id}`,
    method: 'GET',
  });

export const createProformaInvoice = async (data) =>
  apiRequest({
    url: '/api/proforma-invoices',
    method: 'POST',
    data: normalizeProformaPayload(data),
  });

export const updateProformaInvoice = async (id, data) =>
  apiRequest({
    url: `/api/proforma-invoices/${id}`,
    method: 'PUT',
    data: normalizeProformaPayload(data),
  });

export const deleteProformaInvoice = async (id) =>
  apiRequest({
    url: `/api/proforma-invoices/${id}`,
    method: 'DELETE',
  });

// Lifecycle Actions
export const sendProforma = async (id) =>
  apiRequest({
    url: `/api/proforma-invoices/${id}/send`,
    method: 'POST',
  });

export const acceptProforma = async (id) =>
  apiRequest({
    url: `/api/proforma-invoices/${id}/accept`,
    method: 'POST',
  });

export const rejectProforma = async (id, reason) =>
  apiRequest({
    url: `/api/proforma-invoices/${id}/reject`,
    method: 'POST',
    data: { reason },
  });

export const convertToInvoice = async (id) =>
  apiRequest({
    url: `/api/proforma-invoices/${id}/convert`,
    method: 'POST',
  });

const proformaInvoiceService = {
  getProformaInvoices,
  getProformaInvoiceById,
  createProformaInvoice,
  updateProformaInvoice,
  deleteProformaInvoice,
  sendProforma,
  acceptProforma,
  rejectProforma,
  convertToInvoice,
};

export default proformaInvoiceService;
