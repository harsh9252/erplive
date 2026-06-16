import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ledgerService from '../services/ledgerService';
import ledgerGroupService from '../services/ledgerGroupService';

const OpeningBalances = () => {
    const navigate = useNavigate();
    const [ledgers, setLedgers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Local state for modified balances to track changes before saving
    const [modifiedBalances, setModifiedBalances] = useState({});
    
    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [ledgerRes, groupRes] = await Promise.all([
                ledgerService.getLedgers({ limit: 1000 }), // Get all ledgers
                ledgerGroupService.getGroups()
            ]);
            
            setLedgers(ledgerRes.data || []);
            setGroups(groupRes.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load ledgers');
        } finally {
            setLoading(false);
        }
    };

    const handleBalanceChange = (id, value) => {
        setModifiedBalances(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                opening_balance: parseFloat(value) || 0
            }
        }));
    };

    const handleTypeChange = (id, value) => {
        setModifiedBalances(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                balance_type: value
            }
        }));
    };

    const filteredLedgers = useMemo(() => {
        return ledgers.filter(ledger => {
            const matchesSearch = ledger.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGroup = !selectedGroup || String(ledger.ledger_group_id) === String(selectedGroup);
            return matchesSearch && matchesGroup;
        });
    }, [ledgers, searchTerm, selectedGroup]);

    // Calculate totals
    const totals = useMemo(() => {
        let drTotal = 0;
        let crTotal = 0;

        ledgers.forEach(ledger => {
            const modified = modifiedBalances[ledger.id];
            const balance = modified?.opening_balance ?? ledger.opening_balance ?? 0;
            const type = modified?.balance_type ?? ledger.balance_type ?? 'DR';

            if (type === 'DR') drTotal += balance;
            else crTotal += balance;
        });

        return { drTotal, crTotal, difference: Math.abs(drTotal - crTotal) };
    }, [ledgers, modifiedBalances]);

    const handleSave = async () => {
        const modifiedIds = Object.keys(modifiedBalances);
        if (modifiedIds.length === 0) {
            toast.info('No changes to save');
            return;
        }

        setIsSaving(true);
        let successCount = 0;
        let failCount = 0;

        try {
            // Processing in small batches to avoid server strain
            const batchSize = 5;
            for (let i = 0; i < modifiedIds.length; i += batchSize) {
                const batch = modifiedIds.slice(i, i + batchSize);
                await Promise.all(batch.map(async (id) => {
                    try {
                        const original = ledgers.find(l => String(l.id) === String(id));
                        const updates = modifiedBalances[id];
                        
                        await ledgerService.updateLedger(id, {
                            ...original,
                            ...updates
                        });
                        successCount++;
                    } catch (err) {
                        console.error(`Failed to update ledger ${id}:`, err);
                        failCount++;
                    }
                }));
            }

            if (successCount > 0) {
                toast.success(`Updated ${successCount} opening balances!`);
                setModifiedBalances({});
                fetchData();
            }
            
            if (failCount > 0) {
                toast.error(`Failed to update ${failCount} ledgers.`);
            }
        } finally {
            setIsSaving(false);
        }
    };

    const getNatureColor = (nature) => {
        const colors = {
            'ASSET': 'text-primary',
            'LIABILITY': 'text-warning',
            'INCOME': 'text-success',
            'EXPENSE': 'text-danger'
        };
        return colors[nature] || 'text-muted';
    };

    return (
        <div className="content">
            <div className="page-header mb-4">
                <div className="page-title">
                    <h4 className="fw-bold">Opening Balances Mapping</h4>
                    <h6 className="text-muted">Review and set initial balances for your Chart of Accounts</h6>
                </div>
                <div className="page-btn d-flex gap-2">
                    <Link to="/accounting/ledgers" className="btn btn-soft-secondary">
                        <i className="isax isax-arrow-left-2 me-2"></i>Back to Ledgers
                    </Link>
                    <button 
                        className="btn btn-primary px-4 shadow-sm" 
                        onClick={handleSave}
                        disabled={isSaving || Object.keys(modifiedBalances).length === 0}
                    >
                        {isSaving ? (
                            <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</>
                        ) : (
                            <><i className="isax isax-save-2 me-2"></i>Save All Changes</>
                        )}
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm bg-primary-gradient text-white">
                        <div className="card-body p-3 d-flex align-items-center">
                            <div className="flex-shrink-0 bg-white-transparent rounded-circle p-2 me-3">
                                <i className="isax isax-arrow-up-3 fs-20"></i>
                            </div>
                            <div>
                                <p className="mb-0 fs-12 opacity-75">Total Debit (DR)</p>
                                <h5 className="mb-0 fw-bold">₹ {new Intl.NumberFormat('en-IN').format(totals.drTotal)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm bg-danger-gradient text-white">
                        <div className="card-body p-3 d-flex align-items-center">
                            <div className="flex-shrink-0 bg-white-transparent rounded-circle p-2 me-3">
                                <i className="isax isax-arrow-down-2 fs-20"></i>
                            </div>
                            <div>
                                <p className="mb-0 fs-12 opacity-75">Total Credit (CR)</p>
                                <h5 className="mb-0 fw-bold">₹ {new Intl.NumberFormat('en-IN').format(totals.crTotal)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card border-0 shadow-sm ${totals.difference === 0 ? 'bg-success-gradient' : 'bg-warning-gradient'} text-white`}>
                        <div className="card-body p-3 d-flex align-items-center">
                            <div className="flex-shrink-0 bg-white-transparent rounded-circle p-2 me-3">
                                <i className={`isax ${totals.difference === 0 ? 'isax-tick-circle' : 'isax-info-circle'} fs-20`}></i>
                            </div>
                            <div>
                                <p className="mb-0 fs-12 opacity-75">Difference</p>
                                <h5 className="mb-0 fw-bold">₹ {new Intl.NumberFormat('en-IN').format(totals.difference)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom-0 py-3">
                    <div className="row align-items-center g-3">
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-text bg-light border-0"><i className="isax isax-search-normal-1 text-muted"></i></span>
                                <input 
                                    type="text" 
                                    className="form-control bg-light border-0" 
                                    placeholder="Quick find ledger..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <select 
                                className="form-select bg-light border-0" 
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                            >
                                <option value="">All Ledger Groups</option>
                                {groups.map(g => (
                                    <option key={g.id} value={g.id}>{g.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2 text-end">
                            <button className="btn btn-soft-primary w-100" onClick={fetchData}>
                                <i className="isax isax-refresh me-2"></i>Reset
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light fs-11 text-uppercase text-muted tracking-wider">
                                <tr>
                                    <th className="ps-4">Ledger Name</th>
                                    <th>Group & Nature</th>
                                    <th style={{ width: '250px' }}>Opening Balance (₹)</th>
                                    <th style={{ width: '150px' }}>Balance Type</th>
                                    <th className="text-center" style={{ width: '80px' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status"></div>
                                        </td>
                                    </tr>
                                ) : filteredLedgers.length > 0 ? (
                                    filteredLedgers.map((ledger) => {
                                        const isModified = !!modifiedBalances[ledger.id];
                                        const currentVal = modifiedBalances[ledger.id]?.opening_balance ?? ledger.opening_balance ?? 0;
                                        const currentType = modifiedBalances[ledger.id]?.balance_type ?? ledger.balance_type ?? 'DR';
                                        
                                        return (
                                            <tr key={ledger.id} className={isModified ? 'bg-soft-warning' : ''}>
                                                <td className="ps-4">
                                                    <div className="fw-semibold text-dark">{ledger.name}</div>
                                                    <small className="text-muted fs-11">{ledger.ledgerGroup?.nature || 'N/A'}</small>
                                                </td>
                                                <td>
                                                    <div className="fs-13">{ledger.ledgerGroup?.name || 'Unassigned'}</div>
                                                    <div className={`fs-11 fw-medium ${getNatureColor(ledger.ledgerGroup?.nature)}`}>
                                                        {ledger.ledgerGroup?.nature}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input-group input-group-sm">
                                                        <span className="input-group-text bg-white border-end-0 text-muted">₹</span>
                                                        <input 
                                                            type="number" 
                                                            className={`form-control border-start-0 ${isModified ? 'border-warning' : ''}`}
                                                            value={currentVal}
                                                            onChange={(e) => handleBalanceChange(ledger.id, e.target.value)}
                                                            placeholder="0.00"
                                                            step="0.01"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <select 
                                                        className={`form-select form-select-sm ${isModified ? 'border-warning' : ''}`}
                                                        value={currentType}
                                                        onChange={(e) => handleTypeChange(ledger.id, e.target.value)}
                                                    >
                                                        <option value="DR">Debit (DR)</option>
                                                        <option value="CR">Credit (CR)</option>
                                                    </select>
                                                </td>
                                                <td className="text-center">
                                                    {isModified && (
                                                        <span className="badge bg-warning rounded-circle p-1" title="Unsaved changes">
                                                            <i className="isax isax-edit-2 fs-10 text-white"></i>
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted">No ledgers matching your criteria.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {/* Legend / Info */}
            <div className="mt-4 p-3 bg-soft-info rounded border border-info border-opacity-10 d-flex align-items-start">
                <i className="isax isax-info-circle fs-20 text-info me-3 mt-1"></i>
                <div className="fs-13 text-info">
                    <p className="mb-1 fw-bold">Accounting Note:</p>
                    <p className="mb-0">Ensure that your total Debits equal total Credits. The difference should ideally be <strong>₹ 0.00</strong> before you finalize your opening trial balance. Use the search and filter tools above to locate specific accounts quickly.</p>
                </div>
            </div>
        </div>
    );
};

export default OpeningBalances;
