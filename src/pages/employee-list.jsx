import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getEmployees, deleteEmployee } from '../services/employeeService';
import Swal from 'sweetalert2';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    status: 'ACTIVE',
    page: 1,
    limit: 20
  });
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0
  });

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getEmployees({ ...filters, search: debouncedSearch });
      const resData = response.data || response;
      setEmployees(Array.isArray(resData) ? resData : (resData.items || resData.rows || []));
      setPagination({
        total: resData.pagination?.total || resData.total || resData.data?.total || (Array.isArray(resData) ? resData.length : 0),
        pages: resData.pagination?.pages || 1
      });
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setFilters(prev => ({ ...prev, page: 1 }));
    }, 600);
    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      if (!id) {
        toast.error('Invalid employee ID');
        console.error('❌ Cannot delete employee: ID is missing');
        return;
      }

      try {
        await deleteEmployee(id);
        toast.success('Employee deleted successfully');
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        toast.error(error.response?.data?.message || error.message || 'Failed to delete employee');
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-success';
      case 'INACTIVE': return 'bg-warning text-dark';
      case 'TERMINATED': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-1">Employee Directory</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item">Payroll & HR</li>
              <li className="breadcrumb-item active">Employees</li>
            </ol>
          </nav>
        </div>
        <Link to="/payroll/employees/add" className="btn btn-primary d-flex align-items-center shadow-none">
          <i className="isax isax-add-circle me-2 fs-18"></i>
          Add Employee
        </Link>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body py-3">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0">
                  <i className="isax isax-search-normal-1 text-muted"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control border-start-0 ps-0 shadow-none text-dark" 
                  placeholder="Search by name, code or email..." 
                  name="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select form-select-sm shadow-none text-dark" 
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
              >
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select form-select-sm shadow-none text-dark" 
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="ACTIVE">Active Only</option>
                <option value="INACTIVE">Inactive</option>
                <option value="TERMINATED">Terminated</option>
                <option value="">All Statuses</option>
              </select>
            </div>
            <div className="col-md-2 text-end">
              <button className="btn btn-outline-secondary btn-sm shadow-none" onClick={fetchEmployees}>
                <i className="isax isax-refresh me-1"></i> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light fs-12 text-uppercase text-muted">
                <tr>
                  <th className="ps-4">Emp Code</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Join Date</th>
                  <th>Basic Salary</th>
                  <th className="text-center">Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="8" className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary"></div></td></tr>
                ) : employees.length === 0 ? (
                  <tr><td colSpan="8" className="text-center py-5 text-muted">No employees found.</td></tr>
                ) : (
                  employees.map((emp) => {
                    const empId = emp.id || emp._id;
                    return (
                      <tr 
                        key={empId} 
                        onClick={() => window.location.href = `/payroll/employees/edit/${empId}`}
                        style={{ cursor: 'pointer' }}
                        className="cursor-pointer"
                      >
                        <td className="ps-4 fw-medium text-dark">{emp.employee_code}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar avatar-sm bg-soft-primary text-primary rounded-circle me-3 fw-bold">
                              {emp.name?.charAt(0)}
                            </div>
                            <div>
                              <div className="fw-bold text-dark">{emp.name}</div>
                              <div className="fs-12 text-muted">{emp.email || 'No email'}</div>
                            </div>
                          </div>
                        </td>
                        <td>{emp.department}</td>
                        <td>{emp.designation}</td>
                        <td>{emp.date_of_joining ? new Date(emp.date_of_joining).toLocaleDateString() : 'N/A'}</td>
                        <td className="fw-medium">₹{Number(emp.basic_salary).toLocaleString()}</td>
                        <td className="text-center">
                          <span className={`badge ${getStatusBadge(emp.status)} px-2 py-1`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end align-items-center gap-2">
                            <button 
                              className="btn btn-sm btn-soft-info border-0" 
                              onClick={() => navigate(`/payroll/employees/edit/${empId}`)}
                              title="Edit Employee"
                            >
                              <i className="isax isax-edit-2 fs-16"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-soft-danger border-0" 
                              onClick={(e) => { e.stopPropagation(); handleDelete(empId); }}
                              title="Delete Employee"
                            >
                              <i className="isax isax-trash fs-16"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {pagination.total > filters.limit && (
        <div className="card-footer bg-white border-top py-3 d-flex justify-content-between align-items-center">
          <div className="fs-13 text-muted">
            Showing {(filters.page - 1) * filters.limit + 1} to {Math.min(filters.page * filters.limit, pagination.total)} of {pagination.total}
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${filters.page === 1 ? 'disabled' : ''}`}>
                <button className="page-link shadow-none" onClick={() => setFilters(p => ({ ...p, page: p.page - 1 }))} disabled={filters.page === 1}>Previous</button>
              </li>
              <li className="page-item active"><span className="page-link">{filters.page}</span></li>
              <li className={`page-item ${employees.length < filters.limit ? 'disabled' : ''}`}>
                <button className="page-link shadow-none" onClick={() => setFilters(p => ({ ...p, page: p.page + 1 }))} disabled={employees.length < filters.limit}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
