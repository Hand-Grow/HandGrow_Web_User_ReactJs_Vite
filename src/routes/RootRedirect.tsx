import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';
import { USER_ROLES } from '../constants/roles';

const RootRedirect: React.FC = () => {
  const { user, initializing } = useAuth();
  if (initializing) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case USER_ROLES.COOP:
      return <Navigate to="/cooperative/dashboard" replace />;

    case USER_ROLES.ENTERPRISE:
      return <Navigate to="/company" replace />;

    default:
      return <Navigate to="/login" replace />;
  }
};

export default RootRedirect;
