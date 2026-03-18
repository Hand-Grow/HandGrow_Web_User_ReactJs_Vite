'use client';
import { useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '@/src/services/authService';
import { AuthContext } from './auth.context';
import { CustomJwtPayload, LoginResponse } from './jwt';
import { UserProfile, UserRole, UserStatistics } from '@/src/types';
import { LoginCredentials } from './auth.types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserStatistics | UserProfile | null>(null);
  const [initializing] = useState<boolean>(false);

  const login = async (
    credentials: LoginCredentials
  ): Promise<LoginResponse> => {
    const data = await authService.login(credentials);

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    const decoded = jwtDecode<CustomJwtPayload>(data.accessToken);

    setUser({
      username: decoded.sub,
      role: decoded.role as UserRole,
    });

    return data;
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, initializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
