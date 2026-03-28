import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider, useAuth } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthDebug from "./components/AuthDebug";
import { initializeSampleData } from "./utils/initializeData";
import { isAuthenticated } from "./services/authService";
import AccountSettings from "./pages/account-settings";
import AccountStatement from "./pages/account-statement";
import AddBlog from "./pages/add-blog";
import AddCompany from "./pages/add-company";
import AddCreditNote from "./pages/add-credit-note";
import AddCustomer from "./pages/add-customer";
import AddDebitNote from "./pages/add-debit-note";
import AddDeliveryChallan from "./pages/add-delivery-challan";
import AddInvoice from "./pages/add-invoice";
import AddProduct from "./pages/add-product";
import AddPurchaseOrder from "./pages/add-purchase-order";
import AddPurchasesOrders from "./pages/add-purchases-orders";
import AddPurchaseInvoice from "./pages/add-purchase-invoice";
import AddQuotation from "./pages/add-quotation";
import AdminDashboard from "./pages/admin-dashboard";
import AiConfiguration from "./pages/ai-configuration";
import AnnualReport from "./pages/annual-report";
import ApiKeys from "./pages/api-keys";
import Version from "./pages/Version";
import AppearanceSettings from "./pages/appearance-settings";
import AuditLogs from "./pages/audit-logs";
import AuthenticationSettings from "./pages/authentication-settings";
import BalanceSheet from "./pages/balance-sheet";
import BankAccountsSettings from "./pages/bank-accounts-settings";
import BankAccountsType from "./pages/bank-accounts-type";
import BankReconciliation from "./pages/bank-reconciliation";
import BankAccounts from "./pages/bank-accounts";
import BarcodeSettings from "./pages/barcode-settings";
import BestSeller from "./pages/best-seller";
import BlogCategories from "./pages/blog-categories";
import BlogComments from "./pages/blog-comments";
import BlogDetails from "./pages/blog-details";
import BlogTag from "./pages/blog-tag";
import BlogTags from "./pages/blog-tags";
import Blogs from "./pages/blogs";
import BusinessNature from "./pages/business-nature";
import BusBookingInvoice from "./pages/bus-booking-invoice";
import Calendar from "./pages/calendar";
import CallHistory from "./pages/call-history";
import Call from "./pages/call";
import CarBookingInvoice from "./pages/car-booking-invoice";
import CashFlow from "./pages/cash-flow";
import FundFlow from "./pages/fund-flow";
import Category from "./pages/category";
import ChartApex from "./pages/chart-apex";
import ChartC3 from "./pages/chart-c3";
import ChartFlot from "./pages/chart-flot";
import ChartJs from "./pages/chart-js";
import ChartMorris from "./pages/chart-morris";
import ChartPeity from "./pages/chart-peity";
import Chat from "./pages/chat";
import Cities from "./pages/cities";
import City from "./pages/city";
import ClearCache from "./pages/clear-cache";
import CoffeeShopInvoice from "./pages/coffee-shop-invoice";
import ComingSoon from "./pages/coming-soon";
import Companies from "./pages/companies";
import CompanyDetails from "./pages/company-details";
import FinancialYears from "./pages/financial-years";
import UsersAccess from "./pages/users-access";
import RolesManagement from "./pages/roles-management";
import DataBackup from "./pages/data-backup";
import CompanyProfile from "./pages/company-profile";
import CompanySettings from "./pages/company-settings";
import ContactMessage from "./pages/contact-message";
import ContactMessages from "./pages/contact-messages";
import Contacts from "./pages/contacts";
import Countries from "./pages/countries";
import CreditNotes from "./pages/credit-notes";
import Categories from "./pages/category";
import CostCentres from "./pages/cost-centres";
import Cronjob from "./pages/cronjob";
import CurrenciesSettings from "./pages/currencies-settings";
import Currencies from "./pages/currencies";
import CustomCss from "./pages/custom-css";
import CustomFields from "./pages/custom-fields";
import CustomJs from "./pages/custom-js";
import CustomerAccountSettings from "./pages/customer-account-settings";
import CustomerAddQuotation from "./pages/customer-add-quotation";
import CustomerDashboard from "./pages/customer-dashboard";
import CustomerDetails from "./pages/customer-details";
import CustomerDueReport from "./pages/customer-due-report";
import CustomerInvoiceDetails from "./pages/customer-invoice-details";
import CustomerInvoiceReport from "./pages/customer-invoice-report";
import CustomerInvoices from "./pages/customer-invoices";
import CustomerNotificationSettings from "./pages/customer-notification-settings";
import CustomerNotificationsSettings from "./pages/customer-notifications-settings";
import CustomerPaymentSummary from "./pages/customer-payment-summary";
import CustomerPlansSettings from "./pages/customer-plans-settings";
import CustomerQuotations from "./pages/customer-quotations";
import CustomerRecurringInvoices from "./pages/customer-recurring-invoices";
import CustomerSecuritySettings from "./pages/customer-security-settings";
import CustomerTransactions from "./pages/customer-transactions";
import CustomersReport from "./pages/customers-report";
import Customers from "./pages/customers";
import DataTables from "./pages/data-tables";
import DatabaseBackup from "./pages/database-backup";
import DebitNotes from "./pages/debit-notes";
import DeleteAccountRequest from "./pages/delete-account-request";
import DeliveryChallans from "./pages/delivery-challans";
import DomainHostingInvoice from "./pages/domain-hosting-invoice";
import Domain from "./pages/domain";
import EcommerceInvoice from "./pages/ecommerce-invoice";
import ItemDetails from "./pages/item-details";
import EditBlog from "./pages/edit-blog";
import EditCreditNote from "./pages/edit-credit-note";
import EditDebitNote from "./pages/edit-debit-note";
import CreditNoteDetails from "./pages/credit-note-details";
import DebitNoteDetails from "./pages/debit-note-details";
import SalesOrderDetails from "./pages/sales-order-details";
import PurchaseOrderDetails from "./pages/purchase-order-details";
import EditCustomer from "./pages/edit-customer";
import EditDeliveryChallan from "./pages/edit-delivery-challan";
import EditInvoice from "./pages/edit-invoice";
import EditProduct from "./pages/edit-product";
import EditPurchasesOrders from "./pages/edit-purchases-orders";
import EditPurchaseInvoice from "./pages/edit-purchase-invoice";
import EditQuotation from "./pages/edit-quotation";
import EmailReply from "./pages/email-reply";
import EmailSettings from "./pages/email-settings";
import EmailTemplates from "./pages/email-templates";
import EmailVerification from "./pages/email-verification";
import Email from "./pages/email";
import Error404 from "./pages/error-404";
import Error500 from "./pages/error-500";
import Esignatures from "./pages/esignatures";
import ExpenseReport from "./pages/expense-report";
import Expenses from "./pages/expenses";
import ExtendedDragula from "./pages/extended-dragula";
import Faq from "./pages/faq";
import FileAttachmentsPage from "./pages/file-attachments";
import FileManager from "./pages/file-manager";
import FinancialYearSettings from "./pages/financial-year-settings";
import FitnessCenterInvoice from "./pages/fitness-center-invoice";
import FlightBookingInvoice from "./pages/flight-booking-invoice";
import ForgotPassword from "./pages/forgot-password";
import FormBasicInputs from "./pages/form-basic-inputs";
import FormCheckboxRadios from "./pages/form-checkbox-radios";
import FormFileupload from "./pages/form-fileupload";
import FormFloatingLabels from "./pages/form-floating-labels";
import FormGridGutters from "./pages/form-grid-gutters";
import FormHorizontal from "./pages/form-horizontal";
import FormInputGroups from "./pages/form-input-groups";
import FormMask from "./pages/form-mask";
import FormPickers from "./pages/form-pickers";
import FormSelect from "./pages/form-select";
import FormSelect2 from "./pages/form-select2";
import FormValidation from "./pages/form-validation";
import FormVertical from "./pages/form-vertical";
import FormWizard from "./pages/form-wizard";
import Frontend from "./pages/frontend";
import Gallery from "./pages/gallery";
import GdprCookies from "./pages/gdpr-cookies";
import GeneralInvoice1 from "./pages/general-invoice-1";
import GeneralInvoice10 from "./pages/general-invoice-10";
import GeneralInvoice2 from "./pages/general-invoice-2";
import GeneralInvoice3 from "./pages/general-invoice-3";
import GeneralInvoice4 from "./pages/general-invoice-4";
import GeneralInvoice5 from "./pages/general-invoice-5";
import GeneralInvoice6 from "./pages/general-invoice-6";
import GeneralInvoice7 from "./pages/general-invoice-7";
import GeneralInvoice8 from "./pages/general-invoice-8";
import GeneralInvoice9 from "./pages/general-invoice-9";
import HotelBookingInvoice from "./pages/hotel-booking-invoice";
import IconBootstrap from "./pages/icon-bootstrap";
import IconFeather from "./pages/icon-feather";
import IconFlag from "./pages/icon-flag";
import IconFontawesome from "./pages/icon-fontawesome";
import IconIonic from "./pages/icon-ionic";
import IconMaterial from "./pages/icon-material";
import IconPe7 from "./pages/icon-pe7";
import IconRemix from "./pages/icon-remix";
import IconSimpleline from "./pages/icon-simpleline";
import IconTabler from "./pages/icon-tabler";
import IconThemify from "./pages/icon-themify";
import IconTypicon from "./pages/icon-typicon";
import IconWeather from "./pages/icon-weather";
import IncomeReport from "./pages/income-report";
import Incomes from "./pages/incomes";
import IncomingCall from "./pages/incoming-call";
import Index from "./pages/index";
import IntegrationsSettings from "./pages/integrations-settings";
import InternetBillingInvoice from "./pages/internet-billing-invoice";
import InventoryReport from "./pages/inventory-report";
import Inventory from "./pages/inventory";
import InvoiceDetails from "./pages/invoice-details";
import InvoiceMedical from "./pages/invoice-medical";
import InvoiceSettings from "./pages/invoice-settings";
import InvoiceTemplatesSettings from "./pages/invoice-templates-settings";
import InvoiceTemplates from "./pages/invoice-templates";
import Invoice from "./pages/invoice";
import Invoices from "./pages/invoices";
import KanbanView from "./pages/kanban-view";
import LanguageSetting2 from "./pages/language-setting2";
import LanguageSetting3 from "./pages/language-setting3";
import LanguageSettings from "./pages/language-settings";
import LayoutDark from "./pages/layout-dark";
import LayoutDefault from "./pages/layout-default";
import LayoutMini from "./pages/layout-mini";
import LayoutRtl from "./pages/layout-rtl";
import LayoutSingle from "./pages/layout-single";
import LayoutTransparent from "./pages/layout-transparent";
import LayoutWithoutHeader from "./pages/layout-without-header";
import LedgerReport from "./pages/ledger-report";
import GroupLedgerReport from "./pages/group-ledger-report";
import LocalizationSettings from "./pages/localization-settings";
import LockScreen from "./pages/lock-screen";
import Login from "./pages/login";
import LowStock from "./pages/low-stock";
import MaintenanceMode from "./pages/maintenance-mode";
import MapsLeaflet from "./pages/maps-leaflet";
import MapsVector from "./pages/maps-vector";
import MembershipAddons from "./pages/membership-addons";
import MembershipPlans from "./pages/membership-plans";
import MembershipTransactions from "./pages/membership-transactions";
import MoneyExchangeInvoice from "./pages/money-exchange-invoice";
import MoneyTransfer from "./pages/money-transfer";
import MovieTicketBookingInvoice from "./pages/movie-ticket-booking-invoice";
import Notes from "./pages/notes";
import NotificationsSettings from "./pages/notifications-settings";
import Notifications from "./pages/notifications";
import OutgoingCall from "./pages/outgoing-call";
import PackagesGrid from "./pages/packages-grid";
import Packages from "./pages/packages";
import Pages from "./pages/pages";
import PaymentMethods from "./pages/payment-methods";
import PaymentSummary from "./pages/payment-summary";
import OutstandingReports from "./pages/outstanding-reports";
import Payments from "./pages/payments";
import Permission from "./pages/permission";
import PlansBillings from "./pages/plans-billings";
import PluginManager from "./pages/plugin-manager";
import PreferenceSettings from "./pages/preference-settings";
import PrefixesSettings from "./pages/prefixes-settings";
import Pricing from "./pages/pricing";
import PrivacyPolicy from "./pages/privacy-policy";
import Products from "./pages/products";
import Profile from "./pages/profile";
import ProfitLossReport from "./pages/profit-loss-report";
import Projects from "./pages/projects";
import PurchaseOrdersReport from "./pages/purchase-orders-report";
import PurchaseOrders from "./pages/purchase-orders";
import PurchaseReturnReport from "./pages/purchase-return-report";
import PurchaseTransaction from "./pages/purchase-transaction";
import PurchasesReport from "./pages/purchases-report";
import PurchaseInvoices from "./pages/purchase-invoices";
import ProformaInvoices from "./pages/proforma-invoices";
import AddProformaInvoice from "./pages/add-proforma-invoice";
import EditProformaInvoice from "./pages/edit-proforma-invoice";
import ProformaInvoiceDetails from "./pages/proforma-invoice-details";
import PurchaseInvoiceDetails from "./pages/purchase-invoice-details";
import QuotationReport from "./pages/quotation-report";
import Quotations from "./pages/quotations";
import ReceiptInvoice1 from "./pages/receipt-invoice-1";
import ReceiptInvoice2 from "./pages/receipt-invoice-2";
import ReceiptInvoice3 from "./pages/receipt-invoice-3";
import ReceiptInvoice4 from "./pages/receipt-invoice-4";
import RecurringInvoices from "./pages/recurring-invoices";
import Register from "./pages/register";
import Reports from "./pages/reports";
import ResetPassword from "./pages/reset-password";
import RestaurantsInvoice from "./pages/restaurants-invoice";
import RolesPermission from "./pages/roles-permission";
import RolesPermissions from "./pages/roles-permissions";
import AddSalesOrder from "./pages/add-sales-order";
import SalesOrders from "./pages/sales-orders";
import SalesInvoices from "./pages/sales-invoices";
import AddSalesInvoice from "./pages/add-sales-invoice";
import EditSalesInvoice from "./pages/edit-sales-invoice";
import SalesInvoiceDetails from "./pages/sales-invoice-details";
import SalesReport from "./pages/sales-report";
import SalesReturns from "./pages/sales-returns";
import SassSettings from "./pages/sass-settings";
import SearchList from "./pages/search-list";
import SearchResult from "./pages/search-result";
import SecuritySettings from "./pages/security-settings";
import SeoSetup from "./pages/seo-setup";
import Sitemap from "./pages/sitemap";
import SmsGateways from "./pages/sms-gateways";
import SocialFeed from "./pages/social-feed";
import SoldStock from "./pages/sold-stock";
import Starter from "./pages/starter";
import States from "./pages/states";
import StockHistory from "./pages/stock-history";
import StockAgeing from "./pages/stock-ageing";
import StockSummary from "./pages/stock-summary";
import Storage from "./pages/storage";
import StudentBillingInvoice from "./pages/student-billing-invoice";
import Subscribers from "./pages/subscribers";
import Subscriptions from "./pages/subscriptions";
import SuperAdminDashboard from "./pages/super-admin-dashboard";
import SupplierPayments from "./pages/supplier-payments";
import SupplierReport from "./pages/supplier-report";
import Suppliers from "./pages/suppliers";
import Vendors from "./pages/vendors";
import AddVendor from "./pages/add-vendor";
import EditVendor from "./pages/edit-vendor";
import VendorDetails from "./pages/vendor-details";
import SystemBackup from "./pages/system-backup";
import SystemUpdate from "./pages/system-update";
import TablesBasic from "./pages/tables-basic";
import TaxRates from "./pages/tax-rates";
import TaxReport from "./pages/tax-report";
import TermsCondition from "./pages/terms-condition";
import Testimonials from "./pages/testimonials";
import ThermalPrinter from "./pages/thermal-printer";
import TicketDetails from "./pages/ticket-details";
import TicketKanban from "./pages/ticket-kanban";
import TicketsList from "./pages/tickets-list";
import Tickets from "./pages/tickets";
import Timeline from "./pages/timeline";
import TodoList from "./pages/todo-list";
import Todo from "./pages/todo";
import TrainTicketInvoice from "./pages/train-ticket-invoice";
import Transactions from "./pages/transactions";
import TrialBalance from "./pages/trial-balance";
import TwoStepVerification from "./pages/two-step-verification";
import UiAccordion from "./pages/ui-accordion";
import UiAlerts from "./pages/ui-alerts";
import UiAvatar from "./pages/ui-avatar";
import UiBadges from "./pages/ui-badges";
import UiBorders from "./pages/ui-borders";
import UiBreadcrumb from "./pages/ui-breadcrumb";
import UiButtonsGroup from "./pages/ui-buttons-group";
import UiButtons from "./pages/ui-buttons";
import UiCards from "./pages/ui-cards";
import UiCarousel from "./pages/ui-carousel";
import UiClipboard from "./pages/ui-clipboard";
import UiCollapse from "./pages/ui-collapse";
import UiColors from "./pages/ui-colors";
import UiCounter from "./pages/ui-counter";
import UiDragDrop from "./pages/ui-drag-drop";
import UiDropdowns from "./pages/ui-dropdowns";
import UiGrid from "./pages/ui-grid";
import UiImages from "./pages/ui-images";
import UiLightbox from "./pages/ui-lightbox";
import UiLinks from "./pages/ui-links";
import UiListGroup from "./pages/ui-list-group";
import UiMedia from "./pages/ui-media";
import UiModals from "./pages/ui-modals";
import UiNavTabs from "./pages/ui-nav-tabs";
import UiOffcanvas from "./pages/ui-offcanvas";
import UiPagination from "./pages/ui-pagination";
import UiPlaceholders from "./pages/ui-placeholders";
import UiPopovers from "./pages/ui-popovers";
import UiProgress from "./pages/ui-progress";
import UiRangeslider from "./pages/ui-rangeslider";
import UiRating from "./pages/ui-rating";
import UiRatio from "./pages/ui-ratio";
import UiRibbon from "./pages/ui-ribbon";
import UiScrollbar from "./pages/ui-scrollbar";
import UiScrollspy from "./pages/ui-scrollspy";
import UiSortable from "./pages/ui-sortable";
import UiSpinner from "./pages/ui-spinner";
import UiStickynote from "./pages/ui-stickynote";
import UiSweetalerts from "./pages/ui-sweetalerts";
import UiSwiperjs from "./pages/ui-swiperjs";
import UiTextEditor from "./pages/ui-text-editor";
import UiTimeline from "./pages/ui-timeline";
import UiToasts from "./pages/ui-toasts";
import UiTooltips from "./pages/ui-tooltips";
import UiTypography from "./pages/ui-typography";
import UiUtilities from "./pages/ui-utilities";
import UiVideo from "./pages/ui-video";
import UnderConstruction from "./pages/under-construction";
import UnderMaintenance from "./pages/under-maintenance";
import Units from "./pages/units";
import Users from "./pages/users";
import VideoCall from "./pages/video-call";
import VoiceCall from "./pages/voice-call";
import TestPage from "./pages/test-page";
import Branches from "./pages/branches";
import LedgerGroups from "./pages/ledger-groups";
import AddLedgerGroup from "./pages/add-ledger-group";
import EditLedgerGroup from "./pages/edit-ledger-group";
import Ledgers from "./pages/ledgers";
import AddLedger from "./pages/add-ledger";
import EditLedger from "./pages/edit-ledger";
import Accounting from "./pages/accounting";
import Vouchers from "./pages/vouchers";
import AddVoucher from "./pages/add-voucher";
import EditVoucher from "./pages/edit-voucher";
import AddItem from "./pages/add-item";
import Items from "./pages/items";
import EditItemNew from "./pages/edit-item-new";
import ItemCategories from "./pages/item-categories";
import UOM from "./pages/uom";
import Warehouses from "./pages/warehouses";
import StockTransfers from "./pages/stock-transfers";
import AddStockTransfer from "./pages/add-stock-transfer";
import StockVerification from "./pages/stock-verification";
import StockVerificationDetail from "./pages/stock-verification-detail";
import BatchTracking from "./pages/batch-tracking";
import SerialNumbers from "./pages/serial-numbers";
import Wastage from "./pages/wastage";
import StockAlerts from "./pages/stock-alerts";
import HSNSACMaster from "./pages/hsn-sac-master";
import TaxMaster from "./pages/tax-master";
import EInvoices from "./pages/e-invoices";
import EInvoiceDetails from "./pages/e-invoice-details";
import EInvoiceGenerate from "./pages/e-invoice-generate";
import AddEWayBill from "./pages/add-eway-bill";
import EWayBills from "./pages/eway-bills";
import GSTR1 from "./pages/gstr-1";
import GSTR3B from "./pages/gstr-3b";
import GSTR9 from "./pages/gstr-9";
import ITCRegister from "./pages/itc-register";
import AddBankReconciliation from "./pages/add-bank-reconciliation";
import MatchBankReconciliation from "./pages/match-bank-reconciliation";
import InterestCalculation from "./pages/interest-calculation";
import Budgets from "./pages/Budgets";
import AddBudget from "./pages/add-budget";
import EditBudget from "./pages/edit-budget";
import BudgetVariance from "./pages/BudgetVariance";

