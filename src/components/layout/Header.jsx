import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/theme/useTheme';
import { useAuth } from '../../context/auth/useAuth';
import Button from '../common/PrimaryButton';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: theme === 'light' ? '#f8f9fa' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    borderBottom: '1px solid #dee2e6',
  };

  const navStyle = {
    display: 'flex',
    gap: '15px',
  };

  const linkStyle = {
    color: theme === 'light' ? '#007bff' : '#66b0ff',
    textDecoration: 'none',
    fontSize: '18px',
  };

  return (
    <header style={headerStyle}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>HandGrow</div>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/about" style={linkStyle}>
          About
        </Link>

        {user?.role === 'admin' && (
          <Link
            to="/admin/dashboard"
            style={{ ...linkStyle, color: '#dc3545' }}
          >
            Admin
          </Link>
        )}

        {user && (
          <Link to="/dashboard" style={linkStyle}>
            Dashboard
          </Link>
        )}
      </nav>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Button
          onClick={toggleTheme}
          style={{ padding: '8px 12px', fontSize: '14px' }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>

        {user ? (
          <Button onClick={handleLogout} style={{ backgroundColor: '#6c757d' }}>
            Logout ({user.role})
          </Button>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
