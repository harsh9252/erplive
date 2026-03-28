import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const ThermalPrinter = () => {
  useEffect(() => {
    console.log('ThermalPrinter component mounted');
    return () => console.log('ThermalPrinter component unmounted');
  }, []);

  const [settings, setSettings] = useState({
    showTerms: true,
    showGoogleReviews: true,
    showTaxableAmount: true,
    showCompanyDetails: true,
    showItemDescription: true,
    orgNameFontSize: '24',
    companyNameFontSize: '24',
    printer: 'Thermal Printer 80 mm',
    notes: ''
  });

  const handleToggle = (name) => {
    setSettings(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/thermal-printer" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Thermal Printer</h6>
              </div>
              <form>
                <div className="row">
                  <div className="col-12 mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label fw-medium mb-0">Show Terms on ThermalPrint</label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={settings.showTerms}
                          onChange={() => handleToggle('showTerms')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label fw-medium mb-0">Show Google Reviews QR</label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={settings.showGoogleReviews}
                          onChange={() => handleToggle('showGoogleReviews')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label fw-medium mb-0">Show Taxable Amount</label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={settings.showTaxableAmount}
                          onChange={() => handleToggle('showTaxableAmount')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label fw-medium mb-0">Show Company Details</label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={settings.showCompanyDetails}
                          onChange={() => handleToggle('showCompanyDetails')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="form-label fw-medium mb-0">Show Item Description</label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={settings.showItemDescription}
                          onChange={() => handleToggle('showItemDescription')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">Organization Name Font Size</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="orgNameFontSize"
                      value={settings.orgNameFontSize}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">Company Name Font Size</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="companyNameFontSize"
                      value={settings.companyNameFontSize}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label fw-medium">Select Printer</label>
                    <select 
                      className="form-select"
                      name="printer"
                      value={settings.printer}
                      onChange={handleChange}
                    >
                      <option>Thermal Printer 80 mm</option>
                      <option>Thermal Printer 58 mm</option>
                    </select>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label fw-medium">Notes</label>
                    <textarea 
                      className="form-control" 
                      name="notes"
                      value={settings.notes}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Enter notes"
                    />
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

export default ThermalPrinter;
