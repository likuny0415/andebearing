"use client";

import { useLanguage } from '../../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('about.title')}</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('about.story.title')}</h2>
        <p className="text-gray-700 mb-4">
          {t('about.story.paragraph1')}
        </p>
        <p className="text-gray-700 mb-4">
          {t('about.story.paragraph2')}
        </p>
        <p className="text-gray-700">
          {t('about.story.paragraph3')}
        </p>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('about.mission.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{t('about.mission.quality.title')}</h3>
            <p className="text-gray-700">
              {t('about.mission.quality.description')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{t('about.mission.innovation.title')}</h3>
            <p className="text-gray-700">
              {t('about.mission.innovation.description')}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{t('about.mission.service.title')}</h3>
            <p className="text-gray-700">
              {t('about.mission.service.description')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 