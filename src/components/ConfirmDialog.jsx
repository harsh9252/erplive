import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action', 
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger' // danger, warning, info, success
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return (
          <div className="text-danger mb-3">
            <i className="isax isax-trash" style={{ fontSize: '48px' }}></i>
          </div>
        );
      case 'warning':
        return (
          <div className="text-warning mb-3">
            <i className="isax isax-warning-2" style={{ fontSize: '48px' }}></i>
          </div>
        );
      case 'info':
        return (
          <div className="text-info mb-3">
            <i className="isax isax-info-circle" style={{ fontSize: '48px' }}></i>
          </div>
        );
      case 'success':
        return (
          <div className="text-success mb-3">
            <i className="isax isax-tick-circle" style={{ fontSize: '48px' }}></i>
          </div>
        );
      default:
        return null;
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'btn-danger';
      case 'warning':
        return 'btn-warning';
      case 'info':
        return 'btn-info';
      case 'success':
        return 'btn-success';
      default:
        return 'btn-primary';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`modal-backdrop fade ${isVisible ? 'show' : ''}`}
        style={{ zIndex: 1050 }}
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div 
        className={`modal fade ${isVisible ? 'show' : ''}`}
        style={{ 
          display: 'block', 
          zIndex: 1055,
        }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg bg-white">
            <div className="modal-body text-center p-4">
              {getIcon()}
              
              <h5 className="modal-title mb-2 fw-bold">{title}</h5>
              <div className="text-muted mb-4">{message}</div>

              <div className="d-flex gap-2 justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={handleClose}
                >
                  <i className="isax isax-close-circle me-2"></i>
                  {cancelText}
                </button>
                <button
                  type="button"
                  className={`btn ${getButtonClass()} px-4`}
                  onClick={handleConfirm}
                >
                  <i className="isax isax-tick-circle me-2"></i>
                  {confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.node,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  type: PropTypes.oneOf(['danger', 'warning', 'info', 'success'])
};

export default ConfirmDialog;
