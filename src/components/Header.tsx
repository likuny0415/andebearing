'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const isZh = locale === 'zh';

  const navItems = [
    { href: '/' as const, label: isZh ? '首页' : 'Home' },
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

  const switchLocale = (newLocale: 'en' | 'zh') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar: contact info + language */}
      <div className="bg-gray-900 text-gray-300 text-sm hidden md:block">
        <div className="container mx-auto px-4 py-1.5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="mailto:andeprecisionbearing@gmail.com" className="hover:text-white transition-colors">
              andeprecisionbearing@gmail.com
            </a>
            <a href="tel:+8613906240166" className="hover:text-white transition-colors">
              (+86) 139-0624-0166
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-xs">
              {isZh ? '24小时内回复' : 'Response within 24h'}
            </span>
            <span className="text-gray-600">|</span>
            <button
              onClick={() => switchLocale('en')}
              className={`text-xs px-1 ${locale === 'en' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              EN
            </button>
            <span className="text-gray-600">/</span>
            <button
              onClick={() => switchLocale('zh')}
              className={`text-xs px-1 ${locale === 'zh' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
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
            <Image
              src="/images/company_log.svg"
              alt="ANDE Logo"
              width={40}
              height={40}
              priority
              className="object-contain"
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
              {isZh ? '获取报价' : 'Get a Quote'}
            </Link>
          </nav>

          {/* Mobile: language + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => switchLocale(isZh ? 'en' : 'zh')}
              className="text-xs px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
            >
              {isZh ? 'EN' : '中文'}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-gray-200 bg-white" role="navigation" aria-label="Mobile navigation">
          <div className="container mx-auto px-4 py-2">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-3 rounded text-sm font-medium ${
                  isActive(href)
                    ? 'text-blue-800 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="px-3 py-3">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-blue-800 text-white px-4 py-2.5 rounded text-sm font-medium hover:bg-blue-900"
              >
                {isZh ? '获取报价' : 'Get a Quote'}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}