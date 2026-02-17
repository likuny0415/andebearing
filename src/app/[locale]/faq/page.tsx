import { getTranslations } from 'next-intl/server';
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

  // Use t.raw() to get the FAQ items array directly
  let faqItems: { question: string; answer: string }[] = [];
  try {
    const rawItems = t.raw('items');
    if (Array.isArray(rawItems)) {
      faqItems = rawItems;
    }
  } catch { /* no items */ }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
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
            {faqItems.map(({ question, answer }, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                <h2 className="text-base font-semibold text-gray-900 p-5 bg-gray-50">{question}</h2>
                <p className="text-sm text-gray-600 p-5 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}