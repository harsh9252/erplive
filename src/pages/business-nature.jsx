import { useState, useEffect } from 'react';

import { getBusinessNatures, createBusinessNature, updateBusinessNature, deleteBusinessNature } from '../services/businessNatureService';
import { toast } from 'react-toastify';
import ConfirmDialog from '../components/ConfirmDialog';
import { getStoredActiveCompany } from '../services/apiClient';

const FEATURE_MAP = {
  TRADING: ['Inventory', 'Sales', 'Purchase', 'GST'],
  MANUFACTURING: ['Inventory', 'Sales', 'Purchase', 'GST', 'BOM', 'Work Orders', 'Production'],
  RETAIL: ['Inventory', 'Sales', 'Purchase', 'GST', 'POS', 'Barcode'],
  SERVICES: ['Service Billing', 'GST'],
  WHOLESALE: ['Inventory', 'Sales', 'Purchase', 'GST', 'Multi-warehouse', 'Batch'],
  ECOMMERCE: ['Inventory', 'Sales', 'Purchase', 'GST', 'TCS on Marketplace'],
  HEALTHCARE: ['Inventory', 'Sales', 'Purchase', 'GST', 'Batch+Expiry', 'Drug License'],
  CONSTRUCTION: ['Project-based', 'RCM', 'GST'],
};

