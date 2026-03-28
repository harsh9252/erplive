import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const ClearCache = () => {
  useEffect(() => {
    console.log('ClearCache component mounted');
    return () => console.log('ClearCache component unmounted');
  }, []);

  const [clearing, setClearing] = useState(false);

  const handleClearCache = () => {
    setClearing(true);
    setTimeout(() => {
      setClearing(false);
      alert('Cache cleared successfully!');
    }, 1500);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/clear-cache" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Clear Cache</h6>
              </div>
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-3">Application Cache</h6>
                  <p className="text-muted mb-3">Clear application cache to improve performance and resolve issues.</p>
                  <button 
                    className="btn btn-danger" 
                    onClick={handleClearCache}
                    disabled={clearing}
                  >
                    {clearing ? 'Clearing...' : 'Clear All Cache'}
                  </button>
                  <hr className="my-4" />
                  <div className="alert alert-info">
                    <i className="isax isax-info-circle me-2"></i>
                    Clearing cache will remove temporary files and may improve application performance.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearCache;
