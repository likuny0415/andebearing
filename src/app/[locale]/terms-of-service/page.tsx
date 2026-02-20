import { COMPANY_NAME_EN, COMPANY_NAME_ZH, CONTACT_EMAIL } from '@/lib/constants';
import { alternatesForPath } from '@/lib/url';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '服务条款' : 'Terms of Service',
    description: isZh
      ? '江苏安德精工轴承科技有限公司服务条款。'
      : 'Terms of Service for Jiangsu ANDE Precision Bearing Technology Co., Ltd.',
    alternates: alternatesForPath(locale, '/terms-of-service'),
  };
}

export default async function TermsOfServicePage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === 'zh';
  const companyName = isZh ? COMPANY_NAME_ZH : COMPANY_NAME_EN;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto prose prose-gray">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {isZh ? '服务条款' : 'Terms of Service'}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {isZh ? '最后更新：2026年1月' : 'Last updated: January 2026'}
        </p>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '使用条款' : 'Terms of Use'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? `访问和使用${companyName}网站即表示您同意受这些服务条款的约束。本网站上的所有产品信息、技术规格和图片仅供参考。实际产品规格以订单确认书为准。`
              : `By accessing and using the ${companyName} website, you agree to be bound by these Terms of Service. All product information, technical specifications, and images on this website are for reference only. Actual product specifications are subject to order confirmation.`}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '产品信息' : 'Product Information'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们尽力确保网站上所有产品信息的准确性。但由于产品持续改进，规格可能随时变更，恕不另行通知。所有报价均以最终订单确认为准。'
              : 'We make every effort to ensure the accuracy of all product information on our website. However, due to continuous product improvement, specifications are subject to change without notice. All quotations are subject to final order confirmation.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '知识产权' : 'Intellectual Property'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '本网站上的所有内容，包括但不限于文字、图片、标志、图表和软件，均为本公司或其内容提供商的财产，受知识产权法保护。未经书面许可，不得复制或使用。'
              : 'All content on this website, including but not limited to text, images, logos, graphics, and software, is the property of the company or its content providers and is protected by intellectual property laws. Reproduction or use without written permission is prohibited.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '免责声明' : 'Limitation of Liability'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '本网站按"现状"提供。我们不对网站内容的准确性、完整性或及时性做出任何明示或暗示的保证。对于因使用本网站而导致的任何直接或间接损失，我们不承担责任。'
              : 'This website is provided "as is." We make no warranties, expressed or implied, regarding the accuracy, completeness, or timeliness of the website content. We shall not be liable for any direct or indirect damages resulting from the use of this website.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '联系我们' : 'Contact Us'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? `如您对服务条款有任何疑问，请联系我们：`
              : `If you have questions about these terms, please contact us at: `}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-800 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}