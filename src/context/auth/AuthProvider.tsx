import { useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../../services/authService';
import { AuthContext } from './auth.context';
import { CustomJwtPayload, LoginResponse } from './jwt';
import { AuthUser } from '../../types/users';
import { LoginCredentials } from './auth.types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initializing] = useState<boolean>(false);

  const login = async (
    credentials: LoginCredentials
  ): Promise<LoginResponse> => {
    const data = await authService.login(credentials);

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    const decoded = jwtDecode<CustomJwtPayload>(data.accessToken);

    setUser({
      email: decoded.sub,
      role: decoded.role,
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
