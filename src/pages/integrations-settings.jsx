import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SettingsSidebar from '../components/SettingsSidebar';

const IntegrationsSettings = () => {
  // Debug log
  useEffect(() => {
    console.log('IntegrationsSettings component mounted');
    return () => console.log('IntegrationsSettings component unmounted');
  }, []);

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-12">
          <div className="row settings-wrapper d-flex">
            <div className="col-xl-3 col-lg-4">
              <SettingsSidebar activeItem="/integrations-settings" />
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="mb-3">
                <div className="pb-3 border-bottom mb-3">
                  <h6 className="mb-0">Integrations</h6>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card shadow-none">
                      <div className="card-body">
                        <div className="d-flex align-items-center border-0 mb-3 pb-0">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-lg p-2 bg-light rounded flex-shrink-0 me-2">
                              <i className="isax isax-sms fs-24"></i>
                            </span>
                            <p className="fw-medium text-gray-9">Gmail</p>
                          </div>
                        </div>
                        <p>Send invoices, payment reminders and customer communication directly</p>
                      </div>
                      <div className="card-footer bg-light d-flex align-items-center justify-content-between">
                        <Link className="btn btn-sm btn-dark rounded-2 p-1" to="#">
                          <i className="isax isax-trash"></i>
                        </Link>
                        <div className="form-check form-switch">
                          <input className="form-check-input m-0" type="checkbox" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card shadow-none">
                      <div className="card-body">
                        <div className="d-flex align-items-center border-0 mb-3 pb-0">
                          <div className="d-flex align-items-center">
                            <span className="avatar avatar-lg p-2 bg-light rounded flex-shrink-0 me-2">
                              <i className="isax isax-calendar fs-24"></i>
                            </span>
                            <p className="fw-medium text-gray-9">Google Calendar</p>
                          </div>
                        </div>
                        <p>Automatically schedule invoice due dates and set up payment follow-up</p>
                      </div>
                      <div className="card-footer bg-light d-flex align-items-center justify-content-between">
                        <Link className="btn btn-sm btn-dark rounded-2 p-1" to="#">
                          <i className="isax isax-trash"></i>
                        </Link>
                        <div className="form-check form-switch">
                          <input className="form-check-input m-0" type="checkbox" defaultChecked />
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
    </>
  );
};

export default IntegrationsSettings;
