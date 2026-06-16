import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { toast } from 'react-toastify';

const PaymentMethods = () => {
  useEffect(() => {
    console.log('PaymentMethods component mounted');
    return () => console.log('PaymentMethods component unmounted');
  }, []);

  const [methods, setMethods] = useState([
    { id: 1, name: 'Cash', enabled: true, isDefault: true },
    { id: 2, name: 'Credit Card', enabled: true, isDefault: false },
    { id: 3, name: 'Debit Card', enabled: true, isDefault: false },
    { id: 4, name: 'Bank Transfer', enabled: false, isDefault: false },
    { id: 5, name: 'UPI', enabled: true, isDefault: false }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    enabled: true,
    isDefault: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (method) => {
    setEditingId(method.id);
    setFormData({
      name: method.name,
      enabled: method.enabled,
      isDefault: method.isDefault
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing method
      setMethods(methods.map(m => 
        m.id === editingId ? { ...m, ...formData } : m
      ));
      toast.success('Payment method updated successfully!');
    } else {
      // Add new method
      const newMethod = {
        id: methods.length + 1,
        ...formData
      };
      setMethods([...methods, newMethod]);
      toast.success('Payment method added successfully!');
    }
    setFormData({ name: '', enabled: true, isDefault: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setFormData({ name: '', enabled: true, isDefault: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setMethods(methods.filter(m => m.id !== id));
      toast.success('Payment method deleted successfully!');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/payment-methods" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3 d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Payment Methods</h6>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? 'Cancel' : 'Add New Method'}
                </button>
              </div>

              {showForm && (
                <div className="card mb-3">
                  <div className="card-body">
                    <h6 className="mb-3">{editingId ? 'Edit Payment Method' : 'Add New Payment Method'}</h6>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Method Name <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g., PayPal"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label d-block">Status</label>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="enabled"
                              checked={formData.enabled}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Enabled</label>
                          </div>
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
                            <label className="form-check-label">Default Method</label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {editingId ? 'Update Method' : 'Add Method'}
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
                        <th>Method Name</th>
                        <th>Status</th>
                        <th>Default</th>
                        <th className="text-end pe-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {methods.map(method => (
                        <tr key={method.id}>
                          <td>{method.name}</td>
                          <td>
                            <span className={`badge ${method.enabled ? 'bg-success' : 'bg-secondary'}`}>
                              {method.enabled ? 'Enabled' : 'Disabled'}
                            </span>
                          </td>
                          <td>
                            {method.isDefault && <span className="badge bg-primary">Default</span>}
                          </td>
                          <td className="text-end pe-4">
                            <div className="dropdown">
                              <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                                <i className="isax isax-more fs-18"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                                <li>
                                  <button className="dropdown-item py-2" onClick={() => handleEdit(method)}>
                                    <i className="isax isax-edit-2 me-2 text-warning"></i>Edit Method
                                  </button>
                                </li>
                                <li>
                                  <button className="dropdown-item py-2" onClick={() => handleDelete(method.id)}>
                                    <i className="isax isax-trash me-2 text-danger"></i>Delete Method
                                  </button>
                                </li>
                              </ul>
                            </div>
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

export default PaymentMethods;
