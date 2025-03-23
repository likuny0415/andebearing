"use client";

import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function IndustriesPage() {
  const { t } = useLanguage();
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
    // During initial render, use the path directly to avoid hydration mismatch
    if (!currentPrefix) {
      return path;
    }
    return `${currentPrefix}${path}`;
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('home.industries.title')}</h1>
      <p className="text-xl text-gray-700 mb-12">
        {t('home.industries.subtitle')}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Automotive */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('home.industries.items.automotive.name')}</h2>
            <p className="text-gray-600 mb-4">
              {t('home.industries.items.automotive.description')}
            </p>
            <Link href={createLink('/industries/automotive')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
              {t('common.learnMore')}
            </Link>
          </div>
        </div>
        
        {/* Manufacturing */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('home.industries.items.manufacturing.name')}</h2>
            <p className="text-gray-600 mb-4">
              {t('home.industries.items.manufacturing.description')}
            </p>
            <Link href={createLink('/industries/manufacturing')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
              {t('common.learnMore')}
            </Link>
          </div>
        </div>
        
        {/* Energy */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('home.industries.items.energy.name')}</h2>
            <p className="text-gray-600 mb-4">
              {t('home.industries.items.energy.description')}
            </p>
            <Link href={createLink('/industries/energy')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
              {t('common.learnMore')}
            </Link>
          </div>
        </div>
        
        {/* Agriculture */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('home.industries.items.agriculture.name')}</h2>
            <p className="text-gray-600 mb-4">
              {t('home.industries.items.agriculture.description')}
            </p>
            <Link href={createLink('/industries/agriculture')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
              {t('common.learnMore')}
            </Link>
          </div>
        </div>
        
        {/* Mining */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('home.industries.items.mining.name')}</h2>
            <p className="text-gray-600 mb-4">
              {t('home.industries.items.mining.description')}
            </p>
            <Link href={createLink('/industries/mining')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
              {t('common.learnMore')}
            </Link>
          </div>
        </div>
        
        {/* Aerospace */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('home.industries.items.aerospace.name')}</h2>
            <p className="text-gray-600 mb-4">
              {t('home.industries.items.aerospace.description')}
            </p>
            <Link href={createLink('/industries/aerospace')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
              {t('common.learnMore')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 