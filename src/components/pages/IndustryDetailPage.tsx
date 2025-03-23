"use client";

import { useLanguage } from '../../context/LanguageContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function IndustryDetailPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const pathname = usePathname();
  const [currentPrefix, setCurrentPrefix] = useState('');
  
  // Get the industryId from the last segment of the pathname
  const pathSegments = pathname.split('/');
  const industryId = pathSegments[pathSegments.length - 1];

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
      <div className="mb-8">
        <Link href={createLink('/industries')} className="text-blue-600 hover:underline inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('common.industries')}
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">{t(`home.industries.items.${industryId}.name`)}</h1>
      
      <div className="bg-gray-100 p-8 rounded-lg mb-12">
        <p className="text-lg text-gray-700 mb-6">
          {t(`home.industries.items.${industryId}.description`)}
        </p>
        <p className="text-lg text-gray-700 mb-6">
          {language === 'zh' ? (
            `我们为${t(`home.industries.items.${industryId}.name`)}行业设计的轴承旨在满足该行业的特定挑战和要求。通过高精度制造和优质材料，我们的产品即使在最苛刻的应用中也能确保可靠性和长久耐用性。`
          ) : (
            `Our bearings for the ${t(`home.industries.items.${industryId}.name`)} industry are designed to meet the specific challenges and requirements of this sector. With high precision manufacturing and quality materials, our products ensure reliability and longevity even in the most demanding applications.`
          )}
        </p>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">{language === 'zh' ? '主要优势' : 'Key Benefits'}</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2">
        {language === 'zh' ? (
          <>
            <li>增强的耐久性，延长使用寿命</li>
            <li>高负载能力，应对苛刻应用</li>
            <li>精密工程，确保最佳性能</li>
            <li>减少维护需求</li>
            <li>可提供定制解决方案，满足特定需求</li>
          </>
        ) : (
          <>
            <li>Enhanced durability for extended service life</li>
            <li>High load capacities to handle demanding applications</li>
            <li>Precision engineering for optimal performance</li>
            <li>Reduced maintenance requirements</li>
            <li>Custom solutions available for specific needs</li>
          </>
        )}
      </ul>
      
      <h2 className="text-2xl font-semibold mb-4">{language === 'zh' ? '推荐产品' : 'Recommended Products'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">{language === 'zh' ? '深沟球轴承' : 'Deep Groove Ball Bearings'}</h3>
            <Link href={createLink('/products/deep-groove-ball-bearing')} className="text-blue-600 hover:underline">
              {t('common.viewDetails')}
            </Link>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">{language === 'zh' ? '圆锥滚子轴承' : 'Tapered Roller Bearings'}</h3>
            <Link href={createLink('/products/tapered-roller-bearing')} className="text-blue-600 hover:underline">
              {t('common.viewDetails')}
            </Link>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">{language === 'zh' ? '调心滚子轴承' : 'Spherical Roller Bearings'}</h3>
            <Link href={createLink('/products/spherical-roller-bearing')} className="text-blue-600 hover:underline">
              {t('common.viewDetails')}
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">{language === 'zh' ? '需要定制解决方案？' : 'Need a Custom Solution?'}</h2>
        <p className="mb-4">{language === 'zh' ? '我们的工程团队可以帮助您为特定应用开发专业轴承解决方案。' : 'Our engineering team can help you develop specialized bearing solutions for your specific application.'}</p>
        <Link href={createLink('/contact')} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 inline-block">
          {t('common.contactUs')}
        </Link>
      </div>
    </div>
  );
} 