import React, { useState } from 'react';
import { FiCalendar, FiUser, FiCheck, FiX, FiCoffee, FiChevronLeft, FiChevronRight, FiActivity } from 'react-icons/fi';

export default function TimesheetPage() {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date('2026-01-12')); // Start of week containing Jan 15
  const [selectedUser] = useState({ id: 1, name: 'John Doe' });

  // Static week data for demonstration
  const staticWeekData = [
    {
      date: '2026-01-12',
     
      email: 'john.doe@company.com',
      status: 'leave',
      check_in_time: '',
      check_out_time: '',
      hours_worked: '',
      work_notes: '',
      is_working_day: false,
      is_future: false
    },
    {
      date: '2026-01-13',
     
      email: 'john.doe@company.com',
      status: 'present',
      check_in_time: '09:00',
      check_out_time: '17:30',
      hours_worked: '8.50',
      work_notes: 'Worked on project tasks',
      is_working_day: true,
      is_future: false
    },
    {
      date: '2026-01-14',
     
      email: 'john.doe@company.com',
      status: 'present',
      check_in_time: '09:15',
      check_out_time: '18:00',
      hours_worked: '8.75',
      work_notes: 'Completed feature implementation',
      is_working_day: true,
      is_future: false
    },
    {
      date: '2026-01-15',
      
      email: 'john.doe@company.com',
      status: 'half_day',
      check_in_time: '09:00',
      check_out_time: '13:00',
      hours_worked: '4.00',
      work_notes: 'Half day leave',
      is_working_day: true,
      is_future: false
    },
    {
      date: '2026-01-16',
      
      email: 'john.doe@company.com',
      status: 'present',
      check_in_time: '08:45',
      check_out_time: '17:15',
      hours_worked: '8.50',
      work_notes: 'Code review and testing',
      is_working_day: true,
      is_future: false
    },
    {
      date: '2026-01-17',
     
      email: 'john.doe@company.com',
      status: 'holiday',
      check_in_time: '',
      check_out_time: '',
      hours_worked: '',
      work_notes: '',
      is_working_day: false,
      is_future: false
    },
    {
      date: '2026-01-18',
     
      email: 'john.doe@company.com',
      status: 'leave',
      check_in_time: '',
      check_out_time: '',
      hours_worked: '',
      work_notes: '',
      is_working_day: false,
      is_future: false
    }
  ];

  const previousWeek = () => {
    setCurrentWeekStart(prev => {
      const newWeek = new Date(prev);
      newWeek.setDate(newWeek.getDate() - 7);
      return newWeek;
    });
  };

  const nextWeek = () => {
    setCurrentWeekStart(prev => {
      const newWeek = new Date(prev);
      newWeek.setDate(newWeek.getDate() + 7);
      return newWeek;
    });
  };

  const formatWeekRange = () => {
    const endDate = new Date(currentWeekStart);
    endDate.setDate(currentWeekStart.getDate() + 6);
    return `${currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Clean Timesheet Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiActivity className="text-blue-600" />
                Weekly Time Entries
              </h3>

              <div className="flex items-center gap-3">
                {/* Week Navigation */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={previousWeek}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <FiChevronLeft size={16} />
                  </button>
                  <span className="text-sm font-medium text-gray-700 min-w-[140px] text-center">
                    {formatWeekRange()}
                  </span>
                  <button
                    onClick={nextWeek}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <FiChevronRight size={16} />
                  </button>
                </div>

                {/* User Display */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiUser size={14} />
                  <span>{selectedUser.name}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Email</th>
                  <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Date</th>
                  <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Check In</th>
                  <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Check Out</th>
                  <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Hours</th>
                  <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Work Notes</th>
                  <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {staticWeekData.map((day, index) => {
                  const isNonWorkingDay = !day.is_working_day;
                  const isFutureDay = day.is_future;

                  return (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 transition-colors ${isFutureDay ? 'bg-blue-50/50 opacity-60' :
                        isNonWorkingDay ? 'bg-gray-50 opacity-75' :
                          getStatusRowColor(day.status)
                        }`}
                    >
                      <td className="px-3 py-1.5">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(day.status)}
                          <div>
                            <div className="font-medium text-gray-900" style={{ fontSize: '10px' }}>{day.email}</div>
                            <div className="text-gray-500" style={{ fontSize: '9px' }}>{day.email}</div>
                            {isNonWorkingDay && <div className="text-gray-500" style={{ fontSize: '9px' }}>Non-working</div>}
                            {isFutureDay && <div className="text-blue-600" style={{ fontSize: '9px' }}>Future</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-1.5">
                        <div className="text-gray-900" style={{ fontSize: '10px' }}>
                          {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-3 py-1.5">
                        <div className="w-full px-2 py-1 bg-gray-100 text-center font-medium" style={{ fontSize: '10px' }}>
                          {day.check_in_time || '-'}
                        </div>
                      </td>
                      <td className="px-3 py-1.5">
                        <div className="w-full px-2 py-1 bg-gray-100 text-center font-medium" style={{ fontSize: '10px' }}>
                          {day.check_out_time || '-'}
                        </div>
                      </td>
                      <td className="px-3 py-1.5">
                        <div className="w-16 px-2 py-1 bg-gray-100 text-center font-medium" style={{ fontSize: '10px' }}>
                          {day.hours_worked || '-'}
                        </div>
                      </td>
                      <td className="px-3 py-1.5">
                        <div className="w-full px-2 py-1 bg-gray-100" style={{ fontSize: '10px' }}>
                          {day.work_notes || '-'}
                        </div>
                      </td>
                      <td className="px-3 py-1.5">
                        <div className={`w-full px-2 py-1 border rounded text-center font-bold shadow-sm ${getStatusBadgeColor(day.status)}`} style={{ fontSize: '10px' }}>
                          {day.status === 'present' ? 'Present' :
                           day.status === 'half_day' ? 'Half Day' :
                           day.status === 'leave' ? 'Leave' :
                           day.status === 'holiday' ? 'Holiday' : '-'}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}

// Simple status row colors (Very Light)
const getStatusRowColor = (status) => {
  switch (status) {
    case 'present': return 'bg-green-50/50';
    case 'half_day': return 'bg-yellow-50/50';
    case 'leave': return 'bg-red-50/50';
    case 'holiday': return 'bg-blue-50/50';
    default: return 'bg-transparent';
  }
};

// Simple status badge colors (Deep & Prominent)
const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'present': return 'bg-green-600 text-white border-green-700';
    case 'half_day': return 'bg-yellow-500 text-white border-yellow-600';
    case 'leave': return 'bg-red-600 text-white border-red-700';
    case 'holiday': return 'bg-blue-600 text-white border-blue-700';
    default: return 'bg-gray-200 text-gray-800 border-gray-300';
  }
};

// Simple status icons
const getStatusIcon = (status) => {
  switch (status) {
    case 'present': return <FiCheck className="w-4 h-4 text-green-600" />;
    case 'half_day': return <FiCoffee className="w-4 h-4 text-yellow-600" />;
    case 'leave': return <FiCalendar className="w-4 h-4 text-red-600" />;
    case 'holiday': return <FiTarget className="w-4 h-4 text-blue-600" />;
    default: return <FiActivity className="w-4 h-4 text-gray-400" />;
  }
};
