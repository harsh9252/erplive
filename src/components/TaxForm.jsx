import { useState, useEffect } from 'react';

const TaxForm = ({ initialData = null, onSubmit, isLoading = false, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    tax_type: 'GST',
    rate: '',
    cgst_rate: '',
    sgst_rate: '',
    igst_rate: '',
    // Compliance fields
    nature_of_payment: '',
    product_category: '',
    section: '',
    threshold_amount: '',
  });

  const [errors, setErrors] = useState({});

  const taxTypes = ['GST', 'TDS', 'TCS', 'CESS', 'OTHER'];

  useEffect(() => {
    if (initialData) {
      // Map compliance fields if necessary (some APIs might return different keys)
      const mappedData = { ...initialData };
      if (initialData.tds_rate !== undefined) mappedData.rate = initialData.tds_rate;
      if (initialData.tcs_rate !== undefined) mappedData.rate = initialData.tcs_rate;
      
      setFormData(prev => ({ ...prev, ...mappedData }));
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (formData.tax_type === 'GST' || formData.tax_type === 'CESS' || formData.tax_type === 'OTHER') {
      if (!formData.name?.trim()) {
        newErrors.name = 'Tax Name is required';
      }
    }

    if (formData.tax_type === 'TDS') {
      if (!formData.nature_of_payment?.trim()) newErrors.nature_of_payment = 'Nature of Payment is required';
      if (!formData.section?.trim()) newErrors.section = 'Section is required';
    }

    if (formData.tax_type === 'TCS') {
      if (!formData.product_category?.trim()) newErrors.product_category = 'Product Category is required';
      if (!formData.section?.trim()) newErrors.section = 'Section is required';
    }

    if (formData.rate === '') {
      newErrors.rate = 'Rate is required';
    } else if (isNaN(formData.rate) || parseFloat(formData.rate) < 0) {
      newErrors.rate = 'Rate must be a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto-calculate CGST, SGST, IGST when rate changes (ONLY for GST)
      if (name === 'rate' && value !== '' && updated.tax_type === 'GST') {
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
      // Prepare data for submission based on type
      let submissionData = { ...formData };
      
      if (formData.tax_type === 'TDS') {
        submissionData = {
          nature_of_payment: formData.nature_of_payment,
          section: formData.section,
          threshold_amount: formData.threshold_amount || 0,
          tds_rate: parseFloat(formData.rate)
        };
      } else if (formData.tax_type === 'TCS') {
        submissionData = {
          product_category: formData.product_category,
          section: formData.section,
          threshold_amount: formData.threshold_amount || 0,
          tcs_rate: parseFloat(formData.rate)
        };
      }

      onSubmit(submissionData);
    }
  };

  return (
    <div className="card border-0 mb-0">
      <div className="card-body p-0">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12 mb-3">
              <label className="form-label">
                Tax Type <span className="text-danger">*</span>
              </label>
              <select
                className={`form-control ${errors.tax_type ? 'is-invalid' : ''}`}
                name="tax_type"
                value={formData.tax_type}
                onChange={handleInputChange}
                disabled={!!initialData}
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

            {/* GST specific fields */}
            {(formData.tax_type === 'GST' || formData.tax_type === 'CESS' || formData.tax_type === 'OTHER') && (
              <div className="col-md-12 mb-3">
                <label className="form-label">
                  Tax Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., GST 18%"
                />
                {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
              </div>
            )}

            {/* TDS specific fields */}
            {formData.tax_type === 'TDS' && (
              <>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Nature of Payment <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.nature_of_payment ? 'is-invalid' : ''}`}
                    name="nature_of_payment"
                    value={formData.nature_of_payment}
                    onChange={handleInputChange}
                    placeholder="e.g., Professional Fees"
                  />
                  {errors.nature_of_payment && <div className="invalid-feedback d-block">{errors.nature_of_payment}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Section <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.section ? 'is-invalid' : ''}`}
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    placeholder="e.g., 194J"
                  />
                  {errors.section && <div className="invalid-feedback d-block">{errors.section}</div>}
                </div>
              </>
            )}

            {/* TCS specific fields */}
            {formData.tax_type === 'TCS' && (
              <>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Product Category <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.product_category ? 'is-invalid' : ''}`}
                    name="product_category"
                    value={formData.product_category}
                    onChange={handleInputChange}
                    placeholder="e.g., Goods"
                  />
                  {errors.product_category && <div className="invalid-feedback d-block">{errors.product_category}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Section <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.section ? 'is-invalid' : ''}`}
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    placeholder="e.g., 206C"
                  />
                  {errors.section && <div className="invalid-feedback d-block">{errors.section}</div>}
                </div>
              </>
            )}

            <div className={`col-md-${formData.tax_type === 'GST' ? '12' : '6'} mb-3`}>
              <label className="form-label">
                {formData.tax_type === 'GST' ? 'Total Rate' : formData.tax_type === 'TDS' ? 'TDS Rate' : 'TCS Rate'} (%) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={`form-control ${errors.rate ? 'is-invalid' : ''}`}
                name="rate"
                value={formData.rate}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.rate && <div className="invalid-feedback d-block">{errors.rate}</div>}
            </div>

            {(formData.tax_type === 'TDS' || formData.tax_type === 'TCS') && (
              <div className="col-md-6 mb-3">
                <label className="form-label">Threshold Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="threshold_amount"
                  value={formData.threshold_amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            )}

            {/* GST specific breakdown */}
            {formData.tax_type === 'GST' && (
              <div className="row g-2">
                <div className="col-md-4 mb-3">
                  <label className="form-label">CGST (%)</label>
                  <input type="number" className="form-control" name="cgst_rate" value={formData.cgst_rate} readOnly />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">SGST (%)</label>
                  <input type="number" className="form-control" name="sgst_rate" value={formData.sgst_rate} readOnly />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">IGST (%)</label>
                  <input type="number" className="form-control" name="igst_rate" value={formData.igst_rate} readOnly />
                </div>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button type="button" className="btn btn-light" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxForm;
