import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const BOMList = lazy(() => import('../pages/bom-list'));
const AddBOM = lazy(() => import('../pages/add-bom'));
const BOMDetails = lazy(() => import('../pages/bom-details'));
const ProductionOrderList = lazy(() => import('../pages/production-order-list'));
const AddProductionOrder = lazy(() => import('../pages/add-production-order'));
const ProductionOrderDetails = lazy(() => import('../pages/production-order-details'));
const JobWorkList = lazy(() => import('../pages/job-work-list'));
const AddJobWork = lazy(() => import('../pages/add-job-work'));
const JobWorkDetails = lazy(() => import('../pages/job-work-details'));
const MaterialMovement = lazy(() => import('../pages/material-movement'));

const ManufacturingRoutes = () => (
  <Routes>
    {/* Actual Manufacturing Routes (Relative to /manufacturing) */}
    <Route path="bom" element={<ProtectedRoute module="manufacturing" action="can_read"><BOMList /></ProtectedRoute>} />
    <Route path="bom/add" element={<ProtectedRoute module="manufacturing" action="can_create"><AddBOM /></ProtectedRoute>} />
    <Route path="bom/edit/:id" element={<ProtectedRoute module="manufacturing" action="can_update"><AddBOM /></ProtectedRoute>} />
    <Route path="bom/:id" element={<ProtectedRoute module="manufacturing" action="can_read"><BOMDetails /></ProtectedRoute>} />
    <Route path="production-orders" element={<ProtectedRoute module="manufacturing" action="can_read"><ProductionOrderList /></ProtectedRoute>} />
    <Route path="production-orders/add" element={<ProtectedRoute module="manufacturing" action="can_create"><AddProductionOrder /></ProtectedRoute>} />
    <Route path="production-orders/:id" element={<ProtectedRoute module="manufacturing" action="can_read"><ProductionOrderDetails /></ProtectedRoute>} />
    <Route path="job-work" element={<ProtectedRoute module="manufacturing" action="can_read"><JobWorkList /></ProtectedRoute>} />
    <Route path="job-work/add" element={<ProtectedRoute module="manufacturing" action="can_create"><AddJobWork /></ProtectedRoute>} />
    <Route path="job-work/:id" element={<ProtectedRoute module="manufacturing" action="can_read"><JobWorkDetails /></ProtectedRoute>} />
    <Route path="job-work/edit/:id" element={<ProtectedRoute module="manufacturing" action="can_update"><AddJobWork /></ProtectedRoute>} />
    <Route path="material-movement" element={<ProtectedRoute module="manufacturing" action="can_read"><MaterialMovement /></ProtectedRoute>} />
  </Routes>
);

export default ManufacturingRoutes;
