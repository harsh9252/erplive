import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse, toDecimal, toNumberOrValue } from './apiUtils';

const normalizePurchaseInvoicePayload = (data = {}) => ({
  vendor_id: toNumberOrValue(data.vendor_id ?? data.vendorId),
  invoice_date: data.invoice_date ?? data.purchase_date ?? data.invoiceDate,
  due_date: data.due_date ?? data.dueDate ?? null,
  invoice_number:
    data.invoice_number ?? data.reference_number ?? data.purchase_number ?? '',
  financial_year_id:
    toNumberOrValue(data.financial_year_id ?? data.financialYearId) ?? undefined,
  place_of_supply: data.place_of_supply ?? data.placeOfSupply,
  reverse_charge: Boolean(data.reverse_charge ?? data.reverseCharge),
  remarks: data.remarks ?? data.notes ?? '',
  terms_and_conditions: data.terms_and_conditions ?? data.terms ?? '',
  items: (data.items || []).map((item) => ({
    item_id: toNumberOrValue(item.item_id ?? item.product_id ?? item.productId),
    description: item.description ?? item.name ?? '',
    hsn_code: item.hsn_code ?? item.hsnCode ?? '',
    qty: toDecimal(item.qty ?? item.quantity, 1),
    rate: toDecimal(item.rate),
    discount_pct: toDecimal(item.discount_pct ?? item.discount),
    discount_amount: toDecimal(item.discount_amount),
    gst_rate: toDecimal(item.gst_rate ?? item.tax_rate),
    cess_rate: toDecimal(item.cess_rate ?? item.cessRate),
    warehouse_id: toNumberOrValue(item.warehouse_id ?? item.warehouseId),
    itc_eligibility: item.itc_eligibility ?? item.itcEligibility ?? 'ELIGIBLE',
  })),
});

export const getPurchaseInvoices = async (page = 1, limit = 20, search = '', status = '') =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/purchase-invoices',
      method: 'GET',
      params: cleanParams({ page, limit, search, status: status === 'All' ? '' : status }),
    }),
  );

export const createPurchaseInvoice = async (data) =>
  apiRequest({
    url: '/api/purchase-invoices',
    method: 'POST',
    data: normalizePurchaseInvoicePayload(data),
  });

export const getPurchaseInvoiceById = async (id) =>
  apiRequest({
    url: `/api/purchase-invoices/${id}`,
    method: 'GET',
  });

export const postPurchaseInvoice = async (id) =>
  apiRequest({
    url: `/api/purchase-invoices/${id}/post`,
    method: 'POST',
  });

export const recordPurchasePayment = async (id, paymentData) =>
  apiRequest({
    url: `/api/purchase-invoices/${id}/payment`,
    method: 'POST',
    data: {
      amount: toDecimal(paymentData.amount),
      payment_date: paymentData.payment_date ?? paymentData.paymentDate,
      payment_mode: paymentData.payment_mode ?? paymentData.paymentMode,
      reference: paymentData.reference || '',
    },
  });

export const cancelPurchaseInvoice = async (id) =>
  apiRequest({
    url: `/api/purchase-invoices/${id}/cancel`,
    method: 'POST',
  });

export const updatePurchaseInvoice = async (id, data) =>
  apiRequest({
    url: `/api/purchase-invoices/${id}`,
    method: 'PUT',
    data: normalizePurchaseInvoicePayload(data),
  });

const purchaseInvoiceService = {
  getPurchaseInvoices,
  getPurchaseInvoiceById,
  createPurchaseInvoice,
  updatePurchaseInvoice,
  postPurchaseInvoice,
  recordPurchasePayment,
  cancelPurchaseInvoice,
};

export default purchaseInvoiceService;

