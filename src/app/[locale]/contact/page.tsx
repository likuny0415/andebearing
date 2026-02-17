import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import type { Metadata } from 'next';

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-6" />
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
      </div>
    </div>
  ),
});

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('contact.title'),
    description: t('contact.description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: { en: `${SITE_URL}/en/contact`, zh: `${SITE_URL}/zh/contact`, 'x-default': `${SITE_URL}/en/contact` },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('title')}</h1>
        <p className="text-lg text-gray-600 mb-10">{t('subtitle')}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-blue-900 text-white rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">{t('info.title')}</h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-blue-100">{t('info.address')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${t('info.email')}`} className="text-blue-100 hover:text-white">{t('info.email')}</a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${t('info.phone')}`} className="text-blue-100 hover:text-white">{t('info.phone')}</a>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-blue-100 whitespace-pre-line">{t('info.businessHours')}</span>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 font-medium">{t('info.responseNote')}</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}