import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { alternatesForPath } from '@/lib/url';
import { getBlogPost, getBlogSlugs } from '@/lib/blog';
import { SITE_URL, COMPANY_NAME_EN, COMPANY_NAME_ZH } from '@/lib/constants';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogArticleContent from './BlogArticleContent';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug, locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: alternatesForPath(locale, `/blog/${slug}`),
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getBlogPost(slug, locale);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });
  const tc = await getTranslations({ locale, namespace: 'common' });

  const isZh = locale === 'zh';
  const articleUrl = isZh ? `${SITE_URL}/zh/blog/${slug}` : `${SITE_URL}/blog/${slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: isZh ? COMPANY_NAME_ZH : COMPANY_NAME_EN, url: SITE_URL },
    publisher: { '@type': 'Organization', name: isZh ? COMPANY_NAME_ZH : COMPANY_NAME_EN, url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/company_log_en.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    inLanguage: isZh ? 'zh-CN' : 'en',
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/blog"
            className="text-blue-800 text-sm font-medium hover:underline"
          >
            ← {t('backToBlog')}
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
              {t(`categories.${post.category}`)}
            </span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} {t('readTime')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-500 text-sm">
            {t('author')}: {post.author}
          </p>
        </header>

        {/* Article Content — rendered as markdown */}
        <BlogArticleContent content={post.content} />

        {/* CTA */}
        <section className="mt-12 bg-blue-50 border border-blue-100 rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('cta.title')}</h2>
          <p className="text-gray-600 mb-6">{t('cta.description')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-blue-800 text-white px-6 py-3 rounded font-medium hover:bg-blue-900 transition-colors"
            >
              {t('cta.button')}
            </Link>
            <Link
              href="/products"
              className="inline-block border border-blue-800 text-blue-800 px-6 py-3 rounded font-medium hover:bg-blue-50 transition-colors"
            >
              {tc('viewProducts')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}