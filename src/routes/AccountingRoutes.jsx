import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const LedgerGroups = lazy(() => import('../pages/ledger-groups'));
const Ledgers = lazy(() => import('../pages/ledgers'));
const AddLedger = lazy(() => import('../pages/add-ledger'));
const EditLedger = lazy(() => import('../pages/edit-ledger'));
const Budgets = lazy(() => import('../pages/Budgets'));
const AddBudget = lazy(() => import('../pages/add-budget'));
const EditBudget = lazy(() => import('../pages/edit-budget'));
const BudgetVariance = lazy(() => import('../pages/BudgetVariance'));
const BankReconciliation = lazy(() => import('../pages/bank-reconciliation'));
const AddBankReconciliation = lazy(() => import('../pages/add-bank-reconciliation'));
const MatchBankReconciliation = lazy(() => import('../pages/match-bank-reconciliation'));
const InterestCalculation = lazy(() => import('../pages/interest-calculation'));
const Vouchers = lazy(() => import('../pages/vouchers'));
const AddVoucher = lazy(() => import('../pages/add-voucher'));
const EditVoucher = lazy(() => import('../pages/edit-voucher'));
const Accounting = lazy(() => import('../pages/accounting'));
const CostCentres = lazy(() => import('../pages/cost-centres'));
const AddLedgerGroup = lazy(() => import('../pages/add-ledger-group'));
const EditLedgerGroup = lazy(() => import('../pages/edit-ledger-group'));
const BulkAddLedgers = lazy(() => import('../pages/bulk-add-ledgers'));

const AccountingRoutes = () => (
  <Routes>
    {/* Actual Accounting Routes (Relative to /accounting) */}
    <Route index element={<ProtectedRoute module="accounting" action="can_read"><Accounting /></ProtectedRoute>} />
    <Route path="ledger-groups" element={<ProtectedRoute module="accounting" action="can_read"><LedgerGroups /></ProtectedRoute>} />
    <Route path="ledgers" element={<ProtectedRoute module="accounting" action="can_read"><Ledgers /></ProtectedRoute>} />
    <Route path="ledgers/bulk-add" element={<ProtectedRoute module="accounting" action="can_create"><BulkAddLedgers /></ProtectedRoute>} />
    <Route path="budgets" element={<ProtectedRoute module="accounting" action="can_read"><Budgets /></ProtectedRoute>} />
    <Route path="budgets/add" element={<ProtectedRoute module="accounting" action="can_create"><AddBudget /></ProtectedRoute>} />
    <Route path="budgets/edit/:id" element={<ProtectedRoute module="accounting" action="can_update"><EditBudget /></ProtectedRoute>} />
    <Route path="budgets/:id/variance" element={<ProtectedRoute module="accounting" action="can_read"><BudgetVariance /></ProtectedRoute>} />
    
    <Route path="bank-reconciliation" element={<ProtectedRoute module="banking" action="can_read"><BankReconciliation /></ProtectedRoute>} />
    <Route path="bank-reconciliation/add" element={<ProtectedRoute module="banking" action="can_create"><AddBankReconciliation /></ProtectedRoute>} />
    <Route path="bank-reconciliation/:id" element={<ProtectedRoute module="banking" action="can_read"><MatchBankReconciliation /></ProtectedRoute>} />
    
    <Route path="interest" element={<ProtectedRoute module="accounting" action="can_read"><InterestCalculation /></ProtectedRoute>} />
    <Route path="vouchers" element={<ProtectedRoute module="accounting" action="can_read"><Vouchers /></ProtectedRoute>} />
    <Route path="vouchers/add" element={<ProtectedRoute module="accounting" action="can_create"><AddVoucher /></ProtectedRoute>} />
    <Route path="vouchers/edit/:id" element={<ProtectedRoute module="accounting" action="can_update"><EditVoucher /></ProtectedRoute>} />
    <Route path="cost-centres" element={<ProtectedRoute module="accounting" action="can_read"><CostCentres /></ProtectedRoute>} />
  </Routes>
);

export default AccountingRoutes;
