import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import * as authService from '../services/authService';
import { getStoredActiveCompany, getAccessToken, AUTH_STATE_CHANGED_EVENT } from '../services/apiClient';
import pushNotificationService from '../services/pushNotificationService';
import roleService from '../services/roleService';

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
  const [userPermissions, setUserPermissions] = useState({}); // { module: { can_create, can_read, can_update, can_delete } }
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

  // Standalone: re-fetch only role permissions (lightweight, no profile reload)
  const refreshPermissions = useCallback(async () => {
    try {
      const storedUser = authService.getCurrentUser();
      if (!storedUser) return;

      // Get current roles from stored profile
      const response = await authService.getProfile();
      const data = response.data || response;
      const rolesList = data.roles || [];
      if (rolesList.length === 0) return;

      setRoles(rolesList);

      const allRolesRes = await roleService.getRoles();
      const allRoles = allRolesRes.data || allRolesRes || [];
      const userRoleIds = new Set(rolesList.map(r => r.id));
      const effectivePerms = {};

      allRoles
        .filter(r => userRoleIds.has(r.id))
        .forEach(role => {
          (role.permissions || []).forEach(perm => {
            if (!effectivePerms[perm.module]) {
              effectivePerms[perm.module] = { can_create: false, can_read: false, can_update: false, can_delete: false };
            }
            effectivePerms[perm.module].can_create = effectivePerms[perm.module].can_create || perm.can_create;
            effectivePerms[perm.module].can_read   = effectivePerms[perm.module].can_read   || perm.can_read;
            effectivePerms[perm.module].can_update = effectivePerms[perm.module].can_update || perm.can_update;
            effectivePerms[perm.module].can_delete = effectivePerms[perm.module].can_delete || perm.can_delete;
          });
        });

      setUserPermissions(effectivePerms);
    } catch (err) {
      console.warn('Permission refresh failed (non-critical):', err);
    }
  }, []);

  // Check for existing session on app start
  useEffect(() => {
    syncAuthState();
    setLoading(false);

    // Initial profile fetch to ensure state is fresh
    const storedToken = getAccessToken();
    if (storedToken) {
      fetchFullProfile(storedToken, true);
    }

    // Re-fetch permissions when user switches back to this tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && getAccessToken()) {
        refreshPermissions();
      }
    };

    // Listen for storage changes and explicit auth events
    window.addEventListener('storage', syncAuthState);
    window.addEventListener(AUTH_STATE_CHANGED_EVENT, syncAuthState);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener(AUTH_STATE_CHANGED_EVENT, syncAuthState);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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

      // Fetch all role definitions and compute effective permissions
      if (rolesList.length > 0) {
        try {
          const allRolesRes = await roleService.getRoles();
          const allRoles = allRolesRes.data || allRolesRes || [];
          const userRoleIds = new Set(rolesList.map(r => r.id));
          const effectivePerms = {};

          // For each role the user has, merge permissions (union)
          allRoles
            .filter(r => userRoleIds.has(r.id))
            .forEach(role => {
              (role.permissions || []).forEach(perm => {
                if (!effectivePerms[perm.module]) {
                  effectivePerms[perm.module] = { can_create: false, can_read: false, can_update: false, can_delete: false };
                }
                effectivePerms[perm.module].can_create = effectivePerms[perm.module].can_create || perm.can_create;
                effectivePerms[perm.module].can_read   = effectivePerms[perm.module].can_read   || perm.can_read;
                effectivePerms[perm.module].can_update = effectivePerms[perm.module].can_update || perm.can_update;
                effectivePerms[perm.module].can_delete = effectivePerms[perm.module].can_delete || perm.can_delete;
              });
            });

          setUserPermissions(effectivePerms);
        } catch (err) {
          console.error('Error computing user permissions:', err);
        }
      }

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

  /**
   * Check if the current user has a specific permission on a module.
   * Super-admin role always returns true.
   * @param {string} module - e.g. 'approvals', 'sales_invoice'
   * @param {'can_create'|'can_read'|'can_update'|'can_delete'} action
   * @returns {boolean}
   */
  const hasPermission = useCallback((module, action = 'can_read') => {
    const userRole = user?.role ? String(user.role).toLowerCase() : '';
    const rolesList = Array.isArray(roles) ? roles : [];
    
    // Bypass permission checks for super_admin, admin, and owner
    if (
      userRole === 'super_admin' ||
      userRole === 'super admin' ||
      userRole === 'admin' ||
      userRole === 'owner' ||
      rolesList.some(r => {
        const roleName = String(r?.name || r || '').toLowerCase();
        return roleName === 'super_admin' || roleName === 'super admin' || roleName === 'admin' || roleName === 'owner';
      })
    ) {
      return true;
    }

    // Bypass for newly registered users who don't have roles/permissions set up yet
    if (rolesList.length === 0 && (!userPermissions || Object.keys(userPermissions).length === 0)) {
      return true;
    }

    const modPerms = userPermissions[module];
    if (!modPerms) return false;
    return !!modPerms[action];
  }, [roles, userPermissions, user]);


  const value = {
    user,
    token,
    activeCompany,
    companies,
    roles,
    userPermissions,
    hasPermission,
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
    refreshPermissions,
    refreshProfile: () => fetchFullProfile(token),
    hidePasswordChange: () => setShowPasswordChange(false),
    requiresPasswordChange: () => !!token && !!user && !!user.isTempPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
