import { useState } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const CompanySettingsNew = () => {
  const [formData, setFormData] = useState({
    language: 'en',
    date_format: 'DD/MM/YYYY',
    currency_symbol: 'INR',
    financial_year_start: 4,
    invoice_prefix: 'INV',
    backup_enabled: true,
    backup_frequency: 'DAILY',
    backup_time: '02:00',
    theme: 'LIGHT',
    show_logo_on_invoice: true,
    invoice_footer: 'Thank you for your business. Please pay within 30 days.',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) : value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('companySettings', JSON.stringify(formData));
    setMessage('Company settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      language: 'en',
      date_format: 'DD/MM/YYYY',
      currency_symbol: 'INR',
      financial_year_start: 4,
      invoice_prefix: 'INV',
      backup_enabled: true,
      backup_frequency: 'DAILY',
      backup_time: '02:00',
      theme: 'LIGHT',
      show_logo_on_invoice: true,
      invoice_footer: 'Thank you for your business. Please pay within 30 days.',
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-12">
        <div className="row settings-wrapper d-flex">
          {/* Settings Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="company-settings" />
          </div>

          {/* Main Content */}
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3 pb-3 border-bottom">
              <h6 className="fw-bold mb-0">Company Settings</h6>
              <p className="fs-13 text-muted mt-1">Configure company-wide preferences</p>
            </div>

            {message && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {message}
                <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Language */}
              <div className="row align-items-center mb-3">
                <div className="col-md-8">
                  <label className="form-label text-dark d-block mb-0">Language</label>
                  <span className="fs-13">Default language for the application</span>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <select
                      className="form-control"
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="mr">Marathi</option>
                      <option value="gu">Gujarati</option>
                      <option value="ta">Tamil</option>
                      <option value="te">Telugu</option>
                      <option value="kn">Kannada</option>
                      <option value="bn">Bengali</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Date Format */}
              <div className="row align-items-center mb-3">
                <div className="col-md-8">
                  <label className="form-label text-dark d-block mb-0">Date Format</label>
                  <span className="fs-13">Date format for invoices and reports</span>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <select
                      className="form-control"
                      name="date_format"
                      value={formData.date_format}
                      onChange={handleInputChange}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Currency Symbol */}
              <div className="row align-items-center mb-3">
                <div className="col-md-8">
                  <label className="form-label text-dark d-block mb-0">Currency Symbol</label>
                  <span className="fs-13">Default currency for transactions</span>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <select
                      className="form-control"
                      name="currency_symbol"
                      value={formData.currency_symbol}
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

              {/* Financial Year Start */}
              <div className="row align-items-center mb-3">
                <div className="col-md-8">
                  <label className="form-label text-dark d-block mb-0">Financial Year Start</label>
                  <span className="fs-13">Month when financial year starts (1-12)</span>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <select
                      className="form-control"
                      name="financial_year_start"
                      value={formData.financial_year_start}
                      onChange={handleInputChange}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                        <option key={month} value={month}>
                          Month {month}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Invoice Prefix */}
              <div className="row align-items-center mb-3">
                <div className="col-md-8">
                  <label className="form-label text-dark d-block mb-0">Invoice Prefix</label>
                  <span className="fs-13">Prefix for invoice numbers (e.g., INV, SINV)</span>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <input
                      type="text"
                      className="form-control"
                      name="invoice_prefix"
                      value={formData.invoice_prefix}
                      onChange={handleInputChange}
                      placeholder="INV"
                    />
                  </div>
                </div>
              </div>

              {/* UI Theme */}
              <div className="row align-items-center mb-3">
                <div className="col-md-8">
                  <label className="form-label text-dark d-block mb-0">UI Theme</label>
                  <span className="fs-13">Choose light or dark theme</span>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <select
                      className="form-control"
                      name="theme"
                      value={formData.theme}
                      onChange={handleInputChange}
                    >
                      <option value="LIGHT">Light</option>
                      <option value="DARK">Dark</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Show Logo on Invoice */}
              <div className="row align-items-center mb-3">
                <div className="col-md-8">
                  <label className="form-label text-dark d-block mb-0">Show Logo on Invoice</label>
                  <span className="fs-13">Display company logo on printed invoices</span>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="show_logo_on_invoice"
                        checked={formData.show_logo_on_invoice}
                        onChange={handleInputChange}
                        id="logoSwitch"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto Backup */}
              <div className="row align-items-center mb-3">
                <div className="col-md-8">
                  <label className="form-label text-dark d-block mb-0">Auto Backup</label>
                  <span className="fs-13">Enable automatic database backups</span>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="backup_enabled"
                        checked={formData.backup_enabled}
                        onChange={handleInputChange}
                        id="backupSwitch"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Backup Frequency */}
              {formData.backup_enabled && (
                <div className="row align-items-center mb-3">
                  <div className="col-md-8">
                    <label className="form-label text-dark d-block mb-0">Backup Frequency</label>
                    <span className="fs-13">How often to backup the database</span>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex justify-content-end">
                      <select
                        className="form-control"
                        name="backup_frequency"
                        value={formData.backup_frequency}
                        onChange={handleInputChange}
                      >
                        <option value="DAILY">Daily</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="MONTHLY">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Backup Time */}
              {formData.backup_enabled && (
                <div className="row align-items-center mb-3">
                  <div className="col-md-8">
                    <label className="form-label text-dark d-block mb-0">Backup Time</label>
                    <span className="fs-13">Time to run backup (HH:mm format)</span>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex justify-content-end">
                      <input
                        type="time"
                        className="form-control"
                        name="backup_time"
                        value={formData.backup_time}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Invoice Footer */}
              <div className="row align-items-start mb-3">
                <div className="col-md-8">
                  <label className="form-label text-dark d-block mb-0">Invoice Footer</label>
                  <span className="fs-13">Footer text for invoices (terms & conditions)</span>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <textarea
                      className="form-control"
                      name="invoice_footer"
                      value={formData.invoice_footer}
                      onChange={handleInputChange}
                      placeholder="Enter footer text"
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-4 mt-4 border-top mb-3">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-white me-3"
                    onClick={handleCancel}
                  >
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettingsNew;
