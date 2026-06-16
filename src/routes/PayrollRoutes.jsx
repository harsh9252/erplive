import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const EmployeeList = lazy(() => import('../pages/employee-list'));
const AddEmployee = lazy(() => import('../pages/add-employee'));
const Attendance = lazy(() => import('../pages/attendance'));
const AddAttendance = lazy(() => import('../pages/add-attendance'));
const SalaryStructures = lazy(() => import('../pages/salary-structure'));
const Payslips = lazy(() => import('../pages/payslips'));
const PayrollSummary = lazy(() => import('../pages/payroll-summary'));
const Bonuses = lazy(() => import('../pages/bonuses'));

const PayrollRoutes = () => (
  <Routes>
    {/* Actual Payroll Routes (Relative to /payroll) */}
    <Route path="employees" element={<ProtectedRoute module="hr" action="can_read"><EmployeeList /></ProtectedRoute>} />
    <Route path="employees/add" element={<ProtectedRoute module="hr" action="can_create"><AddEmployee /></ProtectedRoute>} />
    <Route path="employees/edit/:id" element={<ProtectedRoute module="hr" action="can_update"><AddEmployee /></ProtectedRoute>} />
    
    <Route path="attendance" element={<ProtectedRoute module="hr" action="can_read"><Attendance /></ProtectedRoute>} />
    <Route path="attendance/add" element={<ProtectedRoute module="hr" action="can_create"><AddAttendance /></ProtectedRoute>} />
    
    <Route path="salary-structure" element={<ProtectedRoute module="payroll" action="can_read"><SalaryStructures /></ProtectedRoute>} />
    <Route path="payslips" element={<ProtectedRoute module="payroll" action="can_read"><Payslips /></ProtectedRoute>} />
    <Route path="reports/payroll-summary" element={<ProtectedRoute module="payroll" action="can_read"><PayrollSummary /></ProtectedRoute>} />
    <Route path="bonuses" element={<ProtectedRoute module="payroll" action="can_read"><Bonuses /></ProtectedRoute>} />
  </Routes>
);

export default PayrollRoutes;
