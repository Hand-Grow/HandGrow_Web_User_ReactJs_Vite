// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');
  const { pathname } = request.nextUrl;

  if (pathname.includes('/_next') || pathname.includes('/favicon.ico')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/cooperative') || pathname.startsWith('/company')) {
    if (!token) {
      console.log('No token, redirecting to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cooperative/:path*', '/company/:path*'],
};
