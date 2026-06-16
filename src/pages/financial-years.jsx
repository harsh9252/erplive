import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import financialYearService from '../services/financialYearService';
import carryForwardService from '../services/carryForwardService';
import { useAuth } from '../components/AuthContext';

const FinancialYears = () => {
    const { activeCompany } = useAuth();
    const [financialYears, setFinancialYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [activatingId, setActivatingId] = useState(null);
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
            const response = await financialYearService.getFinancialYears();
            setFinancialYears(response.data || []);
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

        const startDate = new Date(formData.start_date);
        const endDate = new Date(formData.end_date);
        
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        if (startDate >= endDate) {
            toast.warning('End Date must be later than Start Date');
            return;
        }

        if (endDate.getMonth() !== 2 || endDate.getDate() !== 31) {
            toast.warning('Financial Year end date must always be March 31st');
            return;
        }

        const expectedStartYear = endDate.getFullYear() - 1;
        const expectedStartDate = new Date(expectedStartYear, 3, 1); // April 1st of previous year
        expectedStartDate.setHours(0, 0, 0, 0);

        if (startDate < expectedStartDate) {
            toast.warning(`Start date cannot be earlier than 01-Apr-${expectedStartYear} for the selected end date`);
            return;
        }

        // Auto-generate name from start_date (e.g. FY 2026-27)
        const startYear = startDate.getFullYear();
        const nextYearShort = String(startYear + 1).slice(-2);
        const generatedName = `FY ${startYear}-${nextYearShort}`;

        // Prevent overlapping financial years
        const isOverlapping = financialYears.some(fy => {
            if (isEditMode && fy.id === editingId) return false;
            
            const existingStart = new Date(fy.start_date);
            const existingEnd = new Date(fy.end_date);
            
            return (startDate <= existingEnd && endDate >= existingStart);
        });

        if (isOverlapping) {
            toast.warning('The selected dates overlap with an existing financial year.');
            return;
        }

        // Prevent duplicate names
        const isDuplicateName = financialYears.some(fy => {
            if (isEditMode && fy.id === editingId) return false;
            return fy.name === generatedName;
        });

        if (isDuplicateName) {
            toast.warning(`A financial year with the name ${generatedName} already exists.`);
            return;
        }

        const payload = {
            ...formData,
            name: generatedName
        };

        try {
            setIsSubmitting(true);
            let response;
            if (isEditMode) {
                response = await financialYearService.updateFinancialYear(editingId, payload);
            } else {
                response = await financialYearService.createFinancialYear(payload);
            }

            if (response && response.success !== false) {
                // If set as active is checked, call the switch API to update backend active state
                if (formData.is_active) {
                    const targetId = isEditMode ? editingId : (response.data?.id || response.id);
                    if (targetId) {
                        await financialYearService.switchFinancialYear(targetId);
                        localStorage.setItem('activeFinancialYearId', String(targetId));
                    }
                }

                toast.success(isEditMode ? 'Financial year updated successfully' : 'Financial year created successfully');

                // Success: Close modal (if using bootstrap)
                const modalElement = document.getElementById('add_fy_modal');
                const modal = window.bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();

                // Reset form and refresh list
                resetForm();
                fetchFinancialYears();
                window.dispatchEvent(new Event('FINANCIAL_YEARS_UPDATED'));
            } else {
                toast.error(response?.message || `Failed to ${isEditMode ? 'update' : 'create'} financial year`);
            }
        } catch (error) {
            console.error('Error saving financial year:', error);
            toast.error(error.message || `Failed to ${isEditMode ? 'update' : 'create'} financial year`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', start_date: '', end_date: '', is_active: false });
        setIsEditMode(false);
        setEditingId(null);
    };

    const handleEdit = (fy) => {
        setFormData({
            name: fy.name,
            start_date: fy.start_date ? fy.start_date.split('T')[0] : '',
            end_date: fy.end_date ? fy.end_date.split('T')[0] : '',
            is_active: fy.is_active
        });
        setEditingId(fy.id);
        setIsEditMode(true);
        // Bug 3.1 fix: use getOrCreateInstance to avoid duplicate modal instances
        const modalElement = document.getElementById('add_fy_modal');
        const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.show();
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await financialYearService.deleteFinancialYear(id);
                    if (response && response.success !== false) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Financial year has been deleted.',
                            icon: 'success',
                            iconHtml: '<i class="isax isax-tick-circle text-success fs-50"></i>',
                            customClass: {
                                icon: 'border-0'
                            }
                        });
                        fetchFinancialYears();
                        window.dispatchEvent(new Event('FINANCIAL_YEARS_UPDATED'));
                    } else {
                        toast.error(response?.message || 'Failed to delete financial year');
                    }
                } catch (error) {
                    console.error('Error deleting financial year:', error);
                    toast.error(error.message || 'Failed to delete financial year');
                }
            }
        });
    };

    const handleSetActive = async (id) => {
        if (activatingId) return;

        const fy = financialYears.find(y => y.id === id);
        if (fy?.is_active) {
            toast.warning('This financial year is already active');
            return;
        }

        try {
            setActivatingId(id);
            const response = await financialYearService.switchFinancialYear(id);
            if (response && response.success !== false) {
                localStorage.setItem('activeFinancialYearId', String(id));
                toast.success('Financial year activated successfully');
                fetchFinancialYears();
                window.dispatchEvent(new Event('FINANCIAL_YEARS_UPDATED'));
            } else {
                toast.error(response?.message || 'Failed to activate financial year');
            }
        } catch (error) {
            console.error('Error activating financial year:', error);
            toast.error(error.message || 'Failed to activate financial year');
        } finally {
            setActivatingId(null);
        }
    };

    const handleCarryForward = async (fy) => {
        const endDate = fy.end_date ? fy.end_date.split('T')[0] : '';

        Swal.fire({
            title: 'Carry Forward Balances?',
            text: `This will calculate closing balances as of ${formatDate(fy.end_date)} and set them as opening balances for ledgers. Note: Income and Expense accounts will be reset to 0.`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Carry Forward',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    return await carryForwardService.performCarryForward(endDate, (curr, total) => {
                        // Optional: Update a progress bar in Swal if needed
                        Swal.update({
                            text: `Processing ledgers... (${curr}/${total})`
                        });
                    });
                } catch (error) {
                    Swal.showValidationMessage(`Request failed: ${error.message}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                // Bug 3.4 fix: guard against undefined result.value before destructuring
                if (!result.value) {
                    Swal.fire('Error', 'No response received from carry forward service.', 'error');
                    return;
                }
                const { success, failed, total } = result.value;
                Swal.fire({
                    title: 'Process Complete',
                    html: `
                        <div class="text-start">
                            <p class="text-success mb-1"><i class="isax isax-tick-circle text-success me-2"></i> ${success.length} Ledgers updated successfully.</p>
                            ${failed.length > 0 ? `<p class="text-danger mb-1"><i class="isax isax-close-circle text-danger me-2"></i> ${failed.length} Ledgers failed to update.</p>` : ''}
                            <p class="text-muted small mt-2">Total processed: ${total}</p>
                        </div>
                    `,
                    icon: failed.length > 0 ? 'warning' : 'success',
                    iconHtml: failed.length > 0 ? undefined : '<i class="isax isax-tick-circle text-success fs-50"></i>',
                    customClass: {
                        icon: 'border-0'
                    }
                });
            }
        });
    };

    const handleCloseYear = async (year) => {
        const { isConfirmed } = await Swal.fire({
            title: `Close ${year.name}?`,
            text: "Closing a financial year will finalize all balances and carry them forward. This action is irreversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Close Year',
            cancelButtonText: 'Cancel'
        });

        if (!isConfirmed) return;

        try {
            setLoading(true);
            await financialYearService.closeFinancialYear(year.id);
            toast.success(`${year.name} closed successfully`);
            fetchFinancialYears();
        } catch (error) {
            console.error('Error closing financial year:', error);
            toast.error(error.message || 'Failed to close financial year');
        } finally {
            setLoading(false);
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

    if (!activeCompany) {
        return (
            <div className="content container-fluid pb-5">
                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
                    <div className="text-center">
                        <div className="avatar avatar-xxl bg-soft-primary text-primary rounded-circle mb-4 mx-auto d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                            <i className="isax isax-building fs-40"></i>
                        </div>
                        <h3 className="fw-bold mb-2">No Active Company</h3>
                        <p className="text-muted mb-4">Please create and select a company to manage financial years.</p>
                        <Link to="/add-company" className="btn btn-primary px-4 py-2 rounded-3">
                            <i className="isax isax-add-circle5 me-2"></i>Create Company
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

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
                        onClick={() => {
                            resetForm();
                            // Bug 3.1 fix: use getOrCreateInstance for the Add button too
                            const modalElement = document.getElementById('add_fy_modal');
                            const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
                            modal.show();
                        }}
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
                                    <th>Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    <th className="no-sort text-end pe-4">Action</th>
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
                                            {/* Bug 3.5 fix: show FY name column */}
                                            <td><span className="fw-semibold">{fy.name || `FY ${new Date(fy.start_date).getFullYear()}-${String(new Date(fy.end_date).getFullYear()).slice(-2)}`}</span></td>
                                            <td>{formatDate(fy.start_date)}</td>
                                            <td>{formatDate(fy.end_date)}</td>
                                            <td>
                                                {fy.is_active ? (
                                                    <span className="badge badge-soft-success d-inline-flex align-items-center">
                                                        <i className="isax isax-tick-circle me-1"></i>Active
                                                    </span>
                                                ) : fy.status === 'CLOSED' ? (
                                                    <span className="badge badge-soft-secondary d-inline-flex align-items-center">
                                                        <i className="isax isax-lock me-1"></i>Closed
                                                    </span>
                                                ) : (
                                                    <span className="badge badge-soft-danger d-inline-flex align-items-center">
                                                        <i className="isax isax-close-circle me-1"></i>Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="text-end pe-4">
                                                <div className="d-flex justify-content-end align-items-center gap-2">
                                                    {/* Bug 3.2/3.6 fix: disable activate button if already active */}
                                                    {!fy.is_active && fy.status !== 'CLOSED' && (
                                                        <button
                                                            className="btn btn-sm btn-soft-success border-0"
                                                            onClick={() => handleSetActive(fy.id)}
                                                            disabled={activatingId !== null}
                                                            title="Activate Year"
                                                        >
                                                            {activatingId === fy.id ? (
                                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            ) : (
                                                                <i className="isax isax-tick-circle fs-16"></i>
                                                            )}
                                                        </button>
                                                    )}
                                                    {/* Bug 3.3 fix: show Close Year only for inactive, non-closed years */}
                                                    {!fy.is_active && fy.status !== 'CLOSED' && (
                                                        <button
                                                            className="btn btn-sm btn-soft-danger border-0"
                                                            onClick={() => handleCloseYear(fy)}
                                                            title="Close Year"
                                                        >
                                                            <i className="isax isax-lock fs-16 text-danger"></i>
                                                        </button>
                                                    )}
                                                    {/* Bug 3.3 fix: Carry Forward only for non-active years */}
                                                    {!fy.is_active && (
                                                        <button
                                                            className="btn btn-sm btn-soft-info border-0"
                                                            onClick={() => handleCarryForward(fy)}
                                                            title="Carry Forward Balances to Next Year"
                                                        >
                                                            <i className="isax isax-refresh fs-16"></i>
                                                        </button>
                                                    )}
                                                    {/* Bug 3.2 fix: disable Edit for active or closed years */}
                                                    <button
                                                        className="btn btn-sm btn-soft-warning border-0"
                                                        onClick={() => handleEdit(fy)}
                                                        title={fy.is_active ? 'Cannot edit active year' : fy.status === 'CLOSED' ? 'Cannot edit closed year' : 'Edit Year'}
                                                        disabled={fy.is_active || fy.status === 'CLOSED'}
                                                    >
                                                        <i className="isax isax-edit-2 fs-16"></i>
                                                    </button>
                                                    {/* Bug 3.6 fix: disable Delete for active year */}
                                                    <button
                                                        className="btn btn-sm btn-soft-danger border-0"
                                                        onClick={() => handleDelete(fy.id)}
                                                        title={fy.is_active ? 'Cannot delete active year' : 'Delete Year'}
                                                        disabled={fy.is_active}
                                                    >
                                                        <i className="isax isax-trash fs-16"></i>
                                                    </button>
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
                            <h5 className="modal-title">{isEditMode ? 'Edit Financial Year' : 'Add Financial Year'}</h5>
                        </div>
                        <form onSubmit={handleSubmit} autoComplete="off">
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
                                                autoComplete="one-time-code"
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
                                                autoComplete="one-time-code"
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

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer p-4 border-top">
                                <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal" onClick={resetForm}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Financial Year' : 'Save Financial Year')}
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
