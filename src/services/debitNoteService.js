import { apiRequest } from "./apiClient";
import {
  cleanParams,
  normalizeListResponse,
  toDecimal,
  toNumberOrValue,
} from "./apiUtils";

const normalizeDebitNotePayload = (data = {}) => ({
  vendor_id: toNumberOrValue(data.vendor_id ?? data.vendorId),
  debit_note_date: data.debit_note_date ?? data.debit_date ?? data.debitDate,
  purchase_invoice_id:
    toNumberOrValue(data.purchase_invoice_id ?? data.original_invoice_id ?? data.originalInvoiceId) || null,
  reason: data.reason || "",
  place_of_supply: data.place_of_supply || "",
  remarks: data.remarks || "",
  items: (data.items || []).map((item) => ({
    item_id: toNumberOrValue(item.item_id ?? item.productId),
    description: item.description ?? "",
    qty: toDecimal(item.qty ?? item.quantity, 1),
    rate: toDecimal(item.rate),
    gst_rate: toDecimal(item.gst_rate ?? item.tax_rate),
    uom_id: toNumberOrValue(item.uom_id ?? item.uomId),
    hsn_code: item.hsn_code || "",
  })),
});

export const getDebitNotes = async (
  page = 1,
  limit = 20,
  search = "",
  status = "",
  vendor_id = "",
  from_date = "",
  to_date = "",
) =>
  normalizeListResponse(
    await apiRequest({
      url: "/api/debit-notes",
      method: "GET",
      params: cleanParams({
        page,
        limit,
        search,
        status: status === "All" ? "" : status,
        vendor_id,
        from_date,
        to_date,
      }),
    }),
  );

export const getDebitNoteById = async (id) =>
  apiRequest({
    url: `/api/debit-notes/${id}`,
    method: "GET",
  });

export const createDebitNote = async (data) =>
  apiRequest({
    url: "/api/debit-notes",
    method: "POST",
    data: normalizeDebitNotePayload(data),
  });

export const updateDebitNote = async (id, data) =>
  apiRequest({
    url: `/api/debit-notes/${id}`,
    method: "PUT",
    data: normalizeDebitNotePayload(data),
  });

export const postDebitNote = async (id) =>
  apiRequest({
    url: `/api/debit-notes/${id}/post`,
    method: "POST",
  });

export const cancelDebitNote = async (id) =>
  apiRequest({
    url: `/api/debit-notes/${id}/cancel`,
    method: "POST",
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