// Root redirect component
const RootRedirect = () => {
  const { authenticated } = useAuth();
  console.log("##### login ", authenticated);
  return <Navigate to={authenticated ? "/dashboard" : "/login"} replace />;
};

function App() {
  useEffect(() => {
    initializeSampleData();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Auth routes without layout */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="email-verification" element={<EmailVerification />} />
          <Route
            path="two-step-verification"
            element={<TwoStepVerification />}
          />
          <Route path="lock-screen" element={<LockScreen />} />
          <Route path="error-404" element={<Error404 />} />
          <Route path="error-500" element={<Error500 />} />
          <Route
            path="admin-dashboard"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route path="coming-soon" element={<ComingSoon />} />
          <Route path="under-construction" element={<UnderConstruction />} />
          <Route path="under-maintenance" element={<UnderMaintenance />} />
          <Route path="maintenance-mode" element={<MaintenanceMode />} />
          <Route path="test" element={<TestPage />} />

          {/* Main app routes with layout - Protected */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="account-settings" element={<AccountSettings />} />
            <Route path="account-statement" element={<AccountStatement />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="add-company" element={<AddCompany />} />
            <Route
              path="add-delivery-challan"
              element={<AddDeliveryChallan />}
            />
            <Route path="add-invoice" element={<AddInvoice />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route
              path="add-purchases-orders"
              element={<AddPurchasesOrders />}
            />
            <Route path="add-quotation" element={<AddQuotation />} />
            <Route path="ai-configuration" element={<AiConfiguration />} />
            <Route path="annual-report" element={<AnnualReport />} />
            <Route path="api-keys" element={<ApiKeys />} />
            <Route
              path="appearance-settings"
              element={<AppearanceSettings />}
            />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route
              path="authentication-settings"
              element={<AuthenticationSettings />}
            />
            <Route path="balance-sheet" element={<BalanceSheet />} />
            <Route
              path="bank-accounts-settings"
              element={<BankAccountsSettings />}
            />
            <Route path="bank-accounts-type" element={<BankAccountsType />} />
            <Route
              path="bank-reconciliation"
              element={<BankReconciliation />}
            />
            <Route
              path="accounting/bank-reconciliation"
              element={<BankReconciliation />}
            />
            <Route
              path="accounting/bank-reconciliation/add"
              element={<AddBankReconciliation />}
            />
            <Route
              path="bank-reconciliation/:id"
              element={<MatchBankReconciliation />}
            />
            <Route
              path="accounting/interest"
              element={<InterestCalculation />}
            />
            <Route path="bank-accounts" element={<BankAccounts />} />
            <Route path="barcode-settings" element={<BarcodeSettings />} />
            <Route path="best-seller" element={<BestSeller />} />
            <Route path="blog-categories" element={<BlogCategories />} />
            <Route path="blog-comments" element={<BlogComments />} />
            <Route path="blog-details" element={<BlogDetails />} />
            <Route path="blog-tag" element={<BlogTag />} />
            <Route path="blog-tags" element={<BlogTags />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="business-nature" element={<BusinessNature />} />
            <Route path="bus-booking-invoice" element={<BusBookingInvoice />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="call-history" element={<CallHistory />} />
            <Route path="call" element={<Call />} />
            <Route path="car-booking-invoice" element={<CarBookingInvoice />} />
            <Route path="cash-flow" element={<CashFlow />} />
            <Route path="fund-flow" element={<FundFlow />} />
            <Route path="category" element={<Category />} />
            <Route path="chart-apex" element={<ChartApex />} />
            <Route path="chart-c3" element={<ChartC3 />} />
            <Route path="chart-flot" element={<ChartFlot />} />
            <Route path="chart-js" element={<ChartJs />} />
            <Route path="chart-morris" element={<ChartMorris />} />
            <Route path="chart-peity" element={<ChartPeity />} />
            <Route path="chat" element={<Chat />} />
            <Route path="cities" element={<Cities />} />
            <Route path="city" element={<City />} />
            <Route path="clear-cache" element={<ClearCache />} />
            <Route path="coffee-shop-invoice" element={<CoffeeShopInvoice />} />
            <Route path="coming-soon" element={<ComingSoon />} />
            <Route path="companies" element={<Companies />} />
            <Route path="company-details/:id" element={<CompanyDetails />} />
            <Route path="company/profile" element={<CompanyProfile />} />
            <Route
              path="company/financial-years"
              element={<FinancialYears />}
            />
            <Route path="company/users" element={<UsersAccess />} />
            <Route path="company/roles" element={<RolesManagement />} />
            <Route path="company/backup" element={<DataBackup />} />
            <Route path="accounting/ledger-groups" element={<LedgerGroups />} />
            <Route path="accounting/ledgers" element={<Ledgers />} />
            <Route path="accounting/budgets" element={<Budgets />} />
            <Route path="accounting/budgets/add" element={<AddBudget />} />
            <Route
              path="accounting/budgets/edit/:id"
              element={<EditBudget />}
            />
            <Route
              path="accounting/budgets/:id/variance"
              element={<BudgetVariance />}
            />
            <Route path="company-settings" element={<CompanySettings />} />
            <Route path="branches" element={<Branches />} />
            <Route path="contact-message" element={<ContactMessage />} />
            <Route path="contact-messages" element={<ContactMessages />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="countries" element={<Countries />} />
            <Route path="accounting/cost-centres" element={<CostCentres />} />
            <Route path="cost-centers" element={<CostCentres />} />
            <Route path="cronjob" element={<Cronjob />} />
            <Route
              path="currencies-settings"
              element={<CurrenciesSettings />}
            />
            <Route path="currencies" element={<Currencies />} />
            <Route path="custom-css" element={<CustomCss />} />
            <Route path="custom-fields" element={<CustomFields />} />
            <Route path="custom-js" element={<CustomJs />} />
            <Route
              path="customer-account-settings"
              element={<CustomerAccountSettings />}
            />
            <Route
              path="customer-add-quotation"
              element={<CustomerAddQuotation />}
            />
            <Route path="customer-dashboard" element={<CustomerDashboard />} />
            <Route path="customer-details" element={<CustomerDetails />} />
            <Route path="customer-details/:id" element={<CustomerDetails />} />
            <Route path="customer-due-report" element={<CustomerDueReport />} />
            <Route
              path="customer-invoice-details"
              element={<CustomerInvoiceDetails />}
            />
            <Route
              path="customer-invoice-report"
              element={<CustomerInvoiceReport />}
            />
            <Route path="customer-invoices" element={<CustomerInvoices />} />
            <Route
              path="customer-notification-settings"
              element={<CustomerNotificationSettings />}
            />
            <Route
              path="customer-notifications-settings"
              element={<CustomerNotificationsSettings />}
            />
            <Route
              path="customer-payment-summary"
              element={<CustomerPaymentSummary />}
            />
            <Route
              path="customer-plans-settings"
              element={<CustomerPlansSettings />}
            />
            <Route
              path="customer-quotations"
              element={<CustomerQuotations />}
            />
            <Route
              path="customer-recurring-invoices"
              element={<CustomerRecurringInvoices />}
            />
            <Route
              path="customer-security-settings"
              element={<CustomerSecuritySettings />}
            />
            <Route
              path="customer-transactions"
              element={<CustomerTransactions />}
            />
            <Route path="customers-report" element={<CustomersReport />} />
            <Route path="customers" element={<Customers />} />
            <Route path="data-tables" element={<DataTables />} />
            <Route path="database-backup" element={<DatabaseBackup />} />
            <Route
              path="delete-account-request"
              element={<DeleteAccountRequest />}
            />
            <Route path="delivery-challans" element={<DeliveryChallans />} />
            <Route
              path="domain-hosting-invoice"
              element={<DomainHostingInvoice />}
            />
            <Route path="domain" element={<Domain />} />
            <Route path="ecommerce-invoice" element={<EcommerceInvoice />} />
            <Route path="edit-blog" element={<EditBlog />} />
            <Route path="edit-customer" element={<EditCustomer />} />
            <Route
              path="edit-delivery-challan"
              element={<EditDeliveryChallan />}
            />
            <Route path="edit-invoice/:id" element={<EditInvoice />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route
              path="edit-purchases-orders"
              element={<EditPurchasesOrders />}
            />
            <Route path="edit-quotation" element={<EditQuotation />} />
            <Route path="email-reply" element={<EmailReply />} />
            <Route path="email-settings" element={<EmailSettings />} />
            <Route path="email-templates" element={<EmailTemplates />} />
            <Route path="email-verification" element={<EmailVerification />} />
            <Route path="email" element={<Email />} />
            <Route path="error-404" element={<Error404 />} />
            <Route path="error-500" element={<Error500 />} />
            <Route path="esignatures" element={<Esignatures />} />
            <Route path="expense-report" element={<ExpenseReport />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="extended-dragula" element={<ExtendedDragula />} />
            <Route path="faq" element={<Faq />} />
            <Route path="file-attachments" element={<FileAttachmentsPage />} />
            <Route path="file-manager" element={<FileManager />} />
            <Route
              path="financial-year"
              element={<Navigate to="/financial-year-settings" replace />}
            />
            <Route
              path="financial-year-settings"
              element={<FinancialYearSettings />}
            />
            <Route
              path="fitness-center-invoice"
              element={<FitnessCenterInvoice />}
            />
            <Route
              path="flight-booking-invoice"
              element={<FlightBookingInvoice />}
            />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="form-basic-inputs" element={<FormBasicInputs />} />
            <Route
              path="form-checkbox-radios"
              element={<FormCheckboxRadios />}
            />
            <Route path="form-fileupload" element={<FormFileupload />} />
            <Route
              path="form-floating-labels"
              element={<FormFloatingLabels />}
            />
            <Route path="form-grid-gutters" element={<FormGridGutters />} />
            <Route path="form-horizontal" element={<FormHorizontal />} />
            <Route path="form-input-groups" element={<FormInputGroups />} />
            <Route path="form-mask" element={<FormMask />} />
            <Route path="form-pickers" element={<FormPickers />} />
            <Route path="form-select" element={<FormSelect />} />
            <Route path="form-select2" element={<FormSelect2 />} />
            <Route path="form-validation" element={<FormValidation />} />
            <Route path="form-vertical" element={<FormVertical />} />
            <Route path="form-wizard" element={<FormWizard />} />
            <Route path="frontend" element={<Frontend />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gdpr-cookies" element={<GdprCookies />} />
            <Route path="general-invoice-1" element={<GeneralInvoice1 />} />
            <Route path="general-invoice-10" element={<GeneralInvoice10 />} />
            <Route path="general-invoice-2" element={<GeneralInvoice2 />} />
            <Route path="general-invoice-3" element={<GeneralInvoice3 />} />
            <Route path="general-invoice-4" element={<GeneralInvoice4 />} />
            <Route path="general-invoice-5" element={<GeneralInvoice5 />} />
            <Route path="general-invoice-6" element={<GeneralInvoice6 />} />
            <Route path="general-invoice-7" element={<GeneralInvoice7 />} />
            <Route path="general-invoice-8" element={<GeneralInvoice8 />} />
            <Route path="general-invoice-9" element={<GeneralInvoice9 />} />
            <Route
              path="hotel-booking-invoice"
              element={<HotelBookingInvoice />}
            />
            <Route path="icon-bootstrap" element={<IconBootstrap />} />
            <Route path="icon-feather" element={<IconFeather />} />
            <Route path="icon-flag" element={<IconFlag />} />
            <Route path="icon-fontawesome" element={<IconFontawesome />} />
            <Route path="icon-ionic" element={<IconIonic />} />
            <Route path="icon-material" element={<IconMaterial />} />
            <Route path="icon-pe7" element={<IconPe7 />} />
            <Route path="icon-remix" element={<IconRemix />} />
            <Route path="icon-simpleline" element={<IconSimpleline />} />
            <Route path="icon-tabler" element={<IconTabler />} />
            <Route path="icon-themify" element={<IconThemify />} />
            <Route path="icon-typicon" element={<IconTypicon />} />
            <Route path="icon-weather" element={<IconWeather />} />
            <Route path="income-report" element={<IncomeReport />} />
            <Route path="incomes" element={<Incomes />} />
            <Route path="incoming-call" element={<IncomingCall />} />
            <Route path="/" element={<Index />} />
            <Route
              path="integrations-settings"
              element={<IntegrationsSettings />}
            />
            <Route
              path="internet-billing-invoice"
              element={<InternetBillingInvoice />}
            />
            <Route path="inventory-report" element={<InventoryReport />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="invoice-details" element={<InvoiceDetails />} />
            <Route path="invoice-medical" element={<InvoiceMedical />} />
            <Route path="invoice-settings" element={<InvoiceSettings />} />
            <Route
              path="invoice-templates-settings"
              element={<InvoiceTemplatesSettings />}
            />
            <Route path="invoice-templates" element={<InvoiceTemplates />} />
            <Route path="invoice" element={<Invoice />} />
            {/* Invoicing & Billing - Consolidated */}
            <Route path="invoices" element={<Navigate to="/invoicing/sales" replace />} />
            <Route path="add-invoice" element={<Navigate to="/invoicing/sales/add" replace />} />
            <Route path="edit-invoice/:id" element={<Navigate to="/invoicing/sales/edit/:id" replace />} />
            <Route path="invoice-details/:id" element={<Navigate to="/invoicing/sales/:id" replace />} />
            
            <Route path="add-sales-invoice" element={<Navigate to="/invoicing/sales/add" replace />} />
            <Route path="edit-sales-invoice/:id" element={<Navigate to="/invoicing/sales/edit/:id" replace />} />
            <Route path="sales-invoice-details/:id" element={<Navigate to="/invoicing/sales/:id" replace />} />
            
            <Route path="purchases" element={<Navigate to="/invoicing/purchases" replace />} />
            <Route path="add-purchases" element={<Navigate to="/invoicing/purchases/add" replace />} />
            <Route path="edit-purchases/:id" element={<Navigate to="/invoicing/purchases/edit/:id" replace />} />
            
            <Route path="credit-notes" element={<Navigate to="/invoicing/credit-notes" replace />} />
            <Route path="add-credit-note" element={<Navigate to="/invoicing/credit-notes/add" replace />} />
            <Route path="edit-credit-note/:id" element={<Navigate to="/invoicing/credit-notes/edit/:id" replace />} />
            
            <Route path="debit-notes" element={<Navigate to="/invoicing/debit-notes" replace />} />
            <Route path="add-debit-note" element={<Navigate to="/invoicing/debit-notes/add" replace />} />
            <Route path="add-debit-notes" element={<Navigate to="/invoicing/debit-notes/add" replace />} />
            <Route path="edit-debit-note/:id" element={<Navigate to="/invoicing/debit-notes/edit/:id" replace />} />
            <Route path="edit-debit-notes/:id" element={<Navigate to="/invoicing/debit-notes/edit/:id" replace />} />

            <Route path="invoicing/sales" element={<SalesInvoices />} />
            <Route path="invoicing/sales/add" element={<AddSalesInvoice />} />
            <Route path="invoicing/sales/edit/:id" element={<EditSalesInvoice />} />
            <Route path="invoicing/sales/:id" element={<SalesInvoiceDetails />} />

            <Route path="invoicing/sales-orders" element={<SalesOrders />} />
            <Route path="invoicing/sales-orders/add" element={<AddSalesOrder />} />
            <Route
              path="invoicing/sales-orders/edit/:id"
              element={<AddSalesOrder />}
            />
            <Route
              path="invoicing/sales-orders/:id"
              element={<SalesOrderDetails />}
            />

            <Route path="invoicing/purchase-orders" element={<PurchaseOrders />} />
            <Route
              path="invoicing/purchase-orders/add"
              element={<AddPurchaseOrder />}
            />
            <Route
              path="invoicing/purchase-orders/edit/:id"
              element={<AddPurchaseOrder />}
            />
            <Route
              path="invoicing/purchase-orders/:id"
              element={<PurchaseOrderDetails />}
            />

            <Route path="inventory/items" element={<Items />} />
            <Route path="inventory/items/add" element={<AddItem />} />
            <Route path="inventory/items/edit/:id" element={<AddItem />} />
            <Route path="inventory/items/:id" element={<ItemDetails />} />
            <Route path="inventory/stock-summary" element={<StockSummary />} />
            
            <Route path="invoicing/purchases" element={<PurchaseInvoices />} />
            <Route path="invoicing/purchases/add" element={<AddPurchaseInvoice />} />
            <Route path="invoicing/purchases/edit/:id" element={<EditPurchaseInvoice />} />
            <Route path="invoicing/purchases/:id" element={<PurchaseInvoiceDetails />} />
            
            <Route path="invoicing/credit-notes" element={<CreditNotes />} />
            <Route path="invoicing/credit-notes/add" element={<AddCreditNote />} />
            <Route path="invoicing/credit-notes/edit/:id" element={<EditCreditNote />} />
            <Route path="invoicing/credit-notes/:id" element={<CreditNoteDetails />} />
            
            <Route path="invoicing/debit-notes" element={<DebitNotes />} />
            <Route path="invoicing/debit-notes/add" element={<AddDebitNote />} />
            <Route path="invoicing/debit-notes/edit/:id" element={<EditDebitNote />} />
            <Route path="invoicing/debit-notes/:id" element={<DebitNoteDetails />} />

            <Route path="invoicing/proforma" element={<ProformaInvoices />} />
            <Route path="invoicing/proforma/add" element={<AddProformaInvoice />} />
            <Route path="invoicing/proforma/edit/:id" element={<EditProformaInvoice />} />
            <Route path="invoicing/proforma/:id" element={<ProformaInvoiceDetails />} />

            <Route path="invoices-list" element={<Invoices />} />
            <Route path="kanban-view" element={<KanbanView />} />
            <Route path="language-setting2" element={<LanguageSetting2 />} />
            <Route path="language-setting3" element={<LanguageSetting3 />} />
            <Route path="language-settings" element={<LanguageSettings />} />
            <Route path="layout-dark" element={<LayoutDark />} />
            <Route path="layout-default" element={<LayoutDefault />} />
            <Route path="layout-mini" element={<LayoutMini />} />
            <Route path="layout-rtl" element={<LayoutRtl />} />
            <Route path="layout-single" element={<LayoutSingle />} />
            <Route path="layout-transparent" element={<LayoutTransparent />} />
            <Route
              path="layout-without-header"
              element={<LayoutWithoutHeader />}
            />
            <Route
              path="localization-settings"
              element={<LocalizationSettings />}
            />
            <Route path="lock-screen" element={<LockScreen />} />
            <Route path="login" element={<Login />} />
            <Route path="low-stock" element={<LowStock />} />
            <Route path="maintenance-mode" element={<MaintenanceMode />} />
            <Route path="maps-leaflet" element={<MapsLeaflet />} />
            <Route path="maps-vector" element={<MapsVector />} />
            <Route path="membership-addons" element={<MembershipAddons />} />
            <Route path="membership-plans" element={<MembershipPlans />} />
            <Route
              path="membership-transactions"
              element={<MembershipTransactions />}
            />
            <Route
              path="money-exchange-invoice"
              element={<MoneyExchangeInvoice />}
            />
            <Route path="money-transfer" element={<MoneyTransfer />} />
            <Route
              path="movie-ticket-booking-invoice"
              element={<MovieTicketBookingInvoice />}
            />
            <Route path="notes" element={<Notes />} />
            <Route
              path="notifications-settings"
              element={<NotificationsSettings />}
            />
            <Route path="notifications" element={<Notifications />} />
            <Route path="outgoing-call" element={<OutgoingCall />} />
            <Route path="packages-grid" element={<PackagesGrid />} />
            <Route path="packages" element={<Packages />} />
            <Route path="pages" element={<Pages />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
            <Route path="payment-summary" element={<PaymentSummary />} />
            <Route
              path="outstanding-reports"
              element={<OutstandingReports />}
            />
            <Route path="payments" element={<Payments />} />
            <Route path="permission" element={<Permission />} />
            <Route path="plans-billings" element={<PlansBillings />} />
            <Route path="plugin-manager" element={<PluginManager />} />
            <Route
              path="preference-settings"
              element={<PreferenceSettings />}
            />
            <Route path="prefixes-settings" element={<PrefixesSettings />} />
            <Route path="version-control" element={<Version />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profit-loss-report" element={<ProfitLossReport />} />
            <Route path="projects" element={<Projects />} />
            <Route
              path="purchase-orders-report"
              element={<PurchaseOrdersReport />}
            />
            <Route
              path="purchase-return-report"
              element={<PurchaseReturnReport />}
            />
            <Route path="purchase-transaction" element={<PurchaseTransaction />} />
            <Route path="purchases-report" element={<PurchasesReport />} />
            <Route path="quotation-report" element={<QuotationReport />} />
            <Route path="quotations" element={<Quotations />} />
            <Route path="receipt-invoice-1" element={<ReceiptInvoice1 />} />
            <Route path="receipt-invoice-2" element={<ReceiptInvoice2 />} />
            <Route path="receipt-invoice-3" element={<ReceiptInvoice3 />} />
            <Route path="receipt-invoice-4" element={<ReceiptInvoice4 />} />
            <Route path="recurring-invoices" element={<RecurringInvoices />} />
            <Route path="register" element={<Register />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route
              path="restaurants-invoice"
              element={<RestaurantsInvoice />}
            />
            <Route path="roles-permission" element={<RolesPermission />} />
            <Route path="roles-permissions" element={<RolesPermissions />} />
            <Route path="add-sales-order" element={<AddSalesOrder />} />
            <Route path="edit-sales-order/:id" element={<AddSalesOrder />} />
            <Route path="sales-orders" element={<SalesOrders />} />
            <Route path="sales-report" element={<SalesReport />} />
            <Route path="sales-returns" element={<SalesReturns />} />
            <Route path="sass-settings" element={<SassSettings />} />
            <Route path="search-list" element={<SearchList />} />
            <Route path="search-result" element={<SearchResult />} />
            <Route path="security-settings" element={<SecuritySettings />} />
            <Route path="seo-setup" element={<SeoSetup />} />
            <Route path="sitemap" element={<Sitemap />} />
            <Route path="sms-gateways" element={<SmsGateways />} />
            <Route path="social-feed" element={<SocialFeed />} />
            <Route path="sold-stock" element={<SoldStock />} />
            <Route path="starter" element={<Starter />} />
            <Route path="states" element={<States />} />
            <Route path="stock-history" element={<StockHistory />} />
            <Route path="stock-ageing" element={<StockAgeing />} />
            <Route path="storage" element={<Storage />} />
            <Route
              path="student-billing-invoice"
              element={<StudentBillingInvoice />}
            />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route
              path="super-admin-dashboard"
              element={<SuperAdminDashboard />}
            />
            <Route path="supplier-payments" element={<SupplierPayments />} />
            <Route path="supplier-report" element={<SupplierReport />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="add-vendor" element={<AddVendor />} />
            <Route path="edit-vendor/:id" element={<EditVendor />} />
            <Route path="vendor-details/:id" element={<VendorDetails />} />
            <Route path="system-backup" element={<SystemBackup />} />
            <Route path="system-update" element={<SystemUpdate />} />
            <Route path="tables-basic" element={<TablesBasic />} />
            <Route path="tax-rates" element={<TaxRates />} />
            <Route path="tax-master" element={<TaxMaster />} />
            <Route path="inventory/hsn-sac" element={<HSNSACMaster />} />
            <Route
              path="hsn-sac-master"
              element={<Navigate to="/inventory/hsn-sac" replace />}
            />
            <Route path="tax-report" element={<TaxReport />} />
            <Route path="terms-condition" element={<TermsCondition />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="thermal-printer" element={<ThermalPrinter />} />
            <Route path="ticket-details" element={<TicketDetails />} />
            <Route path="ticket-kanban" element={<TicketKanban />} />
            <Route path="tickets-list" element={<TicketsList />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="todo-list" element={<TodoList />} />
            <Route path="todo" element={<Todo />} />
            <Route
              path="train-ticket-invoice"
              element={<TrainTicketInvoice />}
            />
            <Route path="transactions" element={<Transactions />} />
            <Route path="ledger-report" element={<LedgerReport />} />
            <Route path="group-ledger-report" element={<GroupLedgerReport />} />
            <Route path="trial-balance" element={<TrialBalance />} />
            <Route
              path="two-step-verification"
              element={<TwoStepVerification />}
            />
            <Route path="ui-accordion" element={<UiAccordion />} />
            <Route path="ui-alerts" element={<UiAlerts />} />
            <Route path="ui-avatar" element={<UiAvatar />} />
            <Route path="ui-badges" element={<UiBadges />} />
            <Route path="ui-borders" element={<UiBorders />} />
            <Route path="ui-breadcrumb" element={<UiBreadcrumb />} />
            <Route path="ui-buttons-group" element={<UiButtonsGroup />} />
            <Route path="ui-buttons" element={<UiButtons />} />
            <Route path="ui-cards" element={<UiCards />} />
            <Route path="ui-carousel" element={<UiCarousel />} />
            <Route path="ui-clipboard" element={<UiClipboard />} />
            <Route path="ui-collapse" element={<UiCollapse />} />
            <Route path="ui-colors" element={<UiColors />} />
            <Route path="ui-counter" element={<UiCounter />} />
            <Route path="ui-drag-drop" element={<UiDragDrop />} />
            <Route path="ui-dropdowns" element={<UiDropdowns />} />
            <Route path="ui-grid" element={<UiGrid />} />
            <Route path="ui-images" element={<UiImages />} />
            <Route path="ui-lightbox" element={<UiLightbox />} />
            <Route path="ui-links" element={<UiLinks />} />
            <Route path="ui-list-group" element={<UiListGroup />} />
            <Route path="ui-media" element={<UiMedia />} />
            <Route path="ui-modals" element={<UiModals />} />
            <Route path="ui-nav-tabs" element={<UiNavTabs />} />
            <Route path="ui-offcanvas" element={<UiOffcanvas />} />
            <Route path="ui-pagination" element={<UiPagination />} />
            <Route path="ui-placeholders" element={<UiPlaceholders />} />
            <Route path="ui-popovers" element={<UiPopovers />} />
            <Route path="ui-progress" element={<UiProgress />} />
            <Route path="ui-rangeslider" element={<UiRangeslider />} />
            <Route path="ui-rating" element={<UiRating />} />
            <Route path="ui-ratio" element={<UiRatio />} />
            <Route path="ui-ribbon" element={<UiRibbon />} />
            <Route path="ui-scrollbar" element={<UiScrollbar />} />
            <Route path="ui-scrollspy" element={<UiScrollspy />} />
            <Route path="ui-sortable" element={<UiSortable />} />
            <Route path="ui-spinner" element={<UiSpinner />} />
            <Route path="ui-stickynote" element={<UiStickynote />} />
            <Route path="ui-sweetalerts" element={<UiSweetalerts />} />
            <Route path="ui-swiperjs" element={<UiSwiperjs />} />
            <Route path="ui-text-editor" element={<UiTextEditor />} />
            <Route path="ui-timeline" element={<UiTimeline />} />
            <Route path="ui-toasts" element={<UiToasts />} />
            <Route path="ui-tooltips" element={<UiTooltips />} />
            <Route path="ui-typography" element={<UiTypography />} />
            <Route path="ui-utilities" element={<UiUtilities />} />
            <Route path="ui-video" element={<UiVideo />} />
            <Route path="under-construction" element={<UnderConstruction />} />
            <Route path="under-maintenance" element={<UnderMaintenance />} />
            <Route path="units" element={<Units />} />
            <Route path="users" element={<Users />} />
            <Route path="video-call" element={<VideoCall />} />
            <Route path="voice-call" element={<VoiceCall />} />
            <Route path="ledger-groups" element={<LedgerGroups />} />
            <Route path="add-ledger-group" element={<AddLedgerGroup />} />
            <Route path="edit-ledger-group/:id" element={<EditLedgerGroup />} />
            <Route path="ledgers" element={<Ledgers />} />
            <Route path="add-ledger" element={<AddLedger />} />
            <Route path="edit-ledger/:id" element={<EditLedger />} />
            <Route path="accounting" element={<Accounting />} />
            <Route path="vouchers" element={<Vouchers />} />
            <Route path="add-voucher" element={<AddVoucher />} />
            <Route path="edit-voucher/:id" element={<EditVoucher />} />
            <Route path="add-item" element={<AddItem />} />
            <Route path="edit-item/:id" element={<EditItemNew />} />
            <Route path="item-categories" element={<ItemCategories />} />
            <Route path="uom" element={<UOM />} />
            <Route path="warehouses" element={<Warehouses />} />
            <Route path="inventory/transfer" element={<AddStockTransfer />} />
            <Route path="stock-transfers" element={<StockTransfers />} />
            <Route path="inventory/stock-verification" element={<StockVerification />} />
            <Route path="inventory/stock-verification/:id" element={<StockVerificationDetail />} />
            <Route path="batch-tracking" element={<BatchTracking />} />
            <Route path="serial-numbers" element={<SerialNumbers />} />
            <Route path="inventory/wastage" element={<Wastage />} />
            <Route
              path="wastage"
              element={<Navigate to="/inventory/wastage" replace />}
            />
            <Route
              path="wastage-scrap"
              element={<Navigate to="/inventory/wastage" replace />}
            />
            <Route path="stock-alerts" element={<StockAlerts />} />
            <Route path="e-invoices" element={<EInvoices />} />
            <Route
              path="e-invoice-details/:eInvoiceId"
              element={<EInvoiceDetails />}
            />
            <Route
              path="e-invoice-generate/:invoiceId"
              element={<EInvoiceGenerate />}
            />
            <Route path="eway-bills" element={<EWayBills />} />
            <Route path="add-eway-bill" element={<AddEWayBill />} />
            <Route path="gstr-1" element={<GSTR1 />} />
            <Route path="gstr-3b" element={<GSTR3B />} />
            <Route path="gstr-9" element={<GSTR9 />} />
            <Route path="itc-register" element={<ITCRegister />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Debug component - remove in production */}
        {/* <LinkuthDebug /> */}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
