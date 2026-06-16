import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const Units = () => {
  const [units, setUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    isDerived: false,
    baseUnitId: '',
    conversionFactor: '',
    active: true,
  });

  useEffect(() => {
    const storedUnits = localStorage.getItem('units');
    if (storedUnits) {
      setUnits(JSON.parse(storedUnits));
    } else {
      const defaultUnits = [
        { id: 1, name: 'Kilogram', shortName: 'kg', active: true },
        { id: 2, name: 'Gram', shortName: 'g', active: true },
        { id: 3, name: 'Liter', shortName: 'l', active: true },
        { id: 4, name: 'Millimetre', shortName: 'ml', active: true },
        { id: 5, name: 'Box', shortName: 'bx', active: true },
        { id: 6, name: 'Pack', shortName: 'pk', active: true },
        { id: 7, name: 'Piece', shortName: 'pc', active: true },
      ];
      localStorage.setItem('units', JSON.stringify(defaultUnits));
      setUnits(defaultUnits);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.shortName.trim()) {
      toast.error('Unit Name and Short Name are required', { position: 'top-right', autoClose: 3000 });
      return;
    }

    if (editingId) {
      const updatedUnits = units.map((unit) =>
        unit.id === editingId ? { ...formData, id: editingId } : unit
      );
      localStorage.setItem('units', JSON.stringify(updatedUnits));
      setUnits(updatedUnits);
      toast.success('Unit updated successfully!', { position: 'top-right', autoClose: 3000 });
    } else {
      const newUnit = {
        id: Math.max(...units.map((u) => u.id), 0) + 1,
        ...formData,
      };
      const updatedUnits = [...units, newUnit];
      localStorage.setItem('units', JSON.stringify(updatedUnits));
      setUnits(updatedUnits);
      toast.success('Unit created successfully!', { position: 'top-right', autoClose: 3000 });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ 
      name: '', 
      shortName: '', 
      isDerived: false, 
      baseUnitId: '', 
      conversionFactor: '', 
      active: true 
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (unit) => {
    setFormData(unit);
    setEditingId(unit.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const confirmDelete = () => {
    const updatedUnits = units.filter((unit) => unit.id !== confirmDialog.id);
    localStorage.setItem('units', JSON.stringify(updatedUnits));
    setUnits(updatedUnits);
    toast.success('Unit deleted successfully!', { position: 'top-right', autoClose: 3000 });
    setConfirmDialog({ isOpen: false, id: null });
  };

  const filteredUnits = units.filter(
    (unit) =>
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Unit"
        message="Are you sure you want to delete this unit? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Units</h6>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div>
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => setShowForm(!showForm)}
            >
              <i className="isax isax-add-circle5 me-1"></i>
              {showForm ? 'Cancel' : 'New Unit'}
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="mb-3">{editingId ? 'Edit Unit' : 'Add New Unit'}</h6>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-5">
                  <div className="mb-3">
                    <label className="form-label">
                      Unit Name <span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Kilogram"
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="mb-3">
                    <label className="form-label">
                      Short Name <span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="shortName"
                      value={formData.shortName}
                      onChange={handleInputChange}
                      placeholder="e.g., kg"
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-5">
                  <div className="form-check form-switch mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      name="isDerived"
                      checked={formData.isDerived}
                      onChange={handleInputChange}
                      id="isDerivedSwitch"
                    />
                    <label className="form-check-label fw-medium ms-2" htmlFor="isDerivedSwitch">
                      This is a Secondary Unit (e.g. Box, KG)
                    </label>
                  </div>
                </div>
              </div>

              {formData.isDerived && (
                <div className="row mb-3 p-3 bg-light rounded border mx-1">
                  <div className="col-md-5">
                    <label className="form-label">Base Unit (Smallest Unit)</label>
                    <select 
                      className="form-control"
                      name="baseUnitId"
                      value={formData.baseUnitId}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Base Unit</option>
                      {units.filter(u => u.id !== editingId && !u.isDerived).map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.shortName})</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-5">
                    <label className="form-label">Conversion Factor (Multiplier)</label>
                    <div className="input-group">
                      <span className="input-group-text">1 {formData.name || 'Unit'} = </span>
                      <input 
                        type="number" 
                        className="form-control"
                        name="conversionFactor"
                        value={formData.conversionFactor}
                        onChange={handleInputChange}
                        placeholder="e.g. 25"
                      />
                      <span className="input-group-text">
                        {formData.baseUnitId ? units.find(u => u.id == formData.baseUnitId)?.shortName : 'Base Units'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-md-2">
                  <div className="form-check form-switch mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      name="active"
                      checked={formData.active}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label ms-2">Active</label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Unit' : 'Add Unit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!showForm && (
        <>
          {/* Search */}
          <div className="row mb-3">
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="isax isax-search-normal fs-12"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0 bg-white"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive border border-bottom-0 rounded">
            <table className="table table-nowrap m-0">
              <thead className="table-light">
                <tr>
                  <th>Unit Name</th>
                  <th>Short Name</th>
                  <th>Conversion Relationship</th>
                  <th className="no-sort text-center">Active</th>
                  <th className="no-sort text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUnits.map((unit) => (
                  <tr key={unit.id}>
                    <td>
                      <h6 className="fs-14 fw-medium mb-0">{unit.name}</h6>
                    </td>
                    <td>{unit.shortName}</td>
                    <td>
                      {unit.isDerived && unit.baseUnitId ? (
                        <span className="badge badge-soft-info border border-info border-opacity-25 fs-12">
                          1 {unit.shortName} = {unit.conversionFactor} {units.find(u => u.id == unit.baseUnitId)?.shortName}
                        </span>
                      ) : (
                        <span className="text-muted fs-12 italic">Base Unit</span>
                      )}
                    </td>
                    <td className="text-center">
                      <div className="form-check form-switch d-inline-block">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked={unit.active}
                          readOnly
                        />
                      </div>
                    </td>
                     <td className="text-end pe-4">
                      <div className="d-flex justify-content-end align-items-center gap-2">
                        <button 
                          className="btn btn-sm btn-soft-warning border-0" 
                          onClick={() => handleEdit(unit)}
                          title="Edit Unit"
                        >
                          <i className="isax isax-edit-2 fs-16"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-soft-danger border-0" 
                          onClick={() => handleDelete(unit.id)}
                          title="Delete Unit"
                        >
                          <i className="isax isax-trash fs-16"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}


    </div>
  );
};

export default Units;
