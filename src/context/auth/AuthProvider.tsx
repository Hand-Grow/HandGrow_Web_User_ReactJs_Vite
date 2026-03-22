'use client';
import { useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '@/src/services/authService';
import { AuthContext } from './auth.context';
import { CustomJwtPayload, LoginResponse } from './jwt';
import { UserRole, UserProfile, UserStatistics } from '@/src/types';
import { LoginCredentials } from './auth.types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | UserStatistics | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  // Restore user từ localStorage khi app khởi động / reload trang
  useEffect(() => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        // Kiểm tra token chưa hết hạn
        const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : false;
        if (!isExpired) {
          setUser({
            username: decoded.sub,
            role: decoded.role as UserRole,
          });
        } else {
          // Token hết hạn → clear storage
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    } catch {
      // Token lỗi → clear storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setInitializing(false);
    }
  }, []);

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
