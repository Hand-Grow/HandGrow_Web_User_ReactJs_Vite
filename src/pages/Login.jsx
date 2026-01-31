import React, { useRef, useState } from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import RoleSelectView from '../components/login/RoleSelector';
import LoginForm from '../components/login/LoginForm';
import AuthBanner from '../components/login/AuthBanner';
import { useLogin } from '../hooks/useLogin';
import { toast } from 'react-toastify';
import { validateLogin } from '../utils/validators/authValidator';

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
      password: parsed.password || '',
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
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const rememberRef = useRef(null);

  const [{ email, password, rememberMe }, setLoginState] =
    useState(getRememberedLogin);

  const { handleLogin } = useLogin(selectedRole);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const error = validateLogin({ email, password });
    if (error) {
      toast.error(error);
      return;
    }

    await handleLogin({ email, password }, setLoading);

    if (rememberMe) {
      localStorage.setItem('remember_login', JSON.stringify({ email }));
    } else {
      localStorage.removeItem('remember_login');
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-[#3CC18E]">
        <div className="flex h-screen">
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <AuthBanner />
          </div>
          <RoleSelectView onSelectRole={setSelectedRole} />
        </div>
      </div>
    );
  }

  return (
    <AuthLayout
      left={
        <LoginForm
          email={email}
          password={password}
          rememberMe={rememberMe}
          showPassword={showPassword}
          rememberRef={rememberRef}
          loading={loading}
          onEmailChange={(e) =>
            setLoginState((s) => ({ ...s, email: e.target.value }))
          }
          onPasswordChange={(e) =>
            setLoginState((s) => ({ ...s, password: e.target.value }))
          }
          onRememberMeChange={() =>
            setLoginState((s) => ({ ...s, rememberMe: !s.rememberMe }))
          }
          onTogglePassword={() => setShowPassword((s) => !s)}
          onSubmit={handleSubmitLogin}
        />
      }
      right={<AuthBanner />}
    />
  );
};

export default Login;
