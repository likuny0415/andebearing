import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// www → non-www redirect should be handled at the DNS/hosting level
// (e.g., Vercel domain settings or Cloudflare page rules),
// NOT in middleware, to avoid redirect loops.
export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|images|favicon|apple-icon|.*\\..*).*)'],
};
