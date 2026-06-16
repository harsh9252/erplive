import React, { useState, useRef, useEffect } from "react";
import { FiUserPlus, FiMail, FiPhone, FiCalendar, FiEdit, FiTrash2, FiSearch, FiPlus, FiSliders, FiList, FiUpload, FiFilter, FiCheck, FiUser, FiUserCheck, FiUserX, FiBriefcase, FiMapPin, FiDollarSign, FiRefreshCw } from "react-icons/fi";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import TableActionButton from "../components/TableActionButton";
import UserInfo from "../components/UserInfo";
import EmployeeFormMVC from "../components/EmployeeFormMVC";

import Table from "../components/Table";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import { useNotification } from "../contexts/NotificationContext";

export default function EmployeePage({ searchTerm = '' }) {
  const { user: currentUser } = useAuth();
  const { showToast } = useNotification();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('Active');
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEmployeeFormOpen, setIsEmployeeFormOpen] = useState(false);
  const filterDropdownRef = useRef(null);

  const isAdmin = currentUser?.role?.toLowerCase() === 'admin';

  // Fetch employees data
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/employees');
      // The API returns data wrapped in { success: true, data: employees }
      const employeesData = response?.data || response || [];
      setEmployees(Array.isArray(employeesData) ? employeesData : []);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to load employees. Please try again.');
      showToast('Failed to load employees', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Load employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle add new employee
  const handleAddEmployee = () => {
    setIsEmployeeFormOpen(true);
  };

  // Handle form submission
  const handleEmployeeSubmit = async (employeeData) => {
    try {
      // Decide whether to create or update based on presence of id
      if (employeeData?.id) {
        await api.updateEmployee(employeeData.id, employeeData);
        showToast('Employee updated successfully!', 'success');
      } else {
        await api.createEmployee(employeeData);
        showToast('Employee created successfully!', 'success');
      }

      setIsEmployeeFormOpen(false);
      // Refresh the employee list
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
      throw error; // Let the form handle the error
    }
  };

  // Handle delete employee
  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.deleteEmployee(id);
        showToast('Employee deleted successfully!', 'success');
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        showToast(error.message || 'Failed to delete employee', 'error');
      }
    }
  };


  // Filter employees based on search term and status
  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.first_name || ''}`;
    const search = (searchTerm || '').toLowerCase();

    const matchesSearch = searchTerm === '' ||
      fullName.toLowerCase().includes(search) ||
      (employee.email && employee.email.toLowerCase().includes(search)) ||
      (employee.username && employee.username.toLowerCase().includes(search)) ||
      (employee.role && employee.role.toLowerCase().includes(search)) ||
      (employee.employee_id && employee.employee_id.toLowerCase().includes(search));

    const matchesStatus = selectedStatus === 'All' || employee.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 border-green-200";
      case "Inactive": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getEmploymentTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "full-time": return "bg-blue-100 text-blue-700 border-blue-200";
      case "part-time": return "bg-orange-100 text-orange-700 border-orange-200";
      case "contract": return "bg-purple-100 text-purple-700 border-purple-200";
      case "intern": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Table configuration
  const employeeColumns = [
    { key: 'name', title: 'Full Name', width: '20%' },
    { key: 'employee_id', title: 'Emp ID', width: '10%' },
    { key: 'email', title: 'Email', width: '18%' },
    { key: 'phone', title: 'Phone', width: '12%' },
    { key: 'employment_type', title: 'Type', width: '12%' },
    { key: 'role', title: 'Role', width: '12%' },
    { key: 'status', title: 'Status', width: '11%' },
    { key: 'actions', title: 'Actions', align: 'center', width: '5%' }
  ];

  const renderEmployeeCell = (key, rowEmployee) => {
    switch (key) {
      case 'employee_id':
        return <span style={{ fontFamily: 'var(--font-family)', fontWeight: '500' }}>{rowEmployee.employee_id || '-'}</span>;
      case 'name':
        const fullName = `${rowEmployee.first_name}`;
        return (
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setSelectedEmployee(rowEmployee)}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
              border: '2px solid var(--primary-color)',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {rowEmployee.profile_image ? (
                <img
                  src={rowEmployee.profile_image}
                  alt={fullName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div style="color: var(--primary-color); font-size: 18px; font-weight: 600;">${rowEmployee.first_name.charAt(0)}</div>`;
                  }}
                />
              ) : (
                <div style={{ color: 'var(--primary-color)', fontSize: '18px', fontWeight: '600', fontFamily: 'var(--font-family)' }}>
                  {rowEmployee.first_name.charAt(0)}
                </div>
              )}
            </div>
            <div className="max-w-xs truncate hover:underline" style={{ color: 'var(--primary-color)', fontFamily: 'var(--font-family)' }}>
              {fullName}
            </div>
          </div>
        );
      case 'email':
        return <span style={{ fontFamily: 'var(--font-family)' }}>{rowEmployee.email}</span>;
      case 'phone':
        return <span style={{ fontFamily: 'var(--font-family)' }}>{rowEmployee.phone || ''}</span>;
      case 'employment_type':
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-normal rounded-full ${getEmploymentTypeColor(rowEmployee.employment_type)}`} style={{ fontFamily: 'var(--font-family)' }}>
            {rowEmployee.employment_type || 'Full-time'}
          </span>
        );
      case 'role':
        return <span style={{ fontFamily: 'var(--font-family)' }}>{rowEmployee.role}</span>;
      case 'status':
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-normal rounded-full ${getStatusColor(rowEmployee.status)}`} style={{ fontFamily: 'var(--font-family)' }}>
            {rowEmployee.status}
          </span>
        );
      case 'actions':
        return (
          <div className="flex justify-center gap-1 sm:gap-2">
            <TableActionButton
              icon={FaPencilAlt}
              type="edit"
              title="Edit Employee"
              onClick={() => {
                setSelectedEmployee(null);
                setSelectedEmployee(rowEmployee);
                setIsEmployeeFormOpen(true);
              }}
              extraSmall={true}
            />
            <TableActionButton
              icon={FiTrash2}
              type="delete"
              title="Delete Employee"
              onClick={() => handleDeleteEmployee(rowEmployee.id)}
              mobileSize={false}
              extraSmall={true}
            />
          </div>
        );
      default:
        return <span style={{ fontFamily: 'var(--font-family)' }}>{rowEmployee[key]}</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex">
        <main className="flex-1 overflow-hidden px-4 sm:px-6 py-4 space-y-4 md:pb-4 pb-24">

          {/* EMPLOYEES TABLE */}
          <div className="bg-white rounded-xl border border flex flex-col overflow-hidden" style={{ height: window.innerWidth < 640 ? 'calc(100vh - 180px)' : 'calc(100vh - 90px)' }}>
            {selectedEmployee ? (
              <UserInfo selectedUser={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
            ) : (
              <>
                {/* FIXED FILTER HEADER */}
                <div className="sticky top-0 z-10 bg-white rounded-t-xl border-b border-gray-200 shadow-sm flex-shrink-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-6 pt-2 pb-2">
                    {/* Mobile: All filters in one row */}
                    <div className="flex items-center justify-end gap-2 w-full py-0 flex-wrap sm:hidden ml-auto">
                      {/* Add New Employee Button - Mobile */}
                      <button
                        className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 active:shadow-md transition-all shadow-sm"
                        title="Add New Employee"
                        onClick={handleAddEmployee}
                      >
                        <FiUserPlus size={14} />
                        <span className="sm:hidden">Add</span>
                      </button>

                      {/* Status Filter - Mobile version with Active/Inactive options only */}
                      <div className="relative flex-shrink-0">
                        <button
                          data-filter-button="true"
                          onClick={() => setIsFilterPopupOpen(!isFilterPopupOpen)}
                          className="flex items-center gap-0 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 active:shadow-md transition-all shadow-sm"
                          style={{ height: '30px' }}
                          title="Filter by status"
                        >
                          <div className="flex items-center justify-center w-7 h-full bg-gray-100 rounded-l-lg border-r border-gray-300">
                            <FiFilter size={14} />
                          </div>
                          <span style={{ fontWeight: '400', fontSize: '12px', lineHeight: '18px', padding: '0 8px', fontFamily: 'var(--font-family)' }}>
                            {selectedStatus === "Active" ? "Active" :
                              selectedStatus === "Inactive" ? "Inactive" : "Active"}
                          </span>
                        </button>
                        {isFilterPopupOpen && (
                          <div ref={filterDropdownRef} className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-40 py-1">
                            {[
                              { value: "Active", label: "Active" },
                              { value: "Inactive", label: "Inactive" }
                            ].map((option) => (
                              <button
                                key={option.value}
                                data-dropdown-option="true"
                                onClick={() => {
                                  setSelectedStatus(option.value);
                                  setIsFilterPopupOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-1.5 text-left text-xs hover:bg-gray-50 transition-colors ${selectedStatus === option.value
                                  ? "text-blue-600 font-medium"
                                  : "text-gray-700"
                                  }`}

                              >
                                <span>{option.label}</span>
                                {selectedStatus === option.value && (
                                  <FiCheck className="text-blue-600" size={14} />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Desktop: Left Side - Title */}
                    <div className="hidden sm:flex items-center gap-3 mb-3 sm:mb-0">
                      <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>Employees</h2>
                    </div>

                    {/* Desktop: Right Side - All Filters and New Button */}
                    <div className="hidden sm:flex items-center justify-end gap-2 sm:gap-3 py-0 flex-wrap">
                      {/* Employment Type Filter */}
                      <div className="relative">
                        <button
                          onClick={() => setIsFilterPopupOpen(!isFilterPopupOpen)}
                          className="flex items-center gap-0 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 active:shadow-md transition-all shadow-sm"
                          style={{ height: '30px' }}
                          title="Filter by status"
                        >
                          <div className="flex items-center justify-center w-7 h-full bg-gray-100 rounded-l-lg border-r border-gray-300">
                            <FiFilter size={14} />
                          </div>
                          <span className="hidden sm:inline" style={{ fontWeight: '400', fontSize: '12px', lineHeight: '18px', padding: '0 8px', fontFamily: 'var(--font-family)' }}>
                            {selectedStatus === "All" ? "All Status" :
                              selectedStatus === "Active" ? "Active" :
                                selectedStatus === "Inactive" ? "Inactive" : "All Status"}
                          </span>
                        </button>
                        {isFilterPopupOpen && (
                          <div ref={filterDropdownRef} className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-40 py-1">
                            {[
                              { value: "All", label: "All Status" },
                              { value: "Active", label: "Active" },
                              { value: "Inactive", label: "Inactive" }
                            ].map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setSelectedStatus(option.value);
                                  setIsFilterPopupOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-1.5 text-left text-xs hover:bg-gray-50 transition-colors ${selectedStatus === option.value
                                  ? "text-blue-600 font-medium"
                                  : "text-gray-700"
                                  }`}
                              >
                                <span>{option.label}</span>
                                {selectedStatus === option.value && (
                                  <FiCheck className="text-blue-600" size={14} />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Add New Employee Button */}
                      <button
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 active:shadow-md transition-all shadow-sm"
                        title="Add New Employee"
                        onClick={handleAddEmployee}
                      >
                        <FiUserPlus size={16} />
                        <span className="hidden sm:inline">Add Employee</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* SCROLLABLE CONTENT AREA */}
                <div className="flex-1 overflow-auto">
                  {/* MOBILE CARD VIEW */}
                  <div className="block sm:hidden mt-4" style={{ fontFamily: 'var(--font-family)' }}>
                    {filteredEmployees.length === 0 ? (
                      <div className="text-center py-12 px-4">
                        <FiUserPlus className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>No employees found</h3>
                        <p className="mt-1 text-sm text-gray-500" style={{ fontFamily: 'var(--font-family)' }}>No employees match the current filter.</p>
                      </div>
                    ) : (
                      <div className="space-y-2 px-2">
                        {filteredEmployees.map((rowEmployee) => (
                          <div
                            key={`mobile-employee-${rowEmployee.id}`}
                            className="bg-white rounded-lg border border-gray-200 p-3 pb-1 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            style={{ fontFamily: 'var(--font-family)' }}
                            onClick={() => setSelectedEmployee(rowEmployee)}
                          >
                            {/* Row 1: Name (left) and Status (right) */}
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex-1 min-w-0">
                                <h3
                                  className="text-sm font-semibold hover:underline transition-colors cursor-pointer"
                                  style={{
                                    fontFamily: 'var(--font-family)',
                                    color: 'var(--primary-color)'
                                  }}
                                  onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                                  onMouseLeave={(e) => e.target.style.color = 'var(--primary-color)'}
                                >
                                  {`${rowEmployee.first_name}`}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                  {rowEmployee.employee_id && `ID: ${rowEmployee.employee_id}`}
                                </p>
                              </div>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(rowEmployee.status)}`} style={{ fontFamily: 'var(--font-family)' }}>
                                {rowEmployee.status}
                              </span>
                            </div>

                            {/* Row 2: Email and Phone */}
                            <div className="flex justify-between items-center mb-2 text-xs text-gray-600" style={{ fontFamily: 'var(--font-family)' }}>
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                                  <FiMail size={10} className="text-purple-600" />
                                </div>
                                <span className="font-medium truncate" style={{ fontFamily: 'var(--font-family)' }}>{rowEmployee.email}</span>
                              </div>
                              <div className="flex items-center gap-2 ml-3">
                                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                                  <FiPhone size={10} className="text-blue-600" />
                                </div>
                                <span className="truncate" style={{ fontFamily: 'var(--font-family)' }}>{rowEmployee.phone || ''}</span>
                              </div>
                            </div>

                            {/* Row 3: Employment Type and Role */}
                            <div className="flex justify-between items-center mb-2 text-xs text-gray-600" style={{ fontFamily: 'var(--font-family)' }}>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                                  <FiBriefcase size={10} className="text-green-600" />
                                </div>
                                <span style={{ fontFamily: 'var(--font-family)' }}>{rowEmployee.employment_type || 'Full-time'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center">
                                  <FiUser size={10} className="text-orange-600" />
                                </div>
                                <span style={{ fontFamily: 'var(--font-family)' }}>{rowEmployee.role}</span>
                              </div>
                            </div>

                            {/* Row 4: Action Buttons */}
                            <div className="flex justify-end items-center text-xs text-gray-600" style={{ fontFamily: 'var(--font-family)' }}>
                              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                <TableActionButton
                                  icon={FaPencilAlt}
                                  type="edit"
                                  title="Edit Employee"
                                  onClick={() => {
                                    setSelectedEmployee(rowEmployee);
                                    setIsEmployeeFormOpen(true);
                                  }}
                                  mobileSize={true}
                                />
                                <TableActionButton
                                  icon={FiTrash2}
                                  type="delete"
                                  title="Delete Employee"
                                  onClick={() => handleDeleteEmployee(rowEmployee.id)}
                                  mobileSize={true}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* DESKTOP TABLE VIEW */}
                  <Table
                    data={filteredEmployees}
                    columns={employeeColumns}
                    loading={loading}
                    emptyMessage="No employees found"
                    emptyDescription="No employees match the current filter."
                    onEdit={null}
                    onDelete={null}
                    renderCell={renderEmployeeCell}
                    loadingMessage="Loading employees..."
                    keyField="id"
                    user={currentUser}
                  />
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Employee Form Popup */}
      <EmployeeFormMVC
        isOpen={isEmployeeFormOpen}
        onClose={() => {
          setIsEmployeeFormOpen(false);
          setSelectedEmployee(null);
        }}
        onSubmit={handleEmployeeSubmit}
        editUser={selectedEmployee}
        title={selectedEmployee ? "EDIT EMPLOYEE" : "CREATE EMPLOYEE"}
      />
    </div>
  );
}
