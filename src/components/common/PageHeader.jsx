import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, actions = [] }) => {
    return (
        <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
            <div>
                <h6 className="mb-0">{title}</h6>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
                {actions.map((action, index) => {
                    if (action.type === 'export') {
                        return (
                            <div className="dropdown" key={index}>
                                <button className="btn btn-outline-white d-inline-flex align-items-center shadow-none border" data-bs-toggle="dropdown" data-bs-display="static">
                                    <i className="isax isax-export-1 me-1"></i>Export
                                </button>
                                <ul className="dropdown-menu border-0 shadow" style={{ right: 0, left: 'auto', transform: 'translateX(-20px)' }}>
                                    <li><button className="dropdown-item py-2 border-0 bg-transparent" onClick={action.onDownloadPDF}>Download as PDF</button></li>
                                    <li><button className="dropdown-item py-2 border-0 bg-transparent" onClick={action.onDownloadExcel}>Download as Excel</button></li>
                                </ul>
                            </div>
                        );
                    }
                    if (action.type === 'link') {
                        return (
                            <div key={index}>
                                <Link to={action.to} className={`btn btn-${action.variant || 'primary'} d-flex align-items-center`}>
                                    {action.icon && <i className={`${action.icon} me-1`}></i>}
                                    {action.label}
                                </Link>
                            </div>
                        );
                    }
                    if (action.type === 'button') {
                        return (
                            <div key={index}>
                                <button onClick={action.onClick} className={`btn btn-${action.variant || 'primary'} d-flex align-items-center`}>
                                    {action.icon && <i className={`${action.icon} me-1`}></i>}
                                    {action.label}
                                </button>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default PageHeader;
