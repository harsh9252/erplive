import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const Cronjob = () => {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });
  
  useEffect(() => {
    console.log('Cronjob component mounted');
    return () => console.log('Cronjob component unmounted');
  }, []);

  const [jobs, setJobs] = useState([
    { id: 1, name: 'Daily Backup', schedule: '0 2 * * *', status: 'active', lastRun: '2025-03-02 02:00' },
    { id: 2, name: 'Email Queue', schedule: '*/5 * * * *', status: 'active', lastRun: '2025-03-02 10:05' },
    { id: 3, name: 'Report Generation', schedule: '0 0 * * 0', status: 'inactive', lastRun: '2025-02-23 00:00' }
  ]);

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const confirmDelete = () => {
    setJobs(jobs.filter(job => job.id !== confirmDialog.id));
    toast.success('Cron job deleted successfully!', {
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
        title="Delete Cron Job"
        message="Are you sure you want to delete this cron job? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />
      
      <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="/cronjob" />
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3">
              <div className="pb-3 border-bottom mb-3 d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Cron Jobs</h6>
                <button className="btn btn-primary btn-sm">Add Cron Job</button>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Job Name</th>
                      <th>Schedule</th>
                      <th>Last Run</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map(job => (
                      <tr key={job.id}>
                        <td>{job.name}</td>
                        <td><code>{job.schedule}</code></td>
                        <td>{job.lastRun}</td>
                        <td>
                          <span className={`badge ${job.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                            {job.status}
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
                              onClick={() => handleDelete(job.id)}
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

export default Cronjob;
