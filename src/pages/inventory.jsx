import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import PageHeader from '../components/common/PageHeader';
import FilterControls from '../components/common/FilterControls';
import DataTable from '../components/common/DataTable';

const Inventory = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Latest');
  const [visibleColumns, setVisibleColumns] = useState({
    product: true,
    code: true,
    unit: true,
    quantity: true,
    sellingPrice: true,
    purchasePrice: false,
    status: false,
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });

  const [formData, setFormData] = useState({
    name: '', code: '', unit: 'Piece', quantity: '', sellingPrice: '', purchasePrice: '', type: 'Product', status: 'Stock In', image: '/assets/img/products/product-01.jpg',
  });

  useEffect(() => {
    const storedInventory = localStorage.getItem('inventory');
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    } else {
      const defaultInventory = [
        { id: 1, name: 'Apple iPhone 15', code: 'PR00025', unit: 'Piece', quantity: 2, sellingPrice: 100, purchasePrice: 98, image: '/assets/img/products/product-01.jpg', type: 'Product', status: 'Stock In' },
        { id: 2, name: 'Dell XPS 13 9310', code: 'PR00014', unit: 'Piece', quantity: 12, sellingPrice: 25, purchasePrice: 24, image: '/assets/img/products/product-02.jpg', type: 'Product', status: 'Stock In' },
        { id: 3, name: 'Bose QuietComfort 45', code: 'PR00012', unit: 'Piece', quantity: 2, sellingPrice: 34, purchasePrice: 58, image: '/assets/img/products/product-03.jpg', type: 'Product', status: 'Stock In' },
        { id: 4, name: 'Nike Dri-FIT T-shirt', code: 'PR00016', unit: 'Pack', quantity: 24, sellingPrice: 75, purchasePrice: 72, image: '/assets/img/products/product-04.jpg', type: 'Product', status: 'Stock In' },
        { id: 5, name: 'Adidas Ultraboost', code: 'PR00022', unit: 'Pack', quantity: 13, sellingPrice: 9, purchasePrice: 89, image: '/assets/img/products/product-05.jpg', type: 'Product', status: 'Stock In' },
        { id: 6, name: 'Samsung French Door Refrigerator', code: 'PR00047', unit: 'Litre', quantity: 67, sellingPrice: 120, purchasePrice: 115, image: '/assets/img/products/product-06.jpg', type: 'Product', status: 'Stock In' },
        { id: 7, name: 'Dyson V15 Detect Vacuum Cleaner', code: 'PR00014', unit: 'Piece', quantity: 13, sellingPrice: 250, purchasePrice: 240, image: '/assets/img/products/product-07.jpg', type: 'Product', status: 'Stock In' },
        { id: 8, name: 'HP Spectre x360 14', code: 'PR00031', unit: 'Piece', quantity: 25, sellingPrice: 541, purchasePrice: 525, image: '/assets/img/products/product-08.jpg', type: 'Product', status: 'Stock In' },
      ];
      localStorage.setItem('inventory', JSON.stringify(defaultInventory));
      setInventory(defaultInventory);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      toast.error('Item Name and Code are required');
      return;
    }
    if (editingId) {
      const updated = inventory.map((item) =>
        item.id === editingId ? { ...formData, id: editingId } : item
      );
      localStorage.setItem('inventory', JSON.stringify(updated));
      setInventory(updated);
      toast.success('Inventory updated successfully!');
    } else {
      const newItem = {
        id: Math.max(...inventory.map((i) => i.id), 0) + 1,
        ...formData,
      };
      const updated = [...inventory, newItem];
      localStorage.setItem('inventory', JSON.stringify(updated));
      setInventory(updated);
      toast.success('Inventory created successfully!');
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '', code: '', unit: 'Piece', quantity: '', sellingPrice: '', purchasePrice: '', type: 'Product', status: 'Stock In', image: '/assets/img/products/product-01.jpg',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const confirmDelete = () => {
    const updated = inventory.filter((item) => item.id !== confirmDialog.id);
    localStorage.setItem('inventory', JSON.stringify(updated));
    setInventory(updated);
    toast.success('Inventory deleted successfully!');
    setConfirmDialog({ isOpen: false, id: null });
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => sortBy === 'Latest' ? b.id - a.id : a.id - b.id);

  const columns = [
    {
      id: 'product',
      label: 'Product/Service',
      render: (_, row) => (
        <div className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-sm rounded-circle me-2 flex-shrink-0">
            <img src={row.image} className="rounded-circle" alt="img" />
          </Link>
          <div>
            <h6 className="fs-14 fw-medium mb-0">
              <Link to="#" onClick={(e) => e.preventDefault()}>{row.name}</Link>
            </h6>
          </div>
        </div>
      )
    },
    { id: 'code', label: 'Code', render: (val) => <Link to="#" className="link-default">{val}</Link> },
    { id: 'unit', label: 'Unit', render: (val) => <span className="text-dark">{val}</span> },
    { id: 'quantity', label: 'Quantity' },
    { id: 'sellingPrice', label: 'Selling Price', render: (val) => <span className="text-dark">${val}</span> },
    { id: 'purchasePrice', label: 'Purchase Price', render: (val) => <span className="text-dark">${val}</span> },
    {
      id: 'status',
      label: 'Status',
      render: (val) => <span className={`badge ${val === 'Stock In' ? 'bg-light-success' : 'bg-light-danger'}`}>{val}</span>
    },
    {
      id: 'operations',
      label: 'Operations',
      render: (_, row) => (
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-sm btn-soft-primary border-0 d-inline-flex align-items-center me-1 fs-12 fw-regular" 
            onClick={() => navigate(`/stock-history?item_id=${row.id}&name=${row.name}`)}
          >
            <i className="isax isax-document-sketch5 me-1"></i> History
          </button>
          <button className="btn btn-sm btn-soft-success border-0 d-inline-flex align-items-center me-1 fs-12 fw-regular" onClick={() => toast.success('Stock In initiated')}>
            <i className="isax isax-document-sketch5 me-1"></i> Stock In
          </button>
          <button className="btn btn-sm btn-soft-danger border-0 d-inline-flex align-items-center fs-12 fw-regular" onClick={() => toast.warning('Stock Out initiated')}>
            <i className="isax isax-document-sketch5 me-1"></i> Stock Out
          </button>
        </div>
      )
    },
    {
      id: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-icon btn-soft-primary" onClick={() => handleEdit(row)} title="Edit">
            <i className="isax isax-edit-25"></i>
          </button>
          <button className="btn btn-sm btn-icon btn-soft-danger" onClick={() => handleDelete(row.id)} title="Delete">
            <i className="isax isax-trash"></i>
          </button>
        </div>
      )
    }
  ];

  const headerActions = [
    { type: 'export' },
    { type: 'button', label: showForm ? 'Cancel' : 'New Inventory', icon: 'isax isax-add-circle5', variant: 'primary', onClick: () => setShowForm(!showForm) }
  ];

  return (
    <>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Inventory Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />

      <PageHeader title="Inventory" actions={headerActions} />

      {showForm && (
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="mb-3">{editingId ? 'Edit Inventory' : 'Add New Inventory'}</h6>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Item Type <span className="text-danger">*</span></label>
                  <div className="d-flex align-items-center">
                    <div className="form-check me-3">
                      <input className="form-check-input" type="radio" name="type" id="typeProd" value="Product" checked={formData.type === 'Product'} onChange={handleInputChange} />
                      <label className="form-check-label" htmlFor="typeProd">Product</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type" id="typeServ" value="Service" checked={formData.type === 'Service'} onChange={handleInputChange} />
                      <label className="form-check-label" htmlFor="typeServ">Service</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Item Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Apple iPhone 15" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Code <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="code" value={formData.code} onChange={handleInputChange} placeholder="e.g. PR00025" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Unit <span className="text-danger">*</span></label>
                  <select className="form-select" name="unit" value={formData.unit} onChange={handleInputChange}>
                    <option value="Piece">Piece</option>
                    <option value="Box">Box</option>
                    <option value="Pack">Pack</option>
                    <option value="Litre">Litre</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Quantity <span className="text-danger">*</span></label>
                  <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="0" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Selling Price ($)</label>
                  <input type="number" className="form-control" name="sellingPrice" value={formData.sellingPrice} onChange={handleInputChange} placeholder="0" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Purchase Price ($)</label>
                  <input type="number" className="form-control" name="purchasePrice" value={formData.purchasePrice} onChange={handleInputChange} placeholder="0" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Status <span className="text-danger">*</span></label>
                  <select className="form-select" name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Stock In">Stock In</option>
                    <option value="Stock Out">Stock Out</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingId ? 'Update Inventory' : 'Add Inventory'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!showForm && (
        <>
          <FilterControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchPlaceholder="Search Inventory..."
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOptions={['Latest', 'Oldest']}
            visibleColumns={visibleColumns}
            toggleColumn={toggleColumn}
            showFilter={false}
          />

          <DataTable
            columns={columns}
            data={filteredInventory}
            visibleColumns={visibleColumns}
            emptyMessage="No Inventory Found"
          />
        </>
      )}
    </>
  );
};

export default Inventory;
