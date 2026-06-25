import React, { useState } from 'react';

const Tickets = () => {
  // Ticket statistics
  const stats = [
    {
      label: 'Total Tickets',
      value: 298,
      icon: 'isax-receipt-item',
      color: 'primary',
      change: '+5.62%',
    },
    {
      label: 'Completed Tickets',
      value: 185,
      icon: 'isax-tick-circle',
      color: 'success',
      change: '+11.4%',
    },
    {
      label: 'In Progress Tickets',
      value: 32,
      icon: 'isax-timer',
      color: 'warning',
      change: '+8.52%',
    },
    {
      label: 'Closed Tickets',
      value: 24,
      icon: 'isax-information',
      color: 'danger',
      change: '-7.45%',
    },
  ];

  // Sample tickets data
  const [tickets] = useState([
    {
      id: 1,
      title: 'Support For Theme',
      status: 'Resolved',
      statusColor: 'success',
      priority: 'Medium',
      priorityColor: 'danger',
      ticketId: '#1234',
      comments: 14,
      description:
        'Our support ticket system ensures quick resolution for your queries. Easily submit tickets for technical issues, billing inquiries, or feature requests.',
    },
    {
      id: 2,
      title: 'Verify your email',
      status: 'Pending',
      statusColor: 'warning',
      priority: 'High',
      priorityColor: 'danger',
      ticketId: '#1234',
      comments: 14,
      description:
        'Please verify your email to activate your account and access all features. Click the verification link sent to your inbox.',
    },
    {
      id: 3,
      title: 'Calling for help',
      status: 'Open',
      statusColor: 'success',
      priority: 'Low',
      priorityColor: 'primary',
      ticketId: '#1234',
      comments: 14,
      description:
        "If you require immediate support, don't hesitate to call our help center. Our dedicated team is available to assist with technical issues.",
    },
    {
      id: 4,
      title: 'Management',
      status: 'Closed',
      statusColor: 'dark',
      priority: 'Medium',
      priorityColor: 'danger',
      ticketId: '#1234',
      comments: 14,
      description:
        'Streamline your business operations with smart financial management tools. Automate invoicing, track expenses, generate reports.',
    },
  ]);

  return (
    <>
      {/* Header Section */}
      <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Tickets</h6>
        </div>

        {/* Action Buttons */}
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          {/* View Toggle Buttons */}
          <div className="d-flex align-items-center">
            <Link
              href="/tickets-list"
              className="btn btn-outline-white p-2 d-inline-flex align-items-center justify-content-center me-2"
              title="List View"
            >
              <i className="isax isax-menu-1"></i>
            </Link>
            <Link
              href="/tickets"
              className="btn btn-primary p-2 d-inline-flex align-items-center justify-content-center me-2"
              title="Grid View"
            >
              <i className="isax isax-grid-25"></i>
            </Link>
            <Link
              href="/ticket-kanban"
              className="btn btn-outline-white p-2 d-inline-flex align-items-center justify-content-center me-1"
              title="Kanban View"
            >
              <i className="isax isax-kanban"></i>
            </Link>
          </div>

          {/* Export Dropdown */}
          <button className="btn btn-soft-danger d-inline-flex align-items-center rounded px-3 border border-danger shadow-none me-2" onClick={() => typeof handleExport === 'function' ? handleExport('PDF') : null}>
                        <i className="isax isax-document-download me-2"></i>PDF
                      </button>
                      <button className="btn btn-soft-success d-inline-flex align-items-center rounded px-3 border border-success shadow-none" onClick={() => typeof handleExport === 'function' ? handleExport('Excel') : null}>
                        <i className="isax isax-export-1 me-2"></i>Excel
                      </button>

          {/* New Ticket Button */}
          <div>
            <Link
              href="#"
              className="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_modal"
              title="Create New Ticket"
            >
              <i className="isax isax-add-circle5 me-1"></i>
              New Ticket
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-xl-3 col-lg-6 col-md-6">
            <div className="card position-relative">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                  <div>
                    <p className="mb-1">{stat.label}</p>
                    <h6 className="fs-16 fw-semibold">{stat.value}</h6>
                  </div>
                  <div>
                    <span className={`avatar bg-${stat.color} rounded-circle`}>
                      <i className={`isax ${stat.icon}`}></i>
                    </span>
                  </div>
                </div>
                <p className="fs-13 mb-0">
                  <span className={stat.change.startsWith('+') ? 'text-success' : 'text-danger'}>
                    <i
                      className={`isax ${stat.change.startsWith('+') ? 'isax-send' : 'isax-received'} me-1`}
                    ></i>
                    {stat.change}
                  </span>
                  from last month
                </p>
                <span className="position-absolute end-0 bottom-0">
                  <img src={`/assets/img/bg/card-overlay-0${idx + 1}.svg`} alt="Card Overlay" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Status Tabs */}
      <ul className="nav nav-tabs nav-bordered mb-3 ticket-list-tab">
        <li className="nav-item">
          <Link
            className="nav-link active"
            href="#"
            data-bs-toggle="tab"
            data-bs-target="#tab-1"
            title="All Tickets"
          >
            All
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            href="#"
            data-bs-toggle="tab"
            data-bs-target="#tab-2"
            title="Open Tickets"
          >
            Open
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            href="#"
            data-bs-toggle="tab"
            data-bs-target="#tab-3"
            title="Resolved Tickets"
          >
            Resolved
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            href="#"
            data-bs-toggle="tab"
            data-bs-target="#tab-4"
            title="Pending Tickets"
          >
            Pending
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            href="#"
            data-bs-toggle="tab"
            data-bs-target="#tab-5"
            title="Closed Tickets"
          >
            Closed
          </Link>
        </li>
      </ul>

      {/* Ticket List Content */}
      <div className="tab-content" id="pills-tabContent">
        {/* All Tickets Tab */}
        <div className="tab-pane fade show active" id="tab-1" role="tabpanel">
          <div>
            {tickets.map((ticket) => (
              <div key={ticket.id} className="card mb-3">
                <div className="card-body">
                  {/* Ticket Header */}
                  <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap">
                    <div className="d-flex align-items-center">
                      <h6 className="fs-14 me-2 fw-semibold">{ticket.title}</h6>
                      <span
                        className={`badge badge-soft-${ticket.statusColor} badge-sm d-inline-flex align-items-center`}
                      >
                        <span className={`badge-dot bg-${ticket.statusColor} me-2`}></span>
                        {ticket.status}
                      </span>
                    </div>
                    <span className="d-flex align-items-center text-gray-9 fs-12">
                      <i className="isax isax-clock me-1"></i>
                      Just Now
                    </span>
                  </div>

                  {/* Ticket Description */}
                  <p>{ticket.description}</p>

                  {/* Ticket Footer */}
                  <div className="d-flex align-items-center">
                    <span
                      className={`badge badge-soft-${ticket.priorityColor} badge-sm d-flex align-items-center justify-content-center me-3`}
                    >
                      {ticket.priority}
                    </span>
                    <span className="badge badge-soft-light text-dark badge-sm d-flex align-items-center justify-content-center me-3">
                      {ticket.ticketId}
                    </span>
                    <span className="fs-12 text-gray-9">
                      <i className="isax isax-message-text me-1"></i>
                      {ticket.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Tickets Tab */}
        <div className="tab-pane fade" id="tab-2" role="tabpanel">
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3 gap-2 flex-wrap">
                <div className="d-flex align-items-center">
                  <h6 className="fs-14 me-2 fw-semibold">Calling for help</h6>
                  <span className="badge badge-soft-success badge-sm d-inline-flex align-items-center">
                    <span className="badge-dot bg-success me-2"></span>
                    Open
                  </span>
                </div>
                <span className="d-flex align-items-center text-gray-9 fs-12">
                  <i className="isax isax-clock me-1"></i>
                  Just Now
                </span>
              </div>
              <p>If you require immediate support, don't hesitate to call our help center.</p>
              <div className="d-flex align-items-center">
                <span className="badge badge-soft-primary badge-sm d-flex align-items-center justify-content-center me-3">
                  Low
                </span>
                <span className="badge badge-soft-light text-dark badge-sm d-flex align-items-center justify-content-center me-3">
                  #1234
                </span>
                <span className="fs-12 text-gray-9">
                  <i className="isax isax-message-text me-1"></i>
                  14
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Resolved Tickets Tab */}
        <div className="tab-pane fade" id="tab-3" role="tabpanel">
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3 gap-2 flex-wrap">
                <div className="d-flex align-items-center">
                  <h6 className="fs-14 me-2 fw-semibold">Support For Theme</h6>
                  <span className="badge badge-soft-success badge-sm d-inline-flex align-items-center">
                    <span className="badge-dot bg-success me-2"></span>
                    Resolved
                  </span>
                </div>
                <span className="d-flex align-items-center text-gray-9 fs-12">
                  <i className="isax isax-clock me-1"></i>
                  Just Now
                </span>
              </div>
              <p>Our support ticket system ensures quick resolution for your queries.</p>
              <div className="d-flex align-items-center">
                <span className="badge badge-soft-danger badge-sm d-flex align-items-center justify-content-center me-3">
                  Medium
                </span>
                <span className="badge badge-soft-light text-dark badge-sm d-flex align-items-center justify-content-center me-3">
                  #1234
                </span>
                <span className="fs-12 text-gray-9">
                  <i className="isax isax-message-text me-1"></i>
                  14
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Tickets Tab */}
        <div className="tab-pane fade" id="tab-4" role="tabpanel">
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3 gap-2 flex-wrap">
                <div className="d-flex align-items-center">
                  <h6 className="fs-14 me-2 fw-semibold">Verify your email</h6>
                  <span className="badge badge-soft-warning badge-sm d-inline-flex align-items-center">
                    <span className="badge-dot bg-warning me-2"></span>
                    Pending
                  </span>
                </div>
                <span className="d-flex align-items-center text-gray-9 fs-12">
                  <i className="isax isax-clock me-1"></i>
                  Just Now
                </span>
              </div>
              <p>Please verify your email to activate your account and access all features.</p>
              <div className="d-flex align-items-center">
                <span className="badge badge-soft-danger badge-sm d-flex align-items-center justify-content-center me-3">
                  High
                </span>
                <span className="badge badge-soft-light text-dark badge-sm d-flex align-items-center justify-content-center me-3">
                  #1234
                </span>
                <span className="fs-12 text-gray-9">
                  <i className="isax isax-message-text me-1"></i>
                  14
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Closed Tickets Tab */}
        <div className="tab-pane fade" id="tab-5" role="tabpanel">
          <div className="card mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3 gap-2 flex-wrap">
                <div className="d-flex align-items-center">
                  <h6 className="fs-14 me-2 fw-semibold">Management</h6>
                  <span className="badge badge-soft-light text-dark badge-sm d-inline-flex align-items-center">
                    <span className="badge-dot bg-dark me-2"></span>
                    Closed
                  </span>
                </div>
                <span className="d-flex align-items-center text-gray-9 fs-12">
                  <i className="isax isax-clock me-1"></i>
                  Just Now
                </span>
              </div>
              <p>Streamline your business operations with smart financial management tools.</p>
              <div className="d-flex align-items-center">
                <span className="badge badge-soft-danger badge-xs d-flex align-items-center justify-content-center me-3">
                  Medium
                </span>
                <span className="badge badge-soft-light text-dark badge-xs d-flex align-items-center justify-content-center me-3">
                  #1234
                </span>
                <span>
                  <i className="isax isax-message-text me-1"></i>
                  14
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Ticket Modal */}
      <div id="add_modal" className="modal fade">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Ticket</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                title="Close"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  {/* Subject */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Subject
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="Enter subject" />
                    </div>
                  </div>

                  {/* Assigned Name */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Assigned Name
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <input type="text" className="form-control" placeholder="Enter name" />
                    </div>
                  </div>

                  {/* Assigned Date */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Assigned Date
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="dd/mm/yyyy"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Created Date
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="dd/mm/yyyy"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Due Date */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Due Date
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type="text"
                          className="form-control datetimepicker rounded-end"
                          placeholder="dd/mm/yyyy"
                        />
                        <span className="input-icon-addon fs-16 text-gray-9">
                          <i className="isax isax-calendar-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Assignee Name */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Assignee Name
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter assignee name"
                      />
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Medium</option>
                        <option>Low</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Resolved</option>
                        <option>Closed</option>
                        <option>Open</option>
                        <option>Pending</option>
                      </select>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="col-md-12">
                    <div>
                      <label className="form-label">
                        Content
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Enter ticket content"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button type="button" className="btn btn-outline-white" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tickets;
