import React from 'react';

const SummaryCards = ({ cards = [], variant = "style1" }) => {
    if (cards.length === 0) return null;

    return (
        <div className="border-bottom mb-3">
            <div className="row">
                {cards.map((card, idx) => (
                    <div className="col-xl-3 col-lg-4 col-md-6" key={idx}>
                        <div className={`card position-relative border-0 shadow-sm ${variant === 'style2' ? 'overflow-hidden' : ''}`}>
                            <div className="card-body">
                                {variant === "style1" ? (
                                    <div className="d-flex align-items-center">
                                        <div className="me-3 flex-shrink-0">
                                            {card.icon ? (
                                                <img src={card.icon} alt="icon" style={{ width: '40px' }} />
                                            ) : (
                                                <i className={`isax isax-${card.isax} fs-24 text-${card.color || 'primary'}`}></i>
                                            )}
                                        </div>
                                        <div>
                                            <p className="mb-1 text-muted fs-13 text-truncate">{card.label}</p>
                                            <div className="d-flex align-items-center">
                                                <h6 className="fs-18 fw-bold mb-0 text-dark">{card.amount}</h6>
                                                {card.change && (
                                                    <span className={`ms-2 badge badge-soft-${card.trend === 'down' ? 'danger' : 'success'} fs-10`}>
                                                        {card.change}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="mb-1 text-muted fs-13 text-truncate">{card.label}</p>
                                            <h6 className="fs-18 fw-bold mb-2 text-dark">{card.amount}</h6>
                                            {card.change && (
                                                <p className="fs-11 mb-0">
                                                    <span className={`text-${card.change.startsWith('+') ? 'success' : 'danger'}`}>
                                                        {card.change}
                                                    </span> {card.duration || 'from last month'}
                                                </p>
                                            )}
                                        </div>
                                        <div className={`avatar avatar-md rounded bg-soft-${card.color || 'primary'} text-${card.color || 'primary'}`}>
                                            <i className={`isax isax-${card.icon || 'chart'} fs-20`}></i>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SummaryCards;
