import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import auditLogService from '../services/auditLogService';

const MODULE_OPTIONS = [
  { value: "", label: "All Modules" },
  { value: "auth", label: "Authentication" },
  { value: "users", label: "Users" },
  { value: "roles", label: "Roles" },
  { value: "inventory", label: "Inventory" },
  { value: "sales", label: "Sales" },
  { value: "purchase", label: "Purchase" },
  { value: "finance", label: "Finance" },
];

const ACTION_OPTIONS = [
  { value: "", label: "All Actions" },
  { value: "CREATE", label: "Create" },
  { value: "UPDATE", label: "Update" },
  { value: "DELETE", label: "Delete" },
  { value: "LOGIN", label: "Login" },
  { value: "LOGOUT", label: "Logout" },
];


const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    limit: 20,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [filters, setFilters] = useState({
    module: "",
    action: "",
    user_id: "",
    start_date: "",
    end_date: "",
  });

  // Auto-fetch when page or limit changes — pass current filters explicitly
  useEffect(() => {
    fetchLogs(currentPage, pagination.limit, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pagination.limit]);

  // Auto-apply filters when any filter value changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchLogs(1, pagination.limit, filters);
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.module, filters.action, filters.user_id, filters.start_date, filters.end_date]);

  // Close detail modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showDetailModal) {
        setShowDetailModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showDetailModal]);

  const fetchLogs = async (page = 1, limit = 20, activeFilters = {}) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        ...(activeFilters.module && { module: activeFilters.module }),
        ...(activeFilters.action && { action: activeFilters.action }),
        ...(activeFilters.user_id && { user_id: activeFilters.user_id }),
        ...(activeFilters.start_date && { 
          start_date: activeFilters.start_date, 
          from_date: activeFilters.start_date, 
          startDate: activeFilters.start_date 
        }),
        ...(activeFilters.end_date && { 
          end_date: activeFilters.end_date, 
          to_date: activeFilters.end_date, 
          endDate: activeFilters.end_date 
        }),
      };

      const response = await auditLogService.getAuditLogs(params);
      const items = response.data || [];
      setLogs(items);

      const totalItems =
        response.pagination?.totalItems || response.total || items.length;
      const totalPages =
        response.pagination?.totalPages || Math.ceil(totalItems / limit) || 1;

      setPagination({ totalItems, totalPages, limit, page });
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    fetchLogs(1, pagination.limit, filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      module: "",
      action: "",
      user_id: "",
      start_date: "",
      end_date: "",
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    fetchLogs(1, pagination.limit, clearedFilters);
  };

  const handleViewDetails = async (log) => {
    try {
      const response = await auditLogService.getAuditLogById(log.id);
      setSelectedLog(response.data || log);
      setShowDetailModal(true);
    } catch (error) {
      setSelectedLog(log);
      setShowDetailModal(true);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPagination((prev) => ({ ...prev, limit: newSize }));
    setCurrentPage(1);
  };

  const getActionBadge = (action) => {
    const classes = {
      CREATE: "bg-success",
      UPDATE: "bg-primary",
      DELETE: "bg-danger",
      LOGIN: "bg-info",
      LOGOUT: "bg-warning",
    };
    return classes[action] || "bg-secondary";
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="mb-0">Audit Logs</h6>
        </div>
      </div>

      <div className="card shadow-lg position-relative border-0">
        <div className="card-body">
          <div className="mb-4">
            <div className="row g-3">
              <div className="col-md-2">
                <select
                  className="form-select"
                  name="module"
                  value={filters.module}
                  onChange={handleFilterChange}
                >
                  {MODULE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <select
                  className="form-select"
                  name="action"
                  value={filters.action}
                  onChange={handleFilterChange}
                >
                  {ACTION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control"
                  name="start_date"
                  value={filters.start_date}
                  onChange={handleFilterChange}
                  placeholder="Start Date"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control"
                  name="end_date"
                  value={filters.end_date}
                  onChange={handleFilterChange}
                  placeholder="End Date"
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={handleClearFilters}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-nowrap datatable text-center">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Module</th>
                  <th>Action</th>
                  <th>Entity ID</th>
                  <th>User</th>
                  <th>Date & Time</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      ></div>
                    </td>
                  </tr>
                ) : logs.length > 0 ? (
                  logs.map((log, index) => (
                    <tr key={log.id || index}>
                      <td>
                        {(currentPage - 1) * pagination.limit + index + 1}
                      </td>
                      <td className="text-capitalize">
                        {/* Bug 7.3 fix: replaceAll to replace every underscore, not just first */}
                        {log.module?.replaceAll("_", " ")}
                      </td>
                      <td>
                        <span className={`badge ${getActionBadge(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td>{log.entity_id || "-"}</td>
                      <td>{log.user?.name || log.user_name || "-"}</td>
                      <td>{formatDateTime(log.timestamp || log.created_at)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleViewDetails(log)}
                        >
                          <i className="isax isax-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No audit logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {!loading && logs.length > 0 && (
            <div className="d-flex align-items-center justify-content-between mt-4">
              <div className="d-flex align-items-center gap-3">
                <p className="mb-0 fs-13 text-muted">
                  Showing{" "}
                  {pagination.totalItems > 0
                    ? (currentPage - 1) * pagination.limit + 1
                    : 0}{" "}
                  to{" "}
                  {Math.min(
                    currentPage * pagination.limit,
                    pagination.totalItems,
                  )}{" "}
                  of {pagination.totalItems} logs
                </p>
                <select
                  className="form-select form-select-sm w-auto"
                  value={pagination.limit}
                  onChange={handlePageSizeChange}
                >
                  <option value="10">10 / Page</option>
                  <option value="20">20 / Page</option>
                  <option value="50">50 / Page</option>
                  <option value="100">100 / Page</option>
                </select>
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="isax isax-arrow-left-2 fs-14"></i>
                    </button>
                  </li>
                  {Array.from(
                    { length: Math.min(pagination.totalPages, 5) },
                    (_, i) => {
                      const startPage = Math.max(
                        1,
                        Math.min(currentPage - 2, pagination.totalPages - 4),
                      );
                      const pageNo = startPage + i;
                      if (pageNo > pagination.totalPages) return null;
                      return (
                        <li
                          key={pageNo}
                          className={`page-item ${currentPage === pageNo ? "active" : ""}`}
                        >
                          <button
                            type="button"
                            className="page-link"
                            onClick={() => handlePageChange(pageNo)}
                          >
                            {pageNo}
                          </button>
                        </li>
                      );
                    },
                  )}
                  <li
                    className={`page-item ${currentPage === pagination.totalPages || pagination.totalPages === 0 ? "disabled" : ""}`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={
                        currentPage === pagination.totalPages ||
                        pagination.totalPages === 0
                      }
                    >
                      <i className="isax isax-arrow-right-2 fs-14"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      {showDetailModal && selectedLog && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0">
              <div className="modal-header border-bottom">
                <h5 className="modal-title">Audit Log Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDetailModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-muted">
                      Module
                    </label>
                    <p className="mb-0">{selectedLog.module || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-muted">
                      Action
                    </label>
                    <p className="mb-0">
                      <span
                        className={`badge ${getActionBadge(selectedLog.action)}`}
                      >
                        {selectedLog.action}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-muted">
                      Entity ID
                    </label>
                    <p className="mb-0">{selectedLog.entity_id || "-"}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-muted">
                      User
                    </label>
                    <p className="mb-0">
                      {selectedLog.user?.name || selectedLog.user_name || "-"}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium text-muted">
                      Timestamp
                    </label>
                    <p className="mb-0">
                      {formatDateTime(selectedLog.timestamp || selectedLog.created_at)}
                    </p>
                  </div>

                  {selectedLog.description && (
                    <div className="col-12">
                      <label className="form-label fw-medium text-muted">
                        Description
                      </label>
                      <p className="mb-0">{selectedLog.description}</p>
                    </div>
                  )}
                  {(selectedLog.old_values || selectedLog.new_values) && (
                    <div className="col-12">
                      <label className="form-label fw-bold text-dark d-flex align-items-center mb-3 mt-2">
                        <i className="isax isax-folder-open me-2 text-primary"></i> Data Changes
                      </label>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="p-3 bg-light rounded-4 border border-light h-100">
                            <span className="badge bg-soft-secondary text-secondary mb-3">Before</span>
                            <pre className="fs-12 mb-0 overflow-auto" style={{ maxHeight: '300px' }}>
                              {selectedLog.old_values ? JSON.stringify(selectedLog.old_values, null, 2) : 'No changes'}
                            </pre>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="p-3 bg-soft-primary rounded-4 border border-primary border-opacity-10 h-100">
                            <span className="badge bg-primary mb-3">After</span>
                            <pre className="fs-12 mb-0 overflow-auto text-dark" style={{ maxHeight: '300px' }}>
                              {selectedLog.new_values ? JSON.stringify(selectedLog.new_values, null, 2) : 'No changes'}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary rounded-pill px-4" 
                  onClick={() => setShowDetailModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuditLogs;
