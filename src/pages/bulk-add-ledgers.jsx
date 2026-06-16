import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ledgerService from '../services/ledgerService';
import ledgerGroupService from '../services/ledgerGroupService';

const BulkAddLedgers = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [rows, setRows] = useState([
        { id: Date.now() + 1, name: '', ledger_group_id: '', opening_balance: 0, balance_type: 'DR' },
        { id: Date.now() + 2, name: '', ledger_group_id: '', opening_balance: 0, balance_type: 'DR' },
        { id: Date.now() + 3, name: '', ledger_group_id: '', opening_balance: 0, balance_type: 'DR' },
        { id: Date.now() + 4, name: '', ledger_group_id: '', opening_balance: 0, balance_type: 'DR' },
        { id: Date.now() + 5, name: '', ledger_group_id: '', opening_balance: 0, balance_type: 'DR' },
    ]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setLoading(true);
                const response = await ledgerGroupService.getGroups();
                setGroups(response.data || []);
            } catch (error) {
                console.error('Error fetching groups:', error);
                toast.error('Failed to load ledger groups');
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
    }, []);

    const handleAddRow = () => {
        setRows([...rows, { id: Date.now(), name: '', ledger_group_id: '', opening_balance: 0, balance_type: 'DR' }]);
    };

    const handleRemoveRow = (id) => {
        if (rows.length > 1) {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const handleInputChange = (id, field, value) => {
        setRows(rows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Filter rows that have a name
        const validRows = rows.filter(row => row.name.trim() !== '' && row.ledger_group_id !== '');
        
        if (validRows.length === 0) {
            toast.warning('Please enter details for at least one ledger');
            return;
        }

        // Check for internal duplicates in the rows
        const names = validRows.map(r => r.name.trim().toLowerCase());
        const duplicateNamesInRows = names.filter((name, index) => names.indexOf(name) !== index);
        if (duplicateNamesInRows.length > 0) {
            toast.error(`Duplicate names found in your list: ${[...new Set(duplicateNamesInRows)].join(', ')}`);
            return;
        }

        setIsSaving(true);
        let successCount = 0;
        let failCount = 0;

        try {
            for (const row of validRows) {
                try {
                    // Check if ledger already exists in database
                    const exists = await ledgerService.checkNameExists(row.name);
                    if (exists) {
                        toast.error(`Ledger "${row.name}" already exists. Skipping.`);
                        failCount++;
                        continue;
                    }

                    const payload = {
                        name: row.name.trim(),
                        ledger_group_id: row.ledger_group_id,
                        opening_balance: row.opening_balance || 0,
                        balance_type: row.balance_type || 'DR'
                    };
                    await ledgerService.createLedger(payload);
                    successCount++;
                } catch (err) {
                    console.error(`Failed to create ledger "${row.name}":`, err);
                    failCount++;
                }
            }

            if (successCount > 0) {
                toast.success(`Successfully created ${successCount} ledgers!`);
                if (failCount === 0) {
                    navigate('/accounting/ledgers');
                }
            }
            
            if (failCount > 0) {
                toast.error(`Failed to create ${failCount} ledgers. Please check your inputs.`);
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="content">
            <div className="page-header">
                <div className="page-title">
                    <h4>Bulk Create Ledgers</h4>
                    <h6>Add multiple ledger accounts to your Chart of Accounts quickly</h6>
                </div>
                <div className="page-btn">
                    <Link to="/accounting/ledgers" className="btn btn-added">
                        <i className="isax isax-arrow-left-2 me-2"></i>Back to List
                    </Link>
                </div>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="table-responsive mb-4">
                            <table className="table table-hover align-middle">
                                <thead className="bg-light">
                                    <tr>
                                        <th style={{ width: '30%' }}>Ledger Name <span className="text-danger">*</span></th>
                                        <th style={{ width: '30%' }}>Under Group <span className="text-danger">*</span></th>
                                        <th style={{ width: '20%' }}>Opening Balance</th>
                                        <th style={{ width: '15%' }}>Type</th>
                                        <th className="text-center" style={{ width: '5%' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, index) => (
                                        <tr key={row.id}>
                                            <td>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="e.g. Petty Cash"
                                                    value={row.name}
                                                    onChange={(e) => handleInputChange(row.id, 'name', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-select"
                                                    value={row.ledger_group_id}
                                                    onChange={(e) => handleInputChange(row.id, 'ledger_group_id', e.target.value)}
                                                >
                                                    <option value="">Select Group</option>
                                                    {groups.map(g => (
                                                        <option key={g.id} value={g.id}>{g.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    value={row.opening_balance}
                                                    onChange={(e) => handleInputChange(row.id, 'opening_balance', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-select"
                                                    value={row.balance_type}
                                                    onChange={(e) => handleInputChange(row.id, 'balance_type', e.target.value)}
                                                >
                                                    <option value="DR">DR</option>
                                                    <option value="CR">CR</option>
                                                </select>
                                            </td>
                                            <td className="text-center">
                                                <button 
                                                    type="button" 
                                                    className="btn btn-sm text-danger" 
                                                    onClick={() => handleRemoveRow(row.id)}
                                                    disabled={rows.length === 1}
                                                >
                                                    <i className="isax isax-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <button 
                                type="button" 
                                className="btn btn-soft-primary" 
                                onClick={handleAddRow}
                            >
                                <i className="isax isax-add-circle me-2"></i>Add More Rows
                            </button>
                            
                            <div className="d-flex gap-2">
                                <Link to="/accounting/ledgers" className="btn btn-cancel">Cancel</Link>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary px-5" 
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <><span className="spinner-border spinner-border-sm me-2"></span>Saving Ledgers...</>
                                    ) : (
                                        <><i className="isax isax-save-2 me-2"></i>Save All Ledgers</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BulkAddLedgers;
