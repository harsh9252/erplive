import React, { useState, useEffect } from 'react';
import { FiCalendar, FiDownload, FiArrowLeft, FiArrowRight, FiUser, FiUsers, FiCheckCircle, FiXCircle, FiCoffee, FiAlertCircle, FiCheck, FiTarget, FiX } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import { useAuth } from '../components/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import attendanceApi from '../services/attendanceApi';
import api from '../services/api';

export default function MonthlyReportPage() {
  const { user } = useAuth();
  const { showToast } = useNotification();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Missing state declarations
  const [reportType, setReportType] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [quarter, setQuarter] = useState('Q1');
  const [allUsersData, setAllUsersData] = useState([]);

  const isAdmin = user?.role?.toLowerCase() === 'admin';

  // Redirect non-admin users
  if (!isAdmin) {
    return (
      <div className="flex-1 overflow-auto px-4 sm:px-6 py-4 pb-20 md:pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
            <FiAlertCircle className="text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900">Access Denied</h3>
              <p className="text-sm text-yellow-800">Only administrators can view monthly reports.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fetch report data based on type and filters
  useEffect(() => {
    fetchReportData();
  }, [reportType, selectedYear, selectedMonth, quarter]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      setError(null);
      let data = [];

      if (reportType === 'monthly') {
        const params = {
          year: selectedYear,
          month: selectedMonth + 1 // Convert 0-indexed to 1-indexed
        };
        console.log('Fetching monthly report with params:', params);
        const response = await attendanceApi.getMonthlyReportAllUsers(params);
        console.log('Monthly report response:', response);
        // Handle both direct array and wrapped response
        data = Array.isArray(response) ? response : (response?.reports || []);
      } else if (reportType === 'quarterly') {
        const params = {
          year: selectedYear,
          quarter: quarter.replace('Q', '')
        };
        console.log('Fetching quarterly report with params:', params);
        const response = await attendanceApi.getQuarterlyReportAllUsers(params);
        console.log('Quarterly report response:', response);
        // Handle both direct array and wrapped response
        data = Array.isArray(response) ? response : (response?.reports || []);
      }

      console.log('Processed data:', data);
      setAllUsersData(Array.isArray(data) ? data : []);
      
      // Show info message if no data
      if (!data || data.length === 0) {
        setError('No attendance data available for the selected period. Please ensure employees have attendance records.');
      }
    } catch (err) {
      console.error('Error fetching report data:', err);
      console.error('Error details:', err.response?.data || err.message);
      setError(err.message || 'Failed to load report data. Please try again.');
      setAllUsersData([]);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (allUsersData.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['User', 'Employee ID', 'Present', 'Holiday', 'Half Day', 'Leave', 'Paid Leave', 'Comp Off', 'Total Hours'];
    const rows = allUsersData.map(u => [
      u.first_name || u.name || u.employee_name || 'N/A',
      u.employee_id || 'N/A',
      u.present_days || 0,
      u.holiday_days || 0,
      u.half_days || 0,
      u.leave_days || 0,
      u.paid_leave_days || 0,
      u.comp_off_grants || 0,
      u.total_hours || '0.00'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monthly_report_${selectedYear}_${selectedMonth + 1}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 overflow-auto px-4 sm:px-6 py-4 pb-20 md:pb-4">
      <div className="max-w-7xl mx-auto">

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <FiAlertCircle className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-900">Error Loading Report</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <p className="text-xs text-red-600 mt-2">
                Troubleshooting: Ensure you have attendance records for the selected period and that employees are marked as Active.
              </p>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <ReportSummaryCard
            icon={<FiCheck className="text-green-600" />}
            title="Total Present"
            value={allUsersData.reduce((sum, user) => sum + (user.present_days || 0), 0)}
            bgColor="bg-green-50"
            loading={loading}
          />
          <ReportSummaryCard
            icon={<FiCoffee className="text-orange-600" />}
            title="Total Half Day"
            value={allUsersData.reduce((sum, user) => sum + (user.half_days || 0), 0)}
            bgColor="bg-orange-50"
            loading={loading}
          />
          <ReportSummaryCard
            icon={<FiCalendar className="text-blue-600" />}
            title="Total Holidays"
            value={allUsersData.reduce((sum, user) => sum + (user.holiday_days || 0), 0)}
            bgColor="bg-blue-50"
            loading={loading}
          />
          <ReportSummaryCard
            icon={<FiTarget className="text-purple-600" />}
            title="Total Comp Off"
            value={allUsersData.reduce((sum, user) => sum + (user.comp_off_grants || 0), 0)}
            bgColor="bg-purple-50"
            loading={loading}
          />
          <ReportSummaryCard
            icon={<FiX className="text-red-600" />}
            title="Total Leaves"
            value={allUsersData.reduce((sum, user) => sum + (user.leave_days || 0), 0)}
            bgColor="bg-red-50"
            loading={loading}
          />
        </div>

        {/* Report Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          {/* Table Header with Filters */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Left: Title */}
              <div className="flex items-center gap-2">
                <FiCalendar className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-gray-900">
                  {reportType === 'monthly' ? 'Monthly' : 'Quarterly'} Report - All Users
                </h3>
              </div>

              {/* Right: Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Report Type Dropdown */}
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary min-w-[90px]"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>

                {/* Year Selector */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary min-w-[70px]"
                >
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                  <option value={2027}>2027</option>
                </select>

                {/* Month Selector (Monthly View) */}
                {reportType === 'monthly' && (
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary min-w-[90px]"
                  >
                    <option value={0}>January</option>
                    <option value={1}>February</option>
                    <option value={2}>March</option>
                    <option value={3}>April</option>
                    <option value={4}>May</option>
                    <option value={5}>June</option>
                    <option value={6}>July</option>
                    <option value={7}>August</option>
                    <option value={8}>September</option>
                    <option value={9}>October</option>
                    <option value={10}>November</option>
                    <option value={11}>December</option>
                  </select>
                )}

                {/* Quarter Selector (Quarterly View) */}
                {reportType === 'quarterly' && (
                  <select
                    value={quarter}
                    onChange={(e) => setQuarter(e.target.value)}
                    className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary min-w-[50px]"
                  >
                    <option value="Q1">Q1</option>
                    <option value="Q2">Q2</option>
                    <option value="Q3">Q3</option>
                    <option value="Q4">Q4</option>
                  </select>
                )}

                {/* Export Button */}
                <button
                  onClick={exportToCSV}
                  disabled={loading || allUsersData.length === 0}
                  className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all shadow-sm text-xs font-bold ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ height: '28px' }}
                >
                  <FiDownload className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="px-4 py-8 text-center">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Loading report data...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && allUsersData.length === 0 && (
            <div className="px-4 py-8 text-center">
              <FiAlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">No data available for the selected period</p>
            </div>
          )}

          {/* Table Content */}
          {!loading && allUsersData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b">User</th>
                    <th className="px-4 py-2 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b">Present</th>
                    <th className="px-4 py-2 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b">Holiday</th>
                    <th className="px-4 py-2 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b">Half Day</th>
                    <th className="px-4 py-2 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b">Leave</th>
                    <th className="px-4 py-2 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b">Paid Leave</th>
                    <th className="px-4 py-2 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b">Comp Off</th>
                    <th className="px-4 py-2 text-right text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b">Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allUsersData.map((u, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-1.5">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-900 leading-tight">{u.first_name || u.name || u.employee_name || 'N/A'}</span>
                          <span className="text-[10px] text-gray-500 leading-tight">{u.employee_id || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-1.5 text-center">
                        <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-600 text-white leading-tight">
                          {u.present_days || 0}
                        </span>
                      </td>
                      <td className="px-4 py-1.5 text-center">
                        <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white leading-tight">
                          {u.holiday_days || 0}
                        </span>
                      </td>
                      <td className="px-4 py-1.5 text-center">
                        <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-yellow-500 text-white leading-tight">
                          {u.half_days || 0}
                        </span>
                      </td>
                      <td className="px-4 py-1.5 text-center">
                        <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white leading-tight">
                          {u.leave_days || 0}
                        </span>
                      </td>
                      <td className="px-4 py-1.5 text-center">
                        <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white leading-tight">
                          {u.paid_leave_days || 0}
                        </span>
                      </td>
                      <td className="px-4 py-1.5 text-center">
                        <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white leading-tight">
                          {u.comp_off_grants || 0}
                        </span>
                      </td>
                      <td className="px-4 py-1.5 text-right text-xs font-bold text-blue-600">
                        {u.total_hours || '0.00'} hrs
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Summary Card Component for Reports
const ReportSummaryCard = ({ icon, title, value, bgColor, loading }) => (
  <div className={`${bgColor} rounded-lg border border-gray-200 p-3 shadow-sm flex items-center justify-between`}>
    <div>
      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">{title}</p>
      <p className="text-xl font-black text-gray-900 leading-none mt-1">
        {loading ? <span className="text-gray-400">-</span> : value}
      </p>
    </div>
    <div className="bg-white/50 p-2 rounded-lg">
      {icon}
    </div>
  </div>
);
