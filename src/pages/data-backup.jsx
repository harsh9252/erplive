import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import backupService from '../services/backupService';
import { getAccessToken } from '../services/apiClient';
import { useAuth } from '../components/AuthContext';
import financialYearService from '../services/financialYearService';

const DataBackup = () => {
    const { user } = useAuth();
    const [backups, setBackups] = useState([]);
    const [financialYears, setFinancialYears] = useState([]);
    const [activeFY, setActiveFY] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isRestoring, setIsRestoring] = useState(false);
    const [backupForm, setBackupForm] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchBackups();
        fetchFYs();
    }, []);

    const fetchFYs = async () => {
        try {
            const res = await financialYearService.getFinancialYears();
            const list = res.data || res || [];
            setFinancialYears(list);
            const active = list.find(y => y.is_active) || list[0];
            setActiveFY(active);
        } catch (err) {
            console.error('Error fetching FYs:', err);
        }
    };

    const getFYName = (fyId) => {
        if (!fyId) return 'Global';
        const fy = financialYears.find(f => f.id === fyId);
        if (!fy) return `FY ID: ${fyId}`;
        if (fy.name) return fy.name;
        
        // Format if name is null: FY 2024-25
        try {
            const startYear = new Date(fy.start_date).getFullYear();
            const endYear = new Date(fy.end_date).getFullYear();
            return `FY ${startYear}-${String(endYear).slice(-2)}`;
        } catch (e) {
            return `FY ID: ${fyId}`;
        }
    };

    const fetchBackups = async () => {
        try {
            setLoading(true);
            const params = activeFY ? { fy_id: activeFY.id, limit: 50, _t: Date.now() } : { limit: 50, _t: Date.now() };
            const response = await backupService.getBackups(params);
            // The new API might return items in data.data or data
            const data = response.data?.data || response.data || response || [];
            
            // Filter based on user ownership or admin status
            const filteredBackups = data.filter(backup => {
                const isAdmin = user?.role === 'admin';
                if (isAdmin) return true;
                
                const backupUserId = backup.user_id || backup.created_by || backup.userId;
                return String(backupUserId) === String(user?.id);
            });

            setBackups(filteredBackups);
        } catch (error) {
            console.error('Error fetching backups:', error);
            toast.error('Failed to load backups');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBackup = async (e) => {
        e.preventDefault();
        try {
            setIsCreating(true);
            await backupService.createBackup({
                name: backupForm.name,
                description: backupForm.description,
                fy_id: activeFY?.id || 1
            });
            toast.success('Backup generated successfully');

            // Close modal
            const modalElement = document.getElementById('create_backup_modal');
            if (modalElement) {
                const modal = window.bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();
            }

            setBackupForm({ name: '', description: '' });
            setTimeout(() => {
                fetchBackups();
            }, 500);
        } catch (error) {
            toast.error(error.message || 'Failed to create backup');
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteBackup = async (backup) => {
        const id = backup.id || backup.filename;
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete the backup "${backup.name || backup.filename}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await backupService.deleteBackup(id);
                    Swal.fire(
                        'Deleted!',
                        'The backup has been deleted.',
                        'success'
                    );
                    fetchBackups();
                } catch (error) {
                    toast.error('Failed to delete backup');
                }
            }
        });
    };

    const handleRestoreBackup = async (backup) => {
        const id = backup.id || backup.filename;

        // Double confirmation for restore
        Swal.fire({
            title: 'RESTORE DATABASE?',
            text: `WARNING: This will overwrite your CURRENT data with the contents of "${backup.name || backup.filename}". This action CANNOT be undone!`,
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#fe9f43',
            confirmButtonText: 'Yes, RESTORE it!',
            cancelButtonText: 'Cancel',
            footer: '<span class="text-danger fw-bold">Note: System will be temporarily unavailable during restoration.</span>'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Second confirm
                Swal.fire({
                    title: 'Type "RESTORE" to confirm',
                    input: 'text',
                    inputPlaceholder: 'Type RESTORE here...',
                    showCancelButton: true,
                    confirmButtonText: 'Execute Restoration',
                    preConfirm: (value) => {
                        if (value !== 'RESTORE') {
                            Swal.showValidationMessage('Verification failed. You must type RESTORE.');
                        }
                        return value;
                    }
                }).then(async (innerResult) => {
                    if (innerResult.isConfirmed) {
                        try {
                            setIsRestoring(true);
                            Swal.fire({
                                title: 'Restoring Data...',
                                html: 'Please wait, do not close this window.',
                                allowOutsideClick: false,
                                didOpen: () => {
                                    Swal.showLoading();
                                }
                            });

                            await backupService.restoreBackup(id);

                            Swal.close();
                            Swal.fire({
                                title: 'Restored!',
                                text: 'Database has been restored successfully. The page will reload.',
                                icon: 'success',
                                iconHtml: '<i class="isax isax-tick-circle text-success fs-50"></i>',
                                customClass: {
                                    icon: 'border-0'
                                }
                            }).then(() => {
                                window.location.reload();
                            });
                        } catch (error) {
                            Swal.close();
                            setIsRestoring(false);
                            toast.error(error.message || 'Restoration failed');
                        }
                    }
                });
            }
        });
    };

    // Bug 6.2 fix: use fetch with Authorization header instead of token in URL
    const handleDownload = async (backup) => {
        // Bug 6.1 fix: use backup.filename or backup.id based on what the service expects
        const identifier = backup.filename || backup.id;
        const url = backupService.getDownloadUrl(identifier);
        const token = getAccessToken();
        try {
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Download failed');
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objectUrl;
            a.download = backup.filename || `backup_${backup.id}.sql`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
        } catch (err) {
            toast.error('Download failed: ' + err.message);
        }
    };

    const formatSize = (bytes) => {
        if (!bytes) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="content">
            <div className="page-header">
                <div className="add-item d-flex">
                    <div className="page-title">
                        <h4>Data Backup & Restore</h4>
                        <h6>Securely export, manage and recover system snapshots</h6>
                    </div>
                </div>
                <div className="page-btn d-flex gap-2">
                    <button
                        className="btn btn-primary d-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#create_backup_modal"
                    >
                        <i className="isax isax-cloud-plus me-2"></i>Generate New Backup
                    </button>
                    <button
                        className="btn btn-outline-secondary d-flex align-items-center"
                        onClick={fetchBackups}
                        disabled={loading}
                    >
                        <i className={`isax isax-refresh me-2 ${loading ? 'fa-spin' : ''}`}></i>
                        Refresh List
                    </button>
                </div>
            </div>

            <div className="card table-list-card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table datanew">
                            <thead>
                                <tr>
                                    <th>Backup Details</th>
                                    <th>Description</th>
                                    <th>Size</th>
                                    <th>Created At</th>
                                    <th className="no-sort text-end pe-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : backups.length > 0 ? (
                                    backups.map((backup) => (
                                        <tr key={backup.id} className="hover:bg-gray-50 transition-colors">
                                            <td>
                                                <div className="d-flex flex-column">
                                                    <span className="fw-bold text-dark">{backup.name || 'Unnamed Backup'}</span>
                                                    <div className="d-flex align-items-center gap-2 mt-1">
                                                        <span className="badge badge-soft-primary fs-11">
                                                            <i className="isax isax-user me-1"></i>
                                                            {backup.user?.name || backup.user_name || (backup.user_id ? `UID: ${backup.user_id}` : 'System')}
                                                        </span>
                                                        <span className="badge badge-soft-warning fs-11">
                                                            <i className="isax isax-calendar me-1"></i>
                                                            {backup.fy_name || backup.financial_year_name || getFYName(backup.fy_id)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-muted">{backup.description || 'No description'}</td>
                                            <td>
                                                <span className="badge bg-soft-info text-info">
                                                    {backup.size_mb ? `${backup.size_mb} MB` : formatSize(backup.size)}
                                                </span>
                                            </td>
                                            <td>{formatDate(backup.createdAt)}</td>
                                            <td className="text-end pe-4">
                                                <div className="d-flex justify-content-end align-items-center gap-2">
                                                    {/* Bug 6.3 fix: disable Restore while isRestoring */}
                                                    <button 
                                                        className="btn btn-sm btn-soft-warning border-0" 
                                                        onClick={() => handleRestoreBackup(backup)}
                                                        title="Restore Backup"
                                                        disabled={isRestoring}
                                                    >
                                                        <i className="isax isax-refresh-circle fs-16"></i>
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-soft-success border-0" 
                                                        onClick={() => handleDownload(backup)}
                                                        title="Download SQL"
                                                    >
                                                        <i className="isax isax-document-download fs-16"></i>
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-soft-danger border-0" 
                                                        onClick={() => handleDeleteBackup(backup)}
                                                        title="Delete Backup"
                                                        disabled={isRestoring}
                                                    >
                                                        <i className="isax isax-trash fs-16"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted">
                                            No backups found. Click "Generate New Backup" to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            {/* Create Backup Modal */}
            <div className="modal fade" id="create_backup_modal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-bottom p-4">
                            <h5 className="modal-title">Generate New Backup</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleCreateBackup}>
                            <div className="modal-body p-4">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <label className="form-label">Backup Name <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="e.g. Monthly Backup April 2026"
                                                value={backupForm.name}
                                                onChange={(e) => setBackupForm({ ...backupForm, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                placeholder="Enter backup details..."
                                                value={backupForm.description}
                                                onChange={(e) => setBackupForm({ ...backupForm, description: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="alert alert-soft-info border-0 d-flex align-items-center mb-2">
                                            <i className="isax isax-calendar me-2 fs-18 text-info"></i>
                                            <small>Target Financial Year: <strong>{activeFY ? getFYName(activeFY.id) : 'Current Active Period'}</strong></small>
                                        </div>
                                        <div className="alert alert-soft-warning border-0 d-flex align-items-center mb-0">
                                            <i className="isax isax-info-circle me-2 fs-18"></i>
                                            <small>Backing up large databases may take a few moments. Do not close the window while in progress.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-top p-4">
                                <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={isCreating}>
                                    {isCreating ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="isax isax-cloud-plus me-2"></i>Save Backup
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataBackup;
