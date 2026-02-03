import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, initializing } = useAuth();

  if (initializing) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Or a "Unauthorized" page
  }

  return <Outlet />;
};

export default ProtectedRoute;
