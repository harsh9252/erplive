import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ledgerService from '../services/ledgerService';
import ledgerGroupService from '../services/ledgerGroupService';

const Ledgers = () => {
    const [ledgers, setLedgers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [pagination, setPagination] = useState({
        totalItems: 0,
        totalPages: 1,
        limit: 20
    });

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroupFilter, setSelectedGroupFilter] = useState('');

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingLedger, setEditingLedger] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        ledger_group_id: '',
        opening_balance: 0,
        balance_type: 'DR',
        gstin: '',
        mobile: '',
        address: ''
    });

    useEffect(() => {
        fetchLedgers(currentPage, pageSize);
        fetchGroups();
    }, [currentPage, pageSize]);

    const fetchLedgers = async (page = 1, limit = 20) => {
        try {
            setLoading(true);
            const params = {
                search: searchTerm,
                group_id: selectedGroupFilter,
                page: page,
                limit: limit
            };
            
            const response = await ledgerService.getLedgers(params);
            console.log('Ledgers API Response:', response); // Debug log

            const items = response.data || [];
            setLedgers(items);
            
            // Extract pagination info robustly
            const totalItems = response.pagination?.totalItems || 
                               response.pagination?.total ||
                               response.total || 
                               response.data?.total || 
                               response.count ||
                               response.total_count ||
                               (response.pagination?.totalPages ? response.pagination?.totalPages * limit : items.length);
            
            const totalPages = response.pagination?.totalPages || 
                               Math.ceil(totalItems / limit) || 
                               1;

            setPagination({
                totalItems,
                totalPages,
                limit,
                page
            });
        } catch (error) {
            console.error('Error fetching ledgers:', error);
            toast.error('Failed to load ledgers');
        } finally {
            setLoading(false);
        }
    };

    const fetchGroups = async () => {
        try {
            const response = await ledgerGroupService.getGroups();
            setGroups(response.data || []);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchLedgers(1, pageSize);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        setPageSize(newSize);
        setCurrentPage(1);
    };

    const handleOpenModal = (ledger = null) => {
        if (ledger) {
            setEditingLedger(ledger);
            setFormData({
                name: ledger.name,
                ledger_group_id: ledger.ledger_group_id || '',
                opening_balance: ledger.opening_balance || 0,
                balance_type: ledger.balance_type || 'DR',
                gstin: ledger.gstin || '',
                mobile: ledger.mobile || '',
                address: ledger.address || ''
            });
        } else {
            setEditingLedger(null);
            setFormData({
                name: '',
                ledger_group_id: '',
                opening_balance: 0,
                balance_type: 'DR',
                gstin: '',
                mobile: '',
                address: ''
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            if (editingLedger) {
                await ledgerService.updateLedger(editingLedger.id, formData);
                toast.success('Ledger updated successfully');
            } else {
                await ledgerService.createLedger(formData);
                toast.success('Ledger created successfully');
            }
            setShowModal(false);
            fetchLedgers();
        } catch (error) {
            toast.error(error.message || 'Failed to save ledger');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the ledger and its history!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await ledgerService.deleteLedger(id);
                    Swal.fire('Deleted!', 'Ledger has been deleted.', 'success');
                    fetchLedgers();
                } catch (error) {
                    toast.error(error.message || 'Failed to delete ledger');
                }
            }
        });
    };

    const getNatureBadge = (nature) => {
        const classes = {
            'ASSET': 'bg-info',
            'LIABILITY': 'bg-warning',
            'INCOME': 'bg-success',
            'EXPENSE': 'bg-danger'
        };
        return `badge ${classes[nature] || 'bg-secondary'}`;
    };


    return (
        <div className="content">
            <div className="page-header">
                <div className="add-item d-flex">
                    <div className="page-title">
                        <h4>Chart of Accounts — Ledgers</h4>
                        <h6>Manage individual ledgers and balances</h6>
                    </div>
                </div>
                <div className="page-btn">
                    <button className="btn btn-primary d-flex align-items-center" onClick={() => handleOpenModal()}>
                        <i className="isax isax-add-circle me-2"></i>New Ledger
                    </button>
                </div>
            </div>

            <div className="card table-list-card">
                <div className="card-body">
                    <div className="table-top mb-4">
                        <form className="row g-3" onSubmit={handleSearch}>
                            <div className="col-md-4">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="isax isax-search-normal-1 fs-14"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        className="form-control border-start-0" 
                                        placeholder="Search by name..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <select 
                                    className="form-control" 
                                    value={selectedGroupFilter}
                                    onChange={(e) => setSelectedGroupFilter(e.target.value)}
                                >
                                    <option value="">All Groups</option>
                                    {groups.map(g => (
                                        <option key={g.id} value={g.id}>{g.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <button type="submit" className="btn btn-primary w-100">Filter</button>
                            </div>
                        </form>
                    </div>

                    <div className="table-responsive">
                        <table className="table datanew">
                            <thead>
                                <tr>
                                    <th>Ledger Name</th>
                                    <th>Group</th>
                                    <th className="text-center">Nature</th>
                                    <th className="text-end">Opening Balance</th>
                                    <th className="no-sort text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status"></div>
                                        </td>
                                    </tr>
                                ) : ledgers.length > 0 ? (
                                    ledgers.map((ledger) => (
                                        <tr key={ledger.id}>
                                            <td className="fw-semibold text-dark">{ledger.name}</td>
                                            <td>{ledger.LedgerGroup?.name || 'Unassigned'}</td>
                                            <td className="text-center">
                                                <span className={getNatureBadge(ledger.LedgerGroup?.nature)}>
                                                    {ledger.LedgerGroup?.nature || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="text-end fw-medium">
                                                {new Intl.NumberFormat('en-IN').format(ledger.opening_balance)} 
                                                <span className={ledger.balance_type === 'DR' ? 'text-primary ms-1' : 'text-danger ms-1'}>
                                                    {ledger.balance_type}
                                                </span>
                                            </td>
                                            <td className="action-table-data text-end">
                                                <div className="edit-delete-action">
                                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(ledger)}>
                                                        <i className="isax isax-edit"></i>
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(ledger.id)}>
                                                        <i className="isax isax-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">No ledgers found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {!loading && (
                        <div className="d-flex align-items-center justify-content-between mt-4">
                            <div className="d-flex align-items-center gap-3">
                                <p className="mb-0 fs-13 text-muted">
                                    Showing {pagination.totalItems > 0 ? (currentPage - 1) * pagination.limit + 1 : 0} to{' '}
                                    {Math.min(currentPage * pagination.limit, pagination.totalItems)} of {pagination.totalItems}{' '}
                                    ledgers
                                </p>
                                <select 
                                    className="form-select form-select-sm w-auto" 
                                    value={pageSize}
                                    onChange={handlePageSizeChange}
                                >
                                    <option value="10">10 / Page</option>
                                    <option value="20">20 / Page</option>
                                    <option value="50">50 / Page</option>
                                    <option value="100">100 / Page</option>
                                </select>
                            </div>
                            <nav>
                                <ul className="pagination pagination-sm mb-0">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button
                                            type="button"
                                            className="page-link"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            <i className="isax isax-arrow-left-2 fs-14"></i>
                                        </button>
                                    </li>
                                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNo) => (
                                        <li
                                            key={pageNo}
                                            className={`page-item ${currentPage === pageNo ? 'active' : ''}`}
                                        >
                                            <button 
                                                type="button"
                                                className="page-link" 
                                                onClick={() => handlePageChange(pageNo)}
                                            >
                                                {pageNo}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === pagination.totalPages || pagination.totalPages === 0 ? 'disabled' : ''}`}>
                                        <button
                                            type="button"
                                            className="page-link"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === pagination.totalPages || pagination.totalPages === 0}
                                        >
                                            <i className="isax isax-arrow-right-2 fs-14"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div>

            {/* Ledger Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0">
                            <div className="modal-header border-bottom">
                                <h5 className="modal-title">{editingLedger ? 'Edit Ledger' : 'Create Ledger'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body p-4">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-medium text-dark">Ledger Name <span className="text-danger">*</span></label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                required 
                                                value={formData.name} 
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                placeholder="e.g. HDFC Bank"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-medium text-dark">Under Group <span className="text-danger">*</span></label>
                                            <select 
                                                className="form-control" 
                                                required 
                                                value={formData.ledger_group_id} 
                                                onChange={(e) => setFormData({...formData, ledger_group_id: e.target.value})}
                                            >
                                                <option value="">Select Group</option>
                                                {groups.map(g => (
                                                    <option key={g.id} value={g.id}>{g.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label fw-medium text-dark">Opening Balance</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                value={formData.opening_balance} 
                                                onChange={(e) => setFormData({...formData, opening_balance: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <label className="form-label fw-medium text-dark">Type</label>
                                            <div className="d-flex gap-2 pt-2">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="balance_type" id="dr" value="DR" checked={formData.balance_type === 'DR'} onChange={(e) => setFormData({...formData, balance_type: e.target.value})} />
                                                    <label className="form-check-label fs-12" htmlFor="dr">DR</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="balance_type" id="cr" value="CR" checked={formData.balance_type === 'CR'} onChange={(e) => setFormData({...formData, balance_type: e.target.value})} />
                                                    <label className="form-check-label fs-12" htmlFor="cr">CR</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-medium text-dark">GSTIN</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={formData.gstin} 
                                                onChange={(e) => setFormData({...formData, gstin: e.target.value})}
                                                placeholder="27AAAAA0000A1Z5"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-medium text-dark">Phone/Mobile</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={formData.mobile} 
                                                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                                placeholder="9876543210"
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label fw-medium text-dark">Address</label>
                                            <textarea 
                                                className="form-control" 
                                                rows="2" 
                                                value={formData.address} 
                                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                                placeholder="Full billing address..."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-top">
                                    <button type="button" className="btn btn-cancel me-2" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={isSaving}>
                                        {isSaving ? 'Saving...' : (editingLedger ? 'Update Ledger' : 'Save Ledger')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ledgers;
