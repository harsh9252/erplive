import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { bonusService } from '../services/bonusService';
import { employeeService } from '../services/employeeService';

const BONUS_TYPES = ['BONUS', 'INCENTIVE', 'COMMISSION', 'GRATUITY', 'EX_GRATIA', 'OTHER'];
const STATUSES = ['PENDING', 'APPROVED', 'PAID'];

const STATUS_BADGE = {
  PENDING: 'badge-soft-warning text-warning',
  APPROVED: 'badge-soft-success text-success',
  PAID: 'badge-soft-primary text-primary',
};

const emptyForm = {
  employee_id: '',
  type: 'BONUS',
  amount: '',
  effective_date: '',
  salary_month: '',
  remarks: '',
  status: 'PENDING',
  approved_by: '',
};

const Bonuses = () => {
  const [bonuses, setBonuses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Filters
  const [filterEmployee, setFilterEmployee] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMonth, setFilterMonth] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 1 });
  const pageSize = 20;

  const fetchEmployees = useCallback(async () => {
    try {
      const resp = await employeeService.getEmployees({ limit: 1000 });
      // Handle all possible response shapes: array, { data: [] }, { data: { data: [] } }
      let list = resp?.data ?? resp ?? [];
      if (!Array.isArray(list)) list = list?.data ?? list?.items ?? list?.employees ?? [];
      if (!Array.isArray(list)) list = [];
      setEmployees(list);
    } catch (e) {
      console.error('Failed to load employees', e);
      setEmployees([]);
    }
  }, []);

  const fetchBonuses = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: pageSize,
        ...(filterEmployee && { employee_id: filterEmployee }),
        ...(filterType && { type: filterType }),
        ...(filterStatus && { status: filterStatus }),
        ...(filterMonth && { salary_month: filterMonth }),
      };
      const resp = await bonusService.getBonuses(params);
      setBonuses(resp?.data || []);
      setPagination({
        totalItems: resp?.pagination?.totalItems || resp?.data?.length || 0,
        totalPages: resp?.pagination?.totalPages || 1,
      });
    } catch (e) {
      toast.error('Failed to load bonuses');
    } finally {
      setLoading(false);
    }
  }, [currentPage, filterEmployee, filterType, filterStatus, filterMonth]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    fetchBonuses();
  }, [fetchBonuses]);

  const openAddModal = () => {
    setFormData(emptyForm);
    setErrors({});
    setIsEdit(false);
    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (bonus) => {
    if (bonus.status === 'PAID') {
      toast.warning('PAID bonuses cannot be edited.');
      return;
    }
    setFormData({
      employee_id: bonus.employee_id || '',
      type: bonus.type || 'BONUS',
      amount: bonus.amount || '',
      effective_date: bonus.effective_date ? bonus.effective_date.split('T')[0] : '',
      salary_month: bonus.salary_month || '',
      remarks: bonus.remarks || '',
      status: bonus.status || 'PENDING',
      approved_by: bonus.approved_by || '',
    });
    setErrors({});
    setIsEdit(true);
    setEditId(bonus.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(emptyForm);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.employee_id) errs.employee_id = 'Employee is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) errs.amount = 'Amount must be greater than 0';
    if (!formData.effective_date) errs.effective_date = 'Effective date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSaving(true);
    try {
      const payload = {
        employee_id: parseInt(formData.employee_id),
        type: formData.type,
        amount: parseFloat(formData.amount),
        effective_date: formData.effective_date,
        status: formData.status,
        ...(formData.salary_month && { salary_month: formData.salary_month }),
        ...(formData.remarks && { remarks: formData.remarks }),
        ...(formData.approved_by && { approved_by: parseInt(formData.approved_by) }),
      };

      if (isEdit) {
        await bonusService.updateBonus(editId, payload);
        toast.success('Bonus updated successfully!');
      } else {
        await bonusService.createBonus(payload);
        toast.success('Bonus created successfully!');
      }
      closeModal();
      fetchBonuses();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Operation failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Bonus?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await bonusService.deleteBonus(id);
          toast.success('Bonus deleted successfully');
          fetchBonuses();
        } catch (err) {
          toast.error(err?.message || 'Failed to delete bonus');
        }
      }
    });
  };

  const handleStatusChange = async (bonus, newStatus) => {
    if (bonus.status === 'PAID') {
      toast.warning('PAID bonuses cannot be changed.');
      return;
    }
    try {
      await bonusService.updateBonus(bonus.id, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      fetchBonuses();
    } catch (err) {
      toast.error(err?.message || 'Failed to update status');
    }
  };

  const getEmployeeName = (id) => {
    const emp = employees.find((e) => String(e.id) === String(id));
    return emp ? (emp.name || emp.full_name || `Emp #${id}`) : `Emp #${id}`;
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount || 0);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatMonth = (monthStr) => {
    if (!monthStr) return '—';
    const [year, month] = monthStr.split('-');
    const d = new Date(year, parseInt(month) - 1);
    return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  };

  return (
    <>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Bonus & Incentives</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/"><i className="isax isax-home-2 me-1"></i>Home</Link>
              </li>
              <li className="breadcrumb-item text-muted">Payroll</li>
              <li className="breadcrumb-item active text-primary">Bonus & Incentives</li>
            </ol>
          </nav>
        </div>
        <button className="btn btn-primary d-flex align-items-center rounded-pill px-4" onClick={openAddModal}>
          <i className="isax isax-add-circle5 me-2"></i>Add Bonus
        </button>
      </div>

      {/* Filters */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-3">
          <div className="row g-2 align-items-end">
            <div className="col-md-3">
              <label className="form-label fw-semibold small mb-1">Employee</label>
              <select className="form-select form-select-sm" value={filterEmployee} onChange={(e) => { setFilterEmployee(e.target.value); setCurrentPage(1); }}>
                <option value="">All Employees</option>
                {employees.map((e) => <option key={e.id} value={e.id}>{e.name || e.full_name}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label fw-semibold small mb-1">Type</label>
              <select className="form-select form-select-sm" value={filterType} onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}>
                <option value="">All Types</option>
                {BONUS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label fw-semibold small mb-1">Status</label>
              <select className="form-select form-select-sm" value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
                <option value="">All Status</option>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label fw-semibold small mb-1">Month</label>
              <input type="month" className="form-control form-control-sm" value={filterMonth} onChange={(e) => { setFilterMonth(e.target.value); setCurrentPage(1); }} />
            </div>
            <div className="col-md-1">
              <button className="btn btn-sm btn-light w-100" title="Reset" onClick={() => { setFilterEmployee(''); setFilterType(''); setFilterStatus(''); setFilterMonth(''); setCurrentPage(1); }}>
                <i className="isax isax-refresh"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Employee</th>
                  <th>Type</th>
                  <th className="text-end">Amount</th>
                  <th>Effective Date</th>
                  <th>Salary Month</th>
                  <th className="text-center">Status</th>
                  <th>Remarks</th>
                  <th className="text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="8" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                ) : bonuses.length > 0 ? (
                  bonuses.map((bonus) => (
                    <tr key={bonus.id}>
                      <td className="ps-4 fw-semibold">{getEmployeeName(bonus.employee_id)}</td>
                      <td><span className="badge bg-light text-dark">{bonus.type}</span></td>
                      <td className="text-end fw-semibold text-success">{formatCurrency(bonus.amount)}</td>
                      <td className="text-nowrap">{formatDate(bonus.effective_date)}</td>
                      <td className="text-muted">{formatMonth(bonus.salary_month)}</td>
                      <td className="text-center">
                        {bonus.status === 'PAID' ? (
                          <span className={`badge ${STATUS_BADGE[bonus.status]}`}>{bonus.status}</span>
                        ) : (
                          <select
                            className="form-select form-select-sm w-auto d-inline-block"
                            value={bonus.status}
                            onChange={(e) => handleStatusChange(bonus, e.target.value)}
                            style={{ fontSize: '12px', minWidth: '110px' }}
                          >
                            {STATUSES.filter(s => s !== 'PAID').map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td>
                        <div className="text-muted text-truncate" style={{ maxWidth: '150px' }} title={bonus.remarks || ''}>
                          {bonus.remarks || '—'}
                        </div>
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-soft-warning border-0"
                            onClick={() => openEditModal(bonus)}
                            title={bonus.status === 'PAID' ? 'PAID bonuses cannot be edited' : 'Edit'}
                            disabled={bonus.status === 'PAID'}
                          >
                            <i className="isax isax-edit-2 fs-16"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-soft-danger border-0"
                            onClick={() => handleDelete(bonus.id)}
                            title="Delete"
                          >
                            <i className="isax isax-trash fs-16"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-5 text-muted">
                      <i className="isax isax-empty-wallet fs-1 d-block mb-2"></i>
                      No bonuses found. Click "Add Bonus" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && pagination.totalPages > 1 && (
            <div className="d-flex align-items-center justify-content-between px-4 py-3 border-top">
              <small className="text-muted">
                Page {currentPage} of {pagination.totalPages} &nbsp;|&nbsp; {pagination.totalItems} records
              </small>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(p => p - 1)}><i className="isax isax-arrow-left-2"></i></button>
                  </li>
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(p => p + 1)}><i className="isax isax-arrow-right-2"></i></button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-header border-bottom py-3">
                <h5 className="modal-title fw-bold">{isEdit ? 'Edit Bonus / Incentive' : 'Add Bonus / Incentive'}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="row g-3">

                    {/* Employee */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Employee <span className="text-danger">*</span></label>
                      <select
                        className={`form-select ${errors.employee_id ? 'is-invalid' : ''}`}
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        disabled={isEdit}
                      >
                        <option value="">Select Employee</option>
                        {employees.map((e) => <option key={e.id} value={e.id}>{e.name || e.full_name}</option>)}
                      </select>
                      {errors.employee_id && <div className="invalid-feedback">{errors.employee_id}</div>}
                    </div>

                    {/* Type */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Type</label>
                      <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
                        {BONUS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    {/* Amount */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Amount (₹) <span className="text-danger">*</span></label>
                      <input
                        type="number"
                        className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="e.g. 10000"
                        min="0.01"
                        step="0.01"
                      />
                      {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                    </div>

                    {/* Effective Date */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Effective Date <span className="text-danger">*</span></label>
                      <input
                        type="date"
                        className={`form-control ${errors.effective_date ? 'is-invalid' : ''}`}
                        name="effective_date"
                        value={formData.effective_date}
                        onChange={handleChange}
                      />
                      {errors.effective_date && <div className="invalid-feedback">{errors.effective_date}</div>}
                    </div>

                    {/* Salary Month */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Salary Month <span className="text-muted small">(optional, YYYY-MM)</span></label>
                      <input
                        type="month"
                        className="form-control"
                        name="salary_month"
                        value={formData.salary_month}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Status */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Status</label>
                      <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    {/* Approved By — show only if status is APPROVED or PAID */}
                    {(formData.status === 'APPROVED' || formData.status === 'PAID') && (
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Approved By (Employee ID)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="approved_by"
                          value={formData.approved_by}
                          onChange={handleChange}
                          placeholder="e.g. 1"
                        />
                      </div>
                    )}

                    {/* Remarks */}
                    <div className="col-12">
                      <label className="form-label fw-semibold">Remarks</label>
                      <textarea
                        className="form-control"
                        name="remarks"
                        rows="2"
                        value={formData.remarks}
                        onChange={handleChange}
                        placeholder="e.g. Annual performance bonus"
                      ></textarea>
                    </div>

                  </div>
                </div>
                <div className="modal-footer border-top">
                  <button type="button" className="btn btn-light px-4" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary px-5" disabled={isSaving}>
                    {isSaving ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</> : isEdit ? 'Update Bonus' : 'Create Bonus'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bonuses;
