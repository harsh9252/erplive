import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { toast } from 'react-toastify';

const NotificationsSettings = () => {
  // Debug log
  useEffect(() => {
    console.log('NotificationsSettings component mounted');
    return () => console.log('NotificationsSettings component unmounted');
  }, []);

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    invoiceReminders: true,
    paymentAlerts: true,
    systemUpdates: false
  });

  const handleToggle = (name) => {
    setNotifications(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSave = () => {
    toast.success('Notification settings saved successfully!');
    console.log('Saved notifications:', notifications);
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-12">
          <div className="row settings-wrapper d-flex">
            <div className="col-xl-3 col-lg-4">
              <SettingsSidebar activeItem="/notifications-settings" />
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="mb-3">
                <div className="pb-3 border-bottom mb-3">
                  <h6 className="mb-0">Notification Settings</h6>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                    <i className="isax isax-notification fs-14"></i>
                  </span>
                  <h6 className="fs-16 fw-semibold mb-0">Notification Preferences</h6>
                </div>
                
                <div className="border-bottom mb-3 pb-3">
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div>
                        <h6 className="mb-1">Email Notifications</h6>
                        <p className="text-muted fs-13 mb-0">Receive notifications via email</p>
                      </div>
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          checked={notifications.emailNotifications}
                          onChange={() => handleToggle('emailNotifications')}
                          id="emailNotifications"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div>
                        <h6 className="mb-1">SMS Notifications</h6>
                        <p className="text-muted fs-13 mb-0">Receive notifications via SMS</p>
                      </div>
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          checked={notifications.smsNotifications}
                          onChange={() => handleToggle('smsNotifications')}
                          id="smsNotifications"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div>
                        <h6 className="mb-1">Push Notifications</h6>
                        <p className="text-muted fs-13 mb-0">Receive push notifications in browser</p>
                      </div>
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          checked={notifications.pushNotifications}
                          onChange={() => handleToggle('pushNotifications')}
                          id="pushNotifications"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-bottom mb-3 pb-3">
                  <div className="d-flex align-items-center mb-3">
                    <span className="bg-dark avatar avatar-sm me-2 flex-shrink-0">
                      <i className="isax isax-document-text fs-14"></i>
                    </span>
                    <h6 className="fs-16 fw-semibold mb-0">Activity Notifications</h6>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div>
                        <h6 className="mb-1">Invoice Reminders</h6>
                        <p className="text-muted fs-13 mb-0">Get reminders for pending invoices</p>
                      </div>
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          checked={notifications.invoiceReminders}
                          onChange={() => handleToggle('invoiceReminders')}
                          id="invoiceReminders"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div>
                        <h6 className="mb-1">Payment Alerts</h6>
                        <p className="text-muted fs-13 mb-0">Receive alerts for payment activities</p>
                      </div>
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          checked={notifications.paymentAlerts}
                          onChange={() => handleToggle('paymentAlerts')}
                          id="paymentAlerts"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div>
                        <h6 className="mb-1">System Updates</h6>
                        <p className="text-muted fs-13 mb-0">Get notified about system updates</p>
                      </div>
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          checked={notifications.systemUpdates}
                          onChange={() => handleToggle('systemUpdates')}
                          id="systemUpdates"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <button type="button" className="btn btn-outline-white">
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsSettings;
