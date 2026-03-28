import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ledgerGroupService from '../services/ledgerGroupService';

const LedgerGroups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState({});

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [pagination, setPagination] = useState({
        totalItems: 0,
        totalPages: 1,
        limit: 20
    });

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingGroup, setEditingGroup] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        nature: '',
        parent_group_id: ''
    });

    useEffect(() => {
        fetchGroups(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchGroups = async (page = 1, limit = 20) => {
        try {
            setLoading(true);
            const params = {
                // We still send params in case the backend eventually supports it
                page: page,
                limit: limit
            };
            const response = await ledgerGroupService.getGroupsTree(params);
            console.log('Ledger Groups Tree Response:', response);
            
            const fullTree = response.data || [];
            
            // Extract pagination info - robustly
            // If backend doesn't return total, we use the root nodes count for tree pagination
            const totalItems = response.pagination?.totalItems || 
                               response.pagination?.total ||
                               response.total || 
                               fullTree.length;
            
            const totalPages = Math.ceil(totalItems / limit) || 1;

            // CLIENT-SIDE SLICING for the tree (in case backend returns full list)
            // We paginate based on top-level (root) groups
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedTree = fullTree.slice(startIndex, endIndex);

            setGroups(paginatedTree);

            setPagination({
                totalItems,
                totalPages,
                limit,
                page
            });
            
            // Auto-expand top level groups
            const initialExpanded = {};
            paginatedTree.forEach(g => {
                if (g.children && g.children.length > 0) {
                    initialExpanded[g.id] = true;
                }
            });
            setExpandedGroups(initialExpanded);
        } catch (error) {
            console.error('Error fetching ledger groups:', error);
            toast.error('Failed to load ledger groups');
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id) => {
        setExpandedGroups(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleOpenModal = (group = null) => {
        if (group) {
            setEditingGroup(group);
            setFormData({
                name: group.name,
                nature: group.nature,
                parent_group_id: group.parent_group_id || ''
            });
        } else {
            setEditingGroup(null);
            setFormData({
                name: '',
                nature: '',
                parent_group_id: ''
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            const payload = {
                ...formData,
                parent_group_id: formData.parent_group_id || null
            };

            if (editingGroup) {
                await ledgerGroupService.updateGroup(editingGroup.id, payload);
                toast.success('Ledger group updated successfully');
            } else {
                await ledgerGroupService.createGroup(payload);
                toast.success('Ledger group created successfully');
            }
            setShowModal(false);
            fetchGroups(currentPage, pageSize);
        } catch (error) {
            toast.error(error.message || 'Failed to save ledger group');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently delete the group!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await ledgerGroupService.deleteGroup(id);
                    Swal.fire('Deleted!', 'Group has been deleted.', 'success');
                    fetchGroups(currentPage, pageSize);
                } catch (error) {
                    toast.error(error.message || 'Failed to delete group');
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

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const renderTree = (items, level = 0) => {
        return items.map((group) => (
            <React.Fragment key={group.id}>
                <tr>
                    <td style={{ paddingLeft: `${level * 30 + 15}px`, position: 'relative' }}>
                        <div className="d-flex align-items-center">
                            {group.children && group.children.length > 0 ? (
                                <button 
                                    className="btn btn-sm btn-icon border-0 me-2" 
                                    onClick={() => toggleExpand(group.id)}
                                >
                                    <i className={`isax ${expandedGroups[group.id] ? 'isax-minus' : 'isax-add'} fs-14`}></i>
                                </button>
                            ) : (
                                <span className="me-2" style={{ width: '24px' }}></span>
                            )}
                            <span className="fw-semibold text-dark">{group.name}</span>
                        </div>
                    </td>
                    <td className="text-center">
                        <span className={getNatureBadge(group.nature)}>{group.nature}</span>
                    </td>
                    <td className="text-end action-table-data">
                        <div className="edit-delete-action">
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(group)}>
                                <i className="isax isax-edit"></i>
                            </button>
                            {/* Logic for non-deletable seeded groups can be added here if needed */}
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(group.id)}>
                                <i className="isax isax-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                {expandedGroups[group.id] && group.children && group.children.length > 0 && 
                    renderTree(group.children, level + 1)
                }
            </React.Fragment>
        ));
    };

    // Helper for flat list of groups for the "Under" dropdown
    const getFlatGroups = (items, level = 0) => {
        let list = [];
        items.forEach(item => {
            list.push({ id: item.id, name: item.name, level });
            if (item.children) {
                list = list.concat(getFlatGroups(item.children, level + 1));
            }
        });
        return list;
    };

    return (
        <div className="content">
            <div className="page-header">
                <div className="add-item d-flex">
                    <div className="page-title">
                        <h4>Chart of Accounts</h4>
                        <h6>Manage hierarchical ledger groups</h6>
                    </div>
                </div>
                <div className="page-btn">
                    <button className="btn btn-primary d-flex align-items-center" onClick={() => handleOpenModal()}>
                        <i className="isax isax-add-circle me-2"></i>New Group
                    </button>
                </div>
            </div>

            <div className="card table-list-card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="thead-light">
                                <tr>
                                    <th>Group Name</th>
                                    <th className="text-center">Nature</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status"></div>
                                        </td>
                                    </tr>
                                ) : groups.length > 0 ? (
                                    renderTree(groups)
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-5">No ledger groups found.</td>
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
                                    groups
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

            {/* Group Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header border-bottom">
                                <h5 className="modal-title">{editingGroup ? 'Edit Ledger Group' : 'Create Ledger Group'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body p-4">
                                    <div className="form-group mb-3">
                                        <label className="form-label fw-medium text-dark">Group Name <span className="text-danger">*</span></label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            required 
                                            value={formData.name} 
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            placeholder="e.g. Travel Expenses"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label fw-medium text-dark">Nature <span className="text-danger">*</span></label>
                                        <select 
                                            className="form-control" 
                                            required 
                                            value={formData.nature} 
                                            onChange={(e) => setFormData({...formData, nature: e.target.value})}
                                        >
                                            <option value="">Select Nature</option>
                                            <option value="ASSET">ASSET</option>
                                            <option value="LIABILITY">LIABILITY</option>
                                            <option value="INCOME">INCOME</option>
                                            <option value="EXPENSE">EXPENSE</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label fw-medium text-dark">Under (Parent Group)</label>
                                        <select 
                                            className="form-control" 
                                            value={formData.parent_group_id} 
                                            onChange={(e) => setFormData({...formData, parent_group_id: e.target.value})}
                                        >
                                            <option value="">Primary (No Parent)</option>
                                            {getFlatGroups(groups).filter(g => !editingGroup || g.id !== editingGroup.id).map(g => (
                                                <option key={g.id} value={g.id}>
                                                    {'\u00A0'.repeat(g.level * 4)}{g.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer border-top">
                                    <button type="button" className="btn btn-cancel me-2" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={isSaving}>
                                        {isSaving ? 'Saving...' : (editingGroup ? 'Update Group' : 'Save Group')}
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

export default LedgerGroups;
