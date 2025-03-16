"use client";

import { useLanguage } from '../../context/LanguageContext';

export default function IndustriesPage() {
  const { t } = useLanguage();
  
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
            <h2 className="text-xl font-semibold mb-2">Automotive</h2>
            <p className="text-gray-600 mb-4">
              High-performance bearings for engines, transmissions, wheels, and other automotive applications.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('common.learnMore')}
            </button>
          </div>
        </div>
        
        {/* Manufacturing */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Manufacturing</h2>
            <p className="text-gray-600 mb-4">
              Reliable bearings for production equipment, conveyor systems, and industrial machinery.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('common.learnMore')}
            </button>
          </div>
        </div>
        
        {/* Energy */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Energy</h2>
            <p className="text-gray-600 mb-4">
              Specialized bearings for wind turbines, generators, and other energy production equipment.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('common.learnMore')}
            </button>
          </div>
        </div>
        
        {/* Agriculture */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Agriculture</h2>
            <p className="text-gray-600 mb-4">
              Durable bearings for tractors, harvesters, and other agricultural machinery.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('common.learnMore')}
            </button>
          </div>
        </div>
        
        {/* Construction */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Construction</h2>
            <p className="text-gray-600 mb-4">
              Heavy-duty bearings for excavators, cranes, and other construction equipment.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('common.learnMore')}
            </button>
          </div>
        </div>
        
        {/* Mining */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Mining</h2>
            <p className="text-gray-600 mb-4">
              Robust bearings designed to withstand the harsh conditions of mining operations.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('common.learnMore')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 