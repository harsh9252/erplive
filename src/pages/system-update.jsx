import { useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const SystemUpdate = () => {
  useEffect(() => {
    console.log('SystemUpdate component mounted');
    return () => console.log('SystemUpdate component unmounted');
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/system-update" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">System Update</h6>
              </div>
              <div className="card mb-3">
                <div className="card-body">
                  <h6 className="mb-3">Current Version</h6>
                  <p className="mb-3">Version: <span className="badge bg-primary">1.3.8</span></p>
                  <hr />
                  <h6 className="mb-3">Check for Updates</h6>
                  <p className="text-muted mb-3">Check if a new version is available for your system.</p>
                  <button className="btn btn-primary">Check for Updates</button>
                </div>
              </div>
              <div className="alert alert-info">
                <i className="isax isax-info-circle me-2"></i>
                Your system is up to date. Last checked: 2025-03-02
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemUpdate;
