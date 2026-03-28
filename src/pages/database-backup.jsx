import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const DatabaseBackup = () => {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null, type: 'delete' });
  
  useEffect(() => {
    console.log('DatabaseBackup component mounted');
    return () => console.log('DatabaseBackup component unmounted');
  }, []);

  const [backups, setBackups] = useState([
    { id: 1, name: 'database_backup_2025_03_01.sql', size: '45 MB', date: '2025-03-01 02:00' },
    { id: 2, name: 'database_backup_2025_02_28.sql', size: '44 MB', date: '2025-02-28 02:00' },
    { id: 3, name: 'database_backup_2025_02_25.sql', size: '43 MB', date: '2025-02-25 02:00' }
  ]);

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id, type: 'delete' });
  };

  const handleRestore = (id) => {
    setConfirmDialog({ isOpen: true, id, type: 'restore' });
  };

  const confirmAction = () => {
    if (confirmDialog.type === 'delete') {
      setBackups(backups.filter(backup => backup.id !== confirmDialog.id));
      toast.success('Backup deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else if (confirmDialog.type === 'restore') {
      toast.success('Database restored successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null, type: 'delete' })}
        onConfirm={confirmAction}
        title={confirmDialog.type === 'delete' ? 'Delete Backup' : 'Restore Database'}
        message={
          confirmDialog.type === 'delete'
            ? 'Are you sure you want to delete this backup? This action cannot be undone.'
            : 'Are you sure you want to restore the database from this backup? Current data will be replaced.'
        }
        confirmText={confirmDialog.type === 'delete' ? 'Yes, Delete' : 'Yes, Restore'}
        cancelText="Cancel"
        type={confirmDialog.type === 'delete' ? 'danger' : 'warning'}
      />
      
      <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/database-backup" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3 d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Database Backup</h6>
                <button className="btn btn-primary btn-sm">Create Backup</button>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Backup File</th>
                      <th>Size</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backups.map(backup => (
                      <tr key={backup.id}>
                        <td><code>{backup.name}</code></td>
                        <td>{backup.size}</td>
                        <td>{backup.date}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-icon btn-soft-success" title="Download">
                              <i className="isax isax-document-download5"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-icon btn-soft-primary" 
                              title="Restore"
                              onClick={() => handleRestore(backup.id)}
                            >
                              <i className="isax isax-refresh-25"></i>
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

export default DatabaseBackup;
