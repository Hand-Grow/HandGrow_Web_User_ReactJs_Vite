'use client';

import { NavLink } from 'react-router-dom';
import {
  Home,
  Search,
  MessageCircle,
  FileText,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import React from 'react';

type MenuItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const menuItems: MenuItem[] = [
  { label: 'Trang chủ', href: '/company', icon: Home },
  { label: 'Tìm kiếm nguồn cung', href: '/company/sourcing', icon: Search },
  { label: 'Tin nhắn', href: '/company/messages', icon: MessageCircle },
  { label: 'Hợp đồng', href: '/company/contracts', icon: FileText },
  { label: 'Cá nhân', href: '/company/profile', icon: User },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300
      ${expanded ? 'w-64' : 'w-20'}
      min-h-screen flex flex-col sticky top-0`}
    >
      {/* ===== Logo ===== */}
      <div className="p-5 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
          AT
        </div>

        {expanded && (
          <div>
            <p className="text-sm font-bold text-gray-900">AgriTrade</p>
            <p className="text-xs text-gray-400">Sàn giao dịch B2B</p>
          </div>
        )}
      </div>

      {/* ===== Menu ===== */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-4 py-3 rounded-xl
                text-sm transition-all
                ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `
              }
            >
              <Icon className="w-5 h-5" />
              {expanded && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* ===== Footer ===== */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
        >
          <ChevronDown
            className={`w-5 h-5 transition ${expanded ? '' : 'rotate-180'}`}
          />
          {expanded && <span>Thu gọn</span>}
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition">
          <LogOut className="w-5 h-5" />
          {expanded && <span>Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}
