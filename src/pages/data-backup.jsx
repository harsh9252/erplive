import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import backupService from '../services/backupService';
import { getAccessToken } from '../services/apiClient';

const DataBackup = () => {
    const [backups, setBackups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchBackups();
    }, []);

    const fetchBackups = async () => {
        try {
            setLoading(true);
            const response = await backupService.getBackups();
            setBackups(response.data || []);
        } catch (error) {
            console.error('Error fetching backups:', error);
            toast.error('Failed to load backups');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBackup = async () => {
        try {
            setIsCreating(true);
            await backupService.createBackup();
            toast.success('Backup generated successfully');
            fetchBackups();
        } catch (error) {
            toast.error(error.message || 'Failed to create backup');
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteBackup = async (filename) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete the backup "${filename}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await backupService.deleteBackup(filename);
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

    const handleDownload = (filename) => {
        const url = backupService.getDownloadUrl(filename);
        const token = getAccessToken();
        
        // Use a hidden anchor to trigger download with token in URL or handle via window.open
        // Note: For protected endpoints, appending token to URL is a common pattern for simple GET downloads
        const downloadUrl = `${url}?token=${token}`;
        window.open(downloadUrl, '_blank');
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
                        <h4>Data Backup</h4>
                        <h6>Securely export and manage system snapshots</h6>
                    </div>
                </div>
                <div className="page-btn">
                    <button 
                        className="btn btn-primary d-flex align-items-center" 
                        onClick={handleCreateBackup}
                        disabled={isCreating}
                    >
                        {isCreating ? (
                            <span className="spinner-border spinner-border-sm me-2"></span>
                        ) : (
                            <i className="isax isax-cloud-plus me-2"></i>
                        )}
                        {isCreating ? 'Generating...' : 'Generate New Backup'}
                    </button>
                </div>
            </div>

            <div className="card table-list-card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table datanew">
                            <thead>
                                <tr>
                                    <th>Filename</th>
                                    <th>Size</th>
                                    <th>Created At</th>
                                    <th className="no-sort text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : backups.length > 0 ? (
                                    backups.map((backup, index) => (
                                        <tr key={index}>
                                            <td className="fw-medium text-dark">
                                                <div className="d-flex align-items-center">
                                                    <i className="isax isax-document-text text-primary me-2 fs-18"></i>
                                                    {backup.filename}
                                                </div>
                                            </td>
                                            <td>{formatSize(backup.size)}</td>
                                            <td className="text-muted">{formatDate(backup.createdAt)}</td>
                                            <td className="action-table-data text-end">
                                                <div className="edit-delete-action">
                                                    <button 
                                                        className="btn btn-sm btn-outline-info me-2" 
                                                        onClick={() => handleDownload(backup.filename)}
                                                        title="Download Backup"
                                                    >
                                                        <i className="isax isax-import me-1"></i>Download
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-outline-danger" 
                                                        onClick={() => handleDeleteBackup(backup.filename)}
                                                        title="Delete Backup"
                                                    >
                                                        <i className="isax isax-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5 text-muted">
                                            No backups found. Click "Generate New Backup" to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div className="mt-4">
                <div className="alert alert-soft-warning d-flex align-items-center mb-0">
                    <i className="isax isax-info-circle me-3 fs-32"></i>
                    <div>
                        <h6 className="alert-heading fw-bold mb-1">Important Security Note</h6>
                        <p className="fs-13 mb-0">Backups contain sensitive business data. Store downloaded files in a secure location and delete older backups periodically to free up server space.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataBackup;
