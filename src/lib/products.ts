export const PRODUCT_SLUGS = [
  'deep-groove-ball-bearing',
  'tapered-roller-bearing',
  'spherical-roller-bearing',
  'backing-bearing',
  'four-row-cylindrical-roller-bearing',
  'four-point-contact-ball-bearing',
  'four-row-tapered-roller-bearing',
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const PRODUCT_CATEGORIES = [
  'ballBearings',
  'rollerBearings',
  'rollingMillBearings',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

// Category URL slugs (used in routes like /products/ball-bearings)
export const CATEGORY_SLUGS = [
  'ball-bearings',
  'roller-bearings',
  'rolling-mill-bearings',
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

// Map category slug → internal category key (for i18n lookups)
export const CATEGORY_SLUG_TO_KEY: Record<CategorySlug, ProductCategory> = {
  'ball-bearings': 'ballBearings',
  'roller-bearings': 'rollerBearings',
  'rolling-mill-bearings': 'rollingMillBearings',
};

// Map category slug → product slugs in that category
export const CATEGORY_PRODUCTS: Record<CategorySlug, ProductSlug[]> = {
  'ball-bearings': ['deep-groove-ball-bearing', 'four-point-contact-ball-bearing'],
  'roller-bearings': ['tapered-roller-bearing', 'spherical-roller-bearing'],
  'rolling-mill-bearings': ['backing-bearing', 'four-row-cylindrical-roller-bearing', 'four-row-tapered-roller-bearing'],
};

// Map product slug → image path under /products/
export const PRODUCT_IMAGES: Record<ProductSlug, string> = {
  'deep-groove-ball-bearing': '/products/Deep_Groove_Ball_Bearing.jpg',
  'tapered-roller-bearing': '/products/Tapered-roller-bearing_din720.png',
  'spherical-roller-bearing': '/products/Spherical-roller-bearing_double-row_din635-t2_180.png',
  'backing-bearing': '/products/Deep_Groove_Ball_Bearing.jpg',
  'four-row-cylindrical-roller-bearing': '/products/Spherical-roller-bearing_double-row_din635-t2_180.png',
  'four-point-contact-ball-bearing': '/products/Deep_Groove_Ball_Bearing.jpg',
  'four-row-tapered-roller-bearing': '/products/Tapered-roller-bearing_din720.png',
};

// Helper: check if a slug is a category
export const CATEGORY_IMAGES: Record<string, string> = {
  ballBearings: '/home/ball_bearing.png',
  rollerBearings: '/home/roller_bearings.png',
  rollingMillBearings: '/home/four_row_tapered_roller_bearing.png',
};

export function isCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORY_SLUGS.includes(slug as CategorySlug);
}

// Helper: check if a slug is a product
export function isProductSlug(slug: string): slug is ProductSlug {
  return PRODUCT_SLUGS.includes(slug as ProductSlug);
}

// All valid slugs for static generation (categories + products)
export const ALL_PRODUCT_PAGE_SLUGS = [...CATEGORY_SLUGS, ...PRODUCT_SLUGS] as const;