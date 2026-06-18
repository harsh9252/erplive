import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEcommerceOperators, deleteEcommerceOperator } from '../services/ecommerceOperatorService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const EcommerceOperators = () => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const fetchOperators = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const response = await getEcommerceOperators({ page, limit: itemsPerPage, search });
      if (response.success) {
        setOperators(response.data);
      }
    } catch (error) {
      console.error('Error fetching e-commerce operators:', error);
      toast.error('Failed to load e-commerce operators');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperators(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Delete E-Commerce Operator?',
      text: "Are you sure? This will remove all associated records.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteEcommerceOperator(id);
          if (response.success) {
            Swal.fire({
              title: 'Deleted!',
              text: 'E-Commerce Operator has been deleted.',
              icon: 'success',
              iconHtml: '<i class="isax isax-tick-circle text-success fs-50"></i>',
              customClass: {
                  icon: 'border-0'
              }
            });
            fetchOperators(currentPage, searchTerm);
          }
        } catch (error) {
          console.error('Error deleting e-commerce operator:', error);
          toast.error(error.message || 'Failed to delete e-commerce operator. They might be in use.');
        }
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Pagination logic
  const currentOperators = operators || [];

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h5 className="fw-bold mb-0">E-Commerce Operators</h5>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item">
                <Link to="/">Master Data</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                E-Commerce Operators
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          <Link to="/master/ecommerce-operators/add" className="btn btn-primary d-flex align-items-center gap-2">
            <i className="isax isax-add-circle5"></i>
            Add E-Commerce Operator
          </Link>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-16 overflow-hidden">
        <div className="card-header bg-transparent border-0 p-4 pb-0">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="isax isax-search-normal-1 text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-0 shadow-none"
                  placeholder="Search e-commerce operators..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="fs-12 text-muted fw-bold uppercase">
                  <th className="px-4">Operator Name</th>
                  <th>GSTIN</th>
                  <th>Contact</th>
                  <th>City / State</th>
                  <th className="text-center">Status</th>
                  <th className="text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status"></div>
                    </td>
                  </tr>
                ) : currentOperators.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No e-commerce operators found
                    </td>
                  </tr>
                ) : (
                  currentOperators.map((operator) => (
                    <tr key={operator.id}>
                      <td className="px-4">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm rounded-3 bg-primary-transparent text-primary me-2 flex-shrink-0">
                            {operator.name?.charAt(0)}
                          </div>
                          <div>
                            <h6 className="fs-14 fw-bold mb-0 text-dark">
                              {operator.name}
                            </h6>
                            {operator.contact_person && (
                              <small className="text-muted fs-11">{operator.contact_person}</small>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13 fw-medium">{operator.gstin || '---'}</span>
                      </td>
                      <td>
                        <div className="fs-13">
                          <div className="text-dark">{operator.phone || '---'}</div>
                          <div className="text-muted fs-11">{operator.email || '---'}</div>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13">
                          {operator.city} {operator.city && operator.state_code ? ',' : ''} {operator.state_code}
                        </span>
                      </td>
                      <td className="text-center">
                        {operator.is_active ? (
                          <span className="badge bg-success-transparent text-success fs-12">Active</span>
                        ) : (
                          <span className="badge bg-danger-transparent text-danger fs-12">Inactive</span>
                        )}
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end align-items-center gap-2">
                          <Link 
                            className="btn btn-sm btn-soft-warning border-0" 
                            to={`/master/ecommerce-operators/edit/${operator.id}`}
                            title="Edit"
                          >
                            <i className="isax isax-edit-2 fs-16"></i>
                          </Link>
                          <button 
                            className="btn btn-sm btn-soft-danger border-0" 
                            onClick={() => handleDelete(operator.id)}
                            title="Delete"
                          >
                            <i className="isax isax-trash fs-16"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer bg-transparent border-0 p-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <span className="fs-13 text-muted">
              Showing {currentOperators.length} e-commerce operators
            </span>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-secondary px-3"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </button>
              <button
                className="btn btn-sm btn-primary px-3"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentOperators.length < itemsPerPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EcommerceOperators;
