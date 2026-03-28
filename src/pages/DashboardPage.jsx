import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { formatDateForDisplay } from "../utils/dateUtils.jsx";
import apiService from "../services/api.js";
import attendanceApi from "../services/attendanceApi.js";
import { FiUser, FiUsers, FiCheckCircle, FiXCircle, FiClock, FiGift, FiCalendar, FiClipboard, FiCoffee, FiAlertCircle, FiActivity } from "react-icons/fi";

export default function DashboardPage() {
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = user?.role?.toLowerCase() === 'admin';

  // Dynamic data states
  const [dashboardStats, setDashboardStats] = useState({
    presentDays: 0,
    halfDays: 0,
    paidLeaves: 0,
    available_balance: 0
  });

  const [leaveBalance, setLeaveBalance] = useState({
    available_leaves: 0,
    paid_leaves: 0
  });

  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  const [onLeaveUsers, setOnLeaveUsers] = useState([]);
  const [upcomingHolidays, setUpcomingHolidays] = useState([]);
  const [allRequests, setAllRequests] = useState([]);

  // Fetch dashboard data with staggered loading to prevent rate limiting
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch critical data first (stats and leave balance)
        const [statsResponse, leaveResponse] = await Promise.all([
          apiService.getDashboardStats(),
          apiService.getLeaveBalance(user.id)
        ]);

        // Update dashboard stats - handle both direct object and wrapped response
        const stats = statsResponse?.current_month || statsResponse;
        if (stats) {
          setDashboardStats({
            presentDays: stats.present_days || 0,
            halfDays: stats.half_days || 0,
            paidLeaves: stats.leave_days || 0,
            available_balance: 0
          });
        }

        // Update leave balance - handle both direct object and wrapped response
        const leaveData = leaveResponse?.paid || leaveResponse;
        if (leaveData) {
          const remaining = leaveData.remaining || leaveData.paid?.remaining || 0;
          const used = leaveData.used || leaveData.paid?.used || 0;
          setLeaveBalance({
            available_leaves: remaining,
            paid_leaves: used
          });
          setDashboardStats(prev => ({
            ...prev,
            available_balance: remaining
          }));
        }

        // Stagger other requests to avoid rate limiting
        setTimeout(async () => {
          try {
            const birthdaysResponse = await apiService.getUpcomingBirthdays(30);
            const birthdaysData = Array.isArray(birthdaysResponse) ? birthdaysResponse : (birthdaysResponse?.data || []);
            const birthdaysWithDays = birthdaysData.map(birthday => {
              const today = new Date();
              const birthDate = new Date(birthday.date_of_birth);
              const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

              if (nextBirthday < today) {
                nextBirthday.setFullYear(today.getFullYear() + 1);
              }

              const daysUntil = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
              return { ...birthday, days_until_birthday: daysUntil };
            });
            setUpcomingBirthdays(birthdaysWithDays);
          } catch (err) {
            console.error('Error fetching birthdays:', err);
          }
        }, 500);

        setTimeout(async () => {
          try {
            const onLeaveResponse = await apiService.getOnLeave();
            const onLeaveData = Array.isArray(onLeaveResponse) ? onLeaveResponse : (onLeaveResponse?.data || []);
            setOnLeaveUsers(onLeaveData.map(user => ({
              user_name: `${user.first_name}`,
              leave_type: user.leave_type,
              is_half_day: false
            })));
          } catch (err) {
            console.error('Error fetching on leave users:', err);
          }
        }, 1000);

        setTimeout(async () => {
          try {
            const holidaysResponse = await apiService.getUpcomingHolidays(5);
            const holidaysData = Array.isArray(holidaysResponse) ? holidaysResponse : (holidaysResponse?.data || []);
            setUpcomingHolidays(holidaysData);
          } catch (err) {
            console.error('Error fetching holidays:', err);
          }
        }, 1500);

        // Fetch pending requests (admin only) with additional delay
        if (isAdmin) {
          setTimeout(async () => {
            try {
              const leavesResponse = await apiService.getAllLeaves();
              const leavesData = Array.isArray(leavesResponse) ? leavesResponse : (leavesResponse?.data || []);

              const leaveRequests = leavesData
                .filter(leave => leave.status === 'pending')
                .map(leave => ({
                  id: leave.id,
                  type: 'leave',
                  user_name: `${leave.first_name}`,
                  leave_type: leave.leave_type,
                  total_days: leave.total_days,
                  created_at: leave.created_at
                }));

              setAllRequests(leaveRequests);
            } catch (err) {
              console.error('Error fetching pending requests:', err);
            }
          }, 2000);
        }

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchDashboardData();
    }
  }, [user?.id, isAdmin]);

  if (loading) {
    return (
      <div className="bg-gray-50 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 h-full flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="mx-auto text-3xl text-red-500 mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 h-full">
      <div className="max-w-7xl mx-auto p-4 space-y-4">

        {/* Dashboard Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, <span className="font-medium text-blue-600">{user?.firstName || user?.first_name}</span>! 👋
            </p>
          </div>
        </div>

        {/* Combined Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <FastSummaryCard
            icon={<FiCheckCircle className="text-green-600" />}
            title="Total Present"
            value={dashboardStats.presentDays || 0}
            subtitle="Year to Date"
            bgColor="bg-green-50"
            iconBg="bg-green-100"
          />
          <FastSummaryCard
            icon={<FiCoffee className="text-orange-600" />}
            title="Total Half Day"
            value={dashboardStats.halfDays || 0}
            bgColor="bg-orange-50"
            iconBg="bg-orange-100"
          />
          <FastSummaryCard
            icon={<FiCalendar className="text-blue-600" />}
            title="Total Available Leaves"
            value={dashboardStats.available_balance ?? (leaveBalance?.available_leaves || 0)}
            subtitle="Remaining Balance"
            bgColor="bg-blue-50"
            iconBg="bg-blue-100"
          />
          <FastSummaryCard
            icon={<FiXCircle className="text-red-600" />}
            title="Total Paid Leaves"
            value={dashboardStats.paidLeaves || (leaveBalance?.paid_leaves || 0)}
            subtitle="Salary Deductions"
            bgColor="bg-red-50"
            iconBg="bg-red-100"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column: Birthdays & Holidays */}
          <div className="space-y-4">
            <FastBirthdayCard birthdays={upcomingBirthdays} />
            <HolidayCard
              holidays={upcomingHolidays}
              isAdmin={isAdmin}
            />
          </div>

          {/* Middle Column: Pending Requests or Recent Tasks */}
          <div className="space-y-4">
            {isAdmin ? (
              <PendingRequestsCard requests={allRequests} />
            ) : (
              <FastRecentTasksCard />
            )}
            <WhoIsOnLeaveCard users={onLeaveUsers} />
          </div>

          {/* Right Column: Attendance Calendar */}
          <div>
            <FastAttendanceCalendar currentMonth={currentMonth} />
          </div>
        </div>

      </div>
    </div>
  );
}

