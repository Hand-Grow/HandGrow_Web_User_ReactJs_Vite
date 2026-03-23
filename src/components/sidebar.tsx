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
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  onExpandChange?: (expanded: boolean) => void;
}

const menuItems = [
  {
    label: 'SIDEBAR.HOME',
    href: '/cooperative/dashboard',
    icon: <Home className="w-5 h-5" />,
  },
  {
    label: 'SIDEBAR.POSTS',
    href: '/cooperative/feed',
    icon: <Newspaper className="w-5 h-5" />,
  },
  {
    label: 'SIDEBAR.PURCHASE_REQUESTS',
    href: '/cooperative/purchases',
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    label: 'SIDEBAR.MANAGE_MEMBER',
    href: '/cooperative/members',
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: 'SIDEBAR.MESSAGES',
    href: '/cooperative/messages',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    label: 'SIDEBAR.REPORTS',
    href: '/cooperative/reports',
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    label: 'SIDEBAR.CONTRACTS',
    href: '/cooperative/orders',
    icon: <FileText className="w-5 h-5" />,
  },
];

export function Sidebar({ onExpandChange }: SidebarProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleExpand = () => {
    const newState = !expanded;
    setExpanded(newState);
    onExpandChange?.(newState);

    window.dispatchEvent(
      new CustomEvent('sidebarChange', { detail: { expanded: newState } })
    );
  };

  const handleLogout = () => {
    document.cookie = 'accessToken=; path=/; max-age=0';
    router.push(`/login?lang=${i18next.language || 'vi'}`);
  };

  // Hàm kiểm tra active menu
  const isMenuItemActive = (itemHref: string) => {
    return pathname === itemHref || pathname.startsWith(itemHref + '/');
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        expanded ? 'w-64' : 'w-20'
      } h-[calc(100vh-4rem)] fixed left-0 top-16 flex flex-col z-40`}
      suppressHydrationWarning
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-center">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
          HTX
        </div>
        {expanded && (
          <span
            className="text-sm font-bold text-gray-900 truncate ml-3"
            suppressHydrationWarning
          >
            HTX nông nghiệp
          </span>
        )}
      </div>

      {/* Menu */}
      <nav
        className="flex-1 p-4 space-y-2 overflow-y-auto"
        suppressHydrationWarning
      >
        {menuItems.map((item) => {
          const isActive = isMenuItemActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center ${expanded ? 'gap-3' : 'justify-center'} px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-emerald-100 text-emerald-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={!expanded ? t(item.label) : ''}
              suppressHydrationWarning
            >
              <span className="shrink-0" suppressHydrationWarning>
                {item.icon}
              </span>
              {expanded && (
                <span className="text-sm truncate" suppressHydrationWarning>
                  {t(item.label)}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="p-4 border-t border-gray-200 space-y-2"
        suppressHydrationWarning
      >
        <button
          className={`w-full flex items-center ${expanded ? 'gap-3' : 'justify-center'} px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition`}
          onClick={toggleExpand}
          suppressHydrationWarning
          title={!expanded ? t('SIDEBAR.COLLAPSE') : ''}
        >
          {expanded ? (
            <>
              <ChevronLeft
                className="w-5 h-5 shrink-0"
                suppressHydrationWarning
              />
              <span className="text-sm" suppressHydrationWarning>
                {t('SIDEBAR.COLLAPSE')}
              </span>
            </>
          ) : (
            <ChevronRight
              className="w-5 h-5 shrink-0"
              suppressHydrationWarning
            />
          )}
        </button>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${expanded ? 'gap-3' : 'justify-center'} px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition`}
          title={!expanded ? t('SIDEBAR.LOGOUT') : ''}
          suppressHydrationWarning
        >
          <LogOut className="w-5 h-5 shrink-0" suppressHydrationWarning />
          {expanded && (
            <span className="text-sm" suppressHydrationWarning>
              {t('SIDEBAR.LOGOUT')}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
