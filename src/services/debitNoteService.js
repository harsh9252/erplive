import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse, toDecimal, toNumberOrValue } from './apiUtils';

const normalizeDebitNotePayload = (data = {}) => ({
  vendor_id: toNumberOrValue(data.vendor_id ?? data.vendorId),
  debit_date: data.debit_date ?? data.debitDate,
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

export const getDebitNotes = async (page = 1, limit = 20, search = '', status = '') =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/debit-notes',
      method: 'GET',
      params: cleanParams({ page, limit, search, status: status === 'All' ? '' : status }),
    }),
  );

export const getDebitNoteById = async (id) =>
  apiRequest({
    url: `/api/debit-notes/${id}`,
    method: 'GET',
  });

export const createDebitNote = async (data) =>
  apiRequest({
    url: '/api/debit-notes',
    method: 'POST',
    data: normalizeDebitNotePayload(data),
  });

export const updateDebitNote = async (id, data) =>
  apiRequest({
    url: `/api/debit-notes/${id}`,
    method: 'PUT',
    data: normalizeDebitNotePayload(data),
  });

export const postDebitNote = async (id) =>
  apiRequest({
    url: `/api/debit-notes/${id}/post`,
    method: 'POST',
  });

export const cancelDebitNote = async (id) =>
  apiRequest({
    url: `/api/debit-notes/${id}/cancel`,
    method: 'POST',
  });

const debitNoteService = {
  getDebitNotes,
  getDebitNoteById,
  createDebitNote,
  updateDebitNote,
  postDebitNote,
  cancelDebitNote,
};

export default debitNoteService;
