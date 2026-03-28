import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const CustomJs = () => {
  useEffect(() => {
    console.log('CustomJs component mounted');
    return () => console.log('CustomJs component unmounted');
  }, []);

  const [js, setJs] = useState('// Add your custom JavaScript here\n\n');

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/custom-js" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Custom JavaScript</h6>
              </div>
              <form>
                <div className="mb-3">
                  <label className="form-label">Custom JavaScript Code</label>
                  <textarea 
                    className="form-control font-monospace" 
                    value={js} 
                    onChange={(e) => setJs(e.target.value)} 
                    rows="15"
                    style={{ fontSize: '14px' }}
                  />
                  <small className="text-muted">Add custom JavaScript for additional functionality</small>
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

export default CustomJs;
