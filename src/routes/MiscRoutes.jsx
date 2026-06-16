import React, { lazy } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const Index = lazy(() => import('../pages/index'));
const MISDashboard = lazy(() => import('../pages/mis-dashboard'));
const AccountSettings = lazy(() => import('../pages/account-settings'));
const Companies = lazy(() => import('../pages/companies'));
const AddCompany = lazy(() => import('../pages/add-company'));
const CompanyDetails = lazy(() => import('../pages/company-details'));
const CompanyProfile = lazy(() => import('../pages/company-profile'));
const FinancialYears = lazy(() => import('../pages/financial-years'));
const UsersAccess = lazy(() => import('../pages/users-access'));
const RolesPermissions = lazy(() => import('../pages/roles-permissions'));
const DataBackup = lazy(() => import('../pages/data-backup'));
const BusinessNature = lazy(() => import('../pages/business-nature'));
const AuditLogs = lazy(() => import('../pages/audit-logs'));
const BankReconciliation = lazy(() => import('../pages/bank-reconciliation'));
const Ledgers = lazy(() => import('../pages/ledgers'));
const LedgerGroups = lazy(() => import('../pages/ledger-groups'));
const CostCentres = lazy(() => import('../pages/cost-centres'));
const Profile = lazy(() => import('../pages/profile'));
const Chat = lazy(() => import('../pages/chat'));
const Calendar = lazy(() => import('../pages/calendar'));
const FileManager = lazy(() => import('../pages/file-manager'));
const Tickets = lazy(() => import('../pages/tickets'));
const TicketsList = lazy(() => import('../pages/tickets-list'));
const TicketDetails = lazy(() => import('../pages/ticket-details'));
const TicketKanban = lazy(() => import('../pages/ticket-kanban'));
const KanbanView = lazy(() => import('../pages/kanban-view'));
const Notes = lazy(() => import('../pages/notes'));
const Todo = lazy(() => import('../pages/todo'));
const Blogs = lazy(() => import('../pages/blogs'));
const AddBlog = lazy(() => import('../pages/add-blog'));
const EditBlog = lazy(() => import('../pages/edit-blog'));
const BlogDetails = lazy(() => import('../pages/blog-details'));
const BlogCategories = lazy(() => import('../pages/blog-categories'));
const BlogTags = lazy(() => import('../pages/blog-tags'));
const ContactMessages = lazy(() => import('../pages/contact-messages'));
const SearchResult = lazy(() => import('../pages/search-result'));
const Pricing = lazy(() => import('../pages/pricing'));
const Faq = lazy(() => import('../pages/faq'));
const PrivacyPolicy = lazy(() => import('../pages/privacy-policy'));
const TermsCondition = lazy(() => import('../pages/terms-condition'));
const SuperAdminDashboard = lazy(() => import('../pages/super-admin-dashboard'));
const Approvals = lazy(() => import('../pages/approvals'));
const Cheques = lazy(() => import('../pages/cheques'));
const GstRcm = lazy(() => import('../pages/gst-rcm'));
const Currencies = lazy(() => import('../pages/currencies'));
const Warehouses = lazy(() => import('../pages/warehouses'));
const Version = lazy(() => import('../pages/Version'));
const BankAccounts = lazy(() => import('../pages/bank-accounts'));
const BankAccountsType = lazy(() => import('../pages/bank-accounts-type'));
const BankAccountsSettings = lazy(() => import('../pages/bank-accounts-settings'));
const PaymentMethods = lazy(() => import('../pages/payment-methods'));

// Helper for legacy redirects with parameters
const ParamRedirect = ({ toPrefix }) => {
  const params = useParams();
  const id = params.id;
  return <Navigate to={`${toPrefix}/${id}`} replace />;
};

