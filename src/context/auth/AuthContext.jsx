import { useState, useEffect } from 'react';
import { AuthContext } from './auth.context';
import { authService } from '../../services/authService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const storedUser = authService.getCurrentUser();
      if (storedUser) {
        setUser(storedUser);
      }
      setInitializing(false);
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    const user = await authService.login(credentials);
    setUser(user);
    return user;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};
