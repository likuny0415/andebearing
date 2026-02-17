import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { PRODUCT_SLUGS, CATEGORY_SLUGS } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'zh'];
  const routes = ['', '/products', '/about', '/contact', '/industries', '/services', '/quality', '/faq', '/privacy-policy', '/terms-of-service'];
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/products' ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${route}`,
            zh: `${SITE_URL}/zh${route}`,
            'x-default': `${SITE_URL}/en${route}`,
          },
        },
      });
    }

    // Product category pages (high priority — these are key landing pages)
    for (const slug of CATEGORY_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/products/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.85,
        alternates: {
          languages: {
            en: `${SITE_URL}/en/products/${slug}`,
            zh: `${SITE_URL}/zh/products/${slug}`,
            'x-default': `${SITE_URL}/en/products/${slug}`,
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
            'x-default': `${SITE_URL}/en/products/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}