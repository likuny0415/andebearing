'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LocationIcon, EmailIcon, PhoneIcon, LinkedInIcon, WhatsAppIcon, WeChatIcon } from '@/components/Icons';
import { WHATSAPP_URL } from '@/lib/constants';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const isZh = locale === 'zh';

  const productLinks = [
    { href: '/products/ball-bearings' as const, key: 'ballBearings' },
    { href: '/products/roller-bearings' as const, key: 'rollerBearings' },
    { href: '/products/rolling-mill-bearings' as const, key: 'rollingMillBearings' },
  ];

  const companyLinks = [
    { href: '/about' as const, label: t('nav.about') },
    { href: '/industries' as const, label: t('nav.industries') },
    { href: '/services' as const, label: t('nav.services') },
    { href: '/blog' as const, label: t('nav.blog') },
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
                <LinkedInIcon />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              {t('common.products')}
            </h3>
            <ul className="space-y-2">
              {productLinks.map(({ href, key }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {t(`products.categories.${key}.name`)}
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
                <LocationIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{t('contact.info.address')}</span>
              </p>
              <p className="flex items-center gap-2">
                <EmailIcon className="w-4 h-4 flex-shrink-0" />
                <a href={`mailto:${t('contact.info.email')}`} className="hover:text-white transition-colors">
                  {t('contact.info.email')}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {t('contact.info.whatsappLabel')}: {t('contact.info.whatsapp')}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}