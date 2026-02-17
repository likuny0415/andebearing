import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { PRODUCT_SLUGS } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'zh'];
  const routes = ['', '/products', '/about', '/contact', '/industries', '/services', '/quality', '/faq'];
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${route}`,
            zh: `${SITE_URL}/zh${route}`,
          },
        },
      });
    }

    // Product detail pages
    for (const slug of PRODUCT_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/products/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${SITE_URL}/en/products/${slug}`,
            zh: `${SITE_URL}/zh/products/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}