import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowLeft, FiLogIn, FiKey, FiSettings, FiTool, FiBarChart2, FiShield, FiClock, FiUsers } from 'react-icons/fi';
import { useAuth } from '../components/AuthContext';
import apiService from '../services/api';
import logo from '../assets/logo-big.png';

const LoginSignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formType, setFormType] = useState('login'); // 'login', 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState('');
  const [formData, setFormData] = useState({
    // Login
    identifier: '',
    password: '',
    // Forgot Password
    resetEmail: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formType === 'login') {
      if (!formData.identifier.trim()) {
        newErrors.identifier = 'Email is required';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    } else if (formType === 'forgot') {
      if (!formData.resetEmail.trim()) {
        newErrors.resetEmail = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.resetEmail)) {
        newErrors.resetEmail = 'Email is invalid';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (formType === 'login') {
        const identifier = formData.identifier.trim();
        const password = formData.password;

        try {
          // Call the real login API
          const response = await apiService.login({
            email: identifier,
            password: password
          });

          if (response.token && response.user) {
            // Transform user data to match AuthContext expectations
            const userData = {
              id: response.user.id,
              firstName: response.user.first_name || '',
              email: response.user.email,
              username: response.user.username,
              role: response.user.role,
              employment_type: response.user.employment_type || 'full-time',
              isTempPassword: response.user.is_temp_password || false
            };

            // Use AuthContext login method
            await login(response.token, userData);

            setMessage('Login successful! Redirecting...');
            setTimeout(() => {
              navigate('/dashboard');
            }, 1500);
          } else {
            setErrors({ general: 'Login failed. Please try again.' });
          }
        } catch (error) {
          const errorMessage = error.message || 'Invalid credentials. Please check your email and password.';
          setErrors({ general: errorMessage });
        }
      } else if (formType === 'forgot') {
        // Call the real forgot password API
        try {
          await apiService.forgotPassword({ email: formData.resetEmail });
          setMessage('Password reset link sent to your email!');
          // Reset form after success
          setTimeout(() => {
            setFormType('login');
            resetForm();
          }, 2000);
        } catch (error) {
          setErrors({ general: error.message || 'Failed to send reset link. Please try again.' });
        }
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      identifier: '',
      password: '',
      resetEmail: ''
    });
    setErrors({});
    setMessage('');
  };

  // Progressive dots animation effect
  React.useEffect(() => {
    if (loading) {
      setDots('.');
      const interval = setInterval(() => {
        setDots(prev => {
          if (prev === '.') return '..';
          if (prev === '..') return '...';
          if (prev === '...') return '....';
          return '.';
        });
      }, 300);

      return () => clearInterval(interval);
    } else {
      setDots('');
    }
  }, [loading]);

  return (
    <div className="min-h-screen flex">
      {/* Construction Building Background Image */}
      <div className="fixed inset-0">
        {/* Construction Building Background with Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm opacity-70"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`
          }}
        />


        {/* Light Blue Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/70 to-purple-50/80"></div>
        {/* Subtle Eleva8 Theme Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-indigo-100/15 to-purple-200/20"></div>
        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%)
            `,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full min-h-screen">
        {/* Left Section - Modern Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12">
          <div className="max-w-md text-center">
            {/* Modern Logo with Animation */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent mb-2">HRM Platform</h1>
              <p className="text-gray-700 font-medium text-base">Streamline your IT workflows with Workify</p>

            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-3 max-w-sm">
              <div className="bg-blue-100/60 backdrop-blur-sm rounded-xl p-4 text-center hover:shadow-2xl hover:bg-blue-200/70 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-blue-300/50">
                <FiSettings className="mx-auto mb-2 text-blue-700 group-hover:text-blue-800 transition-colors" size={24} />
                <p className="text-xs font-medium text-gray-700">User Management</p>
              </div>
              <div className="bg-purple-100/60 backdrop-blur-sm rounded-xl p-4 text-center hover:shadow-2xl hover:bg-purple-200/70 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-purple-300/50">
                <FiTool className="mx-auto mb-2 text-purple-700 group-hover:text-purple-800 transition-colors" size={24} />
                <p className="text-xs font-medium text-gray-700">Leave Management</p>
              </div>
              <div className="bg-blue-100/60 backdrop-blur-sm rounded-xl p-4 text-center hover:shadow-2xl hover:bg-blue-200/70 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-blue-300/50">
                <FiBarChart2 className="mx-auto mb-2 text-blue-700 group-hover:text-blue-800 transition-colors" size={24} />
                <p className="text-xs font-medium text-gray-700">Analytics</p>
              </div>
              <div className="bg-purple-100/60 backdrop-blur-sm rounded-xl p-4 text-center hover:shadow-2xl hover:bg-purple-200/70 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-purple-300/50">
                <FiShield className="mx-auto mb-2 text-purple-700 group-hover:text-purple-800 transition-colors" size={24} />
                <p className="text-xs font-medium text-gray-700">Attendance Management</p>
              </div>
              <div className="bg-blue-100/60 backdrop-blur-sm rounded-xl p-4 text-center hover:shadow-2xl hover:bg-blue-200/70 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-blue-300/50">
                <FiClock className="mx-auto mb-2 text-blue-700 group-hover:text-blue-800 transition-colors" size={24} />
                <p className="text-xs font-medium text-gray-700">Employee Management</p>
              </div>
              <div className="bg-purple-100/60 backdrop-blur-sm rounded-xl p-4 text-center hover:shadow-2xl hover:bg-purple-200/70 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-purple-300/50">
                <FiUsers className="mx-auto mb-2 text-purple-700 group-hover:text-purple-800 transition-colors" size={24} />
                <p className="text-xs font-medium text-gray-700">Team</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Modern Scrollable Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="text-center mb-6">
                {formType === 'forgot' && (
                  <button
                    onClick={() => {
                      setFormType('login');
                      resetForm();
                    }}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors group"
                  >
                    <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                  </button>
                )}

                {/* Mobile Logo - shown only on smaller screens */}
                <div className="lg:hidden mb-6">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">Workify Platform</h1>
                </div>

                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent mb-3">
                  {formType === 'login' && 'Welcome'}
                  {formType === 'forgot' && 'Reset Password'}
                </h2>
                <p className="text-gray-700 font-medium">
                  {formType === 'login' && 'Sign in to your Workify account'}
                  {formType === 'forgot' && 'Enter your email to reset password'}
                </p>
              </div>

              {/* Success/Error Messages */}
              {message && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">{message}</p>
                </div>
              )}

              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Forms */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {formType === 'login' && (
                  <>
                    {/* Modern Login Form */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          name="identifier"
                          value={formData.identifier}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-transparent transition-all duration-300 ${errors.identifier ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                          placeholder="Enter your email address"
                        />
                      </div>
                      {errors.identifier && (
                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.identifier}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-transparent transition-all duration-300 ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.password}</p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setFormType('forgot');
                          resetForm();
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>


                  </>
                )}


                {formType === 'forgot' && (
                  <>
                    {/* Forgot Password Form */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          name="resetEmail"
                          value={formData.resetEmail}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.resetEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                          placeholder="Enter your email address"
                        />
                      </div>
                      {errors.resetEmail && (
                        <p className="mt-1 text-sm text-red-600">{errors.resetEmail}</p>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FiKey className="text-blue-600 mt-0.5 flex-shrink-0" size={16} />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Password Reset</p>
                          <p>Enter your email address and we'll send you a link to reset your password.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Modern Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-700 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-800 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 focus:ring-offset-2 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <FiLogIn size={20} />
                      <span>Signing in<span className="text-sm font-light">{dots}</span></span>
                    </>
                  ) : (
                    <>
                      {formType === 'login' && <><FiLogIn size={20} /> <span>Sign in</span></>}
                      {formType === 'forgot' && <><FiKey size={20} /> <span>Send Reset Link</span></>}
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginSignupPage;
