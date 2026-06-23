import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import uomService from '../services/uomService';
import { useAuth } from '../components/AuthContext';

const UOM = () => {
  const { activeCompany } = useAuth();
  const [uoms, setUoms] = useState([]);
  const [filteredUoms, setFilteredUoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedUoms, setSelectedUoms] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null, isBulk: false });
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    uom_type: 'QUANTITY',
    base_uom_id: '',
    conversion_factor: 1,
  });

  const UOM_TYPES = [
    { value: 'QUANTITY', label: 'Quantity' },
    { value: 'WEIGHT', label: 'Weight' },
    { value: 'VOLUME', label: 'Volume' },
    { value: 'LENGTH', label: 'Length' },
    { value: 'AREA', label: 'Area' },
    { value: 'UNIT', label: 'Unit' },
  ];

  useEffect(() => {
    if (activeCompany?.id) {
      fetchUoms();
    }
  }, [activeCompany?.id]);

  useEffect(() => {
    filterAndSortUoms();
  }, [uoms, searchTerm, sortBy]);

  const fetchUoms = async () => {
    if (!activeCompany?.id) return;
    setIsLoading(true);
    try {
      const response = await uomService.getUoms(1, 200, { company_id: activeCompany.id }); // Fetch a large batch to avoid pagination for now
      let uomList = response.data || [];
      uomList = uomList.filter(u => String(u.company_id) === String(activeCompany.id));
      setUoms(uomList);
    } catch (error) {
      console.error('Failed to fetch UOMs:', error);
      toast.error('Failed to load UOMs');
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortUoms = () => {
    let filtered = [...uoms].filter(uom =>
      uom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uom.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.created_at || a.createdAt) - new Date(b.created_at || b.createdAt));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredUoms(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Unit Name is required';
    if (!formData.symbol.trim()) newErrors.symbol = 'Symbol is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      if (editingId) {
        await uomService.updateUom(editingId, formData);
        toast.success('UOM updated successfully!');
      } else {
        await uomService.createUom(formData);
        toast.success('UOM created successfully!');
      }
      fetchUoms();
      resetForm();
    } catch (error) {
      console.error('Failed to save UOM:', error);
      toast.error(error.message || 'Failed to save UOM');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', symbol: '', uom_type: 'QUANTITY', base_uom_id: '', conversion_factor: 1 });
    setEditingId(null);
    setErrors({});
    setShowForm(false);
  };

  const handleEdit = (uom) => {
    setFormData({
      name: uom.name,
      symbol: uom.symbol,
      uom_type: uom.uom_type || 'QUANTITY',
      base_uom_id: uom.base_uom_id || '',
      conversion_factor: uom.conversion_factor || 1,
    });
    setEditingId(uom.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id, isBulk: false });
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      if (confirmDialog.isBulk) {
        const deletePromises = Array.from(selectedUoms).map(id => uomService.deleteUom(id));
        await Promise.all(deletePromises);
        setSelectedUoms(new Set());
        toast.success('Selected UOMs deleted successfully!');
      } else {
        await uomService.deleteUom(confirmDialog.id);
        toast.success('UOM deleted successfully!');
      }
      fetchUoms();
    } catch (error) {
      console.error('Failed to delete UOM:', error);
      toast.error(error.message || 'Failed to delete UOM');
    } finally {
      setIsLoading(false);
      setConfirmDialog({ isOpen: false, id: null, isBulk: false });
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUoms(new Set(filteredUoms.map(uom => uom.id)));
    } else {
      setSelectedUoms(new Set());
    }
  };

  const handleSelectUom = (id) => {
    const newSelected = new Set(selectedUoms);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedUoms(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedUoms.size === 0) {
      toast.warning('Please select UOMs to delete');
      return;
    }
    setConfirmDialog({ isOpen: true, id: null, isBulk: true });
  };

  const getUomTypeLabel = (type) => {
    const typeObj = UOM_TYPES.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null, isBulk: false })}
        onConfirm={confirmDelete}
        title={confirmDialog.isBulk ? "Delete Selected UOMs" : "Delete UOM"}
        message={
          confirmDialog.isBulk
            ? `Are you sure you want to delete ${selectedUoms.size} selected UOM(s)? This action cannot be undone.`
            : "Are you sure you want to delete this UOM? This action cannot be undone."
        }
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Units of Measurement (UOM)</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item active">UOM</li>
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
          <i className={`isax ${showForm ? 'isax-close-circle' : 'isax-add-circle5'} me-1`}></i>
          {showForm ? 'Cancel' : 'Add UOM'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-3 border-0 shadow-sm">
          <div className="card-body">
            <h6 className="mb-3">{editingId ? 'Edit UOM' : 'Add New UOM'}</h6>
            <form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Unit Name *</label>
                    <input
                      type="text"
                      className={`form-control h-40 ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Kilogram"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Symbol *</label>
                    <input
                      type="text"
                      className={`form-control h-40 ${errors.symbol ? 'is-invalid' : ''}`}
                      name="symbol"
                      value={formData.symbol}
                      onChange={handleInputChange}
                      placeholder="e.g., KG"
                    />
                    {errors.symbol && <div className="invalid-feedback">{errors.symbol}</div>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Base Unit (Optional)</label>
                    <select
                      className="form-control h-40"
                      name="base_uom_id"
                      value={formData.base_uom_id}
                      onChange={handleInputChange}
                    >
                      <option value="">None (Primary Unit)</option>
                      {uoms.filter(u => String(u.id) !== String(editingId) && !u.base_uom_id).map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                      ))}
                    </select>
                    <small className="text-muted">If this is a secondary unit (e.g. Box of 10 Pcs)</small>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Conversion Factor</label>
                    <input
                      type="number"
                      className="form-control h-40"
                      name="conversion_factor"
                      value={formData.conversion_factor}
                      onChange={handleInputChange}
                      placeholder="e.g., 10"
                      min="0.000001"
                      step="any"
                    />
                    <small className="text-muted">How many base units in this unit?</small>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-2">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={resetForm}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4" disabled={isLoading}>
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : null}
                  {editingId ? 'Update UOM' : 'Save UOM'}
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
                <div className="input-group" style={{ maxWidth: '350px' }}>
                  <span className="input-group-text bg-white border-end-0"><i className="isax isax-search-normal text-muted fs-14"></i></span>
                  <input
                    type="text"
                    className="form-control h-40 border-start-0 shadow-none ps-0"
                    placeholder="Search by name or symbol..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="card-body p-0">
              {isLoading && uoms.length === 0 ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading UOMs...</p>
                </div>
              ) : filteredUoms.length === 0 ? (
                <div className="text-center py-5">
                  <i className="isax isax-ruler-2 fs-1 text-muted mb-3 d-block"></i>
                  <h6 className="mb-2">No UOMs Found</h6>
                  <p className="text-muted">
                    {searchTerm ? 'No results for your search' : 'Add your first unit of measurement to get started'}
                  </p>
                  {!searchTerm && (
                    <button className="btn btn-primary mt-2" onClick={() => setShowForm(true)}>
                      <i className="isax isax-add-circle5 me-1"></i>Add UOM
                    </button>
                  )}
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light text-muted small text-uppercase fw-semibold">
                      <tr>
                        <th className="ps-4">Unit Name</th>
                        <th>Symbol</th>
                        <th>Conversion</th>
                        <th className="text-end pe-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="border-top-0">
                      {filteredUoms.map((uom) => (
                        <tr key={uom.id}>
                          <td className="ps-4">
                            <div className="d-flex align-items-center gap-2">
                              <span className="fw-semibold text-dark">{uom.name}</span>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-soft-primary text-primary px-2 py-1">{uom.symbol}</span>
                          </td>
                          <td>
                            {uom.base_uom_id ? (
                               <span className="fs-12">1 {uom.symbol} = {uom.conversion_factor} {uoms.find(u => String(u.id) === String(uom.base_uom_id))?.symbol || 'Units'}</span>
                            ) : (
                               <span className="text-muted fs-12">Base Unit</span>
                            )}
                          </td>
                          <td className="text-end pe-4">
                            <div className="d-flex justify-content-end gap-1">
                              <button
                                className="btn btn-icon btn-soft-primary border-0"
                                onClick={() => handleEdit(uom)}
                                title="Edit"
                                disabled={isLoading}
                              >
                                <i className="isax isax-edit-25"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-soft-danger border-0"
                                onClick={() => handleDelete(uom.id)}
                                title="Delete"
                                disabled={isLoading}
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
            </div>
          </div>
          
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <div className="text-muted small">
              Showing {filteredUoms.length} of {uoms.length} UOMs
            </div>
            {isLoading && uoms.length > 0 && (
              <div className="small text-primary">
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Updating...
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UOM;
