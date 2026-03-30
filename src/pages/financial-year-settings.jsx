import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { financialYearService } from '../services/financialYearService';
import { toast } from 'react-toastify';

const FinancialYearSettings = () => {
  const [financialYears, setFinancialYears] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    is_active: false,
  });

  // Load financial years on mount
  useEffect(() => {
    loadFinancialYears();
  }, []);

  const loadFinancialYears = async () => {
    setLoading(true);
    try {
      const response = await financialYearService.getFinancialYears();
      if (response && response.data) {
        setFinancialYears(Array.isArray(response.data) ? response.data : []);
      } else if (Array.isArray(response)) {
        setFinancialYears(response);
      } else {
        setFinancialYears([]);
      }
    } catch (error) {
      console.error('Error loading financial years:', error);
      toast.error('Failed to load financial years');
      setFinancialYears([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Year Name is required';
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Start Date is required';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'End Date is required';
    }

    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      if (startDate >= endDate) {
        newErrors.end_date = 'End Date must be after Start Date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      if (isEditMode) {
        // Many APIs don't support updating financial years
        try {
          const response = await financialYearService.updateFinancialYear(editingId, formData);
          if (response.success) {
            toast.success('Financial Year updated successfully');
          } else {
            toast.error(response.message || 'Failed to update financial year');
          }
        } catch (err) {
          if (err.message.includes('not support updating')) {
            toast.warning('Updating financial years is not supported by the backend');
          } else {
            throw err;
          }
        }
      } else {
        const response = await financialYearService.createFinancialYear(formData);
        if (response.success) {
          toast.success('Financial Year created successfully');
        } else {
          toast.error(response.message || 'Failed to create financial year');
        }
      }

      // Reset form
      setFormData({
        name: '',
        start_date: '',
        end_date: '',
        is_active: false,
      });
      setShowForm(false);
      setIsEditMode(false);
      setEditingId(null);

      // Reload list
      await loadFinancialYears();
    } catch (error) {
      console.error('Error saving financial year:', error);
      toast.error(error.message || 'Failed to save financial year');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (year) => {
    setFormData({
      name: year.name || '',
      start_date: year.start_date || '',
      end_date: year.end_date || '',
      is_active: !!year.is_active,
    });
    setEditingId(year.id);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this financial year?')) {
      try {
        await financialYearService.deleteFinancialYear(id);
        toast.success('Financial Year deleted successfully');
        await loadFinancialYears();
      } catch (error) {
        if (error.message.includes('not support deleting')) {
          toast.warning('Deleting financial years is not supported by the backend');
        } else {
          console.error('Error deleting financial year:', error);
          toast.error(error.message || 'Failed to delete financial year');
        }
      }
    }
  };

  const handleSetActive = async (id) => {
    try {
      // Update the financial year to set as active
      const response = await financialYearService.updateFinancialYear(id, { is_active: true });
      if (response.success) {
        toast.success('Financial Year set as active successfully');
        await loadFinancialYears();
      } else {
        toast.error(response.message || 'Failed to set active');
      }
    } catch (error) {
      if (error.message.includes('not support updating')) {
        toast.warning('Switching active financial years is not supported by the backend via this method');
      } else {
        console.error('Error setting financial year as active:', error);
        toast.error(error.message || 'Failed to set financial year as active');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      name: '',
      start_date: '',
      end_date: '',
      is_active: false,
    });
    setErrors({});
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-12">
        <div className="row settings-wrapper d-flex">
          {/* Settings Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <SettingsSidebar activeItem="financial-year-settings" />
          </div>

          {/* Main Content */}
          <div className="col-xl-9 col-lg-8">
            <div className="mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0">Financial Year</h6>
                <p className="fs-13 text-muted mt-1">Manage financial periods for your company</p>
              </div>
              {!showForm && (
                <button
                  className="btn btn-primary d-flex align-items-center"
                  onClick={() => setShowForm(true)}
                >
                  <i className="isax isax-add-circle me-2"></i>
                  Add Financial Year
                </button>
              )}
            </div>

            {/* Form */}
            {showForm && (
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h6 className="mb-3 fw-bold">
                    {isEditMode ? 'Edit Financial Year' : 'Add New Financial Year'}
                  </h6>

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      {/* Year Name */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-dark">
                          Year Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g., FY 2025-26"
                          required
                        />
                        {errors.name && (
                          <div className="invalid-feedback d-block">{errors.name}</div>
                        )}
                      </div>

                      {/* Active Checkbox */}
                      <div className="col-md-6 mb-3 d-flex align-items-end pb-2">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="is_active"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label text-dark" htmlFor="is_active">
                            Set as Active Year
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {/* Start Date */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-dark">
                          Start Date <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className={`form-control ${errors.start_date ? 'is-invalid' : ''}`}
                          name="start_date"
                          value={formData.start_date}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.start_date && (
                          <div className="invalid-feedback d-block">{errors.start_date}</div>
                        )}
                      </div>

                      {/* End Date */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-dark">
                          End Date <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className={`form-control ${errors.end_date ? 'is-invalid' : ''}`}
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.end_date && (
                          <div className="invalid-feedback d-block">{errors.end_date}</div>
                        )}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-end gap-2 mt-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleCancel}
                        disabled={submitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <i className="isax isax-save-2 me-2"></i>
                            {isEditMode ? 'Update' : 'Create'}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Financial Years List */}
            {!showForm && (
              <div className="card shadow-sm border-0 overflow-hidden">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : financialYears.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="isax isax-calendar fs-1 text-muted mb-3 d-block"></i>
                    <h6 className="mb-1">No financial years found</h6>
                    <p className="text-muted small">Start by adding your company's financial periods</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="ps-4">Year Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                          {/* <th className="text-end pe-4">Actions</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {financialYears.map((year) => (
                          <tr key={year.id}>
                            <td className="ps-4">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-xs bg-light-info rounded-circle me-2 d-flex align-items-center justify-content-center">
                                  <i className="isax isax-calendar-tick text-info fs-14"></i>
                                </div>
                                <span className="fw-medium">{year.name}</span>
                              </div>
                            </td>
                            <td>{formatDate(year.start_date)}</td>
                            <td>{formatDate(year.end_date)}</td>
                            <td>
                              {year.is_active ? (
                                <span className="badge bg-light-success text-success">Active</span>
                              ) : (
                                <span className="badge bg-light-secondary text-secondary">Inactive</span>
                              )}
                            </td>
                            <td className="text-end pe-4">
                              <div className="d-flex justify-content-end gap-2">
                                {!year.is_active && (
                                  <button
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => handleSetActive(year.id)}
                                    title="Set as Active"
                                  >
                                    <i className="isax isax-tick-circle"></i>
                                  </button>
                                )}
                                {/* <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleEdit(year)}
                                  title="Edit"
                                >
                                  <i className="isax isax-edit"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(year.id)}
                                  title="Delete"
                                >
                                  <i className="isax isax-trash"></i>
                                </button> */}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            <div className="mt-3 text-muted fs-12 ms-2">
              Manage your financial cycles carefully as transactions are tied to these periods.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialYearSettings;
