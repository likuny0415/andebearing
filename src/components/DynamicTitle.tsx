"use client";

import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { usePathname } from 'next/navigation';

export default function DynamicTitle() {
  const { language, t, isZh } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    // Update the document title based on the current language
    document.title = t('metadata.title');

    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": isZh ? "苏州北人轴承销售有限公司" : "Suzhou Bei Ren Bearing Sales Co., Ltd.",
      "alternateName": isZh ? "北人轴承" : "Bei Ren Bearing",
      "url": `https://beiren-bearing.com${pathname}`, // Replace with your actual domain
      "logo": "https://beiren-bearing.com/images/logo.png", // Replace with your actual logo path
      "description": t('metadata.description'),
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "B9-10, Building 22, Hardware & Electromechanical Market",
        "addressLocality": "Zhangjiagang, Suzhou",
        "addressRegion": "Jiangsu Province",
        "postalCode": "215600",
        "addressCountry": "CN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "(+86) 13906240166",
        "contactType": "customer service",
        "email": "kuny.li0145@gmail.com",
        "availableLanguage": ["English", "Chinese"]
      },
      "sameAs": [
        "https://www.facebook.com/beirenbearing", // Replace with your actual social media links
        "https://www.linkedin.com/company/beirenbearing",
        "https://twitter.com/beirenbearing"
      ]
    };

    // Add product structured data
    const productStructuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": isZh ? "精密轴承" : "Precision Bearings",
      "description": isZh ? "高质量精密轴承，适用于各种工业应用" : "High-quality precision bearings for various industrial applications",
      "brand": {
        "@type": "Brand",
        "name": isZh ? "北人轴承" : "Bei Ren Bearing"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "10",
        "highPrice": "1000",
        "offerCount": "100",
        "availability": "https://schema.org/InStock"
      }
    };

    // Add the structured data to the page
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify([structuredData, productStructuredData]);
    document.head.appendChild(script);

  }, [language, t, isZh, pathname]);

  // This component doesn't render anything
  return null;
} 