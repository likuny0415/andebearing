import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SITE_URL } from '@/lib/constants';
import { PRODUCT_SLUGS } from '@/lib/products';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const SPEC_KEYS = [
  'type', 'boreDiameter', 'outerDiameter', 'width', 'material', 'cageType',
  'precisionClass', 'speedRating', 'dynamicLoad', 'staticLoad', 'sealOptions', 'standards',
] as const;

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!PRODUCT_SLUGS.includes(slug as any)) return {};
  const t = await getTranslations({ locale, namespace: 'products' });
  return {
    title: t(`items.${slug}.name`),
    description: t(`items.${slug}.description`),
    alternates: {
      canonical: `${SITE_URL}/${locale}/products/${slug}`,
      languages: { en: `${SITE_URL}/en/products/${slug}`, zh: `${SITE_URL}/zh/products/${slug}` },
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!PRODUCT_SLUGS.includes(slug as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'products' });
  const tc = await getTranslations({ locale, namespace: 'common' });

  const name = t(`items.${slug}.name`);
  const overview = t(`items.${slug}.overview`);

  // Use t.raw() to get arrays directly instead of iterating with index
  let features: string[] = [];
  let applications: string[] = [];
  try {
    const rawFeatures = t.raw(`items.${slug}.features`);
    if (Array.isArray(rawFeatures)) features = rawFeatures;
  } catch { /* no features */ }
  try {
    const rawApps = t.raw(`items.${slug}.applications`);
    if (Array.isArray(rawApps)) applications = rawApps;
  } catch { /* no applications */ }

  // Build specs
  const specs: { label: string; value: string }[] = [];
  for (const key of SPEC_KEYS) {
    try {
      const val = t(`items.${slug}.specifications.${key}`);
      if (val && val !== 'N/A' && !val.startsWith('products.items.')) {
        specs.push({ label: t(`specLabels.${key}`), value: val });
      }
    } catch { /* skip missing spec */ }
  }

  // Product JSON-LD
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: overview,
    brand: { '@type': 'Brand', name: 'ANDE' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Jiangsu ANDE Precision Bearing Technology Co., Ltd.',
    },
    category: 'Industrial Bearings',
    url: `${SITE_URL}/${locale}/products/${slug}`,
  };

  // Breadcrumb JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: tc('home'), item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: tc('products'), item: `${SITE_URL}/${locale}/products` },
      { '@type': 'ListItem', position: 3, name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-blue-800">{tc('home')}</Link></li>
            <li>/</li>
            <li><Link href="/products" className="hover:text-blue-800">{tc('products')}</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{name}</li>
          </ol>
        </nav>

        {/* Product Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{name}</h1>
          <p className="text-gray-600 text-lg max-w-3xl">{t(`items.${slug}.description`)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('detail.overview')}</h2>
              <p className="text-gray-700 leading-relaxed">{overview}</p>
            </section>

            {/* Key Features */}
            {features.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('detail.features')}</h2>
                <ul className="space-y-2">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Technical Specifications */}
            {specs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('detail.specifications')}</h2>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left px-4 py-3 font-semibold text-gray-900 w-1/3">{t('detail.property')}</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-900">{t('detail.value')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specs.map(({ label, value }, i) => (
                        <tr key={label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 font-medium text-gray-700">{label}</td>
                          <td className="px-4 py-3 text-gray-600">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Applications */}
            {applications.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('detail.applications')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {applications.map((app, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">{app}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA Card */}
            <div className="bg-blue-900 text-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">{t('detail.ctaTitle')}</h3>
              <p className="text-blue-100 text-sm mb-4">{t('detail.ctaDescription')}</p>
              <Link
                href="/contact"
                className="block w-full text-center bg-white text-blue-900 px-4 py-2.5 rounded font-semibold hover:bg-blue-50 transition-colors mb-3"
              >
                {tc('requestQuote')}
              </Link>
              <Link
                href="/contact"
                className="block w-full text-center border border-white/30 px-4 py-2.5 rounded text-sm hover:bg-white/10 transition-colors"
              >
                {tc('talkToEngineering')}
              </Link>
            </div>

            {/* Quality note */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-sm text-green-800">{t('detail.qualityNote')}</p>
              </div>
            </div>

            {/* Back link */}
            <Link href="/products" className="flex items-center gap-2 text-blue-800 font-medium hover:underline text-sm">
              ← {tc('backToProducts')}
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}