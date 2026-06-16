import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { costCenterService } from '../services/costCenterService';
import { costCategoryService } from '../services/costCategoryService';
import { toNumberOrValue } from '../services/apiUtils';

const CostCentres = () => {
  const [activeTab, setActiveTab] = useState('centres'); // 'centres' or 'categories'
  const [loadingCentres, setLoadingCentres] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Data states
  const [centres, setCentres] = useState([]);
  const [categories, setCategories] = useState([]);

  // Filterable data
  const [filteredCentres, setFilteredCentres] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // Modal / Form states
  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    parent_id: '',
    status: 'Active'
  });

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Apply search filter locally
    if (activeTab === 'centres') {
      setFilteredCentres(centres.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.category?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredCategories(categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  }, [searchTerm, centres, categories, activeTab]);

  const fetchData = async () => {
    // Debug log removed (CC-3 fix)
    setLoadingCentres(true);
    try {
      const centresResp = await costCenterService.getCostCenters();
      setCentres(centresResp.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoadingCentres(false);
    }
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const categoriesResp = await costCategoryService.getCategories();
      setCategories(categoriesResp.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setCategoriesLoaded(true);
      setLoadingCategories(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      category_id: '',
      parent_id: '',
      status: 'Active'
    });
    setErrors({});
    setIsEdit(false);
    setSelectedItem(null);
  };

  const openModal = async (item = null) => {
    if (activeTab === 'centres' && categories.length === 0) {
      await fetchCategories();
    }

    if (item) {
      setIsEdit(true);
      setSelectedItem(item);
      setErrors({});
      setFormData({
        name: item.name || '',
        category_id: item.category_id || item.category?.id || '',
        parent_id: item.parent_id || '',
        status: item.is_active === false ? 'Inactive' : 'Active'
      });
    } else {
      resetFormData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let newErrors = {};
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (activeTab === 'centres' && !formData.category_id) newErrors.category_id = 'Category is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isSaving) return;
    
    setIsSaving(true);
    try {
      if (activeTab === 'categories') {
        const payload = { name: formData.name };
        if (isEdit) {
          await costCategoryService.updateCategory(selectedItem.id, payload);
          toast.success('Category updated successfully');
        } else {
          await costCategoryService.createCategory(payload);
          toast.success('Category created successfully');
        }
        await fetchCategories();
      } else {
        const payload = {
          name: formData.name,
          category_id: toNumberOrValue(formData.category_id),
          parent_id: toNumberOrValue(formData.parent_id),
          is_active: formData.status === 'Active'
        };
        if (isEdit) {
          await costCenterService.updateCostCenter(selectedItem.id, payload);
          toast.success('Cost centre updated successfully');
        } else {
          await costCenterService.createCostCenter(payload);
          toast.success('Cost centre created successfully');
        }
      }

      // CC-1/CC-2 fix: use static modal IDs and close programmatically
      const modalId = activeTab === 'categories' ? 'cost_category_modal' : 'cost_centre_modal';
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
        if (modal) modal.hide();
      }

      fetchData();
    } catch (error) {
      toast.error(error.message || 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id, type) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (type === 'category') {
            await costCategoryService.deleteCategory(id);
            await fetchCategories();
          } else {
            await costCenterService.deleteCostCenter(id);
            await fetchData();
          }
          toast.success('Deleted successfully');
        } catch (error) {
          let errorMessage = error.message || 'Deletion failed. The item may be in use.';
          if (error.code === 'FOREIGN_KEY_ERROR' || errorMessage.includes('Referenced record')) {
            errorMessage = `Cannot delete this ${type} because it is currently in use by other records.`;
          }
          toast.error(errorMessage);
        }
      }
    });
  };

  return (
    <>
      <div className="page-header d-flex align-items-center justify-content-between mb-4">
        <div className="page-title">
          <h4>Cost Centres</h4>
          <p className="text-muted mb-0">Manage organizational units and expenditure tracking</p>
        </div>
        <div className="page-header-right">
          <button
            className="btn btn-primary d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target={activeTab === 'centres' ? '#cost_centre_modal' : '#cost_category_modal'}
            onClick={() => openModal()}
          >
            <i className="isax isax-add-circle5 me-2"></i>Add {activeTab === 'centres' ? 'Centre' : 'Category'}
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-transparent border-bottom-0 pb-0 px-0">
          <ul className="nav nav-tabs nav-tabs-bottom px-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'centres' ? 'active' : ''}`}
                onClick={() => { setActiveTab('centres'); setSearchTerm(''); }}
              >
                Cost Centres <span className="badge rounded-pill bg-light text-dark ms-2">{centres.length}</span>
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'categories' ? 'active' : ''}`}
                onClick={() => { setActiveTab('categories'); setSearchTerm(''); }}
              >
                Categories <span className="badge rounded-pill bg-light text-dark ms-2">{categories.length}</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-2 mb-4 mt-2">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="isax isax-search-normal text-muted fs-14"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0 shadow-none"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="right-tools">
              <button
                className="btn btn-light btn-sm"
                onClick={activeTab === 'categories' ? fetchCategories : fetchData}
                title="Refresh Data"
              >
                <i className="isax isax-refresh"></i>
              </button>
            </div>
          </div>

          <div className="table-responsive">
            {activeTab === 'centres' ? (
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Centre Name</th>
                    <th>Category</th>
                    <th>Parent Centre</th>
                    <th className="text-center">Status</th>
                    <th className="text-end pe-4" style={{ width: '100px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingCentres ? (
                    <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                  ) : filteredCentres.length > 0 ? (
                    filteredCentres.map(centre => (
                      <tr key={centre.id}>
                        <td className="fw-600">
                          {centre.name}
                          {centre.description && <p className="text-muted small mb-0">{centre.description}</p>}
                        </td>
                        <td>
                          <span className="badge badge-soft-info text-wrap text-start" style={{ wordBreak: 'break-word', maxWidth: '250px' }}>
                            {centre.category_name || centre.category?.name || categories.find(cat => String(cat.id) === String(centre.category_id))?.name || 'N/A'}
                          </span>
                        </td>
                        <td>
                          {centre.parent_name || centres.find(c => String(c.id) === String(centre.parent_id))?.name || 'None'}
                        </td>
                        <td className="text-center">
                          <span className={`badge ${centre.is_active === false ? 'badge-soft-danger' : 'badge-soft-success'}`}>
                            {centre.is_active === false ? 'Inactive' : 'Active'}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end align-items-center gap-2">
                             <button 
                               className="btn btn-sm btn-soft-warning border-0" 
                               data-bs-toggle="modal" 
                               data-bs-target="#cost_centre_modal" 
                               onClick={() => openModal(centre)}
                               title="Edit Centre"
                             >
                               <i className="isax isax-edit-2 fs-16"></i>
                             </button>
                             <button 
                               className="btn btn-sm btn-soft-danger border-0" 
                               onClick={() => handleDelete(centre.id, 'centre')}
                               title="Delete Centre"
                             >
                               <i className="isax isax-trash fs-16"></i>
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="text-center py-5 text-muted">No cost centres found</td></tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Category Name</th>
                    {/* <th>Description</th>/ */}
                    <th className="text-end pe-4" style={{ width: '100px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingCategories ? (
                    <tr><td colSpan="2" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                  ) : filteredCategories.length > 0 ? (
                    filteredCategories.map(cat => (
                      <tr key={cat.id}>
                        <td className="fw-600 text-wrap text-break" style={{ wordBreak: 'break-word', maxWidth: '300px' }}>{cat.name}</td>
                        {/* <td className="text-muted">{cat.description || 'No description'}</td> */}
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end align-items-center gap-2">
                             <button 
                               className="btn btn-sm btn-soft-warning border-0" 
                               data-bs-toggle="modal" 
                               data-bs-target="#cost_category_modal" 
                               onClick={() => openModal(cat)}
                               title="Edit Category"
                             >
                               <i className="isax isax-edit-2 fs-16"></i>
                             </button>
                             <button 
                               className="btn btn-sm btn-soft-danger border-0" 
                               onClick={() => handleDelete(cat.id, 'category')}
                               title="Delete Category"
                             >
                               <i className="isax isax-trash fs-16"></i>
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="2" className="text-center py-5 text-muted">No Categories found</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* --- Modals --- */}

      {/* CC-1 fix: static modal IDs — open/close handled programmatically via bootstrap.Modal.getOrCreateInstance */}
      {/* Add/Edit Category Modal */}
      <div className="modal fade" id="cost_category_modal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title">{isEdit ? 'Edit' : 'Add'} Cost Category</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={resetFormData}></button>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label fw-600">Name <span className="text-danger">*</span></label>
                  <input type="text" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={formData.name} onChange={handleInputChange} />
                  {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary px-4" disabled={isSaving}>
                  {isSaving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add/Edit Centre Modal */}
      <div className="modal fade" id="cost_centre_modal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title">{isEdit ? 'Edit' : 'Add'} Cost Centre</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={resetFormData}></button>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-600">Name <span className="text-danger">*</span></label>
                    <input type="text" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={formData.name} onChange={handleInputChange} />
                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-600">Category <span className="text-danger">*</span></label>
                    <select name="category_id" className={`form-select text-truncate ${errors.category_id ? 'is-invalid' : ''}`} value={formData.category_id} onChange={handleInputChange}>
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id} title={cat.name}>
                          {cat.name?.length > 25 ? cat.name.substring(0, 25) + '...' : cat.name}
                        </option>
                      ))}
                    </select>
                    {errors.category_id && <div className="invalid-feedback d-block">{errors.category_id}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-600">Parent Centre</label>
                    <select name="parent_id" className="form-select text-truncate" value={formData.parent_id} onChange={handleInputChange}>
                      <option value="">None</option>
                      {centres.filter(c => c.id !== selectedItem?.id).map(c => (
                        <option key={c.id} value={c.id} title={c.name}>
                          {c.name?.length > 25 ? c.name.substring(0, 25) + '...' : c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {isEdit && (
                    <div className="col-12">
                      <label className="form-label fw-600">Status</label>
                      <select name="status" className="form-select" value={formData.status} onChange={handleInputChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary px-4" disabled={isSaving}>
                  {isSaving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CostCentres;