// Fast Summary Card Component (No animations for better performance)
const FastSummaryCard = React.memo(({ icon, title, value, subtitle, bgColor, iconBg }) => {
  return (
    <div className={`${bgColor} rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}>
      <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 rotate-12">
        {icon}
      </div>
      <div className="flex items-center justify-between relative z-10">
        <div className="flex-1">
          <p className="text-[10px] font-bold text-gray-600 mb-1 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-black text-gray-900 leading-tight">{value}</p>
          {subtitle && (
            <p className="text-[9px] text-gray-500 mt-1 font-medium">{subtitle}</p>
          )}
        </div>
        <div className={`${iconBg} p-2 rounded-lg shadow-sm`}>
          {icon}
        </div>
      </div>
    </div>
  );
});

// Fast Attendance Calendar Component
const FastAttendanceCalendar = React.memo(({ currentMonth }) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [calendarLoading, setCalendarLoading] = useState(true);

  // Fetch attendance data for current month
  useEffect(() => {
    const fetchMonthAttendance = async () => {
      try {
        setCalendarLoading(true);
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        
        // Fetch attendance for the month
        const response = await attendanceApi.getMonthlyReport({ year, month });
        const data = Array.isArray(response) ? response : (response?.data || []);
        
        // Convert to map for quick lookup
        const attendanceMap = {};
        data.forEach(record => {
          const dateKey = record.date || `${year}-${String(month).padStart(2, '0')}-${String(record.day).padStart(2, '0')}`;
          attendanceMap[dateKey] = record.status || 'present';
        });
        
        setAttendanceData(attendanceMap);
      } catch (error) {
        console.error('Error fetching calendar attendance:', error);
      } finally {
        setCalendarLoading(false);
      }
    };

    fetchMonthAttendance();
  }, [currentMonth]);

  // Generate calendar data for current month
  const generateCalendarData = () => {
    const calendarDays = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(null);
    }

    // Add days of month with status
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      currentDate.setHours(0, 0, 0, 0);
      
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      let status = attendanceData[dateKey] || 'present';

      // If date is in future, mark as future
      if (currentDate > today) {
        status = 'future';
      }

      calendarDays.push({ day, status, isCurrentMonth: true });
    }

    return calendarDays;
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const calendarData = generateCalendarData();

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-500 text-white';
      case 'half_day': return 'bg-orange-500 text-white';
      case 'leave': return 'bg-red-400 text-white';
      case 'holiday': return 'bg-blue-500 text-white';
      case 'future': return 'bg-gray-100 text-gray-400';
      default: return 'bg-gray-100 text-gray-400';
    }
  };

  const getStatusTitle = (status) => {
    switch (status) {
      case 'present': return 'Present';
      case 'half_day': return 'Half Day';
      case 'leave': return 'Leave';
      case 'holiday': return 'Holiday';
      case 'future': return 'Future';
      default: return 'No data';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FiCalendar className="text-blue-600" />
          Attendance Calendar
        </h2>
      </div>

      <div className="text-center mb-3">
        <h3 className="text-sm font-semibold text-gray-700">{monthName}</h3>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {/* Day headers */}
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <div key={idx} className="text-center text-xs font-medium text-gray-600 py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Calendar days */}
          {calendarData.map((dayData, index) => (
            <div
              key={index}
              className={`h-8 w-8 flex items-center justify-center rounded text-xs font-medium ${dayData ? getStatusColor(dayData.status) : 'bg-transparent'} ${dayData ? 'cursor-pointer hover:opacity-80' : ''}`}
              title={dayData ? getStatusTitle(dayData.status) : ''}
            >
              {dayData?.day}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span className="text-gray-600">Present</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-orange-500"></div>
            <span className="text-gray-600">Half Day</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-blue-500"></div>
            <span className="text-gray-600">Holiday</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gray-100"></div>
            <span className="text-gray-600">Future</span>
          </div>
        </div>
      </div>
    </div>
  );
});

// Fast Birthday Card Component
const FastBirthdayCard = React.memo(({ birthdays }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FiGift className="text-pink-600" />
        Upcoming Birthdays
      </h2>

      {birthdays.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <FiGift className="mx-auto text-3xl text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">No upcoming birthdays</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {birthdays.map((person) => {
            const daysUntil = person.days_until_birthday;
            const isToday = daysUntil === 0;

            return (
              <div
                key={person.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${isToday ? 'bg-pink-50 border-pink-200' : 'bg-gray-50 border-gray-200'
                  }`}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br from-pink-500 to-purple-500">
                  {person.first_name?.[0]}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate text-sm">
                    {person.first_name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {formatDateForDisplay(person.date_of_birth)}
                  </p>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${isToday ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-700'
                    }`}>
                    {isToday ? '🎂 Today!' : `⏰ In ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

// Consolidated Pending Requests Card Component
const PendingRequestsCard = React.memo(({ requests }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FiClipboard className="text-blue-600" />
        Pending Requests
        {requests?.length > 0 && (
          <span className="ml-auto bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
            {requests.length} pending
          </span>
        )}
      </h2>

      <div className="flex-1 min-h-0">
        {!requests || requests.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <FiClipboard className="mx-auto text-3xl text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm font-medium">No pending requests</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((request) => {
              const isLeave = request.type === 'leave';
              return (
                <div
                  key={`${request.type}-${request.id}`}
                  className={`p-3 rounded-lg border bg-orange-50 border-orange-200`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white border overflow-hidden border-orange-100`}>
                        <div className={`w-full h-full items-center justify-center font-bold text-sm text-orange-700`}>
                          {request.user_name ? request.user_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
                        </div>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-sm bg-orange-600`}>
                        <FiClock className="text-white w-2.5 h-2.5" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 truncate text-sm">
                          {request.user_name}
                        </p>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-orange-100 text-orange-700`}>
                          leave
                        </span>
                      </div>
                      <p className={`text-[10px] mt-0.5 font-medium text-orange-800`}>
                        {`${request.leave_type} • ${request.total_days} day(s)`}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate mt-0.5">
                        {request.created_at}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

// Recent Activity Card Component for Users
const FastRecentTasksCard = React.memo(() => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FiClipboard className="text-blue-600" />
        Recent Activity
      </h2>

      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <FiClipboard className="mx-auto text-3xl text-gray-300 mb-2" />
          <p className="text-gray-500 text-sm font-medium">No recent activity</p>
          <p className="text-gray-400 text-xs mt-1">Your notifications will appear here</p>
        </div>
      </div>
    </div>
  );
});

// Who's on Leave Card Component
const WhoIsOnLeaveCard = React.memo(({ users }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FiUser className="text-red-500" />
        Who's on Leave Today
      </h2>

      <div className="flex-1 space-y-3 min-h-[100px]">
        {!users || users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <FiUser className="text-gray-200 text-4xl mb-2" />
            <p className="text-gray-500 text-sm">Everyone is present today!</p>
          </div>
        ) : (
          users.map((person, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br from-red-400 to-red-600">
                {person.user_name?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate">{person.user_name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-red-600 font-medium bg-red-100 px-1.5 py-0.5 rounded uppercase">
                    {person.leave_type}
                  </span>
                  {person.is_half_day ? (
                    <span className="text-[10px] text-orange-600 font-medium bg-orange-100 px-1.5 py-0.5 rounded">
                      Half Day
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

// Upcoming Holidays Card Component
const HolidayCard = React.memo(({ holidays, isAdmin }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FiCalendar className="text-green-600" />
          Upcoming Holidays
        </h2>
      </div>

      <div className="flex-1 space-y-3 min-h-[100px]">
        {!holidays || holidays.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <FiCalendar className="text-gray-200 text-4xl mb-2" />
            <p className="text-gray-500 text-sm">No upcoming holidays scheduled</p>
          </div>
        ) : (
          holidays.map((holiday, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="w-10 h-10 rounded-lg flex flex-col items-center justify-center bg-white border border-green-200 text-green-600 flex-shrink-0">
                <span className="text-[10px] uppercase font-bold leading-none">
                  {new Date(holiday.holiday_date).toLocaleDateString('en-US', { month: 'short' })}
                </span>
                <span className="text-lg font-black leading-none">
                  {new Date(holiday.holiday_date).getDate()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">{holiday.name}</p>
                <p className="text-[11px] text-gray-600 line-clamp-1">{holiday.description || 'Public Holiday'}</p>
                <p className="text-[10px] text-green-700 font-medium mt-1">
                  {new Date(holiday.holiday_date).toLocaleDateString('en-US', { weekday: 'long' })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});
