import { useState, useEffect, ReactNode } from 'react';
import { AuthContext } from './auth.context';
import { authService } from '../../services/authService';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from './jwt';
import { LoginCredentials } from './auth.types';
import { AuthUser } from '@/src/types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        try {
          const decoded = jwtDecode<CustomJwtPayload>(token);

          setUser({
            email: decoded.sub,
            role: decoded.role,
          });
        } catch (err) {
          localStorage.removeItem('accessToken');
        }
      }

      setInitializing(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const data = await authService.login(credentials);

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    const decoded = jwtDecode<CustomJwtPayload>(data.accessToken);

    const user: AuthUser = {
      email: decoded.sub,
      role: decoded.role,
    };

    setUser(user);
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
