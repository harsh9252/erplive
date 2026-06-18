import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const CashFlow = lazy(() => import('../pages/cash-flow'));
const FundFlow = lazy(() => import('../pages/fund-flow'));
const SalesReport = lazy(() => import('../pages/sales-report'));
const PurchaseOrdersReport = lazy(() => import('../pages/purchase-orders-report'));
const PurchaseReturnReport = lazy(() => import('../pages/purchase-return-report'));
const PurchasesReport = lazy(() => import('../pages/purchases-report'));
const QuotationReport = lazy(() => import('../pages/quotation-report'));
const Reports = lazy(() => import('../pages/reports'));
const SalesAnalysis = lazy(() => import('../pages/sales-analysis'));
const PurchaseAnalysis = lazy(() => import('../pages/purchase-analysis'));
const GstSummaryReport = lazy(() => import('../pages/gst-summary'));
const GstRateWiseReport = lazy(() => import('../pages/gst-rate-wise-report'));
const CashBankBook = lazy(() => import('../pages/cash-bank-book'));
const DayBook = lazy(() => import('../pages/day-book'));
const LedgerReport = lazy(() => import('../pages/ledger-report'));
const LedgerStatement = lazy(() => import('../pages/ledger-statement'));
const GroupLedgerReport = lazy(() => import('../pages/group-ledger-report'));
const TrialBalance = lazy(() => import('../pages/trial-balance'));
const ProfitLossReport = lazy(() => import('../pages/profit-loss-report'));
const BalanceSheet = lazy(() => import('../pages/balance-sheet'));
const ExpenseReport = lazy(() => import('../pages/expense-report'));
const IncomeReport = lazy(() => import('../pages/income-report'));
const TaxReport = lazy(() => import('../pages/tax-report'));
const InventoryReport = lazy(() => import('../pages/inventory-report'));
const OutstandingReports = lazy(() => import('../pages/outstanding-reports'));
const TdsReport = lazy(() => import('../pages/tds-report'));
const TcsReport = lazy(() => import('../pages/tcs-report'));
const StockValuationReport = lazy(() => import('../pages/stock-valuation'));

const ReportRoutes = () => (
  <Routes>
    {/* Actual Report Routes (Relative to /reports) */}
    <Route index element={<ProtectedRoute module="reports" action="can_read"><Reports /></ProtectedRoute>} />
    <Route path="cash-flow" element={<ProtectedRoute module="reports" action="can_read"><CashFlow /></ProtectedRoute>} />
    <Route path="fund-flow" element={<ProtectedRoute module="reports" action="can_read"><FundFlow /></ProtectedRoute>} />
    <Route path="sales-analysis" element={<ProtectedRoute module="reports" action="can_read"><SalesAnalysis /></ProtectedRoute>} />
    <Route path="purchase-analysis" element={<ProtectedRoute module="reports" action="can_read"><PurchaseAnalysis /></ProtectedRoute>} />
    <Route path="gst-summary" element={<ProtectedRoute module="reports" action="can_read"><GstSummaryReport /></ProtectedRoute>} />
    <Route path="gst-by-rate" element={<ProtectedRoute module="reports" action="can_read"><GstRateWiseReport /></ProtectedRoute>} />
    <Route path="tds-report" element={<ProtectedRoute module="reports" action="can_read"><TdsReport /></ProtectedRoute>} />
    <Route path="tcs-report" element={<ProtectedRoute module="reports" action="can_read"><TcsReport /></ProtectedRoute>} />
    <Route path="cash-bank-book" element={<ProtectedRoute module="reports" action="can_read"><CashBankBook /></ProtectedRoute>} />
    <Route path="day-book" element={<ProtectedRoute module="reports" action="can_read"><DayBook /></ProtectedRoute>} />
    
    <Route path="sales-report" element={<ProtectedRoute module="reports" action="can_read"><SalesReport /></ProtectedRoute>} />
    <Route path="purchase-orders-report" element={<ProtectedRoute module="reports" action="can_read"><PurchaseOrdersReport /></ProtectedRoute>} />
    <Route path="purchase-return-report" element={<ProtectedRoute module="reports" action="can_read"><PurchaseReturnReport /></ProtectedRoute>} />
    <Route path="purchases-report" element={<ProtectedRoute module="reports" action="can_read"><PurchasesReport /></ProtectedRoute>} />
    <Route path="quotation-report" element={<ProtectedRoute module="reports" action="can_read"><QuotationReport /></ProtectedRoute>} />
    <Route path="ledger-report" element={<ProtectedRoute module="reports" action="can_read"><LedgerReport /></ProtectedRoute>} />
    <Route path="ledger-statement/:id" element={<ProtectedRoute module="reports" action="can_read"><LedgerStatement /></ProtectedRoute>} />
    <Route path="group-ledger-report" element={<ProtectedRoute module="reports" action="can_read"><GroupLedgerReport /></ProtectedRoute>} />
    <Route path="trial-balance" element={<ProtectedRoute module="reports" action="can_read"><TrialBalance /></ProtectedRoute>} />
    <Route path="profit-loss-report" element={<ProtectedRoute module="reports" action="can_read"><ProfitLossReport /></ProtectedRoute>} />
    <Route path="balance-sheet" element={<ProtectedRoute module="reports" action="can_read"><BalanceSheet /></ProtectedRoute>} />
    <Route path="expense-report" element={<ProtectedRoute module="reports" action="can_read"><ExpenseReport /></ProtectedRoute>} />
    <Route path="income-report" element={<ProtectedRoute module="reports" action="can_read"><IncomeReport /></ProtectedRoute>} />
    <Route path="tax-report" element={<ProtectedRoute module="reports" action="can_read"><TaxReport /></ProtectedRoute>} />
    <Route path="inventory-report" element={<ProtectedRoute module="reports" action="can_read"><InventoryReport /></ProtectedRoute>} />
    <Route path="outstanding-reports" element={<ProtectedRoute module="reports" action="can_read"><OutstandingReports /></ProtectedRoute>} />
    <Route path="stock-valuation" element={<ProtectedRoute module="reports" action="can_read"><StockValuationReport /></ProtectedRoute>} />
  </Routes>
);

export default ReportRoutes;
