import { useState, useMemo } from "react";
import SearchableSelect from "./SearchableSelect";

const BudgetEntryLines = ({
  entries,
  setEntries,
  ledgers,
  periodType,
  fromDate,
  toDate,
  errors = {},
  setErrors
}) => {
  const [nextId, setNextId] = useState(Date.now() + Math.random());

  const ledgerOptions = useMemo(
    () => ledgers.map((l) => ({ value: l.id, label: l.name })),
    [ledgers],
  );

  const handleEntryChange = (id, field, value, index) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    );
    if (setErrors && index !== undefined) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (field === "ledger_id") delete newErrors[`ledger_${index}`];
        if (field === "period_label") delete newErrors[`period_${index}`];
        if (field === "amount") delete newErrors[`amount_${index}`];
        return newErrors;
      });
    }
  };

  const handleAddEntry = () => {
    const newEntry = {
      id: Date.now() + Math.random(),
      ledger_id: "",
      period_label: "",
      amount: "",
    };
    setEntries((prev) => [...prev, newEntry]);
    setNextId(Date.now() + Math.random());
  };

  const handleRemoveEntry = (id) => {
    if (entries.length > 1) {
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  const generatePeriodLabels = () => {
    if (!fromDate || !toDate || !periodType) return [];

    const start = new Date(fromDate);
    const end = new Date(toDate);
    const labels = [];

    if (periodType?.toLowerCase() === "yearly" || periodType?.toLowerCase() === "annual") {
      const year = start.getFullYear();
      labels.push(`FY${year}-${year + 1}`);
    } else if (periodType?.toLowerCase() === "quarterly") {
      const quarters = ["Q1", "Q2", "Q3", "Q4"];
      let current = new Date(start);
      while (current <= end) {
        const year = current.getFullYear();
        const quarter = Math.floor(current.getMonth() / 3) + 1;
        labels.push(`${quarters[quarter - 1]} ${year}`);
        current.setMonth(current.getMonth() + 3);
      }
    } else if (periodType?.toLowerCase() === "monthly") {
      let current = new Date(start);
      while (current <= end) {
        const month = current.toLocaleString("default", { month: "short" });
        const year = current.getFullYear();
        labels.push(`${month}-${year}`);
        current.setMonth(current.getMonth() + 1);
      }
    }

    return labels;
  };

  const periodLabels = generatePeriodLabels();

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-transparent border-bottom d-flex align-items-center justify-content-between">
        <h5 className="card-title mb-0">Budget Lines</h5>
        <button
          type="button"
          className="btn btn-sm btn-soft-primary"
          onClick={handleAddEntry}
        >
          <i className="isax isax-plus me-1"></i>Add Budget Line
        </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-compact mb-0">
            <thead className="table-light fs-13">
              <tr>
                <th style={{ minWidth: "250px" }}>
                  Ledger Account <span className="text-danger">*</span>
                </th>
                <th style={{ minWidth: "150px" }}>
                  Period Label <span className="text-danger">*</span>
                </th>
                <th
                  className="text-end"
                  style={{ minWidth: "130px", width: "130px" }}
                >
                  Budgeted Amount <span className="text-danger">*</span>
                </th>
                <th className="text-center" style={{ width: "50px" }}></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry.id}>
                  <td>
                    <SearchableSelect
                      options={ledgerOptions}
                      value={entry.ledger_id}
                      onChange={(val) =>
                        handleEntryChange(entry.id, "ledger_id", val, index)
                      }
                      placeholder="Search Ledger Name..."
                      className={errors[`ledger_${index}`] ? "is-invalid border border-danger rounded" : ""}
                    />
                    {errors[`ledger_${index}`] && <div className="text-danger small mt-1">{errors[`ledger_${index}`]}</div>}
                  </td>
                  <td>
                    {periodType?.toLowerCase() === "yearly" || periodType?.toLowerCase() === "annual" ? (
                      <div>
                        <input
                          type="text"
                          className={`form-control form-control-sm ${errors[`period_${index}`] ? "is-invalid" : ""}`}
                          placeholder="e.g. FY2025-26"
                          value={entry.period_label}
                          onChange={(e) =>
                            handleEntryChange(
                              entry.id,
                              "period_label",
                              e.target.value,
                              index
                            )
                          }
                        />
                        {errors[`period_${index}`] && <div className="invalid-feedback">{errors[`period_${index}`]}</div>}
                      </div>
                    ) : (
                      <div>
                        <select
                          className={`form-select form-select-sm ${errors[`period_${index}`] ? "is-invalid" : ""}`}
                          value={entry.period_label}
                          onChange={(e) =>
                            handleEntryChange(
                              entry.id,
                              "period_label",
                              e.target.value,
                              index
                            )
                          }
                        >
                          <option value="">Select Period</option>
                          {periodLabels.map((label) => (
                            <option key={label} value={label}>
                              {label}
                            </option>
                          ))}
                        </select>
                        {errors[`period_${index}`] && <div className="invalid-feedback">{errors[`period_${index}`]}</div>}
                      </div>
                    )}
                  </td>
                  <td>
                    <div>
                      <input
                        type="number"
                        className={`form-control form-control-sm text-end fw-600 ${errors[`amount_${index}`] ? "is-invalid" : ""}`}
                        placeholder="0.00"
                        value={entry.amount}
                        onChange={(e) =>
                          handleEntryChange(entry.id, "amount", e.target.value, index)
                        }
                        step="0.01"
                        min="0"
                      />
                      {errors[`amount_${index}`] && <div className="invalid-feedback">{errors[`amount_${index}`]}</div>}
                    </div>
                  </td>
                  <td className="text-center">
                    {entries.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveEntry(entry.id)}
                      >
                        <i className="isax isax-minus"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetEntryLines;
