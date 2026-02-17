import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('industries.title'),
    description: t('industries.description'),
    alternates: { canonical: `${SITE_URL}/${locale}/industries`, languages: { en: `${SITE_URL}/en/industries`, zh: `${SITE_URL}/zh/industries`, 'x-default': `${SITE_URL}/en/industries` } },
  };
}

export default function IndustriesPage() {
  const t = useTranslations('industries');
  const industries = ['steel', 'mining', 'energy', 'automotive', 'manufacturing', 'agriculture'] as const;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('title')}</h1>
      <p className="text-lg text-gray-600 mb-10 max-w-3xl">{t('subtitle')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {industries.map((ind) => (
          <div key={ind} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{t(`items.${ind}.name`)}</h2>
            <p className="text-gray-600 leading-relaxed">{t(`items.${ind}.description`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}