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
  ChevronDown,
  Package,
  Boxes,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

interface SidebarProps {
  onExpandChange?: (expanded: boolean) => void;
}

type MenuItem = {
  labelKey: string;
  href: string;
  icon: React.ElementType;
};

const menuItems: MenuItem[] = [
  {
    labelKey: 'SIDEBAR.HOME',
    href: '/company/dashboard',
    icon: Home,
  },
  {
    labelKey: 'SIDEBAR.PRODUCTS',
    href: '/company/products',
    icon: Boxes,
  },
  {
    labelKey: 'SIDEBAR.SEARCH_SUPPLY',
    href: '/company/sourcing',
    icon: Search,
  },
  {
    labelKey: 'SIDEBAR.PURCHASE_REQUESTS',
    href: '/company/sourcing/my-requests',
    icon: Package,
  },
  {
    labelKey: 'SIDEBAR.MESSAGES',
    href: '/company/messages',
    icon: MessageCircle,
  },
  {
    labelKey: 'SIDEBAR.CONTRACTS',
    href: '/company/contracts',
    icon: FileText,
  },
  {
    labelKey: 'SIDEBAR.PROFILE',
    href: '/company/profile',
    icon: User,
  },
];

function SidebarComponent({ onExpandChange }: SidebarProps) {
  const { t } = useTranslation();
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
            t('SIDEBAR.DEFAULT_COMPANY_NAME');

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
            name: savedName || t('SIDEBAR.DEFAULT_COMPANY_NAME'),
            email: savedEmail || '',
          });
        }
      }
    };

    getUserInfo();
  }, [t]);

  const toggleExpand = () => {
    const newState = !expanded;
    setExpanded(newState);
    onExpandChange?.(newState);

    window.dispatchEvent(
      new CustomEvent('sidebarChange', { detail: { expanded: newState } })
    );
  };

  // Prefetch toàn bộ page khi load
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
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        expanded ? 'w-64' : 'w-20'
      } h-screen flex flex-col fixed top-0 left-0 z-50`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
          {userInfo?.name?.charAt(0)?.toUpperCase() || 'AT'}
        </div>

        {expanded && (
          <div className="truncate">
            <span className="text-sm font-bold text-gray-900 block truncate">
              {userInfo?.name || 'AgriTrade'}
            </span>
            <span className="text-xs text-gray-400">
              {t('SIDEBAR.BUSINESS')}
            </span>
          </div>
        )}
      </div>

      {/* Menu */}
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
                  ? 'bg-green-100 text-green-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={!expanded ? t(item.labelKey) : ''}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {expanded && (
                <span className="text-sm truncate">{t(item.labelKey)}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={toggleExpand}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          title={!expanded ? t('SIDEBAR.COLLAPSE') : ''}
        >
          <ChevronDown
            className={`w-5 h-5 shrink-0 transition-transform ${
              expanded ? '' : 'rotate-180'
            }`}
          />
          {expanded && <span className="text-sm">{t('SIDEBAR.COLLAPSE')}</span>}
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          title={!expanded ? t('SIDEBAR.LOGOUT') : ''}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {expanded && <span className="text-sm">{t('SIDEBAR.LOGOUT')}</span>}
        </button>
      </div>
    </aside>
  );
}

export const Sidebar = memo(SidebarComponent);

export default Sidebar;
