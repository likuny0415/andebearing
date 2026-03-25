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
      ? '江苏安德精工轴承科技有限公司服务条款。了解我们网站的使用条件、产品信息、知识产权及交易条款。'
      : 'Terms of Service for Jiangsu ANDE Precision Bearing Technology Co., Ltd. Understand our website usage conditions, product information, intellectual property, and transaction terms.',
    alternates: alternatesForPath(locale, '/terms-of-service'),
  };
}

export default async function TermsOfServicePage({ params }: Props) {
  const { locale } = await params;
  const isZh = locale === 'zh';
  const companyName = isZh ? COMPANY_NAME_ZH : COMPANY_NAME_EN;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {isZh ? '服务条款' : 'Terms of Service'}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {isZh ? '最后更新：2026年1月' : 'Last updated: January 2026'}
        </p>

        {/* Acceptance */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '接受条款' : 'Acceptance of Terms'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? `欢迎访问${companyName}官方网站（www.andebearing.com）。`
              : `Welcome to the website of ${companyName} (www.andebearing.com).`}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '使用本网站即表示您同意受这些条款约束。如不同意，请停止使用。我们可能随时更新条款，更新自发布之日起生效。'
              : 'By using this site, you agree to these terms. If you disagree, please stop using the site. We may update these terms at any time, effective upon posting.'}
          </p>
        </section>

        {/* Terms of Use */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '使用条款' : 'Terms of Use'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '网站内容仅供信息参考和商业沟通。您可以浏览内容、下载目录并发送询价。'
              : 'Website content is for information and business communication only. You may browse content, download catalogs, and send inquiries.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh ? '您同意不会：' : 'You agree not to:'}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>{isZh ? '将网站用于非法目的' : 'Use the site for unlawful purposes'}</li>
            <li>{isZh ? '尝试未经授权访问我们的系统' : 'Attempt unauthorized access to our systems'}</li>
            <li>{isZh ? '使用自动化工具大量抓取内容' : 'Use automated tools to scrape content in bulk'}</li>
            <li>{isZh ? '以任何方式损害网站正常运行' : 'Impair normal website operation in any way'}</li>
          </ul>
        </section>

        {/* Product Info */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '产品信息与报价' : 'Product Information & Quotations'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '我们尽力确保产品信息准确。但由于持续改进，规格可能变更，恕不另行通知。'
              : 'We strive for accuracy in product information. However, specs may change without notice due to ongoing improvements.'}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>{isZh ? '产品图片仅供参考，实际外观可能略有差异' : 'Product images are for reference only; actual appearance may vary slightly'}</li>
            <li>{isZh ? '所有报价均为初步报价，以正式合同或形式发票为准' : 'All quotes are preliminary; final pricing is per the signed contract or Proforma Invoice'}</li>
            <li>{isZh ? '报价有效期通常为30天，除非另行书面说明' : 'Quotes are typically valid for 30 days unless otherwise stated in writing'}</li>
          </ul>
        </section>

        {/* Orders */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '订单与交易条款' : 'Orders & Transaction Terms'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '网站询价不构成正式订单。正式订单须经双方确认规格、价格、数量、交期和付款条件。'
              : 'Website inquiries are not formal orders. Orders are established after both parties confirm specs, pricing, quantity, delivery, and payment terms.'}
          </p>
          <h3 className="text-base font-semibold text-gray-800 mb-2">
            {isZh ? '付款方式' : 'Payment Methods'}
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-3">
            <li>{isZh ? '电汇（T/T）' : 'Wire transfer (T/T)'}</li>
            <li>{isZh ? '信用证（L/C）' : 'Letter of credit (L/C)'}</li>
            <li>{isZh ? '西联汇款' : 'Western Union'}</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '标准条款：订单确认后30%定金，提单副本后70%尾款。价格不含银行手续费。'
              : 'Standard terms: 30% deposit on order confirmation, 70% balance against copy of B/L. Prices exclude bank charges.'}
          </p>
        </section>

        {/* Shipping */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '发货与交付' : 'Shipping & Delivery'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '交货期自订单确认和定金到账之日起计算。'
              : 'Delivery times start from order confirmation and deposit receipt.'}
          </p>
          <h3 className="text-base font-semibold text-gray-800 mb-2">
            {isZh ? '交货期' : 'Lead Times'}
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-3">
            <li>{isZh ? '标准产品：2–4周' : 'Standard products: 2–4 weeks'}</li>
            <li>{isZh ? '非标/大批量订单：4–8周' : 'Non-standard / large orders: 4–8 weeks'}</li>
          </ul>
          <h3 className="text-base font-semibold text-gray-800 mb-2">
            {isZh ? '贸易条款' : 'Trade Terms'}
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-3">
            <li>FOB, CIF, CFR, DDP, EXW</li>
          </ul>
          <h3 className="text-base font-semibold text-gray-800 mb-2">
            {isZh ? '包装' : 'Packaging'}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '防锈纸包裹 + VCI薄膜保护 + 加固纸箱或木箱，适合海运。'
              : 'Anti-rust paper + VCI film + reinforced cartons or wooden cases, suitable for ocean freight.'}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '不可抗力（自然灾害、政府管制、物流中断等）导致的延迟不视为违约。'
              : 'Delays from force majeure (natural disasters, regulations, logistics disruptions) are not considered breach of contract.'}
          </p>
        </section>

        {/* Quality */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '质量保证与索赔' : 'Quality Assurance & Claims'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '所有产品经过严格质控，每批货物附带合格证书。'
              : 'All products undergo strict quality control. Every shipment includes a Certificate of Conformity.'}
          </p>
          <h3 className="text-base font-semibold text-gray-800 mb-2">
            {isZh ? '索赔流程' : 'Claims Process'}
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-3">
            <li>{isZh ? '收货后14天内书面通知' : 'Notify us in writing within 14 days of receipt'}</li>
            <li>{isZh ? '提供缺陷描述和照片证据' : 'Provide defect description and photo evidence'}</li>
            <li>{isZh ? '核实后提供换货、补货或信用调整' : 'After verification: replacement, supplementary shipment, or credit adjustment'}</li>
          </ul>
          <h3 className="text-base font-semibold text-gray-800 mb-2">
            {isZh ? '不在保修范围内' : 'Not Covered Under Warranty'}
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>{isZh ? '安装不当造成的损坏' : 'Damage from improper installation'}</li>
            <li>{isZh ? '超出额定工况使用' : 'Operation beyond rated conditions'}</li>
            <li>{isZh ? '产品改装' : 'Product modification'}</li>
            <li>{isZh ? '正常磨损' : 'Normal wear and tear'}</li>
          </ul>
        </section>

        {/* IP */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '知识产权' : 'Intellectual Property'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '网站所有内容（文字、图片、标志、代码等）均受中国和国际知识产权法保护。'
              : 'All website content (text, images, logos, code, etc.) is protected by Chinese and international IP laws.'}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>{isZh ? '未经书面许可不得用于商业目的' : 'Commercial use requires prior written permission'}</li>
            <li>{isZh ? '允许为个人参考目的下载和打印，但须保留版权声明' : 'Personal reference downloads are permitted with copyright notices retained'}</li>
          </ul>
        </section>

        {/* Liability */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '免责声明' : 'Limitation of Liability'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '网站内容按"现状"提供，不附带任何保证。我们不保证网站不间断运行或完全无错。'
              : 'Website content is provided "as is" without warranties. We do not guarantee uninterrupted or error-free operation.'}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '技术建议和产品推荐仅供参考。最终的轴承选型应基于专业工程评估。对因使用本网站导致的任何损失，本公司不承担责任。'
              : 'Technical advice and recommendations are for reference only. Final bearing selection should be based on professional engineering evaluation. We are not liable for damages from website use.'}
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '适用法律与争议解决' : 'Governing Law & Disputes'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '本条款受中华人民共和国法律管辖。'
              : 'These terms are governed by the laws of the People\'s Republic of China.'}
          </p>
          <h3 className="text-base font-semibold text-gray-800 mb-2">
            {isZh ? '争议解决步骤' : 'Dispute Resolution Steps'}
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>{isZh ? '双方友好协商' : 'Friendly negotiation between parties'}</li>
            <li>{isZh ? '协商不成，提交本公司所在地法院' : 'If unresolved, submit to the competent court at the company\'s location'}</li>
            <li>{isZh ? '国际贸易争议可提交CIETAC仲裁' : 'International trade disputes may go to CIETAC arbitration'}</li>
          </ol>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {isZh ? '联系我们' : 'Contact Us'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            {isZh
              ? '如有条款相关问题，我们将在两个工作日内回复。'
              : 'For questions about these terms, we respond within two business days.'}
          </p>
          <ul className="list-none space-y-2 text-gray-600">
            <li>
              <strong>{isZh ? '邮箱：' : 'Email: '}</strong>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-800 hover:underline">{CONTACT_EMAIL}</a>
            </li>
            <li>
              <strong>{isZh ? '地址：' : 'Address: '}</strong>
              {isZh
                ? '中国江苏省江阴市华士工业园连心路23号'
                : 'No. 23 Lianxin Road, Huashi Industrial Park, Jiangyin, Jiangsu, China'}
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}