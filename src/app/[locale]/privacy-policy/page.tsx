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
      <div className="max-w-3xl mx-auto prose prose-gray">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {isZh ? '隐私政策' : 'Privacy Policy'}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {isZh ? '最后更新：2026年1月' : 'Last updated: January 2026'}
        </p>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '概述' : 'Overview'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? `${companyName}（以下简称"我们"或"本公司"）重视您的隐私权。本隐私政策详细说明我们在您访问我们的网站（www.andebearing.com）或通过其他渠道与我们互动时，如何收集、使用、存储和保护您的个人信息。请您在使用我们的网站和服务之前仔细阅读本隐私政策。通过访问或使用本网站，即表示您同意本政策所述的数据处理方式。`
              : `${companyName} ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit our website (www.andebearing.com) or interact with us through other channels. Please read this Privacy Policy carefully before using our website and services. By accessing or using this website, you consent to the data practices described in this policy.`}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '信息收集' : 'Information We Collect'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? `我们通过网站询价表单和直接通信收集以下类型的信息：个人身份信息，包括姓名、电子邮箱地址、电话号码、公司名称及职位；业务相关信息，包括国家或地区、产品需求、轴承型号与规格、应用场景描述、采购数量及交期要求；技术信息，如您的IP地址、浏览器类型、操作系统、访问页面、访问时间及引荐来源等网站使用数据。我们仅收集为提供服务和改善用户体验所必需的信息。`
              : `We collect the following types of information through our website inquiry forms and direct communications: Personal identification information, including your name, email address, phone number, company name, and job title. Business-related information, including your country or region, product requirements, bearing model numbers and specifications, application descriptions, order quantities, and delivery requirements. Technical information, such as your IP address, browser type, operating system, pages visited, time of access, and referral source. We only collect information that is necessary to provide our services and improve your experience on our website.`}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '信息使用' : 'How We Use Your Information'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们收集的信息用于以下目的：回复您的产品询价和报价请求，为您提供准确的技术建议和产品推荐；处理和履行您的订单，包括安排生产、质量检验和物流发货；提供售后技术支持，包括安装指导、维护建议和失效分析服务；向您发送与订单相关的通知，如发货确认、交期更新和文件传递；分析网站使用数据以改善网站性能、用户界面和内容质量；遵守适用的法律法规和行业监管要求。'
              : 'We use the information we collect for the following purposes: Responding to your product inquiries and quote requests, providing accurate technical advice and product recommendations. Processing and fulfilling your orders, including arranging production, quality inspection, and logistics shipment. Providing after-sales technical support, including installation guidance, maintenance advice, and failure analysis services. Sending you order-related notifications, such as shipment confirmations, delivery updates, and document transmissions. Analyzing website usage data to improve site performance, user interface, and content quality. Complying with applicable laws, regulations, and industry requirements.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? 'Cookies与追踪技术' : 'Cookies and Tracking Technologies'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们的网站可能使用Cookies和类似的追踪技术来增强您的浏览体验。Cookies是存储在您浏览器中的小型文本文件，帮助我们记住您的偏好设置（如语言选择）并分析网站流量模式。我们使用必要Cookies确保网站基本功能正常运行，使用分析Cookies了解访问者如何使用我们的网站，以便优化内容和用户体验。您可以通过浏览器设置管理或禁用Cookies，但这可能会影响网站的部分功能。'
              : 'Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored in your browser that help us remember your preferences (such as language selection) and analyze website traffic patterns. We use essential cookies to ensure basic website functionality, and analytics cookies to understand how visitors use our website so we can optimize content and user experience. You can manage or disable cookies through your browser settings, but doing so may affect some website functionality.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '信息保护' : 'Data Protection'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们采取合理的技术和组织措施来保护您的个人信息免受未经授权的访问、使用、修改或泄露。这些措施包括使用SSL/TLS加密技术保护数据传输安全，限制员工对个人数据的访问权限，定期审查和更新我们的安全措施。我们不会向第三方出售、交易或转让您的个人信息，除非是为了完成您请求的服务（如物流运输合作伙伴需要您的收货信息以安排交付）。在此类情况下，我们要求第三方服务提供商遵守同等的数据保护标准。'
              : 'We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, use, modification, or disclosure. These measures include using SSL/TLS encryption to protect data transmission, restricting employee access to personal data on a need-to-know basis, and regularly reviewing and updating our security practices. We do not sell, trade, or transfer your personal information to third parties, except as necessary to fulfill services you have requested (such as logistics partners requiring shipping information to arrange delivery). In such cases, we require third-party service providers to adhere to equivalent data protection standards.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '数据保留' : 'Data Retention'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们仅在实现收集目的所必需的期限内保留您的个人信息。询价记录和业务通信通常保留三年，以便我们为回头客户提供更好的服务和价格参考。订单和交易记录根据适用的税务和商业法规保留所要求的期限。您可以随时要求我们删除您的个人信息，我们将在合理的时间内处理您的请求，但法律要求保留的信息除外。'
              : 'We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected. Inquiry records and business communications are typically retained for three years to enable us to provide better service and pricing references for returning customers. Order and transaction records are retained for the period required by applicable tax and commercial regulations. You may request deletion of your personal information at any time, and we will process your request within a reasonable timeframe, except where retention is required by law.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '国际数据传输' : 'International Data Transfers'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '作为一家面向全球客户的出口企业，您的信息可能会在中国境内及其他国家之间传输和处理。我们确保在所有数据传输过程中采取适当的保护措施，以维护您个人信息的安全性和机密性。通过向我们提交询价或与我们开展业务，即表示您同意此类数据传输。'
              : 'As a global export-oriented business, your information may be transferred and processed within China and other countries. We ensure that appropriate safeguards are in place during all data transfers to maintain the security and confidentiality of your personal information. By submitting inquiries to us or conducting business with us, you consent to such data transfers.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '第三方链接' : 'Third-Party Links'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们的网站可能包含指向第三方网站的链接，例如即时通讯平台（WhatsApp、微信）或社交媒体服务。这些第三方网站有其自己的隐私政策，我们对其内容或数据处理方式不承担任何责任。我们建议您在向这些网站提供任何个人信息之前，查阅其各自的隐私政策。'
              : 'Our website may contain links to third-party websites, such as instant messaging platforms (WhatsApp, WeChat) or social media services. These third-party websites have their own privacy policies, and we are not responsible for their content or data practices. We recommend that you review their respective privacy policies before providing any personal information to these websites.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '您的权利' : 'Your Rights'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '根据适用的数据保护法律，您享有以下权利：访问我们持有的关于您的个人信息的权利；更正不准确或不完整的个人信息的权利；请求删除您的个人信息的权利；反对或限制我们处理您的个人信息的权利；数据可携带性的权利。如需行使上述任何权利，请通过以下联系方式与我们联系。'
              : 'Subject to applicable data protection laws, you have the following rights: The right to access personal information we hold about you. The right to correct inaccurate or incomplete personal information. The right to request deletion of your personal information. The right to object to or restrict our processing of your personal information. The right to data portability. To exercise any of these rights, please contact us using the information provided below.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '政策变更' : 'Changes to This Policy'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们可能会不时更新本隐私政策以反映我们业务实践的变化或适用法律的变更。任何重大更新将在本页面发布并更新"最后更新"日期。我们建议您定期查看本隐私政策，以了解我们如何保护您的信息。'
              : 'We may update this Privacy Policy from time to time to reflect changes in our business practices or applicable laws. Any material updates will be posted on this page with an updated "Last updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '联系我们' : 'Contact Us'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? `如您对我们的隐私政策有任何疑问、意见或请求，请通过以下方式联系我们。我们的团队将在两个工作日内回复您的隐私相关咨询。邮箱：`
              : `If you have any questions, comments, or requests regarding our Privacy Policy, please contact us. Our team will respond to privacy-related inquiries within two business days. Email: `}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-800 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? `公司地址：中国江苏省江阴市华士工业园联新路23号`
              : `Company Address: No. 23 Lianxin Road, Huashi Industrial Park, Jiangyin, Jiangsu, China`}
          </p>
        </section>
      </div>
    </div>
  );
}