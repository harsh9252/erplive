import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse, toDecimal, toNumberOrValue } from './apiUtils';

const normalizePurchaseInvoicePayload = (data = {}) => ({
  branch_id: toNumberOrValue(data.branch_id ?? data.branchId),
  vendor_id: toNumberOrValue(data.vendor_id ?? data.vendorId),
  invoice_date: data.invoice_date ?? data.purchase_date ?? data.invoiceDate,
  due_date: data.due_date ?? data.dueDate ?? null,
  invoice_number:
    data.invoice_number ?? data.reference_number ?? data.purchase_number ?? '',
  financial_year_id:
    toNumberOrValue(data.financial_year_id ?? data.financialYearId) ?? undefined,
  voucher_series_id: toNumberOrValue(data.voucher_series_id),
  purchase_order_id: toNumberOrValue(data.purchase_order_id ?? data.purchaseOrderId) ?? null,
  invoice_layout: data.invoice_layout || 'PRODUCTS',
  show_discount: Boolean(data.show_discount),
  ecommerce_operator_gstin: data.ecommerce_operator_gstin || '',
  place_of_supply: data.place_of_supply ?? data.placeOfSupply,
  reverse_charge: Boolean(data.reverse_charge ?? data.reverseCharge),
  remarks: data.remarks ?? data.notes ?? '',
  terms_and_conditions: data.terms_and_conditions ?? data.terms ?? '',
  additional_charges: (data.additional_charges || []).map(charge => ({
    name: charge.name || '',
    amount: toDecimal(charge.amount),
    gst_rate: toDecimal(charge.gst_rate || 0),
  })),
  items: (data.items || []).map((item) => ({
    item_id: toNumberOrValue(item.item_id ?? item.product_id ?? item.productId),
    description: item.description ?? item.name ?? '',
    hsn_code: item.hsn_code ?? item.hsnCode ?? '',
    qty: toDecimal(item.qty ?? item.quantity, 1),
    rate: toDecimal(item.rate),
    discount_pct: toDecimal(item.discount_pct ?? item.discount),
    discount_amount: toDecimal(item.discount_amount),
    gst_rate: toDecimal(item.gst_rate ?? item.tax_rate),
    tax_type: item.tax_type ?? item.taxType ?? 'TAXABLE',
    cess_rate: toDecimal(item.cess_rate ?? item.cessRate),
    uom_id: toNumberOrValue(item.uom_id ?? item.uomId),
    warehouse_id: toNumberOrValue(item.warehouse_id ?? item.warehouseId),
    batch_number: item.batch_number ?? item.batchNumber ?? undefined,
    mfg_date: item.mfg_date ?? item.mfgDate ?? undefined,
    expiry_date: item.expiry_date ?? item.expiryDate ?? undefined,
    itc_eligibility: item.itc_eligibility ?? item.itcEligibility ?? 'ELIGIBLE',
  })),
});

export const getPurchaseInvoices = async (page = 1, limit = 20, search = '', status = '', vendor_id = '', from_date = '', to_date = '') =>
  normalizeListResponse(
    await apiRequest({
      url: '/api/purchase-invoices',
      method: 'GET',
      params: cleanParams({ 
        page, 
        limit, 
        search, 
        status: status === 'All' ? '' : status, 
        vendor_id, 
        from_date, 
        to_date,
        start_date: from_date,
        end_date: to_date,
        startDate: from_date,
        endDate: to_date
      }),
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
    url: `/api/purchase-invoices/${id}/collect-payment`,
    method: 'POST',
    data: {
      amount: toDecimal(paymentData.amount),
      payment_date: paymentData.payment_date ?? paymentData.paymentDate,
      payment_mode: paymentData.payment_mode ?? paymentData.paymentMode,
      reference: paymentData.reference || '',
    },
  });

export const cancelPurchaseInvoice = async (id, reason) =>
  apiRequest({
    url: `/api/purchase-invoices/${id}/cancel`,
    method: 'POST',
    data: reason ? { reason, cancellation_reason: reason } : undefined,
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

