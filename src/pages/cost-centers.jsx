import { useState, useEffect } from 'react';
import { costCenterService } from '../services/costCenterService';
import { costCategoryService } from '../services/costCategoryService';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const CostCenters = () => {
  const [costCenters, setCostCenters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });

  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    description: '',
    budget: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load categories from API
      const catResponse = await costCategoryService.getCategories();
      if (catResponse && catResponse.data) {
        setCategories(catResponse.data);
      }

      // Load cost centers from API
      const ccResponse = await costCenterService.getCostCenters();
      if (ccResponse && ccResponse.data) {
        setCostCenters(ccResponse.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load cost center data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Cost Center Name is required';
    }

    if (!formData.category_id) {
      newErrors.category_id = 'Category is required';
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
      const submitData = {
        ...formData,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        category_id: parseInt(formData.category_id)
      };

      if (isEditMode) {
        await costCenterService.updateCostCenter(editingId, submitData);
        toast.success('Cost Center updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        await costCenterService.createCostCenter(submitData);
        toast.success('Cost Center created successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }

      loadData(); // Reload from API
      handleCancel(); // Reset form
    } catch (error) {
      console.error('Error saving cost center:', error);
      toast.error(error.message || 'Failed to save cost center', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (id) => {
    const center = costCenters.find(c => c.id === id);
    if (center) {
      setFormData({
        name: center.name,
        category_id: center.category_id,
        description: center.description || '',
        budget: center.budget || ''
      });
      setEditingId(id);
      setIsEditMode(true);
      setShowForm(true);
    }
  };

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await costCenterService.deleteCostCenter(confirmDialog.id);
      loadData(); // Reload from API
      setConfirmDialog({ isOpen: false, id: null });
      toast.success('Cost Center deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error deleting cost center:', error);
      toast.error(error.message || 'Failed to delete cost center', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditMode(false);
    setEditingId(null);
    setFormData({ name: '', category_id: '', description: '', budget: '' });
    setErrors({});
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === parseInt(categoryId));
    return category ? category.name : '-';
  };

  const formatCurrency = (value) => {
    if (!value) return '-';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Cost Center"
        message="Are you sure you want to delete this cost center? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />
      
      <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Cost Centers</h6>
            {!showForm && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowForm(true)}
              >
                <i className="isax isax-add-square me-2"></i>
                Add Cost Center
              </button>
            )}
          </div>

          <div className="card-body">
            {errors.submit && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {errors.submit}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setErrors({ ...errors, submit: '' })}
                ></button>
              </div>
            )}

            {showForm && (
              <div className="card mb-4 border">
                <div className="card-body">
                  <h6 className="mb-3">
                    {isEditMode ? 'Edit Cost Center' : 'Add New Cost Center'}
                  </h6>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label text-dark">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Head Office"
                      />
                      {errors.name && (
                        <div className="invalid-feedback d-block">{errors.name}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark">
                        Category <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-control ${errors.category_id ? 'is-invalid' : ''}`}
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      {errors.category_id && (
                        <div className="invalid-feedback d-block">{errors.category_id}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter description"
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark">Budget Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="Enter budget amount"
                        step="0.01"
                        min="0"
                      />
                    </div>

                    <div className="d-flex gap-2">
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
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleCancel}
                        disabled={submitting}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {!showForm && (
              <div className="table-responsive">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : costCenters.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-gray-9">No cost centers found</p>
                  </div>
                ) : (
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Budget</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costCenters.map((center) => (
                        <tr key={center.id}>
                          <td className="fw-medium">{center.name}</td>
                          <td>{getCategoryName(center.category_id)}</td>
                          <td>{center.description || '-'}</td>
                          <td>{formatCurrency(center.budget)}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-icon btn-soft-primary"
                                onClick={() => handleEdit(center.id)}
                                title="Edit"
                              >
                                <i className="isax isax-edit-25"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-icon btn-soft-danger"
                                onClick={() => handleDelete(center.id)}
                                title="Delete"
                              >
                                <i className="isax isax-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CostCenters;
