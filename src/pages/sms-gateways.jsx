import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { toast } from 'react-toastify';

const SmsGateways = () => {
  useEffect(() => {
    console.log('SmsGateways component mounted');
    return () => console.log('SmsGateways component unmounted');
  }, []);

  const [gateways, setGateways] = useState([
    { id: 1, name: 'Twilio', apiKey: '****1234', status: 'active', isDefault: true },
    { id: 2, name: 'MSG91', apiKey: '****5678', status: 'inactive', isDefault: false },
    { id: 3, name: 'AWS SNS', apiKey: '****9012', status: 'active', isDefault: false }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    apiKey: '',
    status: 'active',
    isDefault: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (gateway) => {
    setEditingId(gateway.id);
    setFormData({
      name: gateway.name,
      apiKey: gateway.apiKey.replace('****', ''),
      status: gateway.status,
      isDefault: gateway.isDefault
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setGateways(gateways.map(g => 
        g.id === editingId ? { 
          ...g, 
          ...formData,
          apiKey: '****' + formData.apiKey.slice(-4)
        } : g
      ));
      toast.success('SMS gateway updated successfully!');
    } else {
      const newGateway = {
        id: gateways.length + 1,
        ...formData,
        apiKey: '****' + formData.apiKey.slice(-4)
      };
      setGateways([...gateways, newGateway]);
      toast.success('SMS gateway added successfully!');
    }
    setFormData({ name: '', apiKey: '', status: 'active', isDefault: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setFormData({ name: '', apiKey: '', status: 'active', isDefault: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this SMS gateway?')) {
      setGateways(gateways.filter(g => g.id !== id));
      toast.success('SMS gateway deleted successfully!');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/sms-gateways" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3 d-flex justify-content-between align-items-center">
                <h6 className="mb-0">SMS Gateways</h6>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? 'Cancel' : 'Add Gateway'}
                </button>
              </div>

              {showForm && (
                <div className="card mb-3">
                  <div className="card-body">
                    <h6 className="mb-3">{editingId ? 'Edit SMS Gateway' : 'Add New SMS Gateway'}</h6>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Gateway Name <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g., Twilio"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">API Key <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="apiKey"
                            value={formData.apiKey}
                            onChange={handleInputChange}
                            placeholder="Enter API Key"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Status <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label d-block">Set as Default</label>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="isDefault"
                              checked={formData.isDefault}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Default Gateway</label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {editingId ? 'Update Gateway' : 'Add Gateway'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {!showForm && (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Gateway Name</th>
                        <th>API Key</th>
                        <th>Status</th>
                        <th>Default</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gateways.map(gateway => (
                        <tr key={gateway.id}>
                          <td>{gateway.name}</td>
                          <td>{gateway.apiKey}</td>
                          <td>
                            <span className={`badge ${gateway.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                              {gateway.status}
                            </span>
                          </td>
                          <td>
                            {gateway.isDefault && <span className="badge bg-primary">Default</span>}
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm btn-primary me-2"
                              onClick={() => handleEdit(gateway)}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(gateway.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsGateways;
