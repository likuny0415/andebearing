import { getTranslations } from 'next-intl/server';
import { SITE_URL, COMPANY_NAME_EN, COMPANY_NAME_ZH, CONTACT_EMAIL } from '@/lib/constants';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '隐私政策' : 'Privacy Policy',
    description: isZh
      ? '江苏安德精工轴承科技有限公司隐私政策。了解我们如何收集、使用和保护您的信息。'
      : 'Privacy Policy for Jiangsu ANDE Precision Bearing Technology Co., Ltd. Learn how we collect, use, and protect your information.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy-policy`,
      languages: { en: `${SITE_URL}/en/privacy-policy`, zh: `${SITE_URL}/zh/privacy-policy`, 'x-default': `${SITE_URL}/en/privacy-policy` },
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === 'zh';
  const companyName = isZh ? COMPANY_NAME_ZH : COMPANY_NAME_EN;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto prose prose-gray">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {isZh ? '隐私政策' : 'Privacy Policy'}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {isZh ? '最后更新：2024年1月' : 'Last updated: January 2024'}
        </p>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '信息收集' : 'Information We Collect'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? `${companyName}通过我们的网站询价表单收集以下信息：姓名、电子邮箱、公司名称、国家/地区、电话号码、产品需求及技术规格。`
              : `${companyName} collects the following information through our website inquiry form: name, email address, company name, country/region, phone number, product requirements, and technical specifications.`}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '信息使用' : 'How We Use Your Information'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们收集的信息仅用于以下目的：回复您的询价和报价请求、提供技术支持和产品推荐、处理订单和安排发货、改善我们的产品和服务。'
              : 'The information we collect is used solely for: responding to your inquiries and quote requests, providing technical support and product recommendations, processing orders and arranging shipments, and improving our products and services.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '信息保护' : 'Data Protection'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们采取合理的技术和组织措施来保护您的个人信息。我们不会向第三方出售、交易或转让您的个人信息，除非是为了完成您请求的服务（如物流和运输）。'
              : 'We implement reasonable technical and organizational measures to protect your personal information. We do not sell, trade, or transfer your personal information to third parties, except as necessary to fulfill services you have requested (such as logistics and shipping).'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '联系我们' : 'Contact Us'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? `如您对我们的隐私政策有任何疑问，请通过以下邮箱联系我们：`
              : `If you have any questions about our privacy policy, please contact us at: `}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-800 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}