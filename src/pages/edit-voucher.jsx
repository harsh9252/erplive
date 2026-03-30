import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VoucherEntryLines from '../components/VoucherEntryLines';
import { voucherService } from '../services/voucherService';
import { ledgerService } from '../services/ledgerService';
import { costCenterService } from '../services/costCenterService';
import approvalService from '../services/approvalService';
import { toast } from 'react-toastify';

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
  });

  const [entries, setEntries] = useState([
    { id: 1, ledger_id: '', dr_cr: 'DR', amount: '', narration: '' },
    { id: 2, ledger_id: '', dr_cr: 'CR', amount: '', narration: '' },
  ]);

  const [voucherTypes, setVoucherTypes] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [costCenters, setCostCenters] = useState([]);
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
          });
          setEntries(voucher.entries || []);
          setIsPosted(voucher.status === 'Posted');
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

  /* 
   * Voucher updates are not supported by the current backend API. 
   * We keep the submission handler to provide feedback to the user.
   */

  const handlePostVoucher = async () => {
    if (window.confirm('Are you sure you want to post this voucher? Posted vouchers cannot be edited.')) {
      setLoading(true);
      try {
        await voucherService.postVoucher(id);
        setIsPosted(true);
      } catch (error) {
        console.error('Error posting voucher:', error);
        setErrors({ submit: error.message || 'Failed to post voucher' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmitForApproval = async () => {
    const remarks = window.prompt('Enter any remarks for approval (optional):');
    if (remarks === null) return;

    setLoading(true);
    try {
      await approvalService.submitForApproval({
        entity_type: 'VOUCHER',
        entity_id: id,
        remarks: remarks,
      });
      toast.success('Submitted for approval successfully!');
      // Reload voucher state if possible or navigate
      navigate('/vouchers');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit for approval');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Voucher updates are not exposed by the current backend API. Post or cancel the voucher instead.');
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
          <Link to="/vouchers" className="btn btn-outline-secondary d-flex align-items-center">
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
              <div className="col-lg-3 col-md-6 col-12">
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
                  {voucherTypes.map((type) => (
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

              <div className="col-lg-4 col-md-6 col-12">
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
           <Link to="/vouchers" className="btn btn-light">
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
