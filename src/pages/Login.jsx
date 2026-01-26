import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (userType) => {
    login(userType);
    if (userType === 'admin') {
      navigate('/admin/dashboard');
    } else if (userType === 'cooperative') {
      navigate('/cooperative/dashboard');
    } else if (userType === 'company') {
      navigate('/company/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      <p>Select a role to simulate login:</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <Button onClick={() => handleLogin('admin')} style={{ backgroundColor: '#dc3545' }}>
          Login as Admin
        </Button>
        <Button onClick={() => handleLogin('user')} style={{ backgroundColor: '#28a745' }}>
          Login as User
        </Button>
        <Button onClick={() => handleLogin('cooperative')} style={{ backgroundColor: '#007bff' }}>
          Login as Cooperative
        </Button>
        <Button onClick={() => handleLogin('company')} style={{ backgroundColor: '#ffc107' }}>
          Login as Company
        </Button>
      </div>
    </div>
  );
};

export default Login;
