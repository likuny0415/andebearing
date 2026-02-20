'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants';
import { MenuIcon } from '@/components/Icons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const isZh = locale === 'zh';

  const navItems = [
    { href: '/' as const, label: tc('home') },
    { href: '/products' as const, label: t('products') },
    { href: '/industries' as const, label: t('industries') },
    { href: '/about' as const, label: t('about') },
    { href: '/quality' as const, label: t('quality') },
    { href: '/contact' as const, label: t('contact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const switchLocale = useCallback((newLocale: 'en' | 'zh') => {
    router.replace(pathname, { locale: newLocale });
  }, [router, pathname]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 will-change-transform">
      {/* Top bar: contact info + language */}
      <div className="bg-gray-900 text-gray-300 text-sm hidden md:block">
        <div className="container mx-auto px-4 py-1.5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">
              {CONTACT_EMAIL}
            </a>
            <a href={`tel:${CONTACT_PHONE.replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">
              {CONTACT_PHONE}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-xs">
              {tc('responseTime')}
            </span>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => switchLocale('en')}
              className={`text-xs px-2 py-1 min-h-[32px] min-w-[32px] flex items-center justify-center ${locale === 'en' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              EN
            </button>
            <span className="text-gray-400">/</span>
            <button
              onClick={() => switchLocale('zh')}
              className={`text-xs px-2 py-1 min-h-[32px] min-w-[32px] flex items-center justify-center ${locale === 'zh' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              中文
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo + Company name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/company_log_${locale}.svg`}
              alt="ANDE Logo"
              width={40}
              height={40}
              className="object-contain"
              style={{ width: 40, height: 40 }}
              fetchPriority="high"
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-blue-900 leading-tight">
                {isZh ? '安德精工轴承' : 'ANDE Precision Bearing'}
              </span>
              <span className="text-[10px] text-gray-500 hidden sm:block leading-tight">
                {isZh ? 'ISO认证 · 精密轴承制造商' : 'ISO Certified · Precision Bearing Manufacturer'}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-blue-800 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-800 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-3 bg-blue-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-900 transition-colors"
            >
              {tc('requestQuote')}
            </Link>
          </nav>

          {/* Mobile: language + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => switchLocale(isZh ? 'en' : 'zh')}
              className="text-xs px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              {isZh ? 'EN' : '中文'}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-700 active:bg-gray-100 rounded transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <MenuIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav - animated slide */}
      <nav
        className={`lg:hidden border-t border-gray-200 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        <div className="container mx-auto px-4 py-2">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={`block px-3 py-3.5 rounded text-sm font-medium min-h-[44px] ${
                isActive(href)
                  ? 'text-blue-800 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="px-3 py-3">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block w-full text-center bg-blue-800 text-white px-4 py-3 min-h-[44px] rounded text-sm font-medium hover:bg-blue-900 active:bg-blue-950 transition-colors"
            >
              {tc('requestQuote')}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}