import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCustomers, deleteCustomer } from '../services/customerService';
import Swal from 'sweetalert2';

const Customers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch customers from API
  useEffect(() => {
    fetchCustomersData();
  }, [currentPage, searchTerm]);

  const fetchCustomersData = async () => {
    setIsLoading(true);
    try {
      const response = await getCustomers(currentPage, itemsPerPage, { search: searchTerm });
      if (response.success && response.data) {
        setCustomers(response.data);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentCustomers = customers; // Backend might already handle filtering/pagination
  const totalPages = 1; // Simplified for now since API might return count

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        container: 'swal2-custom-container',
        popup: 'rounded-16 shadow-lg border-0',
        confirmButton: 'btn btn-danger px-4 rounded-8',
        cancelButton: 'btn btn-outline-secondary px-4 rounded-8'
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteCustomer(id);
          if (response.success) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Customer has been deleted.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              customClass: {
                popup: 'rounded-16 shadow-lg border-0'
              }
            });
            fetchCustomersData();
          }
        } catch (error) {
          console.error('Error deleting customer:', error);
          toast.error('Failed to delete customer');
        }
      }
    });
  };

  const handleExport = (type) => {
    toast.info(`Exporting customers as ${type}`);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6 className="fw-bold mb-0">Customers</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0 mt-1">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">Master Data</li>
              <li className="breadcrumb-item active" aria-current="page">
                Customers
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <Link
            to="/master/customers/add"
            className="btn btn-primary d-flex align-items-center"
          >
            <i className="isax isax-add me-1"></i>Add Customer
          </Link>
          <div className="dropdown">
            <button
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </button>
            <ul className="dropdown-menu shadow border-0">
              <li>
                <button className="dropdown-item" onClick={() => handleExport('PDF')}>
                  Download as PDF
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleExport('Excel')}>
                  Download as Excel
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
            <h6 className="mb-0">Customer Records</h6>
            <div className="input-icon-end position-relative" style={{ width: '250px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, GSTIN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-icon-addon">
                <i className="isax isax-search-normal"></i>
              </span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-nowrap align-middle mb-0">
              <thead className="thead-light">
                <tr>
                  <th className="px-4">Customer Name</th>
                  <th>GSTIN</th>
                  <th>Contact</th>
                  <th>City / State</th>
                  <th className="text-end">Balance</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <i className="isax isax-folder-open text-muted fs-2"></i>
                      <p className="mt-2 text-muted">No customers found</p>
                    </td>
                  </tr>
                ) : (
                  currentCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-4">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm rounded-3 bg-primary-transparent text-primary me-2 flex-shrink-0">
                            {customer.name?.charAt(0)}
                          </div>
                          <div>
                            <h6 className="fs-14 fw-bold mb-0">
                              <Link to={`/customer-details/${customer.id}`} className="text-dark">
                                {customer.name}
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13 fw-medium">{customer.gstin || '---'}</span>
                      </td>
                      <td>
                        <div className="fs-13">
                          <div className="text-dark">{customer.phone}</div>
                          <div className="text-muted fs-11">{customer.email}</div>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13">
                          {customer.city} {customer.city && customer.state_code ? ',' : ''} {customer.state_code}
                        </span>
                      </td>
                      <td className="text-end">
                        {(() => {
                          const balance = customer.ledger?.opening_balance || customer.opening_balance || 0;
                          const type = customer.ledger?.balance_type || customer.balance_type || 'DR';
                          const isDr = type === 'DR';
                          return (
                            <span className={`fw-bold ${isDr ? 'text-danger' : 'text-success'}`}>
                              ₹{parseFloat(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {type}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <Link
                            to={`/master/customers/edit/${customer.id}`}
                            className="btn btn-sm btn-icon btn-soft-warning"
                            title="Edit"
                          >
                            <i className="isax isax-edit"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-icon btn-soft-danger"
                            onClick={() => handleDelete(customer.id)}
                            title="Delete"
                          >
                            <i className="isax isax-trash"></i>
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
      </div>
    </>
  );
};

export default Customers;
