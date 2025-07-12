import { verify } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  const isApiRoute = req.url.startsWith('/api');

  if (!token) {
    if (isApiRoute) {
      return NextResponse.json(
        {
          message: 'Authetication require',
        },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const decode = verifyToken(token);

  if (!decode) {
    const response = isApiRoute
      ? NextResponse.json({ message: 'Invalid token' }, { status: 401 })
      : NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('session');
    return response;
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/home/:path*',
    // '/dashboard/:path*',
    // '/profile/:path*',
    // '/settings/:path*',
  ],
};
