import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const Customers = lazy(() => import('../pages/customers'));
const AddCustomer = lazy(() => import('../pages/add-customer'));
const Vendors = lazy(() => import('../pages/vendors'));
const AddVendor = lazy(() => import('../pages/add-vendor'));
const EcommerceOperators = lazy(() => import('../pages/ecommerce-operators'));
const AddEcommerceOperator = lazy(() => import('../pages/add-ecommerce-operator'));
const Countries = lazy(() => import('../pages/countries'));
const States = lazy(() => import('../pages/states'));
const Cities = lazy(() => import('../pages/cities'));
const HSNSACMaster = lazy(() => import('../pages/hsn-sac-master'));
const TaxMaster = lazy(() => import('../pages/tax-master'));
const Branches = lazy(() => import('../pages/branches'));
const Investments = lazy(() => import('../pages/investments'));

const MasterRoutes = () => (
  <Routes>
    {/* Actual Master Routes (Relative to /master) */}
    <Route path="customers" element={<ProtectedRoute module="customers" action="can_read"><Customers /></ProtectedRoute>} />
    <Route path="customers/add" element={<ProtectedRoute module="customers" action="can_create"><AddCustomer /></ProtectedRoute>} />
    <Route path="customers/edit/:id" element={<ProtectedRoute module="customers" action="can_update"><AddCustomer /></ProtectedRoute>} />
    
    <Route path="vendors" element={<ProtectedRoute module="vendors" action="can_read"><Vendors /></ProtectedRoute>} />
    <Route path="vendors/add" element={<ProtectedRoute module="vendors" action="can_create"><AddVendor /></ProtectedRoute>} />
    <Route path="vendors/edit/:id" element={<ProtectedRoute module="vendors" action="can_update"><AddVendor /></ProtectedRoute>} />
    
    <Route path="ecommerce-operators" element={<ProtectedRoute module="vendors" action="can_read"><EcommerceOperators /></ProtectedRoute>} />
    <Route path="ecommerce-operators/add" element={<ProtectedRoute module="vendors" action="can_create"><AddEcommerceOperator /></ProtectedRoute>} />
    <Route path="ecommerce-operators/edit/:id" element={<ProtectedRoute module="vendors" action="can_update"><AddEcommerceOperator /></ProtectedRoute>} />
    
    <Route path="hsn-sac" element={<ProtectedRoute module="settings" action="can_read"><HSNSACMaster /></ProtectedRoute>} />
    <Route path="branches" element={<ProtectedRoute module="settings" action="can_read"><Branches /></ProtectedRoute>} />
    <Route path="countries" element={<ProtectedRoute module="settings" action="can_read"><Countries /></ProtectedRoute>} />
    <Route path="states" element={<ProtectedRoute module="settings" action="can_read"><States /></ProtectedRoute>} />
    <Route path="cities" element={<ProtectedRoute module="settings" action="can_read"><Cities /></ProtectedRoute>} />
    <Route path="tax-master" element={<ProtectedRoute module="settings" action="can_read"><TaxMaster /></ProtectedRoute>} />
    
    <Route path="investments" element={<ProtectedRoute module="reports" action="can_read"><Investments /></ProtectedRoute>} />
  </Routes>
);

export default MasterRoutes;
