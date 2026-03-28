import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';

const PluginManager = () => {
  useEffect(() => {
    console.log('PluginManager component mounted');
    return () => console.log('PluginManager component unmounted');
  }, []);

  const [plugins] = useState([
    { id: 1, name: 'Payment Gateway', status: 'active', version: '1.0.0' },
    { id: 2, name: 'Email Marketing', status: 'inactive', version: '2.1.0' },
    { id: 3, name: 'Analytics', status: 'active', version: '1.5.2' }
  ]);

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/plugin-manager" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3">
                <h6 className="mb-0">Plugin Manager</h6>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Plugin Name</th>
                      <th>Version</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plugins.map(plugin => (
                      <tr key={plugin.id}>
                        <td>{plugin.name}</td>
                        <td>{plugin.version}</td>
                        <td>
                          <span className={`badge ${plugin.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                            {plugin.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-primary">
                            {plugin.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
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
  );
};

export default PluginManager;
