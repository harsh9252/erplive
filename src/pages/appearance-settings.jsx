import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import SettingsSidebar from '../components/SettingsSidebar';

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    console.log('AppearanceSettings component mounted');
    return () => console.log('AppearanceSettings component unmounted');
  }, []);

  const [appearance, setAppearance] = useState({
    theme: theme || 'light',
    primaryColor: '#007bff',
    fontSize: 'medium'
  });

  // Keep local state in sync with global theme changes
  useEffect(() => {
    setAppearance(prev => ({ ...prev, theme: theme }));
  }, [theme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppearance(prev => ({ ...prev, [name]: value }));
    
    if (name === 'theme') {
      setTheme(value);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/appearance-settings" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Appearance Settings</h6>
              </div>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Theme</label>
                    <select className="form-select" name="theme" value={appearance.theme} onChange={handleChange}>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Font Size</label>
                    <select className="form-select" name="fontSize" value={appearance.fontSize} onChange={handleChange}>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
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

export default AppearanceSettings;
