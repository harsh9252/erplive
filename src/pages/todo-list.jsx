import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TodoList = () => {
  // Sample todo data
  const [todos] = useState([
    {
      id: 1,
      title: 'Respond to any pending messages',
      tag: 'Social',
      tagColor: 'info',
      assignees: ['avatar-01.jpg', 'avatar-02.jpg', 'avatar-05.jpg'],
      createdOn: '14 Jan 2024',
      progress: 100,
      progressColor: 'success',
      dueDate: '14 Jan 2024',
      status: 'Completed',
      statusColor: 'success',
      starred: false,
      colorIcon: 'danger',
    },
    {
      id: 2,
      title: 'Update calendar and schedule',
      tag: 'Meetings',
      tagColor: 'primary',
      assignees: ['avatar-01.jpg', 'avatar-02.jpg', 'avatar-03.jpg'],
      createdOn: '21 Jan 2024',
      progress: 15,
      progressColor: 'danger',
      dueDate: '21 Jan 2024',
      status: 'Pending',
      statusColor: 'secondary',
      starred: true,
      colorIcon: 'purple',
    },
    {
      id: 3,
      title: 'Respond to any pending messages',
      tag: 'Research',
      tagColor: 'danger',
      assignees: ['avatar-04.jpg', 'avatar-05.jpg', 'avatar-06.jpg'],
      createdOn: '20 Feb 2024',
      progress: 45,
      progressColor: 'warning',
      dueDate: '20 Feb 2024',
      status: 'Inprogress',
      statusColor: 'primary',
      starred: false,
      colorIcon: 'purple',
    },
    {
      id: 4,
      title: 'Attend team meeting at 10:00 AM',
      tag: 'Web Design',
      tagColor: 'primary',
      assignees: ['avatar-05.jpg', 'avatar-06.jpg', 'avatar-07.jpg'],
      createdOn: '15 Mar 2024',
      progress: 40,
      progressColor: 'warning',
      dueDate: '15 Mar 2024',
      status: 'Inprogress',
      statusColor: 'primary',
      starred: false,
      colorIcon: 'warning',
    },
    {
      id: 5,
      title: 'Check and respond to emails',
      tag: 'Reminder',
      tagColor: 'info',
      assignees: ['avatar-08.jpg', 'avatar-09.jpg', 'avatar-10.jpg'],
      createdOn: '12 Apr 2024',
      progress: 65,
      progressColor: 'purple',
      dueDate: '12 Apr 2024',
      status: 'Pending',
      statusColor: 'secondary',
      starred: false,
      colorIcon: 'purple',
    },
    {
      id: 6,
      title: 'Coordinate with department head',
      tag: 'Internal',
      tagColor: 'danger',
      assignees: ['avatar-11.jpg', 'avatar-12.jpg', 'avatar-13.jpg'],
      createdOn: '20 Apr 2024',
      progress: 85,
      progressColor: 'pink',
      dueDate: '20 Apr 2024',
      status: 'Onhold',
      statusColor: 'danger',
      starred: false,
      colorIcon: 'warning',
    },
    {
      id: 7,
      title: 'Plan tasks for the next day',
      tag: 'Social',
      tagColor: 'info',
      assignees: ['avatar-14.jpg', 'avatar-15.jpg', 'avatar-16.jpg'],
      createdOn: '06 Jul 2024',
      progress: 100,
      progressColor: 'success',
      dueDate: '06 Jul 2024',
      status: 'Completed',
      statusColor: 'success',
      starred: false,
      colorIcon: 'success',
    },
    {
      id: 8,
      title: 'Finalize project proposal',
      tag: 'Projects',
      tagColor: 'success',
      assignees: ['avatar-17.jpg', 'avatar-18.jpg', 'avatar-19.jpg'],
      createdOn: '02 Sep 2024',
      progress: 65,
      progressColor: 'danger',
      dueDate: '02 Sep 2024',
      status: 'Onhold',
      statusColor: 'danger',
      starred: false,
      colorIcon: 'success',
    },
    {
      id: 9,
      title: 'Submit to supervisor by EOD',
      tag: 'Reminder',
      tagColor: 'info',
      assignees: ['avatar-01.jpg', 'avatar-02.jpg', 'avatar-03.jpg'],
      createdOn: '15 Nov 2024',
      progress: 75,
      progressColor: 'purple',
      dueDate: '15 Nov 2024',
      status: 'Inprogress',
      statusColor: 'primary',
      starred: false,
      colorIcon: 'purple',
    },
    {
      id: 10,
      title: 'Prepare presentation slides',
      tag: 'Research',
      tagColor: 'danger',
      assignees: ['avatar-01.jpg', 'avatar-02.jpg', 'avatar-03.jpg'],
      createdOn: '10 Dec 2024',
      progress: 90,
      progressColor: 'pink',
      dueDate: '10 Dec 2024',
      status: 'Pending',
      statusColor: 'secondary',
      starred: false,
      colorIcon: 'success',
    },
  ]);

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
          <ul className="table-top-head flex-shrink-0 mb-0 list-unstyled">
            <li>
              <Link to="/todo" title="Grid View">
                <i className="ti ti-layout-grid"></i>
              </Link>
            </li>
            <li>
              <Link to="/todo-list" className="active" title="List View">
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

      {/* Todo Table Section */}
      <div>
        <div className="table-responsive table-nowrap">
          <table className="table border mb-0">
            {/* Table Header */}
            <thead className="table-light text-uppercase">
              <tr>
                <th>
                  <div className="form-check form-check-md">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="select-all"
                      title="Select All"
                    />
                  </div>
                </th>
                <th>Company Name</th>
                <th>Tags</th>
                <th>Assignee</th>
                <th>Created On</th>
                <th>Progress</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* Table Body - Todo Rows */}
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  {/* Checkbox and Star */}
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="form-check form-check-md">
                        <input className="form-check-input" type="checkbox" title="Select Todo" />
                      </div>
                      <span className="mx-2 d-flex align-items-center rating-select">
                        <i
                          className={`ti ${todo.starred ? 'ti-star-filled filled' : 'ti-star'}`}
                          title={todo.starred ? 'Starred' : 'Not Starred'}
                        ></i>
                      </span>
                      <span className="d-flex align-items-center">
                        <i
                          className={`ti ti-square-rounded text-${todo.colorIcon} me-2`}
                          title="Priority Indicator"
                        ></i>
                      </span>
                    </div>
                  </td>

                  {/* Todo Title */}
                  <td>
                    <p className="fw-medium text-dark">{todo.title}</p>
                  </td>

                  {/* Tag */}
                  <td>
                    <span className={`badge bg-${todo.tagColor}`}>{todo.tag}</span>
                  </td>

                  {/* Assignees */}
                  <td>
                    <div className="avatar-list-stacked avatar-group-sm">
                      {todo.assignees.map((avatar, idx) => (
                        <span key={idx} className="avatar avatar-rounded">
                          <img
                            className="border border-white"
                            src={`/assets/img/profiles/${avatar}`}
                            alt={`Assignee ${idx + 1}`}
                            title={`Assignee ${idx + 1}`}
                          />
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Created On */}
                  <td>{todo.createdOn}</td>

                  {/* Progress Bar */}
                  <td>
                    <span className="d-block mb-1">Progress : {todo.progress}%</span>
                    <div
                      className="progress progress-xs flex-grow-1 mb-2"
                      style={{ width: '190px' }}
                      role="progressbar"
                      aria-valuenow={todo.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      title={`Progress: ${todo.progress}%`}
                    >
                      <div
                        className={`progress-bar bg-${todo.progressColor} rounded`}
                        style={{ width: `${todo.progress}%` }}
                      ></div>
                    </div>
                  </td>

                  {/* Due Date */}
                  <td>{todo.dueDate}</td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className={`badge badge-soft-${todo.statusColor} d-inline-flex align-items-center`}
                      title={`Status: ${todo.status}`}
                    >
                      <i className="ti ti-circle-filled fs-5 me-1"></i>
                      {todo.status}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="text-end pe-4">
                    <div className="dropdown">
                      <button className="btn btn-icon-sm btn-outline-white border-0 shadow-none border" data-bs-toggle="dropdown" data-bs-boundary="viewport">
                        <i className="isax isax-more fs-18"></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-12">
                        <li>
                          <button className="dropdown-item py-2" data-bs-toggle="modal" data-bs-target="#edit_todo">
                            <i className="isax isax-edit-2 me-2 text-warning"></i>Edit Todo
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item py-2" data-bs-toggle="modal" data-bs-target="#delete_modal">
                            <i className="isax isax-trash me-2 text-danger"></i>Delete Todo
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                title="Close Modal"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body">
                <div className="row">
                  {/* Todo Title Input */}
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Todo Title</label>
                      <input type="text" className="form-control" placeholder="Enter todo title" />
                    </div>
                  </div>

                  {/* Tag Selection */}
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

                  {/* Priority Selection */}
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Description Editor */}
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Descriptions</label>
                      <div className="quill-editor"></div>
                    </div>
                  </div>

                  {/* Assignee Selection */}
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Add Assignee</label>
                      <select className="select">
                        <option>Select</option>
                        <option>Sophie</option>
                        <option>Cameron</option>
                        <option>Doris</option>
                        <option>Rufana</option>
                      </select>
                    </div>
                  </div>

                  {/* Status Selection */}
                  <div className="col-12">
                    <div className="mb-0">
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
                  Add New Todo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Todo Modal */}
      <div className="modal fade" id="edit_todo">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                title="Close Modal"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <div className="modal-body">
                <div className="row">
                  {/* Todo Title Input */}
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Todo Title</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Update calendar and schedule"
                      />
                    </div>
                  </div>

                  {/* Tag Selection */}
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Tag</label>
                      <select className="select">
                        <option>Select</option>
                        <option selected>Internal</option>
                        <option>Projects</option>
                        <option>Meetings</option>
                        <option>Reminder</option>
                      </select>
                    </div>
                  </div>

                  {/* Priority Selection */}
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <select className="select">
                        <option>Select</option>
                        <option>High</option>
                        <option selected>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Description Editor */}
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Descriptions</label>
                      <div className="quill-editor"></div>
                    </div>
                  </div>

                  {/* Assignee Selection */}
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Add Assignee</label>
                      <select className="select">
                        <option>Select</option>
                        <option selected>Sophie</option>
                        <option>Cameron</option>
                        <option>Doris</option>
                        <option>Rufana</option>
                      </select>
                    </div>
                  </div>

                  {/* Status Selection */}
                  <div className="col-12">
                    <div className="mb-0">
                      <label className="form-label">Status</label>
                      <select className="select">
                        <option>Select</option>
                        <option selected>Completed</option>
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* View Todo Modal */}
      <div className="modal fade" id="view_todo">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h4 className="modal-title text-white">Respond to any pending messages</h4>
              <span className="badge bg-danger d-inline-flex align-items-center">
                <i className="ti ti-square me-1"></i>
                Urgent
              </span>
              <span title="Favorite">
                <i className="ti ti-star-filled text-warning"></i>
              </span>
              <Link href="#" title="Delete">
                <i className="ti ti-trash text-white"></i>
              </Link>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close bg-transparent fs-16 text-white position-static"
                data-bs-dismiss="modal"
                aria-label="Close"
                title="Close Modal"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <div className="modal-body">
              {/* Task Details Section */}
              <h5 className="mb-2">Task Details</h5>
              <div className="border rounded mb-3 p-2">
                <div className="row row-gap-3">
                  {/* Created On */}
                  <div className="col-md-4">
                    <div className="text-center">
                      <span className="d-block mb-1">Created On</span>
                      <p className="text-dark">22 July 2025</p>
                    </div>
                  </div>

                  {/* Due Date */}
                  <div className="col-md-4">
                    <div className="text-center">
                      <span className="d-block mb-1">Due Date</span>
                      <p className="text-dark">22 July 2025</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-md-4">
                    <div className="text-center">
                      <span className="d-block mb-1">Status</span>
                      <span className="badge badge-soft-success d-inline-flex align-items-center">
                        <i className="fas fa-circle fs-6 me-1"></i>
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-3">
                <h5 className="mb-2">Description</h5>
                <p>
                  Hiking is a long, vigorous walk, usually on trails or footpaths in the
                  countryside. Walking for pleasure developed in Europe during the eighteenth
                  century. Religious pilgrimages have existed much longer but they involve walking
                  long distances for a spiritual purpose associated with specific religions and also
                  we achieve inner peace while we hike at a local park.
                </p>
              </div>

              {/* Tags Section */}
              <div className="mb-3">
                <h5 className="mb-2">Tags</h5>
                <div className="d-flex align-items-center">
                  <span className="badge bg-danger me-2">Internal</span>
                  <span className="badge bg-success me-2">Projects</span>
                  <span className="badge bg-info">Reminder</span>
                </div>
              </div>

              {/* Assignees Section */}
              <div>
                <h5 className="mb-2">Assignee</h5>
                <div className="avatar-list-stacked avatar-group-sm">
                  <span className="avatar avatar-rounded">
                    <img
                      className="border border-white"
                      src="/assets/img/profiles/avatar-01.jpg"
                      alt="Assignee 1"
                      title="Assignee 1"
                    />
                  </span>
                  <span className="avatar avatar-rounded">
                    <img
                      className="border border-white"
                      src="/assets/img/profiles/avatar-02.jpg"
                      alt="Assignee 2"
                      title="Assignee 2"
                    />
                  </span>
                  <span className="avatar avatar-rounded">
                    <img
                      className="border border-white"
                      src="/assets/img/profiles/avatar-03.jpg"
                      alt="Assignee 3"
                      title="Assignee 3"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="mb-3">
                <img src="/assets/img/icons/delete.svg" alt="Delete Icon" title="Delete" />
              </div>
              <h6 className="mb-1">Delete Todo</h6>
              <p className="mb-3">Are you sure, you want to delete Todo?</p>
              <div className="d-flex justify-content-center">
                <Link href="#" className="btn btn-outline-white me-3" data-bs-dismiss="modal">
                  Cancel
                </Link>
                <Link to="/todo-list" className="btn btn-primary">
                  Yes, Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
