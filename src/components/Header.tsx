"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  // Function to create language-aware links
  const createLink = (path: string) => {
    // Handle language prefix correctly
    const langPrefix = pathname.startsWith('/zh') ? '/zh' : '/en';
    
    // Handle paths properly (avoid double slashes)
    if (path === '/') {
      return langPrefix;
    }
    
    // Remove leading slash from path to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${langPrefix}/${cleanPath}`;
  };

  // Function to check if a link is active
  const isActive = (path: string) => {
    // Check if this is the homepage
    if (path === '/') {
      return pathname === '/en' || pathname === '/zh' || pathname === '/';
    }
    
    // Check if path matches the end of pathname
    return pathname.endsWith(path) || pathname.endsWith(`${path}/`);
  };

  // Function to get the appropriate class for a navigation link
  const getLinkClass = (path: string) => {
    const baseClass = "font-medium transition-colors duration-200";
    const inactiveClass = "text-gray-700 hover:text-blue-800";
    const activeClass = "text-blue-800 font-semibold";
    
    return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
  };

  // Function to switch language
  const switchLanguage = (lang: string) => {
    if (lang === language) return;
    
    let newPath = pathname;
    
    // Remove language prefix if it exists
    if (pathname.startsWith('/zh')) {
      newPath = pathname.replace(/^\/zh/, '');
    } else if (pathname.startsWith('/en')) {
      newPath = pathname.replace(/^\/en/, '');
    }
    
    // Add new language prefix
    newPath = `/${lang}${newPath === '/' ? '' : newPath}`;
    
    // Use startTransition to indicate loading state
    startTransition(() => {
      // Ensure we have a valid path
      if (newPath === `/${lang}`) {
        router.push(`/${lang}`);
      } else {
        router.push(newPath);
      }
    });
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Two-column layout */}
        <div className="flex justify-between items-center">
          {/* Column 1: Language options */}
          <div className="flex items-center space-x-4 relative">
            <button 
              onClick={() => switchLanguage('zh')}
              disabled={isPending}
              className={`text-sm ${language === 'zh' ? 'font-semibold text-blue-800' : 'text-gray-700 hover:text-blue-800'} ${isPending ? 'opacity-70' : ''}`}
            >
              中文
            </button>
            <button 
              onClick={() => switchLanguage('en')}
              disabled={isPending}
              className={`text-sm ${language === 'en' ? 'font-semibold text-blue-800' : 'text-gray-700 hover:text-blue-800'} ${isPending ? 'opacity-70' : ''}`}
            >
              English
            </button>
            {isPending && (
              <div className="absolute -right-5 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 rounded-full border-2 border-blue-800 border-t-transparent animate-spin"></div>
              </div>
            )}
          </div>

          {/* Column 2: Company name and logo */}
          <Link href={createLink('/')} className="flex items-center">
            {/* Company Logo/Icon - always visible */}
            <div className="flex-shrink-0 mr-2">
              <Image 
                src="/images/company_log.svg" 
                alt="Ande Logo" 
                width={36} 
                height={36} 
                priority
                className="object-contain"
              />
            </div>
            {/* Responsive company name - different sizes for different screens */}
            <div className="max-w-[180px] md:max-w-[220px] lg:max-w-none overflow-hidden">
              <span className="hidden lg:inline text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-blue-800 truncate">
                {language === 'zh' ? '江苏安德精工轴承科技有限公司' : 'Ande Precision Bearing Technology Co., Ltd.'}
              </span>
              <span className="hidden sm:inline lg:hidden text-lg sm:text-xl md:text-lg font-bold text-blue-800 truncate">
                {language === 'zh' ? '安德精工轴承' : 'Ande Precision Bearing'}
              </span>
              <span className="sm:hidden text-lg font-bold text-blue-800">
                {language === 'zh' ? '安德轴承' : 'Ande Bearing'}
              </span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Navigation - below the two columns */}
        <nav className="hidden md:flex justify-center space-x-4 lg:space-x-8 mt-3">
          <Link href={createLink('/')} className={getLinkClass('/')}>
            {t('common.homepage')}
          </Link>
          <Link href={createLink('/products')} className={getLinkClass('/products')}>
            {t('common.products')}
          </Link>
          <Link href={createLink('/industries')} className={getLinkClass('/industries')}>
            {t('common.industries')}
          </Link>
          <Link href={createLink('/services')} className={getLinkClass('/services')}>
            {t('common.services')}
          </Link>
          <Link href={createLink('/about')} className={getLinkClass('/about')}>
            {t('common.aboutUs')}
          </Link>
          <Link href={createLink('/contact')} className={getLinkClass('/contact')}>
            {t('common.contact')}
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 pb-3">
              <Link 
                href={createLink('/')} 
                className={`${getLinkClass('/')} py-2 px-3 rounded-md ${isActive('/') ? 'bg-blue-50' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.homepage')}
              </Link>
              <Link 
                href={createLink('/products')} 
                className={`${getLinkClass('/products')} py-2 px-3 rounded-md ${isActive('/products') ? 'bg-blue-50' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.products')}
              </Link>
              <Link 
                href={createLink('/industries')} 
                className={`${getLinkClass('/industries')} py-2 px-3 rounded-md ${isActive('/industries') ? 'bg-blue-50' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.industries')}
              </Link>
              <Link 
                href={createLink('/services')} 
                className={`${getLinkClass('/services')} py-2 px-3 rounded-md ${isActive('/services') ? 'bg-blue-50' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.services')}
              </Link>
              <Link 
                href={createLink('/about')} 
                className={`${getLinkClass('/about')} py-2 px-3 rounded-md ${isActive('/about') ? 'bg-blue-50' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.aboutUs')}
              </Link>
              <Link 
                href={createLink('/contact')} 
                className={`${getLinkClass('/contact')} py-2 px-3 rounded-md ${isActive('/contact') ? 'bg-blue-50' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.contact')}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}