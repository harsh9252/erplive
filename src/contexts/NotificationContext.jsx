import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';
import '../assets/CSS/notifications.css';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const [confirmModal, setConfirmModal] = useState(null);
    const [promptModal, setPromptModal] = useState(null);

    const showToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type, hiding: false }]);

        setTimeout(() => {
            setToasts((prev) =>
                prev.map((t) => (t.id === id ? { ...t, hiding: true } : t))
            );
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 300);
        }, duration);
    }, []);

    const confirmAction = useCallback(({ title, message, onConfirm, type = 'primary' }) => {
        return new Promise((resolve) => {
            setConfirmModal({
                title,
                message,
                type,
                onConfirm: () => {
                    setConfirmModal(null);
                    if (onConfirm) onConfirm();
                    resolve(true);
                },
                onCancel: () => {
                    setConfirmModal(null);
                    resolve(false);
                }
            });
        });
    }, []);

    const promptAction = useCallback(({ title, message, placeholder = 'Enter something...', type = 'primary', defaultValue = '' }) => {
        return new Promise((resolve) => {
            setPromptModal({
                title,
                message,
                placeholder,
                type,
                defaultValue,
                onConfirm: (value) => {
                    setPromptModal(null);
                    resolve(value);
                },
                onCancel: () => {
                    setPromptModal(null);
                    resolve(null);
                }
            });
        });
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <FiCheckCircle className="text-emerald-500" size={20} />;
            case 'error': return <FiAlertCircle className="text-red-500" size={20} />;
            case 'warning': return <FiAlertTriangle className="text-amber-500" size={20} />;
            default: return <FiInfo className="text-blue-500" size={20} />;
        }
    };

    return (
        <NotificationContext.Provider value={{ showToast, confirmAction, promptAction }}>
            {children}

            {/* Toast Portal */}
            <div className="toast-container">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`toast ${toast.type} ${toast.hiding ? 'hiding' : ''}`}>
                        <div className={`toast-icon ${toast.type}`}>
                            {getIcon(toast.type)}
                        </div>
                        <div className="toast-content">
                            <div className="toast-message">{toast.message}</div>
                        </div>
                        <button className="toast-close" onClick={() => removeToast(toast.id)}>
                            <FiX size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Confirm Modal Portal */}
            {confirmModal && (
                <div className="modal-overlay">
                    <div className="confirm-modal">
                        <div className={`confirm-modal-icon ${confirmModal.type === 'danger' ? 'danger' : ''}`}>
                            {confirmModal.type === 'danger' ? <FiAlertTriangle size={24} /> : <FiAlertCircle size={24} />}
                        </div>
                        <h3 className="confirm-modal-title">{confirmModal.title}</h3>
                        <p className="confirm-modal-message">{confirmModal.message}</p>
                        <div className="confirm-modal-actions">
                            <button
                                className="confirm-btn confirm-btn-secondary"
                                onClick={confirmModal.onCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className={`confirm-btn ${confirmModal.type === 'danger' ? 'confirm-btn-danger' : 'confirm-btn-primary'}`}
                                onClick={confirmModal.onConfirm}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Prompt Modal Portal */}
            {promptModal && (
                <PromptModalComponent
                    modal={promptModal}
                    onClose={() => setPromptModal(null)}
                />
            )}
        </NotificationContext.Provider>
    );
};

const PromptModalComponent = ({ modal, onClose }) => {
    const [inputValue, setInputValue] = useState(modal.defaultValue || '');

    return (
        <div className="modal-overlay">
            <div className="confirm-modal prompt-modal">
                <div className={`confirm-modal-icon ${modal.type === 'danger' ? 'danger' : ''}`}>
                    <FiInfo size={24} />
                </div>
                <h3 className="confirm-modal-title">{modal.title}</h3>
                <p className="confirm-modal-message">{modal.message}</p>

                <div className="prompt-field">
                    <input
                        type="text"
                        className="prompt-input"
                        placeholder={modal.placeholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') modal.onConfirm(inputValue);
                            if (e.key === 'Escape') modal.onCancel();
                        }}
                    />
                </div>

                <div className="confirm-modal-actions">
                    <button
                        className="confirm-btn confirm-btn-secondary"
                        onClick={modal.onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="confirm-btn confirm-btn-primary"
                        onClick={() => modal.onConfirm(inputValue)}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
