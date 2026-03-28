import { useState, useEffect } from 'react';
import TaxForm from '../components/TaxForm';
import { Link } from 'react-router-dom';
import SettingsSidebar from '../components/SettingsSidebar';

const TaxMaster = () => {
  useEffect(() => {
    console.log('TaxMaster component mounted');
    return () => console.log('TaxMaster component unmounted');
  }, []);

  // Pre-seeded tax data
  const preSeededTaxes = [
    // GST rates
    { id: 1, name: 'GST 0%', tax_type: 'GST', rate: 0, cgst_rate: 0, sgst_rate: 0, igst_rate: 0, created_at: '2025-02-01' },
    { id: 2, name: 'GST 3%', tax_type: 'GST', rate: 3, cgst_rate: 1.5, sgst_rate: 1.5, igst_rate: 3, created_at: '2025-02-01' },
    { id: 3, name: 'GST 5%', tax_type: 'GST', rate: 5, cgst_rate: 2.5, sgst_rate: 2.5, igst_rate: 5, created_at: '2025-02-01' },
    { id: 4, name: 'GST 12%', tax_type: 'GST', rate: 12, cgst_rate: 6, sgst_rate: 6, igst_rate: 12, created_at: '2025-02-01' },
    { id: 5, name: 'GST 18%', tax_type: 'GST', rate: 18, cgst_rate: 9, sgst_rate: 9, igst_rate: 18, created_at: '2025-02-01' },
    { id: 6, name: 'GST 28%', tax_type: 'GST', rate: 28, cgst_rate: 14, sgst_rate: 14, igst_rate: 28, created_at: '2025-02-01' },
    // TDS rates
    { id: 7, name: 'TDS 1%', tax_type: 'TDS', rate: 1, cgst_rate: 0.5, sgst_rate: 0.5, igst_rate: 1, created_at: '2025-02-02' },
    { id: 8, name: 'TDS 2%', tax_type: 'TDS', rate: 2, cgst_rate: 1, sgst_rate: 1, igst_rate: 2, created_at: '2025-02-02' },
    { id: 9, name: 'TDS 10%', tax_type: 'TDS', rate: 10, cgst_rate: 5, sgst_rate: 5, igst_rate: 10, created_at: '2025-02-02' },
    // TCS rates
    { id: 10, name: 'TCS 1%', tax_type: 'TCS', rate: 1, cgst_rate: 0.5, sgst_rate: 0.5, igst_rate: 1, created_at: '2025-02-03' },
  ];

  const [taxList, setTaxList] = useState(preSeededTaxes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const taxTypes = ['GST', 'TDS', 'TCS', 'CESS', 'OTHER'];

  const filteredList = taxList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tax_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || item.tax_type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddNew = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (editingId) {
        // Update existing
        setTaxList((prev) =>
          prev.map((item) =>
            item.id === editingId
              ? {
                  ...item,
                  ...formData,
                  updated_at: new Date().toISOString().split('T')[0],
                }
              : item
          )
        );
      } else {
        // Add new
        const newItem = {
          id: Math.max(...taxList.map((i) => i.id), 0) + 1,
          ...formData,
          created_at: new Date().toISOString().split('T')[0],
        };
        setTaxList((prev) => [newItem, ...prev]);
      }
      setShowForm(false);
      setIsLoading(false);
    }, 500);
  };

  const handleDelete = (id) => {
    setTaxList((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirm(null);
  };

  const getEditingData = () => {
    if (!editingId) return null;
    return taxList.find((item) => item.id === editingId);
  };

  const getTaxTypeBadgeClass = (type) => {
    const badgeClasses = {
      GST: 'bg-primary-light text-primary',
      TDS: 'bg-info-light text-info',
      TCS: 'bg-warning-light text-warning',
      CESS: 'bg-danger-light text-danger',
      OTHER: 'bg-secondary-light text-secondary',
    };
    return badgeClasses[type] || 'bg-secondary-light text-secondary';
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-12">
          <div className="row settings-wrapper d-flex">
            <div className="col-xl-3 col-lg-4">
              <SettingsSidebar activeItem="/tax-master" />
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="mb-3">
                <div className="pb-3 border-bottom mb-3">
                  <h6 className="mb-0">GST - Tax Rates</h6>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <h6 className="fs-16 fw-semibold mb-0">Tax Master</h6>
                </div>

            {/* Search, Filter and Add Button */}
            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <div className="input-icon-start position-relative">
                    <span className="input-icon-addon">
                      <i className="isax isax-search-normal"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-sm bg-white"
                      placeholder="Search by name or type"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="form-control form-control-sm"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ maxWidth: '150px' }}
                  >
                    <option value="">All Types</option>
                    {taxTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <button
                    onClick={handleAddNew}
                    className="btn btn-primary d-flex align-items-center"
                  >
                    <i className="isax isax-add-circle5 me-2"></i>New Tax
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive table-nowrap pb-3">
              <table className="table border mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Tax Name</th>
                    <th>Type</th>
                    <th>Total Rate</th>
                    <th>CGST</th>
                    <th>SGST</th>
                    <th>IGST</th>
                    <th>Created On</th>
                    <th className="no-sort"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <span className="fw-semibold">{item.name}</span>
                        </td>
                        <td>
                          <span className={`badge ${getTaxTypeBadgeClass(item.tax_type)}`}>
                            {item.tax_type}
                          </span>
                        </td>
                        <td>{item.rate}%</td>
                        <td>{item.cgst_rate}%</td>
                        <td>{item.sgst_rate}%</td>
                        <td>{item.igst_rate}%</td>
                        <td>{item.created_at}</td>
                        <td className="action-item">
                          <Link href="#" data-bs-toggle="dropdown">
                            <i className="isax isax-more"></i>
                          </Link>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                onClick={() => handleEdit(item.id)}
                                className="dropdown-item d-flex align-items-center"
                                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => setDeleteConfirm(item.id)}
                                className="dropdown-item d-flex align-items-center"
                                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </button>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        <p className="text-muted mb-0">No taxes found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      {/* Add/Edit Modal */}
      <div
        className={`modal fade ${showForm ? 'show' : ''}`}
        style={{ display: showForm ? 'block' : 'none' }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                {editingId ? 'Edit Tax' : 'Add New Tax'}
              </h4>
              <button
                type="button"
                className="btn-close custom-btn-close btn-close-modal"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <TaxForm
                initialData={getEditingData()}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {showForm && <div className="modal-backdrop fade show"></div>}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Confirm Delete</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteConfirm(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this tax?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal Backdrop */}
      {deleteConfirm && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default TaxMaster;
