import { useEffect, useState } from 'react';
import { isAuthenticated, getCurrentUser } from '../services/authService';

const AuthDebug = () => {
  const [authState, setAuthState] = useState({});

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem('accessToken') || localStorage.getItem('token');
      const state = {
        isAuthenticated: isAuthenticated(),
        hasToken: !!accessToken,
        hasUser: !!localStorage.getItem('user'),
        token: accessToken ? `${accessToken.substring(0, 30)}...` : 'None',
        user: getCurrentUser(),
        timestamp: new Date().toISOString()
      };
      setAuthState(state);
    };

    checkAuth();
    
    // Check every 2 seconds
    const interval = setInterval(checkAuth, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 10,
      right: 10,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <div><strong>Auth Debug</strong></div>
      <div>Authenticated: {authState.isAuthenticated ? '✅' : '❌'}</div>
      <div>Has Token: {authState.hasToken ? '✅' : '❌'}</div>
      <div>Has User: {authState.hasUser ? '✅' : '❌'}</div>
      <div>User: {authState.user?.name || 'None'}</div>
      <div style={{ fontSize: '10px', marginTop: '5px' }}>
        Token: {authState.token}
      </div>
    </div>
  );
};

export default AuthDebug;
