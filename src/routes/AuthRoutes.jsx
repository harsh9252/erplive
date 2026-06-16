import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));
const ForgotPassword = lazy(() => import('../pages/forgot-password'));
const ResetPassword = lazy(() => import('../pages/reset-password'));
const EmailVerification = lazy(() => import('../pages/email-verification'));
const TwoStepVerification = lazy(() => import('../pages/two-step-verification'));
const LockScreen = lazy(() => import('../pages/lock-screen'));
const Error404 = lazy(() => import('../pages/error-404'));
const Error500 = lazy(() => import('../pages/error-500'));
const ComingSoon = lazy(() => import('../pages/coming-soon'));
const UnderConstruction = lazy(() => import('../pages/under-construction'));
const UnderMaintenance = lazy(() => import('../pages/under-maintenance'));
const MaintenanceMode = lazy(() => import('../pages/maintenance-mode'));
const TestPage = lazy(() => import('../pages/test-page'));

const AuthRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="login" replace />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="reset-password" element={<ResetPassword />} />
    <Route path="email-verification" element={<EmailVerification />} />
    <Route path="two-step-verification" element={<TwoStepVerification />} />
    <Route path="lock-screen" element={<LockScreen />} />
    <Route path="error-404" element={<Error404 />} />
    <Route path="error-500" element={<Error500 />} />
    <Route path="admin-dashboard" element={<Navigate to="/dashboard" replace />} />
    <Route path="coming-soon" element={<ComingSoon />} />
    <Route path="under-construction" element={<UnderConstruction />} />
    <Route path="under-maintenance" element={<UnderMaintenance />} />
    <Route path="maintenance-mode" element={<MaintenanceMode />} />
    <Route path="test" element={<TestPage />} />
  </Routes>
);

export default AuthRoutes;
