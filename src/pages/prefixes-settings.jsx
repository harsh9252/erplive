import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const PrefixesSettings = () => {
  useEffect(() => {
    console.log('PrefixesSettings component mounted');
    return () => console.log('PrefixesSettings component unmounted');
  }, []);

  const [prefixes, setPrefixes] = useState({
    invoice: 'INV-',
    quotation: 'QUO-',
    purchase: 'PUR-',
    customer: 'CUST-',
    vendor: 'VEND-'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrefixes(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/prefixes-settings" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Prefixes Settings</h6>
              </div>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Invoice Prefix</label>
                    <input type="text" className="form-control" name="invoice" value={prefixes.invoice} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Quotation Prefix</label>
                    <input type="text" className="form-control" name="quotation" value={prefixes.quotation} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Purchase Prefix</label>
                    <input type="text" className="form-control" name="purchase" value={prefixes.purchase} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Customer Prefix</label>
                    <input type="text" className="form-control" name="customer" value={prefixes.customer} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Vendor Prefix</label>
                    <input type="text" className="form-control" name="vendor" value={prefixes.vendor} onChange={handleChange} />
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

export default PrefixesSettings;
