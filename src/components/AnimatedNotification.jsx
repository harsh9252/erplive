import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const NotificationTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

const notificationConfig = {
  [NotificationTypes.SUCCESS]: {
    icon: FiCheckCircle,
    bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
    titleColor: 'text-green-800',
    textColor: 'text-green-700',
  },
  [NotificationTypes.ERROR]: {
    icon: FiXCircle,
    bgColor: 'bg-gradient-to-r from-red-50 to-rose-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
    titleColor: 'text-red-800',
    textColor: 'text-red-700',
  },
  [NotificationTypes.WARNING]: {
    icon: FiAlertCircle,
    bgColor: 'bg-gradient-to-r from-yellow-50 to-amber-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-600',
    titleColor: 'text-yellow-800',
    textColor: 'text-yellow-700',
  },
  [NotificationTypes.INFO]: {
    icon: FiInfo,
    bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-800',
    textColor: 'text-blue-700',
  },
};

export function AnimatedNotification({ 
  type = NotificationTypes.INFO, 
  title, 
  message, 
  isVisible = true, 
  onClose,
  autoClose = true,
  duration = 5000,
  className = ""
}) {
  const [show, setShow] = useState(isVisible);
  const [isExiting, setIsExiting] = useState(false);
  
  const config = notificationConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    setShow(isVisible);
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShow(false);
      onClose?.();
    }, 300);
  };

  if (!show) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${className}`}>
      <div 
        className={`
          ${config.bgColor} ${config.borderColor} 
          border rounded-2xl shadow-2xl backdrop-blur-md p-4 
          transform transition-all duration-300 ease-out
          ${isExiting 
            ? 'translate-x-full opacity-0 scale-95' 
            : 'translate-x-0 opacity-100 scale-100 animate-slideDown'
          }
          hover:scale-105 hover:shadow-3xl
        `}
      >
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 p-1 rounded-xl ${config.iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className={`font-bold text-sm ${config.titleColor} mb-1`}>
                {title}
              </h4>
            )}
            {message && (
              <p className={`text-sm ${config.textColor} leading-relaxed`}>
                {message}
              </p>
            )}
          </div>
          
          {onClose && (
            <button
              onClick={handleClose}
              className={`
                flex-shrink-0 p-1 rounded-lg transition-all duration-200
                ${config.iconColor} hover:bg-white/50 hover:scale-110
              `}
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Progress bar for auto-close */}
        {autoClose && (
          <div className="mt-3 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-current ${config.iconColor} rounded-full transition-all ease-linear`}
              style={{
                width: '100%',
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Notification Container for managing multiple notifications
export function NotificationContainer({ notifications = [] }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
      {notifications.map((notification, index) => (
        <AnimatedNotification
          key={notification.id || index}
          {...notification}
          className="relative"
          style={{ 
            animationDelay: `${index * 100}ms`,
            transform: `translateY(${index * 4}px)`,
          }}
        />
      ))}
    </div>
  );
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove after duration
    if (notification.autoClose !== false) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
    
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Convenience methods
  const success = (title, message, options = {}) => 
    addNotification({ type: NotificationTypes.SUCCESS, title, message, ...options });
  
  const error = (title, message, options = {}) => 
    addNotification({ type: NotificationTypes.ERROR, title, message, ...options });
  
  const warning = (title, message, options = {}) => 
    addNotification({ type: NotificationTypes.WARNING, title, message, ...options });
  
  const info = (title, message, options = {}) => 
    addNotification({ type: NotificationTypes.INFO, title, message, ...options });

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  };
}

// Add the shrink animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
`;
document.head.appendChild(style);

export { NotificationTypes };
export default AnimatedNotification;