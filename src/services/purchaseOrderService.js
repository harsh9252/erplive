import { apiRequest } from "./apiClient";
import { cleanParams, normalizeListResponse } from "./apiUtils";

const normalizePurchaseOrderPayload = (data = {}) => ({
  branch_id: data.branch_id ?? data.branchId ? Number(data.branch_id ?? data.branchId) : undefined,
  vendor_id: Number(data.vendor_id),
  order_date: data.order_date,
  expected_delivery: data.expected_delivery || null,
  notes: data.notes || "",
  remarks: data.remarks || "",
  items: (data.items || []).map((item) => {
    const qty = Number.parseFloat(item.quantity || item.qty || 0);
    const rate = Number.parseFloat(item.rate || 0);
    return {
      item_id: Number(item.item_id),
      qty,
      rate,
      amount: qty * rate,
      description: item.description || "",
    };
  }),
  total_amount: Number.parseFloat(data.total_amount || 0),
});

export const getPurchaseOrders = async (page = 1, limit = 20, filters = {}) =>
  normalizeListResponse(
    await apiRequest({
      url: "/api/purchase-orders",
      method: "GET",
      params: cleanParams({ page, limit, ...filters }),
    }),
  );

export const createPurchaseOrder = async (data) =>
  apiRequest({
    url: "/api/purchase-orders",
    method: "POST",
    data: normalizePurchaseOrderPayload(data),
  });

export const getPurchaseOrderById = async (id) =>
  apiRequest({
    url: `/api/purchase-orders/${id}`,
    method: "GET",
  });

export const updatePurchaseOrder = async (id, data) =>
  apiRequest({
    url: `/api/purchase-orders/${id}`,
    method: "PUT",
    data: normalizePurchaseOrderPayload(data),
  });

export const confirmPurchaseOrder = async (id) =>
  apiRequest({
    url: `/api/purchase-orders/${id}/confirm`,
    method: "POST",
  });

export const cancelPurchaseOrder = async (id) =>
  apiRequest({
    url: `/api/purchase-orders/${id}/cancel`,
    method: "POST",
  });

const purchaseOrderService = {
  getPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrder,
  confirmPurchaseOrder,
  cancelPurchaseOrder,
};

export default purchaseOrderService;
