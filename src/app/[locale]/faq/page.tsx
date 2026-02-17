import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { SITE_URL } from '@/lib/constants';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('faq.title'),
    description: t('faq.description'),
    alternates: { canonical: `${SITE_URL}/${locale}/faq`, languages: { en: `${SITE_URL}/en/faq`, zh: `${SITE_URL}/zh/faq` } },
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  const faqItems: { q: string; a: string }[] = [];
  for (let i = 0; i < 20; i++) {
    try {
      const q = t(`items.${i}.question`);
      const a = t(`items.${i}.answer`);
      if (q && !q.includes(`items.${i}.question`)) faqItems.push({ q, a });
    } catch { break; }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('title')}</h1>
          <p className="text-lg text-gray-600 mb-10">{t('subtitle')}</p>
          <div className="space-y-6">
            {faqItems.map(({ q, a }, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                <h2 className="text-base font-semibold text-gray-900 p-5 bg-gray-50">{q}</h2>
                <p className="text-sm text-gray-600 p-5 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}