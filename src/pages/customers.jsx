import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomerFormModal from '../components/CustomerFormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/customerService';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });

  // Fetch customers from API
  useEffect(() => {
    fetchCustomersData();
  }, [currentPage]);

  const fetchCustomersData = async () => {
    setIsLoading(true);
    try {
      const response = await getCustomers(currentPage, itemsPerPage);
      if (response.success && response.data) {
        // Map API fields if they differ, though current UI seems generic enough
        // Looking at Create Customer in Postman: name, gstin, phone, email, address, state_code, opening_balance, balance_type
        // UI expects: name, email, phone, company, totalInvoices, totalAmount, status, avatar
        const mappedCustomers = response.data.map(c => ({
          id: c.id,
          name: c.name,
          email: c.email || 'N/A',
          phone: c.phone || 'N/A',
          company: c.company_name || 'N/A',
          totalInvoices: c.total_invoices || 0,
          totalAmount: c.total_amount_formatted || `$${(c.total_amount || 0).toLocaleString()}`,
          status: c.is_active !== false ? 'Active' : 'Inactive',
          avatar: c.avatar || '/assets/img/users/user-25.jpg',
          raw: c // Keep raw data for editing
        }));
        setCustomers(mappedCustomers);
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

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handleOpenModal = (customer = null) => {
    setEditingCustomer(customer ? customer.raw || customer : null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      if (editingCustomer) {
        // Update existing customer
        await updateCustomer(editingCustomer.id, formData);
        toast.success('Customer updated successfully!');
      } else {
        // Create new customer
        await createCustomer(formData);
        toast.success('Customer created successfully!');
      }
      fetchCustomersData(); // Re-fetch data to show latest changes
      handleCloseModal();
    } catch (error) {
      console.error('Error saving customer:', error);
      toast.error(error.message || 'Failed to save customer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (deleteConfirm.id) {
      setIsLoading(true);
      try {
        await deleteCustomer(deleteConfirm.id);
        toast.success('Customer deleted successfully!');
        fetchCustomersData();
      } catch (error) {
        console.error('Error deleting customer:', error);
        toast.error(error.message || 'Failed to delete customer');
      } finally {
        setIsLoading(false);
        setDeleteConfirm({ isOpen: false, id: null });
      }
    }
  };

  const handleExport = (type) => {
    toast.info(`Exporting customers as ${type}`, { position: 'top-right', autoClose: 3000 });
  };

  return (
    <>
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />
      {/* Breadcrumb */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Customers</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Customers
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <button
            onClick={() => handleOpenModal()}
            className="btn btn-primary d-flex align-items-center"
          >
            <i className="isax isax-add me-1"></i>Add Customer
          </button>
          <div className="dropdown">
            <Link href="#"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="#" onClick={() => handleExport('PDF')}>
                  Download as PDF
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#" onClick={() => handleExport('Excel')}>
                  Download as Excel
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
            <h6 className="mb-1">All Customers</h6>
            <div className="input-icon-end position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-icon-addon">
                <i className="isax isax-search-normal"></i>
              </span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact Info</th>
                  <th>Company</th>
                  <th>Total Invoices</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <p className="text-muted">No customers found</p>
                    </td>
                  </tr>
                ) : (
                  currentCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
                            <img src={customer.avatar} className="rounded-circle" alt="Customer" />
                          </div>
                          <div>
                            <h6 className="fs-14 fw-medium mb-0">
                              <Link to={`/customer-details/${customer.id}`}>{customer.name}</Link>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p className="mb-0 fs-13">{customer.email}</p>
                          <p className="mb-0 fs-13 text-muted">{customer.phone}</p>
                        </div>
                      </td>
                      <td>{customer.company}</td>
                      <td>{customer.totalInvoices}</td>
                      <td className="text-dark fw-medium">{customer.totalAmount}</td>
                      <td>
                        <span
                          className={`badge badge-sm ${customer.status === 'Active' ? 'badge-soft-success' : 'badge-soft-danger'
                            }`}
                        >
                          {customer.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Link
                            to={`/customer-details/${customer.id}`}
                            className="btn btn-sm btn-outline-primary"
                            title="View Details"
                          >
                            <i className="isax isax-eye"></i>
                          </Link>
                          <button
                            onClick={() => handleOpenModal(customer)}
                            className="btn btn-sm btn-outline-warning"
                            title="Edit Customer"
                          >
                            <i className="isax isax-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(customer.id)}
                            title="Delete Customer"
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div>
                <p className="mb-0 fs-13">
                  Showing {indexOfFirstItem + 1} to{' '}
                  {Math.min(indexOfLastItem, filteredCustomers.length)} of{' '}
                  {filteredCustomers.length} entries
                </p>
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Customer Form Modal */}
      <CustomerFormModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={editingCustomer}
        isLoading={isLoading}
      />
    </>
  );
};

export default Customers;
