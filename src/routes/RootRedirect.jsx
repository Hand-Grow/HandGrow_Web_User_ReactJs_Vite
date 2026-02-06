import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';
import { UserRole } from '../types/users';
const RootRedirect = () => {
  const { user, initializing } = useAuth();
  if (initializing) return null;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role === UserRole.COOP) {
    return <Navigate to="/cooperative/dashboard" replace />;
  }

  if (user.role === UserRole.ENTERPRISE) {
    return <Navigate to="/company" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default RootRedirect;
