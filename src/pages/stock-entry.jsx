import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createStockEntry } from '../services/inventoryService';
import { settingsService } from '../services/settingsService';
import itemService from '../services/itemService';

const StockEntry = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    item_id: '',
    warehouse_id: '',
    qty: '',
    txn_type: 'IN',
    remarks: '',
  });

  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const loadDropdownData = async () => {
      setFetchingData(true);
      try {
        const [itemsResp, warehousesResp] = await Promise.all([
          itemService.getItems({ limit: 1000 }),
          settingsService.getWarehouses(),
        ]);
        setItems(itemsResp?.data || []);
        setWarehouses(warehousesResp?.data || []);
      } catch (error) {
        console.error('Error loading dropdown data:', error);
        toast.error('Failed to load items or warehouses');
      } finally {
        setFetchingData(false);
      }
    };
    loadDropdownData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.item_id) newErrors.item_id = 'Item is required';
    if (!formData.warehouse_id) newErrors.warehouse_id = 'Warehouse is required';
    if (!formData.qty || parseFloat(formData.qty) <= 0)
      newErrors.qty = 'Quantity must be greater than 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        item_id: parseInt(formData.item_id),
        warehouse_id: parseInt(formData.warehouse_id),
        qty: parseFloat(formData.qty),
        txn_type: formData.txn_type,
        remarks: formData.remarks.trim() || undefined,
      };

      const response = await createStockEntry(payload);
      if (response?.success || response?.data) {
        toast.success('Stock entry recorded successfully!');
        navigate('/inventory/stock-summary');
      } else {
        toast.error(response?.message || 'Failed to record stock entry');
      }
    } catch (error) {
      console.error('Error creating stock entry:', error);
      toast.error(error?.response?.data?.message || error?.message || 'Failed to record stock entry');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ item_id: '', warehouse_id: '', qty: '', txn_type: 'IN', remarks: '' });
    setErrors({});
  };

  return (
    <>
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Stock Entry</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/inventory/stock-summary">Inventory</Link>
              </li>
              <li className="breadcrumb-item active text-primary">Stock Entry</li>
            </ol>
          </nav>
        </div>
        <Link to="/inventory/stock-summary" className="btn btn-outline-secondary rounded-pill px-4">
          <i className="isax isax-arrow-left me-2"></i>Back to Stock Summary
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-xl-7 col-lg-9">
          <form onSubmit={handleSubmit} noValidate>

            {/* Info Banner */}
            <div className="alert alert-soft-info border-0 rounded-3 mb-4 d-flex align-items-start gap-3">
              <i className="isax isax-info-circle fs-20 text-info mt-1 flex-shrink-0"></i>
              <div>
                <strong>About Stock Entry</strong>
                <p className="mb-0 text-muted small mt-1">
                  Use this form to add opening stock, record stock adjustments, or manually add/deduct inventory
                  in a specific warehouse. Choose <strong>IN</strong> to add stock and <strong>OUT</strong> to deduct.
                </p>
              </div>
            </div>

            {/* Main Form Card */}
            <div className="card shadow-sm border-0 rounded-4 mb-4">
              <div className="card-header bg-white py-3 border-bottom d-flex align-items-center">
                <div
                  className="icon-box bg-soft-primary text-primary rounded-pill me-3"
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <i className="isax isax-box-add fs-20"></i>
                </div>
                <h6 className="mb-0 fw-bold">Stock Entry Details</h6>
              </div>
              <div className="card-body p-4">

                {fetchingData ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-2 mb-0">Loading items and warehouses...</p>
                  </div>
                ) : (
                  <div className="row g-4">

                    {/* Item */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Item <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select bg-light border-0 py-2 ${errors.item_id ? 'is-invalid' : ''}`}
                        name="item_id"
                        value={formData.item_id}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Item</option>
                        {items.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name} {item.sku ? `(${item.sku})` : ''}
                          </option>
                        ))}
                      </select>
                      {errors.item_id && <div className="invalid-feedback">{errors.item_id}</div>}
                    </div>

                    {/* Warehouse */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Warehouse <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select bg-light border-0 py-2 ${errors.warehouse_id ? 'is-invalid' : ''}`}
                        name="warehouse_id"
                        value={formData.warehouse_id}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Warehouse</option>
                        {warehouses.map((wh) => (
                          <option key={wh.id} value={wh.id}>
                            {wh.name} {wh.location ? `— ${wh.location}` : ''}
                          </option>
                        ))}
                      </select>
                      {errors.warehouse_id && <div className="invalid-feedback">{errors.warehouse_id}</div>}
                    </div>

                    {/* Quantity */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Quantity <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control bg-light border-0 py-2 ${errors.qty ? 'is-invalid' : ''}`}
                        name="qty"
                        value={formData.qty}
                        onChange={handleInputChange}
                        placeholder="e.g. 100"
                        min="0.01"
                        step="0.01"
                      />
                      {errors.qty && <div className="invalid-feedback">{errors.qty}</div>}
                    </div>

                    {/* Transaction Type */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Transaction Type</label>
                      <div className="d-flex gap-3 p-2 bg-light rounded-3 mt-1">
                        <div className="form-check mb-0">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="txn_type"
                            id="txn_in"
                            value="IN"
                            checked={formData.txn_type === 'IN'}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label fw-medium text-success" htmlFor="txn_in">
                            <i className="isax isax-arrow-down-1 me-1"></i>IN (Add Stock)
                          </label>
                        </div>
                        <div className="form-check mb-0">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="txn_type"
                            id="txn_out"
                            value="OUT"
                            checked={formData.txn_type === 'OUT'}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label fw-medium text-danger" htmlFor="txn_out">
                            <i className="isax isax-arrow-up-2 me-1"></i>OUT (Deduct Stock)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Remarks */}
                    <div className="col-12">
                      <label className="form-label fw-semibold">Remarks</label>
                      <textarea
                        className="form-control bg-light border-0 py-2"
                        name="remarks"
                        rows="3"
                        value={formData.remarks}
                        onChange={handleInputChange}
                        placeholder="e.g. Opening stock entry, Physical verification adjustment..."
                      ></textarea>
                    </div>

                    {/* Preview Strip */}
                    {formData.item_id && formData.warehouse_id && formData.qty && (
                      <div className="col-12">
                        <div className={`alert border-0 rounded-3 py-2 px-3 ${formData.txn_type === 'IN' ? 'alert-soft-success' : 'alert-soft-danger'}`}>
                          <i className={`isax me-2 ${formData.txn_type === 'IN' ? 'isax-tick-circle text-success' : 'isax-minus-cirlce text-danger'}`}></i>
                          <strong>
                            {formData.txn_type === 'IN' ? 'Adding' : 'Deducting'} {formData.qty} units
                          </strong>{' '}
                          of{' '}
                          <strong>{items.find((i) => String(i.id) === String(formData.item_id))?.name || '—'}</strong>{' '}
                          {formData.txn_type === 'IN' ? 'to' : 'from'}{' '}
                          <strong>{warehouses.find((w) => String(w.id) === String(formData.warehouse_id))?.name || '—'}</strong>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex align-items-center justify-content-end gap-3 mb-5">
              <button
                type="button"
                className="btn btn-light px-5 rounded-pill shadow-sm"
                onClick={handleReset}
                disabled={loading}
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn btn-primary px-5 rounded-pill"
                disabled={loading || fetchingData}
              >
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Recording...</>
                ) : (
                  <><i className="isax isax-box-tick me-2"></i>Record Stock Entry</>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default StockEntry;
