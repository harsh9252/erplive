import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import categoryService from '../services/categoryService';

const ItemCategories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null, isBulk: false });
  const [formData, setFormData] = useState({
    name: '',
    parent_category_id: '',
  });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    filterAndSortCategories();
  }, [categories, searchTerm, sortBy]);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const response = await categoryService.getStockCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        toast.error('Failed to load categories');
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      // toast.error('Error loading categories');
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortCategories = () => {
    let filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'latest') {
      filtered.sort((a, b) => {
        const dateB = new Date(b.created_at || b.createdAt);
        const dateA = new Date(a.created_at || a.createdAt);
        return dateB - dateA;
      });
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => {
        const dateA = new Date(a.created_at || a.createdAt);
        const dateB = new Date(b.created_at || b.createdAt);
        return dateA - dateB;
      });
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCategories(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrors({ name: 'Category name is required' });
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (editingId) {
        response = await categoryService.updateStockCategory(editingId, formData);
        if (response.success) {
          toast.success('Category updated successfully!');
        } else {
          toast.error(response.message || 'Failed to update category');
        }
      } else {
        response = await categoryService.createStockCategory(formData);
        if (response.success) {
          toast.success('Category created successfully!');
        } else {
          toast.error(response.message || 'Failed to create category');
        }
      }

      if (response.success) {
        resetForm();
        await loadCategories();
      }
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(error.message || 'Error saving category');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', parent_category_id: '' });
    setEditingId(null);
    setErrors({});
    setShowForm(false);
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      parent_category_id: category.parent_category_id || '',
    });
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id, isBulk: false });
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      if (confirmDialog.isBulk) {
        const ids = Array.from(selectedCategories);
        const results = await Promise.all(ids.map((id) => categoryService.deleteStockCategory(id)));
        const successCount = results.filter((res) => res.success).length;
        if (successCount === ids.length) {
          toast.success('Selected categories deleted successfully!');
        } else {
          toast.warning(`Deleted ${successCount} out of ${ids.length} selected categories.`);
        }
        setSelectedCategories(new Set());
      } else {
        const response = await categoryService.deleteStockCategory(confirmDialog.id);
        if (response.success) {
          toast.success('Category deleted successfully!');
        } else {
          toast.error(response.message || 'Failed to delete category');
        }
      }
      await loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error(error.message || 'Error deleting category');
    } finally {
      setIsLoading(false);
      setConfirmDialog({ isOpen: false, id: null, isBulk: false });
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCategories(new Set(filteredCategories.map((cat) => cat.id)));
    } else {
      setSelectedCategories(new Set());
    }
  };

  const handleSelectCategory = (id) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCategories(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedCategories.size === 0) {
      toast.warning('Please select categories to delete', { position: 'top-right', autoClose: 3000 });
      return;
    }
    setConfirmDialog({ isOpen: true, id: null, isBulk: true });
  };

  const getParentCategoryName = (parentId) => {
    if (!parentId) return '-';
    // Match based on id (could be string or number depending on API)
    const parent = categories.find((cat) => String(cat.id) === String(parentId));
    return parent ? parent.name : '-';
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null, isBulk: false })}
        onConfirm={confirmDelete}
        title={confirmDialog.isBulk ? 'Delete Selected Categories' : 'Delete Category'}
        message={
          confirmDialog.isBulk
            ? `Are you sure you want to delete ${selectedCategories.size} selected category(ies)? This action cannot be undone.`
            : 'Are you sure you want to delete this category? This action cannot be undone.'
        }
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Stock Groups</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item active">Stock Groups</li>
            </ol>
          </nav>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
          disabled={isLoading}
        >
          <i className="isax isax-add-circle5 me-1"></i>
          {showForm ? 'Cancel' : 'Add Stock Group'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="mb-3">{editingId ? 'Edit Category' : 'Add New Category'}</h6>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Category Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter category name"
                      disabled={isLoading}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Parent Category (Stock Group)</label>
                    <select
                      className="form-control"
                      name="parent_category_id"
                      value={formData.parent_category_id}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    >
                      <option value="">None (Top-Level / Group)</option>
                      {categories
                        .filter((cat) => String(cat.id) !== String(editingId) && !cat.parent_category_id)
                        .map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                    <small className="text-muted">Select a top-level group to make this a sub-category.</small>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : editingId ? (
                    'Update Stock Group'
                  ) : (
                    'Add Stock Group'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!showForm && (
        <>
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center flex-wrap gap-2">
                <div className="table-search d-flex align-items-center mb-0">
                  <div className="search-input">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      disabled={isLoading}
                    />
                    <Link to="#" className="btn-searchset">
                      <i className="isax isax-search-normal fs-12"></i>
                    </Link>
                  </div>
                </div>
                {selectedCategories.size > 0 && (
                  <button
                    className="btn btn-outline-danger d-inline-flex align-items-center"
                    onClick={handleDeleteSelected}
                    disabled={isLoading}
                  >
                    <i className="isax isax-trash me-1"></i>Delete ({selectedCategories.size})
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="table-responsive">
              <table className="table table-nowrap table-hover mb-0">
                <thead className="thead-light">
                  <tr>

                    <th>Stock Group Name</th>
                    <th>Parent Group</th>
                    <th className="text-end no-sort pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && categories.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-2 text-muted">Loading categories...</p>
                      </td>
                    </tr>
                  ) : filteredCategories.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-5">
                        <i className="isax isax-folder fs-1 text-muted mb-3 d-block"></i>
                        <h6 className="mb-2">No Categories Found</h6>
                        <p className="text-muted mb-0">
                          {categories.length === 0
                            ? 'Start by adding your first category'
                            : 'No categories match your search'}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredCategories.map((category) => (
                      <tr key={category.id}>

                        <td>
                          <div className="d-flex align-items-center">
                            <i
                              className={`isax ${
                                !category.parent_category_id ? 'isax-folder-2' : 'isax-folder-minus'
                              } me-2 text-primary fs-18`}
                            ></i>
                            <h6 className="fs-14 fw-medium mb-0">{category.name}</h6>
                          </div>
                        </td>
                        <td>
                          {category.parent_category_id ? (
                            <span className="badge badge-soft-primary">
                              {getParentCategoryName(category.parent_category_id)}
                            </span>
                          ) : (
                            <span className="badge badge-soft-dark text-muted">Top-Level Group</span>
                          )}
                        </td>
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end align-items-center gap-2">
                            <button 
                              className="btn btn-sm btn-soft-warning border-0" 
                              onClick={() => handleEdit(category)}
                              title="Edit"
                            >
                              <i className="isax isax-edit-2 fs-16"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-soft-danger border-0" 
                              onClick={() => handleDelete(category.id)}
                              title="Delete"
                            >
                              <i className="isax isax-trash fs-16"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {filteredCategories.length > 0 && (
              <div className="card-footer bg-white border-top-0 py-3">
                <div className="text-muted fs-12">
                  Showing {filteredCategories.length} of {categories.length} categories
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ItemCategories;
