'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Search,
  MessageCircle,
  FileText,
  User,
  LogOut,
  ChevronDown,
  Package,
} from 'lucide-react';

const menuItems = [
  {
    label: 'Trang chủ',
    href: '/company/dashboard',
    icon: <Home className="w-5 h-5" />,
  },
  {
    label: 'Tìm kiếm nguồn cung',
    href: '/company/sourcing',
    icon: <Search className="w-5 h-5" />,
  },
  {
    label: 'Yêu cầu mua',
    href: '/company/sourcing/my-requests',
    icon: <Package className="w-5 h-5" />,
  },
  {
    label: 'Tin nhắn',
    href: '/company/messages',
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    label: 'Hợp đồng',
    href: '/company/contracts',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: 'Cá nhân',
    href: '/company/profile',
    icon: <User className="w-5 h-5" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const getUserInfo = () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          // Get user info from token or localStorage
          const name =
            payload.name ||
            payload.companyName ||
            payload.sub ||
            localStorage.getItem('companyName') ||
            'Doanh nghiệp';
          const email =
            payload.email || localStorage.getItem('userEmail') || '';
          setUserInfo({ name, email });
        }
      } catch (error) {
        console.error('Error parsing token:', error);
        // Fallback to localStorage if token parsing fails
        const savedName = localStorage.getItem('companyName');
        const savedEmail = localStorage.getItem('userEmail');
        if (savedName || savedEmail) {
          setUserInfo({
            name: savedName || 'Doanh nghiệp',
            email: savedEmail || '',
          });
        }
      }
    };

    getUserInfo();
  }, []);

  const handleLogout = () => {
    document.cookie = 'accessToken=; path=/; max-age=0';
    router.push('/login');
  };

  useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      main.style.paddingLeft = expanded ? '16rem' : '5rem';
    }
  }, [expanded]);

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        expanded ? 'w-64' : 'w-20'
      } min-h-screen flex flex-col fixed top-0 left-0 h-screen z-50`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
          {userInfo?.name?.charAt(0)?.toUpperCase() || 'AT'}
        </div>
        {expanded && (
          <div>
            <span className="text-sm font-bold text-gray-900">
              {userInfo?.name || 'AgriTrade'}
            </span>
            <br />
            <span className="text-xs text-gray-400">Doanh nghiệp</span>
          </div>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-emerald-100 text-emerald-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {expanded && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronDown className="w-5 h-5" />
          {expanded && <span className="text-sm">Thu gọn</span>}
        </button>

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
