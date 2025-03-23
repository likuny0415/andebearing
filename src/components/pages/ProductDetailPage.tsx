"use client";

import { useLanguage } from '../../context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailPageProps {
  productId: string;
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const { t, language } = useLanguage();
  
  // Transform the product ID into the correct format for translation keys
  // For example: 'deep-groove-ball-bearing' -> 'deepGrooveBallBearing'
  const getTranslationKey = (id: string) => {
    return id.split('-').map((part, index) => 
      index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
  };
  
  const translationKey = getTranslationKey(productId);
  
  // Generate language-specific contact URL
  const contactUrl = `/${language}/contact`;
  
  return (
    <div className="bg-white">
      {/* Product Hero Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {t(`products.items.${translationKey}.name`)}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {t(`products.items.${translationKey}.description`)}
          </p>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex justify-center">
            <div className="rounded-lg overflow-hidden bg-gray-100 w-full max-w-lg h-96 relative">
              {/* Placeholder for actual image */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t(`products.details.overview`)}</h2>
            <p className="text-gray-700 mb-6">{t(`products.details.${productId}.overview`)}</p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{t(`products.details.features`)}</h3>
            <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
              <li>{t(`products.details.${productId}.features.1`)}</li>
              <li>{t(`products.details.${productId}.features.2`)}</li>
              <li>{t(`products.details.${productId}.features.3`)}</li>
              <li>{t(`products.details.${productId}.features.4`)}</li>
              <li>{t(`products.details.${productId}.features.5`)}</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{t(`products.details.applications`)}</h3>
            <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
              <li>{t(`products.details.${productId}.applications.1`)}</li>
              <li>{t(`products.details.${productId}.applications.2`)}</li>
              <li>{t(`products.details.${productId}.applications.3`)}</li>
              <li>{t(`products.details.${productId}.applications.4`)}</li>
            </ul>
            
            <div className="mt-8">
              <Link href={contactUrl} className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                {t('common.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Technical Specifications */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('products.details.specifications')}</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('products.details.specificationsTable.property')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('products.details.specificationsTable.value')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {t('products.details.specificationsTable.type')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {t(`products.details.${productId}.specifications.type`)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {t('products.details.specificationsTable.innerDiameter')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {t(`products.details.${productId}.specifications.innerDiameter`)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {t('products.details.specificationsTable.outerDiameter')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {t(`products.details.${productId}.specifications.outerDiameter`)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {t('products.details.specificationsTable.width')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {t(`products.details.${productId}.specifications.width`)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {t('products.details.specificationsTable.material')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {t(`products.details.${productId}.specifications.material`)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {t('products.details.specificationsTable.speedRating')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {t(`products.details.${productId}.specifications.speedRating`)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {t('products.details.specificationsTable.loadRating')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {t(`products.details.${productId}.specifications.loadRating`)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {t('products.details.specificationsTable.sealType')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {t(`products.details.${productId}.specifications.sealType`)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('products.details.relatedProducts')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Placeholder for related products */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{t('products.details.relatedProductPlaceholder')}</h3>
                <p className="text-gray-600 mb-4 text-sm">{t('products.details.relatedProductDescription')}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                  {t('common.viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 