import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';

const UOM = () => {
  const [uoms, setUoms] = useState([]);
  const [filteredUoms, setFilteredUoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedUoms, setSelectedUoms] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null, isBulk: false });
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    uom_type: 'QUANTITY',
  });

  const UOM_TYPES = [
    { value: 'QUANTITY', label: 'Quantity' },
    { value: 'WEIGHT', label: 'Weight' },
    { value: 'VOLUME', label: 'Volume' },
    { value: 'LENGTH', label: 'Length' },
    { value: 'AREA', label: 'Area' },
    { value: 'UNIT', label: 'Unit' },
  ];

  const PRE_SEEDED_UOMS = [
    { name: 'Number', symbol: 'NOS', uom_type: 'QUANTITY' },
    { name: 'Kilogram', symbol: 'KG', uom_type: 'WEIGHT' },
    { name: 'Gram', symbol: 'GMS', uom_type: 'WEIGHT' },
    { name: 'Liter', symbol: 'LTR', uom_type: 'VOLUME' },
    { name: 'Milliliter', symbol: 'ML', uom_type: 'VOLUME' },
    { name: 'Meter', symbol: 'MTR', uom_type: 'LENGTH' },
    { name: 'Centimeter', symbol: 'CM', uom_type: 'LENGTH' },
    { name: 'Box', symbol: 'BOX', uom_type: 'UNIT' },
    { name: 'Carton', symbol: 'CTN', uom_type: 'UNIT' },
    { name: 'Dozen', symbol: 'DZN', uom_type: 'QUANTITY' },
    { name: 'Pair', symbol: 'PRS', uom_type: 'QUANTITY' },
    { name: 'Square Feet', symbol: 'SFT', uom_type: 'AREA' },
    { name: 'Square Meter', symbol: 'SQM', uom_type: 'AREA' },
    { name: 'Bag', symbol: 'BAG', uom_type: 'UNIT' },
    { name: 'Tablet', symbol: 'TAB', uom_type: 'UNIT' },
  ];

  useEffect(() => {
    loadUoms();
  }, []);

  useEffect(() => {
    filterAndSortUoms();
  }, [uoms, searchTerm, sortBy]);

  const loadUoms = () => {
    const storedUoms = JSON.parse(localStorage.getItem('uoms') || '[]');
    if (storedUoms.length === 0) {
      initializePreSeededUoms();
    } else {
      setUoms(storedUoms);
    }
  };

  const initializePreSeededUoms = () => {
    const preSeededWithIds = PRE_SEEDED_UOMS.map((uom, index) => ({
      id: index + 1,
      ...uom,
      createdAt: new Date().toISOString(),
    }));
    localStorage.setItem('uoms', JSON.stringify(preSeededWithIds));
    setUoms(preSeededWithIds);
  };

  const filterAndSortUoms = () => {
    let filtered = uoms.filter(uom =>
      uom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uom.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredUoms(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.symbol.trim()) {
      toast.error('Unit Name and Symbol are required', { position: 'top-right', autoClose: 3000 });
      return;
    }

    if (editingId) {
      const updatedUoms = uoms.map(uom =>
        uom.id === editingId
          ? { ...formData, id: editingId, updatedAt: new Date().toISOString() }
          : uom
      );
      localStorage.setItem('uoms', JSON.stringify(updatedUoms));
      setUoms(updatedUoms);
      toast.success('UOM updated successfully!', { position: 'top-right', autoClose: 3000 });
    } else {
      const newUom = {
        id: Math.max(...uoms.map(u => u.id), 0) + 1,
        ...formData,
        createdAt: new Date().toISOString(),
      };
      const updatedUoms = [...uoms, newUom];
      localStorage.setItem('uoms', JSON.stringify(updatedUoms));
      setUoms(updatedUoms);
      toast.success('UOM created successfully!', { position: 'top-right', autoClose: 3000 });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', symbol: '', uom_type: 'QUANTITY' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (uom) => {
    setFormData(uom);
    setEditingId(uom.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id, isBulk: false });
  };

  const confirmDelete = () => {
    if (confirmDialog.isBulk) {
      const updatedUoms = uoms.filter(uom => !selectedUoms.has(uom.id));
      localStorage.setItem('uoms', JSON.stringify(updatedUoms));
      setUoms(updatedUoms);
      setSelectedUoms(new Set());
      toast.success('Selected UOMs deleted successfully!', { position: 'top-right', autoClose: 3000 });
    } else {
      const updatedUoms = uoms.filter(uom => uom.id !== confirmDialog.id);
      localStorage.setItem('uoms', JSON.stringify(updatedUoms));
      setUoms(updatedUoms);
      toast.success('UOM deleted successfully!', { position: 'top-right', autoClose: 3000 });
    }
    setConfirmDialog({ isOpen: false, id: null, isBulk: false });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUoms(new Set(uoms.map(uom => uom.id)));
    } else {
      setSelectedUoms(new Set());
    }
  };

  const handleSelectUom = (id) => {
    const newSelected = new Set(selectedUoms);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedUoms(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedUoms.size === 0) {
      toast.warning('Please select UOMs to delete', { position: 'top-right', autoClose: 3000 });
      return;
    }
    setConfirmDialog({ isOpen: true, id: null, isBulk: true });
  };

  const getUomTypeLabel = (type) => {
    const typeObj = UOM_TYPES.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null, isBulk: false })}
        onConfirm={confirmDelete}
        title={confirmDialog.isBulk ? "Delete Selected UOMs" : "Delete UOM"}
        message={
          confirmDialog.isBulk
            ? `Are you sure you want to delete ${selectedUoms.size} selected UOM(s)? This action cannot be undone.`
            : "Are you sure you want to delete this UOM? This action cannot be undone."
        }
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Units of Measurement (UOM)</h6>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-divide mb-0">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="isax isax-home-2 me-1"></i>Home
                </Link>
              </li>
              <li className="breadcrumb-item active">UOM</li>
            </ol>
          </nav>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="isax isax-add-circle5 me-1"></i>
          {showForm ? 'Cancel' : 'Add UOM'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="mb-3">{editingId ? 'Edit UOM' : 'Add New UOM'}</h6>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Unit Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Kilogram"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Symbol *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="symbol"
                      value={formData.symbol}
                      onChange={handleInputChange}
                      placeholder="e.g., KG"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Type *</label>
                    <select
                      className="form-control"
                      name="uom_type"
                      value={formData.uom_type}
                      onChange={handleInputChange}
                      required
                    >
                      {UOM_TYPES.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
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
                  {editingId ? 'Update UOM' : 'Add UOM'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!showForm && (
        <>
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center flex-wrap gap-2">
                <div className="table-search d-flex align-items-center mb-0">
                  <div className="search-input">
                    <i className="isax isax-search-normal fs-12"></i>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by name or symbol..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                {selectedUoms.size > 0 && (
                  <button
                    className="btn btn-outline-danger d-inline-flex align-items-center"
                    onClick={handleDeleteSelected}
                  >
                    <i className="isax isax-trash me-1"></i>Delete ({selectedUoms.size})
                  </button>
                )}
              </div>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <i className="isax isax-sort me-1"></i>Sort By :{' '}
                  <span className="fw-normal ms-1">
                    {sortBy === 'latest' ? 'Latest' : sortBy === 'oldest' ? 'Oldest' : 'Name'}
                  </span>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link href="#" className="dropdown-item" onClick={() => setSortBy('latest')}>
                      Latest
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item" onClick={() => setSortBy('oldest')}>
                      Oldest
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item" onClick={() => setSortBy('name')}>
                      Name
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {filteredUoms.length === 0 ? (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="isax isax-ruler-2 fs-1 text-muted mb-3 d-block"></i>
                <h6 className="mb-2">No UOMs Found</h6>
                <p className="text-muted">No UOMs match your search</p>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-nowrap">
                <thead className="thead-light">
                  <tr>
                    <th className="no-sort">
                      <div className="form-check form-check-md">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedUoms.size === filteredUoms.length && filteredUoms.length > 0}
                        />
                      </div>
                    </th>
                    <th>Unit Name</th>
                    <th>Symbol</th>
                    <th>Type</th>
                    <th className="no-sort">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUoms.map((uom) => (
                    <tr key={uom.id}>
                      <td>
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedUoms.has(uom.id)}
                            onChange={() => handleSelectUom(uom.id)}
                          />
                        </div>
                      </td>
                      <td>
                        <h6 className="fs-14 fw-medium mb-0">{uom.name}</h6>
                      </td>
                      <td>
                        <span className="badge bg-light-primary">{uom.symbol}</span>
                      </td>
                      <td>
                        <span className="badge bg-light-info">{getUomTypeLabel(uom.uom_type)}</span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-icon btn-soft-primary"
                            onClick={() => handleEdit(uom)}
                            title="Edit"
                          >
                            <i className="isax isax-edit-25"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-icon btn-soft-danger"
                            onClick={() => handleDelete(uom.id)}
                            title="Delete"
                          >
                            <i className="isax isax-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-3 text-muted fs-12">
            Showing {filteredUoms.length} of {uoms.length} UOMs
          </div>
        </>
      )}
    </>
  );
};

export default UOM;
