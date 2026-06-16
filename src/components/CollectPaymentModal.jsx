import React, { useState, useEffect, forwardRef } from "react";
/* Using global bootstrap from window */

const CollectPaymentModal = forwardRef(({ invoice, onSuccess }, ref) => {
  const [formData, setFormData] = useState({
    amount: 0,
    payment_date: new Date().toISOString().split("T")[0],
    payment_mode: "BANK",
    reference: "",
  });

  const balanceAmount = invoice ? (
    parseFloat(invoice.balance_amount) || 
    parseFloat(invoice.balance) || 
    (parseFloat(invoice.net_total || invoice.net_amount || 0) - parseFloat(invoice.paid_amount || 0))
  ) : 0;

  useEffect(() => {
    if (invoice) {
      setFormData((prev) => ({
        ...prev,
        amount: balanceAmount > 0 ? balanceAmount : 0,
      }));
    }
  }, [invoice, balanceAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(formData);
  };

  return (
    <div
      ref={ref}
      className="modal fade"
      id="collectPaymentModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-soft-primary">
            <h5 className="modal-title">Collect Payment</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {invoice && (
                <div className="alert alert-soft-info py-2 mb-4 fs-13">
                  <div className="d-flex justify-content-between mb-1">
                    <span>
                      Invoice: <strong>{invoice.invoice_number}</strong>
                    </span>
                    <span>
                      Balance:{" "}
                      <strong>
                        ₹{balanceAmount.toLocaleString()}
                      </strong>
                    </span>
                  </div>
                </div>
              )}

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-600">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <input
                      type="number"
                      name="amount"
                      className="form-control"
                      value={formData.amount}
                      onChange={handleChange}
                      max={balanceAmount}
                      min="0.01"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-600">
                    Payment Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="payment_date"
                    className="form-control"
                    value={formData.payment_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-600">
                    Payment Mode <span className="text-danger">*</span>
                  </label>
                  <select
                    name="payment_mode"
                    className="form-select"
                    value={formData.payment_mode}
                    onChange={handleChange}
                    required
                  >
                    <option value="CASH">CASH</option>
                    <option value="BANK">BANK</option>
                    <option value="CHEQUE">CHEQUE</option>
                    <option value="UPI">UPI</option>
                    <option value="NEFT">NEFT</option>
                    <option value="RTGS">RTGS</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fw-600">
                    Reference No / Remarks
                  </label>
                  <input
                    type="text"
                    name="reference"
                    className="form-control"
                    value={formData.reference}
                    onChange={handleChange}
                    placeholder="e.g. Transaction ID, Cheque No"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer border-top-0 pt-0">
              <button
                type="button"
                className="btn btn-light px-4"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4">
                Record Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

CollectPaymentModal.displayName = "CollectPaymentModal";

export default CollectPaymentModal;
