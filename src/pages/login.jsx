import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail') || '';
    return {
      email: rememberedEmail,
      password: '',
      rememberMe: !!rememberedEmail,
    };
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let nextValue = type === 'checkbox' ? checked : value;

    if (name === 'email' && typeof nextValue === 'string') {
      if (/[^a-zA-Z0-9@._-]/.test(nextValue)) {
        setErrors((prev) => ({ ...prev, email: 'Special symbols are not allowed in email.' }));
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login(formData.email, formData.password, formData.rememberMe);
      const data = response?.data || response;
      const user = data.user || {};

      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      toast.success(`Welcome back, ${user?.name || 'User'}!`);
      
      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error(error?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="main-wrapper auth-bg">
      <div className="w-100">
        <div className="container">
          <div className="row justify-content-center align-items-center m-0">
            <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
              <form onSubmit={handleSubmit} noValidate className="d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center p-4 p-lg-0 pb-0 flex-fill w-100">

                  <div className="card border-0 p-lg-3 shadow-lg rounded-2 mt-4">
                    <div className="card-body">
                      <div className="mx-auto  text-center">
                        <img src="/assets/img/logo.svg" className="img-fluid " alt="Logo" />
                      </div>
                      <div className="text-center mb-3">
                        <h5 className="mb-2">Sign In</h5>
                        <p className="mb-0">Please enter below details to access the dashboard</p>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <div className="input-group">
                          <span className="input-group-text border-end-0">
                            <i className="isax isax-sms-notification"></i>
                          </span>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`form-control border-start-0 ps-0 ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Enter Email Address"
                            required
                          />
                        </div>
                        {errors.email ? <div className="invalid-feedback d-block">{errors.email}</div> : null}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="pass-group input-group">
                          <span className="input-group-text border-end-0">
                            <i className="isax isax-lock"></i>
                          </span>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pass-inputs form-control border-start-0 ps-0"
                            placeholder="****************"
                            required
                          />
                          <span
                            className={`isax toggle-password ${showPassword ? 'isax-eye' : 'isax-eye-slash'}`}
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: 'pointer' }}
                          ></span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center">
                          <div className="form-check form-check-md mb-0">
                            <input
                              className="form-check-input"
                              id="remember_me"
                              name="rememberMe"
                              type="checkbox"
                              checked={formData.rememberMe}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="remember_me" className="form-check-label mt-0">
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <div className="text-end">
                          <Link to="/forgot-password">Forgot Password</Link>
                        </div>
                      </div>

                      <div className="mb-1">
                        <button
                          type="submit"
                          className="btn bg-primary-gradient text-white w-100"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                      </div>

                      <div className="login-or">
                        <span className="span-or">Or</span>
                      </div>

                      {/* <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-center flex-wrap">
                          <div className="text-center me-2 flex-fill">
                            <button
                              type="button"
                              onClick={() => handleSocialLogin('facebook')}
                              className="br-10 p-1 btn btn-light d-flex align-items-center justify-content-center"
                            >
                              <img
                                className="img-fluid m-1"
                                src="/assets/img/icons/facebook-logo.svg"
                                alt="Facebook"
                              />
                            </button>
                          </div>
                          <div className="text-center me-2 flex-fill">
                            <button
                              type="button"
                              onClick={() => handleSocialLogin('google')}
                              className="br-10 p-1 btn btn-light d-flex align-items-center justify-content-center"
                            >
                              <img
                                className="img-fluid m-1"
                                src="/assets/img/icons/google-logo.svg"
                                alt="Google"
                              />
                            </button>
                          </div>
                        </div>
                      </div> */}

                      <div className="text-center">
                        <h6 className="fw-normal fs-14 text-dark mb-0">
                          Don't have an account yet?
                          <Link to="/register" className="hover-a">
                            {' '}
                            Register
                          </Link>
                        </h6>
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

export default Login;
