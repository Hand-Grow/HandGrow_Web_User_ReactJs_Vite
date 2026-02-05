import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useTheme } from '../../context/theme/useTheme';

const MainLayout = () => {
  const { theme } = useTheme();

  const mainDetailStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme === 'light' ? '#ffffff' : '#242424',
    color: theme === 'light' ? '#213547' : 'rgba(255, 255, 255, 0.87)',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  const contentStyle = {
    flex: 1,
    padding: '20px',

    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <div style={mainDetailStyle}>
      <Header />
      <main style={contentStyle}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
