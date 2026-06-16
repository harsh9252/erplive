import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  getPayslips,
  generatePayslip,
  approvePayslip,
  markPaidPayslip,
} from "../services/payslipService";
import { getEmployees } from "../services/employeeService";
import SearchableSelect from "../components/SearchableSelect";

const Payslips = () => {
  const [loading, setLoading] = useState(false);
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    month: new Date().toISOString().slice(0, 7), // YYYY-MM
    status: "",
    employee_id: "",
    page: 1,
    limit: 20
  });
  const [totalItems, setTotalItems] = useState(0);

  const [showGenModal, setShowGenModal] = useState(false);
  const [genData, setGenData] = useState({
    employee_id: "",
    salary_month: new Date().toISOString().slice(0, 7),
  });
  const [genErrors, setGenErrors] = useState({});

  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Initial Fetch: Employees
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
        }));
        setEmployees(mapped);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const fetchPayslips = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getPayslips(filters);
      console.log("Payslip API Response:", response);
      let data = response?.data;
      console.log("Payslip data:", data);
      // Handle nested items array in pagination response
      if (data?.items) {
        data = data.items;
      } else if (!Array.isArray(data)) {
        data = [];
      }
      console.log("Payslips to render:", data);
      setPayslips(Array.isArray(data) ? data : []);
      setTotalItems(response.pagination?.total || response.total || response.data?.total || (Array.isArray(data) ? data.length : 0));
    } catch (error) {
      console.error("Error fetching payslips:", error);
      toast.error("Failed to load payslips");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!genData.employee_id) newErrors.employee_id = 'Please select an employee.';
    if (!genData.salary_month) newErrors.salary_month = 'Please select a salary month.';
    if (Object.keys(newErrors).length > 0) {
      setGenErrors(newErrors);
      return;
    }
    setGenErrors({});
    setLoading(true);
    try {
      const dataToSave = {
        employee_id: parseInt(genData.employee_id),
        salary_month: genData.salary_month,
      };

      console.log("Generating Payslip:", dataToSave);

      await generatePayslip(dataToSave);
      toast.success("Payslip generated successfully");
      setShowGenModal(false);
      fetchPayslips();
    } catch (error) {
      console.error("Generation failed:", error);
      const msg = error.response?.data?.message || "Failed to generate payslip";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkGenerate = async () => {
    const { month } = filters;
    const { isConfirmed } = await Swal.fire({
      title: "Bulk Generate Payslips",
      text: `Generate payslips for ALL active employees for ${month}? This will skip employees who already have a payslip for this month.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Generate All",
      confirmButtonColor: "#0f6cbf",
    });

    if (!isConfirmed) return;

    setLoading(true);
    try {
      // 1. Get all active employees if not already loaded
      let activeEmployees = employees.filter(e => e.value !== "");
      if (activeEmployees.length === 0) {
        const response = await getEmployees({ status: "ACTIVE" });
        const list = response.data || response;
        activeEmployees = Array.isArray(list) ? list : (list.items || list.rows || []);
      }

      toast.info(`Starting generation for ${activeEmployees.length} employees...`);

      let successCount = 0;
      let failCount = 0;

      for (const emp of activeEmployees) {
        try {
          const empId = emp.value || emp.id || emp._id;
          await generatePayslip({
            employee_id: parseInt(empId),
            salary_month: month,
          });
          successCount++;
        } catch (err) {
          console.error(`Failed for emp ${emp.label || emp.name}:`, err);
          failCount++;
        }
      }

      Swal.fire({
        title: "Bulk Generation Complete",
        text: `Generated: ${successCount}, Failed: ${failCount}`,
        icon: successCount > 0 ? "success" : "error",
      });
      fetchPayslips();
    } catch (error) {
      console.error("Bulk generation error:", error);
      toast.error("An error occurred during bulk generation");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Approve Payslip",
      text: "Are you sure you want to approve this payslip?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0f6cbf",
      cancelButtonColor: "#6c757d",
    });
    if (!isConfirmed) return;
    try {
      await approvePayslip(id);
      toast.success("Payslip approved");
      fetchPayslips();
    } catch (error) {
      toast.error("Approval failed");
    }
  };

  const handleMarkPaid = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Mark as Paid",
      text: "Mark this payslip as PAID?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Mark Paid",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0f6cbf",
      cancelButtonColor: "#6c757d",
    });
    if (!isConfirmed) return;
    try {
      await markPaidPayslip(id);
      toast.success("Payslip marked as paid");
      fetchPayslips();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const openPrintModal = (payslip) => {
    setSelectedPayslip(payslip);
    setShowPrintModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "DRAFT":
        return (
          <span className="badge bg-soft-secondary text-secondary">DRAFT</span>
        );
      case "APPROVED":
        return (
          <span className="badge bg-soft-primary text-primary">APPROVED</span>
        );
      case "PAID":
        return <span className="badge bg-soft-success text-success">PAID</span>;
      default:
        return <span className="badge bg-soft-light text-dark">{status}</span>;
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Monthly Payslips</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item">Payroll & HR</li>
              <li className="breadcrumb-item active">Payslips</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary shadow-none"
            onClick={handleBulkGenerate}
            disabled={loading}
          >
            <i className="isax isax-flash me-2 fs-18"></i>
            Bulk Generate ({filters.month})
          </button>
          <button
            className="btn btn-primary shadow-none"
            onClick={() => setShowGenModal(true)}
          >
            <i className="isax isax-add-circle me-2 fs-18"></i>
            Generate Single
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">
                Filter Month
              </label>
              <input
                type="month"
                className="form-control form-control-sm shadow-none"
                value={filters.month}
                onChange={(e) => handleFilterChange("month", e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">
                Employee
              </label>
              <SearchableSelect
                options={[{ value: "", label: "All Employees" }, ...employees]}
                value={filters.employee_id}
                onChange={(val) => handleFilterChange("employee_id", val)}
                placeholder="All Employees"
                className="form-control-sm"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">
                Status
              </label>
              <select
                className="form-select form-select-sm shadow-none"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All Status</option>
                <option value="DRAFT">DRAFT</option>
                <option value="APPROVED">APPROVED</option>
                <option value="PAID">PAID</option>
              </select>
            </div>
            <div className="col-md-3 text-end">
              <button
                className="btn btn-light btn-sm px-3 me-2"
                onClick={() =>
                  setFilters({
                    month: new Date().toISOString().slice(0, 7),
                    status: "",
                    employee_id: "",
                    page: 1,
                    limit: 20
                  })
                }
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payslip Table */}
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light fs-12 text-uppercase text-muted">
              <tr>
                <th className="ps-4">Employee</th>
                <th className="text-center">Month</th>
                <th className="text-end">Gross</th>
                <th className="text-end">Deductions</th>
                <th className="text-end">Net Pay</th>
                <th className="text-center">Status</th>
                <th className="text-center pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && payslips.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="spinner-border text-primary"></div>
                  </td>
                </tr>
              ) : payslips.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    No payslips found for selected filters.
                  </td>
                </tr>
              ) : (
                payslips.map((p) => (
                  <tr key={p.id}>
                    <td className="ps-4">
                      <div className="fw-bold text-dark">
                        {p.employee_name || p.employee?.name}
                      </div>
                      <div className="fs-11 text-muted">
                        {p.employee_code || p.employee?.employee_code}
                      </div>
                    </td>
                    <td className="text-center">{p.salary_month}</td>
                    <td className="text-end fw-bold">
                      ₹
                      {(
                        p.gross_salary ||
                        p.gross_earnings ||
                        0
                      ).toLocaleString()}
                    </td>
                    <td className="text-end text-danger">
                      ₹{p.total_deductions?.toLocaleString()}
                    </td>
                    <td className="text-end text-primary fw-bold">
                      ₹{p.net_pay?.toLocaleString()}
                    </td>
                    <td className="text-center">{getStatusBadge(p.status)}</td>
                    <td className="text-center pe-4">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-soft-info border-0"
                          onClick={() => openPrintModal(p)}
                          title="View / Print Payslip"
                        >
                          <i className="isax isax-printer fs-16"></i>
                        </button>
                        {p.status === "DRAFT" && (
                          <button
                            className="btn btn-sm btn-soft-primary border-0"
                            onClick={() => handleApprove(p.id)}
                            title="Approve Payslip"
                          >
                            <i className="isax isax-tick-circle fs-16"></i>
                          </button>
                        )}
                        {p.status === "APPROVED" && (
                          <button
                            className="btn btn-sm btn-soft-success border-0"
                            onClick={() => handleMarkPaid(p.id)}
                            title="Mark as Paid"
                          >
                            <i className="isax isax-money-tick fs-16"></i>
                          </button>
                        )}
                      </div>
                    </td>
                    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {totalItems > filters.limit && (
        <div className="card-footer bg-white border-top py-3 d-flex justify-content-between align-items-center">
          <div className="fs-13 text-muted">
            Showing {(filters.page - 1) * filters.limit + 1} to {Math.min(filters.page * filters.limit, totalItems)} of {totalItems}
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${filters.page === 1 ? 'disabled' : ''}`}>
                <button className="page-link shadow-none" onClick={() => setFilters(p => ({ ...p, page: p.page - 1 }))} disabled={filters.page === 1}>Previous</button>
              </li>
              <li className="page-item active"><span className="page-link">{filters.page}</span></li>
              <li className={`page-item ${payslips.length < filters.limit ? 'disabled' : ''}`}>
                <button className="page-link shadow-none" onClick={() => setFilters(p => ({ ...p, page: p.page + 1 }))} disabled={payslips.length < filters.limit}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}


      {/* Generate Modal */}
      {showGenModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
              <div className="modal-header border-0 bg-light p-4">
                <h5 className="modal-title fw-bold">
                  Generate Employee Payslip
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowGenModal(false)}
                ></button>
              </div>
              <form onSubmit={handleGenerate} noValidate>
                <div className="modal-body p-4">
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-muted">
                      Employee *
                    </label>
                  <div className={genErrors.employee_id ? 'is-invalid' : ''}>
                    <SearchableSelect
                      options={employees}
                      value={genData.employee_id}
                      onChange={(val) => {
                        setGenData((prev) => ({ ...prev, employee_id: val }));
                        if (genErrors.employee_id) setGenErrors(prev => ({ ...prev, employee_id: null }));
                      }}
                      placeholder="Select Employee..."
                    />
                  </div>
                  {genErrors.employee_id && <div className="invalid-feedback d-block">{genErrors.employee_id}</div>}
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-bold text-muted">
                      Salary Month *
                    </label>
                    <input
                      type="month"
                      className={`form-control shadow-none ${genErrors.salary_month ? 'is-invalid' : ''}`}
                      value={genData.salary_month}
                      onChange={(e) => {
                        setGenData((prev) => ({ ...prev, salary_month: e.target.value }));
                        if (genErrors.salary_month) setGenErrors(prev => ({ ...prev, salary_month: null }));
                      }}
                    />
                    {genErrors.salary_month && <div className="invalid-feedback">{genErrors.salary_month}</div>}
                  </div>
                  <p className="small text-muted italic mt-3 mb-0">
                    Note: Backend will automatically calculate earnings and
                    deductions based on the employee's Salary Structure and
                    Attendance records for the selected month.
                  </p>
                </div>
                <div className="modal-footer border-0 p-4 pt-0">
                  <button
                    type="button"
                    className="btn btn-light px-4"
                    onClick={() => setShowGenModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (
                      <i className="isax isax-flash me-2 fs-16"></i>
                    )}
                    Generate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Print Modal */}
      {showPrintModal && selectedPayslip && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0">
              <div className="modal-header border-0 bg-dark text-white p-3">
                <h6 className="modal-title">
                  Payslip View - {selectedPayslip.salary_month}
                </h6>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => window.print()}
                  >
                    <i className="isax isax-printer me-2 fs-14"></i>
                    Print
                  </button>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowPrintModal(false)}
                  ></button>
                </div>
              </div>
              <div
                className="modal-body p-5 bg-white shadow"
                id="printablePayslip"
              >
                {/* Payslip Content (High Fidelity) */}
                <div className="text-center mb-5 pb-4 border-bottom">
                  <h2 className="fw-bold mb-1 text-uppercase tracking-tight">
                    Enterprise ERP Suite
                  </h2>
                  <p className="text-muted small mb-0">
                    Industrial Area, Phase 1, New Delhi - 110020
                  </p>
                  <h5 className="mt-4 mb-0 fw-bold border d-inline-block px-4 py-2 bg-light">
                    PAYSLIP FOR {selectedPayslip.salary_month}
                  </h5>
                </div>

                <div className="row mb-5 g-4 fs-13">
                  <div className="col-6">
                    <table className="table table-sm table-borderless">
                      <tbody>
                        <tr>
                          <td className="text-muted py-1">Employee Name:</td>
                          <td className="fw-bold py-1 text-uppercase">
                            {selectedPayslip.employee_name ||
                              selectedPayslip.employee?.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted py-1">Employee ID:</td>
                          <td className="fw-bold py-1">
                            {selectedPayslip.employee_code ||
                              selectedPayslip.employee?.employee_code}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted py-1">Designation:</td>
                          <td className="fw-bold py-1">Senior Associate</td>
                        </tr>
                        <tr>
                          <td className="text-muted py-1">Department:</td>
                          <td className="fw-bold py-1">Production</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-6">
                    <table className="table table-sm table-borderless">
                      <tbody>
                        <tr>
                          <td className="text-muted py-1">Bank Name:</td>
                          <td className="fw-bold py-1">HDFC Bank</td>
                        </tr>
                        <tr>
                          <td className="text-muted py-1">A/C No:</td>
                          <td className="fw-bold py-1">**** 4567</td>
                        </tr>
                        <tr>
                          <td className="text-muted py-1">Working Days:</td>
                          <td className="fw-bold py-1">
                            {selectedPayslip.working_days || 0}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted py-1">Present Days:</td>
                          <td className="fw-bold py-1">
                            {selectedPayslip.present_days || 0}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="row g-0 border rounded overflow-hidden mb-5">
                  <div className="col-6 border-end">
                    <div className="bg-light p-2 fw-bold text-center border-bottom text-uppercase fs-12">
                      Earnings
                    </div>
                    <table className="table table-sm table-borderless mb-0 fs-13">
                      <tbody>
                        <tr>
                          <td className="ps-3">Basic Salary</td>
                          <td className="pe-3 text-end">
                            ₹{(selectedPayslip.basic || 0).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-3">House Rent Allowance (HRA)</td>
                          <td className="pe-3 text-end">
                            ₹{(selectedPayslip.hra || 0).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-3">Special Allowance</td>
                          <td className="pe-3 text-end">
                            ₹
                            {(
                              selectedPayslip.special_allowance || 0
                            ).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-3">Other Allowances</td>
                          <td className="pe-3 text-end">
                            ₹
                            {(
                              selectedPayslip.other_earnings || 0
                            ).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-6">
                    <div className="bg-light p-2 fw-bold text-center border-bottom text-uppercase fs-12">
                      Deductions
                    </div>
                    <table className="table table-sm table-borderless mb-0 fs-13">
                      <tbody>
                        <tr>
                          <td className="ps-3">Provident Fund (PF)</td>
                          <td className="pe-3 text-end">
                            ₹
                            {(
                              selectedPayslip.pf_employee ||
                              selectedPayslip.pf ||
                              0
                            ).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-3">ESI (Employee)</td>
                          <td className="pe-3 text-end">
                            ₹
                            {(
                              selectedPayslip.esi_employee ||
                              selectedPayslip.esi ||
                              0
                            ).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-3">Professional Tax (PT)</td>
                          <td className="pe-3 text-end">
                            ₹
                            {(
                              selectedPayslip.professional_tax ||
                              selectedPayslip.pt ||
                              0
                            ).toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-3">LWP / Absence</td>
                          <td className="pe-3 text-end">
                            ₹
                            {(
                              selectedPayslip.advance_deduction || 0
                            ).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row g-0 border rounded overflow-hidden">
                  <div className="col-6 bg-light p-3 border-end">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-uppercase fs-12">
                        Gross Earnings
                      </span>
                      <span className="h5 fw-bold mb-0">
                        ₹
                        {(
                          selectedPayslip.gross_earnings ||
                          selectedPayslip.gross_salary ||
                          0
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="col-6 bg-primary text-white p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-uppercase fs-12">
                        Net Take Home Pay
                      </span>
                      <span className="h4 fw-bold mb-0">
                        ₹{(selectedPayslip.net_pay || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-5 d-flex justify-content-between align-items-end text-center">
                  <div>
                    <div className="border-top px-5 pt-2 fs-12 text-muted">
                      Employee Signature
                    </div>
                  </div>
                  <div>
                    <div className="border-top px-5 pt-2 fs-12 text-muted font-bold text-dark">
                      Authorized Signatory
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
                @media print {
                    body * { visibility: hidden; }
                    #printablePayslip, #printablePayslip * { visibility: visible; }
                    #printablePayslip { 
                        position: absolute; 
                        left: 0; 
                        top: 0; 
                        width: 100%;
                        background: white !important;
                    }
                }
                .bg-soft-primary { background-color: rgba(13, 110, 253, 0.1); }
                .bg-soft-success { background-color: rgba(25, 135, 84, 0.1); }
                .bg-soft-secondary { background-color: rgba(108, 117, 125, 0.1); }
                .btn-xs { padding: 0.25rem 0.5rem; font-size: 0.75rem; }
            `}</style>
    </div>
  );
};

export default Payslips;
