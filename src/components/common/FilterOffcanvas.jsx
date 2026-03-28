import React from 'react';

const FilterOffcanvas = ({
    id = "customcanvas",
    title = "Filter",
    children,
    onReset,
    onApply
}) => {
    return (
        <div className="offcanvas offcanvas-offset offcanvas-end" tabIndex="-1" id={id}>
            <div className="offcanvas-header d-block pb-0">
                <div className="border-bottom d-flex align-items-center justify-content-between pb-3">
                    <h6 className="offcanvas-title">{title}</h6>
                    <button type="button" className="btn-close btn-close-modal custom-btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>
            </div>
            <div className="offcanvas-body pt-3">
                {children}
                <div className="offcanvas-footer mt-4">
                    <div className="row g-2">
                        <div className="col-6">
                            <button className="btn btn-outline-white w-100" onClick={onReset}>Reset</button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-primary w-100" data-bs-dismiss="offcanvas" onClick={onApply}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterOffcanvas;
