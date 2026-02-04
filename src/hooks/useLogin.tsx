import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { USER_ROLES, UserRole } from '../constants/roles';
import { validateLogin } from '../utils/validators/authValidator';
import { useAuth } from '../context/auth/useAuth';
import { handleApiError } from '../utils/errors/apiErrorHandler';
import { LoginJwtPayload, LoginResponse } from '../context/auth/jwt';

export type SelectedRole = 'cooperative' | 'company' | null;

export const BACKEND_ROLE_MAP: Record<UserRole, UserRole> = {
  COOP: USER_ROLES.COOP,
  ENTERPRISE: USER_ROLES.ENTERPRISE,
};

export interface LoginFormValues {
  email: string;
  password: string;
}

type SetLoading = (value: boolean) => void;
export const useLogin = (selectedRole: SelectedRole) => {
  const { login, logout } = useAuth();

  const handleLogin = async (
    { email, password }: LoginFormValues,
    setLoading: SetLoading
  ) => {
    const error = validateLogin({ email, password });
    if (error) {
      toast.error(error);
      return null;
    }

    try {
      setLoading(true);

      const data = await login({
        email: email.trim(),
        password,
      });

      if (!data.accessToken) {
        throw new Error('Không nhận được access token');
      }

      const decoded = jwtDecode<LoginJwtPayload>(data.accessToken);
      const mappedRole = BACKEND_ROLE_MAP[decoded.role];

      if (!mappedRole) {
        toast.error('Vai trò không hợp lệ');
        logout();
        return null;
      }

      const isInvalidRole =
        (selectedRole === 'cooperative' && mappedRole !== USER_ROLES.COOP) ||
        (selectedRole === 'company' && mappedRole !== USER_ROLES.ENTERPRISE);

      if (isInvalidRole) {
        toast.error('Email hoặc số điện thoại không phù hợp');
        logout();
        return null;
      }

      toast.success('Đăng nhập thành công');

      return {
        email: decoded.sub,
        role: mappedRole,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      };
    } catch (err) {
      handleApiError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin };
};
