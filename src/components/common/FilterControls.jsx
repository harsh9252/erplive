import React from 'react';
import { Link } from 'react-router-dom';

const FilterControls = ({
    searchTerm = "",
    setSearchTerm,
    searchPlaceholder = "Search...",
    showFilter = true,
    filterTarget = "#customcanvas",
    sortBy,
    setSortBy,
    sortOptions = [],
    visibleColumns = {},
    toggleColumn,
    columnLabelMapping = {}
}) => {
    return (
        <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center flex-wrap gap-2">
                    {setSearchTerm && (
                        <div className="table-search d-flex align-items-center mb-0">
                            <div className="search-input">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={searchPlaceholder}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                    {showFilter && (
                        <Link
                            className="btn btn-outline-white fw-normal d-inline-flex align-items-center"
                            to="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target={filterTarget}
                        >
                            <i className="isax isax-filter me-1"></i>Filter
                        </Link>
                    )}
                </div>

                <div className="d-flex align-items-center flex-wrap gap-2">
                    {sortOptions.length > 0 && (
                        <div className="dropdown">
                            <Link to="#" className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                <i className="isax isax-sort me-1"></i>Sort By :{' '}
                                <span className="fw-normal ms-1">{sortBy}</span>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end">
                                {sortOptions.map(option => (
                                    <li key={option}>
                                        <button className="dropdown-item" onClick={() => setSortBy(option)}>
                                            {option}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {Object.keys(visibleColumns).length > 0 && (
                        <div className="dropdown">
                            <Link to="#" className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                                <i className="isax isax-grid-3 me-1"></i>Column
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end">
                                {Object.keys(visibleColumns).map(col => (
                                    <li key={col}>
                                        <label className="dropdown-item d-flex align-items-center form-switch">
                                            <input
                                                className="form-check-input m-0 me-2"
                                                type="checkbox"
                                                checked={visibleColumns[col]}
                                                onChange={() => toggleColumn(col)}
                                            />
                                            <span>
                                                {columnLabelMapping[col] || col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterControls;
