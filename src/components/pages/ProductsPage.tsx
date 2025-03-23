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
    linearMotion: 'linear-guide',
    accessories: 'bearing-lubricant',
    mountedUnits: 'mounted-bearing-unit'
  };
  
  // Category URLs
  const categoryUrls = {
    ballBearings: 'ball-bearings',
    rollerBearings: 'roller-bearings',
    linearMotion: 'linear-motion',
    accessories: 'accessories',
    mountedUnits: 'mounted-units'
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
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Link 
                href={`/${language}/products/${categoryUrls.ballBearings}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {t('common.viewCategory')}
              </Link>
              <Link 
                href={`/${language}/products/${productsByCategory.ballBearings}`} 
                className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                {t('common.viewDetails')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Roller Bearings Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('products.categories.rollerBearings')}</h2>
            <p className="text-gray-600 mb-4">{t('products.items.taperedRollerBearing.description')}</p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Link 
                href={`/${language}/products/${categoryUrls.rollerBearings}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {t('common.viewCategory')}
              </Link>
              <Link 
                href={`/${language}/products/${productsByCategory.rollerBearings}`} 
                className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                {t('common.viewDetails')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Linear Motion Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('products.categories.linearMotion')}</h2>
            <p className="text-gray-600 mb-4">{t('products.items.linearGuide.description')}</p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Link 
                href={`/${language}/products/${categoryUrls.linearMotion}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {t('common.viewCategory')}
              </Link>
              <Link 
                href={`/${language}/products/${productsByCategory.linearMotion}`} 
                className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                {t('common.viewDetails')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Accessories Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('products.categories.accessories')}</h2>
            <p className="text-gray-600 mb-4">{t('products.items.bearingLubricant.description')}</p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Link 
                href={`/${language}/products/${categoryUrls.accessories}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {t('common.viewCategory')}
              </Link>
              <Link 
                href={`/${language}/products/${productsByCategory.accessories}`} 
                className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                {t('common.viewDetails')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mounted Units Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('products.categories.mountedUnits')}</h2>
            <p className="text-gray-600 mb-4">{t('products.items.mountedBearingUnit.description')}</p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Link 
                href={`/${language}/products/${categoryUrls.mountedUnits}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {t('common.viewCategory')}
              </Link>
              <Link 
                href={`/${language}/products/${productsByCategory.mountedUnits}`} 
                className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                {t('common.viewDetails')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 