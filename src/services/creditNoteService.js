import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse, toDecimal, toNumberOrValue } from './apiUtils';

const normalizeCreditNotePayload = (data = {}) => ({
  customer_id: toNumberOrValue(data.customer_id ?? data.customerId),
  credit_note_date: data.credit_note_date ?? data.credit_date ?? data.creditDate,
  sales_invoice_id: toNumberOrValue(data.sales_invoice_id ?? data.original_invoice_id ?? data.originalInvoiceId) || null,
  place_of_supply: data.place_of_supply || '',
  reason: data.reason || 'SALES_RETURN',
  remarks: data.remarks || '',
  invoice_layout: data.invoice_layout || 'PRODUCTS',
  items: (data.items || []).map((item) => ({
    item_id: toNumberOrValue(item.item_id ?? item.productId),
    description: item.description ?? '',
    qty: toDecimal(item.qty ?? item.quantity, 1),
    rate: toDecimal(item.rate),
    gst_rate: toDecimal(item.gst_rate ?? item.tax_rate),
    uom_id: toNumberOrValue(item.uom_id ?? item.uomId),
    hsn_code: item.hsn_code || '',
  })),
});

export const getCreditNotes = async (page = 1, limit = 20, search = '', status = '', customer_id = '', from_date = '', to_date = '') =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/credit-notes',
      method: 'GET',
      params: cleanParams({ page, limit, search, status: status === 'All' ? '' : status, customer_id, from_date, to_date }),
    }),
  );

export const getCreditNoteById = async (id) =>
  apiRequest({
    url: `/api/credit-notes/${id}`,
    method: 'GET',
  });

export const createCreditNote = async (data) =>
  apiRequest({
    url: '/api/credit-notes',
    method: 'POST',
    data: normalizeCreditNotePayload(data),
  });

export const updateCreditNote = async (id, data) =>
  apiRequest({
    url: `/api/credit-notes/${id}`,
    method: 'PUT',
    data: normalizeCreditNotePayload(data),
  });

export const postCreditNote = async (id) =>
  apiRequest({
    url: `/api/credit-notes/${id}/post`,
    method: 'POST',
  });

export const cancelCreditNote = async (id) =>
  apiRequest({
    url: `/api/credit-notes/${id}/cancel`,
    method: 'POST',
  });

const creditNoteService = {
  getCreditNotes,
  getCreditNoteById,
  createCreditNote,
  updateCreditNote,
  postCreditNote,
  cancelCreditNote,
};

export default creditNoteService;
