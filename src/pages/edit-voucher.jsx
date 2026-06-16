import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VoucherEntryLines from '../components/VoucherEntryLines';
import { voucherService } from '../services/voucherService';
import { ledgerService } from '../services/ledgerService';
import { costCenterService } from '../services/costCenterService';
import branchService from '../services/branchService';
import approvalService from '../services/approvalService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const EditVoucher = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    voucher_type_id: '',
    voucher_date: '',
    voucher_number: '',
    reference_number: '',
    narration: '',
    cost_center_id: '',
    branch_id: '',
  });

  const [entries, setEntries] = useState([
    { id: 1, ledger_id: '', dr_cr: 'DR', amount: '', narration: '' },
    { id: 2, ledger_id: '', dr_cr: 'CR', amount: '', narration: '' },
  ]);

  const [voucherTypes, setVoucherTypes] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [costCenters, setCostCenters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [errors, setErrors] = useState({});
  const [balanceError, setBalanceError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPosted, setIsPosted] = useState(false);

  // Load voucher types
  useEffect(() => {
    const fetchVoucherTypes = async () => {
      try {
        const response = await voucherService.getVoucherTypes();
        if (response && response.data) {
          setVoucherTypes(response.data);
        }
      } catch (error) {
        console.error('Error fetching voucher types:', error);
      }
    };
    fetchVoucherTypes();
  }, []);

  // Load ledgers
  useEffect(() => {
    const fetchLedgers = async () => {
      try {
        const response = await ledgerService.getLedgers();
        if (response && response.data) {
          setLedgers(response.data);
        }
      } catch (error) {
        console.error('Error fetching ledgers:', error);
      }
    };
    fetchLedgers();
  }, []);

  // Load cost centers
  useEffect(() => {
    const fetchCostCenters = async () => {
      try {
        const response = await costCenterService.getCostCenters();
        if (response && response.data) {
          setCostCenters(response.data);
        }
      } catch (error) {
        console.error('Error fetching cost centers:', error);
      }
    };
    fetchCostCenters();
  }, []);

  // Load branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await branchService.getBranches();
        if (response && response.data) {
          setBranches(response.data);
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };
    fetchBranches();
  }, []);

  // Load existing voucher
  useEffect(() => {
    const fetchVoucher = async () => {
      setLoading(true);
      try {
        const response = await voucherService.getVoucher(id);
        const voucher = response.data || response;
        if (voucher) {
          setFormData({
            voucher_type_id: voucher.voucher_type_id,
            voucher_date: voucher.voucher_date,
            voucher_number: voucher.voucher_number,
            reference_number: voucher.reference_number || '',
            narration: voucher.narration || '',
            cost_center_id: voucher.cost_center_id || '',
            branch_id: voucher.branch_id || voucher.branch?.id || '',
          });
          setEntries(voucher.entries || []);
          setIsPosted(voucher.status?.toUpperCase() === 'POSTED');
        }
      } catch (error) {
        console.error('Error fetching voucher:', error);
        setErrors({ submit: 'Failed to load voucher details' });
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchVoucher();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateBalance = () => {
    const totalDR = entries
      .filter((e) => e.dr_cr === 'DR')
      .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    const totalCR = entries
      .filter((e) => e.dr_cr === 'CR')
      .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    const isBalanced = Math.abs(totalDR - totalCR) < 0.01;
    if (!isBalanced) {
      setBalanceError(
        `Debit (₹${totalDR.toFixed(2)}) and Credit (₹${totalCR.toFixed(2)}) totals must be equal`
      );
      return false;
    }
    setBalanceError('');
    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.voucher_type_id) {
      newErrors.voucher_type_id = 'Voucher Type is required';
    }

    if (!formData.voucher_date) {
      newErrors.voucher_date = 'Date is required';
    }

    if (!formData.voucher_number.trim()) {
      newErrors.voucher_number = 'Voucher Number is required';
    }

    const validEntries = entries.filter((e) => e.ledger_id && e.amount);
    if (validEntries.length < 2) {
      newErrors.entries = 'Minimum 2 entry lines required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handlePostVoucher = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to post this voucher? Posted vouchers cannot be edited.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0066cc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, post it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await voucherService.postVoucher(id);
        setIsPosted(true);
        toast.success('Voucher posted successfully!');
      } catch (error) {
        console.error('Error posting voucher:', error);
        setErrors({ submit: error.message || 'Failed to post voucher' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmitForApproval = async () => {
    const { value: remarks } = await Swal.fire({
      title: 'Submit for Approval',
      input: 'textarea',
      inputLabel: 'Remarks (Mandatory)',
      inputPlaceholder: 'Enter any remarks for the approver...',
      showCancelButton: true,
      confirmButtonText: 'Submit Now',
      confirmButtonColor: '#0066cc',
      customClass: {
        popup: 'rounded-16 shadow-lg border-0 b-0',
        confirmButton: 'btn btn-primary px-4 rounded-pill',
        cancelButton: 'btn btn-light px-4 rounded-pill ms-2'
      },
      buttonsStyling: false,
      inputValidator: (value) => {
        if (!value || !value.trim()) {
          return 'You must enter remarks to submit for approval!';
        }
      }
    });

    if (!remarks) return;

    setLoading(true);
    try {
      await approvalService.submitForApproval({
        entity_type: 'VOUCHER',
        entity_id: id,
        remarks: remarks,
      });
      toast.success('Submitted for approval successfully!');
      navigate('/accounting/vouchers');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit for approval');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateBalance() || !validateForm()) {
      toast.error('Please fix the validation errors before submitting.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        voucher_date: formData.voucher_date,
        reference_number: formData.reference_number,
        narration: formData.narration,
        entries: entries
          .filter((e) => e.ledger_id && e.amount)
          .map((e) => ({
            ledger_id: parseInt(e.ledger_id),
            amount: parseFloat(e.amount),
            dr_cr: e.dr_cr,
            narration: e.narration,
          })),
      };

      await voucherService.updateVoucher(id, payload);
      toast.success('Voucher updated successfully!');
      navigate('/accounting/vouchers');
    } catch (error) {
      console.error('Error updating voucher:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to update voucher');
    } finally {
      setLoading(false);
    }
  };

  const pageWrapperStyle = {
    maxWidth: 'none',
    width: '100%',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  };

  const contentStyle = {
    maxWidth: 'none',
    width: '100%',
    padding: '24px 32px',
    margin: 0,
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header d-flex align-items-center justify-content-between mb-4">
        <div className="page-title">
          <h4>Edit Voucher</h4>
          <p className="text-muted mb-0">Update existing voucher details and post to ledger</p>
        </div>
        <div className="page-header-right">
          <Link to="/accounting/vouchers" className="btn btn-outline-secondary d-flex align-items-center">
            <i className="isax isax-arrow-left-2 me-2"></i>Back to List
          </Link>
        </div>
      </div>

      {isPosted && (
        <div className="alert alert-soft-info d-flex align-items-center mb-4 border-0 shadow-sm">
          <i className="isax isax-info-circle fs-20 me-2 text-info"></i>
          <div>
            <span className="fw-600">Note:</span> This voucher is already <strong>Posted</strong>. It is now read-only and cannot be modified.
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Header Section */}
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-header bg-transparent border-bottom">
            <h5 className="card-title mb-0">Voucher Details</h5>
          </div>
          <div className="card-body">
            {errors.submit && (
              <div className="alert alert-danger mb-3" role="alert">
                <i className="isax isax-info-circle me-2"></i>{errors.submit}
              </div>
            )}

            <div className="row g-3">
              <div className="col-lg-2 col-md-6 col-12">
                <label className="form-label fw-600">
                  Voucher Type <span className="text-danger">*</span>
                </label>
                <select
                  name="voucher_type_id"
                  className={`form-select ${errors.voucher_type_id ? 'is-invalid' : ''}`}
                  value={formData.voucher_type_id}
                  onChange={handleInputChange}
                  disabled={true}
                >
                  <option value="">Select Type</option>
                  {voucherTypes
                    .filter(type => !['SALES', 'PURCHASE', 'CREDIT NOTE', 'DEBIT NOTE'].includes(type.name?.toUpperCase()))
                    .map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.voucher_type_id && (
                  <div className="invalid-feedback d-block">{errors.voucher_type_id}</div>
                )}
              </div>

              <div className="col-lg-2 col-md-6 col-12">
                <label className="form-label fw-600">Branch <span className="text-danger">*</span></label>
                <select
                  name="branch_id"
                  className="form-select bg-light"
                  value={formData.branch_id}
                  onChange={handleInputChange}
                  disabled={true}
                >
                  <option value="">Select Branch</option>
                  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              <div className="col-lg-2 col-md-6 col-12">
                <label className="form-label fw-600">
                  Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="voucher_date"
                  className={`form-control ${errors.voucher_date ? 'is-invalid' : ''}`}
                  value={formData.voucher_date}
                  onChange={handleInputChange}
                  disabled={isPosted}
                />
                {errors.voucher_date && (
                  <div className="invalid-feedback d-block">{errors.voucher_date}</div>
                )}
              </div>

              <div className="col-lg-3 col-md-6 col-12">
                <label className="form-label fw-600">
                  Voucher No. <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="voucher_number"
                  className={`form-control bg-light fw-600 ${errors.voucher_number ? 'is-invalid' : ''}`}
                  value={formData.voucher_number}
                  onChange={handleInputChange}
                  disabled={true}
                />
                {errors.voucher_number && (
                  <div className="invalid-feedback d-block">{errors.voucher_number}</div>
                )}
              </div>

              <div className="col-lg-3 col-md-6 col-12">
                <label className="form-label fw-600">Reference No.</label>
                <input
                  type="text"
                  name="reference_number"
                  className="form-control"
                  value={formData.reference_number}
                  onChange={handleInputChange}
                  placeholder="e.g., CHQ-2025-001"
                  disabled={isPosted}
                />
              </div>

              <div className="col-lg-12 col-md-12 col-12">
                <label className="form-label fw-600">Narration</label>
                <textarea
                  name="narration"
                  className="form-control"
                  rows="2"
                  value={formData.narration}
                  onChange={handleInputChange}
                  placeholder="Transaction description"
                  disabled={isPosted}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Entry Lines Section */}
        <VoucherEntryLines
          entries={entries}
          setEntries={isPosted ? () => {} : setEntries}
          ledgers={ledgers}
          costCenters={costCenters}
          balanceError={balanceError}
          validateBalance={validateBalance}
          entryError={errors.entries}
          isReadOnly={isPosted}
        />

        {/* Action Buttons */}
        <div className="d-flex align-items-center justify-content-between mt-4 mb-5">
           <Link to="/accounting/vouchers" className="btn btn-light">
            <i className="isax isax-arrow-left-2 me-2"></i>Back to List
          </Link>
          <div className="d-flex gap-3">
            {!isPosted && (
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary px-4"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <i className="isax isax-save-2 me-2"></i>Update Draft
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary px-4"
                  onClick={handleSubmitForApproval}
                  disabled={loading}
                >
                  Submit for Approval
                </button>
                <button
                  type="button"
                  className="btn btn-primary px-5"
                  onClick={handlePostVoucher}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  ) : (
                    <i className="isax isax-tick-circle me-2"></i>
                  )}
                  Post Voucher
                </button>
              </>
            )}
            {isPosted && (
              <button type="button" className="btn btn-soft-secondary" disabled>
                <i className="isax isax-tick-circle me-2 text-success"></i>Already Posted
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default EditVoucher;
