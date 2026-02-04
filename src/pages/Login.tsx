import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import RoleSelectView from '../components/login/RoleSelector';
import LoginForm from '../components/login/LoginForm';

import { validateLogin } from '../utils/validators/authValidator';
import { USER_ROLES } from '../constants/roles';
import { SelectedRole, useLogin } from '../hooks/useLogin';

const getRememberedLogin = () => {
  try {
    const saved = localStorage.getItem('remember_login');
    if (!saved) {
      return {
        email: '',
        password: '',
        rememberMe: false,
      };
    }

    const parsed = JSON.parse(saved);
    return {
      email: parsed.email || '',
      password: '',
      rememberMe: true,
    };
  } catch {
    return {
      email: '',
      password: '',
      rememberMe: false,
    };
  }
};

const Login = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<SelectedRole>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const rememberRef = useRef(null);

  const [{ email, password, rememberMe }, setLoginState] =
    useState(getRememberedLogin);

  const { handleLogin } = useLogin(selectedRole);
  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validateLogin({ email, password });
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const user = await handleLogin({ email, password }, setLoading);

      if (!user) return;

      if (rememberMe) {
        localStorage.setItem('remember_login', JSON.stringify({ email }));
      } else {
        localStorage.removeItem('remember_login');
      }

      if (user.role === USER_ROLES.COOP) {
        navigate('/cooperative', { replace: true });
      } else if (user.role === USER_ROLES.ENTERPRISE) {
        navigate('/company', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Đăng nhập thất bại');
    }
  };

  if (!selectedRole) {
    return <RoleSelectView onSelectRole={setSelectedRole} />;
  }

  return (
    <LoginForm
      email={email}
      password={password}
      rememberMe={rememberMe}
      showPassword={showPassword}
      rememberRef={rememberRef}
      loading={loading}
      onEmailChange={(e: React.FormEvent<HTMLInputElement>) =>
        setLoginState((s) => ({ ...s, email: e.currentTarget.value }))
      }
      onPasswordChange={(e: React.FormEvent<HTMLInputElement>) =>
        setLoginState((s) => ({ ...s, password: e.currentTarget.value }))
      }
      onRememberMeChange={() =>
        setLoginState((s) => ({
          ...s,
          rememberMe: !s.rememberMe,
        }))
      }
      onTogglePassword={() => setShowPassword((s) => !s)}
      onSubmit={handleSubmitLogin}
    />
  );
};

export default Login;
