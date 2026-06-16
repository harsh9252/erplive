import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ledgerService from '../services/ledgerService';
import ledgerGroupService from '../services/ledgerGroupService';
import customerService from '../services/customerService';
import vendorService from '../services/vendorService';
import bankAccountService from '../services/bankAccountService';

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
        mobile: '',
        address: '',
        bank_name: '',
        account_number: '',
        ifsc_code: ''
    });

    const [errors, setErrors] = useState({});

    // Suggestions state
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);

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
            // Debug log removed

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
        setShowSuggestions(false);
        setSuggestions([]);
        if (ledger) {
            setEditingLedger(ledger);
            setFormData({
                name: ledger.name,
                ledger_group_id: ledger.ledger_group_id || '',
                opening_balance: ledger.opening_balance || 0,
                balance_type: ledger.balance_type || 'DR',
                mobile: ledger.mobile || '',
                address: ledger.address || '',
                bank_name: ledger.bank_name || '',
                account_number: ledger.account_number || '',
                ifsc_code: ledger.ifsc_code || ''
            });
        } else {
            setEditingLedger(null);
            setFormData({
                name: '',
                ledger_group_id: '',
                opening_balance: 0,
                balance_type: 'DR',
                mobile: '',
                address: '',
                bank_name: '',
                account_number: '',
                ifsc_code: ''
            });
        }
        setErrors({});
        setShowModal(true);
    };

    // Suggestions fetching effect
    // L-3 fix: use only name-based group detection (no hardcoded IDs)
    useEffect(() => {
        if (!showModal) return;

        const fetchSuggestions = async () => {
            const selectedGroup = groups.find(g => 
                g.id?.toString() === formData.ledger_group_id?.toString()
            );
            const groupName = selectedGroup?.name?.toLowerCase() || '';
            // L-3 fix: only use name-based detection — no hardcoded IDs
            const isSundryDebtor = groupName.includes('sundry debtor');
            const isSundryCreditor = groupName.includes('sundry creditor');
            const isBankGroup = groupName.includes('bank account') || groupName.includes('bank accounts');

            if (isSundryDebtor || isSundryCreditor || isBankGroup) {
                try {
                    setIsSearchingSuggestions(true);
                    const trimmedName = formData.name?.trim() || '';

                    // L-6 fix: only skip fetch if suggestions are currently shown AND already contain this name
                    if (showSuggestions && suggestions.some(s => (s.name || s.bank_name) === trimmedName) && trimmedName !== '') {
                        return;
                    }

                    let response;
                    if (isSundryDebtor) {
                        response = await customerService.searchCustomers(trimmedName, 20);
                    } else if (isSundryCreditor) {
                        response = await vendorService.searchVendors(trimmedName, 20);
                    } else {
                        response = await bankAccountService.getBankAccounts({ search: trimmedName, limit: 20 });
                    }
                    
                    const items = Array.isArray(response) ? response : (response.data || response.items || []);
                    setSuggestions(items);
                    if (items.length > 0) {
                        setShowSuggestions(true);
                    }
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                } finally {
                    setIsSearchingSuggestions(false);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [formData.name, formData.ledger_group_id, groups, showModal]);

    const handleSelectSuggestion = (item) => {
        setFormData(prev => ({
            ...prev,
            name: item.name || item.bank_name,
            mobile: item.phone || item.mobile || prev.mobile,
            address: item.address || prev.address,
            bank_name: item.bank_name || prev.bank_name,
            account_number: item.account_number || prev.account_number,
            ifsc_code: item.ifsc_code || prev.ifsc_code
        }));
        setShowSuggestions(false);
    };

    const handleGroupChange = (groupId) => {
        setFormData({
            name: '',
            ledger_group_id: groupId,
            opening_balance: 0,
            balance_type: 'DR',
            mobile: '',
            address: '',
            bank_name: '',
            account_number: '',
            ifsc_code: ''
        });
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let newErrors = {};
        if (!formData.name?.trim()) newErrors.name = 'Ledger Name is required';
        if (!formData.ledger_group_id) newErrors.ledger_group_id = 'Under Group is required';
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsSaving(true);
            
            // Check for duplicate name
            if (editingLedger) {
                if (editingLedger.name.toLowerCase() !== formData.name.trim().toLowerCase()) {
                    const exists = await ledgerService.checkNameExists(formData.name);
                    if (exists) {
                        toast.error('A ledger with this name already exists');
                        setIsSaving(false);
                        return;
                    }
                }
                await ledgerService.updateLedger(editingLedger.id, formData);
                toast.success('Ledger updated successfully');
            } else {
                const exists = await ledgerService.checkNameExists(formData.name);
                if (exists) {
                    toast.error('A ledger with this name already exists');
                    setIsSaving(false);
                    return;
                }
                await ledgerService.createLedger(formData);
                toast.success('Ledger created successfully');
            }
            setShowModal(false);
            // L-1 fix: pass current page/size so user stays on the same page
            fetchLedgers(currentPage, pageSize);
        } catch (error) {
            let errorMsg = error.message || 'Failed to save ledger';
            let handled = false;
            let currentErrors = {};

            if (errorMsg.toLowerCase().includes("'name'") || errorMsg.toLowerCase().includes('"name"')) {
                currentErrors.name = errorMsg;
                handled = true;
            }

            if (handled) {
                setErrors(prev => ({ ...prev, ...currentErrors }));
            } else {
                toast.error(errorMsg);
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        // Find the ledger name for a better message
        const ledger = ledgers.find(l => l.id === id);
        const ledgerName = ledger ? ledger.name : 'this ledger';

        Swal.fire({
            title: 'Delete Ledger?',
            text: `Are you sure you want to delete "${ledgerName}"? This action cannot be undone if it has no entries.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await ledgerService.deleteLedger(id);
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Ledger has been deleted successfully.',
                        icon: 'success',
                        iconHtml: '<i class="isax isax-tick-circle text-success fs-50"></i>',
                        customClass: {
                            icon: 'border-0'
                        }
                    });
                    fetchLedgers();
                } catch (error) {
                    console.error('Delete Error:', error);
                    // Check for specific backend messages or constraint violations
                    const errorMessage = error.response?.data?.message || error.message || '';
                    if (errorMessage.toLowerCase().includes('entry') || 
                        errorMessage.toLowerCase().includes('transaction') || 
                        errorMessage.toLowerCase().includes('constraint')) {
                        Swal.fire({
                            title: 'Cannot Delete',
                            text: 'This ledger cannot be deleted because it has existing entries in one or more financial years.',
                            icon: 'error'
                        });
                    } else {
                        toast.error(errorMessage || 'Failed to delete ledger');
                    }
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
                <div className="page-btn d-flex align-items-center gap-2">
                    <Link to="/accounting/ledgers/bulk-add" className="btn btn-soft-primary d-flex align-items-center">
                        <i className="isax isax-grid-3 me-2"></i>Bulk Create
                    </Link>
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
                                            <td>{ledger.ledgerGroup?.name || 'Unassigned'}</td>
                                            <td className="text-center">
                                                <span className={getNatureBadge(ledger.ledgerGroup?.nature)}>
                                                    {ledger.ledgerGroup?.nature || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="text-end fw-medium">
                                                {new Intl.NumberFormat('en-IN').format(ledger.opening_balance)} 
                                                <span className={ledger.balance_type === 'DR' ? 'text-primary ms-1' : 'text-danger ms-1'}>
                                                    {ledger.balance_type}
                                                </span>
                                            </td>                                            <td className="text-end pe-4">
                                                <div className="d-flex justify-content-end align-items-center gap-2">
                                                    <button 
                                                        className="btn btn-sm btn-soft-warning border-0" 
                                                        onClick={() => handleOpenModal(ledger)}
                                                        title="Edit Ledger"
                                                    >
                                                        <i className="isax isax-edit-2 fs-16"></i>
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-soft-danger border-0" 
                                                        onClick={() => handleDelete(ledger.id)}
                                                        title="Delete Ledger"
                                                    >
                                                        <i className="isax isax-trash fs-16"></i>
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
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="modal-body p-4">
                                    <div className="row g-3">
                                        <div className="col-md-6 position-relative">
                                            <label className="form-label fw-medium text-dark">Ledger Name <span className="text-danger">*</span></label>
                                            <input 
                                                type="text" 
                                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                value={formData.name} 
                                                onChange={(e) => {
                                                    setFormData(prev => ({ ...prev, name: e.target.value }));
                                                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                                                }}
                                                onBlur={() => setTimeout(() => setShowSuggestions(false), 250)}
                                                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                                                placeholder="e.g. HDFC Bank"
                                                autoComplete="off"
                                                maxLength="100"
                                            />
                                            {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                                            {showSuggestions && suggestions.length > 0 && (
                                                <div className="position-absolute w-100 bg-white border rounded shadow-lg z-3 mt-1 overflow-auto" style={{ maxHeight: '200px', zIndex: 1060 }}>
                                                    {suggestions.map((item) => (
                                                        <div 
                                                            key={item.id} 
                                                            className="px-3 py-2 cursor-pointer border-bottom hover-bg-light small d-flex flex-column"
                                                            onClick={() => handleSelectSuggestion(item)}
                                                        >
                                                            <span className="fw-bold">{item.name || item.bank_name}</span>
                                                            {item.gstin && <span className="text-muted fs-11">GSTIN: {item.gstin}</span>}
                                                            {item.phone && <span className="text-muted fs-11">Phone: {item.phone}</span>}
                                                            {item.account_number && <span className="text-muted fs-11 text-primary">A/c: {item.account_number}</span>}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {isSearchingSuggestions && (
                                                <div className="position-absolute end-0 top-0 mt-4 me-3 pt-2">
                                                    <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-medium text-dark">Under Group <span className="text-danger">*</span></label>
                                            <select 
                                                className={`form-control ${errors.ledger_group_id ? 'is-invalid' : ''}`}
                                                value={formData.ledger_group_id} 
                                                onChange={(e) => {
                                                    handleGroupChange(e.target.value);
                                                    if (errors.ledger_group_id) setErrors(prev => ({ ...prev, ledger_group_id: '' }));
                                                }}
                                            >
                                                <option value="">Select Group</option>
                                                {groups.map(g => (
                                                    <option key={g.id} value={g.id}>{g.name}</option>
                                                ))}
                                            </select>
                                            {errors.ledger_group_id && <div className="invalid-feedback d-block">{errors.ledger_group_id}</div>}
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label fw-medium text-dark">Opening Balance</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                value={formData.opening_balance} 
                                                // L-5 fix: parse as float so API receives a number not string
                                                onChange={(e) => setFormData({...formData, opening_balance: parseFloat(e.target.value) || 0})}
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
