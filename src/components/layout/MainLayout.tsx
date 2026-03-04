// import React from 'react';
import { Outlet } from 'react-router-dom';
// import Header from './Header';
import { useTheme } from '../../context/theme/useTheme';

const MainLayout = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`
        min-h-screen flex flex-col transition-colors duration-300
        ${
          theme === 'light'
            ? 'bg-white text-neutral-800'
            : 'bg-neutral-900 text-white'
        }
      `}
    >
      {/* <Header /> */}
      <main className="flex-1 w-full p-5 box-border">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
