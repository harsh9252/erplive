import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const LanguageSettings = () => {
  useEffect(() => {
    console.log('LanguageSettings component mounted');
    return () => console.log('LanguageSettings component unmounted');
  }, []);

  const [language, setLanguage] = useState('en');

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/language-settings" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Language Settings</h6>
              </div>
              <form>
                <div className="mb-3">
                  <label className="form-label">Select Language</label>
                  <select className="form-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
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

export default LanguageSettings;
