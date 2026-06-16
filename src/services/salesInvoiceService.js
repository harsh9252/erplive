import { apiRequest } from './apiClient';
import { cleanParams, normalizeListResponse, toDecimal, toNumberOrValue } from './apiUtils';

const normalizeSalesInvoicePayload = (data = {}) => ({
  branch_id: toNumberOrValue(data.branch_id ?? data.branchId),
  customer_id: toNumberOrValue(data.customer_id ?? data.customerId),
  invoice_date: data.invoice_date ?? data.invoiceDate,
  due_date: data.due_date ?? data.dueDate ?? null,
  financial_year_id:
    toNumberOrValue(data.financial_year_id ?? data.financialYearId) ?? undefined,
  invoice_number: data.invoice_number ?? data.invoiceNumber,
  voucher_series_id: toNumberOrValue(data.voucher_series_id),
  invoice_type: data.invoice_type ?? data.invoiceType ?? 'B2B',
  invoice_layout: data.invoice_layout || 'PRODUCTS',
  show_discount: Boolean(data.show_discount),
  ecommerce_operator_gstin: data.ecommerce_operator_gstin || '',
  place_of_supply: data.place_of_supply ?? data.placeOfSupply,
  reverse_charge: Boolean(data.reverse_charge ?? data.reverseCharge),
  remarks: data.remarks || '',
  terms_and_conditions: data.terms_and_conditions ?? data.termsAndConditions ?? '',
  additional_charges: (data.additional_charges || []).map(charge => ({
    name: charge.name || '',
    amount: toDecimal(charge.amount),
    gst_rate: toDecimal(charge.gst_rate || 0),
  })),
  items: (data.items || []).map((item) => ({
    item_id: toNumberOrValue(item.item_id ?? item.itemId),
    description: item.description || '',
    hsn_code: item.hsn_code ?? item.hsnCode ?? '',
    qty: toDecimal(item.qty),
    uom_id: toNumberOrValue(item.uom_id ?? item.uomId),
    rate: toDecimal(item.rate),
    discount_pct: toDecimal(item.discount_pct ?? item.discountPct),
    discount_amount: toDecimal(item.discount_amount ?? item.discountAmount),
    gst_rate: toDecimal(item.gst_rate ?? item.gstRate),
    tax_type: item.tax_type ?? item.taxType ?? 'TAXABLE',
    cess_rate: toDecimal(item.cess_rate ?? item.cessRate),
    warehouse_id: toNumberOrValue(item.warehouse_id ?? item.warehouseId),
    batch_id: toNumberOrValue(item.batch_id ?? item.batchId),
    serial_numbers: item.serial_numbers ?? item.serialNumbers ?? [],
  })),
});

let fetchSalesInvoicesInProgress = new Map();

export const getSalesInvoices = async (params = {}) => {
  const { page = 1, limit = 20, search = '', status = '', from_date = '', to_date = '', customer_id = '', payment_status = '' } = params;
  
  const finalParams = cleanParams({ 
    page, 
    limit, 
    search, 
    status: status === 'All' ? '' : status,
    from_date,
    to_date,
    start_date: from_date,
    end_date: to_date,
    startDate: from_date,
    endDate: to_date,
    customer_id,
    payment_status: payment_status === 'All' ? '' : payment_status
  });
  const paramKey = JSON.stringify(finalParams);

  if (fetchSalesInvoicesInProgress.has(paramKey)) {
    return fetchSalesInvoicesInProgress.get(paramKey);
  }

  const promise = (async () => {
    try {
      return normalizeListResponse(
        await apiRequest({
          url: '/api/sales-invoices',
          method: 'GET',
          params: finalParams,
        }),
      );
    } finally {
      fetchSalesInvoicesInProgress.delete(paramKey);
    }
  })();

  fetchSalesInvoicesInProgress.set(paramKey, promise);
  return promise;
};

export const createSalesInvoice = async (data) =>
  apiRequest({
    url: '/api/sales-invoices',
    method: 'POST',
    data: normalizeSalesInvoicePayload(data),
  });

export const getSalesInvoiceById = async (id) =>
  apiRequest({
    url: `/api/sales-invoices/${id}`,
    method: 'GET',
  });

export const postSalesInvoice = async (id) =>
  apiRequest({
    url: `/api/sales-invoices/${id}/post`,
    method: 'POST',
  });

export const collectPayment = async (id, paymentData) =>
  apiRequest({
    url: `/api/sales-invoices/${id}/payment`,
    method: 'POST',
    data: {
      amount: toDecimal(paymentData.amount),
      payment_date: paymentData.payment_date ?? paymentData.paymentDate,
      payment_mode: paymentData.payment_mode ?? paymentData.paymentMode,
      reference: paymentData.reference || '',
    },
  });

export const cancelSalesInvoice = async (id, reason) =>
  apiRequest({
    url: `/api/sales-invoices/${id}/cancel`,
    method: 'POST',
    data: reason ? { reason, cancellation_reason: reason } : undefined,
  });

export const updateSalesInvoice = async (id, data) =>
  apiRequest({
    url: `/api/sales-invoices/${id}`,
    method: 'PUT',
    data: normalizeSalesInvoicePayload(data),
  });

const salesInvoiceService = {
  getSalesInvoices,
  getSalesInvoiceById,
  createSalesInvoice,
  updateSalesInvoice,
  postSalesInvoice,
  collectPayment,
  cancelSalesInvoice,
};

export default salesInvoiceService;

