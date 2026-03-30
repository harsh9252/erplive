import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { costCenterService } from '../services/costCenterService';
import { costCategoryService } from '../services/costCategoryService';

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    parent_id: '',
    status: 'Active'
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab === 'categories' && !categoriesLoaded) {
      fetchCategories();
    }

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
    console.log("API CALLED"); 
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
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      description: '',
      category_id: '',
      parent_id: '',
      status: 'Active'
    });
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
      setFormData({
        name: item.name || '',
        description: item.description || '',
        category_id: item.category_id || item.category?.id || '',
        parent_id: item.parent_id || '',
        status: item.status || 'Active'
      });
    } else {
      resetFormData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'categories') {
        const payload = { name: formData.name, description: formData.description };
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
          description: formData.description,
          category_id: formData.category_id,
          parent_id: formData.parent_id || null,
          status: formData.status
        };
        if (isEdit) {
          await costCenterService.updateCostCenter(selectedItem.id, payload);
          toast.success('Cost centre updated successfully');
        } else {
          await costCenterService.createCostCenter(payload);
          toast.success('Cost centre created successfully');
        }
      }
      
      // Close modal
      const modalId = activeTab === 'categories' ? (isEdit ? 'edit_category' : 'add_category') : (isEdit ? 'edit_centre' : 'add_centre');
      const modalElement = document.getElementById(modalId);
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
      
      fetchData();
    } catch (error) {
      toast.error(error.message || 'Failed to save');
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
        } catch {
          toast.error('Deletion failed');
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
            data-bs-target={activeTab === 'centres' ? '#add_centre' : '#add_category'}
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
              <div className="search-input">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder={`Search ${activeTab}...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="button" className="btn btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </button>
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
                    <th className="text-center">Action</th>
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
                        <td><span className="badge badge-soft-info">{centre.category_name || centre.category?.name}</span></td>
                        <td>{centre.parent_name || 'None'}</td>
                        <td className="text-center">
                          <span className={`badge ${centre.status === 'Inactive' ? 'badge-soft-danger' : 'badge-soft-success'}`}>
                            {centre.status || 'Active'}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <button className="btn btn-icon btn-sm btn-soft-primary" data-bs-toggle="modal" data-bs-target="#edit_centre" onClick={() => openModal(centre)}><i className="isax isax-edit"></i></button>
                            <button className="btn btn-icon btn-sm btn-soft-danger" onClick={() => handleDelete(centre.id, 'centre')}><i className="isax isax-trash"></i></button>
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
                    <th>Description</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingCategories ? (
                    <tr><td colSpan="3" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                  ) : filteredCategories.length > 0 ? (
                    filteredCategories.map(cat => (
                      <tr key={cat.id}>
                        <td className="fw-600">{cat.name}</td>
                        <td className="text-muted">{cat.description || 'No description'}</td>
                        <td className="text-center">
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <button className="btn btn-icon btn-sm btn-soft-primary" data-bs-toggle="modal" data-bs-target="#edit_category" onClick={() => openModal(cat)}><i className="isax isax-edit"></i></button>
                            <button className="btn btn-icon btn-sm btn-soft-danger" onClick={() => handleDelete(cat.id, 'category')}><i className="isax isax-trash"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3" className="text-center py-5 text-muted">No Categories found</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      
      {/* Add/Edit Category Modal */}
      <div className="modal fade" id={isEdit ? "edit_category" : "add_category"} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title">{isEdit ? 'Edit' : 'Add'} Cost Category</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={resetFormData}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label fw-600">Name <span className="text-danger">*</span></label>
                  <input type="text" name="name" className="form-control" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-0">
                  <label className="form-label fw-600">Description</label>
                  <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleInputChange}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary px-4">{isEdit ? 'Save Changes' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add/Edit Centre Modal */}
      <div className="modal fade" id={isEdit ? "edit_centre" : "add_centre"} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title">{isEdit ? 'Edit' : 'Add'} Cost Centre</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={resetFormData}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-600">Name <span className="text-danger">*</span></label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-600">Category <span className="text-danger">*</span></label>
                    <select name="category_id" className="form-select" value={formData.category_id} onChange={handleInputChange} required>
                      <option value="">Select Category</option>
                      {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                  </div>
                   <div className="col-md-6">
                    <label className="form-label fw-600">Parent Centre</label>
                    <select name="parent_id" className="form-select" value={formData.parent_id} onChange={handleInputChange}>
                      <option value="">None</option>
                      {centres.filter(c => c.id !== selectedItem?.id).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-600">Description</label>
                    <textarea name="description" className="form-control" rows="2" value={formData.description} onChange={handleInputChange}></textarea>
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
                <button type="submit" className="btn btn-primary px-4">{isEdit ? 'Save Changes' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CostCentres;
