export const PRODUCT_SLUGS = [
  'deep-groove-ball-bearing',
  'tapered-roller-bearing',
  'spherical-roller-bearing',
  'linear-guide',
  'mounted-bearing-unit',
  'bearing-housing',
  'bearing-lubricant',
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export const PRODUCT_CATEGORIES = [
  'ballBearings',
  'rollerBearings',
  'linearMotion',
  'mountedUnits',
  'accessories',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];