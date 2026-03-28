import { useState, useEffect, useCallback } from 'react';
import HSNSACForm from '../components/HSNSACForm';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import { getHsnSacCodes, createHsnSacCode, updateHsnSacCode, deleteHsnSacCode } from '../services/hsnSacService';

const HSNSACMaster = () => {
    const [hsnSacList, setHsnSacList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('ALL');
    const [page, setPage] = useState(1);
    const [limit] = useState(50);
    const [totalItems, setTotalItems] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });

    const loadData = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = {
                page,
                limit,
                search: searchTerm || undefined,
                type: filterType === 'ALL' ? undefined : filterType
            };
            const response = await getHsnSacCodes(params);
            setHsnSacList(response.data || []);
            setTotalItems(response.pagination?.total || response.data?.length || 0);
        } catch (error) {
            console.error('Error loading HSN/SAC codes:', error);
            toast.error('Failed to load HSN/SAC codes');
        } finally {
            setIsLoading(false);
        }
    }, [page, limit, searchTerm, filterType]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleAddNew = () => {
        setEditingId(null);
        setShowForm(true);
    };

    const handleEdit = (id) => {
        setEditingId(id);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        setSaving(true);
        try {
            if (editingId) {
                await updateHsnSacCode(editingId, formData);
                toast.success('HSN/SAC code updated successfully!');
            } else {
                await createHsnSacCode(formData);
                toast.success('HSN/SAC code added successfully!');
            }
            setShowForm(false);
            loadData();
        } catch (error) {
            console.error('Error saving HSN/SAC code:', error);
            toast.error(error.message || 'Failed to save HSN/SAC code');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (id) => {
        setDeleteConfirm({ isOpen: true, id });
    };

    const confirmDelete = async () => {
        if (deleteConfirm.id) {
            try {
                await deleteHsnSacCode(deleteConfirm.id);
                toast.success('HSN/SAC code deleted successfully!');
                loadData();
            } catch (error) {
                toast.error(error.message || 'Failed to delete HSN/SAC code');
            }
        }
        setDeleteConfirm({ isOpen: false, id: null });
    };

    const getEditingData = () => {
        if (!editingId) return null;
        return hsnSacList.find((item) => item.id === editingId);
    };

    return (
        <div className="container-fluid py-4">
            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
                onConfirm={confirmDelete}
                title="Delete HSN/SAC Code"
                message="Are you sure you want to delete this HSN/SAC code? This action cannot be undone."
                confirmText="Yes, Delete"
                cancelText="Cancel"
                type="danger"
            />

            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <div>
                    <h4 className="fw-bold mb-1 text-dark">GST - HSN/SAC Master</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 fs-13">
                            <li className="breadcrumb-item"><Link to="/inventory/stock-summary">Inventory</Link></li>
                            <li className="breadcrumb-item active text-muted">HSN/SAC Codes</li>
                        </ol>
                    </nav>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <button onClick={handleAddNew} className="btn btn-primary d-flex align-items-center rounded-pill px-4 shadow-sm">
                        <i className="isax isax-add-circle5 me-2 fs-18"></i>
                        New HSN/SAC
                    </button>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                <div className="card-header bg-white py-3 border-bottom-light">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div className="d-flex align-items-center flex-wrap gap-3">
                            <div className="position-relative" style={{ width: '250px' }}>
                                <span className="position-absolute ps-3 top-50 translate-middle-y">
                                    <i className="isax isax-search-normal text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control form-control-sm border-0 bg-light ps-5 py-2 shadow-none"
                                    placeholder="Search code or description..."
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="fs-13 text-muted me-2">Type:</span>
                                <select 
                                    className="form-select form-select-sm border-0 bg-light w-auto shadow-none py-1"
                                    value={filterType}
                                    onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
                                >
                                    <option value="ALL">All Types</option>
                                    <option value="HSN">HSN (Goods)</option>
                                    <option value="SAC">SAC (Services)</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-muted fs-13">
                            Total: <span className="fw-bold text-dark">{totalItems}</span> codes
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light fs-12 text-uppercase text-muted">
                                <tr>
                                    <th className="ps-4">Code</th>
                                    <th>Type</th>
                                    <th style={{ width: '30%' }}>Description</th>
                                    <th className="text-center">GST Rate</th>
                                    <th className="text-center">CGST</th>
                                    <th className="text-center">SGST</th>
                                    <th className="text-center">IGST</th>
                                    <th className="text-center">CESS</th>
                                    <th className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr><td colSpan="9" className="text-center py-5">Loading...</td></tr>
                                ) : hsnSacList.length > 0 ? (
                                    hsnSacList.map((item) => (
                                        <tr key={item.id}>
                                            <td className="ps-4 fw-600 text-dark">{item.code}</td>
                                            <td>
                                                <span className={`badge rounded-pill px-2 py-1 fs-11 ${item.type === 'HSN' ? 'bg-light-primary text-primary' : 'bg-light-success text-success'}`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="text-muted fs-13">
                                                <span className="text-truncate d-inline-block" style={{ maxWidth: '300px' }} title={item.description}>
                                                    {item.description}
                                                </span>
                                            </td>
                                            <td className="text-center fw-500">{item.gst_rate}%</td>
                                            <td className="text-center text-muted fs-12">{item.cgst_rate}%</td>
                                            <td className="text-center text-muted fs-12">{item.sgst_rate}%</td>
                                            <td className="text-center text-muted fs-13 fw-500">{item.igst_rate}%</td>
                                            <td className="text-center text-muted fs-12">{item.cess_rate}%</td>
                                            <td className="text-end pe-4">
                                                <div className="btn-group">
                                                    <button className="btn btn-sm btn-outline-primary border-0" onClick={() => handleEdit(item.id)} title="Edit">
                                                        <i className="isax isax-edit-2 fs-16"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDelete(item.id)} title="Delete">
                                                        <i className="isax isax-trash fs-16"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="9" className="text-center py-5 text-muted">No HSN/SAC codes found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {totalItems > limit && (
                    <div className="card-footer bg-white border-top-light py-3 d-flex justify-content-between align-items-center">
                        <div className="fs-13 text-muted">Showing {hsnSacList.length} of {totalItems}</div>
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link shadow-none" onClick={() => setPage(p => p - 1)} disabled={page === 1}>Previous</button>
                                </li>
                                <li className="page-item active"><span className="page-link">{page}</span></li>
                                <li className={`page-item ${hsnSacList.length < limit ? 'disabled' : ''}`}>
                                    <button className="page-link shadow-none" onClick={() => setPage(p => p + 1)} disabled={hsnSacList.length < limit}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showForm && (
                <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}>
                    <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1055 }}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content border-0 shadow-lg rounded-4">
                                <div className="modal-header border-bottom-light py-3">
                                    <h6 className="modal-title fw-bold">
                                        {editingId ? 'Edit HSN/SAC Code' : 'Add New HSN/SAC Code'}
                                    </h6>
                                    <button type="button" className="btn-close shadow-none" onClick={() => setShowForm(false)} aria-label="Close"></button>
                                </div>
                                <div className="modal-body p-0">
                                    <HSNSACForm
                                        initialData={getEditingData()}
                                        onSubmit={handleFormSubmit}
                                        isLoading={saving}
                                        onClose={() => setShowForm(false)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HSNSACMaster;
