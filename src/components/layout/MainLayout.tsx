'use client';

import { ReactNode } from 'react';
import { useTheme } from '@/src/context/theme/ThemeContext';
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
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
      <main className="flex-1 w-full p-5 box-border"> {children} </main>
    </div>
  );
};

export default MainLayout;
