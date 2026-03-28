import React, { useState, useRef, useEffect } from "react";
import { FiUserPlus, FiMail, FiPhone, FiCalendar, FiEdit, FiTrash2, FiSearch, FiPlus, FiSliders, FiList, FiUpload, FiFilter, FiCheck, FiUser, FiUserCheck, FiUserX } from "react-icons/fi";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import TableActionButton from "../components/TableActionButton";
import UserInfo from "../components/UserInfo";
import UserCreationForm from "../components/UserCreationForm";
import userApi from "../services/userApi.js";

import Table from "../components/Table";
import { useAuth } from "../contexts/AuthContext";

export default function UsersPage({ searchTerm = '' }) {
  const { user: currentUser } = useAuth();

  const [selectedStatus, setSelectedStatus] = useState('Active');
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const filterDropdownRef = useRef(null);

  const isAdmin = currentUser?.role?.toLowerCase() === 'admin';
  const userAPI = userApi;

  // Debug logging
  console.log('UsersPage rendered, currentUser:', currentUser);
  console.log('isAdmin:', isAdmin);

// Load users on component mount and reset selectedUser
  useEffect(() => {
    setSelectedUser(null); // Reset selectedUser when component mounts
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userAPI.loadUsers();
      // Handle both direct array and wrapped response
      const usersData = Array.isArray(response) ? response : (response?.data || []);
      setUsersData(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Handle add new user
  const handleAddUser = () => {
    setIsUserFormOpen(true);
  };

// Handle form submission
  const handleUserSubmit = async (userData) => {
    try {
      const formattedData = {
        first_name: userData.first_name,
        email: userData.email,
        username: userData.username,
        password: userData.password,
        role: userData.role,
        status: userData.status
      };
      await userAPI.createUser(formattedData);
      setIsUserFormOpen(false);
      // Refresh the user list
      await loadUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Let the form handle the error
    }
  };

  const filteredUsers = usersData.filter(user => {
    const fullName = `${user.first_name || ''}`;
    const search = (searchTerm || '').toLowerCase();

    const matchesSearch = searchTerm === '' ||
      fullName.toLowerCase().includes(search) ||
      (user.email && user.email.toLowerCase().includes(search)) ||
      (user.username && user.username.toLowerCase().includes(search)) ||
      (user.role && user.role.toLowerCase().includes(search)) ||
      (user.employee_id && user.employee_id.toLowerCase().includes(search));

    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });


  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 border-green-200";
      case "Inactive": return "bg-red-100 text-red-700 border-red-200";
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
  const userColumns = [
    { key: 'name', title: 'Full Name', width: '25%' },
    { key: 'employee_id', title: 'Emp ID', width: '10%' },
    { key: 'email', title: 'Email', width: '25%' },
    { key: 'role', title: 'Role', width: '20%' },
    { key: 'status', title: 'Status', width: '15%' },
    { key: 'actions', title: 'Actions', align: 'center', width: '0%' }
  ];

  const renderUserCell = (key, rowUser) => {
    switch (key) {
      case 'employee_id':
        return <span style={{ fontFamily: 'var(--font-family)', fontWeight: '500' }}>{rowUser.employee_id || '-'}</span>;
      case 'name':
        const fullName = `${rowUser.first_name}`;
        return (
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setSelectedUser(rowUser)}
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
              {rowUser.profile_image ? (
                <img
                  src={rowUser.profile_image}
                  alt={fullName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div style="color: var(--primary-color); font-size: 18px; font-weight: 600;">${rowUser.first_name.charAt(0)}</div>`;
                  }}
                />
              ) : (
                <div style={{ color: 'var(--primary-color)', fontSize: '18px', fontWeight: '600', fontFamily: 'var(--font-family)' }}>
                  {rowUser.first_name.charAt(0)}
                </div>
              )}
            </div>
            <div className="max-w-xs truncate hover:underline" style={{ color: 'var(--primary-color)', fontFamily: 'var(--font-family)' }}>
              {fullName}
            </div>
          </div>
        );
      case 'email':
        return <span style={{ fontFamily: 'var(--font-family)' }}>{rowUser.email}</span>;
      case 'role':
        return <span style={{ fontFamily: 'var(--font-family)' }}>{rowUser.role}</span>;
      case 'status':
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-normal rounded-full ${getStatusColor(rowUser.status)}`} style={{ fontFamily: 'var(--font-family)' }}>
            {rowUser.status}
          </span>
        );
      case 'actions':
        return (
          <div className="flex justify-center gap-1 sm:gap-2">
            <TableActionButton
              icon={FaPencilAlt}
              type="edit"
              title="View Details"
              onClick={() => setSelectedUser(rowUser)}
              mobileSize={false}
              extraSmall={true}
            />
          </div>
        );
      default:
        return <span style={{ fontFamily: 'var(--font-family)' }}>{rowUser[key]}</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex">
        <main className="flex-1 overflow-hidden px-4 sm:px-6 py-4 space-y-4 md:pb-4 pb-24">
          {/* USERS TABLE */}
          <div className="bg-white rounded-xl border border flex flex-col overflow-hidden" style={{ minHeight: '400px', height: 'auto' }}>
            {selectedUser ? (
              <UserInfo selectedUser={selectedUser} onClose={() => setSelectedUser(null)} onUserUpdated={loadUsers} />
            ) : loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading users...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Users</h2>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={loadUsers}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* FIXED FILTER HEADER */}
                <div className="sticky top-0 z-10 bg-white rounded-t-xl border-b border-gray-200 shadow-sm flex-shrink-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-6 pt-2 pb-2">
                    {/* Mobile: All filters in one row */}
                    <div className="flex items-center justify-end gap-2 w-full py-0 flex-wrap sm:hidden ml-auto">
                      {/* Add New User Button - Mobile */}
                      <button
                        className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 active:shadow-md transition-all shadow-sm"
                        title="Add New User"
                        onClick={handleAddUser}
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
                      <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>Users</h2>
                    </div>

                    {/* Desktop: Right Side - All Filters and New Button */}
                    <div className="hidden sm:flex items-center justify-end gap-2 sm:gap-3 py-0 flex-wrap">
                      {/* Status Filter */}
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

                      {/* Add New User Button */}
                      <button
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 active:shadow-md transition-all shadow-sm"
                        title="Add New User"
                        onClick={handleAddUser}
                      >
                        <FiUserPlus size={16} />
                        <span className="hidden sm:inline">Add User</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* SCROLLABLE CONTENT AREA */}
                <div className="flex-1 overflow-auto">
                  {/* MOBILE CARD VIEW */}
                  <div className="block sm:hidden mt-4" style={{ fontFamily: 'var(--font-family)' }}>
                    {filteredUsers.length === 0 ? (
                      <div className="text-center py-12 px-4">
                        <FiUserPlus className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>No users found</h3>
                        <p className="mt-1 text-sm text-gray-500" style={{ fontFamily: 'var(--font-family)' }}>No users match the current filter.</p>
                      </div>
                    ) : (
                      <div className="space-y-2 px-2">
                        {filteredUsers.map((rowUser) => (
                          <div
                            key={`mobile-user-${rowUser.id}`}
                            className="bg-white rounded-lg border border-gray-200 p-3 pb-1 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            style={{ fontFamily: 'var(--font-family)' }}
                            onClick={() => setSelectedUser(rowUser)}
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
                                  {`${rowUser.first_name}`}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                  {rowUser.employee_id && `ID: ${rowUser.employee_id}`}
                                </p>
                              </div>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(rowUser.status)}`} style={{ fontFamily: 'var(--font-family)' }}>
                                {rowUser.status}
                              </span>
                            </div>

                            {/* Row 2: Email */}
                            <div className="flex justify-between items-center mb-2 text-xs text-gray-600" style={{ fontFamily: 'var(--font-family)' }}>
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                                  <FiMail size={10} className="text-purple-600" />
                                </div>
                                <span className="font-medium truncate" style={{ fontFamily: 'var(--font-family)' }}>{rowUser.email}</span>
                              </div>
                            </div>

                            {/* Row 3: Role (left) and Action Buttons (right) */}
                            <div className="flex justify-between items-center text-xs text-gray-600" style={{ fontFamily: 'var(--font-family)' }}>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                                  <FiUser size={10} className="text-green-600" />
                                </div>
                                <span style={{ fontFamily: 'var(--font-family)' }}>Role: {rowUser.role}</span>
                              </div>
                              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                <TableActionButton
                                  icon={FaPencilAlt}
                                  type="edit"
                                  title="View Details"
                                  onClick={() => setSelectedUser(rowUser)}
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
                    data={filteredUsers}
                    columns={userColumns}
                    loading={false}
                    emptyMessage="No users found"
                    emptyDescription="No users match the current filter."
                    onEdit={null}
                    onDelete={null}
                    renderCell={renderUserCell}
                    loadingMessage="Loading users..."
                    keyField="id"
                    user={currentUser}
                  />
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* User Creation Form */}
      <UserCreationForm
        isOpen={isUserFormOpen}
        onClose={() => setIsUserFormOpen(false)}
        onSubmit={handleUserSubmit}
      />
    </div>
  );
}
