import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const SassSettings = () => {
  useEffect(() => {
    console.log('SassSettings component mounted');
    return () => console.log('SassSettings component unmounted');
  }, []);

  const [saas, setSaas] = useState({
    allowRegistration: true,
    trialPeriod: '14',
    maxUsers: '10',
    enableBilling: true
  });

  const handleToggle = (name) => {
    setSaas(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaas(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/sass-settings" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">SaaS Settings</h6>
              </div>
              <form>
                <div className="row">
                  <div className="col-12 mb-3">
                    <div className="form-check form-switch mb-3">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={saas.allowRegistration}
                        onChange={() => handleToggle('allowRegistration')}
                      />
                      <label className="form-check-label">Allow User Registration</label>
                    </div>
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={saas.enableBilling}
                        onChange={() => handleToggle('enableBilling')}
                      />
                      <label className="form-check-label">Enable Billing</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Trial Period (days)</label>
                    <input type="number" className="form-control" name="trialPeriod" value={saas.trialPeriod} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Max Users per Account</label>
                    <input type="number" className="form-control" name="maxUsers" value={saas.maxUsers} onChange={handleChange} />
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

export default SassSettings;
