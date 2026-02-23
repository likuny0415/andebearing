import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Geist } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import { SITE_URL, COMPANY_NAME_EN, COMPANY_NAME_ZH, CONTACT_EMAIL, CONTACT_PHONE, COMPANY_ADDRESS_EN } from '@/lib/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e3a8a',
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const isZh = locale === 'zh';

  return {
    title: {
      default: t('home.title'),
      template: `%s | ${isZh ? '安德精工轴承' : 'ANDE Bearing'}`,
    },
    description: t('home.description'),
    keywords: isZh
      ? ['安德轴承', '安德精工轴承', 'ANDE轴承', '安德bearing', '精密轴承', '工业轴承', '深沟球轴承', '滚子轴承', '调心滚子轴承', '圆锥滚子轴承', '直线导轨', '轴承制造商', '轴承出口', '江阴轴承', '江苏轴承厂', '中国轴承出口']
      : ['Ande Bearing', 'ANDE bearing', 'Ande Precision Bearing', 'andebearing', 'precision bearings', 'industrial bearings', 'ball bearings', 'roller bearings', 'spherical roller bearing', 'tapered roller bearing', 'bearing manufacturer', 'China bearing exporter', 'China bearing factory', 'bearing supplier'],
    authors: [{ name: isZh ? COMPANY_NAME_ZH : COMPANY_NAME_EN }],
    creator: isZh ? COMPANY_NAME_ZH : COMPANY_NAME_EN,
    publisher: isZh ? COMPANY_NAME_ZH : COMPANY_NAME_EN,
    icons: {
      icon: [
        { url: `/images/company_log_${locale}.svg`, type: 'image/svg+xml' },
        { url: `/images/company_log_${locale}.png`, type: 'image/png' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    openGraph: {
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
      alternateLocale: isZh ? 'en_US' : 'zh_CN',
      title: t('home.title'),
      description: t('home.description'),
      siteName: isZh ? '安德精工轴承' : 'ANDE Precision Bearing',
      url: isZh ? `${SITE_URL}/zh` : SITE_URL,
      images: [
        {
          url: `${SITE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: isZh ? '安德精工轴承科技有限公司' : 'ANDE Precision Bearing Technology Co., Ltd.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.title'),
      description: t('home.description'),
      images: [`${SITE_URL}/images/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: isZh ? `${SITE_URL}/zh` : SITE_URL,
      languages: {
        en: SITE_URL,
        zh: `${SITE_URL}/zh`,
        'x-default': SITE_URL,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || '',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Organization + WebSite JSON-LD structured data
function StructuredData({ locale }: { locale: string }) {
  const isZh = locale === 'zh';
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: isZh ? COMPANY_NAME_ZH : COMPANY_NAME_EN,
    alternateName: [
      'Ande Bearing',
      '安德轴承',
      '安德精工轴承',
      'ANDE Bearing',
      'ANDE Precision Bearing',
      isZh ? COMPANY_NAME_EN : COMPANY_NAME_ZH,
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/images/company_log_${isZh ? 'zh' : 'en'}.png`,
    image: `${SITE_URL}/images/og-image.jpg`,
    description: isZh
      ? '安德轴承（江苏安德精工轴承科技有限公司）— ISO认证精密轴承制造商，产品涵盖球轴承、滚子轴承、直线导轨，服务全球50+国家。'
      : 'Ande Bearing (ANDE Precision Bearing Technology Co., Ltd.) — ISO-certified precision bearing manufacturer. Ball bearings, roller bearings, linear motion systems for 50+ countries.',
    foundingDate: '2019',
    brand: {
      '@type': 'Brand',
      name: 'ANDE',
      alternateName: ['Ande Bearing', '安德轴承', '安德精工轴承'],
      url: SITE_URL,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 23 Lianxin Road, Huashi Industrial Park',
      addressLocality: 'Jiangyin',
      addressRegion: 'Jiangsu',
      postalCode: '214421',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      contactType: 'sales',
      availableLanguage: ['English', 'Chinese'],
    },
    sameAs: ['https://www.linkedin.com/company/andeprecisionbearing'],
    knowsAbout: ['bearings', 'ball bearings', 'roller bearings', 'precision bearings', 'linear motion', 'bearing manufacturing'],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 200,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: isZh ? '安德轴承 | 安德精工轴承' : 'Ande Bearing | ANDE Precision Bearing',
    alternateName: isZh ? ['安德轴承', 'ANDE Bearing'] : ['Ande Bearing', '安德轴承'],
    url: SITE_URL,
    inLanguage: isZh ? 'zh-CN' : 'en',
    publisher: {
      '@type': 'Organization',
      name: isZh ? COMPANY_NAME_ZH : COMPANY_NAME_EN,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} suppressHydrationWarning>
      <head>
        <link rel="icon" href={`/images/company_log_${locale}.svg`} type="image/svg+xml" />
        <link rel="icon" href={`/images/company_log_${locale}.png`} type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <StructuredData locale={locale} />
      </head>
      <body
        className={`${geistSans.variable} antialiased min-h-screen flex flex-col bg-white text-gray-900`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}