const BusinessNature = () => {
  const [businessNatures, setBusinessNatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNature, setSelectedNature] = useState(localStorage.getItem('businessNature') || '');

  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    category: 'TRADING'
  });
  const [errors, setErrors] = useState({});

  // Delete Confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchBusinessNatures();
  }, []);

  const fetchBusinessNatures = async () => {
    try {
      setLoading(true);
      const response = await getBusinessNatures();
      const data = response.data || response || [];
      const natures = Array.isArray(data) ? data : (data.items || data.rows || []);

      // Safety Filtering: Only show system natures or those belonging to the active company/user
      const activeCompany = getStoredActiveCompany();
      const currentCompanyId = String(activeCompany?.id || activeCompany?.company_id || localStorage.getItem('company_id') || '');
      const currentUserId = String(localStorage.getItem('user_id') || '');

      const filteredNatures = natures.filter(n => {
        // 1. If it's explicitly marked as system, show it
        if (n.is_system === true || n.is_system === 1 || n.code?.startsWith('SYSTEM_')) return true;

        // 2. Check various possible ID field names from the backend
        const recordCompanyId = String(n.company_id || n.companyId || n.business_id || n.businessId || '');
        const recordUserId = String(n.user_id || n.userId || n.created_by || '');

        // 3. If it has a company ID, it MUST match the current company
        if (recordCompanyId && recordCompanyId !== 'null' && recordCompanyId !== 'undefined' && recordCompanyId !== '0') {
          return recordCompanyId === currentCompanyId;
        }

        // 4. If it has no company ID but has a user ID, it MUST match the current user
        if (recordUserId && recordUserId !== 'null' && recordUserId !== 'undefined' && recordUserId !== '0') {
          return recordUserId === currentUserId;
        }

        // 5. If it has neither, we assume it's a legacy system record
        return true;
      });

      const enhancedNatures = filteredNatures.map(n => ({
        ...n,
        features: FEATURE_MAP[n.category] || FEATURE_MAP[n.code] || ['General Features']
      }));

      setBusinessNatures(enhancedNatures);

      if (!selectedNature && enhancedNatures.length > 0) {
        setSelectedNature(enhancedNatures[0].code);
      }
    } catch (error) {
      console.error('Failed to fetch business natures:', error);
      toast.error('Failed to load business natures');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectNature = (code) => {
    setSelectedNature(code);
    localStorage.setItem('businessNature', code);
    const natureName = businessNatures.find(n => n.code === code)?.name || code;
    toast.info(`Switched to ${natureName}`);
  };

  // CRUD Operations
  const handleAdd = () => {
    setEditMode(false);
    setCurrentId(null);
    setFormData({
      code: '',
      name: '',
      description: '',
      category: 'TRADING'
    });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (nature) => {
    setEditMode(true);
    setCurrentId(nature.id);
    setFormData({
      code: nature.code,
      name: nature.name,
      description: nature.description || '',
      category: nature.category || 'TRADING'
    });
    setErrors({});
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteBusinessNature(deleteId);
      toast.success('Business nature deleted successfully');
      fetchBusinessNatures();
    } catch (error) {
      if (error?.status === 404 || error?.message?.toLowerCase().includes('not found')) {
        toast.error('Business nature not found. It may have been already deleted.');
        fetchBusinessNatures(); // Refresh the list
      } else {
        toast.error(error.message || 'Failed to delete business nature');
      }
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bug 2.4 fix: trim whitespace before validation
    const trimmedCode = formData.code.trim();
    const trimmedName = formData.name.trim();
    
    let newErrors = {};

    if (!trimmedCode) {
      newErrors.code = 'Code is required';
    } else if (trimmedCode.length > 50) {
      newErrors.code = 'Code must not exceed 50 characters';
    }
    
    if (!trimmedName) {
      newErrors.name = 'Name is required';
    } else if (trimmedName.length > 100) {
      newErrors.name = 'Name must not exceed 100 characters';
    }

    // Bug 2.3 fix: check for duplicate code on frontend
    if (!editMode && trimmedCode) {
      const isDuplicate = businessNatures.some(
        n => n.code.trim().toLowerCase() === trimmedCode.toLowerCase()
      );
      if (isDuplicate) {
        newErrors.code = `A business nature with code "${trimmedCode}" already exists`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      if (editMode) {
        await updateBusinessNature(currentId, { ...formData, code: trimmedCode, name: trimmedName });
        toast.success('Business nature updated');
      } else {
        // Ensure the nature is created for the active company/user
        const activeCompany = getStoredActiveCompany();
        const payload = {
          ...formData,
          code: trimmedCode,
          name: trimmedName,
          company_id: activeCompany?.id || activeCompany?.company_id || localStorage.getItem('company_id'),
          user_id: localStorage.getItem('user_id')
        };
        await createBusinessNature(payload);
        toast.success('Business nature created');
      }
      setShowModal(false);
      fetchBusinessNatures();
    } catch (error) {
      toast.error(error.message || 'Failed to save business nature');
    } finally {
      setSubmitting(false);
    }
  };

  const currentNature = businessNatures.find(n => n.code === selectedNature);

  if (loading && businessNatures.length === 0) {
    return (
      <div className="container-fluid py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2 text-muted">Loading configurations...</p>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-12">
        <div className="row settings-wrapper d-flex">
          {/* Main Content */}
          <div className="col-12">
            <div className="mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0">Business Nature Configuration</h6>
                <p className="fs-13 text-muted mt-1">Manage and select your business type to enable relevant features</p>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary btn-sm px-3"
                  onClick={handleAdd}
                >
                  <i className="isax isax-add me-1"></i> Add New
                </button>

              </div>
            </div>

            <div className="row">
              {/* Business Nature List */}
              <div className="col-md-5">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title mb-3 fs-14 fw-bold">Available Business Types</h6>
                    <div className="list-group list-group-flush border rounded overflow-hidden">
                      {businessNatures.length > 0 ? (
                        businessNatures.map((nature) => (
                          <div
                            key={nature.id || nature.code}
                            className={`list-group-item p-0 border-0 border-bottom last-child-border-0 ${selectedNature === nature.code ? 'bg-light border-start border-primary border-4' : ''
                              }`}
                          >
                            <div className="d-flex align-items-center p-3">
                              <div
                                className="flex-grow-1 cursor-pointer"
                                onClick={() => handleSelectNature(nature.code)}
                                style={{ minWidth: 0 }}
                              >
                                <h6
                                  className={`mb-1 fs-14 text-wrap ${selectedNature === nature.code ? 'text-primary fw-bold' : ''}`}
                                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                >
                                  {nature.name}
                                  {(nature.is_system || !nature.company_id || nature.code?.startsWith('SYSTEM_')) &&
                                    <span className="badge bg-soft-warning text-warning ms-2 fs-10 border border-warning border-opacity-25">System</span>
                                  }
                                </h6>
                                <p
                                  className="mb-0 fs-12 text-muted text-wrap"
                                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                >
                                  {nature.description}
                                </p>
                              </div>
                              <div className="d-flex gap-1 ms-2">
                                {!(nature.is_system || !nature.company_id || nature.code?.startsWith('SYSTEM_')) && (
                                  <>
                                    <button
                                      className="btn btn-icon btn-sm btn-ghost-primary"
                                      onClick={(e) => { e.stopPropagation(); handleEdit(nature); }}
                                    >
                                      <i className="isax isax-edit-2"></i>
                                    </button>
                                    <button
                                      className="btn btn-icon btn-sm btn-ghost-danger"
                                      onClick={(e) => { e.stopPropagation(); confirmDelete(nature.id); }}
                                    >
                                      <i className="isax isax-trash"></i>
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted fs-13 mb-0">No business natures found</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Display */}
              <div className="col-md-7">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h6 className="card-title mb-4 fs-14 fw-bold text-muted text-uppercase">Nature Details & Capabilities</h6>
                    {currentNature ? (
                      <>
                        <div className="mb-4" style={{ minWidth: 0 }}>
                          <h5
                            className="fw-bold text-dark mb-1 text-wrap"
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                          >
                            {currentNature.name}
                          </h5>
                          <span className="badge bg-primary fs-10 mb-2">{currentNature.category}</span>
                          <p
                            className="text-muted fs-13 mt-2 text-wrap"
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                          >
                            {currentNature.description}
                          </p>
                        </div>

                        <div className="mb-3">
                          <h6 className="mb-3 fs-13 fw-bold text-muted">Core Modules:</h6>
                          <div className="row g-2">
                            {currentNature.features && currentNature.features.map((feature, idx) => (
                              <div key={idx} className="col-md-6 mb-1">
                                <div className="d-flex align-items-center p-2 rounded bg-light border border-dashed">
                                  <i className="isax isax-tick-circle text-success me-2 fs-16"></i>
                                  <span className="fs-13">{feature}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="alert alert-primary bg-primary bg-opacity-10 border-0 mt-4 d-flex align-items-start">
                          <i className="isax isax-info-circle text-primary me-2 fs-18 mt-1"></i>
                          <span className="fs-13 text-primary">
                            This nature is currently <strong>active</strong> for your organization. All module visibility and financial patterns are synchronized with this type.
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-5">
                        <i className="isax isax-info-circle text-muted fs-40 mb-3 d-block"></i>
                        <p className="text-muted">Select a business type from the left to see available features</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* CRUD Modal */}
      {showModal && (
        <>
          <div className="modal fade show" style={{ display: 'block', zIndex: 1051 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg bg-white">
                <div className="modal-header bg-light border-bottom">
                  <h5 className="modal-title fw-bold fs-16">
                    {editMode ? 'Edit Business Nature' : 'Add New Business Nature'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                  <div className="modal-body p-4">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fs-13 fw-bold">Code <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="code"
                          className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                          value={formData.code}
                          onChange={handleInputChange}
                          placeholder="e.g. TRADING_001"
                          maxLength={50}
                          autoComplete="one-time-code"
                        />
                        {errors.code && <div className="invalid-feedback d-block">{errors.code}</div>}
                        <small className="text-muted">Unique identifier for this nature</small>
                      </div>
                      <div className="col-12">
                        <label className="form-label fs-13 fw-bold">Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="name"
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. International Trading"
                          maxLength={100}
                          autoComplete="one-time-code"
                        />
                        {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                      </div>
                      <div className="col-12">
                        <label className="form-label fs-13 fw-bold">Category <span className="text-danger">*</span></label>
                        <select
                          name="category"
                          className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          {Object.keys(FEATURE_MAP).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        {errors.category && <div className="invalid-feedback d-block">{errors.category}</div>}
                        <small className="text-muted">Determines enabled system features</small>
                      </div>
                      <div className="col-12">
                        <label className="form-label fs-13 fw-bold">Description</label>
                        <textarea
                          name="description"
                          className="form-control"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows="3"
                          placeholder="Briefly describe this business type..."
                          autoComplete="one-time-code"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer bg-light border-top">
                    <button type="button" className="btn btn-ghost-secondary px-4" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary px-4" disabled={submitting}>
                      {submitting ? 'Saving...' : (editMode ? 'Update Nature' : 'Create Nature')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" style={{ zIndex: 1050, opacity: 0.5 }} onClick={() => setShowModal(false)}></div>
        </>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => { setShowDeleteConfirm(false); setDeleteId(null); /* Bug 2.1 fix: reset deleteId */ }}
        onConfirm={handleDelete}
        title="Delete Business Nature"
        message="Are you sure you want to delete this business nature? This action cannot be undone if it's already in use."
        type="danger"
      />
    </div>
  );
};

export default BusinessNature;
