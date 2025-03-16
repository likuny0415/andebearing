"use client";

import { useLanguage } from '../../context/LanguageContext';

export default function ProductsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('products.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Product cards */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('products.categories.ballBearings')}</h2>
            <p className="text-gray-600 mb-4">{t('products.items.deepGrooveBallBearing.description')}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('common.viewDetails')}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('products.categories.rollerBearings')}</h2>
            <p className="text-gray-600 mb-4">{t('products.items.deepGrooveBallBearing.description')}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('common.viewDetails')}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{t('products.categories.linearMotion')}</h2>
            <p className="text-gray-600 mb-4">{t('products.items.deepGrooveBallBearing.description')}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('common.viewDetails')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 