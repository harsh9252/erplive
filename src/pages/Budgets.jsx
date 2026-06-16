import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import budgetService from "../services/budgetService";

const Budgets = () => {
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    limit: 20,
  });

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    fetchBudgets(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchBudgets = async (page = 1, limit = 20) => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm,
        status: selectedStatus,
        page: page,
        limit: limit,
      };

      const response = await budgetService.getBudgets(params);
      // Debug log removed (B-3 fix)

      const items = response.data || [];
      
      const isBackendPaginated = !!(
        response.pagination || 
        response.total !== undefined || 
        response.count !== undefined || 
        response.total_count !== undefined
      );

      let finalItems = items;
      let totalItems = 0;

      if (isBackendPaginated) {
        finalItems = items;
        totalItems =
          response.pagination?.totalItems ||
          response.pagination?.total ||
          response.total ||
          response.data?.total ||
          response.count ||
          response.total_count ||
          (response.pagination?.totalPages
            ? response.pagination?.totalPages * limit
            : items.length);
      } else {
        totalItems = items.length;
        const startIndex = (page - 1) * limit;
        finalItems = items.slice(startIndex, startIndex + limit);
      }

      setBudgets(finalItems);

      const totalPages =
        response.pagination?.totalPages || Math.ceil(totalItems / limit) || 1;

      setPagination({
        totalItems,
        totalPages,
        limit,
        page,
      });
    } catch (error) {
      console.error("Error fetching budgets:", error);
      toast.error("Failed to load budgets");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBudgets(1, pageSize);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleEdit = (budget) => {
    navigate(`/accounting/budgets/edit/${budget.id}`);
  };

  const handleVariance = (budget) => {
    navigate(`/accounting/budgets/${budget.id}/variance`);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the budget and its history!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsDeleting(true);
          await budgetService.deleteBudget(id);
          Swal.fire({
            title: "Deleted!",
            text: "Budget has been deleted.",
            icon: "success",
            iconHtml: '<i class="isax isax-tick-circle text-success fs-50"></i>',
            customClass: {
              icon: "border-0",
            },
          });
          // B-1 fix: pass current page and size so user stays on same page
          fetchBudgets(currentPage, pageSize);
        } catch (error) {
          toast.error(error.message || "Failed to delete budget");
        } finally {
          setIsDeleting(false);
        }
      }
    });
  };

  const getStatusBadge = (status) => {
    const classes = {
      ACTIVE: "bg-success",
      INACTIVE: "bg-secondary",
      DRAFT: "bg-warning",
    };
    return `badge ${classes[status] || "bg-secondary"}`;
  };

  const formatDateRange = (fromDate, toDate) => {
    if (!fromDate || !toDate) return "N/A";
    const from = new Date(fromDate).toLocaleDateString("en-IN");
    const to = new Date(toDate).toLocaleDateString("en-IN");
    return `${from} - ${to}`;
  };

  return (
    <div className="content">
      <div className="page-header">
        <div className="add-item d-flex">
          <div className="page-title">
            <h4>Accounting — Budgets</h4>
            <h6>Manage budgets and track variances</h6>
          </div>
        </div>
        <div className="page-btn">
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => navigate("/accounting/budgets/add")}
          >
            <i className="isax isax-add-circle me-2"></i>New Budget
          </button>
        </div>
      </div>

      <div className="card table-list-card">
        <div className="card-body">
          <div className="table-top mb-4">
            <form className="row g-3" onSubmit={handleSearch}>
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="isax isax-search-normal-1 fs-14"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select
                  className="form-control"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary w-100">
                  Filter
                </button>
              </div>
            </form>
          </div>

          <div className="table-responsive">
            <table className="table datanew">
              <thead>
                <tr>
                  <th>Budget Name</th>
                  <th>Period Type</th>
                  <th>From - To</th>
                  <th className="text-center">Status</th>
                  <th className="no-sort text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      ></div>
                    </td>
                  </tr>
                ) : budgets.length > 0 ? (
                  budgets.map((budget) => (
                    <tr key={budget.id}>
                      <td className="fw-semibold text-dark">{budget.name}</td>
                      <td className="text-capitalize">{budget.period_type}</td>
                      <td>
                        {formatDateRange(budget.from_date, budget.to_date)}
                      </td>
                      <td className="text-center">
                        <span className={getStatusBadge(budget.status)}>
                          {budget.status || "N/A"}
                        </span>
                      </td>
                       <td className="text-end pe-4">
                        <div className="d-flex justify-content-end align-items-center gap-2">
                           {/* B-4 fix: disable Edit and Variance while deleting to prevent navigation mid-delete */}
                           <button 
                             className="btn btn-sm btn-soft-info border-0" 
                             onClick={() => handleVariance(budget)}
                             title="View Variance"
                             disabled={isDeleting}
                           >
                             <i className="isax isax-chart-square fs-16"></i>
                           </button>
                           <button 
                             className="btn btn-sm btn-soft-warning border-0" 
                             onClick={() => handleEdit(budget)}
                             title="Edit Budget"
                             disabled={isDeleting}
                           >
                             <i className="isax isax-edit-2 fs-16"></i>
                           </button>
                           <button 
                             className="btn btn-sm btn-soft-danger border-0" 
                             onClick={() => handleDelete(budget.id)}
                             disabled={isDeleting}
                             title="Delete Budget"
                           >
                             <i className="isax isax-trash fs-16"></i>
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      No budgets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && (
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
                  of {pagination.totalItems} budgets
                </p>
                <select
                  className="form-select form-select-sm w-auto"
                  value={pageSize}
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
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  ).map((pageNo) => (
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
                  ))}
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
    </div>
  );
};

export default Budgets;
