export const PRODUCT_SLUGS = [
  'deep-groove-ball-bearing',
  'tapered-roller-bearing',
  'spherical-roller-bearing',
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const PRODUCT_CATEGORIES = [
  'ballBearings',
  'rollerBearings',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

// Category URL slugs (used in routes like /products/ball-bearings)
export const CATEGORY_SLUGS = [
  'ball-bearings',
  'roller-bearings',
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

// Map category slug → internal category key (for i18n lookups)
export const CATEGORY_SLUG_TO_KEY: Record<CategorySlug, ProductCategory> = {
  'ball-bearings': 'ballBearings',
  'roller-bearings': 'rollerBearings',
};

// Map category slug → product slugs in that category
export const CATEGORY_PRODUCTS: Record<CategorySlug, ProductSlug[]> = {
  'ball-bearings': ['deep-groove-ball-bearing'],
  'roller-bearings': ['tapered-roller-bearing', 'spherical-roller-bearing'],
};

// Map product slug → image path under /products/
export const PRODUCT_IMAGES: Record<ProductSlug, string> = {
  'deep-groove-ball-bearing': '/products/Deep_Groove_Ball_Bearing.jpg',
  'tapered-roller-bearing': '/products/Tapered-roller-bearing_din720.png',
  'spherical-roller-bearing': '/products/Spherical-roller-bearing_double-row_din635-t2_180.png',
};

// Helper: check if a slug is a category
export function isCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORY_SLUGS.includes(slug as CategorySlug);
}

// Helper: check if a slug is a product
export function isProductSlug(slug: string): slug is ProductSlug {
  return PRODUCT_SLUGS.includes(slug as ProductSlug);
}

// All valid slugs for static generation (categories + products)
export const ALL_PRODUCT_PAGE_SLUGS = [...CATEGORY_SLUGS, ...PRODUCT_SLUGS] as const;