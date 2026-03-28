import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { toast } from 'react-toastify';

const EmailTemplates = () => {
  useEffect(() => {
    console.log('EmailTemplates component mounted');
    return () => console.log('EmailTemplates component unmounted');
  }, []);

  const [templates, setTemplates] = useState([
    { id: 1, name: 'Welcome Email', subject: 'Welcome to our platform', status: 'active' },
    { id: 2, name: 'Invoice Email', subject: 'Your invoice is ready', status: 'active' },
    { id: 3, name: 'Password Reset', subject: 'Reset your password', status: 'active' },
    { id: 4, name: 'Payment Reminder', subject: 'Payment due reminder', status: 'inactive' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    status: 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (template) => {
    setEditingId(template.id);
    setFormData({
      name: template.name,
      subject: template.subject,
      status: template.status
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setTemplates(templates.map(t => 
        t.id === editingId ? { ...t, ...formData } : t
      ));
      toast.success('Email template updated successfully!');
    } else {
      const newTemplate = {
        id: templates.length + 1,
        ...formData
      };
      setTemplates([...templates, newTemplate]);
      toast.success('Email template added successfully!');
    }
    setFormData({ name: '', subject: '', status: 'active' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setFormData({ name: '', subject: '', status: 'active' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this email template?')) {
      setTemplates(templates.filter(t => t.id !== id));
      toast.success('Email template deleted successfully!');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/email-templates" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3 d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Email Templates</h6>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? 'Cancel' : 'Add Template'}
                </button>
              </div>

              {showForm && (
                <div className="card mb-3">
                  <div className="card-body">
                    <h6 className="mb-3">{editingId ? 'Edit Email Template' : 'Add New Email Template'}</h6>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Template Name <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g., Welcome Email"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Subject <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="e.g., Welcome to our platform"
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
                      </div>
                      <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {editingId ? 'Update Template' : 'Add Template'}
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
                        <th>Template Name</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {templates.map(template => (
                        <tr key={template.id}>
                          <td>{template.name}</td>
                          <td>{template.subject}</td>
                          <td>
                            <span className={`badge ${template.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                              {template.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm btn-primary me-2"
                              onClick={() => handleEdit(template)}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(template.id)}
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

export default EmailTemplates;
