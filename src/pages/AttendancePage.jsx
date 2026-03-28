import { useState, useRef, useEffect, useMemo } from 'react';
import { FiCalendar, FiUser, FiCheck, FiX, FiCoffee, FiActivity, FiTarget, FiUpload, FiDownload, FiSave, FiClock, FiEdit, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import { useNotification } from '../contexts/NotificationContext';
import { useAuth } from '../components/AuthContext';
import attendanceApi from '../services/attendanceApi.js';
import api from '../services/api.js';

// Generate current week's data with real dates
const generateCurrentWeekData = () => {
  const today = new Date();
  const currentWeekData = [];

  // Get the start of the week (Sunday)
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(weekStart);
    currentDate.setDate(weekStart.getDate() + i);

    const isToday = currentDate.toDateString() === today.toDateString();
    const isFuture = currentDate > today;
    const dayOfWeek = currentDate.getDay();

    currentWeekData.push({
      date: currentDate.toISOString().split('T')[0],
      dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek],
      status: '',
      check_in_time: '',
      check_out_time: '',
      hours_worked: '',
      work_notes: '',
      is_working_day: true,
      is_future: isFuture
    });
  }

  return currentWeekData;
};

// Helper function to calculate hours worked
const calculateHoursWorked = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return '';

  try {
    const today = new Date().toISOString().split('T')[0];
    const inTime = new Date(`${today}T${checkIn}:00`);
    const outTime = new Date(`${today}T${checkOut}:00`);

    if (outTime <= inTime) return '';

    const diffMs = outTime - inTime;
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours.toFixed(2);
  } catch (error) {
    return '';
  }
};

// Helper function to get status color classes
const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'present': return 'bg-green-100 text-green-800 border-green-200';
    case 'half_day': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'leave': return 'bg-red-100 text-red-800 border-red-200';
    case 'holiday': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

const getStatusRowColor = (status) => {
  switch (status) {
    case 'present': return 'bg-green-50/30';
    case 'half_day': return 'bg-yellow-50/30';
    case 'leave': return 'bg-red-50/30';
    case 'holiday': return 'bg-blue-50/30';
    default: return '';
  }
};

