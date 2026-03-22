import { useState, useEffect, ReactNode } from 'react';
import { AuthContext } from './auth.context';
import { authService } from '@/src/services/authService';
import { UserProfile } from '@/src/types';
import { LoginCredentials } from './auth.types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        try {
          const profile = await authService.getProfile();
          setUser(profile);
        } catch (err) {
          console.error('Failed to initialize auth:', err);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }

      setInitializing(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const data = await authService.login(credentials);

    const profile = await authService.getProfile();
    setUser(profile);

    return data;
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
