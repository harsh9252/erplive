import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVendors, deleteVendor } from '../services/vendorService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const fetchVendors = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const response = await getVendors({ page, limit: itemsPerPage, search });
      if (response.success) {
        setVendors(response.data);
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast.error('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Delete Vendor?',
      text: "Are you sure? This will remove all associated records.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteVendor(id);
          if (response.success) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Vendor has been deleted.',
              icon: 'success',
              iconHtml: '<i class="isax isax-tick-circle text-success fs-50"></i>',
              customClass: {
                  icon: 'border-0'
              }
            });
            fetchVendors(currentPage, searchTerm);
          }
        } catch (error) {
          console.error('Error deleting vendor:', error);
          toast.error(error.message || 'Failed to delete vendor. They might be in use.');
        }
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = vendors || [];

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h5 className="fw-bold mb-0">Vendors</h5>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fs-13">
              <li className="breadcrumb-item">
                <Link to="/">Master Data</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Vendors
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex gap-2">
          <Link to="/master/vendors/add" className="btn btn-primary d-flex align-items-center gap-2">
            <i className="isax isax-add-circle5"></i>
            Add Vendor
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
                  placeholder="Search vendors..."
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
                  <th className="px-4">Vendor Name</th>
                  <th>GSTIN</th>
                  <th>Contact</th>
                  <th>City / State</th>
                  <th className="text-end">Balance</th>
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
                ) : currentVendors.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No vendors found
                    </td>
                  </tr>
                ) : (
                  currentVendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td className="px-4">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm rounded-3 bg-secondary-transparent text-secondary me-2 flex-shrink-0">
                            {vendor.name?.charAt(0)}
                          </div>
                          <div>
                            <h6 className="fs-14 fw-bold mb-0 text-dark">
                              {vendor.name}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13 fw-medium">{vendor.gstin || '---'}</span>
                      </td>
                      <td>
                        <div className="fs-13">
                          <div className="text-dark">{vendor.phone}</div>
                          <div className="text-muted fs-11">{vendor.email}</div>
                        </div>
                      </td>
                      <td>
                        <span className="fs-13">
                          {vendor.city} {vendor.city && vendor.state_code ? ',' : ''} {vendor.state_code}
                        </span>
                      </td>
                      <td className="text-end">
                        {(() => {
                          const balance = vendor.ledger?.opening_balance || vendor.opening_balance || 0;
                          const type = vendor.ledger?.balance_type || vendor.balance_type || 'CR';
                          const isDr = type === 'DR';
                          return (
                            <span className={`fw-bold ${isDr ? 'text-danger' : 'text-success'}`}>
                              ₹{parseFloat(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {type}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end align-items-center gap-2">
                          <Link 
                            className="btn btn-sm btn-soft-warning border-0" 
                            to={`/master/vendors/edit/${vendor.id}`}
                            title="Edit"
                          >
                            <i className="isax isax-edit-2 fs-16"></i>
                          </Link>
                          <button 
                            className="btn btn-sm btn-soft-danger border-0" 
                            onClick={() => handleDelete(vendor.id)}
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
              Showing {currentVendors.length} vendors
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
                disabled={currentVendors.length < itemsPerPage}
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

export default Vendors;
