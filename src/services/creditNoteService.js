import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse, toDecimal, toNumberOrValue } from './apiUtils';

const normalizeCreditNotePayload = (data = {}) => ({
  customer_id: toNumberOrValue(data.customer_id ?? data.customerId),
  credit_date: data.credit_date ?? data.creditDate,
  original_invoice_id: toNumberOrValue(data.original_invoice_id ?? data.originalInvoiceId) || null,
  place_of_supply: data.place_of_supply || '',
  remarks: data.remarks || '',
  items: (data.items || []).map((item) => ({
    item_id: toNumberOrValue(item.item_id ?? item.productId),
    description: item.description ?? '',
    qty: toDecimal(item.qty ?? item.quantity, 1),
    rate: toDecimal(item.rate),
    gst_rate: toDecimal(item.gst_rate ?? item.tax_rate),
    hsn_code: item.hsn_code || '',
  })),
});

export const getCreditNotes = async (page = 1, limit = 20, search = '', status = '') =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/credit-notes',
      method: 'GET',
      params: cleanParams({ page, limit, search, status: status === 'All' ? '' : status }),
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
