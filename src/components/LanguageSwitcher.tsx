"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Language options with flags
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Detect current language from URL
    if (pathname.startsWith('/zh')) {
      setCurrentLang('zh');
    } else if (pathname.startsWith('/en')) {
      setCurrentLang('en');
    }
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const switchLanguage = (lang: string) => {
    if (lang === currentLang) {
      setIsOpen(false);
      return;
    }
    
    let newPath = pathname;
    
    // Remove language prefix if it exists
    if (pathname.startsWith('/zh')) {
      newPath = pathname.replace(/^\/zh/, '');
    } else if (pathname.startsWith('/en')) {
      newPath = pathname.replace(/^\/en/, '');
    }
    
    // Add new language prefix
    newPath = `/${lang}${newPath === '/' ? '' : newPath}`;
    
    // Ensure we have a valid path
    if (newPath === `/${lang}`) {
      router.push(`/${lang}`);
    } else {
      router.push(newPath);
    }
    
    setIsOpen(false);
  };

  // Find current language details
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between bg-gray-200 hover:bg-gray-300 active:bg-gray-300 px-3 py-2.5 sm:py-2 rounded-md text-base sm:text-sm w-36 sm:w-32 touch-manipulation"
        aria-label="Select language"
      >
        <div className="flex items-center">
          <span className="mr-2 text-lg sm:text-base">{currentLanguage.flag}</span>
          <span>{currentLanguage.name}</span>
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 sm:h-3 sm:w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 sm:w-32 bg-white rounded-md shadow-lg z-50 overflow-hidden">
          <div>
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`w-full text-left px-4 py-3 sm:px-3 sm:py-2 flex items-center text-base sm:text-sm touch-manipulation ${
                  currentLang === language.code ? 'bg-blue-50' : 'hover:bg-gray-100 active:bg-gray-100'
                }`}
              >
                <span className="mr-2 text-lg sm:text-base">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 