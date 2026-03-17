'use client';

import React, { useState, useEffect, memo } from 'react';
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
  Package,
} from 'lucide-react';
import i18next from 'i18next';

interface SidebarProps {
  onExpandChange?: (expanded: boolean) => void;
}

type MenuItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const menuItems: MenuItem[] = [
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
    label: 'Yêu cầu mua',
    href: '/company/sourcing/my-requests',
    icon: Package,
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

function SidebarComponent({ onExpandChange }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [expanded, setExpanded] = useState(true);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);

  // Load user info
  useEffect(() => {
    const getUserInfo = () => {
      try {
        const token = localStorage.getItem('accessToken');

        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));

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

  const toggleExpand = () => {
    const newState = !expanded;
    setExpanded(newState);
    onExpandChange?.(newState);

    window.dispatchEvent(
      new CustomEvent('sidebarChange', { detail: { expanded: newState } })
    );
  };

  useEffect(() => {
    menuItems.forEach((item) => {
      router.prefetch(item.href);
    });
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'accessToken=; path=/; max-age=0';
    localStorage.removeItem('accessToken');
    router.push(`/login?lang=${i18next.language || 'vi'}`);
  };

  return (
    <aside className="bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
          {userInfo?.name?.charAt(0)?.toUpperCase() || 'AT'}
        </div>

        {expanded && (
          <div className="truncate">
            <span className="text-sm font-bold text-gray-900 block truncate">
              {userInfo?.name || 'AgriTrade'}
            </span>
            <span className="text-xs text-gray-400">Doanh nghiệp</span>
          </div>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href + '/') &&
              !menuItems.some(
                (i) => i.href !== item.href && pathname.startsWith(i.href)
              ));

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              onMouseEnter={() => router.prefetch(item.href)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-emerald-100 text-emerald-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={!expanded ? item.label : ''}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {expanded && (
                <span className="text-sm truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={toggleExpand}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          title={!expanded ? 'Thu gọn' : ''}
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

export const Sidebar = memo(SidebarComponent);

export default Sidebar;
