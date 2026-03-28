import React, { useState, useEffect } from "react";
import { FiFileText, FiUser, FiMail, FiPhone, FiLock, FiShield, FiActivity, FiCalendar, FiMapPin, FiBriefcase, FiCreditCard, FiHeart, FiHome, FiUsers, FiEdit, FiTrash2, FiChevronDown } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import UserFormPopup from "./UserFormPopup";
import userApi from "../services/userApi";
import employeeApi from "../services/employeeApi";

// Add wave animation for back button
const waveStyles = `
  @keyframes wave {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-3px); }
    50% { transform: translateX(3px); }
    75% { transform: translateX(-3px); }
  }
`;

// Inject wave animation styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = waveStyles;
    document.head.appendChild(styleSheet);
}

// DisplayField component for consistent styling
const DisplayField = ({ label, value, icon: Icon, fullWidth = false }) => {
    return (
        <div className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg ${fullWidth ? 'md:col-span-2' : ''}`}>
            {Icon && <Icon size={16} className="text-gray-500" />}
            <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1" style={{ fontFamily: 'var(--font-family)' }}>
                    {label}
                </label>
                <p className="text-sm text-gray-900 font-medium" style={{ fontFamily: 'var(--font-family)' }}>{value || 'N/A'}</p>
            </div>
        </div>
    );
};

const UserInfo = ({ selectedUser, onClose, onUserUpdated }) => {
    if (!selectedUser) return null;

    const { user: currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState("basic");
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [employees, setEmployees] = useState([]);
    const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
    const [loadingEmployees, setLoadingEmployees] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editingUserData, setEditingUserData] = useState({
        first_name: selectedUser.first_name,
        email: selectedUser.email,
        username: selectedUser.username,
        password: '',
        role: selectedUser.role,
        status: selectedUser.status
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    // Load employees on component mount
    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            setLoadingEmployees(true);
            const response = await fetch('/api/employees/names', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setEmployees(data);
            }
        } catch (error) {
            console.error('Error loading employees:', error);
        } finally {
            setLoadingEmployees(false);
        }
    };

    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee);
        setEditingUserData({
            first_name: employee.first_name,
            email: employee.email,
            username: employee.email.split('@')[0],
            password: '',
            role: editingUserData.role,
            status: editingUserData.status
        });
        setShowEmployeeDropdown(false);
    };

    const handleSaveUserFromEmployee = async () => {
        if (!selectedEmployee) {
            setSaveMessage("Please select an employee first");
            return;
        }

        setIsSaving(true);
        setSaveMessage("");

        try {
            const updateData = {
                first_name: editingUserData.first_name,
                email: editingUserData.email,
                username: editingUserData.username,
                role: editingUserData.role,
                status: editingUserData.status,
                employee_id: selectedEmployee.id
            };

            if (editingUserData.password) {
                updateData.password = editingUserData.password;
            }

            await userApi.updateUser(selectedUser.id, updateData);
            setSaveMessage("User updated successfully!");
            setTimeout(() => {
                setSaveMessage("");
                if (onUserUpdated) {
                    onUserUpdated();
                }
            }, 2000);
        } catch (error) {
            console.error('Error saving user:', error);
            setSaveMessage(error.message || "Failed to save user");
        } finally {
            setIsSaving(false);
        }
    };

    const getInitials = (firstName, lastName) => {
        const first = firstName ? firstName.charAt(0).toUpperCase() : '';
        const last = lastName ? lastName.charAt(0).toUpperCase() : '';
        return first + last || 'U';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getRoleColor = (role) => {
        switch (role) {
            case "Admin": return "bg-purple-100 text-purple-700 border-purple-200";
            case "HR": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Site Head": return "bg-orange-100 text-orange-700 border-orange-200";
            case "Field": return "bg-green-100 text-green-700 border-green-200";
            case "Office Staff": return "bg-indigo-100 text-indigo-700 border-indigo-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Active": return "bg-light-green-bg text-green-text border-green-200";
            case "Inactive": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-light-gray-bg text-gray-700 border-gray-200";
        }
    };

    const handleDeleteUser = async () => {
        if (!window.confirm(`Are you sure you want to delete ${selectedUser.first_name}? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        setDeleteError("");

        try {
            await userApi.deleteUser(selectedUser.id);
            // Refresh the user list
            if (onUserUpdated) {
                onUserUpdated();
            }
            onClose();
        } catch (error) {
            console.error('Error deleting user:', error);
            const errorMsg = error.response?.data?.error || error.message || 'Failed to delete user';
            setDeleteError(errorMsg);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEditSubmit = async (userData) => {
        try {
            await userApi.updateUser(selectedUser.id, userData);
            // Refresh the user list
            if (onUserUpdated) {
                onUserUpdated();
            }
            setIsEditFormOpen(false);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    const tabs = [
        { id: "basic", label: "Basic Info", icon: FiUser },
        { id: "personal", label: "Personal", icon: FiHeart },
        { id: "address", label: "Address", icon: FiMapPin },
        { id: "employment", label: "Employment", icon: FiBriefcase },
        ...(currentUser?.role?.toLowerCase() === 'admin' ? [{ id: "bank", label: "Bank & Salary", icon: FiCreditCard }] : []),
    ];

    return (
        <>
            <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col relative">
            {/* Tab Navigation - Top */}
            <div className="border-b-[2px] border-primary bg-white">
                <nav className="flex justify-between items-center">
                    <div className="flex overflow-x-auto">
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center px-2 sm:px-3 py-1 text-sm font-medium text-white hover:text-gray-100 bg-gray-400 hover:bg-gray-450 transition-all duration-300 flex-shrink-0"
                            title="Go back"
                        >
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                style={{
                                    animation: 'wave 2.5s ease-in-out infinite'
                                }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
                                        ? "text-white bg-primary"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                    style={{ fontFamily: 'var(--font-family)' }}
                                >
                                    <Icon size={14} className="sm:w-4 sm:h-4" />
                                    <span className="text-xs sm:text-sm hidden sm:inline">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </nav>
            </div>

                {/* Header with Profile Picture */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-light-gray-bg gap-2 sm:gap-0">
                    <div className="flex items-center gap-4">
                        {/* Profile Picture */}
                        <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-blue-500" style={{
                            backgroundColor: selectedUser.profile_image ? 'transparent' : '#3b82f6'
                        }}>
                            {selectedUser.profile_image ? (
                                <img
                                    src={selectedUser.profile_image}
                                    alt={`${selectedUser.first_name}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.style.backgroundColor = '#3b82f6';
                                        e.target.parentElement.innerHTML = `<div class="text-white text-lg font-bold">${getInitials(selectedUser.first_name, '')}</div>`;
                                    }}
                                />
                            ) : (
                                <div className="text-white text-lg font-bold">
                                    {getInitials(selectedUser.first_name, '')}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate" style={{ fontFamily: 'var(--font-family)' }}>
                                {selectedUser.first_name}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'var(--font-family)' }}>{selectedUser.designation || selectedUser.role}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedUser.status)}`} style={{ fontFamily: 'var(--font-family)' }}>
                            {selectedUser.status}
                        </span>
                        {currentUser?.role?.toLowerCase() === 'admin' && (
                            <>
                                <button
                                    onClick={() => setIsEditFormOpen(true)}
                                    className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                    title="Edit user"
                                >
                                    <FiEdit size={14} />
                                    <span className="hidden sm:inline">Edit</span>
                                </button>
                                <button
                                    onClick={handleDeleteUser}
                                    disabled={isDeleting}
                                    className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400 rounded-lg transition-colors"
                                    title="Delete user"
                                >
                                    <FiTrash2 size={14} />
                                    <span className="hidden sm:inline">{isDeleting ? 'Deleting...' : 'Delete'}</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Delete Error Message */}
                {deleteError && (
                    <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700" style={{ fontFamily: 'var(--font-family)' }}>{deleteError}</p>
                    </div>
                )}

            {/* Tab Content */}
            <div className="flex-1 overflow-auto">
                {/* Basic Info Tab */}
                {activeTab === "basic" && (
                    <div className="p-4 sm:p-5 md:p-6">
                        <div className="max-w-5xl mx-auto">
                            {/* Employee Selection Section */}
                            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'var(--font-family)' }}>
                                    Select Employee to Update User Details
                                </h3>
                                <div className="relative mb-4">
                                    <button
                                        onClick={() => setShowEmployeeDropdown(!showEmployeeDropdown)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50"
                                        disabled={loadingEmployees}
                                    >
                                        <span style={{ fontFamily: 'var(--font-family)' }}>
                                            {selectedEmployee ? selectedEmployee.first_name : 'Select Employee...'}
                                        </span>
                                        <FiChevronDown size={18} />
                                    </button>
                                    {showEmployeeDropdown && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                                            {loadingEmployees ? (
                                                <div className="p-3 text-center text-gray-500">Loading employees...</div>
                                            ) : employees.length === 0 ? (
                                                <div className="p-3 text-center text-gray-500">No employees found</div>
                                            ) : (
                                                employees.map((emp) => (
                                                    <button
                                                        key={emp.id}
                                                        onClick={() => handleEmployeeSelect(emp)}
                                                        className="w-full px-3 py-2 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                                                        style={{ fontFamily: 'var(--font-family)' }}
                                                    >
                                                        <div className="font-medium text-gray-900">{emp.first_name}</div>
                                                        <div className="text-xs text-gray-500">{emp.email}</div>
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>

                                {selectedEmployee && (
                                    <div className="space-y-3 mb-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: 'var(--font-family)' }}>
                                                Employee Name
                                            </label>
                                            <input
                                                type="text"
                                                value={editingUserData.first_name}
                                                onChange={(e) => setEditingUserData({ ...editingUserData, first_name: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                style={{ fontFamily: 'var(--font-family)' }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: 'var(--font-family)' }}>
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={editingUserData.email}
                                                onChange={(e) => setEditingUserData({ ...editingUserData, email: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                style={{ fontFamily: 'var(--font-family)' }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: 'var(--font-family)' }}>
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                value={editingUserData.username}
                                                onChange={(e) => setEditingUserData({ ...editingUserData, username: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                style={{ fontFamily: 'var(--font-family)' }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: 'var(--font-family)' }}>
                                                Password (leave empty to keep current)
                                            </label>
                                            <input
                                                type="password"
                                                value={editingUserData.password}
                                                onChange={(e) => setEditingUserData({ ...editingUserData, password: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                style={{ fontFamily: 'var(--font-family)' }}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: 'var(--font-family)' }}>
                                                    Role
                                                </label>
                                                <select
                                                    value={editingUserData.role}
                                                    onChange={(e) => setEditingUserData({ ...editingUserData, role: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    style={{ fontFamily: 'var(--font-family)' }}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="manager">Manager</option>
                                                    <option value="hr">HR</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: 'var(--font-family)' }}>
                                                    Status
                                                </label>
                                                <select
                                                    value={editingUserData.status}
                                                    onChange={(e) => setEditingUserData({ ...editingUserData, status: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    style={{ fontFamily: 'var(--font-family)' }}
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </div>

                                        {saveMessage && (
                                            <div className={`p-3 rounded-lg text-sm ${saveMessage.includes('successfully') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}
                                                style={{ fontFamily: 'var(--font-family)' }}>
                                                {saveMessage}
                                            </div>
                                        )}

                                        <button
                                            onClick={handleSaveUserFromEmployee}
                                            disabled={isSaving}
                                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                                            style={{ fontFamily: 'var(--font-family)' }}
                                        >
                                            {isSaving ? 'Saving...' : 'Save User Details'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Current User Details */}
                            <h3 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'var(--font-family)' }}>
                                Current User Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <DisplayField label="First Name" value={selectedUser.first_name} icon={FiUser} />
                                <DisplayField label="Username" value={selectedUser.username} icon={FiUser} />
                                <DisplayField label="Email" value={selectedUser.email} icon={FiMail} />
                                {currentUser?.role?.toLowerCase() === 'admin' && (
                                    <DisplayField
                                        label="Password"
                                        value={selectedUser.is_temp_password === 1 ? selectedUser.password : "••••••••"}
                                        icon={FiLock}
                                    />
                                )}
                                <DisplayField
                                    label="Role"
                                    value={
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(selectedUser.role)}`} style={{ fontFamily: 'var(--font-family)' }}>
                                            {selectedUser.role}
                                        </span>
                                    }
                                    icon={FiShield}
                                />
                                <DisplayField
                                    label="Status"
                                    value={
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedUser.status)}`} style={{ fontFamily: 'var(--font-family)' }}>
                                            {selectedUser.status}
                                        </span>
                                    }
                                    icon={FiActivity}
                                />
                                <DisplayField label="Registration Date" value={formatDate(selectedUser.created_at)} icon={FiCalendar} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Personal Tab */}
                {activeTab === "personal" && (
                    <div className="p-4 sm:p-5 md:p-6">
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <DisplayField label="Date of Birth" value={formatDate(selectedUser.date_of_birth)} icon={FiCalendar} />
                                <DisplayField label="Gender" value={selectedUser.gender} icon={FiUser} />
                                <DisplayField label="Blood Group" value={selectedUser.blood_group} icon={FiHeart} />
                                <DisplayField label="Marital Status" value={selectedUser.marital_status} icon={FiUsers} />
                                <DisplayField label="Nationality" value={selectedUser.nationality} icon={FiMapPin} />
                                <DisplayField label="Aadhar Number" value={selectedUser.aadhar_number} icon={FiCreditCard} />
                                <DisplayField label="PAN Number" value={selectedUser.pan_number} icon={FiCreditCard} />
                            </div>

                            {/* Emergency Contact */}
                            <h3 className="text-sm font-semibold text-gray-700 mt-6 mb-3" style={{ fontFamily: 'var(--font-family)' }}>Emergency Contact</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <DisplayField label="Contact Name" value={selectedUser.emergency_contact_name} icon={FiUser} />
                                <DisplayField label="Contact Phone" value={selectedUser.emergency_contact_phone} icon={FiPhone} />
                                <DisplayField label="Relation" value={selectedUser.emergency_contact_relation} icon={FiUsers} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Address Tab */}
                {activeTab === "address" && (
                    <div className="p-4 sm:p-5 md:p-6">
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <DisplayField label="Current Address" value={selectedUser.current_address} icon={FiHome} fullWidth />
                                <DisplayField label="Permanent Address" value={selectedUser.permanent_address} icon={FiMapPin} fullWidth />
                                <DisplayField label="City" value={selectedUser.city} icon={FiMapPin} />
                                <DisplayField label="State" value={selectedUser.state} icon={FiMapPin} />
                                <DisplayField label="Pincode" value={selectedUser.pincode} icon={FiMapPin} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Employment Tab */}
                {activeTab === "employment" && (
                    <div className="p-4 sm:p-5 md:p-6">
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <DisplayField label="Employee ID" value={selectedUser.employee_id} icon={FiUser} />
                                <DisplayField label="Department" value={selectedUser.department} icon={FiBriefcase} />
                                <DisplayField label="Designation" value={selectedUser.designation} icon={FiBriefcase} />
                                <DisplayField label="Date of Joining" value={formatDate(selectedUser.date_of_joining)} icon={FiCalendar} />
                                <DisplayField label="Employment Type" value={selectedUser.employment_type} icon={FiBriefcase} />
                                <DisplayField label="Work Location" value={selectedUser.work_location} icon={FiMapPin} />
                                {selectedUser.left_date && (
                                    <DisplayField label="Left Date" value={formatDate(selectedUser.left_date)} icon={FiCalendar} />
                                )}
                            </div>

                            {/* Company Assets */}
                            <h3 className="text-sm font-semibold text-gray-700 mt-6 mb-3" style={{ fontFamily: 'var(--font-family)' }}>Company Assets</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                    <span className={`w-3 h-3 rounded-full ${selectedUser.company_laptop ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-family)' }}>Laptop</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                    <span className={`w-3 h-3 rounded-full ${selectedUser.company_charger ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-family)' }}>Charger</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                    <span className={`w-3 h-3 rounded-full ${selectedUser.company_mouse ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-family)' }}>Mouse</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                    <span className={`w-3 h-3 rounded-full ${selectedUser.company_keyboard ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-family)' }}>Keyboard</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                    <span className={`w-3 h-3 rounded-full ${selectedUser.company_headset ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-family)' }}>Headset</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                    <span className={`w-3 h-3 rounded-full ${selectedUser.company_monitor ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-family)' }}>Monitor</span>
                                </div>
                            </div>
                            {selectedUser.company_other_accessories && (
                                <div className="mt-3">
                                    <DisplayField label="Other Assets" value={selectedUser.company_other_accessories} icon={FiBriefcase} fullWidth />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Bank & Salary Tab */}
                {activeTab === "bank" && currentUser?.role?.toLowerCase() === 'admin' && (
                    <div className="p-4 sm:p-5 md:p-6">
                        <div className="max-w-5xl mx-auto">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'var(--font-family)' }}>Bank Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <DisplayField label="Bank Name" value={selectedUser.bank_name} icon={FiCreditCard} />
                                <DisplayField label="Account Number" value={selectedUser.bank_account_number} icon={FiCreditCard} />
                                <DisplayField label="IFSC Code" value={selectedUser.bank_ifsc_code} icon={FiCreditCard} />
                                <DisplayField label="Branch" value={selectedUser.bank_branch} icon={FiMapPin} />
                                <DisplayField label="Account Holder Name" value={selectedUser.bank_account_holder_name} icon={FiUser} />
                            </div>

                            <h3 className="text-sm font-semibold text-gray-700 mt-6 mb-3" style={{ fontFamily: 'var(--font-family)' }}>Salary Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <DisplayField label="Basic Salary" value={selectedUser.basic_salary ? `₹${selectedUser.basic_salary}` : 'N/A'} icon={FiCreditCard} />
                                <DisplayField label="HRA" value={selectedUser.hra ? `₹${selectedUser.hra}` : 'N/A'} icon={FiCreditCard} />
                                <DisplayField label="Other Allowances" value={selectedUser.other_allowances ? `₹${selectedUser.other_allowances}` : 'N/A'} icon={FiCreditCard} />
                            </div>

                            <h3 className="text-sm font-semibold text-gray-700 mt-6 mb-3" style={{ fontFamily: 'var(--font-family)' }}>Statutory Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <DisplayField label="PF Number" value={selectedUser.pf_number} icon={FiFileText} />
                                <DisplayField label="ESI Number" value={selectedUser.esi_number} icon={FiFileText} />
                                <DisplayField label="UAN Number" value={selectedUser.uan_number} icon={FiFileText} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </div>

            {/* Edit User Form */}
            <UserFormPopup
                isOpen={isEditFormOpen}
                onClose={() => setIsEditFormOpen(false)}
                onSubmit={handleEditSubmit}
                editUser={selectedUser}
            />
        </>
    );
};

export default UserInfo;
