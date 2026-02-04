// src/context/auth/useAuth.ts
import { useContext } from 'react';
import { AuthContextType } from './auth.types';
import { AuthContext } from './auth.context';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
