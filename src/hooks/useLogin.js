import { toast } from 'react-toastify';
import { USER_ROLES } from '../constants/roles';
import { validateLogin } from '../utils/validators/authValidator';
import { useAuth } from '../context/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../utils/errors/apiErrorHandler';

const ROLE_REDIRECT = {
  [USER_ROLES.FARMER]: '/cooperative/dashboard',
  [USER_ROLES.ENTERPRISE]: '/company/dashboard',
};

const BACKEND_ROLE_MAP = {
  COOP: USER_ROLES.FARMER,
  ENTERPRISE: USER_ROLES.ENTERPRISE,
};

export const useLogin = (selectedRole) => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }, setLoading) => {
    const error = validateLogin({ email, password });
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      const user = await login({
        email: email.trim(),
        password,
      });

      if (!user?.role) {
        throw new Error('Không nhận được role từ server');
      }

      const mappedRole = BACKEND_ROLE_MAP[user.role];

      if (!mappedRole) {
        toast.error('Vai trò không hợp lệ');
        logout();
        return;
      }

      const isInvalidRole =
        (selectedRole === 'cooperative' && mappedRole !== USER_ROLES.FARMER) ||
        (selectedRole === 'company' && mappedRole !== USER_ROLES.ENTERPRISE);

      if (isInvalidRole) {
        toast.error('Email hoặc số điện thoại không phù hợp');
        logout();
        return;
      }

      toast.success('Đăng nhập thành công');
      navigate(ROLE_REDIRECT[mappedRole]);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin };
};
