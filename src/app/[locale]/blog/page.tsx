import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { alternatesForPath } from '@/lib/url';
import { getAllBlogPosts } from '@/lib/blog';
import { SITE_URL, COMPANY_NAME_EN, COMPANY_NAME_ZH } from '@/lib/constants';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('blog.title'),
    description: t('blog.description'),
    alternates: alternatesForPath(locale, '/blog'),
  };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = getAllBlogPosts(locale);
  const t = await getTranslations('blog');

  const isZh = locale === 'zh';
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: t('title'),
    description: t('subtitle'),
    url: isZh ? `${SITE_URL}/zh/blog` : `${SITE_URL}/blog`,
    inLanguage: isZh ? 'zh-CN' : 'en',
    publisher: { '@type': 'Organization', name: isZh ? COMPANY_NAME_ZH : COMPANY_NAME_EN, url: SITE_URL },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: isZh ? `${SITE_URL}/zh/blog/${post.slug}` : `${SITE_URL}/blog/${post.slug}`,
    })),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('title')}</h1>
        <p className="text-lg text-gray-600 mb-12">{t('subtitle')}</p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-3">
            {t('allArticles')}
          </h2>
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {t(`categories.${post.category}`)}
                  </span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} {t('readTime')}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}` as any}
                  className="block group"
                >
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-800 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-blue-800 text-sm font-medium group-hover:underline">
                    {t('readMoreLink')} →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-blue-50 border border-blue-100 rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('cta.title')}</h2>
          <p className="text-gray-600 mb-6">{t('cta.description')}</p>
          <Link
            href="/contact"
            className="inline-block bg-blue-800 text-white px-6 py-3 rounded font-medium hover:bg-blue-900 transition-colors"
          >
            {t('cta.button')}
          </Link>
        </section>
      </div>
    </div>
  );
}
