import React, { useState } from "react";
import { FiCalendar, FiClock, FiCheck, FiX, FiPlus, FiTrash2, FiEye, FiFilter, FiEdit2, FiCheckCircle, FiXCircle, FiEdit3, FiMinusCircle, FiSlash, FiTarget } from 'react-icons/fi';

const LeavePage = () => {
  const [activeTab, setActiveTab] = useState('my-leaves');
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const isAdmin = false; // Static for demo

  // Static leave data
  const leaveApplications = [
    {
      id: 1,
      user_name: 'John Doe',
      user_email: 'john.doe@company.com',
      leave_type: 'annual',
      from_date: '2026-01-15',
      to_date: '2026-01-17',
      total_days: 3,
      status: 'approved',
      reason: 'Family vacation',
      created_at: '2026-01-10T10:00:00Z'
    },
    {
      id: 2,
      user_name: 'Jane Smith',
      user_email: 'jane.smith@company.com',
      leave_type: 'sick',
      from_date: '2026-01-20',
      to_date: '2026-01-20',
      total_days: 1,
      status: 'pending',
      reason: 'Medical appointment',
      created_at: '2026-01-18T14:30:00Z'
    },
    {
      id: 3,
      user_name: 'Bob Johnson',
      user_email: 'bob.johnson@company.com',
      leave_type: 'casual',
      from_date: '2026-02-01',
      to_date: '2026-02-01',
      total_days: 1,
      status: 'rejected',
      reason: 'Personal work',
      created_at: '2026-01-25T09:15:00Z'
    }
  ];

  const compOffRequests = [
    {
      id: 1,
      user_name: 'Alice Wilson',
      work_date: '2026-01-18',
      duration: 'Full Day',
      reason: 'Holiday work on Republic Day',
      status: 'approved'
    }
  ];

  // Filter leave applications
  const filteredLeaves = selectedStatus === 'All'
    ? leaveApplications
    : leaveApplications.filter(leave => leave.status === selectedStatus.toLowerCase());

  const filteredCompOffs = selectedStatus === 'All'
    ? compOffRequests
    : compOffRequests.filter(co => co.status === selectedStatus.toLowerCase());

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-600 text-white border-green-700';
      case 'rejected': return 'bg-red-600 text-white border-red-700';
      case 'pending': return 'bg-yellow-500 text-white border-yellow-600';
      case 'cancel_requested': return 'bg-orange-500 text-white border-orange-600';
      case 'cancelled': return 'bg-gray-500 text-white border-gray-600';
      default: return 'bg-gray-200 text-gray-800 border-gray-300';
    }
  };

  const getLeaveTypeLabel = (type) => {
    const labels = {
      casual: 'Casual Leave',
      paid: 'Paid Leave',
      medical: 'Medical Leave',
      half_day: 'Half Day',
      sick: 'Sick Leave',
      annual: 'Annual Leave',
      unpaid: 'Unpaid Leave',
      other: 'Other'
    };
    return labels[type] || type;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex">
        <main className="flex-1 overflow-hidden px-4 sm:px-6 py-4 space-y-4 md:pb-4 pb-24">

          {/* LEAVE TABLE */}
          <div className="bg-white rounded-xl border flex flex-col overflow-hidden" style={{ height: window.innerWidth < 640 ? 'calc(100vh - 180px)' : 'calc(100vh - 90px)' }}>

            {/* FIXED FILTER HEADER */}
            <div className="sticky top-0 z-10 bg-white rounded-t-xl border-b border-gray-200 shadow-sm flex-shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-6 pt-2 pb-2">

                {/* Desktop: Left Side - Title */}
                <div className="hidden sm:flex items-center gap-3 mb-0">
                  <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>Leave Management</h2>
                </div>

                {/* Right Side Controls Group */}
                <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
                  {/* Tabs - Switching between Leaves and Comp Offs */}
                  <div className="flex bg-gray-100 p-1 rounded-lg flex-shrink-0">
                    <button
                      onClick={() => setActiveTab('my-leaves')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === 'my-leaves' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                      style={{ fontFamily: 'var(--font-family)' }}
                    >
                      Leaves
                    </button>
                    <button
                      onClick={() => setActiveTab('my-comp-offs')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === 'my-comp-offs' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                      style={{ fontFamily: 'var(--font-family)' }}
                    >
                      Comp Off Grants
                    </button>
                  </div>

                  {/* Desktop Only Controls (Filter & Apply) - Hidden on Mobile to avoid duplication */}
                  <div className="hidden sm:flex items-center gap-3">
                    {/* Status Filter */}
                    <div className="relative">
                      <button
                        onClick={() => setIsFilterPopupOpen(!isFilterPopupOpen)}
                        className="flex items-center gap-0 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
                        style={{ height: '30px' }}
                      >
                        <div className="flex items-center justify-center w-7 h-full bg-gray-100 rounded-l-lg border-r border-gray-300">
                          <FiFilter size={14} />
                        </div>
                        <span style={{ fontWeight: '400', fontSize: '12px', padding: '0 8px', fontFamily: 'var(--font-family)' }}>
                          {selectedStatus === 'All' ? 'All Status' : selectedStatus}
                        </span>
                      </button>
                      {isFilterPopupOpen && (
                        <div className="absolute top-full mt-2 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-36 py-1">
                          {['All', 'Pending', 'Approved', 'Rejected'].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => { setSelectedStatus(opt); setIsFilterPopupOpen(false); }}
                              className={`w-full flex items-center justify-between px-3 py-1.5 text-left text-xs hover:bg-gray-50 ${selectedStatus === opt ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                              style={{ fontFamily: 'var(--font-family)' }}
                            >
                              <span>{opt}</span>
                              {selectedStatus === opt && <FiCheckCircle className="text-blue-600" size={14} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-auto">
              {!activeTab.includes('comp-off') ? (
                <>
                  {/* MOBILE CARD VIEW FOR LEAVES */}
                  <div className="block sm:hidden" style={{ fontFamily: 'var(--font-family)' }}>
                    {filteredLeaves.length === 0 ? (
                      <div className="text-center py-12 px-4">
                        <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>No leave applications found</h3>
                        <p className="mt-1 text-sm text-gray-500" style={{ fontFamily: 'var(--font-family)' }}>Leave applications will appear here.</p>
                      </div>
                    ) : (
                      <div className="space-y-2 px-2 py-2">
                        {filteredLeaves.map((leave) => (
                          <div
                            key={`mobile-leave-${leave.id}`}
                            className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            style={{ fontFamily: 'var(--font-family)' }}
                            onClick={() => setSelectedLeave(leave)}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>
                                {getLeaveTypeLabel(leave.leave_type)}
                              </h3>
                              <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(leave.status)}`} style={{ fontFamily: 'var(--font-family)' }}>
                                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2" style={{ fontFamily: 'var(--font-family)' }}>
                              <FiCalendar size={12} className="text-gray-400" />
                              <span>{formatDate(leave.from_date)} - {formatDate(leave.to_date)}</span>
                              <span className="ml-auto text-gray-500">({leave.total_days} days)</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-600" style={{ fontFamily: 'var(--font-family)' }}>
                              <div className="flex gap-2 ml-auto" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => setSelectedLeave(leave)} className="p-1.5 text-gray-500 hover:bg-gray-50 rounded-lg" title="View Details"><FiEye size={16} /></button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* DESKTOP TABLE VIEW */}
                  <div className="hidden sm:block overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                    <table className="w-full min-w-[800px]" style={{ fontFamily: 'var(--font-family)' }}>
                      <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                        <tr>
                          <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Leave Type</th>
                          <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>From</th>
                          <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>To</th>
                          <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Days</th>
                          <th className="px-3 py-1.5 text-left font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Status</th>
                          <th className="px-3 py-1.5 text-center font-medium text-gray-500 uppercase tracking-tight" style={{ fontSize: '10px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredLeaves.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="px-4 py-8 text-center">
                              <FiCalendar className="mx-auto h-10 w-10 text-gray-400" />
                              <h3 className="mt-2 text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>No leave applications found</h3>
                            </td>
                          </tr>
                        ) : (
                          filteredLeaves.map((leave) => (
                            <tr key={leave.id} className="hover:bg-gray-50">
                              <td className="px-3 py-1.5 whitespace-nowrap text-gray-900" style={{ fontSize: '10px' }}>{getLeaveTypeLabel(leave.leave_type)}</td>
                              <td className="px-3 py-1.5 whitespace-nowrap text-gray-900" style={{ fontSize: '10px' }}>{formatDate(leave.from_date)}</td>
                              <td className="px-3 py-1.5 whitespace-nowrap text-gray-900" style={{ fontSize: '10px' }}>{formatDate(leave.to_date)}</td>
                              <td className="px-3 py-1.5 whitespace-nowrap text-gray-900 font-medium" style={{ fontSize: '10px' }}>{leave.total_days}</td>
                              <td className="px-3 py-1.5 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-0.5 rounded border text-[10px] font-bold ${getStatusColor(leave.status)}`}>
                                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-3 py-1.5 whitespace-nowrap text-center">
                                <div className="flex justify-center gap-1">
                                  <button onClick={() => setSelectedLeave(leave)} className="h-6 w-6 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded" title="View Details"><FiEye size={12} /></button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                /* COMP OFF LIST VIEW */
                <div className="p-4 overflow-auto">
                  {filteredCompOffs.length === 0 ? (
                    <div className="text-center py-12">
                      <FiTarget className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>No Comp Off grants found</h3>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border rounded-xl">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-tight border-b">Work Date</th>
                            <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-tight border-b">Duration</th>
                            <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-tight border-b">Reason</th>
                            <th className="px-3 py-1.5 text-center text-[10px] font-medium text-gray-500 uppercase tracking-tight border-b">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                          {filteredCompOffs.map((co) => (
                            <tr key={`co-${co.id}`} className="hover:bg-gray-50 transition-colors">
                              <td className="px-3 py-1.5 whitespace-nowrap text-[10px] text-gray-600">{formatDate(co.work_date)}</td>
                              <td className="px-3 py-1.5 whitespace-nowrap text-[10px] text-gray-600">{co.duration}</td>
                              <td className="px-3 py-1.5 text-[10px] text-gray-600 max-w-[200px] truncate">{co.reason}</td>
                              <td className="px-3 py-1.5 whitespace-nowrap text-center">
                                <span className={`inline-flex px-2 py-0.5 text-[10px] font-bold rounded border ${getStatusColor(co.status)}`}>
                                  {co.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Leave Details Modal */}
        {
          selectedLeave && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1200] p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>Leave Details</h3>
                  <button onClick={() => setSelectedLeave(null)} className="text-gray-400 hover:text-gray-600 p-1"><FiX size={18} /></button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-family)' }}>Leave Type</span>
                    <span className="text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>{getLeaveTypeLabel(selectedLeave.leave_type)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-family)' }}>Status</span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(selectedLeave.status)}`} style={{ fontFamily: 'var(--font-family)' }}>{selectedLeave.status.charAt(0).toUpperCase() + selectedLeave.status.slice(1)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-family)' }}>Date</span>
                    <span className="text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>{formatDate(selectedLeave.from_date)}{selectedLeave.from_date !== selectedLeave.to_date && ` - ${formatDate(selectedLeave.to_date)}`}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-family)' }}>Total Days</span>
                    <span className="text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>{selectedLeave.total_days} {selectedLeave.total_days === 1 ? 'day' : 'days'}</span>
                  </div>
                  <div className="py-2 border-b border-gray-100">
                    <span className="text-xs text-gray-500 block mb-1" style={{ fontFamily: 'var(--font-family)' }}>Reason</span>
                    <p className="text-sm text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>{selectedLeave.reason || 'No reason provided'}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <button onClick={() => setSelectedLeave(null)} className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50" style={{ fontFamily: 'var(--font-family)' }}>Close</button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default LeavePage;
