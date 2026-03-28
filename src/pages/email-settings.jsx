import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const EmailSettings = () => {
  useEffect(() => {
    console.log('EmailSettings component mounted');
    return () => console.log('EmailSettings component unmounted');
  }, []);

  const [email, setEmail] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: '',
    fromName: '',
    encryption: 'tls'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/email-settings" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Email Settings</h6>
              </div>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">SMTP Host</label>
                    <input type="text" className="form-control" name="smtpHost" value={email.smtpHost} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">SMTP Port</label>
                    <input type="text" className="form-control" name="smtpPort" value={email.smtpPort} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">SMTP Username</label>
                    <input type="text" className="form-control" name="smtpUsername" value={email.smtpUsername} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">SMTP Password</label>
                    <input type="password" className="form-control" name="smtpPassword" value={email.smtpPassword} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">From Email</label>
                    <input type="email" className="form-control" name="fromEmail" value={email.fromEmail} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">From Name</label>
                    <input type="text" className="form-control" name="fromName" value={email.fromName} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Encryption</label>
                    <select className="form-select" name="encryption" value={email.encryption} onChange={handleChange}>
                      <option value="tls">TLS</option>
                      <option value="ssl">SSL</option>
                      <option value="none">None</option>
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

export default EmailSettings;
