import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BudgetEntryLines from "../components/BudgetEntryLines";
import budgetService from "../services/budgetService";
import ledgerService from "../services/ledgerService";

const EditBudget = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    period_type: "",
    from_date: "",
    to_date: "",
    notes: "",
  });

  const [budgetLines, setBudgetLines] = useState([
    { id: Date.now(), ledger_id: "", period_label: "", amount: "" },
  ]);

  const [ledgers, setLedgers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load budget data and ledgers
  useEffect(() => {
    const loadData = async () => {
      try {
        setFetching(true);
        const [budgetResp, ledgersResp] = await Promise.all([
          budgetService.getBudget(id),
          ledgerService.getLedgers({ limit: 1000 }),
        ]);

        if (budgetResp?.data) {
          const budget = budgetResp.data;
          setFormData({
            name: budget.name || "",
            period_type: budget.period_type || "",
            from_date: budget.from_date ? budget.from_date.split("T")[0] : "",
            to_date: budget.to_date ? budget.to_date.split("T")[0] : "",
            notes: budget.notes || "",
          });

          if (budget.items && budget.items.length > 0) {
            setBudgetLines(
              budget.items.map((item) => ({
                ...item,
                id: item.id || Date.now() + Math.random(),
                ledger_id: item.ledger_id?.toString(),
              })),
            );
          }
        }

        setLedgers(ledgersResp?.data || []);
      } catch (error) {
        console.error("Error loading budget:", error);
        toast.error("Failed to load budget details");
        navigate("/accounting/budgets");
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Budget name is required";
    if (!formData.period_type)
      newErrors.period_type = "Period type is required";
    if (!formData.from_date) newErrors.from_date = "From date is required";
    if (!formData.to_date) newErrors.to_date = "To date is required";

    if (formData.from_date && formData.to_date) {
      const fromDate = new Date(formData.from_date);
      const toDate = new Date(formData.to_date);
      if (fromDate >= toDate) {
        newErrors.to_date = "To date must be after from date";
      }
    }

    // Validate budget lines
    budgetLines.forEach((line, index) => {
      if (!line.ledger_id) newErrors[`ledger_${index}`] = "Ledger is required";
      if (!line.period_label.trim())
        newErrors[`period_${index}`] = "Period label is required";
      if (!line.amount || parseFloat(line.amount) <= 0)
        newErrors[`amount_${index}`] = "Valid amount is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors and try again");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        period_type: formData.period_type,
        from_date: formData.from_date,
        to_date: formData.to_date,
        notes: formData.notes.trim(),
        items: budgetLines.map((line) => ({
          ledger_id: parseInt(line.ledger_id),
          period_label: line.period_label.trim(),
          amount: parseFloat(line.amount),
        })),
      };

      await budgetService.updateBudget(id, payload);
      toast.success("Budget updated successfully");
      navigate("/accounting/budgets");
    } catch (error) {
      console.error("Error updating budget:", error);
      toast.error(error.response?.data?.message || "Failed to update budget");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="content">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading budget...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header">
        <div className="add-item d-flex">
          <div className="page-title">
            <h4>Edit Budget</h4>
            <h6>Modify budget parameters and allocations</h6>
          </div>
        </div>
        <div className="page-btn">
          <Link to="/accounting/budgets" className="btn btn-cancel me-2">
            Cancel
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-medium text-dark">
                  Budget Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. FY 2025-26 Annual Budget"
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium text-dark">
                  Period Type <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-control ${errors.period_type ? "is-invalid" : ""}`}
                  name="period_type"
                  value={formData.period_type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Period Type</option>
                  <option value="ANNUAL">Annual</option>
                  <option value="QUARTERLY">Quarterly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
                {errors.period_type && (
                  <div className="invalid-feedback">{errors.period_type}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium text-dark">
                  From Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control ${errors.from_date ? "is-invalid" : ""}`}
                  name="from_date"
                  value={formData.from_date}
                  onChange={handleInputChange}
                />
                {errors.from_date && (
                  <div className="invalid-feedback">{errors.from_date}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium text-dark">
                  To Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control ${errors.to_date ? "is-invalid" : ""}`}
                  name="to_date"
                  value={formData.to_date}
                  onChange={handleInputChange}
                />
                {errors.to_date && (
                  <div className="invalid-feedback">{errors.to_date}</div>
                )}
              </div>

              <div className="col-md-12">
                <label className="form-label fw-medium text-dark">Notes</label>
                <textarea
                  className="form-control"
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes about this budget..."
                />
              </div>
            </div>

            <BudgetEntryLines
              entries={budgetLines}
              setEntries={setBudgetLines}
              ledgers={ledgers}
              periodType={formData.period_type}
              fromDate={formData.from_date}
              toDate={formData.to_date}
            />

            <div className="d-flex justify-content-end gap-3 mt-4">
              <Link to="/accounting/budgets" className="btn btn-cancel">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Budget"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBudget;
