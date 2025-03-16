"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  imageSrc: string | null;
  price?: string;
}

export default function ProductCard({ id, name, category, description, imageSrc, price }: ProductCardProps) {
  const { t } = useLanguage();
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 bg-gray-100">
        {/* Placeholder for product image */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={name}
              fill
              className="object-contain p-4"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="text-sm">{name}</div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-blue-600 font-medium mb-1">{category}</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          {price && (
            <span className="text-gray-900 font-medium">{price}</span>
          )}
          <Link 
            href={createLink(`/products/${id}`)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {t('common.viewDetails')} →
          </Link>
        </div>
      </div>
    </div>
  );
} 