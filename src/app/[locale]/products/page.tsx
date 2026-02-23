import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { alternatesForPath } from '@/lib/url';
import { PRODUCT_SLUGS, PRODUCT_CATEGORIES, PRODUCT_IMAGES } from '@/lib/products';
import type { ProductSlug } from '@/lib/products';
import type { Metadata } from 'next';

const CATEGORY_IMAGES: Record<string, string> = {
  ballBearings: '/home/ball_bearing.png',
  rollerBearings: '/home/roller_bearings.png',
  rollingMillBearings: '/home/four_row_tapered_roller_bearing.png',
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('products.title'),
    description: t('products.description'),
    alternates: alternatesForPath(locale, '/products'),
  };
}

export default function ProductsPage() {
  const t = useTranslations();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('products.title')}</h1>
        <p className="text-gray-600 text-lg">{t('products.subtitle')}</p>
      </div>

      {/* Categories with images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {PRODUCT_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/products/${t(`products.categories.${cat}.slug`)}`}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all group"
          >
            <div className="h-44 sm:h-52 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center overflow-hidden">
              <Image
                src={CATEGORY_IMAGES[cat]}
                alt={t(`products.categories.${cat}.name`)}
                width={400}
                height={300}
                className="object-contain max-h-[200px] w-auto group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold text-blue-900 mb-1 group-hover:text-blue-800">
                {t(`products.categories.${cat}.name`)}
              </h2>
              <p className="text-sm text-gray-600">{t(`products.categories.${cat}.description`)}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* All products with images */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('common.viewAll')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCT_SLUGS.map((slug) => (
          <Link
            key={slug}
            href={`/products/${slug}`}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all group"
          >
            <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
              {PRODUCT_IMAGES[slug as ProductSlug] ? (
                <Image
                  src={PRODUCT_IMAGES[slug as ProductSlug]}
                  alt={t(`products.items.${slug}.name`)}
                  width={300}
                  height={200}
                  className="object-contain max-h-[150px] w-auto group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-800">
                {t(`products.items.${slug}.name`)}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">{t(`products.items.${slug}.description`)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}