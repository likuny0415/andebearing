import { getTranslations } from 'next-intl/server';
import { COMPANY_NAME_EN, COMPANY_NAME_ZH, CONTACT_EMAIL } from '@/lib/constants';
import { alternatesForPath } from '@/lib/url';
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
    alternates: alternatesForPath(locale, '/privacy-policy'),
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === 'zh';
  const companyName = isZh ? COMPANY_NAME_ZH : COMPANY_NAME_EN;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {isZh ? '隐私政策' : 'Privacy Policy'}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {isZh ? '最后更新：2026年1月' : 'Last updated: January 2026'}
        </p>

        {/* Overview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '概述' : 'Overview'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? `${companyName}重视您的隐私权。本政策说明我们如何收集、使用和保护您的个人信息。`
              : `${companyName} respects your privacy. This policy explains how we collect, use, and protect your personal data.`}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '访问或使用本网站（www.andebearing.com），即表示您同意本政策所述的数据处理方式。'
              : 'By using our website (www.andebearing.com), you agree to the data practices described here.'}
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '信息收集' : 'Information We Collect'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '我们通过询价表单和直接通信收集以下信息：'
              : 'We collect the following through inquiry forms and direct communications:'}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-3">
            <li>
              <strong>{isZh ? '个人信息' : 'Personal information'}</strong>
              {isZh
                ? ' — 姓名、邮箱、电话、公司名称及职位'
                : ' — name, email, phone, company name, and job title'}
            </li>
            <li>
              <strong>{isZh ? '业务信息' : 'Business information'}</strong>
              {isZh
                ? ' — 国家/地区、产品需求、轴承型号、规格、数量及交期'
                : ' — country, product needs, bearing models, specs, quantities, and delivery timelines'}
            </li>
            <li>
              <strong>{isZh ? '技术信息' : 'Technical information'}</strong>
              {isZh
                ? ' — IP地址、浏览器类型、访问页面及访问时间'
                : ' — IP address, browser type, pages visited, and access time'}
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们仅收集提供服务所必需的信息。'
              : 'We only collect data necessary to provide our services.'}
          </p>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '信息使用' : 'How We Use Your Information'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh ? '我们将您的信息用于：' : 'We use your information to:'}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>{isZh ? '回复产品询价并提供技术建议' : 'Respond to inquiries and provide technical advice'}</li>
            <li>{isZh ? '处理和履行订单（生产、质检、发货）' : 'Process and fulfill orders (production, QC, shipping)'}</li>
            <li>{isZh ? '提供售后支持（安装指导、维护、失效分析）' : 'Provide after-sales support (installation, maintenance, failure analysis)'}</li>
            <li>{isZh ? '发送订单相关通知（发货确认、交期更新）' : 'Send order-related updates (shipping confirmations, delivery status)'}</li>
            <li>{isZh ? '分析网站数据以改善性能和内容' : 'Analyze website data to improve performance and content'}</li>
            <li>{isZh ? '遵守适用法律法规' : 'Comply with applicable laws and regulations'}</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? 'Cookies与追踪技术' : 'Cookies and Tracking'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '我们使用Cookies来增强浏览体验。Cookies是存储在浏览器中的小型文本文件。'
              : 'We use cookies to improve your browsing experience. Cookies are small text files stored in your browser.'}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-3">
            <li>
              <strong>{isZh ? '必要Cookies' : 'Essential cookies'}</strong>
              {isZh ? ' — 确保网站基本功能（如语言选择）' : ' — ensure basic site functions (e.g., language selection)'}
            </li>
            <li>
              <strong>{isZh ? '分析Cookies' : 'Analytics cookies'}</strong>
              {isZh ? ' — 帮助我们了解访问者行为并优化体验' : ' — help us understand visitor behavior and improve experience'}
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '您可通过浏览器设置管理Cookies，但禁用可能影响部分功能。'
              : 'You can manage cookies in your browser settings, but disabling them may affect some features.'}
          </p>
        </section>

        {/* Data Protection */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '信息保护' : 'Data Protection'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh ? '我们采取以下措施保护您的信息：' : 'We protect your data through:'}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-3">
            <li>{isZh ? 'SSL/TLS加密保护数据传输' : 'SSL/TLS encryption for data transmission'}</li>
            <li>{isZh ? '限制员工对个人数据的访问权限' : 'Restricted employee access to personal data'}</li>
            <li>{isZh ? '定期审查和更新安全措施' : 'Regular review and update of security practices'}</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们不会出售您的信息。仅在必要时（如物流合作伙伴需要发货信息）共享给第三方，且要求其遵守同等保护标准。'
              : 'We never sell your data. We only share it with third parties when necessary (e.g., logistics partners for shipping), and require them to follow equivalent protection standards.'}
          </p>
        </section>

        {/* Data Retention */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '数据保留' : 'Data Retention'}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-3">
            <li>{isZh ? '询价和业务通信保留三年' : 'Inquiry and business records are kept for three years'}</li>
            <li>{isZh ? '订单记录按税务和商业法规要求保留' : 'Order records are retained per tax and commercial regulations'}</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '您可随时要求删除个人信息。我们将在合理时间内处理，法律要求保留的除外。'
              : 'You may request deletion at any time. We will process your request promptly, except where retention is required by law.'}
          </p>
        </section>

        {/* International Data Transfers */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '国际数据传输' : 'International Data Transfers'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '作为全球出口企业，您的信息可能在中国及其他国家间传输。我们确保在所有传输中采取适当保护措施。提交询价即表示您同意此类传输。'
              : 'As a global exporter, your data may be transferred between China and other countries. We ensure proper safeguards during all transfers. By submitting inquiries, you consent to such transfers.'}
          </p>
        </section>

        {/* Third-Party Links */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '第三方链接' : 'Third-Party Links'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '本网站可能链接至WhatsApp、微信等第三方平台。这些平台有各自的隐私政策，我们对其不承担责任。建议您在提交信息前查阅其政策。'
              : 'Our site may link to platforms like WhatsApp and WeChat. These have their own privacy policies, and we are not responsible for them. Review their policies before sharing personal data.'}
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '您的权利' : 'Your Rights'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh ? '根据适用法律，您有权：' : 'Under applicable laws, you have the right to:'}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>{isZh ? '访问我们持有的您的个人信息' : 'Access personal data we hold about you'}</li>
            <li>{isZh ? '更正不准确或不完整的信息' : 'Correct inaccurate or incomplete data'}</li>
            <li>{isZh ? '请求删除您的个人信息' : 'Request deletion of your data'}</li>
            <li>{isZh ? '反对或限制我们的数据处理' : 'Object to or restrict our data processing'}</li>
            <li>{isZh ? '数据可携带性' : 'Data portability'}</li>
          </ul>
        </section>

        {/* Changes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '政策变更' : 'Changes to This Policy'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们可能更新本政策以反映业务变化或法律要求。更新将发布于本页面并标注新日期。建议您定期查阅。'
              : 'We may update this policy to reflect business changes or legal requirements. Updates will be posted here with a new date. We encourage periodic review.'}
          </p>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '联系我们' : 'Contact Us'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '如有隐私相关问题，我们将在两个工作日内回复。'
              : 'For privacy-related questions, we respond within two business days.'}
          </p>
          <ul className="list-none space-y-2 text-gray-600">
            <li>
              <strong>{isZh ? '邮箱：' : 'Email: '}</strong>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-800 hover:underline">{CONTACT_EMAIL}</a>
            </li>
            <li>
              <strong>{isZh ? '地址：' : 'Address: '}</strong>
              {isZh
                ? '中国江苏省江阴市华士工业园联新路23号'
                : 'No. 23 Lianxin Road, Huashi Industrial Park, Jiangyin, Jiangsu, China'}
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}