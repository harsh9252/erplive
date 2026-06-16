import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const SalesInvoices = lazy(() => import('../pages/sales-invoices'));
const AddSalesInvoice = lazy(() => import('../pages/add-sales-invoice'));
const EditSalesInvoice = lazy(() => import('../pages/edit-sales-invoice'));
const SalesInvoiceDetails = lazy(() => import('../pages/sales-invoice-details'));

const SalesOrders = lazy(() => import('../pages/sales-orders'));
const AddSalesOrder = lazy(() => import('../pages/add-sales-order'));
const SalesOrderDetails = lazy(() => import('../pages/sales-order-details'));

const PurchaseInvoices = lazy(() => import('../pages/purchase-invoices'));
const AddPurchaseInvoice = lazy(() => import('../pages/add-purchase-invoice'));
const EditPurchaseInvoice = lazy(() => import('../pages/edit-purchase-invoice'));
const PurchaseInvoiceDetails = lazy(() => import('../pages/purchase-invoice-details'));

const PurchaseOrders = lazy(() => import('../pages/purchase-orders'));
const AddPurchaseOrder = lazy(() => import('../pages/add-purchase-order'));
const PurchaseOrderDetails = lazy(() => import('../pages/purchase-order-details'));

const CreditNotes = lazy(() => import('../pages/credit-notes'));
const AddCreditNote = lazy(() => import('../pages/add-credit-note'));
const EditCreditNote = lazy(() => import('../pages/edit-credit-note'));
const CreditNoteDetails = lazy(() => import('../pages/credit-note-details'));

const DebitNotes = lazy(() => import('../pages/debit-notes'));
const AddDebitNote = lazy(() => import('../pages/add-debit-note'));
const EditDebitNote = lazy(() => import('../pages/edit-debit-note'));
const DebitNoteDetails = lazy(() => import('../pages/debit-note-details'));

const ProformaInvoices = lazy(() => import('../pages/proforma-invoices'));
const AddProformaInvoice = lazy(() => import('../pages/add-proforma-invoice'));
const EditProformaInvoice = lazy(() => import('../pages/edit-proforma-invoice'));
const ProformaInvoiceDetails = lazy(() => import('../pages/proforma-invoice-details'));

const InvoicingRoutes = () => (
  <Routes>
    {/* Actual Invoicing Routes (Relative to /invoicing) */}
    <Route path="sales" element={<ProtectedRoute module="sales_invoice" action="can_read"><SalesInvoices /></ProtectedRoute>} />
    <Route path="sales/add" element={<ProtectedRoute module="sales_invoice" action="can_create"><AddSalesInvoice /></ProtectedRoute>} />
    <Route path="sales/edit/:id" element={<ProtectedRoute module="sales_invoice" action="can_update"><EditSalesInvoice /></ProtectedRoute>} />
    <Route path="sales/:id" element={<ProtectedRoute module="sales_invoice" action="can_read"><SalesInvoiceDetails /></ProtectedRoute>} />

    <Route path="sales-orders" element={<ProtectedRoute module="sales_invoice" action="can_read"><SalesOrders /></ProtectedRoute>} />
    <Route path="sales-orders/add" element={<ProtectedRoute module="sales_invoice" action="can_create"><AddSalesOrder /></ProtectedRoute>} />
    <Route path="sales-orders/edit/:id" element={<ProtectedRoute module="sales_invoice" action="can_update"><AddSalesOrder /></ProtectedRoute>} />
    <Route path="sales-orders/:id" element={<ProtectedRoute module="sales_invoice" action="can_read"><SalesOrderDetails /></ProtectedRoute>} />

    <Route path="purchase-orders" element={<ProtectedRoute module="purchase_invoice" action="can_read"><PurchaseOrders /></ProtectedRoute>} />
    <Route path="purchase-orders/add" element={<ProtectedRoute module="purchase_invoice" action="can_create"><AddPurchaseOrder /></ProtectedRoute>} />
    <Route path="purchase-orders/edit/:id" element={<ProtectedRoute module="purchase_invoice" action="can_update"><AddPurchaseOrder /></ProtectedRoute>} />
    <Route path="purchase-orders/:id" element={<ProtectedRoute module="purchase_invoice" action="can_read"><PurchaseOrderDetails /></ProtectedRoute>} />

    <Route path="purchases" element={<ProtectedRoute module="purchase_invoice" action="can_read"><PurchaseInvoices /></ProtectedRoute>} />
    <Route path="purchases/add" element={<ProtectedRoute module="purchase_invoice" action="can_create"><AddPurchaseInvoice /></ProtectedRoute>} />
    <Route path="purchases/edit/:id" element={<ProtectedRoute module="purchase_invoice" action="can_update"><EditPurchaseInvoice /></ProtectedRoute>} />
    <Route path="purchases/:id" element={<ProtectedRoute module="purchase_invoice" action="can_read"><PurchaseInvoiceDetails /></ProtectedRoute>} />

    <Route path="credit-notes" element={<ProtectedRoute module="sales_invoice" action="can_read"><CreditNotes /></ProtectedRoute>} />
    <Route path="credit-notes/add" element={<ProtectedRoute module="sales_invoice" action="can_create"><AddCreditNote /></ProtectedRoute>} />
    <Route path="credit-notes/edit/:id" element={<ProtectedRoute module="sales_invoice" action="can_update"><EditCreditNote /></ProtectedRoute>} />
    <Route path="credit-notes/:id" element={<ProtectedRoute module="sales_invoice" action="can_read"><CreditNoteDetails /></ProtectedRoute>} />

    <Route path="debit-notes" element={<ProtectedRoute module="purchase_invoice" action="can_read"><DebitNotes /></ProtectedRoute>} />
    <Route path="debit-notes/add" element={<ProtectedRoute module="purchase_invoice" action="can_create"><AddDebitNote /></ProtectedRoute>} />
    <Route path="debit-notes/edit/:id" element={<ProtectedRoute module="purchase_invoice" action="can_update"><EditDebitNote /></ProtectedRoute>} />
    <Route path="debit-notes/:id" element={<ProtectedRoute module="purchase_invoice" action="can_read"><DebitNoteDetails /></ProtectedRoute>} />

    <Route path="proforma" element={<ProtectedRoute module="sales_invoice" action="can_read"><ProformaInvoices /></ProtectedRoute>} />
    <Route path="proforma/add" element={<ProtectedRoute module="sales_invoice" action="can_create"><AddProformaInvoice /></ProtectedRoute>} />
    <Route path="proforma/edit/:id" element={<ProtectedRoute module="sales_invoice" action="can_update"><EditProformaInvoice /></ProtectedRoute>} />
    <Route path="proforma/:id" element={<ProtectedRoute module="sales_invoice" action="can_read"><ProformaInvoiceDetails /></ProtectedRoute>} />
  </Routes>
);

export default InvoicingRoutes;
