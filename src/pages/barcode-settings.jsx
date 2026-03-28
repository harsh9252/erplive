import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const BarcodeSettings = () => {
  useEffect(() => {
    console.log('BarcodeSettings component mounted');
    return () => console.log('BarcodeSettings component unmounted');
  }, []);

  const [barcode, setBarcode] = useState({
    barcodeType: 'CODE128',
    showProductName: true,
    showPrice: true,
    barcodeSize: 'medium'
  });

  const handleToggle = (name) => {
    setBarcode(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBarcode(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/barcode-settings" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Barcode Settings</h6>
              </div>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Barcode Type</label>
                    <select className="form-select" name="barcodeType" value={barcode.barcodeType} onChange={handleChange}>
                      <option value="CODE128">CODE128</option>
                      <option value="CODE39">CODE39</option>
                      <option value="EAN13">EAN13</option>
                      <option value="QR">QR Code</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Barcode Size</label>
                    <select className="form-select" name="barcodeSize" value={barcode.barcodeSize} onChange={handleChange}>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="form-check form-switch mb-2">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={barcode.showProductName}
                        onChange={() => handleToggle('showProductName')}
                      />
                      <label className="form-check-label">Show Product Name</label>
                    </div>
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={barcode.showPrice}
                        onChange={() => handleToggle('showPrice')}
                      />
                      <label className="form-check-label">Show Price</label>
                    </div>
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

export default BarcodeSettings;
