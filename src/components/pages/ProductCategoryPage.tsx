"use client";

import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ProductCategoryPageProps {
  categoryId: string;
}

export default function ProductCategoryPage({ categoryId }: ProductCategoryPageProps) {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  
  // Product mapping based on category ID
  const productMap = {
    // Ball bearings category
    'ball-bearings': [
      {
        id: 'deep-groove-ball-bearing',
        translationKey: 'deepGrooveBallBearing'
      }
    ],
    // Roller bearings category
    'roller-bearings': [
      {
        id: 'tapered-roller-bearing',
        translationKey: 'taperedRollerBearing'
      },
      {
        id: 'spherical-roller-bearing',
        translationKey: 'sphericalRollerBearing'
      }
    ],
    // Linear motion category
    'linear-motion': [
      {
        id: 'linear-guide',
        translationKey: 'linearGuide'
      }
    ],
    // Accessories category
    'accessories': [
      {
        id: 'bearing-lubricant',
        translationKey: 'bearingLubricant'
      },
      {
        id: 'bearing-housing',
        translationKey: 'bearingHousing'
      }
    ],
    // Mounted units category
    'mounted-units': [
      {
        id: 'mounted-bearing-unit',
        translationKey: 'mountedBearingUnit'
      }
    ]
  };
  
  // Get products for this category
  const products = productMap[categoryId as keyof typeof productMap] || [];
  
  // Function to create a language-aware link
  const createLink = (path: string) => {
    return `/${language}${path}`;
  };
  
  // Get translation key for category name
  const getCategoryTranslationKey = (id: string) => {
    // Map from URL path to translation key
    const categoryKeyMap: Record<string, string> = {
      'ball-bearings': 'ballBearings',
      'roller-bearings': 'rollerBearings',
      'linear-motion': 'linearMotion',
      'accessories': 'accessories',
      'mounted-units': 'mountedUnits'
    };
    
    return categoryKeyMap[id] || id;
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        {t(`products.categories.${getCategoryTranslationKey(categoryId)}`)}
      </h1>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {t(`products.items.${product.translationKey}.name`)}
                </h2>
                <p className="text-gray-600 mb-4">
                  {t(`products.items.${product.translationKey}.description`)}
                </p>
                <Link 
                  href={createLink(`/products/${product.id}`)} 
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {t('common.viewDetails')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">
            {t('products.noProductsFound')}
          </p>
          <Link 
            href={createLink('/products')} 
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            {t('common.backToProducts')}
          </Link>
        </div>
      )}
    </div>
  );
} 