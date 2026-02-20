import { SITE_URL } from './constants';

/**
 * Generate locale-aware URL for metadata (canonical, alternates, etc.)
 * English (default locale) has no prefix; Chinese uses /zh.
 */
export function localizedUrl(locale: string, path: string = '') {
  return locale === 'en' ? `${SITE_URL}${path}` : `${SITE_URL}/zh${path}`;
}

/**
 * Generate standard alternates metadata for a given path.
 */
export function alternatesForPath(locale: string, path: string = '') {
  return {
    canonical: localizedUrl(locale, path),
    languages: {
      en: `${SITE_URL}${path}`,
      zh: `${SITE_URL}/zh${path}`,
      'x-default': `${SITE_URL}${path}`,
    },
  };
}