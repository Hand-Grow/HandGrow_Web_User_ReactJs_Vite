// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');
  const { pathname } = request.nextUrl;

  const lang =
    request.cookies.get('lang')?.value ||
    request.nextUrl.searchParams.get('lang') ||
    'vi';

  const response = NextResponse.next();

  response.headers.set('x-language', lang);

  if (pathname.startsWith('/cooperative') || pathname.startsWith('/company')) {
    if (!token) {
      console.log('No token, redirecting to /login');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('lang', lang);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/cooperative/:path*', '/company/:path*', '/login/:path*'],
};
