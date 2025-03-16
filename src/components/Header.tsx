"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const [currentPrefix, setCurrentPrefix] = useState('');

  useEffect(() => {
    // Determine language prefix from pathname
    if (pathname.startsWith('/zh')) {
      setCurrentPrefix('/zh');
    } else {
      setCurrentPrefix('/en');
    }
  }, [pathname]);

  // Function to create language-aware links
  const createLink = (path: string) => {
    // For server-side rendering, we need to derive the prefix directly from the pathname
    // This ensures consistent links between server and client
    if (typeof window === 'undefined') {
      if (pathname.startsWith('/zh')) {
        return `/zh${path}`;
      }
      return `/en${path}`;
    }
    
    // For client-side rendering, we use the state value which will be available after hydration
    if (!currentPrefix) {
      // Use pathname to determine prefix if currentPrefix is not set yet
      if (pathname.startsWith('/zh')) {
        return `/zh${path}`;
      }
      return `/en${path}`;
    }
    return `${currentPrefix}${path}`;
  };

  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === currentPrefix) {
      return true;
    }
    return pathname.endsWith(path);
  };

  // Function to get the appropriate class for a navigation link
  const getLinkClass = (path: string) => {
    const baseClass = "font-medium transition-colors duration-200";
    const inactiveClass = "text-gray-700 hover:text-blue-800";
    const activeClass = "text-blue-800 font-semibold";
    
    return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={createLink('/')} className="flex items-center">
          {/* Responsive company name - different sizes for different screens */}
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 max-w-[200px] sm:max-w-xs md:max-w-none truncate">
            {language === 'zh' ? '苏州北人轴承销售有限公司' : 'Suzhou Bei Ren Bearing'}
          </span>
        </Link>

        <div className="flex items-center">
          {/* Language Switcher */}
          <div className="mr-2 md:mr-6 z-50">
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 ml-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
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