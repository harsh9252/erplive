import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { settingsService } from '../services/settingsService';
import { toast } from 'react-toastify';

const SystemSettings = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    app_name: 'Kanakku',
    default_currency: 'INR',
    default_date_format: 'DD/MM/YYYY',
    session_timeout_mins: 480,
    max_login_attempts: 5,
    e_invoice_threshold: 10000000,
    e_way_bill_threshold: 50000,
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSystemSettings();
  }, []);

  const fetchSystemSettings = async () => {
    setLoading(true);
    try {
      const response = await settingsService.getSystemSettings();
      if (response.success && response.data) {
        setFormData(prev => ({ ...prev, ...response.data }));
      }
    } catch (error) {
      console.error('Error fetching system settings:', error);
      // Fallback to localStorage if API fails or is not available
      const savedSettings = localStorage.getItem('systemSettings');
      if (savedSettings) {
        setFormData(JSON.parse(savedSettings));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('systemSettings', JSON.stringify(formData));
    setMessage('System settings saved successfully!');
    toast.success('System settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleReset = () => {
    fetchSystemSettings();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-12">
        <div className="row settings-wrapper d-flex">
          {/* Settings Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="system-settings" />
          </div>

          {/* Main Content */}
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3 pb-3 border-bottom">
              <h6 className="fw-bold mb-0">System Settings</h6>
              <p className="fs-13 text-muted mt-1">Configure global system parameters</p>
            </div>

            {message && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {message}
                <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  {/* Application Name */}
                  <div className="row align-items-center mb-3">
                    <div className="col-md-8">
                      <label className="form-label text-dark d-block mb-0">Application Name</label>
                      <span className="fs-13">Name of your application</span>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-end">
                        <input
                          type="text"
                          className="form-control"
                          name="app_name"
                          value={formData.app_name}
                          onChange={handleInputChange}
                          placeholder="App Name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Default Currency */}
                  <div className="row align-items-center mb-3">
                    <div className="col-md-8">
                      <label className="form-label text-dark d-block mb-0">Default Currency</label>
                      <span className="fs-13">Default currency for transactions</span>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-end">
                        <select
                          className="form-control"
                          name="default_currency"
                          value={formData.default_currency}
                          onChange={handleInputChange}
                        >
                          <option value="INR">INR - Indian Rupee</option>
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Default Date Format */}
                  <div className="row align-items-center mb-3">
                    <div className="col-md-8">
                      <label className="form-label text-dark d-block mb-0">Default Date Format</label>
                      <span className="fs-13">Date format for the application</span>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-end">
                        <select
                          className="form-control"
                          name="default_date_format"
                          value={formData.default_date_format}
                          onChange={handleInputChange}
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Session Timeout */}
                  <div className="row align-items-center mb-3">
                    <div className="col-md-8">
                      <label className="form-label text-dark d-block mb-0">Session Timeout</label>
                      <span className="fs-13">Session timeout in minutes (default: 480 = 8 hours)</span>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-end">
                        <input
                          type="number"
                          className="form-control"
                          name="session_timeout_mins"
                          value={formData.session_timeout_mins}
                          onChange={handleInputChange}
                          min="1"
                          placeholder="480"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Max Login Attempts */}
                  <div className="row align-items-center mb-3">
                    <div className="col-md-8">
                      <label className="form-label text-dark d-block mb-0">Max Login Attempts</label>
                      <span className="fs-13">Maximum failed login attempts before account lock</span>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-end">
                        <input
                          type="number"
                          className="form-control"
                          name="max_login_attempts"
                          value={formData.max_login_attempts}
                          onChange={handleInputChange}
                          min="1"
                          placeholder="5"
                        />
                      </div>
                    </div>
                  </div>

                  {/* E-Invoice Threshold */}
                  <div className="row align-items-center mb-3">
                    <div className="col-md-8">
                      <label className="form-label text-dark d-block mb-0">E-Invoice Threshold</label>
                      <span className="fs-13">Amount threshold for mandatory e-invoicing (₹1 Cr = 10000000)</span>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-end">
                        <input
                          type="number"
                          className="form-control"
                          name="e_invoice_threshold"
                          value={formData.e_invoice_threshold}
                          onChange={handleInputChange}
                          min="0"
                          placeholder="10000000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* E-Way Bill Threshold */}
                  <div className="row align-items-center mb-3">
                    <div className="col-md-8">
                      <label className="form-label text-dark d-block mb-0">E-Way Bill Threshold</label>
                      <span className="fs-13">Amount threshold for mandatory e-way bill (₹50K = 50000)</span>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-end">
                        <input
                          type="number"
                          className="form-control"
                          name="e_way_bill_threshold"
                          value={formData.e_way_bill_threshold}
                          onChange={handleInputChange}
                          min="0"
                          placeholder="50000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="d-flex justify-content-end gap-3 mb-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
