import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { toast } from 'react-toastify';

const Currencies = () => {
  useEffect(() => {
    console.log('Currencies component mounted');
    return () => console.log('Currencies component unmounted');
  }, []);

  const [currencies, setCurrencies] = useState([
    { id: 1, code: 'USD', name: 'US Dollar', symbol: '$', isDefault: false },
    { id: 2, code: 'EUR', name: 'Euro', symbol: '€', isDefault: false },
    { id: 3, code: 'INR', name: 'Indian Rupee', symbol: '₹', isDefault: true },
    { id: 4, code: 'GBP', name: 'British Pound', symbol: '£', isDefault: false }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    symbol: '',
    isDefault: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (currency) => {
    setEditingId(currency.id);
    setFormData({
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol,
      isDefault: currency.isDefault
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing currency
      setCurrencies(currencies.map(c => 
        c.id === editingId ? { ...c, ...formData } : c
      ));
      toast.success('Currency updated successfully!');
    } else {
      // Add new currency
      const newCurrency = {
        id: currencies.length + 1,
        ...formData
      };
      setCurrencies([...currencies, newCurrency]);
      toast.success('Currency added successfully!');
    }
    setFormData({ code: '', name: '', symbol: '', isDefault: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setFormData({ code: '', name: '', symbol: '', isDefault: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this currency?')) {
      setCurrencies(currencies.filter(c => c.id !== id));
      toast.success('Currency deleted successfully!');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/currencies" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3 d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Currencies</h6>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? 'Cancel' : 'Add Currency'}
                </button>
              </div>

              {showForm && (
                <div className="card mb-3">
                  <div className="card-body">
                    <h6 className="mb-3">{editingId ? 'Edit Currency' : 'Add New Currency'}</h6>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Currency Code <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            placeholder="e.g., USD"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Currency Name <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g., US Dollar"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Symbol <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="symbol"
                            value={formData.symbol}
                            onChange={handleInputChange}
                            placeholder="e.g., $"
                            required
                          />
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
                            <label className="form-check-label">Default Currency</label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {editingId ? 'Update Currency' : 'Add Currency'}
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
                        <th>Currency Code</th>
                        <th>Currency Name</th>
                        <th>Symbol</th>
                        <th>Default</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currencies.map(currency => (
                        <tr key={currency.id}>
                          <td>{currency.code}</td>
                          <td>{currency.name}</td>
                          <td>{currency.symbol}</td>
                          <td>
                            {currency.isDefault && <span className="badge bg-success">Default</span>}
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm btn-primary me-2"
                              onClick={() => handleEdit(currency)}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(currency.id)}
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

export default Currencies;
