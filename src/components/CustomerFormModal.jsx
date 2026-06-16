import { useState } from 'react';
import CustomerForm from './CustomerForm';

const CustomerFormModal = ({ show, onClose, onSubmit, initialData = null, isLoading = false }) => {
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <>
      {/* Modal Backdrop */}
      {show && <div className="modal-backdrop fade show"></div>}

      {/* Modal */}
      <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {initialData ? 'Edit Customer' : 'Add Customer'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                disabled={isLoading}
              ></button>
            </div>
            <div className="modal-body">
              {show && (
                <CustomerForm
                  initialData={initialData}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  onClose={onClose}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerFormModal;
