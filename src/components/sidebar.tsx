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
  Newspaper,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import i18next from 'i18next';

interface SidebarProps {
  onExpandChange?: (expanded: boolean) => void;
}

const menuItems = [
  {
    label: 'Trang chủ',
    href: '/cooperative/dashboard',
    icon: <Home className="w-5 h-5" />,
  },
  {
    label: 'Bài đăng',
    href: '/cooperative/feed',
    icon: <Newspaper className="w-5 h-5" />,
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
    icon: <FileText className="w-5 h-5" />,
  },
];

export function Sidebar({ onExpandChange }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    const newState = !expanded;
    setExpanded(newState);
    onExpandChange?.(newState);

    // Dispatch event cho layout (cách khác nếu không dùng props)
    window.dispatchEvent(
      new CustomEvent('sidebarChange', { detail: { expanded: newState } })
    );
  };

  const handleLogout = () => {
    document.cookie = 'accessToken=; path=/; max-age=0';
    router.push(`/login?lang=${i18next.language || 'vi'}`);
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        expanded ? 'w-64' : 'w-20'
      } h-[calc(100vh-4rem)] fixed left-0 top-16 flex flex-col z-40`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
          HTX
        </div>
        {expanded && (
          <span className="text-sm font-bold text-gray-900 truncate">
            HTX nông nghiệp
          </span>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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
              title={!expanded ? item.label : ''}
            >
              <span className="shrink-0">{item.icon}</span>
              {expanded && (
                <span className="text-sm truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          onClick={toggleExpand}
        >
          {expanded ? (
            <>
              <ChevronLeft className="w-5 h-5 shrink-0" />
              <span className="text-sm">Thu gọn</span>
            </>
          ) : (
            <ChevronRight className="w-5 h-5 shrink-0 mx-auto" />
          )}
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          title={!expanded ? 'Đăng xuất' : ''}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {expanded && <span className="text-sm">Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}
