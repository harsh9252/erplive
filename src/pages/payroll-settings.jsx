import { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import { settingsService } from '../services/settingsService';
import { toast } from 'react-toastify';

const PayrollSettings = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    pf_applicable: true,
    pf_employer_rate: 12,
    pf_employee_rate: 12,
    esi_applicable: true,
    esi_employer_rate: 3.25,
    esi_employee_rate: 0.75,
    esi_wage_ceiling: 21000,
    pt_applicable: true,
    pt_state: '27',
    lwf_applicable: false,
    gratuity_applicable: false,
    tds_on_salary_applicable: true,
    salary_calculation_days: 'Actual Days',
    pay_cycle_start: 1,
  });

  useEffect(() => {
    fetchPayrollSettings();
  }, []);

  const fetchPayrollSettings = async () => {
    setLoading(true);
    try {
      const response = await settingsService.getPayrollSettings();
      if (response && response.data) {
        // Merge with defaults to handle new fields
        setFormData(prev => ({ ...prev, ...response.data }));
      }
    } catch (error) {
      console.error('Error fetching payroll settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await settingsService.updatePayrollSettings(formData);
      if (response.success || response.id) {
        toast.success('Payroll settings updated successfully');
      } else {
        toast.error(response.message || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating payroll settings:', error);
      toast.error('Failed to update payroll settings');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-xl-12">
        <div className="row settings-wrapper d-flex">
          {/* Settings Sidebar Removed for full-width layout */}
          <div className="col-12">
            <div className="mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-0">Payroll & Statutory Settings</h6>
                <p className="fs-13 text-muted mt-1">Configure contribution rates and compliance rules</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* EPF Section */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fs-14 fw-bold text-primary"> Provident Fund (EPF)</h6>
                  <div className="form-check form-switch mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="pf_applicable"
                      checked={formData.pf_applicable}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className={`card-body ${!formData.pf_applicable ? 'opacity-50' : ''}`}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-dark fs-13 fw-600">Employee Contribution (%)</label>
                      <input
                        type="number"
                        className="form-control shadow-none"
                        name="pf_employee_rate"
                        value={formData.pf_employee_rate}
                        onChange={handleInputChange}
                        disabled={!formData.pf_applicable}
                        step="0.01"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-dark fs-13 fw-600">Employer Contribution (%)</label>
                      <input
                        type="number"
                        className="form-control shadow-none"
                        name="pf_employer_rate"
                        value={formData.pf_employer_rate}
                        onChange={handleInputChange}
                        disabled={!formData.pf_applicable}
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ESI Section */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fs-14 fw-bold text-success"> Employee State Insurance (ESI)</h6>
                  <div className="form-check form-switch mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="esi_applicable"
                      checked={formData.esi_applicable}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className={`card-body ${!formData.esi_applicable ? 'opacity-50' : ''}`}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label text-dark fs-13 fw-600">Employee Rate (%)</label>
                      <input
                        type="number"
                        className="form-control shadow-none"
                        name="esi_employee_rate"
                        value={formData.esi_employee_rate}
                        onChange={handleInputChange}
                        disabled={!formData.esi_applicable}
                        step="0.01"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-dark fs-13 fw-600">Employer Rate (%)</label>
                      <input
                        type="number"
                        className="form-control shadow-none"
                        name="esi_employer_rate"
                        value={formData.esi_employer_rate}
                        onChange={handleInputChange}
                        disabled={!formData.esi_applicable}
                        step="0.01"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-dark fs-13 fw-600">Wage Ceiling (₹)</label>
                      <input
                        type="number"
                        className="form-control shadow-none"
                        name="esi_wage_ceiling"
                        value={formData.esi_wage_ceiling}
                        onChange={handleInputChange}
                        disabled={!formData.esi_applicable}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Compliances */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h6 className="fs-14 fw-bold mb-3">Statutory Defaults</h6>
                      <div className="mb-3">
                        <label className="form-label fs-13 fw-600">Professional Tax (PT) State Code</label>
                        <input
                          type="text"
                          className="form-control shadow-none"
                          name="pt_state"
                          value={formData.pt_state}
                          onChange={handleInputChange}
                          placeholder="e.g. 27 for MH"
                        />
                      </div>
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="pt_applicable"
                          checked={formData.pt_applicable}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label fw-600">Apply Professional Tax</label>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="lwf_applicable"
                          checked={formData.lwf_applicable}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label fw-600">Apply Labour Welfare Fund (LWF)</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h6 className="fs-14 fw-bold mb-3">Additional Rules</h6>
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="gratuity_applicable"
                          checked={formData.gratuity_applicable}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label fw-600">Apply Gratuity Provisions</label>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="tds_on_salary_applicable"
                          checked={formData.tds_on_salary_applicable}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label fw-600">Enable TDS on Salary</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-3 mb-4 pt-3 border-top">
                <button type="submit" className="btn btn-primary px-5 rounded-pill shadow-sm py-2" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : 'Save Payroll Settings'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollSettings;
