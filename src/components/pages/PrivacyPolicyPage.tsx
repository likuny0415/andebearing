"use client";

import { useLanguage } from '../../context/LanguageContext';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const [currentPrefix, setCurrentPrefix] = useState('');

  useEffect(() => {
    // Determine language prefix from pathname
    if (pathname.startsWith('/zh')) {
      setCurrentPrefix('/zh');
    } else {
      setCurrentPrefix('/en');
    }
  }, [pathname]);

  // Function to create language-aware links
  const createLink = (path: string) => {
    // During initial render, use the path directly to avoid hydration mismatch
    if (!currentPrefix) {
      return path;
    }
    return `${currentPrefix}${path}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{language === 'zh' ? '隐私政策' : 'Privacy Policy'}</h1>
      
      <div className="prose max-w-none">
        {language === 'zh' ? (
          <>
            <p className="mb-4">最后更新日期：2024年6月20日</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">引言</h2>
            <p className="mb-4">江苏安德精工轴承科技有限公司（"我们"、"我们的"或"本公司"）尊重您的隐私，并致力于保护您的个人信息。本隐私政策将告知您我们如何收集、使用、披露、传输和存储您的个人数据。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">我们收集的信息</h2>
            <p className="mb-4">当您访问我们的网站、与我们联系或使用我们的服务时，我们可能会收集以下类型的信息：</p>
            <ul className="list-disc pl-6 mb-4">
              <li>联系信息（如姓名、电子邮件地址、电话号码、公司名称）</li>
              <li>账户信息（如用户名和密码）</li>
              <li>交易信息（如产品订单、配送地址）</li>
              <li>技术信息（如IP地址、浏览器类型、设备信息）</li>
              <li>使用信息（如您如何使用我们的网站和服务）</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">我们如何使用您的信息</h2>
            <p className="mb-4">我们使用收集的信息用于以下目的：</p>
            <ul className="list-disc pl-6 mb-4">
              <li>提供、维护和改进我们的产品和服务</li>
              <li>处理和完成交易</li>
              <li>发送技术通知、更新和支持信息</li>
              <li>回应您的评论、问题和请求</li>
              <li>为您提供客户服务和技术支持</li>
              <li>监控和分析使用趋势和偏好</li>
              <li>保护我们的权利、财产或安全</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">信息共享和披露</h2>
            <p className="mb-4">我们不会出售您的个人信息。我们可能会在以下情况下共享您的个人信息：</p>
            <ul className="list-disc pl-6 mb-4">
              <li>经您同意或按您的指示</li>
              <li>与我们的服务提供商和业务合作伙伴共享，以帮助我们提供服务</li>
              <li>遵守法律、法规或法律程序的要求</li>
              <li>保护我们公司、客户或公众的权利和安全</li>
              <li>在涉及合并、收购或资产出售的情况下</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">数据安全</h2>
            <p className="mb-4">我们采取合理的技术和组织措施来保护您的个人信息不被未经授权的访问、使用或披露。然而，没有任何传输方法或电子存储方法是100%安全的。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">数据保留</h2>
            <p className="mb-4">我们将在实现本隐私政策中概述的目的所需的时间内保留您的个人信息，除非法律要求或允许更长的保留期限。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">您的权利</h2>
            <p className="mb-4">根据适用的数据保护法律，您可能有以下权利：</p>
            <ul className="list-disc pl-6 mb-4">
              <li>访问、更正或删除您的个人信息</li>
              <li>限制或反对处理您的个人信息</li>
              <li>数据可携带性</li>
              <li>撤回同意</li>
              <li>投诉至数据保护监管机构</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Cookie政策</h2>
            <p className="mb-4">我们使用cookie和类似技术来改善用户体验、分析网站流量和个性化内容。您可以通过浏览器设置控制cookie的使用。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">本政策的变更</h2>
            <p className="mb-4">我们可能会不时更新本隐私政策。如有重大变更，我们将通过在网站上发布更新后的政策或通过其他适当的方式通知您。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">联系我们</h2>
            <p className="mb-4">如果您对本隐私政策或我们的数据处理实践有任何问题或疑虑，请通过以下方式联系我们：</p>
            <p className="mb-4">
              电子邮件：andeprecisionbearing@gmail.com<br />
              电话：+86-13906240166<br />
              地址：江阴市华士工业园区连心路23号
            </p>
          </>
        ) : (
          <>
            <p className="mb-4">Last Updated: June 20, 2024</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
            <p className="mb-4">Jiangsu Ander Precision Bearing Technology Co., Ltd. ("we," "our," or "the Company") respects your privacy and is committed to protecting your personal information. This Privacy Policy will inform you about how we collect, use, disclose, transfer, and store your personal data.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p className="mb-4">When you visit our website, contact us, or use our services, we may collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Contact information (such as name, email address, phone number, company name)</li>
              <li>Account information (such as username and password)</li>
              <li>Transaction information (such as product orders, delivery address)</li>
              <li>Technical information (such as IP address, browser type, device information)</li>
              <li>Usage information (such as how you use our website and services)</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>To provide, maintain, and improve our products and services</li>
              <li>To process and complete transactions</li>
              <li>To send technical notices, updates, and support messages</li>
              <li>To respond to your comments, questions, and requests</li>
              <li>To provide customer service and technical support</li>
              <li>To monitor and analyze usage trends and preferences</li>
              <li>To protect our rights, property, or safety</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information Sharing and Disclosure</h2>
            <p className="mb-4">We do not sell your personal information. We may share your personal information in the following situations:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>With your consent or at your direction</li>
              <li>With our service providers and business partners to help us provide services</li>
              <li>To comply with laws, regulations, or legal processes</li>
              <li>To protect the rights and safety of our company, customers, or the public</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
            <p className="mb-4">We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission or electronic storage is 100% secure.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Retention</h2>
            <p className="mb-4">We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p className="mb-4">Depending on applicable data protection laws, you may have the following rights:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access, correct, or delete your personal information</li>
              <li>Restrict or object to the processing of your personal information</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
              <li>Lodge a complaint with a data protection supervisory authority</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Cookie Policy</h2>
            <p className="mb-4">We use cookies and similar technologies to improve user experience, analyze website traffic, and personalize content. You can control the use of cookies through your browser settings.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
            <p className="mb-4">We may update this Privacy Policy from time to time. If we make significant changes, we will notify you by posting the updated policy on our website or through other appropriate means.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
            <p className="mb-4">
              Email: andeprecisionbearing@gmail.com<br />
              Phone: +86-13906240166<br />
              Address: No. 23 Lianxin Road, Huashi Industrial Park, Jiangyin, Jiangsu, China
            </p>
          </>
        )}
      </div>
      
      <div className="mt-12">
        <Link href={createLink('/')} className="text-blue-600 hover:underline">
          {language === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
} 