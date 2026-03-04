import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import RoleSelectView from '../components/layout/login/RoleSelector';
import LoginForm from '../components/layout/login/LoginForm';

import { validateLogin } from '../utils/validators/authValidator';
import { SelectedRole, useLogin } from '../hooks/useLogin';
import { UserRole } from '../types/users';

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

  const onTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const rememberRef = useRef<HTMLInputElement>(null!);

  const [{ email, password, rememberMe }, setLoginState] =
    useState(getRememberedLogin());

  const { handleLogin } = useLogin(selectedRole);
  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('EMAIL LENGTH:', email.length);
    console.log('EMAIL VALUE:', JSON.stringify(email));
    e.preventDefault();

    const error = validateLogin({ email, password });
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const user = await handleLogin(
        {
          username: email,
          password,
        },
        setLoading
      );

      if (!user) return;

      if (rememberMe) {
        localStorage.setItem('remember_login', JSON.stringify({ email }));
      } else {
        localStorage.removeItem('remember_login');
      }

      if (user.role === UserRole.COOP) {
        navigate('/cooperative', { replace: true });
      } else if (user.role === UserRole.ENTERPRISE) {
        navigate('/company', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại');
    }
  };

  const goRegister = () => {
    if (selectedRole === 'cooperative') {
      navigate('/register/coop');
    }

    if (selectedRole === 'company') {
      navigate('/register/enterprise');
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
      onEmailChange={(value: string) => {
        setLoginState((s) => ({ ...s, email: value }));
      }}
      onPasswordChange={(value: string) => {
        setLoginState((s) => ({ ...s, password: value }));
      }}
      onRememberMeChange={() =>
        setLoginState((s) => ({
          ...s,
          rememberMe: !s.rememberMe,
        }))
      }
      onTogglePassword={onTogglePassword}
      onSubmit={handleSubmitLogin}
      onGoRegister={goRegister}
    />
  );
};

export default Login;
