import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiPlus, FiCalendar, FiUser } from 'react-icons/fi';
import apiService from '../services/api';
import { useNotification } from '../contexts/NotificationContext';

const SalaryManager = ({ userId, currentSalary, onSuccess, readOnly = false }) => {
    const { showToast } = useNotification();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form states
    const [newSalary, setNewSalary] = useState('');
    const [incrementDate, setIncrementDate] = useState(new Date().toISOString().split('T')[0]);
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        if (userId) fetchHistory();
    }, [userId]);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const data = await apiService.getSalaryIncrements(userId);
            // Sort by date descending
            const sorted = (data || []).sort((a, b) => new Date(b.increment_date) - new Date(a.increment_date));
            setHistory(sorted);
        } catch (error) {
            console.error('Error fetching salary history:', error);
        } finally {
            setLoading(false);
        }
    };

    const getIncrementAmount = () => {
        if (!newSalary || !currentSalary) return 0;
        return parseFloat(newSalary) - parseFloat(currentSalary);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                employee_id: userId,
                old_salary: currentSalary,
                new_salary: parseFloat(newSalary),
                increment_amount: getIncrementAmount(),
                increment_date: incrementDate,
                remarks
            };

            await apiService.createSalaryIncrement(payload);

            fetchHistory();
            setShowAddForm(false);
            setNewSalary('');
            setRemarks('');

            if (onSuccess) onSuccess(parseFloat(newSalary)); // Trigger parent refresh with new salary

            showToast('Salary incremented successfully', 'success');
        } catch (error) {
            console.error('Error incrementing salary:', error);
            showToast('Failed to increment salary', 'error');
        }
    };

    return (
        <div className="space-y-6">
            {!readOnly && (
                <div className="bg-gradient-to-r from-green-50 to-white border border-green-100 p-4 rounded-xl flex justify-between items-center shadow-sm">
                    <div>
                        <span className="text-xs text-green-600 font-semibold uppercase block tracking-wider mb-1">Current Basic Salary</span>
                        <span className="text-2xl font-bold text-green-800 font-mono">₹{currentSalary ? parseFloat(currentSalary).toLocaleString('en-IN') : 0}</span>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="group bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-green-700 hover:shadow-lg transition-all active:scale-95"
                    >
                        <FiTrendingUp className="group-hover:translate-y-[-2px] transition-transform" />
                        Give Increment
                    </button>
                </div>
            )}

            {showAddForm && !readOnly && (
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-lg animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                    <h4 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="bg-green-100 p-1.5 rounded-lg text-green-600"><FiPlus size={16} /></span>
                        New Increment Details
                    </h4>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1.5">New Basic Salary <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
                                    <input
                                        type="number"
                                        required
                                        className="w-full pl-7 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none font-medium"
                                        value={newSalary} onChange={e => setNewSalary(e.target.value)}
                                        placeholder="Enter new amount"
                                    />
                                </div>
                                <div className="text-xs font-medium mt-1.5 flex justify-between">
                                    <span className="text-gray-400">Difference:</span>
                                    <span className={getIncrementAmount() >= 0 ? 'text-green-600' : 'text-red-600'}>
                                        {getIncrementAmount() > 0 ? '+' : ''}{getIncrementAmount().toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1.5">Effective Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    required
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                                    value={incrementDate} onChange={e => setIncrementDate(e.target.value)}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1.5">Remarks</label>
                                <textarea
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none resize-none"
                                    rows="2"
                                    value={remarks} onChange={e => setRemarks(e.target.value)}
                                    placeholder="Reason for increment, performance notes, etc."
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6 border-t border-gray-100 pt-4">
                            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-sm text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors">Cancel</button>
                            <button type="submit" className="px-6 py-2 text-sm bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-md hover:shadow-lg transition-all">Confirm Increment</button>
                        </div>
                    </form>
                </div>
            )}

            <div>
                {!readOnly && (
                    <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <FiCalendar className="text-green-600" />
                        Increment History
                        <span className="text-xs font-normal text-gray-400 ml-1">({history.length} records)</span>
                    </h4>
                )}

                {loading ? (
                    <div className="flex justify-center p-8"><div className="animate-spin h-6 w-6 border-2 border-green-500 border-t-transparent rounded-full"></div></div>
                ) : history.length === 0 ? (
                    <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400 text-sm">
                        No salary increment history found.
                    </div>
                ) : (
                    <div className="relative border-l-2 border-green-100 ml-3 space-y-8 pb-4">
                        {history.map((record, index) => (
                            <div key={record.id} className="relative pl-8">
                                {/* Timeline Dot */}
                                <span className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${index === 0 ? 'bg-green-500 ring-4 ring-green-100' : 'bg-gray-300'}`}></span>

                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                                    <div className="p-4 border-b border-gray-50 flex flex-wrap justify-between items-start gap-2 bg-gradient-to-r from-gray-50/50 to-transparent">
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">Incremented</p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                <FiCalendar size={10} />
                                                {new Date(record.increment_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${record.increment_amount >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {record.increment_amount !== null && record.increment_amount !== undefined ? (record.increment_amount >= 0 ? '+' : '-') + '₹' + Math.abs(record.increment_amount).toLocaleString('en-IN') : '₹0'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4 grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Previous Salary</span>
                                            <p className="text-sm font-semibold text-gray-600">₹{record.old_salary !== null && record.old_salary !== undefined ? record.old_salary.toLocaleString('en-IN') : '0'}</p>
                                        </div>
                                        <div className="space-y-1 relative">
                                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-gray-200">→</div>
                                            <span className="text-[10px] uppercase font-bold text-green-600 tracking-wider pl-2">New Salary</span>
                                            <p className="text-lg font-bold text-gray-800 pl-2">₹{record.new_salary !== null && record.new_salary !== undefined ? record.new_salary.toLocaleString('en-IN') : '0'}</p>
                                        </div>
                                    </div>

                                    {record.remarks && (
                                        <div className="px-4 pb-4 pt-0">
                                            <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 italic border border-gray-100">
                                                "{record.remarks}"
                                            </div>
                                        </div>
                                    )}

                                    <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-400 flex justify-between items-center">
                                        <span className="flex items-center gap-1"><FiUser size={10} /> Recorded by</span>
                                        <span>{record.created_by_name || 'System'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalaryManager;
