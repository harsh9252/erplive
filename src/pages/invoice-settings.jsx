import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const InvoiceSettings = () => {
  useEffect(() => {
    console.log('InvoiceSettings component mounted');
    return () => console.log('InvoiceSettings component unmounted');
  }, []);

  const [settings, setSettings] = useState({
    invoicePrefix: 'INV-',
    invoiceNumbering: 'auto',
    taxCalculation: 'inclusive',
    defaultDueDays: '30'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/invoice-settings" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Invoice Settings</h6>
              </div>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Invoice Prefix</label>
                    <input type="text" className="form-control" name="invoicePrefix" value={settings.invoicePrefix} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Invoice Numbering</label>
                    <select className="form-select" name="invoiceNumbering" value={settings.invoiceNumbering} onChange={handleChange}>
                      <option value="auto">Auto</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Tax Calculation</label>
                    <select className="form-select" name="taxCalculation" value={settings.taxCalculation} onChange={handleChange}>
                      <option value="inclusive">Tax Inclusive</option>
                      <option value="exclusive">Tax Exclusive</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Default Due Days</label>
                    <input type="number" className="form-control" name="defaultDueDays" value={settings.defaultDueDays} onChange={handleChange} />
                  </div>
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

export default InvoiceSettings;
