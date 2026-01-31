import React, { useState } from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import AuthBanner from '../components/login/AuthBanner';
import RegisterForm from '../components/login/RegisterForm';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <AuthLayout
      left={
        <RegisterForm
          name={name}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          showPassword={showPassword}
          loading={loading}
          onNameChange={(e) => setName(e.target.value)}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
          onTogglePassword={() => setShowPassword(!showPassword)}
          onSubmit={handleSubmit}
        />
      }
      right={<AuthBanner />}
    />
  );
};

export default Register;
