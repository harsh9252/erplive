import React from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      user: 'Elwis Mathew',
      avatar: '/assets/img/profiles/avatar-19.jpg',
      action: 'added a new product',
      target: 'Redmi Pro 7 Mobile',
      time: 'Just Now',
    },
    {
      id: 2,
      user: 'Elizabeth Olsen',
      avatar: '/assets/img/profiles/avatar-18.jpg',
      action: 'added a new product category',
      target: 'Desktop Computers',
      time: '4 min ago',
    },
    {
      id: 3,
      user: 'William Smith',
      avatar: '/assets/img/profiles/avatar-17.jpg',
      action: 'added a new sales list for',
      target: 'January Month',
      time: '6 min ago',
    },
    {
      id: 4,
      user: 'Lesley Grauer',
      avatar: '/assets/img/profiles/avatar-15.jpg',
      action: 'has updated invoice',
      target: '#987654',
      time: '12 min ago',
    },
    {
      id: 5,
      user: 'Carl Evans',
      avatar: null,
      initials: 'CE',
      action: 'adjust the stock',
      target: 'Apple Series 5 Watch',
      time: '2 days ago',
    },
    {
      id: 6,
      user: 'Minerva Rameriz',
      avatar: null,
      initials: 'MR',
      action: 'accepted Quotation',
      target: '#QUO0001',
      time: '1 month ago',
    },
  ];

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="mb-3">
        <h6>All Notifications</h6>
      </div>

      {/* Notifications List */}
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`card ${index === notifications.length - 1 ? 'mb-0' : 'mb-3'}`}
        >
          <div className="card-body">
            <div className="d-flex align-items-center">
              {/* Avatar */}
              <div className="d-flex me-2">
                {notification.avatar ? (
                  <Link to="/profile" className="avatar avatar-lg avatar-rounded">
                    <img src={notification.avatar} alt={notification.user} />
                  </Link>
                ) : (
                  <Link to="/profile"
                    className={`avatar avatar-lg avatar-rounded ${notification.id === 5 ? 'bg-success' : 'bg-primary'}`}
                  >
                    <span className="avatar-title text-white">{notification.initials}</span>
                  </Link>
                )}
              </div>

              {/* Notification Content */}
              <div className="flex-fill ml-3">
                <p className="mb-0">
                  <Link to="/profile" className="fs-14 fw-semibold">
                    {notification.user}
                  </Link>
                  <span>{notification.action}</span>
                  <Link to="/profile" className="fs-14 fw-semibold">
                    {notification.target}
                  </Link>
                </p>
                <span className="fs-12 d-flex align-items-center">
                  <i className="ti ti-clock me-1"></i>
                  {notification.time}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
