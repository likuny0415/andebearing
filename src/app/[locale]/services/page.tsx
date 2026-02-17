import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SITE_URL } from '@/lib/constants';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('services.title'),
    description: t('services.description'),
    alternates: { canonical: `${SITE_URL}/${locale}/services`, languages: { en: `${SITE_URL}/en/services`, zh: `${SITE_URL}/zh/services`, 'x-default': `${SITE_URL}/en/services` } },
  };
}

export default function ServicesPage() {
  const t = useTranslations('services');
  const tc = useTranslations('common');
  const serviceKeys = ['consultation', 'installation', 'failureAnalysis'] as const;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('title')}</h1>
        <p className="text-lg text-gray-600 mb-10">{t('subtitle')}</p>
        <div className="space-y-8">
          {serviceKeys.map((key) => (
            <div key={key} className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{t(`items.${key}.title`)}</h2>
              <p className="text-gray-600 mb-4">{t(`items.${key}.description`)}</p>
              <ul className="space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t(`items.${key}.points.${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/contact" className="bg-blue-800 text-white px-8 py-3 rounded font-semibold hover:bg-blue-900 transition-colors inline-block">
            {tc('requestQuote')}
          </Link>
        </div>
      </div>
    </div>
  );
}