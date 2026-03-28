import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const AuthenticationSettings = () => {
  useEffect(() => {
    console.log('AuthenticationSettings component mounted');
    return () => console.log('AuthenticationSettings component unmounted');
  }, []);

  const [auth, setAuth] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90'
  });

  const handleToggle = (name) => {
    setAuth(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/authentication-settings" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Authentication Settings</h6>
              </div>
              <form>
                <div className="row">
                  <div className="col-12 mb-3">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={auth.twoFactorAuth}
                        onChange={() => handleToggle('twoFactorAuth')}
                      />
                      <label className="form-check-label">Enable Two-Factor Authentication</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Session Timeout (minutes)</label>
                    <input type="number" className="form-control" name="sessionTimeout" value={auth.sessionTimeout} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password Expiry (days)</label>
                    <input type="number" className="form-control" name="passwordExpiry" value={auth.passwordExpiry} onChange={handleChange} />
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button type="button" className="btn btn-outline-white">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationSettings;
