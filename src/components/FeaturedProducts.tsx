"use client";

import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';

// Sample product data - in a real application, this would come from an API or database
const featuredProducts = [
  {
    id: 'deep-groove-ball-bearing',
    nameKey: 'products.items.deepGrooveBallBearing.name',
    category: 'products.categories.ballBearings',
    descriptionKey: 'products.items.deepGrooveBallBearing.description',
    // Use a placeholder image that doesn't rely on external files
    imageSrc: null as string | null,
    price: 'From $12.99'
  },
  {
    id: 'tapered-roller-bearing',
    nameKey: 'products.items.taperedRollerBearing.name',
    category: 'products.categories.rollerBearings',
    descriptionKey: 'products.items.taperedRollerBearing.description',
    // Use a placeholder image that doesn't rely on external files
    imageSrc: null as string | null,
    price: 'From $24.99'
  },
  {
    id: 'spherical-roller-bearing',
    nameKey: 'products.items.sphericalRollerBearing.name',
    category: 'products.categories.rollerBearings',
    descriptionKey: 'products.items.sphericalRollerBearing.description',
    // Use a placeholder image that doesn't rely on external files
    imageSrc: null as string | null,
    price: 'From $39.99'
  },
  {
    id: 'linear-guide',
    nameKey: 'products.items.linearGuide.name',
    category: 'products.categories.linearMotion',
    descriptionKey: 'products.items.linearGuide.description',
    // Use a placeholder image that doesn't rely on external files
    imageSrc: null as string | null,
    price: 'From $89.99'
  }
];

export default function FeaturedProducts() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.featuredProducts.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.featuredProducts.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.nameKey.startsWith('products.') ? t(product.nameKey) : product.nameKey}
              category={product.category.startsWith('products.') ? t(product.category) : product.category}
              description={product.descriptionKey.startsWith('products.') ? t(product.descriptionKey) : product.descriptionKey}
              imageSrc={product.imageSrc}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 