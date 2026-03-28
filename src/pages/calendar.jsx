import React, { useEffect, useRef } from 'react';

const Calendar = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    // Initialize FullCalendar when component mounts
    if (window.FullCalendar && calendarRef.current) {
      const calendar = new window.FullCalendar.Calendar(calendarRef.current, {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        events: [
          {
            title: 'Meeting',
            start: new Date().toISOString().split('T')[0] + 'T10:00:00',
            end: new Date().toISOString().split('T')[0] + 'T12:00:00',
            className: 'bg-primary'
          },
          {
            title: 'Conference',
            start: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            className: 'bg-success'
          }
        ],
        eventClick: function(info) {
          // Show event details modal
          const modal = new window.bootstrap.Modal(document.getElementById('event_modal'));
          document.getElementById('eventTitle').textContent = info.event.title;
          modal.show();
        },
        select: function(info) {
          // Show add event modal
          const modal = new window.bootstrap.Modal(document.getElementById('add_event'));
          modal.show();
        }
      });
      
      calendar.render();
      
      return () => {
        calendar.destroy();
      };
    }
  }, []);

  return (
    <>
      <div className="mb-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h4 className="mb-1 fw-bold">Calendar</h4>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap table-header">
          <div className="me-2 mb-2">
            <div className="dropdown py-1">
              <Link
                href="#"
                className="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="ti ti-file-export me-1"></i>Export
              </Link>
              <ul className="dropdown-menu  dropdown-menu-end p-3">
                <li>
                  <Link href="#" className="dropdown-item rounded-1">
                    <i className="ti ti-file-type-pdf me-1"></i>Export as PDF
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item rounded-1">
                    <i className="ti ti-file-type-xls me-1"></i>Export as Excel{' '}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-2">
            <Link
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#add_event"
              className="btn btn-lg py-1 h-auto btn-primary d-flex align-items-center"
            >
              <i className="ti ti-circle-plus me-2"></i>Create
            </Link>
          </div>
        </div>
      </div>

      <div className="card mb-0">
        <div className="card-body">
          <div id="calendar" ref={calendarRef}></div>
        </div>
      </div>

      {/* Add Event Modal */}
      <div className="modal fade" id="add_event">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Event</h4>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Event Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Event Date</label>
                      <div className="input-icon-end position-relative">
                        <input type="text" className="form-control datetimepicker" />
                        <span className="input-icon-addon">
                          <i className="ti ti-calendar text-gray-7"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Start Time</label>
                      <div className="input-icon-end position-relative">
                        <input type="text" className="form-control timepicker" />
                        <span className="input-icon-addon">
                          <i className="ti ti-clock text-gray-7"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">End Time</label>
                      <div className="input-icon-end position-relative">
                        <input type="text" className="form-control timepicker" />
                        <span className="input-icon-addon">
                          <i className="ti ti-clock text-gray-7"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Event Location</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="mb-0">
                      <label className="form-label">Descriptions</label>
                      <textarea className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-md btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-md btn-primary">
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <div className="modal fade" id="event_modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark modal-bg">
              <div className="modal-title text-white">
                <span id="eventTitle"></span>
              </div>
              <button
                type="button"
                className="btn-close btn-close-modal custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <p className="d-flex align-items-center fw-medium text-black mb-3">
                <i className="ti ti-calendar-check text-default me-2"></i>26 Jul,2024 to 31 Jul,2024
              </p>
              <p className="d-flex align-items-center fw-medium text-black mb-3">
                <i className="ti ti-calendar-check text-default me-2"></i>11:00 AM to 12:15 PM
              </p>
              <p className="d-flex align-items-center fw-medium text-black mb-3">
                <i className="ti ti-map-pin-bolt text-default me-2"></i>Las Vegas, US
              </p>
              <p className="d-flex align-items-center fw-medium text-black mb-0">
                <i className="ti ti-calendar-check text-default me-2"></i>A recurring or repeating
                event is simply any event that you will occur more than once on your calendar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
