import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerOwner } from '../services/authService';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirm_password: '',
  agreeTerms: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    let nextValue = type === 'checkbox' ? checked : value;

    if (name === 'phone' && typeof nextValue === 'string') {
      if (/\D/.test(nextValue)) {
        setErrors((prev) => ({ ...prev, phone: 'Only numbers are allowed in phone.' }));
        return;
      }
    } else if (name === 'email' && typeof nextValue === 'string') {
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

  const validate = () => {
    const nextErrors = {};

    if (formData.name.trim().length < 2) {
      nextErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      nextErrors.password =
        'Password must be 8+ characters with 1 uppercase letter, 1 number, and 1 special character.';
    }

    if (formData.password !== formData.confirm_password) {
      nextErrors.confirm_password = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      nextErrors.agreeTerms = 'You must agree to the terms.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Register Owner
      await registerOwner({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim() || undefined,
      });

      toast.success('Account created successfully! Please sign in.');

      // Step 2: Redirect to login
      navigate('/login', { replace: true });
    } catch (error) {
      toast.error(error?.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-wrapper auth-bg">
      <div className="w-100">
        <div className="container">
          <div className="row justify-content-center align-items-center m-0">
            <div className="col-lg-5 col-md-8 col-sm-10 mx-auto">
              <form onSubmit={handleSubmit} noValidate className="d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center p-4 p-lg-0 pb-0 flex-fill w-100">
                  <div className="card border-0 p-lg-3 shadow-lg rounded-2 mt-4">
                    <div className="card-body">
                      <div className="mx-auto text-center">
                        <img src="/assets/img/logo.svg" className="img-fluid" alt="Logo" />
                      </div>
                      <div className="text-center mb-3">
                        <h5 className="mb-2">Create Owner Account</h5>
                        <p className="mb-0">
                          Step 1 of onboarding. Create the owner account first, then sign in and set up the company.
                        </p>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          placeholder="Enter full name"
                          required
                        />
                        {errors.name ? <div className="invalid-feedback">{errors.name}</div> : null}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="Enter email address"
                          required
                        />
                        {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                          placeholder="Enter 10-digit mobile number"
                        />
                        {errors.phone ? <div className="invalid-feedback">{errors.phone}</div> : null}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Password <span className="text-danger">*</span>
                        </label>
                        <div className="pass-group input-group">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Create password"
                            required
                          />
                          <span
                            className={`isax toggle-password ${showPassword ? 'isax-eye' : 'isax-eye-slash'}`}
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{ cursor: 'pointer' }}
                          ></span>
                        </div>
                        {errors.password ? <div className="invalid-feedback d-block">{errors.password}</div> : null}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          Confirm Password <span className="text-danger">*</span>
                        </label>
                        <div className="pass-group input-group">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleInputChange}
                            className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
                            placeholder="Confirm password"
                            required
                          />
                          <span
                            className={`isax toggle-password ${showConfirmPassword ? 'isax-eye' : 'isax-eye-slash'}`}
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            style={{ cursor: 'pointer' }}
                          ></span>
                        </div>
                        {errors.confirm_password ? (
                          <div className="invalid-feedback d-block">{errors.confirm_password}</div>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <div className="form-check form-check-md mb-0">
                          <input
                            className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`}
                            id="agreeTerms"
                            name="agreeTerms"
                            type="checkbox"
                            checked={formData.agreeTerms}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="agreeTerms" className="form-check-label mt-0">
                            I agree to the terms and privacy policy
                          </label>
                          {errors.agreeTerms ? (
                            <div className="invalid-feedback d-block">{errors.agreeTerms}</div>
                          ) : null}
                        </div>
                      </div>

                      <div className="mb-1">
                        <button
                          type="submit"
                          className="btn bg-primary-gradient text-white w-100"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Creating Account...' : 'Create Owner Account'}
                        </button>
                      </div>

                      <div className="text-center mt-3">
                        <h6 className="fw-normal fs-14 text-dark mb-0">
                          Already have an account?
                          <Link to="/login" className="hover-a">
                            {' '}
                            Sign In
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

export default Register;
