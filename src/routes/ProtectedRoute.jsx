import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, initializing } = useAuth();

  if (initializing) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
