import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import VoucherEntryLines from '../components/VoucherEntryLines';
import { voucherService } from '../services/voucherService';
import { ledgerService } from '../services/ledgerService';
import { costCenterService } from '../services/costCenterService';
import branchService from '../services/branchService';
import settingsService from '../services/settingsService';
import financialYearService from '../services/financialYearService';

const AddVoucher = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    voucher_type_id: '',
    voucher_series_id: '',
    branch_id: '',
    voucher_date: new Date().toISOString().split('T')[0],
    voucher_number: '',
    reference_number: '',
    narration: '',
    financial_year_id: '',
  });

  const [allVoucherSeries, setAllVoucherSeries] = useState([]);
  const [availableSeries, setAvailableSeries] = useState([]);

  const [entries, setEntries] = useState([
    { id: Date.now(), ledger_id: '', dr_cr: 'DR', amount: '', narration: '', cost_center_id: '' },
    { id: Date.now() + 1, ledger_id: '', dr_cr: 'CR', amount: '', narration: '', cost_center_id: '' },
  ]);

  const [voucherTypes, setVoucherTypes] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [costCenters, setCostCenters] = useState([]);
  const [errors, setErrors] = useState({});
  const [balanceError, setBalanceError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);

  const [filteredLedgers, setFilteredLedgers] = useState([]);
  const [financialYears, setFinancialYears] = useState([]);

  // Load Initial Data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [typesResp, ledgersResp, ccResp, branchesResp, seriesResp, fyResp] = await Promise.all([
          voucherService.getVoucherTypes(),
          ledgerService.getLedgers({ limit: 1000 }),
          costCenterService.getCostCenters(),
          branchService.getBranches(),
          settingsService.getVoucherSeries(),
          financialYearService.getFinancialYears()
        ]);

        if (typesResp?.data) {
          setVoucherTypes(typesResp.data);
        }
        if (ledgersResp?.data) {
          setLedgers(ledgersResp.data);
          setFilteredLedgers(ledgersResp.data);
        }
        if (ccResp?.data) setCostCenters(ccResp.data);
        if (seriesResp?.data) {
          setAllVoucherSeries(seriesResp.data);
        }
        if (fyResp?.data || fyResp) {
          const years = fyResp.data || fyResp || [];
          setFinancialYears(years);
          const savedId = localStorage.getItem('activeFinancialYearId');
          let activeFY = years.find(fy => fy.is_active);
          if (savedId) activeFY = years.find(fy => String(fy.id) === String(savedId)) || activeFY;
          if (activeFY && !isEditMode) {
            setFormData(prev => ({ ...prev, financial_year_id: activeFY.id }));
          }
        }
        if (branchesResp?.data) {
          const bList = branchesResp.data;
          setBranches(bList);
          
          const savedBranchId = localStorage.getItem('selectedBranchId');
          if (savedBranchId && !isEditMode) {
            setFormData(prev => ({ ...prev, branch_id: savedBranchId }));
          } else if (bList.length > 0 && !isEditMode) {
            setFormData(prev => ({ ...prev, branch_id: bList[0].id.toString() }));
          }
        }

        // If Edit Mode, fetch the voucher
        if (isEditMode) {
          const voucherResp = await voucherService.getVoucher(id);
          if (voucherResp?.data) {
            const v = voucherResp.data;
            setFormData({
              voucher_type_id: v.voucher_type_id,
              voucher_date: v.voucher_date,
              voucher_number: v.voucher_number,
              reference_number: v.reference_number || '',
              narration: v.narration || '',
              branch_id: v.branch_id?.toString() || '',
            });
            if (v.entries && v.entries.length > 0) {
              setEntries(v.entries.map(e => ({
                ...e,
                id: e.id || Date.now() + Math.random(),
                ledger_id: e.ledger_id?.toString(),
                cost_center_id: e.cost_center_id?.toString() || ''
              })));
            }
          }
        }
      } catch (error) {
        console.error('Error loading voucher data:', error);
        Swal.fire('Error', 'Failed to load voucher details', 'error');
      } finally {
        setFetching(false);
      }
    };
    loadInitialData();
  }, [isEditMode, id]);

  // Listen for global branch updates
  useEffect(() => {
    const handleBranchUpdate = () => {
      const savedBranchId = localStorage.getItem('selectedBranchId');
      if (savedBranchId && !isEditMode) {
        setFormData(prev => ({ ...prev, branch_id: savedBranchId }));
      }
    };
    window.addEventListener('BRANCH_UPDATED', handleBranchUpdate);
    return () => window.removeEventListener('BRANCH_UPDATED', handleBranchUpdate);
  }, [isEditMode]);

  // Reactive Ledger Filtering
  useEffect(() => {
    const filterLedgers = async () => {
      if (!formData.voucher_type_id) {
        setFilteredLedgers(ledgers);
        return;
      }

      const selectedType = voucherTypes.find(t => t.id.toString() === formData.voucher_type_id.toString());
      if (!selectedType) return;

      const typeCode = (selectedType.code || selectedType.name || '').toUpperCase();
      
      try {
        if (typeCode === 'CONTRA') {
          const resp = await ledgerService.getLedgersByType('cash_bank');
          if (resp?.data) setFilteredLedgers(resp.data);
        } else if (typeCode === 'RECEIPT' || typeCode === 'PAYMENT') {
          // For receipts/payments, we allow all but might want to prioritize cash/bank
          // For now, let's keep all ledgers or use the 'journal' filter if backend supports it
          setFilteredLedgers(ledgers);
        } else {
          setFilteredLedgers(ledgers);
        }
      } catch (err) {
        console.error('Filtering failed:', err);
        setFilteredLedgers(ledgers);
      }
    };

    filterLedgers();
  }, [formData.voucher_type_id, voucherTypes, ledgers]);

  const selectedTypeCode = useMemo(() => {
    if (!formData.voucher_type_id || !voucherTypes.length) return '';
    const selectedType = voucherTypes.find(t => t.id.toString() === formData.voucher_type_id.toString());
    return (selectedType?.code || selectedType?.name || '').toUpperCase();
  }, [formData.voucher_type_id, voucherTypes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'voucher_type_id' && value && !isEditMode) {
      // Filter series for this type
      const relatedSeries = allVoucherSeries.filter(s => String(s.voucher_type_id) === String(value));
      setAvailableSeries(relatedSeries);
      
      const activeFY = financialYears.find(fy => fy.is_active) || financialYears[0];
      const fyStr = activeFY?.name ? `${activeFY.name}/` : '';

      if (relatedSeries.length > 0) {
        const defaultSeries = relatedSeries.find(s => s.is_default) || relatedSeries[0];
        const type = voucherTypes.find(t => t.id.toString() === value.toString());
        const typeCode = type ? type.code : '';
        const nextNum = (defaultSeries.current_number || 0) + 1;
        const actualNextNum = nextNum > (defaultSeries.starting_number || 1) ? nextNum : (defaultSeries.starting_number || 1);
        const paddedNext = String(actualNextNum).padStart(defaultSeries.padding || 0, '0');
        
        setFormData(prev => ({ 
          ...prev, 
          voucher_series_id: defaultSeries.id.toString(),
          voucher_number: `${typeCode ? typeCode + '/' : ''}${defaultSeries.prefix || ''}${paddedNext}${defaultSeries.suffix || ''}`
        }));
      } else {
        const type = voucherTypes.find(t => t.id.toString() === value.toString());
        const prefix = type ? (type.code || 'VCH') : 'VCH';
        setFormData(prev => ({ 
          ...prev, 
          voucher_series_id: '',
          voucher_number: `${prefix}/${fyStr}`
        }));
      }
    }

    if (name === 'voucher_series_id' && value) {
      const selectedSeries = availableSeries.find(s => String(s.id) === String(value));
      if (selectedSeries) {
        const type = voucherTypes.find(t => t.id.toString() === formData.voucher_type_id.toString());
        const typeCode = type ? type.code : '';
        const nextNum = (selectedSeries.current_number || 0) + 1;
        const actualNextNum = nextNum > (selectedSeries.starting_number || 1) ? nextNum : (selectedSeries.starting_number || 1);
        const paddedNext = String(actualNextNum).padStart(selectedSeries.padding || 0, '0');
        
        setFormData(prev => ({ 
          ...prev, 
          voucher_number: `${typeCode ? typeCode + '/' : ''}${selectedSeries.prefix || ''}${paddedNext}${selectedSeries.suffix || ''}`
        }));
      }
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateBalance = useCallback(() => {
    const totalDR = entries
      .filter((e) => e.dr_cr === 'DR')
      .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    const totalCR = entries
      .filter((e) => e.dr_cr === 'CR')
      .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    const isBalanced = Math.abs(totalDR - totalCR) < 0.01;
    if (!isBalanced) {
      setBalanceError(`Unbalanced: DR ₹${totalDR.toFixed(2)} vs CR ₹${totalCR.toFixed(2)}`);
      return false;
    }
    setBalanceError('');
    return true;
  }, [entries]);

  useEffect(() => {
    validateBalance();
  }, [validateBalance]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.voucher_type_id) newErrors.voucher_type_id = 'Voucher Type is required';
    if (!formData.voucher_date) newErrors.voucher_date = 'Voucher Date is required';
    if (!formData.branch_id) newErrors.branch_id = 'Branch is required';
    // voucher_number is optional — backend auto-generates it from the series when not provided
    
    const validLines = entries.filter(e => e.ledger_id && parseFloat(e.amount) > 0);
    if (validLines.length < 2) {
      newErrors.entries = 'Minimum 2 valid transaction lines (with Ledger and Amount > 0) are required';
      // Add inline errors for the first two entries if they are empty
      entries.slice(0, 2).forEach(entry => {
          if (!entry.ledger_id) newErrors[`entry_ledger_${entry.id}`] = 'Ledger is required';
          if (!entry.amount || parseFloat(entry.amount) <= 0) newErrors[`entry_amount_${entry.id}`] = 'Amount is required';
      });
    }

    setErrors(newErrors);
    return newErrors;
  };

  const clearLineError = (id, field) => {
    const errorKey = `entry_${field}_${id}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const handleSubmit = async (action = 'save') => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    if (!validateBalance()) {
      Swal.fire('Unbalanced', 'Debit and Credit totals must be equal', 'error');
      return;
    }

    setLoading(true);
    try {
      // voucher_number is optional — omit it to let the backend auto-generate from the series.
      // Only include it if the user explicitly typed a custom number.
      const { branch_id, voucher_series_id, voucher_number, financial_year_id, ...rest } = formData;

      const payload = {
        ...rest,
        voucher_type_id: parseInt(rest.voucher_type_id),
        ...(voucher_series_id ? { voucher_series_id: parseInt(voucher_series_id) } : {}),
        ...(voucher_number?.trim() ? { voucher_number: voucher_number.trim() } : {}),
        entries: entries.map(({ ledger_id, dr_cr, amount, narration, cost_center_id }) => {
          const entry = {
            ledger_id: parseInt(ledger_id),
            dr_cr,
            amount: parseFloat(amount),
            narration,
          };
          if (cost_center_id) {
            entry.cost_center_id = parseInt(cost_center_id);
          }
          return entry;
        }),
      };

      let response;
      if (isEditMode) {
        response = await voucherService.updateVoucher(id, payload);
      } else {
        response = await voucherService.createVoucher(payload);
      }

      const voucherId = response?.data?.id || id;

      if (action === 'post') {
        await voucherService.postVoucher(voucherId);
        Swal.fire({
          title: 'Success',
          text: 'Voucher saved and posted successfully',
          icon: 'success',
          iconHtml: '<i class="isax isax-tick-circle text-success fs-50"></i>',
          customClass: { icon: 'border-0' }
        });
      } else {
        Swal.fire({
          title: 'Success',
          text: 'Voucher saved as draft',
          icon: 'success',
          iconHtml: '<i class="isax isax-tick-circle text-success fs-50"></i>',
          customClass: { icon: 'border-0' }
        });
      }

      navigate('/accounting/vouchers');
    } catch (error) {
      console.error('Submission error:', error);
      
      const humanizeError = (msg) => {
        if (typeof msg !== 'string') return msg;
        return msg
          .replace(/entries\[(\d+)\]/g, (_, index) => `Entry ${parseInt(index) + 1}`)
          .replace(/cost_center_id/g, 'Cost Center')
          .replace(/ledger_id/g, 'Ledger')
          .replace(/voucher_type_id/g, 'Voucher Type')
          .replace(/voucher_date/g, 'Voucher Date')
          .replace(/amount/g, 'Amount')
          .replace(/\./g, ' ')
          .replace(/"/g, '')
          .replace(/_/g, ' ');
      };

      // Handle detailed validation errors from backend
      if (error.details && Array.isArray(error.details)) {
        const detailMsgs = error.details.map(d => `<li>${humanizeError(d.message || d)}</li>`).join('');
        Swal.fire({
          title: 'Validation Failed',
          html: `<div class="text-start">The following issues were found:<ul class="mt-2 mb-0">${detailMsgs}</ul></div>`,
          icon: 'error'
        });
      } else {
        Swal.fire('Error', humanizeError(error.message) || 'Failed to save voucher', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="page-wrapper d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="page-header d-flex align-items-center justify-content-between mb-4">
        <div className="page-title">
          <h4>{isEditMode ? 'Edit' : 'Create'} Voucher</h4>
          <p className="text-muted mb-0">
            {isEditMode ? 'Update existing voucher details' : 'Record a new accounting transaction'}
          </p>
        </div>
        <div className="page-header-right">
          <Link to="/accounting/vouchers" className="btn btn-outline-secondary d-flex align-items-center">
            <i className="isax isax-arrow-left-2 me-2"></i>Back to List
          </Link>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Header Card */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-transparent border-bottom">
            <h5 className="card-title mb-0">Voucher Header</h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-3 col-md-6">
                <label className="form-label fw-600">Voucher Type <span className="text-danger">*</span></label>
                <select
                  name="voucher_type_id"
                  className={`form-select ${errors.voucher_type_id ? 'is-invalid' : ''}`}
                  value={formData.voucher_type_id}
                  onChange={handleInputChange}
                  disabled={isEditMode}
                >
                  <option value="">Select Type</option>
                  {voucherTypes
                    .filter(t => !['SALES', 'PURCHASE', 'CREDIT NOTE', 'DEBIT NOTE'].includes(t.name?.toUpperCase()))
                    .map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                {errors.voucher_type_id && <div className="invalid-feedback">{errors.voucher_type_id}</div>}
              </div>

              {availableSeries.length > 1 && (
                <div className="col-lg-3 col-md-6">
                  <label className="form-label fw-600">Voucher Series</label>
                  <select
                    name="voucher_series_id"
                    className="form-select"
                    value={formData.voucher_series_id}
                    onChange={handleInputChange}
                    disabled={isEditMode}
                  >
                    {availableSeries.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              )}

              <div className="col-lg-3 col-md-6">
                <label className="form-label fw-600">Branch <span className="text-danger">*</span></label>
                <select
                  name="branch_id"
                  className={`form-select bg-light ${errors.branch_id ? 'is-invalid' : ''}`}
                  value={formData.branch_id}
                  onChange={handleInputChange}
                  required
                  disabled={true}
                >
                  <option value="">Select Branch</option>
                  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                {errors.branch_id && <div className="invalid-feedback d-block">{errors.branch_id}</div>}
              </div>

              <div className="col-lg-2 col-md-6">
                <label className="form-label fw-600">Date <span className="text-danger">*</span></label>
                <input
                  type="date"
                  name="voucher_date"
                  className={`form-control ${errors.voucher_date ? 'is-invalid' : ''}`}
                  value={formData.voucher_date}
                  onChange={handleInputChange}
                />
                {errors.voucher_date && <div className="invalid-feedback">{errors.voucher_date}</div>}
              </div>

              <div className="col-lg-3 col-md-6">
                <label className="form-label fw-600">
                  Voucher No
                  <span className="text-muted fw-normal ms-1" style={{ fontSize: '0.75rem' }}>(auto-generated if blank)</span>
                </label>
                <input
                  type="text"
                  name="voucher_number"
                  className="form-control fw-600"
                  value={formData.voucher_number}
                  onChange={handleInputChange}
                  placeholder="Leave blank to auto-generate"
                />
              </div>

              <div className="col-lg-4 col-md-6">
                <label className="form-label fw-600">Reference No</label>
                <input
                  type="text"
                  name="reference_number"
                  className="form-control"
                  value={formData.reference_number}
                  onChange={handleInputChange}
                  placeholder="e.g. Invoice #, Chq #"
                />
              </div>

              <div className="col-12 mt-3">
                <label className="form-label fw-600">Main Narration</label>
                <textarea
                  name="narration"
                  className="form-control"
                  rows="2"
                  value={formData.narration}
                  onChange={handleInputChange}
                  placeholder="Overall transaction description..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Entries Section */}
        <VoucherEntryLines
          entries={entries}
          setEntries={setEntries}
          ledgers={ledgers} // Use full ledgers here as the component handles specific filtering
          costCenters={costCenters}
          balanceError={balanceError}
          validateBalance={validateBalance}
          entryError={errors.entries}
          lineErrors={errors}
          clearLineError={clearLineError}
          voucherType={selectedTypeCode}
        />

        {/* Footer Actions */}
        <div className="d-flex align-items-center justify-content-between mt-4 mb-5">
          <Link to="/accounting/vouchers" className="btn btn-light mw-100">
            <i className="isax isax-close-circle me-2"></i>Cancel
          </Link>
          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-outline-primary px-4"
              disabled={loading}
              onClick={() => handleSubmit('save')}
            >
              {loading ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="button"
              className="btn btn-primary px-5"
              disabled={loading}
              onClick={() => handleSubmit('post')}
            >
              <i className="isax isax-tick-circle me-2"></i>{isEditMode ? 'Update & Post' : 'Post Voucher'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddVoucher;
