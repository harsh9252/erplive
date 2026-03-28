/**
 * Employee Form - MVC Pattern View Layer
 * React component that implements the View layer of MVC pattern
 */

import React, { useState, useEffect, useRef } from "react";
import { FiX, FiUser, FiMapPin, FiBriefcase, FiDollarSign, FiCreditCard, FiUpload, FiImage, FiPackage, FiCheckSquare, FiSquare, FiMail, FiPhone, FiCalendar, FiUserCheck } from "react-icons/fi";
import { useNotification } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";
import employeeApi from "../services/employeeApi.js";

// Form Field Components
const FormField = ({ label, required, type = "text", value, onChange, placeholder, error, disabled, icon, ...rest }) => (
  <div className="relative" style={{ marginBottom: 'var(--form-margin-bottom)' }}>
    <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 uppercase tracking-wider z-10" style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--label-font-size)', fontWeight: 'var(--label-font-weight)' }}>
      {label}{required && <span style={{ color: '#ef4444', fontFamily: 'var(--font-family)' }} className="ml-1">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
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
          paddingLeft: icon ? '40px' : '12px',
          paddingRight: '12px',
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
    </div>
    {error && (
      <p style={{ color: '#ef4444', fontFamily: 'var(--font-family)', fontSize: '11px', fontWeight: '500', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span className="w-1 h-1 rounded-full bg-[#ef4444]"></span>
        {error}
      </p>
    )}
  </div>
);

const TextAreaField = ({ label, required, value, onChange, placeholder, error, rows = 3, icon, ...rest }) => (
  <div className="relative" style={{ marginBottom: 'var(--form-margin-bottom)' }}>
    <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 uppercase tracking-wider z-10" style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--label-font-size)', fontWeight: 'var(--label-font-weight)' }}>
      {label}{required && <span style={{ color: '#ef4444', fontFamily: 'var(--font-family)' }} className="ml-1">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-3 text-gray-400">
          {icon}
        </div>
      )}
      <textarea
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: '100%',
          padding: '16px 12px 8px 12px',
          paddingLeft: icon ? '40px' : '12px',
          fontSize: 'var(--placeholder-font-size)',
          fontFamily: 'var(--font-family)',
          fontWeight: 'normal',
          lineHeight: '24px',
          border: `1px solid ${error ? '#ef4444' : 'var(--input-border-color)'}`,
          borderRadius: 'var(--input-border-radius)',
          backgroundColor: 'var(--input-bg-color)',
          color: 'var(--input-text-color)',
          outline: 'none',
          transition: 'border-color 0.2s',
          resize: 'vertical',
        }}
        onFocus={(e) => e.target.style.borderColor = error ? '#ef4444' : 'var(--input-focus-border-color)'}
        onBlur={(e) => e.target.style.borderColor = error ? '#ef4444' : 'var(--input-border-color)'}
        {...rest}
      />
    </div>
    {error && (
      <p style={{ color: '#ef4444', fontFamily: 'var(--font-family)', fontSize: '11px', fontWeight: '500', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span className="w-1 h-1 rounded-full bg-[#ef4444]"></span>
        {error}
      </p>
    )}
  </div>
);

const SelectField = ({ label, required, options = [], value, onChange, placeholder, error, icon, ...rest }) => {
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
      <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 uppercase tracking-wider z-10" style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--label-font-size)', fontWeight: 'var(--label-font-weight)' }}>
        {label}{required && <span style={{ color: '#ef4444', fontFamily: 'var(--font-family)' }} className="ml-1">*</span>}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          height: 'var(--input-height)',
          padding: 'var(--input-padding)',
          paddingTop: '16px',
          paddingLeft: icon ? '40px' : '12px',
          paddingRight: '12px',
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
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <span style={{
          color: value ? 'var(--input-text-color)' : 'var(--input-placeholder-color)',
          fontSize: 'var(--placeholder-font-size)',
          fontFamily: 'var(--font-family)',
          lineHeight: '24px',
          paddingLeft: icon ? '28px' : '0',
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

const CheckboxField = ({ label, checked, onChange, disabled }) => (
  <div className="flex items-center gap-3" style={{ marginBottom: 'var(--form-margin-bottom)' }}>
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      style={{
        width: '18px',
        height: '18px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: 'transparent',
        border: '2px solid var(--input-border-color)',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )}
    </button>
    <label
      onClick={() => !disabled && onChange(!checked)}
      style={{
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--placeholder-font-size)',
        color: disabled ? '#9ca3af' : 'var(--input-text-color)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {label}
    </label>
  </div>
);

const FileUploadField = ({ label, required, value, onChange, accept = "image/*", icon }) => {
  const [preview, setPreview] = useState(value || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const result = await onChange(file);
        setPreview(result);
      } catch (error) {
        console.error('File upload error:', error);
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative" style={{ marginBottom: 'var(--form-margin-bottom)' }}>
      <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 uppercase tracking-wider z-10" style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--label-font-size)', fontWeight: 'var(--label-font-weight)' }}>
        {label}{required && <span style={{ color: '#ef4444', fontFamily: 'var(--font-family)' }} className="ml-1">*</span>}
      </label>

      <div style={{
        width: '100%',
        minHeight: '120px',
        padding: '16px 12px 12px 12px',
        border: '1px solid var(--input-border-color)',
        borderRadius: 'var(--input-border-radius)',
        backgroundColor: 'var(--input-bg-color)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}>
        {preview ? (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <img
              src={preview}
              alt="Profile Preview"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--primary-color)',
                marginBottom: '8px'
              }}
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-family)',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Change
              </button>
              <button
                type="button"
                onClick={handleRemove}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-family)',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              cursor: 'pointer',
              textAlign: 'center',
              width: '100%',
              padding: '20px'
            }}
          >
            {icon}
            <p style={{
              fontSize: '14px',
              fontFamily: 'var(--font-family)',
              color: 'var(--input-text-color)',
              marginBottom: '4px'
            }}>
              Click to upload profile photo
            </p>
            <p style={{
              fontSize: '12px',
              fontFamily: 'var(--font-family)',
              color: '#9ca3af'
            }}>
              PNG, JPG up to 5MB
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

// Main Employee Form Component
export default function EmployeeFormMVC({ isOpen, onClose, onSubmit, editUser, title = "CREATE EMPLOYEE" }) {
  const { user: currentUser } = useAuth();
  const { showToast } = useNotification();
  
  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [options, setOptions] = useState({});

  // Initialize form when modal opens
  useEffect(() => {
    const initializeForm = async () => {
      if (isOpen) {
        try {
          // Initialize form state
          const initialState = {
            first_name: editUser?.first_name || '',
            email: editUser?.email || '',
            username: editUser?.username || '',
            password: '',
            phone: editUser?.phone || '',
            role: editUser?.role ? editUser.role.toLowerCase() : 'user',
            status: editUser?.status || 'Active',
            date_of_birth: editUser?.date_of_birth || '',
            gender: editUser?.gender || '',
            blood_group: editUser?.blood_group || '',
            marital_status: editUser?.marital_status || '',
            nationality: editUser?.nationality || 'Indian',
            aadhar_number: editUser?.aadhar_number || '',
            pan_number: editUser?.pan_number || '',
            current_address: editUser?.current_address || '',
            permanent_address: editUser?.permanent_address || '',
            city: editUser?.city || '',
            state: editUser?.state || '',
            pincode: editUser?.pincode || '',
            emergency_contact_name: editUser?.emergency_contact_name || '',
            emergency_contact_phone: editUser?.emergency_contact_phone || '',
            emergency_contact_relation: editUser?.emergency_contact_relation || '',
            employee_id: editUser?.employee_id || '',
            department: editUser?.department || '',
            designation: editUser?.designation || '',
            date_of_joining: editUser?.date_of_joining || '',
            employment_type: editUser?.employment_type || 'Full-time',
            work_location: editUser?.work_location || '',
            bank_name: editUser?.bank_name || '',
            bank_account_holder_name: editUser?.bank_account_holder_name || '',
            bank_account_number: editUser?.bank_account_number || '',
            bank_ifsc_code: editUser?.bank_ifsc_code || '',
            bank_branch: editUser?.bank_branch || '',
            basic_salary: editUser?.basic_salary || '',
            hra: editUser?.hra || '',
            other_allowances: editUser?.other_allowances || '',
            salary_type: editUser?.salary_type || 'Monthly',
            pf_number: editUser?.pf_number || '',
            esi_number: editUser?.esi_number || '',
            uan_number: editUser?.uan_number || '',
            profile_image: editUser?.profile_image || '',
            left_date: editUser?.left_date || '',
            company_laptop: editUser?.company_laptop || false,
            company_charger: editUser?.company_charger || false,
            company_mouse: editUser?.company_mouse || false,
            company_keyboard: editUser?.company_keyboard || false,
            company_headset: editUser?.company_headset || false,
            company_monitor: editUser?.company_monitor || false,
            company_other_accessories: editUser?.company_other_accessories || ''
          };
          
          setFormState(initialState);

          // Use hardcoded options directly - matching backend validation rules
          const optionsData = {
            roles: ['admin', 'user', 'manager'],
            statuses: ['Active', 'Inactive'],
            genders: ['Male', 'Female', 'Other'],
            bloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            maritalStatuses: ['Single', 'Married', 'Divorced', 'Widowed'],
            nationalities: ['Indian', 'Other'],
            departments: ['Web Development', 'Digital Marketing', 'Salesforce', 'Management'],
            employmentTypes: ['Full-time', 'Part-time', 'Contract', 'Intern'],
            salaryTypes: ['Monthly', 'Hourly'],
            workLocations: ['Office', 'Remote', 'Hybrid']
          };
          
          setOptions(optionsData);
        } catch (error) {
          console.error('Error initializing form:', error);
          setErrorMessage('Failed to initialize form');
          
          // Fallback to hardcoded options
          const fallbackOptions = {
            roles: ['admin', 'user', 'manager'],
            statuses: ['Active', 'Inactive'],
            genders: ['Male', 'Female', 'Other'],
            bloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            maritalStatuses: ['Single', 'Married', 'Divorced', 'Widowed'],
            nationalities: ['Indian', 'Other'],
            departments: ['Web Development', 'Digital Marketing', 'Salesforce', 'Management'],
            employmentTypes: ['Full-time', 'Part-time', 'Contract', 'Intern'],
            salaryTypes: ['Monthly', 'Hourly'],
            workLocations: ['Office', 'Remote', 'Hybrid']
          };
          
          setOptions(fallbackOptions);
        }
      }
    };
    initializeForm();
  }, [isOpen, editUser]);

  const handleFieldChange = (fieldName, value) => {
    // Update local state to trigger re-render
    setFormState(prev => ({
      ...prev,
      [fieldName]: value
    }));
    // Clear error message when user starts making changes
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleFieldBlur = (fieldName) => {
    // No controller validation, handled by backend API
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      setFieldErrors({});

      // Validate required fields
      const requiredFields = ['first_name', 'email', 'username', 'phone', 'status', 'date_of_joining'];
      const missingFields = requiredFields.filter(field => !formState[field]);
      
      if (missingFields.length > 0) {
        setErrorMessage(`Please fill in all required fields: ${missingFields.join(', ')}`);
        showToast('Please fill in all required fields', 'error');
        return;
      }

      // Make real API call
      let result;
      console.log('📤 Sending form data:', formState);
      if (editUser) {
        console.log('✏️ Updating employee ID:', editUser.id);
        result = await employeeApi.updateEmployee(editUser.id, formState);
      } else {
        console.log('➕ Creating new employee');
        result = await employeeApi.submitEmployee(formState);
      }
      console.log('📥 Response:', result);

      // Check if there are validation errors
      if (result.success === false) {
        if (result.errors) {
          // Display validation errors
          const errors = {};
          
          // Handle both array and object formats
          if (Array.isArray(result.errors)) {
            result.errors.forEach(errorMsg => {
              // Try to map error messages to fields
              if (errorMsg.includes('role')) {
                errors.role = errorMsg;
              } else if (errorMsg.includes('pincode') || errorMsg.includes('Pincode')) {
                errors.pincode = errorMsg;
              } else if (errorMsg.includes('department') || errorMsg.includes('Department')) {
                errors.department = errorMsg;
              } else if (errorMsg.includes('email') || errorMsg.includes('Email')) {
                errors.email = errorMsg;
              } else if (errorMsg.includes('phone') || errorMsg.includes('Phone')) {
                errors.phone = errorMsg;
              } else if (errorMsg.includes('password') || errorMsg.includes('Password')) {
                errors.password = errorMsg;
              } else {
                // For other errors, show as general error
                setErrorMessage(errorMsg);
              }
            });
          } else if (typeof result.errors === 'object') {
            // If errors is an object, use it directly
            Object.assign(errors, result.errors);
          }
          
          setFieldErrors(errors);
          showToast(result.message || 'Validation failed', 'error');
        } else {
          setErrorMessage(result.message || 'Error saving employee');
          showToast(result.message || 'Error saving employee', 'error');
        }
        return;
      }

      showToast(result.message || (editUser ? 'Employee updated successfully!' : 'Employee created successfully!'), 'success');
      
      // If password was auto-generated, show it to admin
      if (!editUser && result.data?.generatedPassword) {
        const passwordMessage = `Auto-generated password: ${result.data.generatedPassword}\n\nEmployee should change this password on first login.`;
        showToast(passwordMessage, 'info');
      }
      
      onSubmit?.(result.data);

      if (!editUser) {
        onClose();
      }
    } catch (error) {
      console.error('Employee form error:', error);
      console.error('Error details:', error.response?.data);
      
      // Extract validation errors from response
      if (error.response?.data?.errors && typeof error.response.data.errors === 'object') {
        const errors = {};
        Object.entries(error.response.data.errors).forEach(([field, message]) => {
          errors[field] = message;
        });
        setFieldErrors(errors);
        setErrorMessage(error.response.data.message || 'Validation failed');
        showToast(error.response.data.message || 'Validation failed', 'error');
      } else {
        setErrorMessage(error.message || 'Error saving employee');
        showToast(error.message || 'Error saving employee', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async () => {
    try {
      // Reset form to initial state
      const initialState = {
        first_name: editUser?.first_name || '',
        email: editUser?.email || '',
        username: editUser?.username || '',
        password: '',
        phone: editUser?.phone || '',
        role: editUser?.role ? editUser.role.toLowerCase() : 'user',
        status: editUser?.status || 'Active',
        date_of_birth: editUser?.date_of_birth || '',
        gender: editUser?.gender || '',
        blood_group: editUser?.blood_group || '',
        marital_status: editUser?.marital_status || '',
        nationality: editUser?.nationality || 'Indian',
        aadhar_number: editUser?.aadhar_number || '',
        pan_number: editUser?.pan_number || '',
        current_address: editUser?.current_address || '',
        permanent_address: editUser?.permanent_address || '',
        city: editUser?.city || '',
        state: editUser?.state || '',
        pincode: editUser?.pincode || '',
        emergency_contact_name: editUser?.emergency_contact_name || '',
        emergency_contact_phone: editUser?.emergency_contact_phone || '',
        emergency_contact_relation: editUser?.emergency_contact_relation || '',
        employee_id: editUser?.employee_id || '',
        department: editUser?.department || '',
        designation: editUser?.designation || '',
        date_of_joining: editUser?.date_of_joining || '',
        employment_type: editUser?.employment_type || 'Full-time',
        work_location: editUser?.work_location || '',
        bank_name: editUser?.bank_name || '',
        bank_account_holder_name: editUser?.bank_account_holder_name || '',
        bank_account_number: editUser?.bank_account_number || '',
        bank_ifsc_code: editUser?.bank_ifsc_code || '',
        bank_branch: editUser?.bank_branch || '',
        basic_salary: editUser?.basic_salary || '',
        hra: editUser?.hra || '',
        other_allowances: editUser?.other_allowances || '',
        salary_type: editUser?.salary_type || 'Monthly',
        pf_number: editUser?.pf_number || '',
        esi_number: editUser?.esi_number || '',
        uan_number: editUser?.uan_number || '',
        profile_image: editUser?.profile_image || '',
        left_date: editUser?.left_date || '',
        company_laptop: editUser?.company_laptop || false,
        company_charger: editUser?.company_charger || false,
        company_mouse: editUser?.company_mouse || false,
        company_keyboard: editUser?.company_keyboard || false,
        company_headset: editUser?.company_headset || false,
        company_monitor: editUser?.company_monitor || false,
        company_other_accessories: editUser?.company_other_accessories || ''
      };
      
      setFormState(initialState);
    } catch (error) {
      console.error('Error resetting form:', error);
      setErrorMessage('Failed to reset form');
    }
  };

  const getFieldState = (fieldName) => {
    return { value: formState[fieldName] || '', error: fieldErrors[fieldName] || '' };
  };


  const getFieldLabel = (fieldName) => {
    const labels = {
      first_name: 'EMPLOYEE NAME',
      email: 'EMAIL ADDRESS',
      username: 'USERNAME',
      password: 'PASSWORD',
      phone: 'PHONE NUMBER',
      role: 'ROLE',
      status: 'STATUS',
      date_of_birth: 'DATE OF BIRTH',
      gender: 'GENDER',
      blood_group: 'BLOOD GROUP',
      marital_status: 'MARITAL STATUS',
      nationality: 'NATIONALITY',
      aadhar_number: 'AADHAR NUMBER',
      pan_number: 'PAN NUMBER',
      current_address: 'CURRENT ADDRESS',
      permanent_address: 'PERMANENT ADDRESS',
      city: 'CITY',
      state: 'STATE',
      pincode: 'PINCODE',
      emergency_contact_name: 'EMERGENCY CONTACT NAME',
      emergency_contact_phone: 'EMERGENCY CONTACT PHONE',
      emergency_contact_relation: 'EMERGENCY CONTACT RELATION',
      employee_id: 'EMPLOYEE ID',
      department: 'DEPARTMENT',
      designation: 'DESIGNATION',
      date_of_joining: 'DATE OF JOINING',
      employment_type: 'EMPLOYMENT TYPE',
      work_location: 'WORK LOCATION',
      bank_name: 'BANK NAME',
      bank_account_holder_name: 'ACCOUNT HOLDER NAME',
      bank_account_number: 'ACCOUNT NUMBER',
      bank_ifsc_code: 'IFSC CODE',
      bank_branch: 'BRANCH NAME',
      basic_salary: 'BASIC SALARY',
      hra: 'HRA (House Rent Allowance)',
      other_allowances: 'OTHER ALLOWANCES',
      salary_type: 'SALARY TYPE',
      pf_number: 'PF NUMBER',
      esi_number: 'ESI NUMBER',
      uan_number: 'UAN NUMBER',
      profile_image: 'PROFILE PHOTO',
      left_date: 'EXIT DATE',
      company_laptop: 'Company Laptop',
      company_charger: 'Company Charger',
      company_mouse: 'Company Mouse',
      company_keyboard: 'Company Keyboard',
      company_headset: 'Company Headset',
      company_monitor: 'Company Monitor',
      company_other_accessories: 'Other Accessories'
    };
    return labels[fieldName] || fieldName.toUpperCase();
  };

  const getFieldPlaceholder = (fieldName) => {
    const placeholders = {
      first_name: 'Enter employee name',
      email: 'Enter email address',
      username: 'Enter username',
      password: isEditing ? 'Leave blank to keep current password' : 'Enter password',
      phone: 'Enter phone number',
      role: 'Select role',
      status: 'Select status',
      date_of_birth: 'Select date of birth',
      gender: 'Select gender',
      blood_group: 'Select blood group',
      marital_status: 'Select marital status',
      nationality: 'Select nationality',
      aadhar_number: 'Enter Aadhar number',
      pan_number: 'Enter PAN number',
      current_address: 'Enter current address',
      permanent_address: 'Enter permanent address',
      city: 'Enter city',
      state: 'Enter state',
      pincode: 'Enter pincode',
      emergency_contact_name: 'Enter emergency contact name',
      emergency_contact_phone: 'Enter emergency contact phone',
      emergency_contact_relation: 'Enter relation',
      employee_id: 'Enter employee ID',
      department: 'Select department',
      designation: 'Enter designation',
      date_of_joining: 'Select date of joining',
      employment_type: 'Select employment type',
      work_location: 'Enter work location',
      bank_name: 'Enter bank name',
      bank_account_holder_name: 'Enter account holder name',
      bank_account_number: 'Enter account number',
      bank_ifsc_code: 'Enter IFSC code',
      bank_branch: 'Enter branch name',
      basic_salary: 'Enter basic salary',
      hra: 'Enter HRA amount',
      other_allowances: 'Enter other allowances',
      salary_type: 'Select salary type',
      pf_number: 'Enter PF number',
      esi_number: 'Enter ESI number',
      uan_number: 'Enter UAN number',
      profile_image: 'Click to upload profile photo',
      left_date: 'Select exit date',
      company_laptop: 'Company Laptop',
      company_charger: 'Company Charger',
      company_mouse: 'Company Mouse',
      company_keyboard: 'Company Keyboard',
      company_headset: 'Company Headset',
      company_monitor: 'Company Monitor',
      company_other_accessories: 'Other accessories'
    };
    return placeholders[fieldName] || '';
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const canEditField = (fieldName) => {
    // Fields that cannot be edited
    const nonEditableFields = [
      'employee_id',  // Auto-generated
      'created_at',
      'updated_at'
    ];

    // If editing, disable non-editable fields
    if (isEditing && nonEditableFields.includes(fieldName)) {
      return false;
    }

    // Allow editing for all other fields
    return true;
  };

  const getFieldVisibility = (fieldName) => {
    // Show all fields for now
    return true;
  };

  if (!isOpen) return null;

  const isEditing = editUser !== null && editUser !== undefined;

  // Tab configuration
  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FiUser },
    { id: 'personal', label: 'Personal', icon: FiUser },
    { id: 'address', label: 'Address', icon: FiMapPin },
    { id: 'employment', label: 'Employment', icon: FiBriefcase },
    ...(currentUser?.role?.toLowerCase() === 'admin' ? [
      { id: 'bank', label: 'Bank Details', icon: FiCreditCard },
      { id: 'salary', label: 'Salary', icon: FiDollarSign },
    ] : []),
  ];

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
              {isEditing ? 'EDIT EMPLOYEE' : title}
            </h2>
            {errorMessage && (
              <div style={{ color: '#ef4444', fontFamily: 'var(--font-family)', fontSize: '12px', marginTop: '2px', whiteSpace: 'pre-line' }}>
                {errorMessage}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="text-gray-600 border border-gray-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
              style={{ fontFamily: 'var(--font-family)' }}
              disabled={isSubmitting}
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="text-white px-3 sm:px-4 py-2 rounded-xl shadow-md hover:opacity-90 text-sm sm:text-base"
              style={{ backgroundColor: 'var(--primary-color)', fontFamily: 'var(--font-family)' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto border-b border-gray-200 px-4 sm:px-6 bg-gray-50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                  ? 'border-b-2 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
                style={{
                  borderBottomColor: activeTab === tab.id ? 'var(--primary-color)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--primary-color)' : undefined,
                  fontFamily: 'var(--font-family)',
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 pb-8 flex-1 overflow-y-auto">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="EMPLOYEE NAME"
                required={true}
                value={getFieldState('first_name').value}
                onChange={(e) => handleFieldChange('first_name', e.target.value)}
                onBlur={() => handleFieldBlur('first_name')}
                placeholder={getFieldPlaceholder('first_name')}
                error={getFieldState('first_name').error}
                disabled={!canEditField('first_name')}
                icon={<FiUser size={16} />}
              />
              <FormField
                label="EMAIL ADDRESS"
                required={true}
                type="email"
                value={getFieldState('email').value}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={() => handleFieldBlur('email')}
                placeholder={getFieldPlaceholder('email')}
                error={getFieldState('email').error}
                disabled={!canEditField('email')}
                icon={<FiMail size={16} />}
              />
              <FormField
                label="USERNAME"
                required={true}
                value={getFieldState('username').value}
                onChange={(e) => handleFieldChange('username', e.target.value)}
                onBlur={() => handleFieldBlur('username')}
                placeholder={getFieldPlaceholder('username')}
                error={getFieldState('username').error}
                disabled={!canEditField('username')}
                icon={<FiUser size={16} />}
              />
              <FormField
                label="PASSWORD"
                required={false}
                type="password"
                value={getFieldState('password').value}
                onChange={(e) => handleFieldChange('password', e.target.value)}
                onBlur={() => handleFieldBlur('password')}
                placeholder={getFieldPlaceholder('password')}
                error={getFieldState('password').error}
                disabled={!canEditField('password')}
                icon={<FiUser size={16} />}
              />
              <FormField
                label="PHONE NUMBER"
                required={true}
                type="tel"
                value={getFieldState('phone').value}
                onChange={(e) => handleFieldChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                onBlur={() => handleFieldBlur('phone')}
                placeholder={getFieldPlaceholder('phone')}
                error={getFieldState('phone').error}
                disabled={!canEditField('phone')}
                icon={<FiPhone size={16} />}
              />
              {getFieldVisibility('role') && (
                <SelectField
                  label="ROLE"
                  options={options.roles}
                  value={getFieldState('role').value}
                  onChange={(val) => handleFieldChange('role', val)}
                  placeholder={getFieldPlaceholder('role')}
                  error={getFieldState('role').error}
                  disabled={!canEditField('role')}
                  icon={<FiUser size={16} />}
                />
              )}
              <SelectField
                label="STATUS"
                required={true}
                options={options.statuses}
                value={getFieldState('status').value}
                onChange={(val) => handleFieldChange('status', val)}
                placeholder={getFieldPlaceholder('status')}
                error={getFieldState('status').error}
                disabled={!canEditField('status')}
                icon={<FiUserCheck size={16} />}
              />
            </div>
          )}

          {/* Personal Details Tab */}
          {activeTab === 'personal' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="DATE OF BIRTH"
                type="date"
                value={formatDateForInput(getFieldState('date_of_birth').value)}
                onChange={(e) => handleFieldChange('date_of_birth', e.target.value)}
                onBlur={() => handleFieldBlur('date_of_birth')}
                placeholder={getFieldPlaceholder('date_of_birth')}
                error={getFieldState('date_of_birth').error}
                disabled={!canEditField('date_of_birth')}
                icon={<FiCalendar size={16} />}
              />
              <SelectField
                label="GENDER"
                options={options.genders}
                value={getFieldState('gender').value}
                onChange={(val) => handleFieldChange('gender', val)}
                placeholder={getFieldPlaceholder('gender')}
                error={getFieldState('gender').error}
                disabled={!canEditField('gender')}
                icon={<FiUser size={16} />}
              />
              <SelectField
                label="BLOOD GROUP"
                options={options.bloodGroups}
                value={getFieldState('blood_group').value}
                onChange={(val) => handleFieldChange('blood_group', val)}
                placeholder={getFieldPlaceholder('blood_group')}
                error={getFieldState('blood_group').error}
                disabled={!canEditField('blood_group')}
                icon={<FiUser size={16} />}
              />
              <SelectField
                label="MARITAL STATUS"
                options={options.maritalStatuses}
                value={getFieldState('marital_status').value}
                onChange={(val) => handleFieldChange('marital_status', val)}
                placeholder={getFieldPlaceholder('marital_status')}
                error={getFieldState('marital_status').error}
                disabled={!canEditField('marital_status')}
                icon={<FiUser size={16} />}
              />
              <SelectField
                label="NATIONALITY"
                options={options.nationalities}
                value={getFieldState('nationality').value}
                onChange={(val) => handleFieldChange('nationality', val)}
                placeholder={getFieldPlaceholder('nationality')}
                error={getFieldState('nationality').error}
                disabled={!canEditField('nationality')}
                icon={<FiUser size={16} />}
              />
              <FormField
                label="AADHAR NUMBER"
                value={getFieldState('aadhar_number').value}
                onChange={(e) => handleFieldChange('aadhar_number', e.target.value.replace(/\D/g, '').slice(0, 12))}
                onBlur={() => handleFieldBlur('aadhar_number')}
                placeholder={getFieldPlaceholder('aadhar_number')}
                error={getFieldState('aadhar_number').error}
                disabled={!canEditField('aadhar_number')}
                icon={<FiUser size={16} />}
              />
              <FormField
                label="PAN NUMBER"
                value={getFieldState('pan_number').value}
                onChange={(e) => handleFieldChange('pan_number', e.target.value.toUpperCase().slice(0, 10))}
                onBlur={() => handleFieldBlur('pan_number')}
                placeholder={getFieldPlaceholder('pan_number')}
                error={getFieldState('pan_number').error}
                disabled={!canEditField('pan_number')}
                icon={<FiUser size={16} />}
              />
            </div>
          )}

          {/* Address Details Tab */}
          {activeTab === 'address' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextAreaField
                label="CURRENT ADDRESS"
                value={getFieldState('current_address').value}
                onChange={(e) => handleFieldChange('current_address', e.target.value)}
                onBlur={() => handleFieldBlur('current_address')}
                placeholder={getFieldPlaceholder('current_address')}
                error={getFieldState('current_address').error}
                disabled={!canEditField('current_address')}
                icon={<FiMapPin size={16} />}
                rows={3}
              />
              <CheckboxField
                label="Permanent address same as current"
                checked={getFieldState('current_address').value === getFieldState('permanent_address').value}
                onChange={(checked) => {
                  if (checked) {
                    handleFieldChange('permanent_address', getFieldState('current_address').value);
                  }
                }}
                disabled={!canEditField('permanent_address')}
              />
              <TextAreaField
                label="PERMANENT ADDRESS"
                value={getFieldState('permanent_address').value}
                onChange={(e) => handleFieldChange('permanent_address', e.target.value)}
                onBlur={() => handleFieldBlur('permanent_address')}
                placeholder={getFieldPlaceholder('permanent_address')}
                error={getFieldState('permanent_address').error}
                disabled={!canEditField('permanent_address') || getFieldState('current_address').value === getFieldState('permanent_address').value}
                icon={<FiMapPin size={16} />}
                rows={3}
              />
              <FormField
                label="CITY"
                value={getFieldState('city').value}
                onChange={(e) => handleFieldChange('city', e.target.value)}
                onBlur={() => handleFieldBlur('city')}
                placeholder={getFieldPlaceholder('city')}
                error={getFieldState('city').error}
                disabled={!canEditField('city')}
                icon={<FiMapPin size={16} />}
              />
              <FormField
                label="STATE"
                value={getFieldState('state').value}
                onChange={(e) => handleFieldChange('state', e.target.value)}
                onBlur={() => handleFieldBlur('state')}
                placeholder={getFieldPlaceholder('state')}
                error={getFieldState('state').error}
                disabled={!canEditField('state')}
                icon={<FiMapPin size={16} />}
              />
              <FormField
                label="PINCODE"
                value={getFieldState('pincode').value}
                onChange={(e) => handleFieldChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                onBlur={() => handleFieldBlur('pincode')}
                placeholder={getFieldPlaceholder('pincode')}
                error={getFieldState('pincode').error}
                disabled={!canEditField('pincode')}
                icon={<FiMapPin size={16} />}
              />
              <FormField
                label="EMERGENCY CONTACT NAME"
                value={getFieldState('emergency_contact_name').value}
                onChange={(e) => handleFieldChange('emergency_contact_name', e.target.value)}
                onBlur={() => handleFieldBlur('emergency_contact_name')}
                placeholder={getFieldPlaceholder('emergency_contact_name')}
                error={getFieldState('emergency_contact_name').error}
                disabled={!canEditField('emergency_contact_name')}
                icon={<FiUser size={16} />}
              />
              <FormField
                label="EMERGENCY CONTACT PHONE"
                value={getFieldState('emergency_contact_phone').value}
                onChange={(e) => handleFieldChange('emergency_contact_phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                onBlur={() => handleFieldBlur('emergency_contact_phone')}
                placeholder={getFieldPlaceholder('emergency_contact_phone')}
                error={getFieldState('emergency_contact_phone').error}
                disabled={!canEditField('emergency_contact_phone')}
                icon={<FiPhone size={16} />}
              />
              <FormField
                label="EMERGENCY CONTACT RELATION"
                value={getFieldState('emergency_contact_relation').value}
                onChange={(e) => handleFieldChange('emergency_contact_relation', e.target.value)}
                onBlur={() => handleFieldBlur('emergency_contact_relation')}
                placeholder={getFieldPlaceholder('emergency_contact_relation')}
                error={getFieldState('emergency_contact_relation').error}
                disabled={!canEditField('emergency_contact_relation')}
                icon={<FiUser size={16} />}
              />
            </div>
          )}

          {/* Employment Details Tab */}
          {activeTab === 'employment' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="EMPLOYEE ID"
                  value={getFieldState('employee_id').value}
                  onChange={(e) => handleFieldChange('employee_id', e.target.value)}
                  onBlur={() => handleFieldBlur('employee_id')}
                  placeholder={getFieldPlaceholder('employee_id')}
                  error={getFieldState('employee_id').error}
                  disabled={!canEditField('employee_id')}
                  icon={<FiUser size={16} />}
                />
                <SelectField
                  label="DEPARTMENT"
                  options={options.departments}
                  value={getFieldState('department').value}
                  onChange={(val) => handleFieldChange('department', val)}
                  placeholder={getFieldPlaceholder('department')}
                  error={getFieldState('department').error}
                  disabled={!canEditField('department')}
                  icon={<FiBriefcase size={16} />}
                />
                <FormField
                  label="DESIGNATION"
                  value={getFieldState('designation').value}
                  onChange={(e) => handleFieldChange('designation', e.target.value)}
                  onBlur={() => handleFieldBlur('designation')}
                  placeholder={getFieldPlaceholder('designation')}
                  error={getFieldState('designation').error}
                  disabled={!canEditField('designation')}
                  icon={<FiBriefcase size={16} />}
                />
                <FormField
                  label="DATE OF JOINING"
                  required={true}
                  type="date"
                  value={formatDateForInput(getFieldState('date_of_joining').value)}
                  onChange={(e) => handleFieldChange('date_of_joining', e.target.value)}
                  onBlur={() => handleFieldBlur('date_of_joining')}
                  placeholder={getFieldPlaceholder('date_of_joining')}
                  error={getFieldState('date_of_joining').error}
                  disabled={!canEditField('date_of_joining')}
                  icon={<FiCalendar size={16} />}
                />
                <SelectField
                  label="EMPLOYMENT TYPE"
                  options={options.employmentTypes}
                  value={getFieldState('employment_type').value}
                  onChange={(val) => handleFieldChange('employment_type', val)}
                  placeholder={getFieldPlaceholder('employment_type')}
                  error={getFieldState('employment_type').error}
                  disabled={!canEditField('employment_type')}
                  icon={<FiBriefcase size={16} />}
                />
                <FormField
                  label="WORK LOCATION"
                  value={getFieldState('work_location').value}
                  onChange={(e) => handleFieldChange('work_location', e.target.value)}
                  onBlur={() => handleFieldBlur('work_location')}
                  placeholder={getFieldPlaceholder('work_location')}
                  error={getFieldState('work_location').error}
                  disabled={!canEditField('work_location')}
                  icon={<FiMapPin size={16} />}
                />
                <div className="sm:col-span-2">
                  <FileUploadField
                    label="PROFILE PHOTO"
                    value={getFieldState('profile_image').value}
                    onChange={(file) => handleFieldChange('profile_image', file)}
                    accept="image/*"
                    icon={<FiImage size={32} style={{ color: 'var(--primary-color)', margin: '0 auto 8px' }} />}
                  />
                </div>
                {getFieldVisibility('left_date') && (
                  <FormField
                    label="EXIT DATE"
                    type="date"
                    value={formatDateForInput(getFieldState('left_date').value)}
                    onChange={(e) => handleFieldChange('left_date', e.target.value)}
                    onBlur={() => handleFieldBlur('left_date')}
                    placeholder={getFieldPlaceholder('left_date')}
                    error={getFieldState('left_date').error}
                    disabled={!canEditField('left_date')}
                    icon={<FiCalendar size={16} />}
                  />
                )}
              </div>

              {/* Company Accessories Section */}
              {getFieldVisibility('company_laptop') && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-family)', color: 'var(--primary-color)' }}>
                    Company Accessories
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CheckboxField
                      label="Company Laptop"
                      checked={getFieldState('company_laptop').value}
                      onChange={(checked) => handleFieldChange('company_laptop', checked)}
                      disabled={!canEditField('company_laptop')}
                    />
                    <CheckboxField
                      label="Company Charger"
                      checked={getFieldState('company_charger').value}
                      onChange={(checked) => handleFieldChange('company_charger', checked)}
                      disabled={!canEditField('company_charger')}
                    />
                    <CheckboxField
                      label="Company Mouse"
                      checked={getFieldState('company_mouse').value}
                      onChange={(checked) => handleFieldChange('company_mouse', checked)}
                      disabled={!canEditField('company_mouse')}
                    />
                    <CheckboxField
                      label="Company Keyboard"
                      checked={getFieldState('company_keyboard').value}
                      onChange={(checked) => handleFieldChange('company_keyboard', checked)}
                      disabled={!canEditField('company_keyboard')}
                    />
                    <CheckboxField
                      label="Company Headset"
                      checked={getFieldState('company_headset').value}
                      onChange={(checked) => handleFieldChange('company_headset', checked)}
                      disabled={!canEditField('company_headset')}
                    />
                    <CheckboxField
                      label="Company Monitor"
                      checked={getFieldState('company_monitor').value}
                      onChange={(checked) => handleFieldChange('company_monitor', checked)}
                      disabled={!canEditField('company_monitor')}
                    />
                  </div>
                  <FormField
                    label="Other Accessories"
                    value={getFieldState('company_other_accessories').value}
                    onChange={(e) => handleFieldChange('company_other_accessories', e.target.value)}
                    onBlur={() => handleFieldBlur('company_other_accessories')}
                    placeholder={getFieldPlaceholder('company_other_accessories')}
                    error={getFieldState('company_other_accessories').error}
                    disabled={!canEditField('company_other_accessories')}
                    icon={<FiPackage size={16} />}
                  />
                </div>
              )}
            </div>
          )}

          {/* Bank Details Tab */}
          {activeTab === 'bank' && currentUser?.role?.toLowerCase() === 'admin' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="BANK NAME"
                value={getFieldState('bank_name').value}
                onChange={(e) => handleFieldChange('bank_name', e.target.value)}
                onBlur={() => handleFieldBlur('bank_name')}
                placeholder={getFieldPlaceholder('bank_name')}
                error={getFieldState('bank_name').error}
                icon={<FiCreditCard size={16} />}
              />
              <FormField
                label="ACCOUNT HOLDER NAME"
                value={getFieldState('bank_account_holder_name').value}
                onChange={(e) => handleFieldChange('bank_account_holder_name', e.target.value)}
                onBlur={() => handleFieldBlur('bank_account_holder_name')}
                placeholder={getFieldPlaceholder('bank_account_holder_name')}
                error={getFieldState('bank_account_holder_name').error}
                icon={<FiUser size={16} />}
              />
              <FormField
                label="ACCOUNT NUMBER"
                value={getFieldState('bank_account_number').value}
                onChange={(e) => handleFieldChange('bank_account_number', e.target.value)}
                onBlur={() => handleFieldBlur('bank_account_number')}
                placeholder={getFieldPlaceholder('bank_account_number')}
                error={getFieldState('bank_account_number').error}
                icon={<FiCreditCard size={16} />}
              />
              <FormField
                label="IFSC CODE"
                value={getFieldState('bank_ifsc_code').value}
                onChange={(e) => handleFieldChange('bank_ifsc_code', e.target.value.toUpperCase().slice(0, 11))}
                onBlur={() => handleFieldBlur('bank_ifsc_code')}
                placeholder={getFieldPlaceholder('bank_ifsc_code')}
                error={getFieldState('bank_ifsc_code').error}
                icon={<FiCreditCard size={16} />}
              />
              <FormField
                label="BRANCH NAME"
                value={getFieldState('bank_branch').value}
                onChange={(e) => handleFieldChange('bank_branch', e.target.value)}
                onBlur={() => handleFieldBlur('bank_branch')}
                placeholder={getFieldPlaceholder('bank_branch')}
                error={getFieldState('bank_branch').error}
                icon={<FiCreditCard size={16} />}
              />
            </div>
          )}

          {/* Salary Details Tab */}
          {activeTab === 'salary' && currentUser?.role?.toLowerCase() === 'admin' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="SALARY TYPE"
                  options={options.salaryTypes}
                  value={getFieldState('salary_type').value}
                  onChange={(val) => handleFieldChange('salary_type', val)}
                  placeholder={getFieldPlaceholder('salary_type')}
                  error={getFieldState('salary_type').error}
                  icon={<FiDollarSign size={16} />}
                />
                <FormField
                  label="BASIC SALARY"
                  type="number"
                  value={getFieldState('basic_salary').value}
                  onChange={(e) => handleFieldChange('basic_salary', e.target.value)}
                  onBlur={() => handleFieldBlur('basic_salary')}
                  placeholder={getFieldPlaceholder('basic_salary')}
                  error={getFieldState('basic_salary').error}
                  icon={<FiDollarSign size={16} />}
                />
                <FormField
                  label="HRA (House Rent Allowance)"
                  type="number"
                  value={getFieldState('hra').value}
                  onChange={(e) => handleFieldChange('hra', e.target.value)}
                  onBlur={() => handleFieldBlur('hra')}
                  placeholder={getFieldPlaceholder('hra')}
                  error={getFieldState('hra').error}
                  icon={<FiDollarSign size={16} />}
                />
                <FormField
                  label="OTHER ALLOWANCES"
                  type="number"
                  value={getFieldState('other_allowances').value}
                  onChange={(e) => handleFieldChange('other_allowances', e.target.value)}
                  onBlur={() => handleFieldBlur('other_allowances')}
                  placeholder={getFieldPlaceholder('other_allowances')}
                  error={getFieldState('other_allowances').error}
                  icon={<FiDollarSign size={16} />}
                />
                <FormField
                  label="PF NUMBER"
                  value={getFieldState('pf_number').value}
                  onChange={(e) => handleFieldChange('pf_number', e.target.value)}
                  onBlur={() => handleFieldBlur('pf_number')}
                  placeholder={getFieldPlaceholder('pf_number')}
                  error={getFieldState('pf_number').error}
                  icon={<FiCreditCard size={16} />}
                />
                <FormField
                  label="ESI NUMBER"
                  value={getFieldState('esi_number').value}
                  onChange={(e) => handleFieldChange('esi_number', e.target.value)}
                  onBlur={() => handleFieldBlur('esi_number')}
                  placeholder={getFieldPlaceholder('esi_number')}
                  error={getFieldState('esi_number').error}
                  icon={<FiCreditCard size={16} />}
                />
                <FormField
                  label="UAN NUMBER"
                  value={getFieldState('uan_number').value}
                  onChange={(e) => handleFieldChange('uan_number', e.target.value)}
                  onBlur={() => handleFieldBlur('uan_number')}
                  placeholder={getFieldPlaceholder('uan_number')}
                  error={getFieldState('uan_number').error}
                  icon={<FiCreditCard size={16} />}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}