"use client";

import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProductsPage() {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  
  // Product IDs for each category
  const productsByCategory = {
    ballBearings: 'deep-groove-ball-bearing',
    rollerBearings: 'tapered-roller-bearing',
    linearMotion: 'linear-guide'
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('products.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Ball Bearings Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('products.categories.ballBearings')}</h2>
            <p className="text-gray-600 mb-4">{t('products.items.deepGrooveBallBearing.description')}</p>
            <Link 
              href={`/${language}/products/${productsByCategory.ballBearings}`} 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {t('common.viewDetails')}
            </Link>
          </div>
        </div>
        
        {/* Roller Bearings Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('products.categories.rollerBearings')}</h2>
            <p className="text-gray-600 mb-4">{t('products.items.taperedRollerBearing.description')}</p>
            <Link 
              href={`/${language}/products/${productsByCategory.rollerBearings}`} 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {t('common.viewDetails')}
            </Link>
          </div>
        </div>
        
        {/* Linear Motion Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('products.categories.linearMotion')}</h2>
            <p className="text-gray-600 mb-4">{t('products.items.linearGuide.description')}</p>
            <Link 
              href={`/${language}/products/${productsByCategory.linearMotion}`} 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {t('common.viewDetails')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 