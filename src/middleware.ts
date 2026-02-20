import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // 301 redirect www → non-www
  const host = request.headers.get('host') || '';
  if (host.startsWith('www.')) {
    const newUrl = new URL(request.url);
    newUrl.host = host.replace(/^www\./, '');
    return NextResponse.redirect(newUrl, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|images|favicon|apple-icon|.*\\..*).*)'],
};