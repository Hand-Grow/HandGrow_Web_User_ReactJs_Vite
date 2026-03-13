'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/theme/ThemeContext';
import { useAuth } from '@/context/auth/useAuth';
import { USER_ROLES } from '@/constants';
import { Button } from '../ui/button';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getHomePath = () => {
    if (!user) return null;
    if (user.role === USER_ROLES.COOP) return '/cooperative';
    if (user.role === USER_ROLES.ENTERPRISE) return '/company';
    return null;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center p-5">
      <div className="text-2xl font-bold">HandGrow</div>

      <nav className="flex gap-4">
        {getHomePath() && <Link href={getHomePath()!}>Home</Link>}
        <Link href="/about">About</Link>
      </nav>

      <div className="flex items-center gap-3 relative">
        <Button onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</Button>

        {!user ? (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        ) : (
          <div ref={dropdownRef} className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <img
                src={user.avatar || '/avatar-default.png'}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover border"
              />
              <span className="font-medium">{user.fullName}</span>
            </div>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                <Link
                  href="/cooperative/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  👤 Thông tin cá nhân
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  🚪 Đăng xuất
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
