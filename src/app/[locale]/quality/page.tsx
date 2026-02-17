import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('quality.title'),
    description: t('quality.description'),
    alternates: { canonical: `${SITE_URL}/${locale}/quality`, languages: { en: `${SITE_URL}/en/quality`, zh: `${SITE_URL}/zh/quality`, 'x-default': `${SITE_URL}/en/quality` } },
  };
}

export default function QualityPage() {
  const t = useTranslations('quality');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('title')}</h1>
        <p className="text-lg text-gray-600 mb-12">{t('subtitle')}</p>

        {/* Certifications */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('certifications.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-lg p-4">
                <svg className="w-5 h-5 text-blue-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm text-blue-900">{t(`certifications.items.${i}`)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* QC Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('process.title')}</h2>
          <div className="space-y-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 bg-white border border-gray-200 rounded-lg p-5">
                <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t(`process.steps.${i}.title`)}</h3>
                  <p className="text-sm text-gray-600">{t(`process.steps.${i}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inspection Equipment */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('equipment.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t(`equipment.items.${i}`)}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}