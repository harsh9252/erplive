import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Todo = () => {
  // Todo items data organized by priority
  const [todos] = useState([
    {
      id: 1,
      title: 'Finalize project proposal',
      tag: 'Projects',
      tagColor: 'success',
      priority: 'High',
      priorityColor: 'purple',
      status: 'Onhold',
      statusColor: 'danger',
      dueDate: '15 Jan 2025',
      assignees: ['avatar-01.jpg', 'avatar-02.jpg', 'avatar-03.jpg'],
      starred: true,
    },
    {
      id: 2,
      title: 'Submit to supervisor by EOD',
      tag: 'Internal',
      tagColor: 'danger',
      priority: 'High',
      priorityColor: 'purple',
      status: 'Inprogress',
      statusColor: 'secondary',
      dueDate: '25 May 2024',
      assignees: ['avatar-01.jpg', 'avatar-02.jpg', 'avatar-03.jpg'],
      starred: false,
    },
    {
      id: 3,
      title: 'Prepare presentation slides',
      tag: 'Reminder',
      tagColor: 'info',
      priority: 'High',
      priorityColor: 'purple',
      status: 'Pending',
      statusColor: 'info',
      dueDate: '15 Jan 2025',
      assignees: ['avatar-01.jpg', 'avatar-02.jpg', 'avatar-03.jpg'],
      starred: false,
      completed: true,
    },
    {
      id: 4,
      title: 'Check and respond to emails',
      tag: 'Reminder',
      tagColor: 'info',
      priority: 'Medium',
      priorityColor: 'warning',
      status: 'Completed',
      statusColor: 'success',
      dueDate: 'Tomorrow',
      assignees: ['avatar-01.jpg', 'avatar-02.jpg', 'avatar-03.jpg'],
      starred: false,
    },
    {
      id: 5,
      title: 'Coordinate with department head on progress',
      tag: 'Internal',
      tagColor: 'danger',
      priority: 'Medium',
      priorityColor: 'warning',
      status: 'Inprogress',
      statusColor: 'secondary',
      dueDate: '25 May 2024',
      assignees: ['avatar-06.jpg', 'avatar-09.jpg', 'avatar-02.jpg'],
      starred: false,
    },
    {
      id: 6,
      title: 'Plan tasks for the next day',
      tag: 'Social',
      tagColor: 'info',
      priority: 'Low',
      priorityColor: 'success',
      status: 'Pending',
      statusColor: 'info',
      dueDate: 'Today',
      assignees: ['avatar-01.jpg', 'avatar-02.jpg', 'avatar-03.jpg'],
      starred: false,
    },
  ]);

  const priorities = [
    { name: 'High', color: 'purple', count: 15 },
    { name: 'Medium', color: 'warning', count: 5 },
    { name: 'Low', color: 'success', count: 24 },
  ];

  return (
    <>
      {/* Header Section */}
      <div className="d-flex align-items-center todo-header gap-3 justify-content-between mb-3">
        {/* Title */}
        <div className="add-item d-flex">
          <div className="page-title">
            <h4 className="mb-0">Todo</h4>
          </div>
        </div>

        {/* View Toggle and Create Button */}
        <div className="d-flex align-items-center">
          <ul className="table-top-head flex-shrink-0 list-unstyled mb-0">
            <li>
              <Link to="/todo" className="active btn btn-icon btn-sm" title="Grid View">
                <i className="ti ti-layout-grid"></i>
              </Link>
            </li>
            <li>
              <Link to="/todo-list" title="List View">
                <i className="ti ti-list-tree"></i>
              </Link>
            </li>
          </ul>
          <div className="page-btn ms-2">
            <Link href="#"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#add_todo"
              title="Create New Todo"
            >
              <i className="ti ti-circle-plus me-1"></i>
              Create New
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="card shadow-none mb-0">
        <div className="card-body">
          {/* Stats Row */}
          <div className="row gy-3 mb-3">
            <div className="col-sm-4">
              <div className="d-flex align-items-center">
                <h6>Total Todo</h6>
                <span className="badge badge-dark rounded-pill badge-xs ms-2">+1</span>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="d-flex align-items-center justify-content-end">
                <p className="mb-0 me-3 pe-3 border-end fs-14">
                  Total Task : <span className="text-dark">55</span>
                </p>
                <p className="mb-0 me-3 pe-3 border-end fs-14">
                  Pending : <span className="text-dark">15</span>
                </p>
                <p className="mb-0 fs-14">
                  Completed : <span className="text-dark">40</span>
                </p>
              </div>
            </div>
          </div>

          {/* New Task Button */}
          <div className="mb-3">
            <button
              className="btn bg-primary-subtle border-dashed border-primary w-100 text-start"
              data-bs-toggle="modal"
              data-bs-target="#add_todo"
              title="Add New Task"
            >
              <i className="ti ti-plus me-2"></i>
              New task
            </button>
          </div>

          {/* Filters Section */}
          <div className="border-bottom mb-3">
            <div className="row">
              {/* Priority Filter */}
              <div className="col-lg-6">
                <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                  <h6 className="me-2">Priority</h6>
                  <ul
                    className="nav nav-pills border d-inline-flex p-1 rounded bg-light todo-tabs"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item me-1" role="presentation">
                      <button
                        className="nav-link btn btn-sm btn-icon p-2 d-flex align-items-center justify-content-center w-auto active"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-selected="true"
                        title="All Priorities"
                      >
                        All
                      </button>
                    </li>
                    <li className="nav-item me-1" role="presentation">
                      <button
                        className="nav-link btn btn-sm btn-icon p-2 d-flex align-items-center justify-content-center w-auto"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact"
                        type="button"
                        role="tab"
                        aria-selected="false"
                        title="High Priority"
                      >
                        High
                      </button>
                    </li>
                    <li className="nav-item me-1" role="presentation">
                      <button
                        className="nav-link btn btn-sm btn-icon p-2 d-flex align-items-center justify-content-center w-auto"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-medium"
                        type="button"
                        role="tab"
                        aria-selected="false"
                        title="Medium Priority"
                      >
                        Medium
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn btn-sm btn-icon p-2 d-flex align-items-center justify-content-center w-auto"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-low"
                        type="button"
                        role="tab"
                        aria-selected="false"
                        title="Low Priority"
                      >
                        Low
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Additional Filters */}
              <div className="col-lg-6">
                <div className="d-flex align-items-center justify-content-lg-end flex-wrap row-gap-3 mb-3">
                  {/* Date Filter */}
                  <div className="input-icon-start input-icon position-relative me-2">
                    <span className="input-icon-addon">
                      <i className="ti ti-calendar text-gray-9"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control datetimepicker"
                      placeholder="Due Date"
                      title="Filter by Due Date"
                    />
                  </div>

                  {/* Tags Dropdown */}
                  <div className="dropdown me-2">
                    <Link href="#"
                      className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                      title="Filter by Tags"
                    >
                      All Tags
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          All Tags
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Internal
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Projects
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Meetings
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Reminder
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Research
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="d-flex align-items-center">
                    <span className="d-inline-flex me-2">Sort By :</span>
                    <div className="dropdown">
                      <Link
                        href="#"
                        className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center border-0 bg-transparent p-0 text-dark pe-4"
                        data-bs-toggle="dropdown"
                        title="Sort Options"
                      >
                        Created Date
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-end p-3">
                        <li>
                          <Link href="#" className="dropdown-item rounded-1">
                            Created Date
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item rounded-1">
                            Priority
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item rounded-1">
                            Due Date
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Todo Items by Priority */}
          <div className="tab-content todo-item" id="pills-tabContent">
            {/* All Todos Tab */}
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel">
              <div className="accordion todo-accordion" id="accordionExample">
                {priorities.map((priority, idx) => (
                  <div key={idx} className="accordion-item bg-white mb-3 border-0">
                    {/* Priority Header */}
                    <div className="row align-items-center mb-3 row-gap-3">
                      <div className="col-lg-4 col-sm-6">
                        <div className="accordion-header" id={`heading${idx}`}>
                          <div
                            className="accordion-button bg-transparent"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${idx}`}
                            aria-controls={`collapse${idx}`}
                          >
                            <div className="d-flex align-items-center w-100">
                              <div className="me-2">
                                <Link href="#" title="Toggle">
                                  <span>
                                    <i className="fas fa-chevron-down"></i>
                                  </span>
                                </Link>
                              </div>
                              <div className="d-flex align-items-center">
                                <span>
                                  <i
                                    className={`ti ti-square-rounded text-${priority.priorityColor} me-2`}
                                  ></i>
                                </span>
                                <h5 className="fw-semibold">{priority.name}</h5>
                                <span className="badge bg-light text-dark rounded-pill ms-2">
                                  {priority.count}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8 col-sm-6">
                        <div className="d-flex align-items-center justify-content-sm-end">
                          <Link
                            href="#"
                            className="btn btn-light me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#add_todo"
                            title="Add New"
                          >
                            <i className="ti ti-circle-plus me-2"></i>
                            Add New
                          </Link>
                          <Link href="#" className="btn btn-white border" title="See All">
                            See All <i className="ti ti-arrow-right ms-2"></i>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Todo Items List */}
                    <div
                      id={`collapse${idx}`}
                      className="accordion-collapse collapse show"
                      aria-labelledby={`heading${idx}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="list-group list-group-flush border-bottom pb-2">
                          {todos
                            .filter((todo) => todo.priority === priority.name)
                            .map((todo) => (
                              <div
                                key={todo.id}
                                className={`list-group-item list-item-hover border rounded mb-2 p-3 ${
                                  todo.completed ? 'todo-strike-content' : ''
                                }`}
                              >
                                <div className="row align-items-center row-gap-3">
                                  {/* Left Column - Task Info */}
                                  <div className="col-lg-6 col-md-7">
                                    <div className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
                                      {/* Drag Handle */}
                                      <span className="me-2 d-flex align-items-center">
                                        <i className="ti ti-grid-dots text-dark"></i>
                                      </span>

                                      {/* Checkbox */}
                                      <div className="form-check form-check-md me-2">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          defaultChecked={todo.completed}
                                          title="Mark Complete"
                                        />
                                      </div>

                                      {/* Star Rating */}
                                      <span className="me-2 rating-select d-flex align-items-center">
                                        <i
                                          className={`ti ${
                                            todo.starred ? 'ti-star-filled filled' : 'ti-star'
                                          }`}
                                          title={todo.starred ? 'Starred' : 'Not Starred'}
                                        ></i>
                                      </span>

                                      {/* Task Title */}
                                      <div className="strike-info">
                                        <h4 className="fs-14 mb-0">{todo.title}</h4>
                                      </div>

                                      {/* Due Date Badge */}
                                      <span className="badge bg-transparent-dark text-dark rounded-pill ms-2">
                                        <i className="ti ti-calendar me-1"></i>
                                        {todo.dueDate}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Right Column - Actions */}
                                  <div className="col-lg-6 col-md-5">
                                    <div className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
                                      {/* Tag Badge */}
                                      <span className={`badge bg-${todo.tagColor} me-3`}>
                                        {todo.tag}
                                      </span>

                                      {/* Status Badge */}
                                      <span
                                        className={`badge badge-soft-${todo.statusColor} d-inline-flex align-items-center me-3`}
                                      >
                                        <i className="fas fa-circle fs-6 me-1"></i>
                                        {todo.status}
                                      </span>

                                      {/* Assignees */}
                                      <div className="d-flex align-items-center">
                                        <div className="avatar-list-stacked avatar-group-sm">
                                          {todo.assignees.map((avatar, aIdx) => (
                                            <span key={aIdx} className="avatar avatar-rounded">
                                              <img
                                                className="border border-white"
                                                src={`/assets/img/profiles/${avatar}`}
                                                alt={`Assignee ${aIdx + 1}`}
                                                title={`Assignee ${aIdx + 1}`}
                                              />
                                            </span>
                                          ))}
                                        </div>

                                        {/* Action Menu */}
                                        <div className="dropdown ms-2">
                                          <Link
                                            href="#"
                                            className="d-inline-flex align-items-center"
                                            data-bs-toggle="dropdown"
                                            title="More Actions"
                                          >
                                            <i className="ti ti-dots-vertical"></i>
                                          </Link>
                                          <ul className="dropdown-menu dropdown-menu-end p-3">
                                            <li>
                                              <Link href="#"
                                                className="dropdown-item rounded-1"
                                                data-bs-toggle="modal"
                                                data-bs-target="#add_todo"
                                                title="Edit"
                                              >
                                                <i className="ti ti-edit me-2"></i>
                                                Edit
                                              </Link>
                                            </li>
                                            <li>
                                              <Link href="#"
                                                className="dropdown-item rounded-1"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                                title="Delete"
                                              >
                                                <i className="ti ti-trash me-2"></i>
                                                Delete
                                              </Link>
                                            </li>
                                            <li>
                                              <Link href="#"
                                                className="dropdown-item rounded-1"
                                                data-bs-toggle="modal"
                                                data-bs-target="#view_todo"
                                                title="View"
                                              >
                                                <i className="ti ti-eye me-2"></i>
                                                View
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Todo Modal */}
      <div className="modal fade" id="add_todo">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Todo</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                title="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Todo Title</label>
                      <input type="text" className="form-control" placeholder="Enter title" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Tag</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Internal</option>
                        <option>Projects</option>
                        <option>Meetings</option>
                        <option>Reminder</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <select className="select">
                        <option>Select</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Completed</option>
                        <option>Pending</option>
                        <option>Onhold</option>
                        <option>Inprogress</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Todo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="Delete" title="Delete" />
              </div>
              <h6 className="mb-1">Delete Todo</h6>
              <p className="mb-3">Are you sure you want to delete this todo?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/todo" className="btn btn-primary">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Todo Modal */}
      <div className="modal fade" id="view_todo">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h4 className="modal-title text-white">Todo Details</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close bg-transparent fs-16 text-white position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
                title="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <h5 className="mb-3">Task Information</h5>
              <p>View and manage your todo details here.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
