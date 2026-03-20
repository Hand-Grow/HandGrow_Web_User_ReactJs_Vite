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
import { ViFlag, EngFlag } from '@/public/assets';

const languages = [
  { code: 'vi', name: 'Tiếng Việt', flag: ViFlag },
  { code: 'en', name: 'English', flag: EngFlag },
];

// 1. COMPONENT SKELETON ĐỂ CHỜ LOADING
function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:bg-gray-900/95 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-linear-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              HandGrow
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

// 2. LÕI LOGIC CỦA HEADER
function HeaderContent() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
      ) {
        setOpen(false);
      }
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
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
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  if (!mounted) {
    return <HeaderSkeleton />;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:bg-gray-900/95 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-linear-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              HandGrow
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-700 dark:text-gray-200"
                aria-label="Select language"
              >
                <div className="w-5 h-5 relative overflow-hidden rounded-sm">
                  <Image
                    src={currentLanguage.flag}
                    alt={currentLanguage.name}
                    width={20}
                    height={20}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium hidden lg:inline">
                  {currentLanguage.name}
                </span>
                <span className="text-sm font-medium lg:hidden">
                  {currentLanguage.code.toUpperCase()}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleChangeLang(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        lang.code === i18n.language
                          ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                          : 'text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <div className="w-5 h-5 relative overflow-hidden rounded-sm">
                        <Image
                          src={lang.flag}
                          alt={lang.name}
                          width={20}
                          height={20}
                          className="object-cover"
                        />
                      </div>
                      <span className="flex-1 text-left">{lang.name}</span>
                      {lang.code === i18n.language && (
                        <span className="text-green-600 dark:text-green-400">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full w-9 h-9 sm:w-10 sm:h-10 bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>

            {user && (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="User menu"
                  aria-expanded={open}
                >
                  <div className="relative">
                    <img
                      src="/avatar-default.png"
                      alt={user.fullName}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-green-500"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.fullName}
                  </span>
                  <ChevronDown
                    className={`hidden lg:block h-4 w-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden py-2">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                        {user.role === USER_ROLES.COOP
                          ? t('CONTRACT.COOPERATIVE')
                          : t('CONTRACT.ENTERPRISE')}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href={`${getProfilePath()}?lang=${i18n.language}`}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{t('profile')}</span>
                      </Link>

                      <Link
                        href={`/settings?lang=${i18n.language}`}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <Settings className="h-4 w-4 text-gray-500" />
                        <span>{t('settings')}</span>
                      </Link>

                      <div className="my-1 border-t border-gray-100 dark:border-gray-800"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden py-4 border-t dark:border-gray-800"
          >
            <div className="mt-4 pt-4 border-t dark:border-gray-800">
              <p className="px-2 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('language')}
              </p>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleChangeLang(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors ${
                      lang.code === i18n.language
                        ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="w-5 h-5 relative overflow-hidden rounded-sm">
                      <Image
                        src={lang.flag}
                        alt={lang.name}
                        width={20}
                        height={20}
                        className="object-cover"
                      />
                    </div>
                    <span className="flex-1 text-left text-sm font-medium">
                      {lang.name}
                    </span>
                    {lang.code === i18n.language && (
                      <span className="text-green-600 dark:text-green-400">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export const Header = () => {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderContent />
    </Suspense>
  );
};

export default Header;
