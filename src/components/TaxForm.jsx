import { useState, useEffect } from 'react';

const TaxForm = ({ initialData = null, onSubmit, isLoading = false, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    tax_type: 'GST',
    rate: '',
    cgst_rate: '',
    sgst_rate: '',
    igst_rate: '',
  });

  const [errors, setErrors] = useState({});

  const taxTypes = ['GST', 'TDS', 'TCS', 'CESS', 'OTHER'];

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tax Name is required';
    }

    if (!formData.tax_type) {
      newErrors.tax_type = 'Tax Type is required';
    }

    if (formData.rate === '') {
      newErrors.rate = 'Total Rate is required';
    } else if (isNaN(formData.rate) || parseFloat(formData.rate) < 0) {
      newErrors.rate = 'Total Rate must be a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto-calculate CGST, SGST, IGST when rate changes
      if (name === 'rate' && value !== '') {
        const rateValue = parseFloat(value);
        if (!isNaN(rateValue)) {
          updated.cgst_rate = (rateValue / 2).toFixed(2);
          updated.sgst_rate = (rateValue / 2).toFixed(2);
          updated.igst_rate = rateValue.toFixed(2);
        }
      }

      return updated;
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Tax Name and Type */}
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Tax Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., GST 18%, TDS 10%"
                />
                {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Type <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-control ${errors.tax_type ? 'is-invalid' : ''}`}
                  name="tax_type"
                  value={formData.tax_type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Type</option>
                  {taxTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.tax_type && (
                  <div className="invalid-feedback d-block">{errors.tax_type}</div>
                )}
              </div>
            </div>
          </div>

          {/* Total Rate */}
          <div className="mb-3">
            <label className="form-label">
              Total Rate (%) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className={`form-control ${errors.rate ? 'is-invalid' : ''}`}
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              placeholder="Enter total tax rate"
              step="0.01"
              min="0"
            />
            {errors.rate && <div className="invalid-feedback d-block">{errors.rate}</div>}
          </div>

          {/* CGST, SGST, IGST Rates (Auto-calculated) */}
          <div className="row">
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">CGST (%)</label>
                <input
                  type="number"
                  className="form-control"
                  name="cgst_rate"
                  value={formData.cgst_rate}
                  onChange={handleInputChange}
                  placeholder="Auto-calculated"
                  step="0.01"
                  readOnly
                />
                <small className="text-muted">Auto-calculated (Total Rate / 2)</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">SGST (%)</label>
                <input
                  type="number"
                  className="form-control"
                  name="sgst_rate"
                  value={formData.sgst_rate}
                  onChange={handleInputChange}
                  placeholder="Auto-calculated"
                  step="0.01"
                  readOnly
                />
                <small className="text-muted">Auto-calculated (Total Rate / 2)</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label">IGST (%)</label>
                <input
                  type="number"
                  className="form-control"
                  name="igst_rate"
                  value={formData.igst_rate}
                  onChange={handleInputChange}
                  placeholder="Auto-calculated"
                  step="0.01"
                  readOnly
                />
                <small className="text-muted">Auto-calculated (= Total Rate)</small>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                'Save Tax'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxForm;
