'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const isZh = locale === 'zh';

  const productLinks = [
    { href: '/products/ball-bearings' as const, label: isZh ? '球轴承' : 'Ball Bearings' },
    { href: '/products/roller-bearings' as const, label: isZh ? '滚子轴承' : 'Roller Bearings' },
    { href: '/products/linear-motion' as const, label: isZh ? '直线运动系统' : 'Linear Motion' },
    { href: '/products/mounted-units' as const, label: isZh ? '带座轴承' : 'Mounted Units' },
    { href: '/products/accessories' as const, label: isZh ? '轴承配件' : 'Accessories' },
  ];

  const companyLinks = [
    { href: '/about' as const, label: t('nav.about') },
    { href: '/quality' as const, label: t('nav.quality') },
    { href: '/industries' as const, label: t('nav.industries') },
    { href: '/services' as const, label: t('nav.services') },
    { href: '/faq' as const, label: t('nav.faq') },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-3">
              {t('footer.companyName')}
            </h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/andeprecisionbearing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              {t('common.products')}
            </h3>
            <ul className="space-y-2">
              {productLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              {t('footer.contactInfo')}
            </h3>
            <address className="not-italic text-sm text-gray-400 space-y-3">
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{t('contact.info.address')}</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:andeprecisionbearing@gmail.com" className="hover:text-white transition-colors">
                  {t('contact.info.email')}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+8613906240166" className="hover:text-white transition-colors">
                  {t('contact.info.phone')}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/privacy-policy" className="hover:text-gray-300">{t('footer.privacy')}</Link>
            <Link href="/terms-of-service" className="hover:text-gray-300">{t('footer.terms')}</Link>
            <Link href="/sitemap" className="hover:text-gray-300">{t('footer.sitemap')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}