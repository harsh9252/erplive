import { useState } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const BusinessNature = () => {
  const businessNatures = [
    {
      code: 'TRADING',
      name: 'Trading Business',
      features: ['Inventory', 'Sales', 'Purchase', 'GST'],
      description: 'For businesses that buy and sell goods',
    },
    {
      code: 'MANUFACTURING',
      name: 'Manufacturing',
      features: ['Inventory', 'Sales', 'Purchase', 'GST', 'BOM', 'Work Orders', 'Production'],
      description: 'For manufacturing and production businesses',
    },
    {
      code: 'RETAIL',
      name: 'Retail',
      features: ['Inventory', 'Sales', 'Purchase', 'GST', 'POS', 'Barcode'],
      description: 'For retail stores and shops',
    },
    {
      code: 'SERVICES',
      name: 'Services',
      features: ['Service Billing', 'GST'],
      description: 'For service-based businesses (no inventory)',
    },
    {
      code: 'WHOLESALE',
      name: 'Wholesale/Distribution',
      features: ['Inventory', 'Sales', 'Purchase', 'GST', 'Multi-warehouse', 'Batch'],
      description: 'For wholesale and distribution businesses',
    },
    {
      code: 'ECOMMERCE',
      name: 'E-Commerce',
      features: ['Inventory', 'Sales', 'Purchase', 'GST', 'TCS on Marketplace'],
      description: 'For online e-commerce businesses',
    },
    {
      code: 'HEALTHCARE',
      name: 'Healthcare/Pharmacy',
      features: ['Inventory', 'Sales', 'Purchase', 'GST', 'Batch+Expiry', 'Drug License'],
      description: 'For pharmacies and healthcare providers',
    },
    {
      code: 'CONSTRUCTION',
      name: 'Construction',
      features: ['Project-based', 'RCM', 'GST'],
      description: 'For construction and project-based businesses',
    },
  ];

  const [selectedNature, setSelectedNature] = useState('TRADING');
  const [message, setMessage] = useState('');

  const handleSelectNature = (code) => {
    setSelectedNature(code);
    localStorage.setItem('businessNature', code);
    setMessage(`Business nature changed to ${businessNatures.find(n => n.code === code).name}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const currentNature = businessNatures.find(n => n.code === selectedNature);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-12">
        <div className="row settings-wrapper d-flex">
          {/* Settings Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="business-nature" />
          </div>

          {/* Main Content */}
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3 pb-3 border-bottom">
              <h6 className="fw-bold mb-0">Business Nature Configuration</h6>
              <p className="fs-13 text-muted mt-1">Select your business type to enable relevant features</p>
            </div>

            {message && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {message}
                <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
              </div>
            )}

            <div className="row">
              {/* Business Nature List */}
              <div className="col-md-5">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title mb-3">Business Types</h6>
                    <div className="list-group">
                      {businessNatures.map((nature) => (
                        <button
                          key={nature.code}
                          type="button"
                          className={`list-group-item list-group-item-action ${
                            selectedNature === nature.code ? 'active' : ''
                          }`}
                          onClick={() => handleSelectNature(nature.code)}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="text-start">
                              <h6 className="mb-1">{nature.name}</h6>
                              <p className="mb-0 fs-13 text-muted">{nature.description}</p>
                            </div>
                            {selectedNature === nature.code && (
                              <i className="isax isax-tick-circle4 text-success"></i>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Display */}
              <div className="col-md-7">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title mb-3">Enabled Features</h6>
                    {currentNature && (
                      <>
                        <div className="mb-4">
                          <h5 className="fw-bold">{currentNature.name}</h5>
                          <p className="text-muted fs-13">{currentNature.description}</p>
                        </div>

                        <div className="mb-3">
                          <h6 className="mb-3">Key Features:</h6>
                          <div className="row">
                            {currentNature.features.map((feature, idx) => (
                              <div key={idx} className="col-md-6 mb-2">
                                <div className="d-flex align-items-center">
                                  <i className="isax isax-tick-circle4 text-success me-2"></i>
                                  <span className="fs-13">{feature}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="alert alert-info mt-4">
                          <i className="isax isax-info-circle me-2"></i>
                          <span className="fs-13">
                            This configuration enables/disables modules and features based on your business type.
                            You can change this anytime from settings.
                          </span>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              localStorage.setItem('businessNatureConfirmed', 'true');
                              setMessage('Business nature configuration saved!');
                              setTimeout(() => setMessage(''), 3000);
                            }}
                          >
                            Confirm Selection
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Matrix */}
            <div className="card mt-4">
              <div className="card-body">
                <h6 className="card-title mb-3">Feature Availability Matrix</h6>
                <div className="table-responsive">
                  <table className="table table-sm table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Feature</th>
                        {businessNatures.map((nature) => (
                          <th key={nature.code} className="text-center fs-12">
                            {nature.name.split('/')[0]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {['Inventory', 'Sales', 'Purchase', 'GST', 'BOM', 'POS', 'Batch', 'Multi-warehouse', 'Project-based'].map((feature) => (
                        <tr key={feature}>
                          <td className="fw-medium fs-13">{feature}</td>
                          {businessNatures.map((nature) => (
                            <td key={nature.code} className="text-center">
                              {nature.features.includes(feature) ? (
                                <i className="isax isax-tick-circle4 text-success"></i>
                              ) : (
                                <i className="isax isax-close-circle text-danger"></i>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessNature;
