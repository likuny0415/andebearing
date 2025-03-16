import { NextRequest, NextResponse } from 'next/server';

// Define supported languages
const supportedLanguages = ['en', 'zh'];

// Define paths that don't need language prefix
const publicPaths = ['/favicon.ico', '/api', '/_next', '/images'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is a public path
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Check if the path already has a language prefix
  const pathnameHasLanguage = supportedLanguages.some(
    lang => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );
  
  if (pathnameHasLanguage) {
    return NextResponse.next();
  }
  
  // Get preferred language from cookie or Accept-Language header
  const cookieLanguage = request.cookies.get('NEXT_LOCALE')?.value;
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  
  let preferredLanguage = 'en'; // Default to English
  
  // Check cookie first
  if (cookieLanguage && supportedLanguages.includes(cookieLanguage)) {
    preferredLanguage = cookieLanguage;
  } 
  // Then check Accept-Language header
  else if (acceptLanguage.includes('zh')) {
    preferredLanguage = 'zh';
  }
  
  // For the root path, redirect to the language-specific home
  if (pathname === '/') {
    const response = NextResponse.redirect(
      new URL(`/${preferredLanguage}`, request.url)
    );
    
    // Set cookie for future requests
    response.cookies.set('NEXT_LOCALE', preferredLanguage, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    
    return response;
  }
  
  // For other paths, add the language prefix
  const response = NextResponse.redirect(
    new URL(`/${preferredLanguage}${pathname}`, request.url)
  );
  
  // Set cookie for future requests
  response.cookies.set('NEXT_LOCALE', preferredLanguage, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}; 