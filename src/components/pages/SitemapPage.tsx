"use client";

import { useLanguage } from '../../context/LanguageContext';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SitemapPage() {
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

  const mainPages = [
    { path: '/', title: language === 'zh' ? '首页' : 'Home' },
    { path: '/products', title: language === 'zh' ? '产品' : 'Products' },
    { path: '/industries', title: language === 'zh' ? '行业' : 'Industries' },
    { path: '/services', title: language === 'zh' ? '服务' : 'Services' },
    { path: '/about', title: language === 'zh' ? '关于我们' : 'About Us' },
    { path: '/contact', title: language === 'zh' ? '联系我们' : 'Contact' },
  ];

  const productPages = [
    { path: '/products/deep-groove-ball-bearing', title: language === 'zh' ? '深沟球轴承' : 'Deep Groove Ball Bearing' },
    { path: '/products/tapered-roller-bearing', title: language === 'zh' ? '圆锥滚子轴承' : 'Tapered Roller Bearing' },
    { path: '/products/spherical-roller-bearing', title: language === 'zh' ? '调心滚子轴承' : 'Spherical Roller Bearing' },
    { path: '/products/linear-guide', title: language === 'zh' ? '直线导轨' : 'Linear Guide' },
  ];

  const industryPages = [
    { path: '/industries/automotive', title: language === 'zh' ? '汽车' : 'Automotive' },
    { path: '/industries/manufacturing', title: language === 'zh' ? '制造业' : 'Manufacturing' },
    { path: '/industries/energy', title: language === 'zh' ? '能源' : 'Energy' },
    { path: '/industries/agriculture', title: language === 'zh' ? '农业' : 'Agriculture' },
    { path: '/industries/mining', title: language === 'zh' ? '矿业' : 'Mining' },
    { path: '/industries/aerospace', title: language === 'zh' ? '航空航天' : 'Aerospace' },
  ];

  const legalPages = [
    { path: '/privacy-policy', title: language === 'zh' ? '隐私政策' : 'Privacy Policy' },
    { path: '/terms-of-service', title: language === 'zh' ? '服务条款' : 'Terms of Service' },
    { path: '/sitemap', title: language === 'zh' ? '网站地图' : 'Sitemap' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{language === 'zh' ? '网站地图' : 'Sitemap'}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">{language === 'zh' ? '主要页面' : 'Main Pages'}</h2>
          <ul className="space-y-2">
            {mainPages.map((page) => (
              <li key={page.path}>
                <Link href={createLink(page.path)} className="text-blue-600 hover:underline">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">{language === 'zh' ? '产品页面' : 'Product Pages'}</h2>
          <ul className="space-y-2">
            {productPages.map((page) => (
              <li key={page.path}>
                <Link href={createLink(page.path)} className="text-blue-600 hover:underline">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">{language === 'zh' ? '行业页面' : 'Industry Pages'}</h2>
          <ul className="space-y-2">
            {industryPages.map((page) => (
              <li key={page.path}>
                <Link href={createLink(page.path)} className="text-blue-600 hover:underline">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">{language === 'zh' ? '法律页面' : 'Legal Pages'}</h2>
          <ul className="space-y-2">
            {legalPages.map((page) => (
              <li key={page.path}>
                <Link href={createLink(page.path)} className="text-blue-600 hover:underline">
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-12">
        <Link href={createLink('/')} className="text-blue-600 hover:underline">
          {language === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
} 