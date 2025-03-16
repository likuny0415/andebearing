"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import translations, { Language } from '../translations';

type LanguageContextType = {
  language: Language;
  t: (key: string) => string;
  isZh: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>('en');
  
  useEffect(() => {
    // Detect language from URL
    if (pathname.startsWith('/zh')) {
      setLanguage('zh');
    } else {
      setLanguage('en');
    }
  }, [pathname]);

  // Function to get a translation by key (dot notation)
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        // Fallback to English if key not found in current language
        let fallback: any = translations.en;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk as keyof typeof fallback];
          } else {
            return key; // Return the key if not found in any language
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, isZh: language === 'zh' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 