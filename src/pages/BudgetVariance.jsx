import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import budgetService from "../services/budgetService";

const BudgetVariance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [budget, setBudget] = useState(null);
  const [varianceData, setVarianceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVarianceData = async () => {
      try {
        setLoading(true);
        const response = await budgetService.getBudgetVariance(id);
        if (response?.data) {
          setVarianceData(response.data.variance || (Array.isArray(response.data) ? response.data : []));
        }

        // Also get budget details for header
        const budgetResp = await budgetService.getBudget(id);
        if (budgetResp?.data) {
          setBudget(budgetResp.data);
        }
      } catch (error) {
        console.error("Error loading variance data:", error);
        toast.error("Failed to load variance report");
        navigate("/accounting/budgets");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadVarianceData();
    }
  }, [id, navigate]);

  const calculateVariance = (budgeted, actual) => {
    const budgetedNum = parseFloat(budgeted) || 0;
    const actualNum = parseFloat(actual) || 0;
    const variance = actualNum - budgetedNum;
    const variancePercent =
      budgetedNum !== 0 ? (variance / budgetedNum) * 100 : 0;
    return { variance, variancePercent };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount || 0);
  };

  const getVarianceClass = (variancePercent) => {
    if (variancePercent > 10) return "text-danger fw-bold"; // Over budget
    if (variancePercent < -10) return "text-success fw-bold"; // Under budget
    return "text-muted"; // Within tolerance
  };

  if (loading) {
    return (
      <div className="content">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading variance report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="page-header d-print-none">
        <div className="add-item d-flex">
          <div className="page-title">
            <h4>Budget Variance Report</h4>
            <h6>{budget?.name || "Budget"} - Budget vs Actual Comparison</h6>
          </div>
        </div>
        <div className="page-btn">
          <Link to="/accounting/budgets" className="btn btn-cancel me-2">
            Back to Budgets
          </Link>
          <button className="btn btn-primary" onClick={() => window.print()}>
            <i className="isax isax-printer me-2"></i>Print Report
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="card-title mb-0">Variance Analysis</h5>
              <small className="text-muted">
                Period: <span className="text-capitalize">{budget?.period_type}</span> |
                {budget?.from_date &&
                  budget?.to_date &&
                  `${new Date(budget.from_date).toLocaleDateString()} - ${new Date(budget.to_date).toLocaleDateString()}`}
              </small>
            </div>
            <div className="col-md-6 text-end">
              <div className="d-flex gap-3 justify-content-end">
                <div className="text-center">
                  <div className="fw-bold text-success">Under Budget</div>
                  <small className="text-muted">&lt; -10%</small>
                </div>
                <div className="text-center">
                  <div className="fw-bold text-muted">Within Range</div>
                  <small className="text-muted">-10% to 10%</small>
                </div>
                <div className="text-center">
                  <div className="fw-bold text-danger">Over Budget</div>
                  <small className="text-muted">&gt; 10%</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped datanew">
              <thead className="table-dark">
                <tr className="text-white">
                  <th className="text-white">Ledger Account</th>
                  <th className="text-white">Period Label</th>
                  <th className="text-end text-white">Budgeted Amount</th>
                  <th className="text-end text-white">Actual Amount</th>
                  <th className="text-end text-white">Variance</th>
                  <th className="text-end text-white">Variance %</th>
                  <th className="text-center text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {varianceData.length > 0 ? (
                  varianceData.map((item, index) => {
                    const { variance, variancePercent } = calculateVariance(
                      item.budgeted,
                      item.actual,
                    );
                    const varianceClass = getVarianceClass(variancePercent);

                    return (
                      <tr key={index}>
                        <td className="fw-semibold">
                          {item.ledger_name || "Unknown Ledger"}
                        </td>
                        <td>{item.period_label}</td>
                        <td className="text-end fw-medium">
                          {formatCurrency(item.budgeted)}
                        </td>
                        <td className="text-end fw-medium">
                          {formatCurrency(item.actual)}
                        </td>
                        <td
                          className={`text-end ${variance >= 0 ? "text-danger" : "text-success"}`}
                        >
                          {formatCurrency(Math.abs(variance))}
                          {variance >= 0 ? " (Over)" : " (Under)"}
                        </td>
                        <td className={`text-end ${varianceClass}`}>
                          {variancePercent > 0 ? "+" : ""}
                          {variancePercent.toFixed(2)}%
                        </td>
                        <td className="text-center">
                          <span
                            className={`badge ${Math.abs(variancePercent) > 10 ? (variancePercent > 0 ? "bg-danger" : "bg-success") : "bg-warning"}`}
                          >
                            {Math.abs(variancePercent) > 10
                              ? variancePercent > 0
                                ? "Over"
                                : "Under"
                              : "OK"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      No variance data available for this budget.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {varianceData.length > 0 && (
          <div className="card-footer">
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex gap-4">
                  <div>
                    <strong>Total Budgeted:</strong>
                    <div className="fw-bold text-primary">
                      {formatCurrency(
                        varianceData.reduce(
                          (sum, item) =>
                            sum + (parseFloat(item.budgeted) || 0),
                          0,
                        ),
                      )}
                    </div>
                  </div>
                  <div>
                    <strong>Total Actual:</strong>
                    <div className="fw-bold">
                      {formatCurrency(
                        varianceData.reduce(
                          (sum, item) =>
                            sum + (parseFloat(item.actual) || 0),
                          0,
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-end">
                <div>
                  <strong>Overall Variance:</strong>
                  {(() => {
                    const totalBudgeted = varianceData.reduce(
                      (sum, item) =>
                        sum + (parseFloat(item.budgeted) || 0),
                      0,
                    );
                    const totalActual = varianceData.reduce(
                      (sum, item) =>
                        sum + (parseFloat(item.actual) || 0),
                      0,
                    );
                    const overallVariance = totalActual - totalBudgeted;
                    const overallPercent =
                      totalBudgeted !== 0
                        ? (overallVariance / totalBudgeted) * 100
                        : 0;

                    return (
                      <div
                        className={`fw-bold ${overallVariance >= 0 ? "text-danger" : "text-success"}`}
                      >
                        {formatCurrency(Math.abs(overallVariance))} (
                        {overallPercent > 0 ? "+" : ""}
                        {overallPercent.toFixed(2)}%)
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetVariance;
