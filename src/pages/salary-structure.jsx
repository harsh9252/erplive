import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  getSalaryStructure,
  saveSalaryStructure,
} from "../services/salaryStructureService";
import { getEmployees } from "../services/employeeService";
import SearchableSelect from "../components/SearchableSelect";

const SalaryStructure = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [formData, setFormData] = useState({
    basic: 0,
    hra: 0,
    da: 0,
    special_allowance: 0,
    other_allowances: 0,
    medical_allowance: 0,
    travel_allowance: 0,
    effective_from: new Date().toISOString().split("T")[0],
  });

  const [calculations, setCalculations] = useState({
    gross: 0,
    pf_employee: 0,
    pf_employer: 0,
    esi_employee: 0,
    esi_employer: 0,
    pt: 0,
    net_salary: 0,
  });

  // Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees({ status: "ACTIVE" });
        const resData = response.data || response;
        const list = Array.isArray(resData)
          ? resData
          : resData.items || resData.rows || [];
        const mapped = list.map((emp) => ({
          value: emp.id || emp._id,
          label: `${emp.name} (${emp.employee_code})`,
          basic_salary: emp.basic_salary || 0
        }));
        setEmployees(mapped);
        if (mapped.length > 0) setSelectedEmployee(mapped[0].value);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch Existing Structure
  useEffect(() => {
    const fetchStructure = async () => {
      if (!selectedEmployee) return;
      setLoading(true);
      try {
        const response = await getSalaryStructure(selectedEmployee);
        const data = response.data || response;
        if (data && Object.keys(data).length > 0) {
          setFormData({
            basic: data.basic || 0,
            hra: data.hra || 0,
            da: data.da || 0,
            special_allowance: data.special_allowance || 0,
            other_allowances:
              data.other_allowances || data.other_allowance || 0,
            medical_allowance: data.medical_allowance || 0,
            travel_allowance:
              data.travel_allowance || data.transport_allowance || 0,
            effective_from: data.effective_from
              ? data.effective_from.split("T")[0]
              : new Date().toISOString().split("T")[0],
          });
          if (data.pf_employee) {
            setCalculations((prev) => ({
              ...prev,
              pf_employee: data.pf_employee,
              pf_employer: data.pf_employer || data.pf_employee,
              professional_tax: data.professional_tax || prev.pt,
            }));
          }
        } else {
          // Reset to defaults if no structure found, but use employee's profile basic salary as default
          const employeeProfile = employees.find(e => e.value === selectedEmployee);
          setFormData({
            basic: employeeProfile?.basic_salary || 0,
            hra: 0,
            da: 0,
            special_allowance: 0,
            other_allowances: 0,
            medical_allowance: 0,
            travel_allowance: 0,
            effective_from: new Date().toISOString().split("T")[0],
          });
        }
      } catch (error) {
        console.error("Error fetching salary structure:", error);
        // Reset on error
        // Reset on error, but try to keep employee's profile basic salary
        const employeeProfile = employees.find(e => e.value === selectedEmployee);
        setFormData({
          basic: employeeProfile?.basic_salary || 0,
          hra: 0,
          da: 0,
          special_allowance: 0,
          other_allowances: 0,
          medical_allowance: 0,
          travel_allowance: 0,
          effective_from: new Date().toISOString().split("T")[0],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStructure();
  }, [selectedEmployee]);

  // Calculation Logic
  useEffect(() => {
    const {
      basic,
      hra,
      da,
      special_allowance,
      other_allowances,
      medical_allowance,
      travel_allowance,
    } = formData;

    const b = parseFloat(basic) || 0;
    const h = parseFloat(hra) || 0;
    const d = parseFloat(da) || 0;
    const sa = parseFloat(special_allowance) || 0;
    const oa = parseFloat(other_allowances) || 0;
    const ma = parseFloat(medical_allowance) || 0;
    const ta = parseFloat(travel_allowance) || 0;

    const gross = b + h + d + sa + oa + ma + ta;

    // PF Calculation: 12% of basic, capped at 1800 if gross > 15000
    let pf = b * 0.12;
    if (gross > 15000) {
      pf = Math.min(1800, pf);
    }
    // Round to nearest whole number
    pf = Math.round(pf);

    // ESI Calculation: 0.75% of gross if gross <= 21000
    let esi_emp = 0;
    let esi_empr = 0;
    if (gross <= 21000) {
      esi_emp = Math.ceil(gross * 0.0075);
      esi_empr = Math.ceil(gross * 0.0325);
    }

    // Professional Tax (PT)
    let pt = 0;
    if (gross > 15000) pt = 200;
    else if (gross > 10000) pt = 150;
    else if (gross > 7500) pt = 75;

    const net = gross - pf - esi_emp - pt;

    setCalculations({
      gross,
      pf_employee: pf,
      pf_employer: pf,
      esi_employee: esi_emp,
      esi_employer: esi_empr,
      pt: pt,
      net_salary: net,
    });
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedEmployee) newErrors.employee = 'Please select an employee.';
    if (!formData.effective_from) newErrors.effective_from = 'Effective date is required.';
    if (!formData.basic || Number(formData.basic) <= 0) newErrors.basic = 'Valid basic salary is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const dataToSave = {
        employee_id: parseInt(selectedEmployee, 10),
        effective_from: formData.effective_from,
        basic: parseFloat(formData.basic) || 0,
        hra: parseFloat(formData.hra) || 0,
        da: parseFloat(formData.da) || 0,
        special_allowance: parseFloat(formData.special_allowance) || 0,
        other_allowances: parseFloat(formData.other_allowances) || 0,
        medical_allowance: parseFloat(formData.medical_allowance) || 0,
        travel_allowance: parseFloat(formData.travel_allowance) || 0,
        pf_employee: calculations.pf_employee,
        pf_employer: calculations.pf_employer,
        professional_tax: calculations.pt,
      };

      console.log("Saving Salary Structure:", dataToSave);

      await saveSalaryStructure(dataToSave);
      toast.success("Salary structure updated successfully");
    } catch (error) {
      console.error("Save failed:", error);
      const msg =
        error.response?.data?.message || "Failed to update salary structure";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Salary Structure</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item">Payroll & HR</li>
              <li className="breadcrumb-item active">Structure</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row g-4">
        {/* Employee Selection */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3">
              <h6 className="fw-bold mb-0">Select Employee</h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">
                  Employee Search
                </label>
                <div className={errors.employee ? 'is-invalid' : ''}>
                  <SearchableSelect
                    options={employees}
                    value={selectedEmployee}
                    onChange={(val) => { setSelectedEmployee(val); if (errors.employee) setErrors(prev => ({ ...prev, employee: null })); }}
                    placeholder="Search Employee..."
                  />
                </div>
                {errors.employee && <div className="invalid-feedback d-block">{errors.employee}</div>}
              </div>

              <div className="mt-4 pt-4 border-top">
                <h6 className="fw-bold mb-3 small text-uppercase text-primary">
                  Calculation Summary
                </h6>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">Gross Earnings</span>
                    <span className="fw-bold text-dark">
                      ₹{calculations.gross.toLocaleString()}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-danger">
                    <span className="small">Total Deductions</span>
                    <span className="fw-bold">
                      ₹
                      {(
                        calculations.pf_employee +
                        calculations.esi_employee +
                        calculations.pt
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded mt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-primary fw-bold small">
                        Net Payable
                      </span>
                      <span className="text-primary h5 fw-bold mb-0">
                        ₹{calculations.net_salary.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-light rounded small">
                <p className="mb-0 text-muted italic">
                  Note: Deductions are auto-calculated based on statutory rules.
                  Net Monthly Salary = Total Earnings - Statutory Deductions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Structure Form */}
        <div className="col-md-8">
          <form onSubmit={handleSave} noValidate className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h6 className="fw-bold mb-0">Earnings Configuration</h6>
              <button
                type="submit"
                className="btn btn-primary btn-sm px-4 shadow-none"
                disabled={loading || !selectedEmployee}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : (
                  <i className="isax isax-save-2 me-2 fs-16"></i>
                )}
                Save Structure
              </button>
            </div>
            <div className="card-body p-4">
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    Effective From *
                  </label>
                  <input
                    type="date"
                    name="effective_from"
                    className={`form-control shadow-none ${errors.effective_from ? 'is-invalid' : ''}`}
                    value={formData.effective_from || ""}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  {errors.effective_from && <div className="invalid-feedback">{errors.effective_from}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    Basic Salary *
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="basic"
                      className={`form-control shadow-none border-start-0 ${errors.basic ? 'is-invalid' : ''}`}
                      value={formData.basic || 0}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                    {errors.basic && <div className="invalid-feedback">{errors.basic}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    HRA (House Rent Allowance)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="hra"
                      className="form-control shadow-none border-start-0"
                      value={formData.hra || 0}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    DA (Dearness Allowance)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="da"
                      className="form-control shadow-none border-start-0"
                      value={formData.da || 0}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    Special Allowance
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="special_allowance"
                      className="form-control shadow-none border-start-0"
                      value={formData.special_allowance || 0}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    Other Allowances
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="other_allowances"
                      className="form-control shadow-none border-start-0"
                      value={formData.other_allowances || 0}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    Medical Allowance
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="medical_allowance"
                      className="form-control shadow-none border-start-0"
                      value={formData.medical_allowance || 0}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    Travel Allowance
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="travel_allowance"
                      className="form-control shadow-none border-start-0"
                      value={formData.travel_allowance || 0}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-top">
                <h6 className="fw-bold mb-4 small text-uppercase text-danger d-flex align-items-center">
                  <i className="isax isax-minus-cirlce me-2 fs-18"></i>
                  Statutory Deductions (Calculated)
                </h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded border border-dashed">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="small text-muted">
                          Provident Fund (PF)
                        </span>
                        <span className="fw-bold">
                          ₹{calculations.pf_employee}
                        </span>
                      </div>
                      <div className="progress" style={{ height: "4px" }}>
                        <div
                          className="progress-bar bg-danger"
                          style={{
                            width:
                              calculations.gross > 0
                                ? (calculations.pf_employee /
                                    calculations.gross) *
                                    100 +
                                  "%"
                                : "0%",
                          }}
                        ></div>
                      </div>
                      <p className="mb-0 mt-2 fs-11 text-muted italic">
                        12% match on Basic (Capped at ₹1,800)
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded border border-dashed">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="small text-muted">ESI (Employee)</span>
                        <span className="fw-bold">
                          ₹{calculations.esi_employee}
                        </span>
                      </div>
                      <div className="progress" style={{ height: "4px" }}>
                        <div
                          className="progress-bar bg-danger"
                          style={{
                            width:
                              calculations.gross > 0
                                ? (calculations.esi_employee /
                                    calculations.gross) *
                                    100 +
                                  "%"
                                : "0%",
                          }}
                        ></div>
                      </div>
                      <p className="mb-0 mt-2 fs-11 text-muted italic">
                        0.75% of Gross (Applicable if Gross ≤ ₹21k)
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded border border-dashed">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="small text-muted">
                          Professional Tax (PT)
                        </span>
                        <span className="fw-bold">₹{calculations.pt}</span>
                      </div>
                      <div className="progress" style={{ height: "4px" }}>
                        <div
                          className="progress-bar bg-danger"
                          style={{
                            width:
                              calculations.gross > 0
                                ? (calculations.pt / calculations.gross) * 100 +
                                  "%"
                                : "0%",
                          }}
                        ></div>
                      </div>
                      <p className="mb-0 mt-2 fs-11 text-muted italic">
                        Tiered based on monthly salary threshold
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SalaryStructure;
