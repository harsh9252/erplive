import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { settingsService } from '../services/settingsService';

const VoucherSeries = () => {
  const [series, setSeries] = useState([]);
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [errors, setErrors] = useState({});

  const initialFormState = {
    voucher_type_id: '',
    name: '',
    prefix: '',
    starting_number: 1,
    current_number: 0,
    padding: 0,
    reset_period: 'YEARLY',
    is_default: false,
    is_active: true
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [seriesRes, typesRes] = await Promise.all([
        settingsService.getVoucherSeries(),
        settingsService.getVoucherTypes()
      ]);
      setSeries(seriesRes.data || []);
      setVoucherTypes(typesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load voucher series data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleEdit = (s) => {
    setEditMode(true);
    setCurrentId(s.id);
    setFormData({
      voucher_type_id: s.voucher_type_id || '',
      name: s.name || '',
      prefix: s.prefix || '',
      starting_number: s.starting_number || 1,
      current_number: s.current_number ?? 0,
      padding: s.padding || 0,
      reset_period: s.reset_period || 'YEARLY',
      is_default: Boolean(s.is_default && s.is_default !== 0 && s.is_default !== '0'),
      is_active: Boolean(s.is_active && s.is_active !== 0 && s.is_active !== '0')
    });
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentId(null);
    setFormData(initialFormState);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.voucher_type_id) newErrors.voucher_type_id = 'Voucher Type is required';
    if (!formData.name?.trim()) newErrors.name = 'Series Name is required';
    if (formData.starting_number === '' || formData.starting_number === null) newErrors.starting_number = 'Starting Number is required';
    if (formData.current_number === '' || formData.current_number === null) newErrors.current_number = 'Current Number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        is_default: Boolean(formData.is_default),
        is_active: Boolean(formData.is_active)
      };

      if (editMode) {
        await settingsService.updateVoucherSeries(currentId, payload);
        toast.success('Voucher series updated successfully');
      } else {
        await settingsService.createVoucherSeries(payload);
        toast.success('Voucher series created successfully');
      }
      closeModal();
      fetchData();
    } catch (error) {
      toast.error(error.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this series?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;
    
    try {
      await settingsService.deleteVoucherSeries(id);
      toast.success('Series deleted');
      fetchData();
    } catch (error) {
      toast.error('Deletion failed');
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Voucher Number Series</h4>
          <p className="text-muted small mb-0">Manage automatic numbering for different transaction types</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4" onClick={() => setShowModal(true)}>
          <i className="isax isax-add me-2"></i>Create New Series
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-16">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4 border-0 py-3 fs-13 text-muted">Voucher Type</th>
                  <th className="border-0 py-3 fs-13 text-muted">Series Name</th>
                  <th className="border-0 py-3 fs-13 text-muted">Next Number Preview</th>
                  <th className="border-0 py-3 fs-13 text-muted">Starting #</th>
                  <th className="border-0 py-3 fs-13 text-muted">Current #</th>
                  <th className="border-0 py-3 fs-13 text-muted">Reset Period</th>
                  <th className="border-0 py-3 fs-13 text-muted">Status</th>
                  <th className="border-0 py-3 text-center fs-13 text-muted">Action</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary"></div></td></tr>
                ) : series.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-5 text-muted">No series configured yet</td></tr>
                ) : series.map((s) => {
                  const nextNum = (s.current_number || 0) + 1;
                  const paddedNext = String(nextNum).padStart(s.padding || 0, '0');
                  return (
                    <tr key={s.id}>
                      <td className="ps-4">
                        <div className="fw-medium text-dark">
                          {s.voucherType?.name || voucherTypes.find(t => t.id === s.voucher_type_id)?.name || 'N/A'}
                        </div>
                        <div className="fs-11 text-muted">{s.voucherType?.code}</div>
                      </td>
                      <td className="fw-bold">{s.name}</td>
                      <td>
                        <code className="bg-soft-primary text-primary px-2 py-1 rounded">
                          {s.voucherType?.code ? `${s.voucherType.code}/` : (voucherTypes.find(t => t.id === s.voucher_type_id)?.code ? `${voucherTypes.find(t => t.id === s.voucher_type_id).code}/` : '')}{s.prefix}{paddedNext}
                        </code>
                      </td>
                      <td className="text-muted fs-13">{s.starting_number}</td>
                      <td>
                        <span className="fw-semibold text-dark">{s.current_number ?? 0}</span>
                      </td>
                      <td>
                        <span className="badge bg-soft-info text-info">{s.reset_period}</span>
                        {s.last_reset_date && (
                          <div className="fs-11 text-muted mt-1">
                            Reset: {new Date(s.last_reset_date).toLocaleDateString('en-IN')}
                          </div>
                        )}
                      </td>
                      <td>
                        {s.is_default && <span className="badge bg-soft-success text-success me-1">Default</span>}
                        <span className={`badge ${s.is_active ? 'bg-soft-success text-success' : 'bg-soft-danger text-danger'}`}>
                          {s.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button 
                            className="btn btn-icon-sm btn-soft-warning border-0 rounded-3" 
                            onClick={() => handleEdit(s)}
                            title="Edit Series"
                          >
                            <i className="isax isax-edit-2 fs-18"></i>
                          </button>
                          <button 
                            className="btn btn-icon-sm btn-soft-danger border-0 rounded-3" 
                            onClick={() => handleDelete(s.id)}
                            title="Delete Series"
                          >
                            <i className="isax isax-trash fs-18"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-20">
              <div className="modal-header border-0 pb-0 pt-4 px-4">
                <h5 className="fw-bold mb-0">{editMode ? 'Edit' : 'New'} Voucher Series</h5>
                <button type="button" className="btn-close shadow-none" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="modal-body p-4">
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-600 fs-13">Voucher Type <span className="text-danger">*</span></label>
                      <select className={`form-select ${errors.voucher_type_id ? 'is-invalid' : ''}`} name="voucher_type_id" value={formData.voucher_type_id} onChange={handleInputChange} required>
                        <option value="">Select Type</option>
                        {voucherTypes
                          .filter(t => ['CONTRA', 'JOURNAL', 'PAYMENT', 'RECEIPT', 'STOCK JOURNAL'].includes(t.name?.toUpperCase()))
                          .map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                      {errors.voucher_type_id && <div className="invalid-feedback d-block">{errors.voucher_type_id}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-600 fs-13">Series Name <span className="text-danger">*</span></label>
                      <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Sales Corporate" required />
                      {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-4">
                      <label className="form-label fw-600 fs-13">Prefix</label>
                      <input type="text" className="form-control" name="prefix" value={formData.prefix} onChange={handleInputChange} placeholder="e.g. INV/" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-600 fs-13">Starting Number <span className="text-danger">*</span></label>
                      <input type="number" className={`form-control ${errors.starting_number ? 'is-invalid' : ''}`} name="starting_number" value={formData.starting_number} onChange={handleInputChange} required />
                      {errors.starting_number && <div className="invalid-feedback d-block">{errors.starting_number}</div>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-600 fs-13">Current Number <span className="text-danger">*</span></label>
                      <input type="number" className={`form-control ${errors.current_number ? 'is-invalid' : ''}`} name="current_number" value={formData.current_number} onChange={handleInputChange} required />
                      {errors.current_number && <div className="invalid-feedback d-block">{errors.current_number}</div>}
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-4">
                      <label className="form-label fw-600 fs-13">Padding (Zeros)</label>
                      <input type="number" className="form-control" name="padding" value={formData.padding} onChange={handleInputChange} placeholder="e.g. 4 for 0001" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-600 fs-13">Reset Period</label>
                      <select className="form-select" name="reset_period" value={formData.reset_period} onChange={handleInputChange}>
                        <option value="NEVER">Never</option>
                        <option value="YEARLY">Yearly</option>
                        <option value="MONTHLY">Monthly</option>
                      </select>
                    </div>
                    <div className="col-md-4 d-flex flex-column justify-content-end mb-1">
                      <div className="d-flex gap-4">
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" name="is_default" id="is_default" checked={!!formData.is_default} onChange={handleInputChange} />
                          <label className="form-check-label fw-600 fs-13" htmlFor="is_default">Set as Default</label>
                        </div>
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" name="is_active" id="is_active" checked={!!formData.is_active} onChange={handleInputChange} />
                          <label className="form-check-label fw-600 fs-13" htmlFor="is_active">Active</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-light rounded-3 border">
                    <h6 className="fs-12 fw-bold text-uppercase text-muted mb-2">Number Format Preview</h6>
                    <div className="h4 mb-0 text-primary font-monospace">
                      {(() => {
                        const t = voucherTypes.find(type => String(type.id) === String(formData.voucher_type_id));
                        const code = t ? t.code : '';
                        return `${code ? code + '/' : ''}${formData.prefix || ''}${String(formData.starting_number || '').padStart(formData.padding || 0, '0')}`;
                      })()}
                    </div>
                    <p className="fs-12 text-muted mb-0 mt-1">
                      Next voucher will be numbered starting from <strong>{formData.starting_number}</strong>.
                      {editMode && formData.current_number != null && (
                        <span className="ms-2 text-warning">
                          Current counter: <strong>{formData.current_number}</strong>
                          {Number(formData.starting_number) > Number(formData.current_number)
                            ? ' — counter will reset to this starting number.'
                            : ''}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="modal-footer border-0 pb-4 px-4 pt-0">
                  <button type="button" className="btn btn-light px-4 rounded-pill" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary px-4 rounded-pill shadow-primary" disabled={saving}>
                    {saving ? 'Processing...' : (editMode ? 'Update Series' : 'Create Series')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherSeries;
