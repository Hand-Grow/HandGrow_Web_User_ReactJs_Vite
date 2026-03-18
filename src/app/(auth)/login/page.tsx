'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { SelectedRole, useLogin } from '@/src/hooks/useLogin';
import { validateLogin } from '@/src/utils/validators/authValidator';
import RoleSelectView from '@/src/components/layout/login/RoleSelector';
import LoginForm from '@/src/components/layout/login/LoginForm';
import { USER_ROLES } from '@/src/constants';

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
  const router = useRouter();
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
      toast.success('Đăng nhập thành công');

      if (user.role === USER_ROLES.COOP) {
        router.replace('/cooperative/dashboard');
      } else if (user.role === USER_ROLES.ENTERPRISE) {
        router.replace('/company');
      } else {
        router.replace('/login');
      }
    } catch (_) {
      toast.error('Đăng nhập thất bại');
    }
  };

  const goRegister = () => {
    if (selectedRole === 'cooperative') {
      router.push('/register/coop');
    }

    if (selectedRole === 'company') {
      router.push('/register/enterprise');
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
      onEmailChange={(value: string) =>
        setLoginState((s) => ({ ...s, email: value }))
      }
      onPasswordChange={(value: string) =>
        setLoginState((s) => ({ ...s, password: value }))
      }
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
