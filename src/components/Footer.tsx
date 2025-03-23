"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Footer() {
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
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              {language === 'zh' ? '江苏安德精工轴承科技有限公司' : 'ANDE Precision Bearing Technology Co., Ltd.'}
            </h3>
            <p className="text-gray-300 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/andeprecisionbearing" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('common.products')}</h3>
            <ul className="space-y-2">
              <li><Link href={createLink('/products/ball-bearings')} className="text-gray-300 hover:text-white">{t('products.categories.ballBearings')}</Link></li>
              <li><Link href={createLink('/products/roller-bearings')} className="text-gray-300 hover:text-white">{t('products.categories.rollerBearings')}</Link></li>
              <li><Link href={createLink('/products/linear-motion')} className="text-gray-300 hover:text-white">{t('products.categories.linearMotion')}</Link></li>
              <li><Link href={createLink('/products/mounted-units')} className="text-gray-300 hover:text-white">{t('products.categories.mountedUnits')}</Link></li>
              <li><Link href={createLink('/products/accessories')} className="text-gray-300 hover:text-white">{t('products.categories.accessories')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('common.industries')}</h3>
            <ul className="space-y-2">
              <li><Link href={createLink('/industries/automotive')} className="text-gray-300 hover:text-white">{language === 'zh' ? t('home.industries.items.automotive.name') : 'Automotive'}</Link></li>
              <li><Link href={createLink('/industries/manufacturing')} className="text-gray-300 hover:text-white">{language === 'zh' ? t('home.industries.items.manufacturing.name') : 'Manufacturing'}</Link></li>
              <li><Link href={createLink('/industries/energy')} className="text-gray-300 hover:text-white">{language === 'zh' ? t('home.industries.items.energy.name') : 'Energy'}</Link></li>
              <li><Link href={createLink('/industries/agriculture')} className="text-gray-300 hover:text-white">{language === 'zh' ? t('home.industries.items.agriculture.name') : 'Agriculture'}</Link></li>
              <li><Link href={createLink('/industries/mining')} className="text-gray-300 hover:text-white">{language === 'zh' ? t('home.industries.items.mining.name') : 'Mining'}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('common.contact')}</h3>
            <address className="not-italic text-gray-300">
              <p>{t('contact.locations.headquarters.address').split('\n')[0]}</p>
              <p>{t('contact.locations.headquarters.address').split('\n')[1]}</p>
              <p>{t('contact.locations.headquarters.address').split('\n')[2]}</p>
              <p className="mt-3">{t('contact.info.email')}: {t('contact.locations.headquarters.email')}</p>
              <p>{t('contact.info.phone')}: <a href={`tel:${t('contact.locations.headquarters.phone')}`} className="text-gray-300 hover:text-white">{t('contact.locations.headquarters.phone')}</a></p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">{t('footer.copyright')}</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><Link href={createLink('/privacy-policy')} className="text-gray-400 hover:text-white">{language === 'zh' ? '隐私政策' : 'Privacy Policy'}</Link></li>
              <li><Link href={createLink('/terms-of-service')} className="text-gray-400 hover:text-white">{language === 'zh' ? '服务条款' : 'Terms of Service'}</Link></li>
              <li><Link href={createLink('/sitemap')} className="text-gray-400 hover:text-white">{language === 'zh' ? '网站地图' : 'Sitemap'}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 