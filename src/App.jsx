import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { initializeSampleData } from "./utils/initializeData";
import ErrorBoundary from "./components/ErrorBoundary";

// Modular Route Components
// Modular Route Components
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const ForgotPassword = lazy(() => import("./pages/forgot-password"));
const ResetPassword = lazy(() => import("./pages/reset-password"));
const LockScreen = lazy(() => import("./pages/lock-screen"));
const Error404 = lazy(() => import("./pages/error-404"));
const Error500 = lazy(() => import("./pages/error-500"));

const InvoicingRoutes = lazy(() => import("./routes/InvoicingRoutes"));
const InventoryRoutes = lazy(() => import("./routes/InventoryRoutes"));
const PayrollRoutes = lazy(() => import("./routes/PayrollRoutes"));
const MasterRoutes = lazy(() => import("./routes/MasterRoutes"));
const ReportRoutes = lazy(() => import("./routes/ReportRoutes"));
const AccountingRoutes = lazy(() => import("./routes/AccountingRoutes"));
const ManufacturingRoutes = lazy(() => import("./routes/ManufacturingRoutes"));
const SettingsRoutes = lazy(() => import("./routes/SettingsRoutes"));
const UiRoutes = lazy(() => import("./routes/UiRoutes"));
const MiscRoutes = lazy(() => import("./routes/MiscRoutes"));

// Loading Component
const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100%' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

// Root redirect component
const RootRedirect = () => {
  const { authenticated, loading } = useAuth();
  if (loading) return <PageLoader />;
  return <Navigate to={authenticated ? "/dashboard" : "/login"} replace />;
};

function App() {
  useEffect(() => {
    initializeSampleData();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Root redirect */}
                <Route path="/" element={<RootRedirect />} />

                {/* Specific Auth routes to prevent shadowing the rest of the app */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/lock-screen" element={<LockScreen />} />
                <Route path="/error-404" element={<Error404 />} />
                <Route path="/error-500" element={<Error500 />} />

                {/* Main app routes with layout - Protected */}
                <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                  {/* Feature modules with explicit prefix mounting */}
                  <Route path="/invoicing/*" element={<InvoicingRoutes />} />
                  <Route path="/inventory/*" element={<InventoryRoutes />} />
                  <Route path="/payroll/*" element={<PayrollRoutes />} />
                  <Route path="/master/*" element={<MasterRoutes />} />
                  <Route path="/reports/*" element={<ReportRoutes />} />
                  <Route path="/accounting/*" element={<AccountingRoutes />} />
                  <Route path="/manufacturing/*" element={<ManufacturingRoutes />} />
                  <Route path="/settings/*" element={<SettingsRoutes />} />
                  <Route path="/ui/*" element={<UiRoutes />} />
                  
                  {/* Catch-all for miscellaneous and dashboard routes MUST BE LAST */}
                  <Route path="/*" element={<MiscRoutes />} />
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
          
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
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
