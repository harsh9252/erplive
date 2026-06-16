import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, module, action = 'can_read' }) => {
  const { authenticated, loading, hasPermission } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return null; // Return null instead of redirecting while context is initializing
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check granular permissions if a module is specified
  if (module && typeof hasPermission === 'function' && !hasPermission(module, action)) {
    return (
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="card border-0 shadow-lg p-5 text-center rounded-20 bg-white" style={{ maxWidth: '500px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <div className="avatar avatar-xxl bg-soft-danger text-danger rounded-circle mb-4 mx-auto d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', animation: 'pulse 2s infinite' }}>
            <i className="isax isax-lock fs-40"></i>
          </div>
          <h3 className="fw-bold text-dark mb-2">Access Denied</h3>
          <p className="text-muted fs-14 mb-4">
            Your assigned role does not have the required permissions to access this module (<strong>{module}</strong>).
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="btn btn-outline-secondary rounded-pill px-4"
            >
              Go Back
            </button>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="btn btn-primary rounded-pill px-4 shadow-sm"
            >
              Dashboard
            </button>
          </div>
        </div>
        <style>{`
          .avatar-xxl {
            background-color: rgba(255, 62, 62, 0.1);
          }
          @keyframes pulse {
            0% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(255, 62, 62, 0.4);
            }
            70% {
              transform: scale(1);
              box-shadow: 0 0 0 15px rgba(255, 62, 62, 0);
            }
            100% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(255, 62, 62, 0);
            }
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
