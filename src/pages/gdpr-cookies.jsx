import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const GdprCookies = () => {
  useEffect(() => {
    console.log('GdprCookies component mounted');
    return () => console.log('GdprCookies component unmounted');
  }, []);

  const [gdpr, setGdpr] = useState({
    enableCookieConsent: true,
    cookieMessage: 'We use cookies to improve your experience on our website.',
    acceptButtonText: 'Accept',
    declineButtonText: 'Decline',
    privacyPolicyLink: '/privacy-policy'
  });

  const handleToggle = () => {
    setGdpr(prev => ({ ...prev, enableCookieConsent: !prev.enableCookieConsent }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGdpr(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/gdpr-cookies" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">GDPR & Cookies</h6>
              </div>
              <form>
                <div className="row">
                  <div className="col-12 mb-3">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={gdpr.enableCookieConsent}
                        onChange={handleToggle}
                      />
                      <label className="form-check-label">Enable Cookie Consent Banner</label>
                    </div>
                  </div>
                  {gdpr.enableCookieConsent && (
                    <>
                      <div className="col-12 mb-3">
                        <label className="form-label">Cookie Message</label>
                        <textarea className="form-control" name="cookieMessage" value={gdpr.cookieMessage} onChange={handleChange} rows="3" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Accept Button Text</label>
                        <input type="text" className="form-control" name="acceptButtonText" value={gdpr.acceptButtonText} onChange={handleChange} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Decline Button Text</label>
                        <input type="text" className="form-control" name="declineButtonText" value={gdpr.declineButtonText} onChange={handleChange} />
                      </div>
                      <div className="col-12 mb-3">
                        <label className="form-label">Privacy Policy Link</label>
                        <input type="text" className="form-control" name="privacyPolicyLink" value={gdpr.privacyPolicyLink} onChange={handleChange} />
                      </div>
                    </>
                  )}
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

export default GdprCookies;
