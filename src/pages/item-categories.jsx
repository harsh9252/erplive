import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const ItemCategories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null, isBulk: false });
  const [formData, setFormData] = useState({
    name: '',
    parent_id: '',
    description: '',
  });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    filterAndSortCategories();
  }, [categories, searchTerm, sortBy]);

  const loadCategories = () => {
    const storedCategories = JSON.parse(localStorage.getItem('itemCategories') || '[]');
    setCategories(storedCategories);
  };

  const filterAndSortCategories = () => {
    let filtered = categories.filter(cat =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCategories(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Category name is required', { position: 'top-right', autoClose: 3000 });
      return;
    }

    if (editingId) {
      const updatedCategories = categories.map(cat =>
        cat.id === editingId
          ? { ...formData, id: editingId, updatedAt: new Date().toISOString() }
          : cat
      );
      localStorage.setItem('itemCategories', JSON.stringify(updatedCategories));
      setCategories(updatedCategories);
      toast.success('Category updated successfully!', { position: 'top-right', autoClose: 3000 });
    } else {
      const newCategory = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      const updatedCategories = [...categories, newCategory];
      localStorage.setItem('itemCategories', JSON.stringify(updatedCategories));
      setCategories(updatedCategories);
      toast.success('Category created successfully!', { position: 'top-right', autoClose: 3000 });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', parent_id: '', description: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (category) => {
    setFormData(category);
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id, isBulk: false });
  };

  const confirmDelete = () => {
    if (confirmDialog.isBulk) {
      const updatedCategories = categories.filter(cat => !selectedCategories.has(cat.id));
      localStorage.setItem('itemCategories', JSON.stringify(updatedCategories));
      setCategories(updatedCategories);
      setSelectedCategories(new Set());
      toast.success('Selected categories deleted successfully!', { position: 'top-right', autoClose: 3000 });
    } else {
      const updatedCategories = categories.filter(cat => cat.id !== confirmDialog.id);
      localStorage.setItem('itemCategories', JSON.stringify(updatedCategories));
      setCategories(updatedCategories);
      toast.success('Category deleted successfully!', { position: 'top-right', autoClose: 3000 });
    }
    setConfirmDialog({ isOpen: false, id: null, isBulk: false });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCategories(new Set(categories.map(cat => cat.id)));
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
    const parent = categories.find(cat => cat.id === parseInt(parentId));
    return parent ? parent.name : '-';
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null, isBulk: false })}
        onConfirm={confirmDelete}
        title={confirmDialog.isBulk ? "Delete Selected Categories" : "Delete Category"}
        message={
          confirmDialog.isBulk
            ? `Are you sure you want to delete ${selectedCategories.size} selected category(ies)? This action cannot be undone.`
            : "Are you sure you want to delete this category? This action cannot be undone."
        }
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Item Categories</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item active">Item Categories</li>
            </ol>
          </nav>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="isax isax-add-circle5 me-1"></i>
          {showForm ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="mb-3">{editingId ? 'Edit Category' : 'Add New Category'}</h6>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Category Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter category name"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Parent Category</label>
                    <select
                      className="form-control"
                      name="parent_id"
                      value={formData.parent_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Parent Category</option>
                      {categories
                        .filter(cat => cat.id !== editingId)
                        .map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter category description"
                  rows="3"
                ></textarea>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Category' : 'Add Category'}
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
                    <i className="isax isax-search-normal fs-12"></i>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                {selectedCategories.size > 0 && (
                  <button
                    className="btn btn-outline-danger d-inline-flex align-items-center"
                    onClick={handleDeleteSelected}
                  >
                    <i className="isax isax-trash me-1"></i>Delete ({selectedCategories.size})
                  </button>
                )}
              </div>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <i className="isax isax-sort me-1"></i>Sort By :{' '}
                  <span className="fw-normal ms-1">
                    {sortBy === 'latest' ? 'Latest' : sortBy === 'oldest' ? 'Oldest' : 'Name'}
                  </span>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link href="#" className="dropdown-item" onClick={() => setSortBy('latest')}>
                      Latest
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item" onClick={() => setSortBy('oldest')}>
                      Oldest
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item" onClick={() => setSortBy('name')}>
                      Name
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="isax isax-folder fs-1 text-muted mb-3 d-block"></i>
                <h6 className="mb-2">No Categories Found</h6>
                <p className="text-muted mb-3">
                  {categories.length === 0
                    ? 'Start by adding your first category'
                    : 'No categories match your search'}
                </p>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-nowrap">
                <thead className="thead-light">
                  <tr>
                    <th className="no-sort">
                      <div className="form-check form-check-md">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedCategories.size === filteredCategories.length && filteredCategories.length > 0}
                        />
                      </div>
                    </th>
                    <th>Category Name</th>
                    <th>Parent Category</th>
                    <th>Description</th>
                    <th className="no-sort">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr key={category.id}>
                      <td>
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedCategories.has(category.id)}
                            onChange={() => handleSelectCategory(category.id)}
                          />
                        </div>
                      </td>
                      <td>
                        <h6 className="fs-14 fw-medium mb-0">{category.name}</h6>
                      </td>
                      <td>{getParentCategoryName(category.parent_id)}</td>
                      <td>
                        <p className="text-muted fs-12 mb-0">
                          {category.description ? category.description.substring(0, 50) + '...' : '-'}
                        </p>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-icon btn-soft-primary"
                            onClick={() => handleEdit(category)}
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
            </div>
          )}

          <div className="mt-3 text-muted fs-12">
            Showing {filteredCategories.length} of {categories.length} categories
          </div>
        </>
      )}
    </>
  );
};

export default ItemCategories;
