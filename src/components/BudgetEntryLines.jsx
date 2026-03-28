import { useState, useMemo } from "react";
import SearchableSelect from "./SearchableSelect";

const BudgetEntryLines = ({
  entries,
  setEntries,
  ledgers,
  periodType,
  fromDate,
  toDate,
}) => {
  const [nextId, setNextId] = useState(Date.now() + Math.random());

  const ledgerOptions = useMemo(
    () => ledgers.map((l) => ({ value: l.id, label: l.name })),
    [ledgers],
  );

  const handleEntryChange = (id, field, value) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    );
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

    if (periodType === "ANNUAL") {
      const year = start.getFullYear();
      labels.push(`FY${year}-${year + 1}`);
    } else if (periodType === "QUARTERLY") {
      const quarters = ["Q1", "Q2", "Q3", "Q4"];
      let current = new Date(start);
      while (current <= end) {
        const year = current.getFullYear();
        const quarter = Math.floor(current.getMonth() / 3) + 1;
        labels.push(`${quarters[quarter - 1]} ${year}`);
        current.setMonth(current.getMonth() + 3);
      }
    } else if (periodType === "MONTHLY") {
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
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <SearchableSelect
                      options={ledgerOptions}
                      value={entry.ledger_id}
                      onChange={(val) =>
                        handleEntryChange(entry.id, "ledger_id", val)
                      }
                      placeholder="Search Ledger Name..."
                    />
                  </td>
                  <td>
                    {periodType === "ANNUAL" ? (
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="e.g. FY2025-26"
                        value={entry.period_label}
                        onChange={(e) =>
                          handleEntryChange(
                            entry.id,
                            "period_label",
                            e.target.value,
                          )
                        }
                      />
                    ) : (
                      <select
                        className="form-select form-select-sm"
                        value={entry.period_label}
                        onChange={(e) =>
                          handleEntryChange(
                            entry.id,
                            "period_label",
                            e.target.value,
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
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm text-end fw-600"
                      placeholder="0.00"
                      value={entry.amount}
                      onChange={(e) =>
                        handleEntryChange(entry.id, "amount", e.target.value)
                      }
                      step="0.01"
                      min="0"
                    />
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
