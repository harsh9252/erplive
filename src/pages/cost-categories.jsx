import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { costCategoryService } from '../services/costCategoryService';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const CostCategories = () => {
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
    description: '',
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setLoading(true);
    try {
      // Get from localStorage or use dummy data
      const stored = localStorage.getItem('costCategories');
      if (stored) {
        setCategories(JSON.parse(stored));
      } else {
        const dummyData = [
          { id: 1, name: 'Administrative', description: 'General administrative and office expenses' },
          { id: 2, name: 'Operations', description: 'Day-to-day operational expenses' },
          { id: 3, name: 'Sales & Marketing', description: 'Sales and marketing department expenses' },
          { id: 4, name: 'IT & Technology', description: 'Information technology and software expenses' },
          { id: 5, name: 'Human Resources', description: 'HR and employee-related expenses' },
          { id: 6, name: 'Finance & Accounting', description: 'Financial and accounting department expenses' },
          { id: 7, name: 'Research & Development', description: 'R&D and innovation expenses' },
          { id: 8, name: 'Manufacturing', description: 'Production and manufacturing costs' },
          { id: 9, name: 'Logistics & Distribution', description: 'Shipping and distribution expenses' },
          { id: 10, name: 'Customer Service', description: 'Customer support and service expenses' }
        ];
        localStorage.setItem('costCategories', JSON.stringify(dummyData));
        setCategories(dummyData);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
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
      newErrors.name = 'Category Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      let updatedCategories;
      
      if (isEditMode) {
        updatedCategories = categories.map(cat => 
          cat.id === editingId ? { ...cat, ...formData } : cat
        );
        toast.success('Cost Category updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
        const newCategory = { id: newId, ...formData };
        updatedCategories = [...categories, newCategory];
        toast.success('Cost Category created successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }

      localStorage.setItem('costCategories', JSON.stringify(updatedCategories));
      setCategories(updatedCategories);
      
      setFormData({ name: '', description: '' });
      setShowForm(false);
      setIsEditMode(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(error.message || 'Failed to save cost category', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (id) => {
    const category = categories.find(cat => cat.id === id);
    if (category) {
      setFormData({ name: category.name, description: category.description || '' });
      setEditingId(id);
      setIsEditMode(true);
      setShowForm(true);
    }
  };

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const confirmDelete = () => {
    try {
      const updatedCategories = categories.filter(cat => cat.id !== confirmDialog.id);
      localStorage.setItem('costCategories', JSON.stringify(updatedCategories));
      setCategories(updatedCategories);
      toast.success('Cost Category deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error(error.message || 'Failed to delete cost category', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditMode(false);
    setEditingId(null);
    setFormData({ name: '', description: '' });
    setErrors({});
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Cost Category"
        message="Are you sure you want to delete this cost category? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />
      
      <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Cost Categories</h6>
            {!showForm && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowForm(true)}
              >
                <i className="isax isax-add-square me-2"></i>
                Add Category
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
                    {isEditMode ? 'Edit Cost Category' : 'Add New Cost Category'}
                  </h6>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label text-dark">
                        Category Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Administrative"
                      />
                      {errors.name && (
                        <div className="invalid-feedback d-block">{errors.name}</div>
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
                ) : categories.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-gray-9">No cost categories found</p>
                  </div>
                ) : (
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td className="fw-medium">{category.name}</td>
                          <td>{category.description || '-'}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-icon btn-soft-primary"
                                onClick={() => handleEdit(category.id)}
                                title="Edit"
                              >
                                <i className="isax isax-edit-25"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-icon btn-soft-danger"
                                onClick={() => handleDelete(category.id)}
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

export default CostCategories;
