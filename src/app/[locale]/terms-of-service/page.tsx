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
      <div className="max-w-3xl mx-auto prose prose-gray">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {isZh ? '服务条款' : 'Terms of Service'}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {isZh ? '最后更新：2026年1月' : 'Last updated: January 2026'}
        </p>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '接受条款' : 'Acceptance of Terms'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? `欢迎访问${companyName}的官方网站（www.andebearing.com）。通过访问、浏览或使用本网站，您确认已阅读、理解并同意受这些服务条款的约束。如果您不同意这些条款中的任何部分，请停止使用本网站。这些条款构成您与本公司之间关于使用本网站的完整协议。本公司保留随时修改这些条款的权利，修改后的条款自发布之日起生效。`
              : `Welcome to the official website of ${companyName} (www.andebearing.com). By accessing, browsing, or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of this website. These terms constitute the entire agreement between you and the company regarding the use of this website. The company reserves the right to modify these terms at any time, and modified terms become effective upon publication.`}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '使用条款' : 'Terms of Use'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '本网站上的所有内容仅供信息参考和商业沟通目的。您可以浏览网站内容、下载产品目录并通过询价表单与我们联系。您同意不会将本网站用于任何非法目的，不会试图未经授权访问我们的系统，不会使用自动化工具大量抓取网站内容，也不会以任何可能损害网站正常运行的方式使用本网站。我们保留在不事先通知的情况下限制或终止任何用户访问本网站的权利。'
              : 'All content on this website is provided for informational and business communication purposes only. You may browse website content, download product catalogs, and contact us through the inquiry form. You agree not to use this website for any unlawful purpose, not to attempt unauthorized access to our systems, not to use automated tools to scrape website content in bulk, and not to use this website in any manner that could impair its normal operation. We reserve the right to restrict or terminate any user access to this website without prior notice.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '产品信息与报价' : 'Product Information and Quotations'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们尽力确保网站上所有产品信息、技术规格、图片和描述的准确性。但由于产品持续改进和制造工艺优化，规格可能随时变更，恕不另行通知。网站上展示的产品图片仅供参考，实际产品外观可能因批次、材料和表面处理工艺的不同而略有差异。所有通过网站或邮件提供的报价均为初步报价，最终价格以双方签订的正式销售合同或形式发票（Proforma Invoice）为准。报价的有效期通常为30天，除非另行书面说明。'
              : 'We make every effort to ensure the accuracy of all product information, technical specifications, images, and descriptions on our website. However, due to continuous product improvement and manufacturing process optimization, specifications are subject to change without notice. Product images displayed on the website are for reference only, and actual product appearance may vary slightly due to differences in batch, material, and surface treatment processes. All quotations provided through the website or email are preliminary, and final pricing is subject to the formal sales contract or Proforma Invoice agreed upon by both parties. Quotations are typically valid for 30 days unless otherwise stated in writing.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '订单与交易条款' : 'Orders and Transaction Terms'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '通过本网站提交的询价不构成正式订单或购买承诺。正式订单须经双方确认产品规格、价格、数量、交期和付款条件后方可成立。我们接受的标准付款方式包括电汇（T/T）、信用证（L/C）和西联汇款。标准付款条款为：订单确认后支付30%定金，提单副本确认后支付70%尾款，除非双方另有书面约定。所有价格均以报价时注明的货币为准，不包含可能产生的银行手续费。'
              : 'Inquiries submitted through this website do not constitute formal orders or purchase commitments. Formal orders are established only after both parties confirm product specifications, pricing, quantities, delivery schedules, and payment terms. Our accepted standard payment methods include wire transfer (T/T), letter of credit (L/C), and Western Union. Standard payment terms are: 30% deposit upon order confirmation, 70% balance against copy of Bill of Lading, unless otherwise agreed in writing. All prices are denominated in the currency specified at the time of quotation and do not include any applicable bank charges.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '发货与交付' : 'Shipping and Delivery'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '交货期自订单确认和定金到账之日起计算。标准目录产品的交货期通常为2至4周，非标产品或大批量订单为4至8周。我们支持FOB、CIF、CFR、DDP和EXW等国际贸易条款。所有产品均采用适合海运的工业级出口包装，包括防锈纸包裹、VCI薄膜保护和加固纸箱或木箱。具体的运输方式、港口和保险安排以销售合同中的约定为准。由于不可抗力因素（如自然灾害、政府管制、物流中断等）导致的交货延迟，不视为违约。'
              : 'Delivery times are calculated from the date of order confirmation and deposit receipt. Standard catalog products typically have a delivery time of 2 to 4 weeks, while non-standard products or large-volume orders require 4 to 8 weeks. We support international trade terms including FOB, CIF, CFR, DDP, and EXW. All products are packed in industrial-grade export packaging suitable for ocean freight, including anti-rust paper wrapping, VCI film protection, and reinforced cartons or wooden cases. Specific shipping methods, ports, and insurance arrangements are subject to the terms agreed upon in the sales contract. Delivery delays caused by force majeure events (such as natural disasters, government regulations, logistics disruptions, etc.) are not considered a breach of contract.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '质量保证与索赔' : 'Quality Assurance and Claims'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '我们的所有产品均经过严格的质量控制流程，包括来料检验、过程检测和成品审核。每批货物均附带合格证书（Certificate of Conformity）。如果您收到的产品存在制造缺陷或与订单规格不符，请在收货后14天内以书面形式通知我们并提供详细的缺陷描述和照片证据。经核实确认后，我们将根据具体情况提供换货、补货或信用额度调整。因安装不当、使用超出额定工况、改装或正常磨损造成的损坏不在保修范围之内。'
              : 'All our products undergo rigorous quality control processes, including incoming material inspection, in-process testing, and final product audit. Every shipment includes a Certificate of Conformity. If you receive products with manufacturing defects or that do not conform to order specifications, please notify us in writing within 14 days of receipt, providing detailed defect descriptions and photographic evidence. Upon verification, we will provide replacement, supplementary shipment, or credit adjustment as appropriate. Damage caused by improper installation, operation beyond rated conditions, modification, or normal wear is not covered under warranty.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '知识产权' : 'Intellectual Property'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '本网站上的所有内容，包括但不限于文字、产品描述、技术规格、图片、图表、标志、页面布局和软件代码，均为本公司或其内容提供商的知识产权，受中国和国际知识产权法律保护。未经本公司事先书面许可，任何个人或组织不得复制、分发、修改、展示或以其他方式使用本网站上的任何内容用于商业目的。允许为个人参考目的下载和打印产品信息，但必须保留所有版权和知识产权声明。'
              : 'All content on this website, including but not limited to text, product descriptions, technical specifications, images, graphics, logos, page layouts, and software code, is the intellectual property of the company or its content providers and is protected by Chinese and international intellectual property laws. No individual or organization may reproduce, distribute, modify, display, or otherwise use any content from this website for commercial purposes without prior written permission from the company. Downloading and printing product information for personal reference purposes is permitted, provided that all copyright and intellectual property notices are retained.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '免责声明' : 'Limitation of Liability'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '本网站及其内容按"现状"和"可用状态"提供，不附带任何形式的明示或暗示保证。我们不保证网站将不间断运行或完全无错误。对于因使用本网站或依赖网站内容而导致的任何直接、间接、附带、特殊或后果性损失，包括但不限于利润损失、数据丢失或业务中断，本公司不承担任何责任。本网站上的技术建议和产品推荐仅供参考，最终的轴承选型和应用决策应基于专业的工程评估。'
              : 'This website and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not guarantee that the website will operate uninterrupted or be completely error-free. The company shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of this website or reliance on its content, including but not limited to loss of profits, data loss, or business interruption. Technical advice and product recommendations on this website are for reference only, and final bearing selection and application decisions should be based on professional engineering evaluation.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '适用法律与争议解决' : 'Governing Law and Dispute Resolution'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? '本服务条款受中华人民共和国法律管辖并按其解释。因使用本网站或与本服务条款相关的任何争议，双方应首先通过友好协商解决。如协商不成，任何一方均可将争议提交至本公司所在地有管辖权的人民法院诉讼解决。对于国际贸易争议，双方可约定将争议提交中国国际经济贸易仲裁委员会（CIETAC）按其届时有效的仲裁规则进行仲裁。'
              : 'These Terms of Service are governed by and construed in accordance with the laws of the People\'s Republic of China. Any dispute arising from the use of this website or related to these Terms of Service shall first be resolved through friendly negotiation between the parties. If negotiation fails, either party may submit the dispute to the competent People\'s Court at the location of the company. For international trade disputes, the parties may agree to submit the dispute to the China International Economic and Trade Arbitration Commission (CIETAC) for arbitration in accordance with its then-effective arbitration rules.'}
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {isZh ? '联系我们' : 'Contact Us'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isZh
              ? `如您对本服务条款有任何疑问或需要进一步说明，请通过以下方式联系我们。我们的团队将在两个工作日内回复您的咨询。邮箱：`
              : `If you have any questions about these Terms of Service or require further clarification, please contact us. Our team will respond to your inquiry within two business days. Email: `}
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