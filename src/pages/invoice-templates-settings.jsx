import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const InvoiceTemplatesSettings = () => {
  useEffect(() => {
    console.log('InvoiceTemplatesSettings component mounted');
    return () => console.log('InvoiceTemplatesSettings component unmounted');
  }, []);

  const [templates] = useState([
    { id: 1, name: 'Classic Template', isDefault: true },
    { id: 2, name: 'Modern Template', isDefault: false },
    { id: 3, name: 'Minimal Template', isDefault: false }
  ]);

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/invoice-templates-settings" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Invoice Templates</h6>
              </div>
              <div className="row">
                {templates.map(template => (
                  <div key={template.id} className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h6>{template.name}</h6>
                        {template.isDefault && (
                          <span className="badge bg-success">Default</span>
                        )}
                        <div className="mt-3">
                          <button className="btn btn-sm btn-primary me-2">Preview</button>
                          {!template.isDefault && (
                            <button className="btn btn-sm btn-outline-primary">Set Default</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplatesSettings;
