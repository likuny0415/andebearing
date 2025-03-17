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
      "name": isZh ? "江苏安德精工轴承科技有限公司" : "ANDE Precision Bearing Technology Co., Ltd.",
      "alternateName": isZh ? "安德轴承" : "ANDE Bearing",
      "url": `https://ande-bearing.com${pathname}`, // Replace with your actual domain
      "logo": "https://ande-bearing.com/images/logo.png", // Replace with your actual logo path
      "description": t('metadata.description'),
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No. 23 Lianxin Road, Huashi Industrial Park",
        "addressLocality": "Jiangyin",
        "addressRegion": "Jiangsu",
        "postalCode": "214400",
        "addressCountry": "CN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "(+86) 13906240166",
        "contactType": "customer service",
        "email": "andeprecisionbearing@gmail.com",
        "availableLanguage": ["English", "Chinese"]
      },
      "sameAs": [
        "https://www.facebook.com/andebearing", // Replace with your actual social media links
        "https://www.linkedin.com/company/andebearing",
        "https://twitter.com/andebearing"
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
        "name": isZh ? "安德轴承" : "ANDE Bearing"
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