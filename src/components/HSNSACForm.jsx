import { useState, useEffect } from 'react';

const HSNSACForm = ({ initialData = null, onSubmit, isLoading = false, onClose }) => {
  const [formData, setFormData] = useState({
    code: '',
    type: 'HSN',
    description: '',
    gst_rate: '',
    cgst_rate: '',
    sgst_rate: '',
    igst_rate: '',
    cess_rate: 0,
  });

  const [errors, setErrors] = useState({});

  const gstRateOptions = [0, 3, 5, 12, 18, 28];

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = 'HSN/SAC Code is required';
    }

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.gst_rate === '') {
      newErrors.gst_rate = 'GST Rate is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto-calculate CGST, SGST, IGST when GST rate changes
      if (name === 'gst_rate' && value !== '') {
        const gstValue = parseFloat(value);
        updated.cgst_rate = (gstValue / 2).toFixed(2);
        updated.sgst_rate = (gstValue / 2).toFixed(2);
        updated.igst_rate = gstValue.toFixed(2);
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
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          {/* HSN/SAC Code and Type */}
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-600 fs-13 text-dark">
                  HSN/SAC Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control border-0 bg-light py-2 shadow-none ${errors.code ? 'is-invalid' : ''}`}
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Enter HSN/SAC code"
                />
                {errors.code && <div className="invalid-feedback d-block fs-12">{errors.code}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-600 fs-13 text-dark">
                  Type <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select border-0 bg-light py-2 shadow-none ${errors.type ? 'is-invalid' : ''}`}
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Type</option>
                  <option value="HSN">HSN (Goods)</option>
                  <option value="SAC">SAC (Services)</option>
                </select>
                {errors.type && <div className="invalid-feedback d-block fs-12">{errors.type}</div>}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-600 fs-13 text-dark">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              className={`form-control border-0 bg-light py-2 shadow-none ${errors.description ? 'is-invalid' : ''}`}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Enter description"
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback d-block fs-12">{errors.description}</div>
            )}
          </div>

          <div className="row">
            {/* GST Rate */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-600 fs-13 text-dark">
                  GST Rate (%) <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select border-0 bg-light py-2 shadow-none ${errors.gst_rate ? 'is-invalid' : ''}`}
                  name="gst_rate"
                  value={formData.gst_rate}
                  onChange={handleInputChange}
                >
                  <option value="">Select GST Rate</option>
                  {gstRateOptions.map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}%
                    </option>
                  ))}
                </select>
                {errors.gst_rate && <div className="invalid-feedback d-block fs-12">{errors.gst_rate}</div>}
              </div>
            </div>
            {/* CESS Rate */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-600 fs-13 text-dark">CESS Rate (%)</label>
                <input
                  type="number"
                  className="form-control border-0 bg-light py-2 shadow-none"
                  name="cess_rate"
                  value={formData.cess_rate}
                  onChange={handleInputChange}
                  placeholder="0"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* CGST, SGST, IGST Rates (Display Only) */}
          <div className="row bg-light rounded-3 p-3 mb-3 mx-0">
            <div className="col-md-4">
              <div className="mb-0">
                <label className="form-label fw-500 fs-12 text-muted mb-1 text-uppercase">CGST</label>
                <div className="fw-bold text-dark">{formData.cgst_rate || '0.00'}%</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-0">
                <label className="form-label fw-500 fs-12 text-muted mb-1 text-uppercase">SGST</label>
                <div className="fw-bold text-dark">{formData.sgst_rate || '0.00'}%</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-0">
                <label className="form-label fw-500 fs-12 text-muted mb-1 text-uppercase">IGST</label>
                <div className="fw-bold text-dark">{formData.igst_rate || '0.00'}%</div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top-light">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 rounded-pill"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-4 rounded-pill shadow-sm" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                'Save HSN/SAC'
              )}
            </button>
          </div>
        </form>
      </div>
  );
};

export default HSNSACForm;
