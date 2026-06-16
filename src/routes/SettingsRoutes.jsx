import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const AccountSettings = lazy(() => import('../pages/account-settings'));
const AppearanceSettings = lazy(() => import('../pages/appearance-settings'));
const AuditLogs = lazy(() => import('../pages/audit-logs'));
const AuthenticationSettings = lazy(() => import('../pages/authentication-settings'));
const BankAccountsSettings = lazy(() => import('../pages/bank-accounts-settings'));
const CompanySettings = lazy(() => import('../pages/company-settings'));
const EmailSettings = lazy(() => import('../pages/email-settings'));
const FinancialYearSettings = lazy(() => import('../pages/financial-year-settings'));
const InvoiceSettings = lazy(() => import('../pages/invoice-settings'));
const LocalizationSettings = lazy(() => import('../pages/localization-settings'));
const NotificationsSettings = lazy(() => import('../pages/notifications-settings'));
const PayrollSettings = lazy(() => import('../pages/payroll-settings'));
const PreferenceSettings = lazy(() => import('../pages/preference-settings'));
const PrefixesSettings = lazy(() => import('../pages/prefixes-settings'));
const SecuritySettings = lazy(() => import('../pages/security-settings'));
const VoucherTypes = lazy(() => import('../pages/voucher-types'));
const VoucherSeries = lazy(() => import('../pages/voucher-series'));
const TDSMaster = lazy(() => import('../pages/tds-master'));
const TCSMaster = lazy(() => import('../pages/tcs-master'));

const SettingsRoutes = () => (
  <Routes>
    {/* Actual Settings Routes (Relative to /settings) */}
    <Route path="company" element={<ProtectedRoute module="settings" action="can_read"><CompanySettings /></ProtectedRoute>} />
    <Route path="payroll" element={<ProtectedRoute module="settings" action="can_read"><PayrollSettings /></ProtectedRoute>} />
    <Route path="voucher-types" element={<ProtectedRoute module="settings" action="can_read"><VoucherTypes /></ProtectedRoute>} />
    <Route path="voucher-series" element={<ProtectedRoute module="settings" action="can_read"><VoucherSeries /></ProtectedRoute>} />
    <Route path="tds-master" element={<ProtectedRoute module="settings" action="can_read"><TDSMaster /></ProtectedRoute>} />
    <Route path="tcs-master" element={<ProtectedRoute module="settings" action="can_read"><TCSMaster /></ProtectedRoute>} />
    <Route path="account" element={<ProtectedRoute module="settings" action="can_read"><AccountSettings /></ProtectedRoute>} />
    <Route path="bank-accounts" element={<ProtectedRoute module="settings" action="can_read"><BankAccountsSettings /></ProtectedRoute>} />
  </Routes>
);

export default SettingsRoutes;
