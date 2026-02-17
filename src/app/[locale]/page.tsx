import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default function HomePage() {
  const t = useTranslations();

  const categories = ['ballBearings', 'rollerBearings', 'linearMotion', 'mountedUnits', 'accessories'] as const;
  const industries = ['steel', 'mining', 'energy', 'automotive', 'manufacturing', 'agriculture'] as const;
  const trustBlocks = ['factoryCapability', 'qualityControl', 'exportExperience', 'responseSLA'] as const;

  const trustIcons: Record<string, string> = {
    factoryCapability: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    qualityControl: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    exportExperience: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    responseSLA: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23fff\' fill-opacity=\'1\'%3E%3Cpath d=\'M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z\'/%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
              {(['badge1', 'badge2', 'badge3'] as const).map((badge) => (
                <span key={badge} className="bg-white/15 backdrop-blur-sm text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full border border-white/20">
                  {t(`hero.${badge}`)}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3.5 rounded font-semibold text-center transition-colors"
              >
                {t('hero.cta1')}
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-3.5 rounded font-semibold text-center transition-colors"
              >
                {t('hero.cta2')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Stats Bar */}
      <section className="bg-gray-900 text-white py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
            {(['stat1', 'stat2', 'stat3'] as const).map((stat) => (
              <div key={stat}>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">{t(`hero.${stat}Value`)}</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1">{t(`hero.${stat}Label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Blocks */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('trust.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBlocks.map((block) => (
              <div key={block} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={trustIcons[block]} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t(`trust.${block}.title`)}</h3>
                <p className="text-sm text-gray-600 mb-3">{t(`trust.${block}.description`)}</p>
                <ul className="space-y-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t(`trust.${block}.items.${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{t('featuredProducts.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">{t('featuredProducts.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products/${t(`products.categories.${cat}.slug`)}`}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg active:shadow-md transition-all"
              >
                <div className="h-32 sm:h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-800 transition-colors">
                    {t(`products.categories.${cat}.name`)}
                  </h3>
                  <p className="text-sm text-gray-600">{t(`products.categories.${cat}.description`)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{t('industries.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">{t('industries.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {industries.map((ind) => (
              <div key={ind} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t(`industries.items.${ind}.name`)}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(`industries.items.${ind}.description`)}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/industries" className="text-blue-800 font-medium hover:underline">
              {t('common.viewAll')} →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('products.detail.ctaTitle')}</h2>
          <p className="text-blue-100 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">{t('products.detail.ctaDescription')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-blue-900 px-6 sm:px-8 py-3 rounded font-semibold hover:bg-blue-50 active:bg-blue-100 transition-colors">
                {t('common.requestQuote')}
              </Link>
              <Link href="/products" className="border-2 border-white px-6 sm:px-8 py-3 rounded font-semibold hover:bg-white/10 active:bg-white/20 transition-colors">
                {t('common.viewProducts')}
              </Link>
          </div>
        </div>
      </section>
    </>
  );
}