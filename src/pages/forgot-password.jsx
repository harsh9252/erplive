import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/authService';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    const nextValue = e.target.value;
    if (/[^a-zA-Z0-9@._-]/.test(nextValue)) {
      setError('Special symbols are not allowed in email.');
      return;
    }
    setEmail(nextValue);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await forgotPassword(email);
      setIsSubmitted(true);
      toast.success(response.message);
    } catch (error) {
      console.error('Error:', error);
      // Check if route not found
      if (error.message && error.message.includes('Route not found')) {
        toast.error('Forgot password feature is not available yet. Please contact support.');
      } else {
        toast.error(error.message || 'Failed to send reset link');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="main-wrapper auth-bg">
        <div className="container-fuild">
          <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
            <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
              <div className="col-lg-4 mx-auto">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="d-flex flex-column justify-content-lg-center p-4 p-lg-0 pb-0 flex-fill">
                    <div className="mx-auto mb-5 text-center">
                      <img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />
                    </div>
                    <div className="card border-0 p-lg-3 shadow-lg">
                      <div className="card-body text-center">
                        <div className="mb-4">
                          <i
                            className="isax isax-tick-circle text-success"
                            style={{ fontSize: '48px' }}
                          ></i>
                        </div>
                        <h5 className="mb-2">Check Your Email</h5>
                        <p className="mb-4">We've sent a password reset link to {email}</p>

                        <Link to="/login" className="btn btn-primary w-100">
                          Back to Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper auth-bg">
      <div className="container-fuild">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
            <div className="col-lg-4 mx-auto">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="d-flex justify-content-center align-items-center"
              >
                <div className="d-flex flex-column justify-content-lg-center p-4 p-lg-0 pb-0 flex-fill">
                  <div className="card border-0 p-lg-3 shadow-lg rounded-2 mt-4">
                    <div className="card-body">
                      <div className="mx-auto  text-center">
                        <img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />
                      </div>
                      <div className="text-center mb-3">
                        <h5 className="mb-2">Forgot Password</h5>
                        <p className="mb-0">Enter your email to reset your password</p>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <div className="input-group">
                          <span className="input-group-text border-end-0">
                            <i className="isax isax-sms-notification"></i>
                          </span>
                          <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={`form-control border-start-0 ps-0 ${error ? 'is-invalid' : ''}`}
                            placeholder="Enter Email Address"
                            required
                          />
                        </div>
                        {error ? <div className="invalid-feedback d-block">{error}</div> : null}
                      </div>

                      <div className="mb-3">
                        <button
                          type="submit"
                          className="btn bg-primary-gradient text-white w-100"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPassword;
