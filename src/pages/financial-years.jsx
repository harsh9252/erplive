import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import settingsService from '../services/settingsService';

const FinancialYears = () => {
    const [financialYears, setFinancialYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        start_date: '',
        end_date: '',
        is_active: false
    });

    useEffect(() => {
        fetchFinancialYears();
    }, []);

    const fetchFinancialYears = async () => {
        try {
            setLoading(true);
            const response = await settingsService.getSettingsFinancialYears();
            // normalizeListResponse returns response.data
            setFinancialYears(response.data || response || []);
        } catch (error) {
            console.error('Error fetching financial years:', error);
            toast.error('Failed to load financial years');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.start_date || !formData.end_date) {
            toast.warning('Please provide both Start Date and End Date');
            return;
        }

        // Auto-generate name from start_date (e.g. FY 2026-27)
        const startDate = new Date(formData.start_date);
        const startYear = startDate.getFullYear();
        const nextYearShort = String(startYear + 1).slice(-2);
        const generatedName = `FY ${startYear}-${nextYearShort}`;

        const payload = {
            ...formData,
            name: generatedName
        };

        try {
            setIsSubmitting(true);
            await settingsService.createSettingsFinancialYear(payload);
            toast.success('Financial year created successfully');
            
            // Success: Close modal (if using bootstrap)
            const modalElement = document.getElementById('add_fy_modal');
            const modal = window.bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
            
            // Reset form and refresh list
            setFormData({ name: '', start_date: '', end_date: '', is_active: false });
            fetchFinancialYears();
        } catch (error) {
            console.error('Error creating financial year:', error);
            toast.error(error.message || 'Failed to create financial year');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="content">
            <div className="page-header">
                <div className="add-item d-flex">
                    <div className="page-title">
                        <h4>Financial Years</h4>
                        <h6>Manage your company's fiscal cycles</h6>
                    </div>
                </div>
                <div className="page-btn">
                    <button 
                        className="btn btn-primary d-flex align-items-center" 
                        data-bs-toggle="modal" 
                        data-bs-target="#add_fy_modal"
                    >
                        <i className="isax isax-add-circle me-2"></i>Add Financial Year
                    </button>
                </div>
            </div>

            <div className="card table-list-card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table datanew">
                            <thead>
                                <tr>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    <th className="no-sort">Action</th>
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
                                ) : financialYears.length > 0 ? (
                                    financialYears.map((fy) => (
                                        <tr key={fy.id}>
                                            <td>{formatDate(fy.start_date)}</td>
                                            <td>{formatDate(fy.end_date)}</td>
                                            <td>
                                                <span className={`badge ${fy.is_active ? 'badge-soft-success' : 'badge-soft-danger'} d-inline-flex align-items-center`}>
                                                    <i className={`isax ${fy.is_active ? 'isax-tick-circle' : 'isax-close-circle'} me-1`}></i>
                                                    {fy.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="action-table-data">
                                                <div className="edit-delete-action">
                                                    <span className="me-2 p-2">
                                                        <i className="isax isax-edit text-primary"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5 text-muted">No financial years found. Click "Add Financial Year" to create one.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Financial Year Modal */}
            <div className="modal fade" id="add_fy_modal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="page-header-title p-4 border-bottom">
                            <h5 className="modal-title">Add Financial Year</h5>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body p-4">
                                <div className="row g-3">
                                    <div className="col-lg-12">
                                        <div className="form-group mb-3">
                                            <label className="form-label">Start Date <span className="text-danger">*</span></label>
                                            <input 
                                                type="date" 
                                                name="start_date" 
                                                className="form-control" 
                                                value={formData.start_date}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-3">
                                            <label className="form-label">End Date <span className="text-danger">*</span></label>
                                            <input 
                                                type="date" 
                                                name="end_date" 
                                                className="form-control" 
                                                value={formData.end_date}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="status-toggle border-0 d-flex justify-content-between align-items-center bg-light p-3 rounded">
                                            <p className="mb-0 fw-medium">Set as Active</p>
                                            <input 
                                                type="checkbox" 
                                                id="fy_active" 
                                                name="is_active" 
                                                className="check" 
                                                checked={formData.is_active}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="fy_active" className="checktoggle">checkbox</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer p-4 border-top">
                                <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save Financial Year'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialYears;
