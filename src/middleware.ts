import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  const pathname = req.nextUrl.pathname;

  const isProtectedRoute = ['/dashboard'].some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = ['/signin', '/signup'].includes(pathname);

  const decoded = token ? verifyToken(token) : null;

  if (isProtectedRoute && !decoded) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (isAuthRoute && decoded) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/sigin', '/signup'],
};
