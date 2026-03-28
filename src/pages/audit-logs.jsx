import React from 'react';
import { Link } from 'react-router-dom';

const AuditLogs = () => {
    return (
        <>
            <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
                <div>
                    <h6 className="mb-0">Audit Logs</h6>
                </div>
            </div>
            <div className="card shadow-lg position-relative border-0">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-nowrap datatable text-center">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Action</th>
                                    <th>User</th>
                                    <th>Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No audit logs found.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuditLogs;
