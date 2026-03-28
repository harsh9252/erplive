import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import vendorService from '../services/vendorService';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null, message: '' });

  // Load vendors from API on mount
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await vendorService.getVendors();
      setVendors(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching vendors:', err);
      setError('Failed to load vendors. Please try again.');
      toast.error('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || vendor.vendor_type === typeFilter;
    return matchesSearch && matchesType;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);

  const getStatusBadge = (status) => {
    return status === 'ACTIVE' ? 'badge-soft-success' : 'badge-soft-secondary';
  };

  const getTypeLabel = (type) => {
    const labels = {
      MANUFACTURER: 'Manufacturer',
      DISTRIBUTOR: 'Distributor',
      TRADER: 'Trader',
      SERVICE_PROVIDER: 'Service Provider',
    };
    return labels[type] || type;
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      message: 'Are you sure you want to delete this vendor?',
      onConfirm: async () => {
        try {
          await vendorService.deleteVendor(id);
          setVendors(vendors.filter((vendor) => vendor.id !== id));
          toast.success('Vendor deleted successfully!');
        } catch (err) {
          console.error('Error deleting vendor:', err);
          toast.error('Failed to delete vendor');
        } finally {
          setConfirmDialog({ ...confirmDialog, isOpen: false });
        }
      }
    });
  };

  const handleExport = (type) => {
    if (type === 'PDF') {
      window.print();
    } else if (type === 'Excel') {
      const csv = [
        ['Vendor Name', 'Company', 'Type', 'Email', 'Phone', 'City', 'State', 'Status'],
        ...currentVendors.map((vendor) => [
          vendor.name,
          vendor.company_name,
          getTypeLabel(vendor.vendor_type),
          vendor.email,
          vendor.phone,
          vendor.city,
          vendor.state,
          vendor.status,
        ]),
      ]
        .map((row) => row.join(','))
        .join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vendors.csv';
      a.click();
    }
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        message={confirmDialog.message}
      />
      {/* Breadcrumb */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Vendors</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item">Purchase</li>
              <li className="breadcrumb-item active" aria-current="page">
                Vendors
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <Link to="/add-vendor" className="btn btn-primary d-flex align-items-center">
            <i className="isax isax-add me-1"></i>Add Vendor
          </Link>
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

      {/* Vendor Stats */}
      <div className="row mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Total Vendors</p>
                  <h6 className="fs-16 fw-semibold">{vendors.length}</h6>
                </div>
                <span className="avatar avatar-lg bg-primary text-white">
                  <i className="isax isax-people fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Active</p>
                  <h6 className="fs-16 fw-semibold">
                    {vendors.filter((v) => v.status === 'ACTIVE').length}
                  </h6>
                </div>
                <span className="avatar avatar-lg bg-success text-white">
                  <i className="isax isax-tick-circle fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Manufacturers</p>
                  <h6 className="fs-16 fw-semibold">
                    {vendors.filter((v) => v.vendor_type === 'MANUFACTURER').length}
                  </h6>
                </div>
                <span className="avatar avatar-lg bg-info text-white">
                  <i className="isax isax-factory fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-1">Distributors</p>
                  <h6 className="fs-16 fw-semibold">
                    {vendors.filter((v) => v.vendor_type === 'DISTRIBUTOR').length}
                  </h6>
                </div>
                <span className="avatar avatar-lg bg-warning text-white">
                  <i className="isax isax-truck fs-16"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
            <h6 className="mb-1">All Vendors</h6>
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm"
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Types</option>
                <option value="MANUFACTURER">Manufacturer</option>
                <option value="DISTRIBUTOR">Distributor</option>
                <option value="TRADER">Trader</option>
                <option value="SERVICE_PROVIDER">Service Provider</option>
              </select>
              <div className="input-icon-end position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <span className="input-icon-addon">
                  <i className="isax isax-search-normal"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Vendor Name</th>
                  <th>Company</th>
                  <th>Type</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-danger">
                      {error}
                    </td>
                  </tr>
                ) : currentVendors.length > 0 ? (
                  currentVendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td>
                        <Link
                          to={`/vendor-details/${vendor.id}`}
                          className="fw-medium text-primary"
                        >
                          {vendor.name}
                        </Link>
                      </td>
                      <td>{vendor.company_name}</td>
                      <td>
                        <span className="badge badge-sm bg-light text-dark">
                          {getTypeLabel(vendor.vendor_type)}
                        </span>
                      </td>
                      <td>{vendor.email}</td>
                      <td>{vendor.phone}</td>
                      <td>{vendor.city}</td>
                      <td>{vendor.state}</td>
                      <td>
                        <span className={`badge badge-sm ${getStatusBadge(vendor.status)}`}>
                          {vendor.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Link
                            to={`/vendor-details/${vendor.id}`}
                            className="btn btn-sm btn-outline-primary"
                            title="View Vendor"
                          >
                            <i className="isax isax-eye"></i>
                          </Link>
                          <Link
                            to={`/edit-vendor/${vendor.id}`}
                            className="btn btn-sm btn-outline-warning"
                            title="Edit Vendor"
                          >
                            <i className="isax isax-edit"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(vendor.id)}
                            title="Delete Vendor"
                          >
                            <i className="isax isax-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      <p className="text-muted mb-0">No vendors found</p>
                    </td>
                  </tr>
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
                  {Math.min(indexOfLastItem, filteredVendors.length)} of {filteredVendors.length}{' '}
                  entries
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
    </>
  );
};

export default Vendors;
