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
                                <Link to="#" className="btn btn-outline-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                    <i className="isax isax-export-1 me-1"></i>Export
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#">Download as PDF</Link></li>
                                    <li><Link className="dropdown-item" to="#">Download as Excel</Link></li>
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
