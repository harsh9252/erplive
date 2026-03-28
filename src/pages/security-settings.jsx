import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { toast } from 'react-toastify';

const SecuritySettings = () => {
  // Debug log
  useEffect(() => {
    console.log('SecuritySettings component mounted');
    return () => console.log('SecuritySettings component unmounted');
  }, []);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    toast.success('Security settings updated successfully!');
    console.log('Updated security:', formData);
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-12">
          <div className="row settings-wrapper d-flex">
            <div className="col-xl-3 col-lg-4">
              <SettingsSidebar activeItem="/security-settings" />
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="mb-3">
                <div className="pb-3 border-bottom mb-3">
                  <h6 className="mb-0">Security Settings</h6>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                    <i className="isax isax-shield-tick fs-14"></i>
                  </span>
                  <h6 className="fs-16 fw-semibold mb-0">Change Password</h6>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="border-bottom mb-3 pb-3">
                    <div className="row gx-3">
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Current Password <span className="text-danger">*</span>
                          </label>
                          <input 
                            type="password" 
                            className="form-control" 
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            placeholder="Enter current password"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            New Password <span className="text-danger">*</span>
                          </label>
                          <input 
                            type="password" 
                            className="form-control" 
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder="Enter new password"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Confirm Password <span className="text-danger">*</span>
                          </label>
                          <input 
                            type="password" 
                            className="form-control" 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-bottom mb-3 pb-3">
                    <div className="d-flex align-items-center mb-3">
                      <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                        <i className="isax isax-security fs-14"></i>
                      </span>
                      <h6 className="fs-16 fw-semibold mb-0">Two-Factor Authentication</h6>
                    </div>
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="twoFactorAuth"
                        checked={formData.twoFactorAuth}
                        onChange={handleInputChange}
                        id="twoFactorAuth"
                      />
                      <label className="form-check-label" htmlFor="twoFactorAuth">
                        Enable Two-Factor Authentication
                      </label>
                    </div>
                    <p className="text-muted fs-13 mt-2">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                  </div>

                  <div className="d-flex align-items-center justify-content-between">
                    <button type="button" className="btn btn-outline-white">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecuritySettings;
