import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiBriefcase, FiCalendar, FiUser, FiArrowUp } from 'react-icons/fi';
import apiService from '../services/api';
import { useNotification } from '../contexts/NotificationContext';

const PromotionManager = ({ userId, currentDesignation, onSuccess, readOnly = false }) => {
    const { showToast } = useNotification();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form states
    const [newDesignation, setNewDesignation] = useState('');
    const [promotionDate, setPromotionDate] = useState(new Date().toISOString().split('T')[0]);
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        if (userId) fetchHistory();
    }, [userId]);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const data = await apiService.getPromotions(userId);
            // Sort by date descending
            const sorted = (data || []).sort((a, b) => new Date(b.promotion_date) - new Date(a.promotion_date));
            setHistory(sorted);
        } catch (error) {
            console.error('Error fetching promotion history:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                employee_id: userId,
                old_designation: currentDesignation,
                new_designation: newDesignation,
                promotion_date: promotionDate,
                remarks
            };

            await apiService.createPromotion(payload);

            fetchHistory();
            setShowAddForm(false);
            setNewDesignation('');
            setRemarks('');

            if (onSuccess) onSuccess(newDesignation); // Trigger parent refresh with new designation

            showToast('Promotion recorded successfully', 'success');
        } catch (error) {
            console.error('Error promoting employee:', error);
            showToast('Failed to promote employee', 'error');
        }
    };

    return (
        <div className="space-y-6 mt-6 pt-6 border-t border-gray-100">
            {!readOnly && (
                <div className="bg-gradient-to-r from-purple-50 to-white border border-purple-100 p-4 rounded-xl flex justify-between items-center shadow-sm">
                    <div>
                        <span className="text-xs text-purple-600 font-semibold uppercase block tracking-wider mb-1">Current Designation</span>
                        <span className="text-xl font-bold text-purple-800 flex items-center gap-2">
                            <FiBriefcase className="text-lg" /> {currentDesignation || 'Not Assigned'}
                        </span>
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="group bg-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-purple-700 hover:shadow-lg transition-all active:scale-95"
                    >
                        <FiTrendingUp className="group-hover:translate-y-[-2px] transition-transform" />
                        Promote
                    </button>
                </div>
            )}

            {showAddForm && !readOnly && (
                <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-lg animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                    <h4 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="bg-purple-100 p-1.5 rounded-lg text-purple-600"><FiArrowUp size={16} /></span>
                        Promote Employee
                    </h4>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1.5">New Designation <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none font-medium"
                                    value={newDesignation} onChange={e => setNewDesignation(e.target.value)}
                                    placeholder="e.g. Senior Developer"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1.5">Effective Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    required
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                                    value={promotionDate} onChange={e => setPromotionDate(e.target.value)}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1.5">Remarks</label>
                                <textarea
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none"
                                    rows="2"
                                    value={remarks} onChange={e => setRemarks(e.target.value)}
                                    placeholder="Reason for promotion, achievements, etc."
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6 border-t border-gray-100 pt-4">
                            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-sm text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors">Cancel</button>
                            <button type="submit" className="px-6 py-2 text-sm bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 shadow-md hover:shadow-lg transition-all">Confirm Promotion</button>
                        </div>
                    </form>
                </div>
            )}

            <div>
                {!readOnly && (
                    <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <FiCalendar className="text-purple-600" />
                        Promotion History
                        <span className="text-xs font-normal text-gray-400 ml-1">({history.length} records)</span>
                    </h4>
                )}

                {loading ? (
                    <div className="flex justify-center p-8"><div className="animate-spin h-6 w-6 border-2 border-purple-500 border-t-transparent rounded-full"></div></div>
                ) : history.length === 0 ? (
                    <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400 text-sm">
                        No promotion history found.
                    </div>
                ) : (
                    <div className="relative border-l-2 border-purple-100 ml-3 space-y-8 pb-4">
                        {history.map((record, index) => (
                            <div key={record.id} className="relative pl-8">
                                {/* Timeline Dot */}
                                <span className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${index === 0 ? 'bg-purple-500 ring-4 ring-purple-100' : 'bg-gray-300'}`}></span>

                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                                    <div className="p-4 border-b border-gray-50 flex flex-wrap justify-between items-start gap-2 bg-gradient-to-r from-gray-50/50 to-transparent">
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">Promoted</p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                <FiCalendar size={10} />
                                                {new Date(record.promotion_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-4 grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Previous Role</span>
                                            <p className="text-sm font-semibold text-gray-600">{record.old_designation || 'None'}</p>
                                        </div>
                                        <div className="space-y-1 relative">
                                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-gray-200">→</div>
                                            <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider pl-2">New Role</span>
                                            <p className="text-lg font-bold text-gray-800 pl-2">{record.new_designation}</p>
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

export default PromotionManager;
