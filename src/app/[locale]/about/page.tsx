import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { alternatesForPath } from '@/lib/url';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('about.title'),
    description: t('about.description'),
    alternates: alternatesForPath(locale, '/about'),
  };
}

export default function AboutPage() {
  const t = useTranslations('about');

  const values = ['quality', 'innovation', 'service'] as const;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('title')}</h1>
        <p className="text-lg text-gray-600 mb-12">{t('subtitle')}</p>

        {/* Story */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('story.title')}</h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-700 leading-relaxed">{t('story.p1')}</p>
            <p className="text-gray-700 leading-relaxed">{t('story.p2')}</p>
            <p className="text-gray-700 leading-relaxed">{t('story.p3')}</p>
          </div>
        </section>

        {/* Capabilities grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('capabilities.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">{t(`capabilities.items.${i}.value`)}</div>
                <div className="text-sm text-blue-700/70">{t(`capabilities.items.${i}.label`)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Values */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('mission.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t(`mission.${v}.title`)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(`mission.${v}.description`)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}