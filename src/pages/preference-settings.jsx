import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const PreferenceSettings = () => {
  useEffect(() => {
    console.log('PreferenceSettings component mounted');
    return () => console.log('PreferenceSettings component unmounted');
  }, []);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    autoBackup: false,
    darkMode: false,
    compactView: false
  });

  const handleToggle = (name) => {
    setPreferences(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/preference-settings" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Preference Settings</h6>
              </div>
              <div className="mb-3">
                <div className="form-check form-switch mb-3">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={preferences.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                  />
                  <label className="form-check-label">Email Notifications</label>
                </div>
                <div className="form-check form-switch mb-3">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={preferences.autoBackup}
                    onChange={() => handleToggle('autoBackup')}
                  />
                  <label className="form-check-label">Auto Backup</label>
                </div>
                <div className="form-check form-switch mb-3">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={preferences.darkMode}
                    onChange={() => handleToggle('darkMode')}
                  />
                  <label className="form-check-label">Dark Mode</label>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <button type="button" className="btn btn-outline-white">Cancel</button>
                <button type="button" className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferenceSettings;
