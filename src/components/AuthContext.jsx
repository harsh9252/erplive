import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as authService from '../services/authService';
import { getStoredActiveCompany, getAccessToken, AUTH_STATE_CHANGED_EVENT } from '../services/apiClient';
import pushNotificationService from '../services/pushNotificationService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [token, setToken] = useState(() => getAccessToken());
  const [activeCompany, setActiveCompany] = useState(() => getStoredActiveCompany());
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const fetchInProgress = useRef(null);

  // Initialize push notifications
  const initializePushNotifications = async () => {
    try {
      console.log('Initializing push notifications...');
      const initialized = await pushNotificationService.init();
      if (!initialized) return;

      const permissionStatus = pushNotificationService.getPermissionStatus();
      if (permissionStatus === 'default') {
        await pushNotificationService.requestPermission();
      }
      
      const existingSubscription = await pushNotificationService.getSubscription();
      if (!existingSubscription) {
        await pushNotificationService.subscribe();
      }
    } catch (error) {
      console.warn('Error initializing push notifications (non-critical):', error);
    }
  };

  // Sync state with storage for cross-tab and service events
  const syncAuthState = () => {
    const storedToken = getAccessToken();
    const storedUser = authService.getCurrentUser();
    const storedCompany = getStoredActiveCompany();
    
    setToken(storedToken);
    setUser(storedUser);
    setActiveCompany(storedCompany);
  };

  // Check for existing session on app start
  useEffect(() => {
    syncAuthState();
    setLoading(false);

    // Initial profile fetch to ensure state is fresh
    const storedToken = getAccessToken();
    if (storedToken) {
      fetchFullProfile(storedToken, true);
    }

    // Listen for storage changes and explicit auth events
    window.addEventListener('storage', syncAuthState);
    window.addEventListener(AUTH_STATE_CHANGED_EVENT, syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener(AUTH_STATE_CHANGED_EVENT, syncAuthState);
    };
  }, []);

  const fetchFullProfile = async (authToken, isInitialLoad = false) => {
    // Deduplicate in-flight requests
    if (fetchInProgress.current) {
      return fetchInProgress.current;
    }

    fetchInProgress.current = (async () => {
      try {
      const response = await authService.getProfile();
      const data = response.data || response;
      
      const profile = data.user || data;
      const company = data.company || data.active_company;
      const companiesList = data.companies || [];
      const rolesList = data.roles || [];

      const fullUserData = {
        id: profile.id || profile.user_id,
        name: profile.name || profile.first_name,
        email: profile.email,
        phone: profile.phone,
        profile_image: profile.profile_image,
        role: profile.role,
        status: profile.status,
        company_id: profile.company_id || company?.id,
        isTempPassword: profile.is_temp_password
      };

      setUser(fullUserData);
      setCompanies(companiesList);
      setRoles(rolesList);
      
      if (company) {
        setActiveCompany(company);
      }

      if (fullUserData.isTempPassword && !isInitialLoad) {
        setShowPasswordChange(true);
      } else if (!fullUserData.isTempPassword && !isInitialLoad) {
        initializePushNotifications();
      }
      } catch (error) {
        console.error('Error fetching full profile:', error);
      } finally {
        fetchInProgress.current = null;
      }
    })();
    
    return fetchInProgress.current;
  };

  const login = async (token, userData) => {
    setToken(token);
    setUser(userData);
    setActiveCompany(getStoredActiveCompany());
    await fetchFullProfile(token);
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    setActiveCompany(null);
  };

  const switchCompany = async (companyId) => {
    try {
      setLoading(true);
      await authService.switchCompany(companyId);
      
      const newToken = getAccessToken();
      const newCompany = getStoredActiveCompany();
      
      setToken(newToken);
      setActiveCompany(newCompany);
      
      await fetchFullProfile(newToken);
      return true;
    } catch (error) {
      console.error('Error switching company:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const isAuthenticated = () => !!token && !!user;

  const value = {
    user,
    token,
    activeCompany,
    companies,
    roles,
    authenticated: isAuthenticated(),
    loading,
    showPasswordChange,
    login,
    logout,
    loginUser: login, // Alises for legacy components
    logoutUser: logout,
    switchCompany,
    updateUser,
    isAuthenticated,
    hidePasswordChange: () => setShowPasswordChange(false),
    requiresPasswordChange: () => !!token && !!user && !!user.isTempPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
