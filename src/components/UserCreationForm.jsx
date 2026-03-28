import React, { useState, useRef, useEffect, useCallback } from "react";
import { FiX } from "react-icons/fi";
import roleService from "../services/roleService";

const InputField = ({ label, required, type = "text", value, onChange, placeholder, error, ...rest }) => (
  <div className="relative" style={{ marginBottom: 'var(--form-margin-bottom)' }}>
    <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--label-font-size)', fontWeight: 'var(--label-font-weight)' }}>
      {label}{required && <span style={{ color: 'var(--secondary-color)', fontFamily: 'var(--font-family)' }} className="ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        height: 'var(--input-height)',
        padding: 'var(--input-padding)',
        paddingTop: '16px',
        paddingLeft: '12px',
        fontSize: 'var(--placeholder-font-size)',
        fontFamily: 'var(--font-family)',
        fontWeight: 'normal',
        lineHeight: '24px',
        border: `1px solid ${error ? 'var(--secondary-color)' : 'var(--input-border-color)'}`,
        borderRadius: 'var(--input-border-radius)',
        backgroundColor: 'var(--input-bg-color)',
        color: 'var(--input-text-color)',
        outline: 'none',
        transition: 'border-color 0.2s',
      }}
      onFocus={(e) => e.target.style.borderColor = error ? 'var(--secondary-color)' : 'var(--input-focus-border-color)'}
      onBlur={(e) => e.target.style.borderColor = error ? 'var(--secondary-color)' : 'var(--input-border-color)'}
      {...rest}
    />
    {error && (
      <p style={{ color: 'var(--secondary-color)', fontFamily: 'var(--font-family)', fontSize: 'var(--error-font-size)', marginTop: '4px' }}>
        {error}
      </p>
    )}
  </div>
);

