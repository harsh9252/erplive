import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse, toDecimal, toNumberOrValue } from './apiUtils';

const normalizeProformaPayload = (data = {}) => {
  let subtotal = 0;
  let totalTax = 0;

  const items = (data.items || []).map((item) => {
    const qty = Number(item.qty || 0);
    const rate = Number(item.rate || 0);
    const discount_pct = Number((item.discount_pct ?? item.discountPct) || 0);
    const amount = qty * rate;
    const discount_amount = Number(((amount * discount_pct) / 100).toFixed(2));
    const taxable = amount - discount_amount;
    const gst_rate = Number((item.gst_rate ?? item.gstRate) || 0);
    const tax = (taxable * gst_rate) / 100;

    subtotal += taxable;
    totalTax += tax;

    return {
      item_id: Number(item.item_id ?? item.itemId),
      description: String(item.description || ''),
      qty,
      rate,
      discount_percent: discount_pct,
      discount_amount,
      gst_rate,
    };
  });

  const exactTotal = subtotal + totalTax;
  const netTotal = Math.round(exactTotal);
  const round_off = Number((netTotal - exactTotal).toFixed(2));

  return {
    customer_id: Number(data.customer_id ?? data.customerId),
    proforma_date: data.proforma_date ?? data.proformaDate,
    valid_until: data.valid_until ?? data.validUntil ?? null,
    place_of_supply: String((data.place_of_supply ?? data.placeOfSupply) || ''),
    notes: String(data.notes || ''),
    remarks: String(data.remarks || ''),
    terms_and_conditions: String((data.terms_and_conditions ?? data.termsAndConditions) || ''),
    round_off,
    items,
  };
};

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
