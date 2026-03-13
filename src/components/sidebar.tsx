'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  ShoppingCart,
  Users,
  MessageSquare,
  BarChart3,
  LogOut,
  ChevronDown,
  User,
} from 'lucide-react';

const menuItems = [
  {
    label: 'Trang chủ',
    href: '/cooperative/dashboard',
    icon: <Home className="w-5 h-5" />,
  },
  {
    label: 'Bài đăng',
    href: '/cooperative/feed',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    label: 'Mua chung',
    href: '/cooperative/purchases',
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    label: 'Quản lý thành viên',
    href: '/cooperative/members',
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: 'Tin nhắn',
    href: '/cooperative/messages',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    label: 'Báo cáo',
    href: '/cooperative/reports',
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    label: 'Hợp đồng',
    href: '/cooperative/orders',
    icon: <User className="w-5 h-5" />,
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
          HTX
        </div>
        {expanded && (
          <span className="text-sm font-bold text-gray-900">
            HTX nông nghiệp
          </span>
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
