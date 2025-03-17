"use client";

import ContactSection from "./ContactSection";
import { useLanguage } from "../context/LanguageContext";
import GoogleMap from "./GoogleMap";

export default function FullContactPage() {
  const { t, language } = useLanguage();
  
  // Get the address based on the current language
  const factoryAddress = language === 'zh' 
    ? t('contact.locations.headquarters.address')
    : t('contact.locations.headquarters.address');
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>
      
      <ContactSection />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('contact.findUs')}</h2>
            <div className="rounded-lg overflow-hidden h-96">
              {/* Google Maps integration */}
              <GoogleMap address={factoryAddress} height="100%" />
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.locations.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('contact.locations.headquarters.title')}</h4>
                  <address className="not-italic text-gray-600">
                    {t('contact.locations.headquarters.address').split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                    <p className="mt-3">{t('contact.info.email')}: {t('contact.locations.headquarters.email')}</p>
                    <p>{t('contact.info.phone')}: <a href={`tel:${t('contact.locations.headquarters.phone')}`} className="text-blue-600 hover:text-blue-800">{t('contact.locations.headquarters.phone')}</a></p>
                  </address>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('contact.locations.manufacturing.title')}</h4>
                  <address className="not-italic text-gray-600">
                    {t('contact.locations.manufacturing.address').split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                    <p className="mt-3">{t('contact.info.email')}: {t('contact.locations.manufacturing.email')}</p>
                    <p>{t('contact.info.phone')}: <a href={`tel:${t('contact.locations.manufacturing.phone')}`} className="text-blue-600 hover:text-blue-800">{t('contact.locations.manufacturing.phone')}</a></p>
                  </address>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('contact.locations.distribution.title')}</h4>
                  <address className="not-italic text-gray-600">
                    {t('contact.locations.distribution.address').split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                    <p className="mt-3">{t('contact.info.email')}: {t('contact.locations.distribution.email')}</p>
                    <p>{t('contact.info.phone')}: <a href={`tel:${t('contact.locations.distribution.phone')}`} className="text-blue-600 hover:text-blue-800">{t('contact.locations.distribution.phone')}</a></p>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 