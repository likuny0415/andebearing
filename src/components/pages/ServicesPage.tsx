"use client";

import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';

export default function ServicesPage() {
  const { t, language } = useLanguage();
  
  // Contact page URL with language prefix
  const contactUrl = `/${language}/contact`;
  
  // Helper function to safely render items
  const renderItems = (key: string) => {
    try {
      // Cast to unknown first, then to string[] to avoid TypeScript error
      const items = t(key) as unknown;
      if (Array.isArray(items)) {
        return items.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ));
      }
      return null;
    } catch (error) {
      return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('services.title')}</h1>
      <p className="text-xl text-gray-700 mb-12">
        {t('services.subtitle')}
      </p>
      
      <div className="space-y-16">
        {/* Technical Consultation */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-gray-200 h-64 rounded-lg"></div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">{t('services.technicalConsultation.title')}</h2>
            <p className="text-gray-700 mb-4">
              {t('services.technicalConsultation.description')}
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              {renderItems('services.technicalConsultation.items')}
            </ul>
            <Link href={contactUrl} className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
        
        {/* Installation and Maintenance */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 md:order-2">
            <div className="bg-gray-200 h-64 rounded-lg"></div>
          </div>
          <div className="md:w-2/3 md:order-1">
            <h2 className="text-2xl font-semibold mb-4">{t('services.installationMaintenance.title')}</h2>
            <p className="text-gray-700 mb-4">
              {t('services.installationMaintenance.description')}
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              {renderItems('services.installationMaintenance.items')}
            </ul>
            <Link href={contactUrl} className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
        
        {/* Failure Analysis and Troubleshooting */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-gray-200 h-64 rounded-lg"></div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">{t('services.failureAnalysis.title')}</h2>
            <p className="text-gray-700 mb-4">
              {t('services.failureAnalysis.description')}
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              {renderItems('services.failureAnalysis.items')}
            </ul>
            <Link href={contactUrl} className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 