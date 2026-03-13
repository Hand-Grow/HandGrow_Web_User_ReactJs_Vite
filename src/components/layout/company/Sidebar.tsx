'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Search,
  MessageCircle,
  FileText,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  {
    label: 'Trang chủ',
    href: '/company/dashboard',
    icon: Home,
  },
  {
    label: 'Tìm kiếm nguồn cung',
    href: '/company/sourcing',
    icon: Search,
  },
  {
    label: 'Tin nhắn',
    href: '/company/messages',
    icon: MessageCircle,
  },
  {
    label: 'Hợp đồng',
    href: '/company/contracts',
    icon: FileText,
  },
  {
    label: 'Cá nhân',
    href: '/company/profile',
    icon: User,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);

  const handleLogout = () => {
    document.cookie = 'accessToken=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <aside
      className={`
      bg-white
      border-r
      border-gray-200
      transition-all
      duration-300
      ${expanded ? 'w-64' : 'w-20'}
      min-h-screen
      flex
      flex-col
      fixed
      top-0
      left-0
      z-50
    `}
    >
      {/* LOGO */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
          AT
        </div>

        {expanded && (
          <div>
            <span className="text-sm font-bold text-gray-900">AgriTrade</span>
            <br />
            <span className="text-xs text-gray-400">Sàn giao dịch B2B</span>
          </div>
        )}
      </div>

      {/* MENU */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className={`
              flex items-center gap-3
              px-4 py-3
              rounded-lg
              transition
              ${
                isActive
                  ? 'bg-emerald-100 text-emerald-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }
            `}
            >
              <Icon className="w-5 h-5 shrink-0" />

              {expanded && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-3 border-t border-gray-200 space-y-1">
        {/* Toggle sidebar */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          {expanded ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}

          {expanded && <span className="text-sm">Thu gọn</span>}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          <LogOut className="w-5 h-5" />

          {expanded && <span className="text-sm">Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
