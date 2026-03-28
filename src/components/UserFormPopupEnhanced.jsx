import React, { useState, useEffect, useRef } from "react";
import { FiX, FiUser, FiMapPin, FiBriefcase, FiDollarSign, FiCreditCard, FiUpload, FiImage, FiPackage } from "react-icons/fi";
import { useNotification } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";
import { formatDateForInput } from '../utils/dateUtils';
import AccessoriesManager from './AccessoriesManager';
import SalaryManager from './SalaryManager';
import PromotionManager from './PromotionManager';

// CheckboxField component
const CheckboxField = ({ label, checked, onChange }) => (
  <div className="flex items-center gap-3" style={{ marginBottom: 'var(--form-margin-bottom)' }}>
    <input
      type="checkbox"
      checked={checked || false}
      onChange={(e) => onChange(e.target.checked)}
      style={{
        width: '18px',
        height: '18px',
        cursor: 'pointer',
        accentColor: 'var(--primary-color)',
      }}
    />
    <label
      onClick={() => onChange(!checked)}
      style={{
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--placeholder-font-size)',
        color: 'var(--input-text-color)',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {label}
    </label>
  </div>
);

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

// Phone Number Field Component
const PhoneField = ({ label, required, value, onChange, placeholder, error }) => {
  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 10) {
      input = input.slice(0, 10);
    }
    onChange({ target: { value: input } });
  };

  return (
    <div className="relative" style={{ marginBottom: 'var(--form-margin-bottom)' }}>
      <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 uppercase tracking-wider z-10" style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--label-font-size)', fontWeight: 'var(--label-font-weight)' }}>
        {label}{required && <span style={{ color: '#ef4444', fontFamily: 'var(--font-family)' }} className="ml-1">*</span>}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        maxLength={10}
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
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => e.target.style.borderColor = error ? '#ef4444' : 'var(--input-focus-border-color)'}
        onBlur={(e) => e.target.style.borderColor = error ? '#ef4444' : 'var(--input-border-color)'}
      />
      {error && (
        <p style={{ color: '#ef4444', fontFamily: 'var(--font-family)', fontSize: '11px', fontWeight: '500', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span className="w-1 h-1 rounded-full bg-[#ef4444]"></span>
          {error}
        </p>
      )}
    </div>
  );
};

