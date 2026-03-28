import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const CustomFields = () => {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });
  
  useEffect(() => {
    console.log('CustomFields component mounted');
    return () => console.log('CustomFields component unmounted');
  }, []);

  const [fields, setFields] = useState([
    { id: 1, name: 'Customer Type', type: 'dropdown', required: true },
    { id: 2, name: 'Reference Number', type: 'text', required: false },
    { id: 3, name: 'Notes', type: 'textarea', required: false }
  ]);

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const confirmDelete = () => {
    setFields(fields.filter(field => field.id !== confirmDialog.id));
    toast.success('Custom field deleted successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Custom Field"
        message="Are you sure you want to delete this custom field? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />
      
      <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/custom-fields" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3 d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Custom Fields</h6>
                <button className="btn btn-primary btn-sm">Add New Field</button>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Field Name</th>
                      <th>Type</th>
                      <th>Required</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map(field => (
                      <tr key={field.id}>
                        <td>{field.name}</td>
                        <td>{field.type}</td>
                        <td>
                          <span className={`badge ${field.required ? 'bg-success' : 'bg-secondary'}`}>
                            {field.required ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-icon btn-soft-primary" title="Edit">
                              <i className="isax isax-edit-25"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-icon btn-soft-danger" 
                              title="Delete"
                              onClick={() => handleDelete(field.id)}
                            >
                              <i className="isax isax-trash"></i>
                            </button>
                          </div>
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
    </>
  );
};

export default CustomFields;
