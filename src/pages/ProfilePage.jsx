import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiPhone, FiCalendar, FiHash, FiCheckCircle, FiShield, FiMapPin, FiHome, FiAlertCircle, FiBriefcase, FiDollarSign, FiCreditCard, FiPackage, FiLock } from "react-icons/fi";
import { useAuth } from '../components/AuthContext';
import userApi from '../services/userApi';

const InfoCard = ({ label, value, icon: Icon, color = "blue", monospace = false }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
    gray: "bg-gray-50 border-gray-200 text-gray-700",
    red: "bg-red-50 border-red-200 text-red-700"
  };

  return (
    <div className={`p-3 rounded-lg border ${colorClasses[color]} hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start gap-2">
        <div className="p-1.5 bg-white rounded-md shadow-sm mt-0.5">
          <Icon size={16} className={`${colorClasses[color].split(' ')[2]}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">
            {label}
          </p>
          <p className={`text-sm font-semibold text-gray-900 break-words ${monospace ? 'font-mono' : ''}`}>
            {value || 'Not specified'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('basic');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!user || !user.id) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const data = await userApi.getUserById(user.id);
        setProfileData(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const getInitials = (firstName) => {
    const first = firstName ? firstName.charAt(0).toUpperCase() : '';
    return first || 'U';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FiUser },
    { id: 'personal', label: 'Personal', icon: FiUser },
    { id: 'address', label: 'Address', icon: FiHome },
    { id: 'employment', label: 'Employment', icon: FiBriefcase },
    { id: 'financial', label: 'Financial', icon: FiDollarSign }
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-auto px-4 sm:px-6 py-4 pb-20 md:pb-4">

          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading profile...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Profile</h2>
                  <p className="text-gray-600">{error}</p>
                </div>
              </div>
            ) : profileData ? (
              <>
                {/* Profile Header Card */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 mb-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Profile Picture */}
                    <div className="relative">
                      <div className="w-28 h-28 md:w-32 md:h-32 relative group">
                        {profileData.profile_image ? (
                          <img
                            src={profileData.profile_image}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl transition-all duration-200 group-hover:opacity-75"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-blue-600 text-3xl md:text-4xl font-bold shadow-xl border-4 border-white transition-all duration-200 group-hover:opacity-75">
                            {getInitials(profileData.first_name)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 text-center md:text-left text-white">
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        {profileData.first_name}
                      </h1>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium">
                          <FiShield size={14} />
                          {profileData.role}
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium">
                          <FiCheckCircle size={14} />
                          {profileData.status}
                        </div>
                      </div>
                      <p className="text-blue-100 text-sm">@{profileData.username}</p>
                      {profileData.employee_id && (
                        <p className="text-blue-100 text-sm mt-1">Employee ID: {profileData.employee_id}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tabs Navigation */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
                  <div className="flex overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 whitespace-nowrap border-b-2 ${activeTab === tab.id
                            ? 'border-blue-500 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                          <Icon size={18} />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  {activeTab === 'basic' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <InfoCard label="FIRST NAME" value={profileData.first_name} icon={FiUser} color="green" />
                      <InfoCard label="EMAIL" value={profileData.email} icon={FiMail} color="purple" />
                      <InfoCard label="PHONE" value={profileData.phone} icon={FiPhone} color="orange" />
                      <InfoCard label="USERNAME" value={profileData.username} icon={FiUser} color="blue" />
                      <InfoCard label="ROLE" value={profileData.role} icon={FiShield} color="green" />
                      <InfoCard label="STATUS" value={profileData.status} icon={FiCheckCircle} color="blue" />
                      <InfoCard label="JOINING DATE" value={formatDate(profileData.created_at)} icon={FiCalendar} color="purple" />
                    </div>
                  )}

                  {activeTab === 'personal' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <InfoCard label="DATE OF BIRTH" value={formatDate(profileData.date_of_birth)} icon={FiCalendar} color="purple" />
                      <InfoCard label="GENDER" value={profileData.gender || 'N/A'} icon={FiUser} color="blue" />
                      <InfoCard label="BLOOD GROUP" value={profileData.blood_group || 'N/A'} icon={FiAlertCircle} color="red" />
                      <InfoCard label="MARITAL STATUS" value={profileData.marital_status || 'N/A'} icon={FiUser} color="green" />
                      <InfoCard label="NATIONALITY" value={profileData.nationality || 'N/A'} icon={FiMapPin} color="blue" />
                      <InfoCard label="AADHAR NUMBER" value={profileData.aadhar_number || 'N/A'} icon={FiHash} color="gray" monospace={true} />
                      <InfoCard label="PAN NUMBER" value={profileData.pan_number || 'N/A'} icon={FiHash} color="gray" monospace={true} />
                      <InfoCard label="EMERGENCY CONTACT" value={profileData.emergency_contact_name || 'N/A'} icon={FiUser} color="orange" />
                      <InfoCard label="EMERGENCY PHONE" value={profileData.emergency_contact_phone || 'N/A'} icon={FiPhone} color="orange" />
                      <InfoCard label="EMERGENCY RELATION" value={profileData.emergency_contact_relation || 'N/A'} icon={FiUser} color="orange" />
                    </div>
                  )}

                  {activeTab === 'address' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <InfoCard label="CURRENT ADDRESS" value={profileData.current_address || 'N/A'} icon={FiHome} color="green" />
                      </div>
                      <div className="md:col-span-2">
                        <InfoCard label="PERMANENT ADDRESS" value={profileData.permanent_address || 'N/A'} icon={FiHome} color="blue" />
                      </div>
                      <InfoCard label="CITY" value={profileData.city || 'N/A'} icon={FiMapPin} color="purple" />
                      <InfoCard label="STATE" value={profileData.state || 'N/A'} icon={FiMapPin} color="orange" />
                      <InfoCard label="PINCODE" value={profileData.pincode || 'N/A'} icon={FiHash} color="gray" monospace={true} />
                    </div>
                  )}

                  {activeTab === 'employment' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <InfoCard label="EMPLOYEE ID" value={profileData.employee_id || 'N/A'} icon={FiHash} color="blue" monospace={true} />
                        <InfoCard label="DEPARTMENT" value={profileData.department || 'N/A'} icon={FiBriefcase} color="purple" />
                        <InfoCard label="DESIGNATION" value={profileData.designation || 'N/A'} icon={FiBriefcase} color="green" />
                        <InfoCard label="DATE OF JOINING" value={formatDate(profileData.date_of_joining)} icon={FiCalendar} color="blue" />
                        <InfoCard label="EMPLOYMENT TYPE" value={profileData.employment_type || 'N/A'} icon={FiBriefcase} color="orange" />
                        <InfoCard label="WORK LOCATION" value={profileData.work_location || 'N/A'} icon={FiMapPin} color="green" />
                      </div>
                    </div>
                  )}

                  {activeTab === 'financial' && (
                    <div className="space-y-6">
                      {/* Salary Section */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <FiDollarSign className="text-green-500" />
                          Salary & Benefits
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <InfoCard label="BASIC SALARY" value={profileData.basic_salary ? `₹${profileData.basic_salary}` : 'N/A'} icon={FiDollarSign} color="green" />
                          <InfoCard label="HRA" value={profileData.hra ? `₹${profileData.hra}` : 'N/A'} icon={FiDollarSign} color="blue" />
                          <InfoCard label="OTHER ALLOWANCES" value={profileData.other_allowances ? `₹${profileData.other_allowances}` : 'N/A'} icon={FiDollarSign} color="purple" />
                          <InfoCard label="PF NUMBER" value={profileData.pf_number || 'N/A'} icon={FiHash} color="gray" monospace={true} />
                          <InfoCard label="ESI NUMBER" value={profileData.esi_number || 'N/A'} icon={FiHash} color="gray" monospace={true} />
                          <InfoCard label="UAN NUMBER" value={profileData.uan_number || 'N/A'} icon={FiHash} color="gray" monospace={true} />
                        </div>
                      </div>

                      {/* Bank Details Section */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <FiCreditCard className="text-blue-500" />
                          Bank Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <InfoCard label="BANK NAME" value={profileData.bank_name || 'N/A'} icon={FiCreditCard} color="green" />
                          <InfoCard label="ACCOUNT NUMBER" value={profileData.bank_account_number || 'N/A'} icon={FiHash} color="gray" monospace={true} />
                          <InfoCard label="IFSC CODE" value={profileData.bank_ifsc_code || 'N/A'} icon={FiHash} color="blue" monospace={true} />
                          <InfoCard label="BRANCH" value={profileData.bank_branch || 'N/A'} icon={FiMapPin} color="purple" />
                          <InfoCard label="ACCOUNT HOLDER NAME" value={profileData.bank_account_holder_name || 'N/A'} icon={FiUser} color="green" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <p className="text-gray-600">No profile data available</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
