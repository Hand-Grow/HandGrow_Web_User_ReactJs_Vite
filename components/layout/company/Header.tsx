'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Bell, Settings } from 'lucide-react';

import { useTheme } from '@/context/theme/ThemeContext';
import { useAuth } from '@/context/auth/useAuth';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    router.push('/login');
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
    <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-8">
      <div>
        <h1 className="text-xl font-bold">Trang chủ</h1>
        <p className="text-sm text-neutral-500">
          Thống kê và hoạt động của doanh nghiệp
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <Bell size={20} className="text-neutral-500 cursor-pointer" />
        <Settings size={20} className="text-neutral-500 cursor-pointer" />

        {/* Theme toggle */}
        <button onClick={toggleTheme} className="text-lg px-2">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* User */}
        {user && (
          <div ref={dropdownRef} className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Image
                src={user.avatarUrl || '/avatar-default.png'}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full object-cover border"
              />

              <div className="text-sm">
                <p className="font-semibold">{user.fullName}</p>
                <p className="text-neutral-500 text-xs">{user.role}</p>
              </div>
            </div>

            {open && (
              <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border overflow-hidden">
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 hover:bg-neutral-100 text-sm"
                >
                  👤 Thông tin cá nhân
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-neutral-100 text-sm text-red-500"
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
}
