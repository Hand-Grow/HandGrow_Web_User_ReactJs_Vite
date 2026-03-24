'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTheme } from '@/src/context/theme/ThemeContext';
import { useAuth } from '@/src/context/auth/useAuth';
import { USER_ROLES } from '@/src/constants';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Moon,
  Sun,
  Settings,
} from 'lucide-react';
import { ViFlag, EngFlag, HandGrow } from '@/public/assets';

const languages = [
  { code: 'vi', name: 'Tiếng Việt', flag: ViFlag },
  { code: 'en', name: 'English', flag: EngFlag },
];

function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur shadow-sm">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </header>
  );
}

function HeaderContent() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, initializing } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    logout();
    router.push(`/login?lang=${i18n.language}`);
  };

  const getProfilePath = () => {
    if (!user) return `/login?lang=${i18n.language}`;
    if (user.role === USER_ROLES.COOP) return '/cooperative/profile';
    if (user.role === USER_ROLES.ENTERPRISE) return '/company/profile';
    return '/';
  };

  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', lang);
    router.push(`${pathname}?${params.toString()}`);
    setLangDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setOpen(false);
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      )
        setLangDropdownOpen(false);
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      )
        setMobileMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let lang = searchParams.get('lang');
    if (!lang) {
      lang = localStorage.getItem('lang') || 'vi';
      const params = new URLSearchParams(searchParams.toString());
      params.set('lang', lang);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [searchParams, pathname, i18n, router]);

  const currentLanguage =
    languages.find((l) => l.code === i18n.language) || languages[0];

  if (!mounted) return <HeaderSkeleton />;

  const hasToken =
    typeof window !== 'undefined' && !!localStorage.getItem('accessToken');
  const showPlaceholderUser = initializing && hasToken && !user;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur shadow-sm dark:bg-gray-900/80">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src={HandGrow}
                alt="HandGrow Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Image
                  src={currentLanguage.flag}
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="text-sm font-medium">
                  {currentLanguage.code.toUpperCase()}
                </span>
                <ChevronDown
                  className={`w-4 h-4 ${langDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-xl shadow-lg py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleChangeLang(lang.code)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Image src={lang.flag} alt="" width={18} height={18} />
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full w-9 h-9 bg-green-500 text-white"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </Button>

            {(user || showPlaceholderUser) && (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => user && setOpen(!open)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={user?.avatarUrl || '/avatar-default.png'}
                    className="w-9 h-9 rounded-full border-2 border-green-500"
                  />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-lg py-2">
                    <Link
                      href={getProfilePath()}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      <User size={16} /> {t('profile')}
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      <Settings size={16} /> {t('settings')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} /> {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export const Header = () => (
  <Suspense fallback={<HeaderSkeleton />}>
    <HeaderContent />
  </Suspense>
);

export default Header;
