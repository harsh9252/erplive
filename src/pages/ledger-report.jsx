import React, { useState, useEffect } from "react";
import PageHeader from "../components/common/PageHeader";
import { Link } from "react-router-dom";
import DataTable from "../components/common/DataTable";
import { ledgerService } from "../services/ledgerService";
import * as companyService from "../services/companyService";
import { toast } from "react-toastify";

const LedgerReport = () => {
  const [ledgers, setLedgers] = useState([]);
  const [ledgersGrp, setLedgersGrp] = useState([]);
  const [company, setCompany] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    ledger_group_id: "",
    opening_balance: "",
    balance_type: "DR",
  });
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    opening_balance: true,
    balance_type: true,
    tin: true,
  });

  useEffect(() => {
    const fetchLedgers = async () => {
      try {
        const response = await ledgerService.getLedgers();

        console.log("List of ledgers:", response);
        setLedgers(response.data || response);
      } catch (error) {
        console.error("Error fetching ledgers:", error);
      }
    };

    fetchLedgers();
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
    try {
      const response = await companyService.getCurrentCompany();
 
      console.log("Current company:", response);
      setCompany(response.data || response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  fetchCompany();
  }, []);

  useEffect(() => {
    const fetchLedgers = async () => {
      try {
        const response = await ledgerService.getGroupLedger();
        console.log("List of ledgers Group:", response);
        setLedgersGrp(response.data || response);
      } catch (error) {
        console.error("Error fetching ledgers:", error);
      }
    };

    fetchLedgers();
  }, []);

  // Simple search filter logic
  const filteredData = ledgers.filter((item) => {
    const searchLower = searchText.toLowerCase();

    return (
      !searchText ||
      item.name?.toLowerCase().includes(searchLower) ||
      item.tin?.toLowerCase().includes(searchLower) ||
      item.balance_type?.toLowerCase().includes(searchLower)
    );
  });

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "opening_balance" || name === "ledger_group_id"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Ledger name is required";
    }
    if (!formData.ledger_group_id || formData.ledger_group_id === "") {
      newErrors.ledger_group_id = "Ledger Group ID is required";
    }
    if (formData.ledger_group_id && formData.ledger_group_id <= 0) {
      newErrors.ledger_group_id = "Ledger Group ID must be greater than 0";
    }
    if (!formData.opening_balance && formData.opening_balance !== 0) {
      newErrors.opening_balance = "Opening Balance is required";
    }
    if (formData.opening_balance && formData.opening_balance < 0) {
      newErrors.opening_balance = "Opening Balance cannot be negative";
    }
    if (!formData.balance_type) {
      newErrors.balance_type = "Balance Type is required";
    }

    // If there are errors, display them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(" Please fill all required fields correctly");
      return;
    }

    try {
      const newLedger = {
        name: formData.name,
        ledger_group_id: formData.ledger_group_id,
        opening_balance: formData.opening_balance,
        balance_type: formData.balance_type,
      };

      // Call API to create new ledger
      const response = await ledgerService.createLedger(newLedger);
      console.log("Ledger created:", response);

      // Add to list
      setLedgers([...ledgers, response.data || newLedger]);

      // Reset form and errors
      setFormData({
        name: "",
        ledger_group_id: "",
        opening_balance: "",
        balance_type: "DR",
      });
      setErrors({});
      setShowForm(false);

      toast.success("✓ Ledger created successfully!");
    } catch (error) {
      console.error("Error creating ledger:", error);
      toast.error(
        "✗ Error creating ledger: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  const handleCloseForm = () => {
    setFormData({
      name: "",
      ledger_group_id: "",
      opening_balance: "",
      balance_type: "DR",
    });
    setErrors({});
    setShowForm(false);
  };

  const columns = [
    { id: "name", label: "Bank Name" },
    { id: "opening_balance", label: "Opening Balance" },
    { id: "balance_type", label: "Balance Type" },
  ];

  return (
    <>
      <PageHeader title="Ledger Report" actions={[{ type: "export" }]} />

      {/* Simple Search Box */}
      <div className="table-search d-flex align-items-center mb-3 ">
        <div className="search-input flex-grow-1 d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, TIN, or balance type..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* <button className="btn btn-success" onClick={() => setShowForm(true)}>
            <i className="fa-solid fa-plus me-2"></i>New
          </button> */}
          <div onClick={() => setShowForm(true)}>
            <Link
              to="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_companies"
            >
              <i className="isax isax-add-circle5 me-1"></i>New Ledger
            </Link>
          </div>
        </div>
      </div>

      <DataTable
        showSelection={false}
        columns={columns}
        data={filteredData}
        visibleColumns={visibleColumns}
      />

      {/* Add Ledger Form Modal */}
      {showForm && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Ledger</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseForm}
                ></button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Ledger Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g., HDFC Bank"
                    />
                    {errors.name && (
                      <div className="invalid-feedback d-block">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Parent Group (Optional)
                    </label>
                    <select
                      className="form-select"
                      name="ledger_group_id"
                      value={formData.parent_group_id}
                      onChange={handleFormChange}
                    >
                      <option value="">Select Parent Group (Optional)</option>
                      {ledgersGrp.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name} ({group.nature})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Opening Balance *</label>
                    <input
                      type="number"
                      step="0.01"
                      className={`form-control ${errors.opening_balance ? "is-invalid" : ""}`}
                      name="opening_balance"
                      value={formData.opening_balance}
                      onChange={handleFormChange}
                      placeholder="e.g., 100000"
                    />
                    {errors.opening_balance && (
                      <div className="invalid-feedback d-block">
                        {errors.opening_balance}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Balance Type *</label>
                    <select
                      className={`form-select ${errors.balance_type ? "is-invalid" : ""}`}
                      name="balance_type"
                      value={formData.balance_type}
                      onChange={handleFormChange}
                    >
                      <option value="DR">DR (Debit)</option>
                      <option value="CR">CR (Credit)</option>
                    </select>
                    {errors.balance_type && (
                      <div className="invalid-feedback d-block">
                        {errors.balance_type}
                      </div>
                    )}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                    onClick={handleCloseForm}
                  >
                    <span
                      className="d-inline-flex align-items-center justify-content-center bg-danger text-white rounded-circle me-2"
                      style={{
                        width: "20px",
                        height: "20px",
                        fontSize: "12px",
                      }}
                    >
                      ✕
                    </span>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="isax isax-save me-2"></i>Save Ledger
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LedgerReport;
