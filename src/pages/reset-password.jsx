import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../services/authService';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: '',
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!token) {
      toast.error('Invalid or missing reset token');
      return false;
    }

    if (!formData.new_password.trim()) {
      newErrors.new_password = 'New password is required';
    } else if (formData.new_password.length < 8) {
      newErrors.new_password = 'Password must be at least 8 characters';
    }

    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = 'Confirm password is required';
    } else if (formData.new_password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPassword(token, formData.new_password);
      toast.success(response.message || 'Password reset successfully');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Reset error:', error);
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-wrapper auth-bg">
      <div className="container-fuild">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
            <div className="col-lg-4 mx-auto">
              <form
                onSubmit={handleSubmit}
                className="d-flex justify-content-center align-items-center"
              >
                <div className="d-flex flex-column justify-content-lg-center p-4 p-lg-0 pb-0 flex-fill">
                  <div className="mx-auto mb-5 text-center">
                    <img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />
                  </div>
                  <div className="card border-0 p-lg-3 shadow-lg">
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <h5 className="mb-2">Reset Password</h5>
                        <p className="mb-0">Enter your new password</p>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          New Password <span className="text-danger">*</span>
                        </label>
                        <div className="pass-group input-group">
                          <span className="input-group-text border-end-0">
                            <i className="isax isax-lock"></i>
                          </span>
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            name="new_password"
                            value={formData.new_password}
                            onChange={handleInputChange}
                            className={`pass-inputs form-control border-start-0 ps-0 ${
                              errors.new_password ? 'is-invalid' : ''
                            }`}
                            placeholder="Enter new password"
                          />
                          <span
                            className={`isax toggle-password ${
                              showNewPassword ? 'isax-eye' : 'isax-eye-slash'
                            }`}
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            style={{ cursor: 'pointer' }}
                          ></span>
                        </div>
                        {errors.new_password && (
                          <div className="invalid-feedback d-block">{errors.new_password}</div>
                        )}
                        <p className="text-muted small mt-2">
                          Use 8 or more characters with a mix of letters, numbers & symbols.
                        </p>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Confirm Password <span className="text-danger">*</span>
                        </label>
                        <div className="pass-group input-group">
                          <span className="input-group-text border-end-0">
                            <i className="isax isax-lock"></i>
                          </span>
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleInputChange}
                            className={`pass-inputs form-control border-start-0 ps-0 ${
                              errors.confirm_password ? 'is-invalid' : ''
                            }`}
                            placeholder="Confirm new password"
                          />
                          <span
                            className={`isax toggle-password ${
                              showConfirmPassword ? 'isax-eye' : 'isax-eye-slash'
                            }`}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{ cursor: 'pointer' }}
                          ></span>
                        </div>
                        {errors.confirm_password && (
                          <div className="invalid-feedback d-block">{errors.confirm_password}</div>
                        )}
                      </div>

                      <div className="mb-3">
                        <button
                          type="submit"
                          className="btn bg-primary-gradient text-white w-100"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                      </div>

                      <div className="text-center">
                        <Link to="/login" className="hover-a">
                          Back to Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