export default function AttendancePage() {
  const { showToast } = useNotification();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [userAttendanceData, setUserAttendanceData] = useState({});
  const fileInputRef = useRef(null);
  const [editingCell, setEditingCell] = useState(null);
  const [weekData, setWeekData] = useState(generateCurrentWeekData());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const [userFilter, setUserFilter] = useState('all'); // 'all', 'admins', 'self'
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);

  const isAdmin = currentUser?.role === 'admin';

  // Calculate filtered users based on users and userFilter
  useEffect(() => {
    if (users.length > 0) {
      let filtered = users;
      if (isAdmin) {
        if (userFilter === 'admins') {
          filtered = users.filter(u => u.role === 'admin');
        } else if (userFilter === 'self') {
          filtered = users.filter(u => u.id === currentUser?.id);
        }
        // 'all' shows all users
      } else {
        // Non-admin users only see themselves
        filtered = users.filter(u => u.id === currentUser?.id);
      }
      setFilteredUsers(filtered);
      setUsersLoaded(true);
    }
  }, [users, userFilter, isAdmin, currentUser?.id]);

  // Load data on component mount
  useEffect(() => {
    loadAttendanceData();
  }, [selectedDate]);

  const loadUsers = async () => {
    try {
      console.log('Attempting to load users from:', '/users/directory');
      
      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await api.get('/users/directory');
      clearTimeout(timeoutId);
      
      console.log('Users loaded successfully:', response);
      
      // Ensure response is an array
      if (Array.isArray(response)) {
        setUsers(response);
      } else if (response && response.data && Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.warn('Unexpected response format:', response);
        setUsers([]);
        showToast('Unexpected response format from server', 'warning');
      }
    } catch (error) {
      console.error('Error loading users:', error);
      if (error.name === 'AbortError') {
        showToast('Request timeout - server not responding', 'error');
      } else {
        showToast('Failed to load users', 'error');
      }
      setUsers([]);
    }
  };

  const loadAttendanceData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load users with error handling
      try {
        await loadUsers();
      } catch (error) {
        console.warn('Failed to load users, continuing anyway:', error);
        // Don't fail completely if users fail to load
      }

      const allUsersAttendance = {};

      if (isAdmin) {
        try {
          console.log('Loading all users attendance as admin');
          const allAttendance = await attendanceApi.getAllAttendance({
            start_date: selectedDate,
            end_date: selectedDate
          });

          if (Array.isArray(allAttendance)) {
            allAttendance.forEach(record => {
              if (!allUsersAttendance[record.user_id]) {
                allUsersAttendance[record.user_id] = [];
              }
              allUsersAttendance[record.user_id].push(record);
            });
          }
        } catch (error) {
          console.warn('Failed to load all users attendance:', error);
        }
      } else {
        try {
          const attendance = await attendanceApi.loadAttendance({
            start_date: selectedDate,
            end_date: selectedDate
          });
          allUsersAttendance[currentUser?.id] = attendance || [];
        } catch (error) {
          console.warn('Failed to load user attendance:', error);
          allUsersAttendance[currentUser?.id] = [];
        }
      }

      users.forEach(user => {
        if (!allUsersAttendance[user.id]) {
          allUsersAttendance[user.id] = [];
        }
      });

      setUserAttendanceData(allUsersAttendance);

      // Update weekData with current user's loaded data
      const currentUserAttendance = allUsersAttendance[currentUser?.id]?.[0];
      if (currentUserAttendance) {
        setWeekData(prevData => {
          const newData = [...prevData];
          const dayIndex = newData.findIndex(day => day.date === selectedDate);
          if (dayIndex !== -1) {
            newData[dayIndex] = {
              ...newData[dayIndex],
              status: currentUserAttendance.status || '',
              check_in_time: currentUserAttendance.check_in_time || '',
              check_out_time: currentUserAttendance.check_out_time || '',
              hours_worked: currentUserAttendance.hours_worked || '',
              work_notes: currentUserAttendance.work_notes || ''
            };
          }
          return newData;
        });
      }
    } catch (error) {
      console.error('Error loading attendance data:', error);
      setError('Failed to load attendance data. Please try again.');
      showToast('Failed to load attendance data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getUserAttendanceForDay = (userId, date) => {
    const userAttendance = userAttendanceData[userId] || [];
    return userAttendance.find(a => a.date === date) || {
      status: '',
      check_in_time: '',
      check_out_time: '',
      hours_worked: '',
      work_notes: ''
    };
  };

  const isFutureDate = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(dateString);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate > today;
  };

  const saveAttendanceData = async (userIdOrEvent = null) => {
    try {
      setLoading(true);
      
      // Handle case where event object is passed instead of userId
      let userId = null;
      if (userIdOrEvent && typeof userIdOrEvent === 'object' && userIdOrEvent.type) {
        // This is an event object, not a userId
        userId = null;
      } else if (typeof userIdOrEvent === 'number' || (typeof userIdOrEvent === 'string' && !isNaN(userIdOrEvent))) {
        // This is a userId
        userId = userIdOrEvent;
      }
      
      console.log('Saving attendance data for user:', userId || 'current user');

      // Determine which data to save based on userId
      let dayData;
      if (userId && userId !== currentUser?.id) {
        // Saving for another user (admin case)
        const userAttendance = userAttendanceData[userId] || [];
        dayData = userAttendance.find(a => a.date === selectedDate) || {
          status: '',
          check_in_time: '',
          check_out_time: '',
          hours_worked: '',
          work_notes: ''
        };
      } else {
        // Saving for current user
        dayData = weekData.find(day => day.date === selectedDate);
      }

      if (!dayData || !dayData.status) {
        showToast('Please select a status to save', 'warning');
        setLoading(false);
        return;
      }

      const calculatedHours = calculateHoursWorked(dayData.check_in_time, dayData.check_out_time);
      const hoursWorked = calculatedHours || dayData.hours_worked;

      // Ensure all values are primitives (strings/numbers/null), not objects or DOM elements
      const sanitizeValue = (val) => {
        if (val === null || val === undefined) return null;
        if (typeof val === 'string') return val;
        if (typeof val === 'number') return val;
        return String(val);
      };

      const attendanceData = {
        date: sanitizeValue(selectedDate),
        status: sanitizeValue(dayData.status),
        check_in_time: dayData.check_in_time && String(dayData.check_in_time).trim() ? String(dayData.check_in_time).trim() : null,
        check_out_time: dayData.check_out_time && String(dayData.check_out_time).trim() ? String(dayData.check_out_time).trim() : null,
        hours_worked: hoursWorked ? parseFloat(hoursWorked) : null,
        work_notes: dayData.work_notes && String(dayData.work_notes).trim() ? String(dayData.work_notes).trim() : null
      };

      // If userId is provided (admin marking for another user), add it to the payload
      // Only send user_id if it's different from current user (admin marking for another user)
      if (userId && userId !== currentUser?.id) {
        attendanceData.user_id = sanitizeValue(userId);
      }

      console.log('Attendance data to save:', attendanceData);

      await attendanceApi.saveAttendance(attendanceData);
      showToast('Attendance data saved successfully!', 'success');

      await loadAttendanceData();
    } catch (error) {
      console.error('Error saving attendance data:', error);
      showToast('Failed to save attendance data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadExcel = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        console.log('Excel data:', jsonData);
        showToast('Excel file uploaded successfully!', 'success');

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error reading Excel file:', error);
      showToast('Failed to read Excel file. Please check the file format.', 'error');

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleTimeChange = (userId, field, value) => {
    // Ensure value is a primitive (string/number), not an object or DOM element
    const primitiveValue = typeof value === 'string' || typeof value === 'number' ? value : String(value || '');
    
    // Allow editing for current user or if admin is editing another user
    const isCurrentUser = userId === currentUser?.id;
    const canEditUser = isCurrentUser || isAdmin;

    if (canEditUser) {
      // For current user, update weekData (which has unsaved edits)
      if (isCurrentUser) {
        setWeekData(prevData => {
          const newData = [...prevData];
          const dayIndex = newData.findIndex(day => day.date === selectedDate);
          if (dayIndex !== -1) {
            newData[dayIndex] = {
              ...newData[dayIndex],
              [field]: primitiveValue
            };

            if (field === 'check_in_time' || field === 'check_out_time') {
              const checkIn = field === 'check_in_time' ? primitiveValue : newData[dayIndex].check_in_time;
              const checkOut = field === 'check_out_time' ? primitiveValue : newData[dayIndex].check_out_time;

              if (checkIn && checkOut) {
                const calculatedHours = calculateHoursWorked(checkIn, checkOut);
                if (calculatedHours) {
                  newData[dayIndex].hours_worked = calculatedHours;
                }
              }
            }
          }
          return newData;
        });
      } else {
        // For other users (admin editing), update userAttendanceData
        setUserAttendanceData(prevData => {
          const newData = { ...prevData };
          if (!newData[userId]) {
            newData[userId] = [];
          }
          
          let dayRecord = newData[userId].find(a => a.date === selectedDate);
          if (!dayRecord) {
            dayRecord = {
              date: selectedDate,
              status: '',
              check_in_time: '',
              check_out_time: '',
              hours_worked: '',
              work_notes: ''
            };
            newData[userId].push(dayRecord);
          }

          dayRecord[field] = primitiveValue;

          if (field === 'check_in_time' || field === 'check_out_time') {
            const checkIn = field === 'check_in_time' ? primitiveValue : dayRecord.check_in_time;
            const checkOut = field === 'check_out_time' ? primitiveValue : dayRecord.check_out_time;

            if (checkIn && checkOut) {
              const calculatedHours = calculateHoursWorked(checkIn, checkOut);
              if (calculatedHours) {
                dayRecord.hours_worked = calculatedHours;
              }
            }
          }

          return newData;
        });
      }
    }
  };

  const handleDownloadExcel = () => {
    try {
      const excelData = weekData.map(day => ({
        'Day': day.dayName,
        'Date': new Date(day.date).toLocaleDateString('en-US'),
        'Check In': day.check_in_time || '',
        'Check Out': day.check_out_time || '',
        'Hours': day.hours_worked || '',
        'Work Notes': day.work_notes || '',
        'Status': day.status === 'present' ? 'Present' :
                 day.status === 'half_day' ? 'Half Day' :
                 day.status === 'leave' ? 'Leave' :
                 day.status === 'holiday' ? 'Holiday' : ''
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `attendance_${currentDate}.xlsx`;

      XLSX.writeFile(workbook, filename);
      showToast('Attendance data downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error creating Excel file:', error);
      showToast('Failed to download Excel file.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border p-6 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600 font-medium">Loading attendance data...</span>
          </div>
          <p className="text-sm text-gray-500">
            {!usersLoaded ? 'Loading users...' : 'Loading attendance records...'}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            This may take a few seconds
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiX className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-red-800">Attendance Data Error</h3>
            </div>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reload Page
              </button>
              <button
                onClick={loadAttendanceData}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const today = new Date();
  const formatDateCard = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => {
                const currentDate = new Date(selectedDate);
                currentDate.setDate(currentDate.getDate() - 1);
                setSelectedDate(currentDate.toISOString().split('T')[0]);
                setCurrentViewDate(currentDate);
                loadAttendanceData();
              }}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Previous Day</span>
            </button>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-400 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Today</div>
              <div className="text-sm font-bold text-blue-700">{formatDayName(today)}</div>
              <div className="text-lg font-semibold text-blue-900 mt-1">{formatDateCard(today)}</div>
            </div>

            <button
              type="button"
              onClick={() => {
                const currentDate = new Date(selectedDate);
                currentDate.setDate(currentDate.getDate() + 1);
                setSelectedDate(currentDate.toISOString().split('T')[0]);
                setCurrentViewDate(currentDate);
                loadAttendanceData();
              }}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1"
            >
              <span className="text-sm font-medium">Next Day</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiCalendar className="text-blue-600" />
                Daily Attendance
              </h3>
              <div className="text-sm text-gray-600 font-medium">
                {currentViewDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAdmin && (
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  style={{ height: '28px', fontSize: '10px' }}
                >
                  <option value="all">All Users</option>
                  <option value="admins">All Admins</option>
                  <option value="self">My Attendance</option>
                </select>
              )}

              <input
                type="date"
                className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                style={{ height: '28px', fontSize: '10px' }}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              <button
                type="button"
                onClick={handleUploadExcel}
                className="flex items-center gap-1.5 px-3 py-1 bg-green-600 text-white border border-green-700 rounded-lg font-medium transition-colors text-xs hover:bg-green-700 shadow-sm"
                style={{ height: '28px', fontSize: '10px' }}
              >
                <FiUpload className="w-3 h-3" />
                Upload Excel
              </button>

              <button
                type="button"
                onClick={handleDownloadExcel}
                className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white border border-blue-700 rounded-lg font-medium transition-colors text-xs hover:bg-blue-700 shadow-sm"
                style={{ height: '28px', fontSize: '10px' }}
              >
                <FiDownload className="w-3 h-3" />
                Download
              </button>

              <button
                type="button"
                onClick={saveAttendanceData}
                className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white border border-blue-700 rounded-lg font-medium transition-colors text-xs hover:bg-blue-700 shadow-sm"
                style={{ height: '28px', fontSize: '10px' }}
              >
                <FiSave className="w-3 h-3" />
                Save
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx,.xls"
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {usersLoaded ? (
            <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Employee Name</th>
                <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Check In</th>
                <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Check Out</th>
                <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Hours</th>
                <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Work Notes</th>
                <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const isCurrentUser = user.id === currentUser?.id;
                const canEdit = isCurrentUser || isAdmin; // Admin can edit any user, current user can edit themselves

                const isToday = selectedDate === new Date().toISOString().split('T')[0];
                const isFuture = isFutureDate(selectedDate);
                const rowKey = `${user.id}-${selectedDate}`;

                // Get user's attendance from loaded data
                const userAttendance = getUserAttendanceForDay(user.id, selectedDate);
                
                // For current user, merge with weekData (which has unsaved edits)
                let displayData = { ...userAttendance };
                if (isCurrentUser) {
                  const dayData = weekData.find(day => day.date === selectedDate);
                  if (dayData) {
                    displayData = {
                      status: dayData.status || userAttendance.status || '',
                      check_in_time: dayData.check_in_time || userAttendance.check_in_time || '',
                      check_out_time: dayData.check_out_time || userAttendance.check_out_time || '',
                      hours_worked: dayData.hours_worked || userAttendance.hours_worked || '',
                      work_notes: dayData.work_notes || userAttendance.work_notes || ''
                    };
                  }
                }

                return (
                  <tr
                    key={rowKey}
                    className={`hover:bg-gray-50 transition-colors ${isToday ? 'bg-blue-50' : ''} ${isFuture ? 'opacity-50' : ''}`}
                  >
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-medium text-gray-900" style={{ fontSize: '10px' }}>
                            {user.first_name || user.name || 'Employee'}
                          </div>
                          <div className="text-gray-500" style={{ fontSize: '9px' }}>
                            {user.employee_id || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-1.5">
                      {canEdit && !isFuture ? (
                        editingCell?.userId === user.id && editingCell?.column === 'checkIn' ? (
                          <input
                            type="time"
                            className="w-full px-2 py-1 border border-blue-500 rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                            style={{ fontSize: '10px', height: '24px' }}
                            value={displayData.check_in_time || ''}
                            onChange={(e) => handleTimeChange(user.id, 'check_in_time', e.target.value)}
                            onBlur={() => setEditingCell(null)}
                            autoFocus
                          />
                        ) : (
                          <div
                            className="w-full px-2 py-1 bg-gray-100 text-center font-medium cursor-pointer hover:bg-gray-200 transition-colors rounded"
                            style={{ fontSize: '10px', height: '24px', lineHeight: '24px' }}
                            onClick={() => canEdit && setEditingCell({ userId: user.id, column: 'checkIn' })}
                          >
                            {displayData.check_in_time || '-'}
                          </div>
                        )
                      ) : (
                        <div className="w-full px-2 py-1 bg-gray-100 text-center font-medium" style={{ fontSize: '10px' }}>
                          {displayData.check_in_time || '-'}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-1.5">
                      {canEdit && !isFuture ? (
                        editingCell?.userId === user.id && editingCell?.column === 'checkOut' ? (
                          <input
                            type="time"
                            className="w-full px-2 py-1 border border-blue-500 rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                            style={{ fontSize: '10px', height: '24px' }}
                            value={displayData.check_out_time || ''}
                            onChange={(e) => handleTimeChange(user.id, 'check_out_time', e.target.value)}
                            onBlur={() => setEditingCell(null)}
                            autoFocus
                          />
                        ) : (
                          <div
                            className="w-full px-2 py-1 bg-gray-100 text-center font-medium cursor-pointer hover:bg-gray-200 transition-colors rounded"
                            style={{ fontSize: '10px', height: '24px', lineHeight: '24px' }}
                            onClick={() => canEdit && setEditingCell({ userId: user.id, column: 'checkOut' })}
                          >
                            {displayData.check_out_time || '-'}
                          </div>
                        )
                      ) : (
                        <div className="w-full px-2 py-1 bg-gray-100 text-center font-medium" style={{ fontSize: '10px' }}>
                          {displayData.check_out_time || '-'}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-1.5">
                      <div className="w-16 px-2 py-1 bg-blue-50 text-center font-semibold text-blue-900 rounded border border-blue-200" style={{ fontSize: '10px', height: '24px', lineHeight: '24px' }}>
                        {displayData.hours_worked || '-'}
                      </div>
                    </td>
                    <td className="px-3 py-1.5">
                      {canEdit && !isFuture ? (
                        editingCell?.userId === user.id && editingCell?.column === 'workNotes' ? (
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            style={{ fontSize: '10px', height: '24px' }}
                            value={displayData.work_notes || ''}
                            onChange={(e) => handleTimeChange(user.id, 'work_notes', e.target.value)}
                            onBlur={() => setEditingCell(null)}
                            autoFocus
                          />
                        ) : (
                          <div
                            className="w-full px-2 py-1 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors rounded"
                            style={{ fontSize: '10px', height: '24px', lineHeight: '24px' }}
                            onClick={() => canEdit && setEditingCell({ userId: user.id, column: 'workNotes' })}
                          >
                            {displayData.work_notes || '-'}
                          </div>
                        )
                      ) : (
                        <div className="w-full px-2 py-1 bg-gray-100" style={{ fontSize: '10px' }}>
                          {displayData.work_notes || '-'}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-2">
                        <select
                          value={displayData.status || ''}
                          onChange={(e) => canEdit && handleTimeChange(user.id, 'status', e.target.value)}
                          className={`flex-1 px-2 py-1 border rounded text-center font-bold text-xs ${getStatusBadgeColor(displayData.status)}`}
                          style={{ fontSize: '10px', height: '24px' }}
                          disabled={!canEdit || isFuture}
                        >
                          <option value="">Select Status</option>
                          <option value="present">Present</option>
                          <option value="half_day">Half Day</option>
                          <option value="leave">Leave</option>
                          <option value="holiday">Holiday</option>
                        </select>
                        {canEdit && !isFuture && (
                          <>
                            <button
                              onClick={() => {
                                const calculatedHours = calculateHoursWorked(displayData.check_in_time, displayData.check_out_time);
                                if (calculatedHours) {
                                  handleTimeChange(user.id, 'hours_worked', calculatedHours);
                                }
                              }}
                              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                              title="Auto-calculate hours"
                            >
                              <FiClock className="w-3 h-3" />
                            </button>
                            {!isCurrentUser && (
                              <button
                                onClick={() => saveAttendanceData(user.id)}
                                className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                                title="Save attendance for this user"
                              >
                                <FiSave className="w-3 h-3" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Loading users...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'present': return <FiCheck className="w-4 h-4 text-green-600" />;
    case 'half_day': return <FiCoffee className="w-4 h-4 text-yellow-600" />;
    case 'leave': return <FiCalendar className="w-4 h-4 text-red-600" />;
    case 'holiday': return <FiTarget className="w-4 h-4 text-blue-600" />;
    default: return <FiActivity className="w-4 h-4 text-gray-400" />;
  }
}
