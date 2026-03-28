import React, { useState, useEffect, useRef } from "react";
import { FiX, FiUser } from "react-icons/fi";
import { useNotification } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";

// SelectField component
const SelectField = ({ label, required, options = [], value, onChange, placeholder, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative" style={{ marginBottom: 'var(--form-margin-bottom)' }}>
      <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--label-font-size)', fontWeight: 'var(--label-font-weight)' }}>
        {label}{required && <span style={{ color: '#ef4444', fontFamily: 'var(--font-family)' }} className="ml-1">*</span>}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
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
          border: `1px solid ${error ? '#ef4444' : 'var(--input-border-color)'}`,
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
          {value || placeholder}
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
      {isOpen && (
        <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto mt-1 w-full">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              style={{
                padding: '8px 12px',
                fontSize: 'var(--placeholder-font-size)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'normal',
                color: 'var(--input-text-color)',
                cursor: 'pointer',
                backgroundColor: option === value ? '#f3f4f6' : '#ffffff',
                borderBottom: index < options.length - 1 ? '1px solid #f1f5f9' : 'none',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
              onMouseLeave={(e) => e.target.style.backgroundColor = option === value ? '#f3f4f6' : '#ffffff'}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      {error && (
        <p style={{ color: '#ef4444', fontFamily: 'var(--font-family)', fontSize: '11px', fontWeight: '500', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span className="w-1 h-1 rounded-full bg-[#ef4444]"></span>
          {error}
        </p>
      )}
    </div>
  );
};

// InputField component
const InputField = ({ label, required, type = "text", value, onChange, placeholder, error, disabled, ...rest }) => (
  <div className="relative" style={{ marginBottom: 'var(--form-margin-bottom)' }}>
    <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--label-font-size)', fontWeight: 'var(--label-font-weight)' }}>
      {label}{required && <span style={{ color: '#ef4444', fontFamily: 'var(--font-family)' }} className="ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
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
        border: `1px solid ${error ? '#ef4444' : 'var(--input-border-color)'}`,
        borderRadius: 'var(--input-border-radius)',
        backgroundColor: disabled ? '#f3f4f6' : 'var(--input-bg-color)',
        color: 'var(--input-text-color)',
        outline: 'none',
        transition: 'border-color 0.2s',
        cursor: disabled ? 'not-allowed' : 'text',
      }}
      onFocus={(e) => !disabled && (e.target.style.borderColor = error ? '#ef4444' : 'var(--input-focus-border-color)')}
      onBlur={(e) => e.target.style.borderColor = error ? '#ef4444' : 'var(--input-border-color)'}
      {...rest}
    />
    {error && (
      <p style={{ color: '#ef4444', fontFamily: 'var(--font-family)', fontSize: '11px', fontWeight: '500', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span className="w-1 h-1 rounded-full bg-[#ef4444]"></span>
        {error}
      </p>
    )}
  </div>
);

export default function UserFormPopupBasic({ isOpen, onClose, onSubmit, title = "CREATE USER" }) {
  const { user: currentUser } = useAuth();
  const { showToast } = useNotification();

  // Basic Info
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Active");
  const [formErrors, setFormErrors] = useState({});

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const resetForm = () => {
    // Basic Info
    setEmployeeName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setRole(""); // No default role
    setStatus("Active");
  };

  const handleSave = async () => {
    // Basic validations
    const errors = {};
    if (!employeeName.trim()) errors.employeeName = 'Employee name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Invalid email format';

    if (!username.trim()) errors.username = 'Username is required';
    if (!password.trim()) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

    if (!status) errors.status = 'Please select status';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('Please fix the errors in the form', 'warning');
      return;
    }

    try {
      const userData = {
        first_name: employeeName,
        email,
        username,
        password,
        phone: "", // Empty phone for basic form
        role,
        status,
      };

      if (typeof onSubmit === "function") {
        await onSubmit(userData);
        showToast('User created successfully!', 'success');
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error('Error saving user:', error);
      const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || 'Error saving user. Please try again.';
      showToast(errorMsg, 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1100] p-4 sm:p-6 overflow-auto">
      <div className="w-full max-w-6xl bg-white rounded-xl flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 sticky top-0 bg-white z-10 border-b-2 rounded-t-xl" style={{ borderBottomColor: 'var(--primary-color)' }}>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-base sm:text-lg font-bold" style={{ color: 'var(--primary-color)', fontFamily: 'var(--font-family)' }}>
              {title}
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

        {/* Content */}
        <div className="p-4 sm:p-6 pb-8 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="EMPLOYEE NAME"
              required={true}
              options={["John Doe", "Jane Smith", "Bob Johnson", "Alice Brown", "Charlie Wilson", "Diana Davis"]}
              value={employeeName}
              onChange={(val) => {
                setEmployeeName(val);
                if (formErrors.employeeName) setFormErrors({ ...formErrors, employeeName: null });
              }}
              placeholder="Select employee name"
              error={formErrors.employeeName}
            />
            <InputField
              label="EMAIL"
              required={true}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (formErrors.email) setFormErrors({ ...formErrors, email: null });
              }}
              placeholder="Enter email address"
              error={formErrors.email}
            />
            <InputField
              label="USERNAME"
              required={true}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (formErrors.username) setFormErrors({ ...formErrors, username: null });
              }}
              placeholder="Enter username"
              error={formErrors.username}
            />
            <InputField
              label="PASSWORD"
              required={true}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (formErrors.password) setFormErrors({ ...formErrors, password: null });
              }}
              placeholder="Enter password (min 6 characters)"
              error={formErrors.password}
            />
            <SelectField
              label="STATUS"
              required={true}
              options={["Active", "Inactive"]}
              value={status}
              onChange={(val) => {
                setStatus(val);
                if (formErrors.status) setFormErrors({ ...formErrors, status: null });
              }}
              placeholder="Select status"
              error={formErrors.status}
            />
            <SelectField
              label="ROLE"
              required={true}
              options={["Admin", "HR", "Manager"]}
              value={role}
              onChange={setRole}
              placeholder="Select role"
            />
          </div>

          {/* Error Message */}
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
                    Error
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
    </div >
  );
}