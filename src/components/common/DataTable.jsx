import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DataTable = ({
    columns = [],
    data = [],
    visibleColumns = {},
    onSort = null,
    sortConfig = { key: null, direction: 'asc' },
    emptyMessage = "No results found",
    showSelection = true,
    onSelectAll = () => { },
    selectedIds = [],
    onSelectRow = () => { },
    defaultRowsPerPage = 15,
    footerRow = null,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

    // Reset pagination when data changes
    useEffect(() => {
        setCurrentPage(1);
    }, [data.length]);

    // Filter columns based on visibility
    const filteredColumns = columns.filter(col =>
        !col.id || visibleColumns[col.id] !== false
    );

    // Pagination Calculation
    const totalItems = data.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Helper to generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <>
            <div className="table-responsive">
                <table className="table table-nowrap datatable">
                    <thead className="thead-light">
                        <tr>
                            {showSelection && (
                                <th className="no-sort">
                                    <div className="form-check form-check-md">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="select-all"
                                            onChange={(e) => onSelectAll(e.target.checked)}
                                        />
                                    </div>
                                </th>
                            )}
                            {filteredColumns.map((col, index) => (
                                <th
                                    key={index}
                                    style={col.sortable ? { cursor: 'pointer' } : {}}
                                    onClick={() => col.sortable && onSort && onSort(col.id)}
                                    className={!col.sortable ? 'no-sort' : ''}
                                >
                                    {col.label}
                                    {col.sortable && sortConfig.key === col.id && (
                                        <span className="ms-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, rowIndex) => (
                                <tr key={row.id || rowIndex}>
                                    {showSelection && (
                                        <td>
                                            <div className="form-check form-check-md">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={selectedIds.includes(row.id)}
                                                    onChange={(e) => onSelectRow(row.id, e.target.checked)}
                                                />
                                            </div>
                                        </td>
                                    )}
                                    {filteredColumns.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            {col.render ? col.render(row[col.id], row) : row[col.id]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={filteredColumns.length + (showSelection ? 1 : 0)} className="text-center">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                    {footerRow && <tfoot>{footerRow}</tfoot>}
                </table>
            </div>

            {totalItems > 0 && (
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mt-3 border-top pt-3">
                    <div className="d-flex align-items-center gap-2">
                        <span className="fs-13 text-muted">Show</span>
                        <select
                            className="form-select form-select-sm w-auto"
                            style={{ minWidth: "70px" }}
                            value={rowsPerPage}
                            onChange={(e) => setRowsPerPage(Number(e.target.value))}
                        >
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span className="fs-13 text-muted">entries</span>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <span className="fs-13 text-muted d-none d-sm-inline">
                            Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, totalItems)} of {totalItems} entries
                        </span>
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <i className="fa-solid fa-chevron-left fs-10"></i>
                                    </button>
                                </li>

                                {getPageNumbers().map(page => (
                                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <i className="fa-solid fa-chevron-right fs-10"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default DataTable;