const MiscRoutes = () => (
  <Routes>
    {/* Dashboard as the default route for the catch-all module */}
    <Route index element={<Index />} />
    <Route path="dashboard" element={<Index />} />
    <Route path="mis-dashboard" element={<MISDashboard />} />
    <Route path="version-control" element={<Version />} />
    <Route path="account-settings" element={<AccountSettings />} />
    
    <Route path="companies" element={<ProtectedRoute module="settings" action="can_read"><Companies /></ProtectedRoute>} />
    <Route path="add-company" element={<ProtectedRoute module="settings" action="can_create"><AddCompany /></ProtectedRoute>} />
    <Route path="company-details/:id" element={<ProtectedRoute module="settings" action="can_read"><CompanyDetails /></ProtectedRoute>} />
    <Route path="company/profile" element={<ProtectedRoute module="settings" action="can_read"><CompanyProfile /></ProtectedRoute>} />
    <Route path="company/financial-years" element={<ProtectedRoute module="settings" action="can_read"><FinancialYears /></ProtectedRoute>} />
    <Route path="company/users" element={<ProtectedRoute module="users" action="can_read"><UsersAccess /></ProtectedRoute>} />
    <Route path="company/roles" element={<ProtectedRoute module="users" action="can_read"><RolesPermissions /></ProtectedRoute>} />
    <Route path="company/backup" element={<ProtectedRoute module="settings" action="can_read"><DataBackup /></ProtectedRoute>} />
    <Route path="profile" element={<Profile />} />
    <Route path="chat" element={<Chat />} />
    <Route path="calendar" element={<Calendar />} />
    <Route path="file-manager" element={<FileManager />} />
    <Route path="tickets" element={<Tickets />} />
    <Route path="tickets-list" element={<TicketsList />} />
    <Route path="ticket-details" element={<TicketDetails />} />
    <Route path="ticket-kanban" element={<TicketKanban />} />
    <Route path="kanban-view" element={<KanbanView />} />
    <Route path="notes" element={<Notes />} />
    <Route path="todo" element={<Todo />} />
    <Route path="blogs" element={<Blogs />} />
    <Route path="add-blog" element={<AddBlog />} />
    <Route path="edit-blog" element={<EditBlog />} />
    <Route path="blog-details" element={<BlogDetails />} />
    <Route path="blog-categories" element={<BlogCategories />} />
    <Route path="blog-tags" element={<BlogTags />} />
    <Route path="contact-messages" element={<ContactMessages />} />
    <Route path="search-result" element={<SearchResult />} />
    <Route path="pricing" element={<Pricing />} />
    <Route path="faq" element={<Faq />} />
    <Route path="privacy-policy" element={<PrivacyPolicy />} />
    <Route path="terms-condition" element={<TermsCondition />} />
    <Route path="super-admin-dashboard" element={<SuperAdminDashboard />} />
    <Route path="approvals" element={<ProtectedRoute module="approvals" action="can_read"><Approvals /></ProtectedRoute>} />
    <Route path="banking/cheques" element={<ProtectedRoute module="banking" action="can_read"><Cheques /></ProtectedRoute>} />
    <Route path="gst/rcm" element={<ProtectedRoute module="reports" action="can_read"><GstRcm /></ProtectedRoute>} />
    <Route path="business-nature" element={<ProtectedRoute module="settings" action="can_read"><BusinessNature /></ProtectedRoute>} />
    <Route path="audit-logs" element={<ProtectedRoute module="settings" action="can_read"><AuditLogs /></ProtectedRoute>} />
    <Route path="vouchers" element={<Navigate to="/accounting/vouchers" replace />} />
    <Route path="add-voucher" element={<Navigate to="/accounting/vouchers/add" replace />} />
    <Route path="edit-voucher/:id" element={<ParamRedirect toPrefix="/accounting/vouchers/edit" />} />
    <Route path="bank-reconciliation" element={<ProtectedRoute module="banking" action="can_read"><BankReconciliation /></ProtectedRoute>} />
    <Route path="bank-accounts" element={<ProtectedRoute module="banking" action="can_read"><BankAccounts /></ProtectedRoute>} />
    <Route path="bank-accounts-type" element={<ProtectedRoute module="banking" action="can_read"><BankAccountsType /></ProtectedRoute>} />
    <Route path="bank-accounts-settings" element={<ProtectedRoute module="banking" action="can_read"><BankAccountsSettings /></ProtectedRoute>} />
    <Route path="payment-methods" element={<ProtectedRoute module="banking" action="can_read"><PaymentMethods /></ProtectedRoute>} />
    <Route path="ledgers" element={<ProtectedRoute module="accounting" action="can_read"><Ledgers /></ProtectedRoute>} />
    <Route path="ledger-groups" element={<ProtectedRoute module="accounting" action="can_read"><LedgerGroups /></ProtectedRoute>} />
    <Route path="cost-centers" element={<ProtectedRoute module="accounting" action="can_read"><CostCentres /></ProtectedRoute>} />
    <Route path="cost-centres" element={<ProtectedRoute module="accounting" action="can_read"><CostCentres /></ProtectedRoute>} />
    
    {/* Invoicing Flat URL Redirects */}
    <Route path="sales-invoices" element={<Navigate to="/invoicing/sales" replace />} />
    <Route path="add-sales-invoice" element={<Navigate to="/invoicing/sales/add" replace />} />
    <Route path="edit-sales-invoice/:id" element={<ParamRedirect toPrefix="/invoicing/sales/edit" />} />
    <Route path="purchases" element={<Navigate to="/invoicing/purchases" replace />} />
    <Route path="add-purchases" element={<Navigate to="/invoicing/purchases/add" replace />} />
    <Route path="credit-notes" element={<Navigate to="/invoicing/credit-notes" replace />} />
    <Route path="add-credit-note" element={<Navigate to="/invoicing/credit-notes/add" replace />} />
    <Route path="debit-notes" element={<Navigate to="/invoicing/debit-notes" replace />} />
    <Route path="add-debit-note" element={<Navigate to="/invoicing/debit-notes/add" replace />} />
    <Route path="add-debit-notes" element={<Navigate to="/invoicing/debit-notes/add" replace />} />

    {/* Inventory Flat URL Redirects */}
    <Route path="item-categories" element={<Navigate to="/inventory/categories" replace />} />
    <Route path="batch-tracking" element={<Navigate to="/inventory/batch-tracking" replace />} />
    <Route path="serial-numbers" element={<Navigate to="/inventory/serial-numbers" replace />} />
    <Route path="stock-alerts" element={<Navigate to="/inventory/stock-alerts" replace />} />
    <Route path="wastage" element={<Navigate to="/inventory/wastage" replace />} />

    {/* Master Data Flat URL Redirects */}
    <Route path="customers" element={<Navigate to="/master/customers" replace />} />
    <Route path="vendors" element={<Navigate to="/master/vendors" replace />} />

    {/* Local Navigation Redirects */}
    <Route path="warehouses" element={<ProtectedRoute module="inventory" action="can_read"><Warehouses /></ProtectedRoute>} />
    <Route path="warehouse" element={<Navigate to="/warehouses" replace />} />
    <Route path="financial-year" element={<Navigate to="/company/financial-years" replace />} />

    {/* Payroll Flat URL Redirects */}
    <Route path="employees" element={<Navigate to="/payroll/employees" replace />} />
    <Route path="add-employee" element={<Navigate to="/payroll/employees/add" replace />} />
    <Route path="attendance" element={<Navigate to="/payroll/attendance" replace />} />
    <Route path="salary-structure" element={<Navigate to="/payroll/salary-structure" replace />} />
    <Route path="payslips" element={<Navigate to="/payroll/payslips" replace />} />

    {/* Multi-Currency Route */}
    <Route path="currencies" element={<ProtectedRoute module="settings" action="can_read"><Currencies /></ProtectedRoute>} />

    {/* Report Flat URL Redirects */}
    <Route path="trial-balance" element={<Navigate to="/reports/trial-balance" replace />} />
    <Route path="profit-loss-report" element={<Navigate to="/reports/profit-loss-report" replace />} />
    <Route path="balance-sheet" element={<Navigate to="/reports/balance-sheet" replace />} />
    <Route path="ledger-report" element={<Navigate to="/reports/ledger-report" replace />} />
    <Route path="outstanding-reports" element={<Navigate to="/reports/outstanding-reports" replace />} />

    {/* Catch-all for unmatched URLs within the app to prevent blank screens */}
    <Route path="*" element={<Navigate to="/error-404" replace />} />
  </Routes>
);

export default MiscRoutes;
