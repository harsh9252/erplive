import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import apiService from '../services/api';
import { useNotification } from '../contexts/NotificationContext';

const AccessoriesManager = ({ userId, readOnly = false }) => {
    const { showToast, confirmAction } = useNotification();
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Form states
    const [itemName, setItemName] = useState('');
    const [company, setCompany] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [givenDate, setGivenDate] = useState(new Date().toISOString().split('T')[0]);
    const [returnDate, setReturnDate] = useState('');
    const [status, setStatus] = useState('Given');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (userId) fetchAccessories();
    }, [userId]);

    const fetchAccessories = async () => {
        try {
            setLoading(true);
            const data = await apiService.getUserAccessories(userId);
            setAccessories(data || []);
        } catch (error) {
            console.error('Error fetching accessories:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setItemName('');
        setCompany('');
        setSerialNumber('');
        setGivenDate(new Date().toISOString().split('T')[0]);
        setReturnDate('');
        setStatus('Given');
        setNotes('');
        setShowAddForm(false);
        setEditingId(null);
    };

    const handleEdit = (acc) => {
        setItemName(acc.item_name);
        setCompany(acc.company || '');
        setSerialNumber(acc.serial_number || '');
        setGivenDate(acc.given_date ? acc.given_date.split('T')[0] : '');
        setReturnDate(acc.return_date ? acc.return_date.split('T')[0] : '');
        setStatus(acc.status || 'Given');
        setNotes(acc.notes || '');
        setEditingId(acc.id);
        setShowAddForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            console.error('UserId is missing in AccessoriesManager');
            showToast('User ID is missing. Cannot save asset.', 'error');
            return;
        }

        try {
            const data = {
                user_id: userId,
                item_name: itemName,
                company: company,
                serial_number: serialNumber,
                given_date: givenDate,
                return_date: returnDate || null,
                status: status,
                notes: notes
            };

            if (editingId) {
                await apiService.updateAccessory(editingId, data);
                setEditingId(null);
            } else {
                await apiService.createAccessory(data);
            }

            // Reset form
            resetForm();
            fetchAccessories();
            showToast(`Asset ${editingId ? 'updated' : 'added'} successfully`, 'success');
        } catch (error) {
            console.error('Error saving accessory:', error);
            showToast(`Failed to save asset: ${error.message || 'Unknown error'}`, 'error');
        }
    };

    const handleDelete = async (id) => {
        const confirmed = await confirmAction({
            title: 'Delete Asset Record',
            message: 'Are you sure you want to delete this asset record? This action cannot be undone.',
            type: 'danger'
        });

        if (confirmed) {
            try {
                await apiService.deleteAccessory(id);
                showToast('Asset record deleted successfully', 'success');
                fetchAccessories();
            } catch (error) {
                console.error('Error deleting accessory:', error);
                showToast('Failed to delete asset record', 'error');
            }
        }
    };

    const markReturned = async (acc) => {
        const confirmed = await confirmAction({
            title: 'Mark as Returned',
            message: `Are you sure you want to mark ${acc.item_name} as returned today?`,
            type: 'primary'
        });

        if (confirmed) {
            try {
                const today = new Date().toISOString().split('T')[0];
                await apiService.updateAccessory(acc.id, {
                    ...acc,
                    status: 'Returned',
                    return_date: today,
                    given_date: acc.given_date ? acc.given_date.split('T')[0] : null // Format date for API
                });
                showToast(`${acc.item_name} marked as returned`, 'success');
                fetchAccessories();
            } catch (error) {
                console.error('Error updating accessory:', error);
                showToast('Failed to mark as returned', 'error');
            }
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--primary-color)' }}>Detailed Assets Record</h3>
                {!readOnly && (
                    <button
                        onClick={() => { resetForm(); setShowAddForm(!showAddForm); }}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    >
                        <FiPlus /> {showAddForm ? 'Cancel' : 'Add Asset'}
                    </button>
                )}
            </div>

            {showAddForm && !readOnly && (
                <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Item Name *</label>
                        <input
                            required
                            className="w-full p-2 border rounded text-sm"
                            value={itemName} onChange={e => setItemName(e.target.value)}
                            placeholder="e.g. Laptop"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Company/Brand</label>
                        <input
                            className="w-full p-2 border rounded text-sm"
                            value={company} onChange={e => setCompany(e.target.value)}
                            placeholder="e.g. Dell"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Serial Number/ID</label>
                        <input
                            className="w-full p-2 border rounded text-sm"
                            value={serialNumber} onChange={e => setSerialNumber(e.target.value)}
                            placeholder="e.g. SN123456"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 uppercase">Given Date</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded text-sm"
                            value={givenDate} onChange={e => setGivenDate(e.target.value)}
                        />
                    </div>
                    {editingId && (
                        <>
                            <div>
                                <label className="text-xs text-gray-500 uppercase">Status</label>
                                <select
                                    className="w-full p-2 border rounded text-sm"
                                    value={status} onChange={e => setStatus(e.target.value)}
                                >
                                    <option value="Given">Given</option>
                                    <option value="Returned">Returned</option>
                                    <option value="Lost">Lost</option>
                                    <option value="Damaged">Damaged</option>
                                </select>
                            </div>
                            {status === 'Returned' && (
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Return Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-2 border rounded text-sm"
                                        value={returnDate} onChange={e => setReturnDate(e.target.value)}
                                    />
                                </div>
                            )}
                        </>
                    )}
                    <div className="sm:col-span-2">
                        <label className="text-xs text-gray-500 uppercase">Notes</label>
                        <textarea
                            className="w-full p-2 border rounded text-sm"
                            rows="2"
                            value={notes} onChange={e => setNotes(e.target.value)}
                            placeholder="Condition, received by, etc."
                        />
                    </div>
                    <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
                        <button type="button" onClick={() => setShowAddForm(false)} className="px-3 py-1 text-xs text-gray-600 border rounded">Cancel</button>
                        <button type="submit" className="px-3 py-1 text-xs bg-blue-600 text-white rounded">Save</button>
                    </div>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border-b">Item</th>
                            <th className="p-2 border-b">Details</th>
                            <th className="p-2 border-b">Dates</th>
                            <th className="p-2 border-b">Status</th>
                            {!readOnly && <th className="p-2 border-b">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {accessories.length === 0 ? (
                            <tr><td colSpan={readOnly ? 4 : 5} className="p-4 text-center text-gray-500">No assets recorded</td></tr>
                        ) : (
                            accessories.map(acc => (
                                <tr key={acc.id} className="border-b hover:bg-gray-50">
                                    <td className="p-2 font-medium">{acc.item_name}</td>
                                    <td className="p-2 text-xs text-gray-600">
                                        <div>{acc.company}</div>
                                        <div className="font-mono">{acc.serial_number}</div>
                                        {acc.notes && <div className="italic text-gray-400 truncate max-w-[150px]">{acc.notes}</div>}
                                    </td>
                                    <td className="p-2 text-xs">
                                        <div>Given: {acc.given_date ? new Date(acc.given_date).toLocaleDateString() : '-'}</div>
                                        {acc.return_date && <div className="text-orange-600">Ret: {new Date(acc.return_date).toLocaleDateString()}</div>}
                                    </td>
                                    <td className="p-2">
                                        <span className={`px-2 py-0.5 rounded text-xs ${acc.status === 'Given' ? 'bg-green-100 text-green-800' :
                                            acc.status === 'Returned' ? 'bg-gray-100 text-gray-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {acc.status}
                                        </span>
                                    </td>
                                    {!readOnly && (
                                        <td className="p-2 flex gap-2">
                                            <button title="Edit" onClick={() => handleEdit(acc)} className="text-blue-600 hover:text-blue-800"><FiEdit2 /></button>
                                            {acc.status === 'Given' && (
                                                <button title="Mark Returned" onClick={() => markReturned(acc)} className="text-orange-600 hover:text-orange-800"><FiRefreshCw /></button>
                                            )}
                                            <button title="Delete" onClick={() => handleDelete(acc.id)} className="text-red-600 hover:text-red-800"><FiTrash2 /></button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccessoriesManager;