// TextArea Field Component
const TextAreaField = ({ label, required, value, onChange, placeholder, error, rows = 3 }) => (
  <div className="relative" style={{ marginBottom: 'var(--form-margin-bottom)' }}>
    <label className="absolute -top-2 left-3 bg-white px-1 text-gray-500 uppercase tracking-wider z-10" style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--label-font-size)', fontWeight: 'var(--label-font-weight)' }}>
      {label}{required && <span style={{ color: '#ef4444', fontFamily: 'var(--font-family)' }} className="ml-1">*</span>}
    </label>
    <textarea
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        padding: '16px 12px 8px 12px',
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
    />
    {error && (
      <p style={{ color: '#ef4444', fontFamily: 'var(--font-family)', fontSize: '11px', fontWeight: '500', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span className="w-1 h-1 rounded-full bg-[#ef4444]"></span>
        {error}
      </p>
    )}
  </div>
);

// File Upload Field Component for Profile Photo
const FileUploadField = ({ label, required, value, onChange, accept = "image/*" }) => {
  const [preview, setPreview] = useState(value || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onChange(reader.result); // Send base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
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
            <FiUpload size={32} style={{ color: 'var(--primary-color)', margin: '0 auto 8px' }} />
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

export default function UserFormPopupEnhanced({ isOpen, onClose, onSubmit, editUser, title = "CREATE EMPLOYEE" }) {
  const { user: currentUser } = useAuth();
  const { showToast } = useNotification();
  const [activeTab, setActiveTab] = useState('basic');

  // Basic Info
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Active");

  // Personal Details
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [nationality, setNationality] = useState("Indian");
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");

  // Address Details
  const [currentAddress, setCurrentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [emergencyContactRelation, setEmergencyContactRelation] = useState("");

  // Employment Details
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [workLocation, setWorkLocation] = useState("");

  // Bank Details
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankIfscCode, setBankIfscCode] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [bankAccountHolderName, setBankAccountHolderName] = useState("");

  // Salary Details
  const [basicSalary, setBasicSalary] = useState("");
  const [hra, setHra] = useState("");
  const [otherAllowances, setOtherAllowances] = useState("");
  const [salaryType, setSalaryType] = useState("Monthly");
  const [pfNumber, setPfNumber] = useState("");
  const [esiNumber, setEsiNumber] = useState("");
  const [uanNumber, setUanNumber] = useState("");

  // New fields
  const [profileImage, setProfileImage] = useState("");
  const [leftDate, setLeftDate] = useState("");
  const [isPermanentSame, setIsPermanentSame] = useState(false);

  // Company Accessories
  const [companyLaptop, setCompanyLaptop] = useState(false);
  const [companyCharger, setCompanyCharger] = useState(false);
  const [companyMouse, setCompanyMouse] = useState(false);
  const [companyKeyboard, setCompanyKeyboard] = useState(false);
  const [companyHeadset, setCompanyHeadset] = useState(false);
  const [companyMonitor, setCompanyMonitor] = useState(false);
  const [companyOtherAccessories, setCompanyOtherAccessories] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editUser) {
      // Basic Info
      setEmployeeName(editUser.first_name || "");
      setEmail(editUser.email || "");
      setUsername(editUser.username || "");
      setPassword(""); // Don't populate password for security reasons
      setPhone(editUser.phone || "");
      setRole(editUser.role || "");
      setStatus(editUser.status || "Active");

      // Personal Details - Format date properly using utility function
      setDateOfBirth(formatDateForInput(editUser.date_of_birth));
      setGender(editUser.gender || "");
      setBloodGroup(editUser.blood_group || "");
      setMaritalStatus(editUser.marital_status || "");
      setNationality(editUser.nationality || "Indian");
      setAadharNumber(editUser.aadhar_number || "");
      setPanNumber(editUser.pan_number || "");

      // Address Details
      setCurrentAddress(editUser.current_address || "");
      setPermanentAddress(editUser.permanent_address || "");
      setIsPermanentSame(editUser.current_address === editUser.permanent_address && !!editUser.current_address);
      setCity(editUser.city || "");
      setState(editUser.state || "");
      setPincode(editUser.pincode || "");
      setEmergencyContactName(editUser.emergency_contact_name || "");
      setEmergencyContactPhone(editUser.emergency_contact_phone || "");
      setEmergencyContactRelation(editUser.emergency_contact_relation || "");

      // Employment Details - Format date properly using utility function
      setEmployeeId(editUser.employee_id || "");
      setDepartment(editUser.department || "");
      setDesignation(editUser.designation || "");
      setDateOfJoining(formatDateForInput(editUser.date_of_joining));
      setEmploymentType(editUser.employment_type || "Full-time");
      setWorkLocation(editUser.work_location || "");

      // Bank Details
      setBankName(editUser.bank_name || "");
      setBankAccountNumber(editUser.bank_account_number || "");
      setBankIfscCode(editUser.bank_ifsc_code || "");
      setBankBranch(editUser.bank_branch || "");
      setBankAccountHolderName(editUser.bank_account_holder_name || "");

      // Salary Details - Convert to string for display
      setBasicSalary(editUser.basic_salary ? String(editUser.basic_salary) : "");
      setHra(editUser.hra ? String(editUser.hra) : "");
      setOtherAllowances(editUser.other_allowances ? String(editUser.other_allowances) : "");
      setPfNumber(editUser.pf_number || "");
      setEsiNumber(editUser.esi_number || "");
      setUanNumber(editUser.uan_number || "");

      // New fields - Format date properly using utility function
      setProfileImage(editUser.profile_image || "");
      setLeftDate(formatDateForInput(editUser.left_date));

      // Company Accessories
      setCompanyLaptop(editUser.company_laptop || false);
      setCompanyCharger(editUser.company_charger || false);
      setCompanyMouse(editUser.company_mouse || false);
      setCompanyKeyboard(editUser.company_keyboard || false);
      setCompanyHeadset(editUser.company_headset || false);
      setCompanyMonitor(editUser.company_monitor || false);
      setCompanyOtherAccessories(editUser.company_other_accessories || "");

      setShowErrorMessage(false);
      setErrorMessage("");
    } else {
      resetForm();
    }
  }, [editUser, isOpen]);

  // Auto-populate username with email when creating new user
  useEffect(() => {
    if (!editUser && email.trim()) {
      setUsername(email);
    }
  }, [email, editUser]);

  const resetForm = () => {
    // Basic Info
    setEmployeeName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setPhone("");
    setRole(""); // No default role
    setStatus("Active");

    // Personal Details
    setDateOfBirth("");
    setGender("");
    setBloodGroup("");
    setMaritalStatus("");
    setNationality("Indian");
    setAadharNumber("");
    setPanNumber("");

    // Address Details
    setCurrentAddress("");
    setPermanentAddress("");
    setCity("");
    setState("");
    setPincode("");
    setEmergencyContactName("");
    setEmergencyContactPhone("");
    setEmergencyContactRelation("");

    // Employment Details
    setEmployeeId("");
    setDepartment("");
    setDesignation("");
    setDateOfJoining("");
    setEmploymentType("Full-time");
    setWorkLocation("");

    // Bank Details
    setBankName("");
    setBankAccountNumber("");
    setBankIfscCode("");
    setBankBranch("");
    setBankAccountHolderName("");

    // Salary Details
    setBasicSalary("");
    setHra("");
    setOtherAllowances("");
    setSalaryType("Monthly");
    setPfNumber("");
    setEsiNumber("");
    setUanNumber("");

    // New fields
    setProfileImage("");
    setLeftDate("");

    // Company Accessories
    setCompanyLaptop(false);
    setCompanyCharger(false);
    setCompanyMouse(false);
    setCompanyKeyboard(false);
    setCompanyHeadset(false);
    setCompanyMonitor(false);
    setCompanyOtherAccessories("");

    setActiveTab('basic');
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

    if (!phone.trim()) errors.phone = 'Phone number is required';
    else if (phone.replace(/\D/g, '').length !== 10) errors.phone = 'Enter valid 10-digit number';

    if (!status) errors.status = 'Please select status';

    // Employment validations
    if (!employeeId.trim()) errors.employeeId = 'Employee ID is required';
    if (!department.trim()) errors.department = 'Department is required';
    if (!designation.trim()) errors.designation = 'Designation is required';
    if (!dateOfJoining) errors.dateOfJoining = 'Joining date is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Auto-switch to tab with errors
      if (errors.employeeName || errors.email || errors.username || errors.password || errors.phone || errors.status) {
        setActiveTab('basic');
      } else if (errors.dateOfJoining) {
        setActiveTab('employment');
      }
      showToast('Please fix the errors in the form', 'warning');
      return;
    }

    try {
      const userData = {
        first_name: employeeName,
        email,
        username,
        password,
        phone,
        role,
        status,
        // Personal Details
        date_of_birth: dateOfBirth || null,
        gender: gender || null,
        blood_group: bloodGroup || null,
        marital_status: maritalStatus || null,
        nationality: nationality || 'Indian',
        aadhar_number: aadharNumber || null,
        pan_number: panNumber || null,
        // Address Details
        current_address: currentAddress || null,
        permanent_address: permanentAddress || null,
        city: city || null,
        state: state || null,
        pincode: pincode || null,
        emergency_contact_name: emergencyContactName || null,
        emergency_contact_phone: emergencyContactPhone || null,
        emergency_contact_relation: emergencyContactRelation || null,
        // Employment Details
        employee_id: employeeId || null,
        department: department || null,
        designation: designation || null,
        date_of_joining: dateOfJoining || null,
        employment_type: employmentType || 'Full-time',
        work_location: workLocation || null,
        // Bank Details
        bank_name: bankName || null,
        bank_account_number: bankAccountNumber || null,
        bank_ifsc_code: bankIfscCode || null,
        bank_branch: bankBranch || null,
        bank_account_holder_name: bankAccountHolderName || null,
        // Salary Details
        basic_salary: basicSalary ? parseFloat(basicSalary) : null,
        hra: hra ? parseFloat(hra) : null,
        other_allowances: otherAllowances ? parseFloat(otherAllowances) : null,
        salary_type: salaryType || 'Monthly',
        pf_number: pfNumber || null,
        esi_number: esiNumber || null,
        uan_number: uanNumber || null,
        // New fields
        profile_image: profileImage || null,
        left_date: leftDate || null,
        // Company Accessories
        company_laptop: companyLaptop || false,
        company_charger: companyCharger || false,
        company_mouse: companyMouse || false,
        company_keyboard: companyKeyboard || false,
        company_headset: companyHeadset || false,
        company_monitor: companyMonitor || false,
        company_other_accessories: companyOtherAccessories || null,
      };

      if (typeof onSubmit === "function") {
        await onSubmit(userData);
        showToast(editUser ? 'User updated successfully!' : 'User created successfully!', 'success');

        if (!editUser) {
          resetForm();
          onClose();
        }
      }
    } catch (error) {
      console.error('Error saving user:', error);
      const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || 'Error saving user. Please try again.';
      showToast(errorMsg, 'error');
    }
  };

  if (!isOpen) return null;

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
        {/* Removed local success message toast */}

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
              {editUser ? 'EDIT USER' : title}
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
              <InputField
                label="EMPLOYEE NAME"
                required={true}
                value={employeeName}
                onChange={(e) => {
                  setEmployeeName(e.target.value);
                  if (formErrors.employeeName) setFormErrors({ ...formErrors, employeeName: null });
                }}
                placeholder="Enter employee name"
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
            </div>
          )}

          {/* Personal Details Tab */}
          {activeTab === 'personal' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="DATE OF BIRTH"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="Select date of birth"
              />
              <SelectField
                label="GENDER"
                options={["Male", "Female", "Other"]}
                value={gender}
                onChange={setGender}
                placeholder="Select gender"
              />
              <SelectField
                label="BLOOD GROUP"
                options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
                value={bloodGroup}
                onChange={setBloodGroup}
                placeholder="Select blood group"
              />
              <SelectField
                label="MARITAL STATUS"
                options={["Unmarried", "Married", "Divorced", "Widowed"]}
                value={maritalStatus}
                onChange={setMaritalStatus}
                placeholder="Select marital status"
              />
              <InputField
                label="NATIONALITY"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="Enter nationality"
              />
              <InputField
                label="AADHAR NUMBER"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                placeholder="Enter 12-digit Aadhar number"
                maxLength={12}
              />
              <InputField
                label="PAN NUMBER"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase().slice(0, 10))}
                placeholder="Enter PAN number (e.g., ABCDE1234F)"
                maxLength={10}
              />
            </div>
          )}

          {/* Address Details Tab */}
          {activeTab === 'address' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <TextAreaField
                  label="CURRENT ADDRESS"
                  value={currentAddress}
                  onChange={(e) => {
                    setCurrentAddress(e.target.value);
                    if (isPermanentSame) setPermanentAddress(e.target.value);
                  }}
                  placeholder="Enter current residential address"
                  rows={2}
                />
              </div>
              <div className="sm:col-span-2">
                <CheckboxField
                  label="Permanent address same as current"
                  checked={isPermanentSame}
                  onChange={(val) => {
                    setIsPermanentSame(val);
                    if (val) setPermanentAddress(currentAddress);
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <TextAreaField
                  label="PERMANENT ADDRESS"
                  value={permanentAddress}
                  onChange={(e) => setPermanentAddress(e.target.value)}
                  placeholder="Enter permanent address"
                  rows={2}
                  disabled={isPermanentSame}
                />
              </div>
              <InputField
                label="CITY"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
              />
              <InputField
                label="STATE"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter state"
              />
              <InputField
                label="PINCODE"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit pincode"
                maxLength={6}
              />
              <InputField
                label="EMERGENCY CONTACT NAME"
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                placeholder="Enter emergency contact name"
              />
              <PhoneField
                label="EMERGENCY CONTACT PHONE"
                value={emergencyContactPhone}
                onChange={(e) => setEmergencyContactPhone(e.target.value)}
                placeholder="Enter 10-digit phone number"
              />
            </div>
          )}

          {/* Employment Details Tab */}
          {activeTab === 'employment' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="EMPLOYEE ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder={editUser ? "Employee ID" : "Auto-generated on save"}
                  disabled={true}
                />
                <SelectField
                  label="DEPARTMENT"
                  options={["Web Development", "Digital Marketing", "Salesforce", "Management"]}
                  value={department}
                  onChange={(val) => {
                    setDepartment(val);
                    if (formErrors.department) setFormErrors({ ...formErrors, department: null });
                  }}
                  placeholder="Select department"
                  error={formErrors.department}
                />
                <InputField
                  label="DESIGNATION"
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                    if (formErrors.designation) setFormErrors({ ...formErrors, designation: null });
                  }}
                  placeholder="Enter job designation/title"
                  disabled={!!editUser}
                  error={formErrors.designation}
                />
                <InputField
                  label="DATE OF JOINING"
                  required={true}
                  type="date"
                  value={dateOfJoining}
                  onChange={(e) => {
                    setDateOfJoining(e.target.value);
                    if (formErrors.dateOfJoining) setFormErrors({ ...formErrors, dateOfJoining: null });
                  }}
                  placeholder="Select date of joining"
                  error={formErrors.dateOfJoining}
                />
                <SelectField
                  label="EMPLOYMENT TYPE"
                  options={["Full-time", "Part-time", "Contract", "Intern"]}
                  value={employmentType}
                  onChange={setEmploymentType}
                  placeholder="Select employment type"
                />
                <InputField
                  label="WORK LOCATION"
                  value={workLocation}
                  onChange={(e) => setWorkLocation(e.target.value)}
                  placeholder="Enter primary work location"
                />
                <div className="sm:col-span-2">
                  <FileUploadField
                    label="PROFILE PHOTO"
                    value={profileImage}
                    onChange={setProfileImage}
                    accept="image/*"
                  />
                </div>
                <InputField
                  label="EXIT DATE"
                  type="date"
                  value={leftDate}
                  onChange={(e) => setLeftDate(e.target.value)}
                  placeholder="Select date when employee left"
                />
              </div>

              {editUser && currentUser?.role?.toLowerCase() === 'admin' && (
                <PromotionManager
                  userId={editUser.id}
                  currentDesignation={designation}
                  onSuccess={(newVal) => setDesignation(newVal)}
                />
              )}
            </div>
          )}


          {/* Bank Details Tab */}
          {activeTab === 'bank' && currentUser?.role?.toLowerCase() === 'admin' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="BANK NAME"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Enter bank name"
              />
              <InputField
                label="ACCOUNT HOLDER NAME"
                value={bankAccountHolderName}
                onChange={(e) => setBankAccountHolderName(e.target.value)}
                placeholder="Enter account holder name as per bank"
              />
              <InputField
                label="ACCOUNT NUMBER"
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                placeholder="Enter bank account number"
              />
              <InputField
                label="IFSC CODE"
                value={bankIfscCode}
                onChange={(e) => setBankIfscCode(e.target.value.toUpperCase().slice(0, 11))}
                placeholder="Enter IFSC code (e.g., SBIN0001234)"
                maxLength={11}
              />
              <InputField
                label="BRANCH NAME"
                value={bankBranch}
                onChange={(e) => setBankBranch(e.target.value)}
                placeholder="Enter bank branch name"
              />
            </div>
          )}

          {/* Salary Details Tab */}
          {activeTab === 'salary' && currentUser?.role?.toLowerCase() === 'admin' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="SALARY TYPE"
                  options={["Hourly", "Weekly", "Per Day", "Monthly"]}
                  value={salaryType}
                  onChange={setSalaryType}
                  placeholder="Select salary type"
                />
                <InputField
                  label="BASIC SALARY"
                  type="number"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                  placeholder="Enter basic salary amount"
                />
                <InputField
                  label="HRA (House Rent Allowance)"
                  type="number"
                  value={hra}
                  onChange={(e) => setHra(e.target.value)}
                  placeholder="Enter HRA amount"
                />
                <InputField
                  label="OTHER ALLOWANCES"
                  type="number"
                  value={otherAllowances}
                  onChange={(e) => setOtherAllowances(e.target.value)}
                  placeholder="Enter other allowances"
                />
                <InputField
                  label="PF NUMBER"
                  value={pfNumber}
                  onChange={(e) => setPfNumber(e.target.value)}
                  placeholder="Enter Provident Fund number"
                />
                <InputField
                  label="ESI NUMBER"
                  value={esiNumber}
                  onChange={(e) => setEsiNumber(e.target.value)}
                  placeholder="Enter ESI number"
                />
                <InputField
                  label="UAN NUMBER"
                  value={uanNumber}
                  onChange={(e) => setUanNumber(e.target.value)}
                  placeholder="Enter Universal Account Number"
                />
              </div>

              {editUser && (
                <SalaryManager
                  userId={editUser.id}
                  currentSalary={basicSalary}
                  onSuccess={(newVal) => setBasicSalary(newVal)}
                />
              )}
            </div>
          )}

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
