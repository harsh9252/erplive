import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const Items = lazy(() => import('../pages/items'));
const AddItem = lazy(() => import('../pages/add-item'));
const EditItemNew = lazy(() => import('../pages/edit-item-new'));
const ItemDetails = lazy(() => import('../pages/item-details'));
const StockSummary = lazy(() => import('../pages/stock-summary'));
const ItemCategories = lazy(() => import('../pages/item-categories'));
const UOM = lazy(() => import('../pages/uom'));
const Warehouses = lazy(() => import('../pages/warehouses'));
const AddStockTransfer = lazy(() => import('../pages/add-stock-transfer'));
const StockTransfers = lazy(() => import('../pages/stock-transfers'));
const StockVerification = lazy(() => import('../pages/stock-verification'));
const StockVerificationDetail = lazy(() => import('../pages/stock-verification-detail'));
const BatchTracking = lazy(() => import('../pages/batch-tracking'));
const SerialNumbers = lazy(() => import('../pages/serial-numbers'));
const Wastage = lazy(() => import('../pages/wastage'));
const StockAlerts = lazy(() => import('../pages/stock-alerts'));
const StockAgeing = lazy(() => import('../pages/stock-ageing'));
const LowStock = lazy(() => import('../pages/low-stock'));
const ItemExpiryReport = lazy(() => import('../pages/item-expiry'));
const StockEntry = lazy(() => import('../pages/stock-entry'));

const InventoryRoutes = () => (
  <Routes>
    {/* Actual Inventory Routes (Relative to /inventory) */}
    <Route path="items" element={<ProtectedRoute module="inventory" action="can_read"><Items /></ProtectedRoute>} />
    <Route path="items/add" element={<ProtectedRoute module="inventory" action="can_create"><AddItem /></ProtectedRoute>} />
    <Route path="items/edit/:id" element={<ProtectedRoute module="inventory" action="can_update"><AddItem /></ProtectedRoute>} />
    <Route path="items/:id" element={<ProtectedRoute module="inventory" action="can_read"><ItemDetails /></ProtectedRoute>} />
    <Route path="stock-summary" element={<ProtectedRoute module="inventory" action="can_read"><StockSummary /></ProtectedRoute>} />
    <Route path="stock-ageing" element={<ProtectedRoute module="inventory" action="can_read"><StockAgeing /></ProtectedRoute>} />
    <Route path="expiry" element={<ProtectedRoute module="inventory" action="can_read"><ItemExpiryReport /></ProtectedRoute>} />
    <Route path="hsn-sac" element={<Navigate to="/master/hsn-sac" replace />} />
    
    <Route path="categories" element={<ProtectedRoute module="inventory" action="can_read"><ItemCategories /></ProtectedRoute>} />
    <Route path="uom" element={<ProtectedRoute module="inventory" action="can_read"><UOM /></ProtectedRoute>} />
    <Route path="warehouses" element={<ProtectedRoute module="inventory" action="can_read"><Warehouses /></ProtectedRoute>} />
    <Route path="transfer" element={<ProtectedRoute module="inventory" action="can_create"><AddStockTransfer /></ProtectedRoute>} />
    <Route path="stock-transfers" element={<ProtectedRoute module="inventory" action="can_read"><StockTransfers /></ProtectedRoute>} />
    <Route path="stock-verification" element={<ProtectedRoute module="inventory" action="can_read"><StockVerification /></ProtectedRoute>} />
    <Route path="stock-verification/:id" element={<ProtectedRoute module="inventory" action="can_read"><StockVerificationDetail /></ProtectedRoute>} />
    <Route path="batch-tracking" element={<ProtectedRoute module="inventory" action="can_read"><BatchTracking /></ProtectedRoute>} />
    <Route path="serial-numbers" element={<ProtectedRoute module="inventory" action="can_read"><SerialNumbers /></ProtectedRoute>} />
    <Route path="wastage" element={<ProtectedRoute module="inventory" action="can_read"><Wastage /></ProtectedRoute>} />
    <Route path="wastage-scrap" element={<ProtectedRoute module="inventory" action="can_read"><Wastage /></ProtectedRoute>} />
    <Route path="stock-alerts" element={<ProtectedRoute module="inventory" action="can_read"><StockAlerts /></ProtectedRoute>} />
    <Route path="low-stock" element={<ProtectedRoute module="inventory" action="can_read"><LowStock /></ProtectedRoute>} />
    <Route path="stock-entry" element={<ProtectedRoute module="inventory" action="can_create"><StockEntry /></ProtectedRoute>} />
  </Routes>
);

export default InventoryRoutes;
