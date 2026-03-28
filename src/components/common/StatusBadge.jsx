import React from 'react';

const STATUS_CONFIG = {
  // Yellow
  DRAFT: { className: 'badge-soft-yellow', text: 'Draft' },
  PENDING: { className: 'badge-soft-yellow', text: 'Pending' },
  
  // Green
  POSTED: { className: 'badge-soft-green', text: 'Posted' },
  ACTIVE: { className: 'badge-soft-green', text: 'Active' },
  CONFIRMED: { className: 'badge-soft-green', text: 'Confirmed' },
  COMPLETED: { className: 'badge-soft-green', text: 'Completed' },
  SUCCESS: { className: 'badge-soft-green', text: 'Success' },
  
  // Red
  CANCELLED: { className: 'badge-soft-red', text: 'Cancelled' },
  REJECTED: { className: 'badge-soft-red', text: 'Rejected' },
  OBSOLETE: { className: 'badge-soft-red', text: 'Obsolete' },
  TERMINATED: { className: 'badge-soft-red', text: 'Terminated' },
  FAILED: { className: 'badge-soft-red', text: 'Failed' },
  
  // Blue
  PAID: { className: 'badge-soft-blue', text: 'Paid' },
  CLEARED: { className: 'badge-soft-blue', text: 'Cleared' },
  
  // Orange
  PARTIALLY_PAID: { className: 'badge-soft-orange', text: 'Partially Paid' },
  IN_PROGRESS: { className: 'badge-soft-orange', text: 'In Progress' },
  HALF_DAY: { className: 'badge-soft-orange', text: 'Half Day' },
};

const StatusBadge = ({ status, customText = null }) => {
  if (!status) return null;
  
  const normalizedStatus = status.toString().toUpperCase().replace(/\s+/g, '_');
  const config = STATUS_CONFIG[normalizedStatus] || { 
    className: 'badge-soft-secondary', 
    text: status 
  };

  return (
    <span className={`badge ${config.className} d-inline-flex align-items-center`}>
      {customText || config.text}
    </span>
  );
};

export default StatusBadge;
