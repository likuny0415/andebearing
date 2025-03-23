"use client";

import { useLanguage } from '../../context/LanguageContext';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function TermsOfServicePage() {
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
      <h1 className="text-3xl font-bold mb-8">{language === 'zh' ? '服务条款' : 'Terms of Service'}</h1>
      
      <div className="prose max-w-none">
        {language === 'zh' ? (
          <>
            <p className="mb-4">最后更新日期：2024年6月20日</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">接受条款</h2>
            <p className="mb-4">通过访问或使用江苏安德精工轴承科技有限公司（"安德"、"我们"、"我们的"或"本公司"）的网站、产品或服务，您同意受本服务条款的约束。如果您不同意这些条款的任何部分，请不要使用我们的网站、产品或服务。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">使用我们的服务</h2>
            <p className="mb-4">您同意仅将我们的网站、产品和服务用于合法目的，并按照所有适用的法律和法规以及本条款使用。您不得以任何可能损害、禁用、过度负担或损害我们的服务或干扰任何其他方使用和享受服务的方式使用我们的服务。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">知识产权</h2>
            <p className="mb-4">我们的网站、产品和服务以及所有相关内容、功能和功能（包括但不限于所有信息、软件、文本、显示、图像、视频和音频，以及它们的设计、选择和安排）均为本公司、我们的许可人或其他内容提供者的财产，受国内和国际版权、商标、专利、商业秘密和其他知识产权或专有权利法律的保护。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">用户账户</h2>
            <p className="mb-4">某些服务可能需要您创建账户。您负责维护您的账户信息的机密性，并对在您的账户下发生的所有活动负责。您同意立即通知我们任何未经授权使用您的账户或任何其他安全漏洞的情况。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">订单和付款</h2>
            <p className="mb-4">通过我们的网站下订单时，您代表您有法律能力接受这些条款，并且您为您的订单提供的信息是准确的。所有付款条件都在您下订单时通知您。我们保留拒绝或取消任何订单的权利，包括付款后的订单。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">保修和免责声明</h2>
            <p className="mb-4">我们的产品保修条款会另行提供。在法律允许的最大范围内，我们的网站和服务是"按原样"和"按可用性"提供的，不作任何明示或暗示的保证。我们不保证我们的网站或服务将不间断、安全或无错误，或者错误将被纠正。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">责任限制</h2>
            <p className="mb-4">在法律允许的最大范围内，无论是合同、侵权、疏忽或其他法律理论，我们或我们的供应商在任何情况下都不对您或任何第三方因使用或无法使用我们的网站、产品或服务而导致的任何间接、偶然、特殊、惩罚性或后果性损害负责。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">赔偿</h2>
            <p className="mb-4">您同意赔偿、保护并使安德及其关联公司、官员、董事、员工和代理人免受任何索赔、责任、损害、损失和费用的影响，包括但不限于合理的法律和会计费用，这些费用是由您违反这些条款、违反您对第三方的任何义务或您违反任何法律或侵犯第三方权利而引起的。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">终止</h2>
            <p className="mb-4">我们可以在任何时候因任何原因或无原因终止或暂停您对我们服务的访问，包括如果您违反这些条款。终止后，您使用我们服务的权利将立即停止。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">适用法律</h2>
            <p className="mb-4">这些条款应受中华人民共和国法律管辖并据其解释，不考虑法律冲突原则。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">条款变更</h2>
            <p className="mb-4">我们可能会不时修改这些条款。每次修改后，我们将更新本网站上的"最后更新"日期。继续使用我们的服务即表示您接受这些修改。</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">联系我们</h2>
            <p className="mb-4">如果您对这些条款有任何问题或疑虑，请通过以下方式联系我们：</p>
            <p className="mb-4">
              电子邮件：andeprecisionbearing@gmail.com<br />
              电话：+86-13906240166<br />
              地址：江阴市华士工业园区连心路23号
            </p>
          </>
        ) : (
          <>
            <p className="mb-4">Last Updated: June 20, 2024</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Acceptance of Terms</h2>
            <p className="mb-4">By accessing or using the website, products, or services of Jiangsu Ande Precision Bearing Technology Co., Ltd. ("Ande," "we," "our," or "the Company"), you agree to be bound by these Terms of Service. If you do not agree to any part of these terms, please do not use our website, products, or services.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Our Services</h2>
            <p className="mb-4">You agree to use our website, products, and services only for lawful purposes and in accordance with all applicable laws and regulations and these terms. You must not use our services in any way that may damage, disable, overburden, or impair our services or interfere with any other party's use and enjoyment of the services.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
            <p className="mb-4">Our website, products, and services and all related content, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are the property of the Company, our licensors, or other content providers and are protected by domestic and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">User Accounts</h2>
            <p className="mb-4">Some services may require you to create an account. You are responsible for maintaining the confidentiality of your account information and are responsible for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other security breach.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Orders and Payment</h2>
            <p className="mb-4">When placing an order through our website, you represent that you are legally capable of entering into these terms and that the information you provide for your order is accurate. All payment terms are communicated to you at the time of placing your order. We reserve the right to refuse or cancel any order, including after payment has been made.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Warranties and Disclaimers</h2>
            <p className="mb-4">The terms of warranty for our products are provided separately. To the maximum extent permitted by law, our website and services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our website or services will be uninterrupted, secure, or error-free, or that errors will be corrected.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
            <p className="mb-4">To the maximum extent permitted by law, in no event shall we or our suppliers be liable to you or any third party for any indirect, incidental, special, punitive, or consequential damages arising out of or in connection with your use of or inability to use our website, products, or services, whether under contract, tort, negligence, or any other legal theory.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Indemnification</h2>
            <p className="mb-4">You agree to indemnify, defend, and hold harmless Ande and its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including without limitation reasonable legal and accounting fees, arising out of or in any way connected with your breach of these terms, your violation of any obligations you may have to third parties, or your violation of any law or infringement of any third-party rights.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Termination</h2>
            <p className="mb-4">We may terminate or suspend your access to our services at any time, for any reason or for no reason, including if you violate these terms. Upon termination, your right to use our services will immediately cease.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Governing Law</h2>
            <p className="mb-4">These terms shall be governed by and construed in accordance with the laws of the People's Republic of China, without regard to its conflict of law principles.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Terms</h2>
            <p className="mb-4">We may modify these terms from time to time. After each modification, we will update the "Last Updated" date at the top of this page. Your continued use of our services following any modifications indicates your acceptance of those modifications.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">If you have any questions or concerns about these terms, please contact us at:</p>
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