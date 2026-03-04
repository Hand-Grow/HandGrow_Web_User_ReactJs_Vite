import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';
import { USER_ROLES } from '../constants/roles';

const RootRedirect: React.FC = (): JSX.Element | null => {
  const { user, initializing } = useAuth();

  if (initializing) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === USER_ROLES.COOP) {
    return <Navigate to="/cooperative/dashboard" replace />;
  }

  if (user.role === USER_ROLES.ENTERPRISE) {
    return <Navigate to="/company" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default RootRedirect;
