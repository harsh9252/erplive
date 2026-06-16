import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import customerService from '../services/customerService';
import Swal from 'sweetalert2';

const Customers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomersData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await customerService.getCustomers(currentPage, itemsPerPage, { search: searchTerm });
      if (response && response.data) {
        setCustomers(response.data);
        setTotalItems(response.total || response.data.length);
      } else {
        setCustomers([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers from server');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCustomersData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchCustomersData]);

  const handleDelete = async (id, name) => {
    Swal.fire({
      title: 'Delete Customer?',
      text: `Are you sure you want to delete ${name}? This will remove all associated records.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete',
      customClass: {
        popup: 'rounded-16 shadow-lg border-0',
        confirmButton: 'btn btn-danger px-4 rounded-pill',
        cancelButton: 'btn btn-light px-4 rounded-pill ms-2'
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await customerService.deleteCustomer(id);
          if (response.success) {
            toast.success('Customer removed successfully');
            fetchCustomersData();
          }
        } catch (error) {
          console.error('Error deleting customer:', error);
          toast.error(error.message || 'Failed to delete customer. They might be in use.');
        }
      }
    });
  };

  const getBalanceBadge = (customer) => {
    const balance = parseFloat(customer.ledger?.opening_balance || customer.opening_balance || 0);
    const type = customer.ledger?.balance_type || customer.balance_type || 'DR';
    const isDr = type === 'DR';

    return (
      <span className={`badge bg-soft-${isDr ? 'danger' : 'success'} text-${isDr ? 'danger' : 'success'} border-${isDr ? 'danger' : 'success'} px-2`}>
        ₹{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })} {type}
      </span>
    );
  };

  const handleExport = () => {
    if (customers.length === 0) {
      toast.warning('No data to export');
      return;
    }

    const headers = ['Company Name', 'PAN', 'GSTIN', 'Phone', 'Email', 'City', 'State Code', 'Current Balance', 'Balance Type'];
    const csvRows = [headers.join(',')];

    customers.forEach(customer => {
      const balance = customer.ledger?.opening_balance || customer.opening_balance || 0;
      const balanceType = customer.ledger?.balance_type || customer.balance_type || 'DR';

      const row = [
        `"${(customer.name || '').replace(/"/g, '""')}"`,
        `"${customer.pan || ''}"`,
        `"${customer.gstin || ''}"`,
        `"=""${customer.phone || ''}"""`,
        `"${customer.email || ''}"`,
        `"${(customer.city || '').replace(/"/g, '""')}"`,
        `"${customer.state_code || ''}"`,
        balance,
        balanceType
      ];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `customers_export_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Export downloaded successfully');
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1">Customer</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-muted"><i className="isax isax-home-2 me-1"></i>Home</Link>
              </li>
              <li className="breadcrumb-item text-muted">Master Data</li>
              <li className="breadcrumb-item active text-primary">Customers</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          <Link
            to="/master/customers/add"
            className="btn btn-primary d-flex align-items-center shadow-sm px-4 rounded-pill transition-all"
          >
            <i className="isax isax-add-circle me-2 fs-18"></i>Add New Customer
          </Link>
          <button onClick={handleExport} className="btn btn-outline-white d-inline-flex align-items-center rounded-pill px-3 shadow-none">
            <i className="isax isax-export-1 me-2 text-primary"></i>Export
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-header bg-white py-3 border-0">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <h6 className="mb-0 fw-bold">{totalItems} Registered Customers</h6>
            <div className="input-group" style={{ maxWidth: '300px' }}>
              <span className="input-group-text bg-light border-0"><i className="isax isax-search-normal text-muted fs-14"></i></span>
              <input
                type="text"
                className="form-control bg-light border-0 shadow-none ps-0"
                placeholder="Search name, GSTIN, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light text-muted fs-11 text-uppercase tracking-wider">
                <tr>
                  <th className="ps-4">Customer Details</th>
                  <th>GSTIN / Tax ID</th>
                  <th>Contact Info</th>
                  <th>Location</th>
                  <th className="text-end">Current Balance</th>
                  <th className="text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td colSpan="6" className="py-4">
                        <div className="skeleton-line rounded-pill"></div>
                      </td>
                    </tr>
                  ))
                ) : customers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <div className="avatar avatar-xl bg-soft-secondary mb-3 mx-auto rounded-circle">
                        <i className="isax isax-user-octagon fs-48 text-muted opacity-50"></i>
                      </div>
                      <h6 className="text-muted">No customers match your search criteria</h6>
                      <Link to="/master/customers/add" className="btn btn-link text-primary mt-2">Create your first customer</Link>
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div className={`avatar avatar-md rounded-circle me-3 text-white fw-bold bg-soft-primary text-primary`}>
                            {customer.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <Link to={`/customer-details/${customer.id}`} className="fw-bold text-dark d-block">
                              {customer.name}
                            </Link>
                            <small className="text-muted fw-medium">PAN: {customer.pan || 'N/A'}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-soft-info text-info border-info px-2 font-monospace">{customer.gstin || 'UNREGISTERED'}</span>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="text-dark fw-medium fs-13">{customer.phone}</span>
                          <small className="text-muted">{customer.email || 'No email'}</small>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="isax isax-location-tick text-muted me-1 fs-14"></i>
                          <span className="text-dark fs-13">
                            {customer.city}{customer.state_code ? `, ${customer.state_code}` : ''}
                          </span>
                        </div>
                      </td>
                      <td className="text-end">
                        {getBalanceBadge(customer)}
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end align-items-center gap-2">
                          <Link
                            className="btn btn-sm btn-soft-warning border-0"
                            to={`/master/customers/edit/${customer.id}`}
                            title="Edit"
                          >
                            <i className="isax isax-edit-2 fs-16"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-soft-danger border-0"
                            onClick={() => handleDelete(customer.id, customer.name)}
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
      </div>
    </div>
  );
};

export default Customers;
