import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { getEmployeeAttendance, markAttendance, markBulkAttendance, getAllAttendance } from '../services/attendanceService';
import { getEmployees } from '../services/employeeService';
import SearchableSelect from '../components/SearchableSelect';

const Attendance = () => {
    const [activeTab, setActiveTab] = useState('calendar');
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [bulkDate, setBulkDate] = useState(new Date().toISOString().split('T')[0]);
    const [bulkRecords, setBulkRecords] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const calendarRef = useRef(null);
    const fullCalendarInstance = useRef(null);

    // Initial Fetch: Employees
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getEmployees({ status: 'ACTIVE' });
                const resData = response.data || response;
                const list = Array.isArray(resData) ? resData : (resData.items || resData.rows || []);
                const mapped = list.map(emp => ({
                    value: emp.id || emp._id,
                    label: `${emp.name} (${emp.employee_code})`
                }));
                setEmployees(mapped);
                if (mapped.length > 0) setSelectedEmployee(mapped[0].value);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    // Calendar Tab Logic
    const fetchAttendance = useCallback(async (month, year) => {
        if (!selectedEmployee) return;
        setLoading(true);
        try {
            const m = month || currentMonth;
            const y = year || currentYear;
            const response = await getEmployeeAttendance(selectedEmployee, m, y);
            const data = response.data || response || [];
            setAttendanceData(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching attendance:', error);
            setAttendanceData([]);
        } finally {
            setLoading(false);
        }
    }, [selectedEmployee, currentMonth, currentYear]);

    useEffect(() => {
        if (activeTab === 'calendar' && selectedEmployee) {
            fetchAttendance();
        }
    }, [activeTab, selectedEmployee]);

    // Initialize FullCalendar
    useEffect(() => {
        if (activeTab === 'calendar' && window.FullCalendar && calendarRef.current) {
            const calendarEl = calendarRef.current;
            
            // Map attendance to FullCalendar events
            const events = attendanceData.map(record => ({
                title: record.status.replace('_', ' '),
                start: record.attendance_date || record.date,
                className: getStatusClass(record.status),
                extendedProps: { ...record }
            }));

            if (fullCalendarInstance.current) {
                fullCalendarInstance.current.destroy();
            }

            const calendar = new window.FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,listMonth'
                },
                initialView: 'dayGridMonth',
                events: events,
                height: 'auto',
                dateClick: (info) => {
                    handleDateClick(info.dateStr);
                },
                datesSet: (info) => {
                    const date = info.view.currentStart;
                    const m = date.getMonth() + 1;
                    const y = date.getFullYear();
                    if (m !== currentMonth || y !== currentYear) {
                        setCurrentMonth(m);
                        setCurrentYear(y);
                        fetchAttendance(m, y);
                    }
                }
            });

            calendar.render();
            fullCalendarInstance.current = calendar;
        }

        return () => {
            if (fullCalendarInstance.current) {
                fullCalendarInstance.current.destroy();
                fullCalendarInstance.current = null;
            }
        };
    }, [activeTab, attendanceData]);

    // Bulk Tab Logic
    const fetchBulkRecords = useCallback(async () => {
        setLoading(true);
        try {
            // 1. Fetch all active employees
            const empResponse = await getEmployees({ status: 'ACTIVE' });
            const empResData = empResponse.data || empResponse;
            const empList = Array.isArray(empResData) ? empResData : (empResData.items || empResData.rows || []);
            
            // 2. We'll initialize with defaults for now as the current Payroll API
            // strictly requires employee_id for fetching (Individual only).
            // Users should verify saves via the Individual Calendar tab.
            
            const records = empList.map(emp => {
                const empId = emp.id || emp._id;
                return {
                    employee_id: empId,
                    name: emp.name,
                    code: emp.employee_code,
                    status: 'PRESENT',
                    check_in: '09:00',
                    check_out: '18:00',
                    hours: ''
                };
            });
            
            setBulkRecords(records);
        } catch (error) {
            toast.error('Failed to load employee list for bulk marking');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [bulkDate]);

    useEffect(() => {
        if (activeTab === 'bulk') {
            fetchBulkRecords();
        }
    }, [activeTab, fetchBulkRecords]);

    const handleBulkStatusChange = (index, status) => {
        const updated = [...bulkRecords];
        updated[index].status = status;
        setBulkRecords(updated);
    };

    const handleBulkTimeChange = (index, field, value) => {
        const updated = [...bulkRecords];
        updated[index][field] = value;
        setBulkRecords(updated);
    };

    const setAllStatus = (status) => {
        setBulkRecords(prev => prev.map(r => ({ ...r, status })));
    };

    const saveBulkAttendance = async () => {
        setLoading(true);
        try {
            await markBulkAttendance({
                attendance_date: bulkDate,
                records: bulkRecords.map(r => ({
                    ...r,
                    attendance_date: bulkDate,
                    // Sending both versions of field names in case of inconsistency in backend
                    check_in_time: r.check_in,
                    check_out_time: r.check_out
                }))
            });
            toast.success('Bulk attendance marked successfully');
        } catch (error) {
            console.error('Save error:', error);
            const msg = error.response?.data?.message || 'Failed to save bulk attendance';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'PRESENT': return 'bg-success border-success text-white';
            case 'ABSENT': return 'bg-danger border-danger text-white';
            case 'HALF_DAY': return 'bg-warning border-warning text-dark';
            case 'LEAVE': return 'bg-info border-info text-white';
            case 'HOLIDAY': return 'bg-secondary border-secondary text-white';
            case 'WEEK_OFF': return 'bg-dark border-dark text-white';
            default: return 'bg-light border-light text-dark';
        }
    };

    const handleDateClick = (dateStr) => {
        // Here we could open a modal for single entry marking
        console.log('Date clicked:', dateStr);
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h4 className="fw-bold mb-1">Attendance Management</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 fs-13">
                            <li className="breadcrumb-item">Payroll & HR</li>
                            <li className="breadcrumb-item active">Attendance</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white p-0 border-0">
                    <ul className="nav nav-tabs nav-tabs-bottom border-0">
                        <li className="nav-item">
                            <button 
                                className={`nav-link border-0 px-4 py-3 fw-bold ${activeTab === 'calendar' ? 'active text-primary border-bottom border-primary border-3' : 'text-muted'}`}
                                onClick={() => setActiveTab('calendar')}
                            >
                                <i className="isax isax-calendar-1 me-2 fs-18"></i>
                                Individual Calendar
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link border-0 px-4 py-3 fw-bold ${activeTab === 'bulk' ? 'active text-primary border-bottom border-primary border-3' : 'text-muted'}`}
                                onClick={() => setActiveTab('bulk')}
                            >
                                <i className="isax isax-user-tick me-2 fs-18"></i>
                                Bulk Mark Daily
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    {activeTab === 'calendar' ? (
                        <div className="row g-4">
                            <div className="col-md-4">
                                <label className="form-label small fw-bold text-muted">Select Employee</label>
                                <SearchableSelect 
                                    options={employees}
                                    value={selectedEmployee}
                                    onChange={setSelectedEmployee}
                                    placeholder="Search Employee..."
                                />
                                
                                <div className="mt-4 p-3 bg-light rounded border border-dashed border-primary">
                                    <h6 className="fw-bold mb-3 small text-uppercase text-primary">Status Guide</h6>
                                    <div className="d-flex flex-column gap-2 small">
                                        <div className="d-flex align-items-center"><span className="p-1 px-2 rounded bg-success text-white me-2">PRESENT</span> Regular working day</div>
                                        <div className="d-flex align-items-center"><span className="p-1 px-2 rounded bg-danger text-white me-2">ABSENT</span> Uninformed absence</div>
                                        <div className="d-flex align-items-center"><span className="p-1 px-2 rounded bg-warning text-dark me-2">HALF DAY</span> Partial shift</div>
                                        <div className="d-flex align-items-center"><span className="p-1 px-2 rounded bg-info text-white me-2">LEAVE</span> Approved leave</div>
                                        <div className="d-flex align-items-center"><span className="p-1 px-2 rounded bg-secondary text-white me-2">HOLIDAY</span> Public holiday</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="calendar-container border rounded p-2 bg-white shadow-sm">
                                    <div ref={calendarRef}></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="row g-3 align-items-end mb-4 bg-light p-3 rounded border">
                                <div className="col-md-3">
                                    <label className="form-label small fw-bold text-muted">Attendance Date</label>
                                    <input 
                                        type="date" 
                                        className="form-control form-control-sm shadow-none" 
                                        value={bulkDate}
                                        onChange={(e) => setBulkDate(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold text-muted">Set Status For All</label>
                                    <div className="d-flex gap-2 flex-wrap">
                                        <button className="btn btn-outline-success btn-xs" onClick={() => setAllStatus('PRESENT')}>Present All</button>
                                        <button className="btn btn-outline-danger btn-xs" onClick={() => setAllStatus('ABSENT')}>Absent All</button>
                                        <button className="btn btn-outline-secondary btn-xs" onClick={() => setAllStatus('HOLIDAY')}>Holiday All</button>
                                        <button className="btn btn-outline-dark btn-xs" onClick={() => setAllStatus('WEEK_OFF')}>Week Off All</button>
                                    </div>
                                </div>
                                <div className="col-md-3 text-end">
                                    <button 
                                        className="btn btn-primary btn-sm px-4 shadow-none"
                                        onClick={saveBulkAttendance}
                                        disabled={loading || bulkRecords.length === 0}
                                    >
                                        {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="isax isax-tick-circle me-2 fs-16"></i>}
                                        Save All Records
                                    </button>
                                </div>
                            </div>

                            <div className="table-responsive border rounded overflow-hidden">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light fs-12 text-uppercase text-muted">
                                        <tr>
                                            <th className="ps-4">Employee</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">Check In</th>
                                            <th className="text-center">Check Out</th>
                                            <th className="text-center">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && bulkRecords.length === 0 ? (
                                            <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                                        ) : bulkRecords.length === 0 ? (
                                            <tr><td colSpan="5" className="text-center py-5 text-muted">No active employees found.</td></tr>
                                        ) : (
                                            bulkRecords.map((record, idx) => (
                                                <tr key={record.employee_id}>
                                                    <td className="ps-4">
                                                        <div className="fw-bold text-dark">{record.name}</div>
                                                        <div className="fs-11 text-muted">{record.code}</div>
                                                    </td>
                                                    <td>
                                                        <select 
                                                            className={`form-select form-select-sm shadow-none ${getStatusClass(record.status)} text-center fw-bold`}
                                                            style={{ maxWidth: '140px', margin: '0 auto' }}
                                                            value={record.status}
                                                            onChange={(e) => handleBulkStatusChange(idx, e.target.value)}
                                                        >
                                                            <option value="PRESENT">PRESENT</option>
                                                            <option value="ABSENT">ABSENT</option>
                                                            <option value="HALF_DAY">HALF DAY</option>
                                                            <option value="LEAVE">LEAVE</option>
                                                            <option value="HOLIDAY">HOLIDAY</option>
                                                            <option value="WEEK_OFF">WEEK OFF</option>
                                                        </select>
                                                    </td>
                                                    <td className="text-center">
                                                        <input 
                                                            type="time" 
                                                            className="form-control form-control-sm shadow-none mx-auto" 
                                                            style={{ maxWidth: '120px' }}
                                                            value={record.check_in}
                                                            onChange={(e) => handleBulkTimeChange(idx, 'check_in', e.target.value)}
                                                            disabled={record.status !== 'PRESENT' && record.status !== 'HALF_DAY'}
                                                        />
                                                    </td>
                                                    <td className="text-center">
                                                        <input 
                                                            type="time" 
                                                            className="form-control form-control-sm shadow-none mx-auto" 
                                                            style={{ maxWidth: '120px' }}
                                                            value={record.check_out}
                                                            onChange={(e) => handleBulkTimeChange(idx, 'check_out', e.target.value)}
                                                            disabled={record.status !== 'PRESENT' && record.status !== 'HALF_DAY'}
                                                        />
                                                    </td>
                                                    <td className="text-center fw-bold text-muted">8h 00m</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Attendance;
