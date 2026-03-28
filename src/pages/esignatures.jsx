import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const Esignatures = () => {
  useEffect(() => {
    console.log('Esignatures component mounted');
    return () => console.log('Esignatures component unmounted');
  }, []);

  const [signature, setSignature] = useState({
    enableSignature: false,
    signatureName: '',
    signatureTitle: ''
  });

  const handleToggle = () => {
    setSignature(prev => ({ ...prev, enableSignature: !prev.enableSignature }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignature(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/esignatures" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">eSignatures</h6>
              </div>
              <form>
                <div className="row">
                  <div className="col-12 mb-3">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={signature.enableSignature}
                        onChange={handleToggle}
                      />
                      <label className="form-check-label">Enable Digital Signature</label>
                    </div>
                  </div>
                  {signature.enableSignature && (
                    <>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Signature Name</label>
                        <input type="text" className="form-control" name="signatureName" value={signature.signatureName} onChange={handleChange} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Signature Title</label>
                        <input type="text" className="form-control" name="signatureTitle" value={signature.signatureTitle} onChange={handleChange} />
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

export default Esignatures;
