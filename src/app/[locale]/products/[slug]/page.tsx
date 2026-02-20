import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { alternatesForPath, localizedUrl } from '@/lib/url';
import {
  PRODUCT_SLUGS,
  CATEGORY_SLUGS,
  ALL_PRODUCT_PAGE_SLUGS,
  CATEGORY_SLUG_TO_KEY,
  CATEGORY_PRODUCTS,
  isCategorySlug,
  isProductSlug,
} from '@/lib/products';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const SPEC_KEYS = [
  'type', 'boreDiameter', 'outerDiameter', 'width', 'material', 'cageType',
  'precisionClass', 'speedRating', 'dynamicLoad', 'staticLoad', 'sealOptions', 'standards',
] as const;

type Props = { params: Promise<{ locale: string; slug: string }> };

// Generate static params for BOTH categories and products
export function generateStaticParams() {
  return ALL_PRODUCT_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (isCategorySlug(slug)) {
    const catKey = CATEGORY_SLUG_TO_KEY[slug];
    const t = await getTranslations({ locale, namespace: 'products' });
    return {
      title: t(`categories.${catKey}.name`),
      description: t(`categories.${catKey}.description`),
      alternates: alternatesForPath(locale, `/products/${slug}`),
    };
  }

  if (isProductSlug(slug)) {
    const t = await getTranslations({ locale, namespace: 'products' });
    return {
      title: t(`items.${slug}.name`),
      description: t(`items.${slug}.description`),
      alternates: alternatesForPath(locale, `/products/${slug}`),
    };
  }

  return {};
}

// ─── Category Page (SSR/SSG) ────────────────────────────────────────────
async function CategoryPage({ locale, slug }: { locale: string; slug: string }) {
  const catKey = CATEGORY_SLUG_TO_KEY[slug as keyof typeof CATEGORY_SLUG_TO_KEY];
  const productSlugs = CATEGORY_PRODUCTS[slug as keyof typeof CATEGORY_PRODUCTS];

  const t = await getTranslations({ locale, namespace: 'products' });
  const tc = await getTranslations({ locale, namespace: 'common' });

  const categoryName = t(`categories.${catKey}.name`);
  const categoryDescription = t(`categories.${catKey}.description`);

  // Breadcrumb JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: tc('home'), item: localizedUrl(locale) },
      { '@type': 'ListItem', position: 2, name: tc('products'), item: localizedUrl(locale, '/products') },
      { '@type': 'ListItem', position: 3, name: categoryName },
    ],
  };

  // ItemList JSON-LD for products in this category
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: categoryName,
    description: categoryDescription,
    numberOfItems: productSlugs.length,
    itemListElement: productSlugs.map((pSlug, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t(`items.${pSlug}.name`),
      url: localizedUrl(locale, `/products/${pSlug}`),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link href="/" className="hover:text-blue-800">{tc('home')}</Link></li>
            <li>/</li>
            <li><Link href="/products" className="hover:text-blue-800">{tc('products')}</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{categoryName}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{categoryName}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{categoryDescription}</p>
        </div>

        {/* Products in this category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {productSlugs.map((pSlug) => {
            const productName = t(`items.${pSlug}.name`);
            const productDesc = t(`items.${pSlug}.description`);

            return (
              <Link
                key={pSlug}
                href={`/products/${pSlug}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg active:shadow-md transition-all group"
              >
                <div className="h-32 sm:h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-800 transition-colors">
                    {productName}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{productDesc}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Other categories */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">{tc('otherCategories', { fallback: 'Other Categories' })}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORY_SLUGS.filter((s) => s !== slug).map((otherSlug) => {
              const otherKey = CATEGORY_SLUG_TO_KEY[otherSlug];
              return (
                <Link
                  key={otherSlug}
                  href={`/products/${otherSlug}`}
                  className="bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4 text-center hover:bg-blue-100 transition-colors"
                >
                  <span className="text-sm font-medium text-blue-900">{t(`categories.${otherKey}.name`)}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-blue-900 text-white rounded-lg p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">{t('detail.ctaTitle')}</h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto text-sm sm:text-base">{t('detail.ctaDescription')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="bg-white text-blue-900 px-6 py-2.5 rounded font-semibold hover:bg-blue-50 transition-colors">
              {tc('requestQuote')}
            </Link>
            <Link href="/products" className="border border-white/30 px-6 py-2.5 rounded font-medium text-sm hover:bg-white/10 transition-colors">
              {tc('viewProducts')}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

// ─── Product Detail Page (SSR/SSG) ──────────────────────────────────────
async function ProductDetailPage({ locale, slug }: { locale: string; slug: string }) {
  const t = await getTranslations({ locale, namespace: 'products' });
  const tc = await getTranslations({ locale, namespace: 'common' });

  const name = t(`items.${slug}.name`);
  const overview = t(`items.${slug}.overview`);

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

  const specs: { label: string; value: string }[] = [];
  for (const key of SPEC_KEYS) {
    try {
      const val = t(`items.${slug}.specifications.${key}`);
      if (val && val !== 'N/A' && !val.startsWith('products.items.')) {
        specs.push({ label: t(`specLabels.${key}`), value: val });
      }
    } catch { /* skip missing spec */ }
  }

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
    url: localizedUrl(locale, `/products/${slug}`),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: tc('home'), item: localizedUrl(locale) },
      { '@type': 'ListItem', position: 2, name: tc('products'), item: localizedUrl(locale, '/products') },
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
          <ol className="flex items-center gap-2 flex-wrap">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
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
                <div className="overflow-x-auto -mx-4 sm:mx-0 border border-gray-200 rounded-lg">
                  <table className="w-full text-sm min-w-[400px]">
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
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
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

// ─── Main Page Component ────────────────────────────────────────────────
export default async function ProductSlugPage({ params }: Props) {
  const { locale, slug } = await params;

  if (isCategorySlug(slug)) {
    return <CategoryPage locale={locale} slug={slug} />;
  }

  if (isProductSlug(slug)) {
    return <ProductDetailPage locale={locale} slug={slug} />;
  }

  notFound();
}