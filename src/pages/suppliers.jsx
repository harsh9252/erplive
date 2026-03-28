import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [amountRange, setAmountRange] = useState({ min: 0, max: 1000000 });
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();

  // Sort state
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // Columns visibility state
  const [columns, setColumns] = useState({
    supplier: true,
    phone: true,
    createdOn: true,
    balance: true,
    currency: true,
  });

  const [formData, setFormData] = useState({ id: null, name: '', email: '', phone: '', balance: 0, currency: 'USD ($)', image: '' });

  // Sample data - replace with API call
  useEffect(() => {
    const stored = localStorage.getItem('suppliers');
    if (stored) {
      const parsed = JSON.parse(stored);
      setSuppliers(parsed);
      setFilteredSuppliers(parsed);
    } else {
      const sampleData = [
        { id: 1, name: 'Emma Rose', phone: '+1 202-555-0198', date: '2025-02-22', balance: 10000, currency: 'USD ($)', image: '/assets/img/profiles/avatar-17.jpg' },
        { id: 2, name: 'Ethan James', phone: '+1 305-456-7821', date: '2025-02-07', balance: 25750, currency: 'CAD (C$)', image: '/assets/img/profiles/avatar-05.jpg' },
        { id: 3, name: 'Olivia Grace', phone: '+1 415-678-1234', date: '2025-01-30', balance: 50125, currency: 'GBP (£)', image: '/assets/img/profiles/avatar-12.jpg' },
        { id: 4, name: 'Liam Michael', phone: '+1 718-987-6543', date: '2025-01-17', balance: 75900, currency: 'AUD (A$)', image: '/assets/img/profiles/avatar-29.jpg' },
        { id: 5, name: 'Sophia Marie', phone: '+1 909-234-5678', date: '2025-01-04', balance: 99999, currency: 'EUR (€)', image: '/assets/img/profiles/avatar-32.jpg' },
      ];
      localStorage.setItem('suppliers', JSON.stringify(sampleData));
      setSuppliers(sampleData);
      setFilteredSuppliers(sampleData);
    }
  }, []);

  // Apply filters
  const applyFilters = () => {
    let filtered = [...suppliers];

    // Filter by selected suppliers
    if (selectedSuppliers.length > 0) {
      filtered = filtered.filter(s => selectedSuppliers.includes(s.id));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.phone.includes(searchTerm)
      );
    }

    // Filter by amount range
    filtered = filtered.filter(s =>
      s.balance >= amountRange.min && s.balance <= amountRange.max
    );

    // Execute Sorting
    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredSuppliers(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedSuppliers, amountRange, dateRange, sortConfig, suppliers]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSupplierToggle = (id) => {
    setSelectedSuppliers(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedSuppliers.length === suppliers.length) {
      setSelectedSuppliers([]);
    } else {
      setSelectedSuppliers(suppliers.map(s => s.id));
    }
  };

  const clearFilters = () => {
    setSelectedSuppliers([]);
    setSearchTerm('');
    setDateRange({ start: '', end: '' });
    setAmountRange({ min: 0, max: 1000000 });
    setSortConfig({ key: 'date', direction: 'desc' });
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      const updated = suppliers.filter((s) => s.id !== deleteConfirm.id);
      localStorage.setItem('suppliers', JSON.stringify(updated));
      setSuppliers(updated);
      toast.success('Supplier deleted successfully!', { position: 'top-right', autoClose: 3000 });
    }
    setDeleteConfirm({ isOpen: false, id: null });
  };

  const handleEditClick = (supplier) => {
    setFormData(supplier);
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', email: '', phone: '', balance: 0, currency: 'USD ($)', image: '' });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (formData.id) {
      const updated = suppliers.map((s) => (s.id === formData.id ? { ...s, ...formData } : s));
      localStorage.setItem('suppliers', JSON.stringify(updated));
      setSuppliers(updated);
      toast.success('Supplier updated successfully!', { position: 'top-right', autoClose: 3000 });
      document.querySelector('#edit_modal .btn-close').click();
    } else {
      const newSupplier = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
      };
      const updated = [newSupplier, ...suppliers];
      localStorage.setItem('suppliers', JSON.stringify(updated));
      setSuppliers(updated);
      toast.success('Supplier added successfully!', { position: 'top-right', autoClose: 3000 });
      document.querySelector('#add_modal .btn-close').click();
    }
  };

  const handleSupplierClick = (supplier) => {
    toast.info(`Viewing details for ${supplier.name}...`, { position: 'top-right', autoClose: 2000 });
    // Or navigate: navigate(`/supplier-details/${supplier.id}`);
  };

  const toggleColumn = (colName) => {
    setColumns(prev => ({ ...prev, [colName]: !prev[colName] }));
  };

  return (
    <>
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Supplier"
        message="Are you sure you want to delete this supplier? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Supplier</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div className="dropdown">
            <Link href="#"
              className="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="isax isax-export-1 me-1"></i>Export
            </Link  >
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="#">
                  Download as PDF
                </Link  >
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  Download as Excel
                </Link  >
              </li>
            </ul>
          </div>
          <div>
            <Link href="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_modal"
              onClick={resetForm}
            >
              <i className="isax isax-add-circle5 me-1"></i>New Supplier
            </Link  >
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="table-search d-flex align-items-center mb-0">
              <div className="search-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link href="#" className="btn-searchset">
                  <i className="isax isax-search-normal fs-12"></i>
                </Link>
              </div>
            </div>
            <Link
              className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#customcanvas"
            >
              <i className="isax isax-filter me-1"></i>Filter
            </Link  >
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="dropdown">
              <Link href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="isax isax-sort me-1"></i>Sort By :
                <span className="fw-normal ms-1">Latest</span>
              </Link  >
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={() => handleSort('date')}>
                    {sortConfig.key === 'date' && sortConfig.direction === 'desc' ? (<b>Latest</b>) : 'Latest'}
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSort('date')}>
                    {sortConfig.key === 'date' && sortConfig.direction === 'asc' ? (<b>Oldest</b>) : 'Oldest'}
                  </button>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <Link
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                <i className="isax isax-grid-3 me-1"></i>Column
              </Link  >
              <ul className="dropdown-menu dropdown-menu">
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.supplier} onChange={() => toggleColumn('supplier')} />
                    <span>Vendor</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.phone} onChange={() => toggleColumn('phone')} />
                    <span>Phone</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.createdOn} onChange={() => toggleColumn('createdOn')} />
                    <span>Created On</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.balance} onChange={() => toggleColumn('balance')} />
                    <span>Balance</span>
                  </label>
                </li>
                <li>
                  <label className="dropdown-item d-flex align-items-center form-switch">
                    <i className="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input className="form-check-input m-0 me-2" type="checkbox" checked={columns.currency} onChange={() => toggleColumn('currency')} />
                    <span>Currency</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="align-items-center gap-2 flex-wrap filter-info mt-3">
          <h6 className="fs-13 fw-semibold">Filters</h6>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            Suppliers Selected
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span className="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span className="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            $10,000 - $25,500
            <span className="ms-1 tag-close">
              <i className="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <Link href="#" className="link-danger fw-medium text-decoration-underline ms-md-1">
            Clear All
          </Link  >
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-nowrap datatable">
          <thead>
            <tr>
              <th className="no-sort">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" id="select-all" />
                </div>
              </th>
              {columns.supplier && <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>Supplier</th>}
              {columns.phone && <th>Phone</th>}
              {columns.createdOn && <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>Created On</th>}
              {columns.balance && <th onClick={() => handleSort('balance')} style={{ cursor: 'pointer' }}>Balance</th>}
              {columns.currency && <th>Currency</th>}
              <th className="no-sort">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">No suppliers found.</td>
              </tr>
            ) : (
              filteredSuppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedSuppliers.includes(supplier.id)}
                        onChange={() => handleSupplierToggle(supplier.id)}
                      />
                    </div>
                  </td>
                  {columns.supplier && (
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-sm rounded-circle me-2 flex-shrink-0" data-bs-toggle="modal" data-bs-target="#ledger_modal" style={{ cursor: 'pointer' }}>
                          <img
                            src={supplier.image || "/assets/img/profiles/avatar-17.jpg"}
                            className="rounded-circle"
                            alt="img"
                          />
                        </span>
                        <div>
                          <h6 className="fs-14 fw-medium mb-0">
                            <span data-bs-toggle="modal" data-bs-target="#ledger_modal" style={{ cursor: 'pointer', color: '#0d6efd' }}>
                              {supplier.name}
                            </span>
                          </h6>
                        </div>
                      </div>
                    </td>
                  )}
                  {columns.phone && <td>{supplier.phone}</td>}
                  {columns.createdOn && <td>{supplier.date}</td>}
                  {columns.balance && <td className="text-dark">${supplier.balance.toLocaleString()}</td>}
                  {columns.currency && <td>{supplier.currency}</td>}

                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-soft-info"
                        data-bs-toggle="modal"
                        data-bs-target="#ledger_modal"
                      >
                        <i className="isax isax-eye"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-soft-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_modal"
                        onClick={() => handleEditClick(supplier)}
                      >
                        <i className="isax isax-edit-2"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-soft-danger"
                        onClick={() => handleDelete(supplier.id)}
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
      <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id="customcanvas">
        <div className="offcanvas-header d-block pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
            <h6 className="offcanvas-title">Filter</h6>
            <button
              type="button"
              className="btn-close custom-btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
        <div className="offcanvas-body pt-3">
          <form action="#">
            <div className="mb-3">
              <label className="form-label">Supplier</label>
              <div className="dropdown">
                <Link href="#"
                  className="dropdown-toggle form-control d-flex align-items-center"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link  >
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <div className="mb-3">
                    <div className="input-icon-start position-relative">
                      <span className="input-icon-addon fs-12">
                        <i className="isax isax-search-normal"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <ul className="mb-3">
                    <li className="d-flex align-items-center justify-content-between mb-3">
                      <label className="d-inline-flex align-items-center text-gray-9">
                        <input className="form-check-input select-all m-0 me-2" type="checkbox" />{' '}
                        Select All
                      </label>
                      <Link href="#" className="link-danger fw-medium text-decoration-underline">
                        Reset
                      </Link  >
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-17.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Emma Rose
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-05.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Ethan James
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-12.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Olivia Grace
                      </label>
                    </li>
                    <li>
                      <label className="dropdown-item px-2 d-flex align-items-center text-dark">
                        <input className="form-check-input m-0 me-2" type="checkbox" />
                        <span className="avatar avatar-sm rounded-circle me-2">
                          <img
                            src="/assets/img/profiles/avatar-29.jpg"
                            className="flex-shrink-0 rounded-circle"
                            alt="img"
                          />
                        </span>
                        Liam Michael
                      </label>
                    </li>
                  </ul>
                  <div className="row g-2">
                    <div className="col-6">
                      <Link href="#" className="btn btn-outline-white w-100 close-filter">
                        Cancel
                      </Link  >
                    </div>
                    <div className="col-6">
                      <Link href="#" className="btn btn-primary w-100">
                        Select
                      </Link  >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Date Range</label>
              <div className="input-group position-relative">
                <input type="text" className="form-control date-range bookingrange rounded-end" />
                <span className="input-icon-addon fs-16 text-gray-9">
                  <i className="isax isax-calendar-2"></i>
                </span>
              </div>
            </div>
            <div className="mb-0">
              <label className="form-label">Amount</label>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle form-control d-flex align-items-center"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="true"
                >
                  Select
                </Link  >
                <div className="dropdown-menu shadow-lg w-100 dropdown-info">
                  <div className="filter-range">
                    <input type="text" id="range_03" />
                    <p>
                      Range :<span className="text-gray-9">Range : $200 - $5695</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="offcanvas-footer">
              <div className="row g-2">
                <div className="col-6">
                  <Link href="#" className="btn btn-outline-white w-100">
                    Reset
                  </Link  >
                </div>
                <div className="col-6">
                  <button
                    data-bs-dismiss="offcanvas"
                    className="btn btn-primary w-100"
                    id="filter-submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div id="add_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Supplier</h4>
              <button
                type="button"
                className="btn-close custom-btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <input type="text" className="form-control" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-0">
                      <label className="form-label">Balance</label>
                      <input type="number" className="form-control" value={formData.balance || ''} onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })} required />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="edit_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Supplier</h4>
              <button
                type="button"
                className="btn-close custom-btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <input type="text" className="form-control" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-0">
                      <label className="form-label">Balance</label>
                      <input type="number" className="form-control" value={formData.balance || ''} onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })} required />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Supplier</h6>
              <p className="mb-3">Are you sure, you want to delete supplier?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link  >
                <Link to="/suppliers" className="btn btn-primary">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="ledger_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Supplier Ledger</h4>
              <button
                type="button"
                className="btn-close custom-btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <Link href="#"
                            className="btn btn-outline-white btn-sm d-flex align-items-center fw-semibold"
                          >
                            <i className="isax isax-export-1 me-1"></i>Print
                          </Link  >
                          <Link href="#"
                            className="btn btn-outline-white btn-sm d-flex align-items-center fw-semibold"
                          >
                            <i className="isax isax-export-1 me-1"></i>Download
                          </Link  >
                        </div>
                        <div>
                          <Link href="#"
                            className="btn btn-primary btn-sm d-flex align-items-center fw-semibold"
                            data-bs-toggle="modal"
                            data-bs-target="#add_ledger"
                          >
                            <i className="isax isax-add-circle5 me-1"></i>Create Ledger
                          </Link  >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <div className="supplier-details d-flex align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg border border-dashed bg-light me-3 flex-shrink-0">
                            <img
                              src="/assets/img/profiles/avatar-16.jpg"
                              alt="image"
                              className="rounded-circle"
                            />
                          </div>
                          <div className="d-inline-flex flex-column align-items-start">
                            <h6 className="fw-medium fs-14">Mitchel Johnson</h6>
                            <p></p>
                          </div>
                        </div>
                        <div>
                          <div className="p-1 bg-white rounded d-flex align-items-center fw-semibold text-gray-9">
                            <i className="isax isax-refresh-circle5 text-info me-1"></i>Closing
                            Balance : $400
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 justify-content-end mb-3">
                        <span className="badge badge-sm badge-soft-success d-inline-flex">
                          Credit
                        </span>
                        <span className="badge badge-sm badge-soft-danger d-inline-flex">
                          Debit
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive border border-bottom-0">
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th>ID</th>
                        <th>Reference</th>
                        <th>Date</th>
                        <th>Payment Mode</th>
                        <th>Amount</th>
                        <th>Closing Balance</th>
                        <th className="no-sort"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h6 className="fw-medium fs-14">PAYOUT -1</h6>
                        </td>
                        <td>#987654</td>
                        <td>22 Feb 2025</td>
                        <td>Cash</td>
                        <td>
                          <span className="text-danger">$10,000</span>
                        </td>
                        <td>$5,000</td>
                        <td className="action-item">
                          <Link href="#" data-bs-toggle="dropdown">
                            <i className="isax isax-more"></i>
                          </Link  >
                          <ul className="dropdown-menu">
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_ledger"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link  >
                            </li>
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal_2"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link  >
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-medium fs-14">PAYOUT -2</h6>
                        </td>
                        <td>#654829</td>
                        <td>07 Feb 2025</td>
                        <td>Cheque</td>
                        <td>
                          <span className="text-danger">$25,750</span>
                        </td>
                        <td>$10,750</td>
                        <td className="action-item">
                          <Link href="#" data-bs-toggle="dropdown">
                            <i className="isax isax-more"></i>
                          </Link  >
                          <ul className="dropdown-menu">
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_ledger"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link  >
                            </li>
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal_2"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link  >
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-medium fs-14">PAYIN -1</h6>
                        </td>
                        <td>#910274</td>
                        <td>30 Jan 2025</td>
                        <td>Bank Transfer</td>
                        <td>
                          <span className="text-success">$50,125</span>
                        </td>
                        <td>$20,000</td>
                        <td className="action-item">
                          <Link href="#" data-bs-toggle="dropdown">
                            <i className="isax isax-more"></i>
                          </Link  >
                          <ul className="dropdown-menu">
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_ledger"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link  >
                            </li>
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal_2"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link  >
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-medium fs-14">PAYIN -2</h6>
                        </td>
                        <td>#837419</td>
                        <td>17 Jan 2025</td>
                        <td>Paypal</td>
                        <td>
                          <span className="text-success">$75,900</span>
                        </td>
                        <td>$50,000</td>
                        <td className="action-item">
                          <Link href="#" data-bs-toggle="dropdown">
                            <i className="isax isax-more"></i>
                          </Link  >
                          <ul className="dropdown-menu">
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_ledger"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link  >
                            </li>
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal_2"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link  >
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-medium fs-14">PAYOUT -3</h6>
                        </td>
                        <td>#983928</td>
                        <td>09 Dec 2024</td>
                        <td>Stripe</td>
                        <td>
                          <span className="text-danger">$1,20,500</span>
                        </td>
                        <td>$60,000</td>
                        <td className="action-item">
                          <Link href="#" data-bs-toggle="dropdown">
                            <i className="isax isax-more"></i>
                          </Link  >
                          <ul className="dropdown-menu">
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_ledger"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link  >
                            </li>
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal_2"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link  >
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-medium fs-14">PAYOUT -4</h6>
                        </td>
                        <td>#989479</td>
                        <td>02 Dec 2024</td>
                        <td>Cash</td>
                        <td>
                          <span className="text-success">$2,50,000</span>
                        </td>
                        <td>$1,25,000</td>
                        <td className="action-item">
                          <Link href="#" data-bs-toggle="dropdown">
                            <i className="isax isax-more"></i>
                          </Link  >
                          <ul className="dropdown-menu">
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_ledger"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link  >
                            </li>
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal_2"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link  >
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-medium fs-14">PAYIN -3</h6>
                        </td>
                        <td>#989479</td>
                        <td>15 Nov 2024</td>
                        <td>Cheque</td>
                        <td>
                          <span className="text-danger">$5,00,750</span>
                        </td>
                        <td>$5,00,000</td>
                        <td className="action-item">
                          <Link href="#" data-bs-toggle="dropdown">
                            <i className="isax isax-more"></i>
                          </Link  >
                          <ul className="dropdown-menu">
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_ledger"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link  >
                            </li>
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal_2"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link  >
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-medium fs-14">PAYIN -4</h6>
                        </td>
                        <td>#994286</td>
                        <td>30 Nov 2024</td>
                        <td>Bank Transfer</td>
                        <td>
                          <span className="text-success">$7,50,300</span>
                        </td>
                        <td>$2,50,500</td>
                        <td className="action-item">
                          <Link href="#" data-bs-toggle="dropdown">
                            <i className="isax isax-more"></i>
                          </Link  >
                          <ul className="dropdown-menu">
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_ledger"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link  >
                            </li>
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal_2"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link  >
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="fw-medium fs-14">PAYOUT -5</h6>
                        </td>
                        <td>#755815</td>
                        <td>12 Oct 2024</td>
                        <td>Paypal</td>
                        <td>
                          <span className="text-danger">$9,99,999</span>
                        </td>
                        <td>$2,50,500</td>
                        <td className="action-item">
                          <Link href="#" data-bs-toggle="dropdown">
                            <i className="isax isax-more"></i>
                          </Link  >
                          <ul className="dropdown-menu">
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#edit_ledger"
                              >
                                <i className="isax isax-edit me-2"></i>Edit
                              </Link  >
                            </li>
                            <li>
                              <Link href="#"
                                className="dropdown-item d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal_2"
                              >
                                <i className="isax isax-trash me-2"></i>Delete
                              </Link  >
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="4" className="bg-light">
                          <h6 className="fw-medium fs-14"></h6>
                          Closing Balance as on 22 Feb 2025
                        </td>
                        <td className="bg-light">
                          <h6 className="fw-medium fs-14">$5,00,750</h6>
                        </td>
                        <td className="bg-light">
                          <h6 className="fw-medium fs-14">$2,50,000</h6>
                        </td>
                        <td className="bg-light"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="add_ledger" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Ledger</h4>
              <button
                type="button"
                className="btn-close custom-btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Amount</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Date</label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="25 Mar 2025"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Reference</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <label className="form-label">Mode</label>
                      <div className="d-flex align-items-center gap-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Credit
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Debit
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="edit_ledger" className="modal fade">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Ledger</h4>
              <button
                type="button"
                className="btn-close custom-btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Amount</label>
                      <input type="text" className="form-control" value="$450" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Date</label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="25 Mar 2025"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Reference</label>
                      <input type="text" className="form-control" value="#987654" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <label className="form-label">Mode</label>
                      <div className="d-flex align-items-center gap-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault3"
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault3">
                            Credit
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault4"
                            checked
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault4">
                            Debit
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="delete_modal_2">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="img" />
              </div>
              <h6 className="mb-1">Delete Ledger</h6>
              <p className="mb-3">Are you sure, you want to delete Ledger?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link  >
                <Link to="/suppliers" className="btn btn-primary">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Suppliers;