const SelectField = ({ label, required, options = [], value, onChange, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  const getDisplayValue = (val) => {
    if (typeof val === 'object' && val?.first_name) {
      return val.first_name;
    }
    return val || '';
  };

  const getOptionDisplay = (option) => {
    if (typeof option === 'object' && option?.first_name) {
      return option.first_name;
    }
    return option;
  };

  const handleSelect = (option) => {
    console.log('handleSelect called with:', option);
    if (onSelect) {
      onSelect(option);
    } else {
      onChange(getOptionDisplay(option));
    }
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative" style={{ marginBottom: 'var(--form-margin-bottom)' }}>
      <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--label-font-size)', fontWeight: 'var(--label-font-weight)' }}>
        {label}{required && <span style={{ color: 'var(--secondary-color)', fontFamily: 'var(--font-family)' }} className="ml-1">*</span>}
      </label>
      <div
        onClick={() => {
          console.log('Dropdown clicked, isOpen:', isOpen);
          setIsOpen(!isOpen);
        }}
        style={{
          width: '100%',
          height: 'var(--input-height)',
          padding: 'var(--input-padding)',
          paddingTop: '16px',
          paddingLeft: '12px',
          fontSize: 'var(--placeholder-font-size)',
          fontFamily: 'var(--font-family)',
          fontWeight: 'normal',
          lineHeight: '24px',
          border: '1px solid var(--input-border-color)',
          borderRadius: 'var(--input-border-radius)',
          backgroundColor: 'var(--input-bg-color)',
          color: 'var(--input-text-color)',
          outline: 'none',
          cursor: 'pointer',
          display: 'flex',  
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'border-color 0.2s',
        }}
      >
        <span style={{
          color: value ? 'var(--input-text-color)' : 'var(--input-placeholder-color)',
          fontSize: 'var(--placeholder-font-size)',
          fontFamily: 'var(--font-family)',
          lineHeight: '24px',
        }}>
          {getDisplayValue(value) || placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </div>
      {isOpen && options && options.length > 0 && (
        <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto mt-1 w-full">
          {options.map((option, index) => (
            <div
              key={`option-${index}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Option clicked:', option);
                handleSelect(option);
              }}
              style={{
                padding: '10px 12px',
                fontSize: 'var(--placeholder-font-size)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'normal',
                color: 'var(--input-text-color)',
                cursor: 'pointer',
                backgroundColor: getOptionDisplay(option) === getDisplayValue(value) ? '#e3f2fd' : '#ffffff',
                borderBottom: index < options.length - 1 ? '1px solid #f1f5f9' : 'none',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = getOptionDisplay(option) === getDisplayValue(value) ? '#e3f2fd' : '#ffffff';
              }}
            >
              {getOptionDisplay(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function UserCreationForm({ isOpen, onClose, onSubmit }) {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Active");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(true);

  const resetForm = useCallback(() => {
    setEmployeeName("");
    setEmployeeId(null);
    setEmail("");
    setUsername("");
    setPassword("");
    setStatus("Active");
    setRole("");
    setIsEditMode(false);
    setPasswordRequired(true);
  }, []);

  const fetchEmployeeNames = useCallback(async () => {
    try {
      setLoadingEmployees(true);
      console.log('Fetching employee names...');
      // Fetch from employees endpoint
      const token = localStorage.getItem('token');
      const response = await fetch('/api/employees/names', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to fetch employee names:', response.status, errorData);
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.details || errorData.error || 'Unknown error'}`);
      }
      
      const employees = await response.json();
      console.log('Employee names response:', employees);
      const employeeList = Array.isArray(employees) ? employees : (employees.data || []);
      console.log('Employees to set:', employeeList);
      setEmployeeOptions(employeeList);
    } catch (error) {
      console.error('Error fetching employee names:', error);
      setErrorMessage(`Failed to load employee names: ${error.message}`);
      setShowErrorMessage(true);
      setEmployeeOptions([]);
    } finally {
      setLoadingEmployees(false);
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    try {
      setLoadingRoles(true);
      const response = await roleService.getRoles();
      setRoles(response.data || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoadingRoles(false);
    }
  }, []);

  // Fetch employee names and roles when form opens
  useEffect(() => {
    if (isOpen) {
      fetchEmployeeNames();
      fetchRoles();
      // Reset form when opening
      resetForm();
    }
  }, [isOpen, fetchEmployeeNames, fetchRoles, resetForm]);

  const handleEmployeeSelect = (employee) => {
    console.log('Employee selected:', employee);
    if (employee && employee.id) {
      console.log('Setting employee name:', employee.first_name);
      setEmployeeName(employee.first_name);
      setEmployeeId(employee.id);
      
      // Auto-fill email from employee data
      setEmail(employee.email || "");
      
      // Auto-generate username from email (email prefix)
      const generatedUsername = employee.email ? employee.email.split('@')[0] : "";
      setUsername(generatedUsername);
      
      // Auto-generate password (Employee@DDMM format)
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const generatedPassword = `Employee@${day}${month}`;
      setPassword(generatedPassword);
      
      // Set default role and status
      setRole("Office Staff");
      setStatus("Active");
      setIsEditMode(false);
      setPasswordRequired(true);
    }
  };

  const handleSave = async () => {
    if (!employeeName.trim()) {
      setErrorMessage('Employee name is required');
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Email is required');
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      return;
    }
    if (!isEditMode) {
      // Create mode - require username and password
      if (!username.trim()) {
        setErrorMessage('Username is required');
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 3000);
        return;
      }
      if (!password.trim()) {
        setErrorMessage('Password is required');
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 3000);
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters');
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 3000);
        return;
      }
    } else {
      // Edit mode - username required, password optional
      if (!username.trim()) {
        setErrorMessage('Username is required');
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 3000);
        return;
      }
      if (password.trim() && password.length < 6) {
        setErrorMessage('Password must be at least 6 characters');
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 3000);
        return;
      }
    }
    if (!role) {
      setErrorMessage('Please select a role');
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      return;
    }

    try {
      const userData = {
        first_name: employeeName,
        email,
        role,
        status
      };

      if (isEditMode && employeeId) {
        // Update existing employee - only include password if provided
        if (password.trim()) {
          userData.password = password;
        }
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/users/${employeeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update employee');
        }
        
        setSuccessMessage('Employee updated successfully!');
      } else {
        // Create new employee
        userData.username = username;
        userData.password = password;
        if (typeof onSubmit === "function") {
          await onSubmit(userData);
        }
        setSuccessMessage('Employee created successfully!');
      }

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        resetForm();
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error saving employee:', error);
      let errorMsg = 'Error saving employee. Please try again.';
      
      if (error.response?.data?.details && Array.isArray(error.response.data.details)) {
        const firstError = error.response.data.details[0];
        errorMsg = firstError.msg || error.message || errorMsg;
      } else if (error.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      setErrorMessage(errorMsg);
      setShowErrorMessage(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1100] p-4 sm:p-6 overflow-auto">
      <div className="w-full max-w-4xl bg-white rounded-xl flex flex-col max-h-[95vh]">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 z-[1200] bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-family)' }}>
              {successMessage}
            </p>
          </div>
        )}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 sticky top-0 bg-white z-10 border-b-2 rounded-t-xl" style={{ borderBottomColor: 'var(--primary-color)' }}>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-base sm:text-lg font-bold" style={{ color: 'var(--primary-color)', fontFamily: 'var(--font-family)' }}>
              {isEditMode ? 'UPDATE EMPLOYEE' : 'CREATE USER'}
            </h2>
          </div>
          <button
            onClick={handleSave}
            className="text-white px-3 sm:px-4 py-2 rounded-xl shadow-md hover:opacity-90 text-sm sm:text-base"
            style={{ backgroundColor: 'var(--primary-color)', fontFamily: 'var(--font-family)' }}
          >
            Save
          </button>
        </div>
        <div className="p-4 sm:p-6 pb-8 flex-1 overflow-y-auto rounded-b-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 pb-6" style={{ gap: 'var(--form-gap)' }}>
            <div>
              {/* Debug info */}
              {employeeOptions.length === 0 && !loadingEmployees && (
                <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
                  {showErrorMessage ? 'Error loading employees - you can still enter manually' : 'No employees available'}
                </div>
              )}
              <SelectField
                label="EMPLOYEE NAME"
                required
                options={employeeOptions}
                value={employeeName}
                onChange={setEmployeeName}
                onSelect={handleEmployeeSelect}
                placeholder={loadingEmployees ? "Loading..." : "Select employee name or enter manually"}
              />
            </div>
            <div>
              <InputField
                label="EMAIL"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <InputField
                label="USERNAME"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div>
              <InputField
                label="PASSWORD"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isEditMode ? "Leave empty to keep current password" : "Enter password (min 6 characters)"}
                required={!isEditMode}
              />
            </div>
            <div>
              <SelectField
                label="ROLE"
                required
                options={roles.length > 0 ? roles.map(r => r.name) : ["Admin", "HR", "Site Manager", "Office Staff", "Field Rep"]}
                value={role}
                onChange={setRole}
                placeholder={loadingRoles ? "Loading roles..." : "Select role"}
              />
            </div>
            <div>
              <SelectField
                label="STATUS"
                required
                options={["Active", "Inactive"]}
                value={status}
                onChange={setStatus}
                placeholder="Select status"
              />
            </div>
          </div>

          {/* Error Message at Bottom */}
          {showErrorMessage && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-red-800 mb-1" style={{ fontFamily: 'var(--font-family)' }}>
                    Cannot Create User
                  </h4>
                  <div className="text-sm text-red-700 whitespace-pre-line" style={{ fontFamily: 'var(--font-family)' }}>
                    {errorMessage}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}