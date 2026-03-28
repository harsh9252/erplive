import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const SystemBackup = () => {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });
  
  useEffect(() => {
    console.log('SystemBackup component mounted');
    return () => console.log('SystemBackup component unmounted');
  }, []);

  const [backups, setBackups] = useState([
    { id: 1, name: 'Full Backup - 2025-03-01', size: '1.2 GB', date: '2025-03-01 02:00', type: 'Full' },
    { id: 2, name: 'Incremental Backup - 2025-02-28', size: '250 MB', date: '2025-02-28 02:00', type: 'Incremental' },
    { id: 3, name: 'Full Backup - 2025-02-25', size: '1.1 GB', date: '2025-02-25 02:00', type: 'Full' }
  ]);

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const confirmDelete = () => {
    setBackups(backups.filter(backup => backup.id !== confirmDialog.id));
    toast.success('System backup deleted successfully!', {
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
        title="Delete System Backup"
        message="Are you sure you want to delete this system backup? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />
      
      <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/system-backup" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3 d-flex justify-content-between align-items-center">
                <h6 className="mb-0">System Backup</h6>
                <button className="btn btn-primary btn-sm">Create Backup</button>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Backup Name</th>
                      <th>Type</th>
                      <th>Size</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backups.map(backup => (
                      <tr key={backup.id}>
                        <td>{backup.name}</td>
                        <td><span className="badge bg-info">{backup.type}</span></td>
                        <td>{backup.size}</td>
                        <td>{backup.date}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-icon btn-soft-success" title="Download">
                              <i className="isax isax-document-download5"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-icon btn-soft-danger" 
                              title="Delete"
                              onClick={() => handleDelete(backup.id)}
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

export default SystemBackup;
