import { useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const Storage = () => {
  useEffect(() => {
    console.log('Storage component mounted');
    return () => console.log('Storage component unmounted');
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/storage" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Storage Settings</h6>
              </div>
              <div className="card mb-3">
                <div className="card-body">
                  <h6 className="mb-3">Storage Usage</h6>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Used Storage</span>
                      <span className="fw-bold">2.5 GB / 10 GB</span>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <div className="text-center p-3 border rounded">
                        <i className="isax isax-document fs-24 mb-2"></i>
                        <p className="mb-1 fw-bold">1.2 GB</p>
                        <small className="text-muted">Documents</small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-center p-3 border rounded">
                        <i className="isax isax-image fs-24 mb-2"></i>
                        <p className="mb-1 fw-bold">800 MB</p>
                        <small className="text-muted">Images</small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-center p-3 border rounded">
                        <i className="isax isax-folder fs-24 mb-2"></i>
                        <p className="mb-1 fw-bold">500 MB</p>
                        <small className="text-muted">Others</small>
                      </div>
                    </div>
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

export default Storage;